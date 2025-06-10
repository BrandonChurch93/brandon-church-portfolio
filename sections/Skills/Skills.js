"use client";

import { useState, useRef, memo, useMemo } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaFigma,
  FaCss3Alt,
  FaAccessibleIcon,
  FaPython,
  FaGithub,
  FaHtml5,
  FaCube,
  FaBrain,
  FaChartBar,
  FaUnity,
  FaRobot,
  FaSearch,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiThreedotjs,
  SiTensorflow,
  SiWebgl,
  SiJavascript,
  SiVercel,
  SiPwa,
  SiOpenai,
} from "react-icons/si";
import {
  BiCodeAlt,
  BiSearchAlt,
  BiNetworkChart,
  BiPalette,
  BiData,
  BiBookOpen,
  BiPencil,
  BiCog,
  BiGlobe,
  BiRocket,
  BiChart,
  BiMessageSquareDetail,
  BiUserCheck,
} from "react-icons/bi";
import { MdEngineering, MdIntegrationInstructions } from "react-icons/md";
import {
  useXRInteraction,
  useCursorInteraction,
} from "@/components/XRInteractionProvider";
import { useChatbot } from "@/components/Chatbot/useChatbot";
import styles from "./skills.module.css";

// Skills data structure
const skillsData = [
  {
    id: "frontend",
    title: "Front-End Development",
    description: "Building performant web applications",
    skills: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript ES6+", icon: SiJavascript, color: "#F7DF1E" },
      { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Node.js", icon: FaNodeJs, color: "#339933" },
      { name: "Git & GitHub", icon: FaGithub, color: "#FFFFFF" },
      { name: "SEO Optimization", icon: BiSearchAlt, color: "#4285F4" },
      { name: "CI/CD", icon: BiCog, color: "#FF6B6B" },
      { name: "PWA Development", icon: SiPwa, color: "#5A0FC8" },
      { name: "RESTful APIs", icon: BiNetworkChart, color: "#FF6C5F" },
      { name: "Performance Optimization", icon: BiRocket, color: "#00C49F" },
    ],
  },
  {
    id: "uiux",
    title: "UI/UX Design & Research",
    description: "Creating intuitive user experiences",
    skills: [
      { name: "UI/UX Design", icon: BiPalette, color: "#FF6B6B" },
      { name: "Figma", icon: FaFigma, color: "#F24E1E" },
      { name: "Design Systems", icon: BiCodeAlt, color: "#7B61FF" },
      { name: "WCAG Accessibility", icon: FaAccessibleIcon, color: "#0084FF" },
      { name: "User Research", icon: BiBookOpen, color: "#FF6B9D" },
      { name: "Wireframing", icon: BiPencil, color: "#C44569" },
      { name: "UX Writing", icon: BiPencil, color: "#786FA6" },
      {
        name: "Information Architecture",
        icon: BiNetworkChart,
        color: "#4ECDC4",
      },
      {
        name: "Accessibility Testing",
        icon: FaAccessibleIcon,
        color: "#95E1D3",
      },
      { name: "Data Visualization", icon: BiChart, color: "#F38181" },
    ],
  },
  {
    id: "xr",
    title: "Immersive & XR Development",
    description: "Building next-gen spatial interfaces",
    skills: [
      { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
      { name: "Unity", icon: FaUnity, color: "#FFFFFF" },
      { name: "WebXR", icon: FaCube, color: "#EB4C54" },
      { name: "XR UI/UX", icon: BiGlobe, color: "#8E44AD" },
      { name: "Spatial Design", icon: FaCube, color: "#3498DB" },
      { name: "3D Asset Workflow", icon: FaCube, color: "#E74C3C" },
      { name: "WebGL", icon: SiWebgl, color: "#990000" },
      { name: "Multimodal Input", icon: BiNetworkChart, color: "#2ECC71" },
    ],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    description: "Integrating intelligent systems",
    skills: [
      { name: "Prompt Engineering", icon: MdEngineering, color: "#10B981" },
      {
        name: "LLM Integration",
        icon: MdIntegrationInstructions,
        color: "#8B5CF6",
      },
      { name: "AI UX Design", icon: BiUserCheck, color: "#EC4899" },
      { name: "TensorFlow.js", icon: SiTensorflow, color: "#FF6F00" },
      { name: "Ethical AI", icon: FaBrain, color: "#06B6D4" },
      { name: "Semantic Search", icon: FaSearch, color: "#F59E0B" },
      { name: "Data-Driven UI", icon: FaDatabase, color: "#3B82F6" },
    ],
  },
];

const Skills = () => {
  const containerRef = useRef(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const { isTouch } = useXRInteraction();
  const cursorInteraction = useCursorInteraction();
  const { openChatbot } = useChatbot();

  // Memoize static data
  const memoizedSkillsData = useMemo(() => skillsData, []);

  return (
    <section id="skills" className={styles.skillsSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
          className={styles.header}
        >
          <div
            style={{
              position: "relative",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                margin: 0,
                position: "relative",
                display: "inline-block",
              }}
            >
              <motion.span
                style={{
                  display: "inline-block",
                  color: "#ffffff",
                  position: "relative",
                  textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                }}
                animate={{
                  textShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 40px rgba(255, 255, 255, 0.5)",
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Skills
              </motion.span>{" "}
              <span
                style={{
                  display: "inline-block",
                  position: "relative",
                }}
              >
                {/* Matrix text with cleaner gradient */}
                <motion.span
                  style={{
                    background:
                      "linear-gradient(90deg, #6366f1 0%, #06b6d4 50%, #6366f1 100%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                    position: "relative",
                    textShadow: "none",
                    filter: "none",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "200% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Matrix
                </motion.span>

                {/* Subtle holographic line */}
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background:
                      "linear-gradient(90deg, transparent, #06b6d4, transparent)",
                    borderRadius: "9999px",
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* XR dots */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: -8,
                    right: -20,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#06b6d4",
                    boxShadow: "0 0 10px #06b6d4",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                />
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    left: -20,
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#6366f1",
                    boxShadow: "0 0 10px #6366f1",
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 1,
                  }}
                />
              </span>
            </motion.h2>
          </div>
          <p className={styles.sectionSubtitle}>
            Comprehensive toolkit for building modern digital experiences
          </p>
        </motion.div>

        <div className={styles.skillsGrid}>
          {memoizedSkillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              className={styles.categoryCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.1,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              whileHover={{
                y: -12,
                z: 60,
                rotateX: -2,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                },
              }}
              style={{
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
                position: "relative",
                "--card-accent":
                  categoryIndex === 0
                    ? "#818cf8"
                    : categoryIndex === 1
                    ? "#22d3ee"
                    : categoryIndex === 2
                    ? "#fbbf24"
                    : "#f472b6",
              }}
            >
              {/* Visual Indicator - Inline positioned */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "80px",
                  height: "80px",
                  zIndex: 20,
                  pointerEvents: "none",
                }}
              >
                {categoryIndex === 0 && <FrontEndVisual />}
                {categoryIndex === 1 && <UIUXVisual />}
                {categoryIndex === 2 && <XRVisual />}
                {categoryIndex === 3 && <AIVisual />}
              </div>

              {/* Category Header */}
              <div className={styles.categoryHeader}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>
                  {category.description}
                </p>
              </div>

              {/* Skills List */}
              <div className={styles.skillsList}>
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem
                    key={skill.name}
                    skill={skill}
                    categoryId={category.id}
                    index={skillIndex}
                    isHovered={hoveredSkill === `${category.id}-${skill.name}`}
                    onHover={(hovered) =>
                      setHoveredSkill(
                        hovered ? `${category.id}-${skill.name}` : null
                      )
                    }
                    isTouch={isTouch}
                  />
                ))}
              </div>

              {/* Visual enhancements */}
              <div className={styles.categoryGrid} />
              <div className={styles.categoryGlow} />
              <div className={styles.categoryParticles} />
            </motion.div>
          ))}
        </div>

        {/* Background Mesh Effect */}
        <div className={styles.backgroundMesh}>
          <svg width="100%" height="100%" className={styles.meshSvg}>
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="1"
                  fill="var(--color-primary)"
                  opacity="0.2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* AI Assistant CTA */}
        <motion.div
          className={styles.aiAssistantCTA}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          <div className={styles.aiAssistantContent}>
            <div className={styles.aiIcon}>
              <FaBrain />
            </div>
            <div className={styles.aiText}>
              <h3 className={styles.aiTitle}>
                Have specific questions about my skills?
              </h3>
              <p className={styles.aiDescription}>
                Brandon's AI assistant can provide detailed insights about my
                experience, technical expertise, and project capabilities.
              </p>
            </div>
            <motion.button
              className={styles.aiButton}
              onClick={openChatbot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...cursorInteraction}
            >
              <span>Ask AI Assistant</span>
              <BiRocket />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Memoized Skill Item Component for performance
const SkillItem = memo(
  ({ skill, categoryId, index, isHovered, onHover, isTouch }) => {
    const skillRef = useRef(null);
    const cursorInteraction = useCursorInteraction();

    // Disable 3D tilt for performance
    const handleMouseEnter = () => {
      onHover(true);
      cursorInteraction.onMouseEnter();
    };

    const handleMouseLeave = () => {
      onHover(false);
      cursorInteraction.onMouseLeave();
    };

    return (
      <motion.div
        ref={skillRef}
        className={styles.skillItem}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.4,
          delay: index * 0.03,
          ease: [0.6, -0.05, 0.01, 0.99],
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className={styles.skillContent}
          style={{
            "--skill-color": skill.color,
          }}
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className={styles.iconWrapper}>
            <skill.icon className={styles.skillIcon} />
            <div className={styles.iconGlow} />
          </div>
          <span className={styles.skillName}>{skill.name}</span>
        </motion.div>
      </motion.div>
    );
  }
);

export default Skills;

// Enhanced Visual Indicator Components
const FrontEndVisual = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: 80,
      height: 80,
    }}
  >
    {/* Terminal window effect */}
    <motion.div
      style={{
        position: "absolute",
        inset: 10,
        background: "rgba(15, 15, 20, 0.8)",
        borderRadius: "8px",
        border: "1px solid rgba(129, 140, 248, 0.3)",
        backdropFilter: "blur(10px)",
        overflow: "hidden",
      }}
      animate={{
        boxShadow: [
          "0 0 20px rgba(129, 140, 248, 0.2)",
          "0 0 40px rgba(129, 140, 248, 0.4)",
          "0 0 20px rgba(129, 140, 248, 0.2)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: "rgba(129, 140, 248, 0.2)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 4,
          gap: 2,
        }}
      >
        <div
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#ff5f57",
          }}
        />
        <div
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#ffbd2e",
          }}
        />
        <div
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#28ca42",
          }}
        />
      </div>

      {/* Code lines animation */}
      <div style={{ padding: "12px 8px 8px 8px" }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            style={{
              height: 3,
              background: `linear-gradient(90deg, #818cf8 ${
                20 + i * 15
              }%, transparent ${40 + i * 15}%)`,
              marginBottom: 4,
              borderRadius: 1,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: [-10, 0, 0, 10],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              times: [0, 0.2, 0.8, 1],
            }}
          />
        ))}
      </div>
    </motion.div>

    {/* Floating tech icons */}
    {[
      { icon: "⚛", color: "#61DAFB", delay: 0 }, // React
      { icon: "▲", color: "#000", delay: 0.5 }, // Next/Vercel
      { icon: "{ }", color: "#F7DF1E", delay: 1 }, // JS
    ].map((item, i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          fontSize: "0.75rem",
          color: item.color,
          fontWeight: "bold",
          textShadow: `0 0 10px ${item.color}`,
        }}
        animate={{
          x: [
            40 + Math.cos((i * 120 * Math.PI) / 180) * 0,
            40 + Math.cos((i * 120 * Math.PI) / 180) * 35,
          ],
          y: [
            40 + Math.sin((i * 120 * Math.PI) / 180) * 0,
            40 + Math.sin((i * 120 * Math.PI) / 180) * 35,
          ],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: item.delay,
          times: [0, 0.3, 0.7, 1],
        }}
      >
        {item.icon}
      </motion.div>
    ))}
  </div>
);

