import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ProductsSection from './components/ProductsSection';
import WhyChooseUs from './components/WhyChooseUs';
import FarmPracticesSection from './components/FarmPracticesSection';
import OurCowsSection from './components/OurCowsSection';
import WeCareSection from './components/WeCareSection';
import CareersSection from './components/CareersSection';
import RecipesSection from './components/RecipesSection';
import TestimonialsSection from './components/TestimonialsSection';
import ChatbotWidget from './components/ChatbotWidget';
import CartWidget from './components/CartWidget';
import OrderTrackingDemo from './components/OrderTrackingDemo';
import MyOrdersPage from './components/MyOrdersPage';
import OrderConfirmationPage from './components/OrderConfirmationPage';
import OrderProcessingPage from './components/OrderProcessingPage';
import OrderSuccessPage from './components/OrderSuccessPage';
import CheckoutPage from './components/CheckoutPage';
import JobDetailsPage from './components/JobDetailsPage';
import LoginPage from './components/LoginPage';
import BranchSelectionPage from './components/BranchSelectionPage';
import BranchInfo from './components/BranchInfo';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './components/SignUpPage';
import HowWeCarePage from './components/HowWeCarePage';
import FarmPracticesDetailPage from './components/FarmPracticesDetailPage';
import ProfilePage from './components/ProfilePage';
import ScrollToTop from './components/ScrollToTop';

function MainSections() {
  return (
    <main>
      <Hero />
      <BranchInfo />
      <ProductsSection />
      <MyOrdersPage />
      <OrderTrackingDemo />
      <WhyChooseUs />
      <FarmPracticesSection />
      <OurCowsSection />
      <WeCareSection />
      <CareersSection />
      <RecipesSection />
      <TestimonialsSection />
    </main>
  );
}

function MainApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainSections />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/jobs" element={<JobDetailsPage />} />
        <Route path="/processing" element={<OrderProcessingPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/branch-selection" element={<BranchSelectionPage />} />
        <Route path="/how-we-care" element={<HowWeCarePage />} />
        <Route path="/farm-practices" element={<FarmPracticesDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
      <ChatbotWidget />
      <CartWidget />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;