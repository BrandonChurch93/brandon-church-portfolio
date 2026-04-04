# Design Engineer Portfolio Hero Sections: 2025-2026 Research

## 1. Individual Portfolio Analysis

---

### Rauno Freiberg (rauno.me) -- Staff Design Engineer at Vercel

**Concept:** The entire site is styled as a desktop operating system, not a traditional portfolio. You land on a "desktop" rather than a hero section.

**Hero/Landing:**
- Background: Atmospheric abstract imagery (dark, moody gradients) behind a centered logo mark
- No traditional hero text block -- the "hero" IS the desktop metaphor
- Dark mode is the default, with a light mode toggle that triggers a playful dock animation
- The dock (macOS-style) serves as primary navigation at the bottom of the viewport
- Interface sounds play as you navigate (click feedback, hover sounds)
- Color palette: Deep, well-chosen dark tones that complement photography and project imagery

**Typography:**
- System font stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
- Bio text uses a flowing sentence format: "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details"
- Design manifesto text: "Make it fast. Make it beautiful. Make it consistent. Make it carefully. Make it timeless. Make it soulful. Make it." -- poetic, rhythmic copy

**Animations:**
- Dock magnification animation on hover (macOS-style)
- Smooth transitions between "windows" (projects, photography, experiments)
- Horizontal scrolling galleries for projects
- Dark/light mode transition with satisfying dock animation
- Animated gradient border that rotates continuously (360deg over 4 seconds)
- Image entrance: slideUp animation from 40% lower with fade-in over 1.8 seconds

**Navigation:** Bottom dock (not a traditional nav bar). Links to projects, photography, experiments.

**What makes it memorable:** The OS metaphor is the differentiator. It does not look like a portfolio -- it feels like opening someone's personal computer. The craft is in the micro-interactions and sound design.

**Mobile:** The dock adapts to mobile. The OS metaphor simplifies but maintains the same dark aesthetic.

---

### Emil Kowalski (emilkowal.ski) -- Design Engineer at Linear

**Concept:** Radically minimal. Content-first. Anti-flashy.

**Hero Layout:**
- Left-aligned text within a max-width container (692px), centered on the page
- Vertical flow with generous padding (py-12 mobile, py-32 desktop)
- No hero image, no background effect, no animation in the hero itself

**Hero Copy (exact structure):**
- Name: "Emil Kowalski" (medium weight, inline-block)
- Title: "Design Engineer" (medium weight, reduced line height)
- Two paragraphs of gray body text describing current role at Linear and previous work at Vercel
- Mentions building open source libraries (Vaul, Sonner)

**Typography:**
- Sans-serif system stack (Tailwind defaults)
- Medium font weight for name and title
- Body text in a muted gray (gray-1100)

**Colors:**
- Light gray background (bg-gray-100) with dark mode support
- Primary text: dark gray (gray-1200)
- Secondary text: lighter gray (gray-1100)
- Dark mode: white text on dark backgrounds

**CTAs:** None in the hero. No buttons. No scroll indicator.
**Social links:** Not in hero -- relegated to footer "More" section.
**Navigation:** No prominent nav bar above the fold.

**What makes it memorable:** The restraint IS the statement. Coming from someone who builds animation libraries (Sonner, Vaul), the deliberate absence of animation says "my work speaks for itself." The site is essentially a blog with project links.

**Mobile:** Same layout, just less padding. No changes to the approach.

---

### Paco Coursey (paco.me) -- Design Engineer, prev Linear/Vercel

**Concept:** Minimalist, text-driven, focused on writing and craft.

**Hero Layout:**
- Clean, minimal layout
- Name: "Paco Coursey" as heading
- Introductory text: "Crafting interfaces. Building polished software and web experiences..."
- Navigation sections: Building, Projects, Writing, Now, Connect

**Typography:**
- Focus on typography as a core design element
- Clean sans-serif
- Thoughtful spacing and hierarchy

**Colors:**
- Dark theme with clean typography
- Minimal color palette

**Design philosophy:**
- Masterclass in minimalist design
- Clean layout, thoughtful typography, seamless UX
- "Simplicity can be powerful when executed with precision"
- Expertise areas: typography, motion design, copywriting, performance

**What makes it memorable:** Like Emil's site, the restraint is intentional. From the person who built Vercel's design system and dashboard, the personal site is a manifesto in minimalism. The writing and project quality carry the experience.

---

### Brittany Chiang (brittanychiang.com) -- Software Engineer

**Concept:** The gold standard one-page developer portfolio. Dark theme, structured, scannable.

**Hero Layout:**
- Two implied sections: header area with name/title, then scrolling content
- Name: "Brittany Chiang" as primary heading
- Title: "Frontend Engineer"
- Tagline: "I build accessible, pixel-perfect digital experiences for the web."

