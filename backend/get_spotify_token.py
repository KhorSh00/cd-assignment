import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Replace these with your actual Spotify API credentials
CLIENT_ID = "3e90117265f848aab51a5f88db4fe02e"
CLIENT_SECRET = "b02203d1687c4758b270057be74ba248"
REDIRECT_URI = "http://127.0.0.1:8000/callback/"  # Must match your Spotify app settings

# Request token with necessary permissions
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope="user-read-playback-state user-modify-playback-state user-read-private user-read-email"
))

# Get the access token
token_info = sp.auth_manager.get_access_token()
print("Access Token:", token_info['access_token'])
print("Refresh Token:", token_info['refresh_token'])
print("Expires in:", token_info['expires_in'], "seconds")
