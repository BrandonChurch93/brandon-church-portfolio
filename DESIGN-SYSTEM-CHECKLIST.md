# Design System Foundation Checklist
## Every Decision to Lock In BEFORE Building Sections

This document captures concrete values, measurements, and decisions based on
current (2026) best practices for premium portfolio websites. Values are
ready to drop into a Tailwind v4 `@theme` block or a v3 `tailwind.config.js`.

---

## TABLE OF CONTENTS

1. [Color Tokens](#1-color-tokens)
2. [Spacing Scale](#2-spacing-scale)
3. [Typography Scale](#3-typography-scale)
4. [Border Radius Scale](#4-border-radius-scale)
5. [Shadow / Elevation Scale](#5-shadow--elevation-scale)
6. [Animation / Transition Tokens](#6-animation--transition-tokens)
7. [Container & Layout System](#7-container--layout-system)
8. [Responsive Breakpoints](#8-responsive-breakpoints)
9. [Component Patterns](#9-component-patterns)
10. [Tailwind v4 Migration Notes](#10-tailwind-v4-migration-notes)
11. [Current State Audit](#11-current-state-audit)
12. [Full Token Reference Table](#12-full-token-reference-table)

---

## 1. COLOR TOKENS

### Structure: 3 Tiers

**Tier 1 -- Primitives** (raw palette, never used directly in components):
```
pink-50 through pink-950
purple-50 through purple-950
slate-50 through slate-950
```

**Tier 2 -- Semantic** (role-based, what components reference):
```
--color-primary:           #ff3f81
--color-primary-hover:     #ff5a92   (lighten 8-10%)
--color-primary-active:    #e63770   (darken 10%)
--color-primary-glow:      rgba(255, 63, 129, 0.3)

--color-accent:            #a78bfa
--color-accent-hover:      #c4b5fd
--color-accent-active:     #7c3aed

--color-bg-base:           #23153c
--color-bg-elevated:       #2d1b4e   (cards, surfaces)
--color-bg-sunken:         #1a0f2e   (recessed areas)
--color-bg-overlay:        #0f0820   (modals, full-bleed bg)

--color-text-primary:      #ffffff
--color-text-secondary:    #e2e8f0   (descriptions, subtitles)
--color-text-tertiary:     #94a3b8   (captions, metadata)
--color-text-disabled:     #64748b

--color-border-default:    rgba(255, 255, 255, 0.1)
--color-border-hover:      rgba(255, 255, 255, 0.2)
--color-border-active:     rgba(255, 63, 129, 0.5)
```

**Tier 3 -- Component** (optional, for complex systems):
```
--color-card-bg:           var(--color-bg-elevated)
--color-card-border:       var(--color-border-default)
--color-button-primary-bg: var(--color-primary)
--color-nav-bg:            rgba(15, 8, 32, 0.8)
```

### Glass Morphism Tokens (still relevant in 2026, use with restraint)
```
--glass-bg:                rgba(255, 255, 255, 0.05)
--glass-bg-hover:          rgba(255, 255, 255, 0.08)
--glass-bg-strong:         rgba(255, 255, 255, 0.10)
--glass-border:            rgba(255, 255, 255, 0.10)
--glass-border-hover:      rgba(255, 255, 255, 0.20)
--glass-blur:              10px       (standard)
--glass-blur-heavy:        20px       (overlays, nav)
```

### Color Count Recommendation
- 1 primary color (with hover/active/glow variants)
- 1 accent color (with hover/active variants)
- 3-4 background shades (base, elevated, sunken, overlay)
- 3-4 text shades (primary, secondary, tertiary, disabled)
- 2-3 border opacities
- Total: ~20-25 semantic tokens

---

## 2. SPACING SCALE

### Base Unit: 4px (0.25rem)

The 8px grid is the standard for 2026. All values are multiples of 4px,
with primary stops at 8px intervals.

```
--spacing-0:    0           (0px)
--spacing-0.5:  0.125rem    (2px)   -- hairline gaps
--spacing-1:    0.25rem     (4px)   -- icon gaps
--spacing-1.5:  0.375rem    (6px)
--spacing-2:    0.5rem      (8px)   -- tight element spacing
--spacing-3:    0.75rem     (12px)  -- label-to-input gap
--spacing-4:    1rem        (16px)  -- default inner padding
--spacing-5:    1.25rem     (20px)
--spacing-6:    1.5rem      (24px)  -- card padding, grid gap
--spacing-8:    2rem        (32px)  -- card padding large
--spacing-10:   2.5rem      (40px)  -- between content blocks
--spacing-12:   3rem        (48px)  -- between groups
--spacing-16:   4rem        (64px)  -- section padding mobile
--spacing-20:   5rem        (80px)  -- section padding tablet
--spacing-24:   6rem        (96px)  -- section padding desktop
--spacing-32:   8rem        (128px) -- section padding ultrawide
```

### Section Vertical Spacing (between full sections)
```
Mobile:       64px  (4rem)    -- py-16
Tablet:       80px  (5rem)    -- md:py-20
Desktop:      96px  (6rem)    -- lg:py-24
Ultrawide:    128px (8rem)    -- 2xl:py-32
```

Using clamp(): `clamp(4rem, 8vw + 1rem, 8rem)` covers all breakpoints in
a single declaration. Your current `--section-padding` value is close:
`clamp(4rem, 10vw, 8rem)` -- this is fine but 10vw may be too aggressive
on wide screens. Consider `clamp(4rem, 6vw + 1rem, 7rem)`.

### Card / Component Padding
```
Small card:    16px  (1rem)    -- p-4
Default card:  24px  (1.5rem)  -- p-6
Large card:    32px  (2rem)    -- p-8
```

### Grid Gap
```
Default gap:   24px  (1.5rem)  -- gap-6
Tight gap:     16px  (1rem)    -- gap-4
Wide gap:      32px  (2rem)    -- gap-8
```

---

## 3. TYPOGRAPHY SCALE

### Font Size Scale (with line heights)
```
--text-xs:     0.75rem   (12px)   line-height: 1rem    (16px)
--text-sm:     0.875rem  (14px)   line-height: 1.25rem (20px)
--text-base:   1rem      (16px)   line-height: 1.5rem  (24px)
--text-lg:     1.125rem  (18px)   line-height: 1.75rem (28px)
--text-xl:     1.25rem   (20px)   line-height: 1.75rem (28px)
--text-2xl:    1.5rem    (24px)   line-height: 2rem    (32px)
--text-3xl:    1.875rem  (30px)   line-height: 2.25rem (36px)
--text-4xl:    2.25rem   (36px)   line-height: 2.5rem  (40px)
--text-5xl:    3rem      (48px)   line-height: 1.15
--text-6xl:    3.75rem   (60px)   line-height: 1.1
--text-7xl:    4.5rem    (72px)   line-height: 1.05
```

### Responsive Heading Sizes
```
H1 (Hero):     text-3xl -> md:text-5xl -> lg:text-6xl -> xl:text-7xl
H2 (Section):  text-2xl -> md:text-3xl -> lg:text-4xl
H3 (Card):     text-xl  -> md:text-2xl
Body:          text-base (16px, never smaller on any breakpoint)
Caption:       text-sm   (14px)
Overline:      text-xs   (12px), tracking-widest, uppercase
```

### Font Weight Tokens
```
--font-weight-normal:     400    (body text)
--font-weight-medium:     500    (subtitles, labels)
--font-weight-semibold:   600    (section headings)
--font-weight-bold:       700    (hero headings, emphasis)
```

### Letter Spacing
```
--tracking-tight:    -0.025em   (large headings, 36px+)
--tracking-normal:   0          (body text)
--tracking-wide:     0.025em    (buttons, labels)
--tracking-widest:   0.1em      (overlines, all-caps text)
```

### Line Length
- Optimal reading: 65-75 characters per line
- Max paragraph width: ~680px (max-w-2xl)
- Max content width: ~768px (max-w-3xl) for text-heavy sections

---

## 4. BORDER RADIUS SCALE

Keep on the 8px grid. Inner radius = outer radius minus padding.

```
--radius-none:   0           (sharp corners)
--radius-sm:     4px  (0.25rem)  -- tags, badges, small chips
--radius-md:     8px  (0.5rem)   -- buttons, inputs, small cards
--radius-lg:     12px (0.75rem)  -- cards, modals
--radius-xl:     16px (1rem)     -- large cards, feature sections
--radius-2xl:    24px (1.5rem)   -- hero elements, image containers
--radius-full:   9999px          -- pills, avatars, circular elements
```

### Application Guide
```
Buttons:          --radius-md   (8px)
Inputs:           --radius-md   (8px)
Tags/Badges:      --radius-sm   (4px) or --radius-full for pills
Cards:            --radius-lg   (12px)
Image containers: --radius-xl   (16px) or --radius-2xl (24px)
Tooltips:         --radius-md   (8px)
Modals:           --radius-xl   (16px)
Avatars:          --radius-full (circle)
```

### Nested Radius Rule
If a card has `border-radius: 12px` and `padding: 16px`, the inner
element's radius should be `12 - 16 = 0` or just use `--radius-sm` (4px)
to avoid the nested radius looking off. For `padding: 8px`, inner radius
should be `12 - 8 = 4px`.

---

## 5. SHADOW / ELEVATION SCALE

Use 4-6 levels. For dark themes, shadows are less visible -- supplement
with slightly lighter surface colors at higher elevations.

### Shadow Tokens
```
--shadow-xs:     0 1px 2px 0 rgba(0, 0, 0, 0.3)
--shadow-sm:     0 1px 3px 0 rgba(0, 0, 0, 0.3),
                 0 1px 2px -1px rgba(0, 0, 0, 0.3)
--shadow-md:     0 4px 6px -1px rgba(0, 0, 0, 0.3),
                 0 2px 4px -2px rgba(0, 0, 0, 0.3)
--shadow-lg:     0 10px 15px -3px rgba(0, 0, 0, 0.3),
                 0 4px 6px -4px rgba(0, 0, 0, 0.3)
--shadow-xl:     0 20px 25px -5px rgba(0, 0, 0, 0.3),
                 0 8px 10px -6px rgba(0, 0, 0, 0.3)
--shadow-2xl:    0 25px 50px -12px rgba(0, 0, 0, 0.5)
```

### Glow Shadows (for dark theme accents)
```
--shadow-glow-sm:    0 0 10px rgba(255, 63, 129, 0.2)
--shadow-glow-md:    0 0 20px rgba(255, 63, 129, 0.3),
                     0 0 40px rgba(255, 63, 129, 0.1)
--shadow-glow-lg:    0 0 30px rgba(255, 63, 129, 0.4),
                     0 0 60px rgba(255, 63, 129, 0.2)
--shadow-glow-accent: 0 0 20px rgba(167, 139, 250, 0.3)
```

### Elevation Application
```
Level 0 (flat):       No shadow, base background         -- flat text, backgrounds
Level 1 (raised):     --shadow-sm + bg-elevated           -- cards at rest
Level 2 (floating):   --shadow-md + bg-elevated           -- cards on hover
Level 3 (overlay):    --shadow-lg                         -- dropdowns, popovers
Level 4 (modal):      --shadow-xl                         -- modals, drawers
Level 5 (toast):      --shadow-2xl                        -- toasts, notifications
```

### Dark Theme Note
On dark backgrounds, use subtle surface color shifts (lighter = higher)
in addition to shadows:
```
Level 0:  #1a0f2e  (sunken)
Level 1:  #23153c  (base)
Level 2:  #2d1b4e  (elevated)
Level 3:  #3a2461  (overlay)
```

---

## 6. ANIMATION / TRANSITION TOKENS

### Easing Curves

**Primary (use for 80% of animations):**
```
--ease-out:      cubic-bezier(0.16, 1, 0.3, 1)
```
This is "easeOutExpo" -- fast start, very smooth deceleration. The premium
standard. Material Design and Linear both use variants of this.

**Secondary (micro-interactions, hovers):**
```
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1)
```
Material's standard easing. Good for small state changes.

**Entrance (elements appearing):**
```
--ease-enter:    cubic-bezier(0.0, 0, 0.2, 1)
```

**Exit (elements disappearing):**
```
--ease-exit:     cubic-bezier(0.4, 0, 1, 1)
```

**Spring (playful, use sparingly):**
```
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1)
```
Has slight overshoot. Good for button presses, toasts appearing.

### Duration Tokens
```
--duration-instant:    75ms     -- active/press states
--duration-fast:       150ms    -- hover states, micro-interactions
--duration-normal:     200ms    -- default transitions (buttons, links)
--duration-moderate:   300ms    -- modals, dropdowns, panels
--duration-slow:       500ms    -- page transitions, large reveals
--duration-slower:     800ms    -- scroll reveal animations
```

### Pre-composed Transition Tokens
```
--transition-colors:    color, background-color, border-color 200ms var(--ease-default)
--transition-transform: transform 200ms var(--ease-out)
--transition-shadow:    box-shadow 200ms var(--ease-default)
--transition-all:       all 200ms var(--ease-default)
```

### Scroll Reveal Distances
```
Fade up:        translateY(20px) -> translateY(0)     -- subtle, premium
Fade up large:  translateY(40px) -> translateY(0)     -- hero elements
Slide left:     translateX(-30px) -> translateX(0)
Slide right:    translateX(30px) -> translateX(0)
Scale in:       scale(0.95) -> scale(1)               -- cards, images
```

NOTE: Your current config uses translateY(40px) for fadeUp and
translateX(60px) for slides. 40px is fine for hero content but consider
reducing slides to 30-40px -- 60px can feel excessive on smaller screens.

### Stagger Timing
```
Default stagger:     50ms between items
Fast stagger:        30ms between items  (many items, like skill tags)
Slow stagger:        80ms between items  (few items, like cards)
Max total stagger:   400ms (cap it -- don't let 20 items take 1s)
```

### Hover Effects
```
Button hover:   translateY(-2px), shadow increase
Card hover:     translateY(-4px), shadow increase, border lighten
Image hover:    scale(1.03), 300ms duration
Link hover:     color change only, 150ms
Icon hover:     scale(1.1), 200ms
```

---

## 7. CONTAINER & LAYOUT SYSTEM

### Container Max-Widths
```
--container-sm:    640px     (prose/text content)
--container-md:    768px     (text-heavy sections)
--container-lg:    1024px    (standard content)
--container-xl:    1200px    (primary content container)
--container-2xl:   1400px    (wide layouts, grids)
--container-full:  1920px    (full-bleed backgrounds with padding)
```

**Recommendation:** Use 1200px as your primary container. This is what
Linear, Vercel, and most premium sites settled on. Your current
`container-custom` at 1920px is too wide -- content stretches uncomfortably
on large monitors. Use 1920px only for background elements.

### Container Padding (horizontal)
```
Mobile (< 640px):      16px  (px-4)
Tablet (640-1023px):   24px  (px-6)
Desktop (1024-1279px): 32px  (px-8)
Wide (1280+):          48px  (px-12)
```

### Grid System
```
Columns:    12-column grid (standard)
Gap:        24px (gap-6) default, 32px (gap-8) for card grids
```

### Common Layouts
```
Full-width hero:     max-w-full, content within max-w-[1200px]
Content section:     max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8
Narrow content:      max-w-[768px] mx-auto (about text, blog)
Card grid:           grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
```

---

## 8. RESPONSIVE BREAKPOINTS

### Tailwind Defaults (recommended -- do not change unless necessary)
```
sm:     640px     (landscape phones, small tablets)
md:     768px     (tablets portrait)
lg:     1024px    (tablets landscape, small laptops)
xl:     1280px    (standard laptops/desktops)
2xl:    1536px    (large desktops)
```

### Design Targets (most common viewport widths in 2026)
```
Mobile:          375px, 390px, 393px, 430px
Tablet:          768px, 810px, 820px
Laptop:          1280px, 1366px, 1440px
Desktop:         1536px, 1920px
Ultrawide:       2560px
```

### Critical Breakpoints for Portfolio
- 768px (md): Switch from single-column to multi-column layouts
- 1024px (lg): Full desktop layout kicks in
- 1280px (xl): Content reaches max-width, padding increases

---

## 9. COMPONENT PATTERNS

### Buttons
```
SHARED:
  height:           44px (min touch target)
  padding:          12px 24px (py-3 px-6)
  border-radius:    8px (rounded-md)
  font-weight:      600 (font-semibold)
  font-size:        14px (text-sm) or 16px (text-base)
  letter-spacing:   0.025em (tracking-wide)
  transition:       all 200ms cubic-bezier(0.4, 0, 0.2, 1)

PRIMARY:
  bg:               var(--color-primary)
  text:             white
  hover:            translateY(-2px), shadow-glow-sm, bg lightens 5%
  active:           translateY(0), scale(0.98)

SECONDARY (outline):
  bg:               transparent
  border:           1px solid var(--color-border-default)
  text:             white
  hover:            bg rgba(255,255,255,0.05), border lighten
  active:           bg rgba(255,255,255,0.08)

GHOST:
  bg:               transparent
  border:           none
  text:             var(--color-text-secondary)
  hover:            bg rgba(255,255,255,0.05), text white
  active:           bg rgba(255,255,255,0.08)

ICON BUTTON:
  size:             40px x 40px (or 44px for touch)
  border-radius:    8px or rounded-full
  padding:          8px
```

### Cards
```
STANDARD CARD:
  bg:               var(--glass-bg) or var(--color-bg-elevated)
  border:           1px solid var(--color-border-default)
  border-radius:    12px (rounded-lg)
  padding:          24px (p-6)
  backdrop-filter:  blur(10px)       -- if glass
  transition:       transform 300ms, box-shadow 300ms, border-color 200ms
  hover:            translateY(-4px), border lighten, shadow increase

FEATURE CARD (larger):
  padding:          32px (p-8)
  border-radius:    16px (rounded-xl)
  may include image with 12px radius inside

GLASS CARD (still relevant but use sparingly):
  bg:               rgba(255, 255, 255, 0.05)
  backdrop-filter:  blur(10px)
  border:           1px solid rgba(255, 255, 255, 0.1)
  Use for: nav bars, overlays, featured cards
  Do NOT use for: every card on the page (restraint is key)
```

### Images
```
Aspect ratios:      16:9 (project screenshots), 1:1 (avatars), 4:3 (thumbnails)
Border radius:      12px-16px (rounded-xl)
Hover:              scale(1.03), 300ms ease-out
Container:          overflow-hidden on parent (clips scaled image)
Loading:            skeleton placeholder, fade-in on load
```

### Section Dividers
```
Gradient fade:      Linear gradient from section-bg to next-section-bg, 100-200px tall
Subtle line:        1px border-top, rgba(255,255,255,0.06), with px-8 margin
Spacing only:       Just use generous section padding (no visual divider)
Avoid:              Hard horizontal rules, decorative SVG waves (dated)
```

### Tags / Badges
```
padding:            4px 12px (py-1 px-3)
border-radius:      4px (rounded-sm) or 9999px (pill)
font-size:          12px (text-xs) or 14px (text-sm)
font-weight:        500 (medium)
bg:                 rgba(255, 255, 255, 0.05)
border:             1px solid rgba(255, 255, 255, 0.1)
```

---

## 10. TAILWIND V4 MIGRATION NOTES

Your project currently uses Tailwind v3 (`tailwind.config.js` approach).
Key changes if you upgrade to v4:

### What Changed
1. **CSS-first config**: `tailwind.config.js` replaced by `@theme {}` in CSS
2. **All tokens are CSS variables**: Every `@theme` value becomes a
   `var(--...)` accessible anywhere, not just in Tailwind classes
3. **No more `@tailwind base/components/utilities`**: Replace with
   `@import "tailwindcss"`
4. **Performance**: 5x faster full builds, 100x faster incremental
5. **Modern CSS**: Uses `@layer`, `@property`, `color-mix()` under the hood
6. **No JS config needed**: Colors, spacing, shadows all in CSS
7. **Automatic content detection**: No more `content: [...]` array

### v4 @theme Example (equivalent to your current config)
```css
@import "tailwindcss";

@theme {
  /* Colors */
  --color-primary: #ff3f81;
  --color-primary-light: #ff5a92;
  --color-primary-dark: #e63770;
  --color-accent: #a78bfa;

  /* Shadows */
  --shadow-glow: 0 0 30px rgba(255, 63, 129, 0.5);
  --shadow-glow-lg: 0 0 60px rgba(255, 63, 129, 0.5);

  /* Border radius */
  --radius-4xl: 2rem;

  /* Animations */
  --animate-fade-up: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes fadeUp {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  /* Easing */
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Decision: Migrate or Stay?
- Your `package.json` has both `tailwindcss: ^3.4.17` and
  `@tailwindcss/postcss: ^4` installed, which suggests a partial migration
  state. Resolve this -- pick one version.
- If building from scratch or doing a major refactor, go v4.
- If just adding sections to existing code, stay v3 and migrate later.

---

## 11. CURRENT STATE AUDIT

What your project already defines vs. what is missing:

### Already Defined (globals.css + tailwind.config.js)
- [x] Primary color palette (pink/magenta)
- [x] Secondary color palette (purple)
- [x] Background colors (3 shades)
- [x] Text colors (3 shades)
- [x] Glass morphism tokens
- [x] Section padding (clamp-based)
- [x] Base transition timing
- [x] Several keyframe animations
- [x] Custom container class
- [x] Glow shadows
- [x] Reduced motion support
- [x] Focus visible styles
- [x] Scrollbar styling

### Missing or Needs Revision
- [ ] **Container max-width is 1920px** -- too wide, should be 1200px
- [ ] **No border-radius scale** -- only has `4xl: 2rem`
- [ ] **No elevation/shadow scale** -- only glow shadows, no depth shadows
- [ ] **No spacing tokens beyond 3 custom values** (18, 88, 120)
- [ ] **No typography scale decisions** -- relies entirely on Tailwind defaults
- [ ] **No easing curve tokens** -- hardcoded in individual animations
- [ ] **No duration tokens** -- hardcoded (200ms, 500ms, 600ms, 800ms scattered)
- [ ] **No stagger timing system**
- [ ] **Animation translate distances inconsistent** -- 10px, 20px, 40px, 60px, 80px
- [ ] **Duplicate definitions** -- colors in both CSS vars AND tailwind.config.js
- [ ] **No button component tokens**
- [ ] **No card component tokens** (glass is defined but not card elevation)
- [ ] **Tailwind version conflict** -- v3 and v4 packages both installed
- [ ] **Font stack is system-ui only** -- no custom font chosen
- [ ] **Glass applied globally with :hover** -- should be opt-in per component

---

## 12. FULL TOKEN REFERENCE TABLE

Quick-reference for every token that should exist before building:

| Category | Token | Value | Tailwind Class |
|----------|-------|-------|----------------|
| **Color** | primary | #ff3f81 | bg-primary |
| | primary-hover | #ff5a92 | hover:bg-primary-hover |
| | primary-active | #e63770 | active:bg-primary-active |
| | accent | #a78bfa | bg-accent |
| | bg-base | #23153c | bg-background |
| | bg-elevated | #2d1b4e | bg-surface |
| | bg-sunken | #1a0f2e | bg-background-dark |
| | text-primary | #ffffff | text-white |
| | text-secondary | #e2e8f0 | text-text-muted |
| | text-tertiary | #94a3b8 | text-text-dim |
| **Spacing** | section-mobile | 64px | py-16 |
| | section-tablet | 80px | md:py-20 |
| | section-desktop | 96px | lg:py-24 |
| | card-padding | 24px | p-6 |
| | grid-gap | 24px | gap-6 |
| **Radius** | sm | 4px | rounded-sm |
| | md | 8px | rounded-md |
| | lg | 12px | rounded-lg |
| | xl | 16px | rounded-xl |
| | 2xl | 24px | rounded-2xl |
| | full | 9999px | rounded-full |
| **Shadow** | sm | 0 1px 3px... | shadow-sm |
| | md | 0 4px 6px... | shadow-md |
| | lg | 0 10px 15px... | shadow-lg |
| | glow-sm | 0 0 10px primary/20 | shadow-glow-sm |
| | glow-md | 0 0 20px primary/30 | shadow-glow |
| **Easing** | out (primary) | cubic-bezier(0.16, 1, 0.3, 1) | -- |
| | default | cubic-bezier(0.4, 0, 0.2, 1) | ease-in-out |
| | spring | cubic-bezier(0.34, 1.56, 0.64, 1) | -- |
| **Duration** | fast | 150ms | duration-150 |
| | normal | 200ms | duration-200 |
| | moderate | 300ms | duration-300 |
| | slow | 500ms | duration-500 |
| | reveal | 800ms | duration-800 |
| **Animation** | fade-up dist | 20px (standard), 40px (hero) | -- |
| | slide dist | 30px | -- |
| | scale-in start | 0.95 | -- |
| | stagger | 50ms per item | -- |
| | hover lift | -4px (card), -2px (button) | -- |
| **Container** | content | 1200px | max-w-[1200px] |
| | narrow | 768px | max-w-3xl |
| | wide | 1400px | max-w-[1400px] |
| **Breakpoint** | sm | 640px | sm: |
| | md | 768px | md: |
| | lg | 1024px | lg: |
| | xl | 1280px | xl: |
| | 2xl | 1536px | 2xl: |

---

## PRIORITY ACTION ITEMS

1. **Fix container max-width** -- change from 1920px to 1200px for content
2. **Resolve Tailwind version** -- pick v3 or v4, remove the other
3. **Consolidate color definitions** -- one source of truth (CSS vars OR config)
4. **Add border-radius scale** -- sm/md/lg/xl/2xl/full
5. **Add shadow elevation scale** -- sm through 2xl plus glow variants
6. **Define easing tokens as CSS variables** -- stop hardcoding cubic-bezier
7. **Define duration tokens** -- standardize on 5-6 named durations
8. **Normalize animation distances** -- pick 20px/30px/40px, stop using 60px
9. **Add stagger system** -- 50ms base with max cap
10. **Choose a display font** -- system-ui is functional but not "premium"
