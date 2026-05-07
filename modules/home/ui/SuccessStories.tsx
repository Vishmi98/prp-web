"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { BiStar, BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { STORIES } from "@/constants/data";


const SuccessStories = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === "left" ? -400 : 400;
            current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="pb-20 bg-white text-black relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#D4AF37]/5 to-transparent pointer-events-none" />

            <div className="w-[90%] xl:w-[85%] mx-auto relative z-10">
                {/* Heading & Controls */}
                <div className="flex flex-col md:flex-row items-end justify-between md:mb-16 mb-8 gap-6">
                    <div className="w-full md:w-[60%]">
                        <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                            Join thousands of others who were in the same position as you...
                        </h2>
                        <p className="mt-4">
                            Hear from our clients about their transformative journeys and the confidence they've regained through our specialized PRP treatments.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-end gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 md:p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                            aria-label="Previous"
                        >
                            <BiChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 md:p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-300"
                            aria-label="Next"
                        >
                            <BiChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {STORIES.map((story, index) => (
                        <div
                            key={index}
                            className="min-w-[100%] md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-21.33px)] snap-start bg-gray-50 border border-gray-100 p-8 hover:shadow-xl transition-all duration-300 group rounded-sm flex flex-col"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6 text-[#D4AF37]">
                                {[...Array(story.rating)].map((_, i) => (
                                    <BiStar key={i} size={18} fill="currentColor" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed line-clamp-4 transition-all flex-grow">
                                {story.text}
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="relative md:w-12 md:h-12 w-10 h-10 rounded-full overflow-hidden shrink-0">
                                    <Image
                                        src={story.image}
                                        alt={story.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold md:text-lg">{story.name}</h4>
                                    <p className="text-xs md:text-sm text-gray-500">{story.treatment}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;
