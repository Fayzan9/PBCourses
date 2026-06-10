import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { PlotCanvas } from '../../components/PlotCanvas';

export const Scene2_3_RealWorldProximity: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      icon: '🎵',
      label: 'Music Streaming',
      analogy: 'Spotify represents songs as points in a high-dimensional space. When you like a song, it finds the nearest points — songs with similar tempo, key, energy, and genre — and recommends them.',
      tag: 'Nearest Neighbors',
      tagColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      points: [
        { id: 'y', x: 45, y: 50, color: '#10B981', label: 'Your Song', ring: true },
        { id: 'a', x: 52, y: 55, color: '#10B981', label: 'Rec A' },
        { id: 'b', x: 40, y: 45, color: '#10B981', label: 'Rec B' },
        { id: 'c', x: 80, y: 25, color: '#94a3b8', label: 'Unrelated' },
        { id: 'd', x: 20, y: 80, color: '#94a3b8', label: 'Different' },
      ],
    },
    {
      icon: '🔍',
      label: 'Semantic Search',
      analogy: 'When you search "happy dog photos", the search engine converts your query into a vector and finds the nearest document vectors — not by matching keywords, but by measuring conceptual distance.',
      tag: 'Vector Search',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
      points: [
        { id: 'q', x: 55, y: 60, color: '#0284C7', label: 'Query', ring: true },
        { id: 'r1', x: 60, y: 65, color: '#0284C7', label: 'Result 1' },
        { id: 'r2', x: 50, y: 55, color: '#0284C7', label: 'Result 2' },
        { id: 'u1', x: 15, y: 30, color: '#94a3b8', label: 'Irrelevant' },
        { id: 'u2', x: 85, y: 20, color: '#94a3b8', label: 'Irrelevant' },
      ],
    },
    {
      icon: '🎬',
      label: 'Movie Recommendations',
      analogy: "Netflix encodes each movie as a point in a genre/style space. Your watch history becomes a point too. The system finds movies that are geometrically close to what you've watched and loved.",
      tag: 'Content Filtering',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
      points: [
        { id: 'w', x: 35, y: 65, color: '#7C3AED', label: 'Watched', ring: true },
        { id: 'm1', x: 42, y: 70, color: '#7C3AED', label: 'Match 1' },
        { id: 'm2', x: 30, y: 58, color: '#7C3AED', label: 'Match 2' },
        { id: 'o1', x: 75, y: 30, color: '#94a3b8', label: 'Mismatch' },
        { id: 'o2', x: 90, y: 80, color: '#94a3b8', label: 'Mismatch' },
      ],
    },
  ];

  const ex = examples[active];

  return (
    <SlideLayout
      title="Proximity Is Everywhere"
      text="Every recommendation system, search engine, and AI assistant is constantly measuring distance between points."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                active === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="mr-2">{e.icon}</span>
              <span className="font-bold text-sm">{e.label}</span>
              <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                active === i ? 'bg-white/20 border-white/20 text-white' : e.tagColor
              }`}>
                {e.tag}
              </span>
            </button>
          ))}
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed">
            {ex.analogy}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <PlotCanvas
          points={ex.points}
          lines={ex.points.slice(1, 3).map(p => ({
            x1: ex.points[0].x, y1: ex.points[0].y,
            x2: p.x, y2: p.y,
            color: '#10B981', dashed: true,
          }))}
          xLabel="Feature Dimension 1"
          yLabel="Feature Dimension 2"
        />
      </div>
    </SlideLayout>
  );
};
