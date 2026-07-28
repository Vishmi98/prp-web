/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { usePathname, useRouter } from "next/navigation";
import { BiChevronDown } from "react-icons/bi";

import Button from "../Button";

import { NavItemDataType, NavProps } from "@/constants/types";
import { NAV_ITEMS } from "@/constants/data";
import { getTreatments } from "@/modules/treatments/treatments.service";


const Nav = ({ openNav }: NavProps) => {
    const [navItems, setNavItems] = useState<NavItemDataType[]>(NAV_ITEMS);
    const [activeHash, setActiveHash] = useState("#");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const pathname = usePathname();
    const router = useRouter();

    // 1. Fetch Dynamic Treatments
    useEffect(() => {
        const fetchDropdownTreatments = async () => {
            try {
                setIsLoading(true);
                const response = await getTreatments();

                if (response.success && response.treatments) {
                    const dynamicDropdown = response.treatments.map((treatment: any) => ({
                        label: treatment.title || treatment.name,
                        href: `/treatments/${treatment.slug || treatment._id}`,
                    }));

                    setNavItems((prevItems) =>
                        prevItems.map((item) =>
                            item.label === "Treatments"
                                ? { ...item, dropdown: dynamicDropdown }
                                : item
                        )
                    );
                }
            } catch (error) {
                console.error("Failed to fetch treatments for navigation:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDropdownTreatments();
    }, []);

    // 2. Handle Scroll & Hash Detection
    useEffect(() => {
        const handleScroll = () => {
            const anchorSections = navItems
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
    }, [navItems]);

    return (
        <header className="fixed top-0 left-0 w-full z-[1005] h-[8vh] md:h-[13vh] transition-all duration-500 bg-white text-black">
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
                    {navItems.map((link) => {
                        const isActive = link.href.startsWith("#")
                            ? pathname === "/" && activeHash === link.href
                            : pathname === link.href;

                        const isDropdownCategory = link.label === "Treatments";
                        const hasDropdown =
                            isDropdownCategory || (link.dropdown && link.dropdown.length > 0);

                        return (
                            <div
                                key={link.label}
                                className="relative"
                                onMouseEnter={() => {
                                    if (hasDropdown) setOpenDropdown(link.label);
                                }}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                {/* Main Nav Link */}
                                <Link
                                    href={link.href || "#"}
                                    className="flex items-center gap-1 py-2"
                                >
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
                                            }`}
                                    >
                                        {link.label}
                                    </span>

                                    {hasDropdown && (
                                        <BiChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""
                                                } ${isActive
                                                    ? "text-[#FFD700]"
                                                    : "text-black hover:text-[#D4AF37]"
                                                }`}
                                        />
                                    )}
                                </Link>

                                {/* Dropdown Menu */}
                                {hasDropdown && openDropdown === link.label && (
                                    <div className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-md border border-gray-200 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                        {/* Render Skeleton Loader if fetching */}
                                        {isLoading && isDropdownCategory ? (
                                            <div className="px-5 py-2 space-y-3">
                                                {[1, 2, 3, 4, 5].map((idx) => (
                                                    <div
                                                        key={idx}
                                                        className="h-4 bg-gray-200 rounded animate-pulse w-full"
                                                    />
                                                ))}
                                            </div>
                                        ) : (
                                            link.dropdown?.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    onClick={() => setOpenDropdown(null)}
                                                    className="block px-5 py-3 text-sm tracking-wide text-gray-700 hover:bg-[#FFF8E1] hover:text-[#D4AF37] transition-all duration-200"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {/* Right Side */}
                    <div className="flex items-center gap-5 ml-6">
                        <Button onClick={() => router.push("/contact")}>
                            Book Online
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <HiBars3BottomLeft
                    onClick={openNav}
                    className="w-8 h-8 cursor-pointer lg:hidden text-black"
                />
            </div>
        </header>
    );
};

export default Nav;