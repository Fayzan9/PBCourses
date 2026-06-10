import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const W  = [0.5, 0.8];
const X  = [3, 2];
const B  = 0.5;
const WS = W[0] * X[0] + W[1] * X[1]; // 3.1 — weighted sum
const OUT = WS + B;                     // 3.6 — final output

// ── SVG layout constants ──────────────────────────────────────────────────
const SVG_W = 480, SVG_H = 290;
const I1 = { x: 68, y: 100 }; // input 1
const I2 = { x: 68, y: 200 }; // input 2
const NX = 248, NY = 150, NR = 38; // neuron circle
const BX = 248, BY = 262, BR = 22; // bias node
const OX = 400, OY = 150;           // output box

function toCircle(x1: number, y1: number, cx: number, cy: number, r: number) {
  const dx = cx - x1, dy = cy - y1, d = Math.hypot(dx, dy);
  return { x: cx - (dx / d) * r, y: cy - (dy / d) * r };
}
function fromCircle(cx: number, cy: number, x2: number, y2: number, r: number) {
  const dx = x2 - cx, dy = y2 - cy, d = Math.hypot(dx, dy);
  return { x: cx + (dx / d) * r, y: cy + (dy / d) * r };
}

const STEPS = [
  { label: 'Multiply',    desc: `Each input is scaled by its weight: ${W[0]}×${X[0]} = ${W[0]*X[0]},  ${W[1]}×${X[1]} = ${W[1]*X[1]}` },
  { label: 'Sum',         desc: `Add all the products together: ${W[0]*X[0]} + ${W[1]*X[1]} = ${WS}` },
  { label: 'Add Bias',    desc: `Shift the result by the bias constant: ${WS} + ${B} = ${OUT}` },
  { label: 'Output',      desc: `${OUT} is the neuron's answer to "how much of [${X}] matches my pattern?"` },
];

