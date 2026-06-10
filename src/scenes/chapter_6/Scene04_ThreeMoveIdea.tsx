import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

// Number of dots in the circle pattern
const NUM_DOTS = 12;
const RADIUS = 60;

// Generate dot positions on a unit circle
const getCircleDots = (r: number) =>
  Array.from({ length: NUM_DOTS }, (_, i) => {
    const angle = (i / NUM_DOTS) * 2 * Math.PI;
    return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
  });

// Step 0 → 1: rotate all dots by an angle (V^T rotation in input space)
// Step 1 → 2: stretch along x-axis (Sigma scaling)
// Step 2 → 3: rotate again (U rotation in output space)
const ROTATE_ANGLE_1 = Math.PI / 5; // ~36 degrees
const STRETCH_X = 2.3;
const STRETCH_Y = 0.55;
const ROTATE_ANGLE_2 = -Math.PI / 4; // ~45 degrees

function transformDot(
  dot: { x: number; y: number },
  phase: number // 0..3 float
): { x: number; y: number } {
  let { x, y } = dot;

  // Phase 1: rotate by ROTATE_ANGLE_1
  if (phase >= 1) {
    const t = Math.min(1, phase - 0);
    const a = ROTATE_ANGLE_1 * t;
    const nx = x * Math.cos(a) - y * Math.sin(a);
    const ny = x * Math.sin(a) + y * Math.cos(a);
    x = nx;
    y = ny;
  }

  // Phase 2: stretch
  if (phase >= 2) {
    const t = Math.min(1, phase - 1);
    const sx = 1 + (STRETCH_X - 1) * t;
    const sy = 1 + (STRETCH_Y - 1) * t;
    x = x * sx;
    y = y * sy;
  }

  // Phase 3: rotate by ROTATE_ANGLE_2
  if (phase >= 3) {
    const t = Math.min(1, phase - 2);
    const a = ROTATE_ANGLE_2 * t;
    const nx = x * Math.cos(a) - y * Math.sin(a);
    const ny = x * Math.sin(a) + y * Math.cos(a);
    x = nx;
    y = ny;
  }

  return { x, y };
}

const STEP_COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b'];
const STEP_LABELS = [
  { label: 'Original circle', sub: 'unit circle of vectors' },
  { label: 'Step 1: Rotate', sub: 'Vᵀ — align with input directions' },
  { label: 'Step 2: Stretch', sub: 'Σ — scale along each axis' },
  { label: 'Step 3: Rotate', sub: 'U — orient to output space' },
];

