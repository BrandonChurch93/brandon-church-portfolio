# Card, Button & Component Pattern Research
## Premium Dark-Mode Implementation Details for Design Engineer Portfolio

**Date:** 2026-03-30
**Context:** Warm amber (#D4A574) accent on near-black (#0C0A09) background, Cormorant Garamond headings, Geist Sans body, 12px card radius, 8px button radius per design-brief.md

---

## Part 1: Card Patterns

### 1.1 How Premium Dark-Mode Sites Style Cards

**Linear (linear.app / linear.style)**
Linear's documented design tokens reveal the approach precisely:
- Dark background: `#121212`
- Dark surface (alt-bg): `#1b1c1d`
- Dark input surface: `#171717`
- Border: `1px solid var(--alt-bg)` (the surface color doubles as border color)
- Border-radius: `8px`
- Card padding: `15px`
- Grid gap: `10px`
- Hover: `transform: scale(1.01) translateY(-4px)` with `transition: 0.2s ease-out`
- Link hover: opacity `0.6` to `1.0` with `100ms ease-out`

**The "Linear style" overall:** Monochrome black/white with few accent colors, eliminated most gradients in 2025 redesign, uses LCH color space for perceptually uniform elevation steps. Cards use solid fills, not glass effects.

**Vercel**
- Near-black backgrounds with cards using subtle 1px borders in `rgba(255, 255, 255, 0.1)`
- Gradient text effects using `background: linear-gradient()` + `-webkit-background-clip: text`
- Gradient borders via wrapper div with `p-px` (1px padding) and `bg-gradient-to-b from-gray-200 to-transparent`
- Corner radius formula for nested elements: child radius = parent radius - parent padding

**Stripe**
- Famous "flashlight" border effect: radial gradient follows mouse cursor across cards
- Creates lighting-aware interface where elements illuminate on interaction
- Uses pseudo-element overlays with radial-gradient positioned at CSS custom properties

**Material Design 3 Elevation Model (industry standard)**
Base dark surface: `#121212`. Each elevation step adds white overlay:
| Elevation | Overlay Opacity | Resulting Color |
|-----------|----------------|-----------------|
| Level 0   | 0%             | #121212         |
| Level 1   | 5%             | ~#1E1E1E        |
| Level 2   | 7%             | ~#232323        |
| Level 3   | 8%             | ~#252525        |
| Level 4   | 9%             | ~#272727        |
| Level 5   | 11%            | ~#2C2C2C        |

**Adapted for your palette (#0C0A09 base, #1C1917 surface):**
Your existing surface at #1C1917 represents roughly an 8-9% white overlay on #0C0A09, placing cards at elevation level 3-4. This is correct -- cards should be 1-2 steps above the page background.

---

### 1.2 Gradient Border Cards

**Technique 1: Background-origin (recommended -- single element, no pseudo-elements)**
```css
.card-gradient-border {
  background:
    linear-gradient(#1C1917, #1C1917) padding-box,
    linear-gradient(135deg, rgba(212, 165, 116, 0.4), rgba(212, 165, 116, 0.05)) border-box;
  border: 1px solid transparent;
  border-radius: 12px;
}
```
The first gradient fills the interior with your surface color. The second gradient creates the visible border. `padding-box` and `border-box` keywords constrain each layer. Works with `border-radius`.

**Technique 2: Pseudo-element with mask (for complex gradients)**
```css
.card-gradient-border {
  position: relative;
  background: #1C1917;
  border-radius: 12px;
}

.card-gradient-border::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px; /* border thickness */
  background: linear-gradient(135deg, rgba(212, 165, 116, 0.5), transparent 60%);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
}
```
This masks out the interior, leaving only the gradient ring visible. `mask-composite: exclude` is the key property.

**Technique 3: border-image (simplest, but NO rounded corners)**
```css
.card-gradient-border {
  border: 1px solid;
  border-image: linear-gradient(135deg, rgba(212, 165, 116, 0.4), rgba(212, 165, 116, 0.05)) 1;
}
```
Cannot use `border-radius` with `border-image`. Only use for rectangular cards.

**Color recommendations for your palette:**
- Warm gradient: `linear-gradient(135deg, rgba(212, 165, 116, 0.4), rgba(212, 165, 116, 0.05))`
- Neutral gradient: `linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03))`
- Accent fade: `linear-gradient(135deg, rgba(212, 165, 116, 0.3), transparent 50%)`

---

### 1.3 Elevated Cards (Lighter Surface for Depth)

On dark backgrounds, shadows are nearly invisible. Premium sites use lighter surface colors instead.

**Recommended elevation scale for your palette:**

| Token              | Hex     | Use Case                          |
|--------------------|---------|-----------------------------------|
| `--bg`             | #0C0A09 | Page background                   |
| `--surface-1`      | #1C1917 | Default cards, panels              |
| `--surface-2`      | #252220 | Hovered cards, active states       |
| `--surface-3`      | #2E2A27 | Dialogs, dropdowns, popovers      |
| `--surface-4`      | #37322F | Tooltip backgrounds                |

Step size: approximately 8-10 lightness points in LCH. Each step should be perceptible but not jarring.

**Hover elevation shift:**
```css
.card {
  background: var(--surface-1); /* #1C1917 */
  transition: background-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  background: var(--surface-2); /* #252220 */
}
```

Optional: combine with a very subtle shadow for extra dimension:
```css
.card:hover {
  background: var(--surface-2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

### 1.4 Glow Cards (Ambient Light on Hover)

**Approach A: Static glow with box-shadow (simpler)**
```css
.card {
  transition: box-shadow 400ms ease-out;
}

.card:hover {
  box-shadow:
    0 0 0 1px rgba(212, 165, 116, 0.15),
    0 4px 24px rgba(212, 165, 116, 0.08),
    0 16px 56px rgba(212, 165, 116, 0.04);
}
```

**Approach B: Mouse-following glow (Stripe/Linear style)**
```css
.card {
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(212, 165, 116, 0.12),
    transparent 40%
  );
  opacity: var(--glow-opacity, 0);
  transition: opacity 400ms ease-out;
  pointer-events: none;
  z-index: 1;
}
```

JavaScript for mouse tracking:
```javascript
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--glow-opacity', '1');
  });

  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--glow-opacity', '0');
  });
});
```

**Approach C: Clone overlay with mask (Frontend Masters technique)**
Uses two copies of the card layered together. The overlay copy has colored borders/backgrounds, masked with a `radial-gradient(25rem 25rem at var(--x) var(--y), #000 1%, transparent 50%)`. The mask reveals only a circular region following the cursor. Most visually impressive but heaviest in DOM.

---

### 1.5 Cards with Accent Line

**Top accent line:**
```css
.card-accent-top {
  background: var(--surface-1);
  border-radius: 12px;
  border-top: 2px solid #D4A574;
  /* OR for a softer look: */
  border-top: 1px solid rgba(212, 165, 116, 0.6);
}
```

**Partial-width accent using pseudo-element:**
```css
.card-accent-partial::before {
  content: '';
  position: absolute;
  top: 0;
  left: 24px;
  width: 48px; /* or 30% for proportional */
  height: 2px;
  background: #D4A574;
  border-radius: 0 0 2px 2px;
}
```

**Left accent line (common for list items or status indicators):**
```css
.card-accent-left {
  border-left: 3px solid #D4A574;
  border-radius: 0 12px 12px 0; /* round only right corners */
}
```

**Thickness guidelines:**
- 1px: Subtle, editorial. Best for top lines.
- 2px: Standard. Most common in premium sites.
- 3px: Bold. Best for left-side indicators.
- 4px+: Too heavy for premium feel.
- Full-width vs partial: Full-width is safer and more common. Partial (centered or left-aligned, 30-60px) is more editorial but harder to balance.

---

### 1.6 Bento Grid Cards

**What separates premium bento from Pinterest:**

1. **Intentional size hierarchy** -- some cards are deliberately 2x or 3x larger, signaling importance. Pinterest is uniform; bento is editorial.
2. **Consistent internal padding** -- all cards share the same padding regardless of size.
3. **Consistent border-radius** -- all cards share the same radius.
4. **Minimal content per tile** -- each card communicates one idea. Dense cards ruin the aesthetic.
5. **Alignment to grid** -- all cards snap to the same underlying grid columns. No arbitrary positioning.

**Recommended grid configuration:**
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px; /* or 12px for tighter editorial feel */
}

