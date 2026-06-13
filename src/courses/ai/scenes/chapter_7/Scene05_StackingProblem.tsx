import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene7_5_StackingProblem: React.FC = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const reset = () => setStep(0);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-6 gap-8">
      
      {/* Header */}
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black text-slate-800 leading-tight mb-3"
        >
          The Problem with <span className="text-amber-500">Lines</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 text-lg"
        >
          To learn complex things, we need a "Deep" Neural Network. <br/>
          So, let's stack multiple layers together.
        </motion.p>
      </div>

      {/* Interactive Equation Builder */}
      <div className="flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-3xl p-10 w-full min-h-[300px] shadow-inner relative overflow-hidden">
        
        <div className="flex items-center gap-4 font-mono text-4xl md:text-5xl font-black text-slate-800 z-10">
          <motion.span layout>y</motion.span>
          <motion.span layout>=</motion.span>
          
          <AnimatePresence mode="popLayout">
            {step >= 3 && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-rose-600"
              >
                W_super
              </motion.span>
            )}

            {step === 2 && (
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, filter: 'blur(10px)' }}
                className="text-amber-600"
              >
                (W₃ W₂ W₁)
              </motion.span>
            )}

            {step <= 1 && (
              <motion.div layout className="flex items-center gap-2">
                {step >= 1 && (
                  <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="text-indigo-600"
                  >
                    W₃ W₂
                  </motion.span>
                )}
                <motion.span layout className="text-cyan-600">W₁</motion.span>
              </motion.div>
            )}
            
            <motion.span layout className="text-slate-400">x</motion.span>
          </AnimatePresence>
        </div>

        {/* Explanatory Annotations */}
        <div className="h-16 mt-6 flex items-center justify-center z-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.p key="s0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-500 font-medium text-center">
                We start with our first layer transforming the data (x).
              </motion.p>
            )}
            {step === 1 && (
              <motion.p key="s1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-indigo-600 font-bold text-center">
                Let's feed the output into a second layer... and a third!
              </motion.p>
            )}
            {step === 2 && (
              <motion.p key="s2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-amber-600 font-bold text-center">
                But wait. Matrix multiplication is associative. <br/>
                We can just multiply the three matrices together first.
              </motion.p>
            )}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-rose-100 text-rose-800 px-6 py-3 rounded-xl border border-rose-200 text-center">
                <p className="font-black">The Fatal Flaw</p>
                <p className="text-sm font-medium mt-1">
                  Multiplying matrices together just creates one single matrix. <br/>
                  A 100-layer network just collapses into a 1-layer network!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Controls */}
      <div className="w-full max-w-sm">
        {step < 3 ? (
          <button
            onClick={nextStep}
            className="w-full py-4 bg-slate-800 text-white font-black rounded-2xl text-lg hover:bg-slate-700 active:scale-95 transition-all shadow-md"
          >
            {step === 0 && "Add More Layers →"}
            {step === 1 && "Group the Matrices →"}
            {step === 2 && "Calculate the Result →"}
          </button>
        ) : (
          <button
            onClick={reset}
            className="w-full py-4 bg-slate-200 text-slate-600 font-black rounded-2xl text-lg hover:bg-slate-300 active:scale-95 transition-all"
          >
            Try Again
          </button>
        )}
      </div>

    </div>
  );
};