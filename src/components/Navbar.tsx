"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { portfolioData } from "@/data/portfolio";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const links = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Why Me", id: "why-me" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-5xl rounded-full ${scrolled ? "bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 py-2 px-4" : "bg-transparent py-4 px-2"
          }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#FB4D03]">
              <Image
                src={portfolioData.personal.avatar}
                alt="Avatar"
                fill
                sizes="40px"
                className="object-cover"
              />
            </span>
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
              {portfolioData.personal.name.split(" ")[0]}<span className="text-[#FB4D03]">.</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/5">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <a
              href={portfolioData.personal.resumeUrl}
              download="Nitin_Chauhan_Resume.pdf"
              className="px-5 py-2.5 rounded-full bg-[#FB4D03] hover:bg-[#d64303] text-white text-sm font-bold tracking-wide transition-all hover:scale-105 shadow-[0_0_20px_rgba(251,77,3,0.35)] relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Resume</span>
                <span className="text-xs opacity-75">PDF</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white bg-white/5 rounded-full border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#0a0a0f]/95 backdrop-blur-xl z-40 transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-2xl font-bold text-gray-300 hover:text-[#FB4D03] transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href={portfolioData.personal.resumeUrl}
            download="Nitin_Chauhan_Resume.pdf"
            className="mt-4 px-8 py-3 rounded-full bg-[#FB4D03] text-white text-lg font-bold shadow-[0_0_30px_rgba(251,77,3,0.4)]"
          >
            Download Resume (PDF)
          </a>
        </div>
      </div>
    </>
  );
}
