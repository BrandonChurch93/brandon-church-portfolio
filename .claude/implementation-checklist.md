# Implementation Checklist

**Approach:** Fresh build at `/v2` route. Old portfolio remains untouched at `/`. When complete, swap `v2/page.jsx` → `page.js`.

**Rule:** ONE section at a time. Each phase requires Brandon's explicit approval before proceeding.

**Reference documents:**
- Design system & product plan: `.claude/design-brief.md`
- Content source (resume/LinkedIn): `.claude/content-source.md`
- Design system playground: `app/design-system/page.jsx` (at `/design-system`)
- Design decisions: `memory/project_portfolio_redesign.md`
- Animation preferences: `memory/feedback_animation_style.md`
- Workflow rules: `memory/feedback_workflow.md`

---

## Phase 0: Foundation Setup
- [x] Design system research (colors, typography, spacing, animation tokens)
- [x] Color palette locked — Warm Amber
- [x] Typography locked — Cormorant Garamond + Geist
- [x] Card style locked — Solid Lift + Amber Glow (context-dependent)
- [x] Button styles locked
- [x] Competency layout locked — Bento grid
- [x] Animation language locked — choreographed stagger, spring overshoot
- [x] Mobile strategy defined (svh, compositor-only, touch targets)
- [x] Accessibility requirements defined (WCAG 2.2 AA)
- [x] Legal requirements identified (privacy policy)
- [x] Performance targets set (LCP < 1.5s, Lighthouse 95+)
- [x] **Create `/v2` route with fresh page scaffold**
  - `app/v2/v2.css` — Complete design system tokens (colors, typography, spacing, animation, shadows, radius, cards, buttons, pills, mobile touch, reduced motion, focus indicators)
  - `app/v2/page.jsx` — Server component with grain overlay, glow bg, skip link, placeholder sections
  - Cormorant Garamond + Geist loaded via layout.js (already done)
  - No old code carried over — clean slate
  - V2 JS bundle: 179 bytes (vs 83.4KB old portfolio)

---

## Phase 1: Hero Section
**Status:** Not started

### 1a. Research ✅
- [x] Research hero patterns for design engineer portfolios (Rauno, Emil, Paco, Awwwards winners)
- [x] Research hero copy patterns — what works for "design engineer" positioning
- [x] Research hero animations that are bold/cinematic but performant
- [x] Research mobile hero patterns (svh, touch, scroll cue)
- [x] Research animation tools/generators vs freehand
- [x] **⏸ Brandon approved: Path C (radial glow + mouse gradient + cinematic typography entrance)**

### 1b. Plan
- [ ] Draft hero layout (desktop + mobile)
- [ ] Draft hero copy (eyebrow, h1, subtitle, CTAs)
- [ ] Define hero animations (entrance sequence, background, interactions)
- [ ] Define mobile hero experience (what changes, what stays)
- [ ] Define reduced-motion fallback
- [ ] **⏸ STOP — Present plan to Brandon for approval**

### 1c. Implement ✅
- [x] Build `SplitText` component (character mask reveal with stagger)
- [x] Build `MaskedLine` component (single line mask reveal)
- [x] Build `MouseGradient` component (amber cursor-following gradient, disabled on touch)
- [x] Build `HeroSection` component (orchestrates full entrance sequence)
- [x] Radial glow + grain background (from v2 scaffold)
- [x] Entrance animation: eyebrow T+0.3s → h1 chars T+0.5s → subtitle blur T+1.0s → buttons T+1.2s
- [x] Reduced-motion variant (all content visible immediately, no transforms)
- [x] Mobile: mouse gradient disabled on pointer:coarse, svh viewport, touch targets
- [x] Added V2 link to nav bar
- [ ] **⏸ STOP — Brandon reviews visual result**

### 1d. Audit (Deferred)
- [ ] Accessibility: heading hierarchy, focus states, contrast, reduced motion
- [ ] Performance: LCP, no layout shift, compositor-only animations
- [ ] Mobile: svh viewport, touch targets, animation performance
- [ ] **⏸ REVISIT after other sections are built — Brandon needs to see hero in full page context before final approval**

---

## Phase 2: Featured Projects / Case Studies
**Status:** Not started

### 2a. Research ✅
- [x] Research case study layouts (bento grid wins, featured 2x2 + standard 1x1)
- [x] Research case study content structure (results-first: metrics at top)
- [x] Research project image treatment (16:9, image zoom on hover, video/GIF previews)
- [x] Research mobile project browsing patterns (single column, dedicated routes > modals)
- [x] Research detail view approach (dedicated /projects/[slug] routes, not modals)
- [x] **⏸ Brandon approved recommended approach**

