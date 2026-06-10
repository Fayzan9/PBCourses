import React, { useState } from 'react';
import { Film, Sparkles } from 'lucide-react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene4_MovieSpace: React.FC = () => {
  const [action, setAction] = useState(70);
  const [comedy, setComedy] = useState(30);

  const points: VisualPoint[] = [
    { id: 'matrix', label: 'The Matrix', coords: [90, 10], color: '#E11D48', details: 'High Action, Very Low Comedy', icon: <Film size={12} /> },
    { id: 'superbad', label: 'Superbad', coords: [10, 95], color: '#0284C7', details: 'Zero Action, Maximum Comedy', icon: <Film size={12} /> },
    { id: 'toystory', label: 'Toy Story', coords: [40, 75], color: '#D97706', details: 'Balanced Action and High Comedy', icon: <Film size={12} /> },
    { id: 'yourmovie', label: 'Your Custom Movie', coords: [action, comedy], color: '#059669', details: 'Adjust sliders to move this point!', icon: <Sparkles size={12} /> }
  ];

  const handleDragMovie = (newCoords: number[]) => {
    setAction(Math.round(newCoords[0]));
    setComedy(Math.round(newCoords[1]));
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          showVectors
          draggablePointId="yourmovie"
          onDragPoint={handleDragMovie}
        />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Movie Space</h2>
          <p className="text-slate-600 text-sm">
            Drag the sliders to see your custom movie travel dynamically through coordinate space.
          </p>
        </div>

        {/* Sliders Container */}
        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Action Score</span>
              <span className="text-loss">{action}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={action}
              onChange={(e) => setAction(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Comedy Score</span>
              <span className="text-vector">{comedy}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={comedy}
              onChange={(e) => setComedy(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
