"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Youtube, Linkedin, Github, Code2 } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import VantaGlobe from "../components/VantaGlobe";
import { cn } from "../utils/cn";
import { AnimatedTitle } from "../components/AnimatedText";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const controls = useAnimation();

  const phrases = [
    "Full-Stack Developer & AI Specialist",
    "UI/UX Designer & WCAG Expert",
    "10+ Years Building Enterprise Solutions",
  ];

  useEffect(() => {
    setMounted(true);
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Typing effect with cycling
  useEffect(() => {
    if (!mounted) return;

    const currentPhrase = phrases[phraseIndex];
    let timer;

    if (!isDeleting) {
      // Typing
      if (typedText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setTypedText(currentPhrase.slice(0, typedText.length + 1));
        }, 50);
      } else {
        // Pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (typedText.length > 0) {
        timer = setTimeout(() => {
          setTypedText(typedText.slice(0, -1));
        }, 30);
      } else {
        // Move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [mounted, typedText, isDeleting, phraseIndex]);

  // Social links data
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

  // Smooth scroll to portfolio section - Fixed to match Navigation approach
  const scrollToPortfolio = (e) => {
    e.preventDefault();
    const element = document.getElementById("portfolio");

    if (element) {
      // Get current position of the element
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - 80; // 80px offset for fixed nav

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Desktop: Vanta Globe Background */}
      {!isMobile && (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-[#23153c]">
            <VantaGlobe className="absolute inset-0 w-full h-full" />
          </div>
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#23153c]/90 via-[#23153c]/40 to-transparent z-[1]"
            aria-hidden="true"
          />
        </>
      )}

      {/* Mobile: Now relies on the fixed particle background */}
      {/* No gradient overlay - particles show through clearly */}

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="max-w-4xl text-left"
        >
          {/* Main content with glass background on mobile */}
          <motion.div
            variants={itemVariants}
            className={cn(
              "relative",
              isMobile &&
                "bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10"
            )}
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight text-white"
            >
              <AnimatedTitle>Hi, I'm Brandon</AnimatedTitle>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-[#ff3f81] mb-6 min-h-[1.2em]"
            >
              <span className="inline-block">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="inline-block w-1 h-6 md:h-8 ml-1 bg-[#ff3f81] align-middle"
                />
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 max-w-3xl leading-relaxed"
            >
              Senior UI/UX developer and AI prompt engineering expert with 10+
              years of experience. I've architected multi-million dollar
              applications and led enterprise teams. Now I'm leveraging AI to
              build innovative solutions faster and smarter than ever before.
            </motion.p>

            {/* CTA Buttons - Stack on mobile */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-start mb-6"
            >
              <Button
                variant="primary"
                size={isMobile ? "md" : "lg"}
                onClick={scrollToPortfolio}
                className={cn(
                  "min-w-[200px]",
                  "bg-[#ff3f81] hover:bg-[#ff3f81]/90",
                  "text-white border-[#ff3f81]",
                  "shadow-[0_0_30px_rgba(255,63,129,0.3)]",
                  "hover:shadow-[0_0_40px_rgba(255,63,129,0.5)]",
                  "transition-all duration-200"
                )}
              >
                View My Work
              </Button>
              <Button
                variant="secondary"
                size={isMobile ? "md" : "lg"}
                href="/downloads/BrandonChurchResume.pdf"
                download="BrandonChurchResume.pdf"
                className={cn(
                  "min-w-[200px]",
                  "border-white/20 text-white hover:text-[#ff3f81]",
                  "hover:bg-white/10 backdrop-blur-sm",
                  "hover:border-[#ff3f81]/50",
                  "transition-all duration-200"
                )}
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links - Better mobile layout */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-start"
            >
              <span className="text-white/60 text-sm">Connect with me:</span>
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "relative p-2.5 rounded-lg",
                      "text-white/80 hover:text-[#ff3f81]",
                      "transition-all duration-200",
                      "hover:bg-[#ff3f81]/10",
                      "backdrop-blur-sm bg-white/5",
                      "border border-white/10 hover:border-[#ff3f81]/30",
                      "hover:shadow-[0_0_20px_rgba(255,63,129,0.3)]",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f81] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                    )}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`${link.name} (opens in new window)`}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
