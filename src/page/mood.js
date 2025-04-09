import React, { useEffect, useState } from "react";
import axios from "axios";

const encouragementMap = {
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
};

const MoodSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/get_mood_summary/";
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User email not found. Please log in.");
      setLoading(false);
      return;
    }
    axios
      .get(API_URL, { params: { userEmail: userEmail } })
      .then((res) => {
        setSummary(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to retrieve daily summary.");
        setLoading(false);
      });
  }, [userEmail]);

  if (loading) return <div>Loading daily summary...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mood-summary">
      <h1>Daily Mood Summary</h1>
      <p>
        <strong>Current Mood: </strong>
        {summary.current_mood}
      </p>
      <p>
        <strong>Current Energy: </strong>
        {summary.current_energy}
      </p>
      <p>
        <strong>Total Energy Change Today: </strong>
        {summary.total_energy_change}
      </p>

      <h2>Mood Timeline (Today)</h2>
      {summary.mood_today && summary.mood_today.length > 0 ? (
        <ul>
          {summary.mood_today.map((entry, idx) => (
            <li key={idx}>
              <strong>{entry.time}</strong>: {entry.mood} (Energy Change:{" "}
              {entry.energy_change}){" "}
              <em>
                - {encouragementMap[entry.mood] || "Keep going, have a great day!"}
              </em>
            </li>
          ))}
        </ul>
      ) : (
        <p>No mood entries recorded for today.</p>
      )}
    </div>
  );
};

export default MoodSummary;
