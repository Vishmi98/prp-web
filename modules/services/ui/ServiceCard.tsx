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
        <div className="overflow-hidden hover:scale-[1.02] transition duration-300">
            {/* Image Container */}
            <div className="relative w-full h-72 md:h-64 bg-gray-100 rounded-sm overflow-hidden">
                <ImageWithSkeleton
                    src={imageUrl}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover object-top"
                />
            </div>

            {/* Content */}
            <div className="py-5">
                <div className="flex items-start gap-3 mb-3">
                    <h1 className="text-3xl font-bold text-gold">
                        {displayId}.
                    </h1>
                    <h3 className="text-lg font-medium text-black">{service.title}</h3>
                </div>
                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {service.description}
                </p>
            </div>
        </div>
    );
};

export default ServiceCard;