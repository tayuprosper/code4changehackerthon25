import React from "react";
import { ShieldCheck, Globe, Sparkles } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      title: "Verified Opportunities",
      desc: "Every gig is reviewed to ensure quality and legitimacy.",
      icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "Campus-Centered",
      desc: "Tailored for the needs of students in Buea & beyond.",
      icon: <Globe className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "Modern & Seamless UX",
      desc: "Built with a student-friendly design that’s easy to navigate.",
      icon: <Sparkles className="h-10 w-10 text-blue-600" />,
    },
  ];

  return (
    <section className="bg-blue-50 py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-12">
        Why Choose MboaConnect?
      </h2>
      <div className="flex flex-wrap justify-center gap-10">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-indigo-50 p-8 rounded-xl w-80 shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl text-left"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-blue-700">
              {feature.title}
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
