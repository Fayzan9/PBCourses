import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  id: number;
  baseX: number;
  baseY: number;
}

export const Scene5_6d_WhyEigenvaluesMatter: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);

  // The Transformation Matrix: [[2, 1], [1, 1]]
  // This represents the "squish and stretch" applied to our data.
  const M = { a: 2, b: 1, c: 1, d: 1 };

  // Generate a perfectly round "cloud" of data points
  const points = useMemo<DataPoint[]>(() => {
    const arr: DataPoint[] = [];
    const RADIUS = 80;
    
    // Create a uniform-ish distribution in a circle
    for (let i = 0; i < 200; i++) {
      const r = Math.sqrt(Math.random()) * RADIUS; // sqrt for even distribution
      const theta = Math.random() * 2 * Math.PI;
      arr.push({
        id: i,
        baseX: r * Math.cos(theta),
        baseY: r * Math.sin(theta),
      });
    }
    return arr;
  }, []);

  // Eigenvalues and Eigenvectors for [[2,1],[1,1]]
  const lambda1 = 2.618;
  const lambda2 = 0.382;
  
  // Normalized eigenvectors multiplied by our base radius for visual scale
  const R = 80;
  const v1 = { x: 0.8506 * R, y: 0.5257 * R }; // Dominant direction
  const v2 = { x: -0.5257 * R, y: 0.8506 * R }; // Minor direction

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden px-8 py-6 font-sans">
      
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-blue-600 font-bold">
          Chapter 5 · Real World Intuition
        </p>
        <h2 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
          The Shape of Data
        </h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm">
          Think of a dataset as a perfectly round ball of clay. When a matrix transforms it, the clay stretches. 
          Notice how every point changes direction—except the points on the <strong>Eigenvectors</strong>.
        </p>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT VISUAL: The Data Canvas */}
        <div className="flex-[1.6] flex flex-col items-center">
          <div className="relative w-full flex-1 rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm flex items-center justify-center">
            
            {/* Grid Background */}
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '40px 40px', backgroundPosition: 'center center', opacity: 0.3 }} />
            
            {/* Coordinate Axes */}
            <div className="absolute w-full h-px bg-slate-200" />
            <div className="absolute h-full w-px bg-slate-200" />

            <div className="relative z-10 w-[500px] h-[500px] flex items-center justify-center">
              {/* Data Points */}
              {points.map(p => {
                // Calculate target position after full transformation
                const targetX = M.a * p.baseX + M.b * p.baseY;
                const targetY = M.c * p.baseX + M.d * p.baseY;

                // Interpolate based on slider progress
                const currentX = p.baseX + (targetX - p.baseX) * progress;
                const currentY = p.baseY + (targetY - p.baseY) * progress;

                // Map Cartesian to SVG/Screen coordinates (Y is flipped)
                return (
                  <motion.div
                    key={p.id}
                    className="absolute w-2 h-2 rounded-full bg-slate-400 opacity-60"
                    style={{
                      left: 250 + currentX - 4,
                      top: 250 - currentY - 4,
                    }}
                  />
                );
              })}

              {/* Eigenvector Vectors (SVG overlay) */}
              <svg className="absolute inset-0 pointer-events-none overflow-visible w-full h-full">
                <defs>
                  <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#3B82F6" />
                  </marker>
                  <marker id="arrowRose" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 6 3, 0 6" fill="#F43F5E" />
                  </marker>
                </defs>

                {/* Center dot */}
                <circle cx="250" cy="250" r="4" fill="#0F172A" />

                {/* Dominant Eigenvector (Blue) */}
                <motion.line
                  x1="250"
                  y1="250"
                  x2={250 + v1.x * (1 + (lambda1 - 1) * progress)}
                  y2={250 - v1.y * (1 + (lambda1 - 1) * progress)}
                  stroke="#3B82F6"
                  strokeWidth="4"
                  markerEnd="url(#arrowBlue)"
                />

                {/* Minor Eigenvector (Rose) */}
                <motion.line
                  x1="250"
                  y1="250"
                  x2={250 + v2.x * (1 + (lambda2 - 1) * progress)}
                  y2={250 - v2.y * (1 + (lambda2 - 1) * progress)}
                  stroke="#F43F5E"
                  strokeWidth="4"
                  markerEnd="url(#arrowRose)"
                />
              </svg>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="w-full mt-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <span className="text-sm font-bold text-slate-700">Apply Transformation Matrix</span>
              <span className="text-xl font-black font-mono text-slate-900">{(progress * 100).toFixed(0)}%</span>
            </div>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={progress}
              onChange={(e) => setProgress(parseFloat(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
            />
          </div>
        </div>

        {/* RIGHT PANEL: The Math & Insights */}
        <div className="w-[380px] flex flex-col gap-4">
          
          {/* Component 1 (Dominant) */}
          <div className="bg-blue-50 border border-blue-200 rounded-3xl p-5">
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-wider font-mono font-bold text-blue-600">
                Principal Component 1
              </div>
            </div>
            <div className="text-3xl font-black text-blue-700 mt-1 font-mono">
              λ₁ = 2.62
            </div>
            <p className="text-sm text-blue-900/80 mt-3 leading-relaxed font-medium">
              Look at the blue arrow. As you drag the slider, the vector never rotates—it only stretches. 
              Because λ &gt; 1, this is the axis of <strong>maximum variance</strong>. Most of the data's "information" lives along this line.
            </p>
          </div>

          {/* Component 2 (Minor) */}
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-5">
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-wider font-mono font-bold text-rose-600">
                Minor Component 2
              </div>
            </div>
            <div className="text-3xl font-black text-rose-700 mt-1 font-mono">
              λ₂ = 0.38
            </div>
            <p className="text-sm text-rose-900/80 mt-3 leading-relaxed font-medium">
              Look at the red arrow. It also never rotates, but because λ &lt; 1, it shrinks. 
              The data is squished flat along this axis. In Machine Learning, we often <strong>delete</strong> axes with small eigenvalues to compress files.
            </p>
          </div>

          {/* The Insight Box */}
          <motion.div
            className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl mt-auto"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-blue-400 mb-3 font-bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Machine Learning (PCA)
            </div>
            <p className="leading-relaxed text-sm text-slate-100">
              This visual represents <strong>Principal Component Analysis</strong>.
            </p>
            <div className="my-3 h-px bg-slate-700" />
            <p className="text-xs text-slate-400 leading-relaxed">
              When AI looks at a 10-megapixel face, it doesn't look at 10 million pixels. It calculates the covariance matrix of the image data, finds the largest eigenvectors, and only looks at those dominant axes. The eigenvalues tell the AI which features actually matter.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Scene5_6d_WhyEigenvaluesMatter;