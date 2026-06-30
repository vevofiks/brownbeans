"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Roast = "light" | "medium" | "dark";
type Milk = "none" | "steamed" | "oat" | "almond";
type Addition = "none" | "caramel" | "cream" | "cocoa";

interface RoastConfig {
    id: Roast;
    name: string;
    description: string;
    color: string;
}

interface MilkConfig {
    id: Milk;
    name: string;
    description: string;
    blendColor: string;
}

interface AdditionConfig {
    id: Addition;
    name: string;
    description: string;
}

const roasts: RoastConfig[] = [
    {
        id: "light",
        name: "Light Roast",
        description: "Floral notes, bright acidity, tea-like body.",
        color: "bg-[#8c6d58]",
    },
    {
        id: "medium",
        name: "Medium Roast",
        description: "Balanced sweetness, nuts, milk chocolate flavor.",
        color: "bg-[#5c3e2e]",
    },
    {
        id: "dark",
        name: "Dark Roast",
        description: "Bold, full-bodied, dark cocoa, smoky finish.",
        color: "bg-[#2d1c13]",
    },
];

const milks: MilkConfig[] = [
    {
        id: "none",
        name: "Black / None",
        description: "Pure espresso and hot water.",
        blendColor: "",
    },
    {
        id: "steamed",
        name: "Steamed Milk",
        description: "Creamy whole dairy milk with microfoam.",
        blendColor: "#d5c3b5",
    },
    {
        id: "oat",
        name: "Oat Milk",
        description: "Naturally sweet, smooth, plant-based.",
        blendColor: "#dfd2c4",
    },
    {
        id: "almond",
        name: "Almond Milk",
        description: "Light, nutty flavor with subtle froth.",
        blendColor: "#e5dad0",
    },
];

const additions: AdditionConfig[] = [
    {
        id: "none",
        name: "No Additions",
        description: "Unsweetened and direct.",
    },
    {
        id: "caramel",
        name: "Caramel Drizzle",
        description: "Warm, buttery caramel lattice on top.",
    },
    {
        id: "cream",
        name: "Whipped Cream",
        description: "Fluffy peak of sweetened fresh cream.",
    },
    {
        id: "cocoa",
        name: "Cocoa Powder Dust",
        description: "Premium Belgian cocoa powder dusting.",
    },
];

