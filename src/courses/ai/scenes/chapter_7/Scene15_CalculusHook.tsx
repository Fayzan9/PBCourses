import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene7_15_CalculusHook: React.FC = () => {
  const [ballX, setBallX] = useState<number>(-2.2); // position on loss curve (-2.5 to 2.5)
  const [descending, setDescending] = useState<boolean>(false);

  // Math helper
  // f(x) = x^2 (loss function)
  // df(x) = 2x (gradient)
  const getLoss = (x: number) => x * x;

  // Run gradient descent steps
  const stepGradientDescent = () => {
    setDescending(true);
    let currentX = ballX;
    
    const interval = setInterval(() => {
      const grad = 2 * currentX;
      // update step
      currentX = currentX - 0.2 * grad; // learning rate = 0.2
      setBallX(currentX);

      if (Math.abs(grad) < 0.05) {
        clearInterval(interval);
        setDescending(false);
      }
    }, 120);
  };

  // SVG dimensions
  const W = 320, H = 180, CX = W / 2, CY = H - 30;
  const scaleX = 50; // px per unit
  const scaleY = 16; // px per unit

  // Generate curve path points
  const makeBowlPath = () => {
    const points: string[] = [];
    for (let x = -2.8; x <= 2.8; x += 0.1) {
      const px = CX + x * scaleX;
      const py = CY - getLoss(x) * scaleY;
      points.push(`${px},${py}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* Left side: Loss Bowl Visual */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-slate-50 border border-slate-200 rounded-3xl p-6 relative">
        <div className="absolute top-4 left-6 flex flex-col">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Loss Landscape</span>
          <span className="text-sm font-black text-rose-600 font-mono">Tuning Weights (W)</span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[280px] bg-white border border-slate-200 rounded-2xl p-2 mt-6 shadow-sm overflow-visible">
          {/* Flat ground axis */}
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />

          {/* Plotted Loss Bowl Curve */}
          <path d={makeBowlPath()} fill="none" stroke="#6366F1" strokeWidth="3" />

          {/* Rolling Ball */}
          <motion.circle
            cx={CX + ballX * scaleX}
            cy={CY - getLoss(ballX) * scaleY - 6} // offset for ball radius
            r="6"
            fill="#EF4444"
            animate={{ 
              cx: CX + ballX * scaleX, 
              cy: CY - getLoss(ballX) * scaleY - 6 
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 12 }}
          />
        </svg>

        {/* Dynamic Parameter readout */}
        <div className="w-full max-w-[280px] mt-4 grid grid-cols-2 gap-3 text-center font-mono">
          <div className="bg-slate-100 rounded-xl py-1.5 border">
            <span className="text-[9px] text-slate-400 font-bold block">Weight Value</span>
            <span className="text-sm font-black text-slate-700">{ballX.toFixed(2)}</span>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl py-1.5">
            <span className="text-[9px] text-rose-500 font-bold block">Loss Error</span>
            <span className="text-sm font-black text-rose-600">{getLoss(ballX).toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Right side: Hook description & Trigger */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-extrabold">What's Next</span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1 mb-2">But How Do We Find W?</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We know a neural layer is an equation: $y = \sigma(Wx + b)$. But how do we compute the absolute perfect configuration of weights ($W$) and biases ($b$) for a massive dataset?
          </p>
          <p className="text-slate-600 text-base leading-relaxed mt-2">
            We measure the model's error (Loss), and use the **derivative gradient** to slide our weights down the bowl to find the minimum error.
          </p>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={stepGradientDescent}
            disabled={descending}
            className="flex-1 py-4 bg-indigo-600 text-white font-black rounded-2xl text-base hover:bg-indigo-700 disabled:bg-indigo-400 active:scale-95 transition-all shadow-md cursor-pointer"
          >
            {descending ? 'Descending...' : 'Run Gradient Descent →'}
          </button>
          
          <button
            onClick={() => setBallX(-2.2)}
            disabled={descending}
            className="px-5 py-4 bg-slate-100 border border-slate-300 text-slate-600 font-black rounded-2xl text-base hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

    </div>
  );
};
