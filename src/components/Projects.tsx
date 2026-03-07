"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function generateProjectImage(title: string) {
  const colors = [
    "from-violet-600 to-fuchsia-600",
    "from-cyan-600 to-blue-600",
    "from-emerald-600 to-teal-600",
  ];
  const initials = title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const colorIndex = title.length % colors.length;
  return { initials, gradient: colors[colorIndex] };
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    if (window.innerWidth < 768) return; // Disable tilt on mobile

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const multiplier = 20;
    const xRotate = multiplier * (y / rect.height);
    const yRotate = -multiplier * (x / rect.width);

    card.style.transform = `perspective(1000px) rotateX(${xRotate}deg) rotateY(${yRotate}deg) translateY(-4px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card glass rounded-2xl overflow-hidden glass-hover group transition-[transform,box-shadow] duration-200 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          y: 80,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <span className="text-gradient">Projects</span>
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {portfolioData.projects.map((project, i) => {
            const { initials, gradient } = generateProjectImage(project.title);
            return (
              <TiltCard key={i}>
                <div className="h-52 relative overflow-hidden pointer-events-none">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover scale-[1.02] group-hover:scale-110 transition-transform duration-700"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-[#0a0a0f]/90" />
                      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.35),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(34,211,238,0.28),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(217,70,239,0.22),transparent_40%)]" />
                    </>
                  ) : (
                    <>
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
                      />
                      <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-bold text-white/90">
                          {initials}
                        </span>
                      </div>
                    </>
                  )}
                  <div className="absolute inset-0 ring-1 ring-white/10 group-hover:ring-white/20 transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">{project.period}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 5).map((tech, j) => (
                      <span
                        key={j}
                        className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 text-sm font-medium transition-all hover:scale-105"
                    >
                      GitHub
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 text-sm font-medium transition-all hover:scale-105"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