const UIUXVisual = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: 80,
      height: 80,
    }}
  >
    {/* Glassmorphic device mockup */}
    <motion.div
      style={{
        position: "absolute",
        inset: 15,
        background: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(10px)",
        borderRadius: "8px",
        border: "1px solid rgba(34, 211, 238, 0.3)",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(34, 211, 238, 0.1)",
      }}
      animate={{
        boxShadow: [
          "0 8px 32px rgba(34, 211, 238, 0.1)",
          "0 8px 48px rgba(34, 211, 238, 0.3)",
          "0 8px 32px rgba(34, 211, 238, 0.1)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Screen content layers */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          right: "10%",
          height: "25%",
          background:
            "linear-gradient(90deg, rgba(34, 211, 238, 0.3) 0%, rgba(34, 211, 238, 0.1) 100%)",
          borderRadius: "4px",
        }}
        animate={{
          scaleX: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          times: [0, 0.2, 0.8, 1],
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: "55%",
          left: "10%",
          width: "35%",
          height: "30%",
          background: "rgba(6, 182, 212, 0.2)",
          borderRadius: "4px",
        }}
        animate={{
          scale: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 0.5,
          times: [0, 0.2, 0.8, 1],
        }}
      />

      <motion.div
        style={{
          position: "absolute",
          top: "55%",
          right: "10%",
          width: "35%",
          height: "30%",
          background: "rgba(34, 211, 238, 0.15)",
          borderRadius: "50%",
        }}
        animate={{
          scale: [0, 1, 1, 0],
          rotate: [0, 180, 360],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
          times: [0, 0.2, 0.8, 1],
        }}
      />
    </motion.div>

    {/* Floating interaction points */}
    {[
      { x: 20, y: 20, delay: 0 },
      { x: 60, y: 30, delay: 0.7 },
      { x: 30, y: 50, delay: 1.4 },
    ].map((point, i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          left: point.x,
          top: point.y,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "transparent",
          border: "2px solid #22d3ee",
        }}
        animate={{
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: point.delay,
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)",
          }}
          animate={{
            scale: [0.5, 2, 0.5],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: point.delay,
          }}
        />
      </motion.div>
    ))}

    {/* Gesture path */}
    <svg
      width="80"
      height="80"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <motion.path
        d="M 25 25 Q 40 15 55 35 T 55 55"
        stroke="#06b6d4"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2,
          times: [0, 0.3, 0.7, 1],
        }}
      />
    </svg>
  </div>
);

