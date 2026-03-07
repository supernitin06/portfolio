import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { GitHub } from "@/components/GitHub";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { FloatingTechIcons } from "@/components/FloatingTechIcons";

export default function Home() {
  return (
    <main className="relative">
      <FloatingTechIcons />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Skills />
      <Projects />
      <Experience />
      <GitHub />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
