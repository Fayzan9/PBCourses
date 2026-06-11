import React, { useState } from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

// Same movies from Chapter 2 — same space, new question
const MOVIES = [
  { id: 'indie',   label: 'Indie Action', coords: [18, 24], color: '#E11D48' },
  { id: 'block',   label: 'Blockbuster',  coords: [72, 96], color: '#7C3AED' },
  { id: 'scifi',   label: 'Sci-Fi',       coords: [85, 15], color: '#D97706' },
  { id: 'main',    label: 'Mainstream',   coords: [48, 52], color: '#0284C7' },
  { id: 'comedy',  label: 'Indie Comedy', coords: [12, 55], color: '#059669' },
];

const PRESETS = [
  { label: 'Action Fan',   icon: '🔥', coords: [85, 15] },
  { label: 'Comedy Lover', icon: '😂', coords: [10, 80] },
  { label: 'Balanced',     icon: '⚖️', coords: [55, 55] },
];

const dot = (a: number[], b: number[]) => a[0] * b[0] + a[1] * b[1];

export const Scene3_3_RealWorldAnalogies: React.FC = () => {
  const [taste, setTaste] = useState([55, 55]);

  const ranked = [...MOVIES]
    .map(m => ({ ...m, score: dot(taste, m.coords) }))
    .sort((a, b) => b.score - a.score);

  const maxScore = ranked[0]?.score || 1;
  const top = ranked[0];

  const points: VisualPoint[] = [
    { id: 'taste', label: 'Your Taste', coords: taste, color: '#10B981', details: `[${taste[0]}, ${taste[1]}]` },
    ...MOVIES.map(m => ({ ...m, details: `dot = ${dot(taste, m.coords).toFixed(0)}` })),
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Visualization — same movie space as Chapter 2 */}
      <div className="flex-[60] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          showVectors
          draggablePointId="taste"
          onDragPoint={c => setTaste([Math.round(c[0]), Math.round(c[1])])}
        />
      </div>

      {/* Sidebar */}
      <div className="flex-[40] flex flex-col justify-center gap-4 shrink-0 py-2">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight mb-1">
            Same space.<br />New question.
          </h2>
          <p className="text-slate-500 text-sm">
            Ch. 2 asked <em>how far?</em> — now ask <em>how aligned?</em> Drag <span className="font-bold text-emerald-600">Your Taste</span> and watch the match scores update.
          </p>
        </div>

        {/* Preset personas */}
        <div className="flex gap-2">
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => setTaste(p.coords)}
              className="flex-1 px-2 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:border-slate-300 cursor-pointer transition-all active:scale-95 text-center">
              {p.icon} {p.label}
            </button>
          ))}
        </div>

        {/* Live rankings */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Dot Product Rankings</span>
          {ranked.map((m, i) => (
            <div key={m.id} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all ${
              i === 0 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100'
            }`}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-black shrink-0"
                style={{ backgroundColor: i < 2 ? m.color : '#cbd5e1' }}>
                {i + 1}
              </span>
              <span className={`text-xs font-bold flex-1 ${i < 2 ? 'text-slate-700' : 'text-slate-400'}`}>{m.label}</span>
              <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${(m.score / maxScore) * 100}%`, backgroundColor: m.color }} />
              </div>
              <span className="font-mono text-xs font-black w-9 text-right tabular-nums"
                style={{ color: i < 2 ? m.color : '#94a3b8' }}>
                {m.score.toFixed(0)}
              </span>
            </div>
          ))}
        </div>

        {/* Live formula for top match */}
        {top && (
          <div className="bg-violet-50 border border-violet-200 rounded-xl p-3 text-xs text-slate-600 font-mono leading-relaxed">
            <span className="font-black text-violet-700 not-italic">Top match → </span>
            [{taste[0]}, {taste[1]}] · [{top.coords[0]}, {top.coords[1]}]{' '}
            = {taste[0]}×{top.coords[0]} + {taste[1]}×{top.coords[1]}{' '}
            = <span className="font-black text-violet-700">{top.score.toFixed(0)}</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Scene3_3_RealWorldAnalogies;