**Typography:**
- Inter typeface for all text (confirmed in site footer)
- Calibre and SF Mono also used (per One Page Love analysis of v4)
- Clear hierarchy: large name, medium title, smaller tagline

**Colors:**
- Dark color scheme (dark slate/navy background)
- Green accent color for interactive elements and highlights
- The current version features a radial gradient spotlight effect that follows the mouse cursor, creating a subtle glow on the dark background

**Layout Pattern (current version):**
- Two-column layout on desktop: left column is sticky (name, title, nav links, social icons), right column scrolls (About, Experience, Projects)
- The left sticky column contains: name, title, tagline, section nav links, and social icons at the bottom
- Numbered navigation links (About, Experience, Projects)
- Active section highlighted as you scroll

**Animations:**
- Page load animation sequence
- Smooth scroll between sections
- Hover effects on project cards and links
- Radial gradient that follows cursor position across the page
- Project cards have subtle lift/highlight on hover

**Social Links:** In the hero/sticky sidebar -- GitHub, LinkedIn, CodePen, Instagram, Goodreads

**Mobile:** Single column. Sticky sidebar becomes standard header. All content stacks vertically.

**What makes it memorable:** The two-column sticky layout became a template that thousands of developers copied. The cursor-following gradient spotlight on the dark background adds depth without being distracting. Every detail is polished -- hover states, transitions, spacing.

---

### Cyd Stumpel (cydstumpel.nl) -- Creative Developer, Awwwards SOTD

**Concept:** Typography-forward, CSS-native animations, creative developer showcase.

**Hero Layout:**
- Name "Cyd Stumpel" repeated four times (large typographic treatment, likely animated/staggered)
- Professional descriptors stacked vertically: "Freelance Developer", "Creative Engineer", "Conference Speaker", "Parttime Lecturer", "Front end Consultant"
- Supporting text: "I'm a creative developer & teacher from Amsterdam, the Netherlands. I create accessible, creative, award winning websites."
- Email and availability status in the hero

**Typography:**
- Primary: "Instrument Serif" (display/heading font)
- Secondary: "Geist" (body text, weights 400-900)
- Fluid typography using clamp() for responsive scaling

