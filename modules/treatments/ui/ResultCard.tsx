import React from "react";
import Image from "next/image";

import { TreatmentResultItemType } from "../treatments.types";


interface ResultCardProps {
    item: TreatmentResultItemType;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item }) => {
    return (
        <div className="overflow-hidden hover:scale-[1.03] transition duration-300">
            {/* Title */}
            <div className="p-4">
                <h3 className="text-lg font-semibold text-center line-clamp-1">
                    {item.title}
                </h3>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-1">
                {/* Before */}
                <div className="relative h-60 w-full bg-gray-200">
                    <Image
                        src={item.beforeImagePath}
                        alt={`${item.title} - Before`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                    />
                    <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        Before
                    </span>
                </div>

                {/* After */}
                <div className="relative h-60 w-full bg-gray-200">
                    <Image
                        src={item.afterImagePath}
                        alt={`${item.title} - After`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                        After
                    </span>
                </div>
            </div>
        </div>
    );
};