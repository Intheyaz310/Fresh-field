import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const PAYMENT_OPTIONS = [
  'Cash on Delivery',
  'UPI',
  'Credit/Debit Card',
  'Net Banking',
];

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState('123 Dairy Lane, Greenfield, 560001');
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Use cart from state or context
  const checkoutItems = state?.cart || cart;

  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p className="text-xl mb-4">No items in cart</p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const getTotal = () => {
    return checkoutItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const order = {
        id: 'ORD' + Math.floor(Math.random() * 100000),
        items: checkoutItems,
        address,
        payment,
        total: getTotal(),
        date: new Date().toLocaleString(),
        status: 'Placed',
      };
      
      localStorage.setItem('lastOrder', JSON.stringify(order));
      clearCart();
      setIsProcessing(false);
      navigate('/order-success');
    }, 2000);
  };

  return (
    <div className="min-h-[70vh] bg-dairy-cream/40 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-dairy-green mb-8 text-center">
            Checkout
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      <p className="text-dairy-green font-bold">{item.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{(parseFloat(item.price.replace('₹', '').replace(',', '')) * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-2xl text-dairy-green">₹{getTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment & Delivery */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Payment & Delivery
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2 text-gray-700">
                    Payment Method
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40"
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                  >
                    {PAYMENT_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Delivery Information</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Free delivery for orders above ₹500</li>
                    <li>• Same day delivery for orders placed before 2 PM</li>
                    <li>• Contactless delivery available</li>
                  </ul>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={isProcessing}
                  className="w-full bg-dairy-green hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </>
                  ) : (
                    `Confirm Order - ₹${getTotal().toLocaleString()}`
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 