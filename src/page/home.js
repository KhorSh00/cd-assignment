import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import MoodSelector from "../component/moodSelector";
import axios from "axios";

const Home = () => {
    const { isLoggedIn } = useAuth();
    const [selectedMood, setSelectedMood] = useState("");
    const userEmail = localStorage.getItem("userEmail");

    const fetchMood = async () => {
        if (!userEmail) return;

        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get-mood/", {
                params: { userEmail },
            });
            setSelectedMood(response.data.mood || "No mood set");
        } catch (err) {
            console.error("Error fetching mood:", err);
        }
    };

    useEffect(() => {
        fetchMood();
    }, [userEmail]); 

    const handleMoodSelect = async (mood) => {
        if (!userEmail || !mood) return;

        try {
            await axios.post("http://127.0.0.1:8000/api/update-mood/", {
                userEmail: userEmail,
                mood: mood,
            });

            fetchMood(); 
        } catch (error) {
            console.error("Error updating mood:", error);
        }
    };
    

    return (
        <>
            <section class="hero-section">
                <div class="container">
                    {isLoggedIn ? (
                        <>
                            <div className="welcome-banner">
                                <h1 className="welcome-text">🌿 Welcome</h1>
                                <p className="sub-text">Stay mindful and track your emotions daily.</p>

                                {selectedMood && (
                                    <div className="mood-display">
                                        <p>✨ Your Current Mood: <strong>{selectedMood}</strong></p>
                                    </div>
                                )}
                            </div>
                            <MoodSelector onSelectMood={handleMoodSelect} isLoggedIn={isLoggedIn} />

                        </>
                    ) : (
                        <>
                            <h1 class="welcome-text">Welcome to ZenLife</h1>
                            <p class="welcome-text">Your journey to mental wellness starts here. Discover peace, balance, and happiness with our AI-powered tools and supportive community.</p>
                            <Link to="/signup" class="btn btn-success btn-lg">Get Started</Link>
                        </>
                    )}
                </div>
            </section>
            <section class="features-section">
                <div class="container">
                    <div class="row">
                        <div class="col-md-3">
                            <div class="feature-card">
                                <i class="fas fa-smile"></i>
                                <h3>Mood Tracker</h3>
                                <p>Track your emotions daily and gain insights into your mental well-being.</p>
                                {isLoggedIn ? (
                                    <></>
                                ) : (
                                    <><Link to="/signup" class="btn btn-outline-success">Try It Now</Link></>
                                )}
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="feature-card">
                                <i class="fas fa-quote-left"></i>
                                <h3>Daily Confidence Quotes</h3>
                                <p>Get personalized, uplifting quotes powered by AI to boost your confidence.</p>
                                {isLoggedIn ? (
                                    <></>
                                ) : (
                                    <><Link to="/signup" class="btn btn-outline-success">Get Inspired</Link></>
                                )}
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="feature-card">
                                <i class="fas fa-users"></i>
                                <h3>Community Forum</h3>
                                <p>Connect with others, share experiences, and find support in our friendly community.</p>
                                {isLoggedIn ? (
                                    <></>
                                ) : (
                                    <><Link to="/signup" class="btn btn-outline-success">Join the Community</Link></>
                                )}
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="feature-card">
                                <i class="fas fa-music"></i>
                                <h3>AI Music Recommendations</h3>
                                <p>Discover calming and uplifting music tailored to your mood.</p>
                                {isLoggedIn ? (
                                    <></>
                                ) : (
                                    <><Link to="/signup" class="btn btn-outline-success">Listen Now</Link></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="testimonials-section bg-light py-5">
                <div class="container">
                    <h2 class="text-center mb-4">What Our Users Say</h2>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="testimonial-card p-4 shadow-sm">
                                <p>"ZenLife has helped me understand my emotions better. The mood tracker is a game-changer!"</p>
                                <p class="text-muted">- Sarah L.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="testimonial-card p-4 shadow-sm">
                                <p>"The daily quotes always brighten my day. It's like having a personal cheerleader!"</p>
                                <p class="text-muted">- John D.</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="testimonial-card p-4 shadow-sm">
                                <p>"The music recommendations are spot on. They help me relax and focus."</p>
                                <p class="text-muted">- Emily R.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="cta-section text-white py-5" style={{ backgroundColor: "#11a974" }}>
                <div class="container text-center">
                    <h2>Ready to Start Your Journey?</h2>
                    <p class="lead">Join ZenLife today and take the first step towards a healthier, happier you.</p>
                    {isLoggedIn ? (
                        <></>
                    ) : (
                        <><Link to="/signup" class="btn btn-light btn-lg">Sign Up Now</Link></>
                    )}
                </div>
            </section>
            <footer class="footer">
                <div class="container">
                    <p>&copy; 2024 ZenLife. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}

export default Home;