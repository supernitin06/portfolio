"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Quote } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".testim-anim", {
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

            gsap.from(".testim-card", {
                scrollTrigger: {
                    trigger: ".testim-grid",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!portfolioData.testimonials || portfolioData.testimonials.length === 0) return null;

    return (
        <section id="testimonials" ref={sectionRef} className="py-24 px-6 bg-black relative">
            <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center testim-anim">
                    <span className="text-white">Client </span>
                    <span className="text-[#FB4D03]">Testimonials</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-8 testim-grid">
                    {portfolioData.testimonials.map((testim, i) => (
                        <div key={i} className="testim-card relative glass p-8 md:p-10 rounded-3xl border border-white/5 bg-white/5">
                            <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5" />
                            <p className="text-lg text-gray-300 italic mb-8 relative z-10">"{testim.content}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FB4D03] to-[#d64303] flex items-center justify-center font-bold text-white text-xl">
                                    {testim.avatar}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{testim.name}</h4>
                                    <p className="text-sm text-gray-400">{testim.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
