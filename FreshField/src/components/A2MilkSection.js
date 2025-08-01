import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const benefits = [
  'Easy to digest for most people',
  'Rich in nutrients and proteins',
  'Better for health and well-being',
];

const A2MilkSection = () => {
  return (
    <section id="a2-milk" className="section-padding bg-white">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dairy-green mb-6">
            Why Choose A2 Milk?
          </h2>
          <ul className="mb-8 space-y-4">
            {benefits.map((benefit, idx) => (
              <li key={benefit} className="flex items-center text-lg text-gray-700">
                <CheckCircle className="text-dairy-green mr-3" size={24} />
                {benefit}
              </li>
            ))}
          </ul>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
          >
            Know More
          </motion.button>
        </motion.div>
        {/* Right: Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1601924638867-3ec5d1c9b79f"
            alt="A2 Milk Bottle"
            className="w-64 h-80 object-cover rounded-2xl shadow-lg border-4 border-dairy-green"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default A2MilkSection; 