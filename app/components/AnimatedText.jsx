"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";

// Component for animated title with letter-by-letter hover effect - now with neon outline
export const AnimatedTitle = ({
  children,
  className,
  disableAnimation = false,
}) => {
  const letters = children.split("");
  const containerRef = useRef(null);

  const handleLetterHover = (index) => {
    if (!containerRef.current || disableAnimation) return;
    const letterElements = containerRef.current.children;

    // Animate neighboring letters
    if (index > 0 && letterElements[index - 1]) {
      letterElements[index - 1].style.transform = "translateY(-2px)";
      setTimeout(() => {
        if (letterElements[index - 1]) {
          letterElements[index - 1].style.transform = "";
        }
      }, 200);
    }

    if (index < letterElements.length - 1 && letterElements[index + 1]) {
      letterElements[index + 1].style.transform = "translateY(-2px)";
      setTimeout(() => {
        if (letterElements[index + 1]) {
          letterElements[index + 1].style.transform = "";
        }
      }, 200);
    }
  };

  // If animation is disabled, just return plain text
  if (disableAnimation) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={containerRef} className={cn("inline-flex", className)}>
      <style jsx>{`
        @keyframes neonGlow {
          from {
            text-shadow: 0 0 10px rgba(255, 63, 129, 0.8),
              0 0 20px rgba(255, 63, 129, 0.6), 0 0 30px rgba(255, 63, 129, 0.4);
          }
          to {
            text-shadow: 0 0 20px rgba(255, 63, 129, 0.8),
              0 0 30px rgba(255, 63, 129, 0.6), 0 0 40px rgba(255, 63, 129, 0.4);
          }
        }
      `}</style>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block cursor-default letter-animation"
          initial={{
            y: 0,
            scale: 1,
          }}
          whileHover={{
            y: -6,
            scale: 1.05,
            transition: {
              y: {
                type: "spring",
                stiffness: 400,
                damping: 10,
              },
              scale: {
                duration: 0.2,
              },
            },
          }}
          onHoverStart={() => handleLetterHover(index)}
          style={{
            transition: "all 200ms ease",
            display: "inline-block",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transition: "all 200ms ease",
            }}
            className="hover:text-transparent hover:stroke-text"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        </motion.span>
      ))}
    </span>
  );
};

// Component for animated slogan with centered expanding gradient bar
export const AnimatedSlogan = ({ children, className }) => {
  return (
    <motion.span
      className={cn("relative inline-block group cursor-default", className)}
      whileHover="hover"
    >
      {children}
      <motion.span
        className="absolute -bottom-3 left-1/2 h-[2px]"
        initial={{
          width: "20px",
          x: "-50%",
          opacity: 0,
        }}
        variants={{
          hover: {
            width: "100%",
            opacity: 1,
            transition: {
              width: {
                duration: 0.4,
                ease: "easeOut",
              },
              opacity: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
          },
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #ff3f81 20%, #ff3f81 80%, transparent 100%)",
          filter: "blur(0.5px)",
          boxShadow: "0 0 10px rgba(255,63,129,0.5)",
        }}
      />
    </motion.span>
  );
};

// Alternative slogan animation with word-by-word reveal (keeping for potential future use)
export const AnimatedSloganWords = ({ children, className, isInView }) => {
  const words = children.split(" ");

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      className={cn("inline-flex flex-wrap gap-x-2 justify-center", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
