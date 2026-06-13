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
    label: 'Music Space',
    tag: 'Song Energy vs Acousticness',
    tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
    accent: '#7C3AED',
    targetLabel: 'Custom Track',
    defaultTarget: { x: 50, y: 50 },
    xLabel: 'Energy',
    yLabel: 'Acousticness',
    analogy: 'Drag "Custom Track" around. Observe which existing songs are conceptually closest and recommended.',
    candidates: [
      { id: 'daft', label: 'One More Time (Daft Punk)', x: 85, y: 15, color: '#7C3AED' },
      { id: 'avicii', label: 'Levels (Avicii)', x: 95, y: 25, color: '#7C3AED' },
      { id: 'sheeran', label: 'Thinking Out Loud (Ed Sheeran)', x: 15, y: 85, color: '#7C3AED' },
      { id: 'adele', label: 'Someone Like You (Adele)', x: 25, y: 75, color: '#7C3AED' },
      { id: 'billie', label: 'Bad Guy (Billie Eilish)', x: 55, y: 50, color: '#7C3AED' },
    ] as Candidate[],
  },
  {
    icon: '🛍️',
    label: 'Product Space',
    tag: 'Price vs Performance',
    tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
    accent: '#0284C7',
    targetLabel: 'Target Device',
    defaultTarget: { x: 45, y: 55 },
    xLabel: 'Price ($ x100)',
    yLabel: 'Performance Score',
    analogy: 'Drag "Target Device" to search alternate models nearby. Find options with equivalent value.',
    candidates: [
      { id: 'phone', label: 'Flagship Phone', x: 50, y: 75, color: '#0284C7' },
      { id: 'laptop', label: 'Pro Laptop', x: 85, y: 90, color: '#0284C7' },
      { id: 'camera', label: 'Mirrorless Camera', x: 80, y: 60, color: '#0284C7' },
      { id: 'headphones', label: 'ANC Headphones', x: 15, y: 35, color: '#0284C7' }
    ] as Candidate[],
  },
  {
    icon: '💬',
    label: 'Language Space',
    tag: 'Concept Semantics',
    tagColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    accent: '#059669',
    targetLabel: 'Query Concept',
    defaultTarget: { x: 50, y: 50 },
    xLabel: 'Semantic Dimension A',
    yLabel: 'Semantic Dimension B',
    analogy: 'Drag "Query Concept" to explore related words. Watch how the selector locks onto either the animal or vehicle cluster.',
    candidates: [
      { id: 'cat', label: 'Cat (Domestic)', x: 15, y: 80, color: '#059669' },
      { id: 'dog', label: 'Dog (Companion)', x: 25, y: 75, color: '#059669' },
      { id: 'tiger', label: 'Tiger (Apex)', x: 20, y: 90, color: '#059669' },
      { id: 'car', label: 'Car (Personal)', x: 80, y: 20, color: '#059669' },
      { id: 'truck', label: 'Truck (Commercial)', x: 90, y: 15, color: '#059669' },
      { id: 'bus', label: 'Bus (Transit)', x: 75, y: 30, color: '#059669' }
    ] as Candidate[],
  }
];

export const Scene2_3_RealWorldProximity: React.FC = () => {
  const [active, setActive] = useState(0);
  const [targets, setTargets] = useState(EXAMPLES.map(e => ({ ...e.defaultTarget })));

  const ex = EXAMPLES[active];
  const target = targets[active];

  const handleDrag = useCallback((x: number, y: number) => {
    setTargets(prev => prev.map((t, i) => i === active ? { x, y } : t));
  }, [active]);

  const ranked = [...ex.candidates]
    .map(c => {
      const dx = c.x - target.x, dy = c.y - target.y;
      return { ...c, dist: Math.sqrt(dx * dx + dy * dy) };
    })
    .sort((a, b) => a.dist - b.dist);

  // Pick nearest neighbors (nearest 2 items)
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
            Drag the reference point. The nearest concepts update live based on distance.
          </p>
        </div>

        {/* Use-case tabs */}
        <div className="flex flex-col gap-2">
          {EXAMPLES.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${active === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm scale-[1.01]'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <span>{e.icon}</span>
                <span className="font-extrabold text-sm">{e.label}</span>
              </div>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${active === i ? 'bg-white/20 border-white/20 text-white' : e.tagColor
                }`}>
                {active === i ? 'Active' : 'Select'}
              </span>
            </button>
          ))}
        </div>

        {/* Live rankings */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Concept Recommendations</span>
          {ranked.map((c, i) => (
            <div key={c.id} className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${i < 2 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 text-slate-400'
              }`}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                  style={{ backgroundColor: i < 2 ? ex.accent : '#cbd5e1' }}>
                  {i + 1}
                </span>
                <span className={i < 2 ? 'text-slate-700' : 'text-slate-400'}>{c.label.split(' (')[0]}</span>
              </div>
              <span className={i < 2 ? 'text-emerald-600' : 'text-slate-300'}>
                dist: {c.dist.toFixed(1)}
              </span>
            </div>
          ))}
        </div>

        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-semibold leading-relaxed">
          {ex.analogy}
        </div>
      </div>
    </div>
  );
};
