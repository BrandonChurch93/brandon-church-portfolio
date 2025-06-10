"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaCheck,
  FaGithub,
  FaCalendarAlt,
  FaComments,
  FaPhoneAlt,
} from "react-icons/fa";
import Confetti from "./Confetti";
import {
  useXRInteraction,
  useCursorInteraction,
} from "@/components/XRInteractionProvider";
import styles from "./contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const formRef = useRef(null);
  const cursorInteraction = useCursorInteraction();
  const { mouseX, mouseY, isTouch } = useXRInteraction();

  // Validation patterns
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate field
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? "Name must be at least 2 characters"
          : "";
      case "email":
        return !emailPattern.test(value) ? "Please enter a valid email" : "";
      case "message":
        return value.trim().length < 10
          ? "Message must be at least 10 characters"
          : "";
      default:
        return "";
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle blur for inline validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Shake animation will trigger via CSS
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://formsubmit.co/brandonleochurch@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...formData,
            _captcha: "false",
            _subject: "New portfolio inquiry",
          }),
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact cards configuration
  const contactCards = [
    {
      id: "phone",
      icon: FaPhoneAlt,
      title: "Call Me",
      action: "tel:8035221065",
      tooltip: "Let's talk!",
      color: "#06b6d4",
      angle: -30,
    },
    {
      id: "email",
      icon: FaEnvelope,
      title: "Email Me",
      action: "mailto:brandonleochurch@gmail.com",
      tooltip: "Send a message",
      color: "#f59e0b",
      angle: -15,
    },
    {
      id: "linkedin",
      icon: FaLinkedin,
      title: "LinkedIn",
      action: "https://www.linkedin.com/in/brandon-church-946278138/",
      tooltip: "Let's connect!",
      color: "#0077B5",
      angle: 0,
    },
    {
      id: "schedule",
      icon: FaCalendarAlt,
      title: "Schedule",
      action: "https://calendly.com/modernsoftworks",
      tooltip: "Book a meeting",
      color: "#10b981",
      angle: 15,
    },
  ];

  return (
    <section className={styles.contact}>
      <div className="container">
        {/* Grid glow lines for extra depth */}
        <motion.div
          className={styles.gridGlow}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className={styles.glowLine} />
          <div className={styles.glowLine} />
          <div className={styles.glowLine} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <motion.h2
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.span
              className={styles.titleText}
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              Contact Me
            </motion.span>
          </motion.h2>
          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Let's build the future of human-computer interaction
          </motion.p>
        </motion.div>

        {/* Availability & Interests */}
        <motion.div
          className={styles.availabilityCard}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.availabilityStatus}>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>
              Available for new projects
            </span>
          </div>
          <motion.p className={styles.availabilityDescription}>
            With 10+ years of experience building scalable, user-focused
            products, I’m open to full-time roles, consulting, and
            collaborations that push boundaries in AI, XR, and front-end
            innovation.
          </motion.p>
          <motion.div className={styles.interestTags}>
            {[
              "React Apps",
              "Artificial Intelligence",
              "Extended Reality",
              "UI/UX Design",
            ].map((tag, index) => (
              <motion.span
                key={tag}
                className={styles.tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.05,
                  ease: [0.23, 1, 0.32, 1],
                }}
                whileHover={{
                  scale: 1.05,
                  rotateZ: [-1, 1, -1, 0],
                  transition: {
                    rotateZ: {
                      duration: 0.2,
                      repeat: 0,
                    },
                  },
                }}
                whileTap={{ scale: 0.95 }}
                {...(!isTouch && cursorInteraction)}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <div className={styles.content}>
          {/* Left Column - Contact Form */}
          <motion.div
            className={styles.formColumn}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  ref={formRef}
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Name Field */}
                  <FloatingLabelInput
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFocusedField("name")}
                    error={errors.name}
                    isTouch={isTouch}
                  />

                  {/* Email Field */}
                  <FloatingLabelInput
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFocusedField("email")}
                    error={errors.email}
                    isTouch={isTouch}
                  />

                  {/* Message Field */}
                  <FloatingLabelInput
                    name="message"
                    label="Your Message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() => setFocusedField("message")}
                    error={errors.message}
                    isTouch={isTouch}
                  />

                  {/* Submit Error */}
                  {errors.submit && (
                    <motion.p
                      className={styles.submitError}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errors.submit}
                    </motion.p>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    {...cursorInteraction}
                  >
                    {isSubmitting ? (
                      <div className={styles.spinner} />
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>

                  {/* Hidden FormSubmit fields */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input
                    type="hidden"
                    name="_subject"
                    value="New portfolio inquiry"
                  />
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className={styles.successCard}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                >
                  {showConfetti && (
                    <div className={styles.confettiWrapper}>
                      <Confetti
                        particleCount={50}
                        duration={3000}
                        colors={[
                          "#6366f1",
                          "#06b6d4",
                          "#f59e0b",
                          "#22d3ee",
                          "#fbbf24",
                        ]}
                      />
                    </div>
                  )}

                  <motion.div
                    className={styles.checkmark}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <FaCheck />
                  </motion.div>

                  <h3>Thank You!</h3>
                  <p>
                    Your message has been sent successfully. I'll get back to
                    you soon!
                  </p>

                  <motion.button
                    className={styles.resetButton}
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    {...cursorInteraction}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Contact Cards */}
          <motion.div
            className={styles.cardsColumn}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className={styles.cardsContainer}>
              {contactCards.map((card, index) => (
                <ContactCard
                  key={card.id}
                  card={card}
                  index={index}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  isTouch={isTouch}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Floating Label Input Component
const FloatingLabelInput = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  isTouch,
}) => {
  const cursorInteraction = useCursorInteraction();
  const hasValue = value.length > 0;

  return (
    <motion.div
      className={`${styles.inputGroup} ${error ? styles.hasError : ""}`}
      animate={error ? { x: [0, -5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.textarea}
          rows={4}
          {...(isTouch ? {} : cursorInteraction)}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          className={styles.input}
          {...(isTouch ? {} : cursorInteraction)}
        />
      )}

      <label
        className={`${styles.label} ${hasValue ? styles.active : ""}`}
        htmlFor={name}
      >
        {label}
      </label>

      {error && (
        <motion.span
          className={styles.errorMessage}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.span>
      )}
    </motion.div>
  );
};

// Contact Card Component - NEW DESIGN with XR Gravity
const ContactCard = ({ card, index, mouseX, mouseY, isTouch }) => {
  const cardRef = useRef(null);
  const cursorInteraction = useCursorInteraction();
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isInView, setIsInView] = useState(false);

  // Card position for gravity effect
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // Delay heavy calculations until card is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate gravity and tilt effects only when in view
  useEffect(() => {
    if (!cardRef.current || isTouch || !isInView) return;

    const updatePosition = () => {
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = mouseX.get() - centerX;
      const distanceY = mouseY.get() - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      // Gravity effect - cards pulled toward mouse
      const maxDistance = 400;
      const strength = Math.max(0, 1 - distance / maxDistance);
      const pullStrength = strength * 0.15;

      cardX.set(distanceX * pullStrength);
      cardY.set(distanceY * pullStrength);

      // 3D tilt based on mouse position
      const tiltStrength = strength * 0.3;
      rotateY.set((distanceX / maxDistance) * 15 * tiltStrength);
      rotateX.set(-(distanceY / maxDistance) * 10 * tiltStrength);
    };

    const unsubscribeX = mouseX.on("change", updatePosition);
    const unsubscribeY = mouseY.on("change", updatePosition);

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, cardX, cardY, rotateX, rotateY, isTouch, isInView]);

  // Smooth spring physics
  const springConfig = { damping: 20, stiffness: 100 };
  const x = useSpring(cardX, springConfig);
  const y = useSpring(cardY, springConfig);
  const rx = useSpring(rotateX, springConfig);
  const ry = useSpring(rotateY, springConfig);

  // Track mouse position relative to card for glow effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  // Handle mouse enter
  const handleMouseEnter = () => {
    cursorInteraction.onMouseEnter();
  };

  // Add RGB values for glow effects
  const cardColorRGB = {
    "#06b6d4": "6, 182, 212",
    "#f59e0b": "245, 158, 11",
    "#0077B5": "0, 119, 181",
    "#10b981": "16, 185, 129",
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, x: -50, rotateY: -20 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: 0.3 + index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
      style={{
        x: isTouch ? 0 : x,
        y: isTouch ? 0 : y,
        rotateX: isTouch ? 0 : rx,
        rotateY: isTouch ? 0 : ry,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <motion.a
        ref={cardRef}
        href={card.action}
        className={styles.card}
        style={{
          "--card-color": card.color,
          "--card-color-rgb": cardColorRGB[card.color] || "99, 102, 241",
          "--mouse-x": `${mousePosition.x}%`,
          "--mouse-y": `${mousePosition.y}%`,
        }}
        whileHover={{
          scale: 1.05,
          z: 30,
          transition: { duration: 0.3 },
        }}
        whileTap={{ scale: 0.98 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={cursorInteraction.onMouseLeave}
      >
        <motion.div
          className={styles.cardContent}
          animate={{
            x: isTouch ? 0 : [0, -5, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className={styles.cardIconWrapper}
            whileHover={{
              rotateZ: [0, -10, 10, -10, 0],
              scale: 1.1,
            }}
            transition={{ duration: 0.5 }}
          >
            <card.icon className={styles.cardIcon} />
          </motion.div>
          <div className={styles.cardText}>
            <h3>{card.title}</h3>
            <p>{card.tooltip}</p>
          </div>
        </motion.div>
        <motion.span
          className={styles.cardArrow}
          animate={{
            x: [0, 3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          →
        </motion.span>
      </motion.a>
    </motion.div>
  );
};

export default Contact;
