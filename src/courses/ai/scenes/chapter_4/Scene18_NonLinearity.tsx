import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const reluFn    = (x: number) => Math.max(0, x);
const sigmoidFn = (x: number) => 1 / (1 + Math.exp(-x));
const tanhFn    = (x: number) => Math.tanh(x);

const ACTIVATIONS = [
  {
    name: 'ReLU',
    fn: reluFn,
    color: '#E11D48',
    light: '#fff1f2',
    border: '#fecdd3',
    formula: 'max(0, x)',
    outputRange: '0 → ∞',
    intuition: 'Gate: kills every negative signal. Positive values pass unchanged.',
    analogy: 'Like a one-way valve — negatives are blocked, positives flow through.',
    annotations: [
      { x: -2.2, y: 0.02,  label: 'blocked: 0',   anchor: 'middle' },
      { x:  2.5, y: 2.55,  label: 'pass-through',  anchor: 'middle' },
    ],
    tag: 'Most common — fast & effective',
  },
  {
    name: 'Sigmoid',
    fn: sigmoidFn,
    color: '#0284C7',
    light: '#e0f2fe',
    border: '#7dd3fc',
    formula: '1 / (1 + e^−x)',
    outputRange: '0 → 1',
    intuition: 'Squasher: maps any number into the range (0, 1). Natural probability output.',
    analogy: 'Like a dimmer switch — always between fully off and fully on.',
    annotations: [
      { x: -3.2, y: 0.85,  label: 'output → 0',   anchor: 'start'  },
      { x: -3.2, y: 0.15,  label: 'output → 1',   anchor: 'start'  },
      { x:  0.3, y: 0.5,   label: '(0, 0.5)',      anchor: 'start'  },
    ],
    tag: 'Used for probability outputs',
  },
  {
    name: 'Tanh',
    fn: tanhFn,
    color: '#7C3AED',
    light: '#f5f3ff',
    border: '#ddd6fe',
    formula: 'tanh(x)',
    outputRange: '−1 → +1',
    intuition: 'Centred squasher: like Sigmoid but balanced around zero. Stronger gradient near origin.',
    analogy: 'Like a symmetric dimmer — from fully negative to fully positive.',
    annotations: [
      { x: 0.2,  y: 0,     label: 'centred at 0',  anchor: 'start'  },
      { x: 2.0,  y: 1.12,  label: '→ +1',          anchor: 'start'  },
      { x: 2.0,  y: -1.12, label: '→ −1',          anchor: 'start'  },
    ],
    tag: 'Often better than Sigmoid in hidden layers',
  },
];

// ── Graph layout ───────────────────────────────────────────────────────────
const GW = 460, GH = 260;
const xMin = -4, xMax = 4, yMin = -1.5, yMax = 1.5;
const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * GW;
const toY = (y: number) => GH - ((y - yMin) / (yMax - yMin)) * GH;
const xs = Array.from({ length: 300 }, (_, i) => xMin + (i / 299) * (xMax - xMin));

function makePath(fn: (x: number) => number) {
  return xs.map((x, i) => {
    const y = Math.min(Math.max(fn(x), yMin), yMax);
    return `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`;
  }).join(' ');
}

// Pre-compute paths
const paths = ACTIVATIONS.map(a => makePath(a.fn));
const linearPath = xs.map((x, i) => {
  const y = Math.min(Math.max(x, yMin), yMax);
  return `${i === 0 ? 'M' : 'L'} ${toX(x).toFixed(1)} ${toY(y).toFixed(1)}`;
}).join(' ');

