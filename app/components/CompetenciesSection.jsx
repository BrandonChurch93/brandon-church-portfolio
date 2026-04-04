"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

const competencies = [
  {
    id: "design-systems",
    title: "Design Systems & Craft",
    metric: "10+",
    metricLabel: "years of craft",
    description:
      "Designing and building component systems, interaction patterns, and visual languages from scratch. Every system I create becomes the foundation that entire product teams build on.",
    tags: [
      "Figma (Design + Dev)",
      "Design Systems Architecture",
      "Typography & Layout",
      "Motion & Interaction Design",
      "Responsive & Adaptive Design",
      "Component Libraries",
      "Visual Polish & Prototyping",
    ],
    featured: true,
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    metric: "100+",
    metricLabel: "products shipped",
    description:
      "Production-grade React applications with obsessive attention to performance and detail. Sub-2s load times across every deployment.",
    tags: [
      "React / Next.js",
      "TypeScript",
      "Advanced CSS / Tailwind",
      "Animation (Framer Motion)",
      "Performance Optimization",
      "Cross-Browser Implementation",
    ],
    featured: false,
  },
  {
    id: "accessibility",
    title: "Accessible Product Building",
    metric: "100%",
    metricLabel: "audit pass rate",
    description:
      "Shipping inclusive products from concept to production. Zero accessibility violations across all government audits. Not a single failure in my entire career.",
    tags: [
      "WCAG 2.2 / Section 508",
      "Accessibility Auditing",
      "Inclusive Design Patterns",
      "AI-Augmented Development",
      "Full-Stack Prototyping",
      "User Research & Testing",
      "Federal & Enterprise Standards",
    ],
    featured: false,
  },
];

function CompetencyCard({ competency, index }) {
  const isFeatured = competency.featured;

  return (
    <div
      className={`v2-card ${isFeatured ? "v2-card-glow" : "v2-card-solid"}`}
      style={{
        gridColumn: isFeatured ? "span 2" : "span 1",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Eyebrow */}
      <p className="v2-eyebrow" style={{ marginBottom: "20px" }}>
        {competency.title}
      </p>

      {/* Metric */}
      <div style={{ marginBottom: "16px" }}>
        <span className="v2-metric-value" style={{ fontSize: isFeatured ? "clamp(3rem, 6vw, 4.5rem)" : "clamp(2.5rem, 5vw, 3.5rem)" }}>
          {competency.metric}
        </span>
        <span
          className="v2-metric-label"
          style={{ marginLeft: "12px" }}
        >
          {competency.metricLabel}
        </span>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: isFeatured ? "1.0625rem" : "0.9375rem",
          lineHeight: 1.6,
          color: "var(--v2-text-secondary)",
          marginBottom: "24px",
          maxWidth: isFeatured ? "560px" : "none",
        }}
      >
        {competency.description}
      </p>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          flexWrap: "wrap",
          marginTop: "auto",
        }}
      >
        {competency.tags.map((tag) => (
          <span
            key={tag}
            className="v2-pill v2-pill-neutral"
            style={{ fontSize: "11px", padding: "4px 10px" }}
          >
            {tag}
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
      <h2 className="v2-heading v2-h2">
        Core Competencies
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
        Core Competencies
      </h2>
    </motion.div>
  );

  return (
    <section id="competencies" className="v2-section">
      <div className="v2-container">
        {headingBlock}

        <div className="v2-competencies-grid">
          {competencies.map((comp, i) =>
            shouldReduceMotion ? (
              <CompetencyCard key={comp.id} competency={comp} index={i} />
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
                style={{
                  gridColumn: comp.featured ? "span 2" : "span 1",
                  height: "100%",
                }}
              >
                <CompetencyCard competency={comp} index={i} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
