# Hero Animation Research
## Part 1: Background Effects | Part 2: Text Entrance Animations

---

# PART 1: HERO BACKGROUND ANALYSIS

## EXECUTIVE SUMMARY

The research reveals a critical insight: **the best design engineer portfolios in 2025-2026 do NOT use animated hero backgrounds.** Rauno Freiberg, Emil Kowalski, Brittany Chiang, and Paco Coursey all rely on typography, micro-interactions, and intentional whitespace (or dark-space). The 2026 consensus is that animated hero backgrounds are more associated with junior developer portfolios and template sites than with serious design engineering work.

That said, if you decide a subtle ambient effect adds value, the research identified a clear tier list of options ranked by uniqueness, performance, and "is it recognizable?" risk.

---

## SECTION 1: THE "NO BACKGROUND" ARGUMENT

### What Top Design Engineers Actually Do

**Rauno Freiberg (rauno.me)**
- Light mode by default, OS-metaphor design (dock, sounds)
- Hero is pure typography: "Make it fast. Make it beautiful. Make it consistent..."
- No animated background whatsoever
- Distinction comes from interaction design (dock animations, interface sounds, side-scrolling project feed)

**Brittany Chiang (brittanychiang.com)**
- Dark mode, single-page layout
- No animated background - uses a subtle mouse-following gradient spotlight effect (CSS only)
- Clean typography, generous whitespace
- Has become SO influential that hundreds of clones exist on GitHub

**Paco Coursey (paco.me)**
- Extreme minimalism, near-brutalist
- No animated background
- Pure typography and whitespace
- Awwwards recognized

**Emil Kowalski (emilkowal.ski)**
- Clean, component-focused
- Distinction through interactive demos and micro-interactions embedded in content
- No animated hero background

### 2026 Portfolio Design Trends

The dominant trends are:
1. **Kinetic typography** - animated text, not backgrounds
2. **Micro-interactions** - hover states, scroll triggers, cursor effects
3. **Generous negative space** - letting work breathe
4. **Gamified navigation** - playful UX details
5. **Variable fonts** - expressive type as the visual centerpiece

### Verdict

