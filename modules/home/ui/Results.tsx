"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { TreatmentResultItemType } from "@/modules/treatments/treatments.types";
import { getTreatmentResultsByTreatmentType } from "@/modules/treatments/treatments.service";
import { ResultCardSkeleton } from "@/modules/treatments/ui/ResultCardSkeleton";
import { ResultCard } from "@/modules/treatments/ui/ResultCard";

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

type TreatmentType = "Hair" | "Face";

const Results = () => {
    const [activeTab, setActiveTab] = useState<TreatmentType>("Hair");
    const [results, setResults] = useState<TreatmentResultItemType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await getTreatmentResultsByTreatmentType(activeTab);

                if (response.success && Array.isArray(response.results)) {
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
    }, [activeTab]);

    const showCarousel = !loading && !error && results.length > 3;

    return (
        <section className="py-20 bg-[#D4AF37]/10 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                {/* Heading & Category Tabs */}
                <div className="flex flex-col items-center md:flex-row md:items-end justify-between mb-14 gap-6 text-center md:text-start">
                    <div className="text-center md:text-start">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            Before & After Results
                        </h2>
                        <p className="mt-4">
                            Real transformations from our PRP treatments. Visible, natural,
                            and long-lasting results.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 bg-white/60 p-1.5 rounded-full border border-gray-200 self-center md:self-auto shadow-sm">
                        {(["Hair", "Face"] as TreatmentType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${activeTab === tab
                                        ? "bg-[#D4AF37] text-white shadow-md"
                                        : "text-gray-700 hover:text-black hover:bg-gray-100/50"
                                    }`}
                            >
                                {tab} Results
                            </button>
                        ))}
                    </div>
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
                        <p>No {activeTab.toLowerCase()} treatment results available at the moment.</p>
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