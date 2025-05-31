import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
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

export default function Navbar() {
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full h-16 px-6 py-3 bg-[#F2F8F4] border-b border-[#C8D3CD] flex items-center justify-between shadow-sm z-50">
      {/* Left: Logo */}
      <div className="flex items-center">
        <Link to="/">
          < MboaConnectLogo />
        </Link>
      </div>

      {/* Center: Nav Items */}
      <div className="flex items-center gap-8">
        {navItems.map((item, idx) =>
          item.dropdown ? (
            <div
              key={idx}
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                onClick={() => setShowDropdown(true)}
                className="text-sm font-medium text-[#646C6F] hover:text-[#0B081D]"
              >
                {item.label}
              </button>

              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-8 left-0 z-50 bg-white border border-[#C8D3CD] shadow-md rounded-md w-48"
                >
                  {item.children.map((child, cIdx) => (
                    <Link
                      key={cIdx}
                      to={child.path}
                      className={`block px-4 py-2 text-sm hover:bg-[#E1EFE6] ${
                        isActive(child.path)
                          ? "text-[#0B081D]"
                          : "text-[#646C6F]"
                      }`}
                      onClick={() => setShowDropdown(false)} // close on click
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
              className={`text-sm font-medium ${
                isActive(item.path)
                  ? "text-[#0B081D] border-b-2 border-[#0B081D] pb-1"
                  : "text-[#646C6F] hover:text-[#0B081D]"
              }`}
            >
              {item.label}
            </Link>
          )
        )}
      </div>

      {/* Right: Auth Buttons */}
      <div className="flex items-center gap-4">
        <Link to="/login" className="text-sm text-[#0B081D] hover:underline">
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-[#0B081D] text-[#F2F8F4] px-4 py-2 rounded-md text-sm font-semibold hover:bg-[#000411] transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
