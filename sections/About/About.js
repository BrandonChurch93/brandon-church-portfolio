"use client";

import { useRef, useState, useEffect } from "react";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  useXRInteraction,
  useCursorInteraction,
} from "@/components/XRInteractionProvider";
import styles from "./about.module.css";
import {
  FaUser,
  FaLightbulb,
  FaRocket,
  FaChevronRight,
  FaChevronLeft,
  FaCube,
} from "react-icons/fa";
import { BiInfinite } from "react-icons/bi";

const About = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(1); // Start with Professional Overview
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const { mouseX, mouseY } = useXRInteraction();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.9]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.3, 1, 1, 0.3]
  );

  // Mouse parallax
  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const parallaxX = useTransform(
    mouseXSpring,
    [0, typeof window !== "undefined" ? window.innerWidth : 1920],
    [-30, 30]
  );
  const parallaxY2 = useTransform(
    mouseYSpring,
    [0, typeof window !== "undefined" ? window.innerHeight : 1080],
    [-30, 30]
  );

  // Content sections - reordered
  const sections = [
    {
      id: "services",
      title: "What I Can Do for You",
      icon: FaLightbulb,
      color: "#06b6d4",
      content:
        "You don’t just need clean code—you need intelligent, scalable solutions that create impact. As a senior UI/UX developer and expert in AI prompt engineering, I integrate cutting-edge tools like OpenAI and TensorFlow to personalize experiences, automate workflows, and solve real business problems. My front-end stack—React, Next.js, Tailwind, and Figma—ensures fast, accessible interfaces that adapt across devices and scale with ease. I’ve built and led WCAG-compliant platforms, designed complete UI systems, and delivered high-performance applications for enterprise and startup clients alike. Whether you're launching a new product or upgrading an existing one, I bring a full-stack mindset to front-end challenges—bridging business goals with technical execution and unlocking new value through AI.",
    },
    {
      id: "overview",
      title: "Professional Overview",
      icon: FaCube,
      color: "#6366f1",
      content:
        "I'm a senior front-end developer and UI/UX designer with over a decade of experience building scalable, high-impact software. I've managed cross-functional teams and independently designed and coded multimillion-dollar applications from the ground up. Whether it's architecting WCAG-compliant interfaces for government platforms or crafting responsive React/Next.js frameworks for commercial products, I bring a blend of technical depth and creative vision. As the founder of Modern Softworks, I scaled a software and digital marketing business, delivering SEO-optimized, accessible websites and reusable design systems that exceed user expectations. My entrepreneurial background means I understand every facet of a product's lifecycle—strategy, UX research, development, and go-to-market—enabling me to see the bigger picture and deliver value across the organization.",
    },
    {
      id: "vision",
      title: "Future Goals & Vision",
      icon: FaRocket,
      color: "#f59e0b",
      content:
        "My long-term mission is to advance how people experience and interact with technology—not for recognition, but to help build a more thoughtful, equitable, and connected future. I believe AI, XR, and intuitive design can bridge gaps in education, creativity, and opportunity across the globe. I'm passionate about developing interfaces that feel natural, personal, and even joyful—whether it's voice-powered AI assistants, adaptive XR environments, or tools that empower users in ways they never imagined. As a visionary builder with entrepreneurial roots, I’m committed to creating human-centered products that uplift lives, spark innovation, and help shape a more empowered and technologically enriched society.",
    },
  ];

  // Simple content renderer - no special parsing
  const renderContent = (content) => {
    return <p className={styles.contentText}>{content}</p>;
  };

  return (
    <section id="about" className={styles.about} ref={containerRef}>
      <div className="container">
        <motion.div className={styles.mainContainer} style={{ scale, opacity }}>
          {/* Background Effects */}
          <div className={styles.backgroundLayers}>
            {/* Neural Network Background */}
            <div className={styles.neuralNetwork}>
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.neuralNode}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    left: `${10 + (i % 4) * 25}%`,
                    top: `${15 + Math.floor(i / 4) * 30}%`,
                  }}
                />
              ))}
            </div>

            {/* Floating Code Elements */}
            <div className={styles.floatingElements}>
              {["<AI/>", "{XR}", "[UX]", "(())", "::CSS", "/>"].map(
                (code, i) => (
                  <motion.span
                    key={i}
                    className={styles.floatingCode}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, i % 2 === 0 ? 20 : -20, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 10 + i * 2,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "linear",
                    }}
                    style={{
                      left: `${10 + i * 15}%`,
                      top: `${70 + (i % 2) * 20}%`,
                    }}
                  >
                    {code}
                  </motion.span>
                )
              )}
            </div>

            {/* Animated Grid */}
            <motion.div
              className={styles.gridPattern}
              style={{ x: parallaxX, y: parallaxY2 }}
            />

            {/* Holographic Waves */}
            <div className={styles.waveContainer}>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.wave}
                  animate={{
                    y: [0, -50, 0],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 6 + i * 2,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut",
                  }}
                  style={{
                    top: `${30 + i * 20}%`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main Content */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Section Header */}
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 className={styles.sectionTitle}>
                {"About Me".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    className={styles.titleChar}
                    initial={{ opacity: 0, y: 20, rotateZ: -10 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                            rotateZ: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + index * 0.03,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                    whileHover={
                      typeof window !== "undefined" && window.innerWidth > 768
                        ? {
                            scale: 1.2,
                            rotateZ: [-5, 5, -5, 0],
                            color: "var(--color-primary)",
                            transition: { duration: 0.3 },
                          }
                        : {}
                    }
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.div
                className={styles.titleUnderline}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>

            {/* Content Tabs */}
            <motion.div
              className={styles.contentContainer}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Tab Navigation */}
              <div className={styles.tabNavigation}>
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    className={`${styles.tabButton} ${
                      activeSection === index ? styles.active : ""
                    }`}
                    onClick={() => setActiveSection(index)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      "--tab-color": section.color,
                    }}
                  >
                    <section.icon size={20} />
                    <span>{section.title}</span>
                  </motion.button>
                ))}
              </div>

              {/* Content Display - REBUILT */}
              <div className={styles.contentDisplay}>
                {sections.map((section, index) => (
                  <div
                    key={section.id}
                    className={`${styles.sectionContent} ${
                      activeSection === index ? styles.active : ""
                    }`}
                  >
                    {/* Animated Background Particles */}
                    <div className={styles.sectionParticles}>
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={styles.particle}
                          style={{
                            left: `${(i * 4.7 + 10) % 100}%`,
                            top: `${(i * 5.3 + 5) % 100}%`,
                            width: `${2 + (i % 3) * 2}px`,
                            height: `${2 + (i % 3) * 2}px`,
                          }}
                          animate={
                            activeSection === index
                              ? {
                                  y: [-20, 20, -20],
                                  x: [-10, 10, -10],
                                  opacity: [0, 1, 0],
                                }
                              : {
                                  opacity: 0,
                                }
                          }
                          transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>

                    {/* Section Header */}
                    <motion.div
                      className={styles.contentHeader}
                      initial={{ opacity: 0, z: -100 }}
                      animate={
                        activeSection === index
                          ? {
                              opacity: 1,
                              z: 0,
                            }
                          : {
                              opacity: 0,
                              z: -100,
                            }
                      }
                      transition={{
                        duration: 0.8,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                    >
                      <div
                        className={styles.sectionIconLarge}
                        style={{ "--icon-color": section.color }}
                      >
                        <div className={styles.iconBackground} />
                        <div className={styles.xrIconContainer}>
                          {/* New XR Icon Animations */}
                          {index === 0 && (
                            <LightbulbAnimation color={section.color} />
                          )}
                          {index === 1 && (
                            <CubeAnimation color={section.color} />
                          )}
                          {index === 2 && (
                            <RocketAnimation color={section.color} />
                          )}

                          {/* Central Icon with Holographic Effect */}
                          <motion.div
                            className={styles.xrIconCore}
                            animate={
                              activeSection === index
                                ? {
                                    scale: [1, 1.05, 1],
                                    opacity: [0.8, 1, 0.8],
                                  }
                                : {
                                    scale: 1,
                                    opacity: 0.5,
                                  }
                            }
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            <section.icon size={36} />
                          </motion.div>
                        </div>
                      </div>

                      <motion.h3
                        className={styles.contentTitle}
                        style={{ color: section.color }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          activeSection === index
                            ? {
                                opacity: 1,
                                y: 0,
                              }
                            : {
                                opacity: 0,
                                y: 20,
                              }
                        }
                        transition={{
                          duration: 0.6,
                          delay: 0.2,
                        }}
                      >
                        {section.title}
                      </motion.h3>

                      <motion.div
                        className={styles.titleAccent}
                        style={{ backgroundColor: section.color }}
                        initial={{ scaleX: 0 }}
                        animate={
                          activeSection === index
                            ? {
                                scaleX: 1,
                              }
                            : {
                                scaleX: 0,
                              }
                        }
                        transition={{
                          duration: 0.8,
                          delay: 0.3,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>

                    {/* Section Content with Stagger Animation */}
                    <motion.div
                      className={styles.contentBody}
                      initial={{ opacity: 0 }}
                      animate={
                        activeSection === index
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            }
                      }
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={
                          activeSection === index
                            ? {
                                opacity: 1,
                                y: 0,
                              }
                            : {
                                opacity: 0,
                                y: 30,
                              }
                        }
                        transition={{
                          duration: 0.8,
                          delay: 0.5,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      >
                        {renderContent(section.content)}
                      </motion.div>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className={styles.navigationContainer}>
                <NavigationArrow
                  direction="prev"
                  onClick={() => {
                    const prevIndex =
                      activeSection === 0
                        ? sections.length - 1
                        : activeSection - 1;
                    setActiveSection(prevIndex);
                  }}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />

                <NavigationArrow
                  direction="next"
                  onClick={() => {
                    const nextIndex = (activeSection + 1) % sections.length;
                    setActiveSection(nextIndex);
                  }}
                  mouseX={mouseX}
                  mouseY={mouseY}
                />
              </div>

              {/* Progress Indicator */}
              <motion.div className={styles.progressIndicator}>
                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressBar}
                    animate={{
                      width: `${
                        ((activeSection + 1) / sections.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      background: `linear-gradient(90deg, ${
                        sections[activeSection].color
                      }, ${
                        sections[(activeSection + 1) % sections.length].color
                      })`,
                    }}
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Call to Action - Enhanced Infinity Animation */}
            <motion.div
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className={styles.infinityContainer}>
                <svg
                  viewBox="0 0 300 150"
                  width="300"
                  height="150"
                  className={styles.infinitySvg}
                >
                  <defs>
                    <linearGradient
                      id="infinityGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="33%" stopColor="var(--color-secondary)" />
                      <stop offset="66%" stopColor="var(--color-accent)" />
                      <stop offset="100%" stopColor="var(--color-primary)" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* XR Portal Effect - Main Ring */}
                  <defs>
                    <radialGradient id="portalGradient" cx="50%" cy="50%">
                      <stop
                        offset="0%"
                        stopColor="var(--color-accent)"
                        stopOpacity="0.8"
                      />
                      <stop
                        offset="30%"
                        stopColor="var(--color-primary)"
                        stopOpacity="0.6"
                      />
                      <stop
                        offset="60%"
                        stopColor="var(--color-secondary)"
                        stopOpacity="0.4"
                      />
                      <stop
                        offset="100%"
                        stopColor="transparent"
                        stopOpacity="0"
                      />
                    </radialGradient>
                  </defs>

                  {/* Portal Rings */}
                  {[...Array(5)].map((_, i) => (
                    <motion.circle
                      key={`ring-${i}`}
                      cx="150"
                      cy="75"
                      r={25 + i * 12}
                      fill="none"
                      stroke="url(#infinityGradient)"
                      strokeWidth={0.8 - i * 0.1}
                      opacity={0.8 - i * 0.15}
                      initial={{ scale: 0 }}
                      animate={{
                        scale: [0, 1, 1.1, 1],
                        rotate: i % 2 === 0 ? 360 : -360,
                      }}
                      transition={{
                        scale: {
                          duration: 2,
                          times: [0, 0.5, 0.8, 1],
                          repeat: Infinity,
                          delay: i * 0.2,
                        },
                        rotate: {
                          duration: 20 + i * 5,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }}
                    />
                  ))}

                  {/* Holographic Grid Plane */}
                  <g opacity="0.6">
                    {/* Horizontal lines */}
                    {[...Array(9)].map((_, i) => (
                      <motion.line
                        key={`h-${i}`}
                        x1="0"
                        y1={15 + i * 15}
                        x2="300"
                        y2={15 + i * 15}
                        stroke="var(--color-primary)"
                        strokeWidth="0.5"
                        opacity="0.3"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: [0, 1, 1, 0],
                          opacity: [0, 0.3, 0.3, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                    {/* Vertical lines */}
                    {[...Array(15)].map((_, i) => (
                      <motion.line
                        key={`v-${i}`}
                        x1={15 + i * 20}
                        y1="0"
                        x2={15 + i * 20}
                        y2="150"
                        stroke="var(--color-secondary)"
                        strokeWidth="0.5"
                        opacity="0.3"
                        initial={{ scaleY: 0 }}
                        animate={{
                          scaleY: [0, 1, 1, 0],
                          opacity: [0, 0.3, 0.3, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: 0.5 + i * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </g>

                  {/* Data Stream Particles */}
                  {[...Array(20)].map((_, i) => {
                    const angle = (i * 18 * Math.PI) / 180;
                    const radius = 40 + (i % 3) * 15;

                    return (
                      <motion.rect
                        key={`data-${i}`}
                        width="3"
                        height="12"
                        fill={
                          i < 7
                            ? "var(--color-primary)"
                            : i < 14
                            ? "var(--color-secondary)"
                            : "var(--color-accent)"
                        }
                        opacity="0.8"
                        initial={{
                          x: 150,
                          y: 75,
                        }}
                        animate={{
                          x: 150 + Math.cos(angle) * radius,
                          y: 75 + Math.sin(angle) * radius,
                          rotate: (angle * 180) / Math.PI + 90,
                          opacity: [0, 0.8, 0],
                          scale: [0.5, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}

                  {/* Central XR Core */}
                  <motion.g>
                    {/* Outer glow */}
                    <motion.circle
                      cx="150"
                      cy="75"
                      r="30"
                      fill="url(#portalGradient)"
                      opacity="0.6"
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />

                    {/* Inner core */}
                    <motion.circle
                      cx="150"
                      cy="75"
                      r="12"
                      fill="white"
                      filter="url(#glow)"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.g>

                  {/* Dimensional Waves */}
                  {[...Array(3)].map((_, i) => (
                    <motion.circle
                      key={`wave-${i}`}
                      cx="150"
                      cy="75"
                      r="15"
                      fill="none"
                      stroke="url(#infinityGradient)"
                      strokeWidth="2"
                      opacity="0"
                      animate={{
                        r: [15, 75, 90],
                        opacity: [0, 0.5, 0],
                        strokeWidth: [2, 1, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 1,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </svg>

                {/* Holographic effect layers */}
                <motion.div
                  className={styles.infinityHolo}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Additional dimensional effect */}
                <motion.div
                  className={styles.infinityDimension}
                  animate={{
                    rotateY: [0, 180, 360],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <p className={styles.ctaText}>
                Let's build the future of human-computer interaction
              </p>
            </motion.div>
          </motion.div>

          {/* Decorative Elements */}
          <div className={styles.decorativeOrbs}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.orb}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut",
                }}
                style={{
                  width: `${200 + i * 100}px`,
                  height: `${200 + i * 100}px`,
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Navigation Arrow Component
const NavigationArrow = ({ direction, onClick, mouseX, mouseY }) => {
  const buttonRef = useRef(null);
  const cursorInteraction = useCursorInteraction();
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for gravity effect
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Calculate gravity and tilt effects
  useEffect(() => {
    if (!buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = mouseX.get() - centerX;
      const distanceY = mouseY.get() - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      const maxDistance = 300;
      const strength = Math.max(0, 1 - distance / maxDistance);
      const pullStrength = isHovered ? strength * 0.3 : strength * 0.1;

      buttonX.set(distanceX * pullStrength);
      buttonY.set(distanceY * pullStrength);

      const tiltStrength = isHovered ? strength * 0.5 : strength * 0.2;
      rotateY.set((distanceX / maxDistance) * 20 * tiltStrength);
      rotateX.set(-(distanceY / maxDistance) * 15 * tiltStrength);
    };

    const unsubscribeX = mouseX.on("change", updatePosition);
    const unsubscribeY = mouseY.on("change", updatePosition);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, buttonX, buttonY, rotateX, rotateY, isHovered]);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(buttonX, springConfig);
  const y = useSpring(buttonY, springConfig);
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  return (
    <motion.button
      ref={buttonRef}
      className={`${styles.navArrow} ${styles[direction]}`}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        cursorInteraction.onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        cursorInteraction.onMouseLeave();
      }}
      style={{
        x,
        y,
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        scale: 1.1,
        z: 20,
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={styles.arrowIcon}
        initial={{ x: 0 }}
        animate={
          isHovered
            ? {
                x: direction === "next" ? [0, 3, 0] : [0, -3, 0],
              }
            : { x: 0 }
        }
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        {direction === "prev" ? <FaChevronLeft /> : <FaChevronRight />}
      </motion.div>

      <motion.div
        className={styles.arrowGlow}
        animate={
          isHovered
            ? {
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.2, 1],
              }
            : {
                opacity: 0,
              }
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.button>
  );
};

// NEW SPECTACULAR ICON ANIMATIONS

const LightbulbAnimation = ({ color }) => (
  <>
    {/* Neural Synapse Network */}
    <div className={styles.synapseNetwork}>
      {/* Central Core */}
      <motion.div
        className={styles.synapseCore}
        style={{
          position: "absolute",
          width: "12px",
          height: "12px",
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          borderRadius: "50%",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: `0 0 20px ${color}`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Synaptic Connections */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const endX = Math.cos(angle) * 40;
        const endY = Math.sin(angle) * 40;

        return (
          <React.Fragment key={i}>
            {/* Connection Lines */}
            <motion.svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2="50%"
                y2="50%"
                stroke={color}
                strokeWidth="1"
                opacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{
                  x2: `${50 + endX}%`,
                  y2: `${50 + endY}%`,
                  pathLength: [0, 1, 0.8, 0],
                  opacity: [0, 0.6, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
              />
            </motion.svg>

            {/* Synaptic Terminals */}
            <motion.div
              style={{
                position: "absolute",
                width: "6px",
                height: "6px",
                background: color,
                borderRadius: "50%",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${endX}px, ${endY}px)`,
              }}
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 0.8, 0],
                opacity: [0, 1, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.3 + i * 0.15,
                ease: "easeOut",
              }}
            />

            {/* Electrical Impulses */}
            <motion.div
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                background: `radial-gradient(circle, white 0%, ${color} 50%, transparent 100%)`,
                borderRadius: "50%",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                x: [0, endX],
                y: [0, endY],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 0.5 + i * 0.15,
                ease: "linear",
              }}
            />
          </React.Fragment>
        );
      })}
    </div>

    {/* Idea Particles Burst */}
    <div className={styles.ideaBurst}>
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const distance = 25 + (i % 3) * 10;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={`burst-${i}`}
            style={{
              position: "absolute",
              width: "3px",
              height: "3px",
              background: i % 2 === 0 ? color : "white",
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              x: [0, x, x * 1.5],
              y: [0, y, y * 1.5],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: (i % 4) * 0.6,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>

    {/* Rotating Knowledge Rings */}
    {[0, 1, 2].map((ring) => (
      <motion.div
        key={`ring-${ring}`}
        style={{
          position: "absolute",
          inset: `${20 - ring * 8}%`,
          border: `1px solid ${color}${Math.floor(60 - ring * 20).toString(
            16
          )}`,
          borderRadius: "50%",
          borderStyle: ring === 1 ? "dashed" : "solid",
        }}
        animate={{
          rotate: ring % 2 === 0 ? 360 : -360,
        }}
        transition={{
          duration: 10 + ring * 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </>
);

const CubeAnimation = ({ color }) => (
  <>
    {/* Holographic Grid Space */}
    <div className={styles.gridSpace}>
      {/* 3D Grid Lines */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Perspective Grid */}
        <g opacity="0.3">
          {/* Horizontal Lines with Perspective */}
          {[...Array(7)].map((_, i) => {
            const y = 20 + i * 10;
            const perspective = 1 - i * 0.1;

            return (
              <motion.line
                key={`h-${i}`}
                x1={`${50 - 40 * perspective}%`}
                y1={`${y}%`}
                x2={`${50 + 40 * perspective}%`}
                y2={`${y}%`}
                stroke={color}
                strokeWidth="0.5"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: [0, 1, 1, 0],
                  opacity: [0, 0.5, 0.5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Vertical Lines Converging */}
          {[-2, -1, 0, 1, 2].map((offset, i) => (
            <motion.line
              key={`v-${i}`}
              x1={`${50 + offset * 15}%`}
              y1="20%"
              x2={`${50 + offset * 5}%`}
              y2="80%"
              stroke={color}
              strokeWidth="0.5"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: [0, 1, 1, 0],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 0.5 + i * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>
    </div>

    {/* Floating Data Layers */}
    <div className={styles.dataLayers}>
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          style={{
            position: "absolute",
            inset: `${30 - layer * 8}%`,
            border: `1px solid ${color}`,
            borderRadius: "4px",
            background: `${color}05`,
            transform: "rotateX(45deg) rotateY(45deg)",
            transformStyle: "preserve-3d",
          }}
          animate={{
            rotateY: [45 + layer * 120, 405 + layer * 120],
            z: [-layer * 20, -layer * 30, -layer * 20],
            opacity: [0.2 + layer * 0.1, 0.5 + layer * 0.1, 0.2 + layer * 0.1],
          }}
          transition={{
            duration: 8 + layer * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Layer Content Dots */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: "3px",
                height: "3px",
                background: color,
                borderRadius: "50%",
                left: `${25 + (i % 2) * 50}%`,
                top: `${25 + Math.floor(i / 2) * 50}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: layer * 0.3 + i * 0.2,
              }}
            />
          ))}
        </motion.div>
      ))}
    </div>

    {/* Quantum Code Streams */}
    <div className={styles.codeStreams}>
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60 * Math.PI) / 180;
        const startR = 15;
        const endR = 45;

        return (
          <svg
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <motion.line
              x1={`${50 + Math.cos(angle) * startR}%`}
              y1={`${50 + Math.sin(angle) * startR}%`}
              x2={`${50 + Math.cos(angle) * startR}%`}
              y2={`${50 + Math.sin(angle) * startR}%`}
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{
                x2: `${50 + Math.cos(angle) * endR}%`,
                y2: `${50 + Math.sin(angle) * endR}%`,
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            />

            {/* Binary Data Points */}
            {[0.3, 0.6, 0.9].map((distance, j) => {
              const x =
                Math.round(
                  (50 +
                    Math.cos(angle) * (startR + (endR - startR) * distance)) *
                    100
                ) / 100;
              const y =
                Math.round(
                  (50 +
                    Math.sin(angle) * (startR + (endR - startR) * distance)) *
                    100
                ) / 100;

              return (
                <motion.text
                  key={j}
                  x={`${x}%`}
                  y={`${y}%`}
                  fill={color}
                  fontSize="8"
                  textAnchor="middle"
                  opacity="0"
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3 + j * 0.2,
                  }}
                >
                  {j % 2 === 0 ? "1" : "0"}
                </motion.text>
              );
            })}
          </svg>
        );
      })}
    </div>

    {/* Central Processing Core */}
    <motion.div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Orbiting Elements */}
      {[0, 120, 240].map((rotation, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
          animate={{
            rotate: [rotation, rotation + 360],
          }}
          transition={{
            duration: 6 + i * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              background: color,
              borderRadius: "50%",
              left: "50%",
              top: "-10px",
              marginLeft: "-2px",
              boxShadow: `0 0 10px ${color}`,
            }}
          />
        </motion.div>
      ))}
    </motion.div>

    {/* Holographic Projections */}
    {[...Array(4)].map((_, i) => {
      const angle = ((i * 90 + 45) * Math.PI) / 180;
      const distance = 35;

      return (
        <motion.div
          key={`holo-${i}`}
          style={{
            position: "absolute",
            width: "15px",
            height: "15px",
            left: `${50 + Math.cos(angle) * distance}%`,
            top: `${50 + Math.sin(angle) * distance}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        >
          {/* Mini cube projection */}
          <div
            style={{
              width: "100%",
              height: "100%",
              border: `1px solid ${color}`,
              background: `${color}10`,
              transform: "rotateX(45deg) rotateY(45deg)",
            }}
          />
        </motion.div>
      );
    })}
  </>
);

const UserAnimation = ({ color }) => (
  <>
    {/* Background Neural Network */}
    <div className={styles.neuralBackground}>
      {/* Network Nodes */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const radius = 35;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;

        return (
          <React.Fragment key={i}>
            {/* Connection Lines to Center */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                stroke={color}
                strokeWidth="0.5"
                opacity="0.2"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            </svg>

            {/* Network Nodes */}
            <motion.div
              style={{
                position: "absolute",
                width: "4px",
                height: "4px",
                background: color,
                borderRadius: "50%",
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          </React.Fragment>
        );
      })}

      {/* Data Flow Paths */}
      {[0, 60, 120, 180, 240, 300].map((startAngle, i) => {
        const endAngle = startAngle + 120;
        const startRad = (startAngle * Math.PI) / 180;
        const endRad = (endAngle * Math.PI) / 180;
        const r = 35;

        return (
          <svg
            key={`flow-${i}`}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <motion.path
              d={`M ${50 + Math.cos(startRad) * r} ${
                50 + Math.sin(startRad) * r
              } 
                  A ${r} ${r} 0 0 1 ${50 + Math.cos(endRad) * r} ${
                50 + Math.sin(endRad) * r
              }`}
              fill="none"
              stroke={color}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          </svg>
        );
      })}
    </div>

    {/* Scanning Effect */}
    <motion.div
      style={{
        position: "absolute",
        width: "100%",
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        left: 0,
        top: 0,
      }}
      animate={{
        top: ["0%", "100%"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      }}
    />

    {/* Recognition Points */}
    {[
      { x: -15, y: -15 },
      { x: 15, y: -15 },
      { x: 0, y: 0 },
      { x: -10, y: 10 },
      { x: 10, y: 10 },
    ].map((point, i) => (
      <motion.div
        key={`recognition-${i}`}
        style={{
          position: "absolute",
          width: "3px",
          height: "3px",
          background: color,
          borderRadius: "50%",
          left: "50%",
          top: "50%",
          marginLeft: `${point.x}px`,
          marginTop: `${point.y}px`,
        }}
        initial={{ scale: 0 }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: i * 0.2,
          ease: "easeOut",
        }}
      />
    ))}
  </>
);

const RocketAnimation = ({ color }) => (
  <>
    {/* Space Background with Stars */}
    <div className={styles.spaceBackground}>
      {/* Static Stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`star-${i}`}
          style={{
            position: "absolute",
            width: i % 3 === 0 ? "2px" : "1px",
            height: i % 3 === 0 ? "2px" : "1px",
            background: "white",
            borderRadius: "50%",
            left: `${(i * 37) % 100}%`,
            top: `${(i * 43) % 100}%`,
            opacity: 0.3 + (i % 5) * 0.1,
          }}
        />
      ))}

      {/* Moving Stars/Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`moving-star-${i}`}
          style={{
            position: "absolute",
            width: "1px",
            height: "8px",
            background: `linear-gradient(180deg, transparent, white, transparent)`,
            left: `${10 + i * 12}%`,
            top: "-10px",
          }}
          animate={{
            y: [0, 140],
          }}
          transition={{
            duration: 1 + (i % 3) * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear",
          }}
        />
      ))}
    </div>

    {/* Motion Effect on Icon */}
    <motion.div
      className={styles.rocketMotion}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      animate={{
        y: [-3, 3, -3],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Exhaust Flames Behind Icon */}
      <div className={styles.exhaustBehind}>
        {/* Primary Flame */}
        <motion.div
          style={{
            position: "absolute",
            width: "20px",
            height: "30px",
            background: `linear-gradient(180deg, ${color}80, ${color}40, transparent)`,
            borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
            filter: "blur(3px)",
            left: "50%",
            top: "55%",
            marginLeft: "-10px",
          }}
          animate={{
            height: ["25px", "35px", "25px"],
            opacity: [0.6, 0.9, 0.6],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary White Core */}
        <motion.div
          style={{
            position: "absolute",
            width: "10px",
            height: "20px",
            background: `linear-gradient(180deg, white, ${color}60, transparent)`,
            borderRadius: "50%",
            left: "50%",
            top: "60%",
            marginLeft: "-5px",
            filter: "blur(2px)",
          }}
          animate={{
            height: ["15px", "25px", "15px"],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Exhaust Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: "absolute",
              width: "3px",
              height: "3px",
              background:
                i % 3 === 0 ? "white" : i % 3 === 1 ? color : `${color}60`,
              borderRadius: "50%",
              left: "50%",
              top: "65%",
              marginLeft: `${((i % 5) - 2) * 6}px`,
            }}
            animate={{
              y: [0, 50 + i * 2],
              x: [((i % 5) - 2) * 2, ((i % 5) - 2) * 20],
              opacity: [1, 0],
              scale: [1, 0.2],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </motion.div>

    {/* Speed Lines */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={`speed-${i}`}
        style={{
          position: "absolute",
          width: "1px",
          height: "30px",
          background: `linear-gradient(180deg, transparent, ${color}40, transparent)`,
          left: `${25 + i * 10}%`,
          top: "10%",
        }}
        animate={{
          y: [-30, 80],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "linear",
        }}
      />
    ))}

    {/* Orbit Trail */}
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: 0.3,
      }}
    >
      <motion.ellipse
        cx="50%"
        cy="50%"
        rx="40"
        ry="20"
        fill="none"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="2 4"
        transform="rotate(-20 50 50)"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [0, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </svg>

    {/* Thrust Glow Effect */}
    <motion.div
      style={{
        position: "absolute",
        width: "40px",
        height: "40px",
        background: `radial-gradient(circle, ${color}40, transparent 70%)`,
        left: "50%",
        top: "60%",
        marginLeft: "-20px",
        filter: "blur(10px)",
      }}
      animate={{
        scale: [0.8, 1.2, 0.8],
        opacity: [0.4, 0.7, 0.4],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </>
);

export default About;
