"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { TreatmentResultItemType } from "@/modules/treatments/treatments.types";
import { getTreatmentResults } from "@/modules/treatments/treatments.service";
import { ResultCardSkeleton } from "@/modules/treatments/ui/ResultCardSkeleton";
import { ResultCard } from "@/modules/treatments/ui/ResultCard";

// Responsive breakpoint configuration for react-multi-carousel
const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};

const Results = () => {
    const [results, setResults] = useState<TreatmentResultItemType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                const response = await getTreatmentResults();

                if (response.success) {
                    setResults(response.results);
                } else {
                    setError(response.message || "Failed to load treatment results.");
                }
            } catch (err: unknown) {
                setError("An unexpected error occurred while fetching results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const showCarousel = !loading && !error && results.length > 3;

    return (
        <section className="py-20 bg-[#D4AF37]/10 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                {/* Heading */}
                <div className="text-start mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Before & After Results
                    </h2>
                    <p className="mt-4">
                        Real transformations from our PRP treatments. Visible, natural,
                        and long-lasting results.
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="text-center py-10 text-red-600 bg-red-50 rounded-lg">
                        <p>{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && results.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        <p>No results available at the moment.</p>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <ResultCardSkeleton key={index} />
                        ))}
                    </div>
                )}

                {/* Carousel Mode (> 3 items) */}
                {showCarousel && (
                    <div className="pb-8">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={3000}
                            keyBoardControl={true}
                            customTransition="transform 500ms ease-in-out"
                            transitionDuration={500}
                            containerClass="carousel-container -mx-3"
                            itemClass="px-3"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            showDots={true}
                        >
                            {results.map((item, index) => (
                                <ResultCard
                                    key={`${item.beforeImageId}-${index}`}
                                    item={item}
                                />
                            ))}
                        </Carousel>
                    </div>
                )}

                {/* Standard Grid Mode (<= 3 items) */}
                {!loading && !error && results.length > 0 && !showCarousel && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {results.map((item, index) => (
                            <ResultCard
                                key={`${item.beforeImageId}-${index}`}
                                item={item}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Results;