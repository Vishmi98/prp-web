"use client";

import React, { useEffect, useState } from "react";

import { ServiceDataType } from "@/modules/services/services.types";
import { getServices } from "@/modules/services/services.service";
import ServiceCardSkeleton from "@/modules/services/ui/ServiceCardSkeleton";
import ServiceCard from "@/modules/services/ui/ServiceCard";


const OurServices = () => {
    const [services, setServices] = useState<ServiceDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                // Request limit set to fetch 4 services for the grid layout
                const data = await getServices(1, 4);

                if (data.success) {
                    // Filter out unpublished items if required by client logic
                    const publishedServices = data.services.filter(
                        (item) => item.isPublish !== false
                    );
                    setServices(publishedServices);
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
        <section className="py-12 md:py-20 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                {/* Heading */}
                <div className="text-left md:text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold">Our Services</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
                        Advanced PRP treatments designed to restore your natural beauty,
                        confidence, and skin health.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <ServiceCardSkeleton key={index} />
                        ))
                    ) : services.length > 0 ? (
                        services.map((service, index) => (
                            <ServiceCard key={service.id} service={service} index={index} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No services found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default OurServices;