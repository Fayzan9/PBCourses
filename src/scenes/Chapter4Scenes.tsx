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

const lerpMat = (A: Mat2, B: Mat2, t: number): Mat2 => [
  [A[0][0] + (B[0][0] - A[0][0]) * t, A[0][1] + (B[0][1] - A[0][1]) * t],
  [A[1][0] + (B[1][0] - A[1][0]) * t, A[1][1] + (B[1][1] - A[1][1]) * t],
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function fmt(n: number) {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

// Smoothly animate between matrix values
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
// Shared Layout
// ═══════════════════════════════════════════════════════════════

const SlideLayout: React.FC<{
  title: string;
  text: string;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, text, sidebarContent, children }) => (
  <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 h-full py-1 w-full max-w-7xl mx-auto px-6 overflow-hidden">
    <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative bg-white/40 border border-slate-200/50 rounded-3xl p-4 shadow-inner overflow-hidden">
      {children}
    </div>
    <div className="w-full lg:w-[300px] flex flex-col justify-start overflow-y-auto text-left gap-4 shrink-0 py-4 pr-1">
      <div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-base leading-relaxed">{text}</p>
      </div>
      {sidebarContent}
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// TransformGrid SVG — warped 2D coordinate grid
// ═══════════════════════════════════════════════════════════════

const MARKER_DEFS = (
  <defs>
    {([['red','#E11D48'],['blue','#0284C7'],['green','#059669'],['slate','#64748B'],['violet','#7C3AED']] as [string,string][]).map(([n,c]) => (
      <marker key={n} id={`g4-${n}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
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
  M,
  highlightVec = null,
  showOriginalVec = false,
  extraVec = null,
  width = 400,
  height = 400,
  scale = 52,
  range = 3,
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
    const ax = i === 0;
    lines.push(
      <line key={`h${i}`} x1={h0[0]} y1={h0[1]} x2={h1[0]} y2={h1[1]}
        stroke={ax ? '#94a3b8' : '#e2e8f0'} strokeWidth={ax ? 1.5 : 0.8} />,
      <line key={`v${i}`} x1={v0[0]} y1={v0[1]} x2={v1[0]} y2={v1[1]}
        stroke={ax ? '#94a3b8' : '#e2e8f0'} strokeWidth={ax ? 1.5 : 0.8} />
    );
  }

  const e1 = pt(1, 0);
  const e2 = pt(0, 1);
  const hv = highlightVec ? pt(highlightVec[0], highlightVec[1]) : null;
  const hvRaw = (highlightVec && showOriginalVec) ? rawPt(highlightVec[0], highlightVec[1]) : null;
  const ev = extraVec ? pt(extraVec.vec[0], extraVec.vec[1]) : null;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
      {MARKER_DEFS}
      <rect width={width} height={height} fill="white" rx="16" />
      {lines}

      {/* Basis ê₁ (red) */}
      <line x1={origin[0]} y1={origin[1]} x2={e1[0]} y2={e1[1]}
        stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#g4-red)" />
      <text x={e1[0] + 7} y={e1[1] + 5} fill="#E11D48" fontSize="11" fontWeight="bold">ê₁</text>

      {/* Basis ê₂ (blue) */}
      <line x1={origin[0]} y1={origin[1]} x2={e2[0]} y2={e2[1]}
        stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#g4-blue)" />
      <text x={e2[0] + 7} y={e2[1] - 5} fill="#0284C7" fontSize="11" fontWeight="bold">ê₂</text>

      {/* Original (pre-transform) dashed vector */}
      {hvRaw && (
        <line x1={origin[0]} y1={origin[1]} x2={hvRaw[0]} y2={hvRaw[1]}
          stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="5 3" markerEnd="url(#g4-slate)" />
      )}

      {/* Transformed highlight vector (green) */}
      {hv && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={hv[0]} y2={hv[1]}
            stroke="#059669" strokeWidth="3" markerEnd="url(#g4-green)" />
          <circle cx={hv[0]} cy={hv[1]} r="5" fill="#059669" opacity="0.85" />
        </>
      )}

      {/* Extra vector */}
      {ev && extraVec && (
        <>
          <line x1={origin[0]} y1={origin[1]} x2={ev[0]} y2={ev[1]}
            stroke={extraVec.color} strokeWidth="2.5" markerEnd={`url(#g4-${extraVec.marker})`} />
          {extraVec.label && (
            <text x={ev[0] + 7} y={ev[1] - 5} fill={extraVec.color} fontSize="11" fontWeight="bold">
              {extraVec.label}
            </text>
          )}
        </>
      )}

      <circle cx={origin[0]} cy={origin[1]} r="4" fill="#1e293b" />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.1 — Warp Curiosity
// ═══════════════════════════════════════════════════════════════

export const Scene4_1_WarpCuriosity: React.FC = () => {
  const items = [
    { text: 'Rotate.', color: 'text-transformations' },
    { text: 'Scale.', color: 'text-vector' },
    { text: 'Shear.', color: 'text-similarity' },
    { text: 'Reflect.', color: 'text-loss' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 text-center max-w-4xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="text-slate-400 text-base font-mono uppercase tracking-widest mb-8 font-bold"
      >
        What can you do to coordinate space itself?
      </motion.p>

      <div className="flex flex-col gap-5 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.4, duration: 0.8, ease: 'easeOut' }}
            className={`text-5xl md:text-7xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="border-t border-slate-200 pt-8 max-w-xl"
      >
        <p className="text-xl md:text-2xl font-bold text-slate-500">
          One mathematical object does all of this.
        </p>
        <p className="text-transformations text-2xl md:text-3xl font-black mt-3">The Matrix.</p>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.2 — Meet the Matrix
// ═══════════════════════════════════════════════════════════════

export const Scene4_2_MeetMatrix: React.FC = () => {
  const [highlighted, setHighlighted] = useState<1 | 2 | null>(null);

  const col1 = [2, 1]; // where ê₁ lands
  const col2 = [-1, 1.5]; // where ê₂ lands
  const M: Mat2 = [[col1[0], col2[0]], [col1[1], col2[1]]];

  return (
    <SlideLayout
      title="Meet the Matrix"
      text="A 2×2 matrix holds 4 numbers arranged in rows and columns. Each column encodes where a basis vector will land after the transformation."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <button
            onClick={() => setHighlighted(highlighted === 1 ? null : 1)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold text-left border transition-all cursor-pointer ${
              highlighted === 1
                ? 'bg-rose-50 border-rose-300 text-rose-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-rose-200'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block mb-0.5 font-black opacity-60">Column 1</span>
            ê₁ lands at [{col1[0]}, {col1[1]}]
          </button>
          <button
            onClick={() => setHighlighted(highlighted === 2 ? null : 2)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold text-left border transition-all cursor-pointer ${
              highlighted === 2
                ? 'bg-sky-50 border-sky-300 text-sky-700'
                : 'bg-white border-slate-200 text-slate-600 hover:border-sky-200'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider block mb-0.5 font-black opacity-60">Column 2</span>
            ê₂ lands at [{col2[0]}, {col2[1]}]
          </button>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">Matrix</span>
            <KaTeXMath
              tex={`M = \\begin{bmatrix} ${col1[0]} & ${col2[0]} \\\\ ${col1[1]} & ${col2[1]} \\end{bmatrix}`}
              block
            />
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[360px] aspect-square">
        <TransformGrid
          M={M}
          extraVec={
            highlighted === 1
              ? { vec: [1, 0], color: '#E11D48', marker: 'red', label: `[${col1[0]},${col1[1]}]` }
              : highlighted === 2
              ? { vec: [0, 1], color: '#0284C7', marker: 'blue', label: `[${col2[0]},${col2[1]}]` }
              : null
          }
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.3 — Matrix × Vector: The Computation
// ═══════════════════════════════════════════════════════════════

export const Scene4_3_MatrixVectorMath: React.FC = () => {
  const [step, setStep] = useState(0);

  const M: Mat2 = [[2, 1], [0, 3]];
  const v: [number, number] = [3, 2];
  const Mv = mulMV(M, v);

  const steps = [
    { label: 'Input', desc: 'We start with matrix M and input vector v.' },
    { label: 'Row 1 · v', desc: 'Dot row 1 of M with v to get the first output coordinate.' },
    { label: 'Row 2 · v', desc: 'Dot row 2 of M with v to get the second output coordinate.' },
    { label: 'Result', desc: 'The output is a new vector — the same information, transformed.' },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % steps.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideLayout
      title="Matrix × Vector"
      text="Each output component is a dot product of one matrix row with the input vector. The matrix listens to every input dimension when computing each output."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {steps.map((s, i) => (
            <div
              key={i}
              onClick={() => setStep(i)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                step === i
                  ? 'bg-white border-slate-300 text-slate-800 shadow-sm'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className={`text-[10px] uppercase tracking-wider block mb-0.5 ${step === i ? 'text-transformations' : 'text-slate-300'}`}>
                Step {i + 1}
              </span>
              {s.label}
            </div>
          ))}
          <p className="text-xs text-slate-500 font-medium px-1 mt-1">{steps[step].desc}</p>
        </div>
      }
    >
      {/* Computation display */}
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        {/* Matrix × Vector equation */}
        <div className="flex items-center gap-4 font-mono">
          {/* Matrix */}
          <div className="flex flex-col gap-1">
            {M.map((row, ri) => (
              <div key={ri} className={`flex gap-3 px-4 py-2 rounded-lg border transition-all ${
                step === ri + 1 ? 'bg-rose-50 border-rose-300' : 'bg-white border-slate-200'
              }`}>
                {row.map((val, ci) => (
                  <span key={ci} className={`text-xl font-black w-6 text-center ${
                    step === ri + 1 ? 'text-rose-600' : 'text-slate-700'
                  }`}>{val}</span>
                ))}
              </div>
            ))}
          </div>

          {/* × */}
          <span className="text-2xl font-black text-slate-400">×</span>

          {/* Vector v */}
          <div className="flex flex-col gap-1">
            {v.map((val, i) => (
              <div key={i} className={`px-4 py-2 rounded-lg border text-center transition-all ${
                (step === 1 || step === 2) ? 'bg-sky-50 border-sky-300' : 'bg-white border-slate-200'
              }`}>
                <span className={`text-xl font-black ${
                  (step === 1 || step === 2) ? 'text-sky-600' : 'text-slate-700'
                }`}>{val}</span>
              </div>
            ))}
          </div>

          {/* = */}
          <span className="text-2xl font-black text-slate-400">=</span>

          {/* Result vector */}
          <div className="flex flex-col gap-1">
            {Mv.map((val, i) => (
              <div key={i} className={`px-4 py-2 rounded-lg border text-center min-w-[52px] transition-all ${
                step === 3 ? 'bg-emerald-50 border-emerald-300'
                : step === i + 1 ? 'bg-violet-50 border-violet-300'
                : 'bg-white border-slate-200'
              }`}>
                <AnimatePresence mode="wait">
                  {step >= i + 1 ? (
                    <motion.span
                      key="val"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-xl font-black block ${
                        step === 3 ? 'text-emerald-600' : 'text-violet-600'
                      }`}
                    >
                      {val}
                    </motion.span>
                  ) : (
                    <span key="q" className="text-xl font-black text-slate-300">?</span>
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-3 text-sm font-mono text-center w-full"
          >
            {step === 0 && <span className="text-slate-500 font-bold">M · v = ?</span>}
            {step === 1 && (
              <span className="text-rose-600 font-bold">
                Row 1 · v = {M[0][0]}×{v[0]} + {M[0][1]}×{v[1]} = <span className="text-violet-600">{Mv[0]}</span>
              </span>
            )}
            {step === 2 && (
              <span className="text-rose-600 font-bold">
                Row 2 · v = {M[1][0]}×{v[0]} + {M[1][1]}×{v[1]} = <span className="text-violet-600">{Mv[1]}</span>
              </span>
            )}
            {step === 3 && (
              <span className="text-emerald-600 font-black text-base">
                M · v = [{Mv[0]}, {Mv[1]}] ✓
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.4 — Grid Transformation (the main visual)
// ═══════════════════════════════════════════════════════════════

const PRESETS: { label: string; desc: string; M: Mat2 }[] = [
  { label: 'Identity', desc: 'Space is unchanged. Every vector stays exactly where it is.', M: [[1, 0], [0, 1]] },
  { label: 'Scale ×2', desc: 'Every point doubles its distance from the origin.', M: [[2, 0], [0, 2]] },
  { label: 'Rotate 45°', desc: 'The entire grid rotates 45° counterclockwise.', M: [[0.707, -0.707], [0.707, 0.707]] },
  { label: 'Shear', desc: 'The x-axis stays fixed while the y-axis tilts sideways.', M: [[1, 0.8], [0, 1]] },
  { label: 'Reflect Y', desc: 'The grid flips across the vertical axis.', M: [[-1, 0], [0, 1]] },
  { label: 'Squash', desc: 'Space is compressed vertically.', M: [[1.5, 0], [0, 0.5]] },
];

export const Scene4_4_GridTransform: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState(0);
  const target = PRESETS[presetIdx].M;
  const animatedM = useAnimatedMatrix(target);

  return (
    <SlideLayout
      title="Warping Space"
      text="When a matrix is applied to a coordinate space, it stretches, rotates, or shears the entire grid. Click each preset to watch the transformation animate live."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setPresetIdx(i)}
              className={`px-3 py-2 rounded-xl text-left text-xs font-bold border transition-all cursor-pointer ${
                presetIdx === i
                  ? 'bg-violet-50 border-violet-300 text-violet-700 shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-violet-200'
              }`}
            >
              {p.label}
            </button>
          ))}
          <p className="text-xs text-slate-500 font-medium px-1 mt-1 leading-snug">
            {PRESETS[presetIdx].desc}
          </p>
        </div>
      }
    >
      <div className="w-full max-w-[360px] aspect-square">
        <TransformGrid M={animatedM} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.5 — Basis Vectors: Columns of M
// ═══════════════════════════════════════════════════════════════

export const Scene4_5_BasisVectors: React.FC = () => {
  const [focused, setFocused] = useState<0 | 1 | null>(null);

  // Rotation 30°
  const theta = 30 * (Math.PI / 180);
  const M: Mat2 = [
    [Math.cos(theta), -Math.sin(theta)],
    [Math.sin(theta),  Math.cos(theta)],
  ];

  const col0: [number, number] = [M[0][0], M[1][0]];
  const col1: [number, number] = [M[0][1], M[1][1]];

  return (
    <SlideLayout
      title="Reading the Columns"
      text="The columns of a matrix are the most important part — they tell you exactly where ê₁ and ê₂ land. Knowing where basis vectors go tells you where everything goes."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div
            onMouseEnter={() => setFocused(0)} onMouseLeave={() => setFocused(null)}
            className="bg-rose-50 border border-rose-200 rounded-xl p-4 cursor-default transition-all"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-black block mb-1">Column 1 → ê₁</span>
            <div className="font-mono text-sm font-bold text-rose-700">
              [{fmt(col0[0])}, {fmt(col0[1])}]
            </div>
            <p className="text-[11px] text-rose-600 mt-1">The red basis vector ê₁ (pointing right) lands here.</p>
          </div>

          <div
            onMouseEnter={() => setFocused(1)} onMouseLeave={() => setFocused(null)}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4 cursor-default transition-all"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-500 font-black block mb-1">Column 2 → ê₂</span>
            <div className="font-mono text-sm font-bold text-sky-700">
              [{fmt(col1[0])}, {fmt(col1[1])}]
            </div>
            <p className="text-[11px] text-sky-600 mt-1">The blue basis vector ê₂ (pointing up) lands here.</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
            <KaTeXMath
              tex={`M = \\begin{bmatrix} ${fmt(col0[0])} & ${fmt(col1[0])} \\\\ ${fmt(col0[1])} & ${fmt(col1[1])} \\end{bmatrix}`}
              block
            />
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[360px] aspect-square relative">
        <TransformGrid
          M={M}
          extraVec={
            focused === 0
              ? { vec: col0, color: '#E11D48', marker: 'red', label: `ê₁` }
              : focused === 1
              ? { vec: col1, color: '#0284C7', marker: 'blue', label: `ê₂` }
              : null
          }
        />
        {focused === null && (
          <div className="absolute top-3 left-0 right-0 flex justify-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold bg-white/80 px-3 py-1 rounded-full border border-slate-200">
              Hover the columns →
            </span>
          </div>
        )}
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.6 — Composing Transforms (Matrix × Matrix)
// ═══════════════════════════════════════════════════════════════

const mulMM = (A: Mat2, B: Mat2): Mat2 => [
  [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]],
  [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]],
];

export const Scene4_6_ComposingTransforms: React.FC = () => {
  const rot45: Mat2 = [[0.707, -0.707], [0.707, 0.707]]; // rotate 45°
  const scaleX: Mat2 = [[2, 0], [0, 1]]; // stretch x by 2
  const composed = mulMM(rot45, scaleX);

  const [phaseIdx, setPhaseIdx] = useState<0 | 1 | 2>(0);
  const phaseM: Mat2[] = [IDENTITY, scaleX, composed];
  const phaseMat = useAnimatedMatrix(phaseM[phaseIdx], 700);

  return (
    <SlideLayout
      title="Stacking Transforms"
      text="Applying two matrices in sequence is equivalent to multiplying them together first. The combined matrix represents both transformations as one."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {([
              [0, 'Identity', 'Start with original space'],
              [1, 'Scale ×2 in X', 'Apply first transformation'],
              [2, 'Then Rotate 45°', 'Apply second — this is A × B'],
            ] as [number, string, string][]).map(([i, label, hint]) => (
              <button
                key={i}
                onClick={() => setPhaseIdx(i as 0 | 1 | 2)}
                className={`px-4 py-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                  phaseIdx === i
                    ? 'bg-violet-50 border-violet-300 text-violet-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-violet-200'
                }`}
              >
                <span className="block font-black">{label}</span>
                <span className="opacity-60 font-medium">{hint}</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono font-bold text-slate-600">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Composed = A × B</span>
            <KaTeXMath
              tex={`AB = \\begin{bmatrix} ${fmt(composed[0][0])} & ${fmt(composed[0][1])} \\\\ ${fmt(composed[1][0])} & ${fmt(composed[1][1])} \\end{bmatrix}`}
              block
            />
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[360px] aspect-square">
        <TransformGrid M={phaseMat} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.7 — The Neural Layer Revealed
// ═══════════════════════════════════════════════════════════════

export const Scene4_7_NeuralLayer: React.FC = () => {
  const [step, setStep] = useState(0);

  const weights = [[0.5, 0.8], [0.2, -0.6], [0.9, 0.1]];
  const input = [3, 2];
  const bias = [0.5, -0.3, 0.1];
  const outputs = weights.map((row, i) =>
    row[0] * input[0] + row[1] * input[1] + bias[i]
  );

  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % (weights.length + 1)), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideLayout
      title="The Neural Layer"
      text="A neural network layer is exactly a matrix multiplication. Each neuron computes a dot product between a row of the weight matrix W and the input vector x, then adds a bias."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-black block mb-2">
              Layer Formula
            </span>
            <KaTeXMath tex="y = Wx + b" block />
          </div>
          <div className="flex flex-col gap-1.5 text-xs font-mono font-bold text-slate-600">
            <div className="flex justify-between bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-slate-400">W</span>
              <span>Weight matrix (3×2)</span>
            </div>
            <div className="flex justify-between bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-slate-400">x</span>
              <span>Input vector [3, 2]</span>
            </div>
            <div className="flex justify-between bg-white border border-slate-200 rounded-lg px-3 py-2">
              <span className="text-slate-400">b</span>
              <span>Bias vector</span>
            </div>
            <div className="flex justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
              <span className="text-emerald-500">y</span>
              <span className="text-emerald-700">Output (3 neurons)</span>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-md flex flex-col items-center gap-5">
        {/* Input vector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider w-8">x =</span>
          <div className="flex gap-2">
            {input.map((v, i) => (
              <div key={i} className="bg-sky-50 border border-sky-200 rounded-lg px-4 py-2 text-sky-700 font-black text-lg font-mono">
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Weight matrix with animated row highlighting */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            Weight Matrix W — each row = one neuron
          </div>
          <div className="flex flex-col gap-2">
            {weights.map((row, ri) => (
              <div
                key={ri}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 border transition-all ${
                  step === ri + 1
                    ? 'bg-rose-50 border-rose-300'
                    : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="flex gap-4">
                  {row.map((w, ci) => (
                    <span key={ci} className={`font-mono font-black text-sm ${
                      step === ri + 1 ? 'text-rose-600' : 'text-slate-600'
                    }`}>{w}</span>
                  ))}
                </div>
                <span className="text-[10px] text-slate-400 font-bold">neuron {ri + 1}</span>
                <AnimatePresence mode="wait">
                  {step >= ri + 1 && (
                    <motion.span
                      key="out"
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
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
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider w-8">y =</span>
          <div className="flex gap-2">
            {outputs.map((v, i) => (
              <AnimatePresence key={i} mode="wait">
                {step >= i + 1 ? (
                  <motion.div
                    key="val"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-2 text-emerald-700 font-black text-base font-mono"
                  >
                    {v.toFixed(1)}
                  </motion.div>
                ) : (
                  <div key="q" className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-300 font-black text-base font-mono">
                    ?
                  </div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.8 — Activation Functions (Non-Linearity)
// ═══════════════════════════════════════════════════════════════

const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
const relu = (x: number) => Math.max(0, x);
const tanh = (x: number) => Math.tanh(x);

const ACTIVATIONS: {
  name: string;
  fn: (x: number) => number;
  color: string;
  desc: string;
  formula: string;
}[] = [
  { name: 'ReLU', fn: relu, color: '#E11D48', desc: 'Kills negative values. Fast and effective — the most popular choice.', formula: '\\max(0, x)' },
  { name: 'Sigmoid', fn: sigmoid, color: '#0284C7', desc: 'Squashes any value into (0, 1). Used for probabilities.', formula: '\\frac{1}{1+e^{-x}}' },
  { name: 'Tanh', fn: tanh, color: '#7C3AED', desc: 'Squashes to (-1, 1). Symmetric around zero, often better than sigmoid.', formula: '\\tanh(x)' },
];

export const Scene4_8_ActivationFunctions: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const act = ACTIVATIONS[selected];

  const W = 360, H = 200;
  const xMin = -4, xMax = 4, yMin = -1.3, yMax = 1.3;
  const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
  const toY = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;

  const xs = Array.from({ length: 200 }, (_, i) => xMin + (i / 199) * (xMax - xMin));
  const pathD = xs
    .map((x, i) => {
      const y = act.fn(x);
      return `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`;
    })
    .join(' ');

  const axisY = toY(0);
  const axisX = toX(0);

  return (
    <SlideLayout
      title="Non-Linearity"
      text="Matrix multiplications are linear — stacking them is still linear. Activation functions inject non-linearity after each layer, letting networks learn complex, curved decision boundaries."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            {ACTIVATIONS.map((a, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`px-4 py-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                  selected === i
                    ? 'shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
                style={selected === i ? { backgroundColor: `${a.color}10`, borderColor: `${a.color}50`, color: a.color } : {}}
              >
                <span className="block font-black">{a.name}</span>
                <KaTeXMath tex={a.formula} />
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium px-1 mt-1 leading-snug">{act.desc}</p>
        </div>
      }
    >
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden w-full max-w-md p-5">
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          {act.name} — activation curve
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
          {/* Grid */}
          {[-3,-2,-1,0,1,2,3].map(x => (
            <line key={`gx${x}`} x1={toX(x)} y1={0} x2={toX(x)} y2={H}
              stroke="#f1f5f9" strokeWidth="1" />
          ))}
          {[-1,-0.5,0,0.5,1].map(y => (
            <line key={`gy${y}`} x1={0} y1={toY(y)} x2={W} y2={toY(y)}
              stroke="#f1f5f9" strokeWidth="1" />
          ))}

          {/* Axes */}
          <line x1={0} y1={axisY} x2={W} y2={axisY} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={axisX} y1={0} x2={axisX} y2={H} stroke="#94a3b8" strokeWidth="1.5" />

          {/* Curve */}
          <motion.path
            key={selected}
            d={pathD}
            fill="none"
            stroke={act.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />

          {/* Axis labels */}
          <text x={W - 4} y={axisY - 5} fill="#94a3b8" fontSize="10" textAnchor="end">x</text>
          <text x={axisX + 5} y={12} fill="#94a3b8" fontSize="10">y</text>
        </svg>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.9 — Deep Network: Sequence of Warps
// ═══════════════════════════════════════════════════════════════

export const Scene4_9_DeepNetwork: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers: { label: string; M: Mat2; color: string; desc: string }[] = [
    { label: 'Layer 1', M: [[1.5, 0.3], [-0.2, 1.2]], color: '#E11D48', desc: 'Stretches and slightly rotates space.' },
    { label: 'Layer 2', M: [[0.707, -0.707], [0.707, 0.707]], color: '#0284C7', desc: 'Rotates 45° — separating features.' },
    { label: 'Layer 3', M: [[2, 0], [0, 0.5]], color: '#7C3AED', desc: 'Scales: amplifies one axis, compresses the other.' },
  ];

  const composedLayers = layers.reduce<Mat2[]>((acc, layer, i) => {
    if (i === 0) return [layer.M];
    return [...acc, mulMM(layer.M, acc[i - 1])];
  }, []);

  const target = composedLayers[activeLayer];
  const animated = useAnimatedMatrix(target, 800);

  useEffect(() => {
    const t = setInterval(() => setActiveLayer(a => (a + 1) % layers.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <SlideLayout
      title="Deep Networks"
      text="A deep neural network is a pipeline of matrix transformations — each layer warps the space, making previously tangled data linearly separable. Depth = expressive power."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {layers.map((l, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className={`px-4 py-3 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                activeLayer === i
                  ? 'shadow-sm'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
              style={activeLayer === i ? { backgroundColor: `${l.color}10`, borderColor: `${l.color}50`, color: l.color } : {}}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                <span className="font-black">{l.label}</span>
                {i <= activeLayer && (
                  <span className="ml-auto text-[9px] opacity-50 uppercase tracking-wider">applied</span>
                )}
              </div>
              <span className="text-slate-500 font-medium">{l.desc}</span>
            </button>
          ))}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-600">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-bold">
              Network Equation
            </span>
            <div className="font-bold">y = σ(W₃ σ(W₂ σ(W₁x)))</div>
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[360px] aspect-square">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 4.10 — Interactive Matrix Sandbox
// ═══════════════════════════════════════════════════════════════

export const Scene4_10_MatrixSandbox: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [d, setD] = useState(1);

  const target: Mat2 = [[a, b], [c, d]];
  const animated = useAnimatedMatrix(target, 100);

  const det = a * d - b * c;

  const presetList: { name: string; vals: [number, number, number, number] }[] = [
    { name: 'Identity', vals: [1, 0, 0, 1] },
    { name: 'Rot 90°', vals: [0, -1, 1, 0] },
    { name: 'Scale ×2', vals: [2, 0, 0, 2] },
    { name: 'Shear', vals: [1, 1, 0, 1] },
    { name: 'Reflect', vals: [-1, 0, 0, 1] },
  ];

  const applyPreset = ([na, nb, nc, nd]: [number, number, number, number]) => {
    setA(na); setB(nb); setC(nc); setD(nd);
  };

  const SliderRow: React.FC<{
    label: string;
    value: number;
    onChange: (v: number) => void;
    color: string;
  }> = ({ label, value, onChange, color }) => (
    <div>
      <div className="flex justify-between text-xs font-mono font-bold mb-1" style={{ color }}>
        <span>{label}</span>
        <span>{value.toFixed(1)}</span>
      </div>
      <input
        type="range" min="-2" max="2" step="0.1"
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer"
        style={{ accentColor: color }}
      />
    </div>
  );

  return (
    <SlideLayout
      title="Matrix Sandbox"
      text="Drag the sliders to edit the four matrix entries and watch the coordinate grid warp live. Explore: what happens when the determinant reaches zero?"
      sidebarContent={
        <div className="flex flex-col gap-4">
          {/* Presets */}
          <div className="flex flex-wrap gap-1.5">
            {presetList.map(p => (
              <button
                key={p.name}
                onClick={() => applyPreset(p.vals)}
                className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-[10px] font-bold text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-all cursor-pointer"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Matrix display */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Matrix M</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center">
              {[['a', a, '#E11D48'], ['b', b, '#D97706'], ['c', c, '#7C3AED'], ['d', d, '#0284C7']].map(([label, val, color]) => (
                <div key={label as string} className="bg-slate-50 border border-slate-200 rounded-lg py-2 text-lg font-black" style={{ color: color as string }}>
                  {(val as number).toFixed(1)}
                </div>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="flex flex-col gap-3">
            <SliderRow label="a (top-left)" value={a} onChange={setA} color="#E11D48" />
            <SliderRow label="b (top-right)" value={b} onChange={setB} color="#D97706" />
            <SliderRow label="c (bottom-left)" value={c} onChange={setC} color="#7C3AED" />
            <SliderRow label="d (bottom-right)" value={d} onChange={setD} color="#0284C7" />
          </div>

          {/* Determinant */}
          <div className={`rounded-xl p-3 border text-xs font-bold font-mono transition-all ${
            Math.abs(det) < 0.05
              ? 'bg-rose-50 border-rose-300 text-rose-700'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            det(M) = ad − bc = {det.toFixed(2)}
            {Math.abs(det) < 0.05 && (
              <span className="block text-[10px] mt-1 font-medium text-rose-500">
                Space collapsed! Information is lost.
              </span>
            )}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[360px] aspect-square">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};
