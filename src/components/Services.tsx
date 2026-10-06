"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Layout, Zap, Code } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, React.ReactNode> = {
    layout: <Layout className="w-8 h-8" />,
    zap: <Zap className="w-8 h-8" />,
    code: <Code className="w-8 h-8" />,
};

export function Services() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".service-anim", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

            gsap.from(".service-card", {
                scrollTrigger: {
                    trigger: ".services-grid",
                    start: "top 80%",
                },
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "back.out(1.2)",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="why-me" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0f] relative">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 service-anim">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="cyber-badge">
                            <span>⚡</span> VALUE PROPOSITION & STANDARDS
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white">
                        Why Partner With <span className="text-gradient">Me</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 services-grid">
                    {portfolioData.services?.map((service, i) => (
                        <div key={i} className="service-card sword-card group glass p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 border border-white/10 bg-[#111116] hover:border-[#FB4D03]/40 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FB4D03]/20 to-transparent blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="mb-6 inline-block p-4 rounded-2xl bg-[#FB4D03]/10 text-[#FB4D03] group-hover:scale-110 transition-transform">
                                {icons[service.icon] || <Zap className="w-8 h-8" />}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-gradient transition-all">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Katana divider */}
                <div className="katana-divider mt-20" />
            </div>
        </section>
    );
}
