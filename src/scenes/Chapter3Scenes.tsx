import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../components/Math';

// ═══════════════════════════════════════════════════════════════
// Math Helpers
// ═══════════════════════════════════════════════════════════════

type Vec2 = [number, number];

const dot2  = (a: Vec2, b: Vec2): number => a[0] * b[0] + a[1] * b[1];
const mag2  = (v: Vec2): number => Math.sqrt(v[0] * v[0] + v[1] * v[1]);
const proj2 = (a: Vec2, b: Vec2): Vec2 => {
  const bm2 = b[0] * b[0] + b[1] * b[1];
  if (bm2 === 0) return [0, 0];
  const f = dot2(a, b) / bm2;
  return [b[0] * f, b[1] * f];
};
const angleDeg = (a: Vec2, b: Vec2): number => {
  const cosVal = dot2(a, b) / (mag2(a) * mag2(b) || 1);
  return (Math.acos(Math.min(1, Math.max(-1, cosVal))) * 180) / Math.PI;
};
const fromAngle = (deg: number, len = 4): Vec2 => [
  len * Math.cos((deg * Math.PI) / 180),
  len * Math.sin((deg * Math.PI) / 180),
];
function fmt(n: number): string { return String(parseFloat(n.toFixed(2))); }

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
    <div className="w-full lg:w-[280px] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
      <div>
        <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-base leading-relaxed">{text}</p>
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
// VectorCanvas — large SVG coordinate space for drawing vectors
// ═══════════════════════════════════════════════════════════════

interface VecSpec {
  id: string;
  vec: Vec2;
  color: string;
  marker: string;
  label?: string;
  dashed?: boolean;
  width?: number;
}

interface LineSpec {
  from: Vec2;
  to: Vec2;
  color: string;
  marker?: string;
  dashed?: boolean;
  width?: number;
}

const VC_MARKERS = (
  <defs>
    {([
      ['red',    '#E11D48'], ['blue',    '#0284C7'], ['green',   '#059669'],
      ['violet', '#7C3AED'], ['slate',   '#64748B'], ['amber',   '#D97706'],
      ['emerald','#10B981'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`vc-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

const VectorCanvas: React.FC<{
  vectors: VecSpec[];
  lines?: LineSpec[];
  range?: number;
  width?: number;
  height?: number;
}> = ({ vectors, lines = [], range = 5, width = 480, height = 480 }) => {
  const cx = width / 2, cy = height / 2;
  const scale = (Math.min(width, height) / 2 - 28) / range;

  const pt = (x: number, y: number): [number, number] => [cx + x * scale, cy - y * scale];
  const origin = pt(0, 0);

  const gridLines: React.ReactNode[] = [];
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

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {VC_MARKERS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}

      {lines.map((l, i) => {
        const [x1, y1] = pt(l.from[0], l.from[1]);
        const [x2, y2] = pt(l.to[0], l.to[1]);
        return (
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={l.color} strokeWidth={l.width ?? 2}
            strokeDasharray={l.dashed ? '6 3' : undefined}
            markerEnd={l.marker ? `url(#vc-${l.marker})` : undefined}
          />
        );
      })}

      {vectors.map(v => {
        const [x, y] = pt(v.vec[0], v.vec[1]);
        return (
          <g key={v.id}>
            <line x1={origin[0]} y1={origin[1]} x2={x} y2={y}
              stroke={v.color} strokeWidth={v.width ?? 2.5}
              strokeDasharray={v.dashed ? '6 3' : undefined}
              markerEnd={`url(#vc-${v.marker})`}
            />
            {v.label && (
              <text x={x + 9} y={y - 7} fill={v.color} fontSize="13" fontWeight="bold">
                {v.label}
              </text>
            )}
          </g>
        );
      })}

      <circle cx={origin[0]} cy={origin[1]} r="4.5" fill="#0f172a" />
    </svg>
  );
};

