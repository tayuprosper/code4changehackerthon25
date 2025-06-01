import React from "react";
import Navbar from "../Layouts/NavBar";
import HeroBanner from "./HeroBanner";
import FeaturesSection from "./FeaturesSection";
import CategoriesSection from "./Categories";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";
import HomeInsights from "./HomeInsights";
// import AboutUsSection from "./AboutUsSection";
// import ListingsSection from "./ListingsSection";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar with no bottom margin to flow into hero */}
      <Navbar />

      {/* Hero Banner - Full width, seamless connection */}
      <div className="w-full p-2">
        <HeroBanner />
      </div>

      {/* About Us Section with proper spacing */}
      <div className=" max-w-7xl  mt-3 mb-1 p-2">
        {/* <AboutUsSection /> */}
        <FeaturesSection />
      </div>

      {/* Add more sections with consistent spacing */}
      <div className="p-2 bg-gray-50 mb-1 mt-3">
        {/* <ListingsSection /> */}
        <HowItWorks />
      </div>

      {/* Add more sections with consistent spacing */}
      <div className="p-2 mt-3 mb-1 bg-gray-50">
        {/* <ListingsSection /> */}
        <HomeInsights />
      </div>

      <div className="p-2 mt-3 bg-gray-50">
        {/* <ListingsSection /> */}
        {/* <CallToAction /> */}
        <Footer />
    
      </div>
    </div>
  );
};

export default Homepage;
