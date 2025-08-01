import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, DollarSign, Users, Calendar } from 'lucide-react';
import JobApplicationModal from './JobApplicationModal';

const jobs = [
  {
    id: 1,
    title: 'Farm Operations Manager',
    location: 'Greenfield Farm, Bangalore',
    type: 'Full-time',
    salary: '₹8,00,000 - ₹12,00,000 per year',
    experience: '5-8 years',
    department: 'Operations',
    postedDate: '2024-01-15',
    description: 'Lead daily farm operations, ensure animal welfare, and manage a passionate team.',
    responsibilities: [
      'Oversee daily farm operations and ensure optimal productivity',
      'Manage a team of farm workers and coordinate activities',
      'Implement best practices for animal care and welfare',
      'Monitor and maintain farm equipment and infrastructure',
      'Ensure compliance with safety and quality standards',
      'Develop and execute farm improvement plans',
      'Coordinate with veterinary services and suppliers',
      'Maintain accurate records and reports'
    ],
    requirements: [
      'Bachelor\'s degree in Agriculture, Animal Science, or related field',
      'Minimum 5 years of experience in farm management',
      'Strong leadership and team management skills',
      'Knowledge of dairy farming practices and animal care',
      'Excellent problem-solving and decision-making abilities',
      'Good communication and interpersonal skills',
      'Ability to work in outdoor conditions and handle physical tasks',
      'Familiarity with farm management software and tools'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Health insurance and wellness programs',
      'Professional development opportunities',
      'On-site accommodation available',
      'Flexible work arrangements',
      'Employee discount on dairy products',
      'Annual leave and sick leave benefits',
      'Retirement savings plan'
    ]
  },
  {
    id: 2,
    title: 'Dairy Production Specialist',
    location: 'Processing Plant, Mumbai',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹9,00,000 per year',
    experience: '3-6 years',
    department: 'Production',
    postedDate: '2024-01-10',
    description: 'Oversee milk processing, quality control, and product innovation.',
    responsibilities: [
      'Supervise milk processing operations and quality control',
      'Develop and implement new dairy products',
      'Ensure compliance with food safety regulations',
      'Optimize production processes and efficiency',
      'Train and supervise production staff',
      'Maintain quality standards and documentation',
      'Coordinate with R&D team for product development',
      'Monitor equipment performance and maintenance'
    ],
    requirements: [
      'Degree in Food Technology, Dairy Science, or related field',
      '3+ years experience in dairy production',
      'Knowledge of food safety and quality standards',
      'Experience with dairy processing equipment',
      'Strong analytical and problem-solving skills',
      'Attention to detail and quality focus',
      'Good communication and team collaboration skills',
      'Familiarity with HACCP and food safety protocols'
    ],
    benefits: [
      'Competitive salary with performance incentives',
      'Health and dental insurance',
      'Professional training and certification',
      'Modern facility with latest equipment',
      'Career growth opportunities',
      'Employee wellness programs',
      'Paid time off and holidays',
      'Transportation allowance'
    ]
  },
  {
    id: 3,
    title: 'Sustainability Officer',
    location: 'Corporate Office, Delhi',
    type: 'Full-time',
    salary: '₹7,00,000 - ₹10,00,000 per year',
    experience: '4-7 years',
    department: 'Sustainability',
    postedDate: '2024-01-12',
    description: 'Drive eco-friendly initiatives and help us achieve our green goals.',
    responsibilities: [
      'Develop and implement sustainability strategies',
      'Monitor and report on environmental performance',
      'Lead waste reduction and recycling initiatives',
      'Coordinate with suppliers on sustainable practices',
      'Conduct environmental impact assessments',
      'Develop employee sustainability training programs',
      'Track and report on sustainability metrics',
      'Collaborate with external sustainability partners'
    ],
    requirements: [
      'Bachelor\'s degree in Environmental Science, Sustainability, or related field',
      '4+ years experience in sustainability or environmental management',
      'Knowledge of environmental regulations and standards',
      'Experience with sustainability reporting frameworks',
      'Strong project management and analytical skills',
      'Excellent communication and stakeholder management',
      'Familiarity with carbon footprint assessment',
      'Passion for environmental conservation'
    ],
    benefits: [
      'Competitive salary with sustainability bonuses',
      'Comprehensive health and wellness benefits',
      'Professional development and training',
      'Flexible work arrangements',
      'Green commuting incentives',
      'Annual sustainability conference attendance',
      'Health and wellness programs',
      'Retirement and insurance benefits'
    ]
  },
  {
    id: 4,
    title: 'Customer Care Executive',
    location: 'Customer Service Center, Chennai',
    type: 'Full-time',
    salary: '₹3,50,000 - ₹5,50,000 per year',
    experience: '1-3 years',
    department: 'Customer Service',
    postedDate: '2024-01-08',
    description: 'Support our customers and share the magic of our dairy products.',
    responsibilities: [
      'Handle customer inquiries and complaints professionally',
      'Process orders and track deliveries',
      'Provide product information and recommendations',
      'Resolve customer issues and escalate when needed',
      'Maintain customer records and update databases',
      'Collaborate with other departments for issue resolution',
      'Participate in customer satisfaction surveys',
      'Contribute to service improvement initiatives'
    ],
    requirements: [
      'Bachelor\'s degree in any field',
      '1-3 years experience in customer service',
      'Excellent communication and interpersonal skills',
      'Strong problem-solving and conflict resolution abilities',
      'Proficiency in CRM systems and office software',
      'Ability to work in shifts and handle pressure',
      'Patience and empathy in customer interactions',
      'Knowledge of dairy products is a plus'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Health insurance and wellness benefits',
      'Professional development opportunities',
      'Employee discount on products',
      'Flexible work schedules',
      'Team building activities',
      'Paid training and certification',
      'Career advancement opportunities'
    ]
  }
];

const JobDetailsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-dairy-cream/40 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-dairy-green hover:text-green-600 mb-4"
            >
              <ArrowLeft size={20} />
              Back to Careers
            </button>
            <h1 className="text-4xl font-bold text-dairy-green mb-4">
              Open Positions
            </h1>
            <p className="text-xl text-gray-600">
              Join our passionate team and help us deliver the finest dairy products
            </p>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-dairy-green mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={16} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>{job.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign size={16} />
                    <span>{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={16} />
                    <span>{job.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApplyNow(job)}
                    className="flex-1 bg-dairy-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => {
                      // Show detailed job information
                      setSelectedJob(job);
                    }}
                    className="flex-1 border border-dairy-green text-dairy-green hover:bg-dairy-green hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Job Details Modal */}
          {selectedJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedJob(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-dairy-green mb-2">
                        {selectedJob.title}
                      </h2>
                      <p className="text-xl text-gray-600">{selectedJob.description}</p>
                    </div>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <ArrowLeft size={24} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Job Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="font-medium">Location:</span>
                          <span>{selectedJob.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Type:</span>
                          <span>{selectedJob.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Salary:</span>
                          <span>{selectedJob.salary}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Experience:</span>
                          <span>{selectedJob.experience}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Department:</span>
                          <span>{selectedJob.department}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits</h3>
                      <ul className="space-y-2">
                        {selectedJob.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-dairy-green mt-1">•</span>
                            <span className="text-gray-700">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Responsibilities</h3>
                      <ul className="space-y-2">
                        {selectedJob.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-dairy-green mt-1">•</span>
                            <span className="text-gray-700">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {selectedJob.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-dairy-green mt-1">•</span>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setSelectedJob(null);
                        handleApplyNow(selectedJob);
                      }}
                      className="flex-1 bg-dairy-green hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors"
                    >
                      Apply for this Position
                    </button>
                    <button
                      onClick={() => setSelectedJob(null)}
                      className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        job={selectedJob}
      />
    </div>
  );
};

export default JobDetailsPage; 