import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const ProductShowcaseModal = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show a brief success message
    const button = document.getElementById(`add-${product.id}`);
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = 'Added!';
      button.className = 'bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium';
      setTimeout(() => {
        button.innerHTML = originalText;
        button.className = 'bg-dairy-green hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors';
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-3xl font-bold text-dairy-green">Our Fresh Products</h2>
                  <p className="text-gray-600 mt-1">Discover our premium dairy products</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Products Grid */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                    >
                      {/* Product Image */}
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-dairy-green text-white px-2 py-1 rounded-full text-sm font-medium">
                          {product.category}
                        </div>
                        <div className="absolute top-4 left-4 flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className="fill-dairy-yellow text-dairy-yellow"
                            />
                          ))}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-dairy-green">
                            {product.price}
                          </span>
                          <button
                            id={`add-${product.id}`}
                            onClick={() => handleAddToCart(product)}
                            className="bg-dairy-green hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-1"
                          >
                            <Plus size={14} />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Ready to Order?
                    </h3>
                    <p className="text-green-700 mb-4">
                      Add products to your cart and enjoy fresh dairy delivered to your doorstep!
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          onClose();
                          // Scroll to products section
                          setTimeout(() => {
                            const productsSection = document.getElementById('products');
                            if (productsSection) {
                              productsSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }, 300);
                        }}
                        className="bg-dairy-green hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        View All Products
                      </button>
                      <button
                        onClick={onClose}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProductShowcaseModal; 