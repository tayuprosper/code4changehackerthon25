import React, { useState } from 'react';

const JobCard = ({ companyName, jobTitle, description, price, jobType }) => {
    return (
        <div className="bg-[#E1EFE6] p-6 rounded-lg shadow-md flex flex-col justify-between h-full">
            <div>
                <h2 className="font-bold text-lg mb-2 text-black">{companyName}</h2>
                <h3 className="font-semibold text-md mb-3 text-black">{jobTitle}</h3>
                <h4 className="font-semibold text-md mb-4 text-[gray]">{jobType}</h4>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">{description}</p>
            </div>
            <div className="mt-auto">
                <div className="flex space-x-2 mb-4">
                    <button className="px-4 py-1 border border-gray-400 text-gray-700 text-sm rounded hover:bg-gray-200">App</button>
                    <button className="px-4 py-1 border border-gray-400 text-gray-700 text-sm rounded hover:bg-gray-200">App</button>
                    <button className="px-4 py-1 border border-gray-400 text-gray-700 text-sm rounded hover:bg-gray-200">App</button>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="font-bold text-lg text-black">{price}</span>
                    <button className="bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-800 transition-colors duration-200 cursor-pointer">
                        Apply Now!
                    </button>
                </div>
            </div>
        </div>
    );
};

const Opportunity = () => {
    const allJobs = [
        { id: 1, companyName: 'COMPANY NAME 1', jobTitle: 'JOB TITLE 1', description: 'Dive deep...', jobType: 'Full-time', price: '$50/month' },
        { id: 2, companyName: 'COMPANY NAME 2', jobTitle: 'JOB TITLE 2', description: 'Dive deep...', jobType: 'Part-time', price: '$55/month' },
        { id: 3, companyName: 'COMPANY NAME 3', jobTitle: 'JOB TITLE 3', description: 'Dive deep...', jobType: 'Contract', price: '$60/month' },
        { id: 4, companyName: 'COMPANY NAME 4', jobTitle: 'JOB TITLE 4', description: 'Another exciting...', jobType: 'Freelance', price: '$65/month' },
        { id: 5, companyName: 'COMPANY NAME 5', jobTitle: 'JOB TITLE 5', description: 'Join our team...', jobType: 'Part-time', price: '$70/month' },
        { id: 6, companyName: 'COMPANY NAME 6', jobTitle: 'JOB TITLE 6', description: 'Seeking passionate...', jobType: 'Part-time', price: '$75/month' },
        { id: 7, companyName: 'COMPANY NAME 7', jobTitle: 'JOB TITLE 7', description: 'Building cutting-edge...', jobType: 'Part-time', price: '$80/month' },
        { id: 8, companyName: 'COMPANY NAME 8', jobTitle: 'JOB TITLE 8', description: 'Exciting opportunities...', jobType: 'Part-time', price: '$85/month' },
        { id: 9, companyName: 'COMPANY NAME 9', jobTitle: 'JOB TITLE 9', description: 'Shape the future...', jobType: 'Part-time', price: '$90/month' },
    ];

    const internshipJobs = [
        { id: 1, companyName: 'INTERN COMPANY 1', jobTitle: 'INTERN TITLE 1', description: 'Hands-on internship...', jobType: 'Internship', price: '$0/month' },
        { id: 2, companyName: 'INTERN COMPANY 2', jobTitle: 'INTERN TITLE 2', description: 'Learn from experts...', jobType: 'Internship', price: '$0/month' },
        { id: 3, companyName: 'INTERN COMPANY 3', jobTitle: 'INTERN TITLE 3', description: 'Gain experience...', jobType: 'Internship', price: '$0/month' },
        { id: 4, companyName: 'INTERN COMPANY 4', jobTitle: 'INTERN TITLE 4', description: 'Contribute to real projects...', jobType: 'Internship', price: '$0/month' },
    ];

    const projectJobs = [
        { id: 1, companyName: 'PROJECT COMPANY 1', jobTitle: 'PROJECT TITLE 1', description: 'Work on cutting-edge open-source tools.', jobType: 'Project', price: '$100/project' },
        { id: 2, companyName: 'PROJECT COMPANY 2', jobTitle: 'PROJECT TITLE 2', description: 'Short-term React app development.', jobType: 'Project', price: '$120/project' },
        { id: 3, companyName: 'PROJECT COMPANY 3', jobTitle: 'PROJECT TITLE 3', description: 'Build and deploy an internal tool.', jobType: 'Project', price: '$150/project' },
        { id: 4, companyName: 'PROJECT COMPANY 4', jobTitle: 'PROJECT TITLE 4', description: 'Help create automation scripts.', jobType: 'Project', price: '$200/project' },
    ];

    const initialVisible = 3;
    const toLoad = 3;

    const [visibleJobCount, setVisibleJobCount] = useState(initialVisible);
    const [visibleInternCount, setVisibleInternCount] = useState(initialVisible);
    const [visibleProjectCount, setVisibleProjectCount] = useState(initialVisible);

    const displayedJobs = allJobs.slice(0, visibleJobCount);
    const displayedInterns = internshipJobs.slice(0, visibleInternCount);
    const displayedProjects = projectJobs.slice(0, visibleProjectCount);

    return (
        <div className="container mx-auto px-4 py-12">
            {/* Job Opportunities */}
            <h2 className="text-3xl font-bold mb-8 pb-2 border-b-2 border-black inline-block text-black">Job Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedJobs.map(job => <JobCard key={job.id} {...job} />)}
            </div>
            <div className="flex justify-center mt-12 space-x-4">
                {visibleJobCount < allJobs.length && (
                    <button onClick={() => setVisibleJobCount(v => Math.min(v + toLoad, allJobs.length))}
                        className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors duration-200">
                        View More
                    </button>
                )}
                {visibleJobCount > initialVisible && (
                    <button onClick={() => setVisibleJobCount(initialVisible)}
                        className="bg-gray-700 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-colors duration-200">
                        Show Less
                    </button>
                )}
            </div>

            {/* Internship Opportunities */}
            <h2 className="text-3xl font-bold mt-20 mb-8 pb-2 border-b-2 border-black inline-block text-black">Internship Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedInterns.map(intern => <JobCard key={intern.id} {...intern} />)}
            </div>
            <div className="flex justify-center mt-12 space-x-4">
                {visibleInternCount < internshipJobs.length && (
                    <button onClick={() => setVisibleInternCount(v => Math.min(v + toLoad, internshipJobs.length))}
                        className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors duration-200">
                        View More
                    </button>
                )}
                {visibleInternCount > initialVisible && (
                    <button onClick={() => setVisibleInternCount(initialVisible)}
                        className="bg-gray-700 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-colors duration-200">
                        Show Less
                    </button>
                )}
            </div>

            {/* Project Opportunities */}
            <h2 className="text-3xl font-bold mt-20 mb-8 pb-2 border-b-2 border-black inline-block text-black">Project Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedProjects.map(project => <JobCard key={project.id} {...project} />)}
            </div>
            <div className="flex justify-center mt-12 space-x-4">
                {visibleProjectCount < projectJobs.length && (
                    <button onClick={() => setVisibleProjectCount(v => Math.min(v + toLoad, projectJobs.length))}
                        className="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors duration-200">
                        View More
                    </button>
                )}
                {visibleProjectCount > initialVisible && (
                    <button onClick={() => setVisibleProjectCount(initialVisible)}
                        className="bg-gray-700 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600 transition-colors duration-200">
                        Show Less
                    </button>
                )}
            </div>
        </div>
    );
};

export default Opportunity;
