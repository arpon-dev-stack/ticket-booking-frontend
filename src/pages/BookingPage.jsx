
import React, { useState, useEffect } from 'react';
import { MapPin, Loader2, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLazyGetBusesQuery } from '../app/busSlice/busApi'; // Import the lazy hook
import ResultList from '../components/ResultList';
import ResultListSkeleton from '../components/ResultListSkeliton';

const BookTicket = () => {
  const today = new Date().toISOString().split('T')[0];
  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: today,
    pageNo: 1
  });

  const [getBuses, { data, isLoading, isFetching, error }] = useLazyGetBusesQuery();

  useEffect(() => {
    getBuses(searchParams);
  }, []);

  const buses = data?.buses || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = (e) => {
    e.preventDefault();
    getBuses({...searchParams, pageNo: 1});
  };

  const handlePageChange = (direction) => {
    const nextP = direction === 'right' ? searchParams.pageNo + 1 : searchParams.pageNo - 1;
    if (nextP >= 1 && nextP <= totalPages) {
      const newSearchParams = { ...searchParams, pageNo: nextP };
      setSearchParams(newSearchParams);
      getBuses(newSearchParams);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-bold text-emerald-600 mb-8">Book Your Ticket</h1>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">From</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-blue-500" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 border h-12 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={searchParams.from}
                  onChange={(e) => setSearchParams({ ...searchParams, from: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">To</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-red-500" size={18} />
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-3 h-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={searchParams.to}
                  onChange={(e) => setSearchParams({ ...searchParams, to: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-green-500" size={18} />
                <input
                  type="date"
                  min={today}
                  className="w-full pl-10 pr-4 h-12 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-emerald-600 h-12 text-white py-3 rounded-lg font-bold hover:bg-emerald-500 transition"
              >
                Search Buses
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        <div className={isFetching ? "opacity-50 pointer-events-none" : ""}>
          {isLoading ? (
            <ResultListSkeleton />
          ) : buses.length > 0 ? (
            <ResultList result={buses} />
          ) : (
            <div className="text-center py-20 bg-white rounded-lg">No buses found.</div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-6 mt-8 items-center">
            <button
              onClick={() => handlePageChange("left")}
              disabled={searchParams.pageNo === 1}
              className="p-2 border rounded-full disabled:opacity-30"
            >
              <ArrowLeft />
            </button>
            <span className="font-bold">{searchParams.pageNo} / {totalPages}</span>
            <button
              onClick={() => handlePageChange("right")}
              disabled={searchParams.pageNo === totalPages}
              className="p-2 border rounded-full disabled:opacity-30"
            >
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;