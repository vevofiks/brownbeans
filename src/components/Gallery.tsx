"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
    id: number;
    src: string;
    tag: string;
    title: string;
    description: string;
    height: string;
}

const galleryItems: GalleryItem[] = [
    {
        id: 0,
        src: "https://images.unsplash.com/photo-1601759226606-1352c1290364?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Coffee Craft",
        title: "Artisanal Latte",
        description: "A velvety, hand-pulled double shot of single-origin espresso, perfectly balanced with silky steamed milk and delicate foam art.",
        height: "h-[360px] md:h-[460px]",
    },
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1542372147193-a7aca54189cd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Cozy Ambiance",
        title: "Signature Morning",
        description: "A fresh, flaky butter croissant served warm alongside our slow-drip signature house blend in our quiet, wooden-accented corners.",
        height: "h-[450px] md:h-[560px]",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1671522636384-abaa828ec275?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Sweet Indulgence",
        title: "Berry Bliss Pancakes",
        description: "Golden-brown, fluffy buttermilk pancake stack loaded with fresh forest berries, edible flowers, mint, and a rich organic maple syrup drizzle.",
        height: "h-[380px] md:h-[480px]",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Roastery",
        title: "Espresso Origin",
        description: "Pure, concentrated essence of dark roasted Arabica beans, extracted under high pressure to create a rich, golden-thick crema.",
        height: "h-[450px] md:h-[540px]",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Dessert Craft",
        title: "Velvet Fudge Cake",
        description: "A luxurious triple-layered chocolate fudge cake, glazed with premium dark cocoa ganache and served with fresh mint leaves.",
        height: "h-[320px] md:h-[400px]",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Refreshers",
        title: "Botanical Mojito",
        description: "A cooling summer blend of muddled garden mint, hand-squeezed key lime juice, and crisp sparkling mineral water.",
        height: "h-[420px] md:h-[580px]",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Coffee Craft",
        title: "Pour Over Ritual",
        description: "A precise hot water pour over fresh light-roasted coffee grounds, extracting floral notes and vibrant acidity.",
        height: "h-[450px] md:h-[560px]",
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Barista Life",
        title: "Steaming & Frothing",
        description: "Our baristas crafting velvety microfoam, textured to the perfect temperature for milk drinks.",
        height: "h-[380px] md:h-[480px]",
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Sweet Indulgence",
        title: "Belgian Waffles",
        description: "Crispy, warm Belgian waffles served with sliced strawberries, whipped butter, and organic flower honey.",
        height: "h-[350px] md:h-[440px]",
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1178&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Cozy Ambiance",
        title: "Corner Retreat",
        description: "Soft overhead lights, comfortable seating, and shelves of books to accompany your peaceful afternoon coffee.",
        height: "h-[400px] md:h-[500px]",
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Savory Bites",
        title: "Artisanal Panini",
        description: "Freshly pressed sourdough bread toasted with mozzarella cheese, heirloom tomatoes, and organic basil pesto.",
        height: "h-[360px] md:h-[460px]",
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        tag: "Refreshers",
        title: "Swirled Cold Brew",
        description: "Slow-steeped, full-bodied cold brew coffee served over ice with a rich swirl of fresh cream.",
        height: "h-[450px] md:h-[580px]",
    },
];

