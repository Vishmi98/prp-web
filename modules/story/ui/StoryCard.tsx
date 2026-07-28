"use client";

import React from "react";
import Image from "next/image";
import { BiStar } from "react-icons/bi";

import { StoryDataType } from "../story.types";


interface StoryCardProps {
    story: StoryDataType;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
    return (
        <div className="snap-start shrink-0 w-full md:w-[calc((100%-2.5rem)/3)] bg-gray-50 border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group rounded-sm flex flex-col">
            {/* Stars */}
            <div className="flex gap-1 mb-6 text-[#D4AF37]">
                {[...Array(story.rating || 5)].map((_, i) => (
                    <BiStar key={i} size={18} fill="currentColor" />
                ))}
            </div>

            {/* Story Comment */}
            <p className="text-gray-700 mb-8 text-sm transition-all flex-grow">
                {story.comment}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4 mt-auto">
                <div className="relative md:w-12 md:h-12 w-10 h-10 rounded-full overflow-hidden shrink-0 bg-gray-200">
                    {story.profileImagePath ? (
                        <Image
                            src={story.profileImagePath}
                            alt={story.clientName}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 40px, 48px"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-semibold text-gray-500">
                            {story.clientName?.charAt(0) || "U"}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="font-semibold md:text-lg">{story.clientName}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{story.treatmentName}</p>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;