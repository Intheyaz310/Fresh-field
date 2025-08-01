import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PAYMENT_OPTIONS = [
  'Cash on Delivery',
  'UPI',
  'Credit/Debit Card',
];

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  const [address, setAddress] = useState('123 Dairy Lane, Greenfield, 560001');
  const [payment, setPayment] = useState(PAYMENT_OPTIONS[0]);
  const [stock, setStock] = useState(true); // Simulate stock check

  if (!product) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">No product selected.</div>;
  }

  const handleConfirm = () => {
    // Save order to localStorage (mock)
    const order = {
      id: 'ORD' + Math.floor(Math.random() * 100000),
      product,
      address,
      payment,
      date: new Date().toLocaleString(),
      status: 'Placed',
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
    navigate('/processing');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-dairy-cream/40 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-dairy-green mb-6">Order Confirmation</h2>
        <div className="flex gap-4 mb-6">
          <img src={product.image} alt={product.name} className="w-28 h-28 rounded-xl object-cover border-2 border-dairy-green" />
          <div>
            <div className="font-bold text-lg text-gray-800">{product.name}</div>
            <div className="text-gray-600 text-sm mb-2">{product.description}</div>
            <div className="text-dairy-green font-bold text-xl">{product.price}</div>
            <div className="text-xs text-gray-500 mt-1">Stock: {stock ? <span className="text-green-600">Available</span> : <span className="text-red-600">Out of Stock</span>}</div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-700">Delivery Address</label>
          <textarea
            className="w-full px-3 py-2 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40"
            value={address}
            onChange={e => setAddress(e.target.value)}
            rows={2}
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1 text-gray-700">Payment Method</label>
          <select
            className="w-full px-3 py-2 rounded-lg border border-dairy-green/30 focus:outline-none focus:ring-2 focus:ring-dairy-green text-gray-800 bg-dairy-cream/40"
            value={payment}
            onChange={e => setPayment(e.target.value)}
          >
            {PAYMENT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
          </select>
        </div>
        <button
          className="btn-primary w-full text-lg py-3 mt-2"
          onClick={handleConfirm}
          disabled={!stock}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
} 