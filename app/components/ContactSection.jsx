"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const easeOutCubic = [0.33, 1, 0.68, 1];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const email = "brandonleochurch@gmail.com";

  const handleCopy = async (e) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleCopy}
      className="v2-text-link"
      aria-label={copied ? "Email copied to clipboard" : `Copy email address: ${email}`}
      style={{ position: "relative" }}
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline", verticalAlign: "middle" }}>
        {copied ? (
          <polyline points="20 6 9 17 4 12" />
        ) : (
          <>
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </>
        )}
      </svg>{" "}
      {copied ? "Copied!" : "Copy my email"}
    </a>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/brandonleochurch@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  if (status === "success") {
    return (
      <div
        role="alert"
        style={{
          padding: "32px",
          borderRadius: "var(--v2-radius-lg)",
          border: "1px solid rgba(212, 165, 116, 0.2)",
          background: "var(--v2-accent-muted)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.125rem", color: "var(--v2-accent)", fontWeight: 500, marginBottom: "8px" }}>
          Message sent
        </p>
        <p style={{ fontSize: "0.875rem", color: "var(--v2-text-muted)" }}>
          I'll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} aria-hidden="true" />
      <input type="hidden" name="_subject" value="New Portfolio Contact!" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="v2-form-grid">
        <div>
          <label htmlFor="contact-name" className="v2-form-label">Name</label>
          <input id="contact-name" name="name" type="text" required className="v2-input" placeholder="Your name" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="contact-email" className="v2-form-label">Email</label>
          <input id="contact-email" name="email" type="email" required className="v2-input" placeholder="you@email.com" autoComplete="email" />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="v2-form-label">Message</label>
        <textarea id="contact-message" name="message" required rows={5} className="v2-input" placeholder="Tell me about your project..." style={{ resize: "vertical", minHeight: "176px" }} />
      </div>

      {status === "error" && (
        <p role="alert" style={{ fontSize: "0.875rem", color: "#ef4444" }}>
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        className="v2-btn v2-btn-primary v2-btn-fullwidth"
        disabled={status === "submitting"}
        style={{ width: "100%", justifyContent: "center", opacity: status === "submitting" ? 0.7 : 1 }}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
        {status !== "submitting" && <span className="v2-arrow v2-arrow-right">→</span>}
      </button>
    </form>
  );
}

export default function ContactSection() {
  const shouldReduceMotion = useReducedMotion();

  const content = (
    <div style={{ maxWidth: "880px", margin: "0 auto" }}>
      {/* Heading — centered, no subtext */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <p className="v2-eyebrow" style={{ marginBottom: "24px" }}>Contact</p>
        <h2 className="v2-heading v2-h2">
          Let's Talk
        </h2>
      </div>

      {/* Direct contact — inline links */}
      <div className="v2-contact-links" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px",
        marginBottom: "48px",
        flexWrap: "wrap",
      }}>
        <CopyEmail />
        <span style={{ color: "var(--v2-border)", fontSize: "14px", userSelect: "none" }} className="v2-contact-separator" aria-hidden="true">/</span>
        <a
          href="https://calendly.com/modernsoftworks"
          target="_blank"
          rel="noopener noreferrer"
          className="v2-text-link"
        >
          Book on Calendly <span className="v2-link-arrow-right">↗</span>
        </a>
      </div>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
        <div style={{ flex: 1, height: "1px", background: "var(--v2-border)" }} />
        <span style={{ fontSize: "11px", color: "var(--v2-text-dim)", textTransform: "uppercase", letterSpacing: "0.1em" }}>or send a message</span>
        <div style={{ flex: 1, height: "1px", background: "var(--v2-border)" }} />
      </div>

      {/* Form — full width, no card wrapper */}
      <ContactForm />
    </div>
  );

  if (shouldReduceMotion) {
    return (
      <section id="contact" className="v2-section">
        <div className="v2-container">{content}</div>
      </section>
    );
  }

  return (
    <section id="contact" className="v2-section">
      <motion.div
        className="v2-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: easeOutCubic }}
      >
        {content}
      </motion.div>
    </section>
  );
}
