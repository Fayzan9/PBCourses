import React from 'react';
import { motion } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

// ─── Canvas dimensions ────────────────────────────────────────────────────────
const W = 680;
const H = 460;
const PAD = { l: 62, r: 24, t: 24, b: 52 };
const PW = W - PAD.l - PAD.r;
const PH = H - PAD.t - PAD.b;

// Correlated scatter: y ≈ x + small noise (0–100 scale)
const POINTS: [number, number][] = [
  [8, 10],  [13, 15], [18, 14], [22, 25], [28, 30],
  [33, 28], [37, 40], [42, 45], [47, 42], [52, 55],
  [58, 60], [63, 58], [67, 70], [72, 72], [75, 68],
  [80, 82], [85, 80], [88, 90], [20, 18], [44, 48],
  [60, 65], [70, 65], [30, 35], [50, 48], [78, 75],
];

// Map data [0–100] → SVG pixels
function sx(x: number) { return PAD.l + (x / 100) * PW; }
function sy(y: number) { return PAD.t + PH - (y / 100) * PH; }

// ─── Vertical drop lines (show redundancy) ───────────────────────────────────
// For each point draw a short line from point to the trend line (y = x) to show
// how close each point is to the 1-D diagonal.
function trendY(x: number) { return x; } // y = x on the line

