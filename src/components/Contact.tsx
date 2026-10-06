"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioData } from "@/data/portfolio";
import { Mail, Phone, Calendar, Download, Send, Linkedin, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-anim", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        rotationX: -10,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        transformOrigin: "bottom center",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${portfolioData.personal.email}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Oops! There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form. Please try again.");
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 px-6 bg-[#0a0a0f] overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#FB4D03]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-20 text-center contact-anim">
          <span className="text-white">Get In </span>
          <span className="text-[#FB4D03]">Touch</span>
        </h2>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">

          {/* Left Side: Contact Info & Cal.com */}
          <div className="lg:col-span-2 space-y-8 contact-anim">
            <div className="glass p-8 md:p-10 rounded-[2rem] border border-white/5 bg-[#111111]/80 backdrop-blur-xl hover:border-[#FB4D03]/30 transition-colors">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Feel free to reach out for collaborations or just a friendly hello. I am currently open to new opportunities!
              </p>

              <div className="space-y-6 mb-10">
                <a href={`mailto:${portfolioData.personal.email}`} className="flex items-center gap-4 text-gray-300 hover:text-[#FB4D03] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FB4D03]/10 group-hover:border-[#FB4D03]/30 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{portfolioData.personal.email}</span>
                </a>

                <a href={`tel:${portfolioData.personal.phone.replace(/\D/g, "")}`} className="flex items-center gap-4 text-gray-300 hover:text-[#FB4D03] transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#FB4D03]/10 group-hover:border-[#FB4D03]/30 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{portfolioData.personal.phone}</span>
                </a>
              </div>

              {/* Cal.com CTA */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#FB4D03]/10 to-transparent border border-[#FB4D03]/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#FB4D03]/20 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                <h4 className="text-lg font-bold text-white mb-2 relative z-10 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#FB4D03]" /> Schedule a Meeting
                </h4>
                <p className="text-sm text-gray-400 mb-6 relative z-10">
                  Prefer to talk directly? Book a time that works for you on my calendar.
                </p>
                <a
                  href="https://cal.com/nitin-chauhan-4hpcik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-[#FB4D03] text-white font-bold tracking-wide hover:bg-[#d64303] transition-colors relative z-10 shadow-[0_0_20px_rgba(251,77,3,0.3)]"
                >
                  Book a Call
                </a>
              </div>
            </div>

            {/* Social & Resume */}
            <div className="flex flex-wrap gap-4">
              <a
                href={portfolioData.personal.resumeUrl}
                download="Nitin_Chauhan_Resume.pdf"
                className="sword-card flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FB4D03]/40 text-white font-semibold transition-all group"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform text-[#FB4D03]" /> Download Resume
              </a>
              <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="w-[72px] h-[72px] flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all">
                <Github className="w-6 h-6 hover:text-[#FB4D03] transition-colors" />
              </a>
              <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="w-[72px] h-[72px] flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition-all">
                <Linkedin className="w-6 h-6 hover:text-[#FB4D03] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-3 contact-anim h-full">
            <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-8 md:p-12 border border-white/5 bg-[#111111]/80 backdrop-blur-xl hover:border-white/10 transition-colors h-full flex flex-col justify-between">
              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Send a Message</h3>
                  <p className="text-gray-400">Fill out the form below and I&apos;ll get back to you shortly.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 ml-1 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#FB4D03] focus:ring-1 focus:ring-[#FB4D03] transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 ml-1 uppercase tracking-wider">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#FB4D03] focus:ring-1 focus:ring-[#FB4D03] transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-3 ml-1 uppercase tracking-wider">Your Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-[#FB4D03] focus:ring-1 focus:ring-[#FB4D03] transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full mt-10 py-4 rounded-2xl bg-white text-black font-extrabold text-lg hover:bg-[#FB4D03] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {submitted ? (
                  "✓ Message Sent Successfully!"
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
