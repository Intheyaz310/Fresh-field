import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, selectedBranch, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/images/default-profile.jpg');
  
  // Use user data from context if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        memberSince: user.memberSince || prev.memberSince
      }));
    }
  }, [user]);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: user?.email || 'user@example.com',
    phone: '+91 9876543210',
    address: 'Banjara Hills, Hyderabad',
    memberSince: new Date().toLocaleDateString(),
    bio: 'I love fresh dairy products and sustainable farming practices!'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, you would save to backend here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original values
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-dairy-cream to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative h-48 bg-dairy-green">
            <div className="absolute -bottom-16 left-8 flex items-end">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 bg-dairy-green text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition-colors">
                  <Camera size={16} />
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <div className="mb-4 ml-4">
                <h1 className="text-2xl font-bold text-white">{formData.name}</h1>
                <p className="text-dairy-cream">{selectedBranch?.city || 'No branch selected'}</p>
              </div>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 bg-white text-dairy-green p-2 rounded-full hover:bg-dairy-cream transition-colors"
              >
                <Edit size={18} />
              </button>
            ) : (
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  onClick={handleSave}
                  className="bg-white text-dairy-green p-2 rounded-full hover:bg-dairy-cream transition-colors"
                >
                  <Save size={18} />
                </button>
                <button 
                  onClick={handleCancel}
                  className="bg-white text-red-500 p-2 rounded-full hover:bg-red-100 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Profile Content */}
          <div className="pt-20 pb-8 px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="text-dairy-green" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dairy-green focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-800">{formData.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                    {isEditing ? (
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-2" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dairy-green focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Mail size={16} className="text-dairy-green mr-2" />
                        <p className="text-gray-800">{formData.email}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                    {isEditing ? (
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-400 mr-2" />
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dairy-green focus:border-transparent"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Phone size={16} className="text-dairy-green mr-2" />
                        <p className="text-gray-800">{formData.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="text-dairy-green" />
                  Location & Membership
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dairy-green focus:border-transparent"
                        rows="2"
                      />
                    ) : (
                      <div className="flex items-start">
                        <MapPin size={16} className="text-dairy-green mr-2 mt-1" />
                        <p className="text-gray-800">{formData.address}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Member Since</label>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-dairy-green mr-2" />
                      <p className="text-gray-800">{formData.memberSince}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Preferred Branch</label>
                    <div className="flex items-center">
                      <MapPin size={16} className="text-dairy-green mr-2" />
                      <p className="text-gray-800">
                        {selectedBranch ? (
                          <span>{selectedBranch.name}</span>
                        ) : (
                          <span className="text-gray-500">No branch selected</span>
                        )}
                      </p>
                    </div>
                    <button 
                      onClick={() => navigate('/branch-selection')}
                      className="mt-2 text-sm text-dairy-green hover:underline"
                    >
                      Change branch
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About Me</h2>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dairy-green focus:border-transparent"
                  rows="4"
                />
              ) : (
                <p className="text-gray-700 bg-dairy-cream/30 p-4 rounded-lg">{formData.bio}</p>
              )}
            </div>

            {/* Order History Preview */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
              <div className="rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <p className="text-gray-700">You have 3 recent orders</p>
                  <button 
                    onClick={() => navigate('/orders')}
                    className="text-dairy-green hover:underline"
                  >
                    View all orders
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { id: 'ORD-2023-001', date: '2023-10-15', status: 'Delivered', items: 3, total: '₹450' },
                    { id: 'ORD-2023-002', date: '2023-10-08', status: 'Delivered', items: 2, total: '₹320' },
                    { id: 'ORD-2023-003', date: '2023-09-30', status: 'Processing', items: 5, total: '₹780' },
                  ].map(order => (
                    <motion.div 
                      key={order.id} 
                      className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div>
                        <p className="font-medium text-gray-800">{order.id}</p>
                        <p className="text-sm text-gray-500">{order.date} • {order.items} items • {order.total}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status}
                        </span>
                        <button 
                          onClick={() => navigate(`/orders/${order.id}`)}
                          className="text-dairy-green hover:underline text-sm"
                        >
                          View
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-8 text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;