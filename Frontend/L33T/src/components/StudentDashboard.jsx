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
