import React from "react";
import { BiPhoneCall, BiEnvelope, BiMap, BiTime } from "react-icons/bi";

const AboutHero = () => {
    return (
        <section className="bg-white pt-32 pb-20 relative">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="w-[90%] xl:w-[85%] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-center">

                    {/* Left Typography Side */}
                    <div className="w-full lg:w-[55%]">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-black/10 text-black font-semibold text-xs mb-6 border border-blacl/20">
                            About Our Clinic
                        </div>
                        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
                            Elevating Aesthetics
                            <span className="text-gold"> Through Science</span>
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                            We are pioneers in advanced PRP (Platelet-Rich Plasma) therapies. Our commitment is to deliver natural, long-lasting results for hair restoration and skin rejuvenation in a luxurious, medically-sound environment.
                        </p>
                    </div>

                    {/* Right Contact Details Side */}
                    <div className="w-full lg:w-[45%]">
                        <div className="bg-gray-50 border border-gray-100 rounded-sm p-6 md:p-10 shadow-lg relative overflow-hidden">
                            {/* Gold Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

                            <h3 className="text-2xl font-semibold mb-8 text-black">Get in Touch</h3>

                            <div className="space-y-6">
                                {/* Phone */}
                                <a
                                    href="tel:+61460351834"
                                    className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiPhoneCall size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Call Us</p>
                                        <p className="text-lg font-semibold text-gray-900">+61 460 351 834</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:admin@prp4skinandhair.com.au"
                                    className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiEnvelope size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Email Us</p>
                                        <p className="text-lg font-semibold text-gray-900">admin@prp4skinandhair.com.au</p>
                                    </div>
                                </a>

                                {/* Location */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiMap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-base font-semibold text-gray-900 leading-snug">
                                            Victoria, Australia
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiTime size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Working Hours</p>
                                        <p className="text-base font-semibold text-gray-900">
                                            Mon - Fri: 9:00 AM - 6:00 PM<br />
                                            Sat: 10:00 AM - 4:00 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutHero;
