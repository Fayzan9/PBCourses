import React, { useState, useCallback } from 'react';
import { Plot3D } from '../../components/Plot3D';
import type { Point3D } from '../../components/Plot3D';

const containerClass = "flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden";
const leftSideClass = "flex-[65] min-w-0 bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden";
const rightSideClass = "flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto";

const DATASETS: Array<{
  label: string;
  icon: string;
  description: string;
  candidates: Point3D[];
  defaultTarget: { x: number; y: number; z: number };
  xLabel: string;
  yLabel: string;
  zLabel: string;
}> = [
  {
    label: 'People in 3D',
    icon: '👤',
    description: 'Height, Age, and Weight as three dimensions. Drag "You" to find your nearest neighbour.',
    xLabel: 'Height', yLabel: 'Age', zLabel: 'Weight',
    defaultTarget: { x: 50, y: 50, z: 50 },
    candidates: [
      { id: 'alice',   label: 'Alice',   x: 20, y: 72, z: 22, color: '#0284C7' },
      { id: 'bob',     label: 'Bob',     x: 82, y: 28, z: 80, color: '#E11D48' },
      { id: 'charlie', label: 'Charlie', x: 58, y: 58, z: 42, color: '#7C3AED' },
      { id: 'dana',    label: 'Dana',    x: 72, y: 18, z: 65, color: '#D97706' },
      { id: 'eve',     label: 'Eve',     x: 30, y: 85, z: 28, color: '#10B981' },
      { id: 'frank',   label: 'Frank',   x: 88, y: 38, z: 90, color: '#0891B2' },
    ],
  },
  {
    label: 'Songs in 3D',
    icon: '🎵',
    description: 'Tempo, Energy, and Acousticness. Drag "Your Song" to see which tracks are closest in sound.',
    xLabel: 'Tempo', yLabel: 'Energy', zLabel: 'Acoustic',
    defaultTarget: { x: 50, y: 50, z: 50 },
    candidates: [
      { id: 's1', label: 'Indie Rock',  x: 60, y: 78, z: 25, color: '#E11D48' },
      { id: 's2', label: 'Lo-fi Chill', x: 22, y: 25, z: 78, color: '#0284C7' },
      { id: 's3', label: 'Pop Hit',     x: 82, y: 88, z: 15, color: '#D97706' },
      { id: 's4', label: 'Jazz',        x: 38, y: 48, z: 82, color: '#7C3AED' },
      { id: 's5', label: 'Classical',   x: 12, y: 18, z: 92, color: '#059669' },
      { id: 's6', label: 'Metal',       x: 92, y: 95, z: 10, color: '#0891B2' },
    ],
  },
  {
    label: 'Words in 3D',
    icon: '💬',
    description: 'Word embeddings compressed to 3D. Drag "Query" — similar concepts cluster together.',
    xLabel: 'Sem-1', yLabel: 'Sem-2', zLabel: 'Sem-3',
    defaultTarget: { x: 50, y: 50, z: 50 },
    candidates: [
      { id: 'w1', label: 'Dog',    x: 25, y: 72, z: 35, color: '#E11D48' },
      { id: 'w2', label: 'Cat',    x: 30, y: 78, z: 42, color: '#D97706' },
      { id: 'w3', label: 'Tiger',  x: 18, y: 85, z: 28, color: '#7C3AED' },
      { id: 'w4', label: 'Car',    x: 78, y: 22, z: 62, color: '#0284C7' },
      { id: 'w5', label: 'Truck',  x: 82, y: 18, z: 70, color: '#059669' },
      { id: 'w6', label: 'Piano',  x: 52, y: 42, z: 88, color: '#0891B2' },
    ],
  },
];

function dist3(a: Point3D, b: { x: number; y: number; z: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

export const Scene2_3b_Proximity3DSpace: React.FC = () => {
  const [active, setActive] = useState(0);
  const [targets, setTargets] = useState(DATASETS.map(d => ({ ...d.defaultTarget })));

  const ds = DATASETS[active];
  const target = targets[active];

  const handleTargetMove = useCallback((x: number, y: number, z: number) => {
    setTargets(prev => prev.map((t, i) => i === active ? { x, y, z } : t));
  }, [active]);

  const targetPoint: Point3D = {
    id: 'target', label: 'You ←drag',
    x: target.x, y: target.y, z: target.z,
    color: '#1e293b',
  };

  const ranked = [...ds.candidates]
    .map(c => ({ ...c, dist: dist3(c, target) }))
    .sort((a, b) => a.dist - b.dist);

  return (
    <div className={containerClass}>
      <div className={leftSideClass}>
        <Plot3D
          points={ds.candidates}
          targetPoint={targetPoint}
          onTargetMove={handleTargetMove}
          xLabel={ds.xLabel}
          yLabel={ds.yLabel}
          zLabel={ds.zLabel}
        />
      </div>

      <div className={rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-1">Points in 3D Space</h2>
          <p className="text-slate-500 text-sm font-medium leading-snug">
            Drag the target to move it — nearest neighbours update live. Drag the background to rotate.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {DATASETS.map((d, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                active === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="mr-2">{d.icon}</span>
              <span className="font-bold text-sm">{d.label}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Nearest → Farthest</span>
          {ranked.map((c, i) => (
            <div key={c.id} className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
              i < 2 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                  style={{ backgroundColor: i < 2 ? c.color : '#cbd5e1' }}>
                  {i + 1}
                </span>
                <span className={i < 2 ? 'text-slate-700' : 'text-slate-400'}>{c.label}</span>
              </div>
              <span className={i < 2 ? 'text-emerald-600' : 'text-slate-300'}>
                d: {c.dist.toFixed(1)}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-medium leading-relaxed">
          <span className="font-black">The key insight:</span> ChatGPT uses <span className="font-black">1,536 dimensions</span>. You can't draw that — but the same distance formula works in any number of dimensions.
        </div>
      </div>
    </div>
  );
};
