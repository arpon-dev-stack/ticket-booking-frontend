import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bus, ArrowLeft, ArrowRight, CheckCircle, Info, User, Loader2 } from 'lucide-react';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the bus ID passed from the ResultList component
  const busId = location.state?.bus;

  /* In a real app, you'd do this:
     const { data: bus, isLoading } = useGetBusByIdQuery(busId);
  */
  const seats = [
    { id: 'A1', booked: true }, { id: 'A2', booked: false }, { id: 'A3', booked: false }, { id: 'A4', booked: false },
    { id: 'B1', booked: false }, { id: 'B2', booked: true }, { id: 'B3', booked: false }, { id: 'B4', booked: false },
    { id: 'C1', booked: false }, { id: 'C2', booked: false }, { id: 'C3', booked: true }, { id: 'C4', booked: false },
    // ... add more as needed
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seat) => {
    if (seat.booked) return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  // --- MOCK DATA START ---
  const [isLoading, setIsLoading] = useState(false);
  const bus = {
    _id: busId || "123",
    totalSeats: 40,
    availableSeats: 30,
    price: 400,
    name: "Green Line Express",
    type: "AC Sleeper",
    departure: "09:00 AM",
    arrival: "05:00 PM",
    bookedSeats: [1, 5, 12, 18, 22] // Mocking backend data
  };
  const passengersRequired = 1; // Default to 1 if not specified
  // --- MOCK DATA END ---


  const getSeatStatus = (seatNumber) => {
    if (bus.bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatClassName = (status) => {
    const base = 'h-12 w-full rounded-md flex items-center justify-center transition-all duration-200 border-2';
    switch (status) {
      case 'booked': return `${base} bg-gray-200 border-gray-300 cursor-not-allowed text-gray-400`;
      case 'selected': return `${base} bg-green-500 border-green-600 text-white shadow-inner scale-95`;
      default: return `${base} bg-white border-blue-200 text-blue-700 hover:border-blue-500 hover:bg-blue-50`;
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-6 font-medium">
          <ArrowLeft size={18} className="mr-2" /> Back to search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Bus Interior */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{bus.name}</h2>
                <span className="text-sm text-gray-500 uppercase tracking-widest">{bus.type}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase">Price</p>
                <p className="text-xl font-black text-blue-600">৳{bus.price}</p>
              </div>
            </div>

            {/* Steering Wheel Area */}
            <div className="flex justify-end mb-10 opacity-30">
              <div className="border-4 border-gray-400 rounded-full p-2">
                <div className="w-8 h-8 rounded-full border-t-4 border-gray-500"></div>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="grid grid-cols-5 gap-3">
              {seats.map((seat, index) => {
                const isSelected = selectedSeats.includes(seat.id);
                const status = seat.booked ? 'booked' : isSelected ? 'selected' : 'available';

                // Logic: Insert aisle after the 2nd seat of every row (index 1, 5, 9, etc.)
                const showAisle = (index + 1) % 4 === 2;

                return (
                  <React.Fragment key={seat.id}>
                    <button
                      disabled={seat.booked}
                      onClick={() => handleSeatClick(seat)}
                      className={getSeatClassName(status)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <User size={14} />
                        <span className="text-[10px] font-bold uppercase">{seat.id}</span>
                      </div>
                    </button>

                    {/* This div creates the physical aisle space */}
                    {showAisle && <div className="w-full h-full" aria-hidden="true" />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Selected Seats</span>
                  <span className="font-bold text-blue-600">
                    {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-500">Total Fare</span>
                  <span className="text-lg font-black text-gray-800">৳{selectedSeats.length * bus.price}</span>
                </div>
              </div>

              <button
                disabled={selectedSeats.length === 0}
                onClick={() => navigate('/payment', { state: { selectedSeats, bus } })}
                className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-200 disabled:text-gray-400 flex items-center justify-center gap-2"
              >
                Continue to Payment <ArrowRight size={18} />
              </button>
            </div>

            {/* Legend */}
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h4 className="text-xs font-bold text-blue-800 uppercase mb-4">Seat Legend</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-blue-900">
                  <div className="w-6 h-6 bg-white border-2 border-blue-200 rounded"></div> Available
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-900">
                  <div className="w-6 h-6 bg-gray-200 rounded"></div> Booked
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-900">
                  <div className="w-6 h-6 bg-green-500 rounded"></div> Your Selection
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;