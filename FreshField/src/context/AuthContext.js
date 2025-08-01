import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  // Check for existing login state on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check if user is authenticated using API service
        if (ApiService.isAuthenticated()) {
          const currentUser = ApiService.getCurrentUser();
          if (currentUser) {
            setIsLoggedIn(true);
            setUser(currentUser);
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid auth data
        ApiService.logout();
      }
    };

    checkAuthStatus();

    // Load saved branch and location
    const savedBranch = localStorage.getItem('selectedBranch');
    const savedLocation = localStorage.getItem('userLocation');

    if (savedBranch) {
      try {
        setSelectedBranch(JSON.parse(savedBranch));
      } catch (error) {
        console.error('Error parsing saved branch:', error);
      }
    }

    if (savedLocation) {
      try {
        setUserLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await ApiService.login(credentials);
      setIsLoggedIn(true);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await ApiService.register(userData);
      setIsLoggedIn(true);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setSelectedBranch(null);
    setUserLocation(null);
    ApiService.logout();
    localStorage.removeItem('selectedBranch');
    localStorage.removeItem('userLocation');
    localStorage.removeItem('rememberMe');
  };

  const selectBranch = (branch) => {
    setSelectedBranch(branch);
    localStorage.setItem('selectedBranch', JSON.stringify(branch));
  };

  const updateUserLocation = (location) => {
    setUserLocation(location);
    localStorage.setItem('userLocation', JSON.stringify(location));
  };

  const value = {
    isLoggedIn,
    user,
    selectedBranch,
    userLocation,
    login,
    register,
    logout,
    selectBranch,
    updateUserLocation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 