const XRVisual = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: 80,
      height: 80,
      transformStyle: "preserve-3d",
    }}
  >
    {/* VR Headset outline */}
    <motion.div
      style={{
        position: "absolute",
        inset: 15,
        border: "2px solid rgba(251, 191, 36, 0.4)",
        borderRadius: "12px",
        background: "rgba(15, 15, 20, 0.6)",
        backdropFilter: "blur(5px)",
      }}
      animate={{
        boxShadow: [
          "0 0 20px rgba(251, 191, 36, 0.3)",
          "0 0 40px rgba(251, 191, 36, 0.5)",
          "0 0 20px rgba(251, 191, 36, 0.3)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* VR Icon */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#fbbf24",
          fontFamily: "monospace",
          textShadow: "0 0 10px currentColor",
        }}
      >
        VR
      </div>
    </motion.div>

    {/* 3D coordinate axes */}
    <svg width="80" height="80" style={{ position: "absolute", inset: 0 }}>
      {/* X axis */}
      <motion.line
        x1="20"
        y1="40"
        x2="60"
        y2="40"
        stroke="#fbbf24"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0,
        }}
      />
      {/* Y axis */}
      <motion.line
        x1="40"
        y1="20"
        x2="40"
        y2="60"
        stroke="#f59e0b"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
      {/* Z axis */}
      <motion.line
        x1="25"
        y1="55"
        x2="55"
        y2="25"
        stroke="#fcd34d"
        strokeWidth="2"
        opacity="0.6"
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1,
        }}
      />
    </svg>

    {/* Floating 3D objects */}
    {[
      { size: 6, x: 15, y: 15 },
      { size: 4, x: 65, y: 20 },
      { size: 5, x: 60, y: 60 },
      { size: 4, x: 20, y: 55 },
    ].map((obj, i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          left: obj.x,
          top: obj.y,
          width: obj.size,
          height: obj.size,
          background: "#fbbf24",
          boxShadow: "0 0 10px #fbbf24",
        }}
        animate={{
          rotateX: [0, 360],
          rotateY: [0, -360],
          rotateZ: [0, 360],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}

    {/* Hand tracking points */}
    <motion.div
      style={{
        position: "absolute",
        bottom: 5,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 4,
      }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#fbbf24",
          }}
          animate={{
            y: [0, -5, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  </div>
);

const AIVisual = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      width: 80,
      height: 80,
    }}
  >
    {/* AI Chat Interface */}
    <motion.div
      style={{
        position: "absolute",
        inset: 10,
        background: "rgba(15, 15, 20, 0.8)",
        borderRadius: "8px",
        border: "1px solid rgba(244, 114, 182, 0.3)",
        backdropFilter: "blur(10px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        gap: "4px",
      }}
      animate={{
        boxShadow: [
          "0 0 20px rgba(244, 114, 182, 0.2)",
          "0 0 40px rgba(244, 114, 182, 0.4)",
          "0 0 20px rgba(244, 114, 182, 0.2)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* User message */}
      <motion.div
        style={{
          alignSelf: "flex-end",
          background: "rgba(99, 102, 241, 0.2)",
          borderRadius: "4px",
          width: "60%",
          height: "8px",
        }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      />

      {/* AI thinking dots */}
      <div style={{ display: "flex", gap: 2, paddingLeft: 4 }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "#f472b6",
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* AI response lines */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            background: `linear-gradient(90deg, #f472b6 ${
              40 - i * 10
            }%, transparent ${60 - i * 10}%)`,
            borderRadius: "4px",
            height: "6px",
            opacity: 0,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            width: ["0%", `${80 - i * 15}%`, `${80 - i * 15}%`, "0%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5 + i * 0.1,
            times: [0, 0.2, 0.8, 1],
          }}
        />
      ))}
    </motion.div>

    {/* Floating AI sparkles */}
    {[0, 1, 2, 3].map((i) => (
      <motion.div
        key={i}
        style={{
          position: "absolute",
          width: 4,
          height: 4,
          background: "#f472b6",
          borderRadius: "50%",
          boxShadow: "0 0 6px #f472b6",
        }}
        animate={{
          x: [40, 40 + Math.cos((i * 90 * Math.PI) / 180) * 30],
          y: [40, 40 + Math.sin((i * 90 * Math.PI) / 180) * 30],
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5 + i * 0.5,
          ease: "easeOut",
        }}
      />
    ))}

    {/* Neural network icon in corner */}
    <motion.div
      style={{
        position: "absolute",
        top: 5,
        right: 5,
        width: 20,
        height: 20,
      }}
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <FaBrain
        style={{
          fontSize: "1rem",
          color: "#f472b6",
          opacity: 0.6,
          filter: "drop-shadow(0 0 5px currentColor)",
        }}
      />
    </motion.div>
  </div>
);
