import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  const login = (data) => {
    setUserData(data);
    setAuthenticated(true);
  };

  const logout = () => {
    router.push("/login");
    setAuthenticated(false);
  };

  const isAuthenticated = async (token) => {
    try {
      const { data } = await axios.get("/api/auth", {
        headers: { Authorization: `Bearer ${token}` },
      });
      login(data);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    if (token) {
      isAuthenticated(token);
    } else {
      logout();
    }
  }, []);

  return <AuthContext.Provider value={{ authenticated, login, logout, userData }}>{children}</AuthContext.Provider>;
};
