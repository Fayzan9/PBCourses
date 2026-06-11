# Productive Bros — Interactive Learning Pathways

Welcome to **Productive Bros Interactive Learning Pathways**! This is a next-generation visual curriculum portal designed to build deep, intuitive developer understanding of programming languages, execution engines, and artificial intelligence mathematical concepts through real-time sandboxes and responsive animations.

---

## 🚀 Live Interactive Courses

### 1. AI & Neural Networks Intuition
A visual, math-first deep dive into how neural networks represent and reshape data in high-dimensional spaces:
- **Chapter 1: Everything Can Become a Point** (Vectors, language spaces, movie clustering)
- **Chapter 2: Measuring Proximity** (Euclidean distance, cosine similarity, magnitude traps)
- **Chapter 3: The Dot Product** (Vector alignment, shadows, coordinate shortcut formulas)
- **Chapter 4: Matrix Transformations** (Stretch, shear, rotate operations, non-linear activation bounds)
- **Chapter 5: Eigenvectors & Eigenvalues** (Characteristic equation solutions, PCA, symmetric matrices)
- **Chapter 6: Singular Value Decomposition** (Rotate → Stretch → Rotate mechanics, matrix compression)
*Features a built-in interactive sketch whiteboard overlay for all chapters.*

### 2. Python Programming Essentials
An interactive coding environment explaining:
- Core syntax structures
- Dynamic memory reference binding visualizer
- Run-code interpreter panels

### 3. Modern JavaScript Deep Dive
Under the hood of the browser's execution engine:
- **Event Loop Simulator**: Step-by-step trace of code running through the single-threaded **Call Stack**, **Web APIs**, and the async **Callback Queue**.
- **Lexical Closure Scope**: Visually mapping scope chains, closures, and reference scope bindings.

---

## 🛠️ Technology Stack
- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Math Formula Rendering**: [KaTeX](https://katex.org/)

---

## 📖 Course Design & Teaching Methodology

Our educational philosophy is fully documented in [COURSE_DESIGN_STANDARDS.md](file:///Users/faizanpopatiya/Desktop/AI%20Series/COURSE_DESIGN_STANDARDS.md). Every interactive module is built upon these core standards:
- **Intuition First. Mathematics Second. Formalism Last**: We never present mathematical formulas before the learner understands the problem the formula solves.
- **The Chain Principle**: Every chapter must emerge naturally to solve a limitation or question raised in the previous chapter.
- **The Compression Principle**: Lessons must reduce overall complexity, condensing many details into single, intuitive mental models.
- **Feynman Rule**: We assume high intelligence but zero prior background, using simple language without removing technical depth.

---

## 📂 Project Architecture

The project has been refactored for scale. All courses share a unified layout shell, and chapter scenes are configured locally inside modular exports to keep index entries lightweight and extensible:

```
src/
├── App.tsx                 # Root router directing Landing Page vs Courses
├── App.css
├── index.css               # Main styling system and theme color custom tokens
├── main.tsx
└── courses/                # Main courses directory
    ├── CourseViewer.tsx    # Consolidated layout shell (sidebar, navigation, gestures, whiteboard)
    ├── LandingPage.tsx     # Minimalist, premium dashboard course selection cards
    ├── ai/                 # AI Course module
    │   ├── components/     # AI course graphs and canvas charts
    │   ├── scenes/         # Scene slides separated by chapters
    │   │   ├── chapter_1/  
    │   │   │   ├── Scene01_Curiosity.tsx
    │   │   │   └── index.ts # Chapter 1 local configs (Title, Scenes list)
    │   │   └── ...
    │   └── index.ts        # AI configuration entry points
    ├── python/             # Python course module
    └── javascript/         # JavaScript course module
```

---

## 💻 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
Clone the repository and install dependencies:
```bash
npm install
```

### Dev Server
Launch the local dev server:
```bash
npm run dev
```

### Production Build
Test and compile the production bundle:
```bash
npm run build
```
