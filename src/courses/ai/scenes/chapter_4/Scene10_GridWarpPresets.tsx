import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2 } from '../../components/mathHelpers';

const WARP_PRESETS: { label: string; desc: string; M: Mat2 }[] = [
  { label: 'Identity',   desc: 'Space is unchanged. Every point stays exactly where it is.',                   M: [[1, 0], [0, 1]] },
  { label: 'Scale ×2',  desc: 'Every point doubles its distance from the origin — like zooming in.',           M: [[2, 0], [0, 2]] },
  { label: 'Rotate 45°', desc: 'The entire grid rotates 45° counterclockwise.',                                M: [[0.707, -0.707], [0.707, 0.707]] },
  { label: 'Shear',      desc: 'The bottom stays fixed. The top gets pushed sideways — like italic text.',      M: [[1, 0.8], [0, 1]] },
  { label: 'Reflect Y',  desc: 'The grid flips across the vertical axis — like a mirror.',                     M: [[-1, 0], [0, 1]] },
  { label: 'Squash',     desc: 'Space is squashed vertically and stretched horizontally.',                      M: [[1.5, 0], [0, 0.5]] },
];

export const Scene4_10_GridWarpPresets: React.FC = () => {
  const [idx, setIdx] = useState(0);
  const animated = useAnimatedMatrix(WARP_PRESETS[idx].M);

  return (
    <SlideLayout
      title="Watch Space Warp"
      text="Each preset applies a different matrix. Click through them and watch the grid animate — the same coordinate space, reshaped by 4 numbers."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {WARP_PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                idx === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {p.label}
            </button>
          ))}
          <p className="text-xs text-slate-500 font-medium px-1 mt-1 leading-snug">
            {WARP_PRESETS[idx].desc}
          </p>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <TransformGrid M={animated} />
      </div>
    </SlideLayout>
  );
};
export default Scene4_10_GridWarpPresets;
