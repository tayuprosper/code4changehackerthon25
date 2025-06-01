import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard"; // 👈🏾 Import the clean UI component

export default function StudentDashboard() {
  const [userData, setUserData] = useState(null);
  const [enrolments, setEnrolments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      if (!token) {
        return navigate("/login");
      }

      try {
        const userResponse = await fetch(
          `https://code4changehackerthon25.onrender.com/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!userResponse.ok) {
          if (userResponse.status === 401) {
            localStorage.clear();
            return navigate("/login");
          }
          throw new Error(`Failed to fetch user data`);
        }

        const userData = await userResponse.json();
        if (userData.role === "tutor") {
          localStorage.setItem("id", userData.id);
          return navigate("/tutor-dashboard");
        }

        setUserData(userData);

        const enrolmentsResponse = await fetch(
          `https://code4changehackerthon25.onrender.com/enrollments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!enrolmentsResponse.ok) {
          throw new Error(`Failed to fetch enrolments`);
        }

        const enrolmentsData = await enrolmentsResponse.json();
        setEnrolments(enrolmentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <Dashboard
      userData={userData}
      enrolments={enrolments}
      loading={loading}
      error={error}
    />
  );
}
