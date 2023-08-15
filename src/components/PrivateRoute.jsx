import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const token = typeof window !== "undefined" && localStorage.getItem("token");

  const isAuthenticated = async () => {
    try {
      await axios.get("/api/auth", { headers: { Authorization: `Bearer ${token}` } });
      setAuthenticated(true);
    } catch (error) {
      if (router.pathname !== "/login") {
        setAuthenticated(false);
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    if (!token && router.pathname !== "/login") {
      setAuthenticated(false);
      router.push("/login");
    } else {
      isAuthenticated();
    }
  }, [token, router]);

  if (router.pathname === "/login") {
    return <>{children}</>; // Render the login page
  }

  return authenticated ? <>{children}</> : null;
};

export default PrivateRoute;
