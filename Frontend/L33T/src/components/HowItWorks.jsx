import React from "react";
import { UserPlus, Briefcase, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Create Your Profile",
      desc: "Students and employers sign up and showcase their strengths.",
      icon: <UserPlus className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "Post or Apply for Gigs",
      desc: "Employers post jobs and students apply based on interest and skills.",
      icon: <Briefcase className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "Connect & Collaborate",
      desc: "Chat, plan, and execute jobs easily within the platform.",
      icon: <Handshake className="h-10 w-10 text-blue-600" />,
    },
  ];

  return (
    <section className="bg-blue-50 py-20 px-6 text-center">
      <h2 className="text-4xl font-bold text-blue-800 mb-12">
        How MboaConnect Works
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-indigo-50 p-8 rounded-xl shadow-md w-80 transform transition duration-300 hover:scale-105 hover:shadow-xl text-left"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold text-blue-600">
              {step.title}
            </h3>
            <p className="text-gray-700 mt-2 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
