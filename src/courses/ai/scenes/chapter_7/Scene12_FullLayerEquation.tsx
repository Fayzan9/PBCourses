import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type EqTerm = 'y' | 'sigma' | 'W' | 'x' | 'b';

export const Scene7_12_FullLayerEquation: React.FC = () => {
  const [activeTerm, setActiveTerm] = useState<EqTerm | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-4xl mx-auto px-6 gap-8 text-center">
      
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">The Unified Form</span>
        <h2 className="text-4xl font-black text-slate-800 leading-tight mt-1 mb-2">The Neural Layer Equation</h2>
        <p className="text-slate-600 text-base max-w-lg mx-auto">
          Hover over each variable of the equation to see what role it plays inside the neural node network.
        </p>
      </div>

      {/* Equation display container */}
      <div className="bg-slate-900 text-white font-mono p-8 rounded-3xl shadow-xl w-full max-w-xl border border-slate-800 my-4 select-none">
        <p className="text-[10px] tracking-wider text-slate-400 uppercase mb-3">Forward Pass Activation</p>
        <div className="text-4xl md:text-5xl font-black flex items-center justify-center gap-1">
          
          <span 
            onMouseEnter={() => setActiveTerm('y')}
            onMouseLeave={() => setActiveTerm(null)}
            className={`cursor-pointer transition-all duration-200 px-1 rounded ${
              activeTerm === 'y' ? 'text-rose-400 scale-105' : 'text-white'
            }`}
          >
            y
          </span>

          <span>=</span>

          <span 
            onMouseEnter={() => setActiveTerm('sigma')}
            onMouseLeave={() => setActiveTerm(null)}
            className={`cursor-pointer transition-all duration-200 px-1 rounded ${
              activeTerm === 'sigma' ? 'text-cyan-400 scale-105' : 'text-white'
            }`}
          >
            σ
          </span>

          <span>(</span>

          <span 
            onMouseEnter={() => setActiveTerm('W')}
            onMouseLeave={() => setActiveTerm(null)}
            className={`cursor-pointer transition-all duration-200 px-1 rounded ${
              activeTerm === 'W' ? 'text-indigo-400 scale-105' : 'text-white'
            }`}
          >
            W
          </span>

          <span 
            onMouseEnter={() => setActiveTerm('x')}
            onMouseLeave={() => setActiveTerm(null)}
            className={`cursor-pointer transition-all duration-200 px-1 rounded ${
              activeTerm === 'x' ? 'text-amber-400 scale-105' : 'text-slate-400'
            }`}
          >
            x
          </span>

          <span>+</span>

          <span 
            onMouseEnter={() => setActiveTerm('b')}
            onMouseLeave={() => setActiveTerm(null)}
            className={`cursor-pointer transition-all duration-200 px-1 rounded ${
              activeTerm === 'b' ? 'text-emerald-400 scale-105' : 'text-white'
            }`}
          >
            b
          </span>

          <span>)</span>

        </div>
      </div>

      {/* Annotation Box */}
      <div className="min-h-[100px] w-full max-w-xl">
        <AnimatePresence mode="wait">
          {activeTerm === 'y' && (
            <motion.div key="y" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-rose-50 border border-rose-100 rounded-2xl p-4 text-left">
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-rose-600">Output Vector (y)</span>
              <p className="text-slate-600 text-xs font-semibold mt-1">The final prediction coordinates or activations feeding into the subsequent layer of the neural network.</p>
            </motion.div>
          )}
          {activeTerm === 'sigma' && (
            <motion.div key="sigma" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-cyan-50 border border-cyan-100 rounded-2xl p-4 text-left">
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-cyan-600">Non-linear Activation (σ)</span>
              <p className="text-slate-600 text-xs font-semibold mt-1">Functions like ReLU or Sigmoid. They break the straight lines, allowing space to bend, fold, and warp.</p>
            </motion.div>
          )}
          {activeTerm === 'W' && (
            <motion.div key="W" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 text-left">
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-indigo-600">Weight Matrix (W)</span>
              <p className="text-slate-600 text-xs font-semibold mt-1">Holds the stretch, rotation, and shear parameters. Multiplied element-wise with inputs to project coordinates.</p>
            </motion.div>
          )}
          {activeTerm === 'x' && (
            <motion.div key="x" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-amber-50 border border-amber-100 rounded-2xl p-4 text-left">
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-600">Input Vector (x)</span>
              <p className="text-slate-600 text-xs font-semibold mt-1">The incoming feature coordinate. In the very first layer, this represents the raw features (e.g. image pixels or token embeddings).</p>
            </motion.div>
          )}
          {activeTerm === 'b' && (
            <motion.div key="b" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-left">
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-600">Bias Offset Vector (b)</span>
              <p className="text-slate-600 text-xs font-semibold mt-1">Shifts the coordinate frame away from the origin, allowing boundaries to fit datasets that do not cluster at (0,0).</p>
            </motion.div>
          )}
          {!activeTerm && (
            <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-50 border rounded-2xl p-4 text-center">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Hover over any character to inspect its role</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
