# Portfolio Redesign — Design Brief & Product Plan

**Owner:** Brandon Church
**Goal:** Ultra-premium 2026 design engineer portfolio — bold, extravagant, cinematic, performant, accessible
**Status:** Phase 0 Complete → Ready to create Implementation Checklist

---

## Reference Files

| File | Purpose |
|------|---------|
| `.claude/content-source.md` | Resume + LinkedIn content for writing section copy |
| `.claude/design-brief.md` | This file — master plan and design decisions |
| `app/design-system/page.jsx` | Visual design system playground at /design-system |
| `memory/project_portfolio_redesign.md` | All locked design decisions (colors, fonts, tokens) |
| `memory/feedback_animation_style.md` | Animation preferences |
| `memory/user_profile.md` | Brandon's background and goals |

---

## Workflow

```
Phase 0: Design Foundation ✅ COMPLETE
  └── Research → Explore on /design-system → Decide → Document

Phase 1-N: Each Section
  └── Research → Plan → Brandon Approves → Implement → Audit → Brandon Reviews

Post-Implementation:
  └── Full accessibility audit → Performance audit → Legal pages → Analytics → Deploy
```

**Every step requires Brandon's approval before proceeding.**

---

## Design System (Locked)

### Color — Warm Amber on Near-Black
| Token | Value | Usage |
|-------|-------|-------|
| Background | #0C0A09 | Page background |
| Surface | #1C1917 | Cards, sections |
| Elevated | #252220 | Hovered cards, dialogs |
| Hover | #2E2A27 | Active states |
| Top Surface | #37322F | Tooltips, popovers |
| Accent | #D4A574 | CTAs, highlights, eyebrows |
| Accent Hover | #E0B88A | Button/link hover |
| Text | #FAFAF9 | Primary text |
| Text Secondary | #D6D3D1 | Body text |
| Text Muted | #A8A29E | Supporting text |
| Text Dim | #78716C | Captions, labels |
| Border | rgba(255,255,255,0.06) | Card/section borders |
| Border Hover | rgba(255,255,255,0.12) | Hover borders |
| Border Accent | rgba(212,165,116,0.15) | Accent borders |

### Typography
| Element | Font | Size | Weight | Spacing |
|---------|------|------|--------|---------|
| H1 (hero) | Cormorant Garamond | clamp(3rem, 8vw, 5.5rem) | 500 | -0.03em |
| H2 (section) | Cormorant Garamond | clamp(2rem, 4vw, 2.75rem) | 500 | -0.02em |
| H3 (subsection) | Geist Sans | 1.5rem | 500 | -0.01em |
| Eyebrow | Geist Sans | 0.75rem uppercase | 500 | 0.1em |
| Body | Geist Sans | 1.125rem (18px) | 400 | normal |
| Caption | Geist Sans | 0.875rem | 400 | normal |
| Code | Geist Mono | 0.9375rem | 400 | normal |

### Cards
- **Solid Lift (B)** and **Amber Glow Focus (D)** — context-dependent
- Choreographed hover: transform 350ms → border 250ms → background 450ms → shadow 550ms
- Spring overshoot: cubic-bezier(0.34, 1.56, 0.64, 1) for scale
- Asymmetric: snappy enter, gentle exit
- Layered shadow: 4/8/16/32px doubling + amber glow

### Buttons
- Primary: solid amber, lift + scale(1.03) + glow, active scale(0.97) at 100ms
- Secondary: surface fill, lift + scale + depth
- Ghost: border → amber tint fill on hover
- Arrows: slide right (→) or diagonal (↗) at 350ms

### Competency Layout
- Bento grid — lead competency 2x width, 16px gap

### Animation Language
- Default: cubic-bezier(0.16, 1, 0.3, 1)
- Spring overshoot: cubic-bezier(0.34, 1.56, 0.64, 1)
- Shadow bloom: cubic-bezier(0.33, 1, 0.68, 1)
- Scroll reveals: clipPath + 20px translateY, 50ms stagger
- Style: cinematic, smooth, multi-property choreography

