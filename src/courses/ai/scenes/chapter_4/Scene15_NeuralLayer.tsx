import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';

const W    = [[0.5, 0.8], [0.2, -0.6], [0.9, 0.1]] as const;
const X    = [3, 2];
const BIAS = [0.5, -0.3, 0.1];
const OUT  = W.map((row, i) => row[0]*X[0] + row[1]*X[1] + BIAS[i]);

const ACCENT = ['#E11D48', '#7C3AED', '#D97706'];
const LIGHT  = ['#fff1f2', '#f5f3ff', '#fffbeb'];
const BORDER = ['#fecdd3', '#ddd6fe', '#fde68a'];

// ── SVG layout ────────────────────────────────────────────────────────────
const SVG_W = 600, SVG_H = 320;
const IR = 22, NR = 30, OR = 22;
// Matrix panel left zone
const CELL_W = 38, CELL_H = 28, CELL_GAP_X = 4, CELL_GAP_Y = 6;
const MAT_X = 10, MAT_Y = 50;
// Neural diagram (shifted right to make room)
const INPUTS  = [{ x: 154, y: 110 }, { x: 154, y: 210 }];
const NEURONS = [{ x: 340, y: 80  }, { x: 340, y: 160 }, { x: 340, y: 240 }];
const OUTS    = [{ x: 498, y: 80  }, { x: 498, y: 160 }, { x: 498, y: 240 }];

function toCircle(x1: number, y1: number, cx: number, cy: number, r: number) {
  const dx = cx-x1, dy = cy-y1, d = Math.hypot(dx, dy);
  return { x: cx-(dx/d)*r, y: cy-(dy/d)*r };
}
function fromCircle(cx: number, cy: number, x2: number, y2: number, r: number) {
  const dx = x2-cx, dy = y2-cy, d = Math.hypot(dx, dy);
  return { x: cx+(dx/d)*r, y: cy+(dy/d)*r };
}

