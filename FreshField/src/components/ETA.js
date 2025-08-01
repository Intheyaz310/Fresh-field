import React from 'react';

export default function ETA({ seconds }) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return (
    <div className="bg-dairy-green/10 rounded-xl p-4 flex items-center gap-2">
      <span className="text-dairy-green font-bold text-lg">ETA:</span>
      <span className="text-gray-800 text-lg">{min}:{sec.toString().padStart(2, '0')} min</span>
    </div>
  );
} 