"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const easeOutCubic = [0.33, 1, 0.68, 1];

export default function ProjectCard({ project, index = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const isFeatured = project.featured;

  const cardClass = isFeatured ? "v2-card v2-card-glow" : "v2-card v2-card-solid";

  const content = (
    <>
      {/* Image */}
      <div className="v2-project-img-wrap">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          style={{ objectFit: "cover" }}
          className="v2-project-img"
        />
      </div>

      {/* Content */}
      <div>
        {isFeatured && (
          <p className="v2-eyebrow" style={{ marginBottom: "8px" }}>
            Featured Project
          </p>
        )}
        <h3
          className={isFeatured ? "v2-heading" : "v2-h3"}
          style={{
            fontSize: isFeatured ? "clamp(1.5rem, 3vw, 2rem)" : "1.25rem",
            fontWeight: 500,
            marginBottom: isFeatured ? "16px" : "12px",
            letterSpacing: "-0.01em",
          }}
        >
          {project.cardTitle || project.title}
        </h3>
        {isFeatured && (
          <p
            style={{
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "var(--v2-text-secondary)",
              marginBottom: "16px",
            }}
          >
            {project.tagline}
          </p>
        )}
        {!isFeatured && project.cardDescription && (
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: 1.6,
              color: "var(--v2-text-secondary)",
              marginBottom: "16px",
            }}
          >
            {project.cardDescription}
          </p>
        )}

        {/* Tech pills */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          {(project.cardTechStack || project.techStack.slice(0, isFeatured ? 5 : 4)).map((tech) => (
            <span key={tech} className="v2-pill v2-pill-neutral" style={{ fontSize: "11px", padding: "4px 10px" }}>
              {tech}
            </span>
          ))}
        </div>

        {/* View link */}
        <span
          className="v2-project-link"
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: project.comingSoon ? "var(--v2-text-dim)" : "var(--v2-accent)",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {project.comingSoon ? "Coming Soon" : project.isExternal ? "View on CodePen" : "View Project"}{" "}
          {!project.comingSoon && (
            <span
              className="v2-project-arrow"
              style={{
                display: "inline-block",
                transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {project.isExternal ? "↗" : "→"}
            </span>
          )}
        </span>
      </div>
    </>
  );

  const isClickable = !project.comingSoon;
  const linkProps = project.isExternal
    ? { href: project.liveUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: `/projects/${project.slug}` };

  const LinkTag = !isClickable ? "div" : project.isExternal ? "a" : Link;
  const wrapperProps = isClickable ? linkProps : {};

  // Wrap in motion for scroll entrance
  if (shouldReduceMotion) {
    return (
      <LinkTag
        {...wrapperProps}
        className={cardClass}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          cursor: isClickable ? "pointer" : "default",
          gridColumn: isFeatured ? "span 2" : "span 1",
          gridRow: isFeatured ? "span 2" : "span 1",
        }}
      >
        {content}
      </LinkTag>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: easeOutCubic,
        delay: index * 0.08,
      }}
      style={{
        gridColumn: isFeatured ? "span 2" : "span 1",
        gridRow: isFeatured ? "span 2" : "span 1",
      }}
    >
      <LinkTag
        {...wrapperProps}
        className={cardClass}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          height: "100%",
          cursor: isClickable ? "pointer" : "default",
        }}
      >
        {content}
      </LinkTag>
    </motion.div>
  );
}
