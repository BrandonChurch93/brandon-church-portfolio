"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCheck } from "react-icons/fa";
import { useCursorInteraction } from "@/components/XRInteractionProvider";
import styles from "./portfolioModal.module.css";

const PortfolioModal = ({ project, onClose }) => {
  const cursorInteraction = useCursorInteraction();
  const Icon = project.icon;

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Modal animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
          style={{ "--project-color": project.color }}
        >
          {/* Close Button */}
          <motion.button
            className={styles.closeButton}
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            {...cursorInteraction}
          >
            <FaTimes />
          </motion.button>

          {/* Modal Header */}
          <div className={styles.header}>
            <div className={styles.iconContainer}>
              <Icon className={styles.icon} />
            </div>
            <div className={styles.headerContent}>
              <h2 className={styles.title}>{project.title}</h2>
              <span className={styles.category}>{project.category}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className={styles.heroImage}>
            <img src={project.image} alt={project.title} />
            <div className={styles.heroOverlay} />
          </div>

          {/* Modal Content */}
          <div className={styles.content}>
            {/* Overview Section */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Overview</h3>
              <p className={styles.overview}>{project.details.overview}</p>
            </section>

            {/* Features Section */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Key Features</h3>
              <div className={styles.features}>
                {project.details.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    className={styles.feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FaCheck className={styles.featureIcon} />
                    <span>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Tech Stack Section */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Technologies</h3>
              <div className={styles.techStack}>
                {project.details.tech.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className={styles.techItem}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </section>

            {/* Metrics Section */}
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Performance Metrics</h3>
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricLabel}>Performance</span>
                    <span className={styles.metricValue}>
                      {project.details.metrics.performance}
                    </span>
                  </div>
                  <div className={styles.metricBar}>
                    <motion.div
                      className={styles.metricFill}
                      initial={{ width: 0 }}
                      animate={{ width: project.details.metrics.performance }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricLabel}>Accessibility</span>
                    <span className={styles.metricValue}>
                      {project.details.metrics.accessibility}
                    </span>
                  </div>
                  <div className={styles.metricBar}>
                    <motion.div
                      className={styles.metricFill}
                      initial={{ width: 0 }}
                      animate={{ width: project.details.metrics.accessibility }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
                <div className={styles.metric}>
                  <div className={styles.metricHeader}>
                    <span className={styles.metricLabel}>
                      User Satisfaction
                    </span>
                    <span className={styles.metricValue}>
                      {project.details.metrics.userSatisfaction}
                    </span>
                  </div>
                  <div className={styles.metricBar}>
                    <motion.div
                      className={styles.metricFill}
                      initial={{ width: 0 }}
                      animate={{
                        width: `${
                          (parseFloat(
                            project.details.metrics.userSatisfaction
                          ) /
                            5) *
                          100
                        }%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Action Buttons - Sticky at bottom */}
          <div className={styles.actions}>
            <motion.a
              href={project.github}
              className={styles.actionButton}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...cursorInteraction}
            >
              <FaGithub />
              <span>View Code</span>
            </motion.a>
            <motion.a
              href={project.live}
              className={`${styles.actionButton} ${styles.primaryButton}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              {...cursorInteraction}
            >
              <FaExternalLinkAlt />
              <span>Live Demo</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PortfolioModal;
