"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import { StoryDataType } from "@/modules/story/story.types";
import { getStories } from "@/modules/story/story.service";
import StoryCardSkeleton from "@/modules/story/ui/StoryCardSkeleton";
import StoryCard from "@/modules/story/ui/StoryCard";


const SuccessStories = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [stories, setStories] = useState<StoryDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchSuccessStories = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await getStories(1, 10);
            if (response.success && response.successStories.length > 0) {
                // Filter published stories if required on client-side as safety fallback
                const publishedStories = response.successStories.filter(
                    (story) => story.isPublish !== false
                );
                setStories(publishedStories);
            } else {
                setStories([]);
            }
        } catch (error) {
            console.error("Failed to fetch success stories:", error);
            setStories([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSuccessStories();
    }, [fetchSuccessStories]);

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
                        <p className="mt-4 text-gray-600">
                            Hear from our clients about their transformative journeys and the confidence they've regained through our specialized PRP treatments.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex items-end gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 md:p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-300 active:scale-95"
                            aria-label="Previous story"
                        >
                            <BiChevronLeft size={24} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 md:p-3 rounded-full border border-gray-200 hover:bg-gray-100 transition-all duration-300 active:scale-95"
                            aria-label="Next story"
                        >
                            <BiChevronRight size={24} />
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {isLoading ? (
                        // Render 3 Skeletons while fetching
                        Array.from({ length: 3 }).map((_, index) => (
                            <StoryCardSkeleton key={index} />
                        ))
                    ) : stories.length > 0 ? (
                        // Render dynamic API stories
                        stories.map((story) => (
                            <StoryCard key={story.id} story={story} />
                        ))
                    ) : (
                        // Empty state fallback
                        <div className="w-full py-12 text-center text-gray-500">
                            No stories available at the moment.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SuccessStories;