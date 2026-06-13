import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene7_4_ShiftingSpace: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'shifted'>('idle');

  // SVG Drawing constants
  const W = 400, H = 400, CX = W / 2, CY = H / 2, SC = 60;
  
  // Base points (already transformed by Weight Matrix W from Scene 2)
  // W = [[1.5, 0.5], [-0.5, 1.2]] applied to a 2x2 square
  const transformedPoints = [
    [2, 0.7], [-1, 1.7], [-2, -0.7], [1, -1.7]
  ] as [number, number][];

  // The Bias Vector b
  const biasX = 1.5;
  const biasY = 2.0;

  // Path generator
  const createPath = (points: [number, number][], bx = 0, by = 0) => {
    return points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${CX + (p[0] + bx) * SC} ${CY - (p[1] + by) * SC}`
    ).join(' ') + ' Z';
  };

  const idlePath = createPath(transformedPoints, 0, 0);
  const shiftedPath = createPath(transformedPoints, biasX, biasY);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* LEFT SIDE: Interactive Visualization */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            {/* Background Static Grid (Absolute coordinates) */}
            {[-4,-3,-2,-1,0,1,2,3,4].map(i => (
              <g key={`bg-${i}`}>
                <line x1={CX + i * SC} y1={0} x2={CX + i * SC} y2={H}
                  stroke={i === 0 ? '#e2e8f0' : '#f8fafc'} strokeWidth={i === 0 ? 2 : 1} />
                <line x1={0} y1={CY - i * SC} x2={W} y2={CY - i * SC}
                  stroke={i === 0 ? '#e2e8f0' : '#f8fafc'} strokeWidth={i === 0 ? 2 : 1} />
              </g>
            ))}

            {/* Ghost of pre-bias shape */}
            {phase === 'shifted' && (
              <path
                d={idlePath}
                fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" opacity={0.6}
              />
            )}

            {/* Bias Vector Arrow (Animated) */}
            <AnimatePresence>
              {phase === 'shifted' && (
                <motion.g
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <defs>
                    <marker id="bias-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L0,6 L6,3 Z" fill="#F43F5E" />
                    </marker>
                  </defs>
                  <line 
                    x1={CX} y1={CY} 
                    x2={CX + biasX * SC} y2={CY - biasY * SC}
                    stroke="#F43F5E" strokeWidth="3"
                    markerEnd="url(#bias-arrow)"
                    strokeDasharray="4 2"
                  />
                  <text x={CX + (biasX * SC)/2 - 20} y={CY - (biasY * SC)/2 - 10} fill="#F43F5E" fontSize="14" fontWeight="bold">
                    + b
                  </text>
                </motion.g>
              )}
            </AnimatePresence>

            {/* The Data Shape */}
            <motion.path
              initial={false}
              animate={{ d: phase === 'idle' ? idlePath : shiftedPath }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              fill={phase === 'idle' ? "#4F46E5" : "#F43F5E"}
              fillOpacity={0.2}
              stroke={phase === 'idle' ? "#4F46E5" : "#F43F5E"}
              strokeWidth="3"
            />
            
            {/* Origin Point Indicator */}
            <motion.circle 
              initial={false}
              animate={{
                cx: phase === 'idle' ? CX : CX + biasX * SC,
                cy: phase === 'idle' ? CY : CY - biasY * SC,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
              r={6} 
              fill={phase === 'idle' ? "#3730A3" : "#E11D48"} 
            />
          </svg>

          {/* Equation Overlay Tag */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-sm font-mono text-base font-black text-slate-700">
            {phase === 'idle' ? 'W·x' : 'W·x + b'}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Story & Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-black text-slate-800 leading-tight mb-3"
          >
            The Bias Vector <span className="text-rose-500">+ b</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            A matrix multiplier (<span className="font-mono font-bold">W</span>) leaves the dead center anchored at zero. To move the entire space, we just add a vector.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-rose-50 border border-rose-200 rounded-2xl p-5"
        >
          <p className="text-rose-800 font-bold text-lg mb-2">Translation (Shifting)</p>
          <p className="text-rose-600 font-medium">
            Adding the bias vector <strong>b</strong> lifts the entire coordinate system and drops it somewhere else. This frees the neural network from being tethered to the origin.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 mt-2">
          {phase === 'idle' ? (
            <button
              onClick={() => setPhase('shifted')}
              className="w-full py-4 bg-rose-500 text-white font-black rounded-2xl text-lg hover:bg-rose-600 active:scale-95 transition-all shadow-md"
            >
              Add Bias (+ b) →
            </button>
          ) : (
            <button
              onClick={() => setPhase('idle')}
              className="w-full py-4 bg-slate-100 text-slate-600 font-black rounded-2xl text-lg hover:bg-slate-200 active:scale-95 transition-all border border-slate-300"
            >
              Reset Space
            </button>
          )}

          <AnimatePresence>
            {phase === 'shifted' && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="bg-slate-800 text-white rounded-2xl p-4 text-center mt-2"
              >
                <p className="font-bold">We now have a complete linear layer.</p>
                <p className="text-slate-300 text-sm mt-1 font-mono">
                  y = Wx + b
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};