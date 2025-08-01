import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Recycle, ShieldCheck, Sparkles } from 'lucide-react';

const practices = [
  {
    icon: Leaf,
    title: 'Organic Feeding',
    description: 'Our cows are fed with 100% organic, pesticide-free fodder for the purest milk.',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    icon: Droplet,
    title: 'Hygienic Milking',
    description: 'We follow strict hygiene protocols to ensure safe, contamination-free milking.',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: Recycle,
    title: 'Sustainable Farming',
    description: 'Our sustainable practices protect the environment and promote biodiversity.',
    bgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: ShieldCheck,
    title: 'No Antibiotics',
    description: 'We never use antibiotics or growth hormones in our dairy herd.',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

const FarmPracticesSection = () => {
  return (
    <section id="farm-practices" className="section-padding bg-gradient-to-br from-dairy-green/10 to-dairy-cream/60 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Farm Practices
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We follow ethical, sustainable, and organic practices to ensure every drop is magical.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {practices.map((practice, idx) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center group hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-24 h-24 mb-6 rounded-full ${practice.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <practice.icon size={48} className={`${practice.iconColor} group-hover:scale-110 transition-transform duration-300`} />
              </div>
              <h3 className="text-xl font-semibold text-dairy-green mb-2">{practice.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{practice.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/farm-practices">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4 inline-block"
              onClick={() => window.scrollTo(0, 0)}
            >
              Learn More
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FarmPracticesSection;