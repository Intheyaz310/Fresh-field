import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function BranchInfo() {
  const { selectedBranch, isLoggedIn } = useAuth();

  if (!isLoggedIn || !selectedBranch) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-dairy-green rounded-full flex items-center justify-center">
          <MapPin size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">Your Selected Branch</h3>
          <p className="text-sm text-gray-600">MooMagic Dairy</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin size={16} className="mt-1 text-dairy-green" />
          <div>
            <p className="font-semibold text-gray-800">{selectedBranch.name}</p>
            <p className="text-sm text-gray-600">{selectedBranch.address}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Phone size={16} className="text-dairy-green" />
          <p className="text-sm text-gray-600">{selectedBranch.phone}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-dairy-green" />
          <p className="text-sm text-gray-600">{selectedBranch.hours}</p>
        </div>
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 bg-dairy-green text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
        onClick={() => window.location.href = '/branch-selection'}
      >
        Change Branch
      </motion.button>
    </motion.div>
  );
}