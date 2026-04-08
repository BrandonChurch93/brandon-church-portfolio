"use client";

import { useState, useRef, useEffect } from "react";
import { Brain, Code2, Server, Palette } from "lucide-react";
import Container from "../components/Container";
import { cn } from "../utils/cn";
import { AnimatedTitle } from "../components/AnimatedText";
import {
  useIsMobile,
  useSectionAnimation,
  scrollAnimationVariants,
  ScrollTriggeredUnderline,
} from "../components/ScrollAnimations";
import { MobileMotionWrapper } from "../components/MobileMotionWrapper";

// Add performance-optimized styles
const glowStyles = {
  pink: { boxShadow: "0 0 30px rgba(255,63,129,0.3)" },
  cyan: { boxShadow: "0 0 30px rgba(34,211,238,0.3)" },
  purple: { boxShadow: "0 0 30px rgba(168,85,247,0.3)" },
  none: { boxShadow: "0 0 0 rgba(0,0,0,0)" },
};

// Skill Tag Component - Performance optimized
const SkillTag = ({
  skill,
  index,
  animationTrigger,
  isLargeCard = false,
  cardAnimationDuration = 0.8,
  isMobile = false,
}) => {
  // Mobile styles with fixed height - no animations
  if (isMobile) {
    return (
      <div
        className={cn(
          "px-3 py-2 rounded-xl text-sm",
          "bg-white/5 backdrop-blur-sm",
          "border border-white/20",
          "hover:bg-white/10 hover:border-[#ff3f81]/50",
          "hover:text-[#ff3f81]",
          "transition-all duration-200",
          "cursor-default",
          "text-center",
          "h-[44px] flex items-center justify-center",
          "w-full"
        )}
      >
        <span className="text-white/90 leading-tight break-words">{skill}</span>
      </div>
    );
  }

  // Desktop animations with performance hints
  const baseDelay = cardAnimationDuration + (isLargeCard ? 0.2 : 0.1);
  const staggerDelay = isLargeCard ? 0.03 : 0.02;
  const animationDelay = baseDelay + index * staggerDelay;

  return (
    <div
      className={cn(
        isLargeCard
          ? "px-4 py-3 rounded-xl text-sm w-full text-center min-h-[48px] flex items-center justify-center"
          : "px-3 py-1.5 rounded-lg text-xs",
        "bg-white/5 backdrop-blur-sm",
        "border border-white/20",
        "hover:bg-white/10 hover:border-[#ff3f81]/50",
        isLargeCard
          ? "hover:text-[#ff3f81] hover:shadow-lg"
          : "hover:text-[#ff3f81]",
        "transition-all duration-200",
        "cursor-default",
        animationTrigger ? "animate-skill-fade-in" : "opacity-0"
      )}
      style={{
        animationDelay: animationTrigger ? `${animationDelay}s` : "0s",
        animationFillMode: "both",
        // Force GPU acceleration
        transform: "translateZ(0)",
        willChange: "opacity, transform",
      }}
    >
      <span className="text-white/90">{skill}</span>
    </div>
  );
};

