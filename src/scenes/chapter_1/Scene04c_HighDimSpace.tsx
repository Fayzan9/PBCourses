import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene4c_HighDimSpace: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<'matrix' | 'titanic' | 'toystory'>('matrix');

  const movieVectors = {
    matrix: {
      name: 'The Matrix',
      desc: 'Action Sci-Fi Thriller',
      color: '#E11D48',
      features: [
        { label: 'Action', val: 95 },
        { label: 'Romance', val: 15 },
        { label: 'Comedy', val: 10 },
        { label: 'Sci-Fi', val: 90 },
        { label: 'Horror', val: 20 },
        { label: 'Drama', val: 40 },
        { label: 'Mystery', val: 75 },
        { label: 'Pace', val: 85 },
        { label: 'Musical', val: 0 },
        { label: 'CGI usage', val: 95 },
        { label: 'Suspense', val: 80 },
        { label: 'Explosions', val: 90 }
      ]
    },
    titanic: {
      name: 'Titanic',
      desc: 'Epic Romantic Drama',
      color: '#7C3AED',
      features: [
        { label: 'Action', val: 40 },
        { label: 'Romance', val: 98 },
        { label: 'Comedy', val: 20 },
        { label: 'Sci-Fi', val: 0 },
        { label: 'Horror', val: 10 },
        { label: 'Drama', val: 95 },
        { label: 'Mystery', val: 15 },
        { label: 'Pace', val: 45 },
        { label: 'Musical', val: 10 },
        { label: 'CGI usage', val: 70 },
        { label: 'Suspense', val: 65 },
        { label: 'Explosions', val: 5 }
      ]
    },
    toystory: {
      name: 'Toy Story',
      desc: 'Family Animated Comedy',
      color: '#D97706',
      features: [
        { label: 'Action', val: 35 },
        { label: 'Romance', val: 10 },
        { label: 'Comedy', val: 92 },
        { label: 'Sci-Fi', val: 15 },
        { label: 'Horror', val: 5 },
        { label: 'Drama', val: 30 },
        { label: 'Mystery', val: 20 },
        { label: 'Pace', val: 75 },
        { label: 'Musical', val: 15 },
        { label: 'CGI usage', val: 100 },
        { label: 'Suspense', val: 40 },
        { label: 'Explosions', val: 10 }
      ]
    }
  };

  const movie = movieVectors[selectedMovie];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* 12-Dimensional Bar Profile */}
      <div className="w-full max-w-[540px] bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-5">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg">{movie.name}</h3>
            <span className="text-xs text-slate-400 font-bold">{movie.desc}</span>
          </div>
          <div className="font-mono text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-vector font-bold max-w-[200px] truncate">
            [{movie.features.map(f => f.val).join(', ')}]
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 h-[240px] items-end px-2">
          {movie.features.slice(0, 12).map((feat, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
              <div className="w-full bg-slate-100 rounded-lg h-[80%] relative overflow-hidden flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${feat.val}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="w-full rounded-b-lg"
                  style={{ backgroundColor: movie.color }}
                />
                <span className="absolute bottom-1.5 left-0 right-0 text-center font-mono text-[9px] font-bold text-slate-800 mix-blend-difference">
                  {feat.val}
                </span>
              </div>
              <span className="text-[9px] font-bold text-slate-500 truncate w-full text-center" title={feat.label}>
                {feat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Hyper-Dimensions</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            AI models operate in hundreds of dimensions. We visualize them as profile signatures.
          </p>
        </div>

        <div className="flex flex-col gap-2 bg-slate-100 p-2 rounded-xl border border-slate-200">
          {(Object.keys(movieVectors) as Array<keyof typeof movieVectors>).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedMovie(key)}
              className={`text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex justify-between items-center ${
                selectedMovie === key
                  ? 'bg-white text-slate-800 shadow border border-slate-200/80 font-black'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>{movieVectors[key].name}</span>
              <span className="text-[10px] opacity-60 font-mono">12-D Point</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
