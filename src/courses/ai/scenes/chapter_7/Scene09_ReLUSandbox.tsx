import React, { useState } from 'react';
import { motion } from 'framer-motion';

type FuncMode = 'relu' | 'sigmoid';

export const Scene7_9_ReLUSandbox: React.FC = () => {
  const [mode, setMode] = useState<FuncMode>('relu');
  const [val, setVal] = useState<number>(1.0); // slider input value (-3 to +3)

  // Math helper
  const calculateOutput = (x: number, m: FuncMode): number => {
    if (m === 'relu') {
      return Math.max(0, x);
    }
    return 1 / (1 + Math.exp(-x));
  };

  const outputVal = calculateOutput(val, mode);

  // Graph plotting coordinates helper
  // x goes from -3 to 3 (represented as pixels on screen)
  const W = 280, H = 200, CX = W / 2, CY = H - 40;
  const scaleX = 40; // 40px per unit
  const scaleY = mode === 'relu' ? 40 : 100; // units are different

  const makeGraphPath = () => {
    const points: string[] = [];
    for (let x = -3.5; x <= 3.5; x += 0.1) {
      const y = calculateOutput(x, mode);
      const px = CX + x * scaleX;
      const py = CY - y * scaleY;
      points.push(`${px},${py}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* Left side: Graph Visualizer */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-slate-50 border border-slate-200 rounded-3xl p-6 relative">
        <div className="absolute top-4 left-6 flex flex-col">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Function Graph</span>
          <span className="text-sm font-black text-rose-600 font-mono capitalize">{mode === 'relu' ? 'ReLU(x)' : 'Sigmoid(x)'}</span>
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[320px] bg-white border border-slate-200 rounded-2xl p-2 mt-4 shadow-sm overflow-visible">
          {/* Axis grid */}
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#cbd5e1" strokeWidth="1" />

          {/* Plotted Function Line */}
          <path d={makeGraphPath()} fill="none" stroke="#F43F5E" strokeWidth="3" />

          {/* Active coordinate point dot */}
          <motion.circle
            cx={CX + val * scaleX}
            cy={CY - outputVal * scaleY}
            r="6"
            fill="#E11D48"
            animate={{ cx: CX + val * scaleX, cy: CY - outputVal * scaleY }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          />

          {/* Dynamic values projection lines */}
          <motion.line
            x1={CX + val * scaleX} y1={CY}
            x2={CX + val * scaleX} y2={CY - outputVal * scaleY}
            stroke="#cbd5e1" strokeDasharray="2 2"
            animate={{ x1: CX + val * scaleX, x2: CX + val * scaleX, y2: CY - outputVal * scaleY }}
          />
        </svg>

        {/* Input/Output Display */}
        <div className="w-full max-w-[280px] mt-4 grid grid-cols-2 gap-3 text-center font-mono">
          <div className="bg-slate-100 rounded-xl py-2 border">
            <span className="text-[10px] text-slate-400 font-bold block">Input (x)</span>
            <span className="text-base font-black text-slate-700">{val.toFixed(2)}</span>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl py-2">
            <span className="text-[10px] text-rose-500 font-bold block">Output (y)</span>
            <span className="text-base font-black text-rose-600">{outputVal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Right side: Information & Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-rose-500 font-extrabold">Interactive Sandbox</span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1 mb-2">ReLU vs Sigmoid</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Drag the input slider below to watch how the coordinate is mapped dynamically through the function.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-2">
          <button 
            onClick={() => setMode('relu')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${mode === 'relu' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            ReLU
          </button>
          <button 
            onClick={() => setMode('sigmoid')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${mode === 'sigmoid' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Sigmoid
          </button>
        </div>

        {/* Slider */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2">
          <div className="flex justify-between items-center font-mono text-xs font-bold text-slate-400">
            <span>Input ($x$)</span>
            <span>{val.toFixed(2)}</span>
          </div>
          <input
            type="range" min="-3" max="3" step="0.1" value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="w-full h-2 cursor-pointer bg-slate-100 rounded-lg appearance-none"
          />
        </div>
      </div>

    </div>
  );
};
