import React, { useEffect, useState } from "react";
import Card from "../Common/Card";

const ListingsSection = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      // const user = JSON.parse(localStorage.getItem("user"));
      // if (!user || !user.id) {
      //   console.error("Invalid user data in localStorage");
      //   setLoading(false);
      //   return;
      // }

      const endpoint = `https://code4changehackerthon25.onrender.com/users/1`;

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const userData = await response.json();
        setData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white text-black">
        <div className="text-center text-lg font-medium text-gray-500">Loading dashboard...</div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16 bg-white text-black">
        <div className="text-center text-lg font-medium text-red-500">Failed to load user data.</div>
      </section>
    );
  }

  const titleMap = {
    tutor: "Your Courses",
    learner: "Enrolled Courses",
    organization: "Published Courses",
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white text-black">
      <h2 className="text-center text-black text-3xl font-bold mb-16 uppercase tracking-wide">
        {titleMap[data.role] || "Courses"}
      </h2>

      {data.courses && data.courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {data.courses.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              description={course.description}
              buttonText="View Course"
              buttonClass="mt-4 inline-block bg-white text-black border border-black hover:bg-black hover:text-white font-medium py-2 px-4 rounded-xl transition"
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-lg font-medium text-gray-500">No courses found.</div>
      )}
    </section>
  );
};

export default ListingsSection;
