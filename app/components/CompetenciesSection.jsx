"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Atom,
  Bot,
  CircleCheck,
  Code,
  Compass,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  LayoutTemplate,
  PenLine,
  Plug,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Users,
  Waves,
  Zap,
} from "lucide-react";
import { competencies } from "../data/competencies";

const easeOutCubic = [0.33, 1, 0.68, 1];

const ICONS = {
  Atom,
  Bot,
  CircleCheck,
  Code,
  Compass,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Layers,
  LayoutTemplate,
  PenLine,
  Plug,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Users,
  Waves,
  Zap,
};

function Row({ competency }) {
  return (
    <div className="v2-comp-row">
      <div className="v2-comp-left">
        <span className="v2-comp-idx">{competency.index}</span>
        <h3 className="v2-comp-category">{competency.category}</h3>
        <p className="v2-comp-claim">{competency.claim}</p>
        <p className="v2-comp-proof">{competency.proof}</p>
      </div>

      <div className="v2-comp-right">
        {competency.groups.map((group) => (
          <div key={group.label}>
            <div className="v2-comp-group-label">{group.label}</div>
            <div className="v2-comp-skills">
              {group.skills.map((skill, i) => {
                const Icon = ICONS[skill.icon];
                return (
                  <span
                    key={`${skill.label}-${i}`}
                    className="v2-comp-skill"
                    tabIndex={0}
                  >
                    <Icon aria-hidden="true" strokeWidth={1.6} />
                    {skill.label}
                  </span>
                );
              })}
            </div>
          </div>
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

        <div className="v2-comp-rows">
          {competencies.map((c, i) =>
            shouldReduceMotion ? (
              <Row key={c.id} competency={c} />
            ) : (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  ease: easeOutCubic,
                  delay: i * 0.08,
                }}
              >
                <Row competency={c} />
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
