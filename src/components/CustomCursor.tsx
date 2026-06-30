"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const cursorOutlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Only run on devices with fine pointer
        if (window.matchMedia("(pointer: fine)").matches) {
            const cursorDot = cursorDotRef.current;
            const cursorOutline = cursorOutlineRef.current;

            const moveCursor = (e: MouseEvent) => {
                const posX = e.clientX;
                const posY = e.clientY;

                if (cursorDot) {
                    cursorDot.style.left = `${posX}px`;
                    cursorDot.style.top = `${posY}px`;
                }

                if (cursorOutline) {
                    gsap.to(cursorOutline, {
                        x: posX,
                        y: posY,
                        duration: 0.15,
                        ease: "power2.out",
                    });
                }
            };

            window.addEventListener("mousemove", moveCursor);

            const handleMouseEnter = () => document.body.classList.add("hovering");
            const handleMouseLeave = () => document.body.classList.remove("hovering");

            const addListeners = () => {
                const hoverables = document.querySelectorAll(
                    "a, .menu-item, button, .menu-toggle"
                );
                hoverables.forEach((el) => {
                    el.addEventListener("mouseenter", handleMouseEnter);
                    el.addEventListener("mouseleave", handleMouseLeave);
                });
            };

            // Add listeners initially and on mutations if needed, or simple interval check for simplicity in React
            // For now, simpler approach: global class in globals.css handles .hovering styles on cursor-outline
            // We need to re-attach listeners when DOM changes or use event delegation
            // Event delegation is better for dynamic content

            const delegateHover = (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                if (target.closest("a, .menu-item, button, .menu-toggle")) {
                    document.body.classList.add("hovering");
                } else {
                    document.body.classList.remove("hovering");
                }
            }

            // Using mouseover for delegation
            window.addEventListener("mouseover", delegateHover);

            return () => {
                window.removeEventListener("mousemove", moveCursor);
                window.removeEventListener("mouseover", delegateHover);
            };
        }
    }, []);

    return (
        <>
            <div
                ref={cursorDotRef}
                className="fixed top-0 left-0 w-[8px] h-[8px] bg-gold rounded-full z-9999 pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
            ></div>
            <div
                ref={cursorOutlineRef}
                className="fixed top-0 left-0 w-[40px] h-[40px] border border-[rgba(212,175,55,0.5)] rounded-full z-9999 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-200 hidden md:block [&.hovering]:w-[70px] [&.hovering]:h-[70px] [&.hovering]:bg-[rgba(212,175,55,0.1)] [&.hovering]:border-gold"
            ></div>
            <style jsx global>{`
        body.hovering .cursor-outline-target {
             width: 70px;
             height: 70px;
             background-color: rgba(212, 175, 55, 0.1);
             border-color: #d4af37;
        }
      `}</style>
        </>
    );
}
// Note: I added a global style block or I can rely on the globals.css styles I added earlier.
// Reverting to use the globals.css .hovering logic.
