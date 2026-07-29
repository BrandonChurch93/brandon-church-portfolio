"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

// Copy ships verbatim from .claude/content/competency-copy-final.md
const tidbits = [
  {
    id: "rover",
    label: "A rover roams my house",
    text: "Home-built, LLM-connected, and fully convinced it owns the hallway.",
  },
  {
    id: "desk-robots",
    label: "My desk robots talk back",
    text: "Two desk companions wired to LLMs. They have opinions now.",
  },
  {
    id: "printed-parts",
    label: "I print the parts I design",
    text: "If a build needs a part that doesn't exist, I design it, print it, and bolt it on.",
  },
  {
    id: "vr-chapter",
    label: "There was a VR chapter",
    text: "C#, game dev, and VR before any of this. It still comes in handy.",
  },
  {
    id: "ui-sounds",
    label: "My UI sounds aren't files",
    text: "The cover letter app synthesizes its sounds from oscillators, live, in the browser.",
  },
];

export default function Tidbits() {
  const [openId, setOpenId] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const open = tidbits.find((t) => t.id === openId);

  const panel = open && (
    <div className="v2-tidbit-panel" role="region" aria-labelledby={`tidbit-btn-${open.id}`}>
      {/* Decorative slot: real photos land here later. */}
      <div className="v2-tidbit-photo" aria-hidden="true" />
      <p style={{ margin: 0, fontSize: "0.9375rem", lineHeight: 1.6, color: "var(--v2-text-secondary)" }}>
        {open.text}
      </p>
    </div>
  );

  return (
    <div style={{ marginTop: "32px" }}>
      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.14em",
          color: "var(--v2-text-dim)",
          marginBottom: "12px",
        }}
      >
        Tap for the weirder stuff
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {tidbits.map((t) => {
          const isOpen = t.id === openId;
          return (
            <button
              key={t.id}
              id={`tidbit-btn-${t.id}`}
              type="button"
              className="v2-tidbit"
              aria-expanded={isOpen}
              aria-controls={isOpen ? "tidbit-panel" : undefined}
              onClick={() => setOpenId(isOpen ? null : t.id)}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div id="tidbit-panel">
        {shouldReduceMotion ? (
          panel
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            {open && (
              <motion.div
                key={open.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: easeOutCubic }}
              >
                {panel}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
