"use client"

import React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";


const Hero = () => {
    const router = useRouter();

    return (
        <section className="relative h-screen flex items-center bg-white">
            <div className="w-[90%] md:w-[85%] 2xl:w-[70%] mx-auto md:pt-20 2xl:pt-0">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-30 2xl:gap-30 items-center">
                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-center md:text-left pt-10 md:pt-0 flex flex-col md:items-start items-center">
                            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                                Natural Hair & Skin
                                Rejuvenation Therapy
                            </h1>

                            <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
                                Experience advanced Platelet-Rich Plasma (PRP) treatments designed
                                to restore your natural beauty, stimulate hair growth, and rejuvenate
                                your skin — safely and effectively.
                            </p>

                            {/* Buttons */}
                            <div className="mt-10 flex flex-row items-center md:items-start">
                                <Button onClick={() => router.push("/contact")}>Book Online</Button>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT IMAGE */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative h-[390px] md:h-[480px] 2xl:h-[610px] w-full rounded-sm overflow-hidden">
                            <ImageWithSkeleton
                                src="/Alocuro machine.png"
                                alt="Clinic Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;