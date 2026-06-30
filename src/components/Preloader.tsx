"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            const spans = textRef.current?.querySelectorAll("span");

            if (spans) {
                tl.to(spans, {
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power4.out",
                })
                    .to(spans, {
                        y: -100,
                        duration: 0.8,
                        delay: 0.5,
                        ease: "power4.in",
                    })
                    .to(
                        preloaderRef.current,
                        {
                            y: "-100%",
                            duration: 1,
                            ease: "power4.inOut",
                        },
                        "-=0.3"
                    );
            }
        }, preloaderRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={preloaderRef}
            className="fixed top-0 left-0 w-full h-screen bg-black z-10000 flex justify-center items-center flex-col"
        >
            <div
                ref={textRef}
                className="font-display text-[2rem] text-gold overflow-hidden flex gap-2"
            >
                <span className="inline-block translate-y-full">BROWN</span>
                <span className="inline-block translate-y-full">BEANS</span>
            </div>
            <p className="text-[#444] mt-[10px] text-[0.8rem] tracking-[2px]">
                MANJERI
            </p>
        </div>
    );
}
