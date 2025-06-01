import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  BookOpenText,
  BadgeCheck,
  UploadCloud,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import MboaConnectLogo from "./MboaConnectLogo";

const Dashboard = () => {
  const [gigsCompleted, setGigsCompleted] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [latestGigs, setLatestGigs] = useState([]);

  useEffect(() => {
    setGigsCompleted(12);
    setTotalEarnings(43000);
    setRatings(4.6);
    setLatestGigs([
      {
        id: 1,
        title: "Data Entry for Research Project",
        status: "Pending",
        amount: 5000,
      },
      {
        id: 2,
        title: "Social Media Flyer Design",
        status: "Submitted",
        amount: 8000,
      },
      {
        id: 3,
        title: "Tutoring Mathematics - Form 3",
        status: "Approved",
        amount: 10000,
      },
    ]);
  }, []);

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
      if (userData.role == "tutor"){
        localStorage.setItem("id", userData.id);
        navigate("/tutor-dashboard")
      }
      console.log("User data response:", userData); // Debug log
      setUserData(userData);

      // Fetch enrolments
      const enrolmentsResponse = await fetch(
        `https://code4changehackerthon25.onrender.com/enrollments`,
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
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-r border-blue-100 min-h-screen p-6 flex flex-col shadow-sm">
        <div className="mb-10">
          <Link to="/" className="inline-block">
            <MboaConnectLogo />
          </Link>
        </div>
        <nav className="flex flex-col gap-3 text-blue-700 font-semibold text-base">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <CheckCircle className="w-5 h-5 text-blue-500" /> Dashboard
          </Link>
          <Link
            to="/my-gigs"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <BookOpenText className="w-5 h-5 text-blue-500" /> My Gigs
          </Link>
          <Link
            to="/earnings"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <BadgeCheck className="w-5 h-5 text-blue-500" /> Earnings
          </Link>
          <Link
            to="/submit-work"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <UploadCloud className="w-5 h-5 text-blue-500" /> Submit Work
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <BookOpenText className="w-5 h-5 text-blue-500" /> Settings
          </Link>
          <Link
            to="/logout"
            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-blue-100 rounded-md px-3 py-2 transition mt-auto"
          >
            <LogOut className="w-5 h-5" /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-10">
        <h1 className="text-3xl font-extrabold text-blue-800">
          Welcome back, Nyells 👋🏾
        </h1>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-6 flex items-center gap-5">
            <CheckCircle className="text-blue-500 w-7 h-7" />
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
                Gigs Completed
              </p>
              <p className="text-2xl font-extrabold text-blue-800">
                {gigsCompleted}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-6 flex items-center gap-5">
            <BadgeCheck className="text-blue-500 w-7 h-7" />
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
                Total Earnings
              </p>
              <p className="text-2xl font-extrabold text-blue-800">
                FCFA {totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-6 flex items-center gap-5">
            <BookOpenText className="text-blue-500 w-7 h-7" />
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
                Avg. Rating
              </p>
              <p className="text-2xl font-extrabold text-blue-800">
                {ratings} ⭐
              </p>
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
        <nav className="flex flex-col gap-3 text-blue-700 font-semibold text-base">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <CheckCircle className="w-5 h-5 text-blue-500" /> Dashboard
          </Link>
          <Link
            to="/my-gigs"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <BookOpenText className="w-5 h-5 text-blue-500" /> My Gigs
          </Link>
          <Link
            to="/earnings"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <BadgeCheck className="w-5 h-5 text-blue-500" /> Earnings
          </Link>
          <Link
            to="/submit-work"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <UploadCloud className="w-5 h-5 text-blue-500" /> Submit Work
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 text-blue-700 hover:bg-blue-100 rounded-md px-3 py-2 transition"
          >
            <BookOpenText className="w-5 h-5 text-blue-500" /> Settings
          </Link>
          <Link
            to="/logout"
            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-blue-100 rounded-md px-3 py-2 transition mt-auto"
          >
            <LogOut className="w-5 h-5" /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 space-y-10">
        <h1 className="text-3xl font-extrabold text-blue-800">
          Welcome back, Nyells 👋🏾
        </h1>

        {/* Stats Overview */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-6 flex items-center gap-5">
            <CheckCircle className="text-blue-500 w-7 h-7" />
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
                Gigs Completed
              </p>
              <p className="text-2xl font-extrabold text-blue-800">
                {gigsCompleted}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-6 flex items-center gap-5">
            <BadgeCheck className="text-blue-500 w-7 h-7" />
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
                Total Earnings
              </p>
              <p className="text-2xl font-extrabold text-blue-800">
                FCFA {totalEarnings.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-6 flex items-center gap-5">
            <BookOpenText className="text-blue-500 w-7 h-7" />
            <div>
              <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
                Avg. Rating
              </p>
              <p className="text-2xl font-extrabold text-blue-800">
                {ratings} ⭐
              </p>
            </div>
          </div>
        </section>

        {/* Latest Gigs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-blue-800">Latest Gigs</h2>
          <div className="space-y-4">
            {latestGigs.map((gig) => (
              <article
                key={gig.id}
                className="card bg-base-100 border border-blue-100 shadow-sm hover:shadow-md p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-blue-700">
                    {gig.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${
                      gig.status === "Approved"
                        ? "text-success"
                        : gig.status === "Submitted"
                        ? "text-warning"
                        : "text-info"
                    }`}
                  >
                    Status: {gig.status}
                  </p>
                </div>
                <div className="mt-3 sm:mt-0 text-blue-700 font-semibold text-right">
                  <p className="text-sm text-blue-400">Earned</p>
                  <p className="text-xl">FCFA {gig.amount.toLocaleString()}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Submit Work */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-800">
            Submit Your Work
          </h2>
          <form className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <input
              type="file"
              className="file-input file-input-bordered file-input-primary w-full max-w-xs"
              required
            />
            <button
              type="submit"
              className="btn btn-primary flex items-center gap-2"
            >
              <UploadCloud className="w-5 h-5" /> Submit
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
