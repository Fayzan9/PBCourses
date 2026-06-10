import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const W = 700, H = 700, CX = 350, CY = 350, SC = 78;
const sx = (x: number) => CX + x * SC;
const sy = (y: number) => CY - y * SC;

// 8 unit probe vectors at evenly-spaced angles
const ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const PROBES: [number, number][] = ANGLES.map(a => {
  const r = a * Math.PI / 180;
  return [parseFloat(Math.cos(r).toFixed(4)), parseFloat(Math.sin(r).toFixed(4))];
});

function applyMat(mat: number[][], v: [number, number]): [number, number] {
  return [mat[0][0]*v[0] + mat[0][1]*v[1], mat[1][0]*v[0] + mat[1][1]*v[1]];
}

function getLambda(v: [number,number], mv: [number,number]): number | null {
  const cross = v[0]*mv[1] - v[1]*mv[0];
  const nv  = Math.sqrt(v[0]**2 + v[1]**2);
  const nmv = Math.sqrt(mv[0]**2 + mv[1]**2);
  if (nv < 1e-9) return null;
  if (Math.abs(cross) > 0.06 * nv * nmv) return null;
  const λ = Math.abs(v[0]) > Math.abs(v[1]) ? mv[0]/v[0] : mv[1]/v[1];
  return Math.round(λ * 100) / 100;
}

// Cap display length so arrows stay within canvas
function capVec(v: [number,number], max = 2.9): [number,number] {
  const len = Math.sqrt(v[0]**2 + v[1]**2);
  if (len <= max) return v;
  return [v[0]/len * max, v[1]/len * max];
}

const PRESETS = [
  { label: 'Symmetric',   mat: [[2,1],[1,2]] },
  { label: 'Scale only',  mat: [[3,0],[0,2]] },
  { label: 'Shear',       mat: [[1,1],[0,1]] },
  { label: 'Rotation 45°',mat: [[0.7,-0.7],[0.7,0.7]] },
];

