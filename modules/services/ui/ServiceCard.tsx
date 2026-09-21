import React from "react";

import { ServiceDataType } from "../services.types";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";


interface ServiceCardProps {
    service: ServiceDataType;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
    const displayId = String(index + 1).padStart(2, "0");
    const imageUrl = service.thumbnailImagePath || "/placeholder-service.jpg";

    return (
        <div className="overflow-hidden w-full hover:scale-[1.02] transition duration-300">
            {/* Image Container */}
            <div className="relative w-full h-70 2xl:h-80 bg-gray-100 overflow-hidden">
                <ImageWithSkeleton
                    src={imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top"
                />
            </div>

            {/* Content */}
            <div className="py-4">
                <div className="flex items-start gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gold">
                        {displayId}.
                    </h1>
                </div>
                <h3 className="text-lg font-semibold text-black">{service.title}</h3>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {service.description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;