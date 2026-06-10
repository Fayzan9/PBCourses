import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_8_WhatIsVt: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1500),
      setTimeout(() => setStep(3), 2700),
      setTimeout(() => setStep(4), 3900),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const cx = 200;
  const cy = 200;
  const axisLen = 120;
  const circleR = 85;

  // V rotation angle: 55 degrees (the "grain" of the data)
  const vAngle = (55 * Math.PI) / 180;

  // Standard basis

  // V column 1 (rose direction)
  const v1 = {
    x: Math.cos(vAngle),
    y: -Math.sin(vAngle), // SVG y flipped
  };
  // V column 2 (amber direction, perpendicular)
  const v2 = {
    x: Math.cos(vAngle + Math.PI / 2),
    y: -Math.sin(vAngle + Math.PI / 2),
  };

  // After Vᵀ rotation: show input space aligned to V directions
  // Vᵀ effectively maps v1 -> e1, v2 -> e2

  // Intermediate: show a ring of points and how they rotate
  const numDots = 12;
  const dotRing = Array.from({ length: numDots }, (_, i) => {
    const a = (2 * Math.PI * i) / numDots;
    return { x: Math.cos(a) * circleR, y: Math.sin(a) * circleR };
  });

  // Rotated dots after Vᵀ
  const rotatedDots = dotRing.map(({ x, y }) => {
    // Rotate by vAngle (Vᵀ aligns V columns to axes)
    return {
      x: Math.cos(-vAngle) * x - Math.sin(-vAngle) * y,
      y: Math.sin(-vAngle) * x + Math.cos(-vAngle) * y,
    };
  });

  const currentDots = step >= 3 ? rotatedDots : dotRing;
  const dotColor = step >= 3 ? '#f43f5e' : '#94a3b8';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: SVG Canvas */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-lg">
        <div className="mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Input Space Rotation</span>
        </div>

        <svg viewBox="0 0 400 400" className="w-full">
          {/* Grid */}
          {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <line x1={cx + i * 40} y1={40} x2={cx + i * 40} y2={360} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={40} y1={cy + i * 40} x2={360} y2={cy + i * 40} stroke="#f1f5f9" strokeWidth="1" />
            </React.Fragment>
          ))}
          {/* Standard axes */}
          <line x1={40} y1={cy} x2={360} y2={cy} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={cx} y1={40} x2={cx} y2={360} stroke="#cbd5e1" strokeWidth="1.5" />
          <text x={362} y={cy + 4} fill="#94a3b8" fontSize="11">x</text>
          <text x={cx + 4} y={36} fill="#94a3b8" fontSize="11">y</text>

          {/* Unit circle */}
          {step >= 1 && (
            <motion.circle
              cx={cx} cy={cy} r={circleR}
              fill="none" stroke="#f1f5f9" strokeWidth="1.5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            />
          )}

          {/* Dot ring */}
          {step >= 2 &&
            dotRing.map((orig, i) => {
              const target = currentDots[i];
              return (
                <motion.circle
                  key={i}
                  cx={cx + orig.x}
                  cy={cy + orig.y}
                  r={4}
                  fill={dotColor}
                  animate={{
                    cx: cx + target.x,
                    cy: cy + target.y,
                    fill: dotColor,
                  }}
                  transition={{ duration: 0.8, ease: 'easeInOut', delay: i * 0.02 }}
                />
              );
            })}

          {/* V column arrows — natural input directions */}
          {step >= 1 && (
            <>
              <motion.line
                x1={cx} y1={cy}
                x2={cx + v1.x * axisLen} y2={cy + v1.y * axisLen}
                stroke="#f43f5e" strokeWidth="3"
                markerEnd="url(#arrowRose)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
              <motion.line
                x1={cx} y1={cy}
                x2={cx + v2.x * axisLen} y2={cy + v2.y * axisLen}
                stroke="#f59e0b" strokeWidth="3"
                markerEnd="url(#arrowAmber)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              />
              <motion.text
                x={cx + v1.x * axisLen + 8} y={cy + v1.y * axisLen + 4}
                fill="#f43f5e" fontSize="12" fontWeight="700"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              >
                v₁
              </motion.text>
              <motion.text
                x={cx + v2.x * axisLen + 8} y={cy + v2.y * axisLen + 4}
                fill="#f59e0b" fontSize="12" fontWeight="700"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              >
                v₂
              </motion.text>
            </>
          )}

          {/* Right angle marker between v1 and v2 */}
          {step >= 1 && (
            <motion.path
              d={`M ${cx + v1.x * 20 + v2.x * 20} ${cy + v1.y * 20 + v2.y * 20}
                  L ${cx + v1.x * 20} ${cy + v1.y * 20}
                  M ${cx + v1.x * 20 + v2.x * 20} ${cy + v1.y * 20 + v2.y * 20}
                  L ${cx + v2.x * 20} ${cy + v2.y * 20}`}
              fill="none" stroke="#94a3b8" strokeWidth="1.5"
              initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.9 }}
            />
          )}

          {/* Rotation arc (Vᵀ action) */}
          {step >= 3 && (
            <motion.path
              d={`M ${cx + 50} ${cy} A 50 50 0 0 1 ${cx + 50 * Math.cos(-vAngle)} ${cy + 50 * Math.sin(-vAngle)}`}
              fill="none" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 3"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}
          {step >= 3 && (
            <motion.text
              x={cx + 58} y={cy - 20}
              fill="#f43f5e" fontSize="10" fontWeight="600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            >
              Vᵀ aligns
            </motion.text>
          )}

          {/* Label */}
          {step >= 4 && (
            <motion.text
              x={cx} y={378}
              textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            >
              V columns = input basis directions
            </motion.text>
          )}

          {/* Arrow markers */}
          <defs>
            <marker id="arrowRose" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f43f5e" />
            </marker>
            <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#f59e0b" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* RIGHT: Explanation */}
      <div className="flex flex-col gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-1">What Is Vᵀ?</h2>
          <p className="text-sm text-slate-500">The input rotation matrix.</p>
        </motion.div>

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-rose-50 border border-rose-200 rounded-xl p-4"
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-rose-600">Vᵀ is a rotation in input space.</span>
              <br />
              V columns are the "natural axes" of your data — the directions that matter most.
            </p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 shadow-sm"
          >
            <ul className="flex flex-col gap-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5 font-bold">v₁</span>
                <span>First V column — direction of <span className="font-semibold">most spread</span> in the data.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5 font-bold">v₂</span>
                <span>Second V column — <span className="font-semibold">perpendicular</span> to v₁, next most spread.</span>
              </li>
            </ul>
            <div className="mt-3">
              <KaTeXMath tex="V^T V = I" block />
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-amber-50 border border-amber-200 rounded-xl p-3"
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl mt-0.5">🪵</span>
              <div>
                <p className="text-xs font-bold text-amber-700 mb-0.5">Cut With the Grain</p>
                <p className="text-xs text-amber-600 leading-relaxed">
                  Think of V as finding the "grain" of the wood. You always want to cut with the grain, not against it. Vᵀ rotates so the stretch happens along the grain.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-rose-50 to-amber-50 border border-rose-200 rounded-xl p-4"
          >
            <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider">V is also orthogonal</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Like U, V columns are perpendicular unit vectors. Vᵀ is a pure rotation — no stretching, no squishing.
            </p>
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="text-xs text-slate-600">v₁ (1st natural direction)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="text-xs text-slate-600">v₂ (2nd natural direction)</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
