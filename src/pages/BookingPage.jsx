import React, { useState, useEffect, useTransition } from 'react';
import { MapPin, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLazyGetBusesQuery } from '../app/busSlice/busListApi';
import ResultList from '../components/ResultList';
import ResultListSkeleton from '../components/ResultListSkeliton';
import SearchForm from '../components/SearchForm';

const BookTicket = () => {
  const today = new Date().toISOString().split('T')[0];
  const ITEMS_PER_PAGE = 15;
  const [isPending, startTransition] = useTransition();


  const [searchParams, setSearchParams] = useState({
    from: '',
    to: '',
    date: today,
    page: 1
  });

  const [getBuses, { data, isLoading, isFetching }] = useLazyGetBusesQuery();

  // Initial Fetch
  useEffect(() => {
    startTransition(() => {
      getBuses(searchParams);
    })
  }, [getBuses]);

  const buses = data?.buses || [];
  const totalBus = data?.totalBus || 0;
  const totalPages = Math.ceil(totalBus / ITEMS_PER_PAGE) || 1;

  const handleSearchTrigger = (formValues) => {
    const newParams = { ...formValues, page: 1 };
    setSearchParams(newParams);
    startTransition(() => {
      getBuses(searchParams);
    })
  };

  const handlePageChange = (direction) => {
    const nextPage = direction === 'right' ? searchParams.page + 1 : searchParams.page - 1;

    if (nextPage >= 1 && nextPage <= totalPages) {
      const updatedParams = { ...searchParams, page: nextPage };
      setSearchParams(updatedParams);
      getBuses(updatedParams);

      // Scroll to top of results smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-emerald-600 mb-8">Book Your Ticket</h1>

        {/* Search Form Box */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <SearchForm
            onSearch={handleSearchTrigger}
            initialParams={searchParams}
            today={today}
          />
        </div>

        {/* Results Area */}
        <div className={`transition-opacity duration-200 ${isFetching ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
          {isLoading || isPending ? (
            <ResultListSkeleton />
          ) : buses.length > 0 ? (
            <ResultList result={buses} />
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No buses found for this route or date.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalBus > ITEMS_PER_PAGE && (
          <div className="flex justify-center gap-6 mt-12 items-center">
            <button
              onClick={() => handlePageChange("left")}
              disabled={searchParams.page === 1 || isFetching}
              className="p-3 border rounded-full hover:bg-gray-100 disabled:opacity-20 transition"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Page</span>
              <span className="font-bold text-emerald-700 text-lg">{searchParams.page}</span>
              <span className="text-sm text-gray-500">of {totalPages}</span>
            </div>

            <button
              onClick={() => handlePageChange("right")}
              disabled={searchParams.page >= totalPages || isFetching}
              className="p-3 border rounded-full hover:bg-gray-100 disabled:opacity-20 transition"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookTicket;