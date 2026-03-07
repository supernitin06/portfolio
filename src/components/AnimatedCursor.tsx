"use client";

import { useEffect, useState } from "react";

export function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    setShowCursor(!window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!showCursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const hoverTargets = document.querySelectorAll("a, button, [data-cursor-hover]");
    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, [isVisible, showCursor]);

  if (!showCursor) return null;

  return (
    <>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
            isHovering ? "w-10 h-10 bg-cyan-400/30" : "w-4 h-4 bg-white"
          }`}
        />
      </div>
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-opacity duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-200 ${
            isHovering
              ? "w-12 h-12 border-cyan-400/50 scale-150"
              : "w-6 h-6 border-violet-400/70"
          }`}
        />
      </div>
    </>
  );
}
