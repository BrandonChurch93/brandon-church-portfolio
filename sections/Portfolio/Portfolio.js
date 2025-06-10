"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useXRInteraction } from "@/components/XRInteractionProvider";
import styles from "./portfolio.module.css";
import { FaCode, FaBrain, FaVrCardboard } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { SiReact } from "react-icons/si";

const Portfolio = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const { mouseX, mouseY } = useXRInteraction();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Advanced parallax and transforms
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

  // What I'm building
  const projectTypes = [
    {
      icon: FaVrCardboard,
      title: "XR Experiences",
      color: "#06b6d4",
    },
    {
      icon: FaBrain,
      title: "AI User Interfaces",
      color: "#6366f1",
    },
    {
      icon: SiReact,
      title: "React Applications",
      color: "#f59e0b",
    },
  ];

  // Rotate through project types
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projectTypes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" className={styles.portfolio} ref={containerRef}>
      <div className="container">
        <motion.div className={styles.mainContainer} style={{ scale, opacity }}>
          {/* Enhanced Background Layers */}
          <div className={styles.backgroundLayers}>
            {/* Animated Grid */}
            <motion.div
              className={styles.gridPattern}
              style={{ x: parallaxX, y: parallaxY2 }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Dynamic Mesh Background */}
            <svg className={styles.meshBackground} viewBox="0 0 1200 800">
              <defs>
                <linearGradient
                  id="meshGradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1">
                    <animate
                      attributeName="stop-color"
                      values="#6366f1;#06b6d4;#f59e0b;#6366f1"
                      dur="10s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05">
                    <animate
                      attributeName="stop-color"
                      values="#06b6d4;#f59e0b;#6366f1;#06b6d4"
                      dur="10s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
              </defs>
              {[...Array(6)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M0,${400 + i * 50} Q${300 + i * 50},${300 - i * 30} ${
                    600 + i * 30
                  },${400 + i * 40} T1200,${400 + i * 50}`}
                  fill="none"
                  stroke="url(#meshGradient1)"
                  strokeWidth="2"
                  opacity="0.3"
                  animate={{
                    d: [
                      `M0,${400 + i * 50} Q${300 + i * 50},${300 - i * 30} ${
                        600 + i * 30
                      },${400 + i * 40} T1200,${400 + i * 50}`,
                      `M0,${400 + i * 50} Q${300 + i * 50},${500 - i * 30} ${
                        600 + i * 30
                      },${300 + i * 40} T1200,${400 + i * 50}`,
                      `M0,${400 + i * 50} Q${300 + i * 50},${300 - i * 30} ${
                        600 + i * 30
                      },${400 + i * 40} T1200,${400 + i * 50}`,
                    ],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* Code Particles */}
            <div className={styles.codeParticles}>
              {[
                "<>",
                "{}",
                "[]",
                "()",
                "/>",
                "&&",
                "::",
                "===",
                "!==",
                "=>",
              ].map((code, i) => (
                <motion.span
                  key={i}
                  className={styles.codeSymbol}
                  animate={{
                    y: [-100, -800],
                    x: [0, i % 2 === 0 ? 150 : -150],
                    opacity: [0, 1, 1, 0],
                    rotate: [0, i % 2 === 0 ? 180 : -180],
                  }}
                  transition={{
                    duration: 10 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "linear",
                  }}
                  style={{
                    left: `${5 + ((i * 10) % 90)}%`,
                    fontSize: `${16 + (i % 3) * 6}px`,
                    color:
                      i % 3 === 0
                        ? "var(--color-primary)"
                        : i % 3 === 1
                        ? "var(--color-secondary)"
                        : "var(--color-accent)",
                  }}
                >
                  {code}
                </motion.span>
              ))}
            </div>

            {/* Orbital Rings */}
            <div className={styles.orbitalSystem}>
              <motion.div
                className={styles.orbit1}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                className={styles.orbit2}
                animate={{
                  rotate: -360,
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  rotate: { duration: 40, repeat: Infinity, ease: "linear" },
                  scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.div
                className={styles.orbit3}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 50, repeat: Infinity, ease: "linear" },
                  scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </div>

            {/* Energy Field */}
            <div className={styles.energyField}>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.energyWave}
                  animate={{
                    scale: [0.8, 1.5, 0.8],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.3,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            {/* Geometric Shapes */}
            <div className={styles.geometricShapes}>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.floatingShape}
                  animate={{
                    y: [0, -30, 0],
                    x: [0, i % 2 === 0 ? 20 : -20, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 6 + i * 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${15 + (i % 3) * 35}%`,
                    top: `${10 + (i % 2) * 40}%`,
                    "--shape-size": `${30 + (i % 3) * 15}px`,
                  }}
                >
                  <div className={styles[`shape${i % 4}`]} />
                </motion.div>
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
                {"Portfolio".split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, rotateX: -90 }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            rotateX: 0,
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.6,
                      delay: 0.1 + index * 0.03,
                      ease: [0.6, -0.05, 0.01, 0.99],
                    }}
                    className={styles.titleLetter}
                    whileHover={{
                      y: -10,
                      color: "var(--color-primary)",
                      textShadow: "0 10px 20px rgba(99, 102, 241, 0.3)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.h2>
              <div className={styles.sectionUnderline}>
                <motion.div
                  className={styles.underlineProgress}
                  initial={{ width: 0, opacity: 0 }}
                  animate={isInView ? { width: "100%", opacity: 1 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Interactive Core Display */}
            <motion.div
              className={styles.coreDisplay}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Central Orb */}
              <motion.div
                className={styles.centralOrb}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.15,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
              >
                <motion.div
                  className={styles.orbInner}
                  animate={{
                    background: [
                      "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1), transparent 70%)",
                      "radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.1), transparent 70%)",
                      "radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.1), transparent 70%)",
                      "radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.1), transparent 70%)",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    boxShadow: "inset 0 0 40px rgba(99, 102, 241, 0.3)",
                  }}
                >
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    whileHover={{
                      scale: 1.2,
                      filter: "drop-shadow(0 0 20px rgba(99, 102, 241, 0.6))",
                    }}
                  >
                    <FaCode size={40} />
                  </motion.div>
                </motion.div>

                {/* Multiple Rotating Rings */}
                <motion.div
                  className={styles.orbRing}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.1,
                    borderColor: "rgba(99, 102, 241, 0.8)",
                  }}
                />
                <motion.div
                  className={styles.orbRing2}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.2,
                    opacity: 0.8,
                  }}
                />
                <motion.div
                  className={styles.orbRing3}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  whileHover={{
                    scale: 1.3,
                    opacity: 0.6,
                  }}
                />

                {/* Hover Glow Effect */}
                <motion.div
                  className={styles.orbGlow}
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.5,
                    transition: { duration: 0.3 },
                  }}
                />
              </motion.div>

              {/* Project Type Display */}
              <motion.div className={styles.projectTypeDisplay}>
                <p className={styles.currentlyBuilding}>Currently Building</p>
                <motion.div className={styles.typeRotator}>
                  {projectTypes.map((type, index) => (
                    <motion.div
                      key={index}
                      className={styles.projectType}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        y:
                          activeIndex === index
                            ? 0
                            : index < activeIndex
                            ? -40
                            : 40,
                        scale: activeIndex === index ? 1 : 0.7,
                        filter:
                          activeIndex === index ? "blur(0px)" : "blur(3px)",
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.6, -0.05, 0.01, 0.99],
                      }}
                      style={{
                        color: type.color,
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: activeIndex === index ? [0, 360] : 0,
                        }}
                        transition={{ duration: 0.8 }}
                      >
                        <type.icon size={30} />
                      </motion.div>
                      <h3>{type.title}</h3>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.div
              className={styles.description}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className={styles.mainDescription}>
                Crafting immersive digital experiences at the intersection of
                extended reality and artificial intelligence.
              </p>
              <p className={styles.subDescription}>
                My upcoming portfolio will showcase cutting-edge XR interfaces,
                AI-powered user experiences, and innovative React applications
                that push the boundaries of web technology.
              </p>
            </motion.div>

            {/* Tech Stack Preview */}
            <motion.div
              className={styles.techStackPreview}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h4>Technologies in Use</h4>
              <div className={styles.techGrid}>
                <span className={styles.techItem}>React</span>
                <span className={styles.techItem}>Next.js</span>
                <span className={styles.techItem}>LLM Integration</span>
                <span className={styles.techItem}>Three.js</span>
                <span className={styles.techItem}>WebXR</span>
                <span className={styles.techItem}>Framer Motion</span>
                <span className={styles.techItem}>AI Tooling</span>
                <span className={styles.techItem}>Tailwind CSS</span>
              </div>
            </motion.div>

            {/* Coming Soon Message */}
            <motion.div
              className={styles.comingSoon}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className={styles.statusIndicator}>
                <span className={styles.statusDot} />
                <span>Projects launching Q3 2025</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Abstract Visualization */}
          <div className={styles.abstractViz}>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.vizElement}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${50 - i * 10}%`,
                  top: `${50 - i * 10}%`,
                }}
              />
            ))}
          </div>

          {/* Ambient Particles */}
          <div className={styles.particleSystem}>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className={styles.ambientParticle}
                animate={{
                  y: [-100, -500],
                  x: [0, i % 2 === 0 ? 50 : -50],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 5 + (i % 5),
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
                style={{
                  left: `${(i * 3.3) % 100}%`,
                  bottom: "-50px",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
