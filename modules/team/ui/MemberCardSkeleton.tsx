import React from "react";

const MemberCardSkeleton: React.FC = () => {
    return (
        <div className="animate-pulse overflow-hidden">
            {/* Image Skeleton */}
            <div className="h-48 md:h-64 w-full bg-gray-200 animate-pulse rounded-sm"></div>

            {/* Text Info Skeleton */}
            <div className="py-3 text-start space-y-2">
                <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2"></div>
            </div>
        </div>
    );
};

export default MemberCardSkeleton;