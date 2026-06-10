# AI Series: Interactive Course Design Guidelines

This document outlines the teaching philosophy, UI/UX architecture, layout constraints, interactive canvas standards, and mathematical presentation styles used across the **AI Series** courses. Follow these guidelines to ensure that new slides, chapters, or entire courses match the existing high-quality, intuition-first interactive experience.

---

## 1. The Core Philosophy: "Intuition First, Rigor Second"

Most technical education introduces a formal definition first, followed by mathematical proofs, and leaves the practical geometric intuition as an afterthought. **We do the exact opposite.**

```
   GEOMETRIC INTUITION        INTERACTIVE PLAYGROUND         MATHEMATICAL RIGOR
┌────────────────────────┐   ┌─────────────────────────┐   ┌───────────────────┐
│ How does it behave in  │ ─>│ User tweaks values,     │ ─>│ Connect visual    │
│ space? (stretch, warp) │   │ feels effect in real-time│   │ changes to KaTeX  │
└────────────────────────┘   └─────────────────────────┘   └───────────────────┘
```

### The Three-Step Lesson Flow
1. **Geometric/Visual Hook**: Show a visual system moving, warping, or transforming. Ask a qualitative question (e.g., *"What happens to the area when we shear the space?"*).
2. **Interactive Playground**: Let the user drag points, rotate vectors, or adjust sliders. They must *feel* the boundaries, singular points, and limits of the system.
3. **Mathematical Unification**: Translate the spatial intuition into algebraic symbols. Use KaTeX to display equations whose values react live to the interactive playground.

---

## 2. Layout Standards & Grid Configurations

Every scene uses a unified layout framework. We use a **65/35 Split** layout across the application.

```
┌───────────────────────────────────────┬──────────────────────────────┐
│                                       │                              │
│                                       │    Sidebar Column (35%)      │
│                                       ├──────────────────────────────┤
│                                       │                              │
│         Visual Canvas (65%)           │  - Title / Stage Subtitle    │
│         - Interactive SVG Grid        │  - Descriptive walkthrough   │
│         - Vector / Scatter Plots      │  - Custom Interactive Sliders│
│         - Animated Transforms         │  - Formulas (rendered in     │
│                                       │    KaTeXMath)                │
│                                       │  - Concept Presets           │
│                                       │                              │
└───────────────────────────────────────┴──────────────────────────────┘
```

### The Unified Layout Classes
Use the tailwind layout tokens defined in `src/components/layoutConfig.ts`:
* **Main Grid Container**: `grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start`
* **Graph Canvas Specifications**:
  * Default graph width: `480px`
  * Default graph height: `480px`
  * Default center/origin offset: `width / 2`
  * Default scale coefficient: `68` (pixels per coordinate unit)
  * Default grid coordinate range: `[-3, 3]`

---

## 3. Component Architecture & Reusability

Do not copy-paste SVG drawing logic, grids, or formulas. Use the core component library under `src/components/`:

### A. Grids and Canvas Viewports
* **`PlotCanvas.tsx`**: Used for 2D scatter plots, boundary lines, and custom coordinate points in data space.
* **`VectorCanvas.tsx`**: Used for standard linear algebra vector displays, dot product shadow projections, and angular relationships.
* **`TransformGrid.tsx`**: Used for custom transformations, matrix warps, eigenvalues, and eigenvector visualization. Always use the shared `<SvgGridLines />` sub-component and `<MARKER_DEFS />` instead of embedding local `<marker>` or grid lines.

### B. Marker Arrow Definitions
To maintain identical styling across the application, all arrow markers must use the central `g4-` markers defined in `TransformGrid.tsx`.
* **Available marker colors**: `g4-red`, `g4-blue`, `g4-green`, `g4-slate`, `g4-violet`, `g4-amber`, `g4-emerald`, `g4-rose`.
* **Usage in SVG elements**: `markerEnd="url(#g4-emerald)"`

---

## 4. State Preservation Across Slide Transitions

When navigating back and forth between slides, the user's interactive state (selected angles, matrix configurations, coordinates) must **never be lost**. 

### The `useSlideState` Hook
Always use the custom `useSlideState` hook (from `src/components/CourseStateContext.tsx`) instead of React's default `useState` for key interactive properties:

```tsx
import { useSlideState } from '../../components/CourseStateContext';

// Example: Preserving an angle slider
const [angle, setAngle] = useSlideState('ch5_pca_angle', 30);

// Example: Preserving a lazily-initialized dataset
const [pts] = useSlideState<Vec2[]>('ch5_pca_points', () => makeCloudPoints(60));
```

* **Rule**: Ensure the state key is completely unique across the application namespace (e.g., prefixing with chapter and concept: `ch3_dot_angle`).

---

## 5. Mathematical Presentation Style Guide

Mathematical expressions must feel premium, crisp, and uniform. 

### Rules for Math Presentation
1. **Never use monospace / plain-text code styles** for mathematical symbols or equations (e.g., do not write `v = A * x` or `[x1, x2]`).
2. **Use `<KaTeXMath />`** (from `src/components/Math.tsx`) for all equations, vectors, matrix elements, and mathematical definitions.
3. Align symbols clearly using LaTeX formatting.
   * *Vector representation*: `\vec{v} = \begin{bmatrix} x \\ y \end{bmatrix}`
   * *Dot product representation*: `\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos(\theta)`
   * *Matrix transformation*: `A\vec{x} = \lambda\vec{x}`

Example integration:
```tsx
import { KaTeXMath } from '../../components/Math';

// In sidebar or descriptions:
<KaTeXMath math="A = \begin{bmatrix} 1 & 2 \\ 0.5 & 1.5 \end{bmatrix}" block />
```

---

## 6. Visual Design & Premium Aesthetics

To make the course stand out visually:
* **Color Palette**: Use soft, modern pastel gradients or bright, curated accents (e.g., Emerald `#10B981` for principal directions, Slate `#64748B` for background references, Rose `#FB7185` for projections). Avoid primary, unadjusted CSS colors.
* **Glassmorphism**: Use translucent badges and control panels containing subtle borders: `bg-white/80 backdrop-blur-md border border-slate-200/50`.
* **Micro-Animations**: Add subtle transition effects on hover states or selection clicks to keep the viewport responsive and alive.
* **Input Elements**: Style range sliders with colored, linear gradient backgrounds indicating the selected percentage.
