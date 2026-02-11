import React, { useState, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useGetBusQuery } from '../app/busSlice/busDetailApi';
import Seat from '../components/Seat';

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const busId = location.state?.bus;

  const { data, isLoading, isSuccess } = useGetBusQuery(busId);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = useCallback((seat) => {
    setSelectedSeats((prev) => {
      const isAlreadySelected = prev.some((s) => s.seatNumber === seat.seatNumber);
      if (isAlreadySelected) {
        return prev.filter((s) => s.seatNumber !== seat.seatNumber); // Toggle off
      }
      return [...prev, seat]; // Toggle on
    });
  }, []);

  const totalFare = useMemo(() => {
    return selectedSeats.length * (data?.bus?.price || 0);
  }, [selectedSeats.length, data?.bus?.price]);

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-1">
        {/* ... Header UI ... */}
        <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-6 font-medium">
          <ArrowLeft size={18} className="mr-2" />
          Back to search
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white mob:p-8 p-4 rounded-2xl shadow-sm border border-gray-100">
            {/* ... Bus Info UI ... */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 capitalize">{data?.bus?.busNumber}</h2>
                <span className="text-sm text-gray-500 uppercase tracking-widest">{data?.bus?.busType}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase">Price</p>
                <p className="text-xl font-black text-blue-600">৳{data?.bus?.price}</p>
              </div>
            </div>

            <div className="grid grid-cols-[auto_auto_10px_auto_auto] mob:grid-cols-5 gap-1 mob:gap-3">
              {isSuccess && data?.seatSet.map((seat, index) => {
                // Determine status inside map
                const isSelected = selectedSeats.some(s => s.seatNumber === seat.seatNumber);
                const status = seat.booked.owner ? 'booked' : isSelected ? 'selected' : 'available';
                const showAisle = (index + 1) % 4 === 2;

                return (
                  <React.Fragment key={seat._id}>
                    <Seat
                      seat={seat}
                      status={status}
                      onClick={handleSeatClick}
                    />
                    {showAisle && <div className="w-full h-full" aria-hidden="true" />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Booking Summary</h3>
              <div className="flex justify-between border-t pt-3">
                <span className="text-gray-500">Total Fare</span>
                <span className="text-lg font-black text-gray-800">৳{totalFare}</span>
              </div>
              <button
                disabled={selectedSeats.length === 0}
                onClick={() => navigate('/payment', { state: { selectedSeats, busId, price: data?.bus?.price} })}
                className={`w-full mt-6 ${selectedSeats.length === 0 ? 'bg-gray-400' : 'bg-blue-600'} flex justify-center items-center gap-4 text-white py-4 rounded-xl font-bold`}
              >
                Continue to Payment <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SeatSelection);


// {
//     "message": "Bus retrieved successfully",
//     "bus": {
//         "departure": {
//             "location": "Dhaka",
//             "date": "2026-02-15T10:00:00.000Z"
//         },
//         "arrival": {
//             "location": "Khulna",
//             "date": "2026-02-15T22:00:00.000Z"
//         },
//         "amenities": [
//             "waterbattle"
//         ],
//         "_id": "69889e3dbee19938156d75fc",
//         "busNumber": "DK-02",
//         "totalSeat": 45,
//         "seatsPerRow": 4,
//         "price": 400,
//         "amodities": [
//             "waterbattle",
//             "charger"
//         ],
//         "busType": [
//             "non-ac"
//         ],
//         "seatSet": [
//             {
//                 "booked": {
//                     "owner": null,
//                     "name": null
//                 },
//                 "seatNumber": "a1",
//                 "_id": "69889e3dbee19938156d75fd"
//             },
//         ],
//         "__v": 0,
//         "availableSeats": 45,
//         "id": "69889e3dbee19938156d75fc"
//     },
//     "availableSeats": 45
// }