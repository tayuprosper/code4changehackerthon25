import React, { useState, useEffect } from 'react';

const CourseCard = ({ title, description, difficulty, id }) => {
    return (
        <div className="bg-[#E1EFE6] p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div>
                <h2 className="font-bold text-lg mb-2 text-black">{title}</h2>
                <h3 className="font-semibold text-md mb-4 text-[gray] capitalize">
                    Difficulty: {difficulty.toLowerCase()}
                </h3>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                    {description || "No description available"}
                </p>
            </div>
            <div className="mt-auto">
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg text-black">Course ID: {id}</span>
                    <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};
