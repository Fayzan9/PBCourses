import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

// ── Helpers & Constants ──────────
const SVG_W = 560;
const SVG_H = 340; // Slightly taller to accommodate 5 nodes comfortably
const NX = 330, NY = 160, NR = 42;
const BX = 330, BY = 288, BR = 22;
const OX = 490, OY = 160;

function toCircle(x1: number, y1: number, cx: number, cy: number, r: number) {
  const dx = cx - x1, dy = cy - y1, d = Math.hypot(dx, dy);
  return { x: cx - (dx / d) * r, y: cy - (dy / d) * r };
}

function fromCircle(cx: number, cy: number, x2: number, y2: number, r: number) {
  const dx = x2 - cx, dy = y2 - cy, d = Math.hypot(dx, dy);
  return { x: cx + (dx / d) * r, y: cy + (dy / d) * r };
}

// ── Main Scene Component ──────────

export const Scene4_14_OneNeuron: React.FC = () => {
  const [inputs, setInputs] = useState<number[]>([3.0, 2.0]);
  const [weights, setWeights] = useState<number[]>([0.5, 0.8]);
  const [bias, setBias] = useState(0.5);
  const [step, setStep] = useState(0);

  const N = inputs.length;

  const handleAddNode = () => {
    if (N < 5) {
      setInputs([...inputs, 1.0]);
      setWeights([...weights, 0.5]);
      setStep(0);
    }
  };

  const handleRemoveNode = () => {
    if (N > 1) {
      setInputs(inputs.slice(0, -1));
      setWeights(weights.slice(0, -1));
      setStep(0);
    }
  };

  const updateArray = (setter: any, arr: number[], index: number, val: number) => {
    const updated = [...arr];
    updated[index] = val;
    setter(updated);
  };

  // Math
  const products = inputs.map((x, i) => x * weights[i]);
  const sumVal = products.reduce((sum, val) => sum + val, 0);
  const outVal = sumVal + bias;

  // Layout Constants
  const getInputY = (index: number) => {
    if (N === 1) return 160;
    const spacingMap: Record<number, number> = {
      2: 90,
      3: 75,
      4: 62,
      5: 52
    };
    const spacing = spacingMap[N] || 52;
    const startY = 160 - ((N - 1) * spacing) / 2;
    return startY + index * spacing;
  };

  const bs = { x: BX, y: BY - BR };
  const be = { x: NX, y: NY + NR };
  const nos = fromCircle(NX, NY, OX, OY, NR);

  const a1 = step >= 1, a2 = step >= 2, a3 = step >= 3, a4 = step >= 4;
  const nColor = a4 ? '#10B981' : a3 ? '#D97706' : a2 ? '#7C3AED' : a1 ? '#E11D48' : '#94a3b8';
  const nBg    = a4 ? '#d1fae5' : a3 ? '#fef3c7' : a2 ? '#ede9fe' : a1 ? '#fff1f2' : '#f8fafc';

  const stepsInfo = [
    { label: 'Multiply', desc: `Scale each of the ${N} inputs by its respective weight.` },
    { label: 'Sum', desc: `Add the ${N} products together: ${sumVal.toFixed(2)}` },
    { label: 'Add Bias', desc: `Shift the sum by adding the bias (${bias.toFixed(1)}).` },
    { label: 'Output', desc: `Final score: ${outVal.toFixed(2)}. The neuron's activation.` },
  ];

  return (
    <SlideLayout
      title="Start With One Neuron"
      text="Adjust the size of the neuron to add more inputs, then configure their values to see the math in real-time."
      sidebarContent = {
        <div className="flex flex-col gap-4 h-full justify-between">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-800">Neuron Dimension</h4>
              <div className="flex gap-2">
                <button onClick={handleRemoveNode} disabled={N <= 1} className="flex-1 py-2 rounded-lg bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600 hover:bg-rose-100 disabled:opacity-30 transition-all cursor-pointer">
                  - Remove
                </button>
                <button onClick={handleAddNode} disabled={N >= 5} className="flex-1 py-2 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600 hover:bg-emerald-100 disabled:opacity-30 transition-all cursor-pointer">
                  + Add Input
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {stepsInfo.map((s, i) => {
                const done = step > i + 1, cur = step === i + 1;
                return (
                  <div key={i} className={`px-3 py-3 rounded-xl border transition-all ${
                    done ? 'bg-slate-50 border-slate-200 opacity-60' :
                    cur  ? 'bg-white border-violet-200 shadow-sm scale-[1.02]' : 'border-transparent opacity-40'
                  }`}>
                    <span className={`text-[10px] uppercase tracking-wider font-black block mb-1 ${
                      done ? 'text-slate-400' : cur ? 'text-violet-600' : 'text-slate-400'
                    }`}>{done ? '✓' : `Step ${i+1}`} · {s.label}</span>
                    {(cur || done) && <p className="text-xs text-slate-500 font-medium leading-snug">{s.desc}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200">
            <button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step===0} className="flex-1 py-3 rounded-xl bg-slate-50 text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-colors">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(4, s+1))} disabled={step===4} className="flex-1 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold disabled:opacity-30 hover:bg-slate-800 transition-colors shadow-md">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex flex-col items-center p-4 gap-4 animate-fade-in bg-slate-50/50 rounded-3xl justify-center">
        
        {/* SVG Wrapper */}
        <div className="w-full flex-1 flex items-center justify-center min-h-[340px]">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-2xl h-full drop-shadow-sm">
            <defs>
              {[['arr','#94a3b8'],['arr-r','#E11D48'],['arr-a','#D97706'],['arr-g','#10B981']].map(([id,c]) => (
                <marker key={id} id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                  <path d="M0,1 L10,5 L0,9z" fill={c} />
                </marker>
              ))}
            </defs>

            {/* Matrix Panel (Weight Column) */}
            <rect 
              x={12} 
              y={getInputY(0) - 32} 
              width={96} 
              height={(getInputY(N - 1) - getInputY(0)) + 56} 
              rx={14} 
              fill="#ffffff" 
              stroke="#e2e8f0" 
              strokeWidth="1.5" 
            />
            <text 
              x={60} 
              y={getInputY(0) - 20} 
              textAnchor="middle" 
              fontSize="9" 
              fontWeight="800" 
              fill="#94a3b8" 
              letterSpacing="1"
            >
              WEIGHTS
            </text>

            {weights.map((w, i) => {
              const iy = getInputY(i);
              return (
                <g key={`w-cell-${i}`}>
                  {/* Weight Box aligned vertically with node */}
                  <rect x={38} y={iy - 14} width={44} height={28} rx={6} fill={a1 ? '#fff1f2' : '#f8fafc'} stroke={a1 ? '#E11D48' : '#e2e8f0'} strokeWidth={a1 ? 2 : 1} />
                  <text x={60} y={iy + 4} textAnchor="middle" fontSize="12" fontWeight="800" fill={a1 ? '#E11D48' : '#64748b'}>{w.toFixed(1)}</text>
                  <text x={28} y={iy + 3} textAnchor="end" fontSize="8" fontWeight="700" fill="#94a3b8">w{i+1}</text>
                </g>
              );
            })}

            {/* Connectors & Nodes */}
            {inputs.map((x, i) => {
              const iy = getInputY(i);
              const nodePos = { x: 156, y: iy };
              const edgePt = toCircle(nodePos.x, nodePos.y, NX, NY, NR);

              return (
                <g key={`node-${i}`}>
                  {/* Straight horizontal line from weight cell to input node */}
                  <line x1={82} y1={iy} x2={134} y2={iy} stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Neural connection line */}
                  <line x1={nodePos.x + 22} y1={nodePos.y} x2={edgePt.x} y2={edgePt.y} stroke={a1 ? '#E11D48' : '#e2e8f0'} strokeWidth={a1 ? 2.5 : 1.5} markerEnd={a1 ? 'url(#arr-r)' : 'url(#arr)'} />
                  
                  {a1 && (
                    <g>
                      <rect x={(nodePos.x+22+edgePt.x)/2-22} y={(nodePos.y+edgePt.y)/2-10} width={44} height={20} rx={5} fill="#fff1f2" stroke="#fecdd3" />
                      <text x={(nodePos.x+22+edgePt.x)/2} y={(nodePos.y+edgePt.y)/2+3} textAnchor="middle" fontSize="9" fontWeight="700" fill="#E11D48">×{weights[i].toFixed(1)}</text>
                    </g>
                  )}

                  <circle cx={nodePos.x} cy={nodePos.y} r={22} fill="#ffffff" stroke="#38bdf8" strokeWidth="2.5" />
                  <text x={nodePos.x} y={nodePos.y+5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#0284c7">{x.toFixed(1)}</text>
                  <text x={nodePos.x} y={nodePos.y+22} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">x{i+1}</text>
                </g>
              );
            })}

            {/* Bias & Neuron Core */}
            {a3 && (
              <g>
                <line x1={bs.x} y1={bs.y} x2={be.x} y2={be.y} stroke="#D97706" strokeWidth="2.5" markerEnd="url(#arr-a)" />
                <circle cx={BX} cy={BY} r={BR} fill="#fffbeb" stroke="#fcd34d" strokeWidth="2.5" />
                <text x={BX} y={BY+4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#D97706">+{bias.toFixed(1)}</text>
              </g>
            )}

            {a4 && <line x1={nos.x} y1={nos.y} x2={OX-28} y2={OY} stroke="#10B981" strokeWidth="2.5" markerEnd="url(#arr-g)" />}

            <circle cx={NX} cy={NY} r={NR} fill={nBg} stroke={nColor} strokeWidth="3.5" />
            <AnimatePresence mode="wait">
              {!a1 && <text key="q" x={NX} y={NY+8} textAnchor="middle" fontSize="24" fontWeight="900" fill="#cbd5e1">?</text>}
              {a1 && !a2 && <text key="s1" x={NX} y={NY+5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#E11D48">w·x</text>}
              {a2 && !a3 && <text key="s2" x={NX} y={NY+6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#7C3AED">{sumVal.toFixed(2)}</text>}
              {a3 && !a4 && <text key="s3" x={NX} y={NY+6} textAnchor="middle" fontSize="16" fontWeight="800" fill="#D97706">{outVal.toFixed(2)}</text>}
              {a4    && <text key="s4" x={NX} y={NY+6} textAnchor="middle" fontSize="16" fontWeight="900" fill="#10B981">{outVal.toFixed(2)}</text>}
            </AnimatePresence>
            <text x={NX} y={NY+NR+14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">NEURON</text>

            {/* Output */}
            <rect x={OX-28} y={OY-26} width={56} height={52} rx={12} fill={a4 ? '#d1fae5' : '#ffffff'} stroke={a4 ? '#34d399' : '#e2e8f0'} strokeWidth="2.5" />
            <text x={OX} y={OY+7} textAnchor="middle" fontSize="16" fontWeight="900" fill={a4 ? '#059669' : '#cbd5e1'}>{a4 ? outVal.toFixed(2) : '?'}</text>
            <text x={OX} y={OY+38} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">OUTPUT</text>
          </svg>
        </div>

        {/* ── REDESIGNED PARAMETER BOARD (Matrix Bracket Notation) ────── */}
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4 font-mono">
          
          {/* Inputs Vector Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="w-24 text-xs font-black text-sky-600 uppercase tracking-wider text-left sm:text-right pr-2">Inputs (x)</span>
            <div className="flex items-center text-base bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 max-w-max">
              <span className="text-slate-400 font-sans font-bold text-lg mr-1">[</span>
              {inputs.map((val, idx) => (
                <div key={`input-val-${idx}`} className="flex items-center">
                  {idx > 0 && <span className="text-slate-300 mr-1 mb-3 font-bold font-sans">,</span>}
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        updateArray(setInputs, inputs, idx, isNaN(v) ? 0 : v);
                      }}
                      step="0.5"
                      className="w-10 text-center font-bold text-sm bg-transparent focus:outline-none text-sky-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[10px] font-bold text-sky-500/80 font-sans mt-0.5">x{idx+1}</span>
                  </div>
                </div>
              ))}
              <span className="text-slate-400 font-sans font-bold text-lg ml-1">]</span>
            </div>
          </div>

          {/* Weights Vector Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="w-24 text-xs font-black text-rose-600 uppercase tracking-wider text-left sm:text-right pr-2">Weights (w)</span>
            <div className="flex items-center text-base bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 max-w-max">
              <span className="text-slate-400 font-sans font-bold text-lg mr-1">[</span>
              {weights.map((val, idx) => (
                <div key={`weight-val-${idx}`} className="flex items-center">
                  {idx > 0 && <span className="text-slate-300 mr-1 mb-3 font-bold font-sans">,</span>}
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        updateArray(setWeights, weights, idx, isNaN(v) ? 0 : v);
                      }}
                      step="0.1"
                      className="w-10 text-center font-bold text-sm bg-transparent focus:outline-none text-rose-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[10px] font-bold text-rose-500/80 font-sans mt-0.5">w{idx+1}</span>
                  </div>
                </div>
              ))}
              <span className="text-slate-400 font-sans font-bold text-lg ml-1">]</span>
            </div>
          </div>

          {/* Bias Scalar Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="w-24 text-xs font-black text-amber-600 uppercase tracking-wider text-left sm:text-right pr-2">Bias (b)</span>
            <div className="flex items-center text-base bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 max-w-max">
              <span className="text-slate-400 font-sans font-bold text-lg mr-1">[</span>
              <div className="flex flex-col items-center px-1">
                <input
                  type="number"
                  value={bias}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setBias(isNaN(v) ? 0 : v);
                  }}
                  step="0.1"
                  className="w-10 text-center font-bold text-sm bg-transparent focus:outline-none text-amber-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-[10px] font-bold text-amber-600/80 font-sans mt-0.5">bias</span>
              </div>
              <span className="text-slate-400 font-sans font-bold text-lg ml-1">]</span>
            </div>
          </div>

        </div>

      </div>
    </SlideLayout>
  );
};

export default Scene4_14_OneNeuron;