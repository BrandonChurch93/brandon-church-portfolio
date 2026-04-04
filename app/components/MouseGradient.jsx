"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

/**
 * MouseGradient — Amber radial gradient that follows the cursor.
 *
 * Uses Framer Motion's useMotionValue for zero React re-renders.
 * Disabled entirely on touch devices (pointer: coarse).
 */
export default function MouseGradient() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(212, 165, 116, 0.06),
      transparent 80%
    )
  `;

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad)
    const query = window.matchMedia("(pointer: fine)");
    setIsPointerDevice(query.matches);

    const handleChange = (e) => setIsPointerDevice(e.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isPointerDevice) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isPointerDevice, mouseX, mouseY]);

  if (!isPointerDevice) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        background,
      }}
    />
  );
}
