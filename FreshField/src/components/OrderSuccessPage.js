import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccessPage() {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem('lastOrder'));
  if (!order) {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">No order found.</div>;
  }
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-dairy-green mb-2">Your Order Has Been Placed Successfully!</h2>
        <div className="text-gray-700 mb-4 text-center">Thank you for shopping with us. Your order is being processed.</div>
        <div className="bg-dairy-green/10 rounded-xl p-4 w-full mb-4">
          <div className="text-gray-700 text-sm">Order ID:</div>
          <div className="font-bold text-dairy-green text-lg">{order.id}</div>
          <div className="text-gray-700 text-sm mt-2">Estimated Delivery Time:</div>
          <div className="font-bold text-dairy-green text-lg">20-30 min</div>
        </div>
        <div className="flex gap-4 w-full mt-2">
          <button
            className="btn-primary flex-1 py-3 text-lg"
            onClick={() => navigate('/order-tracking')}
          >
            Track Order
          </button>
          <button
            className="btn-secondary flex-1 py-3 text-lg"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}