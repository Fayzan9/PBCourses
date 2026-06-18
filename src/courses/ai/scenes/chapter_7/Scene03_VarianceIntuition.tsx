import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

// ─── Canvas dimensions ────────────────────────────────────────────────────────
const W = 640;
const H = 420;
const PAD = { l: 56, r: 20, t: 20, b: 46 };
const PW = W - PAD.l - PAD.r;
const PH = H - PAD.t - PAD.b;

// Same correlated scatter as Scene 2
const POINTS: [number, number][] = [
  [8, 10],  [13, 15], [18, 14], [22, 25], [28, 30],
  [33, 28], [37, 40], [42, 45], [47, 42], [52, 55],
  [58, 60], [63, 58], [67, 70], [72, 72], [75, 68],
  [80, 82], [85, 80], [88, 90], [20, 18], [44, 48],
  [60, 65], [70, 65], [30, 35], [50, 48], [78, 75],
];

const MEAN_X = POINTS.reduce((s, [x]) => s + x, 0) / POINTS.length; // ≈ 49.6
const MEAN_Y = POINTS.reduce((s, [, y]) => s + y, 0) / POINTS.length; // ≈ 49.5

// Map data [0–100] → SVG pixels
function sx(x: number) { return PAD.l + (x / 100) * PW; }
function sy(y: number) { return PAD.t + PH - (y / 100) * PH; }

// ─── Pre-compute max variance across all integer angles ──────────────────────
function computeVariance(angleDeg: number): number {
  const rad = (angleDeg * Math.PI) / 180;
  const ts = POINTS.map(([x, y]) =>
    (x - MEAN_X) * Math.cos(rad) + (y - MEAN_Y) * Math.sin(rad)
  );
  const mt = ts.reduce((s, t) => s + t, 0) / ts.length;
  return ts.reduce((s, t) => s + (t - mt) ** 2, 0) / ts.length;
}

const MAX_VARIANCE = (() => {
  let max = 0;
  for (let a = 0; a < 180; a++) {
    const v = computeVariance(a);
    if (v > max) max = v;
  }
  return max;
})();

// Optimal angle (≈ 45° for this data)
const BEST_ANGLE = (() => {
  let best = 0, bestV = 0;
  for (let a = 0; a < 180; a++) {
    const v = computeVariance(a);
    if (v > bestV) { bestV = v; best = a; }
  }
  return best;
})();

