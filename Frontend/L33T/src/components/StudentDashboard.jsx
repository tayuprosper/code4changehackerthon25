import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GraduationCap,
  Calendar,
  BookOpen,
  MessageCircle,
  BarChart,
  Users,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

function StudentDashboard() {
  const { id } = useParams();
const uid = localStorage.getItem("id");
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
    const navigate = useNavigate();
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`https://code4changehackerthon25.onrender.com/users/${uid}`);
        const data = await response.json();

        if (data.role !== "student") {
          setError("This user is not a student.");
          console.log(data);
          localStorage.setItem("id", data.id);
          navigate("/tutor-dashboard")
        } else {
          setStudent(data);
        }
      } catch (err) {
        setError("Failed to fetch student data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-700 text-white p-6">
        <h2 className="text-xl font-bold mb-6">{student.name}'s Dashboard</h2>
        <nav className="space-y-4">
          {[{ key: "overview", label: "Overview", icon: GraduationCap },
            { key: "schedule", label: "Schedule", icon: Calendar },
            { key: "resources", label: "Resources", icon: BookOpen },
            { key: "messages", label: "Messages", icon: MessageCircle },
            { key: "performance", label: "Performance", icon: BarChart },
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

      <main className="flex-1 p-6">
        {activeTab === "overview" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-blue-700">Welcome, {student.name}</h2>
            <p className="mt-2 text-gray-700">Here is a summary of your learning journey so far.</p>
            <ul className="mt-4 list-disc pl-6">
              {student.courses?.map((course, index) => (
                <li key={index} className="text-gray-800 flex items-center gap-2">
                  {course.completed ? (
                    <CheckCircle className="text-green-500 w-4 h-4" />
                  ) : (
                    <AlertCircle className="text-yellow-500 w-4 h-4" />
                  )}
                  {course.title} - {course.progress}% complete
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "schedule" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-blue-700">Your Schedule</h2>
            <ul className="mt-2 list-disc pl-6">
              {student.schedule?.map((session, index) => (
                <li key={index} className="text-gray-700">
                  {session.date} - {session.topic} with {session.tutor}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-blue-700">Resources</h2>
            <p className="mt-2">Find your course materials and downloads here.</p>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-blue-700">Messages</h2>
            <p className="mt-2">Check messages from tutors and admins.</p>
          </div>
        )}

        {activeTab === "performance" && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-blue-700">Performance</h2>
            <p className="mt-2">Track your grades and progress reports.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
