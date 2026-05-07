import React from "react";
import Image from "next/image";

import { RESULTS_DATA } from "@/constants/data";


const Results = () => {
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

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {RESULTS_DATA.map((item, index) => (
                        <div
                            key={index}
                            className="overflow-hidden hover:scale-[1.03] transition"
                        >
                            {/* Title */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-center">
                                    {item.title}
                                </h3>
                            </div>

                            {/* Images */}
                            <div className="grid grid-cols-2">
                                {/* Before */}
                                <div className="relative h-60">
                                    <Image
                                        src={item.before}
                                        alt="Before"
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* After */}
                                <div className="relative h-60">
                                    <Image
                                        src={item.after}
                                        alt="After"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Results;