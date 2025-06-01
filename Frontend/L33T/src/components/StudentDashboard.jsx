import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
    // ... (keep all existing state declarations)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [activeSection, setActiveSection] = useState("dashboard");
    const [userData, setUserData] = useState(null);
    const [enrolments, setEnrolments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate = useNavigate()
    
    
    useEffect(() => {
  const fetchData = async () => {
    
      setLoading(true);
      setError(null);
    //   navigate = useNavigate();
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("uid");
      
      // Debug logs
      console.log("Token from localStorage:", token);
      console.log("UID from localStorage:", uid);

      if (!token) {
            navigate("/login")
            
      }

      // Fetch user data
      const userResponse = await fetch(
        `https://code4changehackerthon25.onrender.com/me`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      if (!userResponse.ok) {
        if (userResponse.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
          return;
        }
        throw new Error(`Failed to fetch user data: ${userResponse.status}`);
      }
      
      const userData = await userResponse.json();
      console.log("User data response:", userData); // Debug log
      setUserData(userData);

      // Fetch enrolments
      const enrolmentsResponse = await fetch(
        `https://code4changehackerthon25.onrender.com/learners/enrollments`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      
      if (!enrolmentsResponse.ok) {
        throw new Error(`Failed to fetch enrolments: ${enrolmentsResponse.status}`);
      }
      
      const enrolmentsData = await enrolmentsResponse.json();
      console.log("Enrolments response:", enrolmentsData); // Debug log
      setEnrolments(enrolmentsData);
      setLoading(false);
    }

  fetchData();
}, []);

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
        if (loading) return <div className="text-center text-lg font-medium text-gray-500">Loading courses...</div>;
        if (error) return <div className="text-center text-lg font-medium text-red-500">Error: {error}</div>;
        if (enrolments.length === 0) return <div className="text-center text-lg font-medium text-gray-500">You haven't enrolled in any courses yet.</div>;

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
                return renderCourses();
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
                <div className="text-center text-lg font-medium text-gray-500">
                    Loading dashboard...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#F2F8F4] flex items-center justify-center">
                <div className="text-center text-lg font-medium text-red-500">
                    Error: {error}
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
                    <p className="text-sm text-gray-300">Welcome back, {userData?.full_name || userData?.name || "Student"}!</p>
                </div>
                
                <nav className="flex-1">
                    <ul className="space-y-2">
                        <li>
                            <button 
                                onClick={() => setActiveSection("dashboard")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "dashboard" ? "bg-[#646C6F]" : ""}`}
                            >
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveSection("courses")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "courses" ? "bg-[#646C6F]" : ""}`}
                            >
                                My Courses
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveSection("opportunities")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "opportunities" ? "bg-[#646C6F]" : ""}`}
                            >
                                Opportunities
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleSubmitWorkClick}
                                className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition"
                            >
                                Submit Work
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={() => setActiveSection("feedback")}
                                className={`w-full text-left px-4 py-2 rounded-lg hover:bg-[#646C6F] transition ${activeSection === "feedback" ? "bg-[#646C6F]" : ""}`}
                            >
                                Feedback
                            </button>
                        </li>
                    </ul>
                </nav>
                
                <div className="mt-auto p-4">
                    <button className="text-sm hover:text-gray-300">Logout</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-[#000411]">
                        Welcome back, {userData?.full_name || userData?.name || "Student"}!
                    </h1>
                    <p className="text-[#646C6F] text-lg">What would you like to do today?</p>
                </header>

                {renderContent()}
            </div>

            {/* Curtain Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-50 backdrop-blur-sm bg-[#E1EFE6]/90 transition-all duration-300 ease-in-out transform"
                    style={{ transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)" }}
                >
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
        </div>
    );
}