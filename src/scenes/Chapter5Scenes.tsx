import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../components/Math';

// ═══════════════════════════════════════════════════════════════
// Types & Math Helpers
// ═══════════════════════════════════════════════════════════════

type Vec2 = [number, number];
type Mat2 = [[number, number], [number, number]];

const mulMV = (M: Mat2, v: Vec2): Vec2 => [
  M[0][0] * v[0] + M[0][1] * v[1],
  M[1][0] * v[0] + M[1][1] * v[1],
];

const mag = (v: Vec2): number => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const norm = (v: Vec2): Vec2 => { const m = mag(v); return m === 0 ? [0, 0] : [v[0] / m, v[1] / m]; };

const det = (M: Mat2): number => M[0][0] * M[1][1] - M[0][1] * M[1][0];
const trace = (M: Mat2): number => M[0][0] + M[1][1];

/** Real eigenvalues of a 2x2 matrix, or null if complex */
function eigenvalues(M: Mat2): [number, number] | null {
  const tr = trace(M);
  const d = det(M);
  const disc = tr * tr - 4 * d;
  if (disc < 0) return null;
  const sq = Math.sqrt(disc);
  return [(tr + sq) / 2, (tr - sq) / 2];
}

/** Eigenvector for eigenvalue λ, normalized */
function eigenvector(M: Mat2, λ: number): Vec2 {
  // (M - λI)v = 0
  const a = M[0][0] - λ, b = M[0][1];
  const c = M[1][0], d = M[1][1] - λ;
  // Pick the row with larger magnitude
  if (Math.abs(a) + Math.abs(b) >= Math.abs(c) + Math.abs(d)) {
    if (Math.abs(a) > 1e-8) return norm([-b / a, 1]);
    return norm([1, 0]);
  } else {
    if (Math.abs(c) > 1e-8) return norm([-d / c, 1]);
    return norm([0, 1]);
  }
}

const lerpMat = (A: Mat2, B: Mat2, t: number): Mat2 => [
  [A[0][0] + (B[0][0] - A[0][0]) * t, A[0][1] + (B[0][1] - A[0][1]) * t],
  [A[1][0] + (B[1][0] - A[1][0]) * t, A[1][1] + (B[1][1] - A[1][1]) * t],
];
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function useAnimatedMatrix(target: Mat2, duration = 650): Mat2 {
  const [mat, setMat] = useState<Mat2>(target);
  const anim = useRef<{ from: Mat2; to: Mat2; t0: number | null; raf: number | null }>({
    from: target, to: target, t0: null, raf: null,
  });
  useEffect(() => {
    const s = anim.current;
    if (s.raf) cancelAnimationFrame(s.raf);
    s.from = mat;
    s.to = target;
    s.t0 = null;
    const tick = () => {
      const now = performance.now();
      if (!s.t0) s.t0 = now;
      const raw = Math.min((now - s.t0) / duration, 1);
      setMat(lerpMat(s.from, s.to, easeOutCubic(raw)));
      if (raw < 1) s.raf = requestAnimationFrame(tick);
    };
    s.raf = requestAnimationFrame(tick);
    return () => { if (s.raf) cancelAnimationFrame(s.raf); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target[0][0], target[0][1], target[1][0], target[1][1]]);
  return mat;
}

function fmt(n: number): string {
  return String(parseFloat(n.toFixed(2)));
}

// ═══════════════════════════════════════════════════════════════
// Shared Layout Components
// ═══════════════════════════════════════════════════════════════

const SlideLayout: React.FC<{
  title: string;
  text: string;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, text, sidebarContent, children }) => (
  <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
    <div className="flex-1 min-h-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
      {children}
    </div>
    <div className="w-full lg:w-[35%] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-lg leading-relaxed">{text}</p>
      </div>
      {sidebarContent}
    </div>
  </div>
);

const QuestionSlide: React.FC<{
  question: string;
  hint?: string;
  subHint?: string;
  emoji?: string;
}> = ({ question, hint, subHint, emoji }) => (
  <div className="flex flex-col items-center justify-start h-full text-center max-w-3xl mx-auto px-8 gap-7 pt-6 overflow-y-auto">
    {emoji && (
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        className="text-7xl select-none"
      >
        {emoji}
      </motion.div>
    )}
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
      className="text-4xl md:text-5xl font-black text-slate-800 leading-tight"
    >
      {question}
    </motion.h1>
    {hint && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-xl text-slate-500 font-medium leading-relaxed"
      >
        {hint}
      </motion.p>
    )}
    {subHint && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="text-base text-slate-400 italic"
      >
        {subHint}
      </motion.p>
    )}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
    >
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold"
      >
        take a moment · then press →
      </motion.span>
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// EigenGrid — TransformGrid with eigenvector overlays
// ═══════════════════════════════════════════════════════════════

