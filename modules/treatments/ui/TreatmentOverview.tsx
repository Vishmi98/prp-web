"use client"

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    BiCheckCircle,
    BiTime,
    BiPulse,
    BiLeaf,
    BiCheckSquare,
    BiWallet,
} from "react-icons/bi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Button from "@/components/Button";
import { RESULTS_DATA } from "@/constants/data";


interface ProcedureDetails {
    duration: string;
    downtime: string;
    painLevel: string;
    image: string;
}

interface TreatmentOverviewProps {
    title: string;
    description: string;
    benefits: string[];
    heroImage: string;
    procedureDetails: ProcedureDetails;
}

const TreatmentOverview = ({
    title,
    description,
    benefits,
    heroImage,
    procedureDetails,
}: TreatmentOverviewProps) => {
    const router = useRouter();

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <section className="py-20 lg:py-28 bg-[#FAFAF8] text-black relative mt-10 overflow-hidden">

                {/* Background Blur */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/5 blur-3xl rounded-full" />

                <div className="relative z-10 w-[90%] xl:w-[85%] mx-auto">

                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

                        {/* Left Content */}
                        <div>

                            <p className="uppercase tracking-[4px] text-[#D4AF37] text-sm font-medium mb-4">
                                {title}
                            </p>

                            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-black mb-4">
                                About {title}
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                {description}
                            </p>

                            <p className="text-gray-600 leading-relaxed mt-6">
                                Our advanced regenerative treatments are designed
                                to naturally stimulate healing, collagen production,
                                and long-term rejuvenation with minimal downtime.
                                Every procedure is personalized to enhance your
                                confidence while maintaining natural-looking results.
                            </p>

                            {/* Benefits */}
                            <div className="mt-12">
                                <h3 className="text-2xl font-semibold mb-8">
                                    Key Benefits
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="flex items-start gap-4 bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                                <BiCheckCircle
                                                    className="text-[#D4AF37]"
                                                    size={22}
                                                />
                                            </div>

                                            <p className="text-gray-700 leading-relaxed">
                                                {benefit}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative h-[420px] md:h-[620px] rounded-lg overflow-hidden shadow-lg">
                                <Image
                                    src={heroImage}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Floating Card */}
                            <div className="absolute hidden md:block -bottom-10 left-6 right-6 bg-white shadow-2xl rounded-lg border border-gray-100 p-6 backdrop-blur-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-[2px] text-gray-500">
                                            Natural Results
                                        </p>

                                        <h4 className="text-xl font-semibold mt-1">
                                            {title}
                                        </h4>
                                    </div>

                                    <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                                        <BiPulse
                                            className="text-[#D4AF37]"
                                            size={28}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
            {/* Before After Slider */}
            <div className="bg-[#D4AF37]/20 py-20">
                <div className="w-[90%] xl:w-[85%] mx-auto">

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="uppercase tracking-[3px] text-[#D4AF37] text-sm mb-2">
                                Real Client Results
                            </p>

                            <h3 className="text-3xl font-semibold">
                                Before & After
                            </h3>
                        </div>
                    </div>

                    <Carousel
                        responsive={responsive}
                        infinite
                        autoPlay
                        autoPlaySpeed={4000}
                        arrows={false}
                        showDots
                        swipeable
                        draggable
                    >
                        {RESULTS_DATA.map((item, index) => (
                            <div
                                key={index}
                                className="overflow-hidden mx-2"
                            >
                                <div className="grid grid-cols-2">

                                    {/* Before */}
                                    <div>
                                        <div className="relative h-[300px]">
                                            <Image
                                                src={item.before}
                                                alt="Before"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* After */}
                                    <div>
                                        <div className="relative h-[300px]">
                                            <Image
                                                src={item.after}
                                                alt="After"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
            {/* Bottom Section */}
            <div className="bg-white py-20 w-[90%] xl:w-[85%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    <div className="space-y-4">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente amet dicta sit laborum minima cumque iusto minus ratione, adipisci illum corporis porro inventore eaque deserunt obcaecati, ducimus accusamus quibusdam nostrum saepe! Illo, reiciendis distinctio ipsa accusamus libero officia? Vero nostrum voluptatibus quaerat dolorem. Maiores unde laborum error soluta vitae delectus deleniti! Saepe incidunt dolor perspiciatis quasi asperiores dolores hic fugiat.
                        </p>

                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti consequatur perspiciatis sapiente alias quibusdam, eveniet, sed nihil similique itaque fugit, blanditiis consectetur totam laudantium explicabo quae in hic! Nostrum quasi laudantium nobis suscipit voluptas hic perspiciatis consequuntur atque. Commodi error soluta architecto earum temporibus dolor veritatis ipsa beatae. Quia, ducimus mollitia nemo nobis totam consectetur voluptatem officiis accusantium aspernatur assumenda aut debitis corrupti laboriosam hic recusandae animi saepe voluptates dolorum.

                        </p>
                    </div>
                    {/* Procedure Details */}
                    <div className="bg-white text-black rounded-lg p-5 lg:sticky lg:top-32 border border-gray-200">

                        {/* Heading */}
                        <div className="mb-5">
                            <h3 className="text-2xl md:text-3xl font-medium">
                                Treatments Overview
                            </h3>

                            <div className="w-full h-[1px] bg-[#D4AF37] mt-4" />
                        </div>

                        {/* Details */}
                        <div className="space-y-8">

                            {/* Number of Treatments */}
                            <div className="flex items-start gap-4">
                                <BiLeaf className="text-gray-500 mt-1 shrink-0" size={28} />

                                <div>
                                    <p className="font-semibold">
                                        Number of treatments
                                    </p>

                                    <p className="md:text-xl font-light mt-1">
                                        6
                                    </p>
                                </div>
                            </div>

                            {/* Treatment Time */}
                            <div className="flex items-start gap-4">
                                <BiTime className="text-gray-500 mt-1 shrink-0" size={28} />

                                <div>
                                    <p className="font-semibold">
                                        Treatment time
                                    </p>

                                    <p className="md:text-xl font-light mt-1">
                                        {procedureDetails.duration}
                                    </p>
                                </div>
                            </div>

                            {/* Recovery Time */}
                            <div className="flex items-start gap-4">
                                <BiPulse className="text-gray-500 mt-1 shrink-0" size={28} />

                                <div>
                                    <p className="font-semibold">
                                        Recovery time
                                    </p>

                                    <p className="md:text-xl font-light mt-1">
                                        {procedureDetails.downtime}
                                    </p>
                                </div>
                            </div>

                            {/* Maximum Results */}
                            <div className="flex items-start gap-4">
                                <BiCheckSquare className="text-gray-500 mt-1 shrink-0" size={28} />

                                <div>
                                    <p className="font-semibold">
                                        Maximum results
                                    </p>

                                    <p className="md:text-xl font-light mt-1">
                                        Up to 1 year
                                    </p>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="flex items-start gap-4">
                                <BiWallet className="text-gray-500 mt-1 shrink-0" size={28} />

                                <div>
                                    <p className="font-semibold">
                                        Pricing
                                    </p>

                                    <p className="font-light mt-1 leading-relaxed">
                                        Premium PRP Treatments from
                                        <span className="text-[#D4AF37] font-medium ml-1">
                                            $283
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="mt-10">
                            <Button onClick={() => router.push("/contact")}>
                                Book Consultation
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TreatmentOverview;