"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const img = imgRef.current?.querySelector("img");
            if (img) {
                gsap.to(img, {
                    scrollTrigger: {
                        trigger: imgRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                    y: -50,
                    ease: "none",
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="py-[150px] w-full max-w-[1400px] mx-auto px-[5vw] box-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[100px] items-center">
                <div className="px-[20px] md:px-0">
                    <p className="uppercase text-gold font-display text-[1.2rem] mb-4">The Vibe</p>
                    <h2 className="font-display text-[2.8rem] md:text-[4rem] mb-[30px] leading-tight text-white">
                        More than just a Cafe.
                    </h2>
                    <p className="text-[1.1rem] text-grey leading-[1.8] mb-[40px]">
                        Located at IGBT Bypass, Thurakkal, Brown Beans is a sanctuary for
                        taste. With a 4.3-star rating and over 1,000 reviews, we pride
                        ourselves on creamy alfredos, perfectly brewed cappuccinos, and an
                        ambiance that turns a quick bite into a lasting memory.
                    </p>
                    <div className="flex gap-8">
                        <div>
                            <span className="block text-[2rem] text-white">1k+</span>
                            <span className="text-grey">Reviews</span>
                        </div>
                        <div>
                            <span className="block text-[2rem] text-white">4.3</span>
                            <span className="text-grey">Rating</span>
                        </div>
                    </div>
                </div>
                <div ref={imgRef} className="relative h-[400px] md:h-[600px] overflow-hidden rounded-lg">
                    <Image
                        src="https://images.unsplash.com/photo-1709548145082-04d0cde481d4?q=80&w=1166&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Cafe Interior"
                        fill
                        className="object-cover object-center h-[120%]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </div>
            </div>
        </section>
    );
}
