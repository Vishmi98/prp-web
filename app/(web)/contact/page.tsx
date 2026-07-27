"use client";

import React, { useState } from "react";
import {
    FiPhoneCall,
    FiMail,
    FiMapPin,
    FiClock,
    FiPlus,
    FiMinus,
} from "react-icons/fi";

import Button from "@/components/Button";
import { FAQ_DATA } from "@/constants/data";


const ContactPage = () => {
    const [activeFaq, setActiveFaq] = useState<number>(0);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? -1 : index);
    };

    return (
        <section className="bg-[#FAFAF8] min-h-screen pt-32 pb-20 overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#D4AF37]/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/5 blur-3xl rounded-full" />

            <div className="relative z-10 w-[90%] xl:w-[85%] mx-auto">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
                        Begin Your
                        <span className="block mt-2">
                            Rejuvenation Journey
                        </span>
                    </h1>

                    <p className="text-gray-600 leading-relaxed mt-6">
                        Speak with our experienced PRP specialists and discover
                        personalized treatments tailored to your beauty and
                        wellness goals.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Left Content */}
                    <div className="space-y-8">

                        <div>
                            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                                Get In Touch
                            </h2>

                            <p className="text-gray-600 leading-relaxed">
                                Our clinic provides advanced PRP and regenerative
                                therapies tailored to your personal beauty and
                                wellness goals. Contact our team today to begin
                                your transformation journey.
                            </p>

                            <div className="space-y-8 mt-10">

                                {/* Phone */}
                                <div className="flex items-start gap-5">
                                    <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                        <FiPhoneCall
                                            className="text-gold"
                                            size={22}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm uppercase tracking-[2px] text-gray-500 mb-1">
                                            Phone
                                        </p>

                                        <h3 className="text-lg md:text-xl font-semibold text-black">
                                            +61 412 345 678
                                        </h3>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-5">
                                    <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                        <FiMail
                                            className="text-gold"
                                            size={22}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm uppercase tracking-[2px] text-gray-500 mb-1">
                                            Email
                                        </p>

                                        <h3 className="text-lg md:text-xl font-semibold text-black">
                                            info@auraclinic.com
                                        </h3>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-5">
                                    <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                        <FiMapPin
                                            className="text-gold"
                                            size={22}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm uppercase tracking-[2px] text-gray-500 mb-1">
                                            Location
                                        </p>

                                        <h3 className="text-lg md:text-xl font-semibold text-black">
                                            Sydney, NSW, Australia
                                        </h3>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-5">
                                    <div className="md:w-12 md:h-12 w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                                        <FiClock
                                            className="text-gold"
                                            size={22}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm uppercase tracking-[2px] text-gray-500 mb-1">
                                            Opening Hours
                                        </p>

                                        <h3 className="text-lg md:text-xl font-semibold text-black">
                                            Mon - Sat : 9AM - 7PM
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className=" bg-white rounded-lg p-5 md:p-8">

                        <div className="mb-10">
                            <p className="uppercase tracking-[4px] text-gold font-medium mb-2">
                                Send Message
                            </p>

                            <h2 className="text-3xl md:text-4xl font-semibold text-black">
                                Contact Us
                            </h2>
                        </div>

                        <form className="md:space-y-7 space-y-5">

                            {/* Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full py-3 px-5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium">
                                        Last Name
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full py-3 px-5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Email + Phone */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                <div>
                                    <label className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        className="w-full py-3 px-5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium">
                                        Phone Number
                                    </label>

                                    <input
                                        type="text"
                                        className="w-full py-3 px-5 rounded-lg border border-gray-200 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium">
                                    Message
                                </label>

                                <textarea
                                    rows={5}
                                    placeholder="Tell us about your goals or questions..."
                                    className="w-full p-5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300 resize-none"
                                />
                            </div>

                            <div className="pt-2">
                                <Button>
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-28 w-full md:w-[70%] mx-auto">

                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <h2 className="text-3xl md:text-4xl font-semibold text-black">
                            Everything You Need To Know
                        </h2>
                    </div>

                    <div className="max-w-5xl mx-auto space-y-4">

                        {FAQ_DATA.map((faq, index) => {
                            const isActive = activeFaq === index;

                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all duration-300"
                                >
                                    {/* Header */}
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between text-left px-6 md:px-8 py-6"
                                    >
                                        <h3 className="text-lg md:text-xl font-semibold text-black pr-6">
                                            {faq.question}
                                        </h3>

                                        <div className="text-black shrink-0">
                                            {isActive ? (
                                                <FiMinus size={24} />
                                            ) : (
                                                <FiPlus size={24} />
                                            )}
                                        </div>
                                    </button>

                                    {/* Content */}
                                    <div
                                        className={`grid transition-all duration-500 ease-in-out ${isActive
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 md:px-8 pb-8 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactPage;