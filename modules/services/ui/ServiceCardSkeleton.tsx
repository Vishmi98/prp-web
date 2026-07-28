import React from "react";

const ServiceCardSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse overflow-hidden">
            {/* Image Skeleton */}
            <div className="w-full h-70 md:h-64 bg-gray-200 animate-pulse rounded-sm"></div>

            {/* Content Skeleton */}
            <div className="py-5">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-10 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="space-y-2 mt-2">
                    <div className="w-full h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-2/3 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCardSkeleton;