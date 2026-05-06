"use client"

import Link from 'next/link'
import { CgClose } from 'react-icons/cg'

import Button from '../Button'

import { MobileNavProps } from '@/constants/types'
import { NAV_ITEMS } from '@/constants/data'


const MobileNav = ({ closeNav, showNav }: MobileNavProps) => {
  const navOpen = showNav ? "translate-x-0" : "translate-x-[-100%]"

  return (
    <div>
      {/* Overlay */}
      <div onClick={closeNav} className={`fixed ${navOpen} inset-0 transform transition-all duration-500 z-[1006] bg-black opacity-70 w-full h-screen`}>
      </div>

      {/* NavLinks */}
      <div className={`${navOpen} fixed justify-start pt-10 flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-white space-y-10 z-[1050]`}>
        <Link href="/" className="flex flex-col leading-tight ml-6">
          <span className="font-playfair text-2xl md:text-4xl font-semibold tracking-wide bg-black bg-clip-text text-transparent">
            Aura
          </span>
          <span className="text-xs md:text-sm uppercase tracking-[3px]">
            PRP Clinic
          </span>
        </Link>

        <div className="flex flex-col gap-5 ml-6">
          {NAV_ITEMS.map((link) => {
            return (
              <Link key={link.label} href={link.href} onClick={closeNav}>
                <p className="relative text-black text-base font-medium lg:text-xl capitalize w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-[#B4975E] after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-right after:bottom-[-2] after:left-0">
                  {link.label}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-5 ml-6">

          {/* CTA Button */}
          <Link href="/consultation">
            <Button>
              Book Consultation
            </Button>
          </Link>

          {/* Mobile Menu Icon */}
        </div>
        {/* Close Icon */}
        <CgClose onClick={closeNav} className='absolute top-10 right-10 w-6 h-6 text-black border border-black p-1 rounded-md' />
      </div>
    </div>
  )
}

export default MobileNav