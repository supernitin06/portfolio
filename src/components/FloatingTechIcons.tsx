"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const icons = ["⚛️", "🟢", "▲", "🍃", "🟨", "☁️", "📦", "🔷"];

export function FloatingTechIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const elements = containerRef.current.querySelectorAll(".float-icon");
    elements.forEach((el, i) => {
      gsap.to(el, {
        y: -20 - Math.random() * 30,
        x: (Math.random() - 0.5) * 20,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden
    >
      {icons.map((icon, i) => (
        <div
          key={i}
          className="float-icon absolute text-2xl md:text-3xl opacity-[0.06]"
          style={{
            left: `${10 + (i * 12) % 80}%`,
            top: `${15 + (i * 17) % 70}%`,
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
