import React from 'react';
import { motion } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { Math as MathTex } from '../../components/Math';

const W = 640, H = 440;
const PAD = { l: 56, r: 20, t: 20, b: 46 };
const PW = W - PAD.l - PAD.r, PH = H - PAD.t - PAD.b;

const POINTS: [number, number][] = [
  [8, 10],  [13, 15], [18, 14], [22, 25], [28, 30],
  [33, 28], [37, 40], [42, 45], [47, 42], [52, 55],
  [58, 60], [63, 58], [67, 70], [72, 72], [75, 68],
  [80, 82], [85, 80], [88, 90], [20, 18], [44, 48],
  [60, 65], [70, 65], [30, 35], [50, 48], [78, 75],
];

const MEAN_X = POINTS.reduce((s, [x]) => s + x, 0) / POINTS.length;
const MEAN_Y = POINTS.reduce((s, [, y]) => s + y, 0) / POINTS.length;

const REACH = 56;
const PC1_RAD = (45 * Math.PI) / 180;
const PC2_RAD = (135 * Math.PI) / 180;

function sx(x: number) { return PAD.l + (x / 100) * PW; }
function sy(y: number) { return PAD.t + PH - (y / 100) * PH; }

// Projections onto PC2 (to show small spread)
const pc2Projs = POINTS.map(([x, y]) => {
  const t = (x - MEAN_X) * Math.cos(PC2_RAD) + (y - MEAN_Y) * Math.sin(PC2_RAD);
  return {
    ox: sx(x), oy: sy(y),
    px: sx(MEAN_X + t * Math.cos(PC2_RAD)),
    py: sy(MEAN_Y + t * Math.sin(PC2_RAD)),
  };
});

// Axis endpoints
const pc1x1 = sx(MEAN_X - REACH * Math.cos(PC1_RAD)), pc1y1 = sy(MEAN_Y - REACH * Math.sin(PC1_RAD));
const pc1x2 = sx(MEAN_X + REACH * Math.cos(PC1_RAD)), pc1y2 = sy(MEAN_Y + REACH * Math.sin(PC1_RAD));
const pc2x1 = sx(MEAN_X - REACH * Math.cos(PC2_RAD)), pc2y1 = sy(MEAN_Y - REACH * Math.sin(PC2_RAD));
const pc2x2 = sx(MEAN_X + REACH * Math.cos(PC2_RAD)), pc2y2 = sy(MEAN_Y + REACH * Math.sin(PC2_RAD));

// Right-angle marker: L-shape in the corner between PC1 and PC2
// PC1 SVG direction: (cos45°, -sin45°) = (0.707, -0.707)
// PC2 SVG direction: (cos135°, -sin135°) = (-0.707, -0.707)
const cx_svg = sx(MEAN_X), cy_svg = sy(MEAN_Y);
const RA_SIZE = 11;
const ra_p1x = cx_svg + RA_SIZE * 0.707, ra_p1y = cy_svg - RA_SIZE * 0.707; // along PC1
const ra_p2x = cx_svg - RA_SIZE * 0.707, ra_p2y = cy_svg - RA_SIZE * 0.707; // along PC2
const ra_p3x = cx_svg, ra_p3y = cy_svg - RA_SIZE * 1.414;                    // corner

