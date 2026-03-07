"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FAQ() {
    const sectionRef = useRef<HTMLElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".faq-anim", {
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

            gsap.from(".faq-item", {
                scrollTrigger: {
                    trigger: ".faq-list",
                    start: "top 80%",
                },
                x: -40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: "power2.out",
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    if (!portfolioData.faqs || portfolioData.faqs.length === 0) return null;

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" ref={sectionRef} className="py-24 px-6 bg-[#0a0a0f] relative">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center faq-anim">
                    <span className="text-white">Frequently Asked </span>
                    <span className="text-[#FB4D03]">Questions</span>
                </h2>

                <div className="space-y-4 faq-list">
                    {portfolioData.faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className={`faq-item glass rounded-2xl overflow-hidden transition-colors border ${isOpen ? 'border-[#FB4D03]/30 bg-white/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <h3 className="text-lg font-semibold text-white pr-8">{faq.question}</h3>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FB4D03]" : ""}`} />
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-6 pt-0 text-gray-400 leading-relaxed text-sm md:text-base">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
