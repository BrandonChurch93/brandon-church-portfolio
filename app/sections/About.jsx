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
                    How I Work
                  </h3>
                  <div className="prose prose-lg text-white/80 max-w-none space-y-4">
                    <p>
                      Early in my career, I joined a team with no project
                      manager and a failing product. I was the new guy, but
                      someone needed to step up. I became the de facto Scrum
                      Master and we delivered on time. That experience taught me
                      to take initiative when it matters.
                    </p>
                    <p>
                      Two weeks before a{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        multimillion-dollar government contract
                      </span>{" "}
                      was due, leadership asked me to look at a broken
                      application. I spent the next two weeks rebuilding it from
                      scratch, fixing the functionality, redesigning the UI, and
                      achieving{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        100% Section 508 compliance
                      </span>
                      . I took ownership because my company's reputation was on
                      the line.
                    </p>
                    <p>
                      When building systems, I focus on understanding the actual
                      users and their workflows. For a{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        humanitarian aid tracking system
                      </span>{" "}
                      processing{" "}
                      <span className="text-[#ff3f81] font-semibold">
                        billions quarterly
                      </span>
                      , I optimized for the logistics teams managing the
                      process, because that's where the system succeeds or
                      fails.
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
                        The Journey
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
                        I started coding in middle school, building mods for
                        video games. I was the scientifically curious kid who
                        realized technology was where I could make real impact.
                      </p>
                      <p>
                        I went from freelance developer to{" "}
                        <span className="text-[#ff3f81]">
                          Director of UI/UX at Leidit
                        </span>
                        , where I designed federal applications including a{" "}
                        <span className="text-[#ff3f81]">
                          humanitarian aid tracking system
                        </span>{" "}
                        and{" "}
                        <span className="text-[#ff3f81]">
                          security clearance platform
                        </span>{" "}
                        used across agencies. As founder of{" "}
                        <span className="text-[#ff3f81]">Modern Softworks</span>
                        , I scaled to 40+ clients with a team of 5 developers.
                        When our biggest client went under, I made a difficult
                        decision: I covered my team's salaries out of pocket to
                        give them time to land on their feet, then scaled back
                        strategically. I chose sustainability and family over
                        burnout.
                      </p>
                      <p>
                        At this point, tech stacks matter less than building
                        things right. I focus on what the product needs, then
                        learn whatever is required.
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
                      What Matters Now
                    </h3>
                    <div className="text-white/80 space-y-3">
                      <p>
                        I have two young kids, and when I'm not with family, I
                        want my work to matter.
                      </p>
                      <p>
                        I'm drawn to{" "}
                        <span className="text-[#ff3f81]">
                          early-stage companies
                        </span>{" "}
                        building products where UI quality has real
                        consequences. Whether that's{" "}
                        <span className="text-[#ff3f81]">
                          defense systems, AI robots, MR interfaces, or
                          scientific tools
                        </span>
                        , I want to work on problems where getting it right
                        actually improves lives. I'm looking for{" "}
                        <span className="text-[#ff3f81]">
                          ownership of the UI/UX vision
                        </span>{" "}
                        from the ground up, not maintaining existing systems.
                      </p>
                      <p>
                        I work best with teams that value preparation and
                        results. I'm happy to adapt to different working styles
                        if the mission and impact are worth it.
                      </p>
                      <p>
                        If you're building something meaningful and need someone
                        who takes ownership and delivers, I'd love to hear what
                        you're working on.
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
                Pursuing technology that genuinely improves lives
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
                  How I Work
                </h3>
                <div className="prose prose-lg text-white/80 max-w-none space-y-4">
                  <p>
                    Early in my career, I joined a team with no project manager
                    and a failing product. I was the new guy, but someone needed
                    to step up. I became the de facto Scrum Master and we
                    delivered on time. That experience taught me to take
                    initiative when it matters.
                  </p>
                  <p>
                    Two weeks before a{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      multimillion-dollar government contract
                    </span>{" "}
                    was due, leadership asked me to look at a broken
                    application. I spent the next two weeks rebuilding it from
                    scratch, fixing the functionality, redesigning the UI, and
                    achieving{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      100% Section 508 compliance
                    </span>
                    . I took ownership because my company's reputation was on
                    the line.
                  </p>
                  <p>
                    When building systems, I focus on understanding the actual
                    users and their workflows. For a{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      humanitarian aid tracking system
                    </span>{" "}
                    processing{" "}
                    <span className="text-[#ff3f81] font-semibold">
                      billions quarterly
                    </span>
                    , I optimized for the logistics teams managing the process,
                    because that's where the system succeeds or fails.
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
                      The Journey
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
                      I started coding in middle school, building mods for video
                      games. I was the scientifically curious kid who realized
                      technology was where I could make real impact.
                    </p>
                    <p>
                      I went from freelance developer to{" "}
                      <span className="text-[#ff3f81]">
                        Director of UI/UX at Leidit
                      </span>
                      , where I designed federal applications including a{" "}
                      <span className="text-[#ff3f81]">
                        humanitarian aid tracking system
                      </span>{" "}
                      and{" "}
                      <span className="text-[#ff3f81]">
                        security clearance platform
                      </span>{" "}
                      used across agencies. As founder of{" "}
                      <span className="text-[#ff3f81]">Modern Softworks</span>,
                      I scaled to 40+ clients with a team of 5 developers. When
                      our biggest client went under, I made a difficult
                      decision: I covered my team's salaries out of pocket to
                      give them time to land on their feet, then scaled back
                      strategically. I chose sustainability and family over
                      burnout.
                    </p>
                    <p>
                      At this point, tech stacks matter less than building
                      things right. I focus on what the product needs, then
                      learn whatever is required.
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
                    What Matters Now
                  </h3>
                  <div className="text-white/80 space-y-3">
                    <p>
                      I have two young kids, and when I'm not with family, I
                      want my work to matter.
                    </p>
                    <p>
                      I'm drawn to{" "}
                      <span className="text-[#ff3f81]">
                        early-stage companies
                      </span>{" "}
                      building products where UI quality has real consequences.
                      Whether that's{" "}
                      <span className="text-[#ff3f81]">
                        defense systems, AI robots, MR interfaces, or scientific
                        tools
                      </span>
                      , I want to work on problems where getting it right
                      actually improves lives. I'm looking for{" "}
                      <span className="text-[#ff3f81]">
                        ownership of the UI/UX vision
                      </span>{" "}
                      from the ground up, not maintaining existing systems.
                    </p>
                    <p>
                      I work best with teams that value preparation and results.
                      I'm happy to adapt to different working styles if the
                      mission and impact are worth it.
                    </p>
                    <p>
                      If you're building something meaningful and need someone
                      who takes ownership and delivers, I'd love to hear what
                      you're working on.
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
