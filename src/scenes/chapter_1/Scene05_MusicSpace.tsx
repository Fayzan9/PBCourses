import React from 'react';
import { Music } from 'lucide-react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

export const Scene5_MusicSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'daft', label: 'Daft Punk - One More Time', coords: [90, 15], color: '#7C3AED', details: 'Dance Club Anthem', icon: <Music size={12} /> },
    { id: 'avicii', label: 'Avicii - Levels', coords: [95, 10], color: '#7C3AED', details: 'High-energy electronic synthesizer chords', icon: <Music size={12} /> },
    { id: 'sheeran', label: 'Ed Sheeran - Thinking Out Loud', coords: [20, 85], color: '#059669', details: 'Slow acoustic guitar ballad', icon: <Music size={12} /> },
    { id: 'adele', label: 'Adele - Someone Like You', coords: [15, 90], color: '#059669', details: 'Chill acoustic piano track', icon: <Music size={12} /> },
    { id: 'billie', label: 'Billie Eilish - Bad Guy', coords: [50, 45], color: '#D97706', details: 'Subtle bass, moderate energy pop', icon: <Music size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={points}
          dimensions={['Energy', 'Acousticness']}
          ranges={[[0, 100], [0, 100]]}
          highlightConnections
        />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Music Clustering</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Hover over the points. Notice how similar songs naturally group together in coordinate space.
        </p>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
          💡 This is how recommendation systems propose similar music.
        </p>
      </div>
    </div>
  );
};
