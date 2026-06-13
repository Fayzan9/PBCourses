import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const W   = [0.5, 0.8];
const X   = [3, 2];
const B   = 0.5;
const WS  = W[0] * X[0] + W[1] * X[1]; // 3.1
const OUT = WS + B;                       // 3.6

// ── SVG positions (expanded viewBox to fit matrix panel on left) ──────────
const SVG_W = 560, SVG_H = 290;
// Matrix panel (left zone)
const MX = 12, MY = 50;  // top-left of matrix cells
const CELL_W = 40, CELL_H = 32, CELL_GAP = 6;
// Neural diagram (right zone — shifted from previous)
const I1 = { x: 156, y: 100 };
const I2 = { x: 156, y: 200 };
const NX = 330, NY = 150, NR = 38;
const BX = 330, BY = 262, BR = 22;
const OX = 490, OY = 150;

function toCircle(x1: number, y1: number, cx: number, cy: number, r: number) {
  const dx = cx - x1, dy = cy - y1, d = Math.hypot(dx, dy);
  return { x: cx - (dx / d) * r, y: cy - (dy / d) * r };
}
function fromCircle(cx: number, cy: number, x2: number, y2: number, r: number) {
  const dx = x2 - cx, dy = y2 - cy, d = Math.hypot(dx, dy);
  return { x: cx + (dx / d) * r, y: cy + (dy / d) * r };
}

const STEPS = [
  { label: 'Multiply',  desc: `Scale each input by its weight: ${W[0]}×${X[0]} = ${W[0]*X[0]},  ${W[1]}×${X[1]} = ${W[1]*X[1]}` },
  { label: 'Sum',       desc: `Add the products: ${W[0]*X[0]} + ${W[1]*X[1]} = ${WS}` },
  { label: 'Add Bias',  desc: `Shift by the bias: ${WS} + ${B} = ${OUT}` },
  { label: 'Output',    desc: `${OUT} is the neuron's score — "how much does [${X}] match my weights?"` },
];

