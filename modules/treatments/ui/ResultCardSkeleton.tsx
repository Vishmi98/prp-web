import React from "react";

export const ResultCardSkeleton: React.FC = () => {
    return (
        <div className="overflow-hidden animate-pulse">
            {/* Title Skeleton */}
            {/* <div className="p-4 flex justify-center">
                <div className="h-6 w-3/4 rounded bg-gray-200" />
            </div> */}

            {/* Image Container Skeleton matching 750x938 aspect ratio */}
            <div className="w-full aspect-[750/938] bg-gray-200" />
        </div>
    );
};