export const Scene4_15_NeuralLayer: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <SlideLayout
      title="Scale It Up: A Full Layer"
      text="Each row of the weight matrix W is one neuron. Click a row — see exactly which neuron fires."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Building on Scene 16</p>
            <p className="text-xs text-slate-600 font-medium leading-snug">
              1 neuron = 1 row = 1 dot product + bias<br />
              <span className="font-black text-slate-800">3 rows = 3 neurons = y = Wx + b</span>
            </p>
          </div>

          <AnimatePresence mode="wait">
            {active === null ? (
              <motion.div key="hint" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                className="flex flex-col items-center gap-2 py-5 text-center">
                <div className="text-3xl">👆</div>
                <p className="text-sm font-bold text-slate-500">Click a row in the matrix or a neuron</p>
                <p className="text-xs text-slate-400">Each row = that neuron's weights</p>
              </motion.div>
            ) : (
              <motion.div key={`n${active}`} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                className="rounded-2xl border p-4 flex flex-col gap-3"
                style={{backgroundColor: LIGHT[active], borderColor: BORDER[active]}}>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{color: ACCENT[active]}}>
                  Neuron {active+1} · Row {active+1} of W
                </span>
                <div className="flex gap-1">
                  {[W[active][0], W[active][1]].map((w, j) => (
                    <div key={j} className="w-12 h-9 rounded-xl flex items-center justify-center font-mono text-sm font-black text-white"
                      style={{backgroundColor: ACCENT[active]}}>
                      {w}
                    </div>
                  ))}
                  <span className="self-center text-slate-400 mx-1 font-bold">+b={BIAS[active]}</span>
                </div>
                <div className="flex flex-col gap-1 font-mono text-xs">
                  {X.map((x, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <span className="font-bold w-6 text-right" style={{color:ACCENT[active]}}>{W[active][j]}</span>
                      <span className="text-slate-400">×</span>
                      <span className="font-bold text-sky-600">{x}</span>
                      <span className="text-slate-400">=</span>
                      <span className="font-black">{W[active][j]*x}</span>
                    </div>
                  ))}
                  <div className="border-t pt-1 flex gap-2 items-center" style={{borderColor:BORDER[active]}}>
                    <span className="text-slate-400">sum + bias</span>
                    <span className="text-xl font-black" style={{color:ACCENT[active]}}>=  {OUT[active].toFixed(1)}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-slate-900 rounded-2xl px-4 py-3 text-center">
            <span className="font-mono text-white font-black text-lg">y = Wx + b</span>
            <p className="text-[10px] text-slate-400 mt-1">W is 3×2 · one row per neuron</p>
          </div>
        </div>
      }
    >
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full h-full max-h-full">
        <defs>
          {ACCENT.map((c, i) => (
            <marker key={i} id={`na${i}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M0,1 L10,5 L0,9z" fill={c} />
            </marker>
          ))}
          <marker id="n-grey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M0,1 L10,5 L0,9z" fill="#cbd5e1" />
          </marker>
        </defs>

        {/* ── MATRIX PANEL ─────────────────────────────────────────── */}
        <rect x={4} y={18} width={126} height={SVG_H-34} rx={14}
          fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <text x={67} y={38} textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748b" letterSpacing="1">
          W
        </text>
        <text x={67} y={50} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
          weight matrix
        </text>

        {/* Matrix rows — each row is a clickable group */}
        {W.map((row, ri) => {
          const isActive = active === ri;
          const isDimmed = active !== null && !isActive;
          const rowY = MAT_Y + 18 + ri * (CELL_H + CELL_GAP_Y + 14);
          return (
            <g key={ri} onClick={() => setActive(active === ri ? null : ri)}
              style={{cursor:'pointer'}} opacity={isDimmed ? 0.3 : 1}>
              {/* Row highlight background */}
              <rect x={MAT_X - 4} y={rowY - 4} width={120} height={CELL_H + 8} rx={8}
                fill={isActive ? LIGHT[ri] : 'transparent'}
                stroke={isActive ? ACCENT[ri] : 'transparent'} strokeWidth="1.5" />
              {/* Row label */}
              <text x={MAT_X + 4} y={rowY + CELL_H/2 + 4}
                fontSize="9" fontWeight="700" fill={isActive ? ACCENT[ri] : '#cbd5e1'}>
                r{ri+1}
              </text>
              {/* Cells */}
              {row.map((w, ci) => (
                <g key={ci}>
                  <rect x={MAT_X + 18 + ci*(CELL_W+CELL_GAP_X)} y={rowY}
                    width={CELL_W} height={CELL_H} rx={7}
                    fill={isActive ? ACCENT[ri] : '#fff'}
                    stroke={isActive ? ACCENT[ri] : '#e2e8f0'} strokeWidth={isActive ? 2 : 1.5} />
                  <text x={MAT_X + 18 + ci*(CELL_W+CELL_GAP_X) + CELL_W/2} y={rowY + CELL_H/2 + 5}
                    textAnchor="middle" fontSize="11" fontWeight="800"
                    fill={isActive ? '#fff' : '#64748b'}>
                    {w}
                  </text>
                </g>
              ))}
            </g>
          );
        })}

        {/* Column headers */}
        {['x1','x2'].map((lbl, ci) => (
          <text key={ci} x={MAT_X + 18 + ci*(CELL_W+CELL_GAP_X) + CELL_W/2}
            y={MAT_Y + 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
            {lbl}
          </text>
        ))}

        {/* ── Dashed connectors: matrix edge → input nodes ─────────── */}
        {[0, 1].map(ii => (
          <line key={ii} x1={130} y1={MAT_Y + 18 + 0*(CELL_H+CELL_GAP_Y+14) + CELL_H/2}
            x2={INPUTS[ii].x - IR} y2={INPUTS[ii].y}
            stroke="#e8ecf2" strokeWidth="1" strokeDasharray="4 3" />
        ))}

        {/* ── Input → Neuron connections ────────────────────────────── */}
        {NEURONS.map((npt, ni) =>
          INPUTS.map((ipt, ii) => {
            const end = toCircle(ipt.x+IR, ipt.y, npt.x, npt.y, NR);
            const isA = active === ni, isD = active !== null && !isA;
            return (
              <g key={`c${ni}-${ii}`}>
                <line x1={ipt.x+IR} y1={ipt.y} x2={end.x} y2={end.y}
                  stroke={isA ? ACCENT[ni] : '#e2e8f0'} strokeWidth={isA ? 2 : 1}
                  opacity={isD ? 0.15 : 1} />
                {isA && (
                  <g>
                    <rect x={(ipt.x+IR+end.x)/2-15} y={(ipt.y+end.y)/2-9} width={30} height={18} rx={5}
                      fill={LIGHT[ni]} stroke={BORDER[ni]} />
                    <text x={(ipt.x+IR+end.x)/2} y={(ipt.y+end.y)/2+4}
                      textAnchor="middle" fontSize="10" fontWeight="800" fill={ACCENT[ni]}>
                      {W[ni][ii]}
                    </text>
                  </g>
                )}
              </g>
            );
          })
        )}

        {/* ── Neuron → Output connections ───────────────────────────── */}
        {NEURONS.map((npt, ni) => {
          const start = fromCircle(npt.x, npt.y, OUTS[ni].x, OUTS[ni].y, NR);
          const isA = active === ni, isD = active !== null && !isA;
          return (
            <line key={`oc${ni}`} x1={start.x} y1={start.y}
              x2={OUTS[ni].x-OR} y2={OUTS[ni].y}
              stroke={isA ? ACCENT[ni] : '#e2e8f0'} strokeWidth={isA ? 2 : 1}
              opacity={isD ? 0.15 : 1}
              markerEnd={isA ? `url(#na${ni})` : 'url(#n-grey)'} />
          );
        })}

        {/* ── Input nodes ───────────────────────────────────────────── */}
        {INPUTS.map((pt, i) => (
          <g key={`i${i}`}>
            <circle cx={pt.x} cy={pt.y} r={IR} fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
            <text x={pt.x} y={pt.y+6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0284c7">{X[i]}</text>
            <text x={pt.x} y={pt.y+IR+12} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">x{i+1}</text>
          </g>
        ))}

        {/* ── Neuron nodes ──────────────────────────────────────────── */}
        {NEURONS.map((pt, ni) => {
          const isA = active === ni, isD = active !== null && !isA;
          return (
            <g key={`n${ni}`} onClick={() => setActive(active===ni ? null : ni)}
              style={{cursor:'pointer'}} opacity={isD ? 0.25 : 1}>
              <circle cx={pt.x} cy={pt.y} r={NR}
                fill={isA ? LIGHT[ni] : '#f8fafc'}
                stroke={isA ? ACCENT[ni] : '#e2e8f0'} strokeWidth={isA ? 3 : 1.5} />
              <text x={pt.x} y={pt.y+5} textAnchor="middle" fontSize="12" fontWeight="800"
                fill={isA ? ACCENT[ni] : '#94a3b8'}>
                N{ni+1}
              </text>
            </g>
          );
        })}

        {/* ── Output nodes ──────────────────────────────────────────── */}
        {OUTS.map((pt, ni) => {
          const isA = active === ni, isD = active !== null && !isA;
          return (
            <g key={`out${ni}`} opacity={isD ? 0.2 : 1}>
              <rect x={pt.x-OR} y={pt.y-OR} width={OR*2} height={OR*2} rx={10}
                fill={isA ? LIGHT[ni] : '#f8fafc'}
                stroke={isA ? ACCENT[ni] : '#e2e8f0'} strokeWidth={isA ? 2.5 : 1.5} />
              <text x={pt.x} y={pt.y+5} textAnchor="middle" fontSize="12" fontWeight="800"
                fill={isA ? ACCENT[ni] : '#94a3b8'}>
                {OUT[ni].toFixed(1)}
              </text>
              <text x={pt.x} y={pt.y+OR+13} textAnchor="middle" fontSize="9" fontWeight="600" fill="#94a3b8">
                y{ni+1}
              </text>
            </g>
          );
        })}

        {/* ── Column headings ───────────────────────────────────────── */}
        <text x={INPUTS[0].x}  y={14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">Input x</text>
        <text x={NEURONS[0].x} y={14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">Neurons</text>
        <text x={OUTS[0].x}    y={14} textAnchor="middle" fontSize="9" fontWeight="700" fill="#94a3b8">Output y</text>
      </svg>
    </SlideLayout>
  );
};
export default Scene4_15_NeuralLayer;
