import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, ChefHat, X } from 'lucide-react';
import { recipes } from '../data/products';

const RecipesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <section id="recipes" className="section-padding bg-dairy-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Delicious Recipes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing recipes you can create with our fresh dairy products.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Recipe Carousel */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Recipe Image */}
                  <div className="relative">
                    <img
                      src={recipes[currentIndex].image}
                      alt={recipes[currentIndex].name}
                      className="w-full h-64 md:h-80 object-cover rounded-xl"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-dairy-green">
                      <ChefHat size={16} className="inline mr-1" />
                      {recipes[currentIndex].difficulty}
                    </div>
                  </div>

                  {/* Recipe Content */}
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                      {recipes[currentIndex].name}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {recipes[currentIndex].description}
                    </p>
                    
                    <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
                      <div className="flex items-center space-x-2 text-dairy-green">
                        <Clock size={20} />
                        <span className="font-medium">{recipes[currentIndex].time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-dairy-brown">
                        <ChefHat size={20} />
                        <span className="font-medium">{recipes[currentIndex].difficulty}</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                      onClick={openModal}
                    >
                      View Recipe
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Modal for Recipe Details */}
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              >
                <motion.div
                  initial={{ scale: 0.9, y: 40 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 40 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative"
                >
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-dairy-green hover:text-red-500"
                    aria-label="Close"
                  >
                    <X size={28} />
                  </button>
                  <img
                    src={recipes[currentIndex].image}
                    alt={recipes[currentIndex].name}
                    className="w-full h-56 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-2xl font-bold text-dairy-green mb-2">{recipes[currentIndex].name}</h3>
                  <p className="text-gray-700 mb-2">{recipes[currentIndex].description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-dairy-green">
                      <Clock size={18} />
                      <span className="font-medium">{recipes[currentIndex].time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-dairy-brown">
                      <ChefHat size={18} />
                      <span className="font-medium">{recipes[currentIndex].difficulty}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">How to Make:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-2">
                    {recipes[currentIndex].details && recipes[currentIndex].details.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ol>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-dairy-green p-3 rounded-full shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-dairy-green p-3 rounded-full shadow-lg backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {recipes.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-dairy-green' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipesSection; 