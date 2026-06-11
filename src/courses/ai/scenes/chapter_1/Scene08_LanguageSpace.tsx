import React from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene8_LanguageSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'cat',   label: 'Cat',   coords: [2.5, 8.0], color: '#0284C7', details: 'Feline companion' },
    { id: 'dog',   label: 'Dog',   coords: [3.2, 7.4], color: '#0284C7', details: 'Canine companion' },
    { id: 'tiger', label: 'Tiger', coords: [1.8, 9.0], color: '#0284C7', details: 'Large wild feline' },
    { id: 'car',   label: 'Car',   coords: [8.5, 2.5], color: '#E11D48', details: '4-wheeled commuter vehicle' },
    { id: 'truck', label: 'Truck', coords: [9.2, 1.8], color: '#E11D48', details: 'Heavy cargo transporter' },
    { id: 'bus',   label: 'Bus',   coords: [7.8, 3.2], color: '#E11D48', details: 'Mass passenger transit' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Semantic Dimension A', 'Semantic Dimension B']}
          ranges={[[1, 11], [1, 11]]}
          showGrid
        />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Language Space</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Words with similar meanings reside close together.
        </p>
        <p className="text-slate-500 text-sm font-medium">
          Notice the animal cluster grouped on the top-left and the vehicle cluster grouped on the bottom-right.
        </p>
      </div>
    </div>
  );
};
