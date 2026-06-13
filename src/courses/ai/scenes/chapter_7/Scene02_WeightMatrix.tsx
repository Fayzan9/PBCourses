import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene7_2_WeightMatrix: React.FC = () => {
  const [phase, setPhase] = useState<'idle' | 'animating' | 'transformed'>('idle');
  const [t, setT] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const DURATION = 2000;

  const triggerTransform = () => {
    if (phase !== 'idle') return;
    setPhase('animating');
    startRef.current = null;
    setT(0);
    
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Smooth ease-in-out
      const ease = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
      setT(ease);
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('transformed');
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const resetTransform = () => {
    setPhase('idle');
    setT(0);
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // SVG Drawing constants
  const W = 400, H = 400, CX = W / 2, CY = H / 2, SC = 80;
  
  // The Weight Matrix W (Stretches and rotates the space)
  const MatrixW = [[1.5, 0.5], [-0.5, 1.2]] as [[number,number],[number,number]];
  
  // Data points (A simple square in input space to show transformation clearly)
  const squarePoints = [
    [1, 1], [-1, 1], [-1, -1], [1, -1]
  ] as [number, number][];

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const points = squarePoints.map(([x, y]) => {
    const tx = MatrixW[0][0] * x + MatrixW[0][1] * y;
    const ty = MatrixW[1][0] * x + MatrixW[1][1] * y;
    const px = lerp(x, tx, t);
    const py = lerp(y, ty, t);
    return [CX + px * SC, CY - py * SC] as [number, number];
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* LEFT SIDE: Interactive Visualization */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="relative w-full aspect-square bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
            {/* Grid lines */}
            {[-4,-3,-2,-1,0,1,2,3,4].map(i => (
              <g key={i}>
                <line x1={CX + i * SC} y1={0} x2={CX + i * SC} y2={H}
                  stroke={i === 0 ? '#94a3b8' : '#f1f5f9'} strokeWidth={i === 0 ? 2 : 1} />
                <line x1={0} y1={CY - i * SC} x2={W} y2={CY - i * SC}
                  stroke={i === 0 ? '#94a3b8' : '#f1f5f9'} strokeWidth={i === 0 ? 2 : 1} />
              </g>
            ))}

            {/* Ghost of original shape */}
            {phase !== 'idle' && (
              <path
                d={squarePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${CX + p[0]*SC} ${CY - p[1]*SC}`).join(' ') + ' Z'}
                fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 4" opacity={0.6}
              />
            )}

            {/* Transforming Data Space */}
            <motion.path
              d={pathD}
              fill="#4F46E5"
              fillOpacity={0.2}
              stroke="#4F46E5"
              strokeWidth="3"
            />
            
            {/* Displaying Data Vectors (Corners) */}
            {points.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r={5} fill="#3730A3" />
            ))}
          </svg>

          {/* Matrix Overlay Tag */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-2 rounded-xl border border-slate-200 shadow-sm font-mono text-sm font-bold text-slate-700">
            {phase === 'idle' ? 'Input Space (x)' : 'Layer Output (W · x)'}
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
            The Weight Matrix <span className="text-indigo-600">W</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-600 text-lg leading-relaxed"
          >
            In deep learning, we constantly hear about an AI's <strong>"weights"</strong>. But what are they actually doing?
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5"
        >
          <p className="text-indigo-800 font-bold text-lg mb-2">They are just transforming space.</p>
          <p className="text-indigo-600 font-medium">
            Just like in Chapter 6, the matrix <strong>W</strong> stretches and rotates the incoming data vector <strong>x</strong> to find new, meaningful patterns.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3 mt-2">
          {phase === 'idle' ? (
            <button
              onClick={triggerTransform}
              className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl text-lg hover:bg-indigo-700 active:scale-95 transition-all shadow-md"
            >
              Apply Weights (Multiply by W) →
            </button>
          ) : (
            <button
              onClick={resetTransform}
              className="w-full py-4 bg-slate-100 text-slate-600 font-black rounded-2xl text-lg hover:bg-slate-200 active:scale-95 transition-all border border-slate-300"
            >
              Reset Input
            </button>
          )}

          <AnimatePresence>
            {phase === 'transformed' && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                className="bg-slate-800 text-white rounded-2xl p-4 text-center mt-2"
              >
                <p className="font-bold">The data has been rotated and stretched.</p>
                <p className="text-slate-300 text-sm mt-1">
                  But wait... the center (0,0) didn't move. We need one more piece.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};