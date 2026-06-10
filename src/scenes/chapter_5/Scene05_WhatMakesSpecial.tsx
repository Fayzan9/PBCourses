import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 4 cases of λ — shown simultaneously in a 2×2 grid
const CASES = [
  {
    id: 0, λ: 3,   label: 'Stretch',  tag: 'λ = 3',   color: '#10B981', bg: '#f0fdf4',
    border: '#86efac', markerFill: '#10B981',
    idea: 'Same direction — but 3× longer.',
    why: 'M amplifies this direction. The bigger λ, the more "important" this direction is to the matrix.',
  },
  {
    id: 1, λ: 0.4, label: 'Shrink',   tag: 'λ = 0.4', color: '#0284C7', bg: '#eff6ff',
    border: '#93c5fd', markerFill: '#0284C7',
    idea: 'Same direction — but shorter.',
    why: 'M dampens this direction. Small positive λ means the direction survives but matters less.',
  },
  {
    id: 2, λ: -1,  label: 'Flip',     tag: 'λ = −1',  color: '#E11D48', bg: '#fff1f2',
    border: '#fda4af', markerFill: '#E11D48',
    idea: 'Reversed — pointing the opposite way.',
    why: 'Negative λ still means eigenvector! The direction flips 180° but stays on the same line.',
  },
  {
    id: 3, λ: 0,   label: 'Erase',    tag: 'λ = 0',   color: '#7C3AED', bg: '#faf5ff',
    border: '#c4b5fd', markerFill: '#7C3AED',
    idea: 'Collapsed to zero — the direction is gone.',
    why: 'λ=0 means the matrix flattens this direction entirely. This is related to rank and null space.',
  },
];

const W = 700, H = 680;
// Quadrant centres
const QC = [
  { cx: 175, cy: 170 }, // TL
  { cx: 525, cy: 170 }, // TR
  { cx: 175, cy: 510 }, // BL
  { cx: 525, cy: 510 }, // BR
];
const SC = 62; // pixels per unit

function panelArrows(cx: number, cy: number, λ: number, color: string, markerId: string) {
  const inX = cx + SC, inY = cy;        // unit input [1,0]
  const outX = cx + λ * SC, outY = cy;  // λ·[1,0]

  return (
    <>
      {/* Input ghost */}
      <line x1={cx} y1={cy} x2={inX} y2={inY}
        stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 3"
        markerEnd={`url(#m-gray-${markerId})`} />
      <text x={inX + 5} y={inY - 8} fontSize="10" fontWeight="700" fill="#94a3b8">v</text>

      {/* Output */}
      {Math.abs(λ) > 0.01 ? (
        <>
          <motion.line x1={cx} y1={cy} x2={outX} y2={outY}
            stroke={color} strokeWidth="5"
            markerEnd={`url(#m-col-${markerId})`}
            initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
            transition={{ type: 'spring', stiffness: 100, damping: 14 }}
          />
          {/* λ·v label */}
          <text x={outX + (λ > 0 ? 6 : -44)} y={outY - 8}
            fontSize="10" fontWeight="800" fill={color}>λ·v</text>
          {/* Scale bracket */}
          <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <line x1={cx} y1={cy + 26} x2={outX} y2={cy + 26}
              stroke={color} strokeWidth="1.5" opacity={0.5} />
            <line x1={cx}   y1={cy + 20} x2={cx}   y2={cy + 32} stroke={color} strokeWidth="1.5" opacity={0.5} />
            <line x1={outX} y1={cy + 20} x2={outX} y2={cy + 32} stroke={color} strokeWidth="1.5" opacity={0.5} />
            <text x={(cx + outX) / 2} y={cy + 42}
              fontSize="10" fontWeight="800" fill={color} textAnchor="middle">×{λ}</text>
          </motion.g>
        </>
      ) : (
        /* λ=0 — dot at origin */
        <motion.circle cx={cx} cy={cy} r={8} fill={color}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ type: 'spring', stiffness: 200 }}
        />
      )}

      {/* Origin dot */}
      <circle cx={cx} cy={cy} r={4} fill="#0f172a" />
    </>
  );
}

