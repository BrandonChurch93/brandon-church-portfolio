"use client";

import { useState } from "react";

// ============================================================
// DESIGN SYSTEM EXPLORATION PAGE
// Locked: Warm Amber palette + Cormorant Garamond headings
// Purpose: Evaluate card, button, and component variants
// ============================================================

const c = {
  bg: "#0C0A09",
  bgAlt: "#1C1917",
  surface: "#252220",
  surfaceHover: "#2E2A27",
  surfaceElevated: "#37322F",
  accent: "#D4A574",
  accentHover: "#E0B88A",
  accentSubtle: "#C49A6C",
  accentMuted: "rgba(212, 165, 116, 0.12)",
  text: "#FAFAF9",
  textSecondary: "#D6D3D1",
  textMuted: "#A8A29E",
  textDim: "#78716C",
  border: "rgba(255, 255, 255, 0.06)",
  borderHover: "rgba(255, 255, 255, 0.12)",
  borderAccent: "rgba(212, 165, 116, 0.15)",
  borderAccentHover: "rgba(212, 165, 116, 0.3)",
};

const heading = "var(--font-cormorant), Georgia, serif";
const body = "var(--font-geist-sans), system-ui, sans-serif";
const mono = "var(--font-geist-mono), monospace";

// ---- Grain Overlay ----
function GrainOverlay() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", opacity: 0.04, mixBlendMode: "overlay" }}>
      <svg width="100%" height="100%">
        <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
}

// ---- Section Header ----
function SectionHeader({ label, children }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "8px", fontWeight: 500, fontFamily: body }}>{label}</p>
      {children && <p style={{ fontSize: "15px", color: c.textMuted, fontFamily: body, lineHeight: 1.6, maxWidth: "640px" }}>{children}</p>}
    </div>
  );
}

