"use client";

import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { ServiceDataType } from "@/modules/services/services.types";
import { getServices } from "@/modules/services/services.service";
import ServiceCardSkeleton from "@/modules/services/ui/ServiceCardSkeleton";
import ServiceCard from "@/modules/services/ui/ServiceCard";

const responsive = {
    desktop: {
        breakpoint: {
            max: 3000,
            min: 1280,
        },
        items: 4,
        slidesToSlide: 1,
    },

    laptop: {
        breakpoint: {
            max: 1280,
            min: 1024,
        },
        items: 3,
        slidesToSlide: 1,
    },

    tablet: {
        breakpoint: {
            max: 1024,
            min: 640,
        },
        items: 2,
        slidesToSlide: 1,
    },

    mobile: {
        breakpoint: {
            max: 640,
            min: 0,
        },
        items: 1,
        slidesToSlide: 1,
    },
};

const OurServices = () => {
    const [services, setServices] = useState<ServiceDataType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);

                const data = await getServices();

                if (data.success) {
                    setServices(data.services);
                }
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <section className="bg-[#FAF9F7] py-16 md:py-24 lg:py-28">
            <div className="mx-auto w-[90%] max-w-[1440px] xl:w-[85%]">

                {/* Header */}
                <div className="text-left md:text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Our Services
                    </h2>

                    <p className="mt-4 max-w-4xl mx-auto text-gray-600 text-sm md:text-base">
                        We provide individualized consultations and treatments for PRP and
                        PRF for hair and scalp concerns, PRP and PRF for selected skin concerns,
                        Microneedling, Hair and scalp assessment, Skin assessment, Red-light/photo
                        biomodulation options for hair care.
                    </p>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <ServiceCardSkeleton key={index} />
                        ))}
                    </div>
                ) : services.length === 0 ? (
                    <div className="py-12 text-center">
                        <p className="text-sm text-[#77716B]">
                            No services found.
                        </p>
                    </div>
                ) : services.length > 4 ? (
                    /* Carousel */
                    <Carousel
                        responsive={responsive}
                        infinite
                        arrows
                        showDots
                        swipeable
                        draggable
                        keyBoardControl
                        containerClass="services-carousel"
                        itemClass="px-2 sm:px-3"
                        dotListClass="services-dot-list"
                    >
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                            />
                        ))}
                    </Carousel>
                ) : (
                    /* Grid */
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                index={index}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default OurServices;