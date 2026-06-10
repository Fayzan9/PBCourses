import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { type Vec2, type Mat2, mulMV, mag2 as mag, norm, fmt } from '../../components/mathHelpers';

const MARKER_DEFS = (
  <defs>
    {([
      ['red', '#E11D48'], ['blue', '#0284C7'], ['green', '#059669'],
      ['slate', '#64748B'], ['violet', '#7C3AED'], ['amber', '#D97706'],
      ['emerald', '#10B981'], ['rose', '#FB7185'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`c5-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

export const Scene5_4_WobbleTest: React.FC = () => {
  const [matRaw, setMatRaw] = useState(['3', '1', '0', '2']);
  const matNum = matRaw.map(v => parseFloat(v) || 0);
  const M: Mat2 = [[matNum[0], matNum[1]], [matNum[2], matNum[3]]];

  const [vecMode, setVecMode] = useState<'preset' | 'custom'>('preset');
  const [presetIdx, setPresetIdx] = useState(0);
  const [vecRaw, setVecRaw] = useState(['1', '0']);

  const presets: { label: string; vec: Vec2; color: string; marker: string }[] = [
    { label: '[1, 0]  →', vec: [1, 0],  color: '#E11D48', marker: 'red'    },
    { label: '[0, 1]  ↑', vec: [0, 1],  color: '#0284C7', marker: 'blue'   },
    { label: '[1, 1]  ↗', vec: [1, 1],  color: '#7C3AED', marker: 'violet' },
    { label: '[2, 1]',    vec: [2, 1],  color: '#D97706', marker: 'amber'  },
  ];

  const inputVec: Vec2 = vecMode === 'preset'
    ? presets[presetIdx].vec
    : [(parseFloat(vecRaw[0]) || 0), (parseFloat(vecRaw[1]) || 0)];
  const vecColor  = vecMode === 'preset' ? presets[presetIdx].color  : '#64748b';
  const vecMarker = vecMode === 'preset' ? presets[presetIdx].marker : 'slate';

  const [result, setResult] = useState<{
    input: Vec2; output: Vec2; scale: number; rotDeg: number; isEigen: boolean;
  } | null>(null);

  const calculate = () => {
    const v = inputVec;
    if (mag(v) < 0.001) return;
    const out  = mulMV(M, v);
    const nI   = norm(v);
    const nO   = norm(out);
    const dot  = Math.min(1, Math.max(-1, nI[0]*nO[0] + nI[1]*nO[1]));
    const rot  = Math.acos(dot) * 180 / Math.PI;
    setResult({ input: v, output: out, scale: mag(out) / mag(v), rotDeg: rot, isEigen: rot < 1.5 });
  };

  const resetResult = () => setResult(null);

  const W = 520, H = 520, CX = W / 2, CY = H / 2, SC = 82;
  const tp = (v: Vec2): [number, number] => [CX + v[0] * SC, CY - v[1] * SC];

  const inTip  = tp(inputVec);
  const outTip = result ? tp(result.output) : null;

  const nIn  = mag(inputVec) > 0.001 ? norm(inputVec) : [1, 0] as Vec2;
  const nOut = result ? norm(result.output) : nIn;

  const arcR    = 65;
  const aStart  = Math.atan2(-nIn[1], nIn[0]);
  const aEnd    = Math.atan2(-nOut[1], nOut[0]);
  let   arcSwp  = aEnd - aStart;
  if (arcSwp >  Math.PI) arcSwp -= 2 * Math.PI;
  if (arcSwp < -Math.PI) arcSwp += 2 * Math.PI;
  const arcLarge = Math.abs(arcSwp) > Math.PI ? 1 : 0;
  const arcFlag  = arcSwp > 0 ? 1 : 0;
  const ax1 = CX + arcR * Math.cos(aStart), ay1 = CY + arcR * Math.sin(aStart);
  const ax2 = CX + arcR * Math.cos(aEnd),   ay2 = CY + arcR * Math.sin(aEnd);
  const midA  = aStart + arcSwp / 2;
  const arcLX = CX + (arcR + 24) * Math.cos(midA);
  const arcLY = CY + (arcR + 24) * Math.sin(midA);

  const ray = 3.2;
  const rayIn:  [number, number] = [CX + nIn[0]  * SC * ray, CY - nIn[1]  * SC * ray];
  const rayOut: [number, number] = result ? [CX + nOut[0] * SC * ray, CY - nOut[1] * SC * ray] : rayIn;

  const lOff = (tip: [number, number], extra = 0): [number, number] => {
    const dx = tip[0] - CX, dy = tip[1] - CY;
    return [dx >= 0 ? 10 + extra : -10 - extra, dy >= 0 ? 16 : -18];
  };

  const [[a, b], [c, d]] = M;
  const [vx, vy] = inputVec;

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-5 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl shadow-inner overflow-hidden p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          {MARKER_DEFS}
          <rect width={W} height={H} fill="white" rx="16" />
          {([-3,-2,-1,0,1,2,3] as number[]).map(i => {
            const ax = i === 0;
            return (
              <g key={i}>
                <line x1={CX+i*SC} y1={18} x2={CX+i*SC} y2={H-18}
                  stroke={ax ? '#94a3b8' : '#f1f5f9'} strokeWidth={ax ? 1.5 : 0.8} />
                <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC}
                  stroke={ax ? '#94a3b8' : '#f1f5f9'} strokeWidth={ax ? 1.5 : 0.8} />
                {i !== 0 && <>
                  <text x={CX+i*SC} y={CY+15} textAnchor="middle" fill="#cbd5e1" fontSize="9">{i}</text>
                  <text x={CX+7}    y={CY-i*SC+4} fill="#cbd5e1" fontSize="9">{i}</text>
                </>}
              </g>
            );
          })}
          <line x1={CX} y1={CY} x2={rayIn[0]} y2={rayIn[1]}
            stroke={vecColor} strokeWidth="0.8" strokeDasharray="5 4" opacity="0.2" />
          <line x1={CX} y1={CY} x2={inTip[0]} y2={inTip[1]}
            stroke={vecColor} strokeWidth="3.5" strokeDasharray="9 5"
            markerEnd={`url(#c5-${vecMarker})`} />
          {(() => {
            const [ox, oy] = lOff(inTip);
            const lx = inTip[0] + ox, ly = inTip[1] + oy - 14;
            const txt = `v = [${fmt(vx)}, ${fmt(vy)}]`;
            const w = txt.length * 6.2 + 10;
            return (
              <g>
                <rect x={lx - 2} y={ly - 13} width={w} height={17} rx="4" fill={vecColor} opacity="0.88" />
                <text x={lx + w/2 - 2} y={ly + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                <text x={lx} y={inTip[1] + oy + 2} fill={vecColor} fontSize="9" fontWeight="bold" opacity="0.65">INPUT</text>
              </g>
            );
          })()}
          {result && (
            <line x1={CX} y1={CY} x2={rayOut[0]} y2={rayOut[1]}
              stroke={result.isEigen ? '#059669' : '#E11D48'} strokeWidth="0.8"
              strokeDasharray="5 4" opacity="0.2" />
          )}
          {result && outTip && (
            <motion.g key={`out-${result.input[0]}-${result.input[1]}-${M[0][0]}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <line x1={CX} y1={CY} x2={outTip[0]} y2={outTip[1]}
                stroke={result.isEigen ? '#059669' : '#E11D48'} strokeWidth="5"
                markerEnd={`url(#c5-${result.isEigen ? 'green' : 'red'})`} />
              {(() => {
                const [ox, oy] = lOff(outTip, 4);
                const lx = outTip[0] + ox, ly = outTip[1] + oy - 14;
                const txt = `M·v = [${fmt(result.output[0])}, ${fmt(result.output[1])}]`;
                const w = txt.length * 6.2 + 10;
                const col = result.isEigen ? '#059669' : '#E11D48';
                return (
                  <g>
                    <rect x={lx - 2} y={ly - 13} width={w} height={17} rx="4" fill={col} opacity="0.9" />
                    <text x={lx + w/2 - 2} y={ly + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">{txt}</text>
                    <text x={lx} y={outTip[1] + oy + 2} fill={col} fontSize="9" fontWeight="bold" opacity="0.65">OUTPUT</text>
                  </g>
                );
              })()}
            </motion.g>
          )}
          {result && !result.isEigen && (
            <motion.g key={`arc-${result.input[0]}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <path d={`M ${ax1} ${ay1} A ${arcR} ${arcR} 0 ${arcLarge} ${arcFlag} ${ax2} ${ay2}`}
                fill="none" stroke="#E11D48" strokeWidth="2.5" />
              <circle cx={ax2} cy={ay2} r="4" fill="#E11D48" />
              <rect x={arcLX - 26} y={arcLY - 12} width="52" height="17" rx="5" fill="#E11D48" />
              <text x={arcLX} y={arcLY + 1} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                {result.rotDeg.toFixed(1)}° tilt
              </text>
            </motion.g>
          )}
          {result?.isEigen && (
            <motion.g key="eigen-ok" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}>
              <circle cx={ax1} cy={ay1} r="11" fill="none" stroke="#059669" strokeWidth="2.5" />
              <rect x={CX - 84} y={32} width="168" height="40" rx="10" fill="#059669" />
              <text x={CX} y={49} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                ✓ Same direction — just scaled
              </text>
              <text x={CX} y={64} textAnchor="middle" fill="white" fontSize="10" opacity="0.9">
                eigenvalue λ = {fmt(result.scale)}
              </text>
            </motion.g>
          )}
          {!result && (
            <g>
              <rect x={CX - 100} y={32} width="200" height="30" rx="8" fill="#f1f5f9" />
              <text x={CX} y={52} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                Set inputs → click Calculate
              </text>
            </g>
          )}
          <circle cx={CX} cy={CY} r="5.5" fill="#0f172a" />
        </svg>
      </div>

      <div className="flex-[35] min-w-0 flex flex-col gap-3 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-xl font-black text-slate-800 leading-tight mb-1">The Wobble Test</h2>
          <p className="text-slate-400 text-xs leading-relaxed">
            Define a matrix and a vector. Calculate M·v. Did the direction change? That's the entire test.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Matrix M</div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { idx: 0, label: 'a' },
              { idx: 1, label: 'b' },
              { idx: 2, label: 'c' },
              { idx: 3, label: 'd' },
            ].map(({ idx, label }) => (
              <div key={idx} className="flex flex-col gap-0.5">
                <span className="text-[9px] font-mono text-slate-400 font-bold pl-1">{label}</span>
                <input
                  type="number" step="0.5" value={matRaw[idx]}
                  onChange={e => { const v = [...matRaw]; v[idx] = e.target.value; setMatRaw(v); resetResult(); }}
                  className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-mono font-bold text-slate-800 text-center bg-slate-50 focus:outline-none focus:border-violet-400 focus:bg-white transition-all"
                />
              </div>
            ))}
          </div>
          <div className="mt-2 text-[10px] font-mono text-slate-400 text-center">
            [[{fmt(matNum[0])}, {fmt(matNum[1])}], [{fmt(matNum[2])}, {fmt(matNum[3])}]]
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Input Vector v</div>
          <div className="flex rounded-lg overflow-hidden border border-slate-200 text-[11px] font-bold mb-2">
            {(['preset', 'custom'] as const).map(m => (
              <button key={m} onClick={() => { setVecMode(m); resetResult(); }}
                className={`flex-1 py-1.5 cursor-pointer transition-all ${vecMode === m ? 'bg-slate-800 text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`}>
                {m === 'preset' ? 'Presets' : 'Custom'}
              </button>
            ))}
          </div>

          {vecMode === 'preset' ? (
            <div className="grid grid-cols-2 gap-1.5">
              {presets.map((p, i) => (
                <button key={i} onClick={() => { setPresetIdx(i); resetResult(); }}
                  className={`py-2 px-1 rounded-lg border text-[11px] font-bold transition-all cursor-pointer text-center ${
                    i === presetIdx ? 'border-slate-400 bg-white shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-white'
                  }`} style={{ color: p.color }}>
                  {p.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {['x', 'y'].map((axis, ai) => (
                <div key={axis} className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-mono text-slate-400 font-bold pl-1">v.{axis}</span>
                  <input type="number" step="0.5" value={vecRaw[ai]}
                    onChange={e => { const v = [...vecRaw]; v[ai] = e.target.value; setVecRaw(v); resetResult(); }}
                    className="w-full border border-slate-200 rounded-lg px-2 py-1.5 text-sm font-mono font-bold text-slate-800 text-center bg-slate-50 focus:outline-none focus:border-sky-400 focus:bg-white transition-all"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-2 text-[10px] font-mono text-slate-400 text-center">
            v = [{fmt(vx)}, {fmt(vy)}]
          </div>
        </div>

        <button onClick={calculate}
          className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm cursor-pointer transition-all shadow-sm active:scale-95">
          Calculate M·v →
        </button>

        {result && (
          <motion.div key={`calc-${result.input[0]}-${result.output[0]}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">M·v step-by-step</div>
            <div className="font-mono text-[11px] flex flex-col gap-1.5 text-slate-700">
              <div>
                <span className="text-rose-500 font-bold">{fmt(a)}</span>×{fmt(vx)} + <span className="text-rose-500 font-bold">{fmt(b)}</span>×{fmt(vy)}
                <span className="text-slate-400"> = </span>
                <span className="font-black text-slate-900">{fmt(result.output[0])}</span>
              </div>
              <div>
                <span className="text-rose-500 font-bold">{fmt(c)}</span>×{fmt(vx)} + <span className="text-rose-500 font-bold">{fmt(d)}</span>×{fmt(vy)}
                <span className="text-slate-400"> = </span>
                <span className="font-black text-slate-900">{fmt(result.output[1])}</span>
              </div>
              <div className="pt-1 border-t border-slate-200 text-slate-500">
                [{fmt(vx)}, {fmt(vy)}] → [{fmt(result.output[0])}, {fmt(result.output[1])}]
              </div>
            </div>
          </motion.div>
        )}

        {result && (
          <motion.div key={`verdict-${result.input[0]}-${result.isEigen}`}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`rounded-2xl p-3 border ${result.isEigen ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <div className={`font-black text-sm mb-1.5 ${result.isEigen ? 'text-emerald-700' : 'text-rose-600'}`}>
              {result.isEigen ? '✓ Eigenvector!' : '✗ Not an eigenvector'}
            </div>
            <div className="text-[11px] font-mono text-slate-600 flex flex-col gap-1">
              {result.isEigen ? (
                <>
                  <div>Direction: unchanged ✓</div>
                  <div>Scaled by <span className="font-black text-emerald-700">{fmt(result.scale)}×</span></div>
                  <div className="text-emerald-700 font-bold mt-0.5">λ = {fmt(result.scale)}</div>
                </>
              ) : (
                <>
                  <div>Direction tilted <span className="font-black text-rose-600">{result.rotDeg.toFixed(1)}°</span></div>
                  <div>Length scaled {fmt(result.scale)}×</div>
                  <div className="text-rose-500 mt-0.5">Not an eigenvector — try a different v</div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