export default function Gallery() {
    const containerRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

    // Group items into 3 columns for a seamless masonry grid layout
    const columns: (GalleryItem & { originalIdx: number })[][] = [[], [], []];
    galleryItems.forEach((item, index) => {
        columns[index % 3].push({ ...item, originalIdx: index });
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate Header elements
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

            // Animate Grid Items
            itemsRef.current.forEach((el) => {
                if (el) {
                    gsap.from(el, {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                        },
                        y: 80,
                        opacity: 0,
                        duration: 1.2,
                        ease: "power3.out",
                    });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Lock scrolling when Lightbox is open
    useEffect(() => {
        if (selectedIdx !== null) {
            document.documentElement.classList.add("lenis-stopped");
            document.body.style.overflow = "hidden";
        } else {
            document.documentElement.classList.remove("lenis-stopped");
            document.body.style.overflow = "";
        }
        return () => {
            document.documentElement.classList.remove("lenis-stopped");
            document.body.style.overflow = "";
        };
    }, [selectedIdx]);

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (selectedIdx === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedIdx(null);
            if (e.key === "ArrowLeft") {
                setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
            }
            if (e.key === "ArrowRight") {
                setSelectedIdx((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIdx]);

    const addToRef = (el: HTMLDivElement | null, index: number) => {
        if (el) itemsRef.current[index] = el;
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryItems.length - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedIdx((prev) => (prev !== null && prev < galleryItems.length - 1 ? prev + 1 : 0));
    };

    return (
        <section
            ref={containerRef}
            id="gallery"
            className="py-[100px] md:py-[150px] w-full max-w-[1400px] mx-auto px-[5vw] box-border relative overflow-hidden"
        >
            {/* Elegant Header Section */}
            <div
                ref={headerRef}
                className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[50px] md:mb-[80px] gap-6"
            >
                <div className="max-w-[600px]">
                    <p className="uppercase text-gold font-body text-[0.85rem] tracking-[0.25em] mb-3 font-medium">
                        // Visual Diary
                    </p>
                    <h2 className="font-display text-[2.8rem] md:text-[4.5rem] leading-[1.1] text-white">
                        Savor the Moments
                    </h2>
                </div>
                <p className="text-[1rem] md:text-[1.1rem] text-grey max-w-[450px] leading-[1.8] font-body">
                    Every details at Brown Beans tells a story. Take a glance at our visual journal, showcasing the authentic textures, warm flavors, and cozy spaces that define who we are.
                </p>
            </div>

            {/* True Masonry Image Grid (Varying Heights, aligned column lists) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column, colIdx) => (
                    <div
                        key={colIdx}
                        className="flex flex-col gap-6"
                    >
                        {column.map((item) => (
                            <div
                                key={item.id}
                                ref={(el) => addToRef(el, item.originalIdx)}
                                onClick={() => setSelectedIdx(item.originalIdx)}
                                className={`group relative ${item.height} w-full overflow-hidden rounded-lg cursor-pointer transition-all duration-500 shadow-lg`}
                            >
                                {/* Image background wrapper */}
                                <div className="w-full h-full relative">
                                    <Image
                                        src={item.src}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-[1.2s] cubic-bezier(0.16, 1, 0.3, 1) group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </div>

                                {/* Beautiful vignette gradient overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent transition-opacity duration-500 opacity-80 group-hover:opacity-95" />

                                {/* Card details */}
                                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 transition-transform duration-500 ease-out translate-y-3 group-hover:translate-y-0">
                                    {/* Tag */}
                                    <span className="text-gold text-[0.75rem] font-medium tracking-[0.2em] uppercase mb-2 block opacity-80 transition-opacity duration-300">
                                        {item.tag}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-display text-[1.8rem] md:text-[2.2rem] text-white leading-tight mb-2 transition-transform duration-500">
                                        {item.title}
                                    </h3>

                                    {/* Description - reveals and expands on hover */}
                                    <p className="text-grey text-[0.9rem] leading-[1.6] opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[120px] overflow-hidden transition-all duration-500 ease-in-out font-body">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Premium Full-Screen Lightbox Modal */}
            {selectedIdx !== null && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-8 animate-fade-in"
                    onClick={() => setSelectedIdx(null)}
                >
                    {/* Close Button overlay */}
                    <button
                        className="absolute top-6 right-6 z-110 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-gold hover:border-gold hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedIdx(null)}
                        aria-label="Close Lightbox"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Modal Content Window */}
                    <div
                        className="relative flex flex-col lg:flex-row w-full max-w-[1100px] bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-scale-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Preview Panel */}
                        <div className="relative w-full h-[320px] sm:h-[450px] lg:h-[600px] lg:w-[65%] bg-black flex items-center justify-center group/modal">
                            <Image
                                src={galleryItems[selectedIdx].src}
                                alt={galleryItems[selectedIdx].title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 65vw"
                                priority
                            />

                            {/* Arrow navigation triggers */}
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-105 h-12 w-12 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-gold hover:border-gold hover:bg-black/80 hover:scale-105 transition-all duration-300 opacity-0 group-hover/modal:opacity-100 focus:opacity-100 cursor-pointer"
                                aria-label="Previous image"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-105 h-12 w-12 flex items-center justify-center rounded-full bg-black/60 border border-white/10 text-white/80 hover:text-gold hover:border-gold hover:bg-black/80 hover:scale-105 transition-all duration-300 opacity-0 group-hover/modal:opacity-100 focus:opacity-100 cursor-pointer"
                                aria-label="Next image"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>

                        {/* Details Sidebar Panel */}
                        <div className="flex flex-col justify-between p-8 lg:w-[35%] bg-[#121212] min-h-[220px] lg:min-h-0 box-border">
                            <div className="flex-1 flex flex-col justify-center">
                                <span className="text-gold text-[0.8rem] font-medium tracking-[0.25em] uppercase mb-3 block font-body">
                                    {`0${selectedIdx + 1} // ${galleryItems[selectedIdx].tag}`}
                                </span>
                                <h3 className="font-display text-[2rem] md:text-[2.6rem] text-white leading-tight mb-4">
                                    {galleryItems[selectedIdx].title}
                                </h3>
                                <p className="text-grey text-[0.95rem] leading-[1.7] font-body">
                                    {galleryItems[selectedIdx].description}
                                </p>
                            </div>

                            {/* Sidebar Footer (Controls & Counter) */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                                <span className="text-grey text-[0.85rem] tracking-wider font-medium font-body">
                                    {`${selectedIdx + 1} / ${galleryItems.length}`}
                                </span>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handlePrev}
                                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-gold hover:border-gold hover:scale-105 transition-all duration-300 cursor-pointer"
                                        aria-label="Previous slide"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-gold hover:border-gold hover:scale-105 transition-all duration-300 cursor-pointer"
                                        aria-label="Next slide"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
