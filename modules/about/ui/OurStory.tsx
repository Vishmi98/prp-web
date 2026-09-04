import React from "react";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";


const OurStory = () => {
    return (
        <section className="py-20 bg-[#D4AF37]/10 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    {/* Image Side */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative h-[400px] md:h-[500px] w-full rounded-sm overflow-hidden">
                            <ImageWithSkeleton
                                src="/Alocuro machine.png"
                                alt="Clinic Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                            Our Story
                        </h2>

                        <div className="space-y-5 text-gray-600 leading-relaxed">
                            <p>
                                Founded with a vision to redefine aesthetic medicine, our clinic specializes exclusively in Platelet-Rich Plasma (PRP) therapies. We recognized the immense potential of utilizing the body&apos;s own natural healing mechanisms to achieve remarkable results in hair restoration and skin rejuvenation.
                            </p>
                            <p>
                                Over the years, we have treated thousands of patients, refining our techniques to deliver the most effective and comfortable experience possible. Our commitment to continuous research ensures that we remain at the forefront of regenerative aesthetic treatments.
                            </p>
                            <p>
                                We believe that true luxury lies in personalized care, scientifically backed procedures, and natural-looking results that empower you to feel confident in your own skin.
                            </p>
                        </div>

                        {/* <div className="md:mt-10 mt-6 flex gap-12 border-t border-gray-100 pt-8">
                            <div>
                                <h3 className="md:text-3xl text-2xl font-bold mb-2">10+</h3>
                                <p className="text-gray-500">Years Experience</p>
                            </div>
                            <div>
                                <h3 className="md:text-3xl text-2xl font-bold mb-2">5k+</h3>
                                <p className="text-gray-500">Happy Clients</p>
                            </div>
                        </div> */}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default OurStory;