export const Scene5_3b_Bridge: React.FC = () => {
  const [mat, setMat]       = useState([[2, 1], [1, 2]]);
  const [draft, setDraft]   = useState([[2, 1], [1, 2]]);
  const [applied, setApplied] = useState(false);

  const results = PROBES.map(v => {
    const mv = applyMat(mat, v);
    const λ  = getLambda(v, mv);
    return { v, mv: capVec(mv), rawMv: mv, λ, isEigen: λ !== null };
  });

  const eigenCount = results.filter(r => r.isEigen).length;

  const handleApply = () => {
    setMat(draft.map(r => [...r]));
    setApplied(true);
  };

  const loadPreset = (m: number[][]) => {
    setDraft(m.map(r => [...r]));
    setMat(m.map(r => [...r]));
    setApplied(true);
  };

  const updateDraft = (r: number, c: number, val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    setDraft(prev => prev.map((row, ri) => row.map((v, ci) => ri===r && ci===c ? num : v)));
    setApplied(false);
  };

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ── LEFT 70% — vector canvas ── */}
      <div className="flex flex-col items-center justify-center gap-2 px-4" style={{ flex: '0 0 70%' }}>

        <div className="text-center">
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-black">Chapter 5 · Scene 3</p>
          <h2 className="text-xl font-black text-slate-800 mt-0.5">
            Which directions <span className="text-emerald-600">survive</span> the transformation?
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Edit M on the right → press Apply → green arrows kept direction, red ones rotated.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden flex-shrink-0"
          style={{ width: W, height: H, maxWidth: '100%', maxHeight: '82vh',
                   background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                   border: '1px solid #e2e8f0', boxShadow: '0 1px 10px rgba(0,0,0,0.06)' }}>
          <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
            <defs>
              <marker id="b3-gray"   markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#cbd5e1"/></marker>
              <marker id="b3-green"  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#10B981"/></marker>
              <marker id="b3-red"    markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#E11D48"/></marker>
              <marker id="b3-ghost"  markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><polygon points="0,0 6,3 0,6" fill="#e2e8f0"/></marker>
            </defs>

            {/* Compass rings */}
            {[65, 120, 185, 255].map(r => (
              <circle key={r} cx={CX} cy={CY} r={r} fill="none" stroke="#e8edf2" strokeWidth="1" />
            ))}
            {[0, 45, 90, 135].map(deg => {
              const a = deg * Math.PI / 180;
              return <line key={deg}
                x1={CX - Math.cos(a)*310} y1={CY - Math.sin(a)*310}
                x2={CX + Math.cos(a)*310} y2={CY + Math.sin(a)*310}
                stroke="#e8edf2" strokeWidth="1" />;
            })}
            {/* Cardinal labels */}
            {([['E',1,0],['N',0,1],['W',-1,0],['S',0,-1]] as [string,number,number][]).map(([l,dx,dy]) => (
              <text key={l} x={CX+dx*320} y={CY-dy*320} fontSize="12" fontWeight="700"
                fill="#cbd5e1" textAnchor="middle" dominantBaseline="middle">{l}</text>
            ))}

            {/* Probe vectors */}
            {results.map((res, i) => {
              const vx = res.v[0], vy = res.v[1];
              const tx = applied ? sx(res.mv[0]) : sx(vx);
              const ty = applied ? sy(res.mv[1]) : sy(vy);
              const col = applied ? (res.isEigen ? '#10B981' : '#E11D48') : '#94a3b8';
              const marker = applied ? (res.isEigen ? 'b3-green' : 'b3-red') : 'b3-gray';
              const sw = applied ? (res.isEigen ? 4 : 3) : 2.5;

              return (
                <g key={i}>
                  {/* Ghost (original direction) when applied */}
                  {applied && (
                    <line
                      x1={CX} y1={CY} x2={sx(vx)} y2={sy(vy)}
                      stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="4 3"
                      markerEnd="url(#b3-ghost)"
                    />
                  )}
                  {/* Animated main arrow */}
                  <motion.line
                    x1={CX} y1={CY}
                    animate={{ x2: tx, y2: ty }}
                    transition={{ type: 'spring', stiffness: 90, damping: 14, delay: i * 0.04 }}
                    stroke={col} strokeWidth={sw}
                    strokeDasharray={applied ? undefined : '5 3'}
                    markerEnd={`url(#${marker})`}
                  />
                  {/* λ badge for eigenvectors */}
                  {applied && res.isEigen && res.λ !== null && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.35 + i * 0.04 }}>
                      <rect
                        x={sx(res.mv[0]) + (res.mv[0] >= 0 ? 6 : -52)}
                        y={sy(res.mv[1]) - 20}
                        width={46} height={18} rx={5}
                        fill="#10B981" opacity={0.92}
                      />
                      <text
                        x={sx(res.mv[0]) + (res.mv[0] >= 0 ? 11 : -47)}
                        y={sy(res.mv[1]) - 8}
                        fontSize="10" fontWeight="800" fill="#fff">
                        λ = {res.λ}
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}

            {/* Centre */}
            <circle cx={CX} cy={CY} r={5} fill="#0f172a" />

            {/* Legend */}
            {applied && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <rect x={14} y={14} width={160} height={52} rx={10} fill="white" opacity={0.92}
                  style={{ filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.08))' }} />
                <circle cx={30} cy={32} r={5} fill="#10B981" />
                <text x={40} y={36} fontSize="11" fontWeight="700" fill="#374151">
                  scaled only — eigenvector
                </text>
                <circle cx={30} cy={52} r={5} fill="#E11D48" />
                <text x={40} y={56} fontSize="11" fontWeight="700" fill="#374151">
                  rotated — not eigenvector
                </text>
              </motion.g>
            )}
          </svg>
        </div>
      </div>

      {/* ── RIGHT 30% — controls ── */}
      <div className="flex flex-col gap-4 justify-center py-6 pr-6" style={{ flex: '0 0 30%' }}>

        {/* Matrix editor */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-black mb-3">
            Edit matrix M
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-slate-400 text-xl font-thin flex-shrink-0">M =</span>
            <div className="border-l-[3px] border-r-[3px] border-slate-600 px-3 py-2">
              {draft.map((row, r) => (
                <div key={r} className="flex gap-2 mb-1 last:mb-0">
                  {row.map((val, c) => (
                    <input key={c} type="number" step="0.5"
                      value={val}
                      onChange={e => updateDraft(r, c, e.target.value)}
                      className="w-14 text-center text-lg font-black text-slate-800 bg-white border-2 border-slate-200 rounded-lg py-1
                                 focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleApply}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm transition-colors">
            Apply M →
          </button>
        </div>

        {/* Presets */}
        <div>
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Try a preset</p>
          <div className="flex flex-col gap-1.5">
            {PRESETS.map(p => (
              <button key={p.label} onClick={() => loadPreset(p.mat)}
                className="px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50
                           text-xs font-bold text-slate-600 text-left transition-all">
                {p.label}
                <span className="float-right font-mono text-slate-400">
                  [{p.mat[0].join(',')}] [{p.mat[1].join(',')}]
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Result summary */}
        <div className="min-h-[80px]">
          <AnimatePresence mode="wait">
            {!applied && (
              <motion.p key="idle"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-slate-300 text-sm italic text-center py-4">
                Press Apply to see what happens →
              </motion.p>
            )}
            {applied && (
              <motion.div key="result"
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl p-4 border-2 ${
                  eigenCount > 0
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-slate-50 border-slate-200'
                }`}>
                <p className="text-xs font-black uppercase tracking-wider mb-2"
                  style={{ color: eigenCount > 0 ? '#059669' : '#64748b' }}>
                  {eigenCount > 0 ? `${eigenCount} eigenvector${eigenCount>1?'s':''} found ✓` : 'No eigenvectors in these 8 directions'}
                </p>
                {eigenCount > 0 && results.filter(r => r.isEigen).slice(0,2).map((r, i) => (
                  <p key={i} className="font-mono text-xs text-slate-600 leading-relaxed">
                    M·[{r.v[0].toFixed(2)},{r.v[1].toFixed(2)}] ={' '}
                    <span className="text-emerald-700 font-black">{r.λ}</span>·v
                  </p>
                ))}
                <p className="text-xs text-slate-400 mt-2 leading-snug">
                  These are <strong className="text-slate-600">eigenvectors</strong> — M can only <em>scale</em> them, never rotate.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
export default Scene5_3b_Bridge;
