"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

// Mobile detection hook
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// Scroll-triggered underline component
export const ScrollTriggeredUnderline = ({ children, className }) => {
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(ref, {
    once: false,
    amount: 0.8,
    margin: "0px 0px -20% 0px",
  });

  // Simpler version for mobile
  if (isMobile) {
    return (
      <span className={`relative inline-block ${className || ""}`}>
        {children}
        <span className="absolute -bottom-2 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-[#ff3f81] to-transparent opacity-60" />
      </span>
    );
  }

  return (
    <span ref={ref} className={`relative inline-block ${className || ""}`}>
      {children}
      <motion.span
        className="absolute -bottom-3 left-0 h-[2px] origin-left"
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        animate={
          isInView
            ? {
                scaleX: 1,
                opacity: 1,
              }
            : {
                scaleX: 0,
                opacity: 0,
              }
        }
        transition={{
          duration: 0.8,
          ease: "easeOut",
          opacity: { duration: 0.3 },
        }}
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #ff3f81 10%, #ff3f81 90%, transparent 100%)",
          filter: "blur(0.5px)",
          boxShadow: "0 0 20px rgba(255,63,129,0.6)",
          width: "100%",
          transformOrigin: "center",
        }}
      />
    </span>
  );
};

// Animation variants - with mobile-safe versions
export const scrollAnimationVariants = {
  // Desktop variants (unchanged)
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  title: {
    hidden: {
      opacity: 0,
      x: -100,
      rotateY: -45,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        opacity: { duration: 0.4 },
      },
    },
  },
  slogan: {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  },
  cardLeft: {
    hidden: {
      opacity: 0,
      x: -60,
      y: 60,
      rotate: -5,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
  cardRight: {
    hidden: {
      opacity: 0,
      x: 60,
      y: 60,
      rotate: 5,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  },
  cardCenter: {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.7,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  },
  // Mobile variants - much simpler
  mobileContainer: {
    hidden: { opacity: 1 }, // Start visible
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      },
    },
  },
  mobileItem: {
    hidden: { opacity: 1 }, // Start visible
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
  },
};

// Utility hook for section animations
export const useSectionAnimation = (options = {}) => {
  const sectionRef = useRef(null);
  const isMobile = useIsMobile();
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -25% 0px",
    ...options,
  });

  const containerVariants = isMobile
    ? scrollAnimationVariants.mobileContainer
    : scrollAnimationVariants.container;

  const getVariant = (desktopVariant) => {
    return isMobile ? scrollAnimationVariants.mobileItem : desktopVariant;
  };

  return {
    sectionRef,
    isInView: isMobile ? true : isInView, // Always true on mobile
    isMobile,
    containerVariants,
    getVariant,
  };
};
