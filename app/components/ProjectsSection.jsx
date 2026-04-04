"use client";

import { motion, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const easeOutCubic = [0.33, 1, 0.68, 1];

export default function ProjectsSection() {
  const shouldReduceMotion = useReducedMotion();

  // Sort: featured first
  const sorted = [...projects].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const headingBlock = shouldReduceMotion ? (
    <div style={{ marginBottom: "48px" }}>
      <h2 className="v2-heading v2-h2">
        Featured Projects
      </h2>
    </div>
  ) : (
    <motion.div
      style={{ marginBottom: "48px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutCubic }}
    >
      <h2 className="v2-heading v2-h2">
        Featured Projects
      </h2>
    </motion.div>
  );

  return (
    <section id="projects" className="v2-section">
      <div className="v2-container">
        {headingBlock}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
          className="v2-projects-grid"
        >
          {sorted.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
