import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ActivationMode = 'linear' | 'relu' | 'sigmoid';

export const Scene7_8_TheSquish: React.FC = () => {
  const [activation, setActivation] = useState<ActivationMode>('linear');

  // Input numbers spaced along a line from -3 to +3
  const inputs = [-3, -2, -1, 0, 1, 2, 3];

  const getOutputValue = (x: number, mode: ActivationMode): number => {
    switch (mode) {
      case 'relu':
        return Math.max(0, x);
      case 'sigmoid':
        return 1 / (1 + Math.exp(-x));
      case 'linear':
      default:
        return x;
    }
  };

  const getPos = (val: number, mode: ActivationMode) => {
    if (mode === 'sigmoid') {
      // Sigmoid maps 0 to 1, scale up for screen coordinates
      return val * 160 - 80;
    }
    // Linear / ReLU map from roughly -3 to 3
    return val * 35;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* Visual Workspace */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-slate-50 border border-slate-200 rounded-3xl p-8 relative min-h-[350px] justify-between">
        
        <div className="absolute top-4 left-6 flex flex-col">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Input-Output Mapping</span>
          <span className="text-sm font-black text-indigo-600 font-mono capitalize">{activation} Mode</span>
        </div>

        {/* Number line visualizer */}
        <div className="w-full relative flex items-center justify-center h-48 mt-8">
          {/* Axis line */}
          <div className="w-full h-[2px] bg-slate-200 absolute" />
          
          {/* Output Marks for Sigmoid (0 to 1) */}
          {activation === 'sigmoid' && (
            <>
              <div className="absolute h-3 w-[1px] bg-slate-400" style={{ left: 'calc(50% - 80px)' }} />
              <span className="absolute text-[10px] font-mono text-slate-400" style={{ left: 'calc(50% - 85px)', top: '55%' }}>0.0</span>
              
              <div className="absolute h-3 w-[1px] bg-slate-400" style={{ left: 'calc(50% + 80px)' }} />
              <span className="absolute text-[10px] font-mono text-slate-400" style={{ left: 'calc(50% + 75px)', top: '55%' }}>1.0</span>
            </>
          )}

          {/* Output Marks for Linear / ReLU */}
          {activation !== 'sigmoid' && (
            <>
              <div className="absolute h-3 w-[1px] bg-slate-400" style={{ left: '50%' }} />
              <span className="absolute text-[10px] font-mono text-slate-400" style={{ left: '50%', transform: 'translateX(-50%)', top: '55%' }}>0</span>
            </>
          )}

          {/* Points traveling along line */}
          {inputs.map((val, idx) => {
            const outVal = getOutputValue(val, activation);
            const xPos = getPos(outVal, activation);

            return (
              <motion.div
                key={idx}
                className="absolute flex flex-col items-center justify-center"
                animate={{ x: xPos }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              >
                {/* Connector line from input */}
                <div className="w-4 h-4 rounded-full bg-indigo-600 flex items-center justify-center text-[9px] text-white font-bold shadow-sm">
                  {val > 0 ? `+${val}` : val}
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 mt-1">
                  {outVal.toFixed(1)}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Formula description */}
        <div className="w-full text-center bg-white border border-slate-200 rounded-2xl py-3 px-4 font-mono text-sm font-black text-slate-700">
          {activation === 'linear' && 'y = x'}
          {activation === 'relu' && 'y = max(0, x)'}
          {activation === 'sigmoid' && 'y = 1 / (1 + e⁻ˣ)'}
        </div>

      </div>

      {/* Story & Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-extrabold">The Activation Function</span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1 mb-2">The Non-Linear Squish</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            By passing outputs through a non-linear activation function, we selectively compress, bend, and clamp our coordinates.
          </p>
        </div>

        {/* Radio selector buttons */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {(['linear', 'relu', 'sigmoid'] as ActivationMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setActivation(mode)}
              className={`py-3 rounded-xl text-xs font-black capitalize transition-all cursor-pointer border ${
                activation === mode
                  ? 'bg-white border-slate-200 text-indigo-600 shadow-sm'
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-2xl p-4 text-xs font-medium leading-relaxed">
          {activation === 'linear' && (
            <p><strong>Linear (No Activation):</strong> Coordinates retain their relative spacing completely. The network remains flat and restricted to drawing straight lines.</p>
          )}
          {activation === 'relu' && (
            <p><strong>ReLU (Rectified Linear Unit):</strong> Any negative input is completely flatlined to zero. This introduces a sharp hinge/fold, allowing neural networks to activate sections of space selectively.</p>
          )}
          {activation === 'sigmoid' && (
            <p><strong>Sigmoid:</strong> Smoothly squashes the entire infinite real line into a probability band between 0 and 1. Extremely useful for binary classification at the final layer.</p>
          )}
        </div>
      </div>

    </div>
  );
};
