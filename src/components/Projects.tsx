"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectGradients = [
  "from-violet-600 via-purple-600 to-fuchsia-600",
  "from-cyan-500 via-blue-600 to-indigo-600",
  "from-emerald-500 via-teal-600 to-cyan-600",
  "from-orange-500 via-red-500 to-rose-600",
  "from-pink-500 via-fuchsia-600 to-violet-600",
];

const techColors: Record<string, string> = {
  "React.js": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "Node.js": "bg-green-500/10 text-green-300 border-green-500/20",
  "Next.js": "bg-white/8 text-gray-200 border-white/15",
  "PostgreSQL": "bg-blue-500/10 text-blue-300 border-blue-500/20",
  "MongoDB": "bg-green-600/10 text-green-400 border-green-600/20",
  "AWS": "bg-orange-500/10 text-orange-300 border-orange-500/20",
  "Socket.io": "bg-gray-500/10 text-gray-300 border-gray-500/20",
  "Razorpay": "bg-blue-400/10 text-blue-200 border-blue-400/20",
  "Redis": "bg-red-500/10 text-red-300 border-red-500/20",
  "Docker": "bg-sky-500/10 text-sky-300 border-sky-500/20",
  "WebSockets": "bg-purple-500/10 text-purple-300 border-purple-500/20",
  "RBAC": "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "REST APIs": "bg-teal-500/10 text-teal-300 border-teal-500/20",
  "Swagger": "bg-lime-500/10 text-lime-300 border-lime-500/20",
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${8 * (y / rect.height)}deg) rotateY(${-8 * (x / rect.width)}deg) translateY(-6px) scale(1.01)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)`;
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card transition-[transform,box-shadow] duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proj-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
      });

      const cards = document.querySelectorAll(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 90%" },
          y: 80, opacity: 0, duration: 0.8, delay: (i % 2) * 0.15, ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Featured project = first one, rest in grid
  const [featured, ...rest] = portfolioData.projects;

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-black">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="proj-heading text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="cyber-badge">
              <span>🚀</span> FEATURED WORK • PRODUCTION DEPLOYMENTS
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Featured <span className="text-gradient">Projects</span> & Applications
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-normal text-sm md:text-base">
            Enterprise and production-ready full stack applications built for scale, speed, and real-world business impact.
          </p>
        </div>

        {/* Featured Project */}
        {featured && (() => {
          const { initials, gradient } = (() => {
            const g = projectGradients[0];
            const ini = featured.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            return { initials: ini, gradient: g };
          })();
          return (
            <TiltCard className="sword-card mb-10 rounded-3xl overflow-hidden border border-white/10 bg-[#111116] group hover:border-[#FB4D03]/40 hover:shadow-[0_30px_90px_rgba(251,77,3,0.15)]">
              <div className="flex flex-col lg:flex-row min-h-[340px]">
                {/* Image / Gradient */}
                <div className="lg:w-[45%] relative min-h-[220px] overflow-hidden">
                  {featured.image ? (
                    <>
                      <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111]/80 lg:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111111]/80 lg:hidden" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-8xl font-black text-white/20">{initials}</span>
                      </div>
                    </div>
                  )}
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4">
                    <span className="badge-orange shimmer">⭐ Featured</span>
                  </div>
                </div>

                {/* Info */}
                <div className="lg:w-[55%] p-8 md:p-12 flex flex-col justify-center">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">{featured.period}</p>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-gradient transition-all">{featured.title}</h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">{featured.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {featured.technologies.map((tech, j) => (
                      <span key={j} className={`px-3 py-1 rounded-full text-xs font-semibold border ${techColors[tech] || "bg-white/5 text-gray-300 border-white/10"}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href={featured.github} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all">
                      <Github className="w-4 h-4" /> GitHub
                    </a>
                    {featured.liveUrl && featured.liveUrl !== "#" && (
                      <a href={featured.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FB4D03] text-sm font-semibold text-white hover:bg-[#d64303] transition-all glow-orange-sm">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          );
        })()}

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => {
            const gradient = projectGradients[(i + 1) % projectGradients.length];
            const initials = project.title.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
            const rank = i % 2 === 0 ? "S-RANK" : "A-RANK";
            return (
              <TiltCard key={i} className="sword-card rounded-2xl overflow-hidden border border-white/10 bg-[#111116] group hover:border-[#FB4D03]/40 hover:shadow-[0_20px_60px_rgba(251,77,3,0.15)] flex flex-col">
                {/* Image */}
                <div className="h-44 relative overflow-hidden">
                  {project.image ? (
                    <>
                      <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-[#111116]/80" />
                    </>
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-black text-white/30">{initials}</span>
                      </div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[#ff7733]">
                      ⭐ PRODUCTION APP
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs text-gray-500 font-mono uppercase tracking-widest mb-2">{project.period}</p>
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-[#FB4D03] transition-colors line-clamp-1">{project.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech, j) => (
                      <span key={j} className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${techColors[tech] || "bg-white/5 text-gray-400 border-white/10"}`}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/5 text-gray-500 border border-white/10">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-auto">
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 border border-white/8 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </a>
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#FB4D03]/10 border border-[#FB4D03]/20 text-xs font-semibold text-[#FB4D03] hover:bg-[#FB4D03]/20 transition-all">
                        <ExternalLink className="w-3.5 h-3.5" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>

        {/* ── Katana Sword Slash Divider ── */}
        <div className="katana-divider mt-24" />
      </div>
    </section>
  );
}
