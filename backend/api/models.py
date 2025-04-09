from django.db import models
from django.contrib.auth.hashers import make_password 

class User(models.Model):
    username = models.CharField(max_length=50)
    userEmail = models.CharField(max_length=50, unique=True)
    userPassword = models.CharField(max_length=255)
    gender = models.CharField(
        max_length=20,
        choices=[
            ('Male', 'Male'),
            ('Female', 'Female'),
            ('Prefer not to say', 'Prefer not to say')
        ]
    )
    
    mood = models.CharField(max_length=20, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.userPassword = make_password(self.userPassword)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username    
    
class UserMoodSong(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)  
    mood = models.CharField(max_length=50) 
    song_id = models.CharField(max_length=100)
    song_name = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    danceability = models.FloatField()
    energy = models.FloatField()
    tempo = models.FloatField()
    valence = models.FloatField()

    def __str__(self):
        return f"{self.user.username} - {self.mood} - {self.song_name}"


class MoodLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='mood_logs')
    mood = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    energy_change = models.IntegerField(default=0)
    notes = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.mood} - {self.timestamp.strftime('%Y-%m-%d %H:%M')}"
        
class UserEnergy(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='energy')
    current_level = models.IntegerField(default=5) 
    last_updated = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - Energy: {self.current_level}"