export const Scene4_18_NonLinearity: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const act = ACTIVATIONS[selected];

  return (
    <SlideLayout
      title="The Bend That Makes It Powerful"
      text="Without non-linearity, 100 stacked matrix layers still give one straight line. Activation functions introduce the curves that let networks learn anything."
      sidebarContent={
        <div className="flex flex-col gap-3">

          {/* Bridge card: connects back to Scene 18c */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">
              ← From the last scene
            </p>
            <p className="text-xs font-bold text-slate-600 leading-snug">
              Measuring distance r = √(x²+y²) unfolded the rings.
              That was a nonlinear function.{' '}
              <span className="text-slate-800">These three are the standard ones neurons use.</span>
            </p>
          </div>

          {/* Activation buttons */}
          {ACTIVATIONS.map((a, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className="px-3 py-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer"
              style={selected === i
                ? { backgroundColor: a.light, borderColor: a.color, color: a.color }
                : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="font-black">{a.name}</span>
                <span className="font-mono text-[10px] opacity-70">{a.formula}</span>
              </div>
              <span className="text-[10px] opacity-60 font-medium">{a.intuition}</span>
            </button>
          ))}

          {/* Selected activation detail */}
          <AnimatePresence mode="wait">
            <motion.div key={selected}
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="rounded-2xl border px-4 py-3 flex flex-col gap-2"
              style={{ backgroundColor: act.light, borderColor: act.border }}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest"
                  style={{ color: act.color }}>Output range</span>
                <span className="font-mono text-sm font-black" style={{ color: act.color }}>
                  {act.outputRange}
                </span>
              </div>
              <p className="text-[10px] text-slate-600 font-medium leading-snug">{act.analogy}</p>
              <div className="rounded-lg bg-white/60 px-2 py-1">
                <p className="text-[10px] font-black text-slate-500">{act.tag}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      }
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-3">

        {/* Main graph: all 3 curves + linear reference */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              {act.name} vs linear (stacked matrices)
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <svg width="20" height="8"><line x1="0" y1="4" x2="20" y2="4" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 2"/></svg>
                linear (no activation)
              </span>
            </div>
          </div>

          <svg viewBox={`0 0 ${GW} ${GH}`} className="w-full h-auto">
            {/* Grid lines */}
            {[-3,-2,-1,0,1,2,3].map(v => (
              <line key={`gx${v}`} x1={toX(v)} y1={0} x2={toX(v)} y2={GH}
                stroke={v === 0 ? '#94a3b8' : '#f1f5f9'} strokeWidth={v === 0 ? 1.5 : 1} />
            ))}
            {[-1,-0.5,0,0.5,1].map(v => (
              <line key={`gy${v}`} x1={0} y1={toY(v)} x2={GW} y2={toY(v)}
                stroke={v === 0 ? '#94a3b8' : '#f1f5f9'} strokeWidth={v === 0 ? 1.5 : 1} />
            ))}

            {/* Output range guides for selected activation */}
            <AnimatePresence>
              {selected === 1 && ( // Sigmoid: 0 and 1 bounds
                <>
                  <motion.line key="s0" x1={0} y1={toY(0)} x2={GW} y2={toY(0)}
                    stroke="#0284C7" strokeWidth="1" strokeDasharray="4 3" opacity={0.5}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} />
                  <motion.line key="s1" x1={0} y1={toY(1)} x2={GW} y2={toY(1)}
                    stroke="#0284C7" strokeWidth="1" strokeDasharray="4 3" opacity={0.5}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} />
                  <motion.text key="s0l" x={4} y={toY(0.04)} fontSize="9" fontWeight="700" fill="#0284C7" opacity={0.7}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}>
                    y = 0
                  </motion.text>
                  <motion.text key="s1l" x={4} y={toY(1.04)} fontSize="9" fontWeight="700" fill="#0284C7" opacity={0.7}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}>
                    y = 1
                  </motion.text>
                </>
              )}
              {selected === 2 && ( // Tanh: -1 and +1 bounds
                <>
                  <motion.line key="t-1" x1={0} y1={toY(-1)} x2={GW} y2={toY(-1)}
                    stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 3" opacity={0.5}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} />
                  <motion.line key="t1" x1={0} y1={toY(1)} x2={GW} y2={toY(1)}
                    stroke="#7C3AED" strokeWidth="1" strokeDasharray="4 3" opacity={0.5}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} />
                  <motion.text key="t-1l" x={4} y={toY(-1.04)} fontSize="9" fontWeight="700" fill="#7C3AED" opacity={0.7}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}>
                    y = −1
                  </motion.text>
                  <motion.text key="t1l" x={4} y={toY(1.04)} fontSize="9" fontWeight="700" fill="#7C3AED" opacity={0.7}
                    initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}>
                    y = +1
                  </motion.text>
                </>
              )}
              {selected === 0 && ( // ReLU: dead zone background
                <motion.rect key="dead"
                  x={0} y={0} width={toX(0)} height={GH}
                  fill="#fff1f2" opacity={0.5}
                  initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} />
              )}
            </AnimatePresence>

            {/* Dead zone label */}
            <AnimatePresence>
              {selected === 0 && (
                <motion.text key="deadlbl"
                  x={toX(-2)} y={toY(0.18)}
                  textAnchor="middle" fontSize="9" fontWeight="700" fill="#E11D48" opacity={0.7}
                  initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }}>
                  blocked → 0
                </motion.text>
              )}
            </AnimatePresence>

            {/* Linear reference (dashed) */}
            <path d={linearPath} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />
            <text x={GW - 6} y={toY(1.3)} textAnchor="end" fontSize="9" fontWeight="600" fill="#94a3b8">
              y=x (linear)
            </text>

            {/* Dimmed non-selected curves */}
            {ACTIVATIONS.map((a, i) => i !== selected && (
              <path key={`dim${i}`} d={paths[i]}
                fill="none" stroke={a.color} strokeWidth="1.5" opacity={0.18} />
            ))}

            {/* Selected curve — animated */}
            <motion.path
              key={`active-${selected}`}
              d={paths[selected]}
              fill="none"
              stroke={act.color}
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />

            {/* Axis labels */}
            <text x={GW - 6} y={toY(0) - 6} fill="#94a3b8" fontSize="10" textAnchor="end">x →</text>
            <text x={toX(0) + 6} y={12} fill="#94a3b8" fontSize="10">f(x)</text>
          </svg>
        </div>

        {/* Comparison strip: all three side by side */}
        <div className="flex gap-2 w-full">
          {ACTIVATIONS.map((a, i) => (
            <button key={i} onClick={() => setSelected(i)}
              className="flex-1 rounded-xl border px-2 py-2 text-center transition-all cursor-pointer"
              style={selected === i
                ? { backgroundColor: a.light, borderColor: a.color }
                : { backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
              <span className="text-[11px] font-black block" style={{ color: a.color }}>{a.name}</span>
              <span className="text-[9px] font-mono font-bold block" style={{ color: selected === i ? a.color : '#94a3b8' }}>
                {a.outputRange}
              </span>
              {/* Tiny inline curve thumbnail */}
              <svg viewBox="0 0 60 28" className="w-full mt-1">
                <line x1="0" y1="14" x2="60" y2="14" stroke="#f1f5f9" strokeWidth="1" />
                <line x1="0" y1="14" x2="60" y2="14" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 2" opacity={0.5} />
                {/* mini linear */}
                <path
                  d={Array.from({ length: 60 }, (_, j) => {
                    const xv = xMin + (j / 59) * (xMax - xMin);
                    const yv = Math.min(Math.max(xv, -1.5), 1.5);
                    const px = (j / 59) * 60;
                    const py = 28 - ((yv - (-1.5)) / 3) * 28;
                    return `${j === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
                  }).join(' ')}
                  fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 2"
                />
                <path
                  d={Array.from({ length: 60 }, (_, j) => {
                    const xv = xMin + (j / 59) * (xMax - xMin);
                    const yv = Math.min(Math.max(a.fn(xv), -1.5), 1.5);
                    const px = (j / 59) * 60;
                    const py = 28 - ((yv - (-1.5)) / 3) * 28;
                    return `${j === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
                  }).join(' ')}
                  fill="none" stroke={a.color}
                  strokeWidth={selected === i ? 2 : 1.2}
                  opacity={selected === i ? 1 : 0.5}
                />
              </svg>
            </button>
          ))}
        </div>

      </div>
    </SlideLayout>
  );
};
export default Scene4_18_NonLinearity;