export const Scene5_5_WhatMakesSpecial: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);
  const sel = active !== null ? CASES[active] : null;

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ── LEFT 70% ── */}
      <div className="flex flex-col items-center justify-center gap-2 px-4" style={{ flex: '0 0 70%' }}>

        <div className="text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-black">Chapter 5 · Scene 5</p>
          <h2 className="text-xl font-black text-slate-800 mt-0.5">
            λ is the <span className="text-emerald-600">fate</span> of an eigenvector.
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Four possible stories — click any panel to explore.
          </p>
        </div>

        {/* 2×2 grid SVG */}
        <div className="rounded-2xl overflow-hidden flex-shrink-0"
          style={{ width: W, height: H, maxWidth: '100%', maxHeight: '82vh',
                   background: '#f8fafc', border: '1px solid #e2e8f0',
                   boxShadow: '0 1px 10px rgba(0,0,0,0.06)' }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            <defs>
              {CASES.map(c => (
                <React.Fragment key={c.id}>
                  <marker id={`m-gray-${c.id}`} markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                    <polygon points="0,0 5,3 0,6" fill="#94a3b8" />
                  </marker>
                  <marker id={`m-col-${c.id}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <polygon points="0,0 6,3 0,6" fill={c.markerFill} />
                  </marker>
                </React.Fragment>
              ))}
            </defs>

            {/* Divider lines */}
            <line x1={350} y1={10} x2={350} y2={H-10} stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1={10} y1={340} x2={W-10} y2={340} stroke="#e2e8f0" strokeWidth="1.5" />

            {/* 4 panels */}
            {CASES.map((c, i) => {
              const { cx, cy } = QC[i];
              const isActive = active === i;
              return (
                <g key={i} onClick={() => setActive(active === i ? null : i)} style={{ cursor: 'pointer' }}>
                  {/* Panel background */}
                  <motion.rect
                    x={i % 2 === 0 ? 2 : 352} y={i < 2 ? 2 : 342}
                    width={346} height={336} rx={14}
                    fill={c.bg} opacity={isActive ? 0.95 : 0.55}
                    animate={{ opacity: isActive ? 0.95 : 0.55 }}
                  />
                  {/* Active border */}
                  {isActive && (
                    <motion.rect
                      x={i % 2 === 0 ? 3 : 353} y={i < 2 ? 3 : 343}
                      width={344} height={334} rx={13}
                      fill="none" stroke={c.border} strokeWidth="2.5"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    />
                  )}

                  {/* Case label */}
                  <text x={cx} y={cy - 80} textAnchor="middle"
                    fontSize="13" fontWeight="900" fill={c.color}>{c.label}</text>
                  <rect x={cx - 28} y={cy - 68} width={56} height={18} rx={6} fill={c.color} opacity={0.15} />
                  <text x={cx} y={cy - 55} textAnchor="middle"
                    fontSize="11" fontWeight="800" fill={c.color}>{c.tag}</text>

                  {/* Arrows */}
                  {panelArrows(cx, cy, c.λ, c.color, String(i))}

                  {/* Idea text */}
                  <text x={cx} y={cy + 78} textAnchor="middle"
                    fontSize="11" fontWeight="600" fill="#64748b">{c.idea}</text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* ── RIGHT 30% ── */}
      <div className="flex flex-col gap-4 justify-center py-6 pr-6" style={{ flex: '0 0 30%' }}>

        {/* Equation */}
        <div className="bg-slate-800 rounded-2xl p-4 shadow-lg">
          <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mb-2">The eigenvalue equation</p>
          <p className="text-2xl font-black font-mono tracking-wide">
            <span className="text-sky-300">M</span>
            <span className="text-slate-300"> · </span>
            <span className="text-violet-400">v</span>
            <span className="text-slate-300"> = </span>
            <span className="text-emerald-400">λ</span>
            <span className="text-slate-300"> · </span>
            <span className="text-violet-400">v</span>
          </p>
          <p className="text-xs text-slate-400 mt-2 leading-snug">
            <span className="text-violet-300 font-bold">v</span> is the direction. {' '}
            <span className="text-emerald-300 font-bold">λ</span> is what happens to it.
            A single number captures the entire effect of M on that direction.
          </p>
        </div>

        {/* Key insight */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs font-black text-amber-600 uppercase tracking-wider mb-1.5">Key Insight</p>
          <p className="text-sm font-bold text-amber-900 leading-snug">
            λ is the <em>magnification factor</em> along the eigenvector.
          </p>
          <p className="text-xs text-amber-700 mt-1.5 leading-snug">
            Large |λ| → M cares a lot about this direction.<br />
            λ = 0 → M destroys this direction entirely.
          </p>
        </div>

        {/* Active panel detail */}
        <div className="min-h-[100px]">
          <AnimatePresence mode="wait">
            {!sel && (
              <motion.p key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-slate-300 text-sm italic text-center py-4">
                ← Click a panel to learn more
              </motion.p>
            )}
            {sel && (
              <motion.div key={sel.id}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl p-4 border-2"
                style={{ borderColor: sel.border, backgroundColor: sel.bg }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl font-black font-mono" style={{ color: sel.color }}>{sel.tag}</span>
                  <span className="text-sm font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: sel.color }}>{sel.label}</span>
                </div>
                <p className="text-sm font-bold text-slate-700 mb-1">{sel.idea}</p>
                <p className="text-xs text-slate-500 leading-snug">{sel.why}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Why it matters */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Why ML cares</p>
          <p className="text-xs text-slate-500 leading-snug">
            In <strong className="text-slate-700">PCA</strong>, the eigenvector with the <strong className="text-slate-700">largest λ</strong> is the direction your data spreads most — the first principal component.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Scene5_5_WhatMakesSpecial;
