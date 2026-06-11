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
              className="relative w-[320px] h-[320px] rounded-xl overflow-hidden border border-slate-200 shadow-inner"
            >
              {/* Real cat photo */}
              <img
                src="/cat_image.png"
                alt="Cat"
                className={`w-full h-full object-cover transition-all duration-300 ${viewMode === 'numbers' ? 'opacity-20' : 'opacity-100'}`}
              />

              {/* Numbers overlay on top of photo */}
              {viewMode === 'numbers' && (
                <div className="absolute inset-0 grid grid-cols-8 gap-0 p-1">
                  {catGrid.map((row, rIdx) =>
                    row.map((val, cIdx) => {
                      const isHovered = hoveredCell?.r === rIdx && hoveredCell?.c === cIdx;
                      return (
                        <div
                          key={`cell-${rIdx}-${cIdx}`}
                          onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className="relative flex items-center justify-center"
                        >
                          <span className="font-mono text-[9px] text-vector font-black drop-shadow-sm">
                            {val.toFixed(1)}
                          </span>
                          {isHovered && (
                            <div className="absolute -top-6 bg-slate-900 rounded px-1.5 py-0.5 text-[9px] text-white whitespace-nowrap z-10 pointer-events-none shadow">
                              {val.toFixed(2)}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="vector-container"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <VisualizationSpace
                points={imagePoints}
                dimensions={['Semantic Dimension 1', 'Semantic Dimension 2']}
                ranges={[[3, 10], [1, 9]]}
                showGrid
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
