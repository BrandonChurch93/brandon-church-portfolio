"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

const easeOutCubic = [0.33, 1, 0.68, 1];

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <>
      {/* Text */}
      <div style={{ flex: "1 1 0", minWidth: "0" }}>
        <p className="v2-eyebrow" style={{ marginBottom: "24px" }}>
          About
        </p>
        <h2
          className="v2-heading v2-h2"
          style={{ marginBottom: "24px" }}
        >
          How I got here
        </h2>
        <div
          className="v2-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "560px",
          }}
        >
          <p>
            I'm a design engineer who's spent the last decade obsessed
            with how software looks, feels, and works. I move fluidly
            between design and code, which means I can own a product
            end-to-end or plug into a team and immediately close the gap
            between what's designed and what ships.
          </p>
          <p>
            Over the years that's taken me from building career portals
            for Fortune 500 companies to engineering a system for the
            U.S. government that tracks over $40 billion in goods
            annually, to founding Modern Softworks, my own
            accessibility-first studio serving 40+ clients.
          </p>
        </div>
      </div>

      {/* Photo */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(240px, 25vw, 320px)",
          alignSelf: "center",
        }}
        className="v2-about-photo"
      >
        <div
          style={{
            borderRadius: "var(--v2-radius-xl)",
            overflow: "hidden",
            border: "1px solid var(--v2-border)",
            aspectRatio: "3 / 4",
            position: "relative",
          }}
        >
          <Image
            src="/images/headshot.png"
            alt="Brandon Church, Design Engineer"
            fill
            sizes="(max-width: 768px) 200px, 320px"
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    </>
  );

  if (shouldReduceMotion) {
    return (
      <section id="about" className="v2-section">
        <div className="v2-container v2-about-layout">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="v2-section">
      <motion.div
        className="v2-container v2-about-layout"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOutCubic }}
      >
        {content}
      </motion.div>
    </section>
  );
}
