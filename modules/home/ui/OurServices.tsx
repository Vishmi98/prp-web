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
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
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

const OurServices = () => {
    const [services, setServices] = useState<ServiceDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        <>
            {services.length > 0 &&
                <section className="py-12 md:py-20 text-black">
                    <div className="w-[90%] xl:w-[85%] mx-auto">

                        {/* Heading */}
                        <div className="text-left md:text-center mb-14">
                            <h2 className="text-3xl md:text-4xl font-semibold">
                                Our Services
                            </h2>

                            <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
                                Advanced PRP treatments designed to restore your natural
                                beauty, confidence, and skin health.
                            </p>
                        </div>

                        {/* Loading */}
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <ServiceCardSkeleton key={index} />
                                ))}
                            </div>
                        ) : services.length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                No services found.
                            </div>
                        ) : services.length > 4 ? (
                            /* Carousel when more than 4 */
                            <Carousel
                                responsive={responsive}
                                infinite
                                autoPlay
                                autoPlaySpeed={2500}
                                transitionDuration={700}
                                arrows
                                showDots
                                swipeable
                                draggable
                                keyBoardControl
                                pauseOnHover
                                containerClass="pb-10"
                                itemClass="md:px-3"
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
                            /* Normal grid when 4 or fewer */
                            <div className="flex flex-wrap justify-center gap-8">
                                {services.map((service, index) => (
                                    <div
                                        key={service.id}
                                        className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
                                    >
                                        <ServiceCard service={service} index={index} />
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                </section>
            }
        </>
    );
};

export default OurServices;