/* Standard card */
.bento-card { /* 1x1 */ }

/* Wide card */
.bento-card-wide {
  grid-column: span 2;
}

/* Tall card */
.bento-card-tall {
  grid-row: span 2;
}

/* Hero/feature card */
.bento-card-featured {
  grid-column: span 2;
  grid-row: span 2;
}
```

**Common ratios that work:**
- 4-column grid with 2:1 wide cards (most versatile)
- 3-column grid with one 2-column card per row
- Mixed: 2x2 feature + three 1x1 cards in a row

**Responsive breakpoints:**
- Desktop: 4 columns
- Tablet (below 1024px): 2 columns
- Mobile (below 640px): 1 column

**Gap:** 12px-20px. Linear uses 10px. Most premium sites use 16px. Never exceed 24px.

---

### 1.7 Premium Card Hover Effects

**The premium hover stack (combine these):**

```css
.card {
  background: var(--surface-1);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  transition:
    transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 200ms ease,
    border-color 200ms ease,
    box-shadow 300ms ease;
}

.card:hover {
  transform: translateY(-2px);              /* subtle lift, NOT scale */
  background: var(--surface-2);             /* lighten surface */
  border-color: rgba(255, 255, 255, 0.12);  /* brighten border */
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); /* depth shadow */
}
```

**What premium sites DO on hover:**
- `translateY(-2px)` to `translateY(-4px)` -- subtle vertical lift
- Border color brightens from `rgba(255,255,255,0.06)` to `rgba(255,255,255,0.12)`
- Background lightens one elevation step
- Shadow appears or deepens
- Transition duration: 200-300ms
- Easing: `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)` (easeOutExpo)

**What premium sites DO NOT do on hover:**
- `scale(1.05)` -- too much. `scale(1.01)` is the absolute max (Linear uses 1.01)
- Dramatic color changes
- Bounce or spring animations on cards (save for buttons)
- Multiple transforms simultaneously

---

## Part 2: Button Patterns

### 2.1 Primary CTA Styling

**Premium dark-mode primary button:**
```css
.btn-primary {
  background: #D4A574;
  color: #0C0A09;
  padding: 12px 24px;
  border-radius: 8px;
  font-family: 'Geist Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.01em;
  border: none;
  cursor: pointer;
  transition:
    background-color 150ms ease,
    transform 150ms ease,
    box-shadow 150ms ease;
}

