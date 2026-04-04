"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

function MetricCard({ metric }) {
  return (
    <div className="v2-metric-card">
      <span className="v2-metric-value">{metric.value}</span>
      <span className="v2-metric-label">{metric.label}</span>
    </div>
  );
}

export default function ProjectDetailClient({ metrics }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="v2-metrics-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    );
  }

  return (
    <div className="v2-metrics-grid">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: easeOutCubic,
            delay: 0.3 + i * 0.1,
          }}
        >
          <MetricCard metric={metric} />
        </motion.div>
      ))}
    </div>
  );
}
