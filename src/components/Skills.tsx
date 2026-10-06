"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Zap, Flame, Wind, Shield, Sparkles, Cpu } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface SkillMeta {
  name: string;
  icon: string;
  category: "m365" | "frontend" | "backend" | "cloud";
  proficiency: number;
  level: "EXPERT" | "ADVANCED";
  theme: "blue" | "cyan" | "orange" | "green";
  specialty: string;
}

const skillsDatabase: Record<string, SkillMeta> = {
  sharepoint: { name: "SharePoint Online", icon: "🟦", category: "m365", proficiency: 96, level: "EXPERT", theme: "blue", specialty: "Enterprise Modern Sites & CSOM" },
  spfx: { name: "SPFx Framework", icon: "🔵", category: "m365", proficiency: 94, level: "EXPERT", theme: "blue", specialty: "React Custom Web Parts" },
  powerautomate: { name: "Power Automate", icon: "🌊", category: "m365", proficiency: 90, level: "ADVANCED", theme: "blue", specialty: "Cloud Approval Flows & Logic" },
  azure: { name: "Microsoft Azure", icon: "☁️", category: "m365", proficiency: 88, level: "ADVANCED", theme: "blue", specialty: "Cloud Directory & Services" },
  react: { name: "React.js", icon: "⚛️", category: "frontend", proficiency: 95, level: "EXPERT", theme: "cyan", specialty: "Component State & Hooks" },
  nextjs: { name: "Next.js", icon: "▲", category: "frontend", proficiency: 93, level: "EXPERT", theme: "cyan", specialty: "SSR, App Router & API routes" },
  typescript: { name: "TypeScript", icon: "🔷", category: "frontend", proficiency: 92, level: "EXPERT", theme: "cyan", specialty: "Type Safety & Interfaces" },
  javascript: { name: "JavaScript", icon: "🟨", category: "frontend", proficiency: 96, level: "EXPERT", theme: "cyan", specialty: "ES6+, Async & Modern DOM" },
  tailwind: { name: "Tailwind CSS", icon: "🎨", category: "frontend", proficiency: 95, level: "EXPERT", theme: "cyan", specialty: "Dynamic Responsive Design & UI" },
  redux: { name: "Redux / Toolkit", icon: "🔄", category: "frontend", proficiency: 88, level: "ADVANCED", theme: "cyan", specialty: "Global Centralized State" },
  nodejs: { name: "Node.js", icon: "🟢", category: "backend", proficiency: 94, level: "EXPERT", theme: "orange", specialty: "Event-driven runtime engines" },
  express: { name: "Express.js", icon: "⚡", category: "backend", proficiency: 92, level: "EXPERT", theme: "orange", specialty: "REST APIs & Middleware stack" },
  postgresql: { name: "PostgreSQL", icon: "🐘", category: "backend", proficiency: 90, level: "ADVANCED", theme: "orange", specialty: "Relational Schemas & Indexing" },
  mongodb: { name: "MongoDB", icon: "🍃", category: "backend", proficiency: 91, level: "ADVANCED", theme: "orange", specialty: "NoSQL document aggregation" },
  redis: { name: "Redis Cache", icon: "🔴", category: "backend", proficiency: 89, level: "ADVANCED", theme: "orange", specialty: "In-memory Sessions & Caching" },
  aws: { name: "AWS Cloud", icon: "☁️", category: "cloud", proficiency: 91, level: "EXPERT", theme: "green", specialty: "EC2, RDS & Cloud Deployments" },
  docker: { name: "Docker", icon: "🐳", category: "cloud", proficiency: 87, level: "ADVANCED", theme: "green", specialty: "Containerized environments" },
  git: { name: "Git & GitHub", icon: "📦", category: "cloud", proficiency: 95, level: "EXPERT", theme: "green", specialty: "Version Control & GitOps" },
};

