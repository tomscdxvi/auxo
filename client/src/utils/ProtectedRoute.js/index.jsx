import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProtectedRoute() {
  const [cookies] = useCookies(["jwt"]);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Make a request to the protected route (/home) to check authentication
        const response = await axios.get("http://localhost:5000/home", {
          withCredentials: true, // Ensure the cookie is sent with the request
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If authentication fails (401 or 403), set isAuthenticated to false
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [cookies.jwt]); // Only re-run when the JWT cookie changes

  // Loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
