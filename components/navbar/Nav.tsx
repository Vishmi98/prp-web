"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { usePathname } from "next/navigation";

import Button from "../Button";

import { NavProps } from "@/constants/types";
import { NAV_ITEMS } from "@/constants/data";


const Nav = ({ openNav }: NavProps) => {
    const [navBg, setNavBg] = useState(false);
    const [activeHash, setActiveHash] = useState("#");
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setNavBg(window.scrollY >= 90);

            // Filter to ONLY include strings starting with #
            // This ignores "/menu" which is a separate page
            const anchorSections = NAV_ITEMS
                .map((item) => item.href)
                .filter((href) => href.startsWith("#") && href !== "#");

            let currentSection = "#";

            anchorSections.forEach((id) => {
                try {
                    const section = document.querySelector(id) as HTMLElement;

                    if (section) {
                        const top = section.offsetTop - 120;
                        const height = section.offsetHeight;

                        if (
                            window.scrollY >= top &&
                            window.scrollY < top + height
                        ) {
                            currentSection = id;
                        }
                    }
                } catch (e) {
                    // Silently catch errors if an invalid selector slips through
                    console.error("Invalid selector:", id);
                }
            });

            if (window.scrollY < 200) {
                currentSection = "#";
            }

            setActiveHash(currentSection);
        };

        const handleHashChange = () => {
            setActiveHash(window.location.hash || "#");
        };

        handleScroll();
        handleHashChange();

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <header
            className="fixed top-0 left-0 w-full z-[1005] h-[8vh] md:h-[13vh] transition-all duration-500 bg-white text-black"
        >
            <div className="flex items-center justify-between h-full w-[90%] xl:w-[85%] mx-auto">

                {/* Logo */}
                <Link href="/" className="flex flex-col leading-tight">
                    <span className="font-playfair text-2xl md:text-4xl font-semibold tracking-wide bg-black bg-clip-text text-transparent">
                        Aura
                    </span>
                    <span className="text-xs md:text-sm uppercase tracking-[3px]">
                        PRP Clinic
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center justify-end gap-8">

                    {NAV_ITEMS.map((link) => {
                        const isActive = link.href.startsWith("#")
                            ? pathname === "/" && activeHash === link.href
                            : pathname === link.href;

                        return (
                            <Link href={link.href} key={link.label}>
                                <span
                                    className={`relative uppercase text-sm tracking-[2px] cursor-pointer transition-all duration-300
              ${isActive
                                            ? "text-[#FFD700]"
                                            : "text-black hover:text-[#D4AF37]"
                                        }

              after:absolute after:left-0 after:-bottom-1 after:h-[2px]
              after:w-full after:bg-gradient-to-r after:from-[#D4AF37] after:to-[#FFD700]
              after:transition-transform after:duration-300
              ${isActive
                                            ? "after:scale-x-100"
                                            : "after:scale-x-0 hover:after:scale-x-100"
                                        }
            `}
                                >
                                    {link.label}
                                </span>
                            </Link>
                        );
                    })}

                    {/* Right Side */}
                    <div className="flex items-center gap-5 ml-6">

                        {/* CTA Button */}
                        <Link href="/consultation">
                            <Button>
                                Book Consultation
                            </Button>
                        </Link>

                        {/* Mobile Menu Icon */}
                    </div>
                </nav>

                <HiBars3BottomLeft
                    onClick={openNav}
                    className="w-8 h-8 cursor-pointer lg:hidden text-black"
                />
            </div>
        </header>
    );
};

export default Nav;

// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { HiBars3BottomLeft } from "react-icons/hi2";
// import { usePathname } from "next/navigation";

// import { NavProps } from "@/constants/types";
// import { NAV_ITEMS } from "@/constants/data";

// const Nav = ({ openNav }: NavProps) => {
//     const [navBg, setNavBg] = useState(false);
//     const [activeHash, setActiveHash] = useState("#");
//     const pathname = usePathname();

