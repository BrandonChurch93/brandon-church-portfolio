# Mobile Animation Research for Premium Portfolio Websites (2025-2026)

Research compiled March 2026. Focus: animations that look wonderful on mobile while
remaining performant. Not "scaled down" -- built appropriately.

---

## 1. What Replaces Hover Effects on Mobile?

Premium mobile sites use a combination of these patterns:

### A. Scroll-Triggered Reveals (Primary Replacement)

The dominant pattern on Awwwards-winning mobile sites. Content animates into view as
the user scrolls, replacing the "discover on hover" model entirely.

```tsx
// Framer Motion whileInView -- the go-to for React portfolios
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
>
  <ProjectCard />
</motion.div>
```

### B. Tap Feedback (Active State Replacement)

The `:active` pseudo-class replaces `:hover` on mobile. Combine with
`-webkit-tap-highlight-color: transparent` to remove the default blue flash.

```css
/* Remove default tap highlight */
.interactive-element {
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  transition: transform 0.15s ease, opacity 0.15s ease;
}

/* Tap feedback -- scale down slightly on press */
.interactive-element:active {
  transform: scale(0.97);
  opacity: 0.85;
}

/* Desktop hover -- only apply on devices with hover capability */
@media (hover: hover) and (pointer: fine) {
  .interactive-element:hover {
    transform: scale(1.02);
    opacity: 0.9;
  }
}
```

### C. Framer Motion Tap/Press Gestures

```tsx
<motion.div
  whileTap={{ scale: 0.97 }}
  whileHover={{ scale: 1.02 }} // Only fires on hover-capable devices
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  <ProjectCard />
</motion.div>
```

### D. Content Revealed on Tap (Not Hover)

For project cards that show details on hover on desktop, mobile should either:
1. Show all content by default (no hidden state)
2. Use a tap-to-expand pattern
3. Navigate to a detail page on tap

```tsx
// Pattern: Show overlay content by default on touch devices
const isTouchDevice = typeof window !== 'undefined' &&
  window.matchMedia('(hover: none)').matches;

<ProjectCard>
  {/* On desktop: overlay appears on hover */}
  {/* On mobile: overlay content is always visible or shown on tap */}
  <motion.div
    className="project-overlay"
    initial={isTouchDevice ? { opacity: 1 } : { opacity: 0 }}
    whileHover={isTouchDevice ? {} : { opacity: 1 }}
  >
    <h3>Project Title</h3>
    <p>Description</p>
  </motion.div>
</ProjectCard>
```

### E. The @media (hover: hover) Query

This is the definitive way to separate hover from touch:

```css
/* Base styles -- work everywhere including touch */
.card {
  transition: transform 0.3s ease;
}

/* Hover effects ONLY on devices that support true hover */
@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: translateY(-4px);
  }

  .card:hover .card-image {
    transform: scale(1.05);
  }

  .card:hover .card-overlay {
    opacity: 1;
  }
}

/* Touch-specific active state */
@media (hover: none) {
  .card:active {
    transform: scale(0.98);
  }
}
```

---

## 2. CSS Properties: Compositor-Only (GPU-Accelerated) Definitive List

### S-Tier: Compositor-Only (No Layout, No Paint)

These run entirely on the GPU compositor thread. They remain smooth even when the main
thread is blocked. These are the ONLY properties you should animate on mobile.

| Property     | Performance Cost | Notes                                        |
|-------------|-----------------|----------------------------------------------|
| `transform`  | Minimal          | The king. translate, scale, rotate, skew.     |
| `opacity`    | Minimal          | The queen. Fades are always safe.             |
| `filter`     | Low-Medium       | blur(), brightness(), etc. Compositor in Chrome/Firefox. |
| `clip-path`  | Low-Medium       | Compositor-capable. Good for reveal effects.  |

### B-Tier: Paint-Only (No Layout, But Triggers Paint)

These do NOT trigger layout recalculation but DO require repainting pixels.

| Property           | Performance Cost | Notes                                       |
|-------------------|-----------------|---------------------------------------------|
| `background-color` | Low              | Cheap paint operation. OK for color changes. |
| `color`            | Low              | Text repaint. Acceptable for transitions.    |
| `border-color`     | Low              | Similar cost to background-color.            |
| `border-radius`    | Medium           | More expensive paint. Test on mobile.        |
| `box-shadow`       | HIGH             | Very expensive. Avoid animating.             |
| `backdrop-filter`  | HIGH             | Extremely expensive on mobile. See below.    |

