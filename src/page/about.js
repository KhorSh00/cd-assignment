import React, { useState } from "react";
import mentalImage from "../img/mental-health.jpg"

const About = () => {

    return (
        <>
            <section className="mt-5 text-white text-center py-5" style={{ backgroundColor: "#11a974" }}>
                <div className="container">
                    <h1 className="display-4">About ZenLife</h1>
                    <p className="lead">Your companion in mental wellness, personal growth, and positivity.</p>
                </div>
            </section>

            <section className="about-content py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 about-pic"><img src={mentalImage}></img></div>
                        <div className="col-lg-6 justify-text">
                            <h2>Our Mission</h2>
                            <p>
                                At ZenLife, we believe that mental well-being is the foundation of a fulfilling and balanced life.
                                In today’s fast-paced world, stress, anxiety, and emotional struggles can often feel overwhelming.
                                That’s why we’ve created an AI-powered platform designed to empower you with the right tools to understand your emotions,
                                build resilience, and foster a sense of inner peace.
                            </p>
                            <p>
                                Our mission is to help you navigate your mental health journey with ease. Through our advanced mood-tracking technology,
                                personalized daily confidence-boosting quotes, and calming AI-curated music, we strive to make self-care an accessible and enjoyable experience.
                                More than just a tool, ZenLife is a community—a safe space where you can connect with others, share experiences, and find encouragement from those who truly understand.
                            </p>
                            <p>
                                Whether you're looking for emotional support, stress management techniques, or simple ways to introduce mindfulness into your routine,
                                ZenLife is here to walk with you every step of the way. Together, we can create a healthier, happier, and more mindful world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-features bg-light py-5">
                <div className="container text-center">
                    <h2>Why Choose ZenLife?</h2>
                    <div className="row mt-4">
                        <div className="col-md-4">
                            <div className="p-4 border rounded shadow-sm">
                                <i className="fas fa-brain fa-3x text-success mb-3"></i>
                                <h4>AI-Powered Insights</h4>
                                <p>Track your emotions and receive personalized well-being suggestions.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 border rounded shadow-sm">
                                <i className="fas fa-users fa-3x text-success mb-3"></i>
                                <h4>Supportive Community</h4>
                                <p>Connect with like-minded individuals who understand and support your journey.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="p-4 border rounded shadow-sm">
                                <i className="fas fa-music fa-3x text-success mb-3"></i>
                                <h4>Calming Music</h4>
                                <p>Listen to AI-recommended music to relax, focus, and uplift your mood.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-cta py-5 text-center text-white" style={{ backgroundColor: "#11a974" }}>
                <div className="container">
                    <h2>Join ZenLife Today</h2>
                    <p className="lead">Take control of your mental well-being and start your journey towards a happier, healthier life.</p>
                    <a href="/signup" className="btn btn-light btn-lg">Get Started</a>
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

export default About;