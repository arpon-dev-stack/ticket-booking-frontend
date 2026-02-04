import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bus, ArrowLeft, ArrowRight, CheckCircle, Info, User } from 'lucide-react';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { bus, searchParams } = location.state || {};

  const bus = {
    totalSeats: 40,
    aeatsAvailable: 30,
    price: 400,
    name: "hello",
    type: "electric",
    departure: 1,
    arrival: 7
  }

  const searchParams = {
    passengers: 15
  }

  console.log(bus)

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    // Generate random booked seats (in real app, this comes from backend)
    if (bus) {
      const numberOfBookedSeats = bus.totalSeats - bus.seatsAvailable;
      const booked = [];
      while (booked.length < numberOfBookedSeats) {
        const randomSeat = Math.floor(Math.random() * bus.totalSeats) + 1;
        if (!booked.includes(randomSeat)) {
          booked.push(randomSeat);
        }
      }
      setBookedSeats(booked);
    }
  }, [bus]);

  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl text-gray-600 mb-4">No bus selected</p>
          <button
            onClick={() => navigate('/book-ticket')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Go to Booking Page
          </button>
        </div>
      </div>
    );
  }

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return; // Can't select booked seats
    }

    if (selectedSeats.includes(seatNumber)) {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      // Select seat (check passenger limit)
      if (selectedSeats.length < searchParams.passengers) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      }
    }
  };

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'available';
  };

  const getSeatClassName = (status) => {
    const baseClasses = 'h-14 rounded-lg font-semibold transition-all transform hover:scale-105 relative';
    
    switch (status) {
      case 'booked':
        return `${baseClasses} bg-gray-300 cursor-not-allowed text-gray-500`;
      case 'selected':
        return `${baseClasses} bg-green-500 text-white shadow-lg`;
      case 'available':
        return `${baseClasses} bg-blue-100 hover:bg-blue-200 text-blue-800 cursor-pointer border-2 border-blue-300`;
      default:
        return baseClasses;
    }
  };

  const proceedToPayment = () => {
    if (selectedSeats.length === searchParams.passengers) {
      const bookingData = {
        bus,
        seats: selectedSeats.sort((a, b) => a - b),
        totalAmount: bus.price * selectedSeats.length,
        searchParams
      };
      navigate('/payment', { state: bookingData });
    }
  };

  const totalAmount = bus.price * selectedSeats.length;

  // Create seat layout - 2 columns with aisle
  const renderSeatLayout = () => {
    const rows = Math.ceil(bus.totalSeats / 4);
    const layout = [];

    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      
      // Left side - 2 seats
      for (let col = 0; col < 2; col++) {
        const seatNumber = row * 4 + col + 1;
        if (seatNumber <= bus.totalSeats) {
          const status = getSeatStatus(seatNumber);
          rowSeats.push(
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={status === 'booked'}
              className={getSeatClassName(status)}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-bold">{seatNumber}</span>
                {status === 'selected' && (
                  <CheckCircle className="absolute top-1 right-1" size={16} />
                )}
              </div>
            </button>
          );
        }
      }

      // Aisle
      rowSeats.push(<div key={`aisle-${row}`} className="w-8"></div>);

      // Right side - 2 seats
      for (let col = 2; col < 4; col++) {
        const seatNumber = row * 4 + col + 1;
        if (seatNumber <= bus.totalSeats) {
          const status = getSeatStatus(seatNumber);
          rowSeats.push(
            <button
              key={seatNumber}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={status === 'booked'}
              className={getSeatClassName(status)}
            >
              <div className="flex flex-col items-center justify-center">
                <span className="text-lg font-bold">{seatNumber}</span>
                {status === 'selected' && (
                  <CheckCircle className="absolute top-1 right-1" size={16} />
                )}
              </div>
            </button>
          );
        }
      }

      layout.push(
        <div key={row} className="grid grid-cols-5 gap-3 mb-3">
          {rowSeats}
        </div>
      );
    }

    return layout;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/book-ticket')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Bus Selection
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Select Your Seats</h1>
          <p className="text-gray-600 mt-2">Choose {searchParams.passengers} seat(s) for your journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Bus Info Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bus size={32} />
                    <div>
                      <h2 className="text-2xl font-bold">{bus.name}</h2>
                      <p className="text-blue-100">{bus.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">Departure</p>
                    <p className="text-xl font-bold">{bus.departure}</p>
                  </div>
                </div>
              </div>

              {/* Selection Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-2">
                  <Info className="text-blue-600 mt-0.5" size={20} />
                  <div>
                    <p className="font-semibold text-blue-900">Selection Progress</p>
                    <p className="text-blue-700 text-sm">
                      {selectedSeats.length === 0 
                        ? `Please select ${searchParams.passengers} seat(s)` 
                        : selectedSeats.length === searchParams.passengers 
                          ? '✓ All seats selected! Ready to proceed.' 
                          : `${searchParams.passengers - selectedSeats.length} more seat(s) needed`}
                    </p>
                    {selectedSeats.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs text-blue-600 font-semibold">Selected Seats:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedSeats.sort((a, b) => a - b).map(seat => (
                            <span key={seat} className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Driver Section */}
              <div className="bg-gray-100 rounded-t-lg p-4 text-center mb-4 border-2 border-gray-300">
                <Bus className="inline-block text-gray-600 mb-2" size={32} />
                <p className="text-sm font-semibold text-gray-700">DRIVER</p>
                <div className="mt-2 text-xs text-gray-600">← Front of Bus</div>
              </div>

              {/* Seat Layout */}
              <div className="bg-gray-50 p-6 rounded-lg">
                {renderSeatLayout()}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center">
                    <User size={20} className="text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Available</p>
                    <p className="text-xs text-gray-600">{bus.seatsAvailable} seats</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Selected</p>
                    <p className="text-xs text-gray-600">{selectedSeats.length} seats</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg flex items-center justify-center">
                    <User size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Booked</p>
                    <p className="text-xs text-gray-600">{bookedSeats.length} seats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Bus</p>
                  <p className="font-semibold text-gray-800">{bus.name}</p>
                  <p className="text-sm text-gray-600">{bus.type}</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Journey Details</p>
                  <div className="text-sm space-y-1">
                    <p><span className="font-semibold">Departure:</span> {bus.departure}</p>
                    <p><span className="font-semibold">Arrival:</span> {bus.arrival}</p>
                    <p><span className="font-semibold">Duration:</span> {bus.duration}</p>
                  </div>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Passengers</p>
                  <p className="font-semibold text-gray-800">{searchParams.passengers} person(s)</p>
                </div>

                <div className="pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Selected Seats</p>
                  {selectedSeats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.sort((a, b) => a - b).map(seat => (
                        <span key={seat} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {seat}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No seats selected yet</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per seat</span>
                    <span className="font-semibold">${bus.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Number of seats</span>
                    <span className="font-semibold">× {selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-800">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">${totalAmount}</span>
                  </div>
                </div>

                {selectedSeats.length === searchParams.passengers ? (
                  <button
                    onClick={proceedToPayment}
                    className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={20} />
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-4 rounded-lg font-semibold cursor-not-allowed"
                  >
                    Select {searchParams.passengers} Seat(s) to Continue
                  </button>
                )}

                <p className="text-xs text-gray-500 text-center mt-4">
                  💡 Click on available seats to select them
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;