import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene5_7_SolveExample: React.FC = () => {
  // Let the user control the input vector
  const [vX, setVX] = useState<number>(1);
  const [vY, setVY] = useState<number>(1);

  // The Fixed Matrix: M = [[3, 1], [0, 2]]
  const m11 = 3, m12 = 1;
  const m21 = 0, m22 = 2;

  // Real-time calculation of M * v
  const resX = m11 * vX + m12 * vY;
  const resY = m21 * vX + m22 * vY;

  // Mathematical checks
  const isZeroVector = vX === 0 && vY === 0;
  // A vector is an eigenvector if the cross product with its transformation is 0 (meaning they are parallel)
  const isEigenvector = !isZeroVector && (vX * resY === vY * resX);
  
  // Calculate lambda only if it's an eigenvector
  const lambda = isEigenvector ? (vX !== 0 ? resX / vX : resY / vY) : null;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white px-8 py-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-100 pb-4 mb-4 flex-shrink-0">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-indigo-500 font-bold">Chapter 5 · Section 7</p>
          <h2 className="text-2xl font-black text-slate-800 mt-1">
            The Eigenvector Hunt
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Adjust the vector <strong>v</strong>. Watch how the matrix <strong>M</strong> transforms it. 
            Can you find the specific vectors where <strong>Mv</strong> is just a scaled version of <strong>v</strong>?
          </p>
        </div>

        {/* Presets */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button onClick={() => { setVX(1); setVY(1); }} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
            Random Vector
          </button>
          <button onClick={() => { setVX(1); setVY(0); }} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors">
            Try [1, 0]
          </button>
          <button onClick={() => { setVX(-1); setVY(1); }} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors">
            Try [-1, 1]
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        
        {/* Controls */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-8 shadow-sm">
            <div className="text-sm font-black text-slate-700 uppercase tracking-wider">
              Input Vector <KaTeXMath tex="\mathbf{v}" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-1">x = {vX}</span>
                <input 
                  type="range" min="-3" max="3" step="1" value={vX} 
                  onChange={(e) => setVX(parseInt(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold text-slate-400 mb-1">y = {vY}</span>
                <input 
                  type="range" min="-3" max="3" step="1" value={vY} 
                  onChange={(e) => setVY(parseInt(e.target.value))}
                  className="w-24 accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Comparison grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
          
          {/* Left Side: The Transformation */}
          <div className="flex flex-col border border-slate-200 rounded-3xl p-6 bg-white shadow-sm">
            <h3 className="text-sm font-black font-mono text-slate-400 uppercase tracking-wider mb-6 text-center">
              The Transformation (M · v)
            </h3>

            <div className="flex flex-col items-center gap-4 flex-1 justify-center">
              <div className="text-xl font-mono">
                <KaTeXMath tex={`\\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix} \\begin{pmatrix} ${vX} \\\\ ${vY} \\end{pmatrix}`} />
              </div>
              
              <div className="text-slate-300">↓</div>
              
              <div className="text-lg text-slate-600 font-mono bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                <KaTeXMath tex={`\\begin{pmatrix} 3(${vX}) + 1(${vY}) \\\\ 0(${vX}) + 2(${vY}) \\end{pmatrix}`} />
              </div>

              <div className="text-slate-300">↓</div>

              <div className="text-2xl font-black text-slate-800 font-mono bg-slate-100 px-6 py-3 rounded-2xl">
                <KaTeXMath tex={`\\begin{pmatrix} ${resX} \\\\ ${resY} \\end{pmatrix}`} />
              </div>
            </div>
          </div>

          {/* Right Side: The Eigen-Check */}
          <div className={`flex flex-col border-2 rounded-3xl p-6 transition-colors duration-300 ${
            isZeroVector ? 'border-slate-200 bg-slate-50' : 
            isEigenvector ? 'border-emerald-400 bg-emerald-50' : 'border-rose-200 bg-rose-50'
          }`}>
            <h3 className={`text-sm font-black font-mono uppercase tracking-wider mb-6 text-center ${
              isEigenvector ? 'text-emerald-600' : 'text-rose-500'
            }`}>
              {isEigenvector ? "Match Found!" : "Is it an Eigenvector?"}
            </h3>

            <div className="flex flex-col items-center gap-6 flex-1 justify-center text-center">
              
              {isZeroVector ? (
                <p className="text-slate-500 font-medium max-w-xs">
                  The zero vector [0, 0] is excluded by definition. Try another vector!
                </p>
              ) : isEigenvector ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <p className="text-emerald-800 font-bold text-sm max-w-sm">
                    Yes! The resulting vector is perfectly proportional to your input vector. It just got scaled by a scalar <KaTeXMath tex="\lambda" />.
                  </p>
                  
                  <div className="text-2xl font-black font-mono bg-emerald-100 text-emerald-800 px-6 py-3 rounded-2xl flex items-center gap-3">
                    <KaTeXMath tex={`\\begin{pmatrix} ${resX} \\\\ ${resY} \\end{pmatrix} = ${lambda} \\cdot \\begin{pmatrix} ${vX} \\\\ ${vY} \\end{pmatrix}`} />
                  </div>

                  <div className="mt-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-black shadow-md">
                    Eigenvalue λ = {lambda}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key={`${vX}-${vY}`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <p className="text-rose-800 font-bold text-sm max-w-sm">
                    No. There is no single number <KaTeXMath tex="\lambda" /> that you can multiply by <KaTeXMath tex={`[${vX}, ${vY}]`} /> to get <KaTeXMath tex={`[${resX}, ${resY}]`} />.
                  </p>
                  
                  <div className="flex items-center gap-4 opacity-70">
                    <div className="text-sm font-mono bg-white px-3 py-2 rounded-lg border border-rose-200 text-rose-700">
                      X ratio: {vX !== 0 ? (resX / vX).toFixed(2) : 'Undefined'}
                    </div>
                    <span className="text-rose-400 font-black">≠</span>
                    <div className="text-sm font-mono bg-white px-3 py-2 rounded-lg border border-rose-200 text-rose-700">
                      Y ratio: {vY !== 0 ? (resY / vY).toFixed(2) : 'Undefined'}
                    </div>
                  </div>

                  <p className="text-xs text-rose-600 mt-2 font-medium">
                    The matrix completely changed the vector's direction.
                  </p>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Scene5_7_SolveExample;