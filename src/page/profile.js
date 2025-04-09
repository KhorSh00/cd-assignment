import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const userEmail = localStorage.getItem("userEmail"); //get userEmail from session(localStorage)
    const accessToken = localStorage.getItem("access");

    useEffect(() => {
        if (userEmail) {
            axios.get(`http://127.0.0.1:8000/api/user/email/${userEmail}/`)

                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    setError("User not found");
                    console.error(error);
                });
        }

    }, [userEmail]);

    if (!userEmail) return <p>Please log in first.</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>Loading...</p>;


    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="container w-75">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Profile</h2>

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong> Username:</strong> {user.username}</li>
                                <li className="list-group-item"><strong> Email:</strong> {user.userEmail}</li>
                                <li className="list-group-item"><strong> Gender:</strong> {user.gender}</li>
                                <li className="list-group-item"><strong> Current Mood:</strong> {user.mood || "Not set"}</li>
                            </ul>

                            <div className="text-center mt-4">
                                <button className="btn btn-success m-2">Edit Profile</button>
                                <button className="btn btn-outline-danger m-2">Delete Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );

}

export default Profile;