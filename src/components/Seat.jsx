import { Bus, ArrowLeft, ArrowRight, CheckCircle, Info, User, Loader2 } from 'lucide-react';
import React, { useState, useCallback, useMemo } from 'react';
// ... other imports

// Memoized Individual Seat
const Seat = React.memo(({ seat, status, onClick }) => {
  const getSeatClassName = (status) => {
    const base = 'h-12 w-full rounded-md flex items-center justify-center transition-all duration-200 border-2';
    switch (status) {
      case 'booked': return `${base} bg-gray-200 border-gray-300 cursor-not-allowed text-gray-400`;
      case 'selected': return `${base} bg-green-500 border-green-600 text-white shadow-inner scale-95`;
      default: return `${base} bg-white border-blue-200 text-blue-700 hover:border-blue-500 hover:bg-blue-50`;
    }
  };

  return (
    <button
      disabled={status === 'booked'}
      onClick={() => onClick(seat)}
      className={getSeatClassName(status)}
    >
      <div className="flex flex-col items-center justify-center">
        <User size={14} />
        <span className="text-[10px] font-bold uppercase">{seat.seatNumber}</span>
      </div>
    </button>
  );
});

export default Seat;