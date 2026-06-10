# AI Intuition Curriculum: Design & UX Guidelines

This document outlines the visual, interaction, and technical standards established in Lecture 1 ("Everything Can Become a Point"). Refer to these rules when building subsequent lectures (e.g., Similarity, Dot Products, Embeddings, neural networks) to ensure a consistent, premium, and cohesive learner experience.

---

## 1. Core Learning Philosophy: "Active Discovery"

- **Distill.pub / 3Blue1Brown Style**: The learner should explore and discover ideas interactively. Do not present static diagrams or wall-to-wall text.
- **Micro-interactions**: Let learners drag points, adjust sliders, search coordinate spaces, or hover to reveal connections. Every abstract mathematical concept must be mapped to a direct visual reaction.

---

## 2. Typography & Layout Standards

- **Maximum Cleanliness & Whitespace**: Leave generous margins. Avoid cramped layouts.
- **Viewport Contained**: The lecture page must fit completely within a single browser viewport (`100vh` or `h-screen`).
  - Use `overflow-hidden` on the outer shell.
  - Use Flexbox with `min-h-0` and `overflow-hidden` on graphical stages to prevent scrollbars from breaking the presentation flow.
- **Text Rules (Strict Copywriting constraints)**:
  - **1-2 Sentences Max**: Keep descriptive paragraphs extremely concise (maximum of 2 punchy sentences per screen). Let the graphics do the teaching.
  - **Large Text Size**: Use highly legible fonts (`Outfit` or `Inter` for headings, `Fira Code` for vector/math readouts) with larger-than-default sizing (e.g., class `text-xl md:text-2xl` for paragraph body text).

---

## 3. Visual & Styling System (CSS)

- **Color Palette**:
  - **Background**: Premium, clean off-white `#F8FAFC` (`bg-slate-50`).
  - **Primary Text**: Sleek slate-dark `#0F172A` (`text-slate-900`).
  - **Muted Elements**: Warm/neutral slate `#64748B` (`text-slate-500`).
- **Interactive Dimension Colors**:
  - **Dimension X / Loss**: Crimson Red `#E11D48` (`text-rose-600`).
  - **Dimension Y / Vectors**: Ocean Blue `#0284C7` (`text-sky-600`).
  - **Dimension Z / Transformations**: Royal Violet `#7C3AED` (`text-violet-600`).
  - **Plotted Coordinates / Points**: Emerald Green `#059669` / `#10B981`.
- **Card Styling**:
  - Use soft glassmorphism overlays: `bg-white`, thin borders `border-slate-200`, rounded corners `rounded-2xl`, and soft shadows `shadow-md`.

---

## 4. Coordinate Spaces & Graph Engine Standards

- **Coordinate Visibility**:
  - Graphs must **always** have X and Y axes visible.
  - Ticks must be clearly labeled (e.g., `25`, `50`, `75`, `100`).
  - Ticks should clamp cleanly to boundaries if the active coordinate space has non-zero offsets.
- **Labels Over Hovers**:
  - Avoid requiring users to hover over points to see coordinates. Instead, display labels (like `[73, 28]`) **directly next to the point** or in a persistent coordinate readout bar.
- **Bidirectional Inputs**:
  - When controls are provided, allow the user to **both** drag the point on the coordinate grid directly and use range sliders.
- **3D Visualization Rules**:
  - **Isometric Perspective**: Use a projection matrix with rotation angles that the user can drag to rotate.
  - **3D Grid Lines**: Render grid meshes at 25-unit intervals on the floor (XZ), back wall (XY), and side wall (YZ) planes.
  - **Axis Indicators**: Include directional arrowheads (`markerEnd="url(#arrow-id)"`) at the ends of axes.
  - **3D Sphere illusion**: Use an SVG radial gradient on plotted points to give them a glowing 3D spherical look rather than a flat circle.

---

## 5. Technical Implementation & Architecture

- **Reusable Visual Components**:
  - Locate shared plotting engines in `src/components/` (e.g., `VisualizationSpace.tsx`, `PixelGrid.tsx`, and `GalaxyPlot.tsx`).
  - Put lecture-specific content in `src/scenes/` (e.g., `Scenes.tsx`).
- **Types & Math**:
  - Standardize point objects with the `VisualPoint` TypeScript interface.
  - Use `Math.tsx` (wrapping KaTeX) for rendering math equations cleanly.
  - Use static coordinates rather than animating layout positions with CSS/Framer Motion to avoid double-offset rendering errors in SVGs.
