import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VisualizationSpace, type VisualPoint } from './VisualizationSpace';
import { Camera, Smartphone } from 'lucide-react';

// Grayscale values for an 8x8 Cat image (higher is lighter)
const catGrayscaleGrid = [
  [0.0, 0.0, 0.1, 0.0, 0.0, 0.1, 0.0, 0.0],
  [0.0, 0.8, 0.9, 0.0, 0.0, 0.9, 0.8, 0.0],
  [0.8, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.8],
  [0.9, 0.9, 0.2, 0.9, 0.9, 0.2, 0.9, 0.9],
  [0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9],
  [0.0, 0.9, 0.1, 0.1, 0.1, 0.1, 0.9, 0.0],
  [0.0, 0.8, 0.9, 0.9, 0.9, 0.9, 0.8, 0.0],
  [0.0, 0.0, 0.8, 0.0, 0.0, 0.8, 0.0, 0.0]
];

// Actual synthetic RGB values for the 8x8 pixels corresponding to a stylized cat image
const catRGBGrid = [
  [[32, 35, 42],   [32, 35, 42],   [70, 72, 80],   [32, 35, 42],   [32, 35, 42],   [70, 72, 80],   [32, 35, 42],   [32, 35, 42]],
  [[32, 35, 42],   [220, 180, 160], [240, 200, 180], [32, 35, 42],   [32, 35, 42],   [240, 200, 180], [220, 180, 160], [32, 35, 42]],
  [[220, 180, 160], [240, 200, 180], [245, 210, 190], [240, 205, 185], [240, 205, 185], [245, 210, 190], [240, 200, 180], [220, 180, 160]],
  [[240, 200, 180], [240, 200, 180], [50, 45, 60],   [245, 210, 190], [245, 210, 190], [50, 45, 60],   [240, 200, 180], [240, 200, 180]],
  [[245, 210, 190], [245, 210, 190], [245, 210, 190], [245, 210, 190], [245, 210, 190], [245, 210, 190], [245, 210, 190], [245, 210, 190]],
  [[32, 35, 42],   [240, 200, 180], [60, 50, 55],   [60, 50, 55],   [60, 50, 55],   [60, 50, 55],   [240, 200, 180], [32, 35, 42]],
  [[32, 35, 42],   [220, 180, 160], [240, 200, 180], [240, 200, 180], [240, 200, 180], [240, 200, 180], [220, 180, 160], [32, 35, 42]],
  [[32, 35, 42],   [32, 35, 42],   [220, 180, 160], [32, 35, 42],   [32, 35, 42],   [220, 180, 160], [32, 35, 42],   [32, 35, 42]]
];

export const PixelGrid: React.FC = () => {
  const [viewMode, setViewMode] = useState<'image' | 'rgb_numbers' | 'vector'>('image');
  const [hoveredCell, setHoveredCell] = useState<{ r: number; c: number } | null>(null);

  // Unified Visual points representing image vectors
  const imagePoints: VisualPoint[] = [
    { id: 'cat-img', label: 'Cat Image Point', coords: [4.5, 7.5], color: '#0284C7', details: 'Coordinates mapped from 64-dim flattened pixel array.', icon: <Smartphone size={12} /> },
    { id: 'dog-img', label: 'Dog Image Point', coords: [5.2, 6.8], color: '#7C3AED', details: 'Dog image mapping close to cat image.', icon: <Smartphone size={12} /> },
    { id: 'truck-img', label: 'Truck Image Point', coords: [8.5, 2.5], color: '#E11D48', details: 'Truck image mapping far from animals.', icon: <Camera size={12} /> }
  ];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-[760px] bg-white/70 rounded-3xl border border-slate-200/80 p-8 shadow-xl backdrop-blur-xl mx-auto justify-center">
      {/* Mode Controls */}
      <div className="flex gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/50 backdrop-blur shrink-0 shadow-inner">
        {(['image', 'rgb_numbers', 'vector'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold capitalize transition-all duration-300 cursor-pointer ${
              viewMode === mode
                ? 'bg-vector text-white shadow shadow-sky-600/30 font-extrabold scale-[1.02]'
                : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
            }`}
          >
            {mode === 'vector' ? 'Point in Space' : mode === 'rgb_numbers' ? 'Show Actual Pixels' : `${mode} view`}
          </button>
        ))}
      </div>

      <div className="relative w-full min-h-[340px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode !== 'vector' ? (
            <motion.div
              key="grid-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg flex items-center justify-center bg-slate-900"
            >
              {/* Real cat photo */}
              <img
                src="/cat_image.png"
                alt="Cat"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  viewMode === 'rgb_numbers' ? 'opacity-10 blur-[2px]' : 'opacity-100'
                }`}
              />

              {/* Numbers overlay representing raw pixels and RGB values */}
              {viewMode === 'rgb_numbers' && (
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0.5 p-1 bg-slate-950/90">
                  {catRGBGrid.map((row, rIdx) =>
                    row.map((rgb, cIdx) => {
                      const isHovered = hoveredCell?.r === rIdx && hoveredCell?.c === cIdx;
                      const [r, g, b] = rgb;
                      // Determine text color for readability against pixel color
                      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                      const textColor = brightness > 125 ? 'text-slate-900' : 'text-slate-100';

                      return (
                        <div
                          key={`cell-${rIdx}-${cIdx}`}
                          onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx })}
                          onMouseLeave={() => setHoveredCell(null)}
                          className="relative flex items-center justify-center rounded-sm transition-all duration-200 cursor-pointer overflow-hidden border border-white/5"
                          style={{
                            backgroundColor: `rgb(${r}, ${g}, ${b})`,
                            boxShadow: isHovered ? 'inset 0 0 0 2px #38bdf8, 0 0 8px #0284c7' : 'none',
                            zIndex: isHovered ? 10 : 1
                          }}
                        >
                          {/* Display average brightness or simplified color code on pixel */}
                          <span className={`font-mono text-[7px] font-black ${textColor} opacity-60 pointer-events-none`}>
                            {Math.round(brightness)}
                          </span>

                          <AnimatePresence>
                            {isHovered && (
                              <motion.div
                                initial={{ opacity: 0, y: 5, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute -top-12 bg-slate-900/95 border border-slate-700/80 rounded-xl px-2.5 py-1.5 text-[9px] text-white whitespace-nowrap z-50 pointer-events-none shadow-2xl flex flex-col items-center gap-0.5 font-mono font-bold"
                              >
                                <span className="text-sky-400 font-extrabold text-[10px]">Pixel ({rIdx},{cIdx})</span>
                                <span className="text-slate-200">RGB: {r}, {g}, {b}</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
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
