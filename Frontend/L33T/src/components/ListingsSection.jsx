import React, { useEffect, useState } from "react";
import Card from "../Common/Card";

const ListingsSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("https://code4changehackerthon25.onrender.com/courses");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white text-black">
      <h2 className="text-center text-black text-3xl font-bold mb-16 uppercase tracking-wide">
        Explore Courses
      </h2>

      {loading ? (
        <div className="text-center text-lg font-medium text-gray-500">Loading courses...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              title={course.title}
              description={course.description}
              buttonText="Enroll"
              buttonClass="mt-4 inline-block bg-white text-black border border-black hover:bg-black hover:text-white font-medium py-2 px-4 rounded-xl transition"
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ListingsSection;
