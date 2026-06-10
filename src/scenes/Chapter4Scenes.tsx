import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../components/Math';

// ═══════════════════════════════════════════════════════════════
// Types & Math Helpers
// ═══════════════════════════════════════════════════════════════

type Mat2 = [[number, number], [number, number]];
const IDENTITY: Mat2 = [[1, 0], [0, 1]];

const mulMV = (M: Mat2, v: [number, number]): [number, number] => [
  M[0][0] * v[0] + M[0][1] * v[1],
  M[1][0] * v[0] + M[1][1] * v[1],
];

const mulMM = (A: Mat2, B: Mat2): Mat2 => [
  [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
  [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
];

const lerpMat = (A: Mat2, B: Mat2, t: number): Mat2 => [
  [A[0][0] + (B[0][0] - A[0][0]) * t, A[0][1] + (B[0][1] - A[0][1]) * t],
  [A[1][0] + (B[1][0] - A[1][0]) * t, A[1][1] + (B[1][1] - A[1][1]) * t],
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function fmt(n: number): string {
  return String(parseFloat(n.toFixed(2)));
}

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

// ═══════════════════════════════════════════════════════════════
// Shared Layout Components
// ═══════════════════════════════════════════════════════════════

/** Visual-first layout: big animated grid left, thin text sidebar right */
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
    <div className="w-full lg:w-[280px] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
      <div>
        <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-base leading-relaxed">{text}</p>
      </div>
      {sidebarContent}
    </div>
  </div>
);

/**
 * Question slide — full-screen, minimal UI.
 * Give the learner space to think before revealing the answer.
 */
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
// TransformGrid — warped 2D coordinate grid (large by default)
// ═══════════════════════════════════════════════════════════════

const MARKER_DEFS = (
  <defs>
    {([
      ['red', '#E11D48'], ['blue', '#0284C7'], ['green', '#059669'],
      ['slate', '#64748B'], ['violet', '#7C3AED'], ['amber', '#D97706'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`g4-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

const TransformGrid: React.FC<{
  M: Mat2;
  highlightVec?: [number, number] | null;
  showOriginalVec?: boolean;
  extraVec?: { vec: [number, number]; color: string; marker: string; label?: string } | null;
  width?: number;
  height?: number;
  scale?: number;
  range?: number;
}> = ({
  M, highlightVec = null, showOriginalVec = false, extraVec = null,
  width = 480, height = 480, scale = 68, range = 3,
}) => {
  const cx = width / 2, cy = height / 2;

  const pt = (x: number, y: number): [number, number] => {
    const [tx, ty] = mulMV(M, [x, y]);
    return [cx + tx * scale, cy - ty * scale];
  };
  const rawPt = (x: number, y: number): [number, number] => [cx + x * scale, cy - y * scale];

  const origin = pt(0, 0);
  const lines: React.ReactNode[] = [];

  for (let i = -range; i <= range; i++) {
    const h0 = pt(-range, i), h1 = pt(range, i);
    const v0 = pt(i, -range), v1 = pt(i, range);
    const isAxis = i === 0;
    lines.push(
      <line key={`h${i}`} x1={h0[0]} y1={h0[1]} x2={h1[0]} y2={h1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
      <line key={`v${i}`} x1={v0[0]} y1={v0[1]} x2={v1[0]} y2={v1[1]}
        stroke={isAxis ? '#94a3b8' : '#e2e8f0'} strokeWidth={isAxis ? 1.5 : 0.8} />,
    );
  }

  const e1 = pt(1, 0);
  const e2 = pt(0, 1);
  const hv = highlightVec ? pt(highlightVec[0], highlightVec[1]) : null;
  const hvRaw = (highlightVec && showOriginalVec) ? rawPt(highlightVec[0], highlightVec[1]) : null;
  const ev = extraVec ? pt(extraVec.vec[0], extraVec.vec[1]) : null;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {MARKER_DEFS}
      <rect width={width} height={height} fill="white" rx="16" />
      {lines}
      <line x1={origin[0]} y1={origin[1]} x2={e1[0]} y2={e1[1]}
        stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#g4-red)" />
      <line x1={origin[0]} y1={origin[1]} x2={e2[0]} y2={e2[1]}
        stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#g4-blue)" />
      {hvRaw && (
        <line x1={origin[0]} y1={origin[1]} x2={hvRaw[0]} y2={hvRaw[1]}
          stroke="#cbd5e1" strokeWidth="2" strokeDasharray="5 3" markerEnd="url(#g4-slate)" />
      )}
      {hv && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={hv[0]} y2={hv[1]}
            stroke="#059669" strokeWidth="3" markerEnd="url(#g4-green)" />
          {highlightVec && (
            <text x={hv[0] + 8} y={hv[1] - 6} fill="#059669" fontSize="13" fontWeight="bold">
              [{fmt(highlightVec[0])}, {fmt(highlightVec[1])}]
            </text>
          )}
        </>
      )}
      {ev && extraVec && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={ev[0]} y2={ev[1]}
            stroke={extraVec.color} strokeWidth="3" markerEnd={`url(#g4-${extraVec.marker})`} />
          {extraVec.label && (
            <text x={ev[0] + 8} y={ev[1] - 6} fill={extraVec.color} fontSize="13" fontWeight="bold">
              {extraVec.label}
            </text>
          )}
        </>
      )}
      <circle cx={origin[0]} cy={origin[1]} r="4.5" fill="#0f172a" />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.1 — Curiosity Hook
// ═══════════════════════════════════════════════════════════════

export const Scene4_1_WarpCuriosity: React.FC = () => {
  const items = [
    { text: 'Stretch.', color: 'text-transformations' },
    { text: 'Rotate.', color: 'text-vector' },
    { text: 'Squish.', color: 'text-similarity' },
    { text: 'Bend.', color: 'text-loss' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
      >
        What can you do to space itself?
      </motion.p>

      <div className="flex flex-col gap-4 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.5, duration: 0.7, ease: 'easeOut' }}
            className={`text-5xl md:text-7xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="border-t border-slate-200 pt-8 max-w-xl"
      >
        <p className="text-slate-400 text-lg font-medium mb-2">All of these are controlled by</p>
        <p className="text-transformations text-3xl md:text-4xl font-black">a single mathematical object.</p>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.2 — Question: What Actually Happens?
// ═══════════════════════════════════════════════════════════════

export const Scene4_2_WhatHappens: React.FC = () => (
  <QuestionSlide
    emoji="🗺️"
    question="When you zoom into Google Maps, what happens to the coordinates?"
    hint="Every single point on the map gets pushed outward — further from where you tapped."
    subHint="The coordinates themselves change. That's a transformation: a rule that moves every point in space."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 4.3 — Real-World Transformations
// ═══════════════════════════════════════════════════════════════

export const Scene4_3_RealWorldTransforms: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      label: 'Google Maps Zoom',
      icon: '🗺️',
      analogy: 'Zoom in — every coordinate gets multiplied by the same factor. A café 100m away now appears 200m away on screen.',
      M: [[2, 0], [0, 2]] as Mat2,
      tag: 'Scale',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
    },
    {
      label: 'Tilting Your Phone',
      icon: '📱',
      analogy: 'Rotate your phone 90° and the screen snaps to match. Every pixel rotates to a new position.',
      M: [[0, -1], [1, 0]] as Mat2,
      tag: 'Rotation',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
    },
    {
      label: 'Italic Text',
      icon: '✍️',
      analogy: "Making text italic doesn't change its size — it tilts every character sideways. That tilt is a shear.",
      M: [[1, 0.7], [0, 1]] as Mat2,
      tag: 'Shear',
      tagColor: 'bg-amber-50 border-amber-200 text-amber-700',
    },
  ];

  const ex = examples[active];
  const animated = useAnimatedMatrix(ex.M, 700);

  return (
    <SlideLayout
      title="Transformations Are Everywhere"
      text="You use transformations every day without realising it. Each one is just a rule: take every point in space, apply the rule, get a new point."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                active === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="mr-2">{e.icon}</span>
              <span className="font-bold text-sm">{e.label}</span>
              <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                active === i ? 'bg-white/20 border-white/20 text-white' : e.tagColor
              }`}>
                {e.tag}
              </span>
            </button>
          ))}
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed">
            {ex.analogy}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.4 — Scale: Your First Transformation
// ═══════════════════════════════════════════════════════════════

export const Scene4_4_ScaleTransform: React.FC = () => {
  const [scale, setScale] = useState(1.0);
  const M: Mat2 = [[scale, 0], [0, scale]];
  const animated = useAnimatedMatrix(M, 80);

  return (
    <SlideLayout
      title="Stretch & Shrink"
      text="The simplest transformation: multiply every point's coordinates by the same number. Drag the slider and watch every grid line move."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Scale factor</span>
              <span className="text-transformations text-base">{scale.toFixed(1)}×</span>
            </div>
            <input
              type="range" min="0.3" max="2.5" step="0.1" value={scale}
              onChange={e => setScale(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0.3× (shrink)</span><span>1×</span><span>2.5× (grow)</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">What happens to a point</div>
            <div className="flex flex-col gap-1 text-slate-700 font-bold">
              <span>(x, y)</span>
              <span className="text-slate-400 text-xs">↓ multiply both by {scale.toFixed(1)}</span>
              <span className="text-transformations">({scale.toFixed(1)}x, {scale.toFixed(1)}y)</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            {scale < 0.99
              ? '📉 Shrinking — points get closer to the center.'
              : scale > 1.01
              ? '📈 Growing — points get pushed away from the center.'
              : '⚖️ Identity — nothing changes at all.'}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.5 — Question: How Would You Rotate?
// ═══════════════════════════════════════════════════════════════

export const Scene4_5_HowToRotate: React.FC = () => (
  <QuestionSlide
    emoji="🔄"
    question="Scaling just multiplied both coordinates by the same number. How do you think rotation would work?"
    hint="You'd need to sweep each point in a circle around the center, without changing how far it is from the origin."
    subHint="Hint: to create circular motion, the new x and new y both need to use a mix of the old x and old y."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 4.6 — Rotation
// ═══════════════════════════════════════════════════════════════

export const Scene4_6_RotationTransform: React.FC = () => {
  const [deg, setDeg] = useState(0);
  const rad = (deg * Math.PI) / 180;
  const M: Mat2 = [
    [Math.cos(rad), -Math.sin(rad)],
    [Math.sin(rad),  Math.cos(rad)],
  ];
  const animated = useAnimatedMatrix(M, 80);

  return (
    <SlideLayout
      title="Spinning Space"
      text="Rotation sweeps every point around the origin by the same angle. The distance from the center never changes — only the direction."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Rotation angle</span>
              <span className="text-vector text-base">{deg}°</span>
            </div>
            <input
              type="range" min="0" max="360" step="1" value={deg}
              onChange={e => setDeg(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0°</span><span>180°</span><span>360°</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-600 leading-relaxed">
            <div className="font-bold text-slate-700 mb-1">Real-world feel</div>
            {deg === 0 ? '— No rotation yet' :
             deg <= 45 ? '↻ A gentle tilt, like a slightly crooked photo' :
             deg <= 90 ? '↻ 90° — like rotating your phone sideways' :
             deg <= 180 ? '↻ Halfway around — everything is upside down' :
             '↻ More than halfway — almost back to the start'}
          </div>

          <div className="bg-sky-50 border border-sky-100 rounded-xl p-3 text-xs font-medium text-slate-600 leading-relaxed">
            <span className="font-bold text-sky-700 block mb-1">Key insight</span>
            Every point stays the same distance from the center. Only the angle changes.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.7 — Shear: The Italic Effect
// ═══════════════════════════════════════════════════════════════

export const Scene4_7_ShearTransform: React.FC = () => {
  const [shear, setShear] = useState(0.0);
  const M: Mat2 = [[1, shear], [0, 1]];
  const animated = useAnimatedMatrix(M, 80);

  return (
    <SlideLayout
      title="The Italic Effect"
      text="A shear pushes points sideways based on how high up they are. Tall objects tilt more than short ones — exactly like making text italic."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Shear amount</span>
              <span className="text-similarity text-base">{shear.toFixed(1)}</span>
            </div>
            <input
              type="range" min="-1.5" max="1.5" step="0.05" value={shear}
              onChange={e => setShear(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">What happens to a point</div>
            <div className="flex flex-col gap-1 text-slate-700 font-bold">
              <span>(x, y)</span>
              <span className="text-slate-400 text-xs">↓ x gets nudged by y × {shear.toFixed(1)}</span>
              <span className="text-similarity">(x + {shear.toFixed(1)}y,  y)</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-amber-700">Notice:</span> The bottom row stays flat. Only the top gets pushed. That's why it looks like italics.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.8 — The Pattern: Just 4 Numbers
// ═══════════════════════════════════════════════════════════════

export const Scene4_8_FourNumbers: React.FC = () => {
  const [revealed, setRevealed] = useState(0);

  const insights = [
    {
      label: 'Scaling used: [s, 0, 0, s]',
      desc: 'Two equal numbers on the diagonal. The off-diagonal slots stay zero.',
    },
    {
      label: 'Rotation used: [cos θ, −sin θ, sin θ, cos θ]',
      desc: 'All four slots work together to create the circular sweep.',
    },
    {
      label: 'Shear used: [1, k, 0, 1]',
      desc: 'One off-diagonal slot controls the tilt. The rest stay at identity values.',
    },
  ];

  return (
    <SlideLayout
      title="Just 4 Numbers"
      text="Every transformation we've seen — scale, rotate, shear — is fully described by arranging just 4 numbers in a 2×2 grid. This grid is called a matrix."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {insights.map((s, i) => (
            <button
              key={i}
              onClick={() => setRevealed(Math.max(revealed, i + 1))}
              className={`px-3 py-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                revealed > i
                  ? 'bg-violet-50 border-violet-300 text-violet-800'
                  : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
              }`}
            >
              <span className="block font-bold mb-0.5">{s.label}</span>
              {revealed > i && <span className="text-slate-500 font-medium">{s.desc}</span>}
            </button>
          ))}
          {revealed === 0 && (
            <p className="text-xs text-slate-400 font-medium px-1">Click each to reveal the pattern →</p>
          )}
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full">
        {/* Big colour-coded 2×2 matrix */}
        <div className="flex items-center gap-3">
          <div className="text-6xl text-slate-300 font-thin select-none" style={{ lineHeight: 1.1 }}>
            [
          </div>
          <div className="grid grid-cols-2 gap-4 px-2">
            {[
              { val: 'a', color: 'text-rose-500',   bg: 'bg-rose-50   border-rose-200',   pos: 'top-left' },
              { val: 'b', color: 'text-amber-500',  bg: 'bg-amber-50  border-amber-200',  pos: 'top-right' },
              { val: 'c', color: 'text-violet-500', bg: 'bg-violet-50 border-violet-200', pos: 'bottom-left' },
              { val: 'd', color: 'text-sky-500',    bg: 'bg-sky-50    border-sky-200',    pos: 'bottom-right' },
            ].map(cell => (
              <div
                key={cell.val}
                className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center ${cell.bg}`}
              >
                <span className={`text-4xl font-black ${cell.color}`}>{cell.val}</span>
                <span className="text-[9px] text-slate-400 font-mono uppercase mt-1">{cell.pos}</span>
              </div>
            ))}
          </div>
          <div className="text-6xl text-slate-300 font-thin select-none" style={{ lineHeight: 1.1 }}>
            ]
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-500 text-center text-base font-medium max-w-md"
        >
          Change these 4 numbers → the entire transformation changes.
        </motion.p>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.9 — Question: What Does Each Number Do?
// ═══════════════════════════════════════════════════════════════

export const Scene4_9_WhatDoesEachDo: React.FC = () => (
  <QuestionSlide
    emoji="🎛️"
    question="If 4 numbers control the entire transformation, what do you think each one does?"
    hint="Think of it like a recipe. Each ingredient changes one specific aspect of the result."
    subHint="The answer: each column tells you where one of the two main arrows will land after the transformation."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 4.10 — Columns = Arrow Destinations
// ═══════════════════════════════════════════════════════════════

export const Scene4_10_ColumnDestinations: React.FC = () => {
  const [focused, setFocused] = useState<0 | 1 | null>(null);

  const theta = 35 * (Math.PI / 180);
  const M: Mat2 = [
    [Math.cos(theta) * 1.3, -Math.sin(theta)],
    [Math.sin(theta) * 1.3,  Math.cos(theta)],
  ];
  const col0: [number, number] = [M[0][0], M[1][0]];
  const col1: [number, number] = [M[0][1], M[1][1]];

  return (
    <SlideLayout
      title="Where Do the Arrows Land?"
      text="Column 1 tells you where the red arrow (pointing right) will land. Column 2 tells you where the blue arrow (pointing up) will land. Hover each card to see it."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div
            onMouseEnter={() => setFocused(0)}
            onMouseLeave={() => setFocused(null)}
            className="bg-rose-50 border border-rose-200 rounded-xl p-4 cursor-default"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-black block mb-1">
              Column 1 → Red arrow lands at
            </span>
            <div className="font-mono text-lg font-black text-rose-700">
              [{fmt(col0[0])}, {fmt(col0[1])}]
            </div>
          </div>

          <div
            onMouseEnter={() => setFocused(1)}
            onMouseLeave={() => setFocused(null)}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4 cursor-default"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-500 font-black block mb-1">
              Column 2 → Blue arrow lands at
            </span>
            <div className="font-mono text-lg font-black text-sky-700">
              [{fmt(col1[0])}, {fmt(col1[1])}]
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 font-medium leading-relaxed">
            <span className="font-bold text-slate-700 block mb-1">Why does this matter?</span>
            Once you know where the two arrows land, you know where <em>everything</em> goes. Every other point is just a combination of these two directions.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid
          M={M}
          extraVec={
            focused === 0
              ? { vec: col0, color: '#E11D48', marker: 'red', label: `→ [${fmt(col0[0])}, ${fmt(col0[1])}]` }
              : focused === 1
              ? { vec: col1, color: '#0284C7', marker: 'blue', label: `→ [${fmt(col1[0])}, ${fmt(col1[1])}]` }
              : null
          }
        />
        {focused === null && (
          <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold bg-white/90 px-4 py-1.5 rounded-full border border-slate-200">
              Hover the cards →
            </span>
          </div>
        )}
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.11 — Matrix × Vector: Step by Step
// ═══════════════════════════════════════════════════════════════

export const Scene4_11_MatrixVectorRecipe: React.FC = () => {
  const [step, setStep] = useState(0);
  const M: Mat2 = [[2, 1], [0, 3]];
  const v: [number, number] = [3, 2];
  const result = mulMV(M, v);
  const maxStep = 3;

  const stepInfo = [
    { label: 'Start', detail: 'We have a matrix M and an input point [3, 2]. We want to find where it lands after the transformation.' },
    { label: 'Top row', detail: `Row 1 of M is [2, 1]. Dot with [3, 2]: 2×3 + 1×2 = ${result[0]}. This gives the new x-coordinate.` },
    { label: 'Bottom row', detail: `Row 2 of M is [0, 3]. Dot with [3, 2]: 0×3 + 3×2 = ${result[1]}. This gives the new y-coordinate.` },
    { label: 'Done!', detail: `The point [3, 2] has moved to [${result[0]}, ${result[1]}]. Two dot products. One transformation.` },
  ];

  return (
    <SlideLayout
      title="The Recipe"
      text="To find where a point lands after a matrix transformation, you run one dot product per row. You're in control of the pace — press Next when ready."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {stepInfo.map((s, i) => (
            <div
              key={i}
              className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
                step === i
                  ? 'bg-white border-slate-300 shadow-sm'
                  : step > i
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-transparent text-slate-300'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-transformations' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={step < i ? 'text-slate-300' : 'text-slate-600 font-medium'}>{s.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{stepInfo[step].detail}</p>

          <div className="flex gap-2 mt-1">
            <button
              onClick={() => setStep(s => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            <button
              onClick={() => setStep(s => Math.min(maxStep, s + 1))}
              disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-lg">
        {/* Matrix × Vector equation */}
        <div className="flex items-center gap-5 font-mono select-none">
          {/* Matrix */}
          <div className="flex flex-col gap-2">
            {M.map((row, ri) => (
              <div key={ri} className={`flex gap-4 px-5 py-3 rounded-xl border transition-all ${
                step === ri + 1 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
              }`}>
                {row.map((val, ci) => (
                  <span key={ci} className={`text-2xl font-black w-6 text-center ${
                    step === ri + 1 ? 'text-rose-600' : 'text-slate-700'
                  }`}>
                    {val}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <span className="text-3xl font-black text-slate-300">×</span>

          {/* Input */}
          <div className="flex flex-col gap-2">
            {v.map((val, i) => (
              <div key={i} className={`px-5 py-3 rounded-xl border text-center transition-all ${
                step === 1 || step === 2 ? 'bg-sky-50 border-sky-300' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className={`text-2xl font-black ${
                  step === 1 || step === 2 ? 'text-sky-600' : 'text-slate-700'
                }`}>{val}</span>
              </div>
            ))}
          </div>

          <span className="text-3xl font-black text-slate-300">=</span>

          {/* Output */}
          <div className="flex flex-col gap-2">
            {result.map((val, i) => (
              <div key={i} className={`px-5 py-3 rounded-xl border text-center min-w-[60px] transition-all ${
                step === 3
                  ? 'bg-emerald-50 border-emerald-300'
                  : step === i + 1
                  ? 'bg-violet-50 border-violet-300'
                  : 'bg-slate-50 border-slate-200'
              }`}>
                <AnimatePresence mode="wait">
                  {step >= i + 1 ? (
                    <motion.span key="v" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                      className={`text-2xl font-black block ${step === 3 ? 'text-emerald-600' : 'text-violet-600'}`}>
                      {val}
                    </motion.span>
                  ) : (
                    <span key="q" className="text-2xl font-black text-slate-200">?</span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Step detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-8 py-4 font-mono text-center w-full text-sm"
          >
            {step === 0 && <span className="text-slate-400 font-bold">Press "Next" to walk through the calculation →</span>}
            {step === 1 && <span className="text-rose-600 font-bold">Row 1 · input = 2×3 + 1×2 = <span className="text-violet-600">{result[0]}</span></span>}
            {step === 2 && <span className="text-rose-600 font-bold">Row 2 · input = 0×3 + 3×2 = <span className="text-violet-600">{result[1]}</span></span>}
            {step === 3 && <span className="text-emerald-600 font-black text-base">[3, 2] → [{result.join(', ')}] ✓</span>}
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.12 — Interactive Grid Warp (BIG)
// ═══════════════════════════════════════════════════════════════

const WARP_PRESETS: { label: string; desc: string; M: Mat2 }[] = [
  { label: 'Identity',   desc: 'Space is unchanged. Every point stays exactly where it is.',                   M: [[1, 0], [0, 1]] },
  { label: 'Scale ×2',  desc: 'Every point doubles its distance from the origin — like zooming in.',           M: [[2, 0], [0, 2]] },
  { label: 'Rotate 45°', desc: 'The entire grid rotates 45° counterclockwise.',                                M: [[0.707, -0.707], [0.707, 0.707]] },
  { label: 'Shear',      desc: 'The bottom stays fixed. The top gets pushed sideways — like italic text.',      M: [[1, 0.8], [0, 1]] },
  { label: 'Reflect Y',  desc: 'The grid flips across the vertical axis — like a mirror.',                     M: [[-1, 0], [0, 1]] },
  { label: 'Squash',     desc: 'Space is squashed vertically and stretched horizontally.',                      M: [[1.5, 0], [0, 0.5]] },
];

export const Scene4_12_GridWarpPresets: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const animated = useAnimatedMatrix(WARP_PRESETS[idx].M);

  return (
    <SlideLayout
      title="Watch Space Warp"
      text="Each preset applies a different matrix. Click through them and watch the grid animate — the same coordinate space, reshaped by 4 numbers."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {WARP_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                idx === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
          <p className="text-xs text-slate-500 font-medium px-1 mt-1 leading-snug">
            {WARP_PRESETS[idx].desc}
          </p>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.13 — Question: What If You Stack Two Transforms?
// ═══════════════════════════════════════════════════════════════

export const Scene4_13_WhatIfStack: React.FC = () => (
  <QuestionSlide
    emoji="🧱"
    question="What if you scale space by 2, then rotate it 45°?"
    hint="Would the result be the same as rotating first, then scaling?"
    subHint="Try to picture it. The order might matter more than you think..."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 4.14 — Composing Transforms
// ═══════════════════════════════════════════════════════════════

export const Scene4_14_ComposingTransforms: React.FC = () => {
  const [phaseIdx, setPhaseIdx] = useState<0 | 1 | 2>(0);

  const scaleX: Mat2 = [[2, 0], [0, 1]];
  const rot45: Mat2  = [[0.707, -0.707], [0.707, 0.707]];
  const composed     = mulMM(rot45, scaleX);

  const phases: { label: string; M: Mat2; desc: string; activeStyle: string }[] = [
    { label: 'Start',            M: IDENTITY,  desc: 'Original coordinate space — nothing applied yet.',                                                activeStyle: 'bg-slate-50 border-slate-200' },
    { label: '① Scale X by 2',  M: scaleX,    desc: 'First: stretch the horizontal axis by 2. The grid widens.',                                       activeStyle: 'bg-violet-50 border-violet-300' },
    { label: '② Then Rotate 45°', M: composed, desc: 'Second: rotate the already-stretched space 45°. Notice the shape differs from rotating first.',  activeStyle: 'bg-emerald-50 border-emerald-300' },
  ];

  const animated = useAnimatedMatrix(phases[phaseIdx].M, 750);

  return (
    <SlideLayout
      title="Two in a Row"
      text="Applying one transformation after another is called composing. The order matters — scale then rotate gives a different result than rotate then scale."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {phases.map((p, i) => (
            <button
              key={i}
              onClick={() => setPhaseIdx(i as 0 | 1 | 2)}
              className={`px-4 py-3 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                phaseIdx === i ? p.activeStyle + ' shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              <span className="block font-black text-sm mb-0.5">{p.label}</span>
              <span className="text-slate-500 font-medium">{p.desc}</span>
            </button>
          ))}

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-amber-700 block mb-1">Why this matters for AI</span>
            A deep neural network stacks dozens of these transformations — each one reshaping space a little more, until the data becomes easy to classify.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.15 — Bridge: Connecting to Dot Products
// ═══════════════════════════════════════════════════════════════

export const Scene4_15_DotProductBridge: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  // Example: 3×2 weight matrix × input [3,2]
  const rows = [[2, 1], [0, 3], [1, 2]];
  const input = [3, 2];
  const outputs = rows.map(r => r[0] * input[0] + r[1] * input[1]);

  return (
    <SlideLayout
      title="Wait — You Already Know This"
      text="Matrix multiplication isn't new math. It's just the dot product from Chapter 3, run once per row. Each row of the matrix is a 'question' asked about the input."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-600 font-black block mb-2">From Chapter 3</span>
            A dot product multiplies matching pairs of numbers and sums them up. It measures how much two vectors align.
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
            <span className="text-[10px] font-mono uppercase tracking-wider text-violet-600 font-black block mb-2">What a matrix adds</span>
            A matrix runs that dot product once per row. 3 rows = 3 questions = 3 output values.
          </div>

          <button
            onClick={() => setRevealed(true)}
            className={`px-4 py-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
              revealed
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-700'
            }`}
          >
            {revealed ? '✓ Connection made!' : 'Show me the connection →'}
          </button>
        </div>
      }
    >
      <div className="flex items-center justify-center gap-8 w-full max-w-2xl px-4">
        {/* Input */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Input</span>
          <div className="flex flex-col gap-1">
            {input.map((v, i) => (
              <div key={i} className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-3 text-sky-700 font-black text-xl font-mono">
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Dot product rows */}
        <div className="flex-1 flex flex-col gap-3">
          {revealed ? (
            rows.map((row, ri) => (
              <motion.div
                key={ri}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.2 }}
                className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5"
              >
                <span className="font-mono text-sm font-bold text-rose-600">[{row.join(', ')}]</span>
                <span className="text-slate-400 text-sm font-mono">·</span>
                <span className="font-mono text-sm font-bold text-sky-600">[{input.join(', ')}]</span>
                <span className="text-slate-400 text-xs">=</span>
                <span className="font-mono text-sm font-black text-emerald-600">{outputs[ri]}</span>
              </motion.div>
            ))
          ) : (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 text-center text-slate-400 text-sm font-medium">
              Each row of the matrix does one dot product with the input
            </div>
          )}
        </div>

        {/* Output */}
        {revealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Output</span>
            <div className="flex flex-col gap-1">
              {outputs.map((v, i) => (
                <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 text-emerald-700 font-black text-xl font-mono">
                  {v}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.16 — One Neuron First
// ═══════════════════════════════════════════════════════════════

export const Scene4_16_OneNeuron: React.FC = () => {
  const [step, setStep] = useState(0);

  const weights = [0.5, 0.8];
  const input   = [3, 2];
  const bias    = 0.5;
  const weighted = weights[0] * input[0] + weights[1] * input[1]; // 3.1
  const output   = weighted + bias;                                // 3.6

  return (
    <SlideLayout
      title="Start With One Neuron"
      text="Before looking at a full layer, let's understand one neuron. It does exactly three things: multiply each input by a weight, sum them up, then add a bias."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {[
            { label: 'Step 1: Weighted sum', detail: `Multiply each input by its weight and sum: ${weights[0]}×${input[0]} + ${weights[1]}×${input[1]} = ${weighted}` },
            { label: 'Step 2: Add bias',     detail: `Add the bias term to shift the result: ${weighted} + ${bias} = ${output.toFixed(1)}` },
            { label: "That's it!",           detail: "This single number is the neuron's output. A full layer just runs this for every neuron at once." },
          ].map((s, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i + 1 ? 'bg-white border-slate-300 shadow-sm'
              : step > i + 1  ? 'bg-emerald-50 border-emerald-200'
              : 'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i + 1 ? 'text-transformations' : step > i + 1 ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i + 1 ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i + 1 ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
              {step === i + 1 && <p className="text-slate-500 mt-1">{s.detail}</p>}
            </div>
          ))}

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-md">
        <div className="flex items-center gap-8 w-full justify-center">
          {/* Inputs */}
          <div className="flex flex-col gap-3">
            {input.map((v, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-3 text-sky-700 font-black text-xl font-mono">
                  {v}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">x{i + 1}</span>
              </div>
            ))}
          </div>

          {/* Weights */}
          <div className="flex flex-col gap-3 items-center">
            {weights.map((w, i) => (
              <div key={i} className={`text-xs font-mono font-bold transition-all ${
                step === 1 ? 'text-rose-500' : 'text-slate-400'
              }`}>
                w{i + 1} = {w} ──
              </div>
            ))}
          </div>

          {/* Neuron circle */}
          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${
            step === 1 ? 'bg-rose-50   border-rose-300'
            : step === 2 ? 'bg-violet-50 border-violet-300'
            : step === 3 ? 'bg-emerald-50 border-emerald-300'
            : 'bg-slate-50 border-slate-200'
          }`}>
            <AnimatePresence mode="wait">
              {step === 0 && <span key="q" className="text-2xl text-slate-300 font-black">?</span>}
              {step === 1 && <motion.span key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-rose-600 font-mono">{weighted}</motion.span>}
              {step === 2 && <motion.span key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xl font-black text-violet-600 font-mono">{output.toFixed(1)}</motion.span>}
              {step === 3 && <motion.span key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base font-black text-emerald-600 font-mono">{output.toFixed(1)} ✓</motion.span>}
            </AnimatePresence>
          </div>

          {/* Output */}
          <div className={`px-5 py-3 rounded-xl border font-black text-xl font-mono transition-all ${
            step >= 2 ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-50 border-dashed border-slate-200 text-slate-200'
          }`}>
            {step >= 2 ? output.toFixed(1) : '?'}
          </div>
        </div>

        {step >= 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-violet-50 border border-violet-200 rounded-xl px-6 py-3 text-sm font-medium text-slate-600 text-center">
            <span className="font-bold text-violet-700">+ bias {bias}</span> — a constant that shifts the output up or down, giving the neuron more flexibility
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.17 — The Neural Layer
// ═══════════════════════════════════════════════════════════════

export const Scene4_17_NeuralLayer: React.FC = () => {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  const weights = [[0.5, 0.8], [0.2, -0.6], [0.9, 0.1]];
  const input   = [3, 2];
  const bias    = [0.5, -0.3, 0.1];
  const outputs = weights.map((row, i) => row[0] * input[0] + row[1] * input[1] + bias[i]);

  return (
    <SlideLayout
      title="Scale It Up: A Full Layer"
      text="A neural network layer is just many neurons running at once. Each neuron uses its own row of weights — that's exactly a matrix multiplication."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-black block mb-2">Layer formula</span>
            <KaTeXMath tex="y = Wx + b" block />
          </div>

          {[['W', 'Weight matrix (one row per neuron)', 'bg-rose-50   border-rose-100'],
            ['x', 'Input vector [3, 2]',                'bg-sky-50    border-sky-100'],
            ['b', 'Bias vector',                        'bg-violet-50 border-violet-100'],
            ['y', 'Output (one value per neuron)',      'bg-emerald-50 border-emerald-100'],
          ].map(([sym, desc, cls]) => (
            <div key={sym} className={`flex gap-2 items-center ${cls} border rounded-lg px-3 py-2 text-xs font-mono font-bold`}>
              <span className="font-black text-base text-slate-700">{sym}</span>
              <span className="font-medium text-slate-500">{desc}</span>
            </div>
          ))}

          <p className="text-xs text-slate-400 font-medium px-1">Hover the rows to see each neuron compute.</p>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Input */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400">x =</span>
          <div className="flex gap-2">
            {input.map((v, i) => (
              <div key={i} className="bg-sky-50 border border-sky-200 rounded-xl px-5 py-2.5 text-sky-700 font-black text-xl font-mono">{v}</div>
            ))}
          </div>
        </div>

        {/* Weight rows */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Weight matrix W — each row = one neuron
          </div>
          <div className="flex flex-col gap-2">
            {weights.map((row, ri) => (
              <div
                key={ri}
                onMouseEnter={() => setActiveRow(ri)}
                onMouseLeave={() => setActiveRow(null)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 border cursor-default transition-all ${
                  activeRow === ri ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex gap-4">
                  {row.map((w, ci) => (
                    <span key={ci} className={`font-mono font-black text-sm ${activeRow === ri ? 'text-rose-600' : 'text-slate-600'}`}>
                      {w}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-bold">neuron {ri + 1}</span>
                <AnimatePresence>
                  {activeRow === ri && (
                    <motion.span
                      initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                      className="text-emerald-600 font-black font-mono text-sm"
                    >
                      → {outputs[ri].toFixed(1)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-400">y =</span>
          <div className="flex gap-2">
            {outputs.map((v, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 text-emerald-700 font-black text-lg font-mono">
                {v.toFixed(1)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.18 — Question: What Happens If You Stack Linear?
// ═══════════════════════════════════════════════════════════════

export const Scene4_18_StackLinearQuestion: React.FC = () => (
  <QuestionSlide
    emoji="📏"
    question="If you stack 100 matrix layers one after another, what do you get?"
    hint="Each layer is a linear stretch, rotate, or shear. But what does combining 100 of them equal?"
    subHint="Spoiler: still just one linear transformation. Stacking straight lines always gives you a straight line."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 4.19 — Non-Linearity: The Bend
// ═══════════════════════════════════════════════════════════════

const reluFn    = (x: number) => Math.max(0, x);
const sigmoidFn = (x: number) => 1 / (1 + Math.exp(-x));
const tanhFn    = (x: number) => Math.tanh(x);

const ACTIVATIONS = [
  {
    name: 'ReLU',
    fn: reluFn,
    color: '#E11D48',
    analogy: 'Like an on/off switch: negative signals are killed, positive signals pass through unchanged.',
    desc: 'The most popular choice. Fast, effective, and simple.',
    formula: '\\max(0, x)',
  },
  {
    name: 'Sigmoid',
    fn: sigmoidFn,
    color: '#0284C7',
    analogy: 'Like a dimmer switch: squashes any number into 0–1 range. Perfect for representing probabilities.',
    desc: 'Used when the output needs to be a probability.',
    formula: '\\frac{1}{1+e^{-x}}',
  },
  {
    name: 'Tanh',
    fn: tanhFn,
    color: '#7C3AED',
    analogy: 'Like a symmetric dimmer: squashes into −1 to +1. Balanced around zero.',
    desc: "Often works better than sigmoid because it's centred at zero.",
    formula: '\\tanh(x)',
  },
];

export const Scene4_19_NonLinearity: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const act = ACTIVATIONS[selected];

  const W = 400, H = 220;
  const xMin = -4, xMax = 4, yMin = -1.4, yMax = 1.4;
  const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const toY = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;

  const xs = Array.from({ length: 240 }, (_, i) => xMin + (i / 239) * (xMax - xMin));
  const pathD = xs.map((x, i) => {
    const y = act.fn(x);
    return `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`;
  }).join(' ');

  return (
    <SlideLayout
      title="The Bend That Makes It Powerful"
      text="Without non-linearity, stacking 100 matrix layers still gives one straight-line transformation. Activation functions introduce the curves that let networks learn complex patterns."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-sm text-slate-600 leading-relaxed">
            <span className="font-bold text-amber-700 block mb-1">The ruler analogy</span>
            Stacking 100 straight rulers still gives you a straight ruler. To draw a curve, you need something that bends.
          </div>

          {ACTIVATIONS.map((a, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`px-4 py-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                selected === i ? 'shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
              style={selected === i ? { backgroundColor: `${a.color}12`, borderColor: `${a.color}50`, color: a.color } : {}}
            >
              <span className="block font-black">{a.name}</span>
              <KaTeXMath tex={a.formula} />
            </button>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-snug">{act.analogy}</p>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full p-5">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
            {act.name} — the bend it introduces
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
            {[-3, -2, -1, 0, 1, 2, 3].map(x => (
              <line key={`gx${x}`} x1={toX(x)} y1={0} x2={toX(x)} y2={H} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            {[-1, -0.5, 0, 0.5, 1].map(y => (
              <line key={`gy${y}`} x1={0} y1={toY(y)} x2={W} y2={toY(y)} stroke="#f1f5f9" strokeWidth="1" />
            ))}
            <line x1={0} y1={toY(0)} x2={W} y2={toY(0)} stroke="#94a3b8" strokeWidth="1.5" />
            <line x1={toX(0)} y1={0} x2={toX(0)} y2={H} stroke="#94a3b8" strokeWidth="1.5" />
            <motion.path
              key={selected}
              d={pathD} fill="none" stroke={act.color} strokeWidth="3" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
            <text x={W - 6} y={toY(0) - 6} fill="#94a3b8" fontSize="11" textAnchor="end">x →</text>
          </svg>
        </div>
        <p className="text-sm text-slate-500 text-center font-medium max-w-md">{act.desc}</p>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.20 — Deep Networks: Layers of Warp
// ═══════════════════════════════════════════════════════════════

export const Scene4_20_DeepNetworks: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers: { label: string; M: Mat2; color: string; analogy: string }[] = [
    { label: 'Layer 1', M: [[1.4, 0.3], [-0.2, 1.2]], color: '#E11D48', analogy: 'Stretches and slightly rotates — the network begins tilting the data.' },
    { label: 'Layer 2', M: [[0.707, -0.707], [0.707, 0.707]], color: '#0284C7', analogy: 'Rotates 45° — separating features that were tangled together.' },
    { label: 'Layer 3', M: [[1.8, 0], [0, 0.5]], color: '#7C3AED', analogy: 'Amplifies one direction, compresses the other — sharpening the signal.' },
  ];

  const composedMs = layers.reduce<Mat2[]>((acc, layer, i) => {
    if (i === 0) return [layer.M];
    return [...acc, mulMM(layer.M, acc[i - 1])];
  }, []);

  const animated = useAnimatedMatrix(composedMs[activeLayer], 800);

  return (
    <SlideLayout
      title="Depth = Power"
      text="A deep network is a pipeline of matrix transformations. Each layer reshapes space progressively — making messy, tangled data easier to understand. Click each layer."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {layers.map((l, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className={`px-4 py-3 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                activeLayer === i ? 'shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
              style={activeLayer === i ? { backgroundColor: `${l.color}12`, borderColor: `${l.color}50`, color: l.color } : {}}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
                <span className="font-black">{l.label}</span>
                {i <= activeLayer && <span className="ml-auto text-[9px] opacity-50 uppercase tracking-wider">applied</span>}
              </div>
              <span className="text-slate-500 font-medium">{l.analogy}</span>
            </button>
          ))}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-600">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-bold">Full network</span>
            <span className="font-bold">y = σ(W₃ σ(W₂ σ(W₁x)))</span>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.21 — Matrix Sandbox (Interactive, BIG grid)
// ═══════════════════════════════════════════════════════════════

export const Scene4_21_MatrixSandbox: React.FC = () => {
  const [a, setA] = useState(1.0);
  const [b, setB] = useState(0.0);
  const [c, setC] = useState(0.0);
  const [d, setD] = useState(1.0);

  const target: Mat2 = [[a, b], [c, d]];
  const animated = useAnimatedMatrix(target, 80);
  const det = a * d - b * c;

  const presets: { name: string; vals: [number, number, number, number] }[] = [
    { name: 'Identity',  vals: [1,    0,    0,    1   ] },
    { name: 'Rot 90°',  vals: [0,   -1,    1,    0   ] },
    { name: 'Scale ×2', vals: [2,    0,    0,    2   ] },
    { name: 'Shear',    vals: [1,    1,    0,    1   ] },
    { name: 'Reflect',  vals: [-1,   0,    0,    1   ] },
    { name: 'Collapse', vals: [1,    1,    1,    1   ] },
  ];

  const SliderEntry: React.FC<{ label: string; value: number; onChange: (v: number) => void; color: string }> = ({ label, value, onChange, color }) => (
    <div>
      <div className="flex justify-between text-xs font-mono font-bold mb-1" style={{ color }}>
        <span>{label}</span>
        <span>{value.toFixed(1)}</span>
      </div>
      <input
        type="range" min="-2" max="2" step="0.1" value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor: color }}
      />
    </div>
  );

  return (
    <SlideLayout
      title="Your Matrix, Your Space"
      text="Drag the sliders or pick a preset. Watch space warp live. Try the Collapse preset and see what happens to the determinant — and to the grid."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => { setA(p.vals[0]); setB(p.vals[1]); setC(p.vals[2]); setD(p.vals[3]); }}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-all cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Matrix M</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center mb-3">
              {[['a', a, '#E11D48'], ['b', b, '#D97706'], ['c', c, '#7C3AED'], ['d', d, '#0284C7']].map(([lbl, val, clr]) => (
                <div key={lbl as string} className="bg-slate-50 border border-slate-200 rounded-lg py-2 text-xl font-black" style={{ color: clr as string }}>
                  {(val as number).toFixed(1)}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <SliderEntry label="a  (top-left)"     value={a} onChange={setA} color="#E11D48" />
              <SliderEntry label="b  (top-right)"    value={b} onChange={setB} color="#D97706" />
              <SliderEntry label="c  (bottom-left)"  value={c} onChange={setC} color="#7C3AED" />
              <SliderEntry label="d  (bottom-right)" value={d} onChange={setD} color="#0284C7" />
            </div>
          </div>

          <div className={`rounded-xl p-3 border text-xs font-bold font-mono transition-all ${
            Math.abs(det) < 0.05
              ? 'bg-rose-50 border-rose-300 text-rose-700'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            det(M) = {det.toFixed(2)}
            {Math.abs(det) < 0.05 && (
              <span className="block text-[10px] mt-1 font-medium text-rose-500">
                Space collapsed to a line — information is lost forever.
              </span>
            )}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};
