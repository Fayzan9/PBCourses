import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas } from '../../components/VectorCanvas';
import { fromAngle } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_3_RealWorldAnalogies: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      icon: '🚣',
      label: 'Rowing with the Current',
      analogy: 'Row directly WITH the current and you get maximum boost. Row perpendicular and the current does nothing for you. Row against it and you slow down.',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
      tag: 'Parallel = max',
      vecA: fromAngle(20, 3.5) as Vec2,
      vecB: fromAngle(20, 3.5) as Vec2,
    },
    {
      icon: '☀️',
      label: 'Solar Panel Angle',
      analogy: "A solar panel facing directly at the sun captures maximum energy. Tilt it sideways and it captures less. The dot product measures this efficiency exactly.",
      tagColor: 'bg-amber-50 border-amber-200 text-amber-700',
      tag: 'Angle = efficiency',
      vecA: fromAngle(90, 3.5) as Vec2,
      vecB: fromAngle(60, 3) as Vec2,
    },
    {
      icon: '🎬',
      label: 'Movie Recommendations',
      analogy: 'Your taste is a vector [action: 8, comedy: 2]. A movie is [action: 9, comedy: 1]. Their dot product is 8×9 + 2×1 = 74 — a strong match!',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
      tag: 'Taste × Movie',
      vecA: fromAngle(15, 4) as Vec2,
      vecB: fromAngle(10, 3.8) as Vec2,
    },
  ];

  const ex = examples[active];

  return (
    <SlideLayout
      title="You Already Use This"
      text="The dot product shows up everywhere in the real world. It measures how much two things point in the same direction."
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
        <VectorCanvas
          vectors={[
            { id: 'A', vec: ex.vecA, color: '#E11D48', marker: 'red',  label: 'A' },
            { id: 'B', vec: ex.vecB, color: '#0284C7', marker: 'blue', label: 'B' },
          ]}
        />
      </div>
    </SlideLayout>
  );
};
export default Scene3_3_RealWorldAnalogies;