export const Scene4_14_OneNeuron: React.FC = () => {
  const [step, setStep] = useState(0);

  const e1  = toCircle(I1.x, I1.y, NX, NY, NR);
  const e2  = toCircle(I2.x, I2.y, NX, NY, NR);
  const bs  = { x: BX, y: BY - BR };
  const be  = { x: NX, y: NY + NR };
  const nos = fromCircle(NX, NY, OX, OY, NR);

  const a1 = step >= 1, a2 = step >= 2, a3 = step >= 3, a4 = step >= 4;

  const nColor = a4 ? '#10B981' : a3 ? '#D97706' : a2 ? '#7C3AED' : a1 ? '#E11D48' : '#94a3b8';
  const nBg    = a4 ? '#d1fae5' : a3 ? '#fef3c7' : a2 ? '#ede9fe' : a1 ? '#fff1f2' : '#f8fafc';

  // Matrix cell positions
  const wCells = W.map((_, i) => ({ x: MX + i * (CELL_W + CELL_GAP), y: MY }));
  const bCell  = { x: MX + (CELL_W + CELL_GAP) / 2, y: MY + CELL_H + 72 };

  return (
    <SlideLayout
      title="Start With One Neuron"
      text="One neuron: multiply inputs by weights, sum, add bias. The weight row IS the matrix."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {STEPS.map((s, i) => {
            const done = step > i + 1, cur = step === i + 1;
            return (
              <div key={i} className={`px-3 py-3 rounded-xl border text-xs transition-all ${
                done ? 'bg-emerald-50 border-emerald-200' :
                cur  ? 'bg-white border-slate-300 shadow-sm' :
                       'border-transparent opacity-30'
              }`}>
                <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                  done ? 'text-emerald-500' : cur ? 'text-violet-500' : 'text-slate-400'
                }`}>{done ? '✓' : `Step ${i+1}`} · {s.label}</span>
                {(cur || done) && <p className="text-slate-500 font-medium leading-snug">{s.desc}</p>}
              </div>
            );
          })}
          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-30 cursor-pointer">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(4, s+1))} disabled={step===4}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold disabled:opacity-30 cursor-pointer">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full max-h-full">
        <defs>
          {[['arr','#94a3b8'],['arr-r','#E11D48'],['arr-a','#D97706'],['arr-g','#10B981']].map(([id,c]) => (
            <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0,1 L10,5 L0,9z" fill={c} />
            </marker>
          ))}
        </defs>

        {/* ── MATRIX PANEL (left) ───────────────────────────────────── */}
        {/* Panel background */}
        <rect x={4} y={20} width={104} height={SVG_H - 36} rx={14}
          fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x={56} y={42} textAnchor="middle" fontSize="10" fontWeight="700" fill="#94a3b8" letterSpacing="1">
          WEIGHTS
        </text>

        {/* Weight cells */}
        {wCells.map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={c.y} width={CELL_W} height={CELL_H} rx={8}
              fill={a1 ? '#fff1f2' : '#fff'} stroke={a1 ? '#E11D48' : '#e2e8f0'} strokeWidth={a1 ? 2 : 1.5} />
            <text x={c.x + CELL_W/2} y={c.y + CELL_H/2 + 5}
              textAnchor="middle" fontSize="13" fontWeight="800"
              fill={a1 ? '#E11D48' : '#94a3b8'}>
              {W[i]}
            </text>
            <text x={c.x + CELL_W/2} y={c.y + CELL_H + 12}
              textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
              w{i+1}
            </text>
          </g>
        ))}

        {/* Bracket label */}
        <text x={56} y={MY + CELL_H + 20}
          textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
          1 × 2 row
        </text>

        {/* Bias cell */}
        <text x={56} y={bCell.y - 10} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">
          BIAS
        </text>
        <rect x={bCell.x - CELL_W/2} y={bCell.y} width={CELL_W} height={CELL_H} rx={8}
          fill={a3 ? '#fffbeb' : '#fff'} stroke={a3 ? '#D97706' : '#e2e8f0'} strokeWidth={a3 ? 2 : 1.5} />
        <text x={bCell.x} y={bCell.y + CELL_H/2 + 5}
          textAnchor="middle" fontSize="13" fontWeight="800"
          fill={a3 ? '#D97706' : '#94a3b8'}>
          {B}
        </text>

        {/* ── Dashed connector from matrix panel to diagram ─────────── */}
        <line x1={108} y1={MY + CELL_H/2} x2={I1.x - 22} y2={I1.y}
          stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />
        <line x1={108} y1={MY + CELL_H/2} x2={I2.x - 22} y2={I2.y}
          stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />

        {/* ── NEURAL DIAGRAM ────────────────────────────────────────── */}
        {/* Connection I1 → Neuron */}
        <line x1={I1.x + 22} y1={I1.y} x2={e1.x} y2={e1.y}
          stroke={a1 ? '#E11D48' : '#e2e8f0'} strokeWidth={a1 ? 2.5 : 1.5}
          markerEnd={a1 ? 'url(#arr-r)' : 'url(#arr)'} />
        {a1 && <>
          <rect x={(I1.x+22+e1.x)/2-18} y={(I1.y+e1.y)/2-10} width={36} height={20} rx={6} fill="#fff1f2" stroke="#fecdd3" />
          <text x={(I1.x+22+e1.x)/2} y={(I1.y+e1.y)/2+4}
            textAnchor="middle" fontSize="11" fontWeight="700" fill="#E11D48">×{W[0]}</text>
        </>}

        {/* Connection I2 → Neuron */}
        <line x1={I2.x + 22} y1={I2.y} x2={e2.x} y2={e2.y}
          stroke={a1 ? '#E11D48' : '#e2e8f0'} strokeWidth={a1 ? 2.5 : 1.5}
          markerEnd={a1 ? 'url(#arr-r)' : 'url(#arr)'} />
        {a1 && <>
          <rect x={(I2.x+22+e2.x)/2-18} y={(I2.y+e2.y)/2-10} width={36} height={20} rx={6} fill="#fff1f2" stroke="#fecdd3" />
          <text x={(I2.x+22+e2.x)/2} y={(I2.y+e2.y)/2+4}
            textAnchor="middle" fontSize="11" fontWeight="700" fill="#E11D48">×{W[1]}</text>
        </>}

        {/* Bias connection */}
        {a3 && <>
          <line x1={bs.x} y1={bs.y} x2={be.x} y2={be.y}
            stroke="#D97706" strokeWidth="2.5" markerEnd="url(#arr-a)" />
          <circle cx={BX} cy={BY} r={BR} fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
          <text x={BX} y={BY+5} textAnchor="middle" fontSize="11" fontWeight="800" fill="#D97706">+{B}</text>
          <text x={BX} y={BY+20} textAnchor="middle" fontSize="9" fontWeight="600" fill="#D97706" opacity="0.7">bias</text>
        </>}

        {/* Neuron → Output */}
        {a4 && <line x1={nos.x} y1={nos.y} x2={OX-28} y2={OY}
          stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arr-g)" />}

        {/* Input nodes */}
        {[I1, I2].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy={pt.y} r={22} fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
            <text x={pt.x} y={pt.y+6} textAnchor="middle" fontSize="15" fontWeight="800" fill="#0284c7">{X[i]}</text>
            <text x={pt.x} y={pt.y+22} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">x{i+1}</text>
          </g>
        ))}

        {/* Neuron */}
        <circle cx={NX} cy={NY} r={NR} fill={nBg} stroke={nColor} strokeWidth="3" />
        <AnimatePresence mode="wait">
          {!a1 && <text key="q" x={NX} y={NY+8} textAnchor="middle" fontSize="22" fontWeight="900" fill="#cbd5e1">?</text>}
          {a1 && !a2 && <text key="s1" x={NX} y={NY+6} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E11D48">w·x</text>}
          {a2 && !a3 && <text key="s2" x={NX} y={NY+7} textAnchor="middle" fontSize="18" fontWeight="800" fill="#7C3AED">{WS}</text>}
          {a3 && !a4 && <text key="s3" x={NX} y={NY+7} textAnchor="middle" fontSize="17" fontWeight="800" fill="#D97706">{OUT}</text>}
          {a4    && <text key="s4" x={NX} y={NY+7} textAnchor="middle" fontSize="17" fontWeight="800" fill="#10B981">{OUT}</text>}
        </AnimatePresence>
        <text x={NX} y={NY+NR+14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">neuron</text>

        {/* Step annotation inside graph */}
        {a2 && <text x={NX} y={32} textAnchor="middle" fontSize="10" fontWeight="700" fill="#7C3AED">
          Σ = {W[0]}×{X[0]} + {W[1]}×{X[1]} = {WS}
        </text>}
        {a3 && <text x={NX} y={32} textAnchor="middle" fontSize="10" fontWeight="700" fill="#D97706">
          {WS} + {B} (bias) = {OUT}
        </text>}

        {/* Output box */}
        <rect x={OX-28} y={OY-26} width={56} height={52} rx={12}
          fill={a4 ? '#d1fae5' : '#f8fafc'} stroke={a4 ? '#6ee7b7' : '#e2e8f0'} strokeWidth="2" />
        <text x={OX} y={OY+8} textAnchor="middle" fontSize="18" fontWeight="800"
          fill={a4 ? '#10B981' : '#cbd5e1'}>
          {a4 ? OUT : '?'}
        </text>
        <text x={OX} y={OY+34} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">output</text>

        {/* "connects to matrix" callout */}
        {!a1 && (
          <text x={56} y={SVG_H - 10} textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8">
            ← the weight row
          </text>
        )}
      </svg>
    </SlideLayout>
  );
};
export default Scene4_14_OneNeuron;
