import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Send } from 'lucide-react';

const JobApplicationModal = ({ isOpen, onClose, job }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Application submitted successfully! We will get back to you soon.');
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        experience: '',
        coverLetter: '',
        resume: null,
      });
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-dairy-green">Apply for Position</h2>
                  <p className="text-gray-600 mt-1">{job?.title}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Years of Experience
                    </label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                      className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green"
                    >
                      <option value="">Select experience</option>
                      <option value="0-1">0-1 years</option>
                      <option value="1-3">1-3 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="5-10">5-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    Cover Letter
                  </label>
                  <textarea
                    value={formData.coverLetter}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-dairy-green/30 rounded-lg p-6 text-center">
                    <Upload className="mx-auto text-dairy-green mb-2" size={32} />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      required
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <p className="text-gray-600 mb-2">
                        {formData.resume ? formData.resume.name : 'Click to upload your resume'}
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF, DOC, or DOCX files only (max 5MB)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2">Application Process</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• We'll review your application within 48 hours</li>
                    <li>• Shortlisted candidates will be contacted for interviews</li>
                    <li>• All applications are kept confidential</li>
                  </ul>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-dairy-green hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default JobApplicationModal; 