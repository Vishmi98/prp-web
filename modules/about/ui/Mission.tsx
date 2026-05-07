import React from "react";
import { BiTargetLock, BiHeart, BiShieldQuarter } from "react-icons/bi";

const Mission = () => {
    return (
        <section className="py-20 bg-gray-50 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Our Core Values
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto">
                        The principles that guide our practice and ensure we deliver the highest standard of care to every individual.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Mission */}
                    <div className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#D4AF37]">
                        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                            <BiTargetLock size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To provide safe, effective, and natural aesthetic solutions through advanced PRP therapies, empowering our clients to achieve their desired appearance and regain their confidence.
                        </p>
                    </div>

                    {/* Care */}
                    <div className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#D4AF37]">
                        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                            <BiHeart size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Patient-Centric Care</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We prioritize your comfort and well-being. Every treatment plan is uniquely tailored to your specific needs, ensuring a supportive and luxurious experience from consultation to aftercare.
                        </p>
                    </div>

                    {/* Excellence */}
                    <div className="bg-white p-10 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#D4AF37]">
                        <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                            <BiShieldQuarter size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Clinical Excellence</h3>
                        <p className="text-gray-600 leading-relaxed">
                            We uphold the highest medical standards, utilizing state-of-the-art equipment and continuously updating our protocols based on the latest scientific advancements in regenerative medicine.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