### Background
- Radial glow spots + grain overlay (CSS only, replaces Vanta)
- Grain: 4% opacity, SVG feTurbulence 0.75, overlay blend

---

## Section Order & Content Plan

### 1. Hero
- Eyebrow: "Brandon Church"
- H1: "Design Engineer" (Cormorant Garamond, massive)
- Subtitle: ~1-2 sentences on what he does
- CTAs: "View My Work" (primary) + "Get in Touch" (secondary)
- Background: Radial glow + grain
- **Needs research:** hero patterns for design engineer portfolios

### 2. Featured Projects (Case Studies)
- 3-4 projects with case study depth (problem/process/outcome)
- Bento-style layout or horizontal scroll
- **Needs research:** case study layout patterns, content structure
- **Needs content:** determine which projects to feature

### 3. About
- Brief, personality-forward
- Not a resume dump — 2-3 paragraphs max
- Career narrative tied to design engineer positioning
- **Needs research:** about section patterns

### 4. Competencies
- Bento grid with metrics (100%, 60%, 95+, 5-6x)
- 4 areas: Design Systems, Accessibility, AI Integration, Frontend Craft
- Narrative descriptions, no tag clouds
- **Needs research:** any additional patterns

### 5. Contact
- Simple form (name, email, message)
- Availability status, scheduling link
- **Needs research:** contact section patterns, form UX

### 6. Navigation
- Sticky, minimal
- Resume download link
- Active section indicator
- **Needs research:** nav patterns for single-page portfolios

### 7. Footer
- Scroll progress bar (fixed top, not footer)
- Social links, copyright
- Legal links (privacy policy)

---

## Mobile Experience Requirements

### Viewport
- Use `svh` for hero sections (not `dvh` — avoids toolbar jump)
- Always include `vh` fallback: `height: 100vh; height: 100svh;`
- Use `dvh` only for modals/overlays

### Touch
- Gate hover effects behind `@media (hover: hover) and (pointer: fine)`
- `:active` state with `scale(0.97)` for tap feedback on all interactive elements
- Minimum touch target: 44x44px with 8px spacing
- `-webkit-tap-highlight-color: transparent`
- `touch-action: manipulation` (removes 300ms tap delay)

### Animations on Mobile
- Do NOT disable animations — build them with compositor-only properties
- Compositor-only (safe to animate): `transform`, `opacity`, `filter`, `clip-path`
- NEVER animate on mobile: `box-shadow`, `backdrop-filter blur value`, `border-radius`, `width/height`
- For box-shadow hover effects: use pseudo-element with static shadow, animate its `opacity`
- Maximum 3 simultaneous animations on mobile
- Maximum 10 unique animations per page

### Navigation
- Hamburger menu with slide-in panel (current approach is fine)
- Bottom-anchored CTA consideration

### Breakpoints
- Mobile: 0-639px
- Tablet: 640-1023px
- Desktop: 1024-1279px
- Wide: 1280px+

---

## Performance Requirements

### Core Web Vitals Targets
| Metric | Target | Good Threshold |
|--------|--------|---------------|
| LCP | < 1.5s | < 2.5s |
| CLS | < 0.05 | < 0.1 |
| INP | < 100ms | < 200ms |

### Font Loading
- `font-display: swap` for Cormorant Garamond (headings — visual, not critical)
- `font-display: optional` for Geist Sans (body — avoid layout shift)
- Preload only 1-2 critical font files
- Next.js `next/font` handles most of this automatically

### Images
- WebP/AVIF for project screenshots
- Responsive `srcSet` with appropriate sizes
- Lazy load below-the-fold images
- Explicit `width` and `height` to prevent CLS

### Bundle
- Target: < 100KB gzipped JS
- Remove Three.js + Vanta.js (significant savings)
- Dynamic import AI chatbot (not needed on initial load)

### Lighthouse Targets
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

---

## Accessibility Requirements (WCAG 2.2 AA)

