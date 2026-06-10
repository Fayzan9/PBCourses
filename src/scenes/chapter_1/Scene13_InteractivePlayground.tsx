import React, { useState } from 'react';
import { VisualizationSpace, type VisualPoint } from '../../components/VisualizationSpace';

type VectorType = 'person' | 'movie' | 'song' | 'product' | 'protein';

export const Scene13_InteractivePlayground: React.FC = () => {
  const [selectedType, setSelectedType] = useState<VectorType>('person');
  const [coordA, setCoordA] = useState(50);
  const [coordB, setCoordB] = useState(50);

  const configurations = {
    person: {
      title: 'Person Vector',
      dimLabels: ['Height (cm)', 'Weight (kg)'],
      dimRanges: [[0, 220], [0, 130]] as [number, number][],
      desc: 'Mapping physical features as space locations.',
      coordsMap: (a: number, b: number) => [
        (a / 100) * 220,
        (b / 100) * 130
      ]
    },
    movie: {
      title: 'Movie Vector',
      dimLabels: ['Action Rating', 'Romance Rating'],
      dimRanges: [[0, 100], [0, 100]] as [number, number][],
      desc: 'Plotting cinematic genres.',
      coordsMap: (a: number, b: number) => [a, b]
    },
    song: {
      title: 'Song Vector',
      dimLabels: ['Danceability', 'Acousticness'],
      dimRanges: [[0, 100], [0, 100]] as [number, number][],
      desc: 'Identifying musical traits for recommendation.',
      coordsMap: (a: number, b: number) => [a, b]
    },
    product: {
      title: 'Product Vector',
      dimLabels: ['Price ($)', 'Weight (g)'],
      dimRanges: [[0, 2000], [0, 2500]] as [number, number][],
      desc: 'Classifying hardware components.',
      coordsMap: (a: number, b: number) => [
        (a / 100) * 2000,
        (b / 100) * 2500
      ]
    },
    protein: {
      title: 'Protein Vector',
      dimLabels: ['Charge (pH)', 'Hydrophobicity'],
      dimRanges: [[0, 14], [0, 1]] as [number, number][],
      desc: 'Mapping cellular biology into ML structures.',
      coordsMap: (a: number, b: number) => [
        (a / 100) * 14,
        (b / 100)
      ]
    }
  };

  const config = configurations[selectedType];
  const mappedCoords = config.coordsMap(coordA, coordB);

  const currentPoints: VisualPoint[] = [
    {
      id: 'custom-playground-point',
      label: `Vector Location`,
      coords: mappedCoords,
      color: '#0284C7',
      details: `${config.title} point`
    }
  ];

  const handleDragPlayground = (newCoords: number[]) => {
    const [mathX, mathY] = newCoords;
    let valA = 50;
    let valB = 50;

    if (selectedType === 'person') {
      valA = (mathX / 220) * 100;
      valB = (mathY / 130) * 100;
    } else if (selectedType === 'movie' || selectedType === 'song') {
      valA = mathX;
      valB = mathY;
    } else if (selectedType === 'product') {
      valA = (mathX / 2000) * 100;
      valB = (mathY / 2500) * 100;
    } else if (selectedType === 'protein') {
      valA = (mathX / 14) * 100;
      valB = mathY * 100;
    }

    setCoordA(Math.max(0, Math.min(100, Math.round(valA))));
    setCoordB(Math.max(0, Math.min(100, Math.round(valB))));
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div className="flex-[65] min-h-0 min-w-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
        <VisualizationSpace
          points={currentPoints}
          dimensions={config.dimLabels}
          ranges={config.dimRanges}
          showVectors
          draggablePointId="custom-playground-point"
          onDragPoint={handleDragPlayground}
        />
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Vector Playground</h2>
          <p className="text-slate-500 text-sm font-semibold">
            Select a type and adjust the sliders to map properties to coordinates.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          {(Object.keys(configurations) as VectorType[]).map((type) => (
            <button
              key={type}
              onClick={() => { setSelectedType(type); setCoordA(50); setCoordB(50); }}
              className={`px-2 py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                selectedType === type 
                  ? 'bg-vector text-white shadow font-extrabold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>{config.dimLabels[0]}</span>
              <span className="text-vector font-bold">
                {mappedCoords[0].toFixed(selectedType === 'protein' ? 2 : 0)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={coordA}
              onChange={(e) => setCoordA(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>{config.dimLabels[1]}</span>
              <span className="text-transformations font-bold">
                {mappedCoords[1].toFixed(selectedType === 'protein' ? 2 : 0)}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={coordB}
              onChange={(e) => setCoordB(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations"
            />
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-center shadow-inner">
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider mb-0.5 font-bold">Stored Vector Address</span>
          <span className="text-lg font-extrabold text-vector glow-vector">
            [{mappedCoords[0].toFixed(selectedType === 'protein' ? 2 : 0)}, {mappedCoords[1].toFixed(selectedType === 'protein' ? 2 : 0)}]
          </span>
        </div>
      </div>
    </div>
  );
};
