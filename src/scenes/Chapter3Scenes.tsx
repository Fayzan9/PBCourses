import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Math as KaTeXMath } from '../components/Math';
import { VisualizationSpace } from '../components/VisualizationSpace';
import type { VisualPoint, CustomLine } from '../components/VisualizationSpace';

// ==========================================
// SCENE 3.1: The Alignment Question
// ==========================================
export const Scene3_1_AlignmentQuestion: React.FC = () => {
  const [posB, setPosB] = useState<number[]>([70, 30]);
  const posA = [50, 60];

  const dot = posA[0] * posB[0] + posA[1] * posB[1];
  const maxDot = 100 * 100 + 100 * 100; // max reference
  const percent = Math.min(100, Math.max(-100, (dot / maxDot) * 150));

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴', coords: posA, color: '#E11D48', details: 'Fixed reference vector' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7', details: 'Draggable comparison vector' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Force X', 'Force Y']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          draggablePointId="B"
          onDragPoint={(coords) => {
            setPosB([Math.round(coords[0]), Math.round(coords[1])]);
          }}
          showGrid
        />
        <div className="text-[11px] font-mono text-slate-400 font-bold mt-3 uppercase tracking-wider">
          Drag Vector B to change its direction and alignment
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Combining Vectors</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            When combining vectors, we need a way to measure if their directions pull together or fight each other.
          </p>
        </div>

        {/* Alignment force indicator */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            Alignment Direction Force
          </span>
          <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-200">
            <div 
              className={`h-full transition-all duration-100 ${
                percent >= 0 ? 'bg-emerald-500 origin-left ml-[50%]' : 'bg-rose-500 origin-right mr-[50%]'
              }`}
              style={{ 
                width: `${Math.abs(percent)}%`,
                transform: percent < 0 ? 'translateX(calc(50% - 100%))' : undefined
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs font-bold text-slate-700 mix-blend-difference">
              {dot >= 0 ? 'Pulling Together (Positive)' : 'Fighting (Negative)'}
            </div>
          </div>
          <div className="text-center font-mono text-sm font-bold text-slate-600">
            Raw Alignment Value: {dot.toFixed(0)}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3.2: Element-wise Alignment (Product Areas)
// ==========================================
export const Scene3_2_ElementwiseAlignment: React.FC = () => {
  const [posB, setPosB] = useState<number[]>([70, 45]);
  const posA = [50, 40];

  const prodX = posA[0] * posB[0];
  const prodY = posA[1] * posB[1];

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Dimension X', 'Dimension Y']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          draggablePointId="B"
          onDragPoint={(coords) => {
            setPosB([Math.round(coords[0]), Math.round(coords[1])]);
          }}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Feature Matching</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            First, we multiply matching components together. This multiplies alignment along each dimension separately.
          </p>
        </div>

        {/* Feature multipliers box */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center bg-rose-50 border border-rose-100/50 p-3 rounded-xl">
            <span className="text-xs font-mono font-bold text-rose-700">X Product (A_x * B_x)</span>
            <span className="font-mono text-sm font-bold text-slate-700">
              {posA[0]} * {posB[0]} = {prodX}
            </span>
          </div>

          <div className="flex justify-between items-center bg-sky-50 border border-sky-100/50 p-3 rounded-xl">
            <span className="text-xs font-mono font-bold text-sky-700">Y Product (A_y * B_y)</span>
            <span className="font-mono text-sm font-bold text-slate-700">
              {posA[1]} * {posB[1]} = {prodY}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3.3: Summing the Area (Gauge Merge)
// ==========================================
export const Scene3_3_SummingArea: React.FC = () => {
  const [posB, setPosB] = useState<number[]>([70, 45]);
  const posA = [50, 40];

  const prodX = posA[0] * posB[0];
  const prodY = posA[1] * posB[1];
  const totalSum = prodX + prodY;

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Dimension X', 'Dimension Y']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          draggablePointId="B"
          onDragPoint={(coords) => {
            setPosB([Math.round(coords[0]), Math.round(coords[1])]);
          }}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Summing Up</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            We sum the coordinate products to get a single number representing total alignment. This is the **Dot Product**.
          </p>
        </div>

        {/* Math summary box */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="py-2 border-b border-slate-100 flex justify-center text-slate-800">
            <KaTeXMath tex={`A \\cdot B = A_x B_x + A_y B_y`} block />
          </div>
          <div className="text-center font-mono text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl p-3">
            {prodX} + {prodY} = <span className="text-emerald-600 font-extrabold text-base">{totalSum}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3.4: Geometric Projection (Shadow)
// ==========================================
export const Scene3_4_GeometricProjection: React.FC = () => {
  const [posA, setPosA] = useState<number[]>([40, 60]);
  const posB = [80, 20]; // fixed line vector

  const dot = posA[0] * posB[0] + posA[1] * posB[1];
  const magB2 = posB[0] * posB[0] + posB[1] * posB[1];
  
  // Projection point coordinates on B: p = (a.b / ||b||^2) * b
  const projFactor = dot / magB2;
  const projCoords = [posB[0] * projFactor, posB[1] * projFactor];

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴 (Drag)', coords: posA, color: '#E11D48', details: 'Draggable vector casting shadow' },
    { id: 'B', label: 'Vector B 🔵', coords: posB, color: '#0284C7', details: 'Ground baseline vector' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' },
    // Dotted projection line from A onto B
    { from: posA, to: projCoords, color: '#7C3AED', dashed: true },
    // Shadow segment along Vector B
    { from: [0, 0], to: projCoords, color: '#059669' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center relative">
        <VisualizationSpace
          points={points}
          dimensions={['Dimension X', 'Dimension Y']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          draggablePointId="A"
          onDragPoint={(coords) => {
            setPosA([Math.round(coords[0]), Math.round(coords[1])]);
          }}
          showGrid
        />
        <div className="absolute top-2 left-2 flex gap-2">
          <button 
            onClick={() => { setPosA([40, 60]); }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-500 cursor-pointer text-xs flex items-center gap-1 font-bold"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Casting Shadows</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            Geometrically, the dot product measures the **shadow** (projection) that Vector A casts onto Vector B, scaled by Vector B's length.
          </p>
        </div>

        {/* Projection values box */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Projection Factor
          </div>
          <div className="py-2 border-y border-slate-100 text-center font-mono text-sm font-bold text-slate-700">
            Shadow Scale: <span className="text-purple-600">{(projFactor * 100).toFixed(0)}%</span> of Vector B
          </div>
          <div className="text-xs font-mono text-slate-500 font-bold leading-normal">
            💡 If vectors point opposite, the shadow goes backward and the dot product turns negative.
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3.5: Signal Amplification (Sandbox)
// ==========================================
export const Scene3_5_SignalAmplification: React.FC = () => {
  const [prefAction, setPrefAction] = useState(50);
  const [prefComedy, setPrefComedy] = useState(50);

  const movies = [
    { id: 'm1', name: 'Indie Comedy 🎬', coords: [10, 80], color: '#7C3AED' },
    { id: 'm2', name: 'Blockbuster Action 💥', coords: [90, 15], color: '#E11D48' },
    { id: 'm3', name: 'Balanced Drama 🎭', coords: [45, 45], color: '#0284C7' }
  ];

  const getMetricsForMovie = (mCoords: number[]) => {
    const user = [prefAction, prefComedy];
    const dot = user[0] * mCoords[0] + user[1] * mCoords[1];

    const magU = Math.sqrt(user[0] * user[0] + user[1] * user[1]);
    const magM = Math.sqrt(mCoords[0] * mCoords[0] + mCoords[1] * mCoords[1]);
    const cos = dot / (magU * magM || 1);

    return { dot, cos };
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* Visual Recommendation Grid */}
      <div className="w-full max-w-[540px] bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-6">
        <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-100 pb-3">
          Signal Multipliers vs. Normalization
        </h3>

        {/* User Preferences Sliders */}
        <div className="flex flex-col gap-4 text-xs font-mono font-bold text-slate-600">
          <div>
            <div className="flex justify-between mb-1">
              <span>Your Action Preference (Magnitude)</span>
              <span className="text-loss">{prefAction}</span>
            </div>
            <input type="range" min="0" max="100" value={prefAction} onChange={(e) => setPrefAction(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Your Comedy Preference (Magnitude)</span>
              <span className="text-vector">{prefComedy}</span>
            </div>
            <input type="range" min="0" max="100" value={prefComedy} onChange={(e) => setPrefComedy(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>
        </div>

        {/* Movies Comparison List */}
        <div className="flex flex-col gap-2.5">
          {movies.map(m => {
            const metrics = getMetricsForMovie(m.coords);
            return (
              <div key={m.id} className="border border-slate-200 rounded-xl p-3 flex justify-between items-center text-xs font-mono font-bold text-slate-700 bg-slate-50">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                  {m.name}
                </span>
                <div className="flex gap-4">
                  <div>Dot: <span className="text-emerald-600">{metrics.dot.toFixed(0)}</span></div>
                  <div>Cos: <span className="text-purple-600">{metrics.cos.toFixed(2)}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Signal Amplifiers</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Neural networks use dot products because vector length represents intensity (signal strength). Strong signals amplify matches.
        </p>
      </div>
    </div>
  );
};
