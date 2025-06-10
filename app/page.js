"use client";

import { motion } from "framer-motion";
import Header from "@/components/header/Header";
import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Skills from "@/sections/Skills/Skills";
import Portfolio from "@/sections/Portfolio/Portfolio";
import Contact from "@/sections/Contact/Contact";
import Footer from "@/components/footer/Footer";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Section animation variants
const sectionVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen"
    >
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <motion.section variants={sectionVariants}>
          <Hero />
        </motion.section>

        {/* About Section - uncomment when About component is ready */}
        <motion.section variants={sectionVariants}>
          <About />
        </motion.section>

        {/* Skills Section - uncomment when Skills component is ready */}
        <motion.section variants={sectionVariants}>
          <Skills />
        </motion.section>

        {/* Portfolio Section - uncomment when Portfolio component is ready */}
        <motion.section variants={sectionVariants}>
          <Portfolio />
        </motion.section>

        {/* Contact Section */}
        <motion.section id="contact" variants={sectionVariants}>
          <Contact />
        </motion.section>
      </main>

      <Footer />

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
