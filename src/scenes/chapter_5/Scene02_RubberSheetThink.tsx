import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// M = [[2,1],[1,2]]
// Eigenvectors: [1,1] → λ=3, [1,-1] → λ=1  (diagonal directions — non-obvious)
const M = [[2, 1], [1, 2]];

const W = 700, H = 700, CX = 350, CY = 350, SC = 112;
const sx = (x: number) => CX + x * SC;
const sy = (y: number) => CY - y * SC;

function applyM(v: [number, number]): [number, number] {
  return [M[0][0]*v[0] + M[0][1]*v[1], M[1][0]*v[0] + M[1][1]*v[1]];
}

function getLambda(v: [number,number], mv: [number,number]): number | null {
  const cross = v[0]*mv[1] - v[1]*mv[0];
  const nv = Math.sqrt(v[0]**2 + v[1]**2);
  const nmv = Math.sqrt(mv[0]**2 + mv[1]**2);
  if (nv < 1e-9) return null;
  if (Math.abs(cross) > 0.05 * nv * nmv) return null;
  const λ = Math.abs(v[0]) > Math.abs(v[1]) ? mv[0]/v[0] : mv[1]/v[1];
  return Math.round(λ * 100) / 100;
}

function normalize(v: [number,number]): [number,number] {
  const n = Math.sqrt(v[0]**2 + v[1]**2);
  return [v[0]/n, v[1]/n];
}

function angleDeg(v: [number,number]): number {
  return Math.atan2(v[1], v[0]) * 180 / Math.PI;
}

const CANDIDATES: { v: [number,number]; label: string; color: string }[] = [
  { v: [ 1,  0], label: '[1, 0]',  color: '#94a3b8' },
  { v: [ 0,  1], label: '[0, 1]',  color: '#94a3b8' },
  { v: [ 1,  1], label: '[1, 1]',  color: '#94a3b8' },
  { v: [ 1, -1], label: '[1, -1]', color: '#94a3b8' },
  { v: [ 2,  1], label: '[2, 1]',  color: '#94a3b8' },
  { v: [-1,  1], label: '[-1, 1]', color: '#94a3b8' },
];

// Arc path between two angles (for showing rotation)
function arcPath(r: number, a1deg: number, a2deg: number): string {
  const a1 = a1deg * Math.PI / 180;
  const a2 = a2deg * Math.PI / 180;
  const x1 = CX + r * Math.cos(a1), y1 = CY - r * Math.sin(a1);
  const x2 = CX + r * Math.cos(a2), y2 = CY - r * Math.sin(a2);
  // Determine sweep: go from a1 to a2 the short way
  let diff = a2deg - a1deg;
  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;
  const sweep = diff > 0 ? 1 : 0;
  const large = Math.abs(diff) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
}

// Arrow tip polygon
function arrowTip(vx: number, vy: number, len = 1): string {
  const nx = sx(vx * len), ny = sy(vy * len);
  const [dx, dy] = normalize([vx, vy]);
  const px = -dy * 7, py = dx * 7;
  const bx = nx - dx * 14, by = ny + dy * 14;
  return `${nx},${ny} ${bx + px},${by - py} ${bx - px},${by + py}`;
}

