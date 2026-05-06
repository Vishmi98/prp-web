"use client"

import { useEffect, useState } from "react";
import { BiChevronUp } from "react-icons/bi";


export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <div className="fixed bottom-4 md:bottom-8 right-5 md:right-8 z-[99]">
            {isVisible && (
                <div
                    onClick={scrollToTop}
                    aria-label="scroll to top"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-gold text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-70"
                >
                    <BiChevronUp className="w-5 h-5 text-gold" />
                </div>
            )}
        </div>
    );
}
