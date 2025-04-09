import React, { useEffect, useState } from "react";
import axios from "axios";

const SpotifyPlayer = ({ trackUri, showPlayer, togglePlayer }) => {
    if (!trackUri) {
        return null;
    }

    const spotifyTrackId = trackUri.split(":").pop();

    return (
        <>
            <div className="toggle-player">
                <button className="toggle-player-btn" onClick={togglePlayer}>
                    {showPlayer ? "Hide Player ⬇️" : "Show Player 🎵"}
                </button>
            </div>

            <div className={`spotify-player-container ${showPlayer ? "show" : "hide"}`}>
                <iframe
                    title="Spotify Music Player"
                    src={`https://open.spotify.com/embed/track/${spotifyTrackId}`}
                    width="100%"
                    height="120"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    className="spotify-iframe"
                ></iframe>
            </div>
        </>
    );
};

export default SpotifyPlayer;