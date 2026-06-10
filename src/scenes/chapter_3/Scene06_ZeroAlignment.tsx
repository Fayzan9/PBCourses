import React from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas, DotMeter } from '../../components/VectorCanvas';

type Vec2 = [number, number];

export const Scene3_6_ZeroAlignment: React.FC = () => {
  const vecA: Vec2 = [4, 0];
  const vecB: Vec2 = [0, 4];

  return (
    <SlideLayout
      title="Zero Alignment"
      text="When vectors are perpendicular — 90° apart — they share nothing. The dot product is exactly zero, no matter how long the arrows are."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Calculation</div>
            <div className="flex flex-col gap-1 text-slate-700">
              <span>A = [4, 0]</span>
              <span>B = [0, 4]</span>
              <span className="border-t border-slate-200 pt-2 mt-1">4×0 + 0×4</span>
              <span className="text-2xl font-black text-slate-800">= 0</span>
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-sky-700 block mb-1">Real-world meaning</span>
            A horizontal force and a vertical force have zero dot product — they operate in completely independent directions. Neither affects the other.
          </div>

          <DotMeter value={0} max={18} />
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'A', vec: vecA, color: '#E11D48', marker: 'red',  label: 'A [4, 0]' },
            { id: 'B', vec: vecB, color: '#0284C7', marker: 'blue', label: 'B [0, 4]' },
          ]}
        />
      </div>
    </SlideLayout>
  );
};