### D-Tier: Layout-Triggering (NEVER Animate These)

These trigger layout recalculation, then paint, then composite -- the full pipeline.

| Property                 | Why It's Bad                                |
|-------------------------|---------------------------------------------|
| `width` / `height`       | Forces full layout recalculation             |
| `padding` / `margin`     | Affects all surrounding elements             |
| `top` / `left` / `right` / `bottom` | Use transform: translate() instead |
| `border-width`           | Changes element dimensions                   |
| `font-size`              | Triggers text reflow                         |
| `display`                | Nuclear option -- full recalc                |
| `grid-template-*`        | Grid recalculation                           |
| `justify-content`        | Flexbox recalculation                        |

### Specific Property Deep Dives

**clip-path:** Compositor-capable in modern browsers. Great for reveal/mask effects.
Use `clip-path: inset()` as a performant alternative to `border-radius` animations.

```css
/* Instead of animating border-radius (paint), use clip-path (compositor) */
.reveal {
  clip-path: inset(0 100% 0 0); /* Hidden */
  transition: clip-path 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.visible {
  clip-path: inset(0 0 0 0); /* Fully revealed */
}
```

**backdrop-filter:** Extremely expensive on mobile. Chromium relies on GPU for 2D
rendering, and low-powered mobile GPUs choke on it. Firefox handles it better.
If you must use it, keep blur radius low (4-8px) and limit to small areas.

```css
/* If using backdrop-filter, contain the damage */
.glass-nav {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  /* NEVER animate the blur value */
  /* The backdrop-filter itself is static -- only animate opacity */
}
```

**box-shadow:** Do NOT animate box-shadow directly. Instead, use a pseudo-element
with the target shadow and animate its opacity:

```css
.card {
  position: relative;
}
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}
@media (hover: hover) {
  .card:hover::after {
    opacity: 1;
  }
}
```

**filter: drop-shadow():** More performant than box-shadow for animations because
it runs on the compositor thread. Use this when you need animated shadows:

```css
.element {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;
}
```

---

## 3. Mobile Animation Performance Budgets

### Frame Rate Targets

| Device Type             | Target FPS | Frame Budget |
|------------------------|-----------|-------------|
| Standard mobile         | 60fps      | 16.67ms      |
| ProMotion (iPhone 13+)  | 120fps     | 8.33ms       |

**Recommendation:** Target 60fps as the baseline. Do NOT try to hit 120fps by
doubling animation complexity. ProMotion devices will automatically render at
120fps if you stay within the 16.67ms budget -- they just look smoother doing it.
The 8.33ms budget is for when you explicitly want 120fps animation smoothness.

### Frame Budget Breakdown (60fps = 16.67ms)

| Phase              | Budget  |
|-------------------|---------|
| JavaScript         | 3ms     |
| Style Calculation  | 4ms     |
| Layout             | 4ms     |
| Paint              | 4ms     |
| GPU Compositing    | 1.67ms  |

**Key insight:** If you only animate compositor-only properties (transform, opacity),
you skip the Layout and Paint phases entirely, giving you ~12ms of breathing room.

### Simultaneous Animation Limits

| Metric                           | Budget |
|---------------------------------|--------|
| Max simultaneous animations      | 3      |
| Max unique animations per page   | 10     |
| Max autoplay animations          | 1      |

"3 simultaneous animations" is the practical limit before mobile performance
degrades. This means: if 3 project cards are animating into view at the same time,
don't also have a background particle effect running.

### Battery Impact

- Compositor-only animations (transform/opacity): Minimal battery drain
- Paint-triggering animations: 2-3x the battery cost
- Layout-triggering animations: 5-10x the battery cost
- Continuous animations (infinite loops): Significant drain -- avoid or pause off-screen
- backdrop-filter with blur: Heavy GPU usage, measurable battery impact

### will-change: When to Use, When It Hurts

**RULE: will-change is a debugging tool, not a preventive optimization.**

