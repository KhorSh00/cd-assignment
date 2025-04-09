import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const MoodSelector = ({ onSelectMood }) => {
    const moods = [
        "😊 Happy", 
        "😢 Sad", 
        "😡 Angry", 
        "😎 Confident", 
        "🤩 Excited", 
        "😔 Melancholy", 
        "😴 Sleepy", 
        "🤯 Stressed", 
        "🤗 Loved", 
        "😆 Playful", 
        "😤 Frustrated", 
        "🥺 Heartbroken", 
        "😇 Grateful", 
        "🤠 Adventurous", 
        "😨 Anxious", 
        "🥳 Cheerful", 
        "🤓 Focused", 
        "🧐 Motivated",
        "😵 Confused",
        "🫣 Shy", 
        "🙃 Tired", 
        "🎭 Dramatic"
      ];
    const modalRef = useRef(null);
    const headerRef = useRef(null);
    const buttonRef = useRef(null);
    const [selectedMood, setSelectedMood] = useState(null);
    const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 80 });
    const [isDragging, setIsDragging] = useState(false);
    const [message, setMessage] = useState("");
    const offset = useRef({ x: 0, y: 0 });
    const token = localStorage.getItem("access");
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;
            setPosition({
                x: e.clientX - offset.current.x,
                y: e.clientY - offset.current.y
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        localStorage.setItem("selectedMood", mood);
        setMessage("");
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedMood) {
            setMessage("Please select a mood before submitting.");
            return;
        }

        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            setMessage("No email found. Please log in.");
            return;
        }

        try {
            const payload = { userEmail, mood: selectedMood };
            const response = await axios.post("http://127.0.0.1:8000/api/update-mood/", payload);
            setMessage("Mood updated successfully!");
            onSelectMood(selectedMood);
        } catch (error) {
            setMessage("Failed to update mood. Try again.");
        }
    };

    return (
        <>
            <button
                ref={buttonRef}
                type="button"
                className="mood-button"
                style={{
                    position: "fixed",
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    cursor: isDragging ? "grabbing" : "grab",
                    zIndex: 1000,
                }}
                onMouseDown={handleMouseDown}
                data-bs-toggle="modal"
                data-bs-target="#moodModal"
            >
                Mood
            </button>
            <div ref={modalRef} className="modal fade" id="moodModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div ref={headerRef} className="modal-header" style={{ cursor: "grab", userSelect: "none" }}>
                            <h5 className="modal-title">Select Your Mood</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body text-black">
                            <form onSubmit={handleSubmit} method="POST">
                                <p>How are you feeling today?</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {moods.map((m, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`btn ${selectedMood === m ? "btn-success" : "btn-outline-success"}`}
                                            onClick={() => handleMoodSelect(m)}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                                {message && (
                                    <div className={`alert mt-3 ${message.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
                                        {message}
                                    </div>
                                )}
                                <input type="hidden" name="mood" value={selectedMood || ""} />

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-success">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MoodSelector;
