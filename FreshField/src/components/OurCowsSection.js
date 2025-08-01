import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';

const cows = [
  {
    image: 'https://i.ytimg.com/vi/csBjiupusLM/maxresdefault.jpg', // Updated image for Gir Cow Grazing
    breed: 'Gir Cow Grazing',
    description: 'Our cows are free-grazing, stress-free, and well cared for.'
  },
  {
    image: 'https://th.bing.com/th/id/OIP.zTYUmDhw3AjE76q9xQGAmwHaFa?w=235&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7', // Updated image for Cow in Open Field
    breed: 'Cow in Open Field',
    description: 'Our cows are free-grazing, stress-free, and well cared for.'
  },
  {
    image: 'https://www.dairyindustries.com/wp-content/uploads/Gir-cows-India-shutterstock_196435720610385.jpg', // Updated image for Happy Cows on Farm
    breed: 'Happy Cows on Farm',
    description: 'Our cows are free-grazing, stress-free, and well cared for.'
  },
  {
    image: '/images/happy-cow-grazing.jpg',
    breed: 'Happy Cow Grazing',
    description: 'Our cows enjoy the lush green pastures of our organic farm.'
  },
  {
    image: '/images/farm-greenery.jpg',
    breed: 'Farm Greenery',
    description: 'The natural environment where our cows thrive and produce quality milk.'
  },
  {
    image: '/images/dairy-farm-landscape.jpg',
    breed: 'Dairy Farm Landscape',
    description: 'Our sustainable farm practices ensure a healthy ecosystem for our cows.'
  },
];

const OurCowsSection = () => {
  const [current, setCurrent] = useState(0);

  const nextCow = () => setCurrent((prev) => (prev + 1) % cows.length);
  const prevCow = () => setCurrent((prev) => (prev - 1 + cows.length) % cows.length);

  return (
    <section id="our-cows" className="section-padding relative bg-dairy-cream overflow-hidden">
      {/* Farm background overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&h=600&fit=crop"
          alt="Farm background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-dairy-cream/90"></div>
      </div>
      <div className="relative z-10 container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
            <Leaf className="text-dairy-green" size={32} />
            Our Happy Cows
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the gentle, healthy cows that make our milk magical. We ensure their well-being with free grazing, organic feed, and a stress-free environment.
          </p>
        </motion.div>
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8"
            >
              <img
                src={cows[current].image}
                alt={cows[current].breed}
                className="w-64 h-48 object-cover rounded-xl border-4 border-dairy-green shadow-md"
                loading="lazy"
              />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-dairy-green mb-2">{cows[current].breed}</h3>
                <p className="text-gray-700 mb-4">{cows[current].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Carousel Controls */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevCow}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-dairy-green text-dairy-green hover:text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
            aria-label="Previous Cow"
          >
            <ChevronLeft size={24} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextCow}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-dairy-green text-dairy-green hover:text-white p-3 rounded-full shadow-lg backdrop-blur-sm"
            aria-label="Next Cow"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {cows.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${idx === current ? 'bg-dairy-green' : 'bg-gray-300'}`}
              aria-label={`Go to cow ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurCowsSection;