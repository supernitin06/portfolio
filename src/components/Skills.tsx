"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, string> = {
  react: "⚛️",
  nodejs: "🟢",
  express: "⚡",
  mongodb: "🍃",
  javascript: "🟨",
  tailwind: "🎨",
  aws: "☁️",
  git: "📦",
  nextjs: "▲",
  postgresql: "🐘",
  typescript: "🔷",
  redux: "🔄",
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const skillCards = skillsRef.current?.querySelectorAll(".skill-card");
      skillCards?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.08,
          ease: "back.out(1.2)",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Skills & Technologies</span>
        </h2>

        <div
          ref={skillsRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          {portfolioData.skills.map((skill, i) => (
            <div
              key={i}
              className="skill-card glass rounded-xl p-6 flex flex-col items-center justify-center gap-3 glass-hover group cursor-default"
            >
              <span className="text-4xl transition-transform duration-300 group-hover:scale-125">
                {iconMap[skill.icon] || "💻"}
              </span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
