"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Copy ships verbatim from .claude/content/competency-copy-final.md
// Pillars describe the pattern, not projects. No project names, no single-project stats.
const competencies = [
  {
    id: "design-systems",
    category: "Design Systems & Craft",
    claim: "I make products feel inevitable.",
    proof:
      "Tokens to components to motion, built from scratch and built for teams to ship on. The last 10% is the part I care about most.",
    chips: ["Design Systems", "Figma to Code", "Motion & Interaction", "Typography"],
  },
  {
    id: "full-stack",
    category: "Full-Stack Engineering",
    claim: "Frontend led. Full stack shipped.",
    proof:
      "A decade deep on the front, from design systems to advanced CSS. Behind it: Postgres, APIs, and pipelines that hold up at federal scale.",
    substack: [
      { lead: "Frontend, a decade deep.", rest: "React, Next.js, TypeScript, advanced CSS." },
      { lead: "Backend, shipped and steady.", rest: "Postgres, APIs, data pipelines." },
    ],
    chips: ["React & Next.js", "TypeScript", "PostgreSQL", "Performance"],
  },
  {
    id: "ai-product",
    category: "AI Product Engineering",
    claim: "AI products that prove their answers.",
    proof:
      "RAG, agentic workflows, and eval suites wired into CI. If a model is in the product, it gets measured. After hours, the same obsession in hardware.",
    chips: ["RAG", "Evals & CI", "LangGraph & MCP", "Agentic Workflows"],
  },
  {
    id: "product-leadership",
    category: "Product Leadership",
    claim: "The role changes. The standard doesn't.",
    proof:
      "VP of Product, studio founder, Director roles across federal and Fortune 500. Teams led, clients kept, outcomes owned.",
    chips: ["Product Strategy", "Client Leadership", "Zero to One", "Team Direction"],
  },
];

function CompetencyCard({ competency }) {
  return (
    <div
      className="v2-card v2-card-solid"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        height: "100%",
      }}
    >
      <p className="v2-eyebrow">{competency.category}</p>

      <h3 className="v2-h3" style={{ fontSize: "1.25rem" }}>
        {competency.claim}
      </h3>

      <p
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.6,
          color: "var(--v2-text-secondary)",
        }}
      >
        {competency.proof}
      </p>

      {competency.substack && (
        <div className="v2-substack">
          {competency.substack.map((row) => (
            <div key={row.lead} className="v2-substack-row">
              <b>{row.lead}</b>
              {row.rest}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginTop: "auto",
          paddingTop: "6px",
        }}
      >
        {competency.chips.map((chip) => (
          <span
            key={chip}
            className="v2-pill v2-pill-neutral"
            style={{ fontSize: "11px", padding: "4px 10px" }}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function CompetenciesSection() {
  const shouldReduceMotion = useReducedMotion();

  const headingBlock = shouldReduceMotion ? (
    <div style={{ marginBottom: "48px" }}>
      <h2 className="v2-heading v2-h2">Core Competencies</h2>
    </div>
  ) : (
    <motion.div
      style={{ marginBottom: "48px" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: easeOutCubic }}
    >
      <h2 className="v2-heading v2-h2">Core Competencies</h2>
    </motion.div>
  );

  return (
    <section id="competencies" className="v2-section">
      <div className="v2-container">
        {headingBlock}

        <div className="v2-competencies-grid">
          {competencies.map((comp, i) =>
            shouldReduceMotion ? (
              <CompetencyCard key={comp.id} competency={comp} />
            ) : (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: easeOutCubic,
                  delay: i * 0.1,
                }}
                style={{ height: "100%" }}
              >
                <CompetencyCard competency={comp} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
