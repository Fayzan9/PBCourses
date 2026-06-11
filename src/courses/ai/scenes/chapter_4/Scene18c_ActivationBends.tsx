import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

// Same ring data as Scene18b so the visual is continuous
const ring = (r: number, offsets: number[], jitter: number[]) =>
  offsets.map((deg, i) => {
    const rad = deg * Math.PI / 180;
    return [r * Math.cos(rad) + jitter[i * 2], r * Math.sin(rad) + jitter[i * 2 + 1]];
  });
const J = [0.15,-0.1,0.05,0.2,-0.15,0.1,-0.05,-0.2,0.1,-0.15,0.2,0.05,-0.1,0.15,0.0,0.1];
const RING_A = ring(1.15, [0,45,90,135,180,225,270,315], J);
const RING_B = ring(2.4,  [22,67,112,157,202,247,292,337], J.map(v => v * 1.2));

// SVG helpers
const W = 400, H = 410, CX = 200, CY = 220, SC = 62;
const sx = (x: number) => CX + x * SC;
const sy = (y: number) => CY - y * SC;
const dist = ([x, y]: number[]) => Math.sqrt(x * x + y * y);

// Separator sits in the gap between the two rings
const SEP_R = 1.78;

const STEP_INFO = [
  {
    label: 'Original space',
    sub: 'Rings — no straight line separates them',
    color: '#E11D48',
    bg: '#fff1f2',
    border: '#fecdd3',
    heading: 'The problem',
    body: 'Red and blue points form concentric rings. Any straight line you draw will catch points from both classes.',
  },
  {
    label: 'Apply activation',
    sub: 'Each point maps to (x, distance from center)',
    color: '#7C3AED',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    heading: 'The transformation',
    body: 'The activation adds a new measurement: r = √(x²+y²). Every point moves vertically to its distance value.',
  },
  {
    label: 'Draw the boundary',
    sub: 'A straight horizontal line now works',
    color: '#10B981',
    bg: '#f0fdf4',
    border: '#86efac',
    heading: 'The result',
    body: 'Inner ring clusters at r≈1.15, outer ring at r≈2.4. A single horizontal line at r=1.78 separates them perfectly.',
  },
];

