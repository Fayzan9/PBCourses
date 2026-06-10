import React, { useState } from 'react';
import { type Mat2, eigenvalues, fmt } from '../../components/mathHelpers';
import { SlideLayout } from '../../components/SlideLayout';
import { EigenGrid, useAnimatedMatrix } from '../../components/TransformGrid';

export const Scene5_17_SymmetricMatrices: React.FC = () => {
  const [a, setA] = useState(2.0);
  const [b, setB] = useState(1.0);
  const d = 1.0;
  const M: Mat2 = [[a, b], [b, d]];
  const animated = useAnimatedMatrix(M, 500);
  const evals = eigenvalues(M);

  const pctA = ((a + 3) / 6) * 100;
  const pctB = ((b + 3) / 6) * 100;

  return (
    <SlideLayout
      title="Symmetric Matrices Always Work"
      text="Covariance matrices in ML are always symmetric (Mᵀ = M). This guarantees real, perpendicular eigenvectors — perfect for PCA. Drag to explore."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Symmetric Matrix</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center mb-4 text-lg font-black">
              <div className="rounded-xl py-2 bg-sky-50 border border-sky-200 text-sky-700">{a.toFixed(1)}</div>
              <div className="rounded-xl py-2 bg-violet-50 border border-violet-200 text-violet-700">{b.toFixed(1)}</div>
              <div className="rounded-xl py-2 bg-violet-50 border border-violet-200 text-violet-700">{b.toFixed(1)}</div>
              <div className="rounded-xl py-2 bg-sky-50 border border-sky-200 text-sky-700">{d.toFixed(1)}</div>
            </div>
            {[
              { label: 'a (diagonal)', val: a, set: setA, color: '#0284C7' },
              { label: 'b (off-diagonal)', val: b, set: setB, color: '#7C3AED' },
            ].map(row => {
              const pct = row.label.includes('a') ? pctA : pctB;
              return (
                <div key={row.label} className="flex flex-col gap-1 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{row.label}</span>
                    <span className="text-sm font-black font-mono" style={{ color: row.color }}>{row.val.toFixed(1)}</span>
                  </div>
                  <input
                    type="range" min="-3" max="3" step="0.1" value={row.val}
                    onChange={e => row.set(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer rounded-full h-2"
                    style={{ background: `linear-gradient(to right, ${row.color} 0%, ${row.color} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs font-bold text-emerald-700">
            {evals
              ? `λ₁ = ${fmt(evals[0])}, λ₂ = ${fmt(evals[1])}`
              : 'No real eigenvalues'
            }
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-600">
            Notice: eigenvalue directions (dashed) are always perpendicular for symmetric matrices!
          </div>
        </div>
      }
    >
      <EigenGrid M={animated} showEigen={!!evals} />
    </SlideLayout>
  );
};
