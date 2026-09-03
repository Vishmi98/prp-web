"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
    BiCheckCircle,
    BiTime,
    BiPulse,
    BiLeaf,
    BiCheckSquare,
    BiWallet,
    BiListOl,
} from "react-icons/bi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { TreatmentDetailsProps } from "../treatments.types";

import Button from "@/components/Button";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";


const TreatmentOverview = ({ treatment }: TreatmentDetailsProps) => {
    const router = useRouter();

    const {
        title,
        description,
        shortDescription,
        benefits = [],
        procedureSteps = [],
        results = [],
        thumbnailImagePath,
        overview,
    } = treatment;

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 768, min: 0 },
            items: 1,
        },
    };

    return (
        <>
            <section className="pt-20 lg:pt-28 pb-10 lg:pb-18 bg-[#FAFAF8] text-black relative mt-10 overflow-hidden">
                {/* Background Blur */}
                <div className="absolute top-0 left-0 w-72 h-72 bg-[#D4AF37]/10 blur-3xl rounded-full" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/5 blur-3xl rounded-full" />

                <div className="relative z-10 w-[90%] xl:w-[85%] mx-auto">
                    {/* Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                        {/* Left Content */}
                        <div>
                            <p className="uppercase tracking-[4px] text-gold text-sm font-medium mb-4">
                                {title}
                            </p>

                            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-black mb-4">
                                About {title}
                            </h2>

                            <p className="text-gray-600 leading-relaxed">{description}</p>

                            {shortDescription && (
                                <p className="text-gray-600 leading-relaxed mt-4 italic">
                                    {shortDescription}
                                </p>
                            )}
                        </div>

                        {/* Right Image */}
                        <div className="relative">
                            <div className="relative h-[380px] md:h-[600px] rounded-lg overflow-hidden shadow-lg bg-gray-100">
                                {thumbnailImagePath ? (
                                    <ImageWithSkeleton
                                        src={thumbnailImagePath}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No image available
                                    </div>
                                )}
                            </div>

                            {/* Floating Card */}
                            <div className="absolute hidden md:block -bottom-10 left-6 right-6 bg-white shadow-2xl rounded-lg border border-gray-100 p-6 backdrop-blur-md">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm uppercase tracking-[2px] text-gray-500">
                                            Natural Results
                                        </p>

                                        <h4 className="text-xl font-semibold mt-1">{title}</h4>
                                    </div>

                                    <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                                        <BiPulse className="text-gold" size={28} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Benefits */}
                    {benefits.length > 0 && (
                        <div className="mt-12">
                            <h3 className="text-2xl font-semibold mb-8">Key Benefits</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                                {benefits.map((benefit, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-4 bg-white border border-gray-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                            <BiCheckCircle
                                                className="text-gold"
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
                    )}
                </div>
            </section>

            {/* Before After Slider */}
            {results && results.length > 0 && (
                <div className="bg-[#D4AF37]/10 py-20">
                    <div className="w-[90%] xl:w-[85%] mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="uppercase tracking-[3px] text-gold text-sm mb-2 font-medium">
                                    Real Client Results
                                </p>

                                <h3 className="text-3xl font-semibold">Before & After</h3>
                            </div>
                        </div>

                        <Carousel
                            responsive={responsive}
                            infinite
                            autoPlay
                            autoPlaySpeed={4000}
                            swipeable
                            draggable
                        >
                            {results.map((item, index) => (
                                <div key={index} className="overflow-hidden md:mx-2 rounded-lg shadow-sm bg-white">
                                    <div className="grid grid-cols-1">
                                        {/* Before */}
                                        <div className="relative border-r border-gray-200">
                                            <ImageWithSkeleton
                                                src={item.beforeImagePath}
                                                alt="Before Treatment"
                                                width={750}
                                                height={938}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            )}

            {/* Bottom Section */}
            <div className="bg-white py-20 w-[90%] xl:w-[85%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Procedure Steps */}
                    <div className="space-y-6">
                        {procedureSteps.length > 0 && (
                            <div>
                                <h3 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center gap-2">
                                    <BiListOl className="text-gold" /> Procedure Steps
                                </h3>
                                <div className="space-y-3">
                                    {procedureSteps.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg bg-[#FAFAF8]"
                                        >
                                            <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold shrink-0 text-sm">
                                                {idx + 1}
                                            </span>
                                            <p className="text-gray-700 leading-relaxed mt-0.5">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Procedure Details / Overview Card */}
                    <div className="bg-white text-black rounded-lg p-6 lg:sticky lg:top-32 border border-gray-200 shadow-sm">
                        {/* Heading */}
                        <div className="mb-6">
                            <h3 className="text-2xl md:text-3xl font-medium">
                                Treatment Overview
                            </h3>

                            <div className="w-full h-[1px] bg-[#D4AF37] mt-4" />
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            {/* Number of Treatments */}
                            <div className="flex items-start gap-4">
                                <BiLeaf className="text-gray-500 mt-1 shrink-0" size={26} />

                                <div>
                                    <p className="font-semibold text-sm uppercase tracking-wider text-gray-500">
                                        Number of treatments
                                    </p>

                                    <p className="text-lg font-medium text-gray-800 mt-1">
                                        {overview?.numberOfTreatments ?? 1}
                                    </p>
                                </div>
                            </div>

                            {/* Treatment Time */}
                            {overview?.treatmentTime && (
                                <div className="flex items-start gap-4">
                                    <BiTime className="text-gray-500 mt-1 shrink-0" size={26} />

                                    <div>
                                        <p className="font-semibold text-sm uppercase tracking-wider text-gray-500">
                                            Treatment time
                                        </p>

                                        <p className="text-lg font-medium text-gray-800 mt-1">
                                            {overview.treatmentTime}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Recovery Time */}
                            {overview?.recoveryTime && (
                                <div className="flex items-start gap-4">
                                    <BiPulse className="text-gray-500 mt-1 shrink-0" size={26} />

                                    <div>
                                        <p className="font-semibold text-sm uppercase tracking-wider text-gray-500">
                                            Recovery time
                                        </p>

                                        <p className="text-lg font-medium text-gray-800 mt-1">
                                            {overview.recoveryTime}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Maximum Results */}
                            {overview?.maximumResults && (
                                <div className="flex items-start gap-4">
                                    <BiCheckSquare
                                        className="text-gray-500 mt-1 shrink-0"
                                        size={26}
                                    />

                                    <div>
                                        <p className="font-semibold text-sm uppercase tracking-wider text-gray-500">
                                            Maximum results
                                        </p>

                                        <p className="text-lg font-medium text-gray-800 mt-1">
                                            {overview.maximumResults}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pricing */}
                            {overview?.pricing && (
                                <div className="flex items-start gap-4">
                                    <BiWallet
                                        className="text-gray-500 mt-1 shrink-0"
                                        size={26}
                                    />

                                    <div>
                                        <p className="font-semibold text-sm uppercase tracking-wider text-gray-500">
                                            Pricing
                                        </p>

                                        <p className="font-light mt-1 leading-relaxed text-gray-800">
                                            {overview.pricing.description || "Treatments starting from"}
                                            {overview.pricing.amount !== undefined && (
                                                <span className="text-gold font-semibold ml-1">
                                                    {overview.pricing.currency === "USD" ? "$" : `${overview.pricing.currency} `}
                                                    {overview.pricing.amount}
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Button */}
                        <div className="mt-8">
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