// Icon component with optimized glow effect
const IconWithGlow = ({ icon, category, isMobile }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getGlowColor = () => {
    if (category.id === "ai" || category.id === "design") return "pink";
    if (category.id === "frontend") return "cyan";
    return "purple";
  };

  if (isMobile) {
    return (
      <div
        className={cn(
          "p-3 rounded-xl",
          `bg-gradient-to-br ${category.iconBg}`,
          `border border-${category.iconBorder}`,
          "flex-shrink-0"
        )}
      >
        {icon}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "p-4 rounded-2xl",
        `bg-gradient-to-br ${category.iconBg}`,
        `border border-${category.iconBorder}`,
        "transition-all duration-500",
        "group-hover:rotate-6"
      )}
      style={{
        ...glowStyles[isHovered ? getGlowColor() : "none"],
        transition: "all 500ms",
        transform: "translateZ(0)", // Force GPU acceleration
        willChange: "transform, box-shadow",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
    </div>
  );
};

const Skills = () => {
  const { sectionRef, isInView, isMobile, containerVariants, getVariant } =
    useSectionAnimation();

  // Separate animation states for different card groups
  const [animateLargeCards, setAnimateLargeCards] = useState(false);
  const [animateSmallCards, setAnimateSmallCards] = useState(false);

  // Add mobile-specific styles for skill cards
  const getCardStyles = () => {
    if (isMobile) {
      return "glass rounded-2xl p-6 border border-white/10 hover:border-[#ff3f81]/30";
    }
    return cn(
      "glass card-hover rounded-3xl p-8 md:p-10 border border-white/10",
      "hover:border-[#ff3f81]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
      "hover:-translate-y-2 relative overflow-hidden",
      // Performance optimizations
      "transform-gpu", // Force GPU acceleration
      "will-change-transform" // Hint browser about upcoming changes
    );
  };

  // Trigger animations with proper timing - desktop only
  useEffect(() => {
    if (isInView && !isMobile) {
      const largeCardTimer = setTimeout(() => {
        setAnimateLargeCards(true);
      }, 800);

      const smallCardTimer = setTimeout(() => {
        setAnimateSmallCards(true);
      }, 700);

      return () => {
        clearTimeout(largeCardTimer);
        clearTimeout(smallCardTimer);
      };
    }
  }, [isInView, isMobile]);

  // Skills data
  const skillCategories = [
    {
      id: "ai",
      title: "AI Integration & Innovation",
      description: "Cutting-edge AI implementation and intelligent systems",
      icon: <Brain className="w-8 h-8" />,
      glowColor: "rgba(255,63,129,0.3)",
      iconBg: "from-[#ff3f81]/20 to-[#ff3f81]/10",
      iconBorder: "[#ff3f81]/20",
      skills: [
        "LangChain",
        "OpenAI GPT-4",
        "Claude API",
        "Prompt Engineering",
        "Vector Databases",
        "RAG Systems",
        "Hugging Face",
        "Computer Vision",
        "Function Calling/Tool Use",
        "Semantic Search",
        "AI Workflow Automation",
        "Custom LLM Integration",
      ],
    },
    {
      id: "frontend",
      title: "Frontend Architecture",
      description: "Building scalable, performant applications",
      icon: <Code2 className="w-8 h-8" />,
      glowColor: "rgba(34,211,238,0.3)",
      iconBg: "from-cyan-500/20 to-cyan-600/10",
      iconBorder: "cyan-500/20",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "Redux",
        "Jest/React Testing",
        "Cypress",
        "Three.js",
        "WebGL",
        "Tailwind CSS",
        "Framer Motion",
        "Advanced CSS",
        "Webpack",
        "Vite",
        "Performance Optimization",
        "Component Architecture",
        "Micro-frontends",
      ],
    },
    {
      id: "backend",
      title: "Full-Stack & Cloud",
      description: "Scalable backend systems and infrastructure",
      icon: <Server className="w-8 h-8" />,
      glowColor: "rgba(168,85,247,0.3)",
      iconBg: "from-purple-500/20 to-purple-600/10",
      iconBorder: "purple-500/20",
      skills: [
        "Node.js",
        "Python",
        "GraphQL",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "AWS (Lambda, S3, EC2)",
        "Azure",
        "Docker",
        "ServiceNow",
        "WebSockets",
        "PWAs",
        "CI/CD",
        "GitHub Actions",
        "Serverless Architecture",
      ],
    },
    {
      id: "design",
      title: "Design & Accessibility Excellence",
      description: "Creating inclusive experiences that work for everyone",
      icon: <Palette className="w-8 h-8" />,
      glowColor: "rgba(255,63,129,0.3)",
      iconBg: "from-[#ff3f81]/20 via-purple-500/20 to-purple-500/10",
      iconBorder: "[#ff3f81]/20",
      skills: [
        "Figma",
        "WCAG 2.1/Section 508",
        "Design Systems",
        "Accessibility Auditing",
        "User Research",
        "Information Architecture",
        "3D/WebXR Design",
        "Data Visualization",
        "Responsive Design",
        "Component Libraries",
        "User Testing",
        "Cross-browser Support",
      ],
    },
  ];

  return (
    <section id="skills" ref={sectionRef} className="section-padding relative">
      {/* Background gradient with performance hint */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f2e]/50 to-transparent pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      />

      <Container className="relative z-10">
        <MobileMotionWrapper
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
          style={isMobile ? {} : { perspective: "1000px" }}
        >
          {/* Section Header */}
          <MobileMotionWrapper
            variants={getVariant(scrollAnimationVariants.title)}
            className="text-center mb-12 px-4"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
              <AnimatedTitle>Technical Expertise</AnimatedTitle>
            </h2>
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.slogan)}
              as="p"
              className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto"
            >
              <ScrollTriggeredUnderline>
                Frontend specialist with full-stack capability
              </ScrollTriggeredUnderline>
            </MobileMotionWrapper>
          </MobileMotionWrapper>

          {/* Skills Layout */}
          <div className="space-y-8">
            {/* AI - Full Width Featured */}
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.cardCenter)}
            >
              <div className={cn("group", getCardStyles())}>
                {/* Gradient overlay - desktop only with performance optimization */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ff3f81]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      transform: "translateZ(0)",
                      willChange: "opacity",
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={cn(
                      "flex items-start mb-8",
                      isMobile ? "gap-4" : "gap-6"
                    )}
                  >
                    <IconWithGlow
                      icon={skillCategories[0].icon}
                      category={skillCategories[0]}
                      isMobile={isMobile}
                    />
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-bold mb-2 text-white transition-colors duration-500 group-hover:text-[#ff3f81]",
                          isMobile ? "text-2xl" : "text-3xl"
                        )}
                      >
                        {skillCategories[0].title}
                      </h3>
                      <p
                        className={cn(
                          "text-white/60",
                          isMobile ? "text-sm" : "text-lg"
                        )}
                      >
                        {skillCategories[0].description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 place-items-center">
                    {skillCategories[0].skills.map((skill, index) => (
                      <SkillTag
                        key={skill}
                        skill={skill}
                        index={index}
                        animationTrigger={animateLargeCards}
                        isLargeCard={true}
                        cardAnimationDuration={0.8}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </MobileMotionWrapper>

            {/* Frontend & Backend - Side by Side */}
            <div className="grid md:grid-cols-2 gap-8">
              {skillCategories.slice(1, 3).map((category, categoryIndex) => (
                <MobileMotionWrapper
                  key={category.id}
                  variants={getVariant(
                    categoryIndex === 0
                      ? scrollAnimationVariants.cardLeft
                      : scrollAnimationVariants.cardRight
                  )}
                >
                  <div className={cn("group h-full", getCardStyles())}>
                    {/* Gradient overlay - desktop only with performance optimization */}
                    {!isMobile && (
                      <div
                        className={cn(
                          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                          "bg-gradient-to-br",
                          category.id === "frontend"
                            ? "from-cyan-500/10"
                            : "from-purple-500/10",
                          "via-transparent to-transparent"
                        )}
                        style={{
                          transform: "translateZ(0)",
                          willChange: "opacity",
                        }}
                      />
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-6">
                        <IconWithGlow
                          icon={category.icon}
                          category={category}
                          isMobile={isMobile}
                        />
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-1 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                            {category.title}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {category.description}
                          </p>
                        </div>
                      </div>

                      <div
                        className={cn(
                          isMobile
                            ? "grid grid-cols-2 gap-3 place-items-center"
                            : "flex flex-wrap gap-2"
                        )}
                      >
                        {category.skills.map((skill, index) => (
                          <SkillTag
                            key={skill}
                            skill={skill}
                            index={index}
                            animationTrigger={animateSmallCards}
                            isLargeCard={isMobile ? true : false}
                            cardAnimationDuration={0.7}
                            isMobile={isMobile}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </MobileMotionWrapper>
              ))}
            </div>

            {/* Design - Full Width Bottom */}
            <MobileMotionWrapper
              variants={getVariant(scrollAnimationVariants.cardCenter)}
            >
              <div className={cn("group", getCardStyles())}>
                {/* Gradient overlay - desktop only with performance optimization */}
                {!isMobile && (
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#ff3f81]/10 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      transform: "translateZ(0)",
                      willChange: "opacity",
                    }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  <div
                    className={cn(
                      "flex items-start mb-8",
                      isMobile ? "gap-4" : "gap-6"
                    )}
                  >
                    <IconWithGlow
                      icon={skillCategories[3].icon}
                      category={skillCategories[3]}
                      isMobile={isMobile}
                    />
                    <div className="flex-1">
                      <h3
                        className={cn(
                          "font-bold mb-2 text-white transition-colors duration-500 group-hover:text-[#ff3f81]",
                          isMobile ? "text-2xl" : "text-3xl"
                        )}
                      >
                        {skillCategories[3].title}
                      </h3>
                      <p
                        className={cn(
                          "text-white/60",
                          isMobile ? "text-sm" : "text-lg"
                        )}
                      >
                        {skillCategories[3].description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 place-items-center">
                    {skillCategories[3].skills.map((skill, index) => (
                      <SkillTag
                        key={skill}
                        skill={skill}
                        index={index}
                        animationTrigger={animateLargeCards}
                        isLargeCard={true}
                        cardAnimationDuration={0.8}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </MobileMotionWrapper>
          </div>
        </MobileMotionWrapper>
      </Container>
    </section>
  );
};

export default Skills;
