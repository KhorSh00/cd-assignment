import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);  
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        userEmail:email,
        userPassword:password,
      });

      if (response.data.success) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("userEmail", email);
        setIsLoggedIn(true);
        setAlertMessage("Login Successful");
      }
    } catch (error) {
      setAlertMessage(error.response.data.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("selectedMood");
    setAlertMessage("Successfully logged out!");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout , alertMessage, setAlertMessage}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
