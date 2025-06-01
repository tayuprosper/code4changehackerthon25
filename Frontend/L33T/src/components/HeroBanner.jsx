import React from "react";

const HeroBanner = () => {
  return (
    <section className="w-full py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-12 bg-gradient-to-r from-blue-50 to-blue-100">
      {/* Left Text Content */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900 tracking-tight">
          WORK. LEARN. CONNECT. IMPACT.
        </h1>
        <p className="text-xl md:text-2xl font-semibold mb-8 text-gray-800 leading-relaxed">
          Empowering university students in Buea to <span className="text-blue-600 font-bold">earn</span>, <span className="text-blue-600 font-bold">grow</span>, and <span className="text-blue-600 font-bold">thrive</span> — by connecting them with local and remote job opportunities tailored to their skills.
        </p>
        <button className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-lg transform hover:scale-105">
          GET STARTED NOW
        </button>
      </div>

      {/* Right Image */}
      <div className="flex-1 max-w-xl rounded-2xl shadow-2xl overflow-hidden border-4 border-blue-200 transform hover:scale-[1.02] transition-all duration-300">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default HeroBanner;