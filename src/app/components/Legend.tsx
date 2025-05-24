import React from 'react';

const Legend: React.FC = () => (
  <div className="bg-white bg-opacity-90 rounded-lg shadow p-4 flex flex-row gap-4 text-sm z-10 border border-gray-200 text-black w-fit mx-auto">
    <div className="flex items-center gap-2">
      <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="#22c55e" strokeWidth="4" /></svg>
      <span>Weight 1 (green)</span>
    </div>
    <div className="flex items-center gap-2">
      <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="#eab308" strokeWidth="4" /></svg>
      <span>Weight 2 (yellow)</span>
    </div>
    <div className="flex items-center gap-2">
      <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="#ef4444" strokeWidth="4" /></svg>
      <span>Weight 3 (red)</span>
    </div>
    <div className="flex items-center gap-2">
      <svg width="32" height="8"><line x1="0" y1="4" x2="32" y2="4" stroke="black" strokeWidth="4" strokeDasharray="5,5" /></svg>
      <span>Weight 0.5 (dashed)</span>
    </div>
  </div>
);

export default Legend; 