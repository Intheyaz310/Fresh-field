import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BRANCHES = [
  // Telangana Districts
  {
    id: 1,
    name: 'MooMagic Dairy - Hyderabad',
    city: 'Hyderabad',
    address: 'Banjara Hills, Road No. 12, Hyderabad, Telangana 500034',
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&auto=format&fit=crop',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    phone: '+91 40 1234 5678',
    hours: '6:00 AM - 10:00 PM'
  },
  {
    id: 2,
    name: 'MooMagic Dairy - Warangal',
    city: 'Warangal',
    address: '456 Milk Avenue, Warangal, Telangana 506002',
    image: 'https://images.unsplash.com/photo-1596443686116-d288f8dc4a3d?w=800&auto=format&fit=crop',
    coordinates: { lat: 17.9689, lng: 79.5941 },
    phone: '+91 870 1234 5678',
    hours: '5:30 AM - 10:00 PM'
  },
  {
    id: 3,
    name: 'MooMagic Dairy - Karimnagar',
    city: 'Karimnagar',
    address: '789 Cream Street, Karimnagar, Telangana 505001',
    image: 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?w=800&auto=format&fit=crop',
    coordinates: { lat: 18.4392, lng: 79.1282 },
    phone: '+91 878 1234 5678',
    hours: '6:00 AM - 9:30 PM'
  },
  {
    id: 4,
    name: 'MooMagic Dairy - Nizamabad',
    city: 'Nizamabad',
    address: '101 Butter Road, Nizamabad, Telangana 503001',
    image: 'https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?w=800&auto=format&fit=crop',
    coordinates: { lat: 18.6725, lng: 78.0941 },
    phone: '+91 846 1234 5678',
    hours: '5:00 AM - 10:00 PM'
  },
  {
    id: 5,
    name: 'MooMagic Dairy - Khammam',
    city: 'Khammam',
    address: '202 Yogurt Plaza, Khammam, Telangana 507002',
    image: 'https://images.unsplash.com/photo-1530507629858-e3759c371e91?w=800&auto=format&fit=crop',
    coordinates: { lat: 17.2473, lng: 80.1514 },
    phone: '+91 874 1234 5678',
    hours: '6:30 AM - 9:00 PM'
  },
  // Andhra Pradesh Districts
  {
    id: 6,
    name: 'MooMagic Dairy - Visakhapatnam',
    city: 'Visakhapatnam',
    address: '303 Cheese Boulevard, Visakhapatnam, Andhra Pradesh 530001',
    image: 'https://images.unsplash.com/photo-1594761051656-153faa4ea454?w=800&auto=format&fit=crop',
    coordinates: { lat: 17.6868, lng: 83.2185 },
    phone: '+91 891 1234 5678',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 7,
    name: 'MooMagic Dairy - Vijayawada',
    city: 'Vijayawada',
    address: '404 Butter Lane, Vijayawada, Andhra Pradesh 520001',
    image: 'https://images.unsplash.com/photo-1535700601052-b90a78c466f5?w=800&auto=format&fit=crop',
    coordinates: { lat: 16.5062, lng: 80.6480 },
    phone: '+91 866 1234 5678',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 8,
    name: 'MooMagic Dairy - Tirupati',
    city: 'Tirupati',
    address: '505 Milk Road, Tirupati, Andhra Pradesh 517501',
    image: 'https://images.unsplash.com/photo-1595854341625-f33e09b6b2f9?w=800&auto=format&fit=crop',
    coordinates: { lat: 13.6288, lng: 79.4192 },
    phone: '+91 877 1234 5678',
    hours: '5:30 AM - 9:30 PM'
  },
  {
    id: 9,
    name: 'MooMagic Dairy - Guntur',
    city: 'Guntur',
    address: '606 Dairy Plaza, Guntur, Andhra Pradesh 522001',
    image: 'https://images.unsplash.com/photo-1568454537842-d933259bb1ce?w=800&auto=format&fit=crop',
    coordinates: { lat: 16.3067, lng: 80.4365 },
    phone: '+91 863 1234 5678',
    hours: '6:00 AM - 9:00 PM'
  },
  {
    id: 10,
    name: 'MooMagic Dairy - Nellore',
    city: 'Nellore',
    address: '707 Cream Avenue, Nellore, Andhra Pradesh 524001',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?w=800&auto=format&fit=crop',
    coordinates: { lat: 14.4426, lng: 79.9865 },
    phone: '+91 861 1234 5678',
    hours: '6:30 AM - 9:30 PM'
  }
];

export default function BranchSelectionPage() {
  const navigate = useNavigate();
  const { selectBranch, updateUserLocation } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [nearestBranch, setNearestBranch] = useState(null);

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
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

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    // Use AuthContext to select branch
    selectBranch(branch);
    
    // Navigate to home page
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  // Auto-navigate to home if user doesn't want to select branch
  const skipBranchSelection = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dairy-cream to-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Select Your Nearest Branch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the MooMagic Dairy branch closest to you for the freshest dairy products
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={skipBranchSelection}
            className="mt-4 text-dairy-green hover:underline font-medium"
          >
            Skip for now
          </motion.button>
        </motion.div>

        {/* Location Detection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={detectLocation}
            disabled={detectingLocation}
            className="bg-dairy-green text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {detectingLocation ? (
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid"></span>
            ) : (
              <Navigation size={20} />
            )}
            {detectingLocation ? 'Detecting Location...' : 'Detect My Location'}
          </motion.button>
          
          {nearestBranch && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg inline-block"
            >
              <p className="text-green-800 font-medium">
                📍 Nearest branch: {nearestBranch.name} ({nearestBranch.distance} km away)
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {BRANCHES.map((branch, index) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{branch.city}</h3>
                  <p className="text-sm opacity-90">{branch.hours}</p>
                </div>
                {nearestBranch?.id === branch.id && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle size={12} />
                    Nearest
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h4 className="font-bold text-lg text-gray-800 mb-2">{branch.name}</h4>
                <div className="flex items-start gap-2 text-gray-600 mb-3">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <p className="text-sm">{branch.address}</p>
                </div>
                <p className="text-sm text-gray-500 mb-4">{branch.phone}</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleBranchSelect(branch)}
                  className="w-full bg-dairy-green text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Select Branch
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Branch Animation */}
        <AnimatePresence>
          {selectedBranch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center"
              >
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Branch Selected!
                </h3>
                <p className="text-gray-600 mb-4">
                  You've selected {selectedBranch.name}
                </p>
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-dairy-green border-solid mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Redirecting to homepage...</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}