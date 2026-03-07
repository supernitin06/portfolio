"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const items = timelineRef.current?.querySelectorAll(".timeline-item");
      items?.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
          x: i % 2 === 0 ? -50 : 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });

      gsap.from(".timeline-line", {
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1.5,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-6 bg-[#0a0a0f] relative">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center exp-title">
          <span className="text-white">Work </span>
          <span className="text-[#FB4D03]">Experience</span>
        </h2>

        <div ref={timelineRef} className="relative">
          {/* Timeline Center Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 overflow-hidden">
            <div className="timeline-line w-full h-full bg-gradient-to-b from-[#FB4D03] via-violet-500 to-transparent" />
          </div>

          <div className="space-y-12 md:space-y-24">
            {portfolioData.experience.map((exp, i) => (
              <div
                key={i}
                className={`timeline-item relative flex flex-col md:flex-row items-start gap-8 md:gap-16 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* Center Node */}
                <div className="absolute left-6 md:left-1/2 w-12 h-12 bg-[#111111] border-4 border-[#0a0a0f] rounded-full -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(240,138,140,0.3)]">
                  <Briefcase className="w-5 h-5 text-[#FB4D03]" />
                </div>

                {/* Empty Space for layout */}
                <div className="hidden md:block flex-1" />

                {/* Content Card */}
                <div className="flex-1 w-full pl-20 md:pl-0">
                  <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/5 bg-[#111111]/80 backdrop-blur-md hover:border-[#FB4D03]/30 transition-colors group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FB4D03]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#FB4D03] mb-6 uppercase tracking-wider">
                      {exp.period}
                    </span>

                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                      {exp.title}
                    </h3>

                    <h4 className="text-lg font-medium text-gray-400 mb-6 pb-6 border-b border-white/10">
                      {exp.company}
                    </h4>

                    <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
