"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax effect
      gsap.to(".about-bg", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
        ease: "none",
      });

      // Advanced stagger animation for content
      gsap.from(".about-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        rotationX: -15,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        transformOrigin: "bottom center",
      });

      // Staggered tech pills appearing with scale effect
      gsap.from(".tech-pill", {
        scrollTrigger: {
          trigger: ".tech-pill-container",
          start: "top 85%",
        },
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.5)",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techs = [
    "React", "Next.js", "TypeScript", "Node.js", "Tailwind",
    "AWS EC2", "Nginx", "Reverse Proxy", "CI/CD", "Load Balancing"
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative bg-black overflow-hidden perspective-1000">
      {/* Decorative floating blur behind content */}
      <div className="about-bg absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#FB4D03]/10 via-[#FB4D03]/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center md:text-left relative z-10">
        <h2 className="text-xl md:text-2xl font-bold text-[#FB4D03] mb-6 tracking-widest uppercase about-anim">
          About
        </h2>

        <h3 className="text-3xl md:text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight about-anim">
          Full-stack developer building <br className="hidden md:block" /> premium web experiences
        </h3>

        <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-3xl about-anim font-light leading-relaxed mx-auto md:mx-0">
          Clean design + strong engineering. Websites and apps that look sharp, load fast, and scale smoothly.
        </p>

        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl about-anim font-light leading-relaxed mx-auto md:mx-0">
          I have a deep understanding of <span className="text-white font-medium">AWS</span> architecture and DevOps practices.
          Expertise includes deploying scalable architectures on <span className="text-white font-medium">EC2</span>, configuring <span className="text-white font-medium">Nginx</span> reverse proxies, implementing
          Cloudflare load balancing, domain configuration, and establishing robust <span className="text-white font-medium">CI/CD pipelines</span> via GitHub Actions.
        </p>

        <div className="tech-pill-container flex flex-wrap items-center justify-center md:justify-start gap-4 mb-16">
          {techs.map((tech, i) => (
            <span key={i} className="tech-pill px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-[#FB4D03]/20 hover:border-[#FB4D03]/50 hover:text-[#FB4D03] transition-all hover:scale-110 cursor-pointer shadow-lg hover:shadow-[#FB4D03]/20 text-sm tracking-wide">
              {tech}
            </span>
          ))}
        </div>

        <div className="about-anim">
          <a href="#experience" className="inline-flex items-center gap-2 text-white font-bold pb-1 border-b-2 border-[#FB4D03] hover:text-[#FB4D03] transition-colors group text-lg">
            View My Experience
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
