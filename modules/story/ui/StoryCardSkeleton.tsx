"use client";

import React from "react";

const StoryCardSkeleton: React.FC = () => {
    return (
        <div className="min-w-[100%] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-21.33px)] snap-start bg-gray-50 border border-gray-100 p-8 rounded-sm flex flex-col animate-pulse">
            {/* Stars Skeleton */}
            <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 bg-gray-200 animate-pulse rounded-full" />
                ))}
            </div>

            {/* Comment Lines Skeleton */}
            <div className="space-y-3 mb-8 flex-grow">
                <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-11/12" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
            </div>

            {/* Author Skeleton */}
            <div className="flex items-center gap-4 mt-auto">
                <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-gray-200 animate-pulse shrink-0" />
                <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3" />
                </div>
            </div>
        </div>
    );
};

export default StoryCardSkeleton;