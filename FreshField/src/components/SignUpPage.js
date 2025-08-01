import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, User, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DAIRY_IMAGES = [
  'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1549921296-3a92f7d8b47d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'
];

export default function SignUpPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    if (!name || !email || !password || !confirmPassword) return 'Please fill in all fields.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Enter a valid email address.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return '';
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      // Use the API service for registration
      await register({ name, email, password });
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">
      {/* Left: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-white to-dairy-cream/30">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/95 backdrop-blur-sm border border-white/20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="w-16 h-16 bg-dairy-green rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🧑‍🌾</span>
            </div>
            <h2 className="text-3xl font-bold text-dairy-green mb-2">Create Your Account</h2>
            <p className="text-gray-600">Sign up to MooMagic Dairy</p>
          </motion.div>

          <motion.form
            onSubmit={handleSignUp}
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
              <label className="block font-semibold mb-1 text-gray-700">Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40 transition-all duration-300"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  autoComplete="name"
                  placeholder="Enter your name"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <label className="block font-semibold mb-1 text-gray-700">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40 transition-all duration-300"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <label className="block font-semibold mb-1 text-gray-700">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40 transition-all duration-300"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Create a password"
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
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <label className="block font-semibold mb-1 text-gray-700">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40 transition-all duration-300"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-3 text-dairy-green hover:text-green-600 transition-colors"
                  onClick={() => setShowConfirm(s => !s)}
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm"
                >
                  Account created! Redirecting to login...
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn-primary w-full text-lg py-3 flex items-center justify-center gap-2"
              disabled={!!validate() || loading || success}
            >
              {loading && <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>}
              Sign Up
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-6 text-center text-gray-600"
          >
            Already have an account?{' '}
            <motion.button
              type="button"
              className="text-dairy-green font-semibold hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Right: Animated Image Carousel */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden bg-dairy-green/10">
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
        <div className="absolute inset-0 bg-gradient-to-br from-dairy-green/70 via-dairy-green/50 to-white/20"></div>
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
            Join MooMagic Dairy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xl font-normal drop-shadow-lg mb-6"
          >
            Pure gold in every sip.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}