### Must Have
- [ ] Skip link to main content
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
- [ ] Landmark regions (`main`, `nav`, `footer`, `section` with aria-label)
- [ ] Focus indicators visible on all interactive elements (2px ring minimum)
- [ ] `prefers-reduced-motion`: replace transform animations with opacity fades (0.15-0.2s)
- [ ] Color contrast: verify amber (#D4A574) on all background colors meets 4.5:1 ratio
- [ ] Form labels on every input (contact form)
- [ ] Error messages linked to inputs via `aria-describedby`
- [ ] Alt text on all project images
- [ ] `aria-live` regions for dynamic content (form success/error, chatbot)
- [ ] Keyboard navigation for all interactive elements
- [ ] No keyboard traps (especially modal/chatbot)

### Per Section Audit
After implementing each section, verify:
1. Heading hierarchy is correct
2. All interactive elements are keyboard accessible
3. Color contrast passes on all text
4. Animations respect `prefers-reduced-motion`
5. Screen reader announces content in logical order

---

## Legal Requirements

### Privacy Policy (Required — contact form collects personal data)
- What data is collected (name, email, message)
- How it's processed (FormSubmit.co as third-party processor)
- How long it's retained
- User rights (access, deletion)
- Contact information for privacy inquiries
- Note: FormSubmit.co's privacy policy is dated 2019, lacks formal GDPR DPA — disclose as processor

### Cookie Policy
- If using cookieless analytics (Plausible/Umami): no consent banner needed
- If using Google Analytics: cookie consent banner required

### Copyright
- `© {year} Brandon Church. All rights reserved.` in footer

### Pages to Create
- `/privacy` — Privacy policy page
- No terms of service needed (no user accounts, no transactions)

---

## SEO & Meta

### Essential
- [ ] Page title: "Brandon Church — Design Engineer"
- [ ] Meta description reflecting design engineer positioning
- [ ] OG image: 1200x630px, updated to match new design
- [ ] Twitter card: summary_large_image
- [ ] JSON-LD structured data: Person schema
- [ ] Sitemap via Next.js `app/sitemap.ts`
- [ ] robots.txt
- [ ] Canonical URL
- [ ] Favicon updated to match new design

---

## Analytics

### Recommended: Plausible or Umami
- < 1KB script (vs 45KB for GA4)
- Cookieless — no consent banner
- GDPR/CCPA compliant by default
- Track: page views, scroll depth, project clicks, resume downloads, contact form submissions

---

## Implementation Order

1. **Hero** — Sets the tone. Research → Plan → Approve → Build → Audit → Review
2. **Projects/Case Studies** — Most important content. Same workflow.
3. **About** — Aligns with visual language from 1 & 2
4. **Competencies** — Most content/positioning research needed
5. **Contact** — Simplest section
6. **Navigation + Footer** — Global elements, done last
7. **AI Chatbot** — Update training data for new positioning
8. **Legal** — Privacy policy page
9. **SEO & Meta** — Update all metadata, OG image, structured data
10. **Performance Pass** — Lighthouse audit, bundle optimization, image optimization
11. **Accessibility Audit** — Full WCAG 2.2 AA verification
12. **Mobile Polish** — Final mobile-specific testing and refinement
13. **Analytics** — Install tracking
14. **Deploy** — Ship it

---

## Research Completed
- [x] Portfolio design trends 2026
- [x] Recruiter scanning behavior / section ordering
- [x] Vanta.js recognition / hero alternatives
- [x] Micro-interaction impact ranking
- [x] Design engineer role market analysis
- [x] Dark mode color palettes (4 directions)
- [x] Typography pairings
- [x] Design system tokens / spacing / animation
- [x] Premium card/button/component patterns
- [x] Cinematic hover effect choreography
- [x] Full portfolio web standards 2026
- [x] Mobile animation patterns & performance
- [x] Accessibility requirements
- [x] Legal requirements
- [x] SEO requirements

## Research Needed (Per Section)
- [ ] Hero patterns for design engineer portfolios
- [ ] Case study layouts and content structure
- [ ] About section patterns
- [ ] Contact section patterns
- [ ] Navigation patterns
