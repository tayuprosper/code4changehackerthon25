import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import MboaConnectLogo from "../components/MboaConnectLogo";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "FEATURES", path: "/features" },
  {
    label: "LISTINGS",
    dropdown: true,
    children: [
      { label: "JOBS", path: "/jobs" },
      { label: "INTERNSHIPS", path: "/internships" },
      { label: "PROJECTS", path: "/projects" },
      { label: "COURSES", path: "/courses" },
    ],
  },
  { label: "GET MENTOR", path: "/get-mentor" },
  { label: "CONTACT", path: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full h-20 px-8 py-4 bg-white border-b border-blue-100 flex items-center justify-between shadow-lg z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/">
          <MboaConnectLogo />
        </Link>
      </div>

      {/* Center: Nav Items */}
      <div className="flex items-center gap-10">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`text-base font-bold tracking-wide ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                } transition-colors duration-200`}
              >
                {item.label}
              </button>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-10 left-0 z-50 bg-white border border-blue-100 shadow-xl rounded-lg w-56 py-2"
                >
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={cIdx}
                      to={child.path}
                      className={`block px-5 py-3 text-sm font-semibold tracking-wide hover:bg-blue-50 transition-colors ${
                        isActive(child.path)
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                      onClick={() => setShowDropdown(false)}
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
              className={`text-base font-bold tracking-wide ${
                isActive(item.path)
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              } transition-colors duration-200`}
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-6">
        <Link
          to="/login"
          className="text-base font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
        >
          LOGIN
        </Link>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-bold tracking-wide hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          SIGN UP
        </Link>
      </div>
    </nav>
  );
}