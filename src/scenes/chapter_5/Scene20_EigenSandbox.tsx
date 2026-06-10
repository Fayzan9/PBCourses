import React from 'react';
import { type Mat2, eigenvalues, det, trace, fmt } from '../../components/mathHelpers';
import { SlideLayout } from '../../components/SlideLayout';
import { EigenGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { useSlideState } from '../../components/CourseStateContext';

export const Scene5_20_EigenSandbox: React.FC = () => {
  const [a, setA] = useSlideState('ch5_sandbox_a', 2.0);
  const [b, setB] = useSlideState('ch5_sandbox_b', 0.5);
  const [c, setC] = useSlideState('ch5_sandbox_c', 0.5);
  const [d, setD] = useSlideState('ch5_sandbox_d', 1.0);

  const M: Mat2 = [[a, b], [c, d]];
  const animated = useAnimatedMatrix(M, 80);
  const evals = eigenvalues(M);
  const detVal = det(M);
  const trVal = trace(M);

  const sliders = [
    { label: 'a', val: a, set: setA, color: '#E11D48' },
    { label: 'b', val: b, set: setB, color: '#D97706' },
    { label: 'c', val: c, set: setC, color: '#7C3AED' },
    { label: 'd', val: d, set: setD, color: '#0284C7' },
  ];

  const presets: { name: string; vals: [number,number,number,number] }[] = [
    { name: 'Symmetric', vals: [2, 1, 1, 2] },
    { name: 'Diagonal', vals: [3, 0, 0, 1] },
    { name: 'Shear', vals: [1, 2, 0, 1] },
    { name: 'Collapse', vals: [1, 1, 1, 1] },
    { name: 'Rotation', vals: [0, -1, 1, 0] },
    { name: 'Identity', vals: [1, 0, 0, 1] },
  ];

  return (
    <SlideLayout
      title="Eigen Sandbox"
      text="Build any matrix. Watch eigenvectors appear (or vanish). Try Collapse — both eigenvalues collapse. Try Rotation — no real eigenvectors at all."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-3 gap-1.5">
            {presets.map(p => (
              <button
                key={p.name}
                onClick={() => { setA(p.vals[0]); setB(p.vals[1]); setC(p.vals[2]); setD(p.vals[3]); }}
                className="px-2 py-2 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all cursor-pointer active:scale-95"
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Matrix M</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center mb-4">
              {([['a', a, '#E11D48'], ['b', b, '#D97706'], ['c', c, '#7C3AED'], ['d', d, '#0284C7']] as [string, number, string][]).map(([lbl, val, clr]) => (
                <div key={lbl} className="flex flex-col items-center rounded-xl py-2.5 border" style={{ borderColor: clr + '33', backgroundColor: clr + '0D' }}>
                  <span className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: clr + 'AA' }}>{lbl}</span>
                  <span className="text-2xl font-black leading-none" style={{ color: clr }}>{val.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {sliders.map(sl => {
                const pct = ((sl.val + 3) / 6) * 100;
                return (
                  <div key={sl.label} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black font-mono text-white" style={{ backgroundColor: sl.color }}>{sl.label}</span>
                      <span className="text-sm font-black font-mono" style={{ color: sl.color }}>{sl.val.toFixed(1)}</span>
                    </div>
                    <input
                      type="range" min="-3" max="3" step="0.1" value={sl.val}
                      onChange={e => sl.set(Number(e.target.value))}
                      className="w-full appearance-none cursor-pointer rounded-full h-2"
                      style={{ background: `linear-gradient(to right, ${sl.color} 0%, ${sl.color} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className={`rounded-2xl px-4 py-3 border transition-all ${evals ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
            <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-bold mb-1">Eigenvalues</div>
            {evals
              ? <div className="font-mono font-black text-sm">λ₁ = {fmt(evals[0])}, λ₂ = {fmt(evals[1])}</div>
              : <div className="font-mono font-black text-sm">Complex — no real eigenvectors</div>
            }
            <div className="text-[10px] font-mono mt-1.5 opacity-70">tr = {trVal.toFixed(2)} · det = {detVal.toFixed(2)}</div>
          </div>
        </div>
      }
    >
      <EigenGrid M={animated} showEigen={!!evals} />
    </SlideLayout>
  );
};
