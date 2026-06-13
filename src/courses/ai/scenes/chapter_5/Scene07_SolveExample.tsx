import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Math as KaTeXMath } from '../../components/Math';

export const Scene5_7_SolveExample: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: setup, 1: calculation, 2: result/comparison

  const stepsInfo = [
    { title: 'The Setup', desc: 'Plug in the matrix M, vector v, and eigenvalue λ.' },
    { title: 'Perform the Calculations', desc: 'On the left, do matrix multiplication. On the right, scale the vector by the scalar eigenvalue.' },
    { title: 'Verify the Equality', desc: 'Compare the resulting vectors. Since they are identical, v is indeed an eigenvector.' }
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-white px-8 py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 flex-shrink-0">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Chapter 5 · Section 6</p>
          <h2 className="text-2xl font-black text-slate-800 mt-1">
            Solving the Equation
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Comparing the transformation M·v and scaling λ·v side-by-side.
          </p>
        </div>

        {/* Stepper Dots */}
        <div className="flex gap-2 items-center mt-3 md:mt-0">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                currentStep === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main math area */}
      <div className="flex-1 flex flex-col justify-between w-full max-w-4xl mx-auto px-4 py-2 min-h-0 overflow-y-auto">
        
        {/* Comparison grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
          {/* Left Side: M * v */}
          <div className="flex flex-col items-center border border-slate-100 rounded-3xl p-8 bg-slate-50 shadow-sm">
            <h3 className="text-lg font-black font-mono text-rose-600 mb-6 flex items-center gap-1.5">
              <span>Left Side:</span>
              <span className="px-2.5 py-0.5 bg-rose-100/50 rounded-lg text-rose-700">M · v</span>
            </h3>

            <div className="flex flex-col items-center gap-8 w-full min-h-[220px] justify-start">
              {/* Row 1: Setup */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">1. Substitute values</span>
                <div className="text-xl font-bold bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm font-mono">
                  <KaTeXMath tex="\begin{pmatrix} 3 & 1 \\ 0 & 2 \end{pmatrix} \begin{pmatrix} 1 \\ 0 \end{pmatrix}" />
                </div>
              </div>

              {/* Row 2: Calculation (visible step 1+) */}
              {currentStep >= 1 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="text-slate-400 text-sm font-bold mb-2">↓</div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">2. Row × Column expansion</span>
                  <div className="text-base bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm font-mono">
                    <KaTeXMath tex="\begin{pmatrix} 3(1) + 1(0) \\ 0(1) + 2(0) \end{pmatrix}" />
                  </div>
                </motion.div>
              ) : (
                <div className="h-[76px] w-full" />
              )}

              {/* Row 3: Result (visible step 2) */}
              {currentStep >= 2 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="text-slate-400 text-sm font-bold mb-2">↓</div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">3. Final Vector</span>
                  <div className="text-xl font-black bg-rose-50 border border-rose-200 text-rose-700 px-6 py-3 rounded-2xl shadow-sm font-mono">
                    <KaTeXMath tex="\begin{pmatrix} 3 \\ 0 \end{pmatrix}" />
                  </div>
                </motion.div>
              ) : (
                <div className="h-[84px] w-full" />
              )}
            </div>
          </div>

          {/* Right Side: λ * v */}
          <div className="flex flex-col items-center border border-slate-100 rounded-3xl p-8 bg-slate-50 shadow-sm">
            <h3 className="text-lg font-black font-mono text-emerald-600 mb-6 flex items-center gap-1.5">
              <span>Right Side:</span>
              <span className="px-2.5 py-0.5 bg-emerald-100/50 rounded-lg text-emerald-700">λ · v</span>
            </h3>

            <div className="flex flex-col items-center gap-8 w-full min-h-[220px] justify-start">
              {/* Row 1: Setup */}
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">1. Substitute values</span>
                <div className="text-xl font-bold bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm font-mono">
                  <KaTeXMath tex="3 \cdot \begin{pmatrix} 1 \\ 0 \end{pmatrix}" />
                </div>
              </div>

              {/* Row 2: Calculation */}
              {currentStep >= 1 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="text-slate-400 text-sm font-bold mb-2">↓</div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">2. Scalar distribution</span>
                  <div className="text-base bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm font-mono">
                    <KaTeXMath tex="\begin{pmatrix} 3(1) \\ 3(0) \end{pmatrix}" />
                  </div>
                </motion.div>
              ) : (
                <div className="h-[76px] w-full" />
              )}

              {/* Row 3: Result */}
              {currentStep >= 2 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center w-full"
                >
                  <div className="text-slate-400 text-sm font-bold mb-2">↓</div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-2">3. Final Vector</span>
                  <div className="text-xl font-black bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-3 rounded-2xl shadow-sm font-mono">
                    <KaTeXMath tex="\begin{pmatrix} 3 \\ 0 \end{pmatrix}" />
                  </div>
                </motion.div>
              ) : (
                <div className="h-[84px] w-full" />
              )}
            </div>
          </div>
        </div>

        {/* Verification banner or active step desc */}
        <div className="mt-8 flex flex-col items-center gap-4 w-full">
          <div className="text-center max-w-xl">
            <h4 className="text-base font-black text-slate-800">{stepsInfo[currentStep].title}</h4>
            <p className="text-xs text-slate-500 mt-1">{stepsInfo[currentStep].desc}</p>
          </div>

          {currentStep === 2 && (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-900 text-white rounded-2xl p-5 w-full text-center font-mono shadow-md flex flex-col md:flex-row items-center justify-center gap-4 border border-slate-800"
            >
              <div className="text-lg font-black">
                <KaTeXMath tex="M\mathbf{v} = \lambda\mathbf{v} = \begin{pmatrix} 3 \\ 0 \end{pmatrix}" />
              </div>
              <div className="h-px w-8 bg-slate-700 md:h-8 md:w-px" />
              <div className="text-left text-xs font-sans text-slate-300 max-w-sm">
                Both sides equal the same vector. This confirms that <strong className="text-white">v = [1, 0]ᵀ</strong> is an eigenvector of <strong className="text-white">M</strong> with eigenvalue <strong className="text-white">λ = 3</strong>.
              </div>
            </motion.div>
          )}

          {/* Controls */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                currentStep === 0
                  ? 'border-slate-100 text-slate-300 cursor-not-allowed'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(prev => Math.min(2, prev + 1))}
              disabled={currentStep === 2}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all text-white ${
                currentStep === 2
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800'
              }`}
            >
              {currentStep === 2 ? 'Completed' : 'Next Step'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scene5_7_SolveExample;
