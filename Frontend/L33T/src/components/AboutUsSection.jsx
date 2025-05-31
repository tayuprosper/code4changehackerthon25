import React from "react";
import Card from "../Common/Card";

const aboutCards = [
  {
    title: "Our Mission",
    description:
      "Empowering Cameroonian talents by connecting them with meaningful jobs, internships, and projects through an intuitive digital platform.",
  },
  {
    title: "Community Driven",
    description:
      "Built by and for the local community, MboaConnect fosters collaboration, support, and growth among students, professionals, and organizations.",
  },
  {
    title: "Innovation & Impact",
    description:
      "Leveraging technology and creativity to transform how opportunities are discovered and accessed in Cameroon’s evolving job market.",
  },
  {
    title: "Trusted Network",
    description:
      "We prioritize reliability and quality by partnering with vetted organizations, ensuring that every connection matters and every opportunity counts.",
  },
];

const AboutUsSection = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2
        className="text-center text-[#D0D9D4] text-3xl font-bold mb-12 uppercase tracking-wide"
        style={{ color: "#D0D9D4" }}
      >
        About Us
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
        {aboutCards.map(({ title, description }, index) => (
          <Card key={index} title={title} description={description} />
        ))}
      </div>
    </section>
  );
};

export default AboutUsSection;
