"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="fixed top-0 w-full px-[5%] py-[25px] flex justify-between items-center z-100 mix-blend-normal box-border transition-all duration-300">
                {/* Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-[15px] no-underline group relative z-1002"
                >
                    <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-white rounded-full flex justify-center items-center overflow-hidden border border-gold transition-transform duration-300 relative group-hover:scale-110 group-hover:border-white shadow-lg">
                        <Image
                            src="/assets/logo1.png"
                            alt="Brown Beans Logo"
                            width={112}
                            height={112}
                            className="w-[140%] h-[140%] object-contain"
                            priority
                        />
                    </div>
                    <h1 className="font-display text-[1rem] md:text-[1.3rem] tracking-[2px] m-0 text-white drop-shadow-md">
                        BROWN BEANS
                    </h1>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center mx-[5%] ml-10 gap-5">
                    {["About", "Menu", "Contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-white no-underline ml-[30px] uppercase text-[0.8rem] tracking-[1px] hover:text-gold transition-colors font-medium"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Trigger (Hamburger) */}
                <button
                    className="flex md:hidden flex-col justify-center items-center gap-[6px] cursor-pointer z-1002 w-10 h-10"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    type="button"
                >
                    <span
                        className={`block w-[30px] h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? "rotate-45 translate-y-[8px]" : ""
                            }`}
                    ></span>
                    <span
                        className={`block w-[30px] h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? "opacity-0" : ""
                            }`}
                    ></span>
                    <span
                        className={`block w-[30px] h-[2px] bg-white transition-all duration-300 ease-out ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                            }`}
                    ></span>
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed top-0 left-0 w-full h-screen bg-[#111]/95 backdrop-blur-sm z-1001 flex flex-col justify-center items-center gap-[30px] transition-transform duration-500 cubic-bezier(0.77,0,0.175,1) ${isOpen ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                {["About", "Menu", "Contact"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="font-display text-[2.5rem] text-gold no-underline hover:text-white transition-colors"
                        onClick={toggleMenu}
                    >
                        {item}
                    </Link>
                ))}

                {/* Optional: Explicit Close Button inside overlay (UX preference) */}
                <button
                    className="absolute bottom-[50px] text-[#555] uppercase text-[0.8rem] cursor-pointer tracking-[2px] hover:text-white transition-colors"
                    onClick={toggleMenu}
                >
                    Close
                </button>
            </div>
        </>
    );
}