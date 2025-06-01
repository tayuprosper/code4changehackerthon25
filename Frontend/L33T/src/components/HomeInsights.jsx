/* eslint-disable no-unused-vars */
import React from "react";
import { Briefcase, Users, Layers, CheckCircle } from "lucide-react";

const insightsData = [
  {
    icon: Briefcase,
    label: "Jobs Available",
    value: 125, // Dynamic in real scenario
    description: "Wide range of gigs and internships",
  },
  {
    icon: Layers,
    label: "Job Categories",
    value: 8,
    description: "Freelance, Remote, Part-time & more",
  },
  {
    icon: Users,
    label: "Companies Hiring",
    value: 42,
    description: "Trusted companies around Buea",
  },
  {
    icon: CheckCircle,
    label: "Applications Sent",
    value: 530,
    description: "Students already connected with gigs",
  },
];

export default function HomeInsights() {
  return (
    <section className="bg-blue-50 py-16 px-6 sm:px-12 lg:px-20 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-blue-800 text-center mb-12">
         MboaConnect Insights
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {insightsData.map(({ icon: Icon, label, value, description }, idx) => (
          <div
            key={idx}
            className="bg-indigo-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Icon className="mx-auto mb-4 w-12 h-12 text-blue-600" />
            <p className="text-4xl font-extrabold text-blue-700 mb-2">
              {value}
            </p>
            <h3 className="text-lg font-semibold text-blue-800 mb-1">
              {label}
            </h3>
            <p className="text-sm text-blue-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
