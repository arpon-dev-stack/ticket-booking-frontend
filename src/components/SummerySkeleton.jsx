import React from 'react';

const SummarySkeleton = () => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-7 w-40 bg-gray-200 rounded mb-4"></div>

        <div className="space-y-4">
          {/* Bus Info Skeleton */}
          <div className="flex items-start space-x-3 pb-4 border-b">
            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-100 rounded"></div>
            </div>
          </div>

          {/* Time Skeleton */}
          <div>
            <div className="h-4 w-28 bg-gray-100 rounded mb-2"></div>
            <div className="h-5 w-24 bg-gray-200 rounded"></div>
          </div>

          {/* Seats Skeleton */}
          <div>
            <div className="h-4 w-28 bg-gray-100 rounded mb-2"></div>
            <div className="flex gap-2">
              <div className="h-7 w-12 bg-gray-200 rounded-full"></div>
              <div className="h-7 w-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Pricing Skeleton */}
          <div className="pt-4 border-t space-y-3">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-100 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-gray-100 rounded"></div>
              <div className="h-4 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <div className="h-6 w-28 bg-gray-200 rounded"></div>
              <div className="h-8 w-20 bg-blue-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SummarySkeleton);