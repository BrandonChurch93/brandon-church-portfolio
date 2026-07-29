"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Full-width band between About and Core Competencies. The only strip on the page.
// Copy ships verbatim from .claude/content/competency-copy-final.md
export default function CredoStrip() {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <div className="v2-container" style={{ textAlign: "center" }}>
      <p className="v2-credo-line">
        Every product I&apos;ve shipped for the federal government has passed its
        accessibility audit, and everything I build today starts{" "}
        <span className="v2-credo-accent">accessible, from the design system up.</span>
      </p>
      <p className="v2-credo-sub">SECTION 508 · WCAG 2.2 · 100% PASS RATE</p>
    </div>
  );

  if (shouldReduceMotion) {
    return <div className="v2-credo">{content}</div>;
  }

  return (
    <motion.div
      className="v2-credo"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeOutCubic }}
    >
      {content}
    </motion.div>
  );
}
