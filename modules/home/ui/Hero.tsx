import React from "react";
import Link from "next/link";
import Image from "next/image";

import Button from "@/components/Button";

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center bg-white">

            <div className="w-[90%] xl:w-[85%] mx-auto grid md:grid-cols-2 gap-10 items-center">

                {/* LEFT CONTENT */}
                <div className="text-center md:text-left pt-10 md:pt-0">
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
                    <div className="mt-10 flex flex-row items-center md:items-start gap-4">
                        <Link href="/consultation">
                            <Button>Book Consultation</Button>
                        </Link>

                        <Link href="/services">
                            <Button variant="outline">
                                Explore Treatments
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative w-full h-[350px] md:h-[500px]">
                    <Image
                        src="/hero-bg.png" // put your image in /public
                        alt="PRP Treatment"
                        fill
                        className="object-cover object-left"
                        priority
                    />
                </div>
            </div>

        </section>
    );
};

export default Hero;