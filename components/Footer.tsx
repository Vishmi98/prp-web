"use client";

import React from "react";
import Link from "next/link";
import { FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";


const Footer = () => {
    return (
        <footer
            id="contact"
            className="relative w-full text-white px-6 md:px-16 lg:px-24 pt-20 pb-8 bg-black/10"
        >
            {/* Top Section */}
            <div className="grid grid-cols-2 lg:grid-cols-7 gap-10">

                {/* Logo + About */}
                <div className="col-span-2">
                    <Link href="/" className="flex flex-col leading-tight">
                        <span className="font-playfair text-2xl md:text-4xl font-semibold bg-black bg-clip-text text-transparent">
                            Aura
                        </span>
                        <span className="text-xs md:text-sm text-black uppercase tracking-[3px]">
                            PRP Clinic
                        </span>
                    </Link>
                    <p className="text-sm text-black mt-2 ">
                        Advanced PRP treatments for hair regrowth and skin rejuvenation.
                        Experience science-backed beauty with luxury care.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-4 mt-5">
                        {[FaFacebookF, FaInstagram, FaWhatsapp].map((Icon, i) => (
                            <div
                                key={i}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-black cursor-pointer
                hover:bg-black hover:text-white transition-all duration-300 text-black"
                            >
                                <Icon size={14} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-black font-semibold mb-4 uppercase r">
                        Quick Links
                    </h3>
                    <ul className="space-y-2 text-black text-sm">
                        <li><Link href="#home" className="hover:font-semibold">Home</Link></li>
                        <li><Link href="#about" className="hover:font-semibold">About</Link></li>
                        <li><Link href="#services" className="hover:font-semibold">Services</Link></li>
                        <li><Link href="#results" className="hover:font-semibold">Results</Link></li>
                        <li><Link href="#contact" className="hover:font-semibold">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div className="col-span-2">
                    <h3 className="text-black font-semibold mb-4 uppercase r">
                        Treatments
                    </h3>
                    <ul className="space-y-2 text-black text-sm">
                        <li>Platelet-Rich Fibrin (PRF) Therapy</li>
                        <li>Platelet-Rich Plasma (PRP) Therapy</li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="col-span-2">
                    <h3 className="text-black font-semibold mb-4 uppercase r">
                        Contact
                    </h3>
                    <ul className="space-y-3 text-black text-sm">
                        <li className="flex items-center gap-3">
                            <FaMapMarkerAlt />
                            <span>Victoria, Australia</span>
                        </li>

                        <li className="flex items-center gap-3">
                            <FaPhoneAlt />
                            <span>+61 460 351 834</span>
                        </li>

                        <li className="flex items-center gap-3">
                            <FaEnvelope />
                            <span>admin@prp4skinandhair.com.au</span>
                        </li>

                        <li className="flex items-center gap-3">
                            <FaClock />
                            <span>Mon - Sat: 9AM - 7PM</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-black/30 my-10"></div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center text-black text-xs">
                <p>© {new Date().getFullYear()} Aura PRP Clinic. All rights reserved.</p>

                <div className="flex gap-4 mt-3 md:mt-0">
                    <Link href="#" className="hover:font-semibold">Privacy Policy</Link>
                    <Link href="#" className="hover:font-semibold">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;