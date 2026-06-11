import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2, mulMM } from '../../components/mathHelpers';

export const Scene4_20_DeepNetworks: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState(0);

  const layers: { label: string; M: Mat2; color: string; analogy: string }[] = [
    { label: 'Layer 1', M: [[1.4, 0.3], [-0.2, 1.2]], color: '#E11D48', analogy: 'Stretches and slightly rotates — the network begins tilting the data.' },
    { label: 'Layer 2', M: [[0.707, -0.707], [0.707, 0.707]], color: '#0284C7', analogy: 'Rotates 45° — separating features that were tangled together.' },
    { label: 'Layer 3', M: [[1.8, 0], [0, 0.5]], color: '#7C3AED', analogy: 'Amplifies one direction, compresses the other — sharpening the signal.' },
  ];

  const composedMs = layers.reduce<Mat2[]>((acc, layer, i) => {
    if (i === 0) return [layer.M];
    return [...acc, mulMM(layer.M, acc[i - 1])];
  }, []);

  const animated = useAnimatedMatrix(composedMs[activeLayer], 800);

  return (
    <SlideLayout
      title="Depth = Power"
      text="A deep network is a pipeline of matrix transformations. Each layer reshapes space progressively — making messy, tangled data easier to understand. Click each layer."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {layers.map((l, i) => (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className={`px-4 py-3 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                activeLayer === i ? 'shadow-sm' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
              }`}
              style={activeLayer === i ? { backgroundColor: `${l.color}12`, borderColor: `${l.color}50`, color: l.color } : {}}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: l.color }} />
                <span className="font-black">{l.label}</span>
                {i <= activeLayer && <span className="ml-auto text-[9px] opacity-50 uppercase tracking-wider">applied</span>}
              </div>
              <span className="text-slate-500 font-medium">{l.analogy}</span>
            </button>
          ))}

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 font-mono text-xs text-slate-600">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1 font-bold">Full network</span>
            <span className="font-bold">y = σ(W₃ σ(W₂ σ(W₁x)))</span>
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
export default Scene4_20_DeepNetworks;
