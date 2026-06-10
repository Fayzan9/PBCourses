import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const W    = [[0.5, 0.8], [0.2, -0.6], [0.9, 0.1]] as const;
const X    = [3, 2];
const BIAS = [0.5, -0.3, 0.1];
const OUT  = W.map((row, i) => row[0] * X[0] + row[1] * X[1] + BIAS[i]);

const N_ACCENT = ['#E11D48', '#7C3AED', '#D97706'];
const N_LIGHT  = ['#fff1f2', '#f5f3ff', '#fffbeb'];
const N_BORDER = ['#fecdd3', '#ddd6fe', '#fde68a'];

// ── SVG layout ────────────────────────────────────────────────────────────
const SVG_W = 500, SVG_H = 320;
const IR = 22, NR = 30, OR = 20;
// Input nodes
const INPUTS = [{ x: 65, y: 110 }, { x: 65, y: 210 }];
// Neuron nodes
const NEURONS = [{ x: 260, y: 80 }, { x: 260, y: 160 }, { x: 260, y: 240 }];
// Output nodes
const OUTPUTS = [{ x: 415, y: 80 }, { x: 415, y: 160 }, { x: 415, y: 240 }];

function toCircle(x1: number, y1: number, cx: number, cy: number, r: number) {
  const dx = cx - x1, dy = cy - y1, d = Math.hypot(dx, dy);
  return { x: cx - (dx / d) * r, y: cy - (dy / d) * r };
}
function fromCircle(cx: number, cy: number, x2: number, y2: number, r: number) {
  const dx = x2 - cx, dy = y2 - cy, d = Math.hypot(dx, dy);
  return { x: cx + (dx / d) * r, y: cy + (dy / d) * r };
}