### 2b. Content
- [x] Projects determined: Modern Softworks (featured), Micro-Interactions, AI Cover Letter, SwiftSnapAI, Inbox Hero AI
- [ ] Copy updates deferred until design is finalized
- [ ] Project screenshots needed (Modern Softworks especially)

### 2c. Plan ✅
- [x] Bento grid layout (3-col, featured 2x2)
- [x] Card design (minimal info, featured vs standard variants)
- [x] Dedicated /projects/[slug] routes (not modals)
- [x] Results-first case study structure
- [x] Animations (staggered entrance, card hover, image zoom)
- [x] Plan documented at .claude/projects-plan.md
- [x] **⏸ Brandon approved plan**

### 2d. Implement ✅
- [x] `app/v2/data/projects.js` — Project data with content, metrics, tech stacks
- [x] `app/v2/components/ProjectCard.jsx` — Bento card with featured/standard variants, image zoom, scroll entrance
- [x] `app/v2/components/ProjectsSection.jsx` — 3-col bento grid, featured 2x2
- [x] `app/v2/projects/[slug]/page.jsx` — Detail pages with results-first layout, prev/next nav
- [x] `app/v2/projects/[slug]/ProjectDetailClient.jsx` — Animated metrics
- [x] Responsive grid (3-col → 2-col → 1-col)
- [x] All 5 detail pages statically generated
- [x] Image zoom + arrow slide on card hover (CSS)
- [ ] **⏸ STOP — Brandon reviews visual result**

### 2e. Audit (Deferred with Hero)
- [ ] Accessibility: image alt text, keyboard navigation, focus management
- [ ] Performance: image optimization, lazy loading, animation perf
- [ ] Mobile: touch interactions, card layout, image sizing
- [ ] **⏸ Deferred — will audit alongside hero revisit once more sections are built**

---

## Phase 3: About Section
**Status:** Not started

### 3a. Research ✅
- [x] Research about section patterns (single-column prose, 100-175 words, minimal)
- [x] Research copy tone and length (first person, craft-oriented, no tech lists, no "looking for work")
- [x] Research photo treatment (include in About section, headshot1.png selected)
- [x] **⏸ Brandon approved: minimal prose + headshot 1**

### 3b. Plan
- [x] Layout: split — prose left, headshot right (desktop). Stacks on mobile.
- [x] Copy: ~125 words, first person, craft-oriented. Placeholder for now.
- [x] Photo: headshot1.png, rounded corners, subtle border
- [x] Animation: single fade-up on scroll
- [x] **⏸ Brandon approved direction, proceeding to implementation**

### 3c. Implement ✅
- [x] `app/v2/components/AboutSection.jsx` — Split layout (prose left, headshot right)
- [x] headshot1.png copied to `public/images/headshot.png`
- [x] ~125 words, 3 paragraphs: identity → experience → accessibility philosophy
- [x] Scroll-triggered fade-up entrance
- [x] Responsive: stacks on mobile (photo on top, centered at 200px)
- [x] Reduced-motion variant (visible immediately)
- [ ] **⏸ STOP — Brandon reviews visual result**

### 3d. Audit (Deferred)
- [ ] Accessibility, performance, mobile
- [ ] **⏸ Deferred — will audit with full page review**

---

## Phase 4: Competencies Section
**Status:** Not started

### 4a. Research ✅
- [x] Researched design engineer job postings (Vercel, Stripe, Linear, designengineer.io)
- [x] Determined 3 competencies, 20 tags (down from 4 categories, 56 tags)
- [x] Cut Full-Stack, ServiceNow, most AI tags, implementation tools
- [x] Accessibility as standalone differentiator with 100% audit stat
- [x] **⏸ Brandon approved competency structure**

### 4b. Plan ✅
- [x] Bento grid: Design Systems 2x width (lead), Frontend + Accessibility 1x each
- [x] Metrics: 60% dev time reduced, 95+ Lighthouse, 100% audit rate
- [x] Narrative descriptions, not tag soup
- [x] **⏸ Brandon approved, proceeding to build**

### 4c. Implement ✅
- [x] `app/v2/components/CompetenciesSection.jsx` — 3 competencies in bento grid
- [x] Design Systems (featured, 2x width, amber glow) + Frontend + Accessibility (solid lift)
- [x] Each card: eyebrow, big metric, description, tag pills
- [x] Staggered scroll entrance, card hover effects
- [x] Responsive: 2-col → 1-col on mobile
- [x] Reduced motion variant
- [ ] **⏸ STOP — Brandon reviews visual result**

### 4d. Audit (Deferred)
- [ ] Accessibility, performance, mobile
- [ ] **⏸ Deferred — will audit with full page review**

