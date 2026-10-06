"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { FileDown, Github, Linkedin, MapPin, ArrowDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-badge", { y: -20, opacity: 0, duration: 0.6 })
        .from(".hero-title", { y: 80, opacity: 0, duration: 1, stagger: 0.12 }, "-=0.3")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .from(".hero-stat", { y: 30, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .from(".hero-avatar-wrap", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.4)" }, "-=1");

      // Floating avatar
      if (avatarImageRef.current) {
        gsap.to(avatarImageRef.current, {
          y: -18, rotationZ: 1.5, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut",
        });
      }

      // Orb parallax
      window.addEventListener("mousemove", (e) => {
        const xPct = (e.clientX / window.innerWidth - 0.5) * 30;
        const yPct = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to(".hero-orb-1", { x: xPct, y: yPct, duration: 1.2, ease: "power1.out" });
        gsap.to(".hero-orb-2", { x: -xPct * 0.6, y: -yPct * 0.6, duration: 1.5, ease: "power1.out" });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: "1.5+", label: "Years Exp." },
    { value: "10+", label: "Projects" },
    { value: "30%", label: "Perf. Gains" },
    { value: "3", label: "Companies" },
  ];

  const iconMap: Record<string, string> = {
    react: "⚛️", nodejs: "🟢", express: "⚡", mongodb: "🍃",
    javascript: "🟨", tailwind: "🎨", aws: "☁️", git: "📦",
    nextjs: "▲", postgresql: "🐘", typescript: "🔷", redux: "🔄",
    sharepoint: "🟦", spfx: "🔵", powerautomate: "🌊", azure: "🔷",
    redis: "🔴", docker: "🐳",
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 pt-24 pb-12"
    >
      {/* ── Ambient Orbs ── */}
      <div className="hero-orb-1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#FB4D03]/10 blur-[120px] pointer-events-none" />
      <div className="hero-orb-2 absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.03] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none" />

      {/* ── Grid Lines ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* ── Left: Text ── */}
          <div className="flex-1 text-center lg:text-left">
            {/* Tech Badge */}
            <div className="hero-badge inline-flex items-center gap-2 mb-6">
              <span className="cyber-badge animate-chakra">
                <span className="w-2 h-2 rounded-full bg-[#FB4D03] animate-ping" />
                🚀 FULL STACK & ENTERPRISE SHAREPOINT DEVELOPER
              </span>
            </div>

            {/* Name */}
            <div className="overflow-hidden mb-2">
              <h1 className="hero-title text-6xl md:text-7xl xl:text-8xl font-black text-white leading-[0.9] tracking-tight">
                {portfolioData.personal.name.split(" ")[0]}
              </h1>
            </div>
            <div className="overflow-hidden mb-5">
              <h1 className="hero-title text-6xl md:text-7xl xl:text-8xl font-black leading-[0.9] tracking-tight text-gradient">
                {portfolioData.personal.name.split(" ")[1]}
              </h1>
            </div>

            {/* Role */}
            <p className="hero-sub text-lg md:text-xl text-gray-300 font-semibold mb-2 flex items-center gap-2 justify-center lg:justify-start">
              <span className="text-[#FB4D03] animate-pulse">⚡</span>
              Software Developer · SharePoint SPFx · React · Node.js · AWS
            </p>
            <p className="hero-sub text-xs md:text-sm text-gray-400 mb-8 flex items-center gap-2 justify-center lg:justify-start">
              <MapPin className="w-3.5 h-3.5 text-[#FB4D03]" />
              Noida, India · +91 8285510025
            </p>

            {/* CTAs with Sword Slash Glint */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <a
                href={portfolioData.personal.resumeUrl}
                download="Nitin_Chauhan_Resume.pdf"
                className="hero-cta sword-card inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FB4D03] text-white font-extrabold tracking-wide hover:bg-[#d64303] transition-all glow-orange hover:scale-105 shadow-[0_0_30px_rgba(251,77,3,0.4)] text-sm group"
              >
                <FileDown className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume (PDF)</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="hero-cta sword-card inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white font-bold tracking-wide hover:bg-white/5 transition-all text-sm backdrop-blur-sm"
              >
                <span>Get in Touch</span>
              </a>
            </div>

            {/* Social */}
            <div className="hero-cta flex items-center gap-4 justify-center lg:justify-start mb-10">
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto lg:mx-0">
              {stats.map((s, i) => (
                <div key={i} className="hero-stat text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-black text-white text-glow">{s.value}</div>
                  <div className="text-xs text-gray-500 font-medium mt-0.5 whitespace-nowrap">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Avatar + Cards ── */}
          <div className="hero-avatar-wrap flex-shrink-0 relative flex flex-col items-center gap-6">
            {/* Spinning ring */}
            <div className="absolute inset-0 m-auto w-72 h-72 md:w-80 md:h-80 rounded-full border border-[#FB4D03]/20 animate-spin-slow pointer-events-none" />
            <div className="absolute inset-0 m-auto w-56 h-56 md:w-64 md:h-64 rounded-full border border-dashed border-white/[0.06] animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

            {/* Avatar */}
            <div ref={avatarImageRef} className="relative w-60 h-60 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FB4D03] via-[#ff6a00] to-yellow-500 blur-2xl scale-125 opacity-40 animate-chakra" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#FB4D03] shadow-[0_0_60px_rgba(251,77,3,0.45)]">
                <Image
                  src={portfolioData.personal.avatar}
                  alt="Nitin Chauhan"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 rounded-full ring-2 ring-inset ring-amber-400/30" />
              </div>
              {/* Status badge */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-green-500/50 text-xs font-semibold text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Work • Available
              </div>
            </div>

            {/* Floating skill pills with sword card glint */}
            <div className="flex flex-wrap gap-2 justify-center max-w-xs">
              {portfolioData.skills.slice(0, 9).map((skill, index) => (
                <div
                  key={index}
                  className="sword-card flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111118] border border-white/10 text-xs font-semibold text-gray-300 hover:border-[#FB4D03]/60 hover:text-white hover:bg-[#FB4D03]/10 transition-all cursor-default"
                >
                  <span>{iconMap[skill.icon] || "💻"}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div className="flex justify-center mt-16 mb-8">
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-[#FB4D03] transition-colors group"
          >
            <span className="text-[10px] font-mono tracking-[3px] uppercase">SCROLL TO ENTER</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform animate-bounce text-[#FB4D03]" />
          </button>
        </div>

        {/* ── Katana Sword Slash Divider ── */}
        <div className="katana-divider mt-4" />
      </div>
    </section>
  );
}
