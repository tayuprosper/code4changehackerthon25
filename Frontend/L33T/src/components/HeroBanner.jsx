import React from "react";

const HeroBanner = () => {
  return (
    <section
      className="w-full py-12 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8"
      style={{ backgroundColor: "#D0D9D4" }} // Darker Primary Background
    >
      {/* Left Text Content */}
      <div className="flex-1 max-w-xl">
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ color: "#0A0D0C" }} // Dark Primary Text
        >
          Work. Learn. Connect. Impact.
        </h1>
        <p
          className="text-lg mb-6"
          style={{ color: "#4A5150" }} // Dark Secondary Text
        >
          Empowering university students in Buea to earn, grow, and thrive — by
          connecting them with local and remote job opportunities tailored to
          their skills, schedules, and aspirations.
        </p>
        <button
          className="px-6 py-3 rounded-2xl shadow-lg transition"
          style={{
            backgroundColor: "#071026", // Darker Primary Accent
            color: "#D0D9D4", // Light text for contrast
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0A1539")
          } // Slightly lighter hover
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#071026")
          }
        >
          Get Started
        </button>
      </div>

      {/* Right Image */}
      <div
        className="flex-1 max-w-md rounded-2xl shadow-xl overflow-hidden"
        style={{ border: "1px solid #8F9A94" }} // Darker border
      >
        <img
          src="https://via.placeholder.com/500x400"
          alt="Hero Banner Visual"
          className="w-full object-cover"
          style={{ borderRadius: "0.75rem" }}
        />
      </div>
    </section>
  );
};

export default HeroBanner;
