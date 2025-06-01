import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import MboaConnectLogo from "../components/MboaConnectLogo";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  {
    label: "Listings",
    dropdown: true,
    children: [
      { label: "Jobs", path: "/jobs" },
      { label: "Internships", path: "/internships" },
      { label: "Projects", path: "/projects" },
      { label: "Courses", path: "/courses" },
    ],
  },
  { label: "Get Mentor", path: "/get-mentor" },
  { label: "Contact", path: "/contact" },
];

export default function Sidebar() {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  const isActive = (path) => location.pathname === path;

  const toggleDropdown = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside className="w-64 h-screen bg-[#F2F8F4] border-r border-[#C8D3CD] shadow-md flex flex-col p-6">
      {/* Logo or Brand */}
      <div className="mb-8">
        <Link to="/">
          <MboaConnectLogo />
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div key={idx} className="flex flex-col">
              <button
                onClick={() => toggleDropdown(item.label)}
                className="flex justify-between items-center px-4 py-2 text-[#646C6F] font-semibold hover:text-[#0B081D] focus:outline-none"
              >
                <span>{item.label}</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === item.label ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              {openDropdown === item.label && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={cIdx}
                      to={child.path}
                      className={`px-4 py-2 rounded text-sm ${
                        isActive(child.path)
                          ? "bg-[#0B081D] text-[#F2F8F4]"
                          : "text-[#646C6F] hover:bg-[#E1EFE6]"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={idx}
              to={item.path}
              className={`px-4 py-2 rounded text-sm font-medium ${
                isActive(item.path)
                  ? "bg-[#0B081D] text-[#F2F8F4]"
                  : "text-[#646C6F] hover:bg-[#E1EFE6]"
              }`}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* Optional: Auth buttons at bottom */}
      <div className="mt-auto flex flex-col gap-2">
        <Link
          to="/login"
          className="text-center text-[#0B081D] font-medium hover:underline"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-[#0B081D] text-[#F2F8F4] px-4 py-2 rounded-md text-center font-semibold hover:bg-[#000411] transition"
        >
          Sign Up
        </Link>
      </div>
    </aside>
  );
}