```css
/* GOOD: Apply right before animation, remove after */
.element-about-to-animate {
  will-change: transform, opacity;
}

/* BAD: Applied to everything "just in case" */
* {
  will-change: transform; /* DO NOT DO THIS */
}
```

**When it helps:**
- Elements that will imminently animate (e.g., next slide in a carousel)
- Complex elements where you notice jank on first animation frame
- Applied via JS right before animation, removed after completion

**When it hurts:**
- Applied in CSS to everything permanently (wastes GPU memory)
- On mobile, each will-change layer consumes GPU memory
- Too many layers can crash mobile browsers (especially older Android)
- Browser already optimizes for :hover and CSS transitions automatically

```tsx
// Correct pattern: apply before, remove after
const handleAnimationStart = (el: HTMLElement) => {
  el.style.willChange = 'transform, opacity';
};

const handleAnimationEnd = (el: HTMLElement) => {
  el.style.willChange = 'auto';
};
```

**Framer Motion handles this automatically** -- it applies will-change when
animations start and removes it when they complete. If using Framer Motion,
you generally do NOT need to manage will-change manually.

---

## 4. Scroll-Triggered Animation on Mobile

### IntersectionObserver vs Scroll Event Listeners

| Metric                  | IntersectionObserver | Scroll Listener (throttled) | Scroll Listener (raw) |
|------------------------|---------------------|---------------------------|----------------------|
| Scripting time          | 23.3%                | 28.9%                      | 48.9%                |
| Fires per scroll        | Once (threshold)     | Every ~16ms (throttled)     | Every pixel           |
| Layout thrashing        | None                 | Possible                   | Guaranteed            |
| Runs on                 | Background thread    | Main thread                | Main thread           |

**Verdict:** Always use IntersectionObserver. Never use scroll event listeners for
triggering animations.

### Framer Motion useInView vs Native IntersectionObserver

Framer Motion's `useInView` hook:
- Is only 0.6kb
- Uses a pooled IntersectionObserver internally (shares one observer across components)
- Provides the same performance as native IntersectionObserver
- Has simpler API with React integration

```tsx
// Framer Motion useInView -- recommended for React
import { useInView } from 'framer-motion';

function ProjectCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"  // Trigger 100px before entering viewport
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
```

```tsx
// Alternative: whileInView prop (even simpler)
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
/>
```

**Recommendation:** Use Framer Motion's `whileInView` for simple reveal animations.
Use `useInView` when you need more control over animation sequencing.

### Should Mobile Scroll Animations Be Simpler?

No. They should use compositor-only properties. The distinction is not
"simpler vs complex" but "compositor vs paint/layout":

```tsx
// GOOD on mobile: complex-looking but compositor-only
<motion.div
  initial={{ opacity: 0, y: 60, scale: 0.95, rotate: -2 }}
  whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
  transition={{
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1],
    staggerChildren: 0.1
  }}
/>

// BAD on mobile: simple-looking but triggers layout
<motion.div
  initial={{ width: 0 }}
  whileInView={{ width: "100%" }}
/>
```

### Deactivating Off-Screen Animations

Critical for battery life. IntersectionObserver lets you pause animations
when elements scroll out of view:

```tsx
<motion.div
  whileInView={{ scale: [1, 1.02, 1] }}
  viewport={{ amount: 0.3 }} // No "once: true" -- allows re-triggering
  transition={{ repeat: Infinity, duration: 3 }}
/>
// Animation automatically pauses when element leaves viewport
```

---

## 5. DVH/SVH/LVH Implementation

### Browser Support (2026)

As of early 2026, dvh/svh/lvh are **Baseline Widely Available** (since June 2025).
Approximately 95% of global users are on browsers that support them.

| Browser         | Minimum Version |
|----------------|----------------|
| Chrome          | 108+            |
| Firefox         | 101+            |
| Safari          | 15.4+           |
| Edge            | 108+            |
| Samsung Internet | 21+            |

### Which Unit for What

| Use Case                  | Unit   | Why                                          |
|--------------------------|--------|----------------------------------------------|
| Hero section height       | `svh`  | Safe minimum. Won't overflow with toolbar.    |
| Full-screen modals        | `dvh`  | Adapts as toolbar shows/hides.               |
| Sticky elements           | `svh`  | Predictable in all toolbar states.           |
| Background sections       | `lvh`  | Use when you WANT to fill under the toolbar. |
| CSS custom properties     | `dvh`  | For JS-driven viewport calculations.         |

