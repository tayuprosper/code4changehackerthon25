import React from "react";

const Card = ({
  title,
  description,
  buttonText = "Learn More",
  buttonClass,
}) => {
  return (
    <div
      className="flex flex-col h-full p-6 rounded-2xl shadow-lg transition-transform hover:scale-[1.03] cursor-pointer"
      style={{
        backgroundColor: "#071026", // Dark Primary Accent background
        color: "#D0D9D4", // Light text for contrast
        border: "1px solid #4B4B57", // Darker subtle border for depth
      }}
    >
      <h3
        className="text-xl font-semibold mb-3 text-blue-600" // Changed to text-blue-600
      >
        {title}
      </h3>
      <p
        className="text-base leading-relaxed mb-4 flex-grow"
        style={{ color: "#7A827F" }} // Muted but readable description text
      >
        {description}
      </p>
      <button
        className={
          buttonClass ||
          "mt-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 w-full font-medium"
        }
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;