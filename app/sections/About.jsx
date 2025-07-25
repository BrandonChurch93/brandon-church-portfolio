"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Container from "../components/Container";
import { cn } from "../utils/cn";
import { AnimatedTitle } from "../components/AnimatedText";
import {
  scrollAnimationVariants,
  useIsMobile,
  ScrollTriggeredUnderline,
  AnimationWrapper,
  useSectionAnimation,
} from "../components/ScrollAnimations";

const About = () => {
  const { sectionRef, isInView, isMobile, containerVariants, getVariant } =
    useSectionAnimation();

  // If mobile, render without Framer Motion but WITH CSS animations
  if (isMobile) {
    return (
      <section ref={sectionRef} id="about" className="section-padding relative">
        {/* Background - subtle gradient only */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f2e]/50 to-transparent pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Title - static on mobile */}
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                <AnimatedTitle>About Me</AnimatedTitle>
              </h2>
              <p className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
                <ScrollTriggeredUnderline>
                  When you love what you do, you never clock out
                </ScrollTriggeredUnderline>
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-8">
              {/* Hero Card - What I Can Do */}
              <div>
                <div
                  className={cn(
                    "glass card-hover rounded-3xl p-8 md:p-12",
                    "border border-white/10",
                    "hover:border-[#ff3f81]/30",
                    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                    "hover:-translate-y-2",
                    "group"
                  )}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                    What I can do for you
                  </h3>
                  <div className="prose prose-lg text-white/80 max-w-none space-y-4">
                    <p>
                      I architect front-end systems that solve complex problems
                      others can't. As Director of UI/UX and WCAG compliance
                      expert, I've built{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        enterprise design systems
                      </span>{" "}
                      from scratch, reduced development time by{" "}
                      <span className="text-[#ff3f81] font-semibold">60%</span>,
                      and achieved{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        100% Section 508 compliance
                      </span>{" "}
                      across government applications.
                    </p>
                    <p>
                      My expertise spans modern React architecture (including
                      Redux, testing, and performance optimization) to
                      cutting-edge AI integration with{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        LangChain and GPT-4
                      </span>
                      . I don't just write code—I create scalable solutions like{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        SnapShot AI
                      </span>
                      , my Chrome extension that enables instant visual AI
                      queries, or template systems that compress weeks of work
                      into days.
                    </p>
                    <p>
                      With{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        10 years of remote experience
                      </span>{" "}
                      and a track record of transforming initial hires into
                      leadership roles, I bring both technical depth and
                      strategic thinking to transform how your users experience
                      technology.
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Column Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Professional Overview */}
                <div>
                  <div
                    className={cn(
                      "glass card-hover rounded-3xl p-8 h-full",
                      "border border-white/10",
                      "hover:border-[#ff3f81]/30",
                      "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                      "hover:-translate-y-2",
                      "group"
                    )}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                        Professional Overview
                      </h3>
                      <div className="text-4xl font-bold text-[#ff3f81]">
                        10+
                        <span className="text-base font-normal text-white/70 ml-2">
                          years
                        </span>
                      </div>
                    </div>
                    <div className="text-white/80 space-y-3">
                      <p>
                        From freelance developer to{" "}
                        <span className="text-[#ff3f81]">
                          Director of UI/UX
                        </span>
                        , I've spent a decade building systems that scale. I was
                        Leidit's first UX hire, where I architected their{" "}
                        <span className="text-[#ff3f81]">
                          entire design system
                        </span>{" "}
                        and earned promotion to Director while remaining
                        hands-on with the code.
                      </p>
                      <p>
                        As founder of{" "}
                        <span className="text-[#ff3f81]">Modern Softworks</span>
                        , I've led teams, shipped AI-powered products including
                        SnapShot AI, and navigated the full spectrum of business
                        challenges—from scaling to 5 developers to strategically
                        pivoting during market downturns.
                      </p>
                      <p>
                        My technical toolkit runs deep: React, TypeScript,
                        Three.js for web-based 3D, comprehensive testing suites,
                        and real-time technologies like WebSockets. Currently
                        pursuing my{" "}
                        <span className="text-[#ff3f81]">MS in AI/ML</span>, I'm
                        formalizing years of practical experience integrating
                        LLMs and building AI-enhanced interfaces.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Future Goals & Vision */}
                <div>
                  <div
                    className={cn(
                      "glass card-hover rounded-3xl p-8 h-full",
                      "border border-white/10",
                      "hover:border-[#ff3f81]/30",
                      "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                      "hover:-translate-y-2",
                      "group"
                    )}
                  >
                    <h3 className="text-2xl font-bold mb-6 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                      Future Goals & Vision
                    </h3>
                    <div className="text-white/80 space-y-3">
                      <p>
                        I'm driven by a simple obsession: using technology to
                        fundamentally improve how people work and live. While
                        others see AI as a tool for automation, I see it as a{" "}
                        <span className="text-[#ff3f81]">
                          multiplier for human capability
                        </span>
                        . SnapShot AI—letting users query any visual content—is
                        just the beginning.
                      </p>
                      <p>
                        I envision interfaces that adapt to users' needs in
                        real-time, development environments where{" "}
                        <span className="text-[#ff3f81]">
                          AI amplifies creativity
                        </span>{" "}
                        rather than replacing it, and accessible systems that
                        work for everyone by default. My pursuit of an AI/ML
                        degree isn't about credentials—it's about pushing the
                        boundaries of what's possible when you combine deep
                        front-end expertise with cutting-edge AI.
                      </p>
                      <p>
                        I'm not looking to just build products; I'm looking to{" "}
                        <span className="text-[#ff3f81]">
                          solve problems that matter
                        </span>
                        , whether that's making government services more
                        accessible or creating tools that help developers work
                        smarter.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  // Desktop version with Framer Motion
  return (
    <section ref={sectionRef} id="about" className="section-padding relative">
      {/* Background - subtle gradient only */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a0f2e]/50 to-transparent pointer-events-none" />

      <Container className="relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title with scroll animations */}
          <motion.div
            variants={getVariant(scrollAnimationVariants.title)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
              <AnimatedTitle>About Me</AnimatedTitle>
            </h2>
            <motion.p
              variants={getVariant(scrollAnimationVariants.slogan)}
              className="text-base sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto"
            >
              <ScrollTriggeredUnderline>
                When you love what you do, you never clock out
              </ScrollTriggeredUnderline>
            </motion.p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8">
            {/* Hero Card - What I Can Do */}
            <motion.div
              variants={getVariant(scrollAnimationVariants.cardCenter)}
            >
              <div
                className={cn(
                  "glass card-hover rounded-3xl p-8 md:p-12",
                  "border border-white/10",
                  "hover:border-[#ff3f81]/30",
                  "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                  "hover:-translate-y-2",
                  "group"
                )}
              >
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                  What I can do for you
                </h3>
                <div className="prose prose-lg text-white/80 max-w-none space-y-4">
                  <p>
                    I architect front-end systems that solve complex problems
                    others can't. As Director of UI/UX and WCAG compliance
                    expert, I've built{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      enterprise design systems
                    </span>{" "}
                    from scratch, reduced development time by{" "}
                    <span className="text-[#ff3f81] font-semibold">60%</span>,
                    and achieved{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      100% Section 508 compliance
                    </span>{" "}
                    across government applications.
                  </p>
                  <p>
                    My expertise spans modern React architecture (including
                    Redux, testing, and performance optimization) to
                    cutting-edge AI integration with{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      LangChain and GPT-4
                    </span>
                    . I don't just write code—I create scalable solutions like{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      SnapShot AI
                    </span>
                    , my Chrome extension that enables instant visual AI
                    queries, or template systems that compress weeks of work
                    into days.
                  </p>
                  <p>
                    With{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      10 years of remote experience
                    </span>{" "}
                    and a track record of transforming initial hires into
                    leadership roles, I bring both technical depth and strategic
                    thinking to transform how your users experience technology.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Two Column Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Professional Overview */}
              <motion.div
                variants={getVariant(scrollAnimationVariants.cardLeft)}
              >
                <div
                  className={cn(
                    "glass card-hover rounded-3xl p-8 h-full",
                    "border border-white/10",
                    "hover:border-[#ff3f81]/30",
                    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                    "hover:-translate-y-2",
                    "group"
                  )}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                      Professional Overview
                    </h3>
                    <div className="text-4xl font-bold text-[#ff3f81]">
                      10+
                      <span className="text-base font-normal text-white/70 ml-2">
                        years
                      </span>
                    </div>
                  </div>
                  <div className="text-white/80 space-y-3">
                    <p>
                      From freelance developer to{" "}
                      <span className="text-[#ff3f81]">Director of UI/UX</span>,
                      I've spent a decade building systems that scale. I was
                      Leidit's first UX hire, where I architected their{" "}
                      <span className="text-[#ff3f81]">
                        entire design system
                      </span>{" "}
                      and earned promotion to Director while remaining hands-on
                      with the code.
                    </p>
                    <p>
                      As founder of{" "}
                      <span className="text-[#ff3f81]">Modern Softworks</span>,
                      I've led teams, shipped AI-powered products including
                      SnapShot AI, and navigated the full spectrum of business
                      challenges—from scaling to 5 developers to strategically
                      pivoting during market downturns.
                    </p>
                    <p>
                      My technical toolkit runs deep: React, TypeScript,
                      Three.js for web-based 3D, comprehensive testing suites,
                      and real-time technologies like WebSockets. Currently
                      pursuing my{" "}
                      <span className="text-[#ff3f81]">MS in AI/ML</span>, I'm
                      formalizing years of practical experience integrating LLMs
                      and building AI-enhanced interfaces.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Future Goals & Vision */}
              <motion.div
                variants={getVariant(scrollAnimationVariants.cardRight)}
              >
                <div
                  className={cn(
                    "glass card-hover rounded-3xl p-8 h-full",
                    "border border-white/10",
                    "hover:border-[#ff3f81]/30",
                    "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]",
                    "hover:-translate-y-2",
                    "group"
                  )}
                >
                  <h3 className="text-2xl font-bold mb-6 text-white transition-colors duration-500 group-hover:text-[#ff3f81]">
                    Future Goals & Vision
                  </h3>
                  <div className="text-white/80 space-y-3">
                    <p>
                      I'm driven by a simple obsession: using technology to
                      fundamentally improve how people work and live. While
                      others see AI as a tool for automation, I see it as a{" "}
                      <span className="text-[#ff3f81]">
                        multiplier for human capability
                      </span>
                      . SnapShot AI—letting users query any visual content—is
                      just the beginning.
                    </p>
                    <p>
                      I envision interfaces that adapt to users' needs in
                      real-time, development environments where{" "}
                      <span className="text-[#ff3f81]">
                        AI amplifies creativity
                      </span>{" "}
                      rather than replacing it, and accessible systems that work
                      for everyone by default. My pursuit of an AI/ML degree
                      isn't about credentials—it's about pushing the boundaries
                      of what's possible when you combine deep front-end
                      expertise with cutting-edge AI.
                    </p>
                    <p>
                      I'm not looking to just build products; I'm looking to{" "}
                      <span className="text-[#ff3f81]">
                        solve problems that matter
                      </span>
                      , whether that's making government services more
                      accessible or creating tools that help developers work
                      smarter.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default About;
