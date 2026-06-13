import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2, mulMM, IDENTITY } from '../../components/mathHelpers';

export const Scene4_11_ComposingTransforms: React.FC = () => {
  const [phaseIdx, setPhaseIdx] = useState<0 | 1 | 2>(0);

  const scaleX: Mat2 = [[2, 0], [0, 1]];
  const rot45: Mat2  = [[0.707, -0.707], [0.707, 0.707]];
  const composed     = mulMM(rot45, scaleX);

  const phases: { label: string; M: Mat2; desc: string; activeStyle: string }[] = [
    { label: 'Start',            M: IDENTITY,  desc: 'Original coordinate space — nothing applied yet.',                                                activeStyle: 'bg-slate-50 border-slate-200' },
    { label: '① Scale X by 2',  M: scaleX,    desc: 'First: stretch the horizontal axis by 2. The grid widens.',                                       activeStyle: 'bg-violet-50 border-violet-300' },
    { label: '② Then Rotate 45°', M: composed, desc: 'Second: rotate the already-stretched space 45°. Notice the shape differs from rotating first.',  activeStyle: 'bg-emerald-50 border-emerald-300' },
  ];

  const animated = useAnimatedMatrix(phases[phaseIdx].M, 750);

  return (
    <SlideLayout
      title="Two in a Row"
      text="Applying one transformation after another is called composing. The order matters — scale then rotate gives a different result than rotate then scale."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {phases.map((p, i) => (
            <button
              key={i}
              onClick={() => setPhaseIdx(i as 0 | 1 | 2)}
              className={`px-4 py-3 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                phaseIdx === i ? p.activeStyle + ' shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
            >
              <span className="block font-black text-sm mb-0.5">{p.label}</span>
              <span className="text-slate-500 font-medium">{p.desc}</span>
            </button>
          ))}

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-amber-700 block mb-1">Why this matters for AI</span>
            A deep neural network stacks dozens of these transformations — each one reshaping space a little more, until the data becomes easy to classify.
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
export default Scene4_11_ComposingTransforms;
