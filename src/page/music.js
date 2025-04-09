import React, { useState, useEffect } from "react";
import axios from "axios";
import MoodSelector from "../component/moodSelector";
import SpotifyPlayer from "../component/musicPlayer";

const Music = () => {
    const [mood, setMood] = useState("");
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedMood, setSelectedMood] = useState("");
    const userEmail = localStorage.getItem("userEmail");
    const [selectedTrackUri, setSelectedTrackUri] = useState(null);
    const [showPlayer, setShowPlayer] = useState(true);

    const fetchSpotifyToken = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get-spotify-token/");

            if (response.data.access_token) {
                setAccessToken(response.data.access_token);
            } else {
                console.error("No access token received.");
            }
        } catch (error) {
            console.error("Error fetching Spotify token:", error);
            window.location.href = "http://127.0.0.1:8000/auth/";
        }
    };

    useEffect(() => {
        fetchMood();
        fetchSpotifyToken();
    }, []);

    const fetchMood = async () => {
        if (!userEmail) return;

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get-mood/", {
                params: { userEmail },
            });

            const userMood = response.data.mood;
            if (userMood) {
                setMood(userMood);
                fetchMusic(userMood);
            } else {
                setMood("No mood set");
            }
        } catch (err) {
            console.error("Error fetching mood:", err);
        }
    };

    const removeEmojis = (text) => text.replace(/[\u{1F600}-\u{1F64F}]/gu, "");

    const fetchMusic = async (selectedMood) => {
        if (!selectedMood) return;
        const removedEmojiMood = removeEmojis(selectedMood).trim();
        setLoading(true);
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/get-music/`, {
                params: { mood: removedEmojiMood },
            });
            console.log("Music API Response:", response.data);
            setTracks(response.data);
        } catch (error) {
            console.error("Error fetching music:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMood();
    }, []);

    const handleMoodSelect = async (mood) => {
        if (!userEmail || !mood) return;

        try {
            await axios.post("http://127.0.0.1:8000/api/update-mood/", {
                userEmail: userEmail,
                mood: mood,
            });

            fetchMood();
            fetchMusic();
        } catch (error) {
            console.error("Error updating mood:", error);
        }
    };

    const handleTrackClick = (track) => {
        console.log("Selected Track URI:", track.uri);
        setSelectedTrackUri(track.uri);
        setShowPlayer(true);
    };


    return (
        <>
            <MoodSelector onSelectMood={handleMoodSelect} />
            <div className="container music-container">
                <h2 className="text-center">Music for Your Mind 🎶</h2>

                {loading && <p className="text-center text-primary">Loading music...</p>}

                <div className="row">
                    {tracks.length > 0 ? (
                        tracks.map((track, index) => (
                            <div key={index} className="col-md-4 col-sm-6 mb-4">
                                <div className="card music-card">
                                    <img src={track.image} className="card-img-top" alt={track.album} />
                                    <div className="card-body">
                                        <h5 className="card-title">{track.name}</h5>
                                        <p className="card-text">{track.artist}</p>
                                        <button
                                            className="play-button"
                                            onClick={() => handleTrackClick(track)}
                                        >
                                            🎵 Play Song
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="text-center text-muted">No songs found. Select a mood to get recommendations!</p>
                    )}
                </div>
            </div>

            {accessToken && selectedTrackUri && (
                <SpotifyPlayer trackUri={selectedTrackUri} showPlayer={showPlayer} togglePlayer={() => setShowPlayer(!showPlayer)} />
            )}


        </>
    );
}

export default Music;