import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaCodepen,
  FaArrowUp,
} from "react-icons/fa";
import { FiDownload, FiX } from "react-icons/fi";
import {
  useXRInteraction,
  useCursorInteraction,
} from "@/components/XRInteractionProvider";
import { useChatbot } from "@/components/Chatbot/useChatbot";
import styles from "./footer.module.css";

const Footer = () => {
  const footerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const cursorInteraction = useCursorInteraction();
  const { mouseX, mouseY, isTouch } = useXRInteraction();
  const { openChatbot } = useChatbot();

  // Mouse position relative to footer
  const relativeMouseX = useMotionValue(0);
  const relativeMouseY = useMotionValue(0);

  // Magnetic effect transforms (subtle)
  const magneticX = useTransform(relativeMouseX, (value) => {
    if (!footerRef.current) return 0;
    const rect = footerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const distance = value - centerX;
    return distance * 0.02;
  });

  const magneticY = useTransform(relativeMouseY, (value) => {
    if (!footerRef.current) return 0;
    const rect = footerRef.current.getBoundingClientRect();
    const centerY = rect.height / 2;
    const distance = value - centerY;
    return distance * 0.05;
  });

  // Spring physics - removed to prevent footer movement

  // Update relative mouse position
  useEffect(() => {
    if (!footerRef.current || isTouch) return;

    const updateRelativePosition = () => {
      const rect = footerRef.current.getBoundingClientRect();
      relativeMouseX.set(mouseX.get() - rect.left);
      relativeMouseY.set(mouseY.get() - rect.top);
    };

    const unsubscribeX = mouseX.on("change", updateRelativePosition);
    const unsubscribeY = mouseY.on("change", updateRelativePosition);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, relativeMouseX, relativeMouseY, isTouch]);

  // Create particle burst
  const createParticleBurst = (x, y, color) => {
    const newParticles = [];
    const particleCount = 10;

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const velocity = 2 + Math.random() * 3;
      const size = 2 + Math.random() * 4;

      newParticles.push({
        id: `${Date.now()}-${i}`,
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2,
        size,
        color,
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id))
      );
    }, 1200);
  };

  // Navigation items (from header)
  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "portfolio", label: "Portfolio" },
    { id: "contact", label: "Contact" },
  ];

  // Social links - UPDATED WITH CORRECT URLS
  const socialLinks = [
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@brandonchurch2328",
      label: "YouTube",
      color: "#FF0000",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/brandon-church-946278138/",
      label: "LinkedIn",
      color: "#0077B5",
    },
    {
      icon: FaGithub,
      href: "https://github.com/BrandonChurch93",
      label: "GitHub",
      color: "#6366f1",
    },
    {
      icon: FaCodepen,
      href: "https://codepen.io/BrandonLeoChurch",
      label: "CodePen",
      color: "#47CF73",
    },
  ];

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Handle resume button click
  const handleResumeClick = () => {
    // Open in new tab for iPad Pro and smaller (1024px)
    if (window.innerWidth <= 1024) {
      window.open("/assets/BrandonChurchResume.pdf", "_blank");
    } else {
      setShowResumeModal(true);
    }
  };

  return (
    <footer ref={footerRef} className={styles.footer}>
      {/* XR Grid Background */}
      <div className={styles.bgPattern}>
        <div className={styles.bgGradient} />
      </div>

      <motion.div
        className={styles.footerContent}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.container}>
          {/* Top Section */}
          <div className={styles.footerTop}>
            {/* Brand Section */}
            <div className={styles.brandSection}>
              <h3 className={styles.brandTitle}>Brandon Church</h3>
              <p className={styles.brandTagline}>
                AI-First UI/UX Developer & XR Interface Architect
              </p>
              <p className={styles.brandDescription}>
                Designing intelligent interfaces with LLM integration, adaptive
                UX, and immersive XR experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className={styles.linksSection}>
              <h4 className={styles.sectionTitle}>Quick Links</h4>
              <nav className={styles.footerNav}>
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={styles.navLink}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    whileHover={{ x: 5 }}
                    {...cursorInteraction}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Connect Section */}
            <div className={styles.connectSection}>
              <h4 className={styles.sectionTitle}>Connect</h4>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={social.label}
                      whileHover={{ scale: 1.2, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={(e) => {
                        cursorInteraction.onMouseEnter();
                        const rect = e.currentTarget.getBoundingClientRect();
                        const footerRect =
                          footerRef.current.getBoundingClientRect();
                        createParticleBurst(
                          rect.left + rect.width / 2 - footerRect.left,
                          rect.top + rect.height / 2 - footerRect.top,
                          social.color
                        );
                      }}
                      onMouseLeave={cursorInteraction.onMouseLeave}
                      style={{ "--social-color": social.color }}
                    >
                      <Icon size={22} />
                      <span className={styles.socialTooltip}>
                        {social.label}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
              <div className={styles.buttonGroup}>
                <motion.button
                  className={styles.resumeButton}
                  onClick={handleResumeClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  {...cursorInteraction}
                >
                  <span>View Resume</span>
                </motion.button>
                <motion.button
                  className={styles.aiButton}
                  onClick={openChatbot}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  {...cursorInteraction}
                >
                  <span>Ask Brandon's AI</span>
                </motion.button>
              </div>
              <div className={styles.availability}>
                <div className={styles.availabilityIndicator} />
                <span>Available for new projects</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Bottom Section */}
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © 2025 Brandon Church. All rights reserved.
            </p>
            <motion.button
              className={styles.backToTop}
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
              {...cursorInteraction}
            >
              <FaArrowUp />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Particles */}
      <div className={styles.particles}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={styles.particle}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: particle.x + particle.vx * 50,
              y: particle.y + particle.vy * 50,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}
      </div>

      {/* Resume Modal */}
      {showResumeModal && (
        <ResumeModal onClose={() => setShowResumeModal(false)} />
      )}
    </footer>
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
            className={styles.modalCloseButton}
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

export default Footer;
