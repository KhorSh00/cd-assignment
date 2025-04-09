import spotipy
from spotipy.oauth2 import SpotifyOAuth

SPOTIFY_CLIENT_ID = "3e90117265f848aab51a5f88db4fe02e"
SPOTIFY_CLIENT_SECRET = "b02203d1687c4758b270057be74ba248"
SPOTIFY_REDIRECT_URI = "http://127.0.0.1:8000/api/callback/" 

sp_oauth = SpotifyOAuth(
    client_id=SPOTIFY_CLIENT_ID,
    client_secret=SPOTIFY_CLIENT_SECRET,
    redirect_uri=SPOTIFY_REDIRECT_URI,
    scope="user-read-private user-read-email"
)

sp = spotipy.Spotify(auth_manager=sp_oauth)

def search_spotify_tracks(query, limit=21):
    results = sp.search(q=query, type="track", limit=limit)
    return results["tracks"]["items"]

def get_spotify_access_token():
    token_info = sp_oauth.get_cached_token() 

    if not token_info:
        auth_url = sp_oauth.get_authorize_url()
        return {"url": auth_url}

    return {"access_token": token_info["access_token"]}

def spotify_auth(request):
    auth_url = sp_oauth.get_authorize_url()
    return redirect(auth_url)

def get_song_features(track_id):
    features = sp.audio_features([track_id])[0]
    if features:
        return {
            "danceability": features["danceability"],
            "energy": features["energy"],
            "tempo": features["tempo"],
            "valence": features["valence"],
        }
    return None