export const Scene6_4_ThreeMoveIdea: React.FC = () => {
  const [phase, setPhase] = useState(0); // 0..3
  const [animPhase, setAnimPhase] = useState(0); // smooth float

  useEffect(() => {
    // Auto-advance through phases
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Smoothly interpolate animPhase toward phase
  useEffect(() => {
    let raf: number;
    const speed = 0.04;
    const tick = () => {
      setAnimPhase((prev) => {
        const diff = phase - prev;
        if (Math.abs(diff) < 0.005) return phase;
        return prev + diff * speed;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  const baseDots = getCircleDots(RADIUS);
  const dots = baseDots.map((d) => transformDot(d, animPhase));

  const cx = 160;
  const cy = 140;
  const dotColor = STEP_COLORS[Math.round(animPhase)] ?? STEP_COLORS[3];

  // Compute a rough ellipse outline for display
  const pathPoints = dots.map((d, i) => `${i === 0 ? 'M' : 'L'} ${cx + d.x} ${cy + d.y}`).join(' ') + ' Z';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-6 items-start w-full h-full p-4">
      {/* LEFT: Animated SVG */}
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        {/* Step indicator */}
        <div className="flex gap-2 items-center">
          {STEP_LABELS.map((_s, i) => (
            <button
              key={i}
              onClick={() => setPhase(i)}
              className={`transition-all px-3 py-1 rounded-full text-xs font-semibold border ${
                phase === i
                  ? 'text-white border-transparent shadow'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
              }`}
              style={phase === i ? { backgroundColor: STEP_COLORS[i] } : {}}
            >
              {i === 0 ? 'Start' : `Step ${i}`}
            </button>
          ))}
        </div>

        {/* SVG canvas */}
        <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl shadow-sm overflow-hidden">
          <svg width="320" height="280" viewBox="0 0 320 280">
            {/* Grid lines */}
            {[-120, -80, -40, 0, 40, 80, 120].map((v) => (
              <React.Fragment key={v}>
                <line
                  x1={cx + v} y1={10} x2={cx + v} y2={270}
                  stroke="#e2e8f0" strokeWidth={0.8}
                />
                <line
                  x1={10} y1={cy + v} x2={310} y2={cy + v}
                  stroke="#e2e8f0" strokeWidth={0.8}
                />
              </React.Fragment>
            ))}
            {/* Axes */}
            <line x1={cx} y1={10} x2={cx} y2={270} stroke="#94a3b8" strokeWidth={1.2} />
            <line x1={10} y1={cy} x2={310} y2={cy} stroke="#94a3b8" strokeWidth={1.2} />

            {/* Shape outline */}
            <motion.path
              d={pathPoints}
              fill={dotColor}
              fillOpacity={0.08}
              stroke={dotColor}
              strokeWidth={1.5}
              strokeOpacity={0.35}
            />

            {/* Dots */}
            {dots.map((d, i) => (
              <motion.circle
                key={i}
                cx={cx + d.x}
                cy={cy + d.y}
                r={5}
                fill={dotColor}
                fillOpacity={0.85}
                stroke="white"
                strokeWidth={1.5}
              />
            ))}

            {/* Center dot */}
            <circle cx={cx} cy={cy} r={3} fill="#94a3b8" />
          </svg>

          {/* Phase label overlay */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-center px-4 py-1.5 bg-white/90 rounded-full shadow-sm border border-slate-200"
              >
                <p className="text-xs font-bold text-slate-700">{STEP_LABELS[phase].label}</p>
                <p className="text-xs text-slate-400">{STEP_LABELS[phase].sub}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* SVD formula */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-sky-50 border border-sky-200 rounded-xl px-6 py-3 flex flex-col items-center gap-2"
            >
              <KaTeXMath tex="A = U \Sigma V^T" block />
              <div className="flex gap-4 flex-wrap justify-center">
                {[
                  { label: 'Vᵀ', color: 'bg-violet-100 text-violet-700 border-violet-200', desc: 'Rotate input' },
                  { label: 'Σ', color: 'bg-sky-100 text-sky-700 border-sky-200', desc: 'Stretch' },
                  { label: 'U', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', desc: 'Rotate output' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: phase >= i + 1 ? 1 : 0.3, scale: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className={`flex flex-col items-center px-3 py-1.5 rounded-lg border ${item.color}`}
                  >
                    <span className="font-black text-base">{item.label}</span>
                    <span className="text-xs">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* RIGHT: Explanation */}
      <div className="flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sky-500 text-xs font-mono uppercase tracking-widest mb-1">Chapter 6 · SVD</p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight">
            Every Matrix =<br />
            <span className="text-sky-500">3 Simple Moves</span>
          </h2>
        </motion.div>

        {/* Pizza dough analogy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
        >
          <p className="text-amber-800 text-xs font-bold uppercase tracking-wide mb-2">
            Think of it like pizza dough
          </p>
          <div className="space-y-2">
            {[
              { step: '1', emoji: '🔄', text: 'Twist the dough', sub: '(rotate to align)' },
              { step: '2', emoji: '🎚️', text: 'Roll it flat one way', sub: '(stretch along axes)' },
              { step: '3', emoji: '↩️', text: 'Twist to final position', sub: '(rotate to output)' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: phase >= i + 1 || i === 0 ? 1 : 0.4, x: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
                className={`flex items-center gap-2 transition-opacity ${
                  phase >= i + 1 ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <span className={`w-5 h-5 rounded-full text-xs font-black flex items-center justify-center text-white ${
                  phase >= i + 1 ? '' : 'opacity-50'
                }`}
                  style={{ backgroundColor: STEP_COLORS[i + 1] }}
                >
                  {item.step}
                </span>
                <span className="text-base">{item.emoji}</span>
                <div>
                  <span className="text-amber-800 text-xs font-semibold">{item.text}</span>
                  <span className="text-amber-600 text-xs ml-1">{item.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl px-4 py-3"
        >
          <p className="text-slate-700 text-sm font-semibold mb-1">That's SVD.</p>
          <p className="text-slate-600 text-xs leading-relaxed">
            Every single matrix — no matter its shape — does exactly this. Square, tall, wide,
            huge, tiny. Always just 3 moves.
          </p>
        </motion.div>

        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-sky-500 to-cyan-400 rounded-xl px-4 py-3 text-white shadow-md"
            >
              <p className="text-sm font-black">And those 3 moves?</p>
              <p className="text-xs mt-1 opacity-90">
                They tell us everything important about the matrix —
                what directions matter, how much, and where to go.
              </p>
              <p className="text-white text-xs font-bold mt-2 opacity-90">
                That's the magic of SVD.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click prompt */}
        {phase < 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-slate-400 text-xs text-center italic"
          >
            Click the step buttons to walk through the animation
          </motion.p>
        )}
      </div>
    </div>
  );
};
