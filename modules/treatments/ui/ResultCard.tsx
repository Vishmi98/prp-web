import React from "react";

import { TreatmentResultItemType } from "../treatments.types";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";


interface ResultCardProps {
    item: TreatmentResultItemType;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
    return (
        <div className="overflow-hidden hover:scale-[1.03] transition duration-300">
            {/* Title */}
            {/* <div className="p-4">
                <h3 className="text-lg font-semibold text-center line-clamp-1">
                    {item.title}
                </h3>
            </div> */}

            {/* Images */}
            <div className="grid grid-cols-1 gap-1">
                <ImageWithSkeleton
                    src={item.beforeImagePath}
                    alt="Before Treatment"
                    width={750}
                    height={938}
                />
            </div>
        </div>
    );
};