const categoryTabs = [
  { id: "all", label: "All Technologies", count: 18, icon: Sparkles, color: "text-[#FB4D03] border-[#FB4D03]/40 bg-[#FB4D03]/10" },
  { id: "m365", label: "Microsoft 365 & SharePoint", count: 4, icon: Wind, color: "text-purple-400 border-purple-500/40 bg-purple-500/10" },
  { id: "frontend", label: "Frontend Architecture", count: 6, icon: Zap, color: "text-cyan-400 border-cyan-500/40 bg-cyan-500/10" },
  { id: "backend", label: "Backend & Databases", count: 5, icon: Flame, color: "text-amber-400 border-amber-500/40 bg-amber-500/10" },
  { id: "cloud", label: "Cloud & DevOps", count: 3, icon: Shield, color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10" },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: "power4.out",
      });

      gsap.from(".marquee-container", {
        scrollTrigger: { trigger: ".marquee-container", start: "top 85%" },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allSkillsList = portfolioData.skills.map((s) => {
    const meta = skillsDatabase[s.icon] || {
      name: s.name,
      icon: "⚡",
      category: "frontend" as const,
      proficiency: 90,
      level: "EXPERT" as const,
      theme: "cyan" as const,
      specialty: "Full Stack Development",
    };
    return { ...s, ...meta };
  });

  const filteredSkills =
    activeTab === "all"
      ? allSkillsList
      : allSkillsList.filter((s) => s.category === activeTab);

  // Split into 2 rows for infinite ticker
  const tickerRow1 = allSkillsList.slice(0, 9);
  const tickerRow2 = allSkillsList.slice(9);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 px-4 md:px-8 bg-[#07070b] overflow-hidden"
    >
      {/* ── Background Cyber Ambient Glows ── */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#FB4D03]/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] bg-cyan-500/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <div className="skills-header text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FB4D03]/15 border border-[#FB4D03]/40 shadow-[0_0_20px_rgba(251,77,3,0.3)] mb-4">
            <Cpu className="w-3.5 h-3.5 text-[#FB4D03] animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[3px] text-[#ff7733]">
              TECH STACK & CORE ARSENAL
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Skills & <span className="text-gradient">Technical Mastery</span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base font-normal leading-relaxed">
            Honed through 1.5+ years of production experience across
            <span className="text-white font-semibold"> SharePoint SPFx</span>,
            <span className="text-[#FB4D03] font-semibold"> Modern Full-Stack Web</span>, and
            <span className="text-cyan-400 font-semibold"> Cloud Microservices</span>.
          </p>
        </div>

        {/* ── Dual Infinite Speed Marquee Tickers (Space Utilization & High Visual Energy) ── */}
        <div className="marquee-container mb-16 relative">
          {/* Subtle edge fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07070b] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07070b] to-transparent z-10 pointer-events-none" />

          {/* Marquee Row 1 (Speeding Left) */}
          <div className="overflow-hidden py-2 mb-3">
            <div className="marquee-track-left gap-3">
              {[...tickerRow1, ...tickerRow1, ...tickerRow1].map((skill, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="sword-card flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#FB4D03]/50 transition-all backdrop-blur-md cursor-default group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <span className="text-sm font-bold text-gray-200 group-hover:text-white whitespace-nowrap">
                    {skill.name}
                  </span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#FB4D03]/20 text-[#FB4D03] border border-[#FB4D03]/30">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Marquee Row 2 (Speeding Right) */}
          <div className="overflow-hidden py-2">
            <div className="marquee-track-right gap-3">
              {[...tickerRow2, ...tickerRow2, ...tickerRow2].map((skill, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="sword-card flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/50 transition-all backdrop-blur-md cursor-default group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform duration-300">
                    {skill.icon}
                  </span>
                  <span className="text-sm font-bold text-gray-200 group-hover:text-white whitespace-nowrap">
                    {skill.name}
                  </span>
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Katana Slash Animated Divider ── */}
        <div className="katana-divider my-12" />

        {/* ── Category Filter Tabs ── */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categoryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 border ${
                  isActive
                    ? `${tab.color} scale-105 shadow-[0_0_20px_rgba(251,77,3,0.25)]`
                    : "text-gray-400 border-white/10 hover:text-white hover:border-white/20 bg-white/[0.02]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "animate-spin-slow" : ""}`} />
                <span>{tab.label}</span>
                <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-300">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Interactive Sword-Slash Skill Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => {
            const themeColors = {
              cyan: {
                border: "border-cyan-500/25 hover:border-cyan-400/60",
                glow: "group-hover:shadow-[0_0_25px_rgba(0,242,254,0.25)]",
                bar: "from-cyan-400 to-blue-500",
                badge: "badge-lightning",
              },
              orange: {
                border: "border-[#FB4D03]/30 hover:border-[#FB4D03]/70",
                glow: "group-hover:shadow-[0_0_25px_rgba(251,77,3,0.3)]",
                bar: "from-[#FB4D03] to-amber-400",
                badge: "badge-fire",
              },
              blue: {
                border: "border-purple-500/30 hover:border-purple-400/70",
                glow: "group-hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]",
                bar: "from-purple-500 to-indigo-400",
                badge: "badge-wind",
              },
              green: {
                border: "border-emerald-500/30 hover:border-emerald-400/70",
                glow: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]",
                bar: "from-emerald-400 to-teal-500",
                badge: "badge-earth",
              },
            }[skill.theme];

            return (
              <div
                key={skill.name}
                className={`sword-card group relative p-5 rounded-2xl bg-gradient-to-b from-[#121218] to-[#0c0c12] border ${themeColors.border} ${themeColors.glow} transition-all duration-300 hover:-translate-y-1.5`}
              >
                {/* Top Row: Icon + Name + Level */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-white/[0.04] border border-white/5 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-base text-white tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FB4D03] transition-all">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] text-gray-400 group-hover:text-gray-200 transition-colors">
                        {skill.specialty}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${themeColors.badge}`}>
                    {skill.level}
                  </span>
                </div>

                {/* Proficiency Level Bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.06]">
                  <div className="flex justify-between items-center text-[10px] mb-1.5">
                    <span className="text-gray-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FB4D03] animate-pulse" />
                      PROFICIENCY
                    </span>
                    <span className="font-bold text-white font-mono">{skill.proficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden p-[1px]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${themeColors.bar} transition-all duration-700`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Key Enterprise Metrics Strip (Bottom Space Maximizer) ── */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              num: "1.5+",
              label: "Years Professional Experience",
              sub: "SharePoint & Full Stack",
              icon: "💼",
            },
            {
              num: "10+",
              label: "Projects Delivered",
              sub: "SaaS, CRM & SPFx",
              icon: "🚀",
            },
            {
              num: "30%+",
              label: "API Performance Gains",
              sub: "Redis & Query Tuning",
              icon: "⚡",
            },
            {
              num: "Top 10%",
              label: "Amity University B.Tech CS",
              sub: "7.08 CGPA / 2024",
              icon: "🎓",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="sword-card p-6 rounded-2xl bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/10 hover:border-[#FB4D03]/40 transition-all duration-300 text-center group"
            >
              <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="text-3xl md:text-4xl font-black text-white text-gradient mb-1">
                {item.num}
              </div>
              <div className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-0.5">
                {item.label}
              </div>
              <div className="text-[11px] text-gray-500 font-mono">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
