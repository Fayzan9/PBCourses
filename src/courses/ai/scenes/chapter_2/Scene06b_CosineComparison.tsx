import React from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';
import { SlideLayout } from '../../components/SlideLayout';

const ALICE = [20, 10];
const BOB = [80, 40];
const CHARLIE = [20, 80];

const cosineSimilarity = (a: number[], b: number[]) => {
  const dot = a[0] * b[0] + a[1] * b[1];
  const magA = Math.sqrt(a[0] ** 2 + a[1] ** 2);
  const magB = Math.sqrt(b[0] ** 2 + b[1] ** 2);
  return magA === 0 || magB === 0 ? 0 : dot / (magA * magB);
};

const angleBetween = (a: number[], b: number[]) => {
  const cos = cosineSimilarity(a, b);
  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI;
};

export const Scene2_6b_CosineComparison: React.FC = () => {
  const sameTasteCos = cosineSimilarity(ALICE, BOB);
  const differentTasteCos = cosineSimilarity(ALICE, CHARLIE);
  const sameTasteAngle = angleBetween(ALICE, BOB);
  const differentTasteAngle = angleBetween(ALICE, CHARLIE);

  const points: VisualPoint[] = [
    {
      id: 'alice',
      label: 'Alice',
      coords: ALICE,
      color: '#E11D48',
      details: '20h Action · 10h Comedy (Taste Angle: 26.6°)',
    },
    {
      id: 'bob',
      label: 'Bob',
      coords: BOB,
      color: '#7C3AED',
      details: '80h Action · 40h Comedy (Taste Angle: 26.6°)',
    },
    {
      id: 'charlie',
      label: 'Charlie',
      coords: CHARLIE,
      color: '#D97706',
      details: '20h Action · 80h Comedy (Taste Angle: 76.0°)',
    },
  ];

  return (
    <SlideLayout
      title="Cosine Scale Comparison"
      text="Comparing Alice, Bob, and Charlie using Cosine Similarity instead of Euclidean Distance. Hover over the points to inspect their coordinate positions and vector angles."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-800 leading-tight">
              Cosine Resolves Scale
            </h2>

            <p className="mt-2 text-sm text-slate-500 font-semibold leading-relaxed">
              By ignoring vector length (total hours) and focusing only on the angle, we get the correct intuition.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
            <div className="text-xs uppercase tracking-wider font-black text-emerald-600 mb-1">
              Same Taste (Alice ↔ Bob)
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">Cosine Score</span>
                <span className="text-xs text-slate-400 font-mono font-bold">Angle: {sameTasteAngle.toFixed(1)}°</span>
              </div>

              <span className="font-mono text-2xl font-black text-emerald-600">
                {sameTasteCos.toFixed(3)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <div className="text-xs uppercase tracking-wider font-black text-amber-600 mb-1">
              Different Taste (Alice ↔ Charlie)
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-700">Cosine Score</span>
                <span className="text-xs text-slate-400 font-mono font-bold">Angle: {differentTasteAngle.toFixed(1)}°</span>
              </div>

              <span className="font-mono text-2xl font-black text-amber-700">
                {differentTasteCos.toFixed(3)}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs uppercase tracking-wider font-black text-slate-400 mb-1">
              Key Comparison
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-semibold">
              In Euclidean Distance, Charlie was closer to Alice than Bob was. In Cosine Similarity, Bob is a perfect match (1.000), while Charlie is only 0.651.
            </p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full p-4">
        <VisualizationSpace
          points={points}
          dimensions={['Action Hours', 'Comedy Hours']}
          ranges={[[0, 100], [0, 100]]}
          showVectors
        />
      </div>
    </SlideLayout>
  );
};

export default Scene2_6b_CosineComparison;
