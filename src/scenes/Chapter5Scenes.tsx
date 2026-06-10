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

// Helper: draw a labelled badge near a point
const VecLabel: React.FC<{ x: number; y: number; text: string; color: string; offsetX?: number; offsetY?: number }> =
  ({ x, y, text, color, offsetX = 8, offsetY = -10 }) => {
    const w = text.length * 6.5 + 10;
    const lx = x + offsetX, ly = y + offsetY;
    return (
      <g>
        <rect x={lx - 2} y={ly - 12} width={w} height={16} rx="4" fill="white" opacity="0.92" stroke={color} strokeWidth="1" />
        <text x={lx + w / 2 - 2} y={ly} textAnchor="middle" fill={color} fontSize="10" fontWeight="bold">{text}</text>
      </g>
    );
  };

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
    gridLines.push(
      <line key="hax" x1={cx - range * scale} y1={cy} x2={cx + range * scale} y2={cy} stroke="#e2e8f0" strokeWidth={1.5} />,
      <line key="vax" x1={cx} y1={cy - range * scale} x2={cx} y2={cy + range * scale} stroke="#e2e8f0" strokeWidth={1.5} />,
    );
  }

  // Axis tick numbers on the raw (pre-transform) grid
  const ticks = [-2, -1, 1, 2];
  const tickLabels = ticks.map(t => {
    const [rx] = raw(t, 0);
    const [, ry] = raw(0, t);
    return (
      <g key={`tick${t}`}>
        <text x={rx} y={cy + 16} textAnchor="middle" fill="#cbd5e1" fontSize="9">{t}</text>
        <text x={cx + 6} y={ry + 4} fill="#cbd5e1" fontSize="9">{t}</text>
      </g>
    );
  });

  const e1 = showBasisOnly ? raw(1, 0) : pt(1, 0);
  const e2 = showBasisOnly ? raw(0, 1) : pt(0, 1);
  const orgPt = origin;

  // Basis vector destination labels — show where [1,0] and [0,1] land
  const e1CoordX = fmt(M[0][0]), e1CoordY = fmt(M[1][0]);
  const e2CoordX = fmt(M[0][1]), e2CoordY = fmt(M[1][1]);

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
      const evLabel = `v=[${fmt(ev[0])},${fmt(ev[1])}] λ=${fmt(λ)}`;
      eigenArrows.push(
        <line key={`ev${i}pos`} x1={orgPt[0]} y1={orgPt[1]} x2={tip[0]} y2={tip[1]}
          stroke={col} strokeWidth="2.5" markerEnd={`url(#c5-${mk})`} strokeDasharray="6 3" />,
        <line key={`ev${i}neg`} x1={orgPt[0]} y1={orgPt[1]} x2={tipN[0]} y2={tipN[1]}
          stroke={col} strokeWidth="2.5" markerEnd={`url(#c5-${mk})`} strokeDasharray="6 3" />,
        <VecLabel key={`evlbl${i}`} x={tip[0]} y={tip[1]} text={evLabel} color={col} offsetX={8} offsetY={-12} />,
      );
    });
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {MARKER_DEFS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}
      {tickLabels}
      {!showBasisOnly && (
        <>
          <line x1={orgPt[0]} y1={orgPt[1]} x2={e1[0]} y2={e1[1]} stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#c5-red)" />
          <VecLabel x={e1[0]} y={e1[1]} text={`ê₁→[${e1CoordX},${e1CoordY}]`} color="#E11D48" />
          <line x1={orgPt[0]} y1={orgPt[1]} x2={e2[0]} y2={e2[1]} stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#c5-blue)" />
          <VecLabel x={e2[0]} y={e2[1]} text={`ê₂→[${e2CoordX},${e2CoordY}]`} color="#0284C7" />
        </>
      )}
      {highlightVecs.map((hv, i) => {
        const tip = showBasisOnly ? raw(hv.vec[0], hv.vec[1]) : pt(hv.vec[0], hv.vec[1]);
        const coordLabel = hv.label
          ? `${hv.label} [${fmt(hv.vec[0])},${fmt(hv.vec[1])}]`
          : `[${fmt(hv.vec[0])},${fmt(hv.vec[1])}]`;
        return (
          <g key={i}>
            <line x1={orgPt[0]} y1={orgPt[1]} x2={tip[0]} y2={tip[1]}
              stroke={hv.color} strokeWidth="3"
              markerEnd={`url(#c5-${hv.marker})`}
              strokeDasharray={hv.dashed ? '6 3' : undefined} />
            <VecLabel x={tip[0]} y={tip[1]} text={coordLabel} color={hv.color} offsetX={8} offsetY={hv.dashed ? -22 : -10} />
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
// SCENE 5.3b — Bridge: What Should We Look For?
// ══════════════════════════════════════════════════════════

export const Scene5_3b_Bridge: React.FC = () => {
  const [unlocked, setUnlocked] = useState<number[]>([]);
  const cards = [
    {
      icon: '🔍',
      q: 'We know matrices transform vectors. So what makes a vector "special"?',
      a: 'A vector is special if the matrix doesn\'t change its direction — only its length. Most vectors wobble and tilt. We\'re hunting for the ones that stay true.',
    },
    {
      icon: '📐',
      q: 'How would you test if a vector keeps its direction?',
      a: 'Apply the matrix to the vector. Then check: did the resulting vector point the same way? If M·v = k·v for some number k, direction is preserved — k just scales it.',
    },
    {
      icon: '🎯',
      q: 'Why does this matter — what\'s the payoff?',
      a: 'If M·v = λ·v, then applying the entire matrix is the same as multiplying by one number λ. That\'s extraordinary — a huge simplification. This is the whole point of eigenvectors.',
    },
  ];

  return (
    <SlideLayout
      title="Before We Test — What Are We Looking For?"
      text="We've seen the intuition. Before we run experiments, let's sharpen the question. Tap each card when you're ready."
    >
      <div className="flex flex-col gap-4 w-full max-w-xl mx-auto py-4">
        {cards.map((c, i) => {
          const open = unlocked.includes(i);
          return (
            <motion.button key={i} onClick={() => setUnlocked(u => open ? u.filter(x => x !== i) : [...u, i])}
              className="w-full text-left rounded-2xl border overflow-hidden transition-all cursor-pointer"
              style={{ borderColor: open ? '#7C3AED' : '#e2e8f0' }}>
              <div className={`px-5 py-4 flex items-center gap-3 ${open ? 'bg-violet-50' : 'bg-white'}`}>
                <span className="text-2xl">{c.icon}</span>
                <div className="flex-1 text-sm font-bold text-slate-700 leading-snug">{c.q}</div>
                <span className="text-slate-400 text-lg">{open ? '▲' : '▼'}</span>
              </div>
              <AnimatePresence>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="px-5 py-4 bg-violet-50 border-t border-violet-200 text-sm text-slate-600 leading-relaxed">
                      {c.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
        {unlocked.length === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 text-white rounded-2xl px-5 py-4 text-sm font-semibold text-center">
            ✓ Now we know exactly what to look for. Let's run the test.
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.4 — The Wobble Test: Watch Vectors Transform
// ══════════════════════════════════════════════════════════

export const Scene5_4_WobbleTest: React.FC = () => {
  // ── Editable matrix (defaults to [[3,1],[0,2]])
  const [matRaw, setMatRaw] = useState(['3', '1', '0', '2']);
  const matNum = matRaw.map(v => parseFloat(v) || 0);
  const M: Mat2 = [[matNum[0], matNum[1]], [matNum[2], matNum[3]]];

  // ── Vector input: preset or custom
  const [vecMode, setVecMode] = useState<'preset' | 'custom'>('preset');
  const [presetIdx, setPresetIdx] = useState(0);
  const [vecRaw, setVecRaw] = useState(['1', '0']);

  const presets: { label: string; vec: Vec2; color: string; marker: string }[] = [
    { label: '[1, 0]  →', vec: [1, 0],  color: '#E11D48', marker: 'red'    },
    { label: '[0, 1]  ↑', vec: [0, 1],  color: '#0284C7', marker: 'blue'   },
    { label: '[1, 1]  ↗', vec: [1, 1],  color: '#7C3AED', marker: 'violet' },
    { label: '[2, 1]',    vec: [2, 1],  color: '#D97706', marker: 'amber'  },
  ];

  const inputVec: Vec2 = vecMode === 'preset'
    ? presets[presetIdx].vec
    : [(parseFloat(vecRaw[0]) || 0), (parseFloat(vecRaw[1]) || 0)];
  const vecColor  = vecMode === 'preset' ? presets[presetIdx].color  : '#64748b';
  const vecMarker = vecMode === 'preset' ? presets[presetIdx].marker : 'slate';

  // ── Calculated result (only set after clicking "Calculate")
  const [result, setResult] = useState<{
    input: Vec2; output: Vec2; scale: number; rotDeg: number; isEigen: boolean;
  } | null>(null);

  const calculate = () => {
    const v = inputVec;
    if (mag(v) < 0.001) return; // zero vector — skip
    const out  = mulMV(M, v);
    const nI   = norm(v);
    const nO   = norm(out);
    const dot  = Math.min(1, Math.max(-1, nI[0]*nO[0] + nI[1]*nO[1]));
    const rot  = Math.acos(dot) * 180 / Math.PI;
    setResult({ input: v, output: out, scale: mag(out) / mag(v), rotDeg: rot, isEigen: rot < 1.5 });
  };

  // Reset result when inputs change
  const resetResult = () => setResult(null);

  // ── SVG geometry
  const W = 520, H = 520, CX = W / 2, CY = H / 2, SC = 82;
  const tp = (v: Vec2): [number, number] => [CX + v[0] * SC, CY - v[1] * SC];

  const inTip  = tp(inputVec);
  const outTip = result ? tp(result.output) : null;

  const nIn  = mag(inputVec) > 0.001 ? norm(inputVec) : [1, 0] as Vec2;
  const nOut = result ? norm(result.output) : nIn;

  // Arc for rotation
  const arcR    = 65;
  const aStart  = Math.atan2(-nIn[1], nIn[0]);
  const aEnd    = Math.atan2(-nOut[1], nOut[0]);
  let   arcSwp  = aEnd - aStart;
  if (arcSwp >  Math.PI) arcSwp -= 2 * Math.PI;
  if (arcSwp < -Math.PI) arcSwp += 2 * Math.PI;
  const arcLarge = Math.abs(arcSwp) > Math.PI ? 1 : 0;
  const arcFlag  = arcSwp > 0 ? 1 : 0;
  const ax1 = CX + arcR * Math.cos(aStart), ay1 = CY + arcR * Math.sin(aStart);
  const ax2 = CX + arcR * Math.cos(aEnd),   ay2 = CY + arcR * Math.sin(aEnd);
  const midA  = aStart + arcSwp / 2;
  const arcLX = CX + (arcR + 24) * Math.cos(midA);
  const arcLY = CY + (arcR + 24) * Math.sin(midA);

  // Faint direction rays
  const ray = 3.2;
  const rayIn:  [number, number] = [CX + nIn[0]  * SC * ray, CY - nIn[1]  * SC * ray];
  const rayOut: [number, number] = result ? [CX + nOut[0] * SC * ray, CY - nOut[1] * SC * ray] : rayIn;

  // ── Label helper: nudge label so it doesn't overlap origin or go off canvas
  const lOff = (tip: [number, number], extra = 0): [number, number] => {
    const dx = tip[0] - CX, dy = tip[1] - CY;
    return [dx >= 0 ? 10 + extra : -10 - extra, dy >= 0 ? 16 : -18];
  };

  // ── M·v step-by-step strings
  const [[a, b], [c, d]] = M;
  const [vx, vy] = inputVec;

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-5 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">

      {/* ════ CANVAS  65% ════ */}
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl shadow-inner overflow-hidden p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {MARKER_DEFS}
          <rect width={W} height={H} fill="white" rx="16" />

          {/* Grid */}
          {([-3,-2,-1,0,1,2,3] as number[]).map(i => {
            const ax = i === 0;
            return (
              <g key={i}>
                <line x1={CX+i*SC} y1={18} x2={CX+i*SC} y2={H-18}
                  stroke={ax ? '#94a3b8' : '#f1f5f9'} strokeWidth={ax ? 1.5 : 0.8} />
                <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC}
                  stroke={ax ? '#94a3b8' : '#f1f5f9'} strokeWidth={ax ? 1.5 : 0.8} />
                {i !== 0 && <>
                  <text x={CX+i*SC} y={CY+15} textAnchor="middle" fill="#cbd5e1" fontSize="9">{i}</text>
                  <text x={CX+7}    y={CY-i*SC+4} fill="#cbd5e1" fontSize="9">{i}</text>
                </>}
              </g>
            );
          })}

          {/* Input direction ray (faint) */}
          <line x1={CX} y1={CY} x2={rayIn[0]} y2={rayIn[1]}
            stroke={vecColor} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.2" />

          {/* Input arrow — always visible */}
          <line x1={CX} y1={CY} x2={inTip[0]} y2={inTip[1]}
            stroke={vecColor} strokeWidth="3.5" strokeDasharray="9 5"
            markerEnd={`url(#c5-${vecMarker})`} />
          {/* Input label */}
          {(() => {
            const [ox, oy] = lOff(inTip);
            const lx = inTip[0] + ox, ly = inTip[1] + oy - 14;
            const txt = `v = [${fmt(vx)}, ${fmt(vy)}]`;
            const w = txt.length * 6.2 + 10;
            return (
              <g>
                <rect x={lx - 2} y={ly - 13} width={w} height={17} rx="4" fill={vecColor} opacity="0.88" />
                <text x={lx + w/2 - 2} y={ly + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                <text x={lx} y={inTip[1] + oy + 2} fill={vecColor} fontSize="9" fontWeight="bold" opacity="0.65">INPUT</text>
              </g>
            );
          })()}

          {/* Output direction ray */}
          {result && (
            <line x1={CX} y1={CY} x2={rayOut[0]} y2={rayOut[1]}
              stroke={result.isEigen ? '#059669' : '#E11D48'} strokeWidth="0.8"
              strokeDasharray="5 4" opacity="0.2" />
          )}

          {/* Output arrow */}
          {result && outTip && (
            <motion.g key={`out-${result.input[0]}-${result.input[1]}-${M[0][0]}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={CX} y1={CY} x2={outTip[0]} y2={outTip[1]}
                stroke={result.isEigen ? '#059669' : '#E11D48'} strokeWidth="5"
                markerEnd={`url(#c5-${result.isEigen ? 'green' : 'red'})`} />
              {(() => {
                const [ox, oy] = lOff(outTip, 4);
                const lx = outTip[0] + ox, ly = outTip[1] + oy - 14;
                const txt = `M·v = [${fmt(result.output[0])}, ${fmt(result.output[1])}]`;
                const w = txt.length * 6.2 + 10;
                const col = result.isEigen ? '#059669' : '#E11D48';
                return (
                  <g>
                    <rect x={lx - 2} y={ly - 13} width={w} height={17} rx="4" fill={col} opacity="0.9" />
                    <text x={lx + w/2 - 2} y={ly + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                    <text x={lx} y={outTip[1] + oy + 2} fill={col} fontSize="9" fontWeight="bold" opacity="0.65">OUTPUT</text>
                  </g>
                );
              })()}
            </motion.g>
          )}

          {/* Rotation arc */}
          {result && !result.isEigen && (
            <motion.g key={`arc-${result.input[0]}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <path d={`M ${ax1} ${ay1} A ${arcR} ${arcR} 0 ${arcLarge} ${arcFlag} ${ax2} ${ay2}`}
                fill="none" stroke="#E11D48" strokeWidth="2.5" />
              <circle cx={ax2} cy={ay2} r="4" fill="#E11D48" />
              <rect x={arcLX - 26} y={arcLY - 12} width="52" height="17" rx="5" fill="#E11D48" />
              <text x={arcLX} y={arcLY + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                {result.rotDeg.toFixed(1)}° tilt
              </text>
            </motion.g>
          )}

          {/* Eigen confirmation */}
          {result?.isEigen && (
            <motion.g key="eigen-ok" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
              <circle cx={ax1} cy={ay1} r="11" fill="none" stroke="#059669" strokeWidth="2.5" />
              <rect x={CX - 84} y={32} width="168" height="40" rx="10" fill="#059669" />
              <text x={CX} y={49} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                ✓ Same direction — just scaled
              </text>
              <text x={CX} y={64} textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
                eigenvalue λ = {fmt(result.scale)}
              </text>
            </motion.g>
          )}

          {/* "Calculate first" prompt */}
          {!result && (
            <g>
              <rect x={CX - 100} y={32} width="200" height="30" rx="8" fill="#f1f5f9" />
              <text x={CX} y={52} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                Set inputs → click Calculate
              </text>
            </g>
          )}

          {/* Origin dot */}
          <circle cx={CX} cy={CY} r="5.5" fill="#0f172a" />
        </svg>
      </div>

      {/* ════ SIDEBAR  35% ════ */}
      <div className="flex-[35] min-w-0 flex flex-col gap-3 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-xl font-black text-slate-800 leading-tight mb-1">The Wobble Test</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Define a matrix and a vector. Calculate M·v. Did the direction change? That's the entire test.
          </p>
        </div>

        {/* ── Matrix editor */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Matrix M</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { idx: 0, label: 'a', sub: 'row1·col1' },
              { idx: 1, label: 'b', sub: 'row1·col2' },
              { idx: 2, label: 'c', sub: 'row2·col1' },
              { idx: 3, label: 'd', sub: 'row2·col2' },
            ].map(({ idx, label }) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-slate-400 font-bold pl-1">{label}</span>
                <input
                  type="number" step="0.5" value={matRaw[idx]}
                  onChange={e => { const v = [...matRaw]; v[idx] = e.target.value; setMatRaw(v); resetResult(); }}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-mono font-bold text-slate-800 text-center bg-slate-50 focus:outline-none focus:border-violet-400 focus:bg-white transition-all"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 text-[10px] font-mono text-slate-400 text-center">
            [[{fmt(matNum[0])}, {fmt(matNum[1])}], [{fmt(matNum[2])}, {fmt(matNum[3])}]]
          </div>
        </div>

        {/* ── Vector input */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Input Vector v</div>

          {/* Tab: presets vs custom */}
          <div className="flex rounded-lg overflow-hidden border border-slate-200 text-[11px] font-bold mb-2">
            {(['preset', 'custom'] as const).map(m => (
              <button key={m} onClick={() => { setVecMode(m); resetResult(); }}
                className={`flex-1 py-1.5 cursor-pointer transition-all ${vecMode === m ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                {m === 'preset' ? 'Presets' : 'Custom'}
              </button>
            ))}
          </div>

          {vecMode === 'preset' ? (
            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((p, i) => (
                <button key={i} onClick={() => { setPresetIdx(i); resetResult(); }}
                  className={`py-2 px-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer text-center ${
                    i === presetIdx ? 'border-slate-400 bg-white shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`} style={{ color: p.color }}>
                  {p.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {['x', 'y'].map((axis, ai) => (
                <div key={axis} className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold pl-1">v.{axis}</span>
                  <input type="number" step="0.5" value={vecRaw[ai]}
                    onChange={e => { const v = [...vecRaw]; v[ai] = e.target.value; setVecRaw(v); resetResult(); }}
                    className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-mono font-bold text-slate-800 text-center bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition-all"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 text-[10px] font-mono text-slate-400 text-center">
            v = [{fmt(vx)}, {fmt(vy)}]
          </div>
        </div>

        {/* ── Calculate button */}
        <button onClick={calculate}
          className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm cursor-pointer transition-all shadow-sm active:scale-95">
          Calculate M·v →
        </button>

        {/* ── Step-by-step calculation */}
        {result && (
          <motion.div key={`calc-${result.input[0]}-${result.output[0]}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">M·v step-by-step</div>
            <div className="font-mono text-[11px] flex flex-col gap-1.5 text-slate-700">
              <div>
                <span className="text-rose-500 font-bold">{fmt(a)}</span>×{fmt(vx)} + <span className="text-rose-500 font-bold">{fmt(b)}</span>×{fmt(vy)}
                <span className="text-slate-400"> = </span>
                <span className="font-black text-slate-900">{fmt(result.output[0])}</span>
              </div>
              <div>
                <span className="text-rose-500 font-bold">{fmt(c)}</span>×{fmt(vx)} + <span className="text-rose-500 font-bold">{fmt(d)}</span>×{fmt(vy)}
                <span className="text-slate-400"> = </span>
                <span className="font-black text-slate-900">{fmt(result.output[1])}</span>
              </div>
              <div className="pt-1 border-t border-slate-200 text-slate-500">
                [{fmt(vx)}, {fmt(vy)}] → [{fmt(result.output[0])}, {fmt(result.output[1])}]
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Verdict */}
        {result && (
          <motion.div key={`verdict-${result.input[0]}-${result.isEigen}`}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-3 border ${result.isEigen ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <div className={`font-black text-sm mb-1.5 ${result.isEigen ? 'text-emerald-700' : 'text-rose-600'}`}>
              {result.isEigen ? '✓ Eigenvector!' : '✗ Not an eigenvector'}
            </div>
            <div className="text-[11px] font-mono text-slate-600 flex flex-col gap-1">
              {result.isEigen ? (
                <>
                  <div>Direction: unchanged ✓</div>
                  <div>Scaled by <span className="font-black text-emerald-700">{fmt(result.scale)}×</span></div>
                  <div className="text-emerald-700 font-bold mt-0.5">λ = {fmt(result.scale)}</div>
                </>
              ) : (
                <>
                  <div>Direction tilted <span className="font-black text-rose-600">{result.rotDeg.toFixed(1)}°</span></div>
                  <div>Length scaled {fmt(result.scale)}×</div>
                  <div className="text-rose-500 mt-0.5">Not an eigenvector — try a different v</div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
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
// SCENE 5.6 — The Big Equation Revealed (with live proof)
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
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Left: equation reveal */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-6 shadow-inner gap-8">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-slate-400 text-xs font-mono uppercase tracking-widest font-bold">
          The Eigenvector Equation
        </motion.p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="px-6 py-3 bg-rose-50 border-2 border-rose-200 rounded-2xl text-4xl font-black text-rose-600 font-mono">
            M·v
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: step >= 1 ? 1 : 0 }}
            className="text-4xl font-black text-slate-400">=
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0.7 }}
            className="px-6 py-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl text-4xl font-black text-emerald-600 font-mono">
            λ·v
          </motion.div>
        </div>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-3 max-w-md w-full">
              {[
                { label: 'M', desc: 'The matrix (a transformation)', color: '#E11D48', bg: 'bg-rose-50', border: 'border-rose-200' },
                { label: 'v', desc: 'The eigenvector (special direction)', color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200' },
                { label: 'λ', desc: 'The eigenvalue (how much it scales)', color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200' },
                { label: 'M·v = λ·v', desc: 'Matrix = just a number ×', color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200' },
              ].map(item => (
                <div key={item.label} className={`${item.bg} border ${item.border} rounded-xl p-3`}>
                  <div className="font-mono font-black text-base mb-1" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-slate-600 text-xs font-medium">{item.desc}</div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: live numerical proof */}
      <div className="w-full lg:w-[280px] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2">Prove It With Numbers</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Watch both sides equal the same result — that's what makes v an eigenvector.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-3">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">The Matrix & Vector</div>
          <div className="font-mono text-xs flex flex-col gap-1">
            <div className="flex gap-2">
              <span className="text-slate-400">M =</span>
              <span className="text-rose-600 font-bold">[[3, 1], [0, 2]]</span>
            </div>
            <div className="flex gap-2">
              <span className="text-slate-400">v =</span>
              <span className="text-violet-600 font-bold">[1, 0]</span>
            </div>
            <div className="flex gap-2">
              <span className="text-slate-400">λ =</span>
              <span className="text-emerald-600 font-bold">3</span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {step >= 1 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              className="bg-rose-50 border border-rose-200 rounded-2xl p-4 shadow-sm">
              <div className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold mb-2">Left side: M·v</div>
              <div className="font-mono text-xs text-slate-600 flex flex-col gap-1">
                <div>row 1: 3×1 + 1×0 = <span className="font-black text-rose-600">3</span></div>
                <div>row 2: 0×1 + 2×0 = <span className="font-black text-rose-600">0</span></div>
              </div>
              <div className="mt-2 text-lg font-black text-rose-600 font-mono">M·v = [3, 0]</div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 2 && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shadow-sm">
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-bold mb-2">Right side: λ·v</div>
              <div className="font-mono text-xs text-slate-600">3 × [1, 0] = <span className="font-black text-emerald-600">[3, 0]</span></div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {step >= 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 rounded-2xl p-4 text-center">
              <div className="text-white font-black text-base mb-1">✓ Both sides = [3, 0]</div>
              <div className="text-slate-400 text-xs font-medium">v = [1, 0] is an eigenvector of M with λ = 3</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.7 — Think: What Does λ Tell You? (merged with 5.5)
// ══════════════════════════════════════════════════════════

export const Scene5_7_WhatIsLambda: React.FC = () => (
  <QuestionSlide
    emoji="🔢"
    question="You found that v = [1, 0] is an eigenvector with λ = 3. What does that mean visually, numerically, and physically?"
    hint="Visually: the arrow just gets 3× longer, never tilts. Numerically: M·v = 3·v = [3,0]. The whole matrix collapsed to one multiplication."
    subHint="Now think: what if λ = −1? The vector flips direction but stays the same length — like a mirror. What if λ = 0? The vector shrinks to the origin — that direction is destroyed forever."
  />
);

// ══════════════════════════════════════════════════════════
// SCENE 5.8 — Eigenvalue Explorer
// ══════════════════════════════════════════════════════════

export const Scene5_8_EigenvalueExplorer: React.FC = () => {
  const [λ, setLambda] = useState(2.0);
  const M: Mat2 = [[λ, 0], [0, 1]];
  const ev: Vec2 = [1, 0];
  const transformed = mulMV(M, ev);

  const description = λ > 1 ? 'stretched' : λ > 0 ? 'squished' : λ === 0 ? 'collapsed to zero' : 'flipped & scaled';
  const descColor = λ > 1 ? 'text-emerald-700' : λ > 0 ? 'text-amber-700' : λ === 0 ? 'text-rose-700' : 'text-violet-700';
  const pct = ((λ + 3) / 6) * 100;

  // Before / after SVG
  const W = 440, H = 440, CX = W / 2, CY = H / 2, SC = 80;
  const beforeTip: [number, number] = [CX + ev[0] * SC, CY - ev[1] * SC];
  const afterTip: [number, number] = [CX + transformed[0] * SC, CY - transformed[1] * SC];
  const badgeColor = λ > 1 ? '#059669' : λ > 0 ? '#D97706' : λ === 0 ? '#E11D48' : '#7C3AED';

  return (
    <SlideLayout
      title="Feel the Eigenvalue"
      text="Drag λ and watch what happens to v = [1,0]. The dashed arrow is the 'before'. The solid arrow is 'after' M is applied. Same direction — just scaled by λ."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Eigenvalue λ</span>
              <span className="text-2xl font-black font-mono text-emerald-600">{λ.toFixed(1)}</span>
            </div>
            <input type="range" min="-3" max="3" step="0.1" value={λ}
              onChange={e => setLambda(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2"
              style={{ background: `linear-gradient(to right, #10B981 0%, #10B981 ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }} />
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
              <span>−3</span><span>0</span><span>+3</span>
            </div>
          </div>

          <div className={`rounded-xl p-3 border text-sm font-bold transition-all ${descColor} ${
            λ > 1 ? 'bg-emerald-50 border-emerald-200' :
            λ > 0 ? 'bg-amber-50 border-amber-200' :
            λ === 0 ? 'bg-rose-50 border-rose-200' : 'bg-violet-50 border-violet-200'}`}>
            eigenvector is <span className="underline">{description}</span>
          </div>

          {[
            { label: 'v (before)', val: `[${ev[0]}, ${ev[1]}]`, color: '#94a3b8' },
            { label: 'M · v (after)', val: `[${fmt(transformed[0])}, ${fmt(transformed[1])}]`, color: '#059669' },
            { label: 'λ · v', val: `[${fmt(λ * ev[0])}, ${fmt(λ * ev[1])}]`, color: '#7C3AED' },
          ].map(row => (
            <div key={row.label} className="flex justify-between items-center px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold">
              <span className="text-slate-500">{row.label}</span>
              <span style={{ color: row.color }}>{row.val}</span>
            </div>
          ))}
          <div className="text-[11px] text-slate-400 font-medium text-center">M·v and λ·v are always identical — that's the whole point!</div>
        </div>
      }
    >
      {/* Custom before/after SVG */}
      <div className="w-full h-full flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {MARKER_DEFS}
          <rect width={W} height={H} fill="white" rx="16" />
          {[-3,-2,-1,0,1,2,3].map(i => {
            const isAxis = i === 0;
            return (
              <g key={i}>
                <line x1={CX + i*SC} y1={CY - 3*SC} x2={CX + i*SC} y2={CY + 3*SC}
                  stroke={isAxis ? '#94a3b8' : '#f1f5f9'} strokeWidth={isAxis ? 1.5 : 0.8} />
                <line x1={CX - 3*SC} y1={CY - i*SC} x2={CX + 3*SC} y2={CY - i*SC}
                  stroke={isAxis ? '#94a3b8' : '#f1f5f9'} strokeWidth={isAxis ? 1.5 : 0.8} />
                {i !== 0 && <text x={CX + i*SC} y={CY + 16} textAnchor="middle" fill="#cbd5e1" fontSize="9">{i}</text>}
                {i !== 0 && <text x={CX + 6} y={CY - i*SC + 4} fill="#cbd5e1" fontSize="9">{i}</text>}
              </g>
            );
          })}
          {/* Before arrow — dashed grey */}
          <line x1={CX} y1={CY} x2={beforeTip[0]} y2={beforeTip[1]}
            stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="6 3" markerEnd="url(#c5-slate)" />
          <VecLabel x={beforeTip[0]} y={beforeTip[1]} text={`v = [${ev[0]},${ev[1]}]`}
            color="#94a3b8" offsetX={8} offsetY={-24} />
          {/* After arrow — solid colored */}
          {λ !== 0 && (
            <>
              <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                stroke={badgeColor} strokeWidth="3.5" markerEnd={`url(#c5-${λ > 0 ? 'green' : 'violet'})`} />
              <VecLabel x={afterTip[0]} y={afterTip[1]}
                text={`M·v = [${fmt(transformed[0])},${fmt(transformed[1])}]`}
                color={badgeColor} offsetX={8} offsetY={-10} />
            </>
          )}
          {/* Badge: λ·v equation */}
          <rect x={8} y={8} width={165} height={38} rx="8" fill={badgeColor} opacity="0.9" />
          <text x={90} y={23} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
            M·v = λ·v
          </text>
          <text x={90} y={37} textAnchor="middle" fill="white" fontSize="10" opacity="0.85">
            = {λ.toFixed(1)} × [1,0] = [{fmt(transformed[0])},{fmt(transformed[1])}]
          </text>
          <circle cx={CX} cy={CY} r="5" fill="#0f172a" />
        </svg>
      </div>
    </SlideLayout>
  );
};

// ══════════════════════════════════════════════════════════
// SCENE 5.9 — The Geometric Picture
// ══════════════════════════════════════════════════════════

export const Scene5_9_GeometricPicture: React.FC = () => {
  const presets: {
    name: string; desc: string; M: Mat2;
    evecs: { vec: Vec2; label: string; color: string; marker: string; λ: number }[];
    hasReal: boolean; noEigenNote?: string;
  }[] = [
    {
      name: 'Stretch X',
      desc: 'Stretches rightward by 3×, leaves upward unchanged.',
      M: [[3, 0], [0, 1]],
      hasReal: true,
      evecs: [
        { vec: [1, 0], label: '→ [1,0]', color: '#E11D48', marker: 'red',   λ: 3 },
        { vec: [0, 1], label: '↑ [0,1]', color: '#0284C7', marker: 'blue',  λ: 1 },
      ],
    },
    {
      name: 'Scale Both',
      desc: 'Scales every direction equally by 2×. Every vector is an eigenvector!',
      M: [[2, 0], [0, 2]],
      hasReal: true,
      evecs: [
        { vec: [1, 0], label: '→',        color: '#E11D48', marker: 'red',    λ: 2 },
        { vec: [0, 1], label: '↑',        color: '#0284C7', marker: 'blue',   λ: 2 },
        { vec: [1, 1], label: '↗',        color: '#7C3AED', marker: 'violet', λ: 2 },
      ],
    },
    {
      name: 'Shear',
      desc: 'Shoves everything rightward. Only the horizontal direction survives unchanged.',
      M: [[1, 1], [0, 1]],
      hasReal: true,
      evecs: [
        { vec: [1, 0], label: '→ [1,0]', color: '#E11D48', marker: 'red', λ: 1 },
      ],
    },
    {
      name: 'Rotation 45°',
      desc: 'Spins everything 45°. No real direction survives — every vector tilts.',
      M: [[0.71, -0.71], [0.71, 0.71]],
      hasReal: false,
      noEigenNote: 'Pure rotation spins all vectors. No real eigenvectors exist.',
      evecs: [],
    },
  ];

  const [active, setActive]     = useState(0);
  const [shown, setShown]       = useState<number[]>([]);  // which eigenvectors to show
  const [showOutput, setShowOutput] = useState(false);

  const p = presets[active];
  const animated = useAnimatedMatrix(p.M, 600);

  // Reset when switching preset
  const switchPreset = (i: number) => { setActive(i); setShown([]); setShowOutput(false); };
  const toggleVec = (i: number) => {
    setShown(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
    setShowOutput(false);
  };

  // SVG geometry
  const W = 500, H = 500, CX = W / 2, CY = H / 2, SC = 82;
  const tp  = (v: Vec2): [number, number] => [CX + v[0] * SC, CY - v[1] * SC];
  const tpM = (v: Vec2): [number, number] => {
    const out = mulMV(animated, v);
    return [CX + out[0] * SC, CY - out[1] * SC];
  };

  // Non-eigen test vector
  const testVec: Vec2 = [0.6, 0.8]; // unit-ish vector that's clearly not an eigenvector for most presets
  const testOut  = mulMV(p.M, testVec);
  const testNI   = norm(testVec), testNO = norm(testOut);
  const testDot  = Math.min(1, Math.max(-1, testNI[0]*testNO[0] + testNI[1]*testNO[1]));
  const testRot  = Math.acos(testDot) * 180 / Math.PI;

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-5 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">

      {/* ════ CANVAS  65% ════ */}
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl shadow-inner overflow-hidden p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {MARKER_DEFS}
          <rect width={W} height={H} fill="white" rx="16" />

          {/* Grid */}
          {([-3,-2,-1,0,1,2,3] as number[]).map(i => {
            const ax = i === 0;
            return (
              <g key={i}>
                <line x1={CX+i*SC} y1={18} x2={CX+i*SC} y2={H-18}
                  stroke={ax ? '#94a3b8' : '#f1f5f9'} strokeWidth={ax ? 1.5 : 0.8} />
                <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC}
                  stroke={ax ? '#94a3b8' : '#f1f5f9'} strokeWidth={ax ? 1.5 : 0.8} />
                {i !== 0 && <>
                  <text x={CX+i*SC} y={CY+15} textAnchor="middle" fill="#e2e8f0" fontSize="9">{i}</text>
                  <text x={CX+7}    y={CY-i*SC+4} fill="#e2e8f0" fontSize="9">{i}</text>
                </>}
              </g>
            );
          })}

          {/* ─ For each toggled eigenvector: show before (dashed) + after (solid) ─ */}
          {p.evecs.map((ev, i) => {
            if (!shown.includes(i)) return null;
            const beforeTip = tp(ev.vec);
            const afterTip  = showOutput ? tpM(ev.vec) : beforeTip;
            const scaled    = mulMV(p.M, ev.vec);
            const nx = CX + ev.vec[0] * SC * 3.2, ny = CY - ev.vec[1] * SC * 3.2; // direction ray

            return (
              <g key={i}>
                {/* Direction ray */}
                <line x1={CX} y1={CY} x2={nx} y2={ny}
                  stroke={ev.color} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.15" />
                {/* Before arrow — dashed */}
                <line x1={CX} y1={CY} x2={beforeTip[0]} y2={beforeTip[1]}
                  stroke={ev.color} strokeWidth="3" strokeDasharray="8 4"
                  markerEnd={`url(#c5-${ev.marker})`} />
                <text x={beforeTip[0] + (ev.vec[0] >= 0 ? 8 : -8)} y={beforeTip[1] - 14}
                  fill={ev.color} fontSize="10" fontWeight="bold"
                  textAnchor={ev.vec[0] >= 0 ? 'start' : 'end'}>
                  [{fmt(ev.vec[0])},{fmt(ev.vec[1])}]
                </text>
                {/* After arrow — solid, animates to scaled position */}
                {showOutput && (
                  <motion.g key={`after-${i}-${active}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <line x1={CX} y1={CY} x2={afterTip[0]} y2={afterTip[1]}
                      stroke={ev.color} strokeWidth="5"
                      markerEnd={`url(#c5-${ev.marker})`} />
                    {/* "× λ" badge on after tip */}
                    {(() => {
                      const bx = afterTip[0] + (scaled[0] >= 0 ? 10 : -10);
                      const by = afterTip[1] + (scaled[1] <= 0 ? -16 : 10);
                      const txt = `×${fmt(ev.λ)} = [${fmt(scaled[0])},${fmt(scaled[1])}]`;
                      const w = txt.length * 5.8 + 10;
                      return (
                        <g>
                          <rect x={bx - 2} y={by - 13} width={w} height={17} rx="4"
                            fill={ev.color} opacity="0.9" />
                          <text x={bx + w/2 - 2} y={by + 1} textAnchor="middle"
                            fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                        </g>
                      );
                    })()}
                    {/* "✓ same direction" whisper */}
                    <text x={CX + ev.vec[0] * SC * 1.5 + 6}
                          y={CY - ev.vec[1] * SC * 1.5 + 4}
                      fill={ev.color} fontSize="9" opacity="0.6" fontWeight="bold">✓ same dir</text>
                  </motion.g>
                )}
              </g>
            );
          })}

          {/* ─ Rotation case: show a test vector wobbling ─ */}
          {!p.hasReal && shown.includes(99) && (
            <g>
              {(() => {
                const bTip = tp(testVec);
                const aTip = showOutput ? tpM(testVec) : bTip;
                const outV = mulMV(p.M, testVec);

                // Rotation arc
                const arcR = 55;
                const aS = Math.atan2(-testVec[1], testVec[0]);
                const aE = Math.atan2(-outV[1], outV[0]);
                let sw = aE - aS; if (sw > Math.PI) sw -= 2*Math.PI; if (sw < -Math.PI) sw += 2*Math.PI;
                const ax1r = CX + arcR * Math.cos(aS), ay1r = CY + arcR * Math.sin(aS);
                const ax2r = CX + arcR * Math.cos(aE), ay2r = CY + arcR * Math.sin(aE);
                const midA = aS + sw / 2;
                const arcLX2 = CX + (arcR + 22) * Math.cos(midA);
                const arcLY2 = CY + (arcR + 22) * Math.sin(midA);

                return (
                  <>
                    <line x1={CX} y1={CY} x2={bTip[0]} y2={bTip[1]}
                      stroke="#94a3b8" strokeWidth="3" strokeDasharray="8 4" markerEnd="url(#c5-slate)" />
                    <text x={bTip[0] + 8} y={bTip[1] - 14} fill="#94a3b8" fontSize="10" fontWeight="bold">
                      [{fmt(testVec[0])},{fmt(testVec[1])}]
                    </text>
                    {showOutput && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <line x1={CX} y1={CY} x2={aTip[0]} y2={aTip[1]}
                          stroke="#E11D48" strokeWidth="5" markerEnd="url(#c5-red)" />
                        <text x={aTip[0] + 8} y={aTip[1] - 14} fill="#E11D48" fontSize="10" fontWeight="bold">
                          [{fmt(outV[0])},{fmt(outV[1])}]
                        </text>
                        <path d={`M ${ax1r} ${ay1r} A ${arcR} ${arcR} 0 0 ${sw > 0 ? 1 : 0} ${ax2r} ${ay2r}`}
                          fill="none" stroke="#E11D48" strokeWidth="2.5" />
                        <circle cx={ax2r} cy={ay2r} r="4" fill="#E11D48" />
                        <rect x={arcLX2 - 26} y={arcLY2 - 12} width="52" height="17" rx="5" fill="#E11D48" />
                        <text x={arcLX2} y={arcLY2 + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                          {testRot.toFixed(0)}° tilt
                        </text>
                      </motion.g>
                    )}
                  </>
                );
              })()}
            </g>
          )}

          {/* No-eigen overlay for rotation */}
          {!p.hasReal && shown.length === 0 && (
            <g>
              <rect x={CX - 120} y={CY - 22} width="240" height="44" rx="10" fill="#FEF3C7" />
              <text x={CX} y={CY - 5} textAnchor="middle" fill="#D97706" fontSize="11" fontWeight="bold">
                Every vector rotates 45°
              </text>
              <text x={CX} y={CY + 12} textAnchor="middle" fill="#D97706" fontSize="10">
                No direction survives unchanged
              </text>
            </g>
          )}

          {/* Origin dot */}
          <circle cx={CX} cy={CY} r="5.5" fill="#0f172a" />
        </svg>
      </div>

      {/* ════ SIDEBAR  35% ════ */}
      <div className="flex-[35] min-w-0 flex flex-col gap-3 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-xl font-black text-slate-800 leading-tight mb-1">Seeing Eigenvectors</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pick a matrix, select a direction to test, then apply M to see if it keeps pointing the same way.
          </p>
        </div>

        {/* Preset picker */}
        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Choose a matrix</div>
          {presets.map((pr, i) => (
            <button key={i} onClick={() => switchPreset(i)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                i === active
                  ? 'bg-slate-800 border-slate-800 text-white'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}>
              <div className="font-black text-sm">{pr.name}</div>
              <div className={`text-[10px] font-normal mt-0.5 ${i === active ? 'text-slate-300' : 'text-slate-400'}`}>{pr.desc}</div>
            </button>
          ))}
        </div>

        {/* Vector selection */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
            {p.hasReal ? 'Select a direction to test' : 'Test any direction'}
          </div>

          {p.hasReal ? (
            <div className="flex flex-col gap-1.5">
              {p.evecs.map((ev, i) => (
                <button key={i} onClick={() => toggleVec(i)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    shown.includes(i) ? 'bg-white border-slate-300 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`}>
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ background: ev.color }} />
                  <span style={{ color: ev.color }}>{ev.label}</span>
                  <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">eigen  λ={fmt(ev.λ)}</span>
                </button>
              ))}
            </div>
          ) : (
            <button onClick={() => { setShown([99]); setShowOutput(false); }}
              className="w-full px-3 py-2 rounded-xl border bg-slate-50 border-slate-200 hover:bg-white text-xs font-bold text-slate-600 cursor-pointer transition-all">
              Show a test vector →
            </button>
          )}
        </div>

        {/* Apply / reset */}
        {shown.length > 0 && (
          <div className="flex gap-2">
            <button onClick={() => setShowOutput(true)}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs cursor-pointer transition-all">
              Apply M →
            </button>
            <button onClick={() => { setShown([]); setShowOutput(false); }}
              className="px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs cursor-pointer transition-all">
              Reset
            </button>
          </div>
        )}

        {/* Result explanation */}
        {showOutput && shown.length > 0 && (
          <motion.div key={`result-${active}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {p.hasReal ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3">
                <div className="font-black text-sm text-emerald-700 mb-1.5">✓ Direction preserved!</div>
                <div className="text-[11px] text-slate-600 flex flex-col gap-1">
                  {shown.map(i => {
                    const ev = p.evecs[i];
                    const out = mulMV(p.M, ev.vec);
                    return (
                      <div key={i} className="font-mono">
                        <span style={{ color: ev.color }}>[{fmt(ev.vec[0])},{fmt(ev.vec[1])}]</span>
                        <span className="text-slate-400"> → </span>
                        <span className="font-bold">[{fmt(out[0])},{fmt(out[1])}]</span>
                        <span className="text-emerald-600 font-bold"> = {fmt(ev.λ)}×</span>
                      </div>
                    );
                  })}
                  <div className="text-emerald-700 font-bold mt-1 text-[10px]">
                    Same direction, just scaled by λ. That's the definition of an eigenvector.
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3">
                <div className="font-black text-sm text-rose-700 mb-1.5">✗ Direction changed by {testRot.toFixed(0)}°</div>
                <div className="text-[11px] text-slate-600">
                  For a pure rotation, every vector gets spun. There's no real direction that can survive — no real eigenvectors.
                </div>
                <div className="text-rose-600 font-bold text-[11px] mt-1.5">
                  Eigenvectors exist only in the complex numbers for rotations.
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
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
