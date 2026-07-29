"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const easeOutCubic = [0.33, 1, 0.68, 1];

// The uniform card. Every project renders identically here, on the homepage grid and
// on the /work archive alike. The flagship gets its own component, FlagshipCard.
// `showCategoryTag` is driven by the archive's data rule: the corner tag only appears
// once two or more categories are populated. See WorkArchive.
// `headingLevel` keeps the document outline correct wherever the card is used: h3 under
// a section h2 on the homepage, h2 when the cards sit directly beneath the /work h1.
export default function ProjectCard({
  project,
  index = 0,
  showCategoryTag = false,
  headingLevel: Heading = "h3",
}) {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <>
      {/* Image */}
      <div className="v2-project-img-wrap">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="v2-project-img"
        />
        {showCategoryTag && project.category && (
          <span className="v2-cat-tag">{project.category}</span>
        )}
      </div>

      {/* Content */}
      <div>
        <Heading
          className="v2-h3"
          style={{
            fontSize: "1.25rem",
            fontWeight: 500,
            marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}
        >
          {project.cardTitle || project.title}
        </Heading>
        {project.cardDescription && (
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
          {/* Uniform cards cap at 3 chips; the flagship keeps 4 via FlagshipCard.
              `cardTechStackGrid` lets a project that renders in both places choose a
              different three here without disturbing its flagship chip order. */}
          {(project.cardTechStackGrid || project.cardTechStack || project.techStack)
            .slice(0, 3)
            .map((tech) => (
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
          {project.comingSoon ? "Coming Soon" : "View Project"}{" "}
          {!project.comingSoon && (
            <span
              className="v2-project-arrow"
              style={{
                display: "inline-block",
                transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              →
            </span>
          )}
        </span>
      </div>
    </>
  );

  const isClickable = !project.comingSoon;
  const LinkTag = !isClickable ? "div" : Link;
  const wrapperProps = isClickable ? { href: `/projects/${project.slug}` } : {};

  if (shouldReduceMotion) {
    return (
      <LinkTag
        {...wrapperProps}
        className="v2-card v2-card-solid"
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
    >
      <LinkTag
        {...wrapperProps}
        className="v2-card v2-card-solid"
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
