import React from 'react';
import { VisualizationSpace, type VisualPoint, type CustomLine } from '../../components/VisualizationSpace';

const ALICE = [20, 10];
const BOB = [80, 40];
const CHARLIE = [20, 80];

const euclideanDistance = (a: number[], b: number[]) =>
  Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);

export const Scene2_5_SameDifferent: React.FC = () => {
  const sameTasteDistance = euclideanDistance(ALICE, BOB);
  const differentTasteDistance = euclideanDistance(ALICE, CHARLIE);

  const points: VisualPoint[] = [
    {
      id: 'alice',
      label: 'Alice',
      coords: ALICE,
      color: '#E11D48',
      details: '20h A · 10h C',
    },
    {
      id: 'bob',
      label: 'Bob',
      coords: BOB,
      color: '#7C3AED',
      details: '80h A · 40h C',
    },
    {
      id: 'charlie',
      label: 'Charlie',
      coords: CHARLIE,
      color: '#D97706',
      details: '20h A · 80h C',
    },
  ];

  const customLines: CustomLine[] = [
    {
      from: [0, 0],
      to: [100, 50],
      color: '#CBD5E1',
      dashed: true,
    },
    {
      from: ALICE,
      to: BOB,
      color: '#E11D48',
      dashed: true,
    },
  ];

  return (
    <div className="h-full w-full max-w-7xl mx-auto px-4 py-2 flex gap-4 overflow-hidden">
      <div className="flex-[72] min-w-0">
        <div className="h-full rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-4 py-2.5 border-b border-slate-100">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Netflix Preferences
            </div>
            <div className="text-sm font-black text-slate-900">
              Same Taste, Different Watch Time
            </div>
          </div>

          <div className="h-[calc(100%-58px)] p-2">
            <VisualizationSpace
              points={points}
              dimensions={['Action Hours', 'Comedy Hours']}
              ranges={[[0, 100], [0, 100]]}
              showVectors
              customLines={customLines}
            />
          </div>
        </div>
      </div>

      <div className="flex-[28] flex flex-col justify-center gap-3 min-w-[260px]">
        <div>
          <h2 className="text-2xl font-black text-slate-900 leading-tight">
            Distance Can Mislead
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Alice and Bob like the same genres. Bob just watches more.
          </p>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
          <div className="text-[10px] uppercase tracking-wider font-black text-rose-600 mb-1">
            Euclidean
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Alice ↔ Bob
            </span>

            <span className="font-mono text-xl font-black text-rose-600">
              {sameTasteDistance.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="text-[10px] uppercase tracking-wider font-black text-amber-600 mb-1">
            Different Taste
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">
              Alice ↔ Charlie
            </span>

            <span className="font-mono text-xl font-black text-amber-700">
              {differentTasteDistance.toFixed(0)}
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
          <div className="text-[10px] uppercase tracking-wider font-black text-emerald-600 mb-1">
            Cosine Similarity
          </div>

          <div className="text-xs font-semibold text-slate-700 leading-relaxed">
            Compares direction, not magnitude.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene2_5_SameDifferent;