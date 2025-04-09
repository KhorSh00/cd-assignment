from django.urls import path
from .views import get_recommended_music, get_access_token, spotify_auth, spotify_callback

urlpatterns = [
    path("get-music/", get_recommended_music, name="get-music"),
    path("get-spotify-token/", get_access_token, name="get-spotify-token"),
    path("callback/", spotify_callback, name="spotify-callback"),
    path("auth/", spotify_auth, name="spotify-auth"),
]
