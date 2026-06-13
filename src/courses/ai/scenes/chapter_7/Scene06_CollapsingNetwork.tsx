import React, { useState } from 'react';

export const Scene7_6_CollapsingNetwork: React.FC = () => {
  const [mode, setMode] = useState<'split' | 'combined'>('split');

  // Grid constants
  const W = 320, H = 320, CX = W / 2, CY = H / 2, SC = 45;

  // Let's define the points of a simple face/shape in 2D space
  const basePoints = [
    [-1, -1], [1, -1], [1, 1], [-1, 1], // Outer box
    [-0.4, 0.3], [0.4, 0.3], // Eyes
    [-0.5, -0.4], [0, -0.6], [0.5, -0.4] // Smile
  ] as [number, number][];

  // Matrices
  // W1 (rotation 30 degrees + scale)
  // W1 = [[1.2, -0.7], [0.7, 1.2]]
  const transform1 = (p: [number, number]): [number, number] => {
    return [
      p[0] * 1.0 - p[1] * 0.5,
      p[0] * 0.5 + p[1] * 1.0
    ];
  };

  // W2 (shear along X)
  // W2 = [[1.0, 1.0], [0.0, 1.0]]
  const transform2 = (p: [number, number]): [number, number] => {
    return [
      p[0] + p[1] * 0.8,
      p[1]
    ];
  };

  // Combined: transform2(transform1(p))
  const transformCombined = (p: [number, number]): [number, number] => {
    const intermediate = transform1(p);
    return transform2(intermediate);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* Visual Workspace */}
      <div className="w-full md:w-1/2 flex flex-col items-center gap-4">
        {mode === 'split' ? (
          <div className="flex gap-4 items-center">
            {/* Step 1: Input */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Input Space</span>
              <div className="w-32 h-32 bg-white border rounded-2xl relative shadow-sm overflow-hidden flex items-center justify-center">
                {basePoints.map((pt, i) => (
                  <div 
                    key={i} 
                    className="w-2.5 h-2.5 bg-indigo-500 rounded-full absolute" 
                    style={{ left: CX/2 + pt[0]*25 - 5, top: CY/2 - pt[1]*25 - 5 }} 
                  />
                ))}
              </div>
            </div>

            <span className="text-xl font-bold text-slate-300">→</span>

            {/* Step 2: Hidden W1 */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Layer 1 (W₁)</span>
              <div className="w-32 h-32 bg-white border rounded-2xl relative shadow-sm overflow-hidden flex items-center justify-center">
                {basePoints.map((pt, i) => {
                  const t = transform1(pt);
                  return (
                    <div 
                      key={i} 
                      className="w-2.5 h-2.5 bg-cyan-500 rounded-full absolute" 
                      style={{ left: CX/2 + t[0]*25 - 5, top: CY/2 - t[1]*25 - 5 }} 
                    />
                  );
                })}
              </div>
            </div>

            <span className="text-xl font-bold text-slate-300">→</span>

            {/* Step 3: Output W2 */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Layer 2 (W₂)</span>
              <div className="w-32 h-32 bg-white border rounded-2xl relative shadow-sm overflow-hidden flex items-center justify-center">
                {basePoints.map((pt, i) => {
                  const t = transformCombined(pt);
                  return (
                    <div 
                      key={i} 
                      className="w-2.5 h-2.5 bg-rose-500 rounded-full absolute" 
                      style={{ left: CX/2 + t[0]*25 - 5, top: CY/2 - t[1]*25 - 5 }} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4 items-center py-4">
            {/* Direct Combined Path */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Input Space</span>
              <div className="w-40 h-40 bg-white border rounded-2xl relative shadow-sm overflow-hidden flex items-center justify-center">
                {basePoints.map((pt, i) => (
                  <div 
                    key={i} 
                    className="w-3 h-3 bg-indigo-500 rounded-full absolute" 
                    style={{ left: CX/2 + pt[0]*32 - 6, top: CY/2 - pt[1]*32 - 6 }} 
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center text-center px-2">
              <span className="text-sm font-mono font-black text-rose-600">W_combined</span>
              <span className="text-[10px] text-slate-400 font-mono">Direct Path</span>
              <span className="text-2xl font-bold text-slate-300">→</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase mb-1">Output (W_combined · x)</span>
              <div className="w-40 h-40 bg-white border rounded-2xl relative shadow-sm overflow-hidden flex items-center justify-center">
                {basePoints.map((pt, i) => {
                  const t = transformCombined(pt);
                  return (
                    <div 
                      key={i} 
                      className="w-3 h-3 bg-rose-500 rounded-full absolute" 
                      style={{ left: CX/2 + t[0]*32 - 6, top: CY/2 - t[1]*32 - 6 }} 
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex bg-slate-100 p-1 rounded-xl gap-2 mt-2">
          <button 
            onClick={() => setMode('split')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${mode === 'split' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Step-by-Step
          </button>
          <button 
            onClick={() => setMode('combined')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${mode === 'combined' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Combined Matrix
          </button>
        </div>
      </div>

      {/* Story & Context */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-slate-500 font-black">Composition Limit</span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1 mb-2">Linear Algebra Collapses</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            No matter how many millions of linear layers we add, their sequential multiplication resolves down to a single, flat matrix multiplication.
          </p>
          <p className="text-slate-600 text-base leading-relaxed mt-2 font-mono text-sm bg-slate-100 p-3 rounded-xl border border-slate-200">
            W₂ · (W₁ · x) = (W₂ · W₁) · x = W_combined · x
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs font-medium leading-relaxed">
          <strong>⚠️ The Trap:</strong> Without breaking this linearity, "deep learning" would be a useless buzzword. A 1,000-layer network would represent nothing more than a simple linear transformation. We need a way to break the straight lines.
        </div>
      </div>

    </div>
  );
};
