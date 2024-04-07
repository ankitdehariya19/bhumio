import {  useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import BASE_URL from '../config';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false) ;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const token = data.data.token;

      if (!token) {
        throw new Error("Token not found in response");
      }

      localStorage.setItem("token", token);
      setUser({ username });
      setError(null);
      setAuthenticated(true)
      setLoading(false);
      window.location.href ='/'
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  const logout = () => {
    console.log("logout")
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("token");
    window.location.href ='/login'
  };

  return {
    user,
    error,
    login,
    logout,
    authenticated,loading
  };
};

export default useAuth;
