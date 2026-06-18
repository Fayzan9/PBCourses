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

const PC1_RAD = (45 * Math.PI) / 180; // optimal angle for this data
const REACH = 56;

function sx(x: number) { return PAD.l + (x / 100) * PW; }
function sy(y: number) { return PAD.t + PH - (y / 100) * PH; }

const projData = POINTS.map(([x, y]) => {
  const t = (x - MEAN_X) * Math.cos(PC1_RAD) + (y - MEAN_Y) * Math.sin(PC1_RAD);
  return {
    ox: sx(x), oy: sy(y),
    px: sx(MEAN_X + t * Math.cos(PC1_RAD)),
    py: sy(MEAN_Y + t * Math.sin(PC1_RAD)),
  };
});

// PC1 axis endpoints in SVG space
const ax1 = sx(MEAN_X - REACH * Math.cos(PC1_RAD));
const ay1 = sy(MEAN_Y - REACH * Math.sin(PC1_RAD));
const ax2 = sx(MEAN_X + REACH * Math.cos(PC1_RAD));
const ay2 = sy(MEAN_Y + REACH * Math.sin(PC1_RAD));

export const Scene7_4_FirstComponent: React.FC = () => (
  <div className={LAYOUT_CONFIG.containerClass}>

    {/* ── LEFT: SVG ─────────────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.leftSideClass}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet">
        <defs>
          <clipPath id="ch7s4-clip">
            <rect x={PAD.l} y={PAD.t} width={PW} height={PH} />
          </clipPath>
          <marker id="ch7s4-arr" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
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

        {/* Drop lines: point → projection */}
        <g clipPath="url(#ch7s4-clip)">
          {projData.map((p, i) => (
            <motion.line key={i} x1={p.ox} y1={p.oy} x2={p.px} y2={p.py}
              stroke="#a5b4fc" strokeWidth="1" strokeDasharray="3 2"
              initial={{ opacity: 0 }} animate={{ opacity: 0.55 }}
              transition={{ delay: 0.6 + i * 0.04 }} />
          ))}
        </g>

        {/* PC1 axis with arrow */}
        <motion.line x1={ax1} y1={ay1} x2={ax2} y2={ay2}
          stroke="#4f46e5" strokeWidth="3.5" clipPath="url(#ch7s4-clip)"
          markerEnd="url(#ch7s4-arr)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} />

        {/* Projected dots on axis */}
        <g clipPath="url(#ch7s4-clip)">
          {projData.map((p, i) => (
            <motion.circle key={i} cx={p.px} cy={p.py} r={5}
              fill="#4f46e5" stroke="white" strokeWidth="1.2"
              initial={{ opacity: 0 }} animate={{ opacity: 0.9 }}
              transition={{ delay: 0.6 + i * 0.05 }} />
          ))}
        </g>

        {/* Data points */}
        {POINTS.map(([x, y], i) => (
          <circle key={i} cx={sx(x)} cy={sy(y)} r={6.5}
            fill="#1e293b" opacity="0.5" stroke="white" strokeWidth="1.2" />
        ))}

        {/* Center */}
        <circle cx={sx(MEAN_X)} cy={sy(MEAN_Y)} r={5} fill="#1e293b" stroke="white" strokeWidth="2" />

        {/* "PC 1" label near arrow tip */}
        <motion.text x={ax2 - 6} y={ay2 - 10} fill="#4f46e5"
          fontSize="15" fontWeight="900" textAnchor="end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
          PC 1
        </motion.text>

        {/* "Max variance" callout */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
          <rect x={PAD.l + 8} y={PAD.t + 10} width={155} height={26} rx="6"
            fill="#eef2ff" stroke="#c7d2fe" />
          <text x={PAD.l + 86} y={PAD.t + 27} textAnchor="middle"
            fill="#4f46e5" fontSize="12" fontWeight="800">Maximum spread direction</text>
        </motion.g>
      </svg>
    </div>

    {/* ── RIGHT: Explanation ────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.rightSideClass}>
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
          Chapter 7 · Scene 4
        </p>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
          The First<br /><span className="text-indigo-500">Principal Component</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          PC1 is the unit vector along which projected data shows the <strong>maximum spread</strong>.
          Each black dot casts a shadow (purple dot) onto the line — those shadows span the widest possible range.
        </p>
      </div>

      {/* Formal definition */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-bold mb-3">
          Formal Definition
        </p>
        <div className="flex justify-center mb-2">
          <MathTex tex="\mathbf{u}_1 = \underset{\|\mathbf{u}\|=1}{\operatorname{argmax}} \;\operatorname{Var}(\mathbf{u}^\top \mathbf{X})" />
        </div>
        <p className="text-center text-indigo-700 text-xs font-semibold mt-2">
          Find the unit vector that maximises variance of projected data.
        </p>
      </div>

      {/* Key properties */}
      <div className="flex flex-col gap-1.5">
        {[
          { icon: '📏', title: '||u₁|| = 1', desc: 'Direction only — no scale', bg: 'bg-indigo-50 border-indigo-100' },
          { icon: '📊', title: 'Max variance', desc: 'No other direction captures more spread', bg: 'bg-emerald-50 border-emerald-100' },
          { icon: '🎯', title: 'Centred on μ', desc: 'The axis passes through the data mean', bg: 'bg-sky-50 border-sky-100' },
        ].map(({ icon, title, desc, bg }) => (
          <div key={title} className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-xs font-semibold text-slate-700 ${bg}`}>
            <span className="text-base shrink-0">{icon}</span>
            <div><div className="font-black">{title}</div><div className="opacity-70 mt-0.5">{desc}</div></div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          <strong className="text-slate-700">No brute-force search needed.</strong> PC1 is the{' '}
          <span className="text-indigo-600 font-bold">eigenvector</span> of the covariance matrix
          with the largest eigenvalue — we'll derive this next.
        </p>
      </div>
    </div>
  </div>
);

export default Scene7_4_FirstComponent;
