import React from "react";

export const ResultCardSkeleton: React.FC = () => {
    return (
        <div className="overflow-hidden animate-pulse rounded-lg">
            {/* Title Skeleton */}
            <div className="p-4 flex justify-center">
                <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
            </div>

            {/* Image Grid Skeleton */}
            <div className="grid grid-cols-2 gap-1">
                <div className="h-60 bg-gray-300 animate-pulse"></div>
                <div className="h-60 bg-gray-300 animate-pulse"></div>
            </div>
        </div>
    );
};