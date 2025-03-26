
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PerformancePageLoading: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div>
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      {/* Summary card skeleton */}
      <div className="bg-white rounded-xl shadow p-6">
        <Skeleton className="h-7 w-48 mb-4" />
        <Skeleton className="h-5 w-72 mb-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center mb-4 md:mb-0 w-full md:w-1/4">
            <Skeleton className="h-5 w-36 mx-auto mb-2" />
            <Skeleton className="h-10 w-24 mx-auto mb-1" />
            <Skeleton className="h-4 w-16 mx-auto" />
          </div>
          
          <div className="flex-1 max-w-xl w-full">
            <Skeleton className="h-4 w-full mb-2" />
            <div className="grid grid-cols-3 gap-2 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-9 w-36" />
        </div>
        
        <div className="bg-white rounded-xl shadow p-6">
          <Skeleton className="h-7 w-48 mb-2" />
          <Skeleton className="h-5 w-72 mb-6" />
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformancePageLoading;