If you want to signal "design engineer" rather than "junior dev who installed a template," the strongest move is NO animated hero background. Instead, invest in:
- Exceptional typography and text animations
- A cursor-following subtle gradient (like Brittany Chiang's spotlight)
- Scroll-triggered micro-interactions
- Interactive project showcases

**However**, if you are determined to have an ambient background effect, the options below are ranked by how likely they are to look unique vs. template-like.

---

## SECTION 2: THE RECOGNIZABILITY TEST

### AVOID - Instantly Recognizable as Template

| Library | Why It's Burned |
|---------|----------------|
| **Vanta.js** | The #1 "portfolio template" library. Every hiring manager has seen the birds, waves, and net effects hundreds of times. |
| **particles.js / tsParticles** | tsParticles has an official "templates" repo with portfolio layouts. Massive tutorial ecosystem. The connected-dots-on-dark-background look screams "2018 portfolio template." |
| **Aceternity UI Aurora** | Rapidly becoming the new Vanta. Copy-paste components = every Next.js portfolio looks the same. Already appearing on hundreds of sites. |
| **Aceternity UI Background Beams** | Same problem. Beautiful, but commoditized. |

### CAUTION - Growing Recognition

| Library | Risk Level |
|---------|-----------|
| **ShaderGradient** | ~3,255 weekly npm downloads. Gaining Framer/Figma adoption. The "morphing gradient sphere" look is becoming recognizable. However, the parameter space is large enough that heavily customized outputs can still look unique. |
| **Spline 3D exports** | Spline is mainstream now (Canva-adjacent tooling). The "floating 3D shape" look is becoming a trope. Can still produce unique results but requires significant design skill. |
| **Lottie/Rive hero animations** | Rive is excellent but more suited for UI animations than ambient backgrounds. A Rive background would look unusual (good), but could also look out-of-place. |

### SAFE - Low Recognition Risk

These are options where the output is inherently unique because you are building the visual, not selecting a preset.

---

## SECTION 3: VIABLE OPTIONS RANKED

### TIER 1: Best Uniqueness-to-Effort Ratio

#### 1. Paper Shaders (@paper-design/shaders)
- **URL**: https://shaders.paper.design/
- **GitHub**: https://github.com/paper-design/shaders (1.9k stars)
- **npm**: `@paper-design/shaders-react`
- **Bundle**: ~383 KB (React), zero dependencies
- **Recognition risk**: LOW - relatively new library, not yet in the portfolio template ecosystem
- **Best effects for dark hero**: Mesh Gradient, Neuro Noise, Perlin Noise, God Rays, Waves, Smoke Ring
- **Customizability**: High - each shader has multiple tunable parameters
- **Visual editor**: Yes, design in Paper app and export code
- **React support**: Native React components
- **Mobile**: GPU-accelerated canvas, degrades on low-end devices
- **Verdict**: STRONG OPTION. New enough to not be recognized, visual editor means fast iteration, zero dependencies is clean. The 383KB bundle is significant but manageable with lazy loading.

#### 2. Custom GLSL Shader via React Three Fiber
- **Tutorial**: https://tympanus.net/codrops/2024/10/31/how-to-code-a-subtle-shader-background-effect-with-react-three-fiber/
- **Bundle**: R3F (~150KB) + Three.js (~600KB) + Drei
- **Recognition risk**: VERY LOW - output is your own shader, impossible to template-match
- **Customizability**: Infinite - you write the shader
- **Difficulty**: HIGH - requires understanding GLSL, SDFs, noise functions
- **Best approach**: Start from a Shadertoy effect, port to R3F using Maxime Heckel's guide
- **Resources**:
  - Maxime Heckel's shader guide: https://blog.maximeheckel.com/posts/the-study-of-shaders-with-react-three-fiber/
  - Shadertoy aurora: https://www.shadertoy.com/view/XtGGRt
  - Book of Shaders noise chapter: https://thebookofshaders.com/11/
  - Porting Shadertoy to R3F: https://medium.com/@m.mhde96/implementing-a-shadertoy-in-react-three-fiber-eee4541a15b2
- **Verdict**: Maximum uniqueness, maximum effort. The Three.js bundle cost is steep for just a background effect. Only worth it if you plan to use R3F elsewhere in the portfolio.

#### 3. OGL (Minimal WebGL)
- **URL**: https://oframe.github.io/ogl/
- **GitHub**: https://github.com/oframe/ogl
- **Bundle**: 24KB minzipped (Core 8KB, Math 6KB, Extras 10KB)
- **Recognition risk**: VERY LOW - obscure, no template ecosystem
- **Customizability**: Very high - thin abstraction over raw WebGL
- **Difficulty**: HIGH - closer to raw WebGL than Three.js
- **Best for**: If you want a lightweight custom shader background without the Three.js tax
- **Verdict**: EXCELLENT if you are comfortable writing shaders. The 24KB bundle is the smallest option by far. No portfolio templates use this. The output will be 100% unique.

### TIER 2: Good Options with Caveats

#### 4. WebGL Fluid Simulation (Enhanced)
- **GitHub**: https://github.com/michaelbrusegard/WebGL-Fluid-Enhanced
- **Demo**: https://paveldogreat.github.io/WebGL-Fluid-Simulation/
- **Bundle**: Small (vanilla WebGL, no framework dependency)
- **Recognition risk**: MEDIUM - the fluid sim itself is well-known, but as a subtle background (not interactive) it looks different
- **Customizability**: Color palette, resolution, dissipation rates, transparency
- **Mobile**: Works on mobile with reduced settings
- **Key trick**: Set TRANSPARENT: true, reduce intensity dramatically, use as ambient movement behind content
- **Background-optimized fork**: https://github.com/tkabalin/WebGL-Fluid-Background
- **Verdict**: GOOD if used subtly. The "full-screen interactive fluid" is recognizable, but a muted, non-interactive version as a background layer is less so.

#### 5. Pts.js
- **URL**: https://ptsjs.org/
- **GitHub**: https://github.com/williamngan/pts
- **Bundle**: ~30KB gzipped
- **Recognition risk**: VERY LOW - creative coding library, almost never seen in portfolios
- **React component**: https://github.com/williamngan/react-pts-canvas
- **Best for**: Generative art backgrounds, flow fields, particle systems with physics
- **Difficulty**: MEDIUM - API is well-documented and intuitive
- **Verdict**: UNDERRATED. Lightweight, has a React component, extremely low recognition risk. Can create organic, flowing animations that look nothing like template effects.

#### 6. Curtains.js
- **URL**: https://www.curtainsjs.com/
- **GitHub**: https://github.com/martinlaxenaire/curtainsjs
- **Bundle**: 122KB minified
- **Recognition risk**: LOW - known in creative dev circles but not in portfolio templates
- **React package**: react-curtains
- **Best for**: Applying shader effects to DOM elements (distortion, ripple effects on images/text)
- **Note**: Better for image/text effects than ambient backgrounds. Could create a unique hero by applying shaders to your typography.
- **Verdict**: NICHE USE CASE. Not a background generator, but could create stunning text distortion effects.

### TIER 3: Interesting but Heavy or Complex

#### 7. Spline (spline.design)
- **URL**: https://spline.design/
- **Performance**: Requires careful optimization (limit 3 lights, lazy-load viewer)
- **Bundle**: Heavy - loads entire 3D engine via iframe/web component
- **Recognition risk**: GROWING - "Spline hero" is becoming a category
- **LCP impact**: Can cause 4+ second LCP if not optimized
- **Verdict**: SKIP for a portfolio. Too heavy, increasingly recognizable, performance risk on mobile.

#### 8. ShaderGradient
- **URL**: https://shadergradient.co/customize
- **npm**: `@shadergradient/react`
- **Bundle**: 384KB (depends on Three.js/R3F internally)
- **Recognition risk**: MEDIUM-HIGH and growing
- **Visual customizer**: Excellent - real-time parameter tuning
- **Verdict**: RISKY. The library is gaining fast adoption through Framer. Within a year, the "morphing gradient blob" look will be as recognizable as Vanta. Only use if you push parameters far from defaults.

#### 9. p5.js
- **URL**: https://p5js.org/
- **Bundle**: ~800KB unminified
- **Recognition risk**: LOW (for backgrounds - it is associated with creative coding, not portfolios)
- **Verdict**: TOO HEAVY for a background effect. The 800KB payload is unacceptable for a single visual element. Use Pts.js instead for the same creative coding capability at 30KB.

#### 10. Cavalry
- **URL**: https://cavalry.scenegroup.co/
- **Web export**: Lottie/SVG only
- **Status**: Acquired by Canva in 2026
- **Verdict**: Excellent motion design tool but exports to Lottie format only. Not suitable for real-time ambient WebGL backgrounds.

---

## SECTION 4: CSS/SVG-ONLY OPTIONS (Zero JS Bundle Cost)

These have ZERO performance/bundle impact and can be surprisingly effective:

#### CSS Aurora Effect
- **Tutorial**: https://daltonwalsh.com/blog/aurora-css-background-effect/
- **CodePen (all CSS)**: https://codepen.io/osfa/pen/ZEYbRBr
- **Library**: https://github.com/LunarLogic/auroral
- **Performance**: 60fps, zero JS
- **Verdict**: EXCELLENT lightweight option. Pure CSS animated gradients with blur filters. Subtle, organic, zero bundle cost.

#### CSS Morphing Blob Gradients
- **CodePen (gradient blob)**: https://codepen.io/georgedoescode/pen/oNzamjV
- **CodePen (mesh gradient effect)**: https://codepen.io/_araz_/pen/MWmxBqY
- **CodePen (pure CSS blob)**: https://codepen.io/tmpeixoto/pen/zYKbMNW
- **CodePen (morphing gradients background)**: https://codepen.io/juri911/pen/dyLyyQw
- **Performance**: Varies, CSS animations are GPU-composited
- **Verdict**: GOOD for subtle ambient movement. Combine blurred color blobs with mix-blend-mode for organic depth.

#### Mouse-Following Gradient (Brittany Chiang Style)
- **Technique**: CSS radial-gradient that follows cursor position via minimal JS
- **Bundle**: <1KB of JS
- **Performance**: Excellent
- **Verdict**: PROVEN. The most admired design engineer portfolio uses this exact technique. Subtle, performant, impossible to call "template."

---

## SECTION 5: CODEPEN & COMMUNITY RESOURCES

### Flow Fields & Organic Particles
- Simplex Noise Flow Field: https://codepen.io/DonKarlssonSan/post/particles-in-simplex-noise-flow-field
- Animated Perlin Noise: https://codepen.io/Chmood/pen/XdwXGv
- Canvas Particle Mouse Trail: https://codepen.io/L2L2L/details/xzMXqG

### Fluid Simulations
- WebGL Fluid (original): https://codepen.io/PavelDoGreat/pen/zdWzEL
- WebGL Fluid Animation: https://codepen.io/RunicFreak/pen/abKPYJa

### Aurora / Northern Lights
- CSS Aurora: https://codepen.io/osfa/pen/ZEYbRBr
- Canvas Northern Lights: https://codepen.io/jhereg00/pen/JKbQyR
- HTML/CSS Aurora Borealis: https://codepen.io/vynquwkk/pen/wvoRJMB

### Morphing Blobs
- 60-degree Gradient Blob: https://codepen.io/georgedoescode/pen/oNzamjV
- Animated Mesh Gradient: https://codepen.io/_araz_/pen/MWmxBqY
- Morphing Gradients Background: https://codepen.io/juri911/pen/dyLyyQw

### Shader References
- Shadertoy Aurora: https://www.shadertoy.com/view/XtGGRt
- Shadertoy Lava/Noise: https://www.shadertoy.com/view/lslXRS
- Book of Shaders (Noise): https://thebookofshaders.com/11/
- WebGL Noise Library: https://github.com/ashima/webgl-noise
- Codrops R3F Shader Background: https://tympanus.net/codrops/2024/10/31/how-to-code-a-subtle-shader-background-effect-with-react-three-fiber/

---

## SECTION 6: PERFORMANCE COMPARISON

| Option | Bundle Size | GPU Load | Mobile | Battery | Load Impact |
|--------|-------------|----------|--------|---------|-------------|
| CSS Aurora/Gradient | 0 KB JS | Minimal | Excellent | Low | None |
| Mouse-follow gradient | <1 KB | Minimal | Excellent | Low | None |
| Pts.js | ~30 KB gz | Low-Med | Good | Low-Med | Minimal |
| OGL custom shader | ~24 KB gz | Medium | Good | Medium | Minimal |
| Paper Shaders | ~383 KB | Medium | Good | Medium | Moderate |
| Curtains.js | ~122 KB | Medium | Good | Medium | Low |
| WebGL Fluid | ~20 KB | Med-High | Fair | Medium | Low |
| ShaderGradient | ~384 KB | Medium | Fair | Medium | Moderate |
| React Three Fiber | ~600+ KB | Medium | Fair | Medium | Significant |
| Spline | 1+ MB | High | Poor | High | Heavy |
| p5.js | ~800 KB | Med-High | Fair | Medium | Heavy |

---

## SECTION 7: BACKGROUND RECOMMENDATIONS

### If You Want Maximum Impact with Minimum Risk

**Option A: No animated background (RECOMMENDED)**
- Use kinetic typography for the hero text
- Add a mouse-following radial gradient (CSS + minimal JS)
- Invest effort into scroll-triggered micro-interactions and project showcases
- This is what the best design engineers do. It signals confidence and taste.

### If You Want a Subtle Ambient Effect

**Option B: Paper Shaders - Neuro Noise or Perlin Noise**
- New enough to not be recognized
- Visual editor for fast iteration
- React components ready to use
- Use at very low opacity (10-20%) behind content
- Lazy-load to avoid LCP impact

**Option C: CSS-Only Aurora/Gradient**
- Zero bundle cost
- Impossible to detect as a library
- Layer multiple animated gradients with blur
- Combine with a noise texture overlay for depth

### If You Want a Technical Showpiece

**Option D: OGL Custom Shader**
- Write a custom noise/flow shader in 24KB
- Completely unique, impossible to template-match
- Demonstrates shader programming skill (relevant for design engineering)
- Requires GLSL knowledge

### My Actual Recommendation

Go with **Option A** (no background) combined with elements of **Option C** (CSS gradients at very low opacity). The strongest signal you can send as a design engineer is that you understand restraint. Every junior developer reaches for Vanta.js or particles.js. The senior move is typography, spacing, and interaction design.

If you add any ambient effect, make it so subtle that removing it would barely be noticed. It should add atmosphere, not decoration.

---
---

# PART 2: HERO TEXT ENTRANCE ANIMATIONS (Framer Motion)

**Project context:** framer-motion ^12.18.1, React, Next.js ("use client"), Tailwind CSS
**Current hero:** `app/sections/Hero.jsx` with basic stagger (opacity + y:20, 0.1s stagger)
**Current text component:** `app/components/AnimatedText.jsx` (hover effects only, no entrance animation)

---

## SECTION 8: CHARACTER-BY-CHARACTER REVEAL WITH OVERFLOW MASK

This is the premium pattern. Each character slides up from behind an `overflow: hidden` parent, creating the illusion of text emerging from behind a physical edge. No clip-path needed -- the simpler overflow-hidden technique is more performant and handles responsive reflow naturally.

### How it works

Each character is wrapped in a `motion.span` with `display: inline-block`. That span lives inside a parent `span` with `overflow: hidden`. The character animates from `y: "100%"` (fully hidden below the mask) to `y: "0%"` (visible). Because the parent clips overflow, the character appears to slide up from behind a ledge.

### Complete implementation

```jsx
"use client";

import { motion } from "framer-motion";

// Split text into words, then characters, preserving word spacing
const SplitText = ({ children, className, ...props }) => {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  return (
    <motion.span className={className} variants={charContainerVariants} aria-label={text} {...props}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {word.split("").map((char, charIndex) => (
              <span
                key={charIndex}
                style={{
                  display: "inline-block",
                  overflow: "hidden",   // THE MASK
                  verticalAlign: "top",
                }}
              >
                <motion.span
                  style={{ display: "inline-block", willChange: "transform" }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              </span>
            ))}
            {wordIndex < words.length - 1 && (
              <span style={{ display: "inline-block" }}>{"\u00A0"}</span>
            )}
          </span>
        ))}
      </span>
    </motion.span>
  );
};
```

### Recommended variants and timing

```jsx
const charContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const charVariants = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: "0%",
    transition: {
      duration: 0.5,
      ease: [0.33, 1, 0.68, 1],  // easeOutCubic -- fast start, gentle land
    },
  },
};
```

### Key timing values

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| `staggerChildren` on parent | `0.02` - `0.035` | 0.02s for long text (14+ chars), 0.035s for short text (5-8 chars). Too fast looks glitchy; too slow feels sluggish. |
| `duration` per character | `0.5` - `0.6s` | Characters overlap their animations due to stagger. Each needs enough duration to feel smooth. |
| Easing | `[0.33, 1, 0.68, 1]` | This is an easeOutCubic. The character shoots up fast then decelerates. Feels physical, like text has weight. |
| Alternative easing | `[0.22, 1, 0.36, 1]` | Even more aggressive deceleration (easeOutQuint). More dramatic. |

### Why NOT clip-path for this

`clip-path: inset()` can achieve the same visual, but:
- `overflow: hidden` is cheaper (no paint, just clipping)
- `clip-path` animating via Framer Motion triggers paint on every frame
- The overflow-hidden approach handles responsive reflow automatically -- if the text wraps, each word wraps naturally because words are `inline-block`

### Responsive text reflow

The key insight: wrap by WORD, not by character. Each word is an `inline-block` container. Inside each word, characters are `inline-block`. The browser wraps at word boundaries naturally. This means the animation works at any screen size without JS layout calculations.

---

## SECTION 9: LINE-BY-LINE REVEAL

Each hero element (eyebrow, h1, subtitle, buttons) slides up sequentially. This is the simpler variant that works well when combined with character reveal on the h1 only.

### Implementation with variants

```jsx
const lineRevealContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,     // 150ms between each line
      delayChildren: 0.1,        // slight pause before sequence starts
    },
  },
};

const lineRevealItem = {
  hidden: {
    y: 30,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],  // easeOutCubic
    },
  },
};
```

### With overflow-hidden mask (more premium)

For the masked variant where text slides up from behind an edge (no opacity fade):

```jsx
const maskRevealVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

// Each line wrapped in overflow-hidden div
<div style={{ overflow: "hidden" }}>
  <motion.div variants={maskRevealVariants}>
    <p>Your subtitle text here</p>
  </motion.div>
</div>
```

### Timing table

| Element | Stagger offset from start |
|---------|--------------------------|
| Eyebrow ("Brandon Church") | 0.0s |
| H1 ("Design Engineer") | 0.15s |
| Subtitle | 0.30s |
| Buttons | 0.45s |
| Social links | 0.60s |

Total sequence: approximately 0.6s of stagger + 0.75s final animation = **~1.35s** from first movement to everything settled.

---

## SECTION 10: FULL ENTRANCE CHOREOGRAPHY

The optimal sequence for a cinematic hero entrance, combining both patterns:

### Timeline

```
T+0.0s   Page loads. Everything invisible.
T+0.1s   Background radial glow fades in (opacity 0 -> 1, duration 1.2s, ease: easeOut)
T+0.3s   Eyebrow "BRANDON CHURCH" slides up from mask (y:100% -> 0%, duration 0.6s)
T+0.5s   H1 "Design Engineer" characters begin staggering in
         - Each char: y:100% -> 0%, duration 0.5s
         - Stagger: 0.03s between chars (14 chars = 0.42s total stagger)
         - Last char settles at ~T+1.4s
T+1.0s   Subtitle fades up (y:20 -> 0, opacity 0->1, duration 0.7s)
T+1.2s   CTA buttons slide up (y:20 -> 0, opacity 0->1, duration 0.6s, stagger 0.1s between them)
T+1.4s   Social links appear (opacity 0->1, duration 0.4s)
T+1.8s   Everything settled. Total entrance: ~1.8 seconds.
```

### Implementation as a single orchestrated container

```jsx
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const eyebrowVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

const charContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,  // character stagger within h1
    },
  },
};

const charVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
  },
};

const fadeUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
};
```

### Nested variant propagation in JSX

Framer Motion propagates variant labels down the tree automatically. The parent `motion.div` with `animate="visible"` triggers all children's `visible` variants. For nested stagger (container staggers lines, h1 staggers characters), you nest `motion` containers:

```jsx
<motion.div variants={heroContainerVariants} initial="hidden" animate="visible">
  {/* Eyebrow */}
  <div style={{ overflow: "hidden" }}>
    <motion.p variants={eyebrowVariants}>BRANDON CHURCH</motion.p>
  </div>

  {/* H1 with character stagger */}
  <motion.h1 variants={charContainerVariants}>
    <SplitText>Design Engineer</SplitText>
  </motion.h1>

  {/* Subtitle */}
  <motion.p variants={fadeUpVariants}>
    Your subtitle here
  </motion.p>

  {/* Buttons */}
  <motion.div variants={fadeUpVariants}>
    <Button>View My Work</Button>
    <Button>Download Resume</Button>
  </motion.div>
</motion.div>
```

**Important:** The `staggerChildren` on `heroContainerVariants` controls the delay between top-level children (eyebrow, h1, subtitle, buttons). The `staggerChildren` on `charContainerVariants` controls the delay between characters within the h1. These are independent timing layers.

---

## SECTION 11: COMPLETE CODE-READY COMPONENT STRUCTURE

### Easing curves

```jsx
const EASE_OUT_CUBIC = [0.33, 1, 0.68, 1];    // Standard premium deceleration
const EASE_OUT_QUINT = [0.22, 1, 0.36, 1];    // More dramatic snap-then-float
const EASE_OUT_EXPO  = [0.16, 1, 0.3, 1];     // Maximum drama, almost instant start
const APPLE_EASE     = [0.25, 0.1, 0.25, 1];  // Smooth and balanced, Apple's default
```

### All variants in one block

```jsx
// ---- HERO CONTAINER ----
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,     // wait for page paint
    },
  },
};

// ---- MASK REVEAL (eyebrow, single lines) ----
const maskRevealVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.6,
      ease: EASE_OUT_CUBIC,
    },
  },
};

// ---- CHARACTER CONTAINER (h1 wrapper) ----
const charContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

// ---- CHARACTER (individual letter) ----
const charVariants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: {
      duration: 0.5,
      ease: EASE_OUT_CUBIC,
    },
  },
};

// ---- FADE UP (subtitle, buttons, social) ----
const fadeUpVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: EASE_OUT_CUBIC,
    },
  },
};

// ---- BLUR FADE (alternative for subtitle) ----
const blurFadeVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: EASE_OUT_CUBIC,
    },
  },
};
```

### SplitText component

```jsx
const SplitText = ({ children, className }) => {
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  return (
    <motion.span
      className={className}
      variants={charContainerVariants}
      aria-label={text}
    >
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <span
            key={wi}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {word.split("").map((char, ci) => (
              <span
                key={ci}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  verticalAlign: "top",
                }}
              >
                <motion.span
                  style={{
                    display: "inline-block",
                    willChange: "transform",
                  }}
                  variants={charVariants}
                >
                  {char}
                </motion.span>
              </span>
            ))}
            {wi < words.length - 1 && (
              <span style={{ display: "inline-block" }}>{"\u00A0"}</span>
            )}
          </span>
        ))}
      </span>
    </motion.span>
  );
};
```

### MaskedLine component

```jsx
const MaskedLine = ({ children, className }) => (
  <div style={{ overflow: "hidden" }}>
    <motion.div variants={maskRevealVariants} className={className}>
      {children}
    </motion.div>
  </div>
);
```

### Performance notes

- **Do NOT use the `layout` prop** on characters. Layout animations measure DOM positions and are expensive with 14+ elements.
- **`willChange: "transform"`** on each character span tells the browser to promote it to its own compositor layer. With 14 characters, that is 14 layers -- acceptable but do not add more properties.
- **Do NOT animate `filter` on individual characters.** Blur on 14+ elements simultaneously will drop frames. Use blur only on whole lines/blocks (1-2 elements).
- `transform` and `opacity` are S-tier for performance (compositor thread, per Motion's own tier list). `filter: blur` is also S-tier but cost scales with blur radius and element size. Keep blur radius at 10px or below.

---

## SECTION 12: BLUR-TO-SHARP ENTRANCE

### The pattern

Text starts blurred and translucent, then sharpens into focus while sliding up. Mimics a camera rack focus. Apple uses this extensively on marketing pages.

### Implementation (word-by-word blur reveal)

```jsx
const blurRevealContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,    // 40ms between words
    },
  },
};

const blurRevealWord = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
    y: "20%",                   // percentage-based for responsive
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],  // CSS ease equivalent (Apple ease)
    },
  },
};

// Usage: split into words, animate each word
const BlurRevealText = ({ children, className }) => {
  const words = children.split(" ");
  return (
    <motion.span variants={blurRevealContainer} className={className}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <motion.span
            variants={blurRevealWord}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
};
```

### Performance analysis

| Property | Performance tier | Notes |
|----------|-----------------|-------|
| `transform: translateY` | S-tier (compositor) | Essentially free |
| `opacity` | S-tier (compositor) | Essentially free |
| `filter: blur(10px)` | S-tier (compositor) | Hardware accelerated BUT cost scales with blur radius and element size |

**Verdict:** Performant at the WORD level (5-10 elements). Do NOT do blur on individual characters (14+ simultaneous blur animations will cause jank on mobile). For the h1 at 5.5rem, word-level blur works well because large serif characters look dramatic as they resolve from blur.

### Does it work with serif fonts at large sizes?

Yes, exceptionally well. Large serif fonts (like Cormorant Garamond at 5.5rem) have fine details (thin strokes, serifs) that become visible as the blur clears, creating a satisfying "resolving" effect. Sans-serif fonts at large sizes look good too but the effect is less dramatic because there is less fine detail to reveal.

---

## SECTION 13: MOUSE-FOLLOWING GRADIENT

### Implementation (Brittany Chiang / BuildUI pattern)

```jsx
"use client";

import { useMotionValue, useMotionTemplate, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const MouseGradient = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  // Disable on touch devices
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsCoarsePointer(mq.matches);
    const handler = (e) => setIsCoarsePointer(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${mouseX}px ${mouseY}px,
      rgba(255, 63, 129, 0.08),
      transparent 80%
    )
  `;

  if (isCoarsePointer) {
    return <div>{children}</div>;
  }

  return (
    <div onMouseMove={handleMouseMove} className="relative">
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MouseGradient;
```

### Why useMotionValue instead of useState

`useMotionValue` updates the DOM directly via the style attribute without triggering React re-renders. On mousemove (fires 60+ times/second), `useState` would cause 60 re-renders per second. `useMotionValue` causes zero re-renders.

### Why useMotionTemplate

It lets you compose a CSS string that includes motion values. When the motion values change, only the style attribute updates -- no React reconciliation.

### Gradient sizing and opacity for dark backgrounds

- Circle radius: `600px` for full-page effect, `350px` for card-level effect
- Opacity: `0.06` - `0.10` for subtle, `0.12` - `0.18` for more visible
- Your accent color `#ff3f81` at `rgba(255, 63, 129, 0.08)` will give a soft pink glow on your dark `#23153c` background
- The `transparent 80%` creates a soft falloff; use `transparent 60%` for a tighter spotlight

### Disabling on mobile

The `pointer: coarse` media query detects touch-primary devices. The effect is pointless on mobile (no hover cursor) and the mousemove listener wastes resources. The component renders children without the gradient layer on touch devices.

### Performance

- Zero React re-renders (motion values bypass React)
- Single CSS `radial-gradient` on a fixed-position div -- compositor friendly
- `pointer-events: none` on the gradient div so it does not interfere with clicks
- Total cost: one mousemove listener + one style attribute update per frame

### Brittany Chiang's specific approach

Her portfolio uses the gradient on the entire page, not per-card. The gradient div is `position: fixed; inset: 0` and sits behind all content. She uses a blue-tinted gradient (`rgba(29, 78, 216, 0.15)`) at about 600px radius. For this portfolio, swap the color to the accent pink.

---

## SECTION 14: RECOMMENDED HYBRID APPROACH

Given the hero structure (eyebrow, h1, subtitle, CTAs, social links), the recommended combination:

### Pattern selection per element

| Element | Animation pattern | Rationale |
|---------|------------------|-----------|
| Background glow | Simple opacity fade (0 -> 1, 1.2s) | Sets the stage, should not distract |
| Eyebrow "BRANDON CHURCH" | Mask reveal (overflow-hidden + y:100% -> 0%) | Premium feel for small text, fast |
| H1 "Design Engineer" | Character-by-character mask reveal | The hero moment -- this is what people remember |
| Subtitle | Blur-to-sharp fade up (single element, not word-split) | Complements the h1 without competing |
| CTA buttons | Simple fade up (opacity + y:20) | Functional elements should not be theatrical |
| Social links | Simple fade up with slight stagger | Minor element, minimal animation |

### Easing curves cheat sheet

| Name | Value | Feel |
|------|-------|------|
| easeOutCubic | `[0.33, 1, 0.68, 1]` | Standard premium deceleration |
| easeOutQuint | `[0.22, 1, 0.36, 1]` | More dramatic snap-then-float |
| easeOutExpo | `[0.16, 1, 0.3, 1]` | Maximum drama, almost instant start |
| Apple ease | `[0.25, 0.1, 0.25, 1]` | Smooth and balanced, Apple's default |

### What to avoid

- Do not animate every element with character split -- only the h1. Everything else should be simpler.
- Do not use spring physics for entrance animations. Springs oscillate and create a bouncy feel that undermines the cinematic tone. Use cubic-bezier easing.
- Do not exceed 2 seconds total for the hero entrance. Users should be able to read and interact within 2 seconds of page load.
- Do not combine character reveal AND blur on the h1. Pick one. Character mask reveal is more premium. Blur works better on subtitle/body text.

---

## SECTION 15: MOTION splitText (Motion+ API) -- FOR REFERENCE ONLY

Motion (formerly Framer Motion) now ships a `splitText` utility in their paid `motion-plus` package (0.7kb). It handles character/word/line splitting natively:

```jsx
import { splitText } from "motion-plus";
import { animate, stagger } from "motion";

const { chars } = splitText("h1");
animate(chars, { opacity: [0, 1], y: [10, 0] }, { delay: stagger(0.05) });
```

This is the imperative API (not React declarative). For a React portfolio using the declarative `<motion.div>` pattern, the manual split approach in Section 11 is the correct pattern. The `motion-plus` utility requires a Motion+ subscription and uses the imperative `animate()` function rather than React components.

---

## SOURCES

### Part 1 (Background)
- Rauno Freiberg: https://rauno.me/
- Brittany Chiang: https://brittanychiang.com/
- Paper Shaders: https://shaders.paper.design/
- OGL: https://oframe.github.io/ogl/
- Pts.js: https://ptsjs.org/
- WebGL Fluid Enhanced: https://github.com/michaelbrusegard/WebGL-Fluid-Enhanced
- CSS Aurora tutorial: https://daltonwalsh.com/blog/aurora-css-background-effect/

### Part 2 (Text Entrance)
- Motion official docs -- splitText API: https://motion.dev/docs/split-text
- Motion performance tier list: https://motion.dev/magazine/web-animation-performance-tier-list
- Olivier Larose text mask tutorial: https://blog.olivierlarose.com/tutorials/text-mask-animation
- BuildUI spotlight recipe: https://buildui.com/recipes/spotlight
- Cruip blur reveal implementation: https://cruip.com/blur-reveal-effect-with-framer-motion-and-tailwind-css/
- Frontend.fyi staggered text tutorial: https://www.frontend.fyi/tutorials/staggered-text-animations-with-framer-motion
- Clip-path + Framer Motion: https://medium.com/@jurouhlar/simple-text-reveal-css-effect-using-clip-path-and-framer-motion-4d0866b1d949
- OG Blocks 7 text effects: https://ogblocks.dev/blog/framer-motion-text-animation
- Motion easing docs: https://motion.dev/docs/easing-functions
- Motion stagger docs: https://www.framer.com/motion/stagger/
