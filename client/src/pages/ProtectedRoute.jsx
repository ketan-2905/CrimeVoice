import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import apiClient from "../apiClient";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await apiClient
        .get("/auth/verify", {
          withCredentials: true, // 🧠 Important: sends cookies!
        })
        .then((res) => {
          if (res.data.valid) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        })
        .catch(() => setAuthorized(false))
        .finally(() => setLoading(false));
      // do something with data
    };
    fetchData();
  }, []);

  if (loading) return <p>Checking login...</p>;

  if (!authorized) return <Navigate to="/login" replace />;

  return children;
}
