import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2, mulMM, fmt } from '../../components/mathHelpers';

const M1: Mat2 = [[1.4, 0], [0, 1.4]];
const rad = 40 * (Math.PI / 180);
const M2: Mat2 = [[Math.cos(rad), -Math.sin(rad)], [Math.sin(rad), Math.cos(rad)]];
const MC: Mat2 = mulMM(M2, M1); // M2 · M1 combined
const ID: Mat2 = [[1, 0], [0, 1]];

function MiniMat({ M, label, accent }: { M: Mat2; label: string; accent: string }) {
  const vals = [M[0][0], M[0][1], M[1][0], M[1][1]];
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accent }}>{label}</span>
      <div className="flex items-center gap-0.5">
        <span className="text-slate-300 text-lg font-thin">⌊</span>
        <div className="grid grid-cols-2 gap-0.5">
          {vals.map((v, i) => (
            <div key={i} className="w-10 h-7 rounded flex items-center justify-center font-mono text-[10px] font-bold"
              style={{ backgroundColor: `${accent}18`, color: accent }}>
              {fmt(v)}
            </div>
          ))}
        </div>
        <span className="text-slate-300 text-lg font-thin">⌋</span>
      </div>
    </div>
  );
}

// Small TransformGrid wrapper
function MiniGrid({ M, label, accent, active }: { M: Mat2; label: string; accent: string; active: boolean }) {
  const animated = useAnimatedMatrix(M);
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all"
        style={{ borderColor: active ? accent : '#e2e8f0' }}>
        <TransformGrid M={animated} width={200} height={200} scale={28} range={3} />
      </div>
      <div className="text-center">
        <span className="text-[10px] font-black uppercase tracking-widest block" style={{ color: active ? accent : '#94a3b8' }}>
          {label}
        </span>
      </div>
    </div>
  );
}

type Stage = 0 | 1 | 2;

export const Scene4_18_StackLinearQuestion: React.FC = () => {
  const [stage, setStage] = useState<Stage>(0);

  const grids: { M: Mat2; label: string; accent: string }[] = [
    { M: ID, label: 'Start',        accent: '#64748b' },
    { M: M1, label: 'After M₁',     accent: '#0284C7' },
    { M: MC, label: 'After M₂',     accent: '#7C3AED' },
  ];

  return (
    <SlideLayout
      title="What If You Stack Layers?"
      text="Apply M₁ (scale), then M₂ (rotate). Is the result more powerful than one transform?"
      sidebarContent={
        <div className="flex flex-col gap-4">

          {/* Stage selector */}
          <div className="flex flex-col gap-1.5">
            {[
              { id: 0 as Stage, label: 'Original grid',        sub: 'Before any transform' },
              { id: 1 as Stage, label: 'Step 1 — Apply M₁',   sub: 'Scale by 1.4' },
              { id: 2 as Stage, label: 'Step 2 — Apply M₂',   sub: 'Rotate 40° on top' },
            ].map(s => (
              <button key={s.id} onClick={() => setStage(s.id)}
                className="text-left px-3 py-2.5 rounded-xl border text-xs transition-all cursor-pointer"
                style={stage === s.id
                  ? { backgroundColor: '#0f172a', borderColor: '#0f172a', color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#64748b' }}>
                <span className="font-black block">{s.label}</span>
                <span className="opacity-60 text-[10px]">{s.sub}</span>
              </button>
            ))}
          </div>

          {/* Matrix arithmetic */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-3">
            <MiniMat M={M2} label="M₂  (Rotate 40°)" accent="#7C3AED" />
            <div className="text-center text-slate-400 font-bold text-xs">× (applied after)</div>
            <MiniMat M={M1} label="M₁  (Scale ×1.4)" accent="#0284C7" />
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <span className="text-slate-400 font-bold text-xs">=</span>
              <MiniMat M={MC} label="M₂·M₁  ONE matrix" accent="#10B981" />
            </div>
          </div>

          {/* Insight */}
          <motion.div
            animate={{ opacity: stage === 2 ? 1 : 0.35 }}
            className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">The problem</p>
            <p className="text-xs font-bold text-slate-700 leading-relaxed">
              Two transforms = still <span className="text-amber-700">one matrix</span>.<br />
              100 layers = still one matrix.<br />
              <span className="text-slate-500 font-medium mt-1 block">→ Nonlinearity breaks this collapse.</span>
            </p>
          </motion.div>
        </div>
      }
    >
      {/* Three-stage pipeline in the visualization pane */}
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">

        {/* Three mini grids with arrows */}
        <div className="flex items-center gap-2 w-full">
          {grids.map((g, i) => (
            <React.Fragment key={i}>
              <MiniGrid M={g.M} label={g.label} accent={g.accent} active={stage === i} />
              {i < grids.length - 1 && (
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <svg width="32" height="20" viewBox="0 0 32 20">
                    <line x1="2" y1="10" x2="26" y2="10" stroke={stage > i ? '#64748b' : '#e2e8f0'} strokeWidth="2" />
                    <polyline points="20,5 26,10 20,15" fill="none" stroke={stage > i ? '#64748b' : '#e2e8f0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[9px] font-bold text-slate-400">M{i+1}</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Callout: same as one matrix */}
        <motion.div
          animate={{ opacity: stage === 2 ? 1 : 0, y: stage === 2 ? 0 : 6 }}
          className="flex items-center gap-3 bg-white border border-emerald-200 rounded-2xl px-5 py-3 shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <p className="text-xs font-bold text-slate-700">
            M₂ · M₁ = <span className="text-emerald-600 font-black">one combined matrix</span>
            {' '}— identical to the right grid above
          </p>
          <div className="shrink-0">
            <MiniGrid M={MC} label="M₂·M₁" accent="#10B981" active={stage === 2} />
          </div>
        </motion.div>
      </div>
    </SlideLayout>
  );
};
export default Scene4_18_StackLinearQuestion;
