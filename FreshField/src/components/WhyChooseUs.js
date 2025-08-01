import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Truck, Award, Heart } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Leaf,
      title: '100% Organic',
      description: 'All our products are certified organic, free from harmful chemicals and pesticides.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We maintain the highest standards of quality in every step of our production process.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your fresh dairy products delivered to your doorstep within hours of milking.'
    },
    {
      icon: Heart,
      title: 'Freshness Guaranteed',
      description: 'We guarantee the freshness of all our products with our farm-to-table approach.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10 z-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1595854341625-f33e09b6b2f9?w=1600&auto=format&fit=crop')" }}></div>
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Why Choose MooMagic Dairy?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to bringing you the finest dairy products with unmatched quality and service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-dairy-green rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-600 transition-colors duration-300"
              >
                <feature.icon size={32} className="text-white" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 bg-dairy-green rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-base opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Farm Partners</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm md:text-base opacity-90">Products Delivered</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm md:text-base opacity-90">Customer Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;