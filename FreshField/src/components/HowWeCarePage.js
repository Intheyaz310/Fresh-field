import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Heart, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowWeCarePage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const careCategories = [
    {
      id: 1,
      title: 'Animal Welfare',
      icon: <Heart className="text-dairy-green" size={40} />,
      description: 'Our cows are treated with love and respect. They graze freely on open pastures, are never given hormones or unnecessary antibiotics, and receive regular veterinary care.',
      practices: [
        'Free-range grazing on organic pastures',
        'Comfortable, clean living conditions',
        'Regular health check-ups',
        'No hormones or unnecessary antibiotics',
        'Stress-free milking procedures'
      ],
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
      id: 2,
      title: 'Environmental Sustainability',
      icon: <Leaf className="text-dairy-green" size={40} />,
      description: 'We implement sustainable farming practices that protect the environment and reduce our carbon footprint. Our commitment to the planet ensures that future generations can enjoy its bounty.',
      practices: [
        'Solar-powered farm operations',
        'Water conservation and recycling',
        'Organic farming without pesticides',
        'Composting and waste management',
        'Biodiversity preservation'
      ],
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80'
    },
    {
      id: 3,
      title: 'Product Purity',
      icon: <Droplet className="text-dairy-green" size={40} />,
      description: 'Our dairy products are pure, safe, and nutritious. We maintain strict quality control throughout the production process to ensure that you receive only the best.',
      practices: [
        'Rigorous quality testing',
        'No artificial additives or preservatives',
        'Cold chain maintenance',
        'Hygienic processing facilities',
        'Transparent labeling'
      ],
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-dairy-cream pt-24 pb-16">
      <div className="container-custom">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-dairy-green hover:text-green-700 mb-8 transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-dairy-green mb-6">How We Care</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            At MooMagic Dairy, our commitment to care extends to every aspect of our business - from our cows to our customers to our planet.
          </p>
        </motion.div>

        {/* Care Categories */}
        <div className="space-y-24">
          {careCategories.map((category, index) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`grid grid-cols-1 ${index % 2 === 0 ? 'md:grid-cols-[3fr_2fr]' : 'md:grid-cols-[2fr_3fr] md:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Text Content */}
              <div className={index % 2 === 0 ? '' : 'md:order-2'}>
                <div className="flex items-center mb-6">
                  {category.icon}
                  <h2 className="text-3xl font-bold text-gray-800 ml-4">{category.title}</h2>
                </div>
                <p className="text-lg text-gray-700 mb-8">{category.description}</p>
                
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-dairy-green mb-4">Our Practices:</h3>
                  <ul className="space-y-3">
                    {category.practices.map((practice, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
                        className="flex items-start"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-dairy-green mt-2 mr-3"></span>
                        <span>{practice}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Image */}
              <div className={index % 2 === 0 ? 'md:order-2' : ''}>
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  src={category.image}
                  alt={category.title}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-24"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-md">
            <h3 className="text-2xl md:text-3xl font-bold text-dairy-green mb-4">
              Experience Our Commitment to Care
            </h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
              Taste the difference that responsible farming and ethical practices make in every product we offer.
            </p>
            <Link to="/#products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4"
              >
                Shop Our Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowWeCarePage;