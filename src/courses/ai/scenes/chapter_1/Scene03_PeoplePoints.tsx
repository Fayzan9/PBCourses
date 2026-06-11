import React from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene3_PeoplePoints: React.FC = () => {
  const points: VisualPoint[] = [
    { id: '1', label: 'Alex',    coords: [180, 75], color: '#0284C7', details: 'Alex: Tall, average weight' },
    { id: '2', label: 'Bianca',  coords: [155, 48], color: '#7C3AED', details: 'Bianca: Shorter, lighter' },
    { id: '3', label: 'Charlie', coords: [172, 95], color: '#D97706', details: 'Charlie: Tall, heavier' },
    { id: '4', label: 'Dana',    coords: [162, 62], color: '#059669', details: 'Dana: Medium height and weight' },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Height (cm)', 'Weight (kg)']}
          ranges={[[140, 200], [30, 110]]}
          showGrid
        />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
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
