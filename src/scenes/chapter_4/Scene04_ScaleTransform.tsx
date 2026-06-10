import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

export const Scene4_4_ScaleTransform: React.FC = () => {
  const [scale, setScale] = useState(1.0);
  const M: Mat2 = [[scale, 0], [0, scale]];
  const animated = useAnimatedMatrix(M, 80);

  return (
    <SlideLayout
      title="Stretch & Shrink"
      text="The simplest transformation: multiply every point's coordinates by the same number. Drag the slider and watch every grid line move."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Scale factor</span>
              <span className="text-transformations text-base">{scale.toFixed(1)}×</span>
            </div>
            <input
              type="range" min="0.3" max="2.5" step="0.1" value={scale}
              onChange={e => setScale(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
              <span>0.3× (shrink)</span><span>1×</span><span>2.5× (grow)</span>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">What happens to a point</div>
            <div className="flex flex-col gap-1 text-slate-700 font-bold">
              <span>(x, y)</span>
              <span className="text-slate-400 text-xs">↓ multiply both by {scale.toFixed(1)}</span>
              <span className="text-transformations">({scale.toFixed(1)}x, {scale.toFixed(1)}y)</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            {scale < 0.99
              ? '📉 Shrinking — points get closer to the center.'
              : scale > 1.01
              ? '📈 Growing — points get pushed away from the center.'
              : '⚖️ Identity — nothing changes at all.'}
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
export default Scene4_4_ScaleTransform;
