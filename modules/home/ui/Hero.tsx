"use client"

import React from "react";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";


const Hero = () => {
    const router = useRouter();

    return (
        <section className="relative h-auto flex items-center bg-white">
            <div className="w-[90%] md:w-[85%] 2xl:w-[70%] mx-auto py-20 2xl:py-0">
                <div className="flex flex-col lg:flex-row gap-5 items-center">
                    {/* LEFT CONTENT */}
                    <div className="w-full lg:w-1/2">
                        <div className="text-center md:text-left pt-10 md:pt-0 flex flex-col md:items-start items-center">
                            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                                Individualized PRP & PRF Treatments for Skin and Hair
                            </h1>

                            <p className="mt-6 text-gray-600 text-sm md:text-base leading-relaxed">
                               Welcome to PRP for Skin & Hair, a nurse-led clinic providing personalized Platelet Rich Plasma (PRP) and Platelet Rich Fibrin (PRF) treatments 
                               for suitable adults with skin and hair concerns. Our approach focuses on individual assessment, informed decisions and appropriate clinical care. 
                               Treatment suitability varies between individuals. Before treatment, we discuss your medical history, goals, potential benefits, limitations and 
                               risks so you can decide whether treatment is right for you.
                            </p>

                            {/* Buttons */}
                            <div className="mt-6 flex flex-row items-center md:items-start">
                                <Button onClick={() => router.push("/contact")}>Book Online</Button>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT IMAGE */}
                    <div className="w-full lg:w-1/2 relative pl-0 md:pl-16 2xl:pl-12">
                        <div className="relative h-[360px] md:h-[460px] 2xl:h-[610px] w-full rounded-sm overflow-hidden">
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