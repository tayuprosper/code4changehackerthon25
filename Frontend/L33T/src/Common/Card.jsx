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
        className="text-xl font-semibold mb-3"
        style={{ color: "#D0D9D4" }} // Light Primary Text
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
          "mt-auto px-4 py-2 rounded-xl bg-white text-black hover:bg-[#1b1533] hover:text-white transition-all duration-200 w-full font-medium"
        }
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
