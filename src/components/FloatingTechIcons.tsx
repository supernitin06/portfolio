"use client";

import { useEffect, useRef } from "react";

export function FloatingTechIcons() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Chakra Embers / Spark particles
    const sparksCount = 42;
    const sparks = Array.from({ length: sparksCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.9 + 0.3),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      color:
        Math.random() > 0.4
          ? "rgba(251, 77, 3," // Fire/Will of Fire Orange
          : Math.random() > 0.5
          ? "rgba(255, 180, 0," // Golden Kyuubi Chakra
          : "rgba(0, 242, 254,", // Lightning Blue
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sparks.length; i++) {
        const s = sparks[i];
        s.y += s.speedY;
        s.x += s.speedX;

        // Reset if drifted off screen
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color} ${s.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color.includes("251") ? "#FB4D03" : "#00f2fe";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {/* Anime Chakra Embers Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Ambient Tech Labels */}
      <div className="absolute top-[18%] left-[8%] text-xs font-mono font-black text-white/[0.04] select-none tracking-widest animate-float-slow">
        ⚡ ULTRA-FAST APIS
      </div>
      <div className="absolute top-[42%] right-[6%] text-xs font-mono font-black text-[#FB4D03]/[0.05] select-none tracking-widest animate-float-slow" style={{ animationDelay: "2s" }}>
        🔥 FULL STACK ARCHITECTURE
      </div>
      <div className="absolute bottom-[28%] left-[10%] text-xs font-mono font-black text-cyan-400/[0.04] select-none tracking-widest animate-float-slow" style={{ animationDelay: "4s" }}>
        ☁️ CLOUD & MICROSERVICES
      </div>
      <div className="absolute bottom-[12%] right-[12%] text-xs font-mono font-black text-white/[0.04] select-none tracking-widest animate-float-slow" style={{ animationDelay: "1s" }}>
        01 // CLEAN ARCHITECTURE
      </div>
    </div>
  );
}