export default function BrewCustomizer() {
    const [roast, setRoast] = useState<Roast>("medium");
    const [milk, setMilk] = useState<Milk>("none");
    const [addition, setAddition] = useState<Addition>("none");
    const [ordered, setOrdered] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cupRef = useRef<HTMLDivElement>(null);

    // Get liquid color based on roast and milk blend
    const getLiquidColor = () => {
        if (milk === "none") {
            if (roast === "light") return "#8c6d58";
            if (roast === "medium") return "#5c3e2e";
            return "#2d1c13";
        } else {
            const milkObj = milks.find((m) => m.id === milk);
            return milkObj?.blendColor || "#5c3e2e";
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (contentRef.current) {
                gsap.from(contentRef.current.children, {
                    scrollTrigger: {
                        trigger: contentRef.current,
                        start: "top 85%",
                    },
                    y: 40,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power3.out",
                });
            }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Flash cup animation on setting change
    useEffect(() => {
        if (cupRef.current) {
            gsap.fromTo(
                cupRef.current,
                { scale: 0.96 },
                { scale: 1, duration: 0.4, ease: "back.out(2)" }
            );
        }
    }, [roast, milk, addition]);

    const handleOrder = () => {
        setOrdered(true);
        setTimeout(() => setOrdered(false), 3000);
    };

    return (
        <section
            ref={sectionRef}
            id="brew"
            className="py-[100px] md:py-[150px] w-full max-w-[1400px] mx-auto px-[5vw] box-border relative overflow-hidden bg-black border-t border-[#1a1a1a]"
        >
            <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-[60px] lg:gap-12 items-center">
                {/* Visual Cup Area (Left 5 Columns) */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center bg-bg border border-white/5 rounded-3xl p-10 min-h-[450px] shadow-2xl relative">
                    {/* Steam Effects */}
                    <div className="absolute top-10 flex gap-3 h-20 items-end justify-center pointer-events-none select-none">
                        <span className="w-1 bg-white/10 rounded-full animate-pulse h-16 delay-75 transform -translate-y-2"></span>
                        <span className="w-1 bg-white/20 rounded-full animate-pulse h-20 transform -translate-y-4"></span>
                        <span className="w-1 bg-white/15 rounded-full animate-pulse h-14 delay-150 transform -translate-y-1"></span>
                    </div>

                    {/* CSS Coffee Cup */}
                    <div ref={cupRef} className="relative mt-12 w-[180px] h-[130px] flex justify-center items-center">
                        {/* Cup handle */}
                        <div className="absolute -right-6 w-12 h-16 rounded-[40px] border-12 border-white/85 top-1/2 -translate-y-1/2 z-0"></div>

                        {/* Cup Body */}
                        <div className="absolute inset-0 bg-white/95 rounded-b-[40px] border border-white/15 shadow-2xl z-10 overflow-hidden flex flex-col justify-end p-2">
                            {/* Coffee Liquid Layer */}
                            <div
                                className="w-full rounded-b-[30px] transition-all duration-700 ease-in-out relative flex flex-col justify-end overflow-hidden"
                                style={{
                                    height: milk === "none" ? "65%" : "85%",
                                    backgroundColor: getLiquidColor(),
                                }}
                            >
                                {/* Froth/Crema layer */}
                                <div
                                    className="h-3 w-full opacity-90 transition-colors duration-500"
                                    style={{
                                        backgroundColor:
                                            milk !== "none" ? "#ffffff" : "#c49a6c",
                                    }}
                                />

                                {/* Addition overlay details inside cup */}
                                {addition === "caramel" && (
                                    <div className="absolute inset-x-0 top-3 h-2 bg-[#d79c5c]/40 animate-pulse" />
                                )}
                                {addition === "cream" && (
                                    <div className="absolute inset-x-2 top-0 h-4 bg-white rounded-t-full shadow-inner" />
                                )}
                                {addition === "cocoa" && (
                                    <div className="absolute inset-x-0 top-3 h-1 bg-[#4a2e1b]/70 border-b border-[#311c10]" />
                                )}
                            </div>
                        </div>

                        {/* Cup Saucer */}
                        <div className="absolute bottom-[-16px] w-[230px] h-[12px] bg-white/90 border border-white/15 rounded-[12px] shadow-lg z-0"></div>
                    </div>

                    {/* Description Display */}
                    <div className="mt-14 text-center">
                        <span className="text-gold text-[0.75rem] font-medium tracking-[0.25em] uppercase mb-1 block">
                            Your Custom Recipe
                        </span>
                        <h4 className="font-display text-[1.8rem] text-white leading-tight mb-2 uppercase">
                            {`${roast} ${milk !== "none" ? `+ ${milk}` : ""} ${addition !== "none" ? `w/ ${addition}` : ""}`}
                        </h4>
                        <p className="text-grey text-[0.9rem] leading-relaxed max-w-[320px] mx-auto font-body">
                            {roasts.find((r) => r.id === roast)?.description}{" "}
                            {milks.find((m) => m.id === milk)?.description}
                        </p>
                    </div>
                </div>

                {/* Selection Controls Panel (Right 7 Columns) */}
                <div className="lg:col-span-7 flex flex-col justify-center">
                    <p className="uppercase text-gold font-body text-[0.85rem] tracking-[0.25em] mb-3 font-medium">
                        // Interactive Craft
                    </p>
                    <h2 className="font-display text-[2.8rem] md:text-[4rem] leading-[1.1] text-white mb-8">
                        Brew Your Own Way
                    </h2>

                    <div className="flex flex-col gap-8">
                        {/* Step 1: Roast */}
                        <div>
                            <span className="text-white text-[0.9rem] uppercase tracking-widest font-semibold block mb-3 font-body">
                                01. Select Coffee roast
                            </span>
                            <div className="grid grid-cols-3 gap-3">
                                {roasts.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setRoast(item.id)}
                                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                                            roast === item.id
                                                ? "bg-white/5 border-gold text-white"
                                                : "bg-[#0c0c0c] border-white/5 text-grey hover:border-white/15"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-3 h-3 rounded-full ${item.color}`} />
                                            <span className="font-display text-[1rem] md:text-[1.1rem]">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-[0.75rem] leading-normal text-grey/80 block font-body">
                                            {item.description}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Milk Base */}
                        <div>
                            <span className="text-white text-[0.9rem] uppercase tracking-widest font-semibold block mb-3 font-body">
                                02. Choose milk base
                            </span>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {milks.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setMilk(item.id)}
                                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                                            milk === item.id
                                                ? "bg-white/5 border-gold text-white"
                                                : "bg-[#0c0c0c] border-white/5 text-grey hover:border-white/15"
                                        }`}
                                    >
                                        <span className="font-display text-[1rem] block mb-1">
                                            {item.name}
                                        </span>
                                        <span className="text-[0.75rem] leading-normal text-grey/80 block font-body">
                                            {item.description}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Additions */}
                        <div>
                            <span className="text-white text-[0.9rem] uppercase tracking-widest font-semibold block mb-3 font-body">
                                03. Sweet toppings
                            </span>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {additions.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setAddition(item.id)}
                                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                                            addition === item.id
                                                ? "bg-white/5 border-gold text-white"
                                                : "bg-[#0c0c0c] border-white/5 text-grey hover:border-white/15"
                                        }`}
                                    >
                                        <span className="font-display text-[1rem] block mb-1">
                                            {item.name}
                                        </span>
                                        <span className="text-[0.75rem] leading-normal text-grey/80 block font-body">
                                            {item.description}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Submission and Action */}
                        <div className="mt-4 flex items-center gap-6">
                            <button
                                onClick={handleOrder}
                                className="px-8 py-4 rounded-full bg-gold hover:bg-white text-black font-semibold text-[0.9rem] uppercase tracking-widest transition-all duration-300 relative overflow-hidden flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                            >
                                <span>{ordered ? "Order Placed!" : "Order Custom Cup"}</span>
                                {!ordered && (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                )}
                            </button>

                            {/* Toast Message */}
                            <div
                                className={`transition-all duration-500 ${
                                    ordered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                                }`}
                            >
                                <span className="text-gold font-medium text-[0.9rem] font-body">
                                    ✓ Sent custom recipe to the espresso bar!
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
