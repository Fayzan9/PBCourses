import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

export const Scene4_21_MatrixSandbox: React.FC = () => {
  const [a, setA] = useState(1.0);
  const [b, setB] = useState(0.0);
  const [c, setC] = useState(0.0);
  const [d, setD] = useState(1.0);

  const target: Mat2 = [[a, b], [c, d]];
  const animated = useAnimatedMatrix(target, 80);
  const det = a * d - b * c;

  const presets: { name: string; vals: [number, number, number, number] }[] = [
    { name: 'Identity',  vals: [1,    0,    0,    1   ] },
    { name: 'Rot 90°',  vals: [0,   -1,    1,    0   ] },
    { name: 'Scale ×2', vals: [2,    0,    0,    2   ] },
    { name: 'Shear',    vals: [1,    1,    0,    1   ] },
    { name: 'Reflect',  vals: [-1,   0,    0,    1   ] },
    { name: 'Collapse', vals: [1,    1,    1,    1   ] },
  ];

  const SliderEntry: React.FC<{ label: string; sublabel: string; value: number; onChange: (v: number) => void; color: string }> = ({ label, sublabel, value, onChange, color }) => {
    const pct = ((value + 2) / 4) * 100;
    return (
      <div className="flex flex-col gap-1.5 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-black font-mono text-white" style={{ backgroundColor: color }}>{label}</span>
            <span className="text-[11px] font-semibold text-slate-500">{sublabel}</span>
          </div>
          <span className="text-sm font-black font-mono" style={{ color }}>{value.toFixed(1)}</span>
        </div>
        <div className="relative h-7 flex items-center">
          <input
            type="range" min="-2" max="2" step="0.1" value={value}
            onChange={e => onChange(Number(e.target.value))}
            className="w-full appearance-none cursor-pointer rounded-full h-2"
            style={{
              background: `linear-gradient(to right, ${color} 0%, ${color} ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
              accentColor: color,
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <SlideLayout
      title="Your Matrix, Your Space"
      text="Drag the sliders or pick a preset. Watch space warp live. Try the Collapse preset and see what happens to the determinant — and to the grid."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">Presets</div>
            <div className="grid grid-cols-3 gap-1.5">
              {presets.map(p => (
                <button
                  key={p.name}
                  onClick={() => { setA(p.vals[0]); setB(p.vals[1]); setC(p.vals[2]); setD(p.vals[3]); }}
                  className="px-2 py-2 rounded-xl bg-white border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-violet-400 hover:text-violet-700 hover:bg-violet-50 hover:shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">Matrix M</div>
            <div className="grid grid-cols-2 gap-2 font-mono text-center mb-4">
              {([['a', a, '#E11D48'], ['b', b, '#D97706'], ['c', c, '#7C3AED'], ['d', d, '#0284C7']] as [string, number, string][]).map(([lbl, val, clr]) => (
                <div key={lbl} className="flex flex-col items-center justify-center rounded-xl py-2.5 border" style={{ borderColor: clr + '33', backgroundColor: clr + '0D' }}>
                  <span className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: clr + 'AA' }}>{lbl}</span>
                  <span className="text-2xl font-black leading-none" style={{ color: clr }}>{val.toFixed(1)}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <SliderEntry label="a" sublabel="top-left"     value={a} onChange={setA} color="#E11D48" />
              <SliderEntry label="b" sublabel="top-right"    value={b} onChange={setB} color="#D97706" />
              <SliderEntry label="c" sublabel="bottom-left"  value={c} onChange={setC} color="#7C3AED" />
              <SliderEntry label="d" sublabel="bottom-right" value={d} onChange={setD} color="#0284C7" />
            </div>
          </div>

          <div className={`rounded-2xl px-4 py-3 border flex items-center justify-between transition-all ${
            Math.abs(det) < 0.05
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : det < 0
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider opacity-60 font-bold mb-0.5">Determinant</div>
              <div className="text-xl font-black font-mono">det(M) = {det.toFixed(2)}</div>
              {Math.abs(det) < 0.05 && (
                <div className="text-[10px] mt-1 font-semibold text-rose-500">Space collapsed — info lost forever.</div>
              )}
              {det < -0.05 && (
                <div className="text-[10px] mt-1 font-semibold text-amber-500">Negative: space is flipped!</div>
              )}
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-black ${
              Math.abs(det) < 0.05 ? 'bg-rose-200 text-rose-700' : det < 0 ? 'bg-amber-200 text-amber-700' : 'bg-slate-200 text-slate-600'
            }`}>
              {Math.abs(det) < 0.05 ? '0' : det < 0 ? '↔' : '✓'}
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};
export default Scene4_21_MatrixSandbox;
