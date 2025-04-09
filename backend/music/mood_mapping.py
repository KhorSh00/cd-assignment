MOOD_MAPPING = {
    "Sad": ["Happy", "Encouraging", "Motivating", "Hopeful"],
    "Happy": ["Energetic", "Excited", "Uplifting", "Cheerful"],
    "Confident": ["Courageous", "Motivating", "Empowering", "Fearless"],
    "Angry": ["Calming", "Relaxing", "Peaceful", "Soothing"],
    "Stressed": ["Relaxing", "Chill", "Soothing", "Meditative"],
    "Tired": ["Energetic", "Refreshing", "Motivating", "Uplifting"],
    "Excited": ["Upbeat", "Fun", "Party", "Dance"],
    "Melancholy": ["Comforting", "Reflective", "Peaceful", "Hopeful"],
    "Sleepy": ["Soft", "Calm", "Dreamy", "Lullaby"],
    "Loved": ["Romantic", "Warm", "Joyful", "Sweet"],
    "Playful": ["Fun", "Energetic", "Bouncy", "Lively"],
    "Frustrated": ["Relaxing", "Meditative", "Peaceful", "Chill"],
    "Heartbroken": ["Healing", "Hopeful", "Comforting", "Empowering"],
    "Grateful": ["Joyful", "Hopeful", "Calm", "Peaceful"],
    "Adventurous": ["Energetic", "Epic", "Exciting", "Fearless"],
    "Anxious": ["Soothing", "Chill", "Calming", "Meditative"],
    "Cheerful": ["Happy", "Excited", "Bouncy", "Bright"],
    "Focused": ["Instrumental", "Ambient", "Calm", "Smooth"],
    "Motivated": ["Energetic", "Confident", "Powerful", "Drive"],
    "Confused": ["Calm", "Soothing", "Chill", "Soft"],
    "Shy": ["Comforting", "Soft", "Warm", "Easygoing"],
    "Silly": ["Playful", "Fun", "Bouncy", "Upbeat"],
    "Thoughtful": ["Reflective", "Calm", "Instrumental", "Chill"],
    "Determined": ["Strong", "Powerful", "Confident", "Motivating"],
    "Bored": ["Exciting", "Adventurous", "Fun", "Upbeat"],
    "Dramatic": ["Epic", "Theatrical", "Powerful", "Intense"]
}


def get_suggested_moods(user_mood):
    return MOOD_MAPPING.get(user_mood, [user_mood])