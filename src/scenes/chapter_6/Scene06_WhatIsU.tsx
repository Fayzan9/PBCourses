import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene6_6_WhatIsU: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1400),
      setTimeout(() => setStep(3), 2600),
      setTimeout(() => setStep(4), 3800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const cx = 200;
  const cy = 200;
  const axisLen = 130;
  const circleR = 90;

  // U rotation angle: 42 degrees
  const uAngle = (42 * Math.PI) / 180;

  // Original unit vectors
  const e1 = { x: 1, y: 0 };
  const e2 = { x: 0, y: -1 }; // SVG y-axis flipped

  // Rotated unit vectors by U
  const u1 = {
    x: Math.cos(uAngle) * e1.x - Math.sin(uAngle) * e1.y,
    y: Math.sin(uAngle) * e1.x + Math.cos(uAngle) * e1.y,
  };
  const u2 = {
    x: Math.cos(uAngle) * e2.x - Math.sin(uAngle) * e2.y,
    y: Math.sin(uAngle) * e2.x + Math.cos(uAngle) * e2.y,
  };

  const scale = axisLen;

  // Arc sweep for rotation indication
  const arcR = 45;
  const arcEnd = { x: arcR * Math.cos(-uAngle), y: arcR * Math.sin(-uAngle) };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1.2fr] gap-8 items-start w-full h-full p-4">
      {/* LEFT: SVG Canvas */}
      <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl p-4 shadow-lg">
        <div className="mb-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">U in Action</span>
        </div>

        <svg viewBox="0 0 400 400" className="w-full">
          {/* Background grid */}
          {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
            <React.Fragment key={i}>
              <line x1={cx + i * 40} y1={40} x2={cx + i * 40} y2={360} stroke="#f1f5f9" strokeWidth="1" />
              <line x1={40} y1={cy + i * 40} x2={360} y2={cy + i * 40} stroke="#f1f5f9" strokeWidth="1" />
            </React.Fragment>
          ))}

          {/* Original axes */}
          <line x1={40} y1={cy} x2={360} y2={cy} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={cx} y1={40} x2={cx} y2={360} stroke="#cbd5e1" strokeWidth="1.5" />
          <text x={365} y={cy + 4} fill="#94a3b8" fontSize="11">x</text>
          <text x={cx + 4} y={36} fill="#94a3b8" fontSize="11">y</text>

          {/* Unit circle — stays a circle under U */}
          {step >= 1 && (
            <motion.circle
              cx={cx}
              cy={cy}
              r={circleR}
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
          )}

          {/* Original unit vectors (grey) */}
          {step >= 1 && (
            <>
              <motion.line
                x1={cx} y1={cy}
                x2={cx + scale} y2={cy}
                stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3"
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }}
              />
              <motion.line
                x1={cx} y1={cy}
                x2={cx} y2={cy - scale}
                stroke="#94a3b8" strokeWidth="2" strokeDasharray="6 3"
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }}
              />
              <motion.text x={cx + scale + 4} y={cy + 4} fill="#94a3b8" fontSize="10"
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }}>
                e₁
              </motion.text>
              <motion.text x={cx + 4} y={cy - scale - 4} fill="#94a3b8" fontSize="10"
                initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 0.5 }}>
                e₂
              </motion.text>
            </>
          )}

          {/* Rotation arc */}
          {step >= 2 && (
            <motion.path
              d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 0 0 ${cx + arcEnd.x} ${cy + arcEnd.y}`}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 3"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 1, pathLength: 1 }}
              transition={{ duration: 0.7 }}
            />
          )}
          {step >= 2 && (
            <motion.text
              x={cx + arcR + 8} y={cy - 14}
              fill="#f59e0b" fontSize="11" fontWeight="600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            >
              {Math.round(42)}°
            </motion.text>
          )}

          {/* U-rotated vectors */}
          {step >= 2 && (
            <>
              {/* U column 1 — emerald */}
              <motion.line
                x1={cx} y1={cy}
                x2={cx + u1.x * scale} y2={cy + u1.y * scale}
                stroke="#10b981" strokeWidth="3"
                markerEnd="url(#arrowEmerald)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.7 }}
              />
              {/* U column 2 — sky */}
              <motion.line
                x1={cx} y1={cy}
                x2={cx + u2.x * scale} y2={cy + u2.y * scale}
                stroke="#0ea5e9" strokeWidth="3"
                markerEnd="url(#arrowSky)"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              />
              <motion.text
                x={cx + u1.x * scale + 6} y={cy + u1.y * scale + 4}
                fill="#10b981" fontSize="11" fontWeight="700"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              >
                u₁
              </motion.text>
              <motion.text
                x={cx + u2.x * scale + 6} y={cy + u2.y * scale + 4}
                fill="#0ea5e9" fontSize="11" fontWeight="700"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              >
                u₂
              </motion.text>
            </>
          )}

          {/* Circle remains circle annotation */}
          {step >= 3 && (
            <motion.text
              x={cx - circleR - 8} y={cy - circleR + 12}
              fill="#64748b" fontSize="10" textAnchor="middle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            >
              circle stays
            </motion.text>
          )}
          {step >= 3 && (
            <motion.text
              x={cx - circleR - 8} y={cy - circleR + 24}
              fill="#64748b" fontSize="10" textAnchor="middle"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            >
              a circle!
            </motion.text>
          )}

          {/* Label: output basis */}
          {step >= 4 && (
            <motion.text
              x={cx} y={378}
              textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="600"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
            >
              U columns = output basis directions
            </motion.text>
          )}

          {/* Arrow markers */}
          <defs>
            <marker id="arrowEmerald" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#10b981" />
            </marker>
            <marker id="arrowSky" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#0ea5e9" />
            </marker>
          </defs>
        </svg>
      </div>

      {/* RIGHT: Explanation */}
      <div className="flex flex-col gap-5">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-1">What Is U?</h2>
          <p className="text-sm text-slate-500">The output rotation matrix.</p>
        </motion.div>

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-sky-50 border border-sky-200 rounded-xl p-4"
          >
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-bold text-sky-600">U is a rotation in output space.</span>
              <br />
              Think of it as deciding which way the output axes point.
            </p>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-xl p-4 shadow-sm"
          >
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              U is always a <span className="font-semibold text-slate-800">square matrix</span> (m×m for an m×n original matrix).
              Its columns are like compass directions — perpendicular, unit-length, pointing into output space.
            </p>
            <div className="mt-2">
              <KaTeXMath tex="U^T U = I" block />
            </div>
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-emerald-50 border border-emerald-200 rounded-xl p-3"
          >
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-lg mt-0.5">↻</span>
              <div>
                <p className="text-xs font-bold text-emerald-700 mb-0.5">Pure Spin — No Distortion</p>
                <p className="text-xs text-emerald-600 leading-relaxed">
                  Rotating space never stretches or squishes it. U is a "pure spin" — the circle stays a circle, just tilted.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-sky-50 to-emerald-50 border border-sky-200 rounded-xl p-4"
          >
            <div className="flex gap-3 mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-600">u₁ (column 1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500" />
                <span className="text-xs text-slate-600">u₂ (column 2)</span>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              Each column of U is a unit vector. They're always <span className="font-semibold">perpendicular to each other</span> — like the x and y axis, just rotated.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
