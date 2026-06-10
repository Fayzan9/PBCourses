import React from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene3_PeoplePoints: React.FC = () => {
  const points: VisualPoint[] = [
    { id: '1', label: 'Alex', coords: [180, 75], color: '#0284C7', details: 'Alex: Tall, average weight' },
    { id: '2', label: 'Bianca', coords: [160, 50], color: '#7C3AED', details: 'Bianca: Shorter, lighter' },
    { id: '3', label: 'Charlie', coords: [175, 90], color: '#D97706', details: 'Charlie: Tall, heavier' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Height (cm)', 'Weight (kg)']}
          ranges={[[0, 200], [0, 100]]}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">People Become Locations</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Plotted on axes, people become coordinates in space. 
        </p>
        <div className="border-l-4 border-vector pl-4 text-sm text-slate-500 font-medium leading-relaxed italic py-1 bg-slate-100/50 rounded-r">
          Similar people naturally cluster close to each other.
        </div>
      </div>
    </div>
  );
};
