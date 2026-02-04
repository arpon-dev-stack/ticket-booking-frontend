import React, { useState, useEffect, lazy, useTransition, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, ArrowLeft, Loader2, Calendar } from 'lucide-react';

const ResultList = lazy(() => import('../components/ResultList'));
import ResultListSkeleton from '../components/ResultListSkeliton';

const BookTicket = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Track total pages from backend
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  const today = new Date().toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: today,
  });

  const getBuses = async (pageNo = 1) => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        pageNo: pageNo.toString(),
        from: searchParams.from,
        to: searchParams.to,
        date: searchParams.date,
      }).toString();

      const response = await fetch(`http://localhost:3000/api/buses?${query}`);
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      // Update states based on new backend response structure
      setBuses(data.buses || []);
      setTotalPages(data.totalPages || 1);
      setPage(data.currentPage || pageNo);

    } catch (err) {
      console.error("Search error:", err);
      setBuses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    getBuses(1);
  }, []);

  const handlePageChange = (direction) => {
    const nextP = direction === 'right' ? page + 1 : page - 1;
    if (nextP < 1 || nextP > totalPages) return;

    startTransition(() => {
      getBuses(nextP);
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    startTransition(() => {
      getBuses(1); // Reset to page 1 on new search
    })
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center sm:text-left">
          Book Your Ticket
        </h1>

        {/* Search Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-blue-500" size={18} />
                  <input
                    type="text"
                    placeholder="e.g. Dhaka"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    placeholder="e.g. Sylhet"
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
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
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                    value={searchParams.date}
                    onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading || isPending}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2"
                >
                  {(isLoading || isPending) ? <Loader2 className="animate-spin" /> : "Search Buses"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Transition Feedback */}
        {isPending && (
          <div className="text-center mb-4 animate-pulse">
            <span className="text-blue-600 font-medium">Updating results...</span>
          </div>
        )}

        {/* Results Area */}
        <div className={`transition-opacity duration-300 ${isPending ? "opacity-40" : "opacity-100"}`}>
          <Suspense fallback={<ResultListSkeleton />}>
            {isLoading ? (
              <ResultListSkeleton />
            ) : buses.length > 0 ? (
              <ResultList result={buses} />
            ) : (
              <div className="text-center py-20 bg-white rounded-lg shadow mb-8">
                <p className="text-gray-500 text-lg">No buses found for this search.</p>
              </div>
            )}
          </Suspense>
        </div>

        {/* Dynamic Pagination */}
        {totalPages > 1 && (
          <div className="flex w-full my-8 justify-center gap-6 items-center">
            <button
              onClick={() => handlePageChange("left")}
              disabled={page === 1 || isPending}
              className='disabled:opacity-30 border p-2 rounded-full hover:bg-gray-200 bg-white shadow-sm transition'
            >
              <ArrowLeft />
            </button>

            <div className="flex items-center gap-2 font-medium">
              <span className='text-blue-600 font-bold text-xl'>{page}</span>
              <span className='text-gray-400'>/ {totalPages}</span>
            </div>

            <button
              onClick={() => handlePageChange("right")}
              disabled={page === totalPages || isPending}
              className='disabled:opacity-30 border p-2 rounded-full hover:bg-gray-200 bg-white shadow-sm transition'
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