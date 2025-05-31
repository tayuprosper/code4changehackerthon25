import React, { useState } from "react";

export default function StudentDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [comment, setComment] = useState("");

    const handleSubmitWorkClick = () => {
        setIsMenuOpen(true);
    };

    const closeCurtainMenu = () => {
        setIsMenuOpen(false);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    return (
        <div className="min-h-screen bg-[#F2F8F4] p-6">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-[#000411]">Welcome back, [Student Name]!</h1>
                    <p className="text-[#646C6F] text-lg">What would you like to do today?</p>
                </header>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-[#000411] mb-2">Opportunities</h2>
                        <p className="text-[#646C6F] mb-2">Explore and apply for:</p>
                        <ul className="text-[#646C6F] list-disc list-inside mb-4">
                            <li>Jobs</li>
                            <li>Internships</li>
                            <li>NGO Projects</li>
                        </ul>
                        <button className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]">Browse Opportunities</button>
                    </div>
                    <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-[#000411] mb-2">Courses</h2>
                        <p className="text-[#646C6F] mb-4">Find and purchase affordable courses</p>
                        <button className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]">View Courses</button>
                    </div>
                    <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-[#000411] mb-2">My Submissions</h2>
                        <p className="text-[#646C6F] mb-4">Submit your project or assignment for expert review</p>
                        <button
                            onClick={handleSubmitWorkClick}
                            className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                        >
                            Submit Work
                        </button>
                    </div>
                    <div className="bg-[#E1EFE6] border border-[#C8D3CD] rounded-2xl p-6">
                        <h2 className="text-xl font-semibold text-[#000411] mb-2">Feedback</h2>
                        <p className="text-[#646C6F] mb-4">View feedback and ratings on your submitted work</p>
                        <button className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]">View Feedback</button>
                    </div>
                </div>
            </div>

            {/* Curtain Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-50 backdrop-blur-sm bg-[#E1EFE6]/90 transition-all duration-300 ease-in-out transform"
                    style={{ transform: isMenuOpen ? "translateY(0)" : "translateY(-100%)" }}
                >
                    <div className="flex justify-end p-6">
                        <button
                            onClick={closeCurtainMenu}
                            className="text-[#000411] text-3xl font-bold hover:text-[#646C6F] transition"
                        >
                            &times;
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center h-full space-y-8 text-[#000411] text-2xl">
                        <h2 className="font-semibold mb-4">Submit Your Work</h2>
                        <p className="text-lg text-[#646C6F] mb-4">Upload your assignment or project for review.</p>
                        <input
                            type="file"
                            className="bg-white p-2 rounded-xl border border-[#C8D3CD] mb-4"
                        />
                        <textarea
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Add any comments..."
                            className="bg-white p-4 rounded-xl border border-[#C8D3CD] mb-4 w-80 h-32 text-[#646C6F]"
                        />
                        <button
                            className="bg-[#0B081D] text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-[#646C6F]"
                            onClick={closeCurtainMenu}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
