"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    role: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: "The Alfredo pasta is a masterpiece—perfectly rich, creamy, and seasoned. Combined with the rustic wooden accents, it makes for an unforgettable dinner.",
        author: "Aadhya Nair",
        role: "Local Guide",
        rating: 5,
    },
    {
        id: 2,
        quote: "As a coffee enthusiast, their espresso extraction blew me away. You can taste the single-origin notes clearly. The baristas here are true craftsmen.",
        author: "Kabir Sen",
        role: "Coffee Connoisseur",
        rating: 5,
    },
    {
        id: 3,
        quote: "Brown Beans is my go-to sanctuary. The soft warm lighting, bookshelves, and quiet corner tables make it the absolute perfect place to read or work.",
        author: "Rohan Mathew",
        role: "Regular Guest",
        rating: 5,
    },
];

export default function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header
            if (headerRef.current) {
                gsap.from(headerRef.current.children, {
                    scrollTrigger: {
                        trigger: headerRef.current,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out",
                });
            }

            // Animate Testimonial Cards
            cardsRef.current.forEach((card, idx) => {
                if (card) {
                    gsap.from(card, {
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        },
                        y: 50,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: idx * 0.15,
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null, idx: number) => {
        if (el) cardsRef.current[idx] = el;
    };

    return (
        <section
            ref={containerRef}
            className="py-[100px] md:py-[150px] w-full max-w-[1400px] mx-auto px-[5vw] box-border relative overflow-hidden bg-black border-t border-[#1a1a1a]"
        >
            {/* Elegant Header Section */}
            <div
                ref={headerRef}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[60px] md:mb-[90px] gap-6"
            >
                <div className="max-w-[600px]">
                    <p className="uppercase text-gold font-body text-[0.85rem] tracking-[0.25em] mb-3 font-medium">
                        // Guest Stories
                    </p>
                    <h2 className="font-display text-[2.8rem] md:text-[4.5rem] leading-[1.1] text-white">
                        Loved by Our Guests
                    </h2>
                </div>
                <p className="text-[1rem] md:text-[1.1rem] text-grey max-w-[450px] leading-[1.8] font-body">
                    Do not just take our word for it. Hear from the community of coffee lovers, foodies, and creators who make Brown Beans their second home.
                </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((item, idx) => (
                    <div
                        key={item.id}
                        ref={(el) => addToRefs(el, idx)}
                        className="group relative bg-bg border border-white/5 hover:border-gold/30 rounded-2xl p-8 md:p-10 transition-all duration-500 flex flex-col justify-between shadow-lg hover:-translate-y-1"
                    >
                        {/* Quote icon overlay */}
                        <span className="absolute top-6 right-8 text-[4rem] text-gold/5 font-display select-none pointer-events-none group-hover:text-gold/10 transition-colors duration-500">
                            “
                        </span>

                        <div className="flex-1 flex flex-col gap-6">
                            {/* Stars */}
                            <div className="flex gap-1">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-4 h-4 text-gold fill-current"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote Text */}
                            <p className="text-grey text-[1.05rem] leading-[1.7] italic font-body">
                                "{item.quote}"
                            </p>
                        </div>

                        {/* Author Info */}
                        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-1">
                            <cite className="not-italic font-display text-[1.4rem] text-white">
                                {item.author}
                            </cite>
                            <span className="text-[0.8rem] text-gold tracking-widest uppercase font-medium font-body">
                                {item.role}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
