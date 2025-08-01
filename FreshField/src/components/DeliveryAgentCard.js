import React from 'react';

export default function DeliveryAgentCard({ agent }) {
  return (
    <div className="flex items-center bg-white rounded-xl shadow p-4 gap-4">
      <img src={agent.photo} alt={agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-dairy-green" />
      <div>
        <div className="font-bold text-dairy-green">{agent.name}</div>
        <div className="text-gray-600 text-sm">Delivery Agent</div>
        <a href={`tel:${agent.phone}`} className="text-dairy-green underline text-sm">Call</a>
      </div>
    </div>
  );
} 