const MARKER_DEFS = (
  <defs>
    {([
      ['red', '#E11D48'], ['blue', '#0284C7'], ['green', '#059669'],
      ['slate', '#64748B'], ['violet', '#7C3AED'], ['amber', '#D97706'],
      ['emerald', '#10B981'], ['rose', '#FB7185'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`c5-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

interface EigenGridProps {
  M: Mat2;
  showEigen?: boolean;
  showBasisOnly?: boolean;
  highlightVecs?: { vec: Vec2; color: string; marker: string; label?: string; dashed?: boolean }[];
  width?: number;
  height?: number;
  scale?: number;
  range?: number;
}

const EigenGrid: React.FC<EigenGridProps> = ({
  M, showEigen = false, showBasisOnly = false,
  highlightVecs = [],
  width = 480, height = 480, scale = 68, range = 3,
}) => {
  const cx = width / 2, cy = height / 2;
  const pt = (x: number, y: number): Vec2 => {
    const [tx, ty] = mulMV(M, [x, y]);
    return [cx + tx * scale, cy - ty * scale];
  };
  const raw = (x: number, y: number): Vec2 => [cx + x * scale, cy - y * scale];

  const origin = showBasisOnly ? raw(0, 0) : pt(0, 0);
  const gridLines: React.ReactNode[] = [];

  if (!showBasisOnly) {
    for (let i = -range; i <= range; i++) {
      const h0 = pt(-range, i), h1 = pt(range, i);
      const v0 = pt(i, -range), v1 = pt(i, range);
      const isAxis = i === 0;
      gridLines.push(
        <line key={`h${i}`} x1={h0[0]} y1={h0[1]} x2={h1[0]} y2={h1[1]}
          stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
        <line key={`v${i}`} x1={v0[0]} y1={v0[1]} x2={v1[0]} y2={v1[1]}
          stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
      );
    }
  } else {
    // Clean axes only
    gridLines.push(
      <line key="hax" x1={cx - range * scale} y1={cy} x2={cx + range * scale} y2={cy} stroke="#e2e8f0" strokeWidth={1.5} />,
      <line key="vax" x1={cx} y1={cy - range * scale} x2={cx} y2={cy + range * scale} stroke="#e2e8f0" strokeWidth={1.5} />,
    );
  }

  const e1 = showBasisOnly ? raw(1, 0) : pt(1, 0);
  const e2 = showBasisOnly ? raw(0, 1) : pt(0, 1);
  const orgPt = origin;

  const evals = showEigen ? eigenvalues(M) : null;
  const eigenArrows: React.ReactNode[] = [];
  if (evals && showEigen) {
    evals.forEach((λ, i) => {
      const ev = eigenvector(M, λ);
      const len = 2.2;
      const tip = pt(ev[0] * len, ev[1] * len);
      const tipN = pt(-ev[0] * len, -ev[1] * len);
      const col = i === 0 ? '#10B981' : '#D97706';
      const mk = i === 0 ? 'emerald' : 'amber';
      eigenArrows.push(
        <line key={`ev${i}pos`} x1={orgPt[0]} y1={orgPt[1]} x2={tip[0]} y2={tip[1]}
          stroke={col} strokeWidth="2.5" markerEnd={`url(#c5-${mk})`} strokeDasharray="6 3" />,
        <line key={`ev${i}neg`} x1={orgPt[0]} y1={orgPt[1]} x2={tipN[0]} y2={tipN[1]}
          stroke={col} strokeWidth="2.5" markerEnd={`url(#c5-${mk})`} strokeDasharray="6 3" />,
        <text key={`evlbl${i}`} x={tip[0] + 8} y={tip[1] - 6} fill={col} fontSize="12" fontWeight="bold">
          λ={fmt(λ)}
        </text>
      );
    });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {MARKER_DEFS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}
      {!showBasisOnly && (
        <>
          <line x1={orgPt[0]} y1={orgPt[1]} x2={e1[0]} y2={e1[1]} stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#c5-red)" />
          <line x1={orgPt[0]} y1={orgPt[1]} x2={e2[0]} y2={e2[1]} stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#c5-blue)" />
        </>
      )}
      {highlightVecs.map((hv, i) => {
        const tip = showBasisOnly ? raw(hv.vec[0], hv.vec[1]) : pt(hv.vec[0], hv.vec[1]);
        return (
          <g key={i}>
            <line x1={orgPt[0]} y1={orgPt[1]} x2={tip[0]} y2={tip[1]}
              stroke={hv.color} strokeWidth="3"
              markerEnd={`url(#c5-${hv.marker})`}
              strokeDasharray={hv.dashed ? '6 3' : undefined} />
            {hv.label && (
              <text x={tip[0] + 8} y={tip[1] - 6} fill={hv.color} fontSize="13" fontWeight="bold">{hv.label}</text>
            )}
          </g>
        );
      })}
      {eigenArrows}
      <circle cx={orgPt[0]} cy={orgPt[1]} r="4.5" fill="#0f172a" />
    </svg>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.1 — Curiosity Hook: The Special Directions
// ══════════════════════════════════════════════════════════

export const Scene5_1_CuriosityHook: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1600),
      setTimeout(() => setStep(3), 2700),
      setTimeout(() => setStep(4), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const words = [
    { text: 'Stretch.', color: 'text-rose-500' },
    { text: 'Rotate.', color: 'text-sky-500' },
    { text: 'Squish.', color: 'text-violet-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-4 gap-6">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
      >
        Chapter 5 · Eigenvectors & Eigenvalues
      </motion.p>

      <div className="flex gap-8 mb-2">
        {words.map((w, i) => (
          <motion.span
            key={w.text}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.45, duration: 0.6, ease: 'easeOut' }}
            className={`text-4xl md:text-6xl font-black ${w.color}`}
          >
            {w.text}
          </motion.span>
        ))}
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3"
          >
            <p className="text-slate-600 text-xl font-semibold">When a matrix transforms space…</p>
            <p className="text-slate-800 text-2xl font-black">
              most vectors <span className="text-rose-500">change direction.</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-8 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md"
          >
            <p className="text-emerald-800 text-xl font-black">
              But a few special vectors only get <span className="underline decoration-wavy decoration-emerald-500">scaled.</span>
            </p>
            <p className="text-emerald-600 text-sm font-semibold mt-1">They keep pointing the same way. They never rotate.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 4 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-400 text-lg font-medium italic"
          >
            These are <strong className="text-slate-700 not-italic">eigenvectors</strong> — and they reveal the skeleton of every transformation.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.2 — Think: The Stretchy Rubber Sheet
// ══════════════════════════════════════════════════════════

export const Scene5_2_RubberSheetThink: React.FC = () => (
  <QuestionSlide
    emoji="🪢"
    question="Imagine pulling a rubber sheet in one direction. What happens to the arrows drawn on it?"
    hint="Arrows pointing left/right get stretched along with the sheet. Arrows pointing up/down get squished."
    subHint="But there are always a few directions that just get longer or shorter — never tilted. Those are the eigenvectors."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.3 — Real-World Analogies
// ══════════════════════════════════════════════════════════

export const Scene5_3_RealWorldAnalogies: React.FC = () => {
  const [active, setActive] = useState(0);

  const analogies = [
    {
      emoji: '🌊',
      title: 'Ocean Current',
      short: 'Water flows mostly east. Any debris dropped in will drift east regardless of starting angle — east is the eigenvector.',
      color: '#0284C7',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      textColor: 'text-sky-700',
    },
    {
      emoji: '📸',
      title: 'Camera Zoom',
      short: 'Zooming in doubles every coordinate. The vector pointing at the Eiffel Tower still points at the Eiffel Tower — it just gets twice as long.',
      color: '#7C3AED',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      textColor: 'text-violet-700',
    },
    {
      emoji: '🏋️',
      title: 'PCA in Machine Learning',
      short: 'Thousands of features in a dataset. PCA finds the directions of maximum spread — those are the eigenvectors of the covariance matrix.',
      color: '#059669',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      textColor: 'text-emerald-700',
    },
    {
      emoji: '🌐',
      title: 'Google PageRank',
      short: "The web is a giant link matrix. The most important page is the eigenvector of that matrix — the direction the internet 'points to' most.",
      color: '#E11D48',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      textColor: 'text-rose-700',
    },
  ];

  const a = analogies[active];

  return (
    <SlideLayout
      title="Eigenvectors Are Everywhere"
      text="Before the equations, let's see why anyone cares. These show up at the heart of Google, Instagram filters, and modern AI."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {analogies.map((an, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                i === active
                  ? `${an.bg} ${an.border}`
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              style={i === active ? { color: an.color } : {}}
            >
              {an.emoji} {an.title}
            </button>
          ))}
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className={`flex flex-col items-center justify-center gap-6 p-8 rounded-3xl ${a.bg} border ${a.border} w-full h-full max-w-lg mx-auto`}
        >
          <div className="text-7xl">{a.emoji}</div>
          <h3 className="text-2xl font-black" style={{ color: a.color }}>{a.title}</h3>
          <p className="text-slate-600 text-lg font-medium text-center leading-relaxed">{a.short}</p>
          <div className={`px-4 py-2 rounded-full text-xs font-bold border ${a.bg} ${a.border} ${a.textColor}`}>
            eigenvector in the wild
          </div>
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.4 — The Wobble Test: Watch Vectors Transform
// ══════════════════════════════════════════════════════════

export const Scene5_4_WobbleTest: React.FC = () => {
  const M: Mat2 = [[3, 1], [0, 2]];
  const animated = useAnimatedMatrix(M);

  const testVecs: { vec: Vec2; label: string; color: string; marker: string }[] = [
    { vec: [1, 0], label: 'v₁', color: '#E11D48', marker: 'red' },
    { vec: [0, 1], label: 'v₂', color: '#0284C7', marker: 'blue' },
    { vec: [1, 1], label: 'v₃', color: '#7C3AED', marker: 'violet' },
  ];

  const [selected, setSelected] = useState(0);
  const sv = testVecs[selected];
  const original = sv.vec;
  const transformed = mulMV(M, original);

  const sameDir = () => {
    const n1 = norm(original);
    const n2 = norm(transformed);
    return Math.abs(n1[0] * n2[0] + n1[1] * n2[1]) > 0.99;
  };

  return (
    <SlideLayout
      title="The Wobble Test"
      text="Pick a vector. Apply the matrix. Did it keep pointing the same way — or did it rotate? Most vectors wobble. A few stay true."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Test vectors</div>
          <div className="flex flex-col gap-2">
            {testVecs.map((tv, i) => {
              const orig = tv.vec;
              const tx = mulMV(M, orig);
              const keeps = (() => {
                const n1 = norm(orig);
                const n2 = norm(tx);
                return Math.abs(n1[0] * n2[0] + n1[1] * n2[1]) > 0.99;
              })();
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-3 py-3 rounded-xl border transition-all cursor-pointer ${
                    i === selected ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm" style={{ color: tv.color }}>{tv.label} = [{orig[0]}, {orig[1]}]</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${keeps ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                      {keeps ? '✓ eigen' : '✗ rotates'}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500">→ [{fmt(tx[0])}, {fmt(tx[1])}]</div>
                </button>
              );
            })}
          </div>
          <div className={`rounded-xl p-3 text-sm font-semibold border ${sameDir() ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-600'}`}>
            {sameDir()
              ? `✓ ${sv.label} only scaled — it's an eigenvector!`
              : `✗ ${sv.label} changed direction — not an eigenvector.`}
          </div>
        </div>
      }
    >
      <EigenGrid
        M={animated}
        highlightVecs={[
          { vec: original, color: sv.color, marker: sv.marker, label: `${sv.label} (before)`, dashed: true },
          { vec: transformed, color: sv.color, marker: sv.marker, label: `M·${sv.label}` },
        ]}
      />
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.5 — Think: What Makes a Vector "Special"?
// ══════════════════════════════════════════════════════════

export const Scene5_5_WhatMakesSpecial: React.FC = () => (
  <QuestionSlide
    emoji="🔭"
    question="If applying a matrix to a vector only stretches it (not rotates it), what does that tell us about those two things?"
    hint="The matrix and the vector are somehow 'aligned'. The transformation doesn't surprise the vector — it just makes it bigger or smaller."
    subHint="We call the scale factor the eigenvalue. Big λ = strong stretch. Small λ = squish. Negative λ = flip and scale."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.6 — The Big Equation Revealed
// ══════════════════════════════════════════════════════════

export const Scene5_6_TheEquation: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto px-6 gap-8">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold"
      >
        The Eigenvector Equation
      </motion.p>

      {/* The equation, revealed piece-by-piece */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="px-6 py-3 bg-rose-50 border-2 border-rose-200 rounded-2xl text-4xl font-black text-rose-600 font-mono"
        >
          M·v
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-black text-slate-400"
        >=
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.7 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-4xl font-black text-emerald-600 font-mono"
        >
          λ·v
        </motion.div>
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-4 max-w-xl w-full"
          >
            {[
              { label: 'M', desc: 'The matrix (a transformation)', color: '#E11D48', bg: 'bg-rose-50', border: 'border-rose-200' },
              { label: 'v', desc: 'The eigenvector (special direction)', color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200' },
              { label: 'λ', desc: 'The eigenvalue (how much it scales)', color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' },
              { label: 'M·v = λ·v', desc: 'Applying M is the same as just scaling v', color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200' },
            ].map(item => (
              <div key={item.label} className={`${item.bg} border ${item.border} rounded-xl p-3 text-left`}>
                <div className="font-mono font-black text-lg mb-1" style={{ color: item.color }}>{item.label}</div>
                <div className="text-slate-600 text-xs font-medium">{item.desc}</div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-500 text-base font-medium italic max-w-md"
          >
            "Applying the whole matrix is exactly the same as multiplying by one number."
            <br />
            <span className="text-slate-400 text-sm not-italic">That's the power of eigenvectors.</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.7 — Think: What Does λ Tell You?
// ══════════════════════════════════════════════════════════

export const Scene5_7_WhatIsLambda: React.FC = () => (
  <QuestionSlide
    emoji="🔢"
    question="If λ = 3, what does that mean for the eigenvector?"
    hint="The eigenvector gets 3× longer. Direction stays the same — only the length changes."
    subHint="λ = 1 means no change. λ = 0.5 means half the length. λ = −1 means it flips direction but stays the same length. λ = 0 means it collapses to zero — the matrix destroys that direction!"
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.8 — Eigenvalue Explorer
// ══════════════════════════════════════════════════════════

export const Scene5_8_EigenvalueExplorer: React.FC = () => {
  const [λ, setLambda] = useState(2.0);
  // Matrix: diagonal with eigenvalues λ and 1 (for clarity)
  const M: Mat2 = [[λ, 0], [0, 1]];
  const animated = useAnimatedMatrix(M);
  const ev: Vec2 = [1, 0]; // eigenvector is always [1,0] for this diagonal matrix
  const transformed = mulMV(M, ev);

  const description = λ > 1 ? 'stretched' : λ > 0 ? 'squished' : λ === 0 ? 'collapsed to zero' : 'flipped & scaled';
  const descColor = λ > 1 ? 'text-emerald-700' : λ > 0 ? 'text-amber-700' : λ === 0 ? 'text-rose-700' : 'text-violet-700';

  const pct = ((λ + 3) / 6) * 100;

  return (
    <SlideLayout
      title="Feel the Eigenvalue"
      text="Drag λ and watch the red eigenvector. Notice: the grid warps with the matrix, but the eigenvector direction never tilts — it just scales."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Eigenvalue λ</span>
              <span className="text-2xl font-black font-mono text-emerald-600">{λ.toFixed(1)}</span>
            </div>
            <input
              type="range" min="-3" max="3" step="0.1" value={λ}
              onChange={e => setLambda(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2"
              style={{ background: `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>−3</span><span>0</span><span>+3</span>
            </div>
          </div>

          <div className={`rounded-xl p-3 border text-sm font-bold transition-all ${descColor} ${
            λ > 1 ? 'bg-emerald-50 border-emerald-200' :
            λ > 0 ? 'bg-amber-50 border-amber-200' :
            λ === 0 ? 'bg-rose-50 border-rose-200' : 'bg-violet-50 border-violet-200'
          }`}>
            eigenvector is <span className="underline">{description}</span>
          </div>

          {[
            { label: 'eigenvector v', val: `[${ev[0]}, ${ev[1]}]`, color: '#E11D48' },
            { label: 'M · v', val: `[${fmt(transformed[0])}, ${fmt(transformed[1])}]`, color: '#059669' },
            { label: 'λ · v', val: `[${fmt(λ * ev[0])}, ${fmt(λ * ev[1])}]`, color: '#7C3AED' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold">
              <span className="text-slate-500">{row.label}</span>
              <span style={{ color: row.color }}>{row.val}</span>
            </div>
          ))}

          <div className="text-[11px] text-slate-400 font-medium text-center">
            M·v and λ·v are always identical — that's the whole point!
          </div>
        </div>
      }
    >
      <EigenGrid
        M={animated}
        highlightVecs={[
          { vec: [1, 0], color: '#E11D48', marker: 'red', label: `v = [1,0]`, dashed: true },
          { vec: transformed, color: '#059669', marker: 'green', label: `M·v = [${fmt(transformed[0])},${fmt(transformed[1])}]` },
        ]}
      />
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.9 — The Geometric Picture
// ══════════════════════════════════════════════════════════

export const Scene5_9_GeometricPicture: React.FC = () => {
  const presets: { name: string; M: Mat2; label: string }[] = [
    { name: 'Stretch X', M: [[3, 0], [0, 1]], label: 'λ₁=3 (→), λ₂=1 (↑)' },
    { name: 'Scale Both', M: [[2, 0], [0, 2]], label: 'λ=2 (every direction!)' },
    { name: 'Shear', M: [[1, 1], [0, 1]], label: 'λ=1 (repeated, axis-aligned)' },
    { name: 'Rotation 45°', M: [[0.7, -0.7], [0.7, 0.7]], label: 'No real eigenvectors!' },
  ];
  const [active, setActive] = useState(0);
  const target = presets[active].M;
  const animated = useAnimatedMatrix(target, 700);
  const evals = eigenvalues(target);

  return (
    <SlideLayout
      title="Eigenvectors Live in the Grid"
      text="The dashed lines show eigenvector directions. Toggle presets — notice how rotation has no real eigenvectors (they'd be imaginary)."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Presets</div>
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                i === active
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div>{p.name}</div>
              <div className="text-[10px] font-mono font-normal text-slate-400 mt-0.5">{p.label}</div>
            </button>
          ))}
          <div className={`rounded-xl p-3 text-xs font-semibold border mt-1 ${evals ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            {evals
              ? `Real eigenvalues: λ₁ = ${fmt(evals[0])}, λ₂ = ${fmt(evals[1])}`
              : 'Complex eigenvalues — no real eigenvectors exist for pure rotations.'}
          </div>
        </div>
      }
    >
      <EigenGrid M={animated} showEigen={!!evals} />
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.10 — Think: Can Every Matrix Have Eigenvectors?
// ══════════════════════════════════════════════════════════

export const Scene5_10_CanEveryMatrix: React.FC = () => (
  <QuestionSlide
    emoji="🌀"
    question="What if you rotate everything 90°? Is there ANY direction that stays pointing the same way?"
    hint="No — a 90° rotation spins every vector. There's no real direction that survives. But there are complex eigenvectors!"
    subHint="Symmetric matrices (like covariance matrices in AI) always have real eigenvectors. That's one big reason ML loves symmetric matrices."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.11 — How To Find Eigenvalues (The Math)
// ══════════════════════════════════════════════════════════

export const Scene5_11_CharacteristicEquation: React.FC = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 5;

  return (
    <div className="flex flex-col items-center justify-start h-full max-w-3xl mx-auto px-6 py-4 gap-6 overflow-y-auto">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">The Math</p>
        <h2 className="text-3xl font-black text-slate-800">Finding Eigenvalues</h2>
      </div>

      <div className="w-full flex flex-col gap-3">
        {[
          {
            label: 'Start with the equation',
            content: <KaTeXMath tex="M \mathbf{v} = \lambda \mathbf{v}" />,
            note: 'We want v ≠ 0',
          },
          {
            label: 'Rearrange',
            content: <KaTeXMath tex="M \mathbf{v} - \lambda \mathbf{v} = \mathbf{0}" />,
            note: 'Move everything to the left',
          },
          {
            label: 'Factor out v',
            content: <KaTeXMath tex="(M - \lambda I)\mathbf{v} = \mathbf{0}" />,
            note: 'I is the identity matrix',
          },
          {
            label: 'Non-trivial solution requires',
            content: <KaTeXMath tex="\det(M - \lambda I) = 0" />,
            note: 'If det ≠ 0, only v = 0 is a solution',
          },
          {
            label: 'Solve the characteristic polynomial',
            content: <KaTeXMath tex="\lambda^2 - \text{tr}(M)\lambda + \det(M) = 0" />,
            note: 'For 2×2 matrices — roots are your eigenvalues!',
          },
        ].map((row, i) => (
          <AnimatePresence key={i}>
            {step >= i && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">{row.label}</div>
                  <div className="text-xl font-mono">{row.content}</div>
                  <div className="text-xs text-slate-400 mt-1 italic">{row.note}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <div className="flex gap-2">
        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(s => Math.min(s + 1, totalSteps - 1))}
            className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all cursor-pointer active:scale-95"
          >
            Next Step →
          </button>
        ) : (
          <div className="px-5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-bold text-sm">
            ✓ That's the full derivation!
          </div>
        )}
        {step > 0 && (
          <button
            onClick={() => setStep(0)}
            className="px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all cursor-pointer"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.12 — Worked Example: 2×2 Matrix Step by Step
// ══════════════════════════════════════════════════════════

export const Scene5_12_WorkedExample: React.FC = () => {
  const [reveal, setReveal] = useState(0);
  const M: Mat2 = [[4, 1], [2, 3]];

  const steps = [
    {
      title: 'The matrix M',
      content: <KaTeXMath tex="M = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}" />,
    },
    {
      title: 'Characteristic equation',
      content: <KaTeXMath tex="\det(M - \lambda I) = (4-\lambda)(3-\lambda) - (1)(2) = 0" />,
    },
    {
      title: 'Expand',
      content: <KaTeXMath tex="\lambda^2 - 7\lambda + 10 = 0" />,
    },
    {
      title: 'Factor',
      content: <KaTeXMath tex="(\lambda - 5)(\lambda - 2) = 0" />,
    },
    {
      title: 'Eigenvalues',
      content: (
        <div className="flex gap-4">
          <span className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-mono font-black text-xl">λ₁ = 5</span>
          <span className="px-4 py-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl font-mono font-black text-xl">λ₂ = 2</span>
        </div>
      ),
    },
    {
      title: 'Eigenvector for λ₁ = 5: solve (M − 5I)v = 0',
      content: (
        <div className="flex flex-col gap-2">
          <KaTeXMath tex="\begin{pmatrix} -1 & 1 \\ 2 & -2 \end{pmatrix} \mathbf{v} = 0" />
          <div className="text-emerald-700 font-bold font-mono text-lg">→ v₁ = [1, 1]</div>
        </div>
      ),
    },
    {
      title: 'Eigenvector for λ₂ = 2: solve (M − 2I)v = 0',
      content: (
        <div className="flex flex-col gap-2">
          <KaTeXMath tex="\begin{pmatrix} 2 & 1 \\ 2 & 1 \end{pmatrix} \mathbf{v} = 0" />
          <div className="text-amber-700 font-bold font-mono text-lg">→ v₂ = [1, −2]</div>
        </div>
      ),
    },
  ];

  const animated = useAnimatedMatrix(M);

  return (
    <SlideLayout
      title="Worked Example"
      text="Let's find eigenvectors for a concrete matrix. Click through each step, then verify on the grid."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                i <= reveal ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-50 border-slate-100 text-slate-300'
              }`}
            >
              <div className="font-bold mb-1 text-slate-500">{i + 1}. {s.title}</div>
              {i <= reveal && <div className="text-sm">{s.content}</div>}
            </div>
          ))}
          <div className="flex gap-2 mt-1">
            {reveal < steps.length - 1 && (
              <button onClick={() => setReveal(r => r + 1)} className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all cursor-pointer active:scale-95">
                Reveal →
              </button>
            )}
            {reveal > 0 && (
              <button onClick={() => setReveal(0)} className="px-3 py-2 bg-slate-100 text-slate-500 rounded-xl font-bold text-xs cursor-pointer">
                Reset
              </button>
            )}
          </div>
        </div>
      }
    >
      <EigenGrid
        M={animated}
        showEigen={reveal >= 4}
        highlightVecs={reveal >= 5 ? [{ vec: [1, 1], color: '#10B981', marker: 'emerald', label: 'v₁=[1,1]' }] : []}
      />
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.13 — Think: What Does a Negative λ Feel Like?
// ══════════════════════════════════════════════════════════

export const Scene5_13_NegativeLambda: React.FC = () => (
  <QuestionSlide
    emoji="🪞"
    question="If λ = −2, what happens to the eigenvector?"
    hint="It gets 2× longer AND flips to the opposite direction. Like a mirror that also zooms in."
    subHint="In PCA, a negative eigenvalue would mean that feature combination anti-correlates with the direction of greatest spread. Usually we only keep positive eigenvalues."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.14 — Eigenvectors Don't Change Length Ratio
// ══════════════════════════════════════════════════════════

export const Scene5_14_Diagonalization: React.FC = () => {
  const [step, setStep] = useState(0);

  const points = [
    { emoji: '🎯', title: 'The Core Insight', body: 'Eigenvectors form the "natural axes" of a matrix. In those axes, the matrix is just a simple diagonal stretch.', color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200' },
    { emoji: '🧩', title: 'Diagonalization', body: 'M = P D P⁻¹ where P is the matrix of eigenvectors and D is the diagonal matrix of eigenvalues. This breaks any matrix into rotate → scale → un-rotate.', color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200' },
    { emoji: '⚡', title: 'Why It Matters', body: 'Computing Mⁿ (matrix to the n-th power) is expensive. In eigenvector form it is trivially: P Dⁿ P⁻¹. Eigenvalues just get raised to the n-th power.', color: '#D97706', bg: 'bg-amber-50', border: 'border-amber-200' },
    { emoji: '🤖', title: 'In AI: PCA', body: 'The eigenvectors of a data covariance matrix are the principal components. The eigenvalues tell you how much variance each direction captures.', color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-6 gap-6">
      <div className="text-center">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">Big Picture</p>
        <h2 className="text-3xl font-black text-slate-800">Why Eigenvectors Are Powerful</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= i ? 1 : 0.15, y: step >= i ? 0 : 20 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onClick={() => setStep(Math.max(step, i + 1))}
            className={`${p.bg} border ${p.border} rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md`}
          >
            <div className="text-3xl mb-2">{p.emoji}</div>
            <div className="font-black text-slate-800 text-sm mb-1">{p.title}</div>
            <div className="text-slate-600 text-xs font-medium leading-relaxed">{p.body}</div>
          </motion.div>
        ))}
      </div>

      {step < points.length && (
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          tap a card to unlock
        </motion.p>
      )}
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.15 — PCA Intuition: The Spread Direction
// ══════════════════════════════════════════════════════════

const makeCloudPoints = (n: number, θ: number): Vec2[] => {
  const cos = Math.cos(θ), sin = Math.sin(θ);
  return Array.from({ length: n }, () => {
    const u = (Math.random() - 0.5) * 4;
    const v = (Math.random() - 0.5) * 1.2;
    return [u * cos - v * sin, u * sin + v * cos] as Vec2;
  });
};

export const Scene5_15_PCAIntuition: React.FC = () => {
  const [angle, setAngle] = useState(30);
  const [pts] = useState(() => makeCloudPoints(60, (30 * Math.PI) / 180));
  const θ = (angle * Math.PI) / 180;
  const eigDir: Vec2 = [Math.cos(θ), Math.sin(θ)];

  const WIDTH = 480, HEIGHT = 380;
  const cx = WIDTH / 2, cy = HEIGHT / 2;
  const sc = 60;

  const projections = pts.map(p => {
    const d = p[0] * eigDir[0] + p[1] * eigDir[1];
    return [d * eigDir[0], d * eigDir[1]] as Vec2;
  });

  return (
    <SlideLayout
      title="PCA: Finding the Spread"
      text="Rotate the principal direction (green arrow). Watch the projections — the direction that spreads them out the most is the first eigenvector of the covariance matrix."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Direction angle</span>
              <span className="text-xl font-black font-mono text-emerald-600">{angle}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angle}
              onChange={e => setAngle(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2"
              style={{ background: `linear-gradient(to right, #10B981 0%, #10B981 ${(angle / 180) * 100}%, #e2e8f0 ${(angle / 180) * 100}%, #e2e8f0 100%)` }}
            />
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-semibold text-emerald-700">
            🎯 Try ~30° — that's where this cloud has the most spread. That's the eigenvector!
          </div>
          <div className="flex flex-col gap-2 text-xs font-mono font-bold">
            <div className="flex justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-slate-500">direction</span>
              <span className="text-emerald-600">[{eigDir[0].toFixed(2)}, {eigDir[1].toFixed(2)}]</span>
            </div>
          </div>
        </div>
      }
    >
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-full max-h-full">
        {MARKER_DEFS}
        <rect width={WIDTH} height={HEIGHT} fill="white" rx="16" />
        {/* axis lines */}
        <line x1={0} y1={cy} x2={WIDTH} y2={cy} stroke="#e2e8f0" strokeWidth={1} />
        <line x1={cx} y1={0} x2={cx} y2={HEIGHT} stroke="#e2e8f0" strokeWidth={1} />
        {/* data points */}
        {pts.map((p, i) => (
          <circle key={i} cx={cx + p[0] * sc} cy={cy - p[1] * sc} r="4" fill="#0284C7" opacity="0.35" />
        ))}
        {/* projection dots on the principal axis */}
        {projections.map((p, i) => (
          <circle key={`proj${i}`} cx={cx + p[0] * sc} cy={cy - p[1] * sc} r="3" fill="#10B981" opacity="0.6" />
        ))}
        {/* principal direction arrow */}
        <line
          x1={cx - eigDir[0] * sc * 3.5} y1={cy + eigDir[1] * sc * 3.5}
          x2={cx + eigDir[0] * sc * 3.5} y2={cy - eigDir[1] * sc * 3.5}
          stroke="#10B981" strokeWidth="2.5" markerEnd="url(#c5-emerald)" />
        <text x={cx + eigDir[0] * sc * 3.5 + 8} y={cy - eigDir[1] * sc * 3.5 - 6} fill="#10B981" fontSize="12" fontWeight="bold">PC1</text>
      </svg>
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.16 — Think: Why Do ML Models Love Eigenvectors?
// ══════════════════════════════════════════════════════════

export const Scene5_16_WhyMLLoves: React.FC = () => (
  <QuestionSlide
    emoji="🧠"
    question="A dataset has 1000 features. Why would you want to find its eigenvectors before training a model?"
    hint="Most features are correlated — they move together. Eigenvectors find the independent directions of variation. You can drop the small ones and keep only the big ones."
    subHint="This is dimensionality reduction. Instead of 1000 numbers per sample, maybe 20 eigenvector coordinates explain 95% of the data. Faster training, less overfitting."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.17 — Symmetric Matrices: Always Real Eigenvectors
// ══════════════════════════════════════════════════════════

export const Scene5_17_SymmetricMatrices: React.FC = () => {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(1.0);
  // Symmetric: [[a, b], [b, d]] always has real eigenvalues
  const d = 1.0;
  const M: Mat2 = [[a, b], [b, d]];
  const animated = useAnimatedMatrix(M, 500);
  const evals = eigenvalues(M);

  const pctA = ((a + 3) / 6) * 100;
  const pctB = ((b + 3) / 6) * 100;

  return (
    <SlideLayout
      title="Symmetric Matrices Always Work"
      text="Covariance matrices in ML are always symmetric (Mᵀ = M). This guarantees real, perpendicular eigenvectors — perfect for PCA. Drag to explore."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Symmetric Matrix</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center mb-4 text-lg font-black">
              <div className="rounded-xl py-2 bg-sky-50 border border-sky-200 text-sky-700">{a.toFixed(1)}</div>
              <div className="rounded-xl py-2 bg-violet-50 border border-violet-200 text-violet-700">{b.toFixed(1)}</div>
              <div className="rounded-xl py-2 bg-violet-50 border border-violet-200 text-violet-700">{b.toFixed(1)}</div>
              <div className="rounded-xl py-2 bg-sky-50 border border-sky-200 text-sky-700">{d.toFixed(1)}</div>
            </div>
            {[
              { label: 'a (diagonal)', val: a, set: setA, color: '#0284C7' },
              { label: 'b (off-diagonal)', val: b, set: setB, color: '#7C3AED' },
            ].map(row => {
              const pct = row.label.includes('a') ? pctA : pctB;
              return (
                <div key={row.label} className="flex flex-col gap-1 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{row.label}</span>
                    <span className="text-sm font-black font-mono" style={{ color: row.color }}>{row.val.toFixed(1)}</span>
                  </div>
                  <input
                    type="range" min="-3" max="3" step="0.1" value={row.val}
                    onChange={e => row.set(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer rounded-full h-2"
                    style={{ background: `linear-gradient(to right, ${row.color} 0%, ${row.color} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-bold text-emerald-700">
            {evals
              ? `λ₁ = ${fmt(evals[0])}, λ₂ = ${fmt(evals[1])}`
              : 'No real eigenvalues'
            }
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-600">
            Notice: eigenvalue directions (dashed) are always perpendicular for symmetric matrices!
          </div>
        </div>
      }
    >
      <EigenGrid M={animated} showEigen={!!evals} />
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.18 — The Spectrum: Eigenvalue Magnitudes Matter
// ══════════════════════════════════════════════════════════

export const Scene5_18_Spectrum: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      title: 'Large λ → Important direction',
      body: 'In image compression (PCA on pixels), eigenvectors with large λ capture the most visual information. Keep the top 50 and you can reconstruct the image with ~90% accuracy.',
      icon: '🖼️',
      eigenvals: [8.2, 3.1, 0.9, 0.3, 0.05],
      color: '#059669',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
    },
    {
      title: 'Small λ → Noise direction',
      body: 'Small eigenvalues capture noise, not signal. Dropping them is like denoising — you lose almost no real information but shed random variation.',
      icon: '🔇',
      eigenvals: [8.2, 3.1, 0.9, 0.3, 0.05],
      color: '#D97706',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
    },
    {
      title: 'λ = 0 → Collapsed direction',
      body: 'Zero eigenvalue means the transformation collapses that entire dimension — all vectors in that direction get squished to the origin. Information is permanently lost.',
      icon: '💀',
      eigenvals: [5.0, 2.0, 0.0, 0.0, 0.0],
      color: '#E11D48',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
    },
  ];

  const ex = examples[active];
  const maxVal = Math.max(...ex.eigenvals);

  return (
    <SlideLayout
      title="The Eigenvalue Spectrum"
      text="Eigenvalues have magnitudes. Big ones = important directions. Small ones = noise. Zero = destruction. This is how PCA picks what to keep."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                i === active ? `${e.bg} ${e.border}` : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              style={i === active ? { color: e.color } : {}}
            >
              {e.icon} {e.title}
            </button>
          ))}
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col gap-6 w-full max-w-lg mx-auto p-6"
        >
          <div className="text-5xl text-center">{ex.icon}</div>
          <p className="text-slate-600 text-base font-medium text-center leading-relaxed">{ex.body}</p>
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">Eigenvalue magnitudes</div>
            {ex.eigenvals.map((val, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 w-12">λ{i + 1} = {val}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(val / maxVal) * 100}%` }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="h-3 rounded-full"
                    style={{ backgroundColor: val === 0 ? '#fca5a5' : ex.color }}
                  />
                </div>
                {val === 0 && <span className="text-[10px] text-rose-500 font-bold">💀 lost</span>}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.19 — Think: Rank the Eigenvalues
// ══════════════════════════════════════════════════════════

export const Scene5_19_RankThink: React.FC = () => (
  <QuestionSlide
    emoji="📊"
    question="A covariance matrix has eigenvalues: 120, 85, 3, 1, 0.2. You can only keep 2. Which do you keep and why?"
    hint="Keep λ=120 and λ=85. Together they explain (120+85)/(120+85+3+1+0.2) ≈ 97% of the total variance."
    subHint="This is exactly what sklearn's PCA does when you set n_components=2. It sorts eigenvalues and picks the top k."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.20 — Interactive Eigen Sandbox
// ══════════════════════════════════════════════════════════

export const Scene5_20_EigenSandbox: React.FC = () => {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(0.5);
  const [c, setC] = useState(0.5);
  const [d, setD] = useState(1.0);

  const M: Mat2 = [[a, b], [c, d]];
  const animated = useAnimatedMatrix(M, 80);
  const evals = eigenvalues(M);
  const detVal = det(M);
  const trVal = trace(M);

  const sliders = [
    { label: 'a', val: a, set: setA, color: '#E11D48' },
    { label: 'b', val: b, set: setB, color: '#D97706' },
    { label: 'c', val: c, set: setC, color: '#7C3AED' },
    { label: 'd', val: d, set: setD, color: '#0284C7' },
  ];

  const presets: { name: string; vals: [number,number,number,number] }[] = [
    { name: 'Symmetric', vals: [2, 1, 1, 2] },
    { name: 'Diagonal', vals: [3, 0, 0, 1] },
    { name: 'Shear', vals: [1, 2, 0, 1] },
    { name: 'Collapse', vals: [1, 1, 1, 1] },
    { name: 'Rotation', vals: [0, -1, 1, 0] },
    { name: 'Identity', vals: [1, 0, 0, 1] },
  ];

  return (
    <SlideLayout
      title="Eigen Sandbox"
      text="Build any matrix. Watch eigenvectors appear (or vanish). Try Collapse — both eigenvalues collapse. Try Rotation — no real eigenvectors at all."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-1.5">
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => { setA(p.vals[0]); setB(p.vals[1]); setC(p.vals[2]); setD(p.vals[3]); }}
                className="px-2 py-2 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer active:scale-95"
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Matrix M</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center mb-4">
              {([['a', a, '#E11D48'], ['b', b, '#D97706'], ['c', c, '#7C3AED'], ['d', d, '#0284C7']] as [string, number, string][]).map(([lbl, val, clr]) => (
                <div key={lbl} className="flex flex-col items-center rounded-xl py-2.5 border" style={{ borderColor: clr + '33', backgroundColor: clr + '0D' }}>
                  <span className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: clr + 'AA' }}>{lbl}</span>
                  <span className="text-2xl font-black leading-none" style={{ color: clr }}>{val.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {sliders.map(sl => {
                const pct = ((sl.val + 3) / 6) * 100;
                return (
                  <div key={sl.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black font-mono text-white" style={{ backgroundColor: sl.color }}>{sl.label}</span>
                      <span className="text-sm font-black font-mono" style={{ color: sl.color }}>{sl.val.toFixed(1)}</span>
                    </div>
                    <input
                      type="range" min="-3" max="3" step="0.1" value={sl.val}
                      onChange={e => sl.set(Number(e.target.value))}
                      className="w-full appearance-none cursor-pointer rounded-full h-2"
                      style={{ background: `linear-gradient(to right, ${sl.color} 0%, ${sl.color} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`rounded-2xl px-4 py-3 border transition-all ${evals ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-bold mb-1">Eigenvalues</div>
            {evals
              ? <div className="font-mono font-black text-sm">λ₁ = {fmt(evals[0])}, λ₂ = {fmt(evals[1])}</div>
              : <div className="font-mono font-black text-sm">Complex — no real eigenvectors</div>
            }
            <div className="text-[10px] font-mono mt-1.5 opacity-70">tr = {trVal.toFixed(2)} · det = {detVal.toFixed(2)}</div>
          </div>
        </div>
      }
    >
      <EigenGrid M={animated} showEigen={!!evals} />
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.21 — Grand Summary
// ══════════════════════════════════════════════════════════

export const Scene5_21_GrandSummary: React.FC = () => {
  const cards = [
    { icon: '🎯', title: 'Eigenvector', body: 'A direction that only gets scaled by a matrix — never rotated. The "natural axis" of a transformation.', color: '#059669' },
    { icon: '🔢', title: 'Eigenvalue (λ)', body: 'The scale factor. λ > 1 stretches, 0 < λ < 1 squishes, λ < 0 flips, λ = 0 destroys the direction.', color: '#0284C7' },
    { icon: '📐', title: 'The Equation', body: 'M·v = λ·v. Applying the full matrix is identical to multiplying by one number λ.', color: '#7C3AED' },
    { icon: '🤖', title: 'In AI: PCA', body: 'Eigenvectors of covariance matrices find the directions of maximum variance. Used for compression, denoising, and visualization.', color: '#D97706' },
    { icon: '🌐', title: 'Google PageRank', body: "The internet's link matrix has one dominant eigenvector — the one every random surfer gravitates toward. That's PageRank.", color: '#E11D48' },
    { icon: '🔬', title: 'Symmetric Matrices', body: 'Always have real, perpendicular eigenvectors. ML uses symmetric covariance matrices specifically because of this guarantee.', color: '#10B981' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto gap-6">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-extrabold"
        >
          Intuition Mastered
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-black text-slate-800 mt-1"
        >
          The skeleton of every transformation.
        </motion.h1>
      </div>

      <div className="w-16 h-1.5 bg-gradient-to-r from-emerald-400 to-sky-500 rounded-full" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm"
          >
            <div className="text-2xl mb-2">{card.icon}</div>
            <div className="font-black text-slate-800 text-sm mb-1" style={{ color: card.color }}>{card.title}</div>
            <div className="text-slate-500 text-xs font-medium leading-relaxed">{card.body}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// CHAPTER 5 → CHAPTER 6: Next Hook
// ══════════════════════════════════════════════════════════

export const Scene5_22_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-sky-400/10 filter blur-[120px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 z-10"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
        className="text-6xl select-none"
      >
        🗜️
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-extrabold">Up Next · Chapter 6</span>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        You found the axes.<br />
        <span className="text-sky-500">Now compress along them.</span>
      </h1>

      <div className="w-16 h-1.5 bg-gradient-to-r from-sky-400 to-violet-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-slate-500 text-lg font-medium leading-relaxed max-w-md"
      >
        Eigenvectors give you the natural axes. SVD generalises this to any matrix — even non-square ones. It's the engine behind recommender systems, image compression, and LLM attention.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="flex items-center gap-4 mt-2"
      >
        {[['Singular Values', '#0284C7'], ['U · Σ · Vᵀ', '#7C3AED'], ['Low-Rank Approx', '#059669']].map(([label, color]) => (
          <div key={label} className="px-3 py-1.5 rounded-full border text-xs font-bold" style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
