import React, { useState, useEffect, useRef } from 'react';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

const W = 480;
const H = 480;

type RateType = 'small' | 'perfect' | 'large';

const CONFIGS = {
  small: { eta: 0.1, label: 'Too Small (0.1)', desc: 'Extremely slow, steady crawl. Requires many steps.' },
  perfect: { eta: 0.5, label: 'Just Right (0.5)', desc: 'Perfect steps. Reaches the valley minimum rapidly.' },
  large: { eta: 2.15, label: 'Too Large (2.15)', desc: 'Overshoots the valley and explodes outwards!' },
};

export const Scene7_9_LearningRateSandbox: React.FC = () => {
  const [rateType, setRateType] = useState<RateType>('perfect');
  const [history, setHistory] = useState<[number, number][]>([[20, 20]]);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimer = useRef<number | null>(null);

  const cx = 70 * (W / 100);
  const cy = H - 70 * (H / 100);

  const reset = () => {
    setIsPlaying(false);
    if (playTimer.current) window.clearInterval(playTimer.current);
    setHistory([[20, 20]]);
  };

  const step = () => {
    setHistory(prev => {
      if (prev.length >= 25) {
        setIsPlaying(false);
        return prev;
      }
      const last = prev[prev.length - 1];
      const targetX = 70;
      const targetY = 70;
      
      const dx = last[0] - targetX;
      const dy = last[1] - targetY;

      // Stop if converged
      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1 && rateType !== 'large') {
        setIsPlaying(false);
        return prev;
      }

      const eta = CONFIGS[rateType].eta;
      const nextX = last[0] - eta * dx;
      const nextY = last[1] - eta * dy;
      
      // Clamp coordinates to sandbox bounds for visibility, unless diverging too far
      if (Math.abs(nextX) > 200 || Math.abs(nextY) > 200) {
        setIsPlaying(false);
      }

      return [...prev, [nextX, nextY]];
    });
  };

  useEffect(() => {
    if (isPlaying) {
      playTimer.current = window.setInterval(() => {
        step();
      }, 300);
    } else {
      if (playTimer.current) window.clearInterval(playTimer.current);
    }
    return () => {
      if (playTimer.current) window.clearInterval(playTimer.current);
    };
  }, [isPlaying, rateType]);

  // Handle auto-reset when changing rate type
  useEffect(() => {
    reset();
  }, [rateType]);

  // Convert history array to polyline path
  const pathD = history.map((pt, idx) => {
    const x = pt[0] * (W / 100);
    const y = H - pt[1] * (H / 100);
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full select-none bg-white rounded-2xl">
          <defs>
            <radialGradient id="contour-glow" cx="70%" cy="70%" r="70%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glow center */}
          <circle cx={cx} cy={cy} r="180" fill="url(#contour-glow)" />

          {/* Dotted contour rings */}
          {[15, 30, 45, 60, 75].map((val) => {
            const radius = Math.sqrt(val * 75) * (W / 100);
            return (
              <circle
                key={val}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Valley minimum dot */}
          <circle cx={cx} cy={cy} r="6" fill="#10B981" />

          {/* Optimization path line */}
          {history.length > 1 && (
            <path
              d={pathD}
              fill="none"
              stroke={rateType === 'large' ? '#E11D48' : '#0284C7'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* History point markers */}
          {history.map((pt, idx) => {
            const x = pt[0] * (W / 100);
            const y = H - pt[1] * (H / 100);
            const isLast = idx === history.length - 1;
            return (
              <circle
                key={idx}
                cx={x}
                cy={y}
                r={isLast ? 8 : 4}
                fill={isLast ? '#E11D48' : '#64748B'}
                opacity={isLast ? 1 : 0.6}
              />
            );
          })}
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">Learning Rate Sandbox</h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Select a learning rate and run steps to see how the model navigates to the valley.
          </p>
        </div>

        {/* Rate Picker */}
        <div className="flex gap-2">
          {(['small', 'perfect', 'large'] as RateType[]).map(t => (
            <button
              key={t}
              onClick={() => setRateType(t)}
              className={`flex-1 py-3 px-2 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                rateType === t
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {CONFIGS[t].label}
            </button>
          ))}
        </div>

        {/* Info panel */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 min-h-[90px]">
          <p className="text-sm font-bold text-slate-700 font-mono mb-1">EFFECT</p>
          <p className="text-slate-600 text-sm leading-relaxed">{CONFIGS[rateType].desc}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={() => setIsPlaying(v => !v)}
            className={`flex-1 py-3.5 rounded-2xl font-black text-sm text-white shadow-md active:scale-98 transition-all cursor-pointer ${
              isPlaying ? 'bg-amber-600 hover:bg-amber-700' : 'bg-rose-600 hover:bg-rose-700'
            }`}
          >
            {isPlaying ? 'Pause' : 'Run Optimization'}
          </button>
          <button
            onClick={reset}
            className="px-5 py-3.5 bg-white border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 active:scale-98 transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
