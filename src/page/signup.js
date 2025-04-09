import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import FloatingAlert from "../component/alert";

const Signup = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        userEmail: "",
        userPassword: "",
        confirm_password: "",
        gender: "",

    });

    const [errors, setErrors] = useState({}); {/*set error*/ }
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const { username, userEmail, userPassword, confirm_password, gender } = formData; {/*set value*/ }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); {/*clear all */ }
    };

    const validation = () => {
        let newErrors = {};
        let isValid = true;

        if (!username) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        if (!userEmail) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
            newErrors.email = "Invalid Email Address";
            isValid = false;
        }

        if (!userPassword) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (userPassword.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        if (!confirm_password) {
            newErrors.confirm_password = "Please confirm your password";
        } else if (userPassword !== confirm_password) {
            newErrors.confirm_password = "Passwords do not match";
            isValid = false;
        }

        if (!gender) {
            newErrors.gender = "Gender is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validation()) return;

        let dataToSend = { ...formData };
        delete dataToSend.confirm_password;

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData)
            if (response.data.success) {
                setAlertMessage("Account Created Successfully!");
                setShowAlert(true);
                setFormData({
                    username: "",
                    userEmail: "",
                    userPassword: "",
                    confirm_password: "",
                    gender: ""
                });

                await login(userEmail, userPassword);
                localStorage.removeItem("selectedMood");
                navigate("/");
            }
        } catch (err) {
            setAlertMessage(err.response.data.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="container sign-up-form" style={{ maxWidth: "800px" }}>
            {showAlert && <FloatingAlert message={alertMessage} onClose={() => setShowAlert(false)} />}
            <h2 className="text-center mb-4">🌿 Create Your ZenLife Account</h2>
            <form method="POST" onSubmit={handleSubmit} className="shadow p-4 rounded">
                <div className="mb-3">
                    <label>Username:</label>{errors.username && <span className="text-danger">{errors.username}</span>}
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                        placeholder="Enter your username"
                    />
                </div>
                <div className="mb-3">
                    <label>Email:</label>{errors.email && <span className="text-danger">{errors.email}</span>}
                    <input
                        type="email"
                        className="form-control"
                        name="userEmail"
                        onChange={handleChange}
                        placeholder="john@gmail.com"
                    />
                </div>
                <div className="mb-3 row">
                    <div className="col-md-6">
                        <label>Password:</label> {errors.password && <span className="text-danger">{errors.password}</span>}
                        <input
                            type="password"
                            className="form-control"
                            name="userPassword"
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="col-md-6">
                        <label>Confirm Password:</label> {errors.confirm_password && <span className="text-danger">{errors.confirm_password}</span>}
                        <input
                            type="password"
                            className="form-control"
                            name="confirm_password"
                            onChange={handleChange}
                            placeholder="Confirm password"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label>Gender:</label>{errors.gender && <span className="text-danger">{errors.gender}</span>}
                    <select
                        className="form-control"
                        name="gender"
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success w-100">
                    Sign Up
                </button>
            </form>
        </div>



    );

};
export default Signup;