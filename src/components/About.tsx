"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".about-bg-orb", {
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
        y: 100, ease: "none",
      });

      gsap.from(".about-anim", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        y: 60, opacity: 0, rotationX: -10, duration: 1, stagger: 0.12,
        ease: "power4.out", transformOrigin: "bottom center",
      });

      gsap.from(".tech-pill", {
        scrollTrigger: { trigger: ".tech-pill-container", start: "top 85%" },
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.04, ease: "back.out(2)",
      });

      gsap.from(".about-kpi", {
        scrollTrigger: { trigger: ".about-kpis", start: "top 85%" },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techs = [
    "React", "Next.js", "TypeScript", "Node.js",
    "SharePoint SPFx", "Power Automate", "Microsoft 365",
    "AWS EC2", "Azure", "PostgreSQL", "MongoDB",
  ];

  const highlights = [
    "Enterprise SharePoint & Microsoft 365 solutions",
    "Multi-tenant SaaS platforms with RBAC & JWT",
    "30%+ API performance improvements delivered",
    "Scalable AWS (EC2, RDS) cloud deployments",
  ];

  return (
    <section id="about" ref={sectionRef} className="py-32 px-6 relative bg-black overflow-hidden perspective-1000">
      {/* Background */}
      <div className="about-bg-orb absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-bl from-[#FB4D03]/8 via-[#FB4D03]/4 to-transparent blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/6 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="about-anim inline-flex items-center gap-2 mb-4">
              <span className="cyber-badge">
                <span>⚡</span> FULL STACK ENGINEER • BACKGROUND & IMPACT
              </span>
            </div>

            <h2 className="about-anim text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8">
              Building{" "}
              <span className="text-gradient">Enterprise</span>
              {" "}& Scalable{" "}
              <span className="relative inline-block">
                Systems
                <span className="absolute bottom-1 left-0 right-0 h-1 bg-[#FB4D03]/50 rounded-full" />
              </span>
            </h2>

            <p className="about-anim text-gray-400 text-lg leading-relaxed mb-6 font-light">
              Full Stack Developer with <span className="text-white font-semibold">1.5+ years</span> of experience crafting
              secure, scalable SaaS and enterprise platforms. Expert in{" "}
              <span className="text-white font-semibold">SharePoint SPFx</span>,{" "}
              <span className="text-white font-semibold">Microsoft 365</span>, React, Node.js, and AWS.
            </p>

            <p className="about-anim text-gray-400 text-base leading-relaxed mb-10 font-light">
              I turn complex business requirements into clean, high-performance digital solutions — from
              AI-enabled SharePoint web parts to multi-tenant SaaS platforms deployed on AWS.
            </p>

            {/* Highlights list */}
            <ul className="about-anim space-y-3 mb-10">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#FB4D03] mt-0.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="about-anim">
              <a href="#experience" onClick={(e) => { e.preventDefault(); document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-[#FB4D03] pb-1 hover:text-[#FB4D03] transition-colors group text-base">
                View My Experience
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8">
            {/* KPIs */}
            <div className="about-kpis grid grid-cols-2 gap-4">
              {[
                { num: "1.5+", label: "Years Experience", sub: "Enterprise & SaaS" },
                { num: "30%", label: "Performance Gains", sub: "Via optimization" },
                { num: "10+", label: "Projects Shipped", sub: "Across 3 companies" },
                { num: "99.9%", label: "Uptime Target", sub: "AWS deployments" },
              ].map((k, i) => (
                <div key={i} className="about-kpi sword-card glass rounded-2xl p-5 border border-white/8 hover:border-[#FB4D03]/40 transition-all hover:bg-[#FB4D03]/5 group">
                  <div className="text-2xl font-black text-gradient mb-1 group-hover:scale-105 transition-transform origin-left">{k.num}</div>
                  <div className="text-sm font-semibold text-white mb-0.5">{k.label}</div>
                  <div className="text-xs text-gray-400 font-mono">{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[3px] text-gray-600 mb-4">Tech I work with</p>
              <div className="tech-pill-container flex flex-wrap gap-2">
                {techs.map((tech, i) => (
                  <span
                    key={i}
                    className="tech-pill px-4 py-2 rounded-full border border-white/8 bg-white/4 text-sm font-medium text-gray-300 hover:bg-[#FB4D03]/15 hover:border-[#FB4D03]/40 hover:text-[#FB4D03] transition-all hover:scale-105 cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Katana Sword Slash Divider ── */}
        <div className="katana-divider mt-24" />
      </div>
    </section>
  );
}
