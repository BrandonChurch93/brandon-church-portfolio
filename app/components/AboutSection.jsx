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
            I&apos;m driven by scientific discovery, human prosperity, and problems at
            every scale. Some span a federal supply chain. Some fit on a desk. If
            solving it leaves people better off, I&apos;m interested.
          </p>
          <p>
            What I do about it: design and build products end to end, held to a
            standard most software skips. The problem has to be real, the solution has
            to feel effortless for the person on the other side, and the whole thing
            has to be done with taste. Taste never shows up in a spec, but it&apos;s the
            difference between software that works and software people actually want to
            use.
          </p>
          <p>
            Twelve years of that standard looks like career portals for Fortune 500
            companies, a federal system tracking $43 billion in goods, and a studio I
            founded that serves 40+ clients, every one of those products accessible to
            everyone.
          </p>
          <p>
            Now the problems I can&apos;t put down run through AI. I ship AI products end
            to end, and after hours I build machines: desk robots that talk back, a
            rover that roams my house. That&apos;s what&apos;s next, putting AI to work on
            real problems, in software and in the physical world.
          </p>
        </div>
      </div>

      {/* Photo */}
      <div
        style={{
          flexShrink: 0,
          width: "clamp(240px, 29vw, 374px)",
          alignSelf: "center",
        }}
        className="v2-about-photo"
      >
        <div
          style={{
            borderRadius: "var(--v2-radius-xl)",
            overflow: "hidden",
            border: "1px solid var(--v2-border)",
            aspectRatio: "3 / 4.4",
            position: "relative",
          }}
        >
          <Image
            src="/images/headshot.png"
            alt="Brandon Church, AI Product Engineer"
            fill
            sizes="(max-width: 768px) 300px, 440px"
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
