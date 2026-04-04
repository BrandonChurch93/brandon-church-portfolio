"use client";

import { motion } from "framer-motion";

const easeOutQuint = [0.22, 1, 0.36, 1];

/**
 * MaskedLine — Single line mask reveal.
 *
 * Wraps children in an overflow-hidden container.
 * The inner element slides up from y: 100% to y: 0%.
 */
export default function MaskedLine({
  children,
  delay = 0,
  duration = 0.5,
  ease = easeOutQuint,
  className = "",
}) {
  return (
    <div
      className={className}
      style={{ overflow: "hidden" }}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration,
          ease,
          delay,
        }}
        style={{ willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
