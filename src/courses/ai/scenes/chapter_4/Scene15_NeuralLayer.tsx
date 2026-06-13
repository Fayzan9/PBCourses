import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const ACCENT = ['#E11D48', '#7C3AED', '#D97706'];
const LIGHT  = ['#fff1f2', '#f5f3ff', '#fffbeb'];
const BORDER = ['#fecdd3', '#ddd6fe', '#fde68a'];

// ── SVG layout ────────────────────────────────────────────────────────────
const SVG_W = 680, SVG_H = 320;
const IR = 22, NR = 30, OR = 22;
// Matrix panel left zone
const CELL_W = 38, CELL_H = 28, CELL_GAP_X = 4;
const MAT_X = 10;

function toCircle(x1: number, y1: number, cx: number, cy: number, r: number) {
  const dx = cx-x1, dy = cy-y1, d = Math.hypot(dx, dy);
  return { x: cx-(dx/d)*r, y: cy-(dy/d)*r };
}
function fromCircle(cx: number, cy: number, x2: number, y2: number, r: number) {
  const dx = x2-cx, dy = y2-cy, d = Math.hypot(dx, dy);
  return { x: cx+(dx/d)*r, y: cy+(dy/d)*r };
}

export const Scene4_15_NeuralLayer: React.FC = () => {
  const [inputs, setInputs] = useState<number[]>([3.0, 2.0]);
  const [biases, setBiases] = useState<number[]>([0.5, -0.3, 0.1]);
  const [weights, setWeights] = useState<number[][]>([
    [0.5, 0.8],
    [0.2, -0.6],
    [0.9, 0.1]
  ]);
  const [active, setActive] = useState<number | null>(null);
  const [step, setStep] = useState(0);

  const N = inputs.length;
  const M = biases.length;

  const handleAddInput = () => {
    if (N < 3) {
      setInputs([...inputs, 1.0]);
      setWeights(weights.map(row => [...row, 0.5]));
      setStep(0);
      setActive(null);
    }
  };

  const handleRemoveInput = () => {
    if (N > 1) {
      setInputs(inputs.slice(0, -1));
      setWeights(weights.map(row => row.slice(0, -1)));
      setStep(0);
      setActive(null);
    }
  };

  const handleAddNeuron = () => {
    if (M < 3) {
      setBiases([...biases, 0.1]);
      setWeights([...weights, Array(N).fill(0.5)]);
      setStep(0);
      setActive(null);
    }
  };

  const handleRemoveNeuron = () => {
    if (M > 1) {
      setBiases(biases.slice(0, -1));
      setWeights(weights.slice(0, -1));
      setActive(null);
      setStep(0);
    }
  };

  const updateArray = (setter: any, arr: number[], index: number, val: number) => {
    const updated = [...arr];
    updated[index] = val;
    setter(updated);
  };

  // Math output computation
  const outputs = biases.map((b, ni) => {
    const sum = inputs.reduce((total, x, ii) => total + x * (weights[ni]?.[ii] ?? 0), 0);
    return sum + b;
  });

  const activeNeuron = active !== null ? active : (step >= 1 && step <= M) ? step - 1 : null;
  const isFullOutput = step === M + 1;

  const stepsInfo = [
    ...biases.map((_, i) => ({
      label: `Neuron ${i+1}`,
      desc: `Scale inputs x by Row ${i+1} weights and add bias b${i+1} to compute output y${i+1}.`
    })),
    {
      label: 'Vector Output',
      desc: `Combine all activations into the final layer output vector y = [${outputs.map(o => o.toFixed(1)).join(', ')}].`
    }
  ];

  // Dynamic coordinates based on current N and M
  const getInputY = (index: number, count: number) => {
    if (count === 1) return 160;
    const spacingMap: Record<number, number> = {
      2: 100,
      3: 75
    };
    const spacing = spacingMap[count] || 75;
    const startY = 160 - ((count - 1) * spacing) / 2;
    return startY + index * spacing;
  };

  const getNeuronY = (index: number, count: number) => {
    if (count === 1) return 160;
    const spacingMap: Record<number, number> = {
      2: 100,
      3: 75
    };
    const spacing = spacingMap[count] || 75;
    const startY = 160 - ((count - 1) * spacing) / 2;
    return startY + index * spacing;
  };

  return (
    <SlideLayout
      title="Scale It Up: A Full Layer"
      text="Each row of the weight matrix W is one neuron. Click a row — see exactly which neuron fires."
      sidebarContent={
        <div className="flex flex-col gap-3 justify-between h-full">
          <div className="space-y-3">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Building on Scene 14</p>
              <p className="text-xs text-slate-600 font-medium leading-snug">
                1 neuron = 1 row = 1 dot product + bias<br />
                <span className="font-black text-slate-800">3 rows = 3 neurons = y = Wx + b</span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-4">
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-sky-600">Inputs (N)</h4>
                <div className="flex gap-2">
                  <button onClick={handleRemoveInput} disabled={N <= 1} className="flex-1 py-1.5 rounded-lg bg-sky-50 border border-sky-100 text-xs font-bold text-sky-600 hover:bg-sky-100 disabled:opacity-30 transition-all cursor-pointer">
                    - Remove
                  </button>
                  <button onClick={handleAddInput} disabled={N >= 3} className="flex-1 py-1.5 rounded-lg bg-sky-50 border border-sky-100 text-xs font-bold text-sky-600 hover:bg-sky-100 disabled:opacity-30 transition-all cursor-pointer">
                    + Add
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-violet-600">Neurons (M)</h4>
                <div className="flex gap-2">
                  <button onClick={handleRemoveNeuron} disabled={M <= 1} className="flex-1 py-1.5 rounded-lg bg-violet-50 border border-violet-100 text-xs font-bold text-violet-600 hover:bg-violet-100 disabled:opacity-30 transition-all cursor-pointer">
                    - Remove
                  </button>
                  <button onClick={handleAddNeuron} disabled={M >= 3} className="flex-1 py-1.5 rounded-lg bg-violet-50 border border-violet-100 text-xs font-bold text-violet-600 hover:bg-violet-100 disabled:opacity-30 transition-all cursor-pointer">
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {activeNeuron === null && !isFullOutput ? (
                <motion.div key="hint" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  className="flex flex-col items-center gap-2 py-3 text-center">
                  <div className="text-3xl">👆</div>
                  <p className="text-sm font-bold text-slate-500">Click a row in the matrix or a neuron</p>
                  <p className="text-xs text-slate-400">Each row = that neuron's weights</p>
                </motion.div>
              ) : isFullOutput ? (
                <motion.div key="full-vector" initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 flex flex-col gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    Full Layer Activation
                  </span>
                  <div className="flex flex-col gap-1.5 font-mono text-xs text-slate-600">
                    {outputs.map((val, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-white px-2.5 py-1 rounded-lg border border-emerald-100 shadow-sm">
                        <span className="font-bold">y{idx+1}</span>
                        <span className="font-black text-emerald-600">{val.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div key={`n${activeNeuron}`} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                  className="rounded-2xl border p-4 flex flex-col gap-3"
                  style={{backgroundColor: LIGHT[activeNeuron % 3], borderColor: BORDER[activeNeuron % 3]}}>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{color: ACCENT[activeNeuron % 3]}}>
                    Neuron {activeNeuron+1} · Row {activeNeuron+1} of W
                  </span>
                  <div className="flex gap-1">
                    {(weights[activeNeuron] ?? []).map((w, j) => (
                      <div key={j} className="w-12 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-black text-white"
                        style={{backgroundColor: ACCENT[activeNeuron % 3]}}>
                        {w.toFixed(1)}
                      </div>
                    ))}
                    <span className="self-center text-slate-400 mx-1 font-bold">+b={biases[activeNeuron]?.toFixed(1)}</span>
                  </div>
                  <div className="flex flex-col gap-1 font-mono text-xs">
                    {inputs.map((x, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <span className="font-bold w-6 text-right" style={{color:ACCENT[activeNeuron % 3]}}>{weights[activeNeuron]?.[j]?.toFixed(1)}</span>
                        <span className="text-slate-400">×</span>
                        <span className="font-bold text-sky-600">{x.toFixed(1)}</span>
                        <span className="text-slate-400">=</span>
                        <span className="font-black">{( (weights[activeNeuron]?.[j] ?? 0) * x ).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="border-t pt-1 flex gap-2 items-center" style={{borderColor:BORDER[activeNeuron % 3]}}>
                      <span className="text-slate-400">sum + bias</span>
                      <span className="text-xl font-black" style={{color:ACCENT[activeNeuron % 3]}}>=  {outputs[activeNeuron]?.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Steps Walkthrough Panel */}
            <div className="space-y-1.5 border-t pt-3 border-slate-200">
              {stepsInfo.map((s, i) => {
                const done = step > i + 1;
                const cur = step === i + 1;
                return (
                  <div 
                    key={i} 
                    onClick={() => {
                      setStep(i + 1);
                      setActive(i < M ? i : null);
                    }}
                    className={`px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                      done ? 'bg-slate-50 border-slate-200 opacity-60' :
                      cur  ? 'bg-white border-violet-200 shadow-sm scale-[1.01]' : 'border-transparent opacity-40 hover:opacity-75'
                    }`}
                  >
                    <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                      done ? 'text-slate-400' : cur ? 'text-violet-600' : 'text-slate-400'
                    }`}>
                      {done ? '✓' : `Step ${i+1}`} · {s.label}
                    </span>
                    {(cur || done) && <p className="text-[11px] text-slate-500 font-medium leading-snug">{s.desc}</p>}
                  </div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200">
              <button 
                onClick={() => {
                  const prev = Math.max(0, step - 1);
                  setStep(prev);
                  setActive(prev >= 1 && prev <= M ? prev - 1 : null);
                }} 
                disabled={step === 0} 
                className="flex-1 py-2 rounded-xl bg-slate-50 text-xs font-bold text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ← Back
              </button>
              <button 
                onClick={() => {
                  const next = Math.min(M + 1, step + 1);
                  setStep(next);
                  setActive(next >= 1 && next <= M ? next - 1 : null);
                }} 
                disabled={step === M + 1} 
                className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold disabled:opacity-30 hover:bg-slate-800 transition-colors shadow-md cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex flex-col items-center p-4 gap-4 animate-fade-in bg-slate-50/50 rounded-3xl justify-center">
        
        {/* SVG Wrapper */}
        <div className="w-full flex-1 flex items-center justify-center min-h-[320px]">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-2xl h-full drop-shadow-sm">
            <defs>
              {ACCENT.map((c, i) => (
                <marker key={i} id={`na${i}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M0,1 L10,5 L0,9z" fill={c} />
                </marker>
              ))}
              <marker id="na-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M0,1 L10,5 L0,9z" fill="#10B981" />
              </marker>
              <marker id="n-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                <path d="M0,1 L10,5 L0,9z" fill="#cbd5e1" />
              </marker>
            </defs>

            {/* ── MATRIX PANEL ─────────────────────────────────────────── */}
            <rect 
              x={10} 
              y={getNeuronY(0, M) - 32} 
              width={18 + N * (CELL_W + CELL_GAP_X) + 12} 
              height={(getNeuronY(M-1, M) - getNeuronY(0, M)) + 56} 
              rx={14}
              fill="#ffffff" 
              stroke="#e2e8f0" 
              strokeWidth="1.5" 
            />
            <text 
              x={10 + (18 + N * (CELL_W + CELL_GAP_X) + 12) / 2} 
              y={getNeuronY(0, M) - 20} 
              textAnchor="middle" 
              fontSize="9" 
              fontWeight="800" 
              fill="#94a3b8" 
              letterSpacing="1"
            >
              W
            </text>

            {/* Matrix rows — each row is a clickable group */}
            {weights.map((row, ri) => {
              const isActive = activeNeuron === ri;
              const isDimmed = (activeNeuron !== null && !isActive) || isFullOutput;
              const rowY = getNeuronY(ri, M) - CELL_H / 2;
              return (
                <g key={ri} onClick={() => {
                  const targetActive = activeNeuron === ri ? null : ri;
                  setActive(targetActive);
                  setStep(targetActive === null ? 0 : ri + 1);
                }}
                  style={{cursor:'pointer'}} opacity={isDimmed ? 0.3 : 1}>
                  {/* Row highlight background */}
                  <rect x={MAT_X + 4} y={rowY - 4} width={N*(CELL_W+CELL_GAP_X)+20} height={CELL_H + 8} rx={8}
                    fill={isActive ? LIGHT[ri % 3] : 'transparent'}
                    stroke={isActive ? ACCENT[ri % 3] : 'transparent'} strokeWidth="1.5" />
                  {/* Row label */}
                  <text x={MAT_X + 8} y={rowY + CELL_H/2 + 4}
                    fontSize="9" fontWeight="700" fill={isActive ? ACCENT[ri % 3] : '#cbd5e1'}>
                    r{ri+1}
                  </text>
                  {/* Cells */}
                  {row.map((w, ci) => (
                    <g key={ci}>
                      <rect x={MAT_X + 22 + ci*(CELL_W+CELL_GAP_X)} y={rowY}
                        width={CELL_W} height={CELL_H} rx={7}
                        fill={isActive ? ACCENT[ri % 3] : '#fff'}
                        stroke={isActive ? ACCENT[ri % 3] : '#e2e8f0'} strokeWidth={isActive ? 2 : 1.5} />
                      <text x={MAT_X + 22 + ci*(CELL_W+CELL_GAP_X) + CELL_W/2} y={rowY + CELL_H/2 + 5}
                        textAnchor="middle" fontSize="11" fontWeight="800"
                        fill={isActive ? '#fff' : '#64748b'}>
                        {w.toFixed(1)}
                      </text>
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Column headers */}
            {Array.from({ length: N }).map((_, ci) => (
              <text key={ci} x={MAT_X + 22 + ci*(CELL_W+CELL_GAP_X) + CELL_W/2}
                y={getNeuronY(0, M) - 8} textAnchor="middle" fontSize="8" fontWeight="700" fill="#94a3b8">
                x{ci+1}
              </text>
            ))}

            {/* ── Dashed connectors: matrix edge → input nodes ─────────── */}
            {Array.from({ length: N }).map((_, ii) => {
              const endY = getInputY(ii, N);
              const matrixRightEdge = 10 + (18 + N * (CELL_W + CELL_GAP_X) + 12);
              return (
                <line key={ii} x1={matrixRightEdge} y1={endY}
                  x2={210 - IR} y2={endY}
                  stroke="#e8ecf2" strokeWidth="1" strokeDasharray="4 3" />
              );
            })}

            {/* ── Input → Neuron connections ────────────────────────────── */}
            {biases.map((_, ni) => {
              const npt = { x: 410, y: getNeuronY(ni, M) };
              const isA = activeNeuron === ni;
              const isD = (activeNeuron !== null && !isA) || isFullOutput;
              return inputs.map((_, ii) => {
                const ipt = { x: 210, y: getInputY(ii, N) };
                const end = toCircle(ipt.x+IR, ipt.y, npt.x, npt.y, NR);
                return (
                  <g key={`c${ni}-${ii}`}>
                    <line x1={ipt.x+IR} y1={ipt.y} x2={end.x} y2={end.y}
                      stroke={isA ? ACCENT[ni % 3] : '#e2e8f0'} strokeWidth={isA ? 2 : 1}
                      opacity={isD ? 0.15 : 1} />
                    {isA && (
                      <g>
                        <rect x={(ipt.x+IR+end.x)/2-15} y={(ipt.y+end.y)/2-9} width={30} height={18} rx={5}
                          fill={LIGHT[ni % 3]} stroke={BORDER[ni % 3]} />
                        <text x={(ipt.x+IR+end.x)/2} y={(ipt.y+end.y)/2+4}
                          textAnchor="middle" fontSize="10" fontWeight="800" fill={ACCENT[ni % 3]}>
                          {weights[ni]?.[ii]?.toFixed(1)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              });
            })}

            {/* ── Neuron → Output connections ───────────────────────────── */}
            {biases.map((_, ni) => {
              const npt = { x: 410, y: getNeuronY(ni, M) };
              const opt = { x: 570, y: getNeuronY(ni, M) };
              const start = fromCircle(npt.x, npt.y, opt.x, opt.y, NR);
              const isA = activeNeuron === ni || isFullOutput;
              const isD = activeNeuron !== null && !isA;
              return (
                <line key={`oc${ni}`} x1={start.x} y1={start.y}
                  x2={opt.x-OR} y2={opt.y}
                  stroke={isA ? (isFullOutput ? '#10B981' : ACCENT[ni % 3]) : '#e2e8f0'} strokeWidth={isA ? 2.5 : 1}
                  opacity={isD ? 0.15 : 1}
                  markerEnd={isA ? (isFullOutput ? 'url(#na-g)' : `url(#na${ni % 3})`) : 'url(#n-grey)'} />
              );
            })}

            {/* ── Input nodes ───────────────────────────────────────────── */}
            {inputs.map((val, i) => {
              const y = getInputY(i, N);
              return (
                <g key={`i${i}`}>
                  <circle cx={210} cy={y} r={IR} fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
                  <text x={210} y={y+5} textAnchor="middle" fontSize="13" fontWeight="800" fill="#0284c7">{val.toFixed(1)}</text>
                  <text x={210} y={y+IR+12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">x{i+1}</text>
                </g>
              );
            })}

            {/* ── Neuron nodes ──────────────────────────────────────────── */}
            {biases.map((_, ni) => {
              const pt = { x: 410, y: getNeuronY(ni, M) };
              const isA = activeNeuron === ni;
              const isD = (activeNeuron !== null && !isA) || isFullOutput;
              return (
                <g key={`n${ni}`} onClick={() => {
                  const targetActive = activeNeuron === ni ? null : ni;
                  setActive(targetActive);
                  setStep(targetActive === null ? 0 : ni + 1);
                }}
                  style={{cursor:'pointer'}} opacity={isD ? 0.25 : 1}>
                  <circle cx={pt.x} cy={pt.y} r={NR}
                    fill={isA ? LIGHT[ni % 3] : '#f8fafc'}
                    stroke={isA ? ACCENT[ni % 3] : '#e2e8f0'} strokeWidth={isA ? 3 : 1.5} />
                  <text x={pt.x} y={pt.y+5} textAnchor="middle" fontSize="12" fontWeight="800"
                    fill={isA ? ACCENT[ni % 3] : '#94a3b8'}>
                    N{ni+1}
                  </text>
                </g>
              );
            })}

            {/* ── Output nodes ──────────────────────────────────────────── */}
            {biases.map((_, ni) => {
              const pt = { x: 570, y: getNeuronY(ni, M) };
              const isA = activeNeuron === ni || isFullOutput;
              const isD = activeNeuron !== null && !isA;
              const outVal = outputs[ni];
              return (
                <g key={`out${ni}`} opacity={isD ? 0.2 : 1}>
                  <rect x={pt.x-OR} y={pt.y-OR} width={OR*2} height={OR*2} rx={10}
                    fill={isA ? (isFullOutput ? '#d1fae5' : LIGHT[ni % 3]) : '#f8fafc'}
                    stroke={isA ? (isFullOutput ? '#10B981' : ACCENT[ni % 3]) : '#e2e8f0'} strokeWidth={isA ? 2.5 : 1.5} />
                  <text x={pt.x} y={pt.y+5} textAnchor="middle" fontSize="12" fontWeight="800"
                    fill={isA ? (isFullOutput ? '#059669' : ACCENT[ni % 3]) : '#94a3b8'}>
                    {outVal.toFixed(1)}
                  </text>
                  <text x={pt.x} y={pt.y+OR+13} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
                    y{ni+1}
                  </text>
                </g>
              );
            })}

            {/* ── Column headings ───────────────────────────────────────── */}
            <text x={210} y={14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">Input x</text>
            <text x={410} y={14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">Neurons</text>
            <text x={570} y={14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">Output y</text>
          </svg>
        </div>

        {/* ── PARAMETER BOARD (Bracket Matrix / Vector Notation) ────── */}
        <div className="w-full max-w-xl bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-4 font-mono">
          
          {/* Inputs Vector Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="w-24 text-xs font-black text-sky-600 uppercase tracking-wider text-left sm:text-right pr-2">Inputs (x)</span>
            <div className="flex items-center text-sm bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 max-w-max">
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

          {/* Weights Matrix Row */}
          <div className="flex flex-col sm:flex-row gap-2">
            <span className="w-24 text-xs font-black text-rose-600 uppercase tracking-wider text-left sm:text-right pr-2 mt-2">Weights (W)</span>
            <div className="flex flex-col gap-2 bg-slate-50 border border-slate-100 rounded-xl p-2.5 max-w-max">
              {weights.map((row, ri) => (
                <div key={`w-row-${ri}`} className="flex items-center">
                  <span className="text-rose-400 font-sans font-bold text-base mr-1">[</span>
                  {row.map((val, ci) => (
                    <div key={`w-val-${ri}-${ci}`} className="flex items-center">
                      {ci > 0 && <span className="text-slate-300 mr-1 mb-3 font-bold font-sans">,</span>}
                      <div className="flex flex-col items-center">
                        <input
                          type="number"
                          value={val}
                          onChange={(e) => {
                            const v = parseFloat(e.target.value);
                            const updated = weights.map((r, rIdx) => 
                              rIdx === ri ? r.map((cVal, cIdx) => cIdx === ci ? (isNaN(v) ? 0 : v) : cVal) : r
                            );
                            setWeights(updated);
                          }}
                          step="0.1"
                          className="w-10 text-center font-bold text-sm bg-transparent focus:outline-none text-rose-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-[10px] font-bold text-rose-500/80 font-sans mt-0.5">w{ri+1},{ci+1}</span>
                      </div>
                    </div>
                  ))}
                  <span className="text-rose-400 font-sans font-bold text-base ml-1">]</span>
                  <span className="text-[10px] font-bold text-slate-400 font-sans ml-2">Row {ri+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bias Vector Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <span className="w-24 text-xs font-black text-amber-600 uppercase tracking-wider text-left sm:text-right pr-2">Bias (b)</span>
            <div className="flex items-center text-sm bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 max-w-max">
              <span className="text-slate-400 font-sans font-bold text-lg mr-1">[</span>
              {biases.map((val, idx) => (
                <div key={`bias-val-${idx}`} className="flex items-center">
                  {idx > 0 && <span className="text-slate-300 mr-1 mb-3 font-bold font-sans">,</span>}
                  <div className="flex flex-col items-center">
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        updateArray(setBiases, biases, idx, isNaN(v) ? 0 : v);
                      }}
                      step="0.1"
                      className="w-10 text-center font-bold text-sm bg-transparent focus:outline-none text-amber-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-[10px] font-bold text-amber-600/80 font-sans mt-0.5">b{idx+1}</span>
                  </div>
                </div>
              ))}
              <span className="text-slate-400 font-sans font-bold text-lg ml-1">]</span>
            </div>
          </div>

        </div>

      </div>
    </SlideLayout>
  );
};

export default Scene4_15_NeuralLayer;
