import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

export const Scene6_4_CircleToEllipse: React.FC = () => {
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const DURATION = 1600;

  const [phase, setPhase] = useState<'circle' | 'animating' | 'ellipse'>('circle');

  const triggerTransform = () => {
    if (phase !== 'circle') return;
    setPhase('animating');
    startRef.current = null;
    setT(0);
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setT(ease);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('ellipse');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  const W = 480, H = 480, CX = W / 2, CY = H / 2;
  const N = 120;

  // Transformation matrix (2×2 non-square-like stretch)
  const M = [[2.2, 0.8], [0.3, 1.5]] as [[number,number],[number,number]];

  const circlePoints = Array.from({ length: N }, (_, i) => {
    const angle = (i / N) * 2 * Math.PI;
    return [Math.cos(angle), Math.sin(angle)] as [number, number];
  });

  const SC = 78;
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const points = circlePoints.map(([x, y]) => {
    const tx = M[0][0] * x + M[0][1] * y;
    const ty = M[1][0] * x + M[1][1] * y;
    const px = lerp(x, tx, t);
    const py = lerp(y, ty, t);
    return [CX + px * SC, CY - py * SC] as [number, number];
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';

  // Axis lines
  const gridLines = [-3,-2,-1,0,1,2,3];

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
          <rect width={W} height={H} fill="white" rx="16" />
          {gridLines.map(i => (
            <g key={i}>
              <line x1={CX + i * SC} y1={18} x2={CX + i * SC} y2={H - 18}
                stroke={i === 0 ? '#94a3b8' : '#f1f5f9'} strokeWidth={i === 0 ? 1.5 : 0.8} />
              <line x1={18} y1={CY - i * SC} x2={W - 18} y2={CY - i * SC}
                stroke={i === 0 ? '#94a3b8' : '#f1f5f9'} strokeWidth={i === 0 ? 1.5 : 0.8} />
            </g>
          ))}

          {/* Original circle ghost */}
          {phase !== 'circle' && (
            <circle cx={CX} cy={CY} r={SC}
              fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 4" opacity={0.5} />
          )}

          {/* Transforming shape */}
          <motion.path
            d={pathD}
            fill="#0891B2"
            fillOpacity={0.15}
            stroke="#0891B2"
            strokeWidth="2.5"
          />

          {/* Axis labels */}
          {phase === 'circle' && (
            <text x={CX + SC + 6} y={CY - SC + 4} fill="#0891B2" fontSize="12" fontWeight="bold">○ Circle</text>
          )}
          {phase === 'ellipse' && (
            <text x={CX + SC * 2.1 + 6} y={CY - SC * 0.8} fill="#0891B2" fontSize="12" fontWeight="bold">⬭ Ellipse</text>
          )}
        </svg>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            The Rubber Sheet
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Draw a circle on a rubber sheet. Apply a matrix transformation.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4">
            <p className="text-cyan-800 font-black text-base mb-1">The circle becomes an ellipse.</p>
            <p className="text-cyan-600 text-sm font-medium">
              Every point on the circle got stretched differently.<br />
              Some directions stretch a lot. Some barely at all.
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-amber-800 font-bold text-base">
              Why an ellipse?
            </p>
            <p className="text-amber-700 text-sm font-medium mt-1">
              That question is SVD.
            </p>
          </div>

          {phase === 'circle' && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={triggerTransform}
              className="w-full py-4 bg-cyan-600 text-white font-black rounded-2xl text-lg cursor-pointer hover:bg-cyan-700 active:scale-95 transition-all"
            >
              Apply Matrix →
            </motion.button>
          )}

          {phase === 'ellipse' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 text-white rounded-2xl p-4 text-center"
            >
              <p className="font-black text-lg">The matrix has preferences.</p>
              <p className="text-slate-300 text-sm mt-1">It likes certain directions more than others.</p>
            </motion.div>
          )}

          {phase === 'ellipse' && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => { setPhase('circle'); setT(0); }}
              className="w-full py-3 border border-slate-200 text-slate-500 font-bold rounded-2xl text-sm cursor-pointer hover:bg-slate-50 active:scale-95 transition-all"
            >
              Reset
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
