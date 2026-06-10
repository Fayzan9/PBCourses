import React from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene8_LanguageSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'cat', label: 'Cat', coords: [2.5, 8.0], color: '#0284C7', details: 'Feline companion' },
    { id: 'dog', label: 'Dog', coords: [3.0, 7.8], color: '#0284C7', details: 'Canine companion' },
    { id: 'tiger', label: 'Tiger', coords: [2.2, 9.2], color: '#0284C7', details: 'Large wild feline' },
    { id: 'car', label: 'Car', coords: [8.5, 2.5], color: '#E11D48', details: '4-wheeled commuter vehicle' },
    { id: 'truck', label: 'Truck', coords: [9.0, 2.2], color: '#E11D48', details: 'Heavy cargo transporter' },
    { id: 'bus', label: 'Bus', coords: [8.2, 3.2], color: '#E11D48', details: 'Mass passenger transit' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Semantic Dimension A', 'Semantic Dimension B']}
          ranges={[[0, 12], [0, 12]]}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
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
