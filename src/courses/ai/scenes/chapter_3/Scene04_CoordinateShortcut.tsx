import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { BarChart3, X } from 'lucide-react';

type Example = {
  label: string;
  entityA: string;
  entityB: string;
  vectorA: [number, number];
  vectorB: [number, number];
  dimensions: [string, string];
  interpretation: string;
};

const examples: Example[] = [
  {
    label: 'Similar People',
    entityA: 'Alice',
    entityB: 'Bob',
    vectorA: [170, 70],
    vectorB: [180, 80],
    dimensions: ['Height', 'Weight'],
    interpretation: 'Large positive contributions from both features.',
  },
  {
    label: 'Different People',
    entityA: 'Alice',
    entityB: 'Toddler',
    vectorA: [170, 70],
    vectorB: [90, 14],
    dimensions: ['Height', 'Weight'],
    interpretation: 'Smaller contributions because the features differ more.',
  },
  {
    label: 'Person vs Cat',
    entityA: 'Alice',
    entityB: 'Cat',
    vectorA: [170, 70],
    vectorB: [25, 4],
    dimensions: ['Height', 'Weight'],
    interpretation: 'Very little overlap, so the dot product is much smaller.',
  },
];

export const Scene3_4_CoordinateShortcut: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [showGraph, setShowGraph] = useState(false);

  const ex = examples[selected];

  const hPart = ex.vectorA[0] * ex.vectorB[0];
  const wPart = ex.vectorA[1] * ex.vectorB[1];
  const total = hPart + wPart;

  const maxDot =
    examples[0].vectorA[0] * examples[0].vectorB[0] +
    examples[0].vectorA[1] * examples[0].vectorB[1];

  const similarity = Math.round((total / maxDot) * 100);

  const graphPoints = [
    {
      label: 'Alice',
      x: 170,
      y: 70,
      color: '#E11D48',
    },
    {
      label: 'Bob',
      x: 180,
      y: 80,
      color: '#0284C7',
    },
    {
      label: 'Toddler',
      x: 90,
      y: 14,
      color: '#7C3AED',
    },
    {
      label: 'Cat',
      x: 25,
      y: 4,
      color: '#D97706',
    },
  ];

  const graphW = 520;
  const graphH = 320;

  const maxX = 200;
  const maxY = 100;

  const plotX = (x: number) => 50 + (x / maxX) * (graphW - 90);
  const plotY = (y: number) => graphH - 40 - (y / maxY) * (graphH - 80);

  return (
    <>
      <SlideLayout
        title="The Coordinate Shortcut"
        text="Multiply matching features. Add the results."
        sidebarContent={
          <div className="flex flex-col gap-3">
            {examples.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setSelected(index)}
                className={`text-left px-3 py-2.5 rounded-xl border transition-all ${
                  selected === index
                    ? 'bg-white border-slate-300 shadow-sm'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-sm font-semibold text-slate-700">
                  {item.label}
                </span>
              </button>
            ))}

            <button
              onClick={() => setShowGraph(true)}
              className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold"
            >
              <BarChart3 className="w-4 h-4" />
              View Graph
            </button>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1">
                Observation
              </div>

              <div className="text-xs text-slate-600 leading-relaxed">
                {ex.interpretation}
              </div>
            </div>
          </div>
        }
      >
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-2">
                {ex.entityA}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    {ex.dimensions[0]}
                  </span>
                  <span className="text-lg font-black text-slate-800">
                    {ex.vectorA[0]}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    {ex.dimensions[1]}
                  </span>
                  <span className="text-lg font-black text-slate-800">
                    {ex.vectorA[1]}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-2">
                {ex.entityB}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    {ex.dimensions[0]}
                  </span>
                  <span className="text-lg font-black text-slate-800">
                    {ex.vectorB[0]}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">
                    {ex.dimensions[1]}
                  </span>
                  <span className="text-lg font-black text-slate-800">
                    {ex.vectorB[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-3">
              Dot Product
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-sky-50 border border-sky-200 px-4 py-3">
                <span className="text-sm font-semibold text-sky-700">
                  {ex.vectorA[0]} × {ex.vectorB[0]}
                </span>

                <span className="text-xl font-black text-sky-700">
                  {hPart.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-violet-50 border border-violet-200 px-4 py-3">
                <span className="text-sm font-semibold text-violet-700">
                  {ex.vectorA[1]} × {ex.vectorB[1]}
                </span>

                <span className="text-xl font-black text-violet-700">
                  {wPart.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3">
                <span className="text-sm font-semibold text-emerald-700">
                  {hPart.toLocaleString()} + {wPart.toLocaleString()}
                </span>

                <span className="text-2xl font-black text-emerald-700">
                  {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-600">
                Relative Similarity
              </span>

              <span className="text-lg font-black text-slate-900">
                {similarity}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${Math.min(100, similarity)}%` }}
              />
            </div>
          </div>
        </div>
      </SlideLayout>

      {showGraph && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 w-full max-w-3xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Height vs Weight
                </h3>
                <p className="text-sm text-slate-500">
                  Each point is a vector: [height, weight]
                </p>
              </div>

              <button
                onClick={() => setShowGraph(false)}
                className="p-2 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <svg
              viewBox={`0 0 ${graphW} ${graphH}`}
              className="w-full h-auto"
            >
              <line
                x1="50"
                y1={graphH - 40}
                x2={graphW - 20}
                y2={graphH - 40}
                stroke="#94A3B8"
              />

              <line
                x1="50"
                y1="20"
                x2="50"
                y2={graphH - 40}
                stroke="#94A3B8"
              />

              {graphPoints.map((p) => (
                <g key={p.label}>
                  <circle
                    cx={plotX(p.x)}
                    cy={plotY(p.y)}
                    r="7"
                    fill={p.color}
                  />

                  <text
                    x={plotX(p.x) + 10}
                    y={plotY(p.y) - 10}
                    fontSize="12"
                    fontWeight="700"
                    fill="#334155"
                  >
                    {p.label}
                  </text>
                </g>
              ))}

              <text
                x={graphW / 2}
                y={graphH - 5}
                textAnchor="middle"
                fontSize="12"
                fill="#64748B"
              >
                Height
              </text>

              <text
                x="18"
                y={graphH / 2}
                textAnchor="middle"
                fontSize="12"
                fill="#64748B"
                transform={`rotate(-90 18 ${graphH / 2})`}
              >
                Weight
              </text>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Scene3_4_CoordinateShortcut;