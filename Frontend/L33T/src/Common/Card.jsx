import React from "react";

const Card = ({ title, description }) => {
  return (
    <div
      className="p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.03] cursor-pointer"
      style={{
        backgroundColor: "#071026", // Dark Primary Accent background
        color: "#D0D9D4", // Light text for contrast
        border: "1px solid #4B4B57", // Darker subtle border for depth
      }}
    >
      <h3
        className="text-xl font-semibold mb-3"
        style={{ color: "#D0D9D4" }} // Light Primary Text
      >
        {title}
      </h3>
      <p
        className="text-base leading-relaxed"
        style={{ color: "#7A827F" }} // Muted but readable description text
      >
        {description}
      </p>
    </div>
  );
};

export default Card;