export const Scene7_3_VarianceIntuition: React.FC = () => {
  const [angle, setAngle] = useState(0);
  const [showBest, setShowBest] = useState(false);

  const rad = (angle * Math.PI) / 180;
  const variance = useMemo(() => computeVariance(angle), [angle]);
  const varPct = variance / MAX_VARIANCE;

  // Projection axis endpoints in data space (extend ±60 units from mean)
  const AXIS_REACH = 60;
  const axisX1 = sx(MEAN_X - AXIS_REACH * Math.cos(rad));
  const axisY1 = sy(MEAN_Y - AXIS_REACH * Math.sin(rad));
  const axisX2 = sx(MEAN_X + AXIS_REACH * Math.cos(rad));
  const axisY2 = sy(MEAN_Y + AXIS_REACH * Math.sin(rad));

  // Per-point projections
  const projections = useMemo(() => POINTS.map(([x, y]) => {
    const t = (x - MEAN_X) * Math.cos(rad) + (y - MEAN_Y) * Math.sin(rad);
    const projDataX = MEAN_X + t * Math.cos(rad);
    const projDataY = MEAN_Y + t * Math.sin(rad);
    return {
      dotX: sx(x), dotY: sy(y),
      projX: sx(projDataX), projY: sy(projDataY),
    };
  }), [rad]);

  // Variance bar color: rose → amber → emerald as variance increases
  const barColor = varPct > 0.75
    ? '#4f46e5'   // indigo – high variance
    : varPct > 0.45
      ? '#f59e0b' // amber – medium
      : '#f43f5e'; // rose – low

  const isNearBest = Math.abs(angle - BEST_ANGLE) <= 4 ||
    Math.abs(angle - BEST_ANGLE + 180) <= 4;

  return (
    <div className={LAYOUT_CONFIG.containerClass}>

      {/* ── LEFT: Interactive SVG + Slider ──────────────────────────── */}
      <div className={
        LAYOUT_CONFIG.leftSideClass.replace(
          'flex items-center justify-center',
          'flex flex-col items-center justify-center'
        ) + ' gap-3'
      }>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', flex: '1 1 0', minHeight: 0 }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <clipPath id="ch7s3-plot">
              <rect x={PAD.l} y={PAD.t} width={PW} height={PH} />
            </clipPath>
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
            stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={PAD.l} y1={PAD.t} x2={PAD.l} y2={PAD.t + PH}
            stroke="#94a3b8" strokeWidth="1.5" />

          {/* Axis labels */}
          <text x={PAD.l + PW / 2} y={H - 8} textAnchor="middle"
            fill="#94a3b8" fontSize="12" fontWeight="600">Feature 1</text>
          <text x={13} y={PAD.t + PH / 2} textAnchor="middle"
            fill="#94a3b8" fontSize="12" fontWeight="600"
            transform={`rotate(-90, 13, ${PAD.t + PH / 2})`}>Feature 2</text>

          {/* Drop lines: point → projection */}
          <g clipPath="url(#ch7s3-plot)">
            {projections.map((p, i) => (
              <line key={`drop-${i}`}
                x1={p.dotX} y1={p.dotY}
                x2={p.projX} y2={p.projY}
                stroke="#a5b4fc" strokeWidth="1" strokeDasharray="3 2"
                opacity="0.6"
              />
            ))}
          </g>

          {/* Projection axis line */}
          <line
            x1={axisX1} y1={axisY1}
            x2={axisX2} y2={axisY2}
            stroke={barColor}
            strokeWidth="3"
            clipPath="url(#ch7s3-plot)"
          />

          {/* Projected dots on the axis */}
          <g clipPath="url(#ch7s3-plot)">
            {projections.map((p, i) => (
              <circle key={`proj-${i}`}
                cx={p.projX} cy={p.projY} r={5}
                fill={barColor} opacity="0.9"
                stroke="white" strokeWidth="1.2"
              />
            ))}
          </g>

          {/* Original data points */}
          {POINTS.map(([x, y], i) => (
            <circle key={`pt-${i}`}
              cx={sx(x)} cy={sy(y)} r={6.5}
              fill="#1e293b" opacity="0.6"
              stroke="white" strokeWidth="1.2"
            />
          ))}

          {/* Center dot */}
          <circle cx={sx(MEAN_X)} cy={sy(MEAN_Y)} r={5}
            fill="#1e293b" stroke="white" strokeWidth="2" />

          {/* "PC1" label when at best angle */}
          <AnimatePresence>
            {isNearBest && (
              <motion.text
                key="pc1label"
                x={axisX2 - 10} y={axisY2 - 12}
                fill="#4f46e5" fontSize="16" fontWeight="900"
                textAnchor="end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                PC 1 ✓
              </motion.text>
            )}
          </AnimatePresence>
        </svg>

        {/* Slider control */}
        <div className="w-full px-3 pb-1 shrink-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider">
              Rotate projection axis
            </span>
            <span className="text-[11px] font-mono text-slate-600 font-black">
              θ = {angle}°
            </span>
          </div>
          <input
            type="range"
            min={0} max={179} step={1}
            value={angle}
            onChange={e => { setAngle(Number(e.target.value)); setShowBest(false); }}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-indigo-500"
          />
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-slate-400">0°</span>
            <span className="text-[10px] text-slate-400">90°</span>
            <span className="text-[10px] text-slate-400">179°</span>
          </div>
        </div>

      </div>

      {/* ── RIGHT: Sidebar ───────────────────────────────────────────── */}
      <div className={LAYOUT_CONFIG.rightSideClass}>

        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
            Chapter 7 · Scene 3
          </p>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            Variance{' '}
            <span className="text-indigo-500">= Signal</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            Drag the slider to rotate the projection axis. Watch how the spread
            of the projected points (colored dots on the line) changes. More
            spread = more signal captured.
          </p>
        </div>

        {/* Live variance gauge */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Variance captured
            </span>
            <span className="text-lg font-black" style={{ color: barColor }}>
              {(varPct * 100).toFixed(1)}%
            </span>
          </div>
          <div className="bg-slate-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full"
              style={{ backgroundColor: barColor }}
              animate={{ width: `${varPct * 100}%` }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-slate-400">
            <span>Low (noise)</span>
            <span>High (signal)</span>
          </div>
        </div>

        {/* Current angle status */}
        <AnimatePresence mode="wait">
          {isNearBest ? (
            <motion.div key="best"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-indigo-50 border border-indigo-300 rounded-xl text-sm font-bold text-indigo-700 flex items-center gap-2"
            >
              <span className="text-lg">🎯</span>
              <span>You found <strong>PC 1</strong> — the direction of maximum variance!</span>
            </motion.div>
          ) : (
            <motion.div key="hint"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-semibold leading-relaxed"
            >
              Rotate toward <strong>~45°</strong>. Watch the projected points
              spread further apart. The spread <em>is</em> the variance.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Find best button */}
        <button
          onClick={() => { setAngle(BEST_ANGLE); setShowBest(true); }}
          className="w-full py-2.5 px-4 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-black rounded-xl transition-colors cursor-pointer"
        >
          Find Best Direction →
        </button>

        {/* Concept note */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            <strong className="text-slate-700">Principal Component 1 (PC 1)</strong> is
            defined as the unit vector that maximises the variance of projected points.
            PCA finds it analytically — no brute-force search needed.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-slate-700 opacity-60" />
            <span>Data points</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-indigo-400" />
            <span>Projected</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-6 border-t-2 border-dashed border-indigo-300" />
            <span>Drop line</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scene7_3_VarianceIntuition;
