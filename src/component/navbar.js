import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import FloatingAlert from "./alert";

function NavBar() {
    const { isLoggedIn, logout, alertMessage, setAlertMessage } = useAuth();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setAlertMessage("Please Fill In All Fields");
            return;
        }
        try {
            await login(email, password);
            navigate("/");
        }catch(err){
            setAlertMessage(err.response.data.message);
        }
    

    };

    const handleLogout = () => {
        logout();
        setEmail("");
        setPassword("");
        navigate("/");
    };

    return (
        <>
            {alertMessage && (
                <FloatingAlert
                    message={alertMessage}
                    onClose={() => setAlertMessage("")}
                />
            )}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold fs-4 d-flex align-items-center" to="/">
                        <span className="me-2">🌿</span>ZenLife
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link d-flex align-items-center" to="/">
                                            <span className="me-1">🏠</span>Home
                                        </Link>
                                    </li>

                                    <li className="nav-item mx-2">
                                        <Link className="nav-link d-flex align-items-center" to="/mood">
                                            <span className="me-1">📊</span>Mood Tracker
                                        </Link>
                                    </li>

                                    <li className="nav-item mx-2">
                                        <Link className="nav-link d-flex align-items-center" to="/community">
                                            <span className="me-1">👥</span>Community
                                        </Link>
                                    </li>

                                    <li className="nav-item mx-2">
                                        <Link className="nav-link d-flex align-items-center" to="/support">
                                            <span className="me-1">📞</span>Support
                                        </Link>
                                    </li>

                                    <li className="nav-item mx-2">
                                        <Link className="nav-link d-flex align-items-center" to="/music">
                                            <span className="me-1">🎵</span>Music
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown mx-2">
                                        <button
                                            className="nav-link dropdown-toggle d-flex align-items-center"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ background: "none", border: "none" }}
                                        >
                                            <span className="me-1">👤</span>Account
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                                            <li>
                                                <Link className="dropdown-item d-flex align-items-center" to="/profile">
                                                    <span className="me-2">👤</span>Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li>
                                                <button onClick={handleLogout} className="dropdown-item text-danger d-flex align-items-center" to="/logout">
                                                    <span className="me-2">🔒</span>Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </li>

                                </>) : (
                                <>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link" to="/about">🌟 About Us</Link>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <Link className="nav-link" to="/feature">💡 Features</Link>
                                    </li>
                                    <li className="nav-item dropdown mx-2">
                                        <button
                                            className="nav-link dropdown-toggle d-flex align-items-center"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            style={{ background: "none", border: "none" }}
                                        >
                                            <span className="me-1">🔑</span> Login
                                        </button>
                                        <div className="dropdown-menu dropdown-menu-end p-4 shadow-lg" style={{ width: "300px" }}>
                                            <form method="POST" onSubmit={handleLogin}>
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="email@example.com"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="password" className="form-label">
                                                        Password
                                                    </label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-outline-success w-100">
                                                    Login
                                                </button>
                                                <Link className="btn btn-outline-dark w-100 mt-2" to="/signup">Sign Up</Link>
                                            </form>
                                        </div>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default NavBar;