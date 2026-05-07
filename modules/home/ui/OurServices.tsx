import React from "react";
import Image from "next/image";

import { SERVICES } from "@/constants/data";


const OurServices = () => {
    return (
        <section className="py-12 md:py-20 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">

                {/* Heading */}
                <div className="text-left md:text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Our Services
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
                        Advanced PRP treatments designed to restore your natural beauty,
                        confidence, and skin health.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {SERVICES.map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden hover:scale-[1.03] transition duration-300"
                        >
                            {/* Image */}
                            <div className="relative w-full h-62">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="py-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <h1 className="text-4xl md:6xl font-bold text-gold">
                                        {item.id}.
                                    </h1>
                                    <h3 className="text-lg font-medium">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurServices;