import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, setIsCartOpen } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product);
    // Show a brief notification (you can enhance this with a toast)
    setTimeout(() => {
      setIsCartOpen(true);
    }, 100);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-dairy-green text-white px-2 py-1 rounded-full text-sm font-medium">
          {product.category}
        </div>
        <div className="absolute top-4 left-4 flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-dairy-yellow text-dairy-yellow"
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-dairy-green">
            {product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-dairy-green hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200"
            onClick={handleAddToCart}
          >
            <Plus size={16} />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 