"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { Github, Linkedin, ArrowUpRight, ArrowDown, FileDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Reveal the container
      gsap.from(containerRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
      });

      // Advanced stagger for text elements
      tl.from(".hero-anim", {
        y: 60,
        rotationX: -20,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        transformOrigin: "bottom center",
      });

      // Slide in project card from side
      tl.from(".hero-card", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.8");

      // Continuous floating effect for avatar
      if (avatarImageRef.current) {
        gsap.to(avatarImageRef.current, {
          y: -15,
          rotationZ: 1,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const project = portfolioData.projects[0]; // Featured project

  return (
    <section id="hero" className="relative min-h-screen mt-20 flex items-center justify-center p-4 md:p-8 bg-[#0a0a0f] overflow-hidden pt-24 perspective-1000">
      <div
        ref={containerRef}
        className="w-full max-w-[1400px] min-h-[80vh] bg-[#111111] rounded-[2.5rem] overflow-hidden relative shadow-2xl flex flex-col lg:flex-row transform-gpu"
      >
        {/* The Orange Split Background */}
        <div className="absolute top-0 bottom-0 left-[25%] right-[35%] bg-[#FB4D03] z-0 hidden lg:block" />

        {/* Left Section */}
        <div className="w-full lg:w-[35%] p-8 md:p-14 z-10 flex flex-col justify-between">
          <div className="mt-8 hero-anim">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-2 tracking-tight leading-tight">
              {portfolioData.personal.name.split(' ').map((part, i) => (
                <span key={i} className="block">{part}</span>
              ))}
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-400 font-light mt-4">
              {portfolioData.personal.title}
            </h2>
          </div>

          <div className="mt-16 lg:mt-24 hero-anim max-w-sm">
            <div className="w-12 h-12 rounded-full border border-[#FB4D03] flex items-center justify-center mb-6 overflow-hidden relative bg-[#1a1a1e]">
              <Image src={portfolioData.personal.avatar} alt="Icon" fill className="object-cover" />
            </div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-4">
              About Me
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Hi, I am {portfolioData.personal.name.split(" ")[0]}: a {portfolioData.personal.title.toLowerCase()} based in India. {portfolioData.summary.substring(0, 130)}...
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              I am open to new and exciting collaborations.
            </p>
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FB4D03] text-white text-sm font-bold tracking-wide hover:bg-[#d64303] transition-colors shadow-[0_0_20px_rgba(251,77,3,0.3)] hover:shadow-[0_0_30px_rgba(251,77,3,0.5)] w-fit"
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Center Section: Avatar Overlapping */}
        <div className="w-full lg:w-[30%] min-h-[400px] relative z-10 flex items-end justify-center bg-[#FB4D03] lg:bg-transparent overflow-hidden lg:overflow-visible">
          <div className="relative w-full h-full flex flex-col justify-end items-center hero-anim">
            {/* The character/avatar image */}
            <div ref={avatarImageRef} className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[120%] lg:h-[80%] -bottom-10 lg:-bottom-20 z-20">
              <div className="absolute inset-0 rounded-t-full rounded-b-3xl border-8 border-[#111111] overflow-hidden lg:border-[12px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] bg-[#0a0a0f] transform-gpu transition-all duration-700 hover:shadow-[0_0_80px_rgba(251,77,3,0.3)]">
                <Image
                  src={portfolioData.personal.avatar}
                  alt="Portrait"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Project Feature */}
        <div className="w-full lg:w-[35%] p-8 md:p-14 z-10 flex flex-col justify-center bg-[#111111] relative">

          <div className="hero-anim max-w-sm lg:pr-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <div className="flex gap-2">
                <a href={project.liveUrl || project.github} target="_blank" rel="noreferrer" className="text-[#FB4D03] hover:text-[#d64303] transition-colors">
                  <ArrowUpRight className="w-5 h-5" />
                </a>
                <a href="#projects" className="text-[#FB4D03] hover:text-[#d64303] transition-colors">
                  <ArrowDown className="w-5 h-5" />
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              {portfolioData.personal.name.split(" ")[0]} worked as a developer on {project.title}, {project.description.substring(0, 100)}...
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#FB4D03]/30 text-[#FB4D03] text-sm hover:bg-[#FB4D03]/10 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
