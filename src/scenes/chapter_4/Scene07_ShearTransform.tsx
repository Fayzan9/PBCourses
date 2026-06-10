import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

export const Scene4_7_ShearTransform: React.FC = () => {
  const [shear, setShear] = useState(0.0);
  const M: Mat2 = [[1, shear], [0, 1]];
  const animated = useAnimatedMatrix(M, 80);

  return (
    <SlideLayout
      title="The Italic Effect"
      text="A shear pushes points sideways based on how high up they are. Tall objects tilt more than short ones — exactly like making text italic."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-2 text-slate-600">
              <span>Shift amount</span>
              <span className="text-similarity text-base">{shear.toFixed(1)}</span>
            </div>
            <input
              type="range" min="-1.5" max="1.5" step="0.05" value={shear}
              onChange={e => setShear(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-2">What happens to a point</div>
            <div className="flex flex-col gap-1 text-slate-700 font-bold">
              <span>(x, y)</span>
              <span className="text-slate-400 text-xs">↓ x gets nudged by y × {shear.toFixed(1)}</span>
              <span className="text-similarity">(x + {shear.toFixed(1)}y,  y)</span>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-amber-700">Notice:</span> The bottom row stays flat. Only the top gets pushed. That's why it looks like italics.
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
export default Scene4_7_ShearTransform;
