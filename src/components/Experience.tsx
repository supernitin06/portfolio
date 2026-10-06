"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Briefcase, MapPin, CalendarDays, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const companyColors: Record<string, { accent: string; bg: string }> = {
  "Smalsus Infolab Pvt. Ltd.": { accent: "#0078d4", bg: "rgba(0,120,212,0.08)" },
  "LeadsConnect Services Pvt. Ltd.": { accent: "#10b981", bg: "rgba(16,185,129,0.08)" },
  "Perfect Kode Software Technologies": { accent: "#a855f7", bg: "rgba(168,85,247,0.08)" },
};

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-heading", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
      });

      gsap.from(".timeline-line-fill", {
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top 70%",
          end: "bottom 30%",
          scrub: 2,
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
      });

      const items = document.querySelectorAll(".exp-card");
      items.forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 88%" },
          x: i % 2 === 0 ? -60 : 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      {/* Background */}
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-[#FB4D03]/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-violet-600/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div className="exp-heading text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="cyber-badge">
              <span>💼</span> CAREER TIMELINE • PROFESSIONAL JOURNEY
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
            Work <span className="text-gradient">Experience</span> & Roles
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-normal text-sm md:text-base">
            Delivering high-leverage software engineering, enterprise automation workflows, and cloud architecture across growing tech firms.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.06] -translate-x-1/2">
            <div className="timeline-line-fill w-full h-full bg-gradient-to-b from-[#FB4D03] via-[#FB4D03]/60 to-transparent" />
          </div>

          <div className="space-y-16 md:space-y-24">
            {portfolioData.experience.map((exp, i) => {
              const theme = companyColors[exp.company] || { accent: "#FB4D03", bg: "rgba(251,77,3,0.08)" };
              return (
                <div
                  key={i}
                  className={`exp-card relative flex flex-col md:flex-row items-start gap-0 md:gap-8 ${
                    i % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Center node */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full z-10 flex items-center justify-center border-4 border-[#0a0a0f]"
                    style={{ background: theme.bg, boxShadow: `0 0 20px ${theme.accent}40`, borderColor: `${theme.accent}30` }}
                  >
                    <Briefcase className="w-5 h-5" style={{ color: theme.accent }} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:flex flex-1 justify-center" />

                  {/* Card */}
                  <div className="flex-1 w-full pl-20 md:pl-0">
                    <div
                      className="sword-card relative rounded-3xl p-8 md:p-10 border overflow-hidden transition-all duration-500 group hover:-translate-y-1 hover:shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${theme.bg}, rgba(17,17,17,0.95))`,
                        borderColor: `${theme.accent}20`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${theme.accent}50`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${theme.accent}15`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = `${theme.accent}20`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Glowing top edge */}
                      <div
                        className="absolute top-0 left-8 right-8 h-px"
                        style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}60, transparent)` }}
                      />

                      {/* Header row */}
                      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-white mb-1 group-hover:text-white transition-colors">
                            {exp.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="font-semibold" style={{ color: theme.accent }}>{exp.company}</span>
                            {exp.location && (
                              <span className="flex items-center gap-1 text-gray-500">
                                <MapPin className="w-3 h-3" />{exp.location}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex-shrink-0"
                          style={{ background: `${theme.accent}15`, color: theme.accent, border: `1px solid ${theme.accent}30` }}>
                          <CalendarDays className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-white/[0.06] mb-6" />

                      {/* Description */}
                      <p className="text-gray-400 leading-relaxed text-sm md:text-base mb-6">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="space-y-2.5">
                          {exp.highlights.map((hl: string, j: number) => (
                            <li key={j} className="flex items-start gap-3 text-sm text-gray-300 group/hl">
                              <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover/hl:scale-150 transition-transform"
                                style={{ background: theme.accent }}
                              />
                              {hl}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Corner icon */}
                      <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Katana Sword Slash Divider ── */}
        <div className="katana-divider mt-24" />
      </div>
    </section>
  );
}
