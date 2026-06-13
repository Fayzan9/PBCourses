import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Scene5_6c_WhyEigenvaluesMatter: React.FC = () => {
  const [frequency, setFrequency] = useState<number>(1.5);
  const [time, setTime] = useState<number>(0);

  // Animation loop for continuous wave motion
  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();

    const loop = () => {
      setTime((Date.now() - startTime) / 1000);
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Structural Math Setup
  const EIGENVALUE_1 = 2.0; // The fundamental resonant frequency
  const EIGENVALUE_2 = 4.0; // The second harmonic resonant frequency

  // Calculate resonance multipliers (how close we are to the eigenvalues)
  // They peak at 1 when exact, and fall off quickly.
  const resonance1 = Math.max(0, 1 - Math.abs(frequency - EIGENVALUE_1) * 1.2);
  const resonance2 = Math.max(0, 1 - Math.abs(frequency - EIGENVALUE_2) * 1.2);

  // The base amplitude of the shaking
  const baseShake = Math.max(0.1, 1 - (resonance1 + resonance2));

  // The segments of our skyscraper
  const segments = 8;

  // Calculate the X displacement for a specific floor of the building
  const getFloorDisplacement = (floorIndex: number) => {
    const normalizedHeight = floorIndex / (segments - 1); // 0 at bottom, 1 at top

    // Eigenvector 1: A simple parabolic sway (bending completely to one side)
    const mode1Shape = Math.pow(normalizedHeight, 1.5) * 60; 
    
    // Eigenvector 2: An "S" curve (middle bends one way, top whips the other)
    const mode2Shape = Math.sin(normalizedHeight * Math.PI * 1.5) * 40;

    // Standard non-resonant jitter
    const randomJitter = Math.sin(time * frequency * 10 + floorIndex) * baseShake * 3;

    // Total displacement combines the modes based on resonance
    const displacement1 = mode1Shape * resonance1 * Math.sin(time * EIGENVALUE_1 * Math.PI);
    const displacement2 = mode2Shape * resonance2 * Math.sin(time * EIGENVALUE_2 * Math.PI);

    return displacement1 + displacement2 + randomJitter;
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden px-8 py-6 font-sans">
      
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-bold">
          Chapter 5 · Real World Intuition
        </p>
        <h2 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
          The Skyscraper's Sway
        </h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm">
          Buildings aren't rigid; they are matrices of connected beams. By sending vibrations into the structure, 
          we can expose its hidden eigenvalues (resonant frequencies) and eigenvectors (shapes of bending).
        </p>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT VISUAL: The Skyscraper */}
        <div className="flex-[1.6] flex flex-col items-center">
          <div className="relative w-full flex-1 rounded-3xl border border-slate-200 bg-gradient-to-b from-sky-100 to-white overflow-hidden shadow-sm flex flex-col items-center justify-end pb-8">
            
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-8 bg-slate-800" />

            {/* The Building */}
            <div className="relative w-32 flex flex-col items-center z-10">
              {Array.from({ length: segments }).map((_, i) => {
                // Render from top down, so index 0 is ground (rendered last in DOM, handled by mapping reverse)
                const floorIndex = segments - 1 - i;
                const displacement = getFloorDisplacement(floorIndex);
                
                const bgColor = resonance1 > 0.5 ? 'bg-indigo-500' : 
                                resonance2 > 0.5 ? 'bg-rose-500' : 'bg-slate-400';

                return (
                  <motion.div
                    key={floorIndex}
                    className={`h-10 w-full border-b border-white/20 shadow-sm ${bgColor} ${floorIndex === segments - 1 ? 'rounded-t-lg' : ''}`}
                    style={{
                      transform: `translateX(${displacement}px)`,
                      transition: 'background-color 0.3s ease',
                    }}
                  >
                    {/* Windows */}
                    <div className="flex justify-between px-3 pt-2 opacity-50">
                      <div className="w-2 h-4 bg-white/50 rounded-sm" />
                      <div className="w-2 h-4 bg-white/50 rounded-sm" />
                      <div className="w-2 h-4 bg-white/50 rounded-sm" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Visualizing the "Wind/Force" frequency */}
            <div className="absolute left-8 top-12 flex flex-col gap-2 opacity-60">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                External Force
              </div>
              <svg width="120" height="40">
                <path
                  d={`M 0 20 Q 15 ${20 - 15 * frequency} 30 20 T 60 20 T 90 20 T 120 20`}
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="3"
                  className="animate-pulse"
                />
              </svg>
            </div>

          </div>

          {/* Interactive Controls */}
          <div className="w-full mt-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700">Earthquake / Wind Frequency (Hz)</span>
              <span className="text-xl font-black font-mono text-indigo-600">{frequency.toFixed(1)} Hz</span>
            </div>
            
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(parseFloat(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
            
            <div className="flex justify-between text-[10px] uppercase font-black text-slate-400 mt-[-8px]">
              <span>Random Jitter</span>
              <span className={frequency === EIGENVALUE_1 ? "text-indigo-600" : ""}>Mode 1 (2.0)</span>
              <span className={frequency === EIGENVALUE_2 ? "text-rose-600" : ""}>Mode 2 (4.0)</span>
              <span>Chaos</span>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: The Math & Insights */}
        <div className="w-[380px] flex flex-col gap-4">
          
          {/* Mode 1 */}
          <div className={`border-2 rounded-3xl p-5 transition-colors duration-300 ${resonance1 > 0.5 ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500">
                Fundamental Mode
              </div>
              {resonance1 > 0.8 && (
                <span className="px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded animate-pulse">
                  RESONATING
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-slate-800 mt-1 font-mono">
              λ₁ = 2.0
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              When the wind hits exactly 2.0 Hz, it perfectly matches the first eigenvalue. The building absorbs this energy and bends in the shape of <strong className="text-indigo-600">Eigenvector 1</strong> (a sweeping arc).
            </p>
          </div>

          {/* Mode 2 */}
          <div className={`border-2 rounded-3xl p-5 transition-colors duration-300 ${resonance2 > 0.5 ? 'bg-rose-50 border-rose-400' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500">
                Second Harmonic
              </div>
              {resonance2 > 0.8 && (
                <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded animate-pulse">
                  RESONATING
                </span>
              )}
            </div>
            <div className="text-3xl font-black text-slate-800 mt-1 font-mono">
              λ₂ = 4.0
            </div>
            <p className="text-sm text-slate-600 mt-3 leading-relaxed">
              At 4.0 Hz, a new eigenvalue is triggered. The building stops doing a simple sway and snaps into <strong className="text-rose-600">Eigenvector 2</strong> (an "S" shape where the middle and top move in opposite directions).
            </p>
          </div>

          {/* The Insight Box */}
          <motion.div
            className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl mt-auto"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-indigo-400 mb-3 font-bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              The Formula
            </div>
            <p className="leading-relaxed text-sm text-slate-100">
              In structural engineering, the equation M·v = λ·v literally saves lives. 
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li><strong>The Matrix (A):</strong> The stiffness and mass of the building's steel skeleton.</li>
              <li><strong>The Eigenvalues (λ):</strong> The specific resonant frequencies that cause failure.</li>
              <li><strong>The Eigenvectors (v):</strong> The mode shapes (how the building deforms).</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Scene5_6c_WhyEigenvaluesMatter;