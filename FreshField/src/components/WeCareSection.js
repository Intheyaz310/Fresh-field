import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const WeCareSection = () => (
  <section className="section-padding bg-white">
    <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left: Text */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-dairy-green mb-6">
          We Care for Health and Nature
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          We are committed to animal welfare, customer health, and environmental sustainability. Our cows are treated with love and respect, our products are pure and safe, and our farming methods protect the planet for future generations.
        </p>
        <Link to="/how-we-care">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
            onClick={() => window.scrollTo(0, 0)}
          >
            See How We Care
          </motion.button>
        </Link>
      </motion.div>
      {/* Right: Image */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex justify-center"
      >
        <img
          src="https://i.pinimg.com/originals/65/50/17/655017fd9d7fdbe020023a2ff907e7b4.jpg"
          alt="We Care for Health and Nature"
          className="w-full max-w-md h-80 object-cover rounded-2xl shadow-lg border-4 border-dairy-green"
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

export default WeCareSection;