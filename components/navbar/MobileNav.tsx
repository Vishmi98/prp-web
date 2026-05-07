"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { BiChevronDown } from 'react-icons/bi'

import Button from '../Button'

import { MobileNavProps } from '@/constants/types'
import { NAV_ITEMS } from '@/constants/data'


const MobileNav = ({ closeNav, showNav }: MobileNavProps) => {
  const router = useRouter();

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navOpen = showNav
    ? "translate-x-0"
    : "translate-x-[-100%]"

  const handleDropdown = (label: string) => {
    setOpenDropdown((prev) =>
      prev === label ? null : label
    );
  };

  const handleCloseNav = () => {
    closeNav();
    setOpenDropdown(null);
  }

  const handleClickButton = () => {
    router.push("/contact");
    closeNav();
    setOpenDropdown(null);
  }

  return (
    <div>
      {/* Overlay */}
      <div
        onClick={handleCloseNav}
        className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1006] bg-black opacity-70 w-full h-screen`}
      />

      {/* NavLinks */}
      <div
        className={`${navOpen} fixed justify-start pt-10 flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-white space-y-10 z-[1050] overflow-y-auto`}
      >
        {/* Logo */}
        <Link
          href="/"
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
        <div className="flex flex-col gap-5 ml-6">

          {NAV_ITEMS.map((link) => {

            const hasDropdown = !!link.dropdown;

            return (
              <div key={link.label}>

                {/* Normal Link */}
                {!hasDropdown && (
                  <Link
                    href={link.href}
                    onClick={handleCloseNav}
                  >
                    <p className="relative text-black text-base font-medium capitalize w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-[#B4975E] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-right after:bottom-[-2] after:left-0">
                      {link.label}
                    </p>
                  </Link>
                )}

                {/* Dropdown Link */}
                {hasDropdown && (
                  <div className="flex flex-col gap-1">

                    {/* Dropdown Button */}
                    <button
                      onClick={() =>
                        handleDropdown(link.label)
                      }
                      className="flex items-center gap-2 text-black text-base font-medium capitalize"
                    >
                      {link.label}

                      <BiChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${openDropdown === link.label
                          ? "rotate-180"
                          : ""
                          }`}
                      />
                    </button>

                    {/* Dropdown Items */}
                    <div
                      className={`overflow-hidden transition-all duration-300 flex flex-col gap-3 pl-4 ${openDropdown === link.label
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                        }`}
                    >
                      {link.dropdown?.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeNav}
                          className="text-sm text-gray-600 hover:text-[#B4975E] transition-all duration-200"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Button */}
        <div className="flex items-center gap-5 ml-6">
          <Button onClick={handleClickButton}>
            Book Online
          </Button>
        </div>

        {/* Close Icon */}
        <CgClose
          onClick={handleCloseNav}
          className='absolute top-10 right-10 w-6 h-6 text-black border border-black p-1 rounded-md cursor-pointer'
        />
      </div>
    </div>
  )
}

export default MobileNav