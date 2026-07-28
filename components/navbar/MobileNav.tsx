/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";

import Button from "../Button";

import { MobileNavProps, NavItemDataType } from "@/constants/types";
import { NAV_ITEMS } from "@/constants/data";
import { getTreatments } from "@/modules/treatments/treatments.service";


const MobileNav = ({ closeNav, showNav }: MobileNavProps) => {
  const router = useRouter();

  const [navItems, setNavItems] = useState<NavItemDataType[]>(NAV_ITEMS);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch Dynamic Treatments
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
        console.error("Failed to fetch treatments for mobile nav:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDropdownTreatments();
  }, []);

  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]";

  const handleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleCloseNav = () => {
    closeNav();
    setOpenDropdown(null);
  };

  const handleClickButton = () => {
    router.push("/contact");
    handleCloseNav();
  };

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={handleCloseNav}
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1006] bg-black opacity-70 w-full h-screen`}
      />

      {/* NavLinks Drawer */}
      <div
        className={`${navOpen} fixed justify-start pt-10 flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-white space-y-10 z-[1050] overflow-y-auto`}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={handleCloseNav}
          className="flex flex-col leading-tight ml-6"
        >
          <span className="font-playfair text-2xl md:text-4xl font-semibold tracking-wide bg-black bg-clip-text text-transparent">
            Aura
          </span>

          <span className="text-xs md:text-sm uppercase tracking-[3px]">
            PRP Clinic
          </span>
        </Link>

        {/* Nav Items */}
        <div className="flex flex-col gap-5 ml-6 pr-6">
          {navItems.map((link) => {
            const isDropdownCategory = link.label === "Treatments";
            const hasDropdown =
              isDropdownCategory || (link.dropdown && link.dropdown.length > 0);

            return (
              <div key={link.label}>
                {/* Normal Link */}
                {!hasDropdown && (
                  <Link href={link.href || "#"} onClick={handleCloseNav}>
                    <p className="relative text-black text-base font-medium capitalize w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-[#B4975E] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-right after:bottom-[-2px] after:left-0">
                      {link.label}
                    </p>
                  </Link>
                )}

                {/* Dropdown Category Link */}
                {hasDropdown && (
                  <div className="flex flex-col gap-2">
                    {/* Dropdown Toggle Button */}
                    <button
                      onClick={() => handleDropdown(link.label)}
                      className="flex items-center justify-between w-full text-black text-base font-medium capitalize"
                    >
                      <span>{link.label}</span>

                      <BiChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${openDropdown === link.label ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown Content */}
                    <div
                      className={`overflow-hidden transition-all duration-300 flex flex-col gap-3 pl-4 ${openDropdown === link.label
                          ? "max-h-[500px] opacity-100 pt-2"
                          : "max-h-0 opacity-0"
                        }`}
                    >
                      {/* Loading Skeleton */}
                      {isLoading && isDropdownCategory ? (
                        <div className="space-y-3 py-1">
                          {[1, 2, 3, 4].map((idx) => (
                            <div
                              key={idx}
                              className="h-4 bg-gray-200 rounded animate-pulse w-3/4"
                            />
                          ))}
                        </div>
                      ) : (
                        link.dropdown?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleCloseNav}
                            className="text-sm text-gray-600 hover:text-[#B4975E] transition-all duration-200"
                          >
                            {item.label}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-5 ml-6 pb-6">
          <Button onClick={handleClickButton}>Book Online</Button>
        </div>

        {/* Close Button */}
        <CgClose
          onClick={handleCloseNav}
          className="absolute top-10 right-6 w-7 h-7 text-black border border-black p-1 rounded-md cursor-pointer"
        />
      </div>
    </div>
  );
};

export default MobileNav;