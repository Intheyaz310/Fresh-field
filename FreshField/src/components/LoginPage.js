import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, User, MapPin, Navigation, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DAIRY_IMAGES = [
  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549921296-3a92f7d8b47d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, updateUserLocation } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestBranch, setNearestBranch] = useState(null);
  const [showBranchSuggestion, setShowBranchSuggestion] = useState(false);

  const validate = () => {
    if (!email || !password) return 'Please fill in all fields.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) && email.length < 3) return 'Enter a valid email or username.';
    return '';
  };

  // BRANCHES data for location-based suggestions
  const BRANCHES = [
    {
      id: 1,
      name: 'MooMagic Dairy - Hyderabad',
      city: 'Hyderabad',
      address: 'Banjara Hills, Road No. 12, Hyderabad, Telangana 500034',
      image: 'https://images.unsplash.com/photo-1549921296-3a92f7d8b47d',
      coordinates: { lat: 17.3850, lng: 78.4867 },
      phone: '+91 40 1234 5678',
      hours: '6:00 AM - 10:00 PM'
    },
    {
      id: 2,
      name: 'MooMagic Dairy - Mumbai',
      city: 'Mumbai',
      address: 'Bandra West, Linking Road, Mumbai, Maharashtra 400050',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      phone: '+91 22 1234 5678',
      hours: '5:30 AM - 11:00 PM'
    },
    {
      id: 3,
      name: 'MooMagic Dairy - Bangalore',
      city: 'Bangalore',
      address: 'Indiranagar, 100 Feet Road, Bangalore, Karnataka 560038',
      image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      phone: '+91 80 1234 5678',
      hours: '6:00 AM - 10:30 PM'
    },
    {
      id: 4,
      name: 'MooMagic Dairy - Delhi',
      city: 'Delhi',
      address: 'Connaught Place, New Delhi, Delhi 110001',
      image: 'https://images.unsplash.com/photo-1582719478176-2f30acdf2df9',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      phone: '+91 11 1234 5678',
      hours: '5:00 AM - 11:00 PM'
    },
    {
      id: 5,
      name: 'MooMagic Dairy - Chennai',
      city: 'Chennai',
      address: 'T Nagar, Usman Road, Chennai, Tamil Nadu 600017',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      phone: '+91 44 1234 5678',
      hours: '5:30 AM - 10:30 PM'
    },
    {
      id: 6,
      name: 'MooMagic Dairy - Pune',
      city: 'Pune',
      address: 'Koregaon Park, North Main Road, Pune, Maharashtra 411001',
      image: 'https://images.unsplash.com/photo-1582719478176-2f30acdf2df9',
      coordinates: { lat: 18.5204, lng: 73.8567 },
      phone: '+91 20 1234 5678',
      hours: '6:00 AM - 10:00 PM'
    }
  ];

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };

  // Detect user location
  const detectLocation = () => {
    setDetectingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          updateUserLocation(location);
          
          // Find nearest branch
          let nearest = null;
          let minDistance = Infinity;
          
          BRANCHES.forEach(branch => {
            const distance = calculateDistance(
              latitude, longitude,
              branch.coordinates.lat, branch.coordinates.lng
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearest = { ...branch, distance: distance.toFixed(1) };
            }
          });
          
          setNearestBranch(nearest);
          setDetectingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setDetectingLocation(false);
        }
      );
    } else {
      setDetectingLocation(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      // Use the API service for login
      await login({ email, password });
      
      if (remember) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      // After successful login, detect location and show branch suggestion
      detectLocation();
      setShowBranchSuggestion(true);
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    // Simulate social login
    setTimeout(() => {
      setLoading(false);
      login({ email: `user@${provider}.com` });
      
      // After successful login, detect location and show branch suggestion
      detectLocation();
      setShowBranchSuggestion(true);
    }, 1000);
  };

  const handleBranchSelect = (branch) => {
    // Use the selectBranch function from the top-level useAuth() call
    selectBranch(branch);
    
    // Navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  // Skip branch selection and go to home
  const skipBranchSelection = () => {
    setShowBranchSuggestion(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left: Login Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-dairy-cream/30">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-dairy-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🥛</span>
            </div>
            <h2 className="text-3xl font-bold text-dairy-green mb-2">Welcome Back</h2>
            <p className="text-gray-600">Login to MooMagic Dairy</p>
          </motion.div>

          <motion.form 
            onSubmit={handleLogin} 
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <label className="block font-semibold mb-1 text-gray-700">Email or Username</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40 transition-all duration-300"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="username"
                  placeholder="Enter your email or username"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block font-semibold mb-1 text-gray-700">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40 transition-all duration-300"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-3 text-dairy-green hover:text-green-600 transition-colors"
                  onClick={() => setShowPassword(s => !s)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="rounded border-gray-300"
                />
                Remember Me
              </label>
              <button type="button" className="text-dairy-green text-sm hover:underline">Forgot Password?</button>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2"
              disabled={!!validate() || loading}
            >
              {loading && <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>}
              Login
            </motion.button>
          </motion.form>

          {/* Social Login */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-6"
          >
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialLogin('facebook')}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition-all duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 text-center text-gray-600"
          >
            New here?{' '}
            <motion.button 
              type="button" 
              className="text-dairy-green font-semibold hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right: Animated Image Carousel */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden bg-dairy-green/10">
        {/* Background Images with Animation */}
        {DAIRY_IMAGES.map((image, index) => (
          <motion.img
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: index === 0 ? 1 : 0, scale: 1 }}
            transition={{ 
              duration: 2, 
              delay: index * 2,
              repeat: Infinity,
              repeatDelay: 4
            }}
            src={image}
            alt={`Dairy Farm ${index + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center scale-105 blur-sm"
          />
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-dairy-green/70 via-dairy-green/50 to-white/20"></div>
        
        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-20 left-10 text-white/80"
        >
          <div className="text-4xl mb-2">🐄</div>
          <div className="text-sm font-medium">Fresh from Farm</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute top-32 right-10 text-white/80"
        >
          <div className="text-4xl mb-2">🥛</div>
          <div className="text-sm font-medium">Pure Quality</div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-32 left-10 text-white/80"
        >
          <div className="text-4xl mb-2">🌾</div>
          <div className="text-sm font-medium">Organic Feed</div>
        </motion.div>
        
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-white text-center px-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-4"
          >
            Welcome to MooMagic Dairy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl font-normal drop-shadow-lg mb-6"
          >
            Pure gold in every sip.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex justify-center gap-4"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <span className="text-2xl">🥛</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <span className="text-2xl">🧈</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <span className="text-2xl">🥛</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Branch Suggestion Modal */}
      <AnimatePresence>
        {showBranchSuggestion && nearestBranch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-dairy-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Branch Suggestion</h3>
                <p className="text-gray-600">We've found a branch near your location!</p>
              </div>
              
              <div className="bg-dairy-cream/30 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin size={18} className="mt-1 text-dairy-green flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800">{nearestBranch.name}</p>
                    <p className="text-sm text-gray-600">{nearestBranch.address}</p>
                    <p className="text-sm font-medium text-dairy-green mt-1">{nearestBranch.distance} km away</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">{nearestBranch.hours}</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleBranchSelect(nearestBranch)}
                  className="bg-dairy-green text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Select This Branch
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/branch-selection')}
                  className="border border-dairy-green text-dairy-green py-3 rounded-lg font-semibold hover:bg-dairy-cream/20 transition-colors"
                >
                  View All Branches
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={skipBranchSelection}
                  className="text-gray-500 py-2 font-medium hover:text-gray-700 transition-colors"
                >
                  Skip for now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}