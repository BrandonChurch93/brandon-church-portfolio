"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

// A metric with an `href` renders as a link so live numbers can be pointed at rather
// than snapshotted into the page, where they would drift out of date.
function MetricCard({ metric }) {
  const body = (
    <>
      <span className="v2-metric-value">{metric.value}</span>
      <span className="v2-metric-label">{metric.label}</span>
    </>
  );

  if (metric.href) {
    return (
      <a
        className="v2-metric-card v2-metric-card-link"
        href={metric.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {body}
        <span className="v2-metric-arrow" aria-hidden="true">↗</span>
      </a>
    );
  }

  return <div className="v2-metric-card">{body}</div>;
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