export const Scene7_5_OrthogonalityRule: React.FC = () => (
  <div className={LAYOUT_CONFIG.containerClass}>

    {/* ── LEFT: SVG ─────────────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.leftSideClass}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="ch7s5-clip">
            <rect x={PAD.l} y={PAD.t} width={PW} height={PH} />
          </clipPath>
          <marker id="ch7s5-arr1" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
          </marker>
          <marker id="ch7s5-arr2" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#059669" />
          </marker>
        </defs>

        {/* Grid */}
        {[0, 25, 50, 75, 100].map(v => (
          <React.Fragment key={v}>
            <line x1={sx(v)} y1={PAD.t} x2={sx(v)} y2={PAD.t + PH} stroke="#e2e8f0" />
            <line x1={PAD.l} y1={sy(v)} x2={PAD.l + PW} y2={sy(v)} stroke="#e2e8f0" />
          </React.Fragment>
        ))}
        <line x1={PAD.l} y1={PAD.t + PH} x2={PAD.l + PW} y2={PAD.t + PH} stroke="#94a3b8" strokeWidth="1.5" />
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + PH} stroke="#94a3b8" strokeWidth="1.5" />
        <text x={PAD.l + PW / 2} y={H - 8} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">Feature 1</text>
        <text x={13} y={PAD.t + PH / 2} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600"
          transform={`rotate(-90,13,${PAD.t + PH / 2})`}>Feature 2</text>

        {/* PC2 drop lines (faint emerald) */}
        <g clipPath="url(#ch7s5-clip)">
          {pc2Projs.map((p, i) => (
            <motion.line key={i} x1={p.ox} y1={p.oy} x2={p.px} y2={p.py}
              stroke="#6ee7b7" strokeWidth="1" strokeDasharray="3 2"
              initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
              transition={{ delay: 1.0 + i * 0.03 }} />
          ))}
        </g>

        {/* PC1 axis (indigo) */}
        <motion.line x1={pc1x1} y1={pc1y1} x2={pc1x2} y2={pc1y2}
          stroke="#4f46e5" strokeWidth="3.5" clipPath="url(#ch7s5-clip)"
          markerEnd="url(#ch7s5-arr1)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} />

        {/* PC2 axis (emerald) */}
        <motion.line x1={pc2x1} y1={pc2y1} x2={pc2x2} y2={pc2y2}
          stroke="#059669" strokeWidth="3.5" clipPath="url(#ch7s5-clip)"
          markerEnd="url(#ch7s5-arr2)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }} />

        {/* Right-angle marker (L-shape between PC1 and PC2) */}
        <motion.polyline
          points={`${ra_p1x},${ra_p1y} ${ra_p3x},${ra_p3y} ${ra_p2x},${ra_p2y}`}
          fill="none" stroke="#f59e0b" strokeWidth="2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} />

        {/* PC2 projected dots (small spread) */}
        <g clipPath="url(#ch7s5-clip)">
          {pc2Projs.map((p, i) => (
            <motion.circle key={i} cx={p.px} cy={p.py} r={4.5}
              fill="#059669" stroke="white" strokeWidth="1"
              initial={{ opacity: 0 }} animate={{ opacity: 0.85 }}
              transition={{ delay: 1.0 + i * 0.04 }} />
          ))}
        </g>

        {/* Data points */}
        {POINTS.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y)} r={6}
            fill="#1e293b" opacity="0.45" stroke="white" strokeWidth="1.2" />
        ))}
        <circle cx={cx_svg} cy={cy_svg} r={5} fill="#1e293b" stroke="white" strokeWidth="2" />

        {/* Labels */}
        <motion.text x={pc1x2 - 4} y={pc1y2 - 10} fill="#4f46e5"
          fontSize="14" fontWeight="900" textAnchor="end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          PC 1
        </motion.text>
        <motion.text x={pc2x2 + 6} y={pc2y2 + 16} fill="#059669"
          fontSize="14" fontWeight="900"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          PC 2
        </motion.text>
        <motion.text x={cx_svg + 14} y={cy_svg - 18} fill="#f59e0b"
          fontSize="12" fontWeight="900"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
          90°
        </motion.text>
      </svg>
    </div>

    {/* ── RIGHT: Explanation ────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.rightSideClass}>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
          Chapter 7 · Scene 5
        </p>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
          The Orthogonality<br /><span className="text-emerald-500">Rule</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Once PC1 is fixed, PC2 must be <strong>perpendicular</strong> to it. PC2 captures the
          next highest amount of remaining variance — orthogonality ensures no information overlaps.
        </p>
      </div>

      {/* Constraint */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 font-bold mb-3">
          Orthogonality Constraint
        </p>
        <div className="flex justify-center mb-2">
          <MathTex tex="\mathbf{u}_1 \cdot \mathbf{u}_2 = 0" />
        </div>
        <p className="text-center text-emerald-700 text-xs font-semibold mt-1">
          The dot product = 0 means the two directions share zero information.
        </p>
      </div>

      {/* Variance bars */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
          Variance Captured
        </p>
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-indigo-600">PC 1</span>
            <span className="text-indigo-600">~94%</span>
          </div>
          <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <motion.div className="bg-indigo-500 h-2.5 rounded-full"
              initial={{ width: 0 }} animate={{ width: '94%' }} transition={{ delay: 1.4, duration: 0.9 }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-emerald-600">PC 2</span>
            <span className="text-emerald-600">~6%</span>
          </div>
          <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <motion.div className="bg-emerald-500 h-2.5 rounded-full"
              initial={{ width: 0 }} animate={{ width: '6%' }} transition={{ delay: 1.7, duration: 0.9 }} />
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="flex flex-col gap-1.5">
        {[
          { label: 'Independent', desc: 'PCs encode non-overlapping information', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
          { label: 'Ordered', desc: 'PC1 > PC2 > PC3 … by variance explained', color: 'bg-indigo-50 border-indigo-100 text-indigo-700' },
          { label: 'Complete', desc: 'd PCs together exactly reconstruct all data', color: 'bg-sky-50 border-sky-100 text-sky-700' },
        ].map(({ label, desc, color }) => (
          <div key={label} className={`flex flex-col px-3 py-2 rounded-xl border text-xs font-semibold ${color}`}>
            <span className="font-black">{label}</span>
            <span className="opacity-75 mt-0.5">{desc}</span>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          <strong className="text-slate-700">Key insight:</strong> all d PCs together form an{' '}
          <span className="text-indigo-600 font-bold">orthonormal basis</span> — a new coordinate
          system perfectly aligned with the data's natural structure.
        </p>
      </div>
    </div>
  </div>
);

export default Scene7_5_OrthogonalityRule;
