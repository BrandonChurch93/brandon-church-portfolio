"use client";

import { useState, useEffect } from "react";

// Hook to detect if we should use Framer Motion
export const useFramerMotion = () => {
  const [shouldUseFramer, setShouldUseFramer] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      // Disable Framer Motion on viewports 1024px and below
      setShouldUseFramer(window.innerWidth > 1024);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return shouldUseFramer;
};

// Wrapper component that conditionally renders with or without Framer Motion
export const ResponsiveAnimationWrapper = ({
  children,
  className = "",
  motionProps = {},
  as: Component = "div",
}) => {
  const shouldUseFramer = useFramerMotion();

  // On mobile/tablet, render plain div
  if (!shouldUseFramer) {
    return <Component className={className}>{children}</Component>;
  }

  // On desktop, render with Framer Motion
  // This will need to be imported from framer-motion in the actual implementation
  const { motion } = require("framer-motion");
  const MotionComponent = motion[Component] || motion.div;

  return (
    <MotionComponent className={className} {...motionProps}>
      {children}
    </MotionComponent>
  );
};