---

## Phase 5: Contact Section
**Status:** Not started

### 5a. Research ✅
- [x] Researched top portfolio contact patterns (all ultra-minimal, no forms)
- [x] Recommended hybrid: click-to-copy email + simple 3-field form
- [x] Kill availability/Calendly/Open To cards
- [x] **⏸ Brandon approved direction**

### 5b. Plan ✅
- [x] Large heading + one line subtext
- [x] Click-to-copy email with animated confirmation
- [x] 3-field form (name, email, message) via FormSubmit
- [x] Social links deferred to footer (Phase 6)
- [x] **⏸ Brandon approved, proceeding to build**

### 5c. Implement ✅
- [x] `app/v2/components/ContactSection.jsx` — heading, click-to-copy email, 3-field form
- [x] Click-to-copy with "Copied!" confirmation + hover lift
- [x] FormSubmit.co AJAX submission (no page redirect)
- [x] Success/error states with role="alert"
- [x] Honeypot spam protection
- [x] Form inputs with amber focus glow + hover states
- [x] Responsive form grid (2-col → 1-col on small screens)
- [x] Labels on all inputs, proper autocomplete attributes
- [x] Reduced motion variant
- [ ] **⏸ STOP — Brandon reviews visual result**

### 5d. Audit
- [ ] Form accessibility (labels, errors, keyboard, screen reader)
- [ ] Performance, mobile
- [ ] **⏸ STOP — Brandon reviews audit results**

---

## Phase 6: Navigation + Footer
**Status:** Not started

### 6a. Research ✅
- [x] Nav: fixed top, transparent → blur, hide down / show up, name + 4 links + resume
- [x] Footer: ultra-minimal, social icons + credit line
- [x] Scroll: Lenis smooth scroll, 2px progress bar
- [x] Resume: ghost button in nav, opens PDF new tab
- [x] **⏸ Brandon approved direction**

### 6b. Plan ✅
- [x] Nav + footer + Lenis + progress bar
- [x] **⏸ Brandon approved, proceeding to build**

### 6c. Implement ✅
- [x] `app/v2/components/Nav.jsx` — fixed top, transparent → blur, hide down / show up, active section tracking
- [x] Desktop: name left, 4 section links + Resume ghost button right
- [x] Mobile: hamburger → fullscreen overlay with staggered entrance
- [x] `app/v2/components/Footer.jsx` — social icons (GitHub, LinkedIn, CodePen, YouTube) + credit line
- [x] `app/v2/components/SmoothScroll.jsx` — Lenis wrapper (syncTouch: false)
- [x] `app/v2/components/ScrollProgress.jsx` — 2px amber progress bar at top
- [x] Lenis installed as dependency
- [x] **Brandon approved — mobile nav rebuilt with Brittany Chiang pattern**
- [x] Slide-from-right panel + blur backdrop + proper hamburger X morph + numbered links
- [x] Lenis removed (top design engineer portfolios use native scroll)

### 6d. Audit (Deferred)
- [ ] Accessibility: skip link, focus management, keyboard nav
- [ ] Performance, mobile
- [ ] **⏸ Deferred — will audit with full page review**

---

## Phase 7: AI Chatbot
**Status:** Not started

### 7a. Research + Plan ✅
- [x] Reviewed existing chatbot (well-built, API working, purely visual reskin needed)
- [x] Created new component referencing old one (old component preserved)
- [x] **⏸ Brandon approved approach**

### 7b. Implement ✅
- [x] `app/v2/components/AIAssistant.jsx` — full reskin to amber design system
- [x] All #ff3f81 → var(--v2-accent), purple bg → var(--v2-bg-alt), glass → v2 tokens
- [x] Amber glow on chat window, amber bot bubbles, amber send button
- [x] Hover states on close, quick actions, floating button
- [x] Same API route and training data (no logic changes)
- [x] Old component preserved at app/components/AIAssistant.jsx
- [ ] Training data content update (deferred to content pass)
- [ ] **⏸ STOP — Brandon reviews**

---

## Phase 8: Content Pass + Legal & SEO
**Status:** Complete

### 8a. Content Pass — Research ✅
- [x] Read Brandon's resume/content source (.claude/content-source.md)
- [x] Audit all current copy (hero, about, competencies, contact, project details)
- [x] Identify all em dashes and placeholder/draft copy
- [x] Research design engineer portfolio copy standards (Rauno, Emil, Brittany, Paco, Pedro, Jhey)
- [x] **Brandon approved research findings**

