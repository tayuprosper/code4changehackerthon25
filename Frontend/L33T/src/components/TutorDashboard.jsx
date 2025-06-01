import { useState } from "react";
import {
  Users,
  Calendar,
  BarChart,
  BookOpen,
  MessageCircle,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  ChartNoAxesCombined,
  LandPlot,
} from "lucide-react";

function TutorDashboard() {
  const [activeTab, setActiveTab] = useState("students"); // ✅ Default active tab

  const tutor = {
    name: "Jane Doe",
    expertise: "Software Engineering | Web Development",
    students: [
      {
        name: "John Smith",
        progress: "Completed 4/6 modules",
        status: "Active",
      },
      {
        name: "Emily Johnson",
        progress: "Completed 2/6 modules",
        status: "Needs Guidance",
      },
    ],
    sessions: [
      { date: "June 10", topic: "React Fundamentals", student: "John Smith" },
      { date: "June 12", topic: "API Integration", student: "Emily Johnson" },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#] text-[#ffffff] p-6">
        <h2 className="text-xl font-bold mb-6">{tutor.name}'s Dashboard</h2>
        <nav className="space-y-4">
          {[
            { key: "students", label: "Students", icon: Users },
            { key: "sessions", label: "Upcoming Sessions", icon: Calendar },
            { key: "resources", label: "Resources", icon: BookOpen },
            {
              key: "messages",
              label: "Messages & Feedback",
              icon: MessageCircle,
            },
            { key: "analytics", label: "Analytics", icon: BarChart },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 p-2 rounded-md w-full transition ${
                activeTab === key
                  ? "bg-white text-[#0B081D]"
                  : "hover:bg-[#ffffff] hover:text-[#0B081D]"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition ${
                  activeTab === key ? "stroke-[#0B081D]" : "hover:stroke-[#ffffff]"
                }`}
              />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Dashboard Content (Dynamically Updates Based on Active Tab) */}
      <main className="flex-1 p-6">
        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0B081D]" /> My Students
            </h2>
            <ul className="mt-2 list-disc pl-5">
              {tutor.students.map((student, index) => (
                <li
                  key={index}
                  className="text-gray-700 flex items-center gap-2"
                >
                  {student.status === "Active" ? (
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  ) : (
                    <AlertCircle className="text-red-500 w-4 h-4" />
                  )}
                  {student.name} - {student.progress}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "sessions" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#0B081D]" /> Upcoming Sessions
            </h2>
            <ul className="mt-2 list-disc pl-5">
              {tutor.sessions.map((session, index) => (
                <li
                  key={index}
                  className="text-gray-700 flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  {session.date} - {session.topic} ({session.student})
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0B081D]" /> Resource Library
            </h2>
            <p className="mt-2">
              Upload guides, share materials, and suggest courses.
            </p>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#0B081D]" /> Messages &
              Feedback
            </h2>
            <p className="mt-2">
              Stay connected with students via discussions & feedback.
            </p>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <BarChart className="w-5 h-5 text-[#0B081D]" /> Performance
              Analytics
            </h2>
            <p className="mt-2 gap-2 flex">
              <ChartNoAxesCombined className="w-5 h-5" /> Engagement Rate:{" "}
              <strong>92%</strong>
            </p>
            <p className="gap-2 flex mt-2">
              <LandPlot className="w-5 h-5" /> Student Progress Improvements:{" "}
              <strong>80% completion rate</strong>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default TutorDashboard;
