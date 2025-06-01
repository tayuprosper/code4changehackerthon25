/* eslint-disable no-unused-vars */
import React from "react";
import { Twitter, Github, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  return (
    <footer className="bg-blue-600 text-blue-100 py-8 px-6 sm:px-12 border-t border-blue-500 shadow-md relative overflow-hidden">
      {/* Light wave shape */}
      <svg
        className="absolute top-0 left-0 w-full h-12 text-blue-400 opacity-50"
        preserveAspectRatio="none"
        viewBox="0 0 1200 40"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 40V0h1200v40c-160-10-320-40-480-40S320 30 160 30 0 40 0 40z" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
        <p className="text-sm sm:text-base select-none">
          &copy; {new Date().getFullYear()} MboaConnect. All rights reserved.
        </p>

        <div className="flex space-x-8 p-4">
          {[
            {
              icon: Twitter,
              url: "https://twitter.com/yourprofile",
              label: "Twitter",
            },
            {
              icon: Github,
              url: "https://github.com/yourprofile",
              label: "GitHub",
            },
            {
              icon: Linkedin,
              url: "https://linkedin.com/in/yourprofile",
              label: "LinkedIn",
            },
          ].map(({ icon: Icon, url, label }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="relative group text-blue-200 hover:text-white transition-colors duration-300"
            >
              <span className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></span>
              <Icon
                size={26}
                className="relative z-10 hover:scale-110 transition-transform duration-300"
              />
            </a>
          ))}
        </div>

        {/* Back to top button */}
        <button
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-lg hover:bg-white/30 hover:text-blue-200 transition-all duration-300 rounded-full p-3 z-50"
          
        >
          <ArrowUp className="w-5 h-5"/>
        </button>
      </div>
    </footer>
  );
}