// ---- Swatch ----
function Swatch({ color, label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <div style={{ width: "40px", height: "40px", borderRadius: "8px", backgroundColor: color, border: `1px solid ${c.border}`, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, fontFamily: body }}>{label}</div>
        <div style={{ fontSize: "11px", color: c.textDim, fontFamily: mono }}>{value}</div>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <>
      <GrainOverlay />
      {/* Radial glow bg */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: c.bg }}>
        <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle, ${c.accent}10 0%, transparent 70%)`, filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: `radial-gradient(circle, ${c.accent}08 0%, transparent 70%)`, filter: "blur(100px)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", color: c.text, fontFamily: body }}>
        {/* Nav */}
        <nav style={{ position: "sticky", top: 0, zIndex: 100, padding: "16px 24px", background: `${c.bg}ee`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${c.border}`, display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{ fontFamily: heading, fontSize: "1.25rem", fontWeight: 500, color: c.text }}>Design System</span>
          <span style={{ fontSize: "12px", color: c.textDim, fontFamily: body }}>Warm Amber + Cormorant Garamond + Geist</span>
          <a href="/" style={{ marginLeft: "auto", fontSize: "13px", color: c.textMuted, textDecoration: "none" }}>Back to Portfolio</a>
        </nav>

        <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 128px" }}>

          {/* ========== PALETTE ========== */}
          <section style={{ marginBottom: "96px" }}>
            <SectionHeader label="Color Palette">
              Warm amber on near-black. Inspired by Linear&apos;s elevation model and Stripe&apos;s warm neutrals. Each surface step is ~8-10 LCH lightness points apart.
            </SectionHeader>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
              <Swatch color={c.bg} label="Background" value="#0C0A09" />
              <Swatch color={c.bgAlt} label="Surface" value="#1C1917" />
              <Swatch color={c.surface} label="Elevated" value="#252220" />
              <Swatch color={c.surfaceHover} label="Hover" value="#2E2A27" />
              <Swatch color={c.accent} label="Accent" value="#D4A574" />
              <Swatch color={c.accentHover} label="Accent Hover" value="#E0B88A" />
              <Swatch color={c.text} label="Text" value="#FAFAF9" />
              <Swatch color={c.textSecondary} label="Text Secondary" value="#D6D3D1" />
              <Swatch color={c.textMuted} label="Text Muted" value="#A8A29E" />
              <Swatch color={c.textDim} label="Text Dim" value="#78716C" />
            </div>
          </section>

          {/* ========== TYPOGRAPHY ========== */}
          <section style={{ marginBottom: "96px" }}>
            <SectionHeader label="Typography Scale">
              Cormorant Garamond at weight 500 for headings (open, airy counters). Geist Sans at 18px body. 5:1 heading-to-body ratio for premium contrast.
            </SectionHeader>
            <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
              <div>
                <p style={{ fontSize: "11px", color: c.textDim, fontFamily: mono, marginBottom: "8px" }}>h1 — clamp(3rem, 8vw, 5.5rem) · weight 500 · -0.03em</p>
                <h1 style={{ fontFamily: heading, fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.03em" }}>Design Engineer</h1>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: c.textDim, fontFamily: mono, marginBottom: "8px" }}>h2 — clamp(2rem, 4vw, 2.75rem) · weight 500 · -0.02em</p>
                <h2 style={{ fontFamily: heading, fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em" }}>Featured Projects</h2>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: c.textDim, fontFamily: mono, marginBottom: "8px" }}>h3 — Geist · 1.5rem · weight 500 · -0.01em</p>
                <h3 style={{ fontFamily: body, fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.25, letterSpacing: "-0.01em" }}>Accessibility & Design Systems</h3>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: c.textDim, fontFamily: mono, marginBottom: "8px" }}>eyebrow — Geist · 0.75rem · uppercase · 0.1em · weight 500</p>
                <p style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent }}>Featured Project</p>
              </div>
              <div>
                <p style={{ fontSize: "11px", color: c.textDim, fontFamily: mono, marginBottom: "8px" }}>body — Geist · 1.125rem (18px) · line-height 1.65</p>
                <p style={{ fontSize: "1.125rem", lineHeight: 1.65, color: c.textSecondary, maxWidth: "640px" }}>
                  I design, build, and ship full-stack AI products end to end, on twelve years of UX, accessibility, and frontend leadership.
                </p>
              </div>
            </div>
          </section>

          {/* ========== HERO PREVIEW ========== */}
          <section style={{ marginBottom: "96px" }}>
            <SectionHeader label="Hero Preview">
              Radial glow background with grain overlay. Eyebrow + display heading + body + dual CTA.
            </SectionHeader>
            <div style={{ padding: "clamp(48px, 8vw, 96px) clamp(24px, 4vw, 64px)", borderRadius: "16px", border: `1px solid ${c.border}`, background: c.bgAlt, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "-30%", right: "-15%", width: "50%", height: "80%", borderRadius: "50%", background: `radial-gradient(circle, ${c.accent}0d 0%, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none" }} />
              <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: "24px", fontWeight: 500 }}>Brandon Church</p>
              <h1 style={{ fontFamily: heading, fontSize: "clamp(2.5rem, 7vw, 5.5rem)", fontWeight: 500, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "24px" }}>Design Engineer</h1>
              <p style={{ fontSize: "1.125rem", lineHeight: 1.65, color: c.textSecondary, maxWidth: "540px", marginBottom: "40px" }}>
                I design, build, and ship full-stack AI products end to end, on twelve years of UX, accessibility, and frontend leadership.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button style={{ padding: "12px 28px", borderRadius: "8px", background: c.accent, color: c.bg, border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: body }}>View My Work</button>
                <button style={{ padding: "12px 28px", borderRadius: "8px", background: "transparent", color: c.textSecondary, border: `1px solid ${c.border}`, fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: body }}>Get in Touch</button>
              </div>
            </div>
          </section>

          {/* ========== CARD VARIANTS ========== */}
          <section style={{ marginBottom: "96px" }}>
            <SectionHeader label="Card Variants — Pick Your Favorite">
              Six card styles ranging from minimal to expressive. Hover each to see the interaction. All use the same elevation model.
            </SectionHeader>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "16px" }}>

              {/* Card A: Solid Surface (Linear-style) */}
              <div
                onMouseEnter={() => setHoveredCard("a")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  background: hoveredCard === "a" ? c.surface : c.bgAlt,
                  border: `1px solid ${hoveredCard === "a" ? c.borderHover : c.border}`,
                  transform: hoveredCard === "a" ? "translateY(-2px)" : "none",
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "4px", fontWeight: 500 }}>Option A</p>
                <p style={{ fontSize: "11px", color: c.textDim, marginBottom: "16px" }}>Solid Surface — Linear style. Surface fill + subtle border + lift on hover.</p>
                <h3 style={{ fontFamily: heading, fontSize: "1.5rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "-0.01em" }}>Design Systems Architecture</h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary }}>Building comprehensive component libraries from scratch, establishing typography, color systems, and reusable patterns.</p>
              </div>

              {/* Card B: Gradient Border */}
              <div
                onMouseEnter={() => setHoveredCard("b")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  background: `linear-gradient(${c.bgAlt}, ${c.bgAlt}) padding-box, linear-gradient(135deg, ${hoveredCard === "b" ? "rgba(212,165,116,0.5)" : "rgba(212,165,116,0.2)"}, ${hoveredCard === "b" ? "rgba(212,165,116,0.15)" : "rgba(212,165,116,0.03)"}) border-box`,
                  border: "1px solid transparent",
                  transform: hoveredCard === "b" ? "translateY(-2px)" : "none",
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "4px", fontWeight: 500 }}>Option B</p>
                <p style={{ fontSize: "11px", color: c.textDim, marginBottom: "16px" }}>Gradient Border — Border fades from accent to transparent. Intensifies on hover.</p>
                <h3 style={{ fontFamily: heading, fontSize: "1.5rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "-0.01em" }}>Accessibility Compliance</h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary }}>100% Section 508 audit record with zero violations. WCAG 2.2 compliance across every project.</p>
              </div>

              {/* Card C: Accent Top Line */}
              <div
                onMouseEnter={() => setHoveredCard("c")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  background: c.bgAlt,
                  border: `1px solid ${c.border}`,
                  borderTop: `2px solid ${hoveredCard === "c" ? c.accent : c.borderAccent}`,
                  transform: hoveredCard === "c" ? "translateY(-2px)" : "none",
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "4px", fontWeight: 500 }}>Option C</p>
                <p style={{ fontSize: "11px", color: c.textDim, marginBottom: "16px" }}>Accent Top Line — 2px amber border top. Clean hierarchy signal.</p>
                <h3 style={{ fontFamily: heading, fontSize: "1.5rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "-0.01em" }}>AI-Augmented Development</h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary }}>Leveraging Claude Code and OpenAI to ship production-grade applications at team-scale velocity.</p>
              </div>

              {/* Card D: Glow Card */}
              <div
                onMouseEnter={() => setHoveredCard("d")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  background: c.bgAlt,
                  border: `1px solid ${hoveredCard === "d" ? c.borderAccentHover : c.border}`,
                  boxShadow: hoveredCard === "d" ? `0 0 40px -10px rgba(212, 165, 116, 0.15), 0 8px 24px -8px rgba(0,0,0,0.4)` : "none",
                  transform: hoveredCard === "d" ? "translateY(-2px)" : "none",
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "4px", fontWeight: 500 }}>Option D</p>
                <p style={{ fontSize: "11px", color: c.textDim, marginBottom: "16px" }}>Glow Card — Ambient amber glow on hover. Border brightens. Depth shadow.</p>
                <h3 style={{ fontFamily: heading, fontSize: "1.5rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "-0.01em" }}>Frontend Craft</h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary }}>React, TypeScript, Next.js. Sub-2s load times. 95+ Lighthouse scores on every deployment.</p>
              </div>

              {/* Card E: Minimal / Border Only */}
              <div
                onMouseEnter={() => setHoveredCard("e")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  background: hoveredCard === "e" ? `${c.bgAlt}88` : "transparent",
                  border: `1px solid ${hoveredCard === "e" ? c.borderHover : c.border}`,
                  transform: hoveredCard === "e" ? "translateY(-2px)" : "none",
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "4px", fontWeight: 500 }}>Option E</p>
                <p style={{ fontSize: "11px", color: c.textDim, marginBottom: "16px" }}>Minimal — Border only, no fill. Background appears on hover. Most restrained.</p>
                <h3 style={{ fontFamily: heading, fontSize: "1.5rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "-0.01em" }}>Product Thinking</h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary }}>Full product lifecycle ownership from architecture through deployment. 40+ clients served.</p>
              </div>

              {/* Card F: Glass (refined) */}
              <div
                onMouseEnter={() => setHoveredCard("f")}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: "32px",
                  borderRadius: "12px",
                  background: hoveredCard === "f" ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
                  border: `1px solid ${hoveredCard === "f" ? c.borderHover : c.border}`,
                  backdropFilter: "blur(16px)",
                  transform: hoveredCard === "f" ? "translateY(-2px)" : "none",
                  transition: "all 250ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                }}
              >
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "4px", fontWeight: 500 }}>Option F</p>
                <p style={{ fontSize: "11px", color: c.textDim, marginBottom: "16px" }}>Refined Glass — Subtle translucency with backdrop blur. Used sparingly for nav/overlays.</p>
                <h3 style={{ fontFamily: heading, fontSize: "1.5rem", fontWeight: 500, marginBottom: "12px", letterSpacing: "-0.01em" }}>Design Engineering</h3>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary }}>Bridging design and engineering — from Figma to production with pixel-perfect attention to craft.</p>
              </div>
            </div>
          </section>

          {/* ========== BUTTON VARIANTS ========== */}
          <section style={{ marginBottom: "96px" }}>
            <SectionHeader label="Button Variants">
              Primary (solid accent), Secondary (surface fill), Ghost (border only), and Text Link. All 8px radius, 14px font, Geist Sans.
            </SectionHeader>

            {/* Row 1: Standard buttons */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", marginBottom: "32px" }}>
              <button
                onMouseEnter={() => setHoveredBtn("p")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "12px 28px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: body,
                  background: hoveredBtn === "p" ? c.accentHover : c.accent,
                  color: c.bg,
                  boxShadow: hoveredBtn === "p" ? `0 0 24px -4px rgba(212,165,116,0.3)` : "none",
                  transform: hoveredBtn === "p" ? "translateY(-1px)" : "none",
                  transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Primary Action
              </button>
              <button
                onMouseEnter={() => setHoveredBtn("s")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: body,
                  background: hoveredBtn === "s" ? c.surface : c.bgAlt,
                  color: c.text,
                  border: `1px solid ${hoveredBtn === "s" ? c.borderHover : c.border}`,
                  transform: hoveredBtn === "s" ? "translateY(-1px)" : "none",
                  transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Secondary
              </button>
              <button
                onMouseEnter={() => setHoveredBtn("g")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "12px 28px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: body,
                  background: hoveredBtn === "g" ? c.accentMuted : "transparent",
                  color: hoveredBtn === "g" ? c.accent : c.textSecondary,
                  border: `1px solid ${hoveredBtn === "g" ? c.borderAccent : c.border}`,
                  transform: hoveredBtn === "g" ? "translateY(-1px)" : "none",
                  transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                Ghost
              </button>
              <button
                onMouseEnter={() => setHoveredBtn("t")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "12px 4px", background: "transparent", border: "none", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: body,
                  color: hoveredBtn === "t" ? c.accent : c.textSecondary,
                  transition: "all 200ms ease",
                }}
              >
                <span style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationThickness: "1px",
                  textDecorationColor: hoveredBtn === "t" ? `${c.accent}cc` : `${c.accent}44`,
                  transition: "all 200ms ease",
                }}>
                  Text Link
                </span>
              </button>
            </div>

            {/* Row 2: Pill variants */}
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.textDim, marginBottom: "16px", fontWeight: 500 }}>Pill Variants (for tags, badges, filters)</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center", marginBottom: "32px" }}>
              <span style={{ padding: "6px 14px", borderRadius: "9999px", background: c.accentMuted, color: c.accent, fontSize: "12px", fontWeight: 500, border: `1px solid ${c.borderAccent}` }}>React</span>
              <span style={{ padding: "6px 14px", borderRadius: "9999px", background: c.accentMuted, color: c.accent, fontSize: "12px", fontWeight: 500, border: `1px solid ${c.borderAccent}` }}>TypeScript</span>
              <span style={{ padding: "6px 14px", borderRadius: "9999px", background: c.accentMuted, color: c.accent, fontSize: "12px", fontWeight: 500, border: `1px solid ${c.borderAccent}` }}>Next.js</span>
              <span style={{ padding: "6px 14px", borderRadius: "9999px", background: "transparent", color: c.textMuted, fontSize: "12px", fontWeight: 500, border: `1px solid ${c.border}` }}>Figma</span>
              <span style={{ padding: "6px 14px", borderRadius: "9999px", background: "transparent", color: c.textMuted, fontSize: "12px", fontWeight: 500, border: `1px solid ${c.border}` }}>WCAG 2.2</span>
            </div>

            {/* Row 3: Arrow button */}
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.textDim, marginBottom: "16px", fontWeight: 500 }}>With Arrow Icon</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                onMouseEnter={() => setHoveredBtn("arrow")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "12px 24px", borderRadius: "8px", border: "none", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: body,
                  background: hoveredBtn === "arrow" ? c.accentHover : c.accent, color: c.bg,
                  display: "flex", alignItems: "center", gap: "8px",
                  transition: "all 200ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                View Project
                <span style={{ transition: "transform 200ms ease", transform: hoveredBtn === "arrow" ? "translateX(4px)" : "none", display: "inline-block" }}>→</span>
              </button>
              <button
                onMouseEnter={() => setHoveredBtn("ext")}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{
                  padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer", fontFamily: body,
                  background: "transparent", color: c.textSecondary, border: `1px solid ${c.border}`,
                  display: "flex", alignItems: "center", gap: "8px",
                  transition: "all 200ms ease",
                }}
              >
                GitHub
                <span style={{ transition: "transform 200ms ease", transform: hoveredBtn === "ext" ? "translate(2px, -2px)" : "none", display: "inline-block", fontSize: "12px" }}>↗</span>
              </button>
            </div>
          </section>

          {/* ========== COMPETENCY LAYOUTS ========== */}
          <section style={{ marginBottom: "96px" }}>
            <SectionHeader label="Competency Layouts — Pick Your Format">
              Three layout options for replacing the 56 skill tags. Each uses metrics + narrative instead of tag soup.
            </SectionHeader>

            {/* Layout A: Ruled Grid (Linear/Stripe style) */}
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "16px", fontWeight: 500 }}>Layout A — Ruled Grid</p>
            <p style={{ fontSize: "13px", color: c.textDim, marginBottom: "16px" }}>Cards separated by 1px lines. No gaps. Clean data-table aesthetic. Used by Linear, Stripe.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0", border: `1px solid ${c.border}`, borderRadius: "12px", overflow: "hidden", marginBottom: "64px" }}>
              {[
                { label: "Design Systems", metric: "60%", metricLabel: "dev time reduced", desc: "Component libraries, design tokens, and reusable patterns built from scratch for enterprise clients." },
                { label: "Accessibility", metric: "100%", metricLabel: "audit pass rate", desc: "WCAG 2.2 and Section 508 compliance. Zero violations across all government audits." },
                { label: "AI Integration", metric: "5-6x", metricLabel: "velocity multiplier", desc: "AI-augmented workflows with Claude Code and OpenAI. Team-scale velocity, solo." },
                { label: "Frontend Craft", metric: "95+", metricLabel: "lighthouse scores", desc: "React, TypeScript, Next.js. Sub-2s load times. Pixel-perfect Figma-to-production." },
              ].map((item) => (
                <div key={item.label} style={{ padding: "28px 24px", background: c.bgAlt, borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}` }}>
                  <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: "16px", fontWeight: 500 }}>{item.label}</p>
                  <div style={{ marginBottom: "12px", display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span style={{ fontFamily: heading, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, color: c.text }}>{item.metric}</span>
                    <span style={{ fontSize: "12px", color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.metricLabel}</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: c.textMuted }}>{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Layout B: Bento Grid (featured + supporting) */}
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "16px", fontWeight: 500 }}>Layout B — Bento Grid</p>
            <p style={{ fontSize: "13px", color: c.textDim, marginBottom: "16px" }}>Asymmetric grid. Lead competency gets 2x space. Supports visual hierarchy of importance.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "64px" }}>
              {/* Featured 2x1 */}
              <div style={{ gridColumn: "span 2", padding: "32px", borderRadius: "12px", background: c.bgAlt, border: `1px solid ${c.border}` }}>
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: "20px", fontWeight: 500 }}>Design Systems</p>
                <span style={{ fontFamily: heading, fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, color: c.text, display: "block", marginBottom: "8px" }}>60%</span>
                <span style={{ fontSize: "13px", color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "16px" }}>dev time reduced</span>
                <p style={{ fontSize: "0.9375rem", lineHeight: 1.6, color: c.textSecondary, maxWidth: "480px" }}>
                  Building comprehensive component libraries from scratch — typography, color systems, design tokens, and reusable patterns that become the foundation for entire product teams.
                </p>
              </div>
              <div style={{ padding: "32px", borderRadius: "12px", background: c.bgAlt, border: `1px solid ${c.border}` }}>
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: "20px", fontWeight: 500 }}>Accessibility</p>
                <span style={{ fontFamily: heading, fontSize: "2.5rem", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, color: c.text, display: "block", marginBottom: "8px" }}>100%</span>
                <span style={{ fontSize: "13px", color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "16px" }}>audit pass rate</span>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: c.textMuted }}>Zero violations across all government audits.</p>
              </div>
              <div style={{ padding: "32px", borderRadius: "12px", background: c.bgAlt, border: `1px solid ${c.border}` }}>
                <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: "20px", fontWeight: 500 }}>AI Integration</p>
                <span style={{ fontFamily: heading, fontSize: "2.5rem", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, color: c.text, display: "block", marginBottom: "8px" }}>5-6x</span>
                <span style={{ fontSize: "13px", color: c.textDim, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "16px" }}>velocity</span>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: c.textMuted }}>Claude Code + OpenAI. Solo team-scale output.</p>
              </div>
            </div>

            {/* Layout C: Stacked Narrative (no grid) */}
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: "16px", fontWeight: 500 }}>Layout C — Stacked Narrative</p>
            <p style={{ fontSize: "13px", color: c.textDim, marginBottom: "16px" }}>No grid. Full-width rows with left metric + right description. Editorial, confident, spacious.</p>
            <div style={{ borderTop: `1px solid ${c.border}` }}>
              {[
                { label: "Design Systems", metric: "60%", metricLabel: "dev time reduced", desc: "Component libraries, design tokens, typography systems, and reusable patterns built from scratch for multiple enterprise clients. Reduced development time by 60% across all projects." },
                { label: "Accessibility", metric: "100%", metricLabel: "audit pass rate", desc: "WCAG 2.2 and Section 508 compliance across every project. Zero accessibility violations in all government audits during my entire tenure at Leidit." },
                { label: "AI Integration", metric: "5-6x", metricLabel: "velocity multiplier", desc: "AI-augmented development workflows with Claude Code and OpenAI API. Shipping production-grade products at a pace that replaces traditional 5-6 person team structures." },
                { label: "Frontend Craft", metric: "95+", metricLabel: "lighthouse scores", desc: "React 18+, TypeScript, Next.js. Sub-2s load times across every deployment. Pixel-perfect implementation of Figma designs with attention to interaction quality." },
              ].map((item) => (
                <div key={item.label} style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "48px", padding: "32px 0", borderBottom: `1px solid ${c.border}`, alignItems: "start" }}>
                  <div>
                    <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: "8px", fontWeight: 500 }}>{item.label}</p>
                    <span style={{ fontFamily: heading, fontSize: "2.5rem", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1, color: c.text }}>{item.metric}</span>
                    <span style={{ fontSize: "12px", color: c.textDim, display: "block", marginTop: "4px" }}>{item.metricLabel}</span>
                  </div>
                  <p style={{ fontSize: "1rem", lineHeight: 1.7, color: c.textSecondary, paddingTop: "4px" }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========== TOKENS REFERENCE ========== */}
          <section>
            <SectionHeader label="Design Tokens Reference" />
            <div style={{ padding: "24px", borderRadius: "12px", background: c.bgAlt, border: `1px solid ${c.border}`, fontFamily: mono, fontSize: "12px", lineHeight: 2, color: c.textMuted }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
{`Heading:    Cormorant Garamond (500) · clamp(3rem, 8vw, 5.5rem)
Body:       Geist Sans (400) · 1.125rem / 1.65
Container:  1200px max-width
Spacing:    8px grid
Radius:     4 / 8 / 12 / 16 / 24 / 9999

Easing:     cubic-bezier(0.16, 1, 0.3, 1)  [default]
            cubic-bezier(0.4, 0, 0.2, 1)    [hover]
Duration:   150ms hover · 200ms state · 300ms panel · 800ms reveal
Reveal:     clipPath · 20px translateY · 50ms stagger

Grain:      4% opacity · feTurbulence 0.75 · overlay blend`}
              </pre>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
