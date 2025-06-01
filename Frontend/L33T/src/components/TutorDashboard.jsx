import { useState, useEffect } from "react";
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
import { useParams } from "react-router-dom";

function TutorDashboard() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("students");
  const [tutor, setTutor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token")
  console.log(token);
  const uid  = localStorage.getItem("id");
  console.log(uid);
  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const response = await fetch(`https://code4changehackerthon25.onrender.com/users/${uid}`,
           { 
            method: "GET",
           header: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
          }}
        );
        const data = await response.json();
        console.log(data);
        setTutor(data);
      } catch (err) {
        setError("Failed to fetch tutor data.", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorData();
  }, [id]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">{tutor.name}'s Dashboard</h2>
        <nav className="space-y-4">
          {[{ key: "profile", label: "Profile", icon: Users },
            { key: "students", label: "Students", icon: Users },
            { key: "sessions", label: "Upcoming Sessions", icon: Calendar },
            { key: "resources", label: "Resources", icon: BookOpen },
            { key: "messages", label: "Messages", icon: MessageCircle },
            { key: "analytics", label: "Analytics", icon: BarChart },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 p-2 rounded-md w-full transition ${
                activeTab === key
                  ? "bg-white text-blue-700"
                  : "hover:bg-white hover:text-blue-700"
              }`}
            >
              <Icon className={`w-5 h-5 ${activeTab === key ? "stroke-blue-700" : "stroke-white"}`} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1 p-6">
        {activeTab === "profile" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-blue-700">Tutor Profile</h2>
            <p><strong>Name:</strong> {tutor.name}</p>
            <p><strong>Email:</strong> {tutor.email}</p>
            <p><strong>Expertise:</strong> {tutor.expertise}</p>
            <p><strong>Bio:</strong> {tutor.bio}</p>
            <p><strong>Rating:</strong> {tutor.rating || "N/A"}</p>
          </div>
        )}

        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <Users className="w-5 h-5" /> My Students
            </h2>
            <ul className="mt-2 list-disc pl-5">
              {tutor.students?.map((student, index) => (
                <li key={index} className="text-gray-700 flex items-center gap-2">
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
            <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <Calendar className="w-5 h-5" /> Upcoming Sessions
            </h2>
            <ul className="mt-2 list-disc pl-5">
              {tutor.sessions?.map((session, index) => (
                <li key={index} className="text-gray-700 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  {session.date} - {session.topic} ({session.student})
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <BookOpen className="w-5 h-5" /> Resource Library
            </h2>
            <p className="mt-2">Upload guides, share materials, and suggest courses.</p>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <MessageCircle className="w-5 h-5" /> Messages & Feedback
            </h2>
            <p className="mt-2">Stay connected with students via discussions & feedback.</p>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold flex items-center gap-2 text-blue-700">
              <BarChart className="w-5 h-5" /> Performance Analytics
            </h2>
            <p className="mt-2 gap-2 flex">
              <ChartNoAxesCombined className="w-5 h-5" /> Engagement Rate: <strong>92%</strong>
            </p>
            <p className="gap-2 flex mt-2">
              <LandPlot className="w-5 h-5" /> Student Progress Improvements: <strong>80% completion rate</strong>
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default TutorDashboard;
