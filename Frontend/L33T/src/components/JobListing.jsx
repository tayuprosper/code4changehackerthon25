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

const JobListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    const allJobs = [
        { id: 1, companyName: 'COMPANY NAME 1', jobTitle: 'JOB TITLE 1', description: 'Dive deep...', jobType: 'Full-time', price: '$50/month' },
        { id: 2, companyName: 'COMPANY NAME 2', jobTitle: 'JOB TITLE 2', description: 'Dive deep...', jobType: 'Part-time', price: '$55/month' },
        { id: 3, companyName: 'COMPANY NAME 3', jobTitle: 'JOB TITLE 3', description: 'Dive deep...', jobType: 'Contract', price: '$60/month' },
        { id: 4, companyName: 'COMPANY NAME 4', jobTitle: 'JOB TITLE 4', description: 'Another exciting...', jobType: 'Freelance', price: '$65/month' },
        { id: 5, companyName: 'COMPANY NAME 5', jobTitle: 'JOB TITLE 5', description: 'Join our team...', jobType: 'Part-time', price: '$70/month' },
        { id: 6, companyName: 'COMPANY NAME 6', jobTitle: 'JOB TITLE 6', description: 'Seeking passionate...', jobType: 'Part-time', price: '$75/month' },
        { id: 7, companyName: 'COMPANY NAME 7', jobTitle: 'JOB TITLE 7', description: 'Building cutting-edge...', jobType: 'Part-time', price: '$80/month' },
        { id: 8, companyName: 'COMPANY NAME 8', jobTitle: 'JOB TITLE 8', description: 'Exciting opportunities...', jobType: 'Part-time', price: '$85/month' },
        { id: 9, companyName: 'COMPANY NAME 9', jobTitle: 'JOB TITLE 9', description: 'Shape the future...', jobType: 'Full-time', price: '$90/month' },
    ];

    // Filter jobs by search and type
    const filteredJobs = allJobs.filter(job => {
        const matchesSearch =
            job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType = selectedType === 'All' || job.jobType === selectedType;

        return matchesSearch && matchesType;
    });

    const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Freelance'];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 space-y-4 md:space-y-0">
                <h2 className="text-3xl font-bold pb-2 border-b-2 border-black inline-block text-black">
                    Job Opportunities
                </h2>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search jobs and companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64 border border-gray-300 rounded px-6 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        {jobTypes.map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map(job => (
                    <JobCard key={job.id} {...job} />
                ))}
                {filteredJobs.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center">No jobs found.</p>
                )}
            </div>
        </div>
    );
};

export default JobListing;
