import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';
import { type Mat2, svd2 } from '../../components/mathHelpers';

// Build a rank-k approximation: A_k = sum_{i=0}^{k-1} σᵢ * uᵢ * vᵢᵀ
function lowRankApprox(U: Mat2, S: [number, number], Vt: Mat2, k: number): Mat2 {
  if (k === 0) return [[0, 0], [0, 0]];
  const u1: [number, number] = [U[0][0], U[1][0]];
  const v1: [number, number] = [Vt[0][0], Vt[0][1]];
  const rank1: Mat2 = [
    [S[0] * u1[0] * v1[0], S[0] * u1[0] * v1[1]],
    [S[0] * u1[1] * v1[0], S[0] * u1[1] * v1[1]],
  ];
  if (k === 1) return rank1;
  const u2: [number, number] = [U[0][1], U[1][1]];
  const v2: [number, number] = [Vt[1][0], Vt[1][1]];
  const rank2: Mat2 = [
    [S[1] * u2[0] * v2[0], S[1] * u2[0] * v2[1]],
    [S[1] * u2[1] * v2[0], S[1] * u2[1] * v2[1]],
  ];
  return [
    [rank1[0][0] + rank2[0][0], rank1[0][1] + rank2[0][1]],
    [rank1[1][0] + rank2[1][0], rank1[1][1] + rank2[1][1]],
  ];
}


const MATRIX_PRESETS: { name: string; M: Mat2 }[] = [
  { name: 'Stretch+Shear', M: [[3, 1], [0.5, 2]] },
  { name: 'Asymmetric',    M: [[2, 1.5], [0.2, 0.8]] },
  { name: 'Rotation+Scale', M: [[1.8, -0.9], [0.9, 1.8]] },
  { name: 'Near-rank-1',   M: [[2, 1], [4, 2]] },
];

export const Scene6_12_LowRankApprox: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState(0);
  const [rank, setRank] = useState(2);

  const M = MATRIX_PRESETS[presetIdx].M;
  const { U, S, Vt } = svd2(M);
  const Ak = lowRankApprox(U, S, Vt, rank);

  const W = 480, H = 480, CX = W / 2, CY = H / 2, SC = 72;
  const N = 80;

  const circlePoints = Array.from({ length: N }, (_, i) => {
    const t = (i / N) * 2 * Math.PI;
    return [Math.cos(t), Math.sin(t)] as [number, number];
  });

  const toPath = (mat: Mat2) => {
    const pts = circlePoints.map(([x, y]) => {
      const ox = mat[0][0] * x + mat[0][1] * y;
      const oy = mat[1][0] * x + mat[1][1] * y;
      return [CX + ox * SC, CY - oy * SC];
    });
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
  };

  const origPath = toPath(M);
  const approxPath = toPath(Ak);

  const frobNorm = (A: Mat2) => Math.sqrt(A[0][0]**2 + A[0][1]**2 + A[1][0]**2 + A[1][1]**2);
  const diff: Mat2 = [
    [M[0][0] - Ak[0][0], M[0][1] - Ak[0][1]],
    [M[1][0] - Ak[1][0], M[1][1] - Ak[1][1]],
  ];
  const errorPct = ((frobNorm(diff) / frobNorm(M)) * 100).toFixed(1);

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          <rect width={W} height={H} fill="white" rx="16" />
          {[-3,-2,-1,0,1,2,3].map(i => (
            <g key={i}>
              <line x1={CX+i*SC} y1={18} x2={CX+i*SC} y2={H-18} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
              <line x1={18} y1={CY-i*SC} x2={W-18} y2={CY-i*SC} stroke={i===0?'#94a3b8':'#f1f5f9'} strokeWidth={i===0?1.5:0.8}/>
            </g>
          ))}

          {/* Original (ghost) */}
          <path d={origPath} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" />
          <text x={24} y={30} fill="#94a3b8" fontSize="11" fontWeight="bold">— Original</text>

          {/* Approximation */}
          <motion.path
            d={approxPath}
            fill="#0891B2"
            fillOpacity={0.15}
            stroke="#0891B2"
            strokeWidth="2.5"
            animate={{ d: approxPath }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
          <text x={24} y={46} fill="#0891B2" fontSize="11" fontWeight="bold">— Rank-{rank} approx</text>
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            Low-Rank Approximation
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Keep only the top <em>k</em> singular values. Watch how much you can throw away and still reconstruct the shape.
          </p>
        </div>

        {/* Rank selector */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Rank k</span>
            <span className="font-mono font-black text-2xl text-cyan-600">{rank}</span>
          </div>
          <div className="flex gap-2">
            {[0, 1, 2].map(k => (
              <button
                key={k}
                onClick={() => setRank(k)}
                className={`flex-1 py-3 rounded-xl font-black text-sm transition-all cursor-pointer border ${
                  rank === k ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
                }`}
              >
                {k === 0 ? 'Rank 0' : k === 1 ? 'Rank 1' : 'Full (2)'}
              </button>
            ))}
          </div>
        </div>

        {/* Singular values */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3">Singular Values</p>
          {S.map((s, i) => (
            <div key={i} className={`flex items-center gap-3 mb-2 transition-opacity ${i >= rank ? 'opacity-30' : ''}`}>
              <span className="font-mono font-bold w-6 text-slate-500">σ{i+1}</span>
              <div className="flex-1 h-4 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: i === 0 ? '#0891B2' : '#7C3AED' }}
                  animate={{ width: `${(s / S[0]) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="font-mono font-black text-slate-600 w-14 text-right">{s.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className={`rounded-2xl p-4 border-2 text-center transition-all ${
          parseFloat(errorPct) < 15
            ? 'bg-emerald-50 border-emerald-200'
            : parseFloat(errorPct) < 50
              ? 'bg-amber-50 border-amber-200'
              : 'bg-rose-50 border-rose-200'
        }`}>
          <p className="font-black text-2xl" style={{
            color: parseFloat(errorPct) < 15 ? '#059669' : parseFloat(errorPct) < 50 ? '#D97706' : '#E11D48'
          }}>
            {errorPct}% error
          </p>
          <p className="text-slate-500 text-sm font-medium mt-0.5">
            {rank === 2 ? 'Perfect reconstruction' : rank === 1 ? 'One direction carries most info' : 'Zero info — blank canvas'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {MATRIX_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setPresetIdx(i)}
              className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                presetIdx === i ? 'bg-cyan-50 border-cyan-300 text-cyan-700' : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
