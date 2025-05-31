import React from "react";
import Card from "../Common/Card";

const listings = {
  jobs: [
    {
      title: "Frontend Developer - Buea",
      description: "Join a fast-growing tech startup as a React developer. Must be passionate about UI and eager to learn.",
    },
    {
      title: "NGO Data Entry Assistant",
      description: "Help digitize records for a local NGO focused on health and education outreach in rural areas.",
    },
    {
      title: "Graphic Designer for Event Flyer",
      description: "A local bakery is looking for a creative designer to create promotional flyers for a community event.",
    },
    {
      title: "Laundry App Support Staff",
      description: "Startup in Molyko needs someone to manage incoming orders and customer requests on their laundry app.",
    },
  ],

  internships: [
    {
      title: "Cybersecurity Intern - Remote",
      description: "Work under senior security engineers to monitor and test systems. Certificate opportunity included.",
    },
    {
      title: "Frontend Intern @ Silicon Mountain Hub",
      description: "Assist in building community projects while learning React and API integrations on real-world apps.",
    },
    {
      title: "Digital Marketing Assistant",
      description: "Gain practical experience promoting a local NGO’s fundraising campaigns using social media tools.",
    },
    {
      title: "Tech Support Intern (NGO)",
      description: "Help maintain systems for a local health-focused NGO. Basic computer skills required, training provided.",
    },
  ],

  courses: [
    {
      title: "Intro to UI/UX with Figma - Buea",
      description: "Learn the basics of design thinking and Figma from top UI/UX designers right here in Buea.",
    },
    {
      title: "AgriTech for Beginners",
      description: "A course by local farmers and engineers on how to use simple tech for smart farming in Cameroon.",
    },
    {
      title: "Digital Entrepreneurship - UB Campus",
      description: "Start your online hustle with guidance from experienced Buea entrepreneurs and creators.",
    },
    {
      title: "Coding for Kids - Molyko",
      description: "A weekend course introducing kids to Scratch and creative coding in a fun, hands-on format.",
    },
  ],

  projects: [
    {
      title: "Build a Freelance Services Marketplace",
      description: "Team up to build a local Fiverr-style platform where Cameroonians offer digital and home services.",
    },
    {
      title: "AI Chatbot for Local Government FAQs",
      description: "Create a chatbot that helps locals navigate administrative services like ID cards or taxes.",
    },
    {
      title: "SMS-Based Job Notification System",
      description: "Build a simple SMS tool that alerts job seekers in areas with low internet penetration.",
    },
    {
      title: "Interactive Map of Local Resources",
      description: "Build a web map showing clinics, NGOs, and job centers in the Buea region. Great for community use!",
    },
  ],
};

const ListingsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-white text-black">
      <h2 className="text-center text-black text-3xl font-bold mb-16 uppercase tracking-wide">
        Explore Opportunities
      </h2>

      {Object.entries(listings).map(([key, items]) => {
        const buttonMap = {
          jobs: "Apply Now",
          internships: "Join Internship",
          courses: "Enroll",
          projects: "Contribute",
        };

        return (
          <div key={key} className="mb-20">
            <h3 className="text-2xl font-semibold mb-8 text-black capitalize">
              {key.replace(/([A-Z])/g, " $1")} Opportunities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {items.map(({ title, description }, index) => (
                <Card
                  key={index}
                  title={title}
                  description={description}
                  buttonText={buttonMap[key]}
                  buttonClass="mt-4 inline-block bg-white text-black border border-black hover:bg-black hover:text-white font-medium py-2 px-4 rounded-xl transition"
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ListingsSection;
