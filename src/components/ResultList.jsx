import { Bus, Clock, DollarSign, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResultList = ({ result }) => {
    // Helper to format the Mongo ISO Date to a readable time
    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };
    const navigate = useNavigate()

    const handleSeatSelection = (data) => {
        navigate('/select-seats', {state: {bus: data._id}})
    }

    return (
        <div className="mb-8">
            <div className="flex items-center mob:flex-row flex-col gap-2 mob:gap-0 justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Available Buses</h2>
                <p className="text-gray-600 font-medium">{result.length} buses found</p>
            </div>
            
            <div className="space-y-4">
                {result.map(bus => (
                    <div key={bus._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition border border-gray-100">
                        <div className="flex flex-col lg:flex-row justify-between gap-6">
                            
                            {/* Bus Info Section */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-3">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <Bus className="text-blue-600" size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{bus.busNumber}</h3>
                                        <div className="flex mob:flex-row flex-col gap-2 mt-1">
                                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase">
                                                {bus.busType}
                                            </span>
                                            <span className="flex items-center text-xs text-green-600 font-medium">
                                                <ShieldCheck size={14} className="mr-1" /> Verified Operator
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 mob:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                    <div className="flex items-start text-gray-600">
                                        <Clock size={18} className="mr-2 mt-1 text-blue-600" />
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Departure</p>
                                            <p className='font-bold text-gray-800'>{bus.departure.location}</p>
                                            <p className="text-sm text-blue-600 font-semibold">{formatTime(bus.departure.time)}</p>
                                            <p className="text-xs text-gray-500 italic">{bus.departure.station}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start text-gray-600">
                                        <Clock size={18} className="mr-2 mt-1 text-red-500" />
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Arrival</p>
                                            <p className='font-bold text-gray-800'>{bus.arrival.location}</p>
                                            <p className="text-sm text-gray-600 font-semibold">{formatTime(bus.arrival.time)}</p>
                                            <p className="text-xs text-gray-500 italic">{bus.arrival.station}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex items-start text-gray-600">
                                        <ArrowRight size={18} className="mr-2 mt-1 text-gray-400" />
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Price Details</p>
                                            <p className="font-bold text-gray-800">Fixed Rate</p>
                                            <p className="text-xs text-gray-500">Refundable (T&C apply)</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Amenities / Features */}
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {bus.amenities && bus.amenities.map((item, idx) => (
                                        <span key={idx} className="bg-gray-50 border border-gray-200 text-gray-600 text-[10px] font-bold uppercase px-3 py-1 rounded-md">
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                {/* Seat Availability Bar */}
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Seats Left</span>
                                        <span className={`text-sm font-bold ${bus.availableSeats < 5 ? 'text-red-500' : 'text-green-600'}`}>
                                            {bus.availableSeats} / {bus.totalSeats} available
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div
                                            className={`h-1.5 rounded-full transition-all duration-500 ${bus.availableSeats < 5 ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${(bus.availableSeats / bus.totalSeats) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Action Section */}
                            <div className="flex gap-4 mob:flex-row flex-col items-center lg:items-end justify-between lg:justify-center p-4 lg:p-0 bg-blue-50 lg:bg-transparent rounded-xl border-t lg:border-t-0 lg:border-l border-gray-200 lg:pl-8">
                                <div className="text-left lg:text-right">
                                    <p className="text-xs text-gray-500 font-bold uppercase">Fare</p>
                                    <div className="flex items-center text-blue-600">
                                        <span className="text-2xl font-black">৳{bus.price}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleSeatSelection(bus)}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold flex items-center space-x-2 shadow-md active:scale-95"
                                >
                                    <span>Select Seats</span>
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResultList;