"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithSkeletonProps extends ImageProps {
    skeletonClassName?: string;
    showSpinner?: boolean;
}

const ImageWithSkeleton = ({
    skeletonClassName = "",
    showSpinner = true,
    className = "",
    onLoad,
    ...props
}: ImageWithSkeletonProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Skeleton */}
            {!loaded && (
                <div
                    className={`absolute inset-0 z-10 animate-pulse bg-gray-200 ${skeletonClassName}`}
                >
                    {/* {showSpinner && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600" />
                        </div>
                    )} */}
                </div>
            )}

            {/* Image */}
            <Image
                {...props}
                className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"
                    } ${className}`}
                onLoad={(event) => {
                    setLoaded(true);
                    onLoad?.(event);
                }}
            />
        </div>
    );
};

export default ImageWithSkeleton;