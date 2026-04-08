"use client";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Portfolio from "./sections/Portfolio";
import Contact from "./sections/Contact";
import AIAssistant from "./components/AIAssistant";
import FixedParticleBackground from "./components/FixedParticleBackground";

export default function Home() {
  return (
    <>
      {/* Fixed particle background - always visible */}
      <FixedParticleBackground />

      <Navigation />

      <main className="relative">
        {/* Hero Section - Has its own background (Vanta on desktop) that covers the particles */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* Middle sections - particles show through */}
        <div className="relative z-10">
          <About />
          <Skills />
          <Portfolio />
        </div>

        {/* Contact Section - particles show through */}
        <div className="relative z-10">
          <Contact />
        </div>
      </main>

      <Footer />

      {/* AI Assistant */}
      <AIAssistant />
    </>
  );
}
