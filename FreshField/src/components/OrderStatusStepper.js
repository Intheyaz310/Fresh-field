import React from 'react';
import { motion } from 'framer-motion';

export default function OrderStatusStepper({ status, statuses }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {statuses.map((step, idx) => (
        <div key={step.label} className="flex-1 flex flex-col items-center">
          <motion.div
            className={`w-10 h-10 flex items-center justify-center rounded-full text-2xl font-bold
              ${idx <= status ? 'bg-dairy-green text-white' : 'bg-gray-200 text-gray-400'}
            `}
            initial={{ scale: 0.8 }}
            animate={{ scale: idx === status ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {step.icon}
          </motion.div>
          <span className={`mt-2 text-sm ${idx <= status ? 'text-dairy-green' : 'text-gray-400'}`}>
            {step.label}
          </span>
          {idx < statuses.length - 1 && (
            <div className={`h-1 w-full ${idx < status ? 'bg-dairy-green' : 'bg-gray-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
} 