export const Scene5_2_RubberSheetThink: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [tried, setTried] = useState<Set<number>>(new Set());

  const sel  = selected !== null ? CANDIDATES[selected] : null;
  const mv   = sel ? applyM(sel.v) : null;
  const λ    = sel && mv ? getLambda(sel.v, mv) : null;
  const isEigen = λ !== null;
  const mvNorm = mv ? normalize(mv as [number,number]) : null;

  const handlePick = (i: number) => {
    setSelected(i);
    setTried(prev => new Set(prev).add(i));
  };

  const btnStyle = (i: number) => {
    if (!tried.has(i)) return 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50';
    const v = CANDIDATES[i].v; const out = applyM(v);
    const isE = getLambda(v, out) !== null;
    if (i === selected)
      return isE ? 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-200'
                 : 'border-rose-400 bg-rose-50 text-rose-700 ring-2 ring-rose-100';
    return isE ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
               : 'border-slate-200 bg-slate-50 text-slate-400';
  };

  const inputAngle  = sel ? angleDeg([sel.v[0], sel.v[1]]) : 0;
  const outputAngle = mv  ? angleDeg([mv[0], mv[1]]) : 0;
  const inputLen    = sel ? Math.sqrt(sel.v[0]**2 + sel.v[1]**2) : 1;
  const outputLen   = mv  ? Math.sqrt(mv[0]**2 + mv[1]**2) / SC * SC : 1;

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ── LEFT 65% ── */}
      <div className="flex flex-col items-center justify-center gap-2 px-4" style={{ flex: '0 0 70%' }}>

        <div className="text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 5 · Scene 2
          </p>
          <h2 className="text-xl font-black text-slate-800 mt-0.5">
            Can you <span className="text-sky-600">find the eigenvector?</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Pick a direction on the right. See if M only scales it — or rotates it.
          </p>
        </div>

        {/* Custom SVG — no TransformGrid */}
        <div className="relative rounded-2xl overflow-hidden flex-shrink-0"
          style={{ width: W, height: H, maxWidth: '100%', maxHeight: '85vh',
                   background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                   border: '1px solid #e2e8f0', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            <defs>
              <marker id="arr-gray"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#cbd5e1" />
              </marker>
              <marker id="arr-violet" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#7C3AED" />
              </marker>
              <marker id="arr-green"  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#10B981" />
              </marker>
              <marker id="arr-red"    markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <polygon points="0,0 6,3 0,6" fill="#E11D48" />
              </marker>
            </defs>

            {/* Compass rings */}
            {[70, 130, 190, 260].map(r => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" />
            ))}
            {/* Compass spokes — very faint */}
            {[0, 45, 90, 135].map(deg => {
              const a = deg * Math.PI / 180;
              return (
                <line key={deg}
                  x1={CX - Math.cos(a)*310} y1={CY - Math.sin(a)*310}
                  x2={CX + Math.cos(a)*310} y2={CY + Math.sin(a)*310}
                  stroke="#e2e8f0" strokeWidth="1" />
              );
            })}

            {/* Cardinal labels */}
            {[['E', 1,0],['N',0,1],['W',-1,0],['S',0,-1]].map(([lbl,dx,dy]) => (
              <text key={lbl as string}
                x={CX + (dx as number)*320} y={CY - (dy as number)*320}
                fontSize="12" fontWeight="700" fill="#cbd5e1"
                textAnchor="middle" dominantBaseline="middle">{lbl}</text>
            ))}

            {/* All candidate input arrows — faint background layer */}
            {CANDIDATES.map((c, i) => {
              const dim = selected !== null && i !== selected;
              const norm = normalize(c.v);
              const r = Math.sqrt(c.v[0]**2 + c.v[1]**2);
              const tx = CX + norm[0]*r*SC, ty = CY - norm[1]*r*SC;
              const tried_i = tried.has(i);
              const out = applyM(c.v);
              const isE = getLambda(c.v, out) !== null;
              const baseColor = tried_i ? (isE ? '#10B981' : '#E11D48') : '#cbd5e1';
              return (
                <g key={`bg-${i}`} opacity={dim ? 0.2 : tried_i ? 0.7 : 0.5}
                  style={{ cursor: 'pointer' }} onClick={() => handlePick(i)}>
                  <line x1={CX} y1={CY} x2={tx} y2={ty}
                    stroke={baseColor} strokeWidth={i === selected ? 2.5 : 1.8}
                    strokeDasharray={tried_i ? undefined : '5 3'}
                    markerEnd={`url(#arr-${tried_i ? (isE ? 'green' : 'red') : 'gray'})`}
                  />
                  {/* Vector label */}
                  <text x={tx + norm[0]*14} y={ty - norm[1]*14}
                    fontSize="10" fontWeight="700" fill={baseColor}
                    textAnchor="middle" dominantBaseline="middle">
                    {c.label}
                  </text>
                </g>
              );
            })}

            {/* Selected: bright input (violet dashed) */}
            {sel && (
              <motion.g key={`sel-in-${selected}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <line
                  x1={CX} y1={CY}
                  x2={sx(sel.v[0])} y2={sy(sel.v[1])}
                  stroke="#7C3AED" strokeWidth="3" strokeDasharray="7 4"
                  markerEnd="url(#arr-violet)"
                />
              </motion.g>
            )}

            {/* Selected: output arrow */}
            {sel && mv && mvNorm && (
              <motion.g key={`sel-out-${selected}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                {/* Arc showing rotation — only for non-eigen */}
                {!isEigen && (
                  <path
                    d={arcPath(70, inputAngle, outputAngle)}
                    fill="none" stroke="#E11D48" strokeWidth="1.5"
                    strokeDasharray="4 3" opacity={0.6}
                  />
                )}
                {/* Output arrow */}
                <line
                  x1={CX} y1={CY}
                  x2={sx(mv[0])} y2={sy(mv[1])}
                  stroke={isEigen ? '#10B981' : '#E11D48'}
                  strokeWidth="4.5"
                  markerEnd={`url(#arr-${isEigen ? 'green' : 'red'})`}
                />
                {/* Output label */}
                <motion.g initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                  <rect
                    x={sx(mv[0]) + (mv[0] >= 0 ? 8 : -90)}
                    y={sy(mv[1]) - 22}
                    width={82} height={20} rx={6}
                    fill={isEigen ? '#10B981' : '#E11D48'} opacity={0.93}
                  />
                  <text
                    x={sx(mv[0]) + (mv[0] >= 0 ? 14 : -84)}
                    y={sy(mv[1]) - 8}
                    fontSize="10" fontWeight="800" fill="#fff">
                    {isEigen ? `same dir  λ=${λ}` : 'direction changed'}
                  </text>
                </motion.g>
              </motion.g>
            )}

            {/* Centre dot */}
            <circle cx={CX} cy={CY} r={5} fill="#0f172a" />
          </svg>
        </div>
      </div>

      {/* ── RIGHT 35% ── */}
      <div className="flex flex-col gap-4 justify-center py-6 pr-6" style={{ flex: '0 0 30%' }}>

        {/* Matrix */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-black mb-2">
            The matrix M
          </p>
          <div className="flex items-center gap-3">
            <span className="text-slate-500 text-2xl font-thin">M =</span>
            <div className="border-l-2 border-r-2 border-slate-700 px-3 py-1">
              {([[2,1],[1,2]] as [number,number][]).map((row, r) => (
                <div key={r} className="flex gap-5">
                  {row.map((val, c) => (
                    <span key={c} className="text-xl font-black text-slate-800 w-5 text-center">{val}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-snug">
            Pick a direction v. We apply M and watch — does v rotate, or just stretch?
          </p>
        </div>

        {/* Candidate buttons */}
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            Try a vector v
          </p>
          <div className="grid grid-cols-2 gap-2">
            {CANDIDATES.map((c, i) => (
              <button key={i} onClick={() => handlePick(i)}
                className={`px-3 py-2.5 rounded-xl border-2 text-sm font-mono font-bold transition-all text-left ${btnStyle(i)}`}>
                <span>{c.label}</span>
                {tried.has(i) && (
                  <span className="float-right">
                    {getLambda(c.v, applyM(c.v)) !== null ? '✓' : '✗'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Equation panel */}
        <div className="min-h-[108px]">
          <AnimatePresence mode="wait">
            {!sel && (
              <motion.div key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center text-slate-300 text-sm italic text-center py-6">
                ← Pick a vector to see the math
              </motion.div>
            )}
            {sel && mv && !isEigen && (
              <motion.div key={`wrong-${selected}`}
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="bg-rose-50 border border-rose-200 rounded-2xl p-4">
                <p className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2">
                  Not an eigenvector
                </p>
                <p className="font-mono text-sm text-slate-700 leading-relaxed">
                  M · <span className="text-violet-600 font-black">{sel.label}</span>
                  {' = '}
                  <span className="text-rose-600 font-black">
                    [{mv[0].toFixed(1)}, {mv[1].toFixed(1)}]
                  </span>
                </p>
                <p className="text-xs text-rose-500 mt-1.5 font-medium">
                  Direction rotated — see the arc on the graph.
                </p>
              </motion.div>
            )}
            {sel && mv && isEigen && λ !== null && (
              <motion.div key={`found-${selected}`}
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border-2 border-emerald-400 rounded-2xl p-4 shadow-sm">
                <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-2">
                  Eigenvector found ✓
                </p>
                <p className="font-mono text-sm text-slate-700 leading-relaxed">
                  M · <span className="text-violet-600 font-black">{sel.label}</span>
                  {' = '}
                  <span className="text-emerald-600 font-black">
                    [{mv[0].toFixed(1)}, {mv[1].toFixed(1)}]
                  </span>
                </p>
                <p className="font-mono text-sm text-slate-700 mt-1">
                  {'= '}
                  <span className="text-emerald-700 font-black">{λ}</span>
                  {' · '}
                  <span className="text-violet-600 font-black">{sel.label}</span>
                </p>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-emerald-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">λ</span>
                  <p className="text-xs text-emerald-700 font-bold">
                    Eigenvalue = <span className="text-lg font-black">{λ}</span>
                    {λ > 1 ? ' — stretched' : λ === 1 ? ' — unchanged length' : λ < 0 ? ' — flipped' : ' — shrunk'}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default Scene5_2_RubberSheetThink;
