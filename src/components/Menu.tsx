"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

type MenuItem = {
    title: string;
    sub: string;
    img: string;
};

const menuItems: MenuItem[] = [
    {
        title: "Creamy Alfredo",
        sub: "Must Try",
        img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "Regular Cappuccino",
        sub: "Popular",
        img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "Special Shawarma",
        sub: "Bestseller",
        img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=2676&auto=format&fit=crop",
    },
    {
        title: "Steak & Grill",
        sub: "Dinner",
        img: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2670&auto=format&fit=crop",
    },
    {
        title: "Mojitos & Shakes",
        sub: "Refresh",
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=2574&auto=format&fit=crop",
    },
];

export default function Menu() {
    const revealRef = useRef<HTMLDivElement>(null);
    const [activeImg, setActiveImg] = useState("");

    useEffect(() => {
        // Desktop only logic handled by CSS media query or JS check
        // Here we use JS for the mouse movement logic but display none in CSS for mobile
        if (window.innerWidth <= 768) return;

        const items = document.querySelectorAll(".menu-item");
        const reveal = revealRef.current;

        if (!reveal) return;

        const moveImage = (e: MouseEvent) => {
            gsap.to(reveal, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", moveImage);

        return () => {
            window.removeEventListener("mousemove", moveImage);
        }
    }, []);

    const handleMouseEnter = (img: string) => {
        setActiveImg(img);
        gsap.to(revealRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(revealRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    return (
        <section id="menu" className="py-[60px] md:py-[100px] relative w-full max-w-[1400px] mx-auto px-[5vw] box-border">
            <p className="uppercase text-gold mb-[35px] md:mb-[50px] text-[20px] md:text-[1rem] pl-[10px] md:pl-0 border-b md:border-none border-text md:border-transparent w-full md:w-auto pb-2 md:pb-0">Our Menu</p>

            <div className="relative z-2">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className="menu-item flex flex-col md:flex-row justify-between items-start md:items-center py-[25px] md:py-[40px] px-[20px] md:px-0 border-b border-[#333] transition-all duration-300 cursor-pointer hover:border-gold hover:pl-[20px] group gap-[10px] md:gap-[15px]"
                        onMouseEnter={() => handleMouseEnter(item.img)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <h3 className="font-display text-[1.5rem] md:text-[3rem] transition-colors duration-300 flex-1 min-w-[200px] group-hover:text-gold text-white">
                            {item.title}
                        </h3>
                        <span className="text-[0.9rem] md:text-[1.2rem] font-body text-grey whitespace-nowrap group-hover:text-gold">
                            {item.sub}
                        </span>
                    </div>
                ))}
            </div>

            {/* Hover Reveal Image (Desktop) */}
            <div
                ref={revealRef}
                className="fixed w-[300px] h-[400px] top-0 left-0 pointer-events-none opacity-0 z-50 -translate-x-1/2 -translate-y-1/2 scale-80 rounded-[8px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:block"
            >
                {activeImg && (
                    <Image
                        src={activeImg}
                        alt="Menu Preview"
                        fill
                        className="object-cover scale-120 transition-transform duration-500"
                    />
                )}
            </div>
        </section>
    );
}
