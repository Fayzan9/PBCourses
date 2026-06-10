import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

function circlePoints(n = 20): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = (2 * Math.PI * i) / n;
    return [Math.cos(a), Math.sin(a)];
  });
}

function rotate(pts: [number, number][], theta: number): [number, number][] {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return pts.map(([x, y]) => [c * x - s * y, s * x + c * y]);
}

function scale(pts: [number, number][], s1: number, s2: number): [number, number][] {
  return pts.map(([x, y]) => [s1 * x, s2 * y]);
}

function lerp(a: [number, number][], b: [number, number][], t: number): [number, number][] {
  return a.map(([ax, ay], i) => [ax + (b[i][0] - ax) * t, ay + (b[i][1] - ay) * t]);
}

function toPolyline(pts: [number, number][], cx: number, cy: number, sc: number): string {
  return pts.map(([x, y]) => `${cx + x * sc},${cy - y * sc}`).join(' ');
}

type Phase = 'idle' | 'vt' | 'sigma' | 'u' | 'done';

const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Input circle',
  vt: 'Step 1: Vᵀ rotates',
  sigma: 'Step 2: Σ stretches',
  u: 'Step 3: U rotates',
  done: 'Final output',
};

export const Scene6_20_RecapTheThreeSteps: React.FC = () => {
  const [phase, setPhase] = useState<Phase>('idle');
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  const DURATION = 900; // ms per phase transition

  const base = circlePoints(20);
  const afterVt = rotate(base, -Math.PI / 6);
  const afterSigma = scale(afterVt, 2.8, 0.9);
  const afterU = rotate(afterSigma, Math.PI / 3);

  function startAnimation() {
    setPhase('idle');
    setT(0);
    setTimeout(() => runPhase('vt'), 400);
  }

  function runPhase(p: Phase) {
    setPhase(p);
    setT(0);
    startRef.current = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const eased = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;
      setT(eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setT(1);
        const next: Partial<Record<Phase, Phase>> = { vt: 'sigma', sigma: 'u', u: 'done' };
        if (next[p]) setTimeout(() => runPhase(next[p]!), 400);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    const timer = setTimeout(() => startAnimation(), 600);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Interpolated points based on current phase and t
  const displayPts: [number, number][] = (() => {
    if (phase === 'idle') return base;
    if (phase === 'vt') return lerp(base, afterVt, t);
    if (phase === 'sigma') return lerp(afterVt, afterSigma, t);
    if (phase === 'u') return lerp(afterSigma, afterU, t);
    return afterU;
  })();

  const dotColor = (() => {
    if (phase === 'idle' || phase === 'done') return '#0ea5e9';
    if (phase === 'vt') return '#a78bfa';
    if (phase === 'sigma') return '#0ea5e9';
    if (phase === 'u') return '#10b981';
    return '#0ea5e9';
  })();

  const strokeColor = dotColor;

  const cx = 160;
  const cy = 140;
  const sc = 44;

  const polyline = toPolyline(displayPts, cx, cy, sc);

  return (
    <div className="flex flex-col items-center justify-start w-full h-full p-4 gap-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-block bg-sky-100 text-sky-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Chapter 6 · Scene 20
        </span>
        <h2 className="text-3xl font-bold text-slate-800">The Three Steps of SVD</h2>
        <p className="text-slate-500 text-sm mt-1">Watch the unit circle transform — step by step</p>
      </motion.div>

      {/* Main content: SVG + right text */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 w-full max-w-4xl items-center">
        {/* SVG animation */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-sm">
          {/* Phase label */}
          <div className="flex items-center justify-between mb-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={phase}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{ background: `${dotColor}20`, color: dotColor }}
              >
                {PHASE_LABELS[phase]}
              </motion.span>
            </AnimatePresence>
            <button
              onClick={startAnimation}
              className="text-xs bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-full font-semibold transition-colors"
            >
              Replay
            </button>
          </div>

          <svg viewBox="0 0 320 280" className="w-full">
            {/* Grid */}
            {[-3, -2, -1, 0, 1, 2, 3].map(i => (
              <g key={i}>
                <line x1={cx + i * sc} y1={10} x2={cx + i * sc} y2={270} stroke="#f1f5f9" strokeWidth="1" />
                <line x1={10} y1={cy + i * sc} x2={310} y2={cy + i * sc} stroke="#f1f5f9" strokeWidth="1" />
              </g>
            ))}
            <line x1={cx} y1={10} x2={cx} y2={270} stroke="#e2e8f0" strokeWidth="1" />
            <line x1={10} y1={cy} x2={310} y2={cy} stroke="#e2e8f0" strokeWidth="1" />

            {/* Ghost: original circle */}
            <polygon
              points={toPolyline(base, cx, cy, sc)}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              strokeDasharray="4,3"
            />

            {/* Animated shape */}
            <polygon
              points={polyline}
              fill={`${strokeColor}12`}
              stroke={strokeColor}
              strokeWidth="2.5"
            />

            {/* Dots */}
            {displayPts.map(([x, y], i) => (
              <circle
                key={i}
                cx={cx + x * sc}
                cy={cy - y * sc}
                r={4}
                fill={dotColor}
                opacity={0.85}
              />
            ))}
          </svg>

          {/* Step progress indicators */}
          <div className="flex gap-2 justify-center mt-2">
            {(['vt', 'sigma', 'u', 'done'] as Phase[]).map(p => (
              <div
                key={p}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  (phase === p || (phase === 'done' && p !== 'done'))
                    ? 'opacity-100'
                    : phase === 'done'
                    ? 'opacity-100'
                    : 'opacity-20'
                }`}
                style={{
                  background: p === 'vt' ? '#a78bfa' : p === 'sigma' ? '#0ea5e9' : '#10b981',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: explanation */}
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-slate-600 text-sm leading-relaxed"
          >
            <p className="text-base font-semibold text-slate-800 mb-2">That's it. That's SVD.</p>
            <p className="mb-2">
              Every matrix — no matter how big or what shape — secretly does exactly these three things.
            </p>
            <p className="text-sky-600 font-semibold text-base">Rotate. Stretch. Rotate back.</p>
            <p className="mt-2 text-slate-500">Now you can see it.</p>
          </motion.div>

          {/* Color-coded formula */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-md border border-sky-200 rounded-xl p-4"
          >
            <p className="text-xs font-semibold text-sky-500 uppercase tracking-wider mb-2">The Formula</p>
            <KaTeXMath tex="A = U \cdot \Sigma \cdot V^T" block />
          </motion.div>

          {/* Three badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-2"
          >
            {[
              { label: 'Vᵀ: Rotate inputs', color: 'violet', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-600' },
              { label: 'Σ: Scale importance', color: 'sky', bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-600' },
              { label: 'U: Rotate outputs', color: 'emerald', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' },
            ].map(({ label, bg, border, text }) => (
              <div key={label} className={`${bg} ${border} border rounded-xl px-4 py-2 flex items-center gap-3`}>
                <div className={`w-2.5 h-2.5 rounded-full ${
                  text.includes('violet') ? 'bg-violet-400' :
                  text.includes('sky') ? 'bg-sky-400' : 'bg-emerald-400'
                }`} />
                <span className={`text-sm font-semibold ${text}`}>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
