"use client"

import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'

import Nav from './Nav'
import MobileNav from './MobileNav'


const ResponsiveNav = () => {
    const [showNav, setShowNav] = useState(false);

    const handleNavShow = () => setShowNav(true);
    const handleCloseNav = () => setShowNav(false);

    return (
        <div>
            <Nav openNav={handleNavShow} />
            <MobileNav showNav={showNav} closeNav={handleCloseNav} />
            <ToastContainer />
        </div>
    )
}

export default ResponsiveNav