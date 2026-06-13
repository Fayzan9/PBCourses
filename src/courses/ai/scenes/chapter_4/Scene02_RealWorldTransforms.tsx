import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

export const Scene4_2_RealWorldTransforms: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      label: 'Google Maps Zoom',
      icon: '🗺️',
      analogy: 'Zoom in — every coordinate gets multiplied by the same factor. A café 100m away now appears 200m away on screen.',
      M: [[2, 0], [0, 2]] as Mat2,
      tag: 'Scale',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
    },
    {
      label: 'Tilting Your Phone',
      icon: '📱',
      analogy: 'Rotate your phone 90° and the screen snaps to match. Every pixel rotates to a new position.',
      M: [[0, -1], [1, 0]] as Mat2,
      tag: 'Rotation',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
    },
    {
      label: 'Italic Text',
      icon: '✍️',
      analogy: "Making text italic doesn't change its size — it tilts every character sideways. That tilt is a shear.",
      M: [[1, 0.7], [0, 1]] as Mat2,
      tag: 'Shear',
      tagColor: 'bg-amber-50 border-amber-200 text-amber-700',
    },
  ];

  const ex = examples[active];
  const animated = useAnimatedMatrix(ex.M, 700);

  return (
    <SlideLayout
      title="Transformations Are Everywhere"
      text="You use transformations every day without realising it. Each one is just a rule: take every point in space, apply the rule, get a new point."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                active === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="mr-2">{e.icon}</span>
              <span className="font-bold text-sm">{e.label}</span>
              <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                active === i ? 'bg-white/20 border-white/20 text-white' : e.tagColor
              }`}>
                {e.tag}
              </span>
            </button>
          ))}
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed">
            {ex.analogy}
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
export default Scene4_2_RealWorldTransforms;
