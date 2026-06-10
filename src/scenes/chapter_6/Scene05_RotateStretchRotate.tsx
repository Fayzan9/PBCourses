import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene6_5_RotateStretchRotate: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 600),
      setTimeout(() => setStep(2), 1800),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => setStep(4), 4400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const numDots = 16;
  const cx = 200;
  const cy = 200;
  const r = 80;

  // Generate ring of dots
  const originalDots = Array.from({ length: numDots }, (_, i) => {
    const angle = (2 * Math.PI * i) / numDots;
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r };
  });

  // Step 1: Vᵀ rotates input — rotate by 35 degrees
  const vtAngle = (35 * Math.PI) / 180;
  const vtDots = originalDots.map(({ x, y }) => ({
    x: Math.cos(vtAngle) * x - Math.sin(vtAngle) * y,
    y: Math.sin(vtAngle) * x + Math.cos(vtAngle) * y,
  }));

  // Step 2: Σ stretches — sx=1.8, sy=0.6
  const sx = 1.8;
  const sy = 0.55;
  const sigmaDots = vtDots.map(({ x, y }) => ({
    x: x * sx,
    y: y * sy,
  }));

  // Step 3: U rotates output — rotate by -50 degrees
  const uAngle = (-50 * Math.PI) / 180;
  const uDots = sigmaDots.map(({ x, y }) => ({
    x: Math.cos(uAngle) * x - Math.sin(uAngle) * y,
    y: Math.sin(uAngle) * x + Math.cos(uAngle) * y,
  }));

  const getDots = () => {
    if (step === 0) return originalDots;
    if (step === 1) return vtDots;
    if (step === 2) return sigmaDots;
    return uDots;
  };

  const dotColor = () => {
    if (step === 1) return '#8b5cf6'; // violet
    if (step === 2) return '#0ea5e9'; // sky
    if (step >= 3) return '#10b981'; // emerald
    return '#94a3b8'; // slate
  };

  const currentDots = getDots();

  const steps = [
    {
      label: 'Vᵀ · input',
      subtitle: 'Rotate inputs to natural directions',
      color: 'violet',
      bg: 'bg-violet-50',
      border: 'border-violet-200',
      text: 'text-violet-700',
      dot: 'bg-violet-500',
      active: step >= 1,
    },
    {
      label: 'Σ · result',
      subtitle: 'Stretch each direction by its importance',
      color: 'sky',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-700',
      dot: 'bg-sky-500',
      active: step >= 2,
    },
    {
      label: 'U · result',
      subtitle: 'Rotate result to output space',
      color: 'emerald',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      dot: 'bg-emerald-500',
      active: step >= 3,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: SVG Canvas */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Transformation</span>
          <button
            onClick={() => setStep(0)}
            className="text-xs text-slate-400 hover:text-sky-500 transition-colors cursor-pointer px-2 py-1 rounded border border-slate-200 hover:border-sky-300"
          >
            Reset
          </button>
        </div>

        <svg viewBox="0 0 400 400" className="w-full">
          {/* Grid */}
          {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <line x1={cx + i * 40} y1={40} x2={cx + i * 40} y2={360} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={40} y1={cy + i * 40} x2={360} y2={cy + i * 40} stroke="#f1f5f9" strokeWidth="1" />
            </React.Fragment>
          ))}
          {/* Axes */}
          <line x1={40} y1={cy} x2={360} y2={cy} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={cx} y1={40} x2={cx} y2={360} stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Original ring outline (faint) */}
          {step >= 1 && (
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />
          )}

          {/* Animated dots */}
          {originalDots.map((orig, i) => {
            const target = currentDots[i];
            return (
              <motion.circle
                key={i}
                cx={cx + orig.x}
                cy={cy + orig.y}
                r={5}
                fill={dotColor()}
                animate={{
                  cx: cx + target.x,
                  cy: cy + target.y,
                  fill: dotColor(),
                }}
                transition={{ duration: 0.9, ease: 'easeInOut', delay: i * 0.015 }}
              />
            );
          })}

          {/* Step labels on SVG */}
          {step === 0 && (
            <text x={cx} y={cy + r + 22} textAnchor="middle" className="text-xs" fill="#94a3b8" fontSize="12">
              Original ring of points
            </text>
          )}
          {step === 1 && (
            <text x={cx} y={20} textAnchor="middle" fill="#8b5cf6" fontSize="12" fontWeight="600">
              Vᵀ applied — rotated
            </text>
          )}
          {step === 2 && (
            <text x={cx} y={20} textAnchor="middle" fill="#0ea5e9" fontSize="12" fontWeight="600">
              Σ applied — stretched into ellipse
            </text>
          )}
          {step >= 3 && (
            <text x={cx} y={20} textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="600">
              U applied — final orientation
            </text>
          )}
        </svg>

        {/* Step indicators */}
        <div className="flex gap-2 mt-3 justify-center">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i + 1)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                s.active
                  ? `${s.bg} ${s.border} ${s.text}`
                  : 'bg-slate-50 border-slate-200 text-slate-400'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${s.active ? s.dot : 'bg-slate-300'}`} />
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Title, description, formula */}
      <div className="flex flex-col gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-1">Three Steps,<br />One Matrix</h2>
          <p className="text-sm text-slate-500">Every matrix multiplication hides three secret moves.</p>
        </motion.div>

        {/* Color-coded formula */}
        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 shadow-sm text-center"
          >
            <div className="flex items-center justify-center gap-1 text-lg font-bold flex-wrap">
              <span className="text-slate-600">A =</span>
              <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">U</span>
              <span className="text-sky-600 bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-200">Σ</span>
              <span className="text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg border border-violet-200">Vᵀ</span>
            </div>
          </motion.div>
        )}

        {/* Step cards */}
        <div className="flex flex-col gap-3">
          <AnimatePresence>
            {steps.map((s, i) => (
              s.active && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className={`${s.bg} border ${s.border} rounded-xl p-3`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                    <span className={`text-sm font-bold ${s.text}`}>{s.label}</span>
                  </div>
                  <p className={`text-xs ${s.text} opacity-80`}>{s.subtitle}</p>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Descriptions */}
        <div className="flex flex-col gap-2">
          {[
            { color: 'text-violet-600', label: 'Vᵀ', desc: 'Rotate the inputs to their natural directions' },
            { color: 'text-sky-600', label: 'Σ', desc: 'Stretch each direction by its importance' },
            { color: 'text-emerald-600', label: 'U', desc: 'Rotate the result to output space' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: step >= i + 1 ? 1 : 0.25, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-start gap-2"
            >
              <span className={`text-sm font-bold ${item.color} w-5 shrink-0`}>{item.label}</span>
              <span className="text-xs text-slate-600">{item.desc}</span>
            </motion.div>
          ))}
        </div>

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-sky-50 to-emerald-50 border border-sky-200 rounded-xl p-3"
          >
            <p className="text-xs text-slate-700 font-medium text-center">
              Combined, they produce <span className="text-sky-600 font-bold">any transformation imaginable.</span>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
