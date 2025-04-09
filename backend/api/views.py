from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
import datetime

@api_view(['POST'])
def signup(request):
    if request.method =="POST":
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'User Registered Successfully!'})
        return Response(serializer.errors, status=400)

@api_view(['POST'])
def login(request):
    if request.method == "POST":
        email = request.data.get('userEmail')
        password = request.data.get('userPassword')

        try:
            user = User.objects.get(userEmail=email)
        except User.DoesNotExist:
            return Response({"success": False, "message": "Invalid Email or Incorrect Email Entered "}, status=400)

        if check_password(password, user.userPassword):
            refresh = RefreshToken.for_user(user) 
            return Response({
                "success": True,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "message": "Login Successful!"
            })
        else:
            return Response({"success": False, "message": "Invalid Password!"}, status=400)
        
        
@api_view(["POST"])
def update_mood(request):
    user_email = request.data.get("userEmail") 
    mood = request.data.get("mood")

    if not user_email or not mood:
        return Response({"error": "User email and mood are required."}, status=400)
    user = get_object_or_404(User, userEmail=user_email)

    user.mood = mood
    user.save(update_fields=["mood"])

    return Response({"message": "Mood updated successfully!", "mood": user.mood}, status=200)     
    return Response({"error": "User not found."}, status=400)

@api_view(["GET"])
def get_mood(request):
    user_email = request.query_params.get("userEmail")
    
    if not user_email:
        return Response({"Error":"Email is required"},status=400)
    
    user = get_object_or_404(User, userEmail=user_email)
    
    return Response({"mood":user.mood},status=200)
    

@api_view(["GET"])
def get_user_info(request, email):  
    try:
        user = User.objects.get(userEmail=email)
        serializer = userSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

def calculate_energy_change(mood):
    energy_map = {
        "😊 Happy": 1,
        "😢 Sad": -1,
        "😡 Angry": -2,
        "😎 Confident": 2,
        "🤩 Excited": 3,
        "😔 Melancholy": -1,
        "😴 Sleepy": -2,
        "🤯 Stressed": -3,
        "🤗 Loved": 2,
        "😆 Playful": 1,
        "😤 Frustrated": -2,
        "🥺 Heartbroken": -3,
        "😇 Grateful": 2,
        "🤠 Adventurous": 3,
        "😨 Anxious": -2,
        "🥳 Cheerful": 2,
        "🤓 Focused": 1,
        "🧐 Motivated": 2,
        "😵 Confused": -1,
        "🫣 Shy": -1,
        "🙃 Tired": -2,
        "🎭 Dramatic": 0,
    }
    
    return energy_map.get(mood, 0)  

@api_view(["POST"])
def log_mood(request):
    user_email = request.data.get("userEmail")
    mood = request.data.get("mood")
    notes = request.data.get("notes", "")
    
    if not user_email or not mood:
        return Response({"error": "User email and mood are required."}, status=400)
    
    try:
        user = User.objects.get(userEmail=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)
    
    energy_change = calculate_energy_change(mood)
    
    mood_log = MoodLog.objects.create(
        user=user,
        mood=mood,
        energy_change=energy_change,
        notes=notes
    )
    
    # Update or create user energy
    energy, created = UserEnergy.objects.get_or_create(
        user=user,
        defaults={"current_level": 5}
    )
    
    # Update energy level, ensuring it stays between 0 and 10
    energy.current_level = max(0, min(10, energy.current_level + energy_change))
    energy.save()
    
    # Update user's current mood
    user.mood = mood
    user.save(update_fields=["mood"])
    
    return Response({
        "message": "Mood logged successfully!",
        "mood": mood,
        "energy_change": energy_change,
        "current_energy": energy.current_level
    }, status=201)

@api_view(["GET"])
def get_mood_logs(request):
    user_email = request.query_params.get("userEmail")
    days = request.query_params.get("days", 7)  # Default to 7 days
    
    try:
        days = int(days)
    except (ValueError, TypeError):
        days = 7
    
    if not user_email:
        return Response({"error": "User email is required."}, status=400)
    
    try:
        user = User.objects.get(userEmail=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)
    
    # Get logs from the last X days
    from_date = datetime.datetime.now() - datetime.timedelta(days=days)
    logs = MoodLog.objects.filter(
        user=user,
        timestamp__gte=from_date
    ).order_by("-timestamp")
    
    serializer = MoodLogSerializer(logs, many=True)
    
    return Response(serializer.data, status=200)

@api_view(["GET"])
def get_user_energy(request):
    user_email = request.query_params.get("userEmail")
    
    if not user_email:
        return Response({"error": "User email is required."}, status=400)
    
    try:
        user = User.objects.get(userEmail=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)
    
    # Get or create user energy
    energy, created = UserEnergy.objects.get_or_create(
        user=user,
        defaults={"current_level": 5}
    )
    
    serializer = UserEnergySerializer(energy)
    return Response(serializer.data, status=200)

@api_view(["GET"])
def get_mood_summary(request):
    user_email = request.query_params.get("userEmail")
    
    if not user_email:
        return Response({"error": "User email is required."}, status=400)
    
    try:
        user = User.objects.get(userEmail=user_email)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=404)

    encouragement_map = {
        "😊 Happy": "You're doing great! Keep it going!",
        "😢 Sad": "Don't worry, tough times don't last. Reach out if you need support.",
        "😡 Angry": "Take a deep breath; try to let go of the anger.",
        "😎 Confident": "Awesome! Your confidence shines through!",
        "🤩 Excited": "Your energy is contagious! Enjoy the moment!",
        "😔 Melancholy": "Sometimes a little melancholy can lead to reflection. Stay positive!",
        "😴 Sleepy": "Rest is important—make sure to take care of yourself!",
        "🤯 Stressed": "Remember to take breaks and practice mindfulness!",
        "🤗 Loved": "You are cherished! Keep sharing the love.",
        "😆 Playful": "Stay playful and let your smile brighten the day!",
        "😤 Frustrated": "Try to relax and reframe your thoughts.",
        "🥺 Heartbroken": "It’s okay to feel heartbroken; lean on those who care about you.",
        "😇 Grateful": "Keep the gratitude flowing—it makes all the difference!",
        "🤠 Adventurous": "Embrace your adventurous spirit and keep exploring!",
        "😨 Anxious": "Take a deep breath; you can get through this.",
        "🥳 Cheerful": "Your cheerfulness lifts others up!",
        "🤓 Focused": "Your focus is paying off—keep it up!",
        "🧐 Motivated": "Great job staying motivated! Keep pushing forward.",
        "😵 Confused": "When you're confused, it might help to take a moment to breathe.",
        "🫣 Shy": "It's okay to be shy—small steps are progress!",
        "🙃 Tired": "Rest if you need it; you deserve to recharge.",
        "🎭 Dramatic": "Embrace your dramatic flair, but remember to stay balanced!"
    }

    today = datetime.datetime.now().date()
    today_logs = MoodLog.objects.filter(user=user, timestamp__date=today).order_by("timestamp")

    total_energy_change = sum(log.energy_change for log in today_logs)

    mood_today = [
        {
            "mood": log.mood,
            "time": log.timestamp.strftime('%H:%M'),
            "energy_change": log.energy_change,
            "encouragement": encouragement_map.get(log.mood, "Keep going, you're doing great!")
        }
        for log in today_logs
    ]

    energy, _ = UserEnergy.objects.get_or_create(user=user, defaults={"current_level": 5})

    return Response({
        "current_mood": user.mood,
        "current_energy": energy.current_level,
        "total_energy_change": total_energy_change,
        "mood_today": mood_today
    }, status=200)