from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import search_spotify_tracks
from .utils import sp_oauth
import requests
from django.http import JsonResponse
from django.conf import settings
import pandas as pd
import numpy as np
import xgboost as xgb
import os
import pickle
import random
import re
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from rest_framework.decorators import api_view
from rest_framework.response import Response
from sklearn.metrics import accuracy_score
from api.models import UserMoodSong
from .mood_mapping import get_suggested_moods


@api_view(["GET"])
def spotify_callback(request):
    code = request.GET.get("code")

    if not code:
        return JsonResponse({"error": "No authorization code received"}, status=400)

    token_url = "https://accounts.spotify.com/api/token"

    client_id = settings.SPOTIFY_CLIENT_ID
    client_secret = settings.SPOTIFY_CLIENT_SECRET
    redirect_uri = settings.SPOTIFY_REDIRECT_URI


    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": redirect_uri,
        "client_id": client_id,
        "client_secret": client_secret,
    }

    response = requests.post(token_url, data=data)
    token_info = response.json()

    if "access_token" in token_info:
        return JsonResponse({"access_token": token_info["access_token"]})

    return JsonResponse({"error": "Failed to get access token", "details": token_info}, status=400)

def remove_emojis(text):
    return re.sub(r'[^\w\s]', '', text).strip()

@api_view(["GET"])
def get_recommended_music(request):
    mood = request.GET.get("mood", "").strip()

    if not mood:
        return Response({"error": "Mood is required"}, status=400)

    mood_text = remove_emojis(mood)

    model, mood_encoder, df = train_xgboost_model()

    if model is None:
        return Response({"error": "Not enough data to train the model"}, status=400)

    if mood_text not in mood_encoder.classes_:
        return Response({"error": "Invalid mood"}, status=400)

    suggested_mood_encoded = mood_encoder.transform([mood_text])[0]
    recommended_songs = df[df["mood_encoded"] == suggested_mood_encoded]

    if recommended_songs.empty:
        return Response({"error": "No songs found for this mood"}, status=404)
    
    recommended_songs = recommended_songs.sample(frac=1).head(5)  
    recommended_songs["mood"] = recommended_songs["mood_original"]

    tracks = search_spotify_tracks(mood)
    random.shuffle(tracks)

    formatted_tracks = [{
        "name": track["name"],
        "artist": track["artists"][0]["name"],
        "album": track["album"]["name"],
        "image": track["album"]["images"][0]["url"] if track["album"]["images"] else "",
        "preview_url": track.get("preview_url", ""),
        "uri": track.get("uri", f"spotify:track:{track.get('id', '')}") 
    } for track in tracks]

    return Response(formatted_tracks)

def get_access_token(request):
    token_info = sp_oauth.get_cached_token()

    if not token_info:
        return JsonResponse({"error": "No token found"}, status=400)

    return JsonResponse({"access_token": token_info["access_token"]})

def spotify_auth(request):
    auth_url = sp_oauth.get_authorize_url()
    return JsonResponse({"auth_url": auth_url})


MODEL_PATH = "xgboost_model.pkl"

def train_xgboost_model():
    songs = list(UserMoodSong.objects.all().values())

    if not songs:
        print("⚠️ No training data found.")
        return None, None, None

    df = pd.DataFrame(songs)
    df["mood_original"] = df["mood"]
    df["mood"] = df["mood"].apply(remove_emojis)
    mood_encoder = LabelEncoder()
    df["mood_encoded"] = mood_encoder.fit_transform(df["mood"])

    mood_counts = df["mood_encoded"].value_counts()
    rare_moods = mood_counts[mood_counts < 2].index.tolist()
    df = df[~df["mood_encoded"].isin(rare_moods)]  

    num_class = len(set(df["mood_encoded"]))  
    features = ["danceability", "energy", "tempo", "valence"]
    X = df[features]
    y = df["mood_encoded"]

    min_test_size = max(0.2, num_class / len(df))

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=min_test_size, stratify=y if num_class > 1 else None, random_state=42
    )

    model = xgb.XGBClassifier(
        objective="multi:softmax",
        num_class=num_class,  
        eval_metric="mlogloss"
    )
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"🎯 Model Accuracy: {accuracy * 100:.2f}%")

    return model, mood_encoder, df