"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { motion, useMotionValue, AnimatePresence } from "framer-motion";

// Create context for XR interactions
const XRInteractionContext = createContext({});

export const useXRInteraction = () => useContext(XRInteractionContext);

export default function XRInteractionProvider({ children }) {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isTouch, setIsTouch] = useState(true); // Default to true for SSR
  const [cursorVisible, setCursorVisible] = useState(false); // Default to false for SSR
  const [isInitialized, setIsInitialized] = useState(false);

  // Mouse position - raw values for instant tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Refs for cursor elements
  const cursorMainRef = useRef(null);
  const cursorTrailRef = useRef(null);
  const rafRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Detect touch device and viewport size
  useEffect(() => {
    const checkDevice = () => {
      // Check if viewport is iPad Pro size or smaller (1024px)
      const isSmallViewport = window.innerWidth <= 1024;

      // Check if it's a touch device
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Disable cursor for both touch devices AND small viewports
      const shouldHideCursor = isSmallViewport || isTouchDevice;
      setIsTouch(shouldHideCursor);

      // Set cursor visibility based on device type
      if (shouldHideCursor) {
        setCursorVisible(false);
      } else {
        // For desktop, always show cursor when switching back
        setCursorVisible(true);

        // Initialize mouse position if switching from mobile to desktop
        const currentMouseX = window.innerWidth / 2;
        const currentMouseY = window.innerHeight / 2;
        mouseX.set(currentMouseX);
        mouseY.set(currentMouseY);
        lastMousePos.current = { x: currentMouseX, y: currentMouseY };

        // Force immediate cursor update
        if (cursorMainRef.current && cursorTrailRef.current) {
          const transform = `translate3d(${currentMouseX}px, ${currentMouseY}px, 0) translate(-50%, -50%)`;
          cursorMainRef.current.style.transform = transform;
          cursorTrailRef.current.style.transform = transform;
        }

        setIsInitialized(true);
      }
    };

    // Initial check
    checkDevice();

    // Update on resize with debounce for performance
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkDevice, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [mouseX, mouseY]);

  // Optimized cursor position update using RAF
  const updateCursorPosition = useCallback(() => {
    if (cursorMainRef.current && cursorTrailRef.current) {
      const { x, y } = lastMousePos.current;

      // Use transform3d for GPU acceleration
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      cursorMainRef.current.style.transform = transform;
      cursorTrailRef.current.style.transform = transform;
    }
  }, []);

  // Mouse event handlers - only for desktop
  useEffect(() => {
    // Completely skip if mobile/tablet
    if (isTouch || window.innerWidth <= 1024) return;

    const handleMouseMove = (e) => {
      // Double check it's not a touch event
      if (e.touches || window.innerWidth <= 1024) return;

      // Update position values
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update on next frame
      rafRef.current = requestAnimationFrame(updateCursorPosition);

      // Ensure cursor is visible when mouse moves
      if (!cursorVisible && window.innerWidth > 1024) {
        setCursorVisible(true);
      }
    };

    const handleMouseEnter = () => {
      if (window.innerWidth > 1024) {
        setCursorVisible(true);
      }
    };

    const handleMouseLeave = () => {
      setCursorVisible(false);
    };

    // Prevent cursor from appearing on touch/click events on mobile
    const handleTouchStart = () => {
      setCursorVisible(false);
      setIsTouch(true);
    };

    // Add event listeners with passive option for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchStart, { passive: true });

    // Force initial cursor visibility check on desktop
    if (window.innerWidth > 1024 && !isTouch) {
      setCursorVisible(true);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchStart);
      document.removeEventListener("touchend", handleTouchStart);

      // Clean up RAF
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isTouch, mouseX, mouseY, cursorVisible, updateCursorPosition]);

  // Initial cursor position setup
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Set initial cursor position and visibility on mount
    if (
      window.innerWidth > 1024 &&
      !("ontouchstart" in window || navigator.maxTouchPoints > 0)
    ) {
      setCursorVisible(true);
      // Initialize cursor at center of screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(centerX);
      mouseY.set(centerY);
      lastMousePos.current = { x: centerX, y: centerY };

      // Update cursor position immediately
      updateCursorPosition();
    }
  }, [mouseX, mouseY, updateCursorPosition]);

  // Context value
  const contextValue = {
    cursorVariant,
    setCursorVariant,
    mouseX,
    mouseY,
    isTouch,
    cursorVisible,
  };

  return (
    <XRInteractionContext.Provider value={contextValue}>
      {children}

      {/* Custom Cursor - Only render if not touch/mobile AND above 1024px */}
      <AnimatePresence>
        {!isTouch &&
          cursorVisible &&
          typeof window !== "undefined" &&
          window.innerWidth > 1024 && (
            <>
              {/* Cursor trail - larger, slower */}
              <div
                ref={cursorTrailRef}
                className="cursor-trail"
                style={{
                  position: "fixed",
                  left: 0,
                  top: 0,
                  width: 40,
                  height: 40,
                  pointerEvents: "none",
                  zIndex: 9998,
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                <motion.div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    position: "relative",
                  }}
                  animate={{
                    scale: cursorVariant === "hover" ? 0.8 : 1,
                    borderColor:
                      cursorVariant === "hover"
                        ? "rgba(245, 158, 11, 0.8)"
                        : "rgba(99, 102, 241, 0.3)",
                    borderWidth: cursorVariant === "hover" ? "2px" : "2px",
                    rotate: cursorVariant === "hover" ? 90 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
                {/* Corner accents that appear on hover */}
                <motion.div
                  style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: "50%",
                    border: "2px dotted rgba(245, 158, 11, 0.4)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: cursorVariant === "hover" ? 1 : 0,
                    scale: cursorVariant === "hover" ? 1 : 0.8,
                    rotate: cursorVariant === "hover" ? -90 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Main cursor - smaller, instant movement */}
              <div
                ref={cursorMainRef}
                className="cursor-main"
                style={{
                  position: "fixed",
                  left: 0,
                  top: 0,
                  width: 8,
                  height: 8,
                  pointerEvents: "none",
                  zIndex: 9999,
                  willChange: "transform",
                  transform: "translate3d(0, 0, 0)",
                }}
              >
                <motion.div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    position: "relative",
                  }}
                  animate={{
                    scale: cursorVariant === "hover" ? 1.2 : 1,
                    backgroundColor:
                      cursorVariant === "hover" ? "#f59e0b" : "#fff",
                    boxShadow:
                      cursorVariant === "hover"
                        ? "0 0 20px rgba(245, 158, 11, 0.6), 0 0 40px rgba(245, 158, 11, 0.3)"
                        : "0 0 20px rgba(255, 255, 255, 0.5)",
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                {/* Inner dot for depth */}
                <motion.div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    opacity: cursorVariant === "hover" ? 0.8 : 0,
                    scale: cursorVariant === "hover" ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              </div>
            </>
          )}
      </AnimatePresence>

      {/* Global styles - Updated with viewport detection */}
      <style jsx global>{`
        /* Desktop - custom cursor */
        @media (min-width: 1025px) {
          * {
            cursor: none !important;
          }

          html {
            cursor: none !important;
          }
        }

        /* iPad Pro and below - default cursor */
        @media (max-width: 1024px) {
          * {
            cursor: auto !important;
          }

          html {
            cursor: auto !important;
          }

          .cursor-trail,
          .cursor-main {
            display: none !important;
          }
        }

        /* Touch devices - default cursor */
        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }

          .cursor-trail,
          .cursor-main {
            display: none !important;
          }
        }

        /* Non-touch devices above 1024px - custom cursor */
        @media (hover: hover) and (pointer: fine) and (min-width: 1025px) {
          * {
            cursor: none !important;
          }
        }

        /* Performance optimizations for cursor elements */
        .cursor-trail,
        .cursor-main {
          contain: layout style paint;
        }
      `}</style>
    </XRInteractionContext.Provider>
  );
}

// Custom hook for cursor interactions
export const useCursorInteraction = () => {
  const { setCursorVariant, isTouch } = useXRInteraction();

  const handleMouseEnter = useCallback(() => {
    if (!isTouch) setCursorVariant("hover");
  }, [setCursorVariant, isTouch]);

  const handleMouseLeave = useCallback(() => {
    if (!isTouch) setCursorVariant("default");
  }, [setCursorVariant, isTouch]);

  const handleMouseDown = useCallback(() => {
    if (!isTouch) setCursorVariant("click");
  }, [setCursorVariant, isTouch]);

  const handleMouseUp = useCallback(() => {
    if (!isTouch) setCursorVariant("hover");
  }, [setCursorVariant, isTouch]);

  return {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };
};
