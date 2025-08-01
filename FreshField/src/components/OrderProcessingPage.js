import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderProcessingPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate('/order-success'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-dairy-green border-solid mb-6"></div>
        <h2 className="text-2xl font-bold text-dairy-green mb-2">Processing your order…</h2>
        <p className="text-gray-600 text-center">Please wait while we place your order. This will only take a moment.</p>
      </div>
    </div>
  );
}