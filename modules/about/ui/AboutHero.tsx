import React from "react";
import { BiPhoneCall, BiEnvelope, BiMap, BiTime } from "react-icons/bi";

const AboutHero = () => {
    return (
        <section className="bg-white pt-32 pb-20 relative">
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-[300px] md:h-[500px] bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="w-[90%] xl:w-[85%] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 2xl:gap-20 items-center">

                    {/* Left Typography Side */}
                    <div className="w-full lg:w-[55%] 2xl:w-[60%]">
                        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
                            About
                            <span className="text-gold"> Us</span>
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed w-full">
                            At
                            <span className="font-semibold pl-1">
                                PRP for Skin & Hair
                            </span>
                            , we believe that every client is unique,
                            and so is their skin, hair and treatment journey. We provide Platelet Rich
                            Plasma (PRP) and Platelet Rich Fibrin (PRF) treatments for skin and hair, with
                            a strong focus on personalised care, thorough assessment and treatment
                            planning tailored to each individual. As an independently operated clinic, every
                            consultation and treatment is personally provided by an experienced Registered
                            Nurse, with a strong commitment to professional standards, patient safety and
                            quality care. Rather than taking a one-size-fits-all approach, we take the time to
                            understand your concerns, assess your individual needs and discuss your
                            treatment goals before developing an appropriate treatment plan.
                        </p>
                    </div>

                    {/* Right Contact Details Side */}
                    <div className="w-full lg:w-[45%] 2xl:w-[40%]">
                        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 md:p-10 shadow-lg relative overflow-hidden">
                            {/* Gold Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

                            <h3 className="text-2xl font-semibold mb-8 text-black">Get in Touch</h3>

                            <div className="space-y-6">
                                {/* Phone */}
                                <a
                                    href="tel:+61460351834"
                                    className="flex items-start gap-3 md:gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiPhoneCall size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Call Us</p>
                                        <p className="font-semibold text-gray-900">0460 351 834</p>
                                    </div>
                                </a>

                                {/* Email */}
                                <a
                                    href="mailto:admin@prp4skinandhair.com.au"
                                    className="flex items-start gap-3 md:gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiEnvelope size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Email Us</p>
                                        <p className="font-semibold text-gray-900">admin@prp4skinandhair.com.au</p>
                                    </div>
                                </a>

                                {/* Location */}
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiMap size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Location</p>
                                        <p className="text-base font-semibold text-gray-900 leading-snug">
                                            9, Fernwren Drive Berwick 3806- Victoria
                                        </p>
                                    </div>
                                </div>

                                {/* Hours */}
                                <div className="flex items-start gap-3 md:gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-gold shrink-0 mt-1">
                                        <BiTime size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Appointments</p>
                                        <p className="text-base font-semibold text-gray-900">
                                            up on requests
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
