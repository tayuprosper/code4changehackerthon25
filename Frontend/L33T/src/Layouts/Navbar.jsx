/* eslint-disable no-unused-vars */
import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import MboaConnectLogo from "../components/MboaConnectLogo";
import { Menu, X } from "lucide-react";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <nav className="w-full h-20 px-6 md:px-8 py-4 bg-white border-b border-blue-100 flex items-center justify-between shadow-md z-50 relative">
      {/* Left: Logo */}
      <Link to="/">
        <MboaConnectLogo />
      </Link>

      {/* Center: Nav Items - Desktop */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                className={`text-base font-bold tracking-wide ${
                  isActive(item.path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.label}
              </button>
              {showDropdown && (
                <div className="absolute top-10 left-0 z-50 bg-white border border-blue-100 shadow-xl rounded-lg w-56 py-2">
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={cIdx}
                      to={child.path}
                      className={`block px-5 py-3 text-sm font-semibold tracking-wide hover:bg-blue-50 transition-colors ${
                        isActive(child.path) ? "text-blue-600" : "text-gray-700"
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
              className={`text-base font-bold tracking-wide ${
                isActive(item.path)
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className="hidden md:flex items-center gap-6">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            DASHBOARD
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="text-base font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-base font-bold hover:bg-blue-700 shadow hover:shadow-lg transition-all"
            >
              SIGN UP
            </Link>
          </>
        )}
      </div>

      {/* Mobile: Hamburger Icon */}
      <div className="md:hidden">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile: Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-t border-blue-100 z-40 md:hidden py-4 px-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item, idx) =>
              item.dropdown ? (
                <div key={idx}>
                  <p className="text-base font-bold text-gray-700">
                    {item.label}
                  </p>
                  <div className="ml-4 mt-1 space-y-2">
                    {item.children.map((child, cIdx) => (
                      <Link
                        key={cIdx}
                        to={child.path}
                        className={`block text-sm font-medium hover:text-blue-600 ${
                          isActive(child.path)
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={idx}
                  to={item.path}
                  className={`text-base font-bold ${
                    isActive(item.path) ? "text-blue-600" : "text-gray-700"
                  } hover:text-blue-600`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="mt-4">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  DASHBOARD
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block w-full text-center text-blue-600 font-bold py-2"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    LOGIN
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    SIGN UP
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
