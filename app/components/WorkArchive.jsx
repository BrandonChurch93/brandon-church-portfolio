"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Categories are derived from the data, never hardcoded. The filter row and the card
// corner-tags both stay dormant until at least two categories actually have projects
// in them, so nothing dead ships and nothing has to be uncommented later.
function populatedCategories(list) {
  const counts = new Map();
  for (const p of list) {
    if (!p.category) continue;
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, n]) => n > 0)
    .map(([name, count]) => ({ name, count }));
}

export default function WorkArchive() {
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState("all");

  const categories = populatedCategories(projects);
  const filtersEnabled = categories.length >= 2;

  const visible = filtersEnabled && active !== "all"
    ? projects.filter((p) => p.category === active)
    : projects;

  const header = (
    <>
      <p className="v2-crumb">
        <Link href="/" className="v2-text-link">
          <span className="v2-link-arrow-left">←</span> Home
        </Link>
      </p>
      <h1 className="v2-heading v2-h1" style={{ marginBottom: "16px" }}>
        All Work
      </h1>
      <p className="v2-body" style={{ maxWidth: "52ch" }}>
        The full catalog. Everything here is real and running, and the list grows as I build.
      </p>
    </>
  );

  return (
    <div
      className="v2-container"
      style={{ paddingTop: "96px", paddingBottom: "var(--v2-section-padding)" }}
    >
      {shouldReduceMotion ? (
        <div>{header}</div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutCubic }}
        >
          {header}
        </motion.div>
      )}

      <div className="v2-archive-bar">
        <p className="v2-archive-count">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>

        {filtersEnabled && (
          <div className="v2-archive-filters" role="group" aria-label="Filter projects by category">
            <button
              type="button"
              className="v2-filter"
              aria-pressed={active === "all"}
              onClick={() => setActive("all")}
            >
              All <span className="v2-filter-count">{projects.length}</span>
            </button>
            {categories.map((c) => (
              <button
                key={c.name}
                type="button"
                className="v2-filter"
                aria-pressed={active === c.name}
                onClick={() => setActive(c.name)}
              >
                {c.name} <span className="v2-filter-count">{c.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}
        className="v2-projects-grid"
      >
        {visible.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            showCategoryTag={filtersEnabled}
            headingLevel="h2"
          />
        ))}
      </div>
    </div>
  );
}
