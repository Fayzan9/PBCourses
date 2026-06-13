import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CrowdPerson {
  id: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  group: 'dominant' | 'fading';
}

export const Scene5_6b_WhyEigenvaluesMatter: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-play logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev >= 5) {
            setIsPlaying(false);
            return 5; // Max time steps
          }
          return prev + 0.05; // Smooth increment
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Generate the crowd with stable target vectors
  const people = useMemo<CrowdPerson[]>(() => {
    const arr: CrowdPerson[] = [];
    for (let i = 0; i < 200; i++) {
      const isDominant = i < 120;
      // Start everyone somewhat centralized
      const startX = 150 + Math.random() * 400;
      const startY = 150 + Math.random() * 200;

      arr.push({
        id: i,
        startX,
        startY,
        // Dominant group flows towards the top right (EXIT)
        targetX: isDominant ? startX + 300 : startX + (Math.random() * 100 - 50),
        targetY: isDominant ? startY - 200 : startY + (Math.random() * 100 - 50),
        group: isDominant ? 'dominant' : 'fading',
      });
    }
    return arr;
  }, []);

  // Mathematical Evaluation
  // lambda1 = 4, lambda2 = 0.5
  // Over time t, their magnitudes scale by lambda^t
  const dominantMagnitude = Math.pow(4, time);
  const fadingMagnitude = Math.pow(0.5, time);
  
  const totalMagnitude = dominantMagnitude + fadingMagnitude;
  
  // Calculate relative importance (0 to 1)
  const dominantImportance = dominantMagnitude / totalMagnitude;
  const fadingImportance = fadingMagnitude / totalMagnitude;

  // Visual scaling limits so things don't blow up infinitely on screen
  const dominantProgress = Math.min(1, time / 5);
  const fadingProgress = Math.min(1, time / 2);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden px-8 py-6 font-sans">
      
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
          Chapter 5 · Why Eigenvalues Matter
        </p>
        <h2 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
          The Stadium Crowd
        </h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm">
          Imagine a crowd leaving a stadium. Everyone starts as a mixture of different movements. 
          Watch how repeated transformations cause the dominant eigenvector (Direction A) to overpower everything else.
        </p>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT VISUAL: The Stadium */}
        <div className="flex-[1.6] flex flex-col">
          <div className="relative w-full flex-1 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex items-center justify-center">
            
            {/* Stadium Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.15]">
              <div className="absolute w-[80%] h-[80%] rounded-[100%] border-2 border-slate-400" />
              <div className="absolute w-[60%] h-[60%] rounded-[100%] border-2 border-slate-400" />
              <div className="absolute w-[40%] h-[40%] rounded-[100%] border-2 border-slate-400" />
              <div className="absolute w-[20%] h-[20%] rounded-[100%] border-2 border-emerald-400 bg-emerald-50 opacity-20" />
            </div>

            {/* Exit Funnel */}
            <div className="absolute right-6 top-6 z-20 flex flex-col items-end">
              <motion.div 
                animate={{ scale: time > 2 ? [1, 1.05, 1] : 1 }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="px-6 py-3 rounded-2xl bg-emerald-500 text-white font-black shadow-lg shadow-emerald-500/30 tracking-wider"
              >
                EXIT →
              </motion.div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mt-2 mr-2">
                Eigenvector 1
              </div>
            </div>

            {/* Crowd Particles */}
            <div className="absolute inset-0 z-10">
              {people.map((p) => {
                const isDom = p.group === 'dominant';
                
                // Calculate current position based on time interpolation
                const currentX = p.startX + (p.targetX - p.startX) * (isDom ? dominantProgress : fadingProgress);
                const currentY = p.startY + (p.targetY - p.startY) * (isDom ? dominantProgress : fadingProgress);

                return (
                  <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${
                      isDom ? 'bg-emerald-500 shadow-sm shadow-emerald-500/50' : 'bg-slate-400'
                    }`}
                    style={{
                      width: isDom ? 8 : 6,
                      height: isDom ? 8 : 6,
                    }}
                    animate={{
                      x: currentX,
                      y: currentY,
                      opacity: isDom ? 1 : Math.max(0.1, 1 - fadingProgress * 1.5),
                      scale: isDom ? 1 + (time * 0.2) : Math.max(0, 1 - time * 0.4),
                    }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
                  />
                );
              })}
            </div>

            {/* Dominant Flow Guide Vector */}
            <AnimatePresence>
              {time > 1 && (
                <motion.div
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{ opacity: 1, pathLength: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none z-0"
                >
                  <svg className="w-full h-full">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" opacity="0.3"/>
                      </marker>
                    </defs>
                    <motion.path
                      d="M 250 350 Q 400 250 650 100"
                      stroke="#10B981"
                      strokeWidth="40"
                      fill="none"
                      strokeLinecap="round"
                      opacity="0.1"
                      markerEnd="url(#arrowhead)"
                    />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Interactive Controls */}
          <div className="flex items-center gap-6 mt-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <button
              onClick={() => {
                if (time >= 5) setTime(0);
                setIsPlaying(!isPlaying);
              }}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-colors ${
                isPlaying ? 'bg-rose-100 text-rose-600' : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1"><path d="M5 3l14 9-14 9V3z"/></svg>
              )}
            </button>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Time Step: 0</span>
                <span>t = {time.toFixed(1)}</span>
                <span>5</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.05"
                value={time}
                onChange={(e) => {
                  setIsPlaying(false);
                  setTime(parseFloat(e.target.value));
                }}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
            
            <button 
              onClick={() => { setTime(0); setIsPlaying(false); }}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 uppercase tracking-wider px-2"
            >
              Reset
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: The Math & Insights */}
        <div className="w-[380px] flex flex-col gap-4">
          
          {/* Dominant Vector Stat */}
          <div className="bg-emerald-50/50 border border-emerald-200 rounded-3xl p-5 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-emerald-400" />
            <div className="text-xs uppercase tracking-wider font-mono font-bold text-emerald-600">
              Direction A (Dominant)
            </div>
            <div className="text-4xl font-black text-emerald-700 mt-1 font-mono">
              λ = 4
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                <span>Relative Importance</span>
                <span className="font-mono">{(dominantImportance * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-emerald-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500"
                  animate={{ width: `${dominantImportance * 100}%` }}
                  transition={{ type: 'spring', bounce: 0 }}
                />
              </div>
            </div>
            <p className="text-sm text-emerald-800 mt-4 leading-relaxed font-medium">
              Scales by $4^t$. Because λ &gt; 1, this direction explodes in magnitude, dominating the space.
            </p>
          </div>

          {/* Fading Vector Stat */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1 bg-slate-300" />
            <div className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500">
              Direction B (Fading)
            </div>
            <div className="text-4xl font-black text-slate-700 mt-1 font-mono">
              λ = 0.5
            </div>
            <div className="mt-5">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                <span>Relative Importance</span>
                <span className="font-mono">{(fadingImportance * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-slate-400"
                  animate={{ width: `${fadingImportance * 100}%` }}
                  transition={{ type: 'spring', bounce: 0 }}
                />
              </div>
            </div>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Scales by $0.5^t$. Because λ &lt; 1, this component shrinks toward zero. It mathematically vanishes.
            </p>
          </div>

          {/* The Insight Box */}
          <motion.div
            animate={{ 
              backgroundColor: time > 3 ? '#0F172A' : '#1E293B',
              scale: time > 3.5 ? [1, 1.02, 1] : 1
            }}
            className="text-white rounded-3xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-emerald-400 mb-3 font-bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              The Aha Moment
            </div>
            <p className="leading-relaxed text-sm text-slate-100 font-medium">
              If you apply a transformation matrix over and over, the vector space stretches along the eigenvector with the largest absolute eigenvalue.
            </p>
            <div className="my-4 h-px bg-slate-700" />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase">Google</div>
                <div className="text-xs font-bold text-white mt-0.5">PageRank</div>
              </div>
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase">Physics</div>
                <div className="text-xs font-bold text-white mt-0.5">Resonance</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Scene5_6b_WhyEigenvaluesMatter;