export const Scene4_17_NeuralLayer: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <SlideLayout
      title="Scale It Up: A Full Layer"
      text="One neuron was one dot product. A full layer runs every neuron at once — that's exactly one matrix multiply."
      sidebarContent={
        <div className="flex flex-col gap-3">

          {/* Connection to Scene 16 */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">From last scene</p>
            <p className="text-xs text-slate-500 font-medium">
              1 neuron = 1 dot product + bias.<br />
              3 neurons = 3 dot products = <span className="font-black text-slate-700">1 matrix multiply.</span>
            </p>
          </div>

          {/* Active neuron panel */}
          <AnimatePresence mode="wait">
            {active === null ? (
              <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-2 py-6 text-center">
                <div className="text-3xl">👆</div>
                <p className="text-sm font-bold text-slate-500">Click a neuron to see its weights and computation</p>
              </motion.div>
            ) : (
              <motion.div key={`n${active}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-2xl border p-4 flex flex-col gap-3"
                style={{ backgroundColor: N_LIGHT[active], borderColor: N_BORDER[active] }}>

                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: N_ACCENT[active] }}>
                  Neuron {active + 1}
                </span>

                {/* Weight row from matrix */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-bold">Row {active + 1}:</span>
                  <div className="flex gap-1">
                    {[W[active][0], W[active][1]].map((w, j) => (
                      <div key={j} className="w-12 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold text-white"
                        style={{ backgroundColor: N_ACCENT[active] }}>
                        {w}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Computation */}
                <div className="flex flex-col gap-1">
                  {X.map((x, j) => (
                    <div key={j} className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-6 text-right font-bold" style={{ color: N_ACCENT[active] }}>{W[active][j]}</span>
                      <span className="text-slate-400">×</span>
                      <span className="font-bold text-sky-600">{x}</span>
                      <span className="text-slate-400">=</span>
                      <span className="font-black text-slate-700">{W[active][j] * x}</span>
                    </div>
                  ))}
                  <div className="border-t pt-1 flex items-center gap-2 text-xs font-mono" style={{ borderColor: N_BORDER[active] }}>
                    <span className="text-slate-400">sum</span>
                    <span className="font-black text-slate-600">{W[active][0]*X[0] + W[active][1]*X[1]}</span>
                    <span className="text-slate-400">+ bias({BIAS[active]})</span>
                    <span className="text-lg font-black" style={{ color: N_ACCENT[active] }}>= {OUT[active].toFixed(1)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Formula */}
          <div className="bg-slate-900 rounded-2xl px-4 py-3 text-center">
            <span className="font-mono text-white font-black text-base">y = Wx + b</span>
            <p className="text-[10px] text-slate-400 mt-1 font-medium">W is 3×2 — three rows, one per neuron</p>
          </div>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full max-h-full">
        <defs>
          {N_ACCENT.map((c, i) => (
            <marker key={i} id={`na${i}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0,1 L10,5 L0,9z" fill={c} />
            </marker>
          ))}
          <marker id="n-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9z" fill="#cbd5e1" />
          </marker>
        </defs>

        {/* ── Connections: Inputs → Neurons ──────────────────────── */}
        {NEURONS.map((npt, ni) =>
          INPUTS.map((ipt, ii) => {
            const end = toCircle(ipt.x + IR, ipt.y, npt.x, npt.y, NR);
            const isActive = active === ni;
            const isDimmed = active !== null && !isActive;
            return (
              <g key={`c${ni}-${ii}`}>
                <line
                  x1={ipt.x + IR} y1={ipt.y}
                  x2={end.x} y2={end.y}
                  stroke={isActive ? N_ACCENT[ni] : '#e2e8f0'}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isDimmed ? 0.2 : 1}
                />
                {/* Weight label */}
                {isActive && (
                  <g>
                    <rect
                      x={(ipt.x + IR + end.x) / 2 - 14}
                      y={(ipt.y + end.y) / 2 - 9}
                      width={28} height={18} rx={5}
                      fill={N_LIGHT[ni]} stroke={N_BORDER[ni]}
                    />
                    <text
                      x={(ipt.x + IR + end.x) / 2}
                      y={(ipt.y + end.y) / 2 + 4}
                      textAnchor="middle" fontSize="10" fontWeight="800"
                      fill={N_ACCENT[ni]}>
                      {W[ni][ii]}
                    </text>
                  </g>
                )}
              </g>
            );
          })
        )}

        {/* ── Connections: Neurons → Outputs ──────────────────────── */}
        {NEURONS.map((npt, ni) => {
          const start = fromCircle(npt.x, npt.y, OUTPUTS[ni].x, OUTPUTS[ni].y, NR);
          const isActive = active === ni;
          const isDimmed = active !== null && !isActive;
          return (
            <line key={`o${ni}`}
              x1={start.x} y1={start.y}
              x2={OUTPUTS[ni].x - OR} y2={OUTPUTS[ni].y}
              stroke={isActive ? N_ACCENT[ni] : '#e2e8f0'}
              strokeWidth={isActive ? 2 : 1}
              opacity={isDimmed ? 0.2 : 1}
              markerEnd={isActive ? `url(#na${ni})` : 'url(#n-grey)'}
            />
          );
        })}

        {/* ── Input nodes ──────────────────────────────────────────── */}
        {INPUTS.map((pt, i) => (
          <g key={`i${i}`}>
            <circle cx={pt.x} cy={pt.y} r={IR} fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
            <text x={pt.x} y={pt.y + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="#0284c7">{X[i]}</text>
            <text x={pt.x} y={pt.y + IR + 13} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">x{i+1}</text>
          </g>
        ))}

        {/* ── Neuron nodes (clickable) ──────────────────────────────── */}
        {NEURONS.map((pt, ni) => {
          const isActive = active === ni;
          const isDimmed = active !== null && !isActive;
          return (
            <g key={`n${ni}`} onClick={() => setActive(active === ni ? null : ni)}
              style={{ cursor: 'pointer' }} opacity={isDimmed ? 0.3 : 1}>
              <circle cx={pt.x} cy={pt.y} r={NR}
                fill={isActive ? N_LIGHT[ni] : '#f8fafc'}
                stroke={isActive ? N_ACCENT[ni] : '#e2e8f0'}
                strokeWidth={isActive ? 3 : 1.5} />
              <text x={pt.x} y={pt.y + 5} textAnchor="middle" fontSize="13" fontWeight="800"
                fill={isActive ? N_ACCENT[ni] : '#94a3b8'}>
                N{ni + 1}
              </text>
            </g>
          );
        })}

        {/* ── Output nodes ─────────────────────────────────────────── */}
        {OUTPUTS.map((pt, ni) => {
          const isActive = active === ni;
          const isDimmed = active !== null && !isActive;
          return (
            <g key={`out${ni}`} opacity={isDimmed ? 0.25 : 1}>
              <rect x={pt.x - OR} y={pt.y - OR} width={OR * 2} height={OR * 2} rx={10}
                fill={isActive ? N_LIGHT[ni] : '#f8fafc'}
                stroke={isActive ? N_ACCENT[ni] : '#e2e8f0'}
                strokeWidth={isActive ? 2.5 : 1.5} />
              <text x={pt.x} y={pt.y + 5} textAnchor="middle" fontSize="12" fontWeight="800"
                fill={isActive ? N_ACCENT[ni] : '#94a3b8'}>
                {OUT[ni].toFixed(1)}
              </text>
              <text x={pt.x} y={pt.y + OR + 13} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
                y{ni + 1}
              </text>
            </g>
          );
        })}

        {/* ── Column labels ─────────────────────────────────────────── */}
        <text x={INPUTS[0].x}  y={20} textAnchor="middle" fontSize="10" fontWeight="700" fill="#94a3b8">Input</text>
        <text x={NEURONS[0].x} y={20} textAnchor="middle" fontSize="10" fontWeight="700" fill="#94a3b8">Neurons (W rows)</text>
        <text x={OUTPUTS[0].x} y={20} textAnchor="middle" fontSize="10" fontWeight="700" fill="#94a3b8">Output</text>
      </svg>
    </SlideLayout>
  );
};
export default Scene4_17_NeuralLayer;
