import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Scene7_11_WarpingSpace: React.FC = () => {
  const [warped, setWarped] = useState(false);

  // Screen constants
  const W = 320, H = 320, CX = W / 2, CY = H / 2, SC = 90;

  // XOR point coordinates
  // pt: [x, y], label: 'red' | 'blue'
  const xorPoints = [
    { pt: [0, 0], label: 'blue', name: '(0,0)' },
    { pt: [1, 1], label: 'blue', name: '(1,1)' },
    { pt: [0, 1], label: 'red', name: '(0,1)' },
    { pt: [1, 0], label: 'red', name: '(1,0)' }
  ];

  // Hidden layer mapping for XOR using typical weights
  // h1 = max(0, x + y)
  // h2 = max(0, x + y - 1)
  const getHiddenCoords = (p: number[]): [number, number] => {
    const h1 = Math.max(0, p[0] + p[1]);
    const h2 = Math.max(0, p[0] + p[1] - 1);
    // Let's project them to a nice layout
    return [h1, h2];
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full w-full max-w-5xl mx-auto px-6 gap-10">
      
      {/* Visual representation */}
      <div className="w-full md:w-1/2 flex flex-col items-center bg-slate-50 border border-slate-200 rounded-3xl p-6 relative">
        <div className="absolute top-4 left-6 flex flex-col">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">XOR Classification Space</span>
          <span className="text-sm font-black text-rose-600 font-mono">
            {warped ? 'Transformed (Hidden Layer)' : 'Original Input Space'}
          </span>
        </div>

        <div className="relative w-full aspect-square max-w-[280px] bg-white border border-slate-200 rounded-2xl overflow-hidden mt-6 flex items-center justify-center shadow-sm">
          {/* Axis */}
          <div className="absolute w-full h-[1px] bg-slate-200" style={{ top: CY }} />
          <div className="absolute h-full w-[1px] bg-slate-200" style={{ left: CX }} />

          {/* Decision boundary line */}
          <AnimatePresence>
            {warped && (
              <motion.line
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                exit={{ opacity: 0 }}
                x1={0} y1={CY - 0.5 * SC}
                x2={W} y2={CY - 1.5 * SC}
                stroke="#10B981" strokeWidth="3"
                className="absolute z-10"
              />
            )}
          </AnimatePresence>

          {/* Points */}
          {xorPoints.map((item, idx) => {
            // Calculate screen coordinates
            const currentCoords = warped ? getHiddenCoords(item.pt) : item.pt;
            // Shift coordinates for visualization space centering
            const screenX = CX + (currentCoords[0] - 0.5) * SC;
            const screenY = CY - (currentCoords[1] - 0.5) * SC;

            return (
              <motion.div
                key={idx}
                className="absolute flex flex-col items-center z-20"
                animate={{ x: screenX - 16, y: screenY - 16 }}
                transition={{ type: 'spring', stiffness: 60, damping: 12 }}
              >
                <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-bold text-[10px] text-white shadow-md ${
                  item.label === 'red' ? 'bg-rose-500' : 'bg-indigo-600'
                }`}>
                  {item.name}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex gap-4 text-xs font-mono font-bold">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />
            <span className="text-slate-500">Class 0</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
            <span className="text-slate-500">Class 1</span>
          </div>
          {warped && (
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-[3px] bg-emerald-500 rounded-full" />
              <span className="text-emerald-600">Linear Separator</span>
            </div>
          )}
        </div>
      </div>

      {/* Story side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-extrabold">Learning Complex Shapes</span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mt-1 mb-2">Unlocking the XOR</h2>
          <p className="text-slate-600 text-base leading-relaxed">
            A single straight line cannot separate the red and blue points. This is the famous XOR problem that shut down neural network research in the 1965.
          </p>
          <p className="text-slate-600 text-base leading-relaxed mt-2">
            But a single hidden layer with **ReLU** warps the space. It folds **(1,1)** directly onto **(0,0)**, rendering the groups perfectly separable by a single straight line.
          </p>
        </div>

        <button
          onClick={() => setWarped(!warped)}
          className={`w-full py-4 text-white font-black rounded-2xl text-lg hover:bg-opacity-95 active:scale-95 transition-all shadow-md cursor-pointer ${
            warped ? 'bg-indigo-600' : 'bg-rose-600'
          }`}
        >
          {warped ? 'Show Linear XOR Problem' : 'Solve XOR (Warp Space) →'}
        </button>
      </div>

    </div>
  );
};
