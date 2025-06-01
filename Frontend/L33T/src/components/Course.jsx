import React, { useState } from 'react';

const PaymentModal = ({ onClose, onSubmit }) => {
    const [phone, setPhone] = useState('');

    const handleSubmit = async () => {
        if (phone.trim()) {
            try {
                const response = await fetch('https://code4changehackerthon25.onrender.com/enrollments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ phone }),
                });

                if (response.ok) {
                    alert('Payment request sent successfully.');
                    onSubmit();
                } else {
                    alert('Failed to send payment request.');
                }
            } catch (error) {
                alert('An error occurred while sending payment request.');
            }
        } else {
            alert("Please enter a valid phone number.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-[#E1EFE6] p-6 rounded-2xl w-96 border border-[#C8D3CD] shadow-md">
                <h2 className="text-2xl font-bold text-[#000411] mb-4">Make a Payment</h2>

                <label className="block text-sm text-[#646C6F] mb-1">Phone Number</label>
                <input
                    type="tel"
                    placeholder="e.g. 0712345678"
                    className="w-full border border-[#C8D3CD] text-[#000411] placeholder-[#AEB7B3] bg-[#F2F8F4] rounded-xl px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#0B081D]"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-[#C8D3CD] text-[#646C6F] hover:bg-[#AEB7B3] transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-xl bg-[#0B081D] text-white hover:opacity-90 transition"
                    >
                        Make Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

const CourseCard = ({ title, description, owner, price, onPaidCourseClick, onFreeCourseEnroll }) => {
    const isFree = !price || price === "0";

    const handleClick = () => {
        if (isFree) {
            onFreeCourseEnroll();
        } else {
            onPaidCourseClick();
        }
    };

    return (
        <div className="bg-[#E1EFE6] rounded-2xl border border-[#C8D3CD] p-6 m-3 max-w-md shadow-sm">
            <h2 className="text-2xl font-bold text-[#000411] mb-2">{title}</h2>
            <p className="text-[#646C6F] mb-4">{description}</p>

            <div className="text-sm text-[#AEB7B3] mb-2">
                <span>Created by </span>
                <span className="text-[#0B081D] font-medium">{owner}</span>
            </div>

            <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-semibold text-[#0B081D]">{isFree ? 'Free Course' : `$${price}`}</span>
                <button
                    onClick={handleClick}
                    className={`px-4 py-2 rounded-xl transition cursor-pointer bg-[#0B081D] text-white ${isFree ? 'hover:bg-[#646C6F]' : 'hover:opacity-90'}`}
                >
                    {isFree ? 'Enrol' : 'Make Payment'}
                </button>
            </div>
        </div>
    );
};

const Course = () => {
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handlePaidCourseClick = () => setShowPaymentModal(true);
    const closeModal = () => setShowPaymentModal(false);

    const handleFreeEnroll = async () => {
        try {
            const response = await fetch('https://code4changehackerthon25.onrender.com/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone: 'free_user' }),
            });

            if (response.ok) {
                alert('You have successfully enrolled in the free course.');
            } else {
                alert('Failed to enroll in the free course.');
            }
        } catch (error) {
            alert('An error occurred while enrolling in the free course.');
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F8F4] py-12 px-4 flex justify-center items-start relative">
            <CourseCard
                title="Design Thinking Fundamentals"
                description="Learn how to solve real-world problems using human-centered design practices."
                owner="Jane Doe"
                price="29.99"
                onPaidCourseClick={handlePaidCourseClick}
                onFreeCourseEnroll={handleFreeEnroll}
            />
            <CourseCard
                title="Introduction to Visual Storytelling"
                description="Discover how to craft compelling visual narratives."
                owner="John Smith"
                price="0"
                onPaidCourseClick={() => { }}
                onFreeCourseEnroll={handleFreeEnroll}
            />
            {showPaymentModal && <PaymentModal onClose={closeModal} onSubmit={closeModal} />}
        </div>
    );
};

export default Course;
 