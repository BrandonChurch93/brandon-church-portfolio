"use client";

import { motion } from "framer-motion";

// Easing curves
const easeOutQuint = [0.22, 1, 0.36, 1];

/**
 * SplitText — Character-by-character mask reveal animation.
 *
 * Splits text into words (for natural line-wrapping), then into
 * individual characters. Each character is wrapped in an overflow-hidden
 * span and slides up from y: 100% to y: 0%.
 *
 * Screen readers get the full text via aria-label on the container.
 */
export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  charDelay = 0.03,
  charDuration = 0.5,
  ease = easeOutQuint,
  delay = 0,
}) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: charDelay,
        delayChildren: delay,
      },
    },
  };

  const charVariants = {
    hidden: {
      y: "110%",
    },
    visible: {
      y: "0%",
      transition: {
        duration: charDuration,
        ease,
      },
    },
  };

  return (
    <Tag className={className} aria-label={text}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
        style={{ display: "inline" }}
      >
        {words.map((word, wordIndex) => (
          <span
            key={wordIndex}
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "bottom",
                  paddingBottom: "0.15em",
                  marginBottom: "-0.15em",
                }}
              >
                <motion.span
                  variants={charVariants}
                  style={{
                    display: "inline-block",
                    willChange: "transform",
                  }}
                >
                  {char}
                </motion.span>
              </span>
            ))}
            {/* Space between words */}
            {wordIndex < words.length - 1 && (
              <span style={{ display: "inline-block", width: "0.3em" }} />
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