export const Scene7_2_RedundancyProblem: React.FC = () => (
  <div className={LAYOUT_CONFIG.containerClass}>

    {/* ── LEFT: Scatter SVG ─────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.leftSideClass}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="ch7s2-plot">
            <rect x={PAD.l} y={PAD.t} width={PW} height={PH} />
          </clipPath>
          {/* Arrow head for main-direction annotation */}
          <marker id="ch7s2-arrow-indigo" markerWidth="8" markerHeight="6"
            refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
          </marker>
          <marker id="ch7s2-arrow-rose" markerWidth="8" markerHeight="6"
            refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#fb7185" />
          </marker>
        </defs>

        {/* Grid */}
        {[0, 25, 50, 75, 100].map(v => (
          <React.Fragment key={v}>
            <line x1={sx(v)} y1={PAD.t} x2={sx(v)} y2={PAD.t + PH}
              stroke="#e2e8f0" strokeWidth="1" />
            <line x1={PAD.l} y1={sy(v)} x2={PAD.l + PW} y2={sy(v)}
              stroke="#e2e8f0" strokeWidth="1" />
          </React.Fragment>
        ))}

        {/* Axes */}
        <line x1={PAD.l} y1={PAD.t + PH} x2={PAD.l + PW} y2={PAD.t + PH}
          stroke="#94a3b8" strokeWidth="2" />
        <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + PH}
          stroke="#94a3b8" strokeWidth="2" />

        {/* Tick labels */}
        {[0, 25, 50, 75, 100].map(v => (
          <React.Fragment key={v}>
            <text x={sx(v)} y={PAD.t + PH + 18} textAnchor="middle"
              fill="#94a3b8" fontSize="12">{v}</text>
            <text x={PAD.l - 8} y={sy(v) + 4} textAnchor="end"
              fill="#94a3b8" fontSize="12">{v}</text>
          </React.Fragment>
        ))}

        {/* Axis labels */}
        <text x={PAD.l + PW / 2} y={H - 8} textAnchor="middle"
          fill="#64748b" fontSize="14" fontWeight="700">
          Feature 1
        </text>
        <text
          x={14} y={PAD.t + PH / 2} textAnchor="middle"
          fill="#64748b" fontSize="14" fontWeight="700"
          transform={`rotate(-90, 14, ${PAD.t + PH / 2})`}
        >
          Feature 2
        </text>

        {/* Drop lines from each point to the trend diagonal */}
        <g clipPath="url(#ch7s2-plot)">
          {POINTS.map(([x, y], i) => (
            <motion.line
              key={`drop-${i}`}
              x1={sx(x)} y1={sy(y)}
              x2={sx(x)} y2={sy(trendY(x))}
              stroke="#6366f1"
              strokeWidth="1"
              strokeDasharray="3 2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              transition={{ delay: 1.6 + i * 0.03, duration: 0.3 }}
            />
          ))}
        </g>

        {/* Trend line: y = x */}
        <motion.line
          x1={sx(4)} y1={sy(4)}
          x2={sx(96)} y2={sy(96)}
          stroke="#6366f1"
          strokeWidth="2.5"
          strokeDasharray="9 5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          clipPath="url(#ch7s2-plot)"
        />

        {/* Data points */}
        {POINTS.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={sx(x)} cy={sy(y)} r={7}
            fill="#6366f1"
            stroke="white" strokeWidth="1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.82 }}
            transition={{ delay: 0.15 + i * 0.055, duration: 0.35 }}
          />
        ))}

        {/* Annotation: "Max variance — along the diagonal" */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.7, duration: 0.6 }}>
          <line
            x1={sx(30)} y1={sy(30)}
            x2={sx(68)} y2={sy(68)}
            stroke="#6366f1" strokeWidth="3"
            markerEnd="url(#ch7s2-arrow-indigo)"
          />
          <rect x={sx(43)} y={sy(53) - 22} width={148} height={22}
            fill="white" fillOpacity="0.85" rx="4" />
          <text x={sx(44)} y={sy(53) - 5}
            fill="#6366f1" fontSize="13" fontWeight="800">
            Most variation (Signal)
          </text>
        </motion.g>

        {/* Annotation: "Tiny spread perpendicular — near-redundant" */}
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 3.1, duration: 0.6 }}>
          {/* Small perpendicular tick mark at ~midpoint of trend */}
          <line
            x1={sx(63)} y1={sy(57)}
            x2={sx(57)} y2={sy(63)}
            stroke="#fb7185" strokeWidth="3"
            markerEnd="url(#ch7s2-arrow-rose)"
          />
          <rect x={sx(58)} y={sy(72) - 22} width={134} height={22}
            fill="white" fillOpacity="0.85" rx="4" />
          <text x={sx(59)} y={sy(72) - 5}
            fill="#fb7185" fontSize="13" fontWeight="800">
            Little variation (Noise)
          </text>
        </motion.g>
      </svg>
    </div>

    {/* ── RIGHT: Explanation ────────────────────────────────────────── */}
    <div className={LAYOUT_CONFIG.rightSideClass}>

      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
          Chapter 7 · Scene 2
        </p>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
          Most Dimensions<br />
          <span className="text-indigo-500">Are Redundant</span>
        </h2>
        <p className="text-slate-500 text-sm font-medium leading-relaxed">
          Both axes carry information — but they're <em>correlated</em>. Knowing Feature 1
          already tells you roughly what Feature 2 will be. We're storing two
          numbers, but the data is essentially <strong>one-dimensional</strong>.
        </p>
      </div>

      {/* Real AI example */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4">
        <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-bold mb-2">
          Real AI Example
        </p>
        <p className="text-slate-700 text-sm font-semibold leading-snug mb-3">
          GPT-4 produces <strong>1,536-dimensional</strong> embeddings. Yet research shows
          ~50 principal components capture <strong>95%</strong> of the meaningful
          variance.
        </p>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-indigo-100 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-indigo-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '95%' }}
              transition={{ delay: 2.0, duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] font-black text-indigo-600 shrink-0">95% in 50 dims</span>
        </div>
      </div>

      {/* Real-world examples */}
      <div className="flex flex-col gap-1.5">
        {[
          { icon: '🎵', text: 'Song features: tempo and key are correlated', color: 'bg-violet-50 border-violet-100 text-violet-700' },
          { icon: '🏠', text: 'House data: sq ft and room count move together', color: 'bg-sky-50 border-sky-100 text-sky-700' },
          { icon: '😊', text: 'Face images: adjacent pixels share nearly the same value', color: 'bg-emerald-50 border-emerald-100 text-emerald-700' },
        ].map(({ icon, text, color }) => (
          <div key={icon} className={`flex items-start gap-2 px-3 py-2 rounded-xl border text-xs font-semibold ${color}`}>
            <span className="text-base shrink-0">{icon}</span>
            <span>{text}</span>
          </div>
        ))}
      </div>

      {/* Key insight */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          <strong className="text-slate-700">The question:</strong> which single
          direction captures the <span className="text-indigo-600 font-bold">maximum spread</span> of
          the data? That direction is the first principal component.
        </p>
      </div>

    </div>
  </div>
);

export default Scene7_2_RedundancyProblem;
