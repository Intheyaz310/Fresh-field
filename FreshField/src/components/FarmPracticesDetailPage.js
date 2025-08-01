import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, Droplet, Recycle, ShieldCheck, Sparkles, ArrowLeft, Tractor, Sprout, Milk, Thermometer } from 'lucide-react';

const FarmPracticesDetailPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 bg-dairy-cream/30">
      {/* Hero Section with Farm Background */}
      <div className="relative h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/farm-background.jpg.svg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container-custom relative h-full flex flex-col justify-center items-center text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Our Farm Practices
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl"
          >
            Discover how we maintain the highest standards in dairy farming
          </motion.p>
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="container-custom py-6">
        <Link to="/" className="inline-flex items-center text-dairy-green hover:text-dairy-brown transition-colors">
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Introduction */}
      <section className="container-custom py-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-dairy-brown mb-6"
          >
            Our Commitment to Excellence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-700 mb-8"
          >
            At MooMagic Dairy, we believe that exceptional milk comes from exceptional care. Our farm practices are built on principles of sustainability, animal welfare, and rigorous quality standards. Every decision we make is guided by our commitment to producing the purest, most nutritious dairy products while respecting our environment and our animals.
          </motion.p>
        </div>
      </section>

      {/* Hygiene Practices Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dairy-brown mb-4">
              Hygienic Milking Practices
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our rigorous hygiene protocols ensure that every drop of milk is collected in the cleanest possible environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/images/hygiene-milking.jpg.svg" 
                alt="Hygienic Milking Process" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-dairy-green mb-4">State-of-the-Art Milking Facilities</h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: Droplet,
                    title: 'Pre-Milking Sanitization',
                    description: 'Each cow\'s udder is thoroughly cleaned and sanitized before milking to prevent contamination.'
                  },
                  {
                    icon: Thermometer,
                    title: 'Temperature-Controlled Storage',
                    description: 'Milk is immediately cooled and stored at optimal temperatures to preserve freshness and prevent bacterial growth.'
                  },
                  {
                    icon: Milk,
                    title: 'Automated Milking Systems',
                    description: 'Our gentle automated systems minimize handling and reduce the risk of contamination.'
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Regular Equipment Sterilization',
                    description: 'All milking equipment is thoroughly sterilized between uses following strict protocols.'
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <item.icon size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainable Farming Section */}
      <section className="py-16 bg-dairy-cream/30">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dairy-brown mb-4">
              Sustainable Farming Practices
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We're committed to environmentally responsible farming that preserves our land for future generations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h3 className="text-2xl font-semibold text-dairy-green mb-4">Eco-Friendly Innovations</h3>
              <ul className="space-y-4">
                {[
                  {
                    icon: Recycle,
                    title: 'Waste Management',
                    description: 'We convert animal waste into natural fertilizer and implement advanced composting systems.'
                  },
                  {
                    icon: Sprout,
                    title: 'Rotational Grazing',
                    description: 'Our rotational grazing system promotes healthy pastures and prevents soil erosion.'
                  },
                  {
                    icon: Tractor,
                    title: 'Reduced Carbon Footprint',
                    description: 'We use energy-efficient equipment and renewable energy sources throughout our operations.'
                  },
                  {
                    icon: Leaf,
                    title: 'Water Conservation',
                    description: 'Our water recycling systems and rainwater collection minimize our environmental impact.'
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="bg-emerald-100 p-3 rounded-full mr-4">
                      <item.icon size={24} className="text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-1 md:order-2"
            >
              <img 
                src="/images/sustainable-farming.jpg.svg" 
                alt="Sustainable Farming Practices" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organic Feeding Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-dairy-brown mb-4">
              Organic Feeding Program
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our cows enjoy a balanced, 100% organic diet that promotes their health and produces exceptional milk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/images/organic-feeding.jpg.svg" 
                alt="Organic Cow Feed" 
                className="rounded-lg shadow-lg w-full h-auto object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold text-dairy-green mb-4">Premium Nutrition</h3>
              <p className="text-gray-700 mb-6">
                Our cows graze on lush, pesticide-free pastures and are supplemented with organic grains and minerals. This balanced diet ensures they receive all the nutrients they need while producing milk of exceptional quality and taste.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-dairy-green mb-2">Our Feed Standards:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ShieldCheck size={20} className="text-green-600 mr-2" />
                    <span>100% certified organic ingredients</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck size={20} className="text-green-600 mr-2" />
                    <span>No synthetic pesticides or fertilizers</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck size={20} className="text-green-600 mr-2" />
                    <span>No GMO components</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheck size={20} className="text-green-600 mr-2" />
                    <span>No antibiotics or growth hormones</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dairy-green text-white">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Experience the MooMagic Difference
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl max-w-2xl mx-auto mb-8"
          >
            Our commitment to exceptional farm practices results in dairy products that are pure, nutritious, and delicious.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/#products">
              <button className="bg-white text-dairy-green hover:bg-dairy-cream hover:text-dairy-brown transition-colors font-semibold px-8 py-4 rounded-lg text-lg shadow-lg">
                Shop Our Products
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FarmPracticesDetailPage;