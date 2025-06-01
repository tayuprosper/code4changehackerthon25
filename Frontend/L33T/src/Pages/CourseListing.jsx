import React, { useState, useEffect } from 'react';

const CourseCard = ({ title, description, difficulty, id }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-200">
            <div>
                <h2 className="font-bold text-lg mb-2 text-gray-800">{title || "Untitled Course"}</h2>
                <div className="flex items-center mb-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        difficulty === "Beginner" ? "bg-blue-100 text-blue-800" :
                        difficulty === "Intermediate" ? "bg-blue-200 text-blue-800" :
                        difficulty === "Advanced" ? "bg-blue-300 text-blue-900" :
                        "bg-gray-100 text-gray-800"
                    }`}>
                        {difficulty || "Unknown Level"}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {description || "No description available"}
                </p>
            </div>
            <div className="mt-auto">
                <button className="w-full bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
                    View Details
                </button>
            </div>
        </div>
    );
};

const CourseListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('https://code4changehackerthon25.onrender.com/courses/');
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch courses: ${response.status}`);
                }
                
                const data = await response.json();
                
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected data format from API");
                }
                
                setCourses(data);
                
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => {
        const searchLower = searchTerm.toLowerCase();
        return (
            (course.title && course.title.toLowerCase().includes(searchLower)) ||
            (course.description && course.description.toLowerCase().includes(searchLower))
        );
    });

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-lg text-gray-700">Loading courses...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-md mx-auto">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-800">{error}</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
                <h2 className="text-3xl font-bold text-gray-800">
                    Available Courses
                </h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                    <CourseCard 
                        key={course.id} 
                        title={course.title}
                        description={course.description}
                        difficulty={course.difficulty}
                        id={course.id}
                    />
                ))}
                
                {filteredCourses.length === 0 && !loading && (
                    <div className="col-span-full text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-700">
                            {searchTerm ? "No matching courses found" : "No courses available"}
                        </h3>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CourseListing;