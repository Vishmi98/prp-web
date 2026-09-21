import React from "react";

import ImageWithSkeleton from "@/components/ImageWithSkeleton";


const OurStory = () => {
    return (
        <section className="py-20 bg-[#D4AF37]/10 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">

                    {/* Image Side */}
                    <div className="w-full col-span-2 relative">
                        <div className="relative h-[280px] md:h-[480px] 2xl:h-[650px] w-full rounded-sm overflow-hidden">
                            <ImageWithSkeleton
                                src="/My pic 1.png"
                                alt="Clinic Interior"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="w-full">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
                            Our Approach
                        </h2>

                        <div className="space-y-5 text-gray-600 leading-relaxed">
                            <p>
                                Our philosophy is simple: <span className="font-bold">quality care, personalised treatment and a focus on achieving
                                    the best possible outcome for every client.</span>
                            </p>
                            <p>
                                We believe that good results are not simply about the treatment itself. They are also about
                                careful assessment, appropriate treatment planning, suitable medical oversight, consistency
                                and ongoing care
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
