"use client";

import React from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const team = [
    {
        name: "Dr. Sarah Williams",
        role: "PRP Specialist",
        image: "/d1.jpg",
    },
    {
        name: "Dr. Michael Chen",
        role: "Dermatologist",
        image: "/d2.jpg",
    },
    {
        name: "Dr. Emily Brown",
        role: "Skin Care Expert",
        image: "/d3.jpg",
    },
    {
        name: "Dr. David Smith",
        role: "Hair Restoration Expert",
        image: "/d4.jpg",
    },
];

const Team = () => {
    return (
        <section className="py-20 text-black">
            <div className="w-[90%] xl:w-[85%] mx-auto flex flex-col md:flex-row md:gap-10">

                {/* Heading */}
                <div className="text-start mb-14 w-full md:w-[35%]">
                    <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                        Meet Our Experts For Your Better Results.
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-sm md:text-base">
                        Our experienced medical professionals ensure safe,
                        effective, and personalized PRP treatments.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-10 w-full md:w-[65%] md:px-5">

                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="group overflow-hidden hover:scale-[1.03] transition duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-48 md:h-65 w-full overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-500 object-top"
                                />

                                {/* Overlay Social Icons */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                                    <div className="bg-white text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white">
                                        <FaFacebookF size={14} />
                                    </div>
                                    <div className="bg-white text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white">
                                        <FaInstagram size={14} />
                                    </div>
                                    <div className="bg-white text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-white">
                                        <FaLinkedinIn size={14} />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="py-3 text-start">
                                <h3 className="text-base md:text-lg font-semibold">
                                    {member.name}
                                </h3>
                                <p className="text-gray-400 text-sm mt-1">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;