**Colors:**
- Primary: #222 (near-black)
- Background: #F8F8F8 (light) and #ededed (medium gray)
- Accent colors: orange (#FA5D29), blue (#49B3FC), green (#AAEEC4), purple (#502bd8), yellow (#FFF083)

**Technical Innovation:**
- Built with CSS Scroll-Driven Animations (no JavaScript for scroll effects)
- CSS View Transitions for page navigation
- GSAP ScrollTrigger as fallback for non-Chromium browsers
- 12-column CSS Grid layout
- Inner container max-width: 1816px

**Animations:**
- Scroll-driven animations where scroll position (not time) determines animation progress
- View transitions between pages
- Graceful degradation for browsers without support

**What makes it memorable:** The CSS-native approach. No GSAP dependency for the primary experience. The repeated name treatment and the role-stacking create a bold typographic identity. The serif + sans-serif font pairing (Instrument Serif + Geist) is distinctive.

**Mobile:** Responsive with breakpoints at 576px, 768px, 1000px, 1024px. The bold typography scales down but maintains impact.

---

### Joffrey Spitzer (joffreyspitzer.com) -- Creative Developer

**Concept:** Minimalist with masterful motion. Astro + GSAP. Featured on Codrops.

**Hero/Landing Experience:**
- Opens with a PRELOADER: counter animating 0-100 using `steps(14)` easing over 3 seconds
- Background image (video first frame) visible during preloader
- Preloader exit: clip-path animation `inset(2.5rem) -> inset(100% 0 0 0)` over 1 second with `expo.inOut`
- After preloader, the showreel video plays using GSAP Flip plugin transition

**Text Reveal Animations (GSAP SplitText):**
- Titles: Characters animate upward with `yPercent: -120`, scale from 1.2, stagger 0.01s, duration 1s, easing `expo.out`
- Paragraphs: Lines move up from `yPercent: 105`, stagger 0.04s, duration 0.9s, easing `expo.out`
- Both use `autoSplit: true` for responsive re-splitting on resize

**Image/Video Reveals:**
- Gallery items: `yPercent: 100` to 0, opacity 0 to 1, stagger 0.1s, duration 0.8s, easing `power3.out`

**Page Transitions:**
- GSAP Flip plugin: menu links animate INTO page titles (e.g., "About" link morphs into the About page heading)
- Creates visual continuity between navigation and destination

**Tech Stack:** Astro + GSAP (SplitText, Flip, ScrollTrigger)

**What makes it memorable:** The preloader-to-content transition is cinema-quality. The Flip-based page transitions where nav items become page titles is an innovation that very few portfolios attempt. The text reveal timing (0.01s character stagger) creates a fluid, wave-like effect rather than a mechanical letter-by-letter reveal.

---

## 2. Hero Layout Patterns (2025-2026 Consensus)

### Text Alignment
- **Left-aligned is dominant** among design engineers (Emil, Paco, Brittany's sticky column)
- Centered is more common for creative developers and agencies (Cyd)
- Rauno breaks the pattern entirely with the OS metaphor

### Content Density in Hero
The spectrum from minimal to dense:
1. **Name only**: Rauno (logo mark on desktop)
2. **Name + Title**: Emil ("Emil Kowalski / Design Engineer")
3. **Name + Title + One-liner**: Brittany ("Brittany Chiang / Frontend Engineer / I build accessible, pixel-perfect digital experiences")
4. **Name + Multiple Roles + Description**: Cyd (name + 5 role descriptors + paragraph)

**The trend for design engineers specifically: Name + Title + One supporting sentence. No more.**

### Scroll Indicators
- Almost none of the top design engineer portfolios use scroll indicators
- No mouse icons, no bouncing arrows, no "scroll down" text
- The assumption is: users know how to scroll
- Some use subtle content peaking above the fold to suggest scrollability

### Social Links
- **In hero/sidebar**: Brittany (sticky left column)
- **In footer only**: Emil, Paco
- **In dock/nav**: Rauno
- **Trend**: Social links are moving OUT of the hero. They are secondary.

### Navigation Visibility
- **Visible immediately**: Brittany (sticky sidebar), Rauno (dock)
- **Minimal/hidden initially**: Emil (no prominent nav), Paco (sections below)
- **Trend**: Navigation is either always-visible-but-minimal OR entirely absent from the hero

---

## 3. Hero Entrance Animations (Technical Details)

### Joffrey Spitzer's Approach (the most detailed reference):

**Preloader Sequence:**
```
0.0s - Counter starts (0 -> 100)
3.0s - Counter complete
3.0s - Clip-path exit begins (1s, expo.inOut)
4.0s - Content revealed
4.0s - Text animations begin
```

**Text Reveal (Characters):**
```javascript
// Title animation
SplitText with mask: 'characters'
yPercent: -120  // characters slide up from below
scale: 1.2      // slightly oversized, scales to 1
stagger: 0.01   // 10ms between each character
duration: 1     // 1 second per character animation
ease: 'expo.out' // fast start, smooth deceleration
```

**Text Reveal (Lines):**
```javascript
// Paragraph animation
SplitText with mask: 'lines'
yPercent: 105   // lines slide up from below
stagger: 0.04   // 40ms between each line
duration: 0.9   // 0.9 seconds per line
ease: 'expo.out'
```

### Common Entrance Animation Patterns:

**Pattern 1: Staggered Fade-Up (Most Common)**
- Elements fade in and translate up (y: 20-40px -> 0)
- Stagger: 0.1-0.15s between elements
- Duration: 0.5-0.8s per element
- Total sequence: 1-2 seconds
- Easing: ease-out or cubic-bezier equivalent

**Pattern 2: Clip-Path Reveal**
- Text revealed via clip-path: inset(0 0 100% 0) -> inset(0)
- Creates a "curtain rising" effect
- Duration: 0.6-1.0s
- Often combined with slight y-translate

**Pattern 3: Character-by-Character (Premium)**
- SplitText into characters
- Each character translates up and fades in
- Stagger: 0.01-0.03s (wave effect) or 0.05s (typewriter effect)
- Duration: 0.8-1.2s per character
- Total: depends on text length, usually 1.5-3s

**Pattern 4: Line-by-Line Mask**
- Text split into lines
- Each line slides up from behind a mask (overflow: hidden parent)
- Stagger: 0.04-0.08s
- Clean, professional feel

### Timing Best Practices:
- Total hero entrance should complete in 1.5-3 seconds max
- First meaningful content visible by 0.5s
- delayChildren: 0.2-0.5s (brief pause before sequence starts)
- staggerChildren: 0.05-0.15s (gap between elements)
- Content below the fold should be static (not blank) while hero animates
- Never block scroll during entrance animation

### Framer Motion Implementation Pattern:
```javascript
// Parent container
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
}

// Child elements
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] // custom cubic-bezier
    }
  }
}
```

---

## 4. Hero Copy Patterns for "Design Engineer" Positioning

### What the best ones actually say:

**Emil Kowalski:**
- Name: "Emil Kowalski"
- Title: "Design Engineer"
- Body: Two paragraphs about current role at Linear, previous work at Vercel, and open source projects

**Paco Coursey:**
- "Paco Coursey"
- "Crafting interfaces. Building polished software and web experiences."

**Rauno Freiberg:**
- "Rauno Freiberg is an Estonian interaction designer working with Vercel and Devouring Details"
- Manifesto: "Make it fast. Make it beautiful. Make it consistent. Make it carefully. Make it timeless. Make it soulful. Make it."

**Brittany Chiang:**
- "Brittany Chiang"
- "Frontend Engineer"
- "I build accessible, pixel-perfect digital experiences for the web."

**Cyd Stumpel:**
- "Cyd Stumpel" (repeated 4x for typographic effect)
- Five role descriptors stacked
- "I'm a creative developer & teacher from Amsterdam..."

### Copy Pattern Analysis:

**The Minimal Approach (Emil, Paco):**
- Name + Title + 1-2 sentences
- No buzzwords, no superlatives
- Reads like a professional introduction, not marketing copy
- Lets the work below do the selling

**The Statement Approach (Rauno):**
- Poetic/manifesto-style supporting text
- Values-driven rather than skills-driven
- Memorable and quotable
- Risk: can come across as pretentious if not backed by the work

**The Functional Approach (Brittany):**
- Name + Title + One clear value proposition
- Describes WHAT you do and HOW you do it
- "Accessible, pixel-perfect digital experiences" -- specific, credible
- Safe, effective, scannable

**The Identity Approach (Cyd):**
- Multiple role descriptors to show range
- Location/context included
- More personal, more human

### Recommended Copy Formula for a Design Engineer:
```
[Name]
[Title: "Design Engineer" or equivalent]
[One sentence: what you do + how you do it OR what you care about]
```

Example patterns:
- "I build polished interfaces that feel alive."
- "Bridging design and engineering to craft exceptional web experiences."
- "I design and build things for the web."

Keep it under 20 words for the supporting line. The trend is toward LESS copy, not more.

---

## 5. Mobile Hero Experience

### Viewport Units (2025-2026 Best Practice):
- **Use `svh` (Small Viewport Height)** for hero sections -- accounts for mobile browser chrome
- `100svh` ensures the hero fills the viewport even with address bar visible
- `dvh` (Dynamic Viewport Height) adjusts as browser chrome appears/disappears but can cause layout jank
- **Recommendation**: `min-height: 100svh` for the hero, allowing content to expand beyond if needed
- Browser support: Baseline Widely Available since June 2025, ~95% global support in 2026
- Always test on real devices -- Chrome DevTools does not accurately simulate browser UI behavior

### Layout Changes:
- **Brittany Chiang**: Two-column sticky layout collapses to single column. Sidebar becomes standard header.
- **Emil Kowalski**: Padding reduces (py-32 -> py-12). Otherwise identical.
- **Rauno**: Dock adapts but maintains OS metaphor.
- **Cyd Stumpel**: 12-column grid simplifies. Breakpoints at 576px, 768px, 1000px, 1024px.
- **Joffrey Spitzer**: SplitText uses `autoSplit: true` to recalculate line breaks on resize.

### Animation on Mobile:
- **Preserve entrance animations** but simplify complexity
- Reduce particle counts, disable parallax, simplify 3D transforms
- Character-by-character reveals still work on mobile
- Scroll-driven animations work but need touch-friendly easing
- **Never use hover-dependent interactions** as the primary experience on mobile
- Cursor-following effects (like Brittany's spotlight) are disabled or replaced with a static gradient on mobile

### Touch Interactions:
- Swipe gestures for horizontal galleries (Rauno's project scroll)
- Tap targets minimum 44x44px
- No long-press or multi-touch requirements
- Scroll momentum should feel native

### Performance Considerations:
- GSAP SplitText creates many DOM nodes -- test on low-end devices
- Reduce stagger counts on mobile (fewer elements = faster sequence)
- Use `will-change` sparingly -- mobile GPUs have limited memory
- Intersection Observer over scroll event listeners for triggering animations

---

## 6. Key Takeaways for Implementation

### The 2025-2026 Design Engineer Hero Formula:
1. **Dark background** (the dominant choice -- 4 of 6 portfolios analyzed)
2. **Large name** as the primary element
3. **Short title** ("Design Engineer" or equivalent)
4. **One supporting sentence** (15-25 words max)
5. **Subtle entrance animation** (staggered fade-up, 1.5-2s total)
6. **No scroll indicator** (trust the user)
7. **Social links either in sticky sidebar or footer** (not cluttering the hero)
8. **System or clean sans-serif font** for body, optional serif for display

### What Separates Good from Great:
- **Good**: Clean layout, nice typography, basic fade-in
- **Great**: One memorable interaction or visual detail (Rauno's OS metaphor, Brittany's cursor spotlight, Joffrey's Flip transitions, Cyd's CSS-only scroll animations)
- The differentiator is always ONE thing done exceptionally well, not many things done adequately

### Technical Stack Patterns:
- Next.js is the dominant framework
- Tailwind CSS for styling
- Framer Motion OR GSAP for animations (not both)
- Astro emerging as an alternative (Joffrey)
- CSS-native animations gaining ground (Cyd)
