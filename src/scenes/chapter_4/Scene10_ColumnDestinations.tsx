import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid } from '../../components/TransformGrid';
import { type Mat2, fmt } from '../../components/mathHelpers';

export const Scene4_10_ColumnDestinations: React.FC = () => {
  const [focused, setFocused] = useState<0 | 1 | null>(null);

  const theta = 35 * (Math.PI / 180);
  const M: Mat2 = [
    [Math.cos(theta) * 1.3, -Math.sin(theta)],
    [Math.sin(theta) * 1.3,  Math.cos(theta)],
  ];
  const col0: [number, number] = [M[0][0], M[1][0]];
  const col1: [number, number] = [M[0][1], M[1][1]];

  return (
    <SlideLayout
      title="Where Do the Arrows Land?"
      text="Column 1 tells you where the red arrow (pointing right) will land. Column 2 tells you where the blue arrow (pointing up) will land. Hover each card to see it."
      sidebarContent={
        <div className="flex flex-col gap-3">
          <div
            onMouseEnter={() => setFocused(0)}
            onMouseLeave={() => setFocused(null)}
            className="bg-rose-50 border border-rose-200 rounded-xl p-4 cursor-default animate-fade-in"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-black block mb-1">
              Column 1 → Red arrow lands at
            </span>
            <div className="font-mono text-lg font-black text-rose-700">
              [{fmt(col0[0])}, {fmt(col0[1])}]
            </div>
          </div>

          <div
            onMouseEnter={() => setFocused(1)}
            onMouseLeave={() => setFocused(null)}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4 cursor-default animate-fade-in"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-sky-500 font-black block mb-1">
              Column 2 → Blue arrow lands at
            </span>
            <div className="font-mono text-lg font-black text-sky-700">
              [{fmt(col1[0])}, {fmt(col1[1])}]
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 font-medium leading-relaxed">
            <span className="font-bold text-slate-700 block mb-1">Why does this matter?</span>
            Once you know where the two arrows land, you know where <em>everything</em> goes. Every other point is just a combination of these two directions.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid
          M={M}
          extraVec={
            focused === 0
              ? { vec: col0, color: '#E11D48', marker: 'red', label: `→ [${fmt(col0[0])}, ${fmt(col0[1])}]` }
              : focused === 1
              ? { vec: col1, color: '#0284C7', marker: 'blue', label: `→ [${fmt(col1[0])}, ${fmt(col1[1])}]` }
              : null
          }
        />
        {focused === null && (
          <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none animate-pulse">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold bg-white/90 px-4 py-1.5 rounded-full border border-slate-200">
              Hover the cards →
            </span>
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
export default Scene4_10_ColumnDestinations;