### 8b. Content Pass — Implement ✅
- [x] Rewrite hero copy (eyebrow → "Product Builder", subtitle rewritten, no em dashes)
- [x] Rewrite about section copy (h2 → "How I got here", two new paragraphs, $40B government system flex)
- [x] Rewrite competencies (cut subtitle, new metrics: 10+ years / 100+ products / 100%, em dash removed)
- [x] Rewrite projects section (cut subtitle)
- [x] Rewrite contact section (h2 → "Let's Talk", "Copy my email" with icon, "Book on Calendly")
- [x] Rewrite Modern Softworks card + detail (new tagline, description, metrics, features, tech stack)
- [x] Rewrite Micro-Interactions card + detail (new tagline, description, metrics, features, tech stack)
- [x] Rewrite AI Cover Letter card + detail (new tagline, description, metrics, features, tech stack)
- [x] Rewrite SwiftSnapAI card + detail (new tagline, description, metrics, features, tech stack)
- [x] Inbox Hero AI skipped (still coming soon)
- [x] CodePen Collection left as-is (external link only, no detail page)
- [x] Remove all em dashes in user-facing content (titles use `|`, alt text uses `,`)
- [x] Detail page template updated: "Challenge" + "Approach" merged into single "Overview" section
- [x] Metric cards fixed: equal height with flexbox centering
- [x] **Brandon approved all copy section by section**

### 8c. Legal & SEO — Research ✅
- [x] Researched 2026 legal requirements for Idaho personal portfolio
- [x] No privacy policy legally required (Idaho has no comprehensive privacy law, CCPA doesn't apply)
- [x] No cookie banner needed (Vercel Analytics is cookie-free)
- [x] Top portfolios (Rauno, Emil, Brittany) ship zero legal pages
- [x] **Brandon approved: skip privacy page, skip cookie banner, focus on SEO**

### 8d. Legal & SEO — Implement ✅
- [x] JSON-LD structured data (ProfilePage + Person schema with location, social links, skills)
- [x] Full metadata on v2/page.jsx (title, description, canonical, robots, OG, Twitter)
- [x] Dynamic OG image at /v2/opengraph-image (1200x630, amber design, works on iMessage/Android/LinkedIn/email/Slack/Discord/Twitter)
- [x] Sitemap.js with all v2 pages and project detail pages
- [x] Robots.js allowing v2, blocking design-system and api routes
- [x] Project detail page titles updated (em dash → pipe)
- [x] **Brandon approved**

---

## Phase 9: Polish & Performance
**Status:** Not started

### 9a. Performance Audit
- [ ] Run Lighthouse on all pages
- [ ] Optimize images (WebP/AVIF, responsive srcSet)
- [ ] Verify font loading strategy
- [ ] Check bundle size (target < 100KB gzipped)
- [ ] Remove unused dependencies (Three.js, Vanta.js, etc.)
- [ ] Verify Core Web Vitals (LCP < 1.5s, CLS < 0.05, INP < 100ms)
- [ ] **⏸ STOP — Brandon reviews scores**

### 9b. Accessibility Audit
- [ ] Full keyboard navigation test
- [ ] Screen reader test (VoiceOver)
- [ ] Color contrast verification on all text/background combos
- [ ] prefers-reduced-motion verification
- [ ] Focus indicator visibility
- [ ] Heading hierarchy check
- [ ] Form accessibility check
- [ ] **⏸ STOP — Brandon reviews**

### 9c. Mobile Audit
- [ ] Test on real iOS Safari
- [ ] Test on real Android Chrome
- [ ] Verify svh viewport behavior
- [ ] Verify touch targets (44x44px)
- [ ] Verify animation performance (60fps)
- [ ] Verify no horizontal overflow
- [ ] **⏸ STOP — Brandon reviews**

---

## Phase 10: Launch
**Status:** Not started

- [ ] Install analytics (Plausible or Umami)
- [ ] Swap v2 page → main page
- [ ] Clean up old components and styles
- [ ] Remove /design-system and /v2 routes
- [ ] Remove Design System link from nav
- [ ] Final smoke test on production URL
- [ ] **⏸ STOP — Brandon gives final sign-off**
- [ ] Deploy to production
- [ ] Verify live site
- [ ] 🎉 Ship it

---

## Quick Reference

| What | Where |
|------|-------|
| Design system & product plan | `.claude/design-brief.md` |
| Content source (resume/LinkedIn) | `.claude/content-source.md` |
| Design system playground | `/design-system` route |
| New portfolio (in progress) | `/v2` route |
| Old portfolio (untouched) | `/` route |
| Design decisions (memory) | `memory/project_portfolio_redesign.md` |
| Animation preferences | `memory/feedback_animation_style.md` |
| Workflow rules | `memory/feedback_workflow.md` |
| User profile | `memory/user_profile.md` |