export const Scene4_16_OneNeuron: React.FC = () => {
  const [step, setStep] = useState(0);

  const e1  = toCircle(I1.x, I1.y, NX, NY, NR);
  const e2  = toCircle(I2.x, I2.y, NX, NY, NR);
  const bs  = { x: BX, y: BY - BR };
  const be  = { x: NX, y: NY + NR };
  const nos = fromCircle(NX, NY, OX, OY, NR);

  const active1 = step >= 1;
  const active2 = step >= 2;
  const active3 = step >= 3;
  const active4 = step >= 4;

  const neuronColor = active4 ? '#10B981' : active3 ? '#D97706' : active2 ? '#7C3AED' : active1 ? '#E11D48' : '#94a3b8';
  const neuronBg    = active4 ? '#d1fae5' : active3 ? '#fef3c7' : active2 ? '#ede9fe' : active1 ? '#fff1f2' : '#f8fafc';

  return (
    <SlideLayout
      title="Start With One Neuron"
      text="Before scaling to a full layer, understand one neuron. It does exactly three things."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => {
            const done    = step > i + 1;
            const current = step === i + 1;
            return (
              <div key={i} className={`px-3 py-3 rounded-xl border text-xs transition-all ${
                done    ? 'bg-emerald-50 border-emerald-200' :
                current ? 'bg-white border-slate-300 shadow-sm' :
                          'border-transparent opacity-30'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                  done ? 'text-emerald-500' : current ? 'text-violet-500' : 'text-slate-400'
                }`}>
                  {done ? '✓' : `Step ${i + 1}`} · {s.label}
                </span>
                {(current || done) && (
                  <p className="text-slate-500 font-medium leading-snug">{s.desc}</p>
                )}
              </div>
            );
          })}

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-30 cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(4, s + 1))} disabled={step === 4}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold disabled:opacity-30 cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full max-h-full">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9z" fill="#94a3b8" />
          </marker>
          <marker id="arr-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9z" fill="#E11D48" />
          </marker>
          <marker id="arr-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9z" fill="#D97706" />
          </marker>
          <marker id="arr-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9z" fill="#10B981" />
          </marker>
        </defs>

        {/* ── Connection: Input 1 → Neuron ─────────────────────────── */}
        <line x1={I1.x + 22} y1={I1.y} x2={e1.x} y2={e1.y}
          stroke={active1 ? '#E11D48' : '#e2e8f0'} strokeWidth={active1 ? 2.5 : 1.5}
          markerEnd={active1 ? 'url(#arr-r)' : 'url(#arr)'} />
        {active1 && (
          <rect x={(I1.x + 22 + e1.x) / 2 - 18} y={(I1.y + e1.y) / 2 - 10}
            width={36} height={20} rx={6} fill="#fff1f2" stroke="#fecdd3" />
        )}
        <text x={(I1.x + 22 + e1.x) / 2} y={(I1.y + e1.y) / 2 + 4}
          textAnchor="middle" fontSize="11" fontWeight="700"
          fill={active1 ? '#E11D48' : '#cbd5e1'}>
          ×{W[0]}
        </text>

        {/* ── Connection: Input 2 → Neuron ─────────────────────────── */}
        <line x1={I2.x + 22} y1={I2.y} x2={e2.x} y2={e2.y}
          stroke={active1 ? '#E11D48' : '#e2e8f0'} strokeWidth={active1 ? 2.5 : 1.5}
          markerEnd={active1 ? 'url(#arr-r)' : 'url(#arr)'} />
        {active1 && (
          <rect x={(I2.x + 22 + e2.x) / 2 - 18} y={(I2.y + e2.y) / 2 - 10}
            width={36} height={20} rx={6} fill="#fff1f2" stroke="#fecdd3" />
        )}
        <text x={(I2.x + 22 + e2.x) / 2} y={(I2.y + e2.y) / 2 + 4}
          textAnchor="middle" fontSize="11" fontWeight="700"
          fill={active1 ? '#E11D48' : '#cbd5e1'}>
          ×{W[1]}
        </text>

        {/* ── Bias connection: below → Neuron ──────────────────────── */}
        {active3 && (
          <>
            <line x1={bs.x} y1={bs.y} x2={be.x} y2={be.y}
              stroke="#D97706" strokeWidth="2.5" markerEnd="url(#arr-a)" />
            <circle cx={BX} cy={BY} r={BR} fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
            <text x={BX} y={BY + 5} textAnchor="middle" fontSize="11" fontWeight="800" fill="#D97706">+{B}</text>
            <text x={BX} y={BY + 20} textAnchor="middle" fontSize="9" fontWeight="600" fill="#d97706" opacity="0.7">bias</text>
          </>
        )}

        {/* ── Neuron → Output ──────────────────────────────────────── */}
        {active4 && (
          <line x1={nos.x} y1={nos.y} x2={OX - 26} y2={OY}
            stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arr-g)" />
        )}

        {/* ── Input nodes ──────────────────────────────────────────── */}
        {[I1, I2].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={22} fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
            <text x={pt.x} y={pt.y + 6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#0284c7">{X[i]}</text>
            <text x={pt.x} y={pt.y + 22} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">x{i+1}</text>
          </g>
        ))}

        {/* ── Neuron circle ─────────────────────────────────────────── */}
        <circle cx={NX} cy={NY} r={NR} fill={neuronBg} stroke={neuronColor} strokeWidth="3" />
        <AnimatePresence mode="wait">
          {step === 0 && <text key="q" x={NX} y={NY + 7} textAnchor="middle" fontSize="22" fontWeight="900" fill="#cbd5e1">?</text>}
          {active1 && !active2 && (
            <text key="s1" x={NX} y={NY + 5} textAnchor="middle" fontSize="10" fontWeight="700" fill="#E11D48">
              w·x
            </text>
          )}
          {active2 && !active3 && (
            <text key="s2" x={NX} y={NY + 6} textAnchor="middle" fontSize="18" fontWeight="800" fill="#7C3AED">{WS}</text>
          )}
          {active3 && !active4 && (
            <text key="s3" x={NX} y={NY + 6} textAnchor="middle" fontSize="17" fontWeight="800" fill="#D97706">{OUT}</text>
          )}
          {active4 && (
            <text key="s4" x={NX} y={NY + 6} textAnchor="middle" fontSize="17" fontWeight="800" fill="#10B981">{OUT}</text>
          )}
        </AnimatePresence>
        <text x={NX} y={NY + NR + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">neuron</text>

        {/* ── Output box ───────────────────────────────────────────── */}
        <rect x={OX - 26} y={OY - 24} width={52} height={48} rx={12}
          fill={active4 ? '#d1fae5' : '#f8fafc'}
          stroke={active4 ? '#6ee7b7' : '#e2e8f0'} strokeWidth="2" />
        <text x={OX} y={OY + 7} textAnchor="middle" fontSize="18" fontWeight="800"
          fill={active4 ? '#10B981' : '#cbd5e1'}>
          {active4 ? OUT : '?'}
        </text>
        <text x={OX} y={OY + 33} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">output</text>

        {/* ── Step labels inside SVG ───────────────────────────────── */}
        {active1 && !active2 && (
          <text x={SVG_W / 2} y={20} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E11D48">
            multiply each input by its weight →
          </text>
        )}
        {active2 && (
          <text x={NX} y={36} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C3AED">
            Σ = {W[0]}×{X[0]} + {W[1]}×{X[1]} = {WS}
          </text>
        )}
        {active3 && (
          <text x={NX} y={36} textAnchor="middle" fontSize="10" fontWeight="700" fill="#D97706">
            {WS} + {B} (bias) = {OUT}
          </text>
        )}
      </svg>
    </SlideLayout>
  );
};
export default Scene4_16_OneNeuron;