export const Scene4_18c_ActivationBends: React.FC = () => {
  const [step, setStep] = useState(0);

  const transformed = step >= 1;
  const showSep = step >= 2;
  const info = STEP_INFO[step];

  const posA = RING_A.map(pt => ({
    cx: sx(pt[0]),
    cy: transformed ? sy(dist(pt)) : sy(pt[1]),
  }));
  const posB = RING_B.map(pt => ({
    cx: sx(pt[0]),
    cy: transformed ? sy(dist(pt)) : sy(pt[1]),
  }));

  return (
    <SlideLayout
      title="Activation Bends the Space"
      text="One nonlinear layer reshapes where points live — and suddenly a straight line is enough."
      sidebarContent={
        <div className="flex flex-col gap-4">

          {/* Step selector */}
          <div className="flex flex-col gap-1.5">
            {STEP_INFO.map((s, i) => (
              <button key={i} onClick={() => setStep(i)}
                className="text-left px-3 py-2.5 rounded-xl border text-xs transition-all cursor-pointer"
                style={step === i
                  ? { backgroundColor: '#0f172a', borderColor: '#0f172a', color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }}>
                <span className="font-black block">Step {i + 1}: {s.label}</span>
                <span className="opacity-60 text-[10px]">{s.sub}</span>
              </button>
            ))}
          </div>

          {/* Explanation card — updates per step */}
          <AnimatePresence mode="wait">
            <motion.div key={step}
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-2xl border px-4 py-3"
              style={{ backgroundColor: info.bg, borderColor: info.border }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1.5"
                style={{ color: info.color }}>
                {info.heading}
              </p>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">{info.body}</p>
            </motion.div>
          </AnimatePresence>

          {/* Amber insight */}
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">Key idea</p>
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              Activation adds a new <em>dimension of measurement</em>.
              Data that was tangled in 2D unfolds — and becomes separable.
            </p>
          </div>

          {/* Back / Next */}
          <div className="flex gap-2">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-30 cursor-pointer">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(2, s + 1))} disabled={step === 2}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold disabled:opacity-30 cursor-pointer">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">

          {/* Grid */}
          {[-3,-2,-1,0,1,2,3].map(v => (
            <g key={v}>
              <line x1={sx(v)} y1={10} x2={sx(v)} y2={H - 10}
                stroke={v === 0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={v === 0 ? 1.5 : 1} />
              <line x1={10} y1={sy(v)} x2={W - 10} y2={sy(v)}
                stroke={v === 0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={v === 0 ? 1.5 : 1} />
            </g>
          ))}

          {/* Axis labels */}
          <text x={W - 12} y={CY + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#94a3b8">x</text>
          <AnimatePresence mode="wait">
            {!transformed ? (
              <motion.text key="lbl-y" x={12} y={22}
                fontSize="11" fontWeight="600" fill="#94a3b8"
                initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                y
              </motion.text>
            ) : (
              <motion.text key="lbl-r" x={12} y={22}
                fontSize="9" fontWeight="700" fill="#7C3AED"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                r = √(x²+y²)
              </motion.text>
            )}
          </AnimatePresence>

          {/* Failed diagonal line — step 0 */}
          <AnimatePresence>
            {step === 0 && (
              <motion.line key="fail"
                x1={sx(-3.2)} y1={sy(0.6)} x2={sx(3.2)} y2={sy(-0.6)}
                stroke="#E11D48" strokeWidth="2.5" strokeDasharray="9 5"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.25 }}
              />
            )}
          </AnimatePresence>

          {/* Fail badge — step 0 */}
          <AnimatePresence>
            {step === 0 && (
              <motion.g key="failbadge"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}>
                <rect x={W / 2 - 60} y={12} width={120} height={22} rx={8}
                  fill="#fff1f2" stroke="#fca5a5" />
                <text x={W / 2} y={27} textAnchor="middle" fontSize="11" fontWeight="800" fill="#E11D48">
                  ✗ Fails to separate
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Horizontal band guides — step 1 */}
          <AnimatePresence>
            {transformed && (
              <>
                <motion.rect key="band-a"
                  x={sx(-3)} y={sy(1.32)} width={sx(3) - sx(-3)} height={sy(0.98) - sy(1.32)}
                  fill="#fff1f240" rx={0}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.rect key="band-b"
                  x={sx(-3)} y={sy(2.6)} width={sx(3) - sx(-3)} height={sy(2.2) - sy(2.6)}
                  fill="#e0f2fe40" rx={0}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.text key="lbl-inner"
                  x={sx(2.2)} y={sy(1.15) - 10}
                  textAnchor="middle" fontSize="9" fontWeight="700" fill="#E11D48"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.7 }}>
                  inner r≈1.15
                </motion.text>
                <motion.text key="lbl-outer"
                  x={sx(2.2)} y={sy(2.4) - 10}
                  textAnchor="middle" fontSize="9" fontWeight="700" fill="#0284C7"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.7 }}>
                  outer r≈2.4
                </motion.text>
              </>
            )}
          </AnimatePresence>

          {/* Horizontal separator — step 2 */}
          <AnimatePresence>
            {showSep && (
              <motion.line key="sep"
                x1={sx(-3.2)} y1={sy(SEP_R)} x2={sx(3.2)} y2={sy(SEP_R)}
                stroke="#10B981" strokeWidth="3"
                strokeDasharray="0"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          {/* Success badge — step 2 */}
          <AnimatePresence>
            {showSep && (
              <motion.g key="okbadge"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}>
                <rect x={W / 2 - 52} y={12} width={104} height={22} rx={8}
                  fill="#f0fdf4" stroke="#86efac" />
                <text x={W / 2} y={27} textAnchor="middle" fontSize="11" fontWeight="800" fill="#16a34a">
                  ✓ Perfectly separated!
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* ── Data points (animated) ──────────────────────────────── */}
          {RING_A.map((pt, i) => (
            <motion.circle key={`a${i}`}
              r={7} fill="#E11D48" stroke="#fff" strokeWidth="2"
              initial={{ cx: sx(pt[0]), cy: sy(pt[1]), opacity: 0 }}
              animate={{ cx: posA[i].cx, cy: posA[i].cy, opacity: 1 }}
              transition={{
                cx: { type: 'spring', stiffness: 110, damping: 16, delay: i * 0.04 },
                cy: { type: 'spring', stiffness: 110, damping: 16, delay: i * 0.04 },
                opacity: { duration: 0.25, delay: i * 0.04 },
              }}
            />
          ))}
          {RING_B.map((pt, i) => (
            <motion.circle key={`b${i}`}
              r={7} fill="#0284C7" stroke="#fff" strokeWidth="2"
              initial={{ cx: sx(pt[0]), cy: sy(pt[1]), opacity: 0 }}
              animate={{ cx: posB[i].cx, cy: posB[i].cy, opacity: 1 }}
              transition={{
                cx: { type: 'spring', stiffness: 110, damping: 16, delay: i * 0.04 + 0.12 },
                cy: { type: 'spring', stiffness: 110, damping: 16, delay: i * 0.04 + 0.12 },
                opacity: { duration: 0.25, delay: i * 0.04 + 0.12 },
              }}
            />
          ))}

          {/* Legend */}
          <circle cx={14} cy={H - 14} r={6} fill="#E11D48" />
          <text x={24} y={H - 10} fontSize="10" fontWeight="700" fill="#94a3b8">Class A (inner)</text>
          <circle cx={116} cy={H - 14} r={6} fill="#0284C7" />
          <text x={126} y={H - 10} fontSize="10" fontWeight="700" fill="#94a3b8">Class B (outer)</text>
        </svg>
      </div>
    </SlideLayout>
  );
};
export default Scene4_18c_ActivationBends;
