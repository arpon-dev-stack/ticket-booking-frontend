import React from 'react';

const ResultListSkeleton = () => {
  // We create an array of 3 items to show 3 "fake" bus cards
  const skeletons = [1, 2, 3];

  return (
    <div className="mb-8">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="space-y-4">
        {skeletons.map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              
              {/* Bus Info Left Side */}
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-16 bg-blue-50 rounded animate-pulse"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex flex-col space-y-2">
                      <div className="h-3 w-12 bg-gray-100 rounded animate-pulse"></div>
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-6">
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
                  <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Price & Button Right Side */}
              <div className="flex flex-col items-center lg:items-end justify-center border-t lg:border-t-0 lg:border-l border-gray-100 pt-4 lg:pt-0 lg:pl-6 min-w-[150px]">
                <div className="h-3 w-20 bg-gray-100 rounded mb-2 animate-pulse"></div>
                <div className="h-10 w-24 bg-gray-200 rounded mb-4 animate-pulse"></div>
                <div className="h-12 w-full lg:w-32 bg-blue-100 rounded-lg animate-pulse"></div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultListSkeleton;