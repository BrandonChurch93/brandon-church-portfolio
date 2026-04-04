# Projects Section — Plan

**Status:** Awaiting Brandon's approval
**Approach:** Bento grid + dedicated /projects/[slug] pages + results-first case studies

---

## Section Layout (Main Page)

### Desktop (1200px container)

```
Section heading: "Featured Projects" (v2-heading v2-h2)

┌──────────────────────────────┬──────────────────┐
│                              │                  │
│   Modern Softworks           │  Micro-          │
│   (Featured, 2 cols)         │  Interactions    │
│                              │  Library         │
│   Larger image, title,       │                  │
│   tagline, key metric,       ├──────────────────┤
│   tech pills                 │                  │
│                              │  AI Cover Letter │
│                              │  Generator       │
│                              │                  │
├──────────────┬───────────────┴──────────────────┤
│              │                                  │
│  SwiftSnapAI │  Inbox Hero AI                   │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

- CSS Grid: `grid-template-columns: repeat(3, 1fr)` with `gap: 16px`
- Featured card: `grid-column: span 2; grid-row: span 2`
- Standard cards: `grid-column: span 1; grid-row: span 1`
- Bottom row: each card spans ~1.5 cols (or 1 + 2 split)

### Tablet (768px-1024px)
- 2-column grid
- Featured project: full width, single row
- Remaining projects: 2-column

### Mobile (<768px)
- Single column stack
- Featured project first, full width
- All cards same width

---

## Project Card Design

### Featured Card (Modern Softworks)

```
┌─────────────────────────────────────────┐
│                                         │
│  [Project screenshot - 16:9 aspect]     │
│  (image zooms subtly on hover)          │
│                                         │
├─────────────────────────────────────────┤
│  FEATURED PROJECT        (eyebrow)      │
│  Modern Softworks        (h3, heading)  │
│  Accessibility-first     (tagline,      │
│  development studio       secondary)    │
│                                         │
│  [React] [Next.js] [Tailwind] [WCAG]   │
│                                         │
│  View Project →                         │
└─────────────────────────────────────────┘
```

- Uses `v2-card v2-card-glow` (amber glow hover — reserved for featured)
- Image: 16:9 aspect ratio, `object-cover`, 12px radius top corners
- Hover: card lifts + glow + image zooms scale(1.03) over 600ms
- Click: navigates to `/projects/modern-softworks`

### Standard Cards

```
┌─────────────────────────┐
│                         │
│  [Screenshot - 16:9]    │
│                         │
├─────────────────────────┤
│  Micro-Interactions     │
│  Library                │
│                         │
│  [React] [CSS] [Motion] │
│                         │
│  View Project →         │
└─────────────────────────┘
```

- Uses `v2-card v2-card-solid` (solid lift hover)
- Same image treatment but smaller
- Title + 3-4 tech pills + "View Project →" link
- No tagline on standard cards (save space)
- Click: navigates to `/projects/[slug]`

---

## Project Detail Pages (/projects/[slug])

### Route Structure
```
app/v2/projects/
  [slug]/
    page.jsx          -- Dynamic project page
  layout.jsx          -- Shared project layout (back button, nav)
```

### Content Structure (Results-First)

```
┌─────────────────────────────────────────────────┐
│  ← Back to Projects                            │
│                                                 │
│  CASE STUDY                    (eyebrow)        │
│  Modern Softworks              (h1, heading)    │
│  Accessibility-first studio    (subtitle)       │
│                                                 │
│  [View Live ↗]  [GitHub ↗]     (CTAs)           │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │   40+   │  │  100%   │  │   95+   │        │
│  │ clients │  │  a11y   │  │  light- │        │
│  │ served  │  │  audits │  │  house  │        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
│  [Hero screenshot - full width, 16:9]           │
│                                                 │
│  THE CHALLENGE              (h2)                │
│  Description of the problem...                  │
│                                                 │
│  THE APPROACH               (h2)                │
│  How it was solved...                           │
│                                                 │
│  KEY FEATURES               (h2)                │
│  • Feature 1                                    │
│  • Feature 2                                    │
│  • Feature 3                                    │
│  • Feature 4                                    │
│                                                 │
│  BUILT WITH                 (h2)                │
│  [React] [Next.js] [Tailwind] [WCAG 2.2]       │
│                                                 │
│  ─────────────────────────────────────          │
│  ← Previous Project    Next Project →           │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Mobile Detail Page
- Single column, everything stacks
- Metrics: 3-column grid (they fit on mobile)
- Challenge/Approach: stacked (no side-by-side)
- "Back to Projects" sticky at top or accessible via browser back

---

## Project Data

All project content stored in a single data file: `app/v2/data/projects.js`

```js
export const projects = [
  {
    slug: "modern-softworks",
    title: "Modern Softworks",
    tagline: "Accessibility-first development studio",
    featured: true,
    image: "/images/projects/modern-softworks.png",
    liveUrl: "https://modern-softworks.vercel.app/",
    githubUrl: null,
    techStack: ["React", "Next.js", "Tailwind CSS", "WCAG 2.2"],
    metrics: [
      { value: "40+", label: "Clients Served" },
      { value: "100%", label: "A11y Audit Rate" },
      { value: "95+", label: "Lighthouse Score" },
    ],
    challenge: "...",
    approach: "...",
    features: ["...", "...", "...", "..."],
  },
  // ... other projects
];
```

Content will be placeholder for now — copy updates happen after design is finalized.

---

## Animations

### Section Entrance
- Section heading: clipPath reveal on scroll (via `useInView`)
- Cards: staggered fade-up (50ms stagger between cards)
- Featured card animates first

### Card Hover
- Featured: `v2-card-glow` (amber glow + lift + scale)
- Standard: `v2-card-solid` (surface shift + lift + scale)
- Image: `scale(1.03)` over 600ms with overflow hidden
- "View Project →" arrow slides right on card hover

### Page Transition
- Simple approach first: standard Next.js navigation
- Enhancement later: Framer Motion `layoutId` on the card image for a smooth expand transition (this is complex and can be added in the polish phase)

### Scroll Reveals on Detail Page
- Metrics: staggered counter animation (0 → value)
- Sections: fade-up as they enter viewport
- Screenshots: clipPath reveal or image wipe

---

## Accessibility

- [ ] Cards are keyboard navigable (focusable, Enter to navigate)
- [ ] Project images have descriptive alt text
- [ ] Detail pages have proper heading hierarchy (h1 → h2)
- [ ] "Back to Projects" link clearly labeled
- [ ] Previous/Next navigation keyboard accessible
- [ ] Tech stack pills are semantic (not just decorative)
- [ ] Reduced motion: no scroll animations, content visible immediately

## Performance

- [ ] Project images: WebP/AVIF, responsive srcSet, lazy loaded
- [ ] Detail pages: statically generated (generateStaticParams)
- [ ] Card animations: compositor-only (transform, opacity)
- [ ] No layout shift from image loading (explicit width/height or aspect-ratio)

---

## Components to Build

| Component | Purpose |
|-----------|---------|
| `ProjectsSection` | Bento grid of project cards on main page |
| `ProjectCard` | Individual project card (featured + standard variants) |
| `ProjectDetailPage` | Case study detail page template |
| `MetricCard` | Big number + label component |
| `app/v2/data/projects.js` | Project content data file |

---

## What Comes After

1. Brandon reviews plan → approves
2. Implement project section + detail pages
3. Brandon reviews visual result
4. Audit (accessibility, performance, mobile)
5. Move to Phase 3: About Section
