import React from "react";
import {
    BiBookOpen,
    BiNews,
    BiCalendar,
    BiBulb,
} from "react-icons/bi";


const BlogsHero = () => {
    return (
        <section className="bg-white pt-32 pb-20 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-[500px] bg-gradient-to-bl from-gold/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="w-[90%] xl:w-[85%] mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row gap-8 items-center">

                    {/* Left */}
                    <div className="w-full lg:w-[55%]">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-black/10 text-black font-semibold text-xs mb-6 border border-blacl/20">
                            Our Blogs
                        </div>

                        <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
                            Insights, Treatments &
                            <span className="text-gold"> Expert Advice</span>
                        </h1>

                        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl">
                            Stay informed with the latest developments in PRP
                            therapy, hair restoration, skin rejuvenation, and
                            aesthetic medicine. Our specialists regularly share
                            expert guidance, treatment insights, and practical
                            skincare tips to help you make confident decisions
                            about your wellness journey.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="w-full lg:w-[45%]">
                        <div className="bg-gray-50 border border-gray-100 rounded-sm p-6 md:p-10 shadow-lg relative overflow-hidden">

                            <div className="absolute top-0 left-0 w-full h-1 bg-gold" />

                            <h3 className="text-2xl font-semibold mb-8">
                                What You'll Discover
                            </h3>

                            <div className="space-y-6">

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                                        <BiBookOpen size={20} />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Treatment Guides
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Learn about PRP procedures,
                                            preparation, recovery, and expected
                                            results.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                                        <BiBulb size={20} />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Expert Tips
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Practical advice for maintaining
                                            healthy skin and stronger hair.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                                        <BiNews size={20} />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Medical Updates
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            Stay up to date with innovations in
                                            regenerative medicine and aesthetic
                                            care.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                                        <BiCalendar size={20} />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Fresh Content
                                        </p>
                                        <p className="text-gray-600 text-sm">
                                            New educational articles are
                                            published regularly by our medical
                                            team.
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

export default BlogsHero;