//     useEffect(() => {
//         const handleScroll = () => {
//             setNavBg(window.scrollY >= 90);

//             const anchorSections = NAV_ITEMS
//                 .map((item) => item.href)
//                 .filter((href) => href.startsWith("#") && href !== "#");

//             let currentSection = "#";

//             anchorSections.forEach((id) => {
//                 try {
//                     const section = document.querySelector(id) as HTMLElement;

//                     if (section) {
//                         const top = section.offsetTop - 120;
//                         const height = section.offsetHeight;

//                         if (
//                             window.scrollY >= top &&
//                             window.scrollY < top + height
//                         ) {
//                             currentSection = id;
//                         }
//                     }
//                 } catch (e) {
//                     console.error("Invalid selector:", id);
//                 }
//             });

//             if (window.scrollY < 200) {
//                 currentSection = "#";
//             }

//             setActiveHash(currentSection);
//         };

//         const handleHashChange = () => {
//             setActiveHash(window.location.hash || "#");
//         };

//         handleScroll();
//         handleHashChange();

//         window.addEventListener("scroll", handleScroll);
//         window.addEventListener("hashchange", handleHashChange);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//             window.removeEventListener("hashchange", handleHashChange);
//         };
//     }, []);

//     return (
//         <header
//             className={`fixed top-0 left-0 w-full z-[1005] h-[9vh] md:h-[13vh] transition-all duration-300 ${
//                 navBg
//                     ? "bg-black shadow-lg"
//                     : "bg-white"
//             }`}
//         >
//             <div className="flex items-center justify-between h-full w-[90%] xl:w-[85%] mx-auto">
                
//                 {/* Logo */}
//                 <Link href="/" className="flex flex-col leading-tight">
//                     <span
//                         className={`font-playfair text-2xl md:text-4xl font-semibold ${
//                             navBg ? "text-white" : "text-black"
//                         }`}
//                     >
//                         Aura
//                     </span>
//                     <span className="text-xs md:text-sm text-primary font-semibold uppercase tracking-wider">
//                         PRP Clinic
//                     </span>
//                 </Link>

//                 {/* Desktop Nav */}
//                 <nav className="hidden lg:flex items-center gap-8">
//                     {NAV_ITEMS.map((link) => {
//                         const isActive = link.href.startsWith("#")
//                             ? pathname === "/" && activeHash === link.href
//                             : pathname === link.href;

//                         return (
//                             <Link href={link.href} key={link.label}>
//                                 <span
//                                     className={`relative uppercase text-sm tracking-wide cursor-pointer transition-all duration-300 ${
//                                         navBg ? "text-white" : "text-black"
//                                     } ${
//                                         isActive ? "font-semibold" : ""
//                                     }
                                    
//                                     after:absolute after:left-0 after:-bottom-1
//                                     after:h-[2px] after:w-full after:bg-primary
//                                     after:origin-left
//                                     after:transition-transform after:duration-300
                                    
//                                     ${
//                                         isActive
//                                             ? "after:scale-x-100"
//                                             : "after:scale-x-0 hover:after:scale-x-100"
//                                     }
//                                 `}
//                                 >
//                                     {link.label}
//                                 </span>
//                             </Link>
//                         );
//                     })}

//                     {/* Right Side */}
//                     <div className="flex items-center gap-4 ml-6">
//                         <Link href="/consultation">
//                             <button
//                                 type="button"
//                                 className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-md 
//                                 hover:bg-black hover:text-white transition-all duration-300"
//                             >
//                                 Book Consultation
//                             </button>
//                         </Link>
//                     </div>
//                 </nav>

//                 {/* Mobile Menu Icon */}
//                 <HiBars3BottomLeft
//                     onClick={openNav}
//                     className={`w-8 h-8 cursor-pointer lg:hidden ${
//                         navBg ? "text-white" : "text-black"
//                     }`}
//                 />
//             </div>
//         </header>
//     );
// };

// export default Nav;