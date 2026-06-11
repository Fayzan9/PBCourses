import React, { useState, useCallback } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { DraggablePlotCanvas, type PlotPoint, type PlotLine } from '../../components/PlotCanvas';

export const Scene2_12_ProximitySandbox: React.FC = () => {
  const [metric, setMetric] = useState<'euclidean' | 'cosine'>('euclidean');
  const [targetX, setTargetX] = useState(35);
  const [targetY, setTargetY] = useState(40);

  const candidates = [
    { id: 'c1', label: 'Indie Action',   x: 18,  y: 24,  color: '#E11D48'  },
    { id: 'c2', label: 'Blockbuster',    x: 72,  y: 96,  color: '#7C3AED'  },
    { id: 'c3', label: 'Comedy Short',   x: 42,  y: 10,  color: '#D97706'  },
    { id: 'c4', label: 'Mainstream',     x: 48,  y: 52,  color: '#0284C7'  },
    { id: 'c5', label: 'Indie Comedy',   x: 12,  y: 55,  color: '#059669'  },
  ];

  const getScore = (c: typeof candidates[0]) => {
    const dx = c.x - targetX, dy = c.y - targetY;
    if (metric === 'euclidean') {
      return { score: Math.sqrt(dx * dx + dy * dy), metricLabel: 'd', lower: true };
    } else {
      const dot = c.x * targetX + c.y * targetY;
      const magT = Math.sqrt(targetX ** 2 + targetY ** 2);
      const magC = Math.sqrt(c.x ** 2 + c.y ** 2);
      return { score: dot / (magT * magC), metricLabel: 'cos', lower: false };
    }
  };

  const ranked = [...candidates].map(c => ({ ...c, ...getScore(c) }))
    .sort((a, b) => a.lower ? a.score - b.score : b.score - a.score);

  const topIds = ranked.slice(0, 2).map(r => r.id);

  const handleDrag = useCallback((x: number, y: number) => {
    setTargetX(Math.round(x));
    setTargetY(Math.round(y));
  }, []);

  const points: PlotPoint[] = [
    { id: 'target', x: targetX, y: targetY, color: '#10B981', label: 'Target ← drag', radius: 9, ring: true },
    ...candidates.map(c => ({
      id: c.id, x: c.x, y: c.y, radius: 6,
      color: topIds.includes(c.id) ? c.color : '#cbd5e1',
      label: topIds.includes(c.id) ? c.label : undefined,
    })),
  ];

  // Target-to-candidate distance lines (prominent in Euclidean, faded in Cosine)
  const distanceLines: PlotLine[] = candidates.map(c => ({
    x1: targetX, y1: targetY, x2: c.x, y2: c.y,
    color: metric === 'euclidean' && topIds.includes(c.id) ? '#10B981' : 'rgba(203,213,225,0.35)',
    dashed: metric === 'cosine' || !topIds.includes(c.id),
    width: metric === 'euclidean' && topIds.includes(c.id) ? 2 : 1,
  }));

  // Origin rays — shown only in Cosine mode to make the angle intuitive
  const originLines: PlotLine[] = metric === 'cosine' ? [
    { x1: 0, y1: 0, x2: targetX, y2: targetY, color: '#10B981', width: 2.5 },
    ...candidates.map(c => ({
      x1: 0, y1: 0, x2: c.x, y2: c.y,
      color: topIds.includes(c.id) ? c.color : '#e2e8f0',
      width: topIds.includes(c.id) ? 2 : 1,
    })),
  ] : [];

  const lines: PlotLine[] = [...distanceLines, ...originLines];

  return (
    <SlideLayout
      title="Proximity Sandbox"
      text="Drag the target point anywhere on the plot. Switch between Euclidean and Cosine to see how the rankings change — especially for the Blockbuster."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button onClick={() => setMetric('euclidean')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                metric === 'euclidean' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}>
              Euclidean
            </button>
            <button onClick={() => setMetric('cosine')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                metric === 'cosine' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}>
              Cosine
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">All Rankings</span>
            {ranked.map((c, i) => (
              <div key={c.id} className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                i < 2 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 text-slate-400'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                    style={{ backgroundColor: i < 2 ? c.color : '#cbd5e1' }}>
                    {i + 1}
                  </span>
                  <span className={i < 2 ? 'text-slate-700' : 'text-slate-400'}>{c.label}</span>
                </div>
                <span className={i < 2 ? 'text-emerald-600' : 'text-slate-300'}>
                  {c.metricLabel}: {c.score.toFixed(metric === 'euclidean' ? 1 : 3)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium leading-relaxed">
            Watch how the Blockbuster (which has the same direction as Indie Action but bigger scale) ranks differently under each metric.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <DraggablePlotCanvas
          points={points}
          lines={lines}
          dragId="target"
          onDrag={handleDrag}
          xLabel="Action Score"
          yLabel="Comedy Score"
        />
      </div>
    </SlideLayout>
  );
};
