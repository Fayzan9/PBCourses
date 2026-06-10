import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { VectorCanvas } from '../../components/VectorCanvas';
import { dot2, mag2 } from '../../components/mathHelpers';

type Vec2 = [number, number];

export const Scene3_13_SignalStrength: React.FC = () => {
  const [prefAction, setPrefAction] = useState(60);
  const [prefComedy, setPrefComedy] = useState(40);

  const userVec: Vec2 = [prefAction / 20, prefComedy / 20];

  const movies = [
    { id: 'm1', name: 'Indie Comedy',    vec: [0.5, 4.0] as Vec2, color: '#7C3AED', marker: 'violet' },
    { id: 'm2', name: 'Blockbuster',     vec: [4.5, 0.8] as Vec2, color: '#E11D48', marker: 'red' },
    { id: 'm3', name: 'Balanced Drama',  vec: [2.2, 2.2] as Vec2, color: '#0284C7', marker: 'blue' },
  ];

  const getMetrics = (mVec: Vec2) => {
    const d = dot2(userVec, mVec);
    const cos = d / (mag2(userVec) * mag2(mVec) || 1);
    return { dot: d, cos };
  };

  const sorted = [...movies].sort((a, b) => getMetrics(b.vec).dot - getMetrics(a.vec).dot);

  return (
    <SlideLayout
      title="Signal Strength Sandbox"
      text="Adjust your preference vector and watch which movies rank higher. Notice how dot product rewards both direction AND magnitude."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1 text-slate-600">
                <span>Action preference</span>
                <span className="text-loss">{prefAction}</span>
              </div>
              <input type="range" min="0" max="100" value={prefAction}
                onChange={e => setPrefAction(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono font-bold mb-1 text-slate-600">
                <span>Comedy preference</span>
                <span className="text-vector">{prefComedy}</span>
              </div>
              <input type="range" min="0" max="100" value={prefComedy}
                onChange={e => setPrefComedy(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Rankings by dot product</span>
            {sorted.map((m, rank) => {
              const metrics = getMetrics(m.vec);
              return (
                <div key={m.id}
                  className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono font-bold"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white font-black`}
                      style={{ backgroundColor: m.color }}>
                      {rank + 1}
                    </span>
                    <span className="text-slate-600">{m.name}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-emerald-600">dot: {metrics.dot.toFixed(1)}</span>
                    <span className="text-violet-500 text-[10px]">cos: {metrics.cos.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 font-medium px-1 leading-relaxed">
            Change preferences and notice how rankings shift — especially for the Blockbuster's large magnitude.
          </p>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <VectorCanvas
          vectors={[
            { id: 'user', vec: userVec, color: '#059669', marker: 'green', label: 'You', width: 3 },
            ...movies.map(m => ({ id: m.id, vec: m.vec, color: m.color, marker: m.marker, label: m.name })),
          ]}
        />
      </div>
    </SlideLayout>
  );
};
export default Scene3_13_SignalStrength;
