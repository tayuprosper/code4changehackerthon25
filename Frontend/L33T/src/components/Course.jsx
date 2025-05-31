import React from 'react';
//import { ShoppingCart } from 'lucide-react';

const CourseCard = ({ title, description, owner, price, free }) => {
    return (
        <>
            <div className="bg-[#E1EFE6] rounded-2xl border border-[#C8D3CD] p-6 m-3 max-w-md shadow-sm">
                <h2 className="text-2xl font-bold text-[#000411] mb-2">{title}</h2>
                <p className="text-[#646C6F] mb-4">{description}</p>

                <div className="text-sm text-[#AEB7B3] mb-2">
                    <span>Created by </span>
                    <span className="text-[#0B081D] font-medium">{owner}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-[#0B081D]">${price}</span>
                    <button className="bg-[#0B081D] text-white px-4 py-2 rounded-xl hover:opacity-90 transition cursor-pointer hover:bg-[#646C6F]">
                        Enrol
                    </button>
                </div>
            </div>
            <div className="bg-[#E1EFE6] rounded-2xl border border-[#C8D3CD] p-6 m-3 max-w-md shadow-sm">
                <h2 className="text-2xl font-bold text-[#000411] mb-2">{title}</h2>
                <p className="text-[#646C6F] mb-4">{description}</p>

                <div className="text-sm text-[#AEB7B3] mb-2">
                    <span>Created by </span>
                    <span className="text-[#0B081D] font-medium">{owner}</span>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-semibold text-[#0B081D]">{free}</span>
                    <button className="bg-[#0B081D] text-white px-4 py-2 rounded-xl hover:opacity-90 transition cursor-pointer hover:bg-[#646C6F]">
                        Enrol
                    </button>
                    {/* <button className="bg-[#0B081D] text-white px-4 py-2 rounded-xl hover:opacity-90 transition flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Add to Cart
                    </button> */}
                </div>
            </div>
        </>
        
    );
};

const Course = () => {
    return (
        <div className="min-h-screen bg-[#F2F8F4] py-12 px-4 flex justify-center items-start">
            <CourseCard
                title="Design Thinking Fundamentals"
                description="Learn how to solve real-world problems using human-centered design practices."
                owner="Jane Doe"
                price="29.99"
                free ="Free Course"
            />
        </div>
    );
};

export default Course;