### Hero Section Pattern (Definitive)

```css
.hero {
  /* Fallback for the ~5% on older browsers */
  height: 100vh;

  /* Modern: use svh for initial load (toolbar visible) */
  height: 100svh;

  /* Or use dvh if you want it to resize as user scrolls */
  /* height: 100dvh; */

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

**Why svh for hero, not dvh?**
- `svh` = smallest viewport (toolbar visible). Your hero fits perfectly on first load.
- `dvh` = dynamic. It resizes as the toolbar hides/shows, which can cause layout
  shifts and content jumping. Usually not what you want for a hero.
- `lvh` = largest viewport (toolbar hidden). Content may be cut off on first load.

### Full Implementation with Custom Property Fallback

```css
:root {
  /* Fallback */
  --vh: 1vh;
}

@supports (height: 1dvh) {
  :root {
    --vh: 1dvh;
  }
}

.hero {
  height: 100vh; /* Fallback */
  height: 100svh; /* Modern browsers */
  min-height: 600px; /* Safety net for very small screens */
}

.modal-overlay {
  height: 100vh; /* Fallback */
  height: 100dvh; /* Dynamic -- adapts to toolbar */
}

.sticky-nav {
  top: 0;
  height: 60px;
  /* Use svh-based calc if needed */
}
```

### JavaScript Fallback (for the remaining 5%)

```ts
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Only apply fallback if dvh is not supported
if (!CSS.supports('height', '1dvh')) {
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
}
```

---

## 6. Touch Interaction Patterns

### A. Tap Feedback (Scale Down on Press)

```css
.tap-target {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation; /* Removes 300ms tap delay */
  user-select: none;
  transition: transform 0.1s ease, opacity 0.1s ease;
}

.tap-target:active {
  transform: scale(0.97);
  opacity: 0.8;
}
```

```tsx
// Framer Motion version
<motion.button
  whileTap={{ scale: 0.97, opacity: 0.8 }}
  transition={{ duration: 0.1 }}
>
  View Project
</motion.button>
```

### B. Minimum Touch Target Size

Per WCAG 2.2 and Apple/Google guidelines:

```css
.touch-target {
  min-width: 44px;
  min-height: 44px;
  /* Or use padding to expand the tap area */
  padding: 12px 16px;
}
```

### C. Long Press Actions (Use Sparingly)

Long press is not easily discoverable. Only use for secondary actions.

```tsx
// Framer Motion long press detection
<motion.div
  onTapStart={() => {
    longPressTimer.current = setTimeout(() => {
      setShowContextMenu(true);
    }, 500);
  }}
  onTap={() => {
    clearTimeout(longPressTimer.current);
    // Normal tap action
  }}
  onTapCancel={() => {
    clearTimeout(longPressTimer.current);
  }}
/>
```

### D. Swipe Gestures for Project Navigation

```tsx
// Framer Motion drag for horizontal project carousel
<motion.div
  drag="x"
  dragConstraints={{ left: -totalWidth, right: 0 }}
  dragElastic={0.1}
  dragMomentum={true}
  onDragEnd={(_, info) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      goToNextProject();
    } else if (info.offset.x > swipeThreshold) {
      goToPreviousProject();
    }
  }}
>
  {projects.map(project => <ProjectCard key={project.id} />)}
</motion.div>
```

### E. :active States as Hover Replacements

```css
/* Complete pattern: hover for desktop, active for mobile */
.project-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* Desktop only */
@media (hover: hover) and (pointer: fine) {
  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
}

/* Touch devices */
@media (hover: none) {
  .project-card:active {
    transform: scale(0.98);
    transition-duration: 0.1s;
  }
}
```

---

## 7. prefers-reduced-motion Implementation

### Philosophy: Reduce, Don't Remove

The goal is NOT to strip all animation. Users who enable this setting may have
vestibular disorders triggered by MOTION (movement across the screen), not by
all visual changes. Safe alternatives: opacity fades, color changes, dissolves.

### What MUST Be Disabled

| Animation Type        | Action         | Why                                     |
|----------------------|----------------|------------------------------------------|
| Parallax scrolling    | Remove          | Primary vestibular trigger               |
| Scale/zoom effects    | Remove or fade  | Can trigger motion sickness              |
| Sliding/flying in     | Replace w/ fade | Movement across viewport is problematic  |
| Auto-playing carousels| Stop            | Continuous motion is a trigger           |
| Infinite animations   | Stop            | Continuous motion                        |
| Page transitions      | Replace w/ fade | Large-scale movement                     |
| Scroll-linked motion  | Remove          | User cannot control the speed            |

### What CAN Stay

| Animation Type        | Why It's OK                              |
|----------------------|------------------------------------------|
| Opacity fades         | No spatial movement                      |
| Color transitions     | No spatial movement                      |
| Subtle focus rings    | Accessibility aid, not decoration        |
| Loading spinners      | Functional (but provide text fallback)   |
| Cursor interactions   | User-initiated and controlled            |

### CSS Implementation (Nuclear Option)

This is the simplest approach but is too aggressive for a premium portfolio:

```css
/* TOO AGGRESSIVE -- removes everything */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### CSS Implementation (Nuanced -- Recommended)

```css
@media (prefers-reduced-motion: reduce) {
  /* Remove parallax and scroll-linked effects */
  .parallax {
    transform: none !important;
  }

  /* Replace slide-in with instant fade */
  .slide-in {
    animation: fadeInOnly 0.3s ease forwards;
  }

  @keyframes fadeInOnly {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Stop infinite animations */
  .continuous-animation {
    animation-play-state: paused !important;
  }

  /* Keep opacity transitions but shorten them */
  .fade-element {
    transition-property: opacity !important;
    transition-duration: 0.2s !important;
  }

  /* Remove transform-based transitions, keep color/opacity */
  * {
    transition-property: opacity, color, background-color, border-color !important;
  }

  /* Disable smooth scrolling */
  html {
    scroll-behavior: auto !important;
  }
}
```

### JavaScript / Framer Motion Implementation

```tsx
// Hook to detect reduced motion preference
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}
```

```tsx
// Usage with Framer Motion
function ProjectCard() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReduced ? 0.2 : 0.6,
        ease: prefersReduced ? 'linear' : [0.22, 1, 0.36, 1]
      }}
      viewport={{ once: true }}
    />
  );
}
```

```tsx
// Centralized animation variants pattern
const getAnimationVariants = (prefersReduced: boolean) => ({
  hidden: {
    opacity: 0,
    y: prefersReduced ? 0 : 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReduced ? 0.15 : 0.6,
      ease: prefersReduced ? 'linear' : [0.22, 1, 0.36, 1],
    },
  },
});

// Page-level stagger (reduced or none)
const getStaggerVariants = (prefersReduced: boolean) => ({
  visible: {
    transition: {
      staggerChildren: prefersReduced ? 0 : 0.1,
    },
  },
});
```

### Framer Motion Global Reduced Motion

Framer Motion has built-in support via `MotionConfig`:

```tsx
import { MotionConfig } from 'framer-motion';

function App() {
  const prefersReduced = usePrefersReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReduced ? "always" : "never"}>
      {/* All child motion components respect this setting */}
      <Portfolio />
    </MotionConfig>
  );
}
```

When `reducedMotion="always"`:
- All animations resolve instantly to their target state
- No transition plays
- This is the nuclear option within Framer Motion

For the nuanced approach, handle it per-component as shown above.

---

## Summary: Mobile Animation Rules for This Portfolio

1. **Only animate transform, opacity, filter, clip-path** on mobile
2. **Max 3 simultaneous animations** at any point
3. **Use @media (hover: hover) to gate hover effects** -- use :active for touch
4. **Use svh for hero sections**, dvh for modals, always include vh fallback
5. **Framer Motion whileInView** for scroll reveals (uses pooled IntersectionObserver)
6. **prefers-reduced-motion**: replace motion with fades, don't remove everything
7. **will-change**: let Framer Motion handle it; only add manually as a last resort
8. **backdrop-filter**: use sparingly, never animate the blur value
9. **box-shadow**: never animate directly; use pseudo-element opacity trick
10. **Touch targets**: minimum 44x44px, use touch-action: manipulation
