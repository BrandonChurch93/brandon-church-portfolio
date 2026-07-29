"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Full-width split card for the single `featured` project. Visual left, body right,
// stacking to one column under 820px. Amber treatment and hover come from
// .v2-card-glow, the same accent card used elsewhere in the design system.
export default function FlagshipCard({ project }) {
  const shouldReduceMotion = useReducedMotion();

  const card = (
    <Link
      href={`/projects/${project.slug}`}
      className="v2-card v2-card-glow v2-flagship"
      style={{
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
    >
      <div className="v2-flagship-visual">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 820px) 100vw, 55vw"
          style={{ objectFit: "cover" }}
          className="v2-project-img"
        />
      </div>

      <div className="v2-flagship-body">
        <p className="v2-eyebrow">Flagship</p>

        <h3
          className="v2-h3"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2rem)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {project.cardTitle || project.title}
        </h3>

        {project.cardDescription && (
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "var(--v2-text-secondary)",
            }}
          >
            {project.cardDescription}
          </p>
        )}

        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {(project.cardTechStack || project.techStack.slice(0, 4)).map((tech) => (
            <span key={tech} className="v2-pill v2-pill-neutral" style={{ fontSize: "11px", padding: "4px 10px" }}>
              {tech}
            </span>
          ))}
        </div>

        <span
          className="v2-project-link"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--v2-accent)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          View Project{" "}
          <span
            className="v2-project-arrow"
            style={{
              display: "inline-block",
              transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );

  if (shouldReduceMotion) {
    return card;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: easeOutCubic }}
    >
      {card}
    </motion.div>
  );
}
