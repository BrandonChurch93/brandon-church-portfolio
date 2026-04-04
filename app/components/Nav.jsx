"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Competencies", href: "#competencies" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const mobileMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Focus trap for mobile menu
  const handleMenuKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setMobileOpen(false);
      hamburgerRef.current?.focus();
      return;
    }
    if (e.key !== "Tab" || !mobileMenuRef.current) return;
    const focusable = mobileMenuRef.current.querySelectorAll("a, button");
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const threshold = 10;

      if (currentY > lastScrollY.current + threshold && currentY > 80) {
        setIsHidden(true);
      } else if (currentY < lastScrollY.current - threshold) {
        setIsHidden(false);
      }

      setIsScrolled(currentY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      let current = "";
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            current = sections[i];
            break;
          }
        }
      }
      setActiveSection(current);
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNameClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    // If we're on the homepage, scroll to top; otherwise navigate home
    if (window.location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.location.href = "/";
    }
  };

  return (
    <>
      <nav
        className="v2-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9990,
          padding: "0 clamp(1rem, 4vw, 2rem)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isScrolled && !mobileOpen ? "rgba(12, 10, 9, 0.85)" : "transparent",
          backdropFilter: isScrolled && !mobileOpen ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled && !mobileOpen ? "blur(12px)" : "none",
          borderBottom: isScrolled && !mobileOpen ? "1px solid var(--v2-border)" : "1px solid transparent",
          transform: isHidden && !mobileOpen ? "translateY(-100%)" : "translateY(0)",
          transition: shouldReduceMotion
            ? "background 200ms ease, border-color 200ms ease"
            : "transform 300ms ease, background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease",
        }}
      >
        {/* Name */}
        <a
          href="#"
          onClick={handleNameClick}
          style={{
            fontFamily: "var(--v2-font-heading)",
            fontSize: "1.25rem",
            fontWeight: 500,
            color: "var(--v2-text)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            position: "relative",
            zIndex: 9991,
          }}
        >
          Brandon Church
        </a>

        {/* Desktop links */}
        <div className="v2-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: activeSection === link.href.substring(1) ? "var(--v2-text)" : "var(--v2-text-muted)",
                opacity: activeSection === link.href.substring(1) ? 1 : 0.7,
                textDecoration: "none",
                transition: "color 200ms ease, opacity 200ms ease",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/downloads/BrandonChurch_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="v2-btn v2-btn-ghost"
            style={{ padding: "8px 16px", fontSize: "13px" }}
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger — proper X morph */}
        <button
          ref={hamburgerRef}
          className="v2-nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            position: "relative",
            zIndex: 9991,
            width: "44px",
            height: "44px",
          }}
        >
          <div style={{ width: "24px", height: "18px", position: "relative" }}>
            {/* Top line */}
            <span
              className="v2-hamburger-line"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "24px",
                height: "1.5px",
                background: "var(--v2-text)",
                borderRadius: "1px",
                transform: mobileOpen ? "translateY(8px) rotate(45deg)" : "translateY(0) rotate(0)",
                transition: "transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
              }}
            />
            {/* Middle line */}
            <span
              className="v2-hamburger-line"
              style={{
                position: "absolute",
                left: 0,
                top: "8px",
                width: "24px",
                height: "1.5px",
                background: "var(--v2-text)",
                borderRadius: "1px",
                opacity: mobileOpen ? 0 : 1,
                transform: mobileOpen ? "scaleX(0)" : "scaleX(1)",
                transition: mobileOpen
                  ? "opacity 0.15s ease, transform 0.2s ease"
                  : "opacity 0.3s 0.12s ease, transform 0.3s 0.12s ease",
              }}
            />
            {/* Bottom line */}
            <span
              className="v2-hamburger-line"
              style={{
                position: "absolute",
                left: 0,
                top: "16px",
                width: "24px",
                height: "1.5px",
                background: "var(--v2-text)",
                borderRadius: "1px",
                transform: mobileOpen ? "translateY(-8px) rotate(-45deg)" : "translateY(0) rotate(0)",
                transition: "transform 0.35s cubic-bezier(0.215, 0.61, 0.355, 1)",
              }}
            />
          </div>
        </button>
      </nav>

      {/* Mobile menu — slide from right + blur backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Blur backdrop — click to close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9988,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                background: "rgba(12, 10, 9, 0.4)",
              }}
            />

            {/* Panel — slides from right */}
            <motion.div
              ref={mobileMenuRef}
              onKeyDown={handleMenuKeyDown}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.77, 0.2, 0.05, 1.0],
              }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                zIndex: 9989,
                width: "min(75vw, 400px)",
                background: "var(--v2-bg-alt)",
                boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "clamp(40px, 8vw, 80px) clamp(24px, 4vw, 48px)",
              }}
            >
              <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {navLinks.map((link, i) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="v2-mobile-link"
                    style={{
                      fontFamily: "var(--v2-font-heading)",
                      fontSize: "clamp(1.75rem, 6vw, 2.5rem)",
                      fontWeight: 500,
                      color: activeSection === link.href.substring(1) ? "var(--v2-accent)" : "var(--v2-text)",
                      textDecoration: "none",
                      letterSpacing: "-0.02em",
                      padding: "12px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      transition: "color 200ms ease",
                    }}
                  >
                    <span style={{
                      fontSize: "12px",
                      fontFamily: "var(--v2-font-mono)",
                      color: "var(--v2-text-dim)",
                      fontWeight: 400,
                      letterSpacing: "0",
                      minWidth: "20px",
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </a>
                ))}
              </nav>

              <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--v2-border)" }}>
                <a
                  href="/downloads/BrandonChurch_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="v2-btn v2-btn-ghost"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
