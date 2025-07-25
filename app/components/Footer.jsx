"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ArrowUp, Youtube, Code2 } from "lucide-react";
import { cn } from "../utils/cn";
import Container from "./Container";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Check if footer is in view
      const footer = document.querySelector("footer");
      if (footer) {
        const rect = footer.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Social links - matching Hero section
  const socialLinks = [
    {
      name: "YouTube",
      href: "https://www.youtube.com/@brandonchurch2328",
      icon: <Youtube size={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/brandon-church-946278138/",
      icon: <Linkedin size={20} />,
    },
    {
      name: "GitHub",
      href: "https://github.com/BrandonChurch93",
      icon: <Github size={20} />,
    },
    {
      name: "CodePen",
      href: "https://codepen.io/BrandonLeoChurch",
      icon: <Code2 size={20} />,
    },
  ];

  // Navigation links
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Contact", href: "#contact" },
  ];

  // Smooth scroll to section
  const scrollToSection = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 80;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative overflow-hidden z-20">
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#ff3f81] to-[#a78bfa] transition-all duration-300 ease-out z-30"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Glass morphism background */}
      <div className="absolute inset-0 bg-[#1a0f2e]/95 backdrop-blur-md" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff3f81]/5 to-[#a78bfa]/5" />

      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#ff3f81]/50 to-transparent" />

      <Container className="relative z-10">
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {/* Brand Column */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInVariants}
              transition={{ duration: 0.5 }}
              className="space-y-6 text-center md:text-left"
            >
              <div>
                <h3 className="font-semibold text-lg text-white">
                  Brandon Church
                </h3>
                <p className="text-sm text-white/60">
                  Senior UI/UX Developer & AI Specialist
                </p>
              </div>
              <div className="glass px-4 py-2 rounded-xl inline-flex items-center gap-2 border-[#ff3f81]/30 mx-auto md:mx-0">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-white/80">
                  Available for projects
                </span>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInVariants}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4 text-center md:text-left"
            >
              <h4 className="font-medium text-sm uppercase tracking-wider text-white/60">
                Navigation
              </h4>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8 max-w-xs mx-auto md:mx-0">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={cn(
                      "text-sm text-white/80 hover:text-[#ff3f81]",
                      "transition-all duration-200",
                      "relative group"
                    )}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#ff3f81] transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Connect Column */}
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={fadeInVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 text-center md:text-left"
            >
              <h4 className="font-medium text-sm uppercase tracking-wider text-white/60">
                Let's Connect
              </h4>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "p-2.5 rounded-xl",
                      "glass",
                      "text-white/80 hover:text-[#ff3f81]",
                      "border border-white/10",
                      "hover:border-[#ff3f81]/50",
                      "hover:shadow-[0_0_20px_rgba(255,63,129,0.3)]",
                      "transition-all duration-300",
                      "hover:rotate-6 hover:scale-110",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f81] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    )}
                    aria-label={`${link.name} (opens in new window)`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInVariants}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <p className="text-sm text-white/60 text-center sm:text-left">
              © {currentYear} Brandon Church. Crafted with passion and
              precision.
            </p>

            {/* Back to top button - Always visible on all viewports */}
            <button
              onClick={scrollToTop}
              className={cn(
                "group flex items-center gap-2",
                "px-4 py-2 rounded-xl",
                "glass",
                "text-sm text-white/80",
                "hover:text-[#ff3f81] hover:border-[#ff3f81]/50",
                "transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f81] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
              aria-label="Back to top of page"
            >
              Back to top
              <ArrowUp
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1"
              />
            </button>
          </motion.div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
