"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Lock,
  X,
  ChevronRight,
  Zap,
  Code2,
  Sparkles,
} from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import { cn } from "../utils/cn";
import { AnimatedTitle } from "../components/AnimatedText";
import {
  useIsMobile,
  useSectionAnimation,
  scrollAnimationVariants,
  ScrollTriggeredUnderline,
} from "../components/ScrollAnimations";
import { MobileMotionWrapper } from "../components/MobileMotionWrapper";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  const { sectionRef, isInView, isMobile, containerVariants, getVariant } =
    useSectionAnimation();

  // Handle modal focus trap and escape key
  useEffect(() => {
    if (selectedProject) {
      // Store scrollbar width to prevent layout shift
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      // Simple approach - just hide overflow without changing position
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      const previouslyFocused = document.activeElement;
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      const handleEscape = (e) => {
        if (e.key === "Escape") {
          setSelectedProject(null);
        }
      };

      const handleTab = (e) => {
        if (e.key === "Tab" && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      // Prevent wheel events on the body
      const preventWheel = (e) => {
        // Only prevent if the scroll didn't originate from the modal
        if (
          !e.target.closest(".modal-scroll-wrapper") &&
          !e.target.closest(".modal-content-scroll")
        ) {
          e.preventDefault();
        }
      };

      document.addEventListener("keydown", handleEscape);
      document.addEventListener("keydown", handleTab);
      document.addEventListener("wheel", preventWheel, { passive: false });

      return () => {
        // Simply restore overflow and padding
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";

        document.removeEventListener("keydown", handleEscape);
        document.removeEventListener("keydown", handleTab);
        document.removeEventListener("wheel", preventWheel);
        previouslyFocused?.focus();
      };
    }
  }, [selectedProject]);

  // Projects data
  const projects = [
    {
      id: "snapshot-ai",
      title: "SwiftSnapAI",
      tagline: "AI-powered Chrome extension for instant content analysis",
      description:
        "Select text or images from any webpage for immediate AI analysis. Full-stack SaaS with Stripe subscriptions, turning 30min research into 30sec.",
      image: "/images/snapShotAI.png",
      techStack: [
        "React 18",
        "TypeScript",
        "Next.js 14",
        "Chrome Extension V3",
        "OpenAI GPT-4",
        "Supabase",
        "Stripe",
        "Vercel",
      ],
      liveUrl:
        "https://swiftsnapai-3n5uijgvg-brandon-churchs-projects.vercel.app/",
      githubUrl: "https://github.com/BrandonChurch93/swiftsnapai",
      featured: true,
      status: "live",
      problem:
        "Context switching kills productivity. Users spend 5-7 steps copying text, switching tabs, pasting into ChatGPT, waiting, then copying back. Research tasks take 30+ minutes of repetitive actions.",
      solution:
        "SwiftSnapAI enables Alt+drag text selection or Shift+drag image capture with instant AI analysis. Built complete SaaS with authentication, payments, and 2-3 second response times vs competitors' 18-23 seconds.",
      features: [
        "Alt+drag text / Shift+drag image for instant AI analysis",
        "Multi-language support (6 languages) with i18n",
        "Stripe subscription tiers (Free/Pro/Power)",
        "Magic link authentication with anonymous upgrade path",
        "Real-time usage tracking with LRU rate limiting",
        "Service worker architecture for background processing",
      ],
      metrics: {
        "Response Time": "2-3s",
        "vs Competitors": "18-23s",
        "Time Saved": "90%",
      },
    },
    {
      id: "fileforge",
      title: "FileForge",
      tagline: "Browser-based file optimization with zero server uploads",
      description:
        "Professional file processing entirely in-browser. Smart compression for email platforms, format conversion, PDF manipulation, and web optimization - all with complete privacy.",
      image: "/images/fileforge.png",
      techStack: [
        "React 18",
        "Vite",
        "React Router v6",
        "Canvas API",
        "pdf-lib",
        "JSZip",
        "browser-image-compression",
        "Web Workers",
      ],
      liveUrl: "https://file-forge-lovat.vercel.app/",
      githubUrl: "https://github.com/BrandonChurch93/fileforge",
      status: "live",
      problem:
        "Users need quick file operations but face privacy concerns with online tools, slow processing, file size limits, and expensive software. Most solutions upload files to servers, risking data exposure and requiring trust in third-party handling.",
      solution:
        "FileForge processes everything client-side using Web APIs and Canvas. Five specialized journeys guide users through smart email compression, format conversion, PDF operations, web optimization, and favicon generation - all with sub-3-second processing and files never leaving the browser.",
      features: [
        "100% client-side processing - complete privacy guaranteed",
        "Smart platform detection for Gmail/Discord/Outlook limits",
        "Contextual intelligence warns about transparency loss in conversions",
        "Glassmorphism UI with smooth step-by-step workflows",
        "Progressive enhancement based on browser capabilities",
        "Memory-conscious batch processing prevents overflow",
      ],
      metrics: {
        Processing: "< 3s",
        Privacy: "100%",
        "File Limit": "100MB",
      },
    },
    {
      id: "inboxhero-ai",
      title: "InboxHeroAI",
      tagline: "AI assistant that reads your emails across all accounts",
      description:
        "Never miss important emails again. AI-powered inbox management across multiple email accounts with intelligent prioritization.",
      image: "/images/placeholder.png",
      techStack: ["Next.js", "OpenAI", "OAuth 2.0", "Node.js"],
      status: "coming-soon",
    },
    {
      id: "cyberheist-2089",
      title: "CyberHeist2089",
      tagline: "Futuristic heist game in your browser",
      description:
        "Web-based cyberpunk heist game with immersive 3D graphics and multiplayer capabilities.",
      image: "/images/placeholder.png",
      techStack: ["Three.js", "WebGL", "Socket.io", "React"],
      status: "coming-soon",
    },
  ];

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="section-padding relative"
      >
        {/* Background - subtle gradient only */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f2e]/50 to-transparent pointer-events-none" />

        <Container className="relative z-10">
          <MobileMotionWrapper
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.title)}
              className="text-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                <AnimatedTitle>Featured Projects</AnimatedTitle>
              </h2>
              <MobileMotionWrapper
                variants={getVariant(scrollAnimationVariants.slogan)}
                as="p"
                className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto"
              >
                <ScrollTriggeredUnderline>
                  Innovative AI solutions, exceptional user experiences
                </ScrollTriggeredUnderline>
              </MobileMotionWrapper>
            </MobileMotionWrapper>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <MobileMotionWrapper
                  key={project.id}
                  variants={getVariant(
                    index % 2 === 0
                      ? scrollAnimationVariants.cardLeft
                      : scrollAnimationVariants.cardRight
                  )}
                >
                  <div
                    className={cn(
                      "glass card-hover rounded-3xl overflow-hidden h-full",
                      "border border-white/10",
                      "group",
                      project.status === "live"
                        ? "hover:border-[#ff3f81]/30 cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                        : "cursor-not-allowed"
                    )}
                    onClick={() =>
                      project.status === "live" && setSelectedProject(project)
                    }
                    tabIndex={project.status === "live" ? 0 : -1}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && project.status === "live") {
                        setSelectedProject(project);
                      }
                    }}
                    role={project.status === "live" ? "button" : "article"}
                    aria-label={
                      project.status === "live"
                        ? `View ${project.title} details`
                        : `${project.title} - Coming Soon`
                    }
                    aria-disabled={project.status !== "live"}
                  >
                    {/* Project Image */}
                    <div className="relative h-64 overflow-hidden bg-white/5">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={cn(
                          "w-full h-full object-cover transition-transform duration-700",
                          project.status === "live"
                            ? "group-hover:scale-110"
                            : "filter blur-sm opacity-60"
                        )}
                      />

                      {/* Status Overlay for Coming Soon */}
                      {project.status === "coming-soon" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                          <div className="text-center">
                            <Lock
                              size={32}
                              className="text-white/60 mb-2 mx-auto"
                            />
                            <p className="text-white font-medium">
                              Coming Soon
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Featured Badge */}
                      {project.featured && project.status === "live" && (
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-[#ff3f81] text-white text-sm font-semibold rounded-full">
                            Featured Project
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Project Info */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold mb-2 text-white transition-colors duration-500 group-hover:text-[#ff3f81] flex items-center justify-between">
                        {project.title}
                        {project.status === "live" && (
                          <ChevronRight
                            size={20}
                            className="text-white/60 transition-all duration-500 group-hover:text-[#ff3f81] group-hover:translate-x-2"
                          />
                        )}
                      </h3>
                      <p className="text-[#ff3f81] font-medium mb-3">
                        {project.tagline}
                      </p>
                      <p className="text-white/70 mb-6 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className={cn(
                              "px-3 py-1.5 text-xs rounded-xl",
                              "bg-white/5 backdrop-blur-sm",
                              "border border-white/10",
                              "text-white/90",
                              project.status === "live" &&
                                "group-hover:bg-[#ff3f81]/10 group-hover:border-[#ff3f81]/30",
                              "transition-all duration-200"
                            )}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </MobileMotionWrapper>
              ))}
            </div>

            {/* Call to Action */}
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.cardCenter)}
              className="text-center mt-16"
            >
              <p className="text-lg text-white/70 mb-6">
                Want to see what else I'm working on?
              </p>
              <Button
                variant="secondary"
                size="lg"
                href="https://modernsoftworks.com"
                target="_blank"
                icon={<Sparkles size={20} />}
                className={cn(
                  "border-white/20 text-white hover:text-[#ff3f81]",
                  "hover:bg-white/10 backdrop-blur-sm",
                  "hover:border-[#ff3f81]/50",
                  "transition-all duration-200"
                )}
              >
                Visit Modern Softworks
              </Button>
            </MobileMotionWrapper>
          </MobileMotionWrapper>
        </Container>
      </section>

      {/* Project Modal - Fixed for all viewports with header consideration */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Inline styles for scrollbar behavior */}
            <style jsx global>{`
              /* Hide scrollbar by default for modal */
              .modal-scroll-wrapper::-webkit-scrollbar,
              .modal-content-scroll::-webkit-scrollbar {
                width: 6px;
                background: transparent;
              }

              .modal-scroll-wrapper::-webkit-scrollbar-thumb,
              .modal-content-scroll::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                opacity: 0;
                transition: opacity 0.3s ease;
              }

              /* Show scrollbar on hover or when scrolling */
              .modal-scroll-wrapper:hover::-webkit-scrollbar-thumb,
              .modal-scroll-wrapper:active::-webkit-scrollbar-thumb,
              .modal-content-scroll:hover::-webkit-scrollbar-thumb,
              .modal-content-scroll:active::-webkit-scrollbar-thumb {
                opacity: 1;
              }

              /* Firefox */
              .modal-scroll-wrapper,
              .modal-content-scroll {
                scrollbar-width: thin;
                scrollbar-color: transparent transparent;
                transition: scrollbar-color 0.3s ease;
              }

              .modal-scroll-wrapper:hover,
              .modal-scroll-wrapper:active,
              .modal-content-scroll:hover,
              .modal-content-scroll:active {
                scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
              }

              /* Mobile - hide scrollbar completely */
              @media (max-width: 768px) {
                .modal-scroll-wrapper::-webkit-scrollbar,
                .modal-content-scroll::-webkit-scrollbar {
                  display: none;
                }

                .modal-scroll-wrapper,
                .modal-content-scroll {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              }
            `}</style>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              style={{ isolation: "isolate" }}
            >
              {/* Modal positioning wrapper - accounts for header */}
              <div className="modal-scroll-wrapper w-full h-full overflow-y-auto overflow-x-hidden">
                <div className="min-h-full flex items-center justify-center p-4 py-24">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "relative w-full max-w-4xl bg-[#23153c] rounded-3xl shadow-2xl overflow-hidden border border-white/10",
                      "max-h-[calc(100vh-120px)]", // Account for 80px header + 40px padding
                      "flex flex-col" // Make it a flex container
                    )}
                    onClick={(e) => e.stopPropagation()}
                    ref={modalRef}
                  >
                    {/* Modal Header - Fixed */}
                    <div className="glass border-b border-white/10 p-4 md:p-6 flex-shrink-0">
                      <div className="flex items-start justify-between">
                        <div className="pr-4">
                          <h3
                            id="modal-title"
                            className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white"
                          >
                            <AnimatedTitle disableAnimation>
                              {selectedProject.title}
                            </AnimatedTitle>
                          </h3>
                          <p className="text-[#ff3f81] font-medium text-sm md:text-base">
                            {selectedProject.tagline}
                          </p>
                        </div>
                        <button
                          ref={closeButtonRef}
                          onClick={() => setSelectedProject(null)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3f81] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent flex-shrink-0"
                          aria-label="Close modal"
                        >
                          <X size={24} />
                        </button>
                      </div>
                    </div>

                    {/* Modal Content - Scrollable */}
                    <div className="modal-content-scroll flex-1 overflow-y-auto">
                      <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                        {/* Hero Image */}
                        <div className="relative h-48 md:h-64 lg:h-96 bg-white/5 rounded-xl overflow-hidden">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 md:gap-4">
                          <Button
                            variant="primary"
                            size="md"
                            href={selectedProject.liveUrl}
                            target="_blank"
                            icon={<ExternalLink size={18} />}
                            className="text-sm md:text-base"
                          >
                            View Live Project
                          </Button>
                          <Button
                            variant="secondary"
                            size="md"
                            href={selectedProject.githubUrl}
                            target="_blank"
                            icon={<Github size={18} />}
                            className="text-sm md:text-base"
                          >
                            View Source Code
                          </Button>
                        </div>

                        {/* Problem & Solution */}
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                          <div className="glass rounded-xl p-4 md:p-6 border border-white/10">
                            <h4 className="font-semibold text-base md:text-lg mb-2 md:mb-3 flex items-center gap-2 text-white">
                              <Zap className="text-[#ff3f81]" size={18} />
                              The Problem
                            </h4>
                            <p className="text-white/70 text-sm md:text-base">
                              {selectedProject.problem}
                            </p>
                          </div>
                          <div className="glass rounded-xl p-4 md:p-6 border border-white/10">
                            <h4 className="font-semibold text-base md:text-lg mb-2 md:mb-3 flex items-center gap-2 text-white">
                              <Sparkles className="text-[#ff3f81]" size={18} />
                              The Solution
                            </h4>
                            <p className="text-white/70 text-sm md:text-base">
                              {selectedProject.solution}
                            </p>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div>
                          <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-white">
                            Key Features
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                            {selectedProject.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3"
                              >
                                <div className="w-5 h-5 rounded-full bg-[#ff3f81]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-[#ff3f81]" />
                                </div>
                                <p className="text-white/70 text-xs md:text-sm">
                                  {feature}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Metrics */}
                        <div>
                          <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-white">
                            Impact Metrics
                          </h4>
                          <div className="grid grid-cols-3 gap-3 md:gap-4">
                            {Object.entries(selectedProject.metrics).map(
                              ([label, value]) => (
                                <div
                                  key={label}
                                  className="text-center p-3 md:p-4 glass rounded-xl border border-white/10"
                                >
                                  <p className="text-lg md:text-2xl font-bold text-[#ff3f81] mb-1">
                                    {value}
                                  </p>
                                  <p className="text-xs md:text-sm text-white/60">
                                    {label}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                          <h4 className="font-semibold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2 text-white">
                            <Code2 size={18} />
                            Technical Implementation
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.techStack.map((tech) => (
                              <span
                                key={tech}
                                className={cn(
                                  "px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm",
                                  "bg-white/5 backdrop-blur-sm",
                                  "border border-white/10",
                                  "text-white/90",
                                  "hover:bg-[#ff3f81]/10 hover:border-[#ff3f81]/30",
                                  "transition-all duration-200"
                                )}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Portfolio;
