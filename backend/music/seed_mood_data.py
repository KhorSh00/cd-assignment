from api.models import UserMoodSong, User

# Get an existing user
user = User.objects.first()

if not user:
    print("⚠ No user found in the database. Please create a user first.")
else:
    # Define a list of song names and artists to assign randomly
    sample_songs = [
        {"song_name": "Feel the Beat", "artist": "DJ Energy"},
        {"song_name": "Relaxing Waves", "artist": "Calm Sounds"},
        {"song_name": "Power Boost", "artist": "Hype Masters"},
        {"song_name": "Melancholy Nights", "artist": "Sad Tones"},
        {"song_name": "Tranquility", "artist": "Zen Harmony"},
    ]

training_data = [
    {"mood": "Sad", "danceability": 0.45, "energy": 0.30, "tempo": 85, "valence": 0.25},
    {"mood": "Sad", "danceability": 0.40, "energy": 0.28, "tempo": 90, "valence": 0.22},

    {"mood": "Happy", "danceability": 0.85, "energy": 0.90, "tempo": 140, "valence": 0.88},
    {"mood": "Happy", "danceability": 0.80, "energy": 0.85, "tempo": 135, "valence": 0.86},

    {"mood": "Confident", "danceability": 0.70, "energy": 0.75, "tempo": 120, "valence": 0.78},
    {"mood": "Confident", "danceability": 0.72, "energy": 0.78, "tempo": 125, "valence": 0.80},

    {"mood": "Angry", "danceability": 0.50, "energy": 0.40, "tempo": 100, "valence": 0.35},
    {"mood": "Angry", "danceability": 0.48, "energy": 0.38, "tempo": 95, "valence": 0.33},

    {"mood": "Stressed", "danceability": 0.45, "energy": 0.38, "tempo": 90, "valence": 0.40},
    {"mood": "Stressed", "danceability": 0.42, "energy": 0.35, "tempo": 88, "valence": 0.38},

    {"mood": "Tired", "danceability": 0.55, "energy": 0.45, "tempo": 95, "valence": 0.50},
    {"mood": "Tired", "danceability": 0.58, "energy": 0.48, "tempo": 98, "valence": 0.52},

    {"mood": "Excited", "danceability": 0.90, "energy": 0.95, "tempo": 150, "valence": 0.92},
    {"mood": "Excited", "danceability": 0.88, "energy": 0.93, "tempo": 148, "valence": 0.90},

    {"mood": "Melancholy", "danceability": 0.48, "energy": 0.38, "tempo": 85, "valence": 0.45},
    {"mood": "Melancholy", "danceability": 0.46, "energy": 0.36, "tempo": 83, "valence": 0.43},

    {"mood": "Sleepy", "danceability": 0.30, "energy": 0.25, "tempo": 70, "valence": 0.20},
    {"mood": "Sleepy", "danceability": 0.28, "energy": 0.23, "tempo": 68, "valence": 0.18},

    {"mood": "Loved", "danceability": 0.75, "energy": 0.60, "tempo": 110, "valence": 0.85},
    {"mood": "Loved", "danceability": 0.78, "energy": 0.63, "tempo": 112, "valence": 0.88},

    {"mood": "Playful", "danceability": 0.82, "energy": 0.88, "tempo": 145, "valence": 0.90},
    {"mood": "Playful", "danceability": 0.80, "energy": 0.85, "tempo": 142, "valence": 0.88},

    {"mood": "Frustrated", "danceability": 0.50, "energy": 0.42, "tempo": 100, "valence": 0.40},
    {"mood": "Frustrated", "danceability": 0.48, "energy": 0.40, "tempo": 98, "valence": 0.38},

    {"mood": "Heartbroken", "danceability": 0.45, "energy": 0.35, "tempo": 85, "valence": 0.30},
    {"mood": "Heartbroken", "danceability": 0.42, "energy": 0.32, "tempo": 83, "valence": 0.28},

    {"mood": "Grateful", "danceability": 0.72, "energy": 0.65, "tempo": 120, "valence": 0.80},
    {"mood": "Grateful", "danceability": 0.70, "energy": 0.63, "tempo": 118, "valence": 0.78},

    {"mood": "Adventurous", "danceability": 0.85, "energy": 0.90, "tempo": 150, "valence": 0.92},
    {"mood": "Adventurous", "danceability": 0.82, "energy": 0.88, "tempo": 148, "valence": 0.90},

    {"mood": "Anxious", "danceability": 0.45, "energy": 0.40, "tempo": 95, "valence": 0.38},
    {"mood": "Anxious", "danceability": 0.43, "energy": 0.38, "tempo": 93, "valence": 0.36},

    {"mood": "Cheerful", "danceability": 0.88, "energy": 0.90, "tempo": 140, "valence": 0.92},
    {"mood": "Cheerful", "danceability": 0.85, "energy": 0.88, "tempo": 138, "valence": 0.90},

    {"mood": "Focused", "danceability": 0.55, "energy": 0.50, "tempo": 110, "valence": 0.60},
    {"mood": "Focused", "danceability": 0.53, "energy": 0.48, "tempo": 108, "valence": 0.58},

    {"mood": "Motivated", "danceability": 0.80, "energy": 0.85, "tempo": 135, "valence": 0.88},
    {"mood": "Motivated", "danceability": 0.78, "energy": 0.83, "tempo": 132, "valence": 0.85},

    {"mood": "Confused", "danceability": 0.50, "energy": 0.45, "tempo": 100, "valence": 0.48},
    {"mood": "Confused", "danceability": 0.48, "energy": 0.43, "tempo": 98, "valence": 0.46},

    {"mood": "Shy", "danceability": 0.40, "energy": 0.35, "tempo": 85, "valence": 0.45},
    {"mood": "Shy", "danceability": 0.38, "energy": 0.33, "tempo": 83, "valence": 0.43},

    {"mood": "Dramatic", "danceability": 0.75, "energy": 0.90, "tempo": 150, "valence": 0.85},
    {"mood": "Dramatic", "danceability": 0.72, "energy": 0.88, "tempo": 148, "valence": 0.83},
]


    # Convert training data into database objects
mood_objects = []
for idx, data in enumerate(training_data, start=1):
    song_info = sample_songs[idx % len(sample_songs)]  # Cycle through sample songs
    mood_objects.append(
        UserMoodSong(
            user=user,
            mood=data["mood"],
            song_id=f"song_{idx}",
            song_name=song_info["song_name"],
            artist=song_info["artist"],
            danceability=data["danceability"],
            energy=data["energy"],
            tempo=data["tempo"],
            valence=data["valence"],
        )
    )

    # Insert into database
UserMoodSong.objects.bulk_create(mood_objects)
print("✅ Training data successfully inserted into the database!")
