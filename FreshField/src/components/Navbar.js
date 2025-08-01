import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, User, LogOut, MapPin, LogIn, ChevronDown, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Animated Logo Component
const AnimatedLogo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Trigger animation on hover
  const triggerAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      onHoverStart={triggerAnimation}
      className="flex items-center space-x-2 cursor-pointer"
    >
      <div className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-dairy-green flex items-center justify-center"
          animate={{
            opacity: isAnimating ? [1, 0.5, 1] : 1,
            scale: isAnimating ? [1, 1.1, 1] : 1,
            backgroundColor: isAnimating ? ['#7FB069', '#F4E285', '#7FB069'] : '#7FB069'
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <span className="text-white font-bold text-lg">MM</span>
        </motion.div>
        
        {isAnimating && (
          <motion.div
            className="absolute inset-0 bg-transparent"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40">
              <g fill="none" stroke="#F4E285" strokeWidth="1">
                <motion.path
                  d="M20 5 L25 20 L20 35 L15 20 Z"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="20" cy="20" r="15"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                />
              </g>
            </svg>
          </motion.div>
        )}
      </div>
      
      <div>
        <motion.span
          className="text-xl font-bold text-dairy-brown"
          whileHover={{ scale: 1.05 }}
        >
          MooMagic Dairy
        </motion.span>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { isLoggedIn, user, selectedBranch, logout } = useAuth();
  const { getCartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = React.useRef(null);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Function to handle navigation and scrolling
  const handleNavigation = (path, sectionId) => {
    if (location.pathname === '/' && sectionId) {
      // If we're already on the home page, scroll to the section
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    // Otherwise navigate to the path
    navigate(path);
  };

  const navItems = [
    { name: 'Home', path: '/', sectionId: 'home' },
    { name: 'Products', path: '/', sectionId: 'products' },
    { name: 'About Us', path: '/', sectionId: 'about' },
    { name: 'Careers', path: '/', sectionId: 'careers' },
    { name: 'Our Cows', path: '/', sectionId: 'our-cows' },
    { name: 'Recipes', path: '/', sectionId: 'recipes' },
    { name: 'Contact', path: '/', sectionId: 'contact' },
  ];
  
  const dropdownItems = [
    { name: 'How We Care', path: '/how-we-care', sectionId: null },
    { name: 'Farm Practices', path: '/farm-practices', sectionId: null },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Animated Logo */}
          <div onClick={() => handleNavigation('/', null)} style={{ cursor: 'pointer' }}>
            <AnimatedLogo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                onClick={() => handleNavigation(item.path, item.sectionId)}
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 hover:text-dairy-green font-medium transition-colors duration-200 cursor-pointer"
              >
                {item.name}
              </motion.div>
            ))}
            
            {/* Dropdown for How We Care and Farm Practices */}
            <div className="relative" ref={dropdownRef}>
              <motion.div
                className="flex items-center gap-1 text-gray-700 hover:text-dairy-green font-medium transition-colors duration-200 cursor-pointer"
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                whileHover={{ scale: 1.05 }}
              >
                <span>Our Practices</span>
                <ChevronDown size={16} className={`transition-transform ${desktopDropdownOpen ? 'rotate-180' : ''}`} />
              </motion.div>
              
              <AnimatePresence>
                {desktopDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden z-50"
                  >
                    {dropdownItems.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          handleNavigation(item.path, item.sectionId);
                          setDesktopDropdownOpen(false);
                        }}
                        className="px-4 py-2 text-gray-700 hover:bg-dairy-cream hover:text-dairy-green transition-colors duration-200 cursor-pointer"
                      >
                        {item.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {selectedBranch && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-dairy-cream px-3 py-1 rounded-lg">
                    <MapPin size={14} />
                    <span>{selectedBranch.city}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 text-dairy-green hover:bg-dairy-cream rounded-lg transition-colors duration-200 relative"
                    title={user?.email}
                    aria-label="User Profile"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    <User size={16} />
                    {showProfileDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-gray-100">
                          <div className="font-medium text-gray-800">{user?.email}</div>
                          <div className="text-sm text-gray-500">Member since {new Date().toLocaleDateString()}</div>
                        </div>
                        <div className="p-2">
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-dairy-cream/50 rounded-lg flex items-center gap-2"
                            onClick={() => navigate('/profile')}
                          >
                            <User size={14} /> My Profile
                          </button>

                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-dairy-cream/50 rounded-lg flex items-center gap-2"
                            onClick={() => navigate('/branch-selection')}
                          >
                            <MapPin size={14} /> Change Branch
                          </button>
                          <button 
                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
                            onClick={logout}
                          >
                            <LogOut size={14} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 bg-dairy-green text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  <LogIn size={16} />
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('/', 'products')}
                  className="btn-primary"
                >
                  Shop Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-2 text-dairy-green hover:bg-dairy-cream rounded-lg transition-colors duration-200"
                >
                  <ShoppingCart size={20} />
                  {getCartCount() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getCartCount()}
                    </span>
                  )}
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOpen(!isOpen);
                if (!isOpen) {
                  setMobileDropdownOpen(false);
                }
              }}
              className="p-2 text-dairy-green hover:bg-dairy-cream rounded-lg transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="block text-gray-700 hover:text-dairy-green font-medium transition-colors duration-200 cursor-pointer"
                  onClick={() => {
                    handleNavigation(item.path, item.sectionId);
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </div>
              ))}
              
              {/* Mobile dropdown for How We Care and Farm Practices */}
              <div className="block">
                <div 
                  className="flex items-center justify-between text-gray-700 hover:text-dairy-green font-medium transition-colors duration-200 cursor-pointer"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                >
                  <span>Our Practices</span>
                  <ChevronDown size={16} className={`transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                
                <AnimatePresence>
                  {mobileDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-2 space-y-2 border-l-2 border-dairy-cream"
                    >
                      {dropdownItems.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => {
                            handleNavigation(item.path, item.sectionId);
                            setIsOpen(false);
                            setMobileDropdownOpen(false);
                          }}
                          className="block text-gray-600 hover:text-dairy-green transition-colors duration-200 cursor-pointer"
                        >
                          {item.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="pt-4 space-y-2">
                <button 
                className="btn-primary w-full"
                onClick={() => {
                  handleNavigation('/', 'products');
                  setIsOpen(false);
                }}
              >Shop Now</button>
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  View Cart ({getCartCount()})
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;