import React from "react";
import Image from "next/image";

interface TreatmentHeroProps {
    title: string;
    subtitle: string;
    heroImage: string;
}

const TreatmentHero = ({ title, subtitle, heroImage }: TreatmentHeroProps) => {
    return (
        <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroImage}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] font-semibold text-sm mb-6 border border-[#D4AF37]/40 uppercase tracking-widest backdrop-blur-sm">
                    Premium Treatment
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
                    {title}
                </h1>
                <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
                    {subtitle}
                </p>
            </div>
        </section>
    );
};

export default TreatmentHero;
