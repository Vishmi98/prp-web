import {
    HiOutlineEnvelope,
    HiOutlinePhone,
    HiOutlineMapPin,
    HiOutlineAcademicCap,
    HiOutlineShieldCheck
} from "react-icons/hi2";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { BiUserCheck } from "react-icons/bi";


export default function ContactPractitionerSection() {
    return (
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Contact Section */}
            <section className="relative overflow-hidden rounded-[24px] border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
                    <h2 className="font-playfair text-3xl font-bold tracking-tight text-stone-900">
                        Get in Touch
                    </h2>
                    <span className="h-2 w-2 rounded-full bg-gold" />
                </div>

                <div className="space-y-5">
                    {/* Email */}
                    <a
                        href="mailto:admin@prp4skinandhair.com.au"
                        className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-stone-50"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-800 transition-colors group-hover:bg-[#D4AF37] group-hover:text-white">
                            <HiOutlineEnvelope className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Email Us</p>
                            <p className="text-sm md:text-base font-semibold text-stone-900 group-hover:text-[#D4AF37] transition-colors">
                                admin@prp4skinandhair.com.au
                            </p>
                        </div>
                    </a>

                    {/* Phone */}
                    <a
                        href="tel:+61460351834"
                        className="group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-stone-50"
                    >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-800 transition-colors group-hover:bg-[#D4AF37] group-hover:text-white">
                            <HiOutlinePhone className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">Call Us</p>
                            <p className="text-sm md:text-base font-semibold text-stone-900 group-hover:text-[#D4AF37] transition-colors">
                                +61 460 351 834
                            </p>
                        </div>
                    </a>

                    {/* Social Links */}
                    <div className="pt-2">
                        <p className="mb-3 text-xs uppercase tracking-wider text-stone-500 font-medium px-3">
                            Follow Our Journey
                        </p>
                        <div className="flex items-center gap-3 px-3">
                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-all hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaFacebookF className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-all hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaInstagram className="h-4 w-4" />
                            </a>
                            <a
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="YouTube"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-700 transition-all hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaYoutube className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Practitioner Section */}
            <section className="relative overflow-hidden rounded-[24px] border border-stone-800 bg-gradient-to-b from-[#141414] to-[#0A0A0A] p-8 text-white shadow-xl">
                {/* Subtle Background Glow */}
                <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#F3D77B]/10 blur-3xl pointer-events-none" />

                <div className="mb-6 flex items-center justify-between border-b border-stone-800 pb-4">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-[#F3D77B]">
                            Clinical Specialist
                        </span>
                        <h2 className="font-playfair text-3xl font-bold tracking-tight text-[#F3D77B]">
                            Practitioner
                        </h2>
                    </div>
                    <HiOutlineShieldCheck className="h-8 w-8 text-[#F3D77B]/80" />
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-xl font-semibold text-white">
                            Swarnamali Jayakody Arachchige
                        </h3>
                        <p className="mt-1 text-sm font-medium text-stone-400">
                            Registered Nurse (Division 1) &bull; Credentialled Diabetes Educator
                        </p>
                    </div>

                    <p className="text-sm leading-relaxed text-stone-300">
                        Experienced practitioner specializing in advanced PRP/PRF Skin and Hair Restoration treatments.
                    </p>

                    {/* Credentials Badges */}
                    <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 pt-2">
                        <div className="flex items-center gap-2.5 rounded-lg border border-stone-800 bg-stone-900/60 px-3.5 py-2.5 text-xs text-stone-300">
                            <BiUserCheck className="h-4 w-4 text-[#F3D77B] shrink-0" />
                            <span>NMW001180235</span>
                        </div>

                        <div className="flex items-center gap-2.5 rounded-lg border border-stone-800 bg-stone-900/60 px-3.5 py-2.5 text-xs text-stone-300">
                            <HiOutlineAcademicCap className="h-4 w-4 text-[#F3D77B] shrink-0" />
                            <span>ADEA 101964</span>
                        </div>

                        <div className="flex items-center gap-2.5 rounded-lg border border-stone-800 bg-stone-900/60 px-3.5 py-2.5 text-xs text-stone-300 sm:col-span-2">
                            <HiOutlineMapPin className="h-4 w-4 text-[#F3D77B] shrink-0" />
                            <span>Victoria, Australia</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}