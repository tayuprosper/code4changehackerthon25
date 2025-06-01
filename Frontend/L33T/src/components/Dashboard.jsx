import React from "react";
import {
  CheckCircle,
  BookOpenText,
  BadgeCheck,
  UploadCloud,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import MboaConnectLogo from "./MboaConnectLogo";

export default function Dashboard({ userData, enrolments, loading, error }) {
  const fullName = userData?.full_name || userData?.name || "Student";

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
          Welcome back, {fullName} 👋🏾
        </h1>

        {loading && <p className="text-gray-500 text-lg">Loading...</p>}
        {error && <p className="text-red-500 text-lg">Error: {error}</p>}

        {/* Enrolments */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-800">My Courses</h2>
          {enrolments?.length > 0 ? (
            <ul className="space-y-3">
              {enrolments.map((course) => (
                <li
                  key={course.id}
                  className="bg-blue-50 p-4 rounded-lg shadow-sm border"
                >
                  <p className="font-semibold text-blue-700">
                    {course.course_title}
                  </p>
                  <p className="text-sm text-gray-600">
                    Difficulty: {course.difficulty}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No enrolled courses yet.</p>
          )}
        </section>
      </main>
    </div>
  );
}
