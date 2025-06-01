import React, { useState } from 'react';

// InternshipRequestCard Component
const InternshipRequestCard = ({
    studentName,
    emailAddress,
    biography,
    profilePictureUrl = 'https://placehold.co/80x80/000000/FFFFFF?text=P', // Default placeholder for profile pic
    onApprove,
    onDecline,
    studentId // Unique ID for actions
}) => {
    return (
        <div className="bg-secondary-bg rounded-lg shadow-md overflow-hidden border border-border-divider">
            {/* Top Section: Profile Picture, Name, Email (Link Area) */}
            {/* The entire top section is a link */}
            <a href={`/student/${studentId}`} className="flex items-center p-4 bg-secondary-bg border-b border-border-divider hover:bg-opacity-90 transition-colors duration-200">
                <div className="w-20 h-20 rounded-full bg-primary-text flex-shrink-0 mr-4 overflow-hidden">
                    {/* Using an img tag for actual profile picture, with onerror for fallback */}
                    <img
                        src={profilePictureUrl}
                        alt={`${studentName}'s profile`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.src = 'https://placehold.co/80x80/000411/FFFFFF?text=P'; // Fallback to a placeholder
                        }}
                    />
                </div>
                <div>
                    <h3 className="font-bold text-lg text-primary-text mb-1">{studentName}</h3>
                    <p className="text-secondary-text text-sm">{emailAddress}</p>
                </div>
            </a>

            {/* Middle Section: Student Biography */}
            <div className="p-4 py-6 bg-secondary-bg ">
                <h4 className="font-bold text-primary-text text-center text-lg">{biography}</h4>
            </div>

            {/* Bottom Section: Approve/Decline Buttons */}
            <div className="flex justify-evenly p-4 bg-secondary-bg">
                <button
                    onClick={() => onApprove(studentId)}
                    className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-primary-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-opacity-50"
                >
                    Approve
                </button>
                <button
                    onClick={() => onDecline(studentId)}
                    className="bg-black text-white font-bold py-2 px-6 rounded-md hover:bg-primary-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:ring-opacity-50"
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

// InternshipRequests Component (Main Export)
const InternshipRequest = () => {
    // Sample data for internship requests
    const [requests, setRequests] = useState([
        {
            id: '1',
            studentName: 'JOHN DOE',
            emailAddress: 'john.doe@example.com',
            biography: 'Enthusiastic computer science student seeking practical experience in web development.',
            profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf267ddc?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: '2',
            studentName: 'JANE SMITH',
            emailAddress: 'jane.smith@example.com',
            biography: 'Passionate about data science and machine learning, eager to apply theoretical knowledge.',
            profilePictureUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: '3',
            studentName: 'ALEX JOHNSON',
            emailAddress: 'alex.j@example.com',
            biography: 'A quick learner with strong problem-solving skills, ready to contribute to real-world projects.',
            profilePictureUrl: 'https://images.unsplash.com/photo-1507003211169-0a3dd782dba4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        {
            id: '4',
            studentName: 'EMILY BROWN',
            emailAddress: 'emily.b@example.com',
            biography: 'Frontend enthusiast with a keen eye for design and user experience.',
            profilePictureUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
    ]);

    const handleApprove = (id) => {
        console.log(`Approving request for student ID: ${id}`);
        // In a real application, you would make an API call here
        // Then update the state to remove the approved request or mark it as approved
        setRequests(requests.filter(req => req.id !== id));
    };

    const handleDecline = (id) => {
        console.log(`Declining request for student ID: ${id}`);
        // In a real application, you would make an API call here
        // Then update the state to remove the declined request or mark it as declined
        setRequests(requests.filter(req => req.id !== id));
    };

    return (
        <div className="bg-primary-bg min-h-screen p-8">
            <h2 className="text-3xl font-bold text-primary-text mb-8 text-center">Internship Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {requests.length > 0 ? (
                    requests.map(request => (
                        <InternshipRequestCard
                            key={request.id}
                            studentId={request.id}
                            studentName={request.studentName}
                            emailAddress={request.emailAddress}
                            biography={request.biography}
                            profilePictureUrl={request.profilePictureUrl}
                            onApprove={handleApprove}
                            onDecline={handleDecline}
                        />
                    ))
                ) : (
                    <p className="col-span-full text-center text-secondary-text text-lg">No new internship requests.</p>
                )}
            </div>
        </div>
    );
};

export default InternshipRequest;
