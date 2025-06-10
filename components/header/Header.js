"use client";

import { useState, useEffect } from "react";
import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { FiMenu, FiX, FiDownload } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { useCursorInteraction } from "@/components/XRInteractionProvider";
import styles from "./header.module.css";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const cursorInteraction = useCursorInteraction();

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1123);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Navigation items - removed 'hero' and ensured 'contact' is included
  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  // Track scroll position to toggle fixed header with smoother transition
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeFixed = latest >= 100;
    if (shouldBeFixed !== isFixed) {
      setIsFixed(shouldBeFixed);
    }
  });

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + 100; // Account for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }

      // If we're at the top, set to hero
      if (window.scrollY < 100) {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize - updated breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1123) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll to section - fixed for contact
  const scrollToSection = (sectionId) => {
    // For development, log which section we're trying to scroll to
    console.log("Scrolling to:", sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error(`Section with id "${sectionId}" not found`);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isFixed ? (
          <motion.header
            key="absolute"
            className={`${styles.header} ${styles.absolute}`}
            initial={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.container}>
              {/* XR Logo */}
              <motion.div className={styles.logo} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={styles.logoLink}
                  {...cursorInteraction}
                >
                  <XRLogo />
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className={styles.desktopNav}>
                <div className={styles.navLinks}>
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`${styles.navLink} ${
                        activeSection === item.id && isFixed
                          ? styles.active
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      {...cursorInteraction}
                    >
                      <span className={styles.navLinkText}>{item.label}</span>
                      <div className={styles.navIndicator} />
                    </motion.a>
                  ))}
                </div>

                <motion.button
                  className={styles.ctaButton}
                  onClick={() => {
                    // Open in new tab for iPad Pro and smaller (1024px)
                    if (window.innerWidth <= 1024) {
                      window.open("/assets/BrandonChurchResume.pdf", "_blank");
                    } else {
                      setShowResumeModal(true);
                    }
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  {...cursorInteraction}
                >
                  <span className={styles.ctaText}>View Resume</span>
                </motion.button>
              </nav>

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.button
                  className={styles.mobileMenuButton}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle mobile menu"
                  {...cursorInteraction}
                >
                  {/* Hexagonal container matching logo */}
                  <div className={styles.hexagonMenuFrame}>
                    {/* Gradient border */}
                    <div className={styles.hexagonMenuBorder} />

                    {/* Inner content */}
                    <div className={styles.hexagonMenuContent}>
                      <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.menuIcon}
                          >
                            <FiX />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.menuIcon}
                          >
                            <FiMenu />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Outer glow */}
                    <motion.div
                      className={styles.hexagonMenuGlow}
                      animate={{
                        opacity: isMobileMenuOpen ? 1 : 0.4,
                        scale: isMobileMenuOpen ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.button>
              )}
            </div>
          </motion.header>
        ) : (
          <motion.header
            key="fixed"
            className={`${styles.header} ${styles.fixed}`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className={styles.container}>
              {/* XR Logo */}
              <motion.div
                className={styles.logo}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={styles.logoLink}
                  {...cursorInteraction}
                >
                  <XRLogo />
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className={styles.desktopNav}>
                <div className={styles.navLinks}>
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`${styles.navLink} ${
                        activeSection === item.id && isFixed
                          ? styles.active
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      {...cursorInteraction}
                    >
                      <span className={styles.navLinkText}>{item.label}</span>
                      <div className={styles.navIndicator} />
                    </motion.a>
                  ))}
                </div>

                <motion.button
                  className={styles.ctaButton}
                  onClick={() => setShowResumeModal(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  {...cursorInteraction}
                >
                  <span className={styles.ctaText}>View Resume</span>
                  <div className={styles.ctaPulse} />
                </motion.button>
              </nav>

              {/* Mobile Menu Button */}
              {isMobile && (
                <motion.button
                  className={styles.mobileMenuButton}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Toggle mobile menu"
                  {...cursorInteraction}
                >
                  {/* Hexagonal container matching logo */}
                  <div className={styles.hexagonMenuFrame}>
                    {/* Gradient border */}
                    <div className={styles.hexagonMenuBorder} />

                    {/* Inner content */}
                    <div className={styles.hexagonMenuContent}>
                      <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.menuIcon}
                          >
                            <FiX />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={styles.menuIcon}
                          >
                            <FiMenu />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Outer glow */}
                    <motion.div
                      className={styles.hexagonMenuGlow}
                      animate={{
                        opacity: isMobileMenuOpen ? 1 : 0.4,
                        scale: isMobileMenuOpen ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.button>
              )}
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className={styles.mobileMenuBackdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className={styles.mobileMenu}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 200,
                opacity: { duration: 0.2 },
              }}
            >
              {/* XR Grid Background */}
              <div className={styles.mobileMenuBg}>
                {/* Static grid lines - no animation */}
                <div className={styles.gridPattern} />
              </div>

              {/* Close Button */}
              <motion.button
                className={styles.mobileCloseButton}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close menu"
                {...cursorInteraction}
              >
                <FiX />
              </motion.button>

              <nav className={styles.mobileNav}>
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`${styles.mobileNavLink} ${
                      activeSection === item.id && isFixed ? styles.active : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      type: "spring",
                      damping: 20,
                      stiffness: 150,
                    }}
                    whileHover={{ x: 10 }}
                    {...cursorInteraction}
                  >
                    <span className={styles.linkNumber}>0{index + 1}</span>
                    <span className={styles.linkText}>{item.label}</span>
                    <motion.div
                      className={styles.linkHover}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}

                <motion.button
                  className={styles.mobileCta}
                  onClick={() => {
                    window.open("/assets/BrandonChurchResume.pdf", "_blank");
                    setIsMobileMenuOpen(false);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  {...cursorInteraction}
                >
                  View Resume
                </motion.button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Resume Modal */}
      <AnimatePresence>
        {showResumeModal && (
          <ResumeModal onClose={() => setShowResumeModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// Simplified XR Logo Component - Just BC Letters with Glow
const XRLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`${styles.xrLogoContainer} ${isHovered ? styles.hovered : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hexagonal Container */}
      <div className={styles.hexagonalFrame}>
        {/* Static gradient border */}
        <div className={styles.hexagonBorder} />

        {/* Inner Content Area */}
        <div className={styles.hexagonContent}>
          {/* BC Letters Container */}
          <div className={styles.bcLetters}>
            {/* Letter B */}
            <motion.div
              className={styles.letterB}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              B
            </motion.div>

            {/* Letter C */}
            <motion.div
              className={styles.letterC}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              C
            </motion.div>
          </div>
        </div>

        {/* Outer Glow Effect */}
        <motion.div
          className={styles.hexagonGlow}
          animate={{
            opacity: isHovered ? 1 : 0.6,
            scale: isHovered ? 1.2 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  );
};

// Resume Modal Component
const ResumeModal = ({ onClose }) => {
  const cursorInteraction = useCursorInteraction();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/BrandonChurchResume.pdf";
    link.download = "BrandonChurchResume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>Resume</h2>
          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            {...cursorInteraction}
          >
            <FiX />
          </motion.button>
        </div>

        <div className={styles.resumeContainer}>
          <iframe
            src="/assets/BrandonChurchResume.pdf"
            width="100%"
            height="100%"
            title="Brandon Church Resume"
            className={styles.resumeFrame}
          />
        </div>

        <div className={styles.modalFooter}>
          <motion.button
            className={styles.downloadButton}
            onClick={handleDownload}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...cursorInteraction}
          >
            <FiDownload />
            Download Resume
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
