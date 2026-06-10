import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2, mulMM, fmt } from '../../components/mathHelpers';

// M1 = scale 1.4,  M2 = rotate 40°
const M1: Mat2 = [[1.4, 0], [0, 1.4]];
const rad = 40 * (Math.PI / 180);
const M2: Mat2 = [[Math.cos(rad), -Math.sin(rad)], [Math.sin(rad), Math.cos(rad)]];
const M_COMBINED: Mat2 = mulMM(M2, M1); // M2 · M1

type Mode = 'step1' | 'step2' | 'combined';

const MODES: { id: Mode; label: string; sub: string }[] = [
  { id: 'step1',    label: 'Step 1 — Scale',   sub: 'Apply M₁ (scale ×1.4)' },
  { id: 'step2',    label: 'Step 2 — Rotate',  sub: 'Apply M₂ (rotate 40°)' },
  { id: 'combined', label: 'Combined',          sub: 'M₂ · M₁ in one shot' },
];

function MatDisplay({ M, label, accent }: { M: Mat2; label: string; accent: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{label}</span>
      <div className="flex items-center gap-0.5">
        <span className="text-slate-300 text-2xl font-thin">⌊</span>
        <div className="grid grid-cols-2 gap-1">
          {[M[0][0], M[0][1], M[1][0], M[1][1]].map((v, i) => (
            <div key={i} className="w-12 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold"
              style={{ backgroundColor: `${accent}18`, color: accent }}>
              {fmt(v)}
            </div>
          ))}
        </div>
        <span className="text-slate-300 text-2xl font-thin">⌋</span>
      </div>
    </div>
  );
}

export const Scene4_18_StackLinearQuestion: React.FC = () => {
  const [mode, setMode] = useState<Mode>('step1');

  const gridMatrix =
    mode === 'step1'    ? M1 :
    mode === 'step2'    ? M_COMBINED :
    M_COMBINED;

  const animated = useAnimatedMatrix(gridMatrix);

  return (
    <SlideLayout
      title="What If You Stack Layers?"
      text="Two linear transforms → is that twice as powerful? Try it and see what happens."
      sidebarContent={
        <div className="flex flex-col gap-4">

          {/* Mode selector */}
          <div className="flex flex-col gap-2">
            {MODES.map(m => (
              <button key={m.id} onClick={() => setMode(m.id)}
                className="text-left px-3 py-2.5 rounded-xl border text-xs transition-all cursor-pointer"
                style={
                  mode === m.id
                    ? { backgroundColor: '#0f172a', borderColor: '#0f172a', color: '#fff' }
                    : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }
                }>
                <span className="font-black block">{m.label}</span>
                <span className="opacity-60 text-[10px]">{m.sub}</span>
              </button>
            ))}
          </div>

          {/* Matrix breakdown */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-4">
            <MatDisplay M={M1} label="M₁  (Scale)" accent="#0284C7" />
            <div className="text-center text-slate-400 font-black text-sm">×</div>
            <MatDisplay M={M2} label="M₂  (Rotate 40°)" accent="#7C3AED" />
            <div className="border-t border-slate-200 pt-3">
              <MatDisplay M={M_COMBINED} label="M₂ · M₁  (combined)" accent="#10B981" />
            </div>
          </div>

          {/* Key insight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: mode === 'combined' ? 1 : 0.3 }}
            className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3"
          >
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">Key insight</p>
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              M₁ then M₂ = <span className="text-amber-700">exactly one matrix</span> M₂·M₁.<br />
              Stack 100 layers → still just 1 matrix.<br />
              <span className="text-slate-500 font-medium">That's why neural nets need nonlinearity.</span>
            </p>
          </motion.div>
        </div>
      }
    >
      <div className="w-full h-full flex flex-col items-center justify-center p-4 gap-3 relative">
        <TransformGrid M={animated} />

        {/* In-graph label */}
        <div className="absolute top-5 left-0 right-0 flex justify-center pointer-events-none">
          <div className="text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full border bg-white/90 shadow-sm"
            style={{
              color:       mode === 'combined' ? '#10B981' : mode === 'step2' ? '#7C3AED' : '#0284C7',
              borderColor: mode === 'combined' ? '#6ee7b7' : mode === 'step2' ? '#ddd6fe' : '#bae6fd',
            }}>
            {mode === 'step1' ? 'After M₁ — scaled grid' :
             mode === 'step2' ? 'After M₂ — rotated + scaled' :
             'Same result — just one matrix M₂·M₁'}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_18_StackLinearQuestion;
