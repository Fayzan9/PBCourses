import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { type Mat2, svd2, fmt } from '../../components/mathHelpers';
import { useSlideState } from '../../components/CourseStateContext';

const PRESETS: { name: string; M: Mat2 }[] = [
  { name: 'Stretch X',     M: [[3, 0], [0, 1]] },
  { name: 'Stretch Both',  M: [[2.5, 0], [0, 1.2]] },
  { name: 'Shear',         M: [[1, 1.5], [0, 1]] },
  { name: 'Rotate+Scale',  M: [[2, -1], [1, 2]] },
  { name: 'Near Rank-1',   M: [[2, 1], [4, 2.1]] },
  { name: 'Identity',      M: [[1, 0], [0, 1]] },
];

export const Scene6_14_SVDSandbox: React.FC = () => {
  const [a, setA] = useSlideState('ch6_sandbox_a', 2.0);
  const [b, setB] = useSlideState('ch6_sandbox_b', 0.5);
  const [c, setC] = useSlideState('ch6_sandbox_c', 0.3);
  const [d, setD] = useSlideState('ch6_sandbox_d', 1.5);
  const [showSVD, setShowSVD] = useState(true);

  const M: Mat2 = [[a, b], [c, d]];
  const { U, S, Vt } = svd2(M);

  const W = 480, H = 480, CX = W / 2, CY = H / 2, SC = 72;
  const N = 80;

  const circlePoints = Array.from({ length: N }, (_, i) => {
    const t = (i / N) * 2 * Math.PI;
    return [Math.cos(t), Math.sin(t)] as [number, number];
  });

  const transformedPoints = circlePoints.map(([x, y]) => {
    const ox = M[0][0] * x + M[0][1] * y;
    const oy = M[1][0] * x + M[1][1] * y;
    return [CX + ox * SC, CY - oy * SC];
  });
  const ellipsePath = transformedPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';

  // Left singular vectors (columns of U)
  const u1: [number,number] = [U[0][0], U[1][0]];
  const u2: [number,number] = [U[0][1], U[1][1]];
  // Right singular vectors (rows of Vt)
  const v1: [number,number] = [Vt[0][0], Vt[0][1]];
  const v2: [number,number] = [Vt[1][0], Vt[1][1]];

  const arrowScale = 1.8;

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          <defs>
            {['svd-red','svd-blue','svd-green','svd-orange'].map(id => (
              <marker key={id} id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 Z" fill={
                  id==='svd-red'?'#E11D48':id==='svd-blue'?'#0891B2':id==='svd-green'?'#059669':'#D97706'
                } />
              </marker>
            ))}
          </defs>
          <rect width={W} height={H} fill="white" rx="16" />
          {[-3,-2,-1,0,1,2,3].map(i => (
            <g key={i}>
              <line x1={CX+i*SC} y1={18} x2={CX+i*SC} y2={H-18} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
              <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
            </g>
          ))}

          {/* Unit circle ghost */}
          <circle cx={CX} cy={CY} r={SC} fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="5 4" />

          {/* Ellipse (image of circle under M) */}
          <motion.path d={ellipsePath} fill="#0891B2" fillOpacity={0.12} stroke="#0891B2" strokeWidth="2" animate={{ d: ellipsePath }} transition={{ duration: 0.2 }} />

          {showSVD && (
            <g>
              {/* Right singular vectors (input space) - on unit circle */}
              <line x1={CX} y1={CY} x2={CX + v1[0]*SC*arrowScale} y2={CY - v1[1]*SC*arrowScale}
                stroke="#E11D48" strokeWidth="3" markerEnd="url(#svd-red)" />
              <line x1={CX} y1={CY} x2={CX + v2[0]*SC*arrowScale} y2={CY - v2[1]*SC*arrowScale}
                stroke="#D97706" strokeWidth="3" markerEnd="url(#svd-orange)" />

              {/* Left singular vectors (output space) - scaled by singular values */}
              <line x1={CX} y1={CY} x2={CX + u1[0]*S[0]*SC*0.5} y2={CY - u1[1]*S[0]*SC*0.5}
                stroke="#0891B2" strokeWidth="3" markerEnd="url(#svd-blue)" />
              <line x1={CX} y1={CY} x2={CX + u2[0]*S[1]*SC*0.5} y2={CY - u2[1]*S[1]*SC*0.5}
                stroke="#059669" strokeWidth="3" markerEnd="url(#svd-green)" />

              {/* Labels */}
              <text x={CX + v1[0]*SC*arrowScale + 6} y={CY - v1[1]*SC*arrowScale - 6} fill="#E11D48" fontSize="10" fontWeight="bold">v₁ (in)</text>
              <text x={CX + v2[0]*SC*arrowScale + 6} y={CY - v2[1]*SC*arrowScale - 6} fill="#D97706" fontSize="10" fontWeight="bold">v₂ (in)</text>
              <text x={CX + u1[0]*S[0]*SC*0.5 + 6} y={CY - u1[1]*S[0]*SC*0.5 - 6} fill="#0891B2" fontSize="10" fontWeight="bold">u₁ (out)</text>
              <text x={CX + u2[0]*S[1]*SC*0.5 + 6} y={CY - u2[1]*S[1]*SC*0.5 - 6} fill="#059669" fontSize="10" fontWeight="bold">u₂ (out)</text>
            </g>
          )}
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">SVD Sandbox</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Build any matrix. SVD reveals its hidden structure instantly.
          </p>
        </div>

        {/* Presets */}
        <div className="grid grid-cols-3 gap-1.5">
          {PRESETS.map(p => (
            <button
              key={p.name}
              onClick={() => { setA(p.M[0][0]); setB(p.M[0][1]); setC(p.M[1][0]); setD(p.M[1][1]); }}
              className="px-2 py-2 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-cyan-400 hover:text-cyan-700 hover:bg-cyan-50 transition-all cursor-pointer active:scale-95"
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Matrix sliders */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Matrix A</div>
          <div className="grid grid-cols-2 gap-2 font-mono text-center mb-4">
            {([['a', a, '#E11D48'], ['b', b, '#D97706'], ['c', c, '#7C3AED'], ['d', d, '#0284C7']] as [string,number,string][]).map(([lbl, val, clr]) => (
              <div key={lbl} className="flex flex-col items-center rounded-xl py-2 border" style={{ borderColor: clr+'33', backgroundColor: clr+'0D' }}>
                <span className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: clr+'AA' }}>{lbl}</span>
                <span className="text-2xl font-black leading-none" style={{ color: clr }}>{val.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {([['a', a, setA, '#E11D48'], ['b', b, setB, '#D97706'], ['c', c, setC, '#7C3AED'], ['d', d, setD, '#0284C7']] as [string,number,(v:number)=>void,string][]).map(([lbl, val, setter, clr]) => {
              const pct = ((val + 3) / 6) * 100;
              return (
                <input key={lbl} type="range" min="-3" max="3" step="0.1" value={val}
                  onChange={e => setter(Number(e.target.value))}
                  className="w-full appearance-none cursor-pointer rounded-full h-2"
                  style={{ background: `linear-gradient(to right, ${clr} 0%, ${clr} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
                />
              );
            })}
          </div>
        </div>

        {/* SVD results */}
        <div className="bg-slate-800 text-white rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">SVD Result</span>
            <button onClick={() => setShowSVD(v => !v)} className="text-xs text-cyan-400 font-bold cursor-pointer hover:text-cyan-300">
              {showSVD ? 'Hide vectors' : 'Show vectors'}
            </button>
          </div>
          <div className="font-mono text-sm space-y-1">
            <div><span className="text-amber-400 font-black">σ₁ = {fmt(S[0])}</span><span className="text-slate-400 ml-2">strongest stretch</span></div>
            <div><span className="text-amber-400 font-black">σ₂ = {fmt(S[1])}</span><span className="text-slate-400 ml-2">weaker stretch</span></div>
            <div className="text-slate-400 text-xs mt-2">
              Ratio σ₁/σ₂ = <span className="text-white font-bold">{S[1] > 0.001 ? fmt(S[0]/S[1]) : '∞'}</span>
              <span className="ml-2">{S[0]/S[1] > 5 ? '← compressible!' : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