// ─────────────────────────────────────────────────
// Reusable Dot Product readout badge
// ─────────────────────────────────────────────────
const DotMeter: React.FC<{ value: number; max?: number }> = ({ value, max = 20 }) => {
  const clamped = Math.max(-max, Math.min(max, value));
  const pct = ((clamped + max) / (2 * max)) * 100;
  const isPos = value >= 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs font-mono font-bold text-slate-500">
        <span>Dot Product</span>
        <span className={isPos ? 'text-emerald-600' : 'text-rose-500'}>{value.toFixed(1)}</span>
      </div>
      <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
        {/* centre mark */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-300" />
        <motion.div
          className={`absolute top-0 h-full rounded-full ${isPos ? 'bg-emerald-400' : 'bg-rose-400'}`}
          style={{ left: `${Math.min(50, pct)}%`, width: `${Math.abs(pct - 50)}%` }}
          layout
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        />
      </div>
      <div className="flex justify-between text-[9px] font-mono text-slate-400 font-bold">
        <span>−{max} (opposite)</span><span>0</span><span>+{max} (aligned)</span>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.1 — Curiosity Hook
// ═══════════════════════════════════════════════════════════════

export const Scene3_1_CuriosityHook: React.FC = () => {
  const items = [
    { text: 'Aligned.',            color: 'text-vector' },
    { text: 'Opposed.',            color: 'text-loss' },
    { text: 'Sideways.',           color: 'text-similarity' },
    { text: 'Somewhere between...', color: 'text-transformations' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
      >
        Two arrows in space. How much do they agree?
      </motion.p>

      <div className="flex flex-col gap-4 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.5, duration: 0.7, ease: 'easeOut' }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight ${item.color}`}
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
        <p className="text-slate-400 text-lg font-medium mb-2">One operation captures all of this.</p>
        <p className="text-similarity text-3xl md:text-4xl font-black">The Dot Product.</p>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.2 — Question: How to Measure Agreement?
// ═══════════════════════════════════════════════════════════════

export const Scene3_2_HowToMeasure: React.FC = () => (
  <QuestionSlide
    emoji="🏹"
    question="If two arrows point in different directions, how would you measure how much they agree?"
    hint="Think geometrically. What if one arrow cast a shadow onto the other?"
    subHint="The length of that shadow would tell you exactly how much they point in the same direction."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 3.3 — Real-World Analogies
// ═══════════════════════════════════════════════════════════════

export const Scene3_3_RealWorldAnalogies: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      icon: '🚣',
      label: 'Rowing with the Current',
      analogy: 'Row directly WITH the current and you get maximum boost. Row perpendicular and the current does nothing for you. Row against it and you slow down.',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
      tag: 'Parallel = max',
      // Two vectors at same angle = aligned
      vecA: fromAngle(20, 3.5) as Vec2,
      vecB: fromAngle(20, 3.5) as Vec2,
    },
    {
      icon: '☀️',
      label: 'Solar Panel Angle',
      analogy: "A solar panel facing directly at the sun captures maximum energy. Tilt it sideways and it captures less. The dot product measures this efficiency exactly.",
      tagColor: 'bg-amber-50 border-amber-200 text-amber-700',
      tag: 'Angle = efficiency',
      vecA: fromAngle(90, 3.5) as Vec2,  // sun ray straight down
      vecB: fromAngle(60, 3) as Vec2,    // panel at angle
    },
    {
      icon: '🎬',
      label: 'Movie Recommendations',
      analogy: 'Your taste is a vector [action: 8, comedy: 2]. A movie is [action: 9, comedy: 1]. Their dot product is 8×9 + 2×1 = 74 — a strong match!',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
      tag: 'Taste × Movie',
      vecA: fromAngle(15, 4) as Vec2,   // high action preference
      vecB: fromAngle(10, 3.8) as Vec2, // movie also high action
    },
  ];

  const ex = examples[active];

  return (
    <SlideLayout
      title="You Already Use This"
      text="The dot product shows up everywhere in the real world. It measures how much two things point in the same direction."
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
        <VectorCanvas
          vectors={[
            { id: 'A', vec: ex.vecA, color: '#E11D48', marker: 'red',  label: 'A' },
            { id: 'B', vec: ex.vecB, color: '#0284C7', marker: 'blue', label: 'B' },
          ]}
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.4 — Angle Explorer (Interactive)
// ═══════════════════════════════════════════════════════════════

export const Scene3_4_AngleExplorer: React.FC = () => {
  const [angleDegA, setAngleDegA] = useState(30);

  const vecB: Vec2 = [4, 0]; // fixed horizontal
  const vecA = fromAngle(angleDegA, 4);
  const dotVal = dot2(vecA, vecB);
  const theta = angleDeg(vecA, vecB);

  return (
    <SlideLayout
      title="Rotate and Observe"
      text="Vector B stays fixed. Drag the slider to rotate Vector A. Watch how the dot product changes as the angle changes."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Angle of Vector A</span>
              <span className="text-similarity text-base">{angleDegA}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angleDegA}
              onChange={e => setAngleDegA(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0° (aligned)</span><span>90°</span><span>180° (opposite)</span>
            </div>
          </div>

          <DotMeter value={dotVal} max={18} />

          <div className={`p-3 rounded-xl border text-xs font-medium text-slate-600 leading-relaxed transition-all ${
            theta < 45 ? 'bg-emerald-50 border-emerald-200' :
            theta > 135 ? 'bg-rose-50 border-rose-200' :
            'bg-slate-50 border-slate-200'
          }`}>
            {theta < 10  ? '🟢 Nearly perfectly aligned — maximum positive agreement.' :
             theta < 45  ? '🟢 Mostly aligned — strong positive agreement.' :
             theta < 88  ? '🟡 Pulling apart — shrinking agreement.' :
             theta < 92  ? '⚪ Exactly perpendicular — zero agreement.' :
             theta < 135 ? '🔴 Starting to oppose — negative agreement.' :
                           '🔴 Nearly opposite — maximum disagreement.'}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: `B [4, 0]` },
            { id: 'A', vec: vecA, color: '#E11D48', marker: 'red',  label: `A` },
          ]}
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.5 — Question: What About Perpendicular?
// ═══════════════════════════════════════════════════════════════

export const Scene3_5_WhatAboutPerpendicular: React.FC = () => (
  <QuestionSlide
    emoji="📐"
    question="If perfectly aligned arrows give a maximum positive dot product, what do you think perpendicular arrows give?"
    hint="They point in completely different directions — they share nothing in common."
    subHint="If they share zero direction, they should share... zero alignment."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 3.6 — Zero Alignment (Perpendicular)
// ═══════════════════════════════════════════════════════════════

export const Scene3_6_ZeroAlignment: React.FC = () => {
  const vecA: Vec2 = [4, 0];
  const vecB: Vec2 = [0, 4];

  return (
    <SlideLayout
      title="Zero Alignment"
      text="When vectors are perpendicular — 90° apart — they share nothing. The dot product is exactly zero, no matter how long the arrows are."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Calculation</div>
            <div className="flex flex-col gap-1 text-slate-700">
              <span>A = [4, 0]</span>
              <span>B = [0, 4]</span>
              <span className="border-t border-slate-200 pt-2 mt-1">4×0 + 0×4</span>
              <span className="text-2xl font-black text-slate-800">= 0</span>
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-sky-700 block mb-1">Real-world meaning</span>
            A horizontal force and a vertical force have zero dot product — they operate in completely independent directions. Neither affects the other.
          </div>

          <DotMeter value={0} max={18} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'A', vec: vecA, color: '#E11D48', marker: 'red',  label: 'A [4, 0]' },
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: 'B [0, 4]' },
          ]}
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.7 — Opposite = Negative
// ═══════════════════════════════════════════════════════════════

export const Scene3_7_OppositeNegative: React.FC = () => {
  const [lenB, setLenB] = useState(3.5);
  const vecA: Vec2 = [4, 0];
  const vecB: Vec2 = [-lenB, 0];
  const dotVal = dot2(vecA, vecB);

  return (
    <SlideLayout
      title="Opposition is Negative"
      text="When vectors point in opposite directions, the dot product goes negative. The more they oppose, the more negative the result."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Length of B</span>
              <span className="text-loss">{lenB.toFixed(1)}</span>
            </div>
            <input
              type="range" min="1" max="4.5" step="0.1" value={lenB}
              onChange={e => setLenB(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">Calculation</div>
            <div className="flex flex-col gap-1 text-slate-700">
              <span>A = [4, 0],  B = [{fmt(-lenB)}, 0]</span>
              <span className="text-slate-500 text-xs">4 × {fmt(-lenB)} + 0 × 0</span>
              <span className="text-2xl font-black text-rose-500">= {fmt(dotVal)}</span>
            </div>
          </div>

          <DotMeter value={dotVal} max={20} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'A', vec: vecA,  color: '#E11D48', marker: 'red',  label: 'A [4, 0]' },
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: `B [${fmt(-lenB)}, 0]` },
          ]}
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.8 — The Shadow (Projection)
// ═══════════════════════════════════════════════════════════════

export const Scene3_8_ShadowProjection: React.FC = () => {
  const [angleA, setAngleA] = useState(65);

  const vecB: Vec2 = [4, 0.8]; // slight upward tilt
  const vecA = fromAngle(angleA, 4);
  const shadow = proj2(vecA, vecB);
  const dotVal = dot2(vecA, vecB);
  const magA = mag2(vecA);
  const magB = mag2(vecB);
  const cosVal = dotVal / (magA * magB || 1);

  return (
    <SlideLayout
      title="The Shadow"
      text="Drop a perpendicular from the tip of A onto the line of B. The green segment — A's shadow — shows how much of A points in B's direction."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Angle of Vector A</span>
              <span className="text-vector text-base">{angleA}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angleA}
              onChange={e => setAngleA(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs font-mono font-bold text-slate-600">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-black mb-2">Shadow formula</div>
            <div className="flex justify-center py-2 border-y border-slate-100">
              <KaTeXMath tex={`\\text{shadow} = |A|\\cos\\theta = ${(magA * cosVal).toFixed(2)}`} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-[11px]">
              <span>|A| = {fmt(magA)}</span>
              <span>cos θ = {fmt(cosVal)}</span>
            </div>
          </div>

          <DotMeter value={dotVal} max={20} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'A', vec: vecA,    color: '#E11D48', marker: 'red',    label: 'A' },
            { id: 'B', vec: vecB,    color: '#0284C7', marker: 'blue',   label: 'B (fixed)' },
            { id: 'S', vec: shadow,  color: '#059669', marker: 'green',  label: 'shadow', width: 4 },
          ]}
          lines={[
            // perpendicular drop line from tip of A to shadow tip
            { from: vecA, to: shadow, color: '#7C3AED', dashed: true, width: 1.5 },
          ]}
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.9 — Question: Can We Skip the Angle?
// ═══════════════════════════════════════════════════════════════

export const Scene3_9_CanWeSkipAngle: React.FC = () => (
  <QuestionSlide
    emoji="🔢"
    question="Computing the shadow requires knowing the angle. But what if you only have the coordinates?"
    hint="You have A = [3, 2] and B = [4, 1]. No angle. Is there a direct shortcut using just these numbers?"
    subHint="What if you just multiplied the matching coordinates and summed them up?"
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 3.10 — The Coordinate Shortcut (Step by Step)
// ═══════════════════════════════════════════════════════════════

export const Scene3_10_CoordinateShortcut: React.FC = () => {
  const [step, setStep] = useState(0);

  const vecA: Vec2 = [3, 2];
  const vecB: Vec2 = [4, 1];
  const prodX = vecA[0] * vecB[0]; // 12
  const prodY = vecA[1] * vecB[1]; // 2
  const total  = prodX + prodY;    // 14

  const stepInfo = [
    { label: 'Start',         detail: 'We have A = [3, 2] and B = [4, 1]. We want the dot product — no angle needed.' },
    { label: 'Multiply X',    detail: `Take the x-coordinate of each vector and multiply: ${vecA[0]} × ${vecB[0]} = ${prodX}. This captures agreement along the horizontal.` },
    { label: 'Multiply Y',    detail: `Now the y-coordinates: ${vecA[1]} × ${vecB[1]} = ${prodY}. This captures agreement along the vertical.` },
    { label: 'Add them up',   detail: `Sum both products: ${prodX} + ${prodY} = ${total}. Done — that's the dot product.` },
    { label: 'Verify!',       detail: `|A||B|cos(θ) = ${fmt(mag2(vecA))} × ${fmt(mag2(vecB))} × ${fmt(dot2(vecA,vecB) / (mag2(vecA)*mag2(vecB)))} ≈ ${total}. Both methods give the same answer.` },
  ];

  const maxStep = stepInfo.length - 1;

  return (
    <SlideLayout
      title="No Angle Needed"
      text="The dot product can be computed directly from coordinates: multiply matching pairs and add them up. No trigonometry required."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {stepInfo.map((s, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i        ? 'bg-white border-slate-300 shadow-sm'
              : step > i       ? 'bg-emerald-50 border-emerald-200'
              : 'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-similarity' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{stepInfo[step].detail}</p>

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(maxStep, s + 1))} disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg">
        {/* Vectors displayed prominently */}
        <div className="flex gap-8 font-mono">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Vector A</span>
            <div className={`flex gap-3 px-6 py-4 rounded-2xl border-2 transition-all ${
              step >= 1 ? 'bg-rose-50 border-rose-300' : 'bg-slate-50 border-slate-200'
            }`}>
              {vecA.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-400">{['x','y'][i]}</span>
                  <span className={`text-3xl font-black ${step >= 1 ? 'text-rose-600' : 'text-slate-700'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center text-3xl font-black text-slate-300">·</div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Vector B</span>
            <div className={`flex gap-3 px-6 py-4 rounded-2xl border-2 transition-all ${
              step >= 1 ? 'bg-sky-50 border-sky-300' : 'bg-slate-50 border-slate-200'
            }`}>
              {vecB.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-400">{['x','y'][i]}</span>
                  <span className={`text-3xl font-black ${step >= 1 ? 'text-sky-600' : 'text-slate-700'}`}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Calculation steps */}
        <div className="w-full flex flex-col gap-3 font-mono text-sm">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="sx" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-rose-50 border border-rose-200 rounded-xl px-5 py-3">
                <span className="text-rose-700 font-bold">X parts:  {vecA[0]} × {vecB[0]}</span>
                <span className="text-rose-800 font-black text-lg">= {prodX}</span>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div key="sy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded-xl px-5 py-3">
                <span className="text-sky-700 font-bold">Y parts:  {vecA[1]} × {vecB[1]}</span>
                <span className="text-sky-800 font-black text-lg">= {prodY}</span>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div key="stot" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-5 py-3">
                <span className="text-emerald-700 font-bold">Total: {prodX} + {prodY}</span>
                <span className="text-emerald-800 font-black text-2xl">= {total}</span>
              </motion.div>
            )}
            {step >= 4 && (
              <motion.div key="sverify" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center bg-violet-50 border border-violet-200 rounded-xl px-5 py-3 gap-3">
                <span className="text-violet-600 font-bold text-sm">|A||B|cos θ</span>
                <span className="text-slate-400">=</span>
                <span className="text-violet-800 font-black text-xl">{total} ✓</span>
              </motion.div>
            )}
          </AnimatePresence>

          {step === 0 && (
            <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl px-5 py-4 text-center text-slate-400 text-sm font-medium">
              Press Next to walk through the calculation →
            </div>
          )}
        </div>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.11 — The Grand Equivalence (Live verification)
// ═══════════════════════════════════════════════════════════════

export const Scene3_11_GrandEquivalence: React.FC = () => {
  const [angleDegA, setAngleDegA] = useState(40);

  const vecA = fromAngle(angleDegA, 4);
  const vecB: Vec2 = [3.5, 1.5];

  const coordResult = dot2(vecA, vecB);
  const magA = mag2(vecA), magB = mag2(vecB);
  const cosVal = coordResult / (magA * magB || 1);
  const trigResult = magA * magB * cosVal;

  return (
    <SlideLayout
      title="Two Paths, One Answer"
      text="Drag the slider and watch both formulas update live. They always give the same result — the coordinate shortcut is just a faster way to compute the same thing."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Angle of Vector A</span>
              <span className="text-similarity text-base">{angleDegA}°</span>
            </div>
            <input
              type="range" min="0" max="180" step="1" value={angleDegA}
              onChange={e => setAngleDegA(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 font-black">Method 1: Coordinates</span>
              <div className="font-mono text-xs text-slate-700 bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                {fmt(vecA[0])}×{fmt(vecB[0])} + {fmt(vecA[1])}×{fmt(vecB[1])} = <span className="font-black text-emerald-700">{coordResult.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-violet-600 font-black">Method 2: Shadow</span>
              <div className="font-mono text-xs text-slate-700 bg-violet-50 border border-violet-100 p-2 rounded-lg">
                {fmt(magA)} × {fmt(magB)} × {fmt(cosVal)} = <span className="font-black text-violet-700">{trigResult.toFixed(1)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 rounded-lg py-2">
              <span className="text-emerald-600 font-black font-mono">{coordResult.toFixed(1)}</span>
              <span className="text-slate-400 font-mono">=</span>
              <span className="text-violet-600 font-black font-mono">{trigResult.toFixed(1)}</span>
              <span className="text-slate-400 text-lg">✓</span>
            </div>
          </div>

          <DotMeter value={coordResult} max={20} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: `B [${fmt(vecB[0])}, ${fmt(vecB[1])}]` },
            { id: 'A', vec: vecA, color: '#E11D48', marker: 'red',  label: `A [${fmt(vecA[0])}, ${fmt(vecA[1])}]` },
          ]}
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 3.12 — Question: Why Does Signal Strength Matter?
// ═══════════════════════════════════════════════════════════════

export const Scene3_12_WhySignalMatters: React.FC = () => (
  <QuestionSlide
    emoji="📡"
    question="Two movies both score 60% action. One has 10 reviews, the other has 10,000. Should they rank the same?"
    hint="The direction (genre ratio) is the same. But the magnitude (number of reviews, confidence) is very different."
    subHint="The dot product naturally rewards both — direction AND strength. Cosine similarity only cares about direction."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 3.13 — Signal Strength Sandbox
// ═══════════════════════════════════════════════════════════════

export const Scene3_13_SignalStrength: React.FC = () => {
  const [prefAction, setPrefAction] = useState(60);
  const [prefComedy, setPrefComedy] = useState(40);

  const userVec: Vec2 = [prefAction / 20, prefComedy / 20]; // scale to canvas coords

  const movies = [
    { id: 'm1', name: 'Indie Comedy',    vec: [0.5, 4.0] as Vec2, color: '#7C3AED', marker: 'violet' },
    { id: 'm2', name: 'Blockbuster',     vec: [4.5, 0.8] as Vec2, color: '#E11D48', marker: 'red' },
    { id: 'm3', name: 'Balanced Drama',  vec: [2.2, 2.2] as Vec2, color: '#0284C7', marker: 'blue' },
  ];

  const getMetrics = (mVec: Vec2) => {
    const d = dot2(userVec, mVec);
    const cos = d / (mag2(userVec) * mag2(mVec) || 1);
    return { dot: d, cos };
  };

  const sorted = [...movies].sort((a, b) => getMetrics(b.vec).dot - getMetrics(a.vec).dot);

  return (
    <SlideLayout
      title="Signal Strength Sandbox"
      text="Adjust your preference vector and watch which movies rank higher. Notice how dot product rewards both direction AND magnitude."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1 text-slate-600">
                <span>Action preference</span>
                <span className="text-loss">{prefAction}</span>
              </div>
              <input type="range" min="0" max="100" value={prefAction}
                onChange={e => setPrefAction(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1 text-slate-600">
                <span>Comedy preference</span>
                <span className="text-vector">{prefComedy}</span>
              </div>
              <input type="range" min="0" max="100" value={prefComedy}
                onChange={e => setPrefComedy(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Rankings by dot product</span>
            {sorted.map((m, rank) => {
              const metrics = getMetrics(m.vec);
              return (
                <div key={m.id}
                  className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white font-black`}
                      style={{ backgroundColor: m.color }}>
                      {rank + 1}
                    </span>
                    <span className="text-slate-600">{m.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-emerald-600">dot: {metrics.dot.toFixed(1)}</span>
                    <span className="text-violet-500 text-[10px]">cos: {metrics.cos.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 font-medium px-1 leading-relaxed">
            Change preferences and notice how rankings shift — especially for the Blockbuster's large magnitude.
          </p>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'user', vec: userVec, color: '#059669', marker: 'green', label: 'You', width: 3 },
            ...movies.map(m => ({ id: m.id, vec: m.vec, color: m.color, marker: m.marker, label: m.name })),
          ]}
        />
      </div>
    </SlideLayout>
  );
};
