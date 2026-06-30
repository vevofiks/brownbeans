"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const fadeRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background
            gsap.to(bgRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                yPercent: 30,
                ease: "none",
            });

            // Title Animation
            gsap.from(titleRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                delay: 2.5, // Waiting for preloader
                ease: "power4.out",
            });

            // Subtitle & Button Animation
            gsap.from(fadeRefs.current, {
                y: 20,
                opacity: 0,
                duration: 1,
                delay: 3,
                stagger: 0.2,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const addToFadeRefs = (el: HTMLElement | null) => {
        if (el && !fadeRefs.current.includes(el)) {
            fadeRefs.current.push(el);
        }
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center pt-[60px] pb-0 box-border"
        >
            <div
                ref={bgRef}
                className="absolute top-0 left-0 w-full h-[120%] bg-cover bg-center bg-no-repeat -z-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1171&auto=format&fit=crop")`,
                }}
            ></div>

            <div className="z-10 text-white">
                <p
                    ref={addToFadeRefs}
                    className="text-[1.5rem] tracking-[5px] text-gold mb-[40px]"
                >
                    EST. 2023
                </p>
                <h1
                    ref={titleRef}
                    className="font-display text-[8vw] leading-[0.9] mb-[20px]"
                >
                    <div className="block">Count Memories</div>
                    <div className="block">Not Calories</div>
                </h1>
                <br />
                <Link
                    ref={addToFadeRefs}
                    href="#menu"
                    className="btn-magnet inline-block px-[40px] py-[20px] border border-grey text-white no-underline rounded-[50px] relative overflow-hidden transition-all duration-300 hover:text-black hover:border-gold hover:after:h-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0 after:bg-gold after:-z-10 after:transition-all after:duration-300 after:ease-in-out"
                >
                    View Menu
                </Link>
            </div>
        </section>
    );
}
