import { useState } from "react";
import {
  Users,
  Calendar,
  BarChart,
  BookOpen,
  MessageCircle,
} from "lucide-react";

function MentorDashboard() {
  const [mentor] = useState({
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
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="bg-[#0B081D] text-white p-6 rounded-md shadow-md flex justify-between">
        <h1 className="text-2xl font-bold">{mentor.name} - Mentor Dashboard</h1>
        <p className="italic">{mentor.expertise}</p>
      </header>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-[#0B081D]" /> My Students
          </h2>
          <ul className="mt-2 list-disc pl-5">
            {mentor.students.map((student, index) => (
              <li key={index} className="text-gray-700">
                {student.name} - {student.progress} ({student.status})
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0B081D]" /> Upcoming Sessions
          </h2>
          <ul className="mt-2 list-disc pl-5">
            {mentor.sessions.map((session, index) => (
              <li key={index} className="text-gray-700">
                📅 {session.date} - {session.topic} ({session.student})
              </li>
            ))}
          </ul>
        </div>

        {/* Resource Library */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0B081D]" /> Resource Library
          </h2>
          <p className="mt-2">
            📚 Upload guides, share materials, and suggest courses.
          </p>
        </div>

        {/* Messaging & Feedback */}
        <div className="bg-white p-6 rounded-md shadow-md col-span-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#0B081D]" /> Messages &
            Feedback
          </h2>
          <p className="mt-2">
            label
            Stay connected with students via discussions & feedback.
          </p>
        </div>

        {/* Analytics */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BarChart className="w-5 h-5 text-[#0B081D]" /> Performance
            Analytics
          </h2>
          <p className="mt-2">
            📈 **Engagement Rate:** <strong>92%</strong>
          </p>
          <p>
            🎯 **Student Progress Improvements:**{" "}
            <strong>80% completion rate</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MentorDashboard;
