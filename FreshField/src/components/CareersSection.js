import React, { useState } from 'react';
import { motion } from 'framer-motion';
import JobApplicationModal from './JobApplicationModal';

const jobs = [
  {
    title: 'Farm Operations Manager',
    description: 'Lead daily farm operations, ensure animal welfare, and manage a passionate team.',
  },
  {
    title: 'Dairy Production Specialist',
    description: 'Oversee milk processing, quality control, and product innovation.',
  },
  {
    title: 'Sustainability Officer',
    description: 'Drive eco-friendly initiatives and help us achieve our green goals.',
  },
  {
    title: 'Customer Care Executive',
    description: 'Support our customers and share the magic of our dairy products.',
  },
];

const CareersSection = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleViewJobs = () => {
    // Navigate to jobs page
    window.location.href = '/jobs';
  };

  return (
  <section id="careers" className="section-padding bg-dairy-cream relative overflow-hidden">
    {/* Background/Side Image */}
    <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block z-0">
      <img
        src="https://images.unsplash.com/photo-1554774853-b414d2d3b77f"
        alt="Careers at Dairy Farm"
        className="w-full h-full object-cover opacity-30"
        loading="lazy"
      />
    </div>
    <div className="relative z-10 container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-dairy-green mb-4">
          Join Our Team
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto">
          Are you passionate about dairy, sustainability, and making a difference? Explore our open positions and help us shape the future of dairy.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {jobs.map((job, idx) => (
          <motion.div
            key={job.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start text-left group hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-semibold text-dairy-green mb-2">{job.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{job.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-6 py-2 text-base mt-auto"
              onClick={() => handleApplyNow(job)}
            >
              Apply Now
            </motion.button>
          </motion.div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary text-lg px-8 py-4"
          onClick={handleViewJobs}
        >
          View Openings
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-secondary text-lg px-8 py-4"
          onClick={() => handleApplyNow(jobs[0])}
        >
          Apply Now
        </motion.button>
      </div>
    </div>
    
    {/* Job Application Modal */}
    <JobApplicationModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      job={selectedJob}
    />
  </section>
);
};

export default CareersSection; 