import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSlideState } from '../../components/CourseStateContext';
import { Math as KaTeXMath } from '../../components/Math';

// Generate 16 points on a unit circle
function unitCirclePoints(n = 16): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n;
    return [Math.cos(angle), Math.sin(angle)];
  });
}

function applyRotation(pts: [number, number][], theta: number): [number, number][] {
  const c = Math.cos((theta * Math.PI) / 180);
  const s = Math.sin((theta * Math.PI) / 180);
  return pts.map(([x, y]) => [c * x - s * y, s * x + c * y]);
}

function applyScale(pts: [number, number][], s1: number, s2: number): [number, number][] {
  return pts.map(([x, y]) => [s1 * x, s2 * y]);
}

function toSVG(pts: [number, number][], cx: number, cy: number, scale: number): string {
  return pts.map(([x, y]) => `${cx + x * scale},${cy - y * scale}`).join(' ');
}

const STEPS = ['All', 'Vᵀ', 'Σ', 'U'] as const;
type StepKey = typeof STEPS[number];

export const Scene6_19_SVDInteractiveSandbox: React.FC = () => {
  const [activeStep, setActiveStep] = useSlideState<StepKey>('ch6_sandbox_step', 'All');
  const [sigma1, setSigma1] = useSlideState<number>('ch6_sandbox_sigma1', 2.5);
  const [sigma2, setSigma2] = useSlideState<number>('ch6_sandbox_sigma2', 1.0);
  const [thetaV, setThetaV] = useSlideState<number>('ch6_sandbox_theta_v', 30);
  const [thetaU, setThetaU] = useSlideState<number>('ch6_sandbox_theta_u', 60);

  const base = useMemo(() => unitCirclePoints(20), []);

  // Step 1: After Vᵀ (rotate by -thetaV)
  const afterVt = useMemo(() => applyRotation(base, -thetaV), [base, thetaV]);
  // Step 2: After Σ (scale)
  const afterSigma = useMemo(() => applyScale(afterVt, sigma1, sigma2), [afterVt, sigma1, sigma2]);
  // Step 3: After U (rotate by thetaU)
  const afterU = useMemo(() => applyRotation(afterSigma, thetaU), [afterSigma, thetaU]);

  const cx = 165;
  const cy = 150;
  const scale = 42;

  const showOriginal = activeStep === 'All' || activeStep === 'Vᵀ';
  const showVt = activeStep === 'Vᵀ' || activeStep === 'All';
  const showSigma = activeStep === 'Σ' || activeStep === 'All';
  const showU = activeStep === 'U' || activeStep === 'All';

  const ptSize = 4;

  const polyOriginal = toSVG(base, cx, cy, scale);
  const polyVt = toSVG(afterVt, cx, cy, scale);
  const polySigma = toSVG(afterSigma, cx, cy, scale);
  const polyU = toSVG(afterU, cx, cy, scale);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: SVG canvas */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-sm">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 text-center">
          Transformation Stages
        </p>
        <svg viewBox="0 0 330 300" className="w-full">
          {/* Grid */}
          {[-4, -3, -2, -1, 0, 1, 2, 3, 4].map(i => (
            <g key={i}>
              <line
                x1={cx + i * scale} y1={10} x2={cx + i * scale} y2={290}
                stroke="#f1f5f9" strokeWidth="1"
              />
              <line
                x1={10} y1={cy + i * scale} x2={320} y2={cy + i * scale}
                stroke="#f1f5f9" strokeWidth="1"
              />
            </g>
          ))}
          {/* Axes */}
          <line x1={cx} y1={10} x2={cx} y2={290} stroke="#cbd5e1" strokeWidth="1" />
          <line x1={10} y1={cy} x2={320} y2={cy} stroke="#cbd5e1" strokeWidth="1" />

          {/* Original unit circle */}
          {showOriginal && (
            <g>
              <polygon points={polyOriginal} fill="rgba(148,163,184,0.1)" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,3" />
              {base.map(([x, y], i) => (
                <circle key={i} cx={cx + x * scale} cy={cy - y * scale} r={ptSize - 1} fill="#94a3b8" opacity={0.6} />
              ))}
              <text x={cx + scale + 4} y={cy - 2} fontSize="9" fill="#94a3b8">unit circle</text>
            </g>
          )}

          {/* After Vᵀ */}
          {showVt && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <polygon points={polyVt} fill="rgba(167,139,250,0.08)" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4,3" />
              {afterVt.map(([x, y], i) => (
                <circle key={i} cx={cx + x * scale} cy={cy - y * scale} r={ptSize - 1} fill="#a78bfa" opacity={0.7} />
              ))}
              <text x={cx + scale + 4} y={cy - scale * 0.8} fontSize="9" fill="#a78bfa" fontWeight="bold">after Vᵀ</text>
            </motion.g>
          )}

          {/* After Σ */}
          {showSigma && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <polygon points={polySigma} fill="rgba(14,165,233,0.08)" stroke="#0ea5e9" strokeWidth="2" />
              {afterSigma.map(([x, y], i) => (
                <circle key={i} cx={cx + x * scale} cy={cy - y * scale} r={ptSize} fill="#0ea5e9" opacity={0.75} />
              ))}
              <text x={cx + sigma1 * scale + 4} y={cy - 4} fontSize="9" fill="#0ea5e9" fontWeight="bold">after Σ</text>
            </motion.g>
          )}

          {/* After U (final) */}
          {showU && (
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <polygon points={polyU} fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="2.5" />
              {afterU.map(([x, y], i) => (
                <circle key={i} cx={cx + x * scale} cy={cy - y * scale} r={ptSize} fill="#10b981" />
              ))}
              <text x={cx + 4} y={cy - sigma1 * scale - 6} fontSize="9" fill="#10b981" fontWeight="bold">after U (final)</text>
            </motion.g>
          )}
        </svg>

        {/* Step toggle buttons */}
        <div className="flex gap-2 justify-center mt-3 flex-wrap">
          {STEPS.map(s => (
            <button
              key={s}
              onClick={() => setActiveStep(s)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                activeStep === s
                  ? 'bg-sky-500 text-white border-sky-500 shadow'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-sky-300'
              }`}
            >
              {s === 'All' ? 'Show All' : `Show ${s} step`}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex gap-4 justify-center mt-3 flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-slate-400" />
            <span className="text-xs text-slate-400">Input</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-violet-400" />
            <span className="text-xs text-violet-500">Vᵀ (rotate)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-sky-400" />
            <span className="text-xs text-sky-500">Σ (stretch)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-xs text-emerald-500">U (rotate)</span>
          </div>
        </div>
      </div>

      {/* RIGHT: Controls */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-4">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <span className="inline-block bg-sky-100 text-sky-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
            Chapter 6 · Scene 19
          </span>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-2">
            SVD Playground
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Drag the sliders. Watch the unit circle transform step by step. U and Vᵀ just rotate.
            Σ stretches. That's all SVD ever does.
          </p>
        </motion.div>

        {/* Live formula */}
        <div className="bg-sky-50 border border-sky-200 rounded-xl p-3">
          <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-1">Live Formula</p>
          <KaTeXMath tex={`A = U \\cdot \\begin{pmatrix}${sigma1.toFixed(1)} & 0 \\\\ 0 & ${sigma2.toFixed(1)}\\end{pmatrix} \\cdot V^T`} block />
        </div>

        {/* Sliders */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 space-y-4">
          {/* σ₁ */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-sky-600">σ₁ (stretch direction 1)</label>
              <span className="text-xs font-bold text-sky-600">{sigma1.toFixed(1)}</span>
            </div>
            <input
              type="range" min={0.5} max={4} step={0.1}
              value={sigma1}
              onChange={e => setSigma1(parseFloat(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          {/* σ₂ */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-sky-600">σ₂ (stretch direction 2)</label>
              <span className="text-xs font-bold text-sky-600">{sigma2.toFixed(1)}</span>
            </div>
            <input
              type="range" min={0} max={2.5} step={0.1}
              value={sigma2}
              onChange={e => setSigma2(parseFloat(e.target.value))}
              className="w-full accent-sky-500"
            />
          </div>

          {/* V rotation */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-violet-500">Vᵀ rotation angle</label>
              <span className="text-xs font-bold text-violet-500">{thetaV}°</span>
            </div>
            <input
              type="range" min={0} max={180} step={1}
              value={thetaV}
              onChange={e => setThetaV(parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
          </div>

          {/* U rotation */}
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-semibold text-emerald-500">U rotation angle</label>
              <span className="text-xs font-bold text-emerald-500">{thetaU}°</span>
            </div>
            <input
              type="range" min={0} max={180} step={1}
              value={thetaU}
              onChange={e => setThetaU(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>
        </div>

        {/* Insight box */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Notice</p>
          <div className="space-y-1.5">
            <p className="text-xs text-violet-600">
              <span className="font-bold">Vᵀ & U sliders:</span> The shape stays circular — only rotation changes.
            </p>
            <p className="text-xs text-sky-600">
              <span className="font-bold">σ₁ & σ₂ sliders:</span> The circle stretches into an ellipse.
            </p>
            <p className="text-xs text-slate-500">
              Set σ₁ = σ₂ to get a circle again. This means A is a pure rotation!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
