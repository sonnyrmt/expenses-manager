import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const isLoginPath = router.pathname === "/login" ? true : false;

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

  if (authenticated) {
    return (
      <AuthContext.Provider value={{ authenticated, logout, userData, setUserData }}>{children}</AuthContext.Provider>
    );
  } else if (isLoginPath) {
    return <AuthContext.Provider value={{ authenticated, logout, userData }}>{children}</AuthContext.Provider>;
  }
};
