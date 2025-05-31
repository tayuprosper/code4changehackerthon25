import React from "react";
import Navbar from "../Layouts/Navbar";
import HeroBanner from "./HeroBanner";
import AboutUsSection from "./AboutUsSection";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar with no bottom margin to flow into hero */}
      <Navbar />

      {/* Hero Banner - Full width, seamless connection */}
      <div className="w-full">
        <HeroBanner />
      </div>

      {/* About Us Section with proper spacing */}
      <div className="px-4 py-16 max-w-7xl mx-auto">
        <AboutUsSection />
      </div>

      {/* Add more sections with consistent spacing */}
      <div className="px-4 py-16 bg-gray-50">
        {/* Future sections can go here */}
      </div>
    </div>
  );
};

export default Homepage;
