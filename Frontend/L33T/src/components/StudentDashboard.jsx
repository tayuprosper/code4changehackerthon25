import React, { useState, useEffect } from "react";

export default function StudentDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [activeSection, setActiveSection] = useState("dashboard");
    const [userData, setUserData] = useState(null);
    const [enrolments, setEnrolments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [networkStatus, setNetworkStatus] = useState(navigator.onLine);

    // Enhanced fetch with retry and timeout
    const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal,
                headers: {
                    ...options.headers,
                    "Content-Type": "application/json"
                }
            });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            clearTimeout(timeoutId);
            if (retries > 0) {
                console.log(`Retrying... ${retries} attempts left`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return fetchWithRetry(url, options, retries - 1, delay * 2); // Exponential backoff
            }
            throw err;
        }
    };

    useEffect(() => {
        const handleNetworkChange = () => {
            setNetworkStatus(navigator.onLine);
        };

        window.addEventListener('online', handleNetworkChange);
        window.addEventListener('offline', handleNetworkChange);

        return () => {
            window.removeEventListener('online', handleNetworkChange);
            window.removeEventListener('offline', handleNetworkChange);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                if (!networkStatus) {
                    throw new Error("You are currently offline. Please check your internet connection.");
                }

                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Authentication token not found. Please login again.");
                }

                // Fetch user data
                const userData = await fetchWithRetry(
                    "https://code4changehackerthon25.onrender.com/users/1",
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                setUserData(userData);

                // Fetch enrolments
                const enrolmentsData = await fetchWithRetry(
                    "https://code4changehackerthon25.onrender.com/learners/enrollments",
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                setEnrolments(enrolmentsData);

            } catch (err) {
                console.error("Data fetching error:", err);
                setError(err.message || "Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [networkStatus]);

    const handleSubmitWorkClick = () => {
        setIsMenuOpen(true);
    };

    const closeCurtainMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const getDifficultyBadgeColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case "beginner":
                return "bg-green-100 text-green-800";
            case "intermediate":
                return "bg-yellow-100 text-yellow-800";
            case "advanced":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const renderCourses = () => {
        if (loading) return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
        
        if (error) return (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
        
        if (enrolments.length === 0) return (
            <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No courses enrolled</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
            </div>
        );

        return (
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Course Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Difficulty
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Progress
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {enrolments.map((enrolment, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                                    {enrolment.course?.title || "Untitled Course"}
                                </td>
                                <td className="px-6 py-4 whitespace-normal max-w-xs">
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {enrolment.course?.description || "No description available"}
                                    </p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getDifficultyBadgeColor(enrolment.course?.difficulty)}`}>
                                        {enrolment.course?.difficulty || "Unknown"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        enrolment.status === "Completed"
                                            ? "bg-green-100 text-green-800"
                                            : enrolment.status === "In Progress"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-gray-100 text-gray-800"
                                    }`}>
                                        {enrolment.status || "Not Started"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{ 
                                                    width: `${enrolment.status === "Completed" ? 100 : enrolment.grade || 0}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {enrolment.status === "Completed" ? 100 : enrolment.grade || 0}%
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeSection) {
            case "courses":
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-[#000411] mb-6">My Courses</h2>
                        {renderCourses()}
                    </div>
                );
            case "opportunities":
                return (
                    <div className="bg-[#E1EFE6] p-6 rounded-2xl border border-[#C8D3CD]">
                        <h2 className="text-2xl font-bold mb-4 text-[#000411]">Opportunities</h2>
                        <p className="text-[#646C6F]">Jobs, internships, and NGO projects will appear here.</p>
                    </div>
                );
            case "feedback":
                return (
                    <div className="bg-[#E1EFE6] p-6 rounded-2xl border border-[#C8D3CD]">
                        <h2 className="text-2xl font-bold mb-4 text-[#000411]">Feedback</h2>
                        <p className="text-[#646C6F]">Your feedback and ratings will appear here.</p>
                    </div>
                );
            case "dashboard":
            default:
                return (
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                        <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-[#000411] mb-2">Opportunities</h2>
                            <p className="text-[#646C6F] mb-2">Explore and apply for:</p>
                            <ul className="text-[#646C6F] list-disc list-inside mb-4">
                                <li>Jobs</li>
                                <li>Internships</li>
                                <li>NGO Projects</li>
                            </ul>
                            <button 
                                onClick={() => setActiveSection("opportunities")}
                                className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                            >
                                Browse Opportunities
                            </button>
                        </div>
                        <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-[#000411] mb-2">Courses</h2>
                            <p className="text-[#646C6F] mb-4">View your enrolled courses</p>
                            <button 
                                onClick={() => setActiveSection("courses")}
                                className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                            >
                                View Courses
                            </button>
                        </div>
                        <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-[#000411] mb-2">My Submissions</h2>
                            <p className="text-[#646C6F] mb-4">Submit your project or assignment for expert review</p>
                            <button
                                onClick={handleSubmitWorkClick}
                                className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                            >
                                Submit Work
                            </button>
                        </div>
                        <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-[#000411] mb-2">Feedback</h2>
                            <p className="text-[#646C6F] mb-4">View feedback and ratings on your submitted work</p>
                            <button 
                                onClick={() => setActiveSection("feedback")}
                                className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                            >
                                View Feedback
                            </button>
                        </div>
                    </div>
                );
        }
    };

    if (!userData && loading) {
        return (
            <div className="min-h-screen bg-[#F2F8F4] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-lg font-medium text-gray-500">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error && !userData) {
        return (
            <div className="min-h-screen bg-[#F2F8F4] flex items-center justify-center">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-md">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-medium text-red-800">Error loading dashboard</h3>
                            <div className="mt-2 text-sm text-red-700">
                                <p>{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F2F8F4] flex">
            {/* Sidebar */}
            <div className="w-64 bg-[#0B081D] text-white p-4 flex flex-col">
                <div className="mb-8 p-4">
                    <h1 className="text-xl font-bold">Student Portal</h1>
                    <p className="text-sm text-gray-300">
                        Welcome back, {userData?.full_name || userData?.username || "Student"}!
                    </p>
                </div>
                
                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <button 
                                onClick={() => setActiveSection("dashboard")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "dashboard" ? "bg-[#646C6F]" : ""}`}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Dashboard
                                </div>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveSection("courses")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "courses" ? "bg-[#646C6F]" : ""}`}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    My Courses
                                </div>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveSection("opportunities")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "opportunities" ? "bg-[#646C6F]" : ""}`}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    </div>
                                    Opportunities
                                </button>
                        </li>
                        <li>
                            <button
                                onClick={handleSubmitWorkClick}
                                className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition"
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Submit Work
                                </div>
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveSection("feedback")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "feedback" ? "bg-[#646C6F]" : ""}`}
                            >
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                    Feedback
                                </div>
                            </button>
                        </li>
                    </ul>
                </nav>
                
                <div className="mt-auto p-4">
                    <button className="text-sm hover:text-gray-300 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-[#000411]">
                        Welcome back, {userData?.full_name || userData?.username || "Student"}!
                    </h1>
                    <p className="text-[#646C6F] text-lg">What would you like to do today?</p>
                </header>

                {renderContent()}
            </div>

            {/* Curtain Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 backdrop-blur-sm bg-[#E1EFE6]/90 transition-all duration-300 ease-in-out">
                    <div className="flex justify-end p-6">
                        <button
                            onClick={closeCurtainMenu}
                            className="text-[#000411] text-3xl font-bold hover:text-[#646C6F] transition"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full space-y-8 text-[#000411] text-2xl">
                        <h2 className="font-semibold mb-4">Submit Your Work</h2>
                        <p className="text-lg text-[#646C6F] mb-4">Upload your assignment or project for review.</p>
                        <input
                            type="file"
                            className="bg-white p-2 rounded-xl border border-[#C8D3CD] mb-4"
                        />
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add any comments..."
                            className="bg-white p-4 rounded-xl border border-[#C8D3CD] mb-4 w-80 h-32 text-[#646C6F]"
                        />
                        <button
                            className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                            onClick={closeCurtainMenu}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* Network Status Indicator */}
            {!networkStatus && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                    You are offline. Some features may not work.
                </div>
            )}
        </div>
    );
}