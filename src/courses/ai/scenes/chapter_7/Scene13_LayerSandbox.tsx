import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ActType = 'linear' | 'relu' | 'sigmoid';

export const Scene7_13_LayerSandbox: React.FC = () => {
  const [w11, setW11] = useState<number>(1.2);
  const [biasX, setBiasX] = useState<number>(0.0);
  const [activation, setActivation] = useState<ActType>('linear');
  const [inputPoint, setInputPoint] = useState<{ x: number; y: number }>({ x: 0.8, y: 0.5 });

  // Grid coordinates constants
  const W = 260, H = 260, CX = W / 2, CY = H / 2, SC = 50;

  // Calculation function
  const applyLayer = (x: number, y: number): { x: number; y: number } => {
    // Linear transformation: W = [[w11, 0.5], [-0.3, 1.0]]
    // bias = [biasX, 0]
    let tx = w11 * x + 0.5 * y + biasX;
    let ty = -0.3 * x + 1.0 * y;

    // Activation
    if (activation === 'relu') {
      tx = Math.max(0, tx);
      ty = Math.max(0, ty);
    } else if (activation === 'sigmoid') {
      tx = 1 / (1 + Math.exp(-tx * 2)) * 2 - 1; // scaled to grid size
      ty = 1 / (1 + Math.exp(-ty * 2)) * 2 - 1;
    }

    return { x: tx, y: ty };
  };

  const outputPoint = applyLayer(inputPoint.x, inputPoint.y);

  // SVG Mouse Click Handler to relocate input point
  const handleSVGClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const coordinateX = (clickX - CX) / SC;
    const coordinateY = -(clickY - CY) / SC;

    setInputPoint({
      x: Math.max(-2, Math.min(2, coordinateX)),
      y: Math.max(-2, Math.min(2, coordinateY))
    });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-8">
      
      {/* Left side: Interactive Coordinate Box */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-slate-50 border border-slate-200 rounded-3xl p-5 relative">
        <div className="absolute top-3 left-5 flex flex-col">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Interactive coordinate grid</span>
          <span className="text-xs font-black text-indigo-600 font-mono">Click anywhere to move input point (x)</span>
        </div>

        <svg 
          viewBox={`0 0 ${W} ${H}`} 
          onClick={handleSVGClick}
          className="w-full max-w-[250px] bg-white border border-slate-200 rounded-2xl p-2 mt-6 shadow-sm overflow-visible cursor-crosshair"
        >
          {/* Grids */}
          {[-2, -1, 0, 1, 2].map((val) => (
            <g key={val}>
              <line x1={CX + val * SC} y1={0} x2={CX + val * SC} y2={H} stroke="#f1f5f9" strokeWidth="1.5" />
              <line x1={0} y1={CY - val * SC} x2={W} y2={CY - val * SC} stroke="#f1f5f9" strokeWidth="1.5" />
            </g>
          ))}
          {/* Origin axis */}
          <line x1={CX} y1={0} x2={CX} y2={H} stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1={0} y1={CY} x2={W} y2={CY} stroke="#cbd5e1" strokeWidth="1.5" />

          {/* Connector line between input and output */}
          <motion.line
            x1={CX + inputPoint.x * SC} y1={CY - inputPoint.y * SC}
            x2={CX + outputPoint.x * SC} y2={CY - outputPoint.y * SC}
            stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3"
            animate={{ 
              x1: CX + inputPoint.x * SC, y1: CY - inputPoint.y * SC,
              x2: CX + outputPoint.x * SC, y2: CY - outputPoint.y * SC 
            }}
          />

          {/* Input Point Dot */}
          <motion.circle
            cx={CX + inputPoint.x * SC}
            cy={CY - inputPoint.y * SC}
            r="8"
            fill="#3B82F6"
            className="shadow-sm"
            animate={{ cx: CX + inputPoint.x * SC, cy: CY - inputPoint.y * SC }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          />

          {/* Output Point Dot */}
          <motion.circle
            cx={CX + outputPoint.x * SC}
            cy={CY - outputPoint.y * SC}
            r="8"
            fill="#EF4444"
            className="shadow-sm"
            animate={{ cx: CX + outputPoint.x * SC, cy: CY - outputPoint.y * SC }}
            transition={{ type: 'spring', stiffness: 120, damping: 15 }}
          />
        </svg>

        {/* Legend */}
        <div className="mt-3 flex gap-4 text-xs font-mono font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
            <span className="text-slate-500">Input X ({inputPoint.x.toFixed(1)}, {inputPoint.y.toFixed(1)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
            <span className="text-slate-500">Output Y ({outputPoint.x.toFixed(1)}, {outputPoint.y.toFixed(1)})</span>
          </div>
        </div>
      </div>

      {/* Right side: Parameters Sliders */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-extrabold">Layer Playground</span>
          <h2 className="text-2xl font-black text-slate-800 leading-tight mt-0.5 mb-1">Build Your First Layer</h2>
        </div>

        {/* Activation Selector */}
        <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1 rounded-xl">
          {(['linear', 'relu', 'sigmoid'] as ActType[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setActivation(mode)}
              className={`py-2 rounded-lg text-xs font-black capitalize transition-all cursor-pointer border ${
                activation === mode
                  ? 'bg-white text-indigo-600 shadow-sm border-slate-200'
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Slider 1: weight w11 */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-1.5">
          <div className="flex justify-between font-mono text-xs font-bold text-slate-400">
            <span>Weight parameter ($w_{11}$)</span>
            <span className="text-indigo-600 font-black">{w11.toFixed(1)}</span>
          </div>
          <input
            type="range" min="-2" max="2" step="0.1" value={w11}
            onChange={(e) => setW11(Number(e.target.value))}
            className="w-full h-2 cursor-pointer bg-slate-100 rounded-lg appearance-none"
          />
        </div>

        {/* Slider 2: biasX */}
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs flex flex-col gap-1.5">
          <div className="flex justify-between font-mono text-xs font-bold text-slate-400">
            <span>Bias offset ($b_x$)</span>
            <span className="text-indigo-600 font-black">{biasX.toFixed(1)}</span>
          </div>
          <input
            type="range" min="-2" max="2" step="0.1" value={biasX}
            onChange={(e) => setBiasX(Number(e.target.value))}
            className="w-full h-2 cursor-pointer bg-slate-100 rounded-lg appearance-none"
          />
        </div>
      </div>

    </div>
  );
};
