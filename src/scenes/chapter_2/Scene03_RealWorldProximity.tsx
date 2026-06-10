import React, { useState, useCallback } from 'react';
import { DraggablePlotCanvas } from '../../components/PlotCanvas';
import type { PlotPoint, PlotLine } from '../../components/PlotCanvas';

const containerClass = "flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden";
const leftSideClass = "flex-[65] min-w-0 bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden";
const rightSideClass = "flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto";

type Candidate = { id: string; label: string; x: number; y: number; color: string };

const EXAMPLES = [
  {
    icon: '🎵',
    label: 'Music Streaming',
    tag: 'Nearest Neighbors',
    tagColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    accent: '#10B981',
    targetLabel: 'Your Song',
    defaultTarget: { x: 38, y: 42 },
    xLabel: 'Tempo / Energy',
    yLabel: 'Genre Score',
    analogy: 'Drag "Your Song" anywhere. The two nearest songs get recommended — the rest fade out.',
    candidates: [
      { id: 'c1', label: 'Indie Rock',  x: 48, y: 51, color: '#10B981' },
      { id: 'c2', label: 'Lo-fi Chill', x: 30, y: 55, color: '#10B981' },
      { id: 'c3', label: 'Pop Hit',     x: 72, y: 18, color: '#10B981' },
      { id: 'c4', label: 'Classical',   x: 85, y: 78, color: '#10B981' },
      { id: 'c5', label: 'Jazz',        x: 15, y: 82, color: '#10B981' },
      { id: 'c6', label: 'Country',     x: 62, y: 85, color: '#10B981' },
      { id: 'c7', label: 'Heavy Metal', x: 90, y: 45, color: '#10B981' },
    ] as Candidate[],
  },
  {
    icon: '🔍',
    label: 'Semantic Search',
    tag: 'Vector Search',
    tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
    accent: '#0284C7',
    targetLabel: 'Your Query',
    defaultTarget: { x: 52, y: 58 },
    xLabel: 'Topic Dimension 1',
    yLabel: 'Topic Dimension 2',
    analogy: 'Drag "Your Query" to explore which documents are conceptually closest — no keyword matching needed.',
    candidates: [
      { id: 'c1', label: 'Dog Photos',   x: 63, y: 68, color: '#0284C7' },
      { id: 'c2', label: 'Pet Guide',    x: 44, y: 47, color: '#0284C7' },
      { id: 'c3', label: 'Finance Doc',  x: 12, y: 22, color: '#0284C7' },
      { id: 'c4', label: 'Legal Text',   x: 88, y: 15, color: '#0284C7' },
      { id: 'c5', label: 'Sports News',  x: 78, y: 82, color: '#0284C7' },
      { id: 'c6', label: 'Recipe Blog',  x: 22, y: 88, color: '#0284C7' },
      { id: 'c7', label: 'Tech Article', x: 18, y: 42, color: '#0284C7' },
    ] as Candidate[],
  },
  {
    icon: '🎬',
    label: 'Movie Recommendations',
    tag: 'Content Filtering',
    tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
    accent: '#7C3AED',
    targetLabel: 'Your Taste',
    defaultTarget: { x: 40, y: 60 },
    xLabel: 'Action Score',
    yLabel: 'Comedy Score',
    analogy: 'Drag "Your Taste" around. Watch how movie rankings flip — especially for films at opposite corners.',
    candidates: [
      { id: 'c1', label: 'Action Drama', x: 52, y: 68, color: '#7C3AED' },
      { id: 'c2', label: 'Rom-Com',      x: 28, y: 72, color: '#7C3AED' },
      { id: 'c3', label: 'Sci-Fi',       x: 82, y: 22, color: '#7C3AED' },
      { id: 'c4', label: 'Horror',       x: 75, y: 85, color: '#7C3AED' },
      { id: 'c5', label: 'Anime',        x: 15, y: 18, color: '#7C3AED' },
      { id: 'c6', label: 'Musical',      x: 90, y: 55, color: '#7C3AED' },
      { id: 'c7', label: 'Western',      x: 55, y: 15, color: '#7C3AED' },
    ] as Candidate[],
  },
];

export const Scene2_3_RealWorldProximity: React.FC = () => {
  const [active, setActive] = useState(0);
  const [targets, setTargets] = useState(EXAMPLES.map(e => ({ ...e.defaultTarget })));

  const ex = EXAMPLES[active];
  const target = targets[active];

  const handleDrag = useCallback((x: number, y: number) => {
    setTargets(prev => prev.map((t, i) => i === active ? { x: Math.round(x), y: Math.round(y) } : t));
  }, [active]);

  const ranked = [...ex.candidates]
    .map(c => {
      const dx = c.x - target.x, dy = c.y - target.y;
      return { ...c, dist: Math.sqrt(dx * dx + dy * dy) };
    })
    .sort((a, b) => a.dist - b.dist);

  const topIds = ranked.slice(0, 2).map(r => r.id);

  const points: PlotPoint[] = [
    { id: 'target', x: target.x, y: target.y, color: ex.accent, label: ex.targetLabel, radius: 9, ring: true },
    ...ex.candidates.map(c => ({
      id: c.id, x: c.x, y: c.y, radius: 6,
      color: topIds.includes(c.id) ? c.color : '#cbd5e1',
      label: c.label,
    })),
  ];

  const lines: PlotLine[] = ex.candidates.map(c => ({
    x1: target.x, y1: target.y, x2: c.x, y2: c.y,
    color: topIds.includes(c.id) ? ex.accent : 'rgba(203,213,225,0.3)',
    dashed: !topIds.includes(c.id),
    width: topIds.includes(c.id) ? 2 : 1,
  }));

  return (
    <div className={containerClass}>
      {/* Left — draggable sandbox */}
      <div className={leftSideClass}>
        <DraggablePlotCanvas
          points={points}
          lines={lines}
          dragId="target"
          onDrag={handleDrag}
          xLabel={ex.xLabel}
          yLabel={ex.yLabel}
        />
      </div>

      {/* Right — sidebar */}
      <div className={rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-1">Proximity Is Everywhere</h2>
          <p className="text-slate-500 text-sm font-medium leading-snug">
            Drag the reference point — the two nearest neighbours update live.
          </p>
        </div>

        {/* Use-case tabs */}
        <div className="flex flex-col gap-2">
          {EXAMPLES.map((e, i) => (
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
        </div>

        {/* Live rankings */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Nearest → Farthest</span>
          {ranked.map((c, i) => (
            <div key={c.id} className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
              i < 2 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 text-slate-400'
            }`}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                  style={{ backgroundColor: i < 2 ? ex.accent : '#cbd5e1' }}>
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

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium leading-relaxed">
          {ex.analogy}
        </div>
      </div>
    </div>
  );
};
