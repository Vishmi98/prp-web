"use client";

import React from "react";

const BlogCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
            {/* Thumbnail Skeleton */}
            <div className="w-full h-48 sm:h-56 bg-gray-200 animate-pulse" />

            {/* Content Skeleton */}
            <div className="p-5 flex flex-col flex-grow space-y-3">
                {/* Date Skeleton */}
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/4 mb-1" />

                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                </div>

                {/* Paragraph Lines Skeleton */}
                <div className="space-y-2 pt-2 flex-grow">
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-11/12" />
                    <div className="h-3 bg-gray-200 animate-pulse rounded w-4/5" />
                </div>

                {/* Footer Link Skeleton */}
                <div className="pt-3 border-t border-gray-100 mt-auto flex justify-between items-center">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-24" />
                </div>
            </div>
        </div>
    );
};

export default BlogCardSkeleton;