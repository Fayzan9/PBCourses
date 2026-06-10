import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationSpace, type VisualPoint } from './VisualizationSpace';
import { Camera, Smartphone } from 'lucide-react';

// Grayscale values for an 8x8 Cat image (higher is lighter, 0 is dark background, 1 is face outline/features)
const catGrid = [
  [0.0, 0.0, 0.1, 0.0, 0.0, 0.1, 0.0, 0.0],
  [0.0, 0.8, 0.9, 0.0, 0.0, 0.9, 0.8, 0.0],
  [0.8, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.8],
  [0.9, 0.9, 0.2, 0.9, 0.9, 0.2, 0.9, 0.9],
  [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
  [0.0, 0.9, 0.1, 0.1, 0.1, 0.1, 0.9, 0.0],
  [0.0, 0.8, 0.9, 0.9, 0.9, 0.9, 0.8, 0.0],
  [0.0, 0.0, 0.8, 0.0, 0.0, 0.8, 0.0, 0.0]
];

export const PixelGrid: React.FC = () => {
  const [viewMode, setViewMode] = useState<'image' | 'numbers' | 'vector'>('image');
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  // Flatten cells for vector representation
  const flattenedCells = catGrid.flat();

  // Unified Visual points representing image vectors
  const imagePoints: VisualPoint[] = [
    { id: 'cat-img', label: 'Cat Image Point', coords: [4.5, 7.5], color: '#0284C7', details: 'Coordinates mapped from 64-dim flattened pixel array.', icon: <Smartphone size={12} /> },
    { id: 'dog-img', label: 'Dog Image Point', coords: [5.2, 6.8], color: '#7C3AED', details: 'Dog image mapping close to cat image.', icon: <Smartphone size={12} /> },
    { id: 'truck-img', label: 'Truck Image Point', coords: [8.5, 2.5], color: '#E11D48', details: 'Truck image mapping far from animals.', icon: <Camera size={12} /> }
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[760px] bg-white/70 rounded-2xl border border-slate-200/80 p-6 shadow-md backdrop-blur-xl">
      {/* Mode Controls */}
      <div className="flex gap-2 p-1.5 bg-slate-100/80 rounded-xl border border-slate-200">
        {(['image', 'numbers', 'vector'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all cursor-pointer ${
              viewMode === mode
                ? 'bg-vector text-white shadow shadow-sky-600/30'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {mode === 'vector' ? 'Point in Space' : `${mode} view`}
          </button>
        ))}
      </div>

      <div className="relative w-full min-h-[360px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode !== 'vector' ? (
            <motion.div
              key="grid-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-8 gap-1.5 p-5 bg-slate-50/80 rounded-xl border border-slate-200 shadow-inner w-[320px] h-[320px]"
            >
              {catGrid.map((row, rIdx) =>
                row.map((val, cIdx) => {
                  const isHovered = hoveredCell?.r === rIdx && hoveredCell?.c === cIdx;
                  
                  return (
                    <div
                      key={`cell-${rIdx}-${cIdx}`}
                      onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx })}
                      onMouseLeave={() => setHoveredCell(null)}
                      className="relative flex items-center justify-center rounded-sm transition-all border border-slate-100/60"
                      style={{
                        background: viewMode === 'image' 
                          ? `rgba(2, 132, 199, ${val})` // Light mode vector color alpha mapping
                          : '#F1F5F9',
                      }}
                    >
                      {viewMode === 'numbers' && (
                        <span className="font-mono text-[10px] text-vector font-bold">
                          {val.toFixed(1)}
                        </span>
                      )}
                      {isHovered && (
                        <div className="absolute -top-8 bg-slate-900 border border-slate-850 rounded px-2 py-0.5 text-[10px] text-white whitespace-nowrap z-10 pointer-events-none shadow-md">
                          Val: {val.toFixed(2)}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </motion.div>
          ) : (
            <motion.div
              key="vector-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center w-full gap-5"
            >
              {/* Flattened Array Visualizer collapsing into a coordinate point */}
              <div className="flex flex-wrap justify-center max-w-[500px] gap-1 bg-slate-50 p-4 rounded-lg border border-slate-200">
                {flattenedCells.slice(0, 32).map((val, idx) => (
                  <motion.div
                    key={`flat-cell-${idx}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.005 }}
                    className="w-5 h-5 rounded-sm flex items-center justify-center border border-slate-100"
                    style={{ background: `rgba(2, 132, 199, ${val})` }}
                  />
                ))}
                <span className="text-slate-400 font-mono text-xs flex items-center px-1">...</span>
              </div>

              {/* Arrow transformation path */}
              <div className="text-center flex flex-col items-center">
                <span className="text-slate-500 text-xs font-mono uppercase tracking-wider font-semibold">Flattened 64-Dimensional Array</span>
                <span className="text-transformations font-bold text-lg">↓ collapsed via projection</span>
              </div>

              {/* Standard coordinate space */}
              <div className="w-full max-w-[550px]">
                <VisualizationSpace
                  points={imagePoints}
                  dimensions={['Semantic Dimension 1', 'Semantic Dimension 2']}
                  ranges={[[0, 10], [0, 10]]}
                  showGrid
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default PixelGrid;
