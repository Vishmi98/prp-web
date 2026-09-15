import React from "react";
import { BiBookOpen, BiAward, BiHeart } from "react-icons/bi";

const Mission = () => {
    const values = [
        {
            icon: <BiBookOpen size={32} />,
            title: "Continuous Expertise & Quality",
            description:
                "We are committed to continually developing our knowledge, using quality products and technologies, and working strictly within appropriate clinical and regulatory frameworks.",
        },
        {
            icon: <BiHeart size={32} />,
            title: "Dedicated Client Care",
            description:
                "Your care matters to us. We ensure every client receives the time, attention, and individual care they deserve throughout their journey.",
        },
        {
            icon: <BiAward size={32} />,
            title: "Tailored Experience",
            description:
                "Our goal is not simply to provide a treatment it is to provide a carefully considered treatment experience tailored to you, complete with medical oversight and ongoing support.",
        },
    ];

    return (
        <section className="py-20 bg-gray-50 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Your Care Matters
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600 leading-relaxed">
                        We are committed to delivering safe, thoughtful, and high-quality care tailored to your individual needs.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow border-t-4 border-[#D4AF37] flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] mb-6">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Mission;