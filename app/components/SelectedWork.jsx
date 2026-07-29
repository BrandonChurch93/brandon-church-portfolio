"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import FlagshipCard from "./FlagshipCard";

const easeOutCubic = [0.33, 1, 0.68, 1];

export default function SelectedWork() {
  const shouldReduceMotion = useReducedMotion();

  // The flagship sits above the grid; the rest of the homepage roster fills it.
  // Anything not marked `homepage` lives only on the /work archive.
  const flagship = projects.find((p) => p.featured);
  const gridProjects = projects.filter((p) => p.homepage && !p.featured);

  const heading = (
    <>
      <h2 className="v2-heading v2-h2" style={{ marginBottom: "16px" }}>
        Selected Work
      </h2>
      <p className="v2-body" style={{ maxWidth: "56ch" }}>
        The projects that best show what I do right now. Each one shipped, each one live,
        each one built end to end.
      </p>
    </>
  );

  const headingBlock = shouldReduceMotion ? (
    <div style={{ marginBottom: "48px" }}>{heading}</div>
  ) : (
    <motion.div
      style={{ marginBottom: "48px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutCubic }}
    >
      {heading}
    </motion.div>
  );

  const allWorkLink = (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <Link href="/work" className="v2-btn v2-btn-ghost">
        View all work{" "}
        <span className="v2-project-arrow" style={{ display: "inline-block" }}>
          →
        </span>
      </Link>
    </div>
  );

  return (
    <section id="selected-work" className="v2-section">
      <div className="v2-container">
        {headingBlock}

        {flagship && <FlagshipCard project={flagship} />}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
          className="v2-projects-grid"
        >
          {gridProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {shouldReduceMotion ? (
          allWorkLink
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: easeOutCubic }}
          >
            {allWorkLink}
          </motion.div>
        )}
      </div>
    </section>
  );
}
