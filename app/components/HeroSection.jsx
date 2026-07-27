"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import SplitText from "./SplitText";
import MaskedLine from "./MaskedLine";
import MouseGradient from "./MouseGradient";

const RubiksCube = dynamic(() => import("./RubiksCube"), {
  ssr: false,
  loading: () => null,
});

// Easing curves
const easeOutCubic = [0.33, 1, 0.68, 1];

// Blur + fade-up variant for subtitle
const blurFadeUp = (delay) => ({
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easeOutCubic,
      delay,
    },
  },
});

// Background glow fade-in
const glowFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  // Shared text content
  const heroText = (animated) => (
    <div
      className="v2-container v2-hero-content"
      style={{
        position: "relative",
        zIndex: 3,
        pointerEvents: "none",
        width: "100%",
      }}
    >
      <div style={{ maxWidth: "640px", pointerEvents: "auto" }}>
        {animated ? (
          <>
            <div style={{ marginBottom: "24px" }}>
              <MaskedLine delay={0.3} duration={0.5}>
                <p className="v2-eyebrow">Design Engineer</p>
              </MaskedLine>
            </div>
            <SplitText
              text="AI Product Engineer"
              as="h1"
              className="v2-heading v2-h1"
              delay={0.5}
              charDelay={0.03}
              charDuration={0.5}
            />
            <motion.p
              className="v2-body"
              style={{
                marginTop: "24px",
                marginBottom: "40px",
                willChange: "transform, opacity, filter",
              }}
              {...blurFadeUp(1.0)}
            >
              I design, build, and ship full-stack AI products end to end, on
              twelve years of UX, accessibility, and frontend leadership.
            </motion.p>
            <motion.div
              style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutCubic, delay: 1.2 }}
            >
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="v2-btn v2-btn-primary">
                View My Work{" "}
                <span className="v2-arrow v2-arrow-right">→</span>
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="v2-btn v2-btn-secondary">
                Get in Touch
              </a>
            </motion.div>
          </>
        ) : (
          <>
            <p className="v2-eyebrow" style={{ marginBottom: "24px" }}>
              Brandon Church
            </p>
            <h1 className="v2-heading v2-h1" style={{ marginBottom: "24px" }}>
              AI Product Engineer
            </h1>
            <p className="v2-body" style={{ marginBottom: "40px" }}>
              I design, build, and ship full-stack AI products end to end, on
              twelve years of UX, accessibility, and frontend leadership.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }} className="v2-btn v2-btn-primary">
                View My Work{" "}
                <span className="v2-arrow v2-arrow-right">→</span>
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }} className="v2-btn v2-btn-secondary">Get in Touch</a>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
      }}
    >
      {/* Backlight glow — blooms from a point behind the cube */}
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.15 }}
          animate={{ opacity: [0, 0.8, 1], scale: [0.15, 1.1, 1] }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 1.6, times: [0, 0.6, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            right: "-5%",
            transform: "translateY(-45%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 165, 116, 0.18) 0%, rgba(212, 165, 116, 0.08) 35%, rgba(212, 165, 116, 0.03) 60%, transparent 80%)",
            filter: "blur(50px)",
            willChange: "filter",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            right: "-5%",
            transform: "translateY(-45%)",
            width: "800px",
            height: "800px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212, 165, 116, 0.18) 0%, rgba(212, 165, 116, 0.08) 35%, rgba(212, 165, 116, 0.03) 60%, transparent 80%)",
            filter: "blur(50px)",
            willChange: "filter",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Bottom aurora — blooms from a point under the cube */}
      {!shouldReduceMotion ? (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ opacity: [0, 0.7, 1], scale: [0.1, 1.15, 1] }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 2.0, times: [0, 0.5, 1] }}
          style={{
            position: "absolute",
            bottom: "-8%",
            right: "5%",
            width: "900px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(212, 165, 116, 0.14) 0%, rgba(212, 165, 116, 0.06) 40%, transparent 70%)",
            filter: "blur(70px)",
            willChange: "filter",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "-8%",
            right: "5%",
            width: "900px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(212, 165, 116, 0.14) 0%, rgba(212, 165, 116, 0.06) 40%, transparent 70%)",
            filter: "blur(70px)",
            willChange: "filter",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Cube — fixed-size container, positioned via CSS class for responsive control */}
      {!shouldReduceMotion ? (
        <motion.div
          className="v2-hero-cube"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.0, ease: "easeOut", delay: 2.5 }}
          aria-hidden="true"
        >
          <RubiksCube style={{ width: "100%", height: "100%" }} />
        </motion.div>
      ) : (
        <div className="v2-hero-cube" aria-hidden="true">
          <RubiksCube style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      {/* Mouse-following gradient */}
      <MouseGradient />

      {/* Ambient glow spots */}
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.15 }}
            animate={{ opacity: [0, 0.7, 1], scale: [0.15, 1.1, 1] }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 1.8, times: [0, 0.5, 1] }}
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "60%",
              height: "60%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)",
              filter: "blur(80px)",
              willChange: "transform, filter",
              animation: "v2-glow-drift-1 20s ease-in-out infinite",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: [0, 0.7, 1], scale: [0.1, 1.15, 1] }}
            transition={{ duration: 1.4, ease: "easeOut", delay: 2.0, times: [0, 0.5, 1] }}
            style={{
              position: "absolute",
              bottom: "-10%",
              left: "-10%",
              width: "50%",
              height: "50%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212, 165, 116, 0.06) 0%, transparent 70%)",
              filter: "blur(100px)",
              willChange: "transform, filter",
              animation: "v2-glow-drift-2 25s ease-in-out infinite",
            }}
          />
        </div>
      )}

      {/* Text content — overlaid on top */}
      {heroText(!shouldReduceMotion)}
    </section>
  );
}
