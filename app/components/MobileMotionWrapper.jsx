"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "./ScrollAnimations";

/**
 * Wrapper component that completely bypasses Framer Motion on mobile
 * This prevents any animation initialization issues
 */
export const MobileMotionWrapper = ({
  children,
  as = "div",
  variants,
  initial,
  animate,
  exit,
  whileHover,
  whileTap,
  whileInView,
  className,
  style,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const isMobile = useIsMobile(); // Use your existing hook

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR or before mount, render as regular div to avoid hydration mismatch
  if (!isMounted) {
    const Component = as;
    return (
      <Component className={className} style={style} {...props}>
        {children}
      </Component>
    );
  }

  // On mobile, render as regular element without any motion props
  if (isMobile) {
    const Component = as;
    return (
      <Component className={className} style={style} {...props}>
        {children}
      </Component>
    );
  }

  // On desktop, render as motion component with all animations
  const MotionComponent = motion[as] || motion.div;
  return (
    <MotionComponent
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      whileHover={whileHover}
      whileTap={whileTap}
      whileInView={whileInView}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

// Export preset wrappers for common elements
export const MotionDiv = (props) => <MobileMotionWrapper as="div" {...props} />;
export const MotionSection = (props) => (
  <MobileMotionWrapper as="section" {...props} />
);
export const MotionArticle = (props) => (
  <MobileMotionWrapper as="article" {...props} />
);
export const MotionSpan = (props) => (
  <MobileMotionWrapper as="span" {...props} />
);