.btn-primary:hover {
  background: #E0B88A; /* lighter amber */
  box-shadow: 0 0 0 1px rgba(212, 165, 116, 0.3),
              0 4px 16px rgba(212, 165, 116, 0.15);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: translateY(0);
  background: #C89A68; /* darker amber */
}
```

**Corner radius trends:**
- 2024-2025: `8px` dominated (Linear, Vercel, Notion)
- 2026: `8px` still standard. `9999px` (full pill) for small CTAs and tags. Do NOT mix both on the same page for primary actions.
- Your design brief specifies 8px for buttons. Correct choice.

**Solid fill vs gradient:**
Solid fill is more current. Gradients on buttons peaked in 2023. If using gradient, keep it extremely subtle: `linear-gradient(180deg, #D4A574, #C89A68)` -- same hue, slight darkening bottom to top.

---

### 2.2 Ghost Buttons vs Outlined Buttons

**Ghost button (transparent bg, text-only, minimal styling):**
```css
.btn-ghost {
  background: transparent;
  color: #D4A574;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 150ms ease;
}

.btn-ghost:hover {
  background: rgba(212, 165, 116, 0.08);
}
```

**Outlined button (transparent bg, visible border):**
```css
.btn-outlined {
  background: transparent;
  color: #D4A574;
  padding: 12px 24px;
  border: 1px solid rgba(212, 165, 116, 0.4);
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.btn-outlined:hover {
  border-color: rgba(212, 165, 116, 0.7);
  background: rgba(212, 165, 116, 0.06);
}
```

**2026 verdict:** Ghost buttons are more premium for secondary actions. Outlined buttons feel slightly dated compared to 2024. The trend is toward text-only buttons with hover background reveals. However, outlined buttons still work well as the secondary CTA paired with a solid primary (your "Get in Touch" use case).

**Recommendation for your CTAs:**
- "View My Work": Solid fill (#D4A574 bg, #0C0A09 text)
- "Get in Touch": Ghost with subtle border (`1px solid rgba(212, 165, 116, 0.3)`)

---

### 2.3 Button Hover Effects

**Premium glow-behind button:**
```css
.btn-primary:hover {
  box-shadow:
    0 0 20px rgba(212, 165, 116, 0.2),
    0 0 60px rgba(212, 165, 116, 0.1);
}
```

**Background fill animation (ghost to filled on hover):**
```css
.btn-ghost {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-ghost::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(212, 165, 116, 0.08);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
  border-radius: inherit;
}

.btn-ghost:hover::before {
  transform: scaleX(1);
}
```

**What is NOT premium in 2026:**
- `scale(1.1)` on buttons -- too aggressive
- Color-swap animations
- 3D rotate/flip effects
- Underline-only hover on CTA buttons (fine for text links, not buttons)

---

### 2.4 Pill Buttons vs Rounded-Rectangle

**Pill (`border-radius: 9999px`):**
- Best for: Tags, badges, category filters, small inline actions
- Current usage: Very common for secondary/tertiary UI elements
- Example: "React" "Figma" "TypeScript" skill tags

**Rounded-rectangle (`border-radius: 8px`):**
- Best for: Primary CTAs, form submits, navigation actions
- Current usage: Dominant for primary buttons on premium sites
- Example: "View My Work" "Get in Touch"

**2026 consensus:** Use both, but with clear hierarchy. Primary actions get rounded-rectangle. Tags, filters, and small labels get pills. Never pill-shape your primary CTA if the rest of your UI uses 8px radius -- it creates visual inconsistency.

---

### 2.5 Text Link Styling

**Inline text links (within paragraphs):**
```css
a {
  color: #D4A574;
  text-decoration: underline;
  text-decoration-color: rgba(212, 165, 116, 0.3);
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  transition:
    text-decoration-color 200ms ease,
    color 200ms ease;
}

a:hover {
  text-decoration-color: rgba(212, 165, 116, 0.8);
}
```

**Standalone text links (navigation, "View project" type links):**
```css
.text-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  position: relative;
  transition: color 200ms ease;
}

.text-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #D4A574;
  transition: width 300ms cubic-bezier(0.16, 1, 0.3, 1);
}

.text-link:hover {
  color: rgba(255, 255, 255, 1);
}

.text-link:hover::after {
  width: 100%;
}
```

**Key properties for premium underlines:**
- `text-underline-offset: 4px` to `6px` -- creates breathing room
- `text-decoration-thickness: 1px` to `1.5px` -- thinner is more refined
- `text-decoration-color` at 30% opacity default, 80% on hover
- Never use browser-default underline styling -- always customize

---

### 2.6 Icon Buttons & Arrow Animations

**Arrow that slides right on hover:**
```css
.link-with-arrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.link-with-arrow .arrow {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.link-with-arrow:hover .arrow {
  transform: translateX(4px);
}
```

**Arrow that slides in from left (hidden initially):**
```css
.link-with-arrow .arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition:
    opacity 200ms ease,
    transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.link-with-arrow:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}
```

**Diagonal arrow for external links:**
```css
.external-link .arrow {
  transition: transform 200ms ease;
}

.external-link:hover .arrow {
  transform: translate(2px, -2px); /* move up-right */
}
```

**Icon sizing:** 16px for inline with body text, 20px for standalone link items, 24px for large CTAs. Match icon stroke weight to your body text weight.

---

## Part 3: Competency & Feature Sections

### 3.1 Premium Skills/Competencies Presentation

**The premium alternatives to tag clouds:**

**A. Narrative competency cards (your best option)**
Each competency gets its own card with:
- A short heading ("Design Systems Architecture")
- A 1-2 sentence description ("Built and maintained component libraries serving 40+ clients...")
- Optional: a metric or proof point
- Optional: subtle icon or illustration

This is exactly what your design brief describes as "narrative, no tag soup."

**B. Metric-led competency cards**
Lead with a compelling number, follow with context:
```
   100%
   Section 508 Compliance
   Audit record across all projects
```

**C. Timeline/progression cards**
Show depth of experience per competency area with years or project counts.

**D. Tools-under-competency grouping**
Group tools under competency headings, not as a flat list:
```
   Design Systems
   Figma, Storybook, Tailwind, MUI

   Frontend Architecture
   React, Next.js, TypeScript, Framer Motion
```

---

### 3.2 Metric-Driven Cards

**Large number styling:**
```css
.metric-number {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 300; /* light weight for large numbers feels premium */
  color: #D4A574;
  line-height: 1;
  letter-spacing: -0.02em;
}

.metric-label {
  font-family: 'Geist Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 8px;
}

.metric-description {
  font-family: 'Geist Sans', sans-serif;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 4px;
}
```

**Layout pattern:** The number and label should be stacked vertically. The number anchors the top of the card. Never center-align metric cards -- left-align for readability.

**Effective metric values for your portfolio:**
- "100%" -- Section 508 compliance record
- "40+" -- Clients served
- "10+" -- Years of experience
- "0" -- Accessibility violations (powerful zero)

---

### 3.3 Grid Dividers (1px Line Aesthetic)

**Current status:** Yes, very much current in 2025-2026. This "ruled grid" aesthetic is used by Linear, Stripe, and many Awwwards-winning sites. It reads as editorial/newspaper-like and signals precision.

**Implementation -- internal lines only (no outer borders):**
```css
.ruled-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

.ruled-grid > * {
  padding: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  border-right: 1px solid rgba(255, 255, 255, 0.08);
}

/* Remove right border from last column */
.ruled-grid > *:nth-child(3n) {
  border-right: none;
}

/* Remove bottom border from last row */
/* For 6 items in 3 columns: last 3 items */
.ruled-grid > *:nth-last-child(-n+3) {
  border-bottom: none;
}
```

**Border color for your palette:**
- Subtle: `rgba(255, 255, 255, 0.06)` -- barely visible, editorial
- Standard: `rgba(255, 255, 255, 0.08)` -- most common
- Visible: `rgba(255, 255, 255, 0.12)` -- more defined grid

**Upcoming CSS feature:** CSS Gap Decorations (`row-rule`, `column-rule` for grid) is proposed by Microsoft but NOT yet implemented in any browser. Use the border technique above.

**Ruled grid vs gapped cards:** You can use both in the same portfolio. Ruled grids work best for competency sections (structured, precise). Gapped cards work best for project showcases (breathing room, visual weight).

---

### 3.4 Bento Competency Grids

**Recommended layout for your 5-6 competency areas:**

```
[  Design Systems (2x1)  ] [ Accessibility (1x1) ]
[ Frontend Arch (1x1) ] [ AI Workflows (1x1) ] [ Product (1x1) ]
```

Or for more visual impact:
```
[ Design Systems (2x2) ] [ Accessibility (1x1) ]
[                       ] [ Frontend Arch (1x1) ]
[ AI Workflows (1x1) ] [ Product (1x1) ] [ Figma+Code (1x1) ]
```

**Size ratios and what they signal:**
- 2x1 (wide): "This is a primary competency" -- use for 1-2 items
- 2x2 (large square): "This is THE defining competency" -- use for 1 item max
- 1x1 (standard): Supporting competencies
- 1x2 (tall): Rarely used for competencies, better for visual elements

**Card interior hierarchy by size:**

Small card (1x1):
```
[Icon or metric]
[Heading]
[One line description]
```

Wide card (2x1):
```
[Heading]                          [Icon]
[2-3 line description with proof point]
[Optional: tool/tech tags at bottom]
```

Large card (2x2):
```
[Large metric or visual]
[Heading]
[Full paragraph description]
[Supporting evidence or tool list]
```

---

## Part 4: Quick Reference -- Specific Values for Your Palette

### Color Tokens
```css
:root {
  /* Backgrounds */
  --bg: #0C0A09;
  --surface-1: #1C1917;
  --surface-2: #252220;
  --surface-3: #2E2A27;

  /* Accent */
  --accent: #D4A574;
  --accent-hover: #E0B88A;
  --accent-muted: rgba(212, 165, 116, 0.15);
  --accent-subtle: rgba(212, 165, 116, 0.08);

  /* Text */
  --text-primary: rgba(255, 255, 255, 0.9);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-tertiary: rgba(255, 255, 255, 0.4);

  /* Borders */
  --border-subtle: rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.12);
  --border-accent: rgba(212, 165, 116, 0.3);
}
```

### Transition Tokens
```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-reveal: 500ms;
}
```

### Component Summary
| Component | Background | Border | Radius | Hover Transform |
|-----------|-----------|--------|--------|----------------|
| Card | surface-1 | border-subtle | 12px | translateY(-2px) |
| Button primary | accent | none | 8px | translateY(-1px) |
| Button secondary | transparent | border-accent | 8px | bg accent-subtle |
| Input | surface-1 | border-default | 8px | border-hover |
| Tag/pill | accent-subtle | none | 9999px | accent-muted |

---

## Sources

- [Linear Style Design System](https://linear.style/)
- [Linear Design: The SaaS Design Trend](https://blog.logrocket.com/ux-design/linear-design/)
- [CSS Gradient Borders -- CSS-Tricks](https://css-tricks.com/gradient-borders-in-css/)
- [Glowing Hover Effect -- Frontend Masters](https://frontendmasters.com/blog/glowing-hover-effect/)
- [Modern Card Hover Animations](https://dev.to/kadenwildauer/modern-card-hover-animations-css-and-javascript-3cg3)
- [Dark Glassmorphism in 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- [Gradient Borders with Tailwind CSS](https://techtales.vercel.app/read/techtalesteam/how-to-create-gradient-borders-with-tailwind-css)
- [Material Design 3 Elevation](https://m3.material.io/styles/elevation/applying-elevation)
- [Dark Theme Design with Material](https://blog.prototypr.io/how-to-design-a-dark-theme-for-your-android-app-3daeb264637)
- [Good Dark Mode Shadows](https://www.parker.mov/notes/good-dark-mode-shadows)
- [CSS Gap Decorations Proposal](https://blogs.windows.com/msedgedev/2025/03/19/minding-the-gaps-a-new-way-to-draw-separators-in-css/)
- [Grid Internal Border Lines](https://robleto.medium.com/how-to-set-internal-border-lines-on-a-css-grid-layout-f2f1eeaafb61)
- [Modern CSS Underline Styling](https://medium.com/@karstenbiedermann/say-goodbye-to-boring-underlines-styling-text-in-2025-with-modern-css-ad747a8321c9)
- [Bento Grid Design Examples](https://mockuuups.studio/blog/post/best-bento-grid-design-examples/)
- [Building Premium Bento Portfolio](https://dev.to/kiran_balaji_197/building-a-premium-bento-style-portfolio-with-react-gsap-tailwind-v4-2ig8)
- [Button States Explained 2026](https://www.designrush.com/best-designs/websites/trends/button-states)
- [Web Design Trends 2026](https://designmodo.com/web-design-trends/)
- [Stripe-Inspired Cards Hover Effect](https://freefrontend.com/code/stripe-inspired-cards-hover-effect-2026-01-19/)
- [Awwwards Dark Mode Collection](https://www.awwwards.com/awwwards/collections/dark-mode/)
- [Bento Grid -- Aceternity UI](https://ui.aceternity.com/components/bento-grid)
