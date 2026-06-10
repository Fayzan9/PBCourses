import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { Math as KaTeXMath } from '../components/Math';
import { VisualizationSpace } from '../components/VisualizationSpace';
import type { VisualPoint, CustomLine } from '../components/VisualizationSpace';

// ==========================================
// SCENE 2.1: Proximity Curiosity
// ==========================================
export const Scene2_1_ProximityCuriosity: React.FC = () => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const words = [
    { id: 'puppy', label: 'Puppy 🐶', coords: [25, 30], color: '#E11D48', desc: 'A young canine companion' },
    { id: 'dog', label: 'Dog 🐕', coords: [32, 36], color: '#E11D48', desc: 'A mature canine companion' },
    { id: 'kitten', label: 'Kitten 🐱', coords: [28, 24], color: '#7C3AED', desc: 'A young feline companion' },
    { id: 'laptop', label: 'Laptop 💻', coords: [82, 75], color: '#0284C7', desc: 'A portable work computer' },
    { id: 'server', label: 'Server 🖥️', coords: [75, 85], color: '#0284C7', desc: 'A high-powered cloud computer' }
  ];

  const points: VisualPoint[] = words.map(w => ({
    id: w.id,
    label: w.label,
    coords: w.coords,
    color: w.color,
    details: w.desc
  }));

  const getCustomLines = (): CustomLine[] => {
    if (!selectedWord) return [];
    const source = words.find(w => w.id === selectedWord);
    if (!source) return [];

    return words
      .filter(w => w.id !== selectedWord)
      .map(w => {
        const dx = w.coords[0] - source.coords[0];
        const dy = w.coords[1] - source.coords[1];
        const dist = Math.sqrt(dx * dx + dy * dy);
        // Map distance to opacity / green/red color indicator
        const isNear = dist < 25;
        return {
          from: source.coords,
          to: w.coords,
          color: isNear ? '#10B981' : '#64748B',
          dashed: true
        };
      });
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Technology Scale', 'Biological Scale']}
          ranges={[[0, 100], [0, 100]]}
          customLines={getCustomLines()}
          activePointId={selectedWord}
          onPointHover={(id) => setSelectedWord(id)}
          showGrid
        />
        <div className="text-[11px] font-mono text-slate-400 font-bold mt-3 uppercase tracking-wider">
          Hover over points to measure distance paths
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Measuring Proximity</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          If everything is represented as a point, then finding similar concepts is simply finding coordinates that are close together.
        </p>
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase font-bold text-emerald-700">Semantic Intuition</span>
          <span className="text-sm font-bold text-slate-700">
            {selectedWord 
              ? `Calculating geometric distance from ${selectedWord.toUpperCase()}...` 
              : 'Hover on any word point to map conceptual distance.'}
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2.2: Euclidean Distance
// ==========================================
export const Scene2_2_EuclideanDistance: React.FC = () => {
  const pointA = [30, 25];
  const [pointB, setPointB] = useState<number[]>([75, 65]);

  const dx = pointB[0] - pointA[0];
  const dy = pointB[1] - pointA[1];
  const distance = Math.sqrt(dx * dx + dy * dy);

  const points: VisualPoint[] = [
    { id: 'A', label: 'Movie A 🎬', coords: pointA, color: '#E11D48', details: 'Fixed reference movie profile' },
    { id: 'B', label: 'Movie B 🍿 (Drag Me)', coords: pointB, color: '#0284C7', details: 'Concept target movie' }
  ];

  const customLines: CustomLine[] = [
    { from: pointA, to: pointB, color: '#059669', dashed: true },
    // Horizontal dx line
    { from: pointA, to: [pointB[0], pointA[1]], color: 'rgba(225, 29, 72, 0.4)', dashed: true },
    // Vertical dy line
    { from: [pointB[0], pointA[1]], to: pointB, color: 'rgba(2, 132, 199, 0.4)', dashed: true }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Action Rating (X)', 'Comedy Rating (Y)']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          draggablePointId="B"
          onDragPoint={(coords) => {
            setPointB([Math.round(coords[0]), Math.round(coords[1])]);
          }}
          showGrid
        />
        <div className="flex justify-between w-full px-4 mt-3 text-xs font-mono font-bold text-slate-500">
          <span>Movie A: [{pointA.join(', ')}]</span>
          <span>Movie B: [{pointB.join(', ')}]</span>
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Euclidean Distance</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            The straight-line distance between two coordinates in space, derived from the Pythagorean theorem.
          </p>
        </div>

        {/* Live Formula Display */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            Calculated distance
          </div>
          <div className="py-2 border-y border-slate-100 flex justify-center text-slate-800">
            <KaTeXMath 
              tex={`d = \\sqrt{(${pointB[0]} - ${pointA[0]})^2 + (${pointB[1]} - ${pointA[1]})^2} = ${distance.toFixed(2)}`} 
              block 
            />
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600 font-bold">
            <div>ΔX (Action): {dx.toFixed(0)}</div>
            <div>ΔY (Comedy): {dy.toFixed(0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2.2b: Higher Dimensions (Euclidean)
// ==========================================
export const Scene2_2b_HighDimEuclidean: React.FC = () => {
  const [zA, setZA] = useState(15);
  const [zB, setZB] = useState(65);

  const pointA = [30, 25, zA];
  const pointB = [75, 65, zB];

  const dx = pointB[0] - pointA[0];
  const dy = pointB[1] - pointA[1];
  const dz = pointB[2] - pointA[2];
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* 3D Coordinate visual card */}
      <div className="w-full max-w-[540px] bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-6">
        <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-100 pb-3">
          Expanding to 3D Space (X, Y, Z)
        </h3>

        <div className="flex flex-col gap-4 text-sm font-mono font-bold text-slate-700">
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span>Movie A: [30, 25, <span className="text-transformations">{zA}</span>]</span>
            <input 
              type="range" min="0" max="100" value={zA} 
              onChange={(e) => setZA(Number(e.target.value))} 
              className="w-32 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations" 
            />
          </div>
          <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span>Movie B: [75, 65, <span className="text-transformations">{zB}</span>]</span>
            <input 
              type="range" min="0" max="100" value={zB} 
              onChange={(e) => setZB(Number(e.target.value))} 
              className="w-32 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations" 
            />
          </div>
        </div>

        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl font-mono text-xs text-slate-700 flex flex-col gap-2">
          <span className="font-bold text-[10px] uppercase text-emerald-800 tracking-wider">3D Distance formula</span>
          <div className="flex justify-center py-2 text-slate-800 border-y border-emerald-100">
            <KaTeXMath tex={`d = \\sqrt{(${dx})^2 + (${dy})^2 + (${dz})^2} = ${dist.toFixed(2)}`} block />
          </div>
          <div className="grid grid-cols-3 gap-2 text-[10px] font-bold text-slate-500 mt-1 text-center">
            <div>ΔX² = {Math.pow(dx, 2)}</div>
            <div>ΔY² = {Math.pow(dy, 2)}</div>
            <div>ΔZ² = {Math.pow(dz, 2)}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Adding Dimensions</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Euclidean distance extends naturally. Whether in 3D or 100D, we just add the squared differences of every new dimension.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2.3: The Magnitude Trap
// ==========================================
export const Scene2_3_MagnitudeTrap: React.FC = () => {
  const movieA = { id: 'indie', label: 'Indie Film 🎬', coords: [15, 20], color: '#E11D48', details: '10 reviews (Action/Comedy ratio 3:4)' };
  const movieB = { id: 'blockbuster', label: 'Blockbuster 🚀', coords: [60, 80], color: '#7C3AED', details: '10,000 reviews (Action/Comedy ratio 3:4)' };

  const dx = movieB.coords[0] - movieA.coords[0];
  const dy = movieB.coords[1] - movieA.coords[1];
  const euclideanDistance = Math.sqrt(dx * dx + dy * dy);

  const points: VisualPoint[] = [
    { id: movieA.id, label: movieA.label, coords: movieA.coords, color: movieA.color, details: movieA.details },
    { id: movieB.id, label: movieB.label, coords: movieB.coords, color: movieB.color, details: movieB.details }
  ];

  const customLines: CustomLine[] = [
    // Origin connections
    { from: [0, 0], to: movieA.coords, color: 'rgba(225, 29, 72, 0.5)' },
    { from: [0, 0], to: movieB.coords, color: 'rgba(124, 58, 237, 0.5)' },
    // Dotted straight-line Euclidean distance
    { from: movieA.coords, to: movieB.coords, color: '#059669', dashed: true }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          showGrid
        />
        <div className="text-[11px] font-mono text-slate-400 font-bold mt-3 uppercase tracking-wider">
          Both movies lie along the exact same ray (ratio 3:4)
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">The Magnitude Trap</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Straight-line distance penalizes items simply because of their scale, even if they share the exact same conceptual profile.
        </p>
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex flex-col gap-2">
          <span className="text-xs font-mono uppercase font-bold text-rose-700">The Problem</span>
          <span className="text-sm font-bold text-slate-700 leading-snug">
            Euclidean distance is <span className="font-mono text-rose-600">{euclideanDistance.toFixed(1)}</span>, claiming these movies are highly different. Yet both are 60% comedy and 40% action.
          </span>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2.4: Cosine Similarity
// ==========================================
export const Scene2_4_CosineSimilarity: React.FC = () => {
  const [posA, setPosA] = useState<number[]>([50, 60]);
  const [posB, setPosB] = useState<number[]>([70, 30]);

  // Calculate dot product and magnitudes
  const dotProduct = posA[0] * posB[0] + posA[1] * posB[1];
  const magA = Math.sqrt(posA[0] * posA[0] + posA[1] * posA[1]);
  const magB = Math.sqrt(posB[0] * posB[0] + posB[1] * posB[1]);
  const cosineSim = dotProduct / (magA * magB);

  // Calculate angle in degrees
  const angleRad = Math.acos(Math.min(1, Math.max(-1, cosineSim)));
  const angleDeg = (angleRad * 180) / Math.PI;

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴 (Drag)', coords: posA, color: '#E11D48', details: 'Draggable vector profile A' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7', details: 'Draggable vector profile B' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center relative">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          draggablePointId="B"
          onDragPoint={(coords) => {
            setPosB([Math.round(coords[0]), Math.round(coords[1])]);
          }}
          showGrid
        />
        
        {/* Secondary Drag handler for Point A */}
        <div className="absolute top-2 left-2 flex gap-2">
          <button 
            onClick={() => {
              setPosA([50, 60]);
              setPosB([70, 30]);
            }}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-500 cursor-pointer text-xs flex items-center gap-1 font-bold"
            title="Reset vectors"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        {/* Custom Angle Arc overlay rendering directly on SVG is not easily done, but we can display it clearly */}
        <div className="flex justify-between w-full px-4 mt-3 text-xs font-mono font-bold text-slate-500">
          <span>Vector A Length: {magA.toFixed(1)}</span>
          <span>Vector B Length: {magB.toFixed(1)}</span>
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Cosine Similarity</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            Measures the cosine of the angle between two vectors, ignoring their magnitudes entirely.
          </p>
        </div>

        {/* Presets and Live calculation card */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
            <span>Angle & Similarity</span>
            <span className="text-emerald-600">θ = {angleDeg.toFixed(0)}°</span>
          </div>

          <div className="py-2 border-y border-slate-100 flex justify-center text-slate-800 font-mono font-bold text-lg">
            Cosine Similarity = {cosineSim.toFixed(3)}
          </div>

          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => { setPosA([40, 50]); setPosB([80, 100]); }} 
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-[10px] font-bold font-mono text-slate-600 cursor-pointer"
            >
              Same Angle (Similarity = 1)
            </button>
            <button 
              onClick={() => { setPosA([0, 80]); setPosB([80, 0]); }} 
              className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-[10px] font-bold font-mono text-slate-600 cursor-pointer"
            >
              Orthogonal (Similarity = 0)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2.4b: Cosine Math Breakdown
// ==========================================
export const Scene2_4b_CosineMath: React.FC = () => {
  const [magA, setMagA] = useState(60);
  const [magB, setMagB] = useState(80);
  const [angle, setAngle] = useState(45); // in degrees

  const rad = (angle * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const dotProduct = magA * magB * cosVal;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* Visual Calculation Panel */}
      <div className="w-full max-w-[540px] bg-white border border-slate-200 rounded-2xl p-6 shadow-md flex flex-col gap-5">
        <h3 className="font-extrabold text-slate-800 text-lg border-b border-slate-100 pb-3">
          Inside Cosine Similarity Math
        </h3>

        {/* Sliders for length & angle */}
        <div className="flex flex-col gap-4 text-xs font-mono font-bold text-slate-600">
          <div>
            <div className="flex justify-between mb-1">
              <span>Vector A Length (||A||)</span>
              <span className="text-loss">{magA}</span>
            </div>
            <input type="range" min="10" max="100" value={magA} onChange={(e) => setMagA(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Vector B Length (||B||)</span>
              <span className="text-vector">{magB}</span>
            </div>
            <input type="range" min="10" max="100" value={magB} onChange={(e) => setMagB(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Angle Between Vectors (θ)</span>
              <span className="text-transformations">{angle}°</span>
            </div>
            <input type="range" min="0" max="180" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations" />
          </div>
        </div>

        {/* Math readout box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-2 font-mono text-[11px] text-slate-700">
          <div className="flex justify-between border-b border-slate-200/50 pb-2">
            <span>Dot Product (A • B):</span>
            <span className="font-bold">{dotProduct.toFixed(1)}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-xs text-slate-800">
            <span>Cosine Similarity (cos θ):</span>
            <div className="flex items-center gap-1.5">
              <KaTeXMath tex={`\\frac{A \\cdot B}{\\|A\\|\\|B\\|} = `} />
              <span className="text-emerald-600">{cosVal.toFixed(3)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">The Normalization</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Dividing the Dot Product by vector lengths normalizes the score. It guarantees similarity is strictly bound between -1 and +1.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2.5: Proximity Sandbox
// ==========================================
export const Scene2_5_ProximitySandbox: React.FC = () => {
  const [metric, setMetric] = useState<'euclidean' | 'cosine'>('euclidean');

  const queryPoint = { id: 'query', label: 'Target 🎯', coords: [30, 40], color: '#10B981', details: 'Selected search query' };

  const candidates = [
    { id: 'c1', label: 'Indie Action', coords: [15, 20], color: '#E11D48', details: 'Low magnitude, same ratio as target' },
    { id: 'c2', label: 'Big Action', coords: [75, 100], color: '#E11D48', details: 'High magnitude, same ratio as target' },
    { id: 'c3', label: 'Comedy Short', coords: [40, 10], color: '#7C3AED', details: 'Moderate magnitude, opposite ratio' },
    { id: 'c4', label: 'Mainstream', coords: [45, 55], color: '#0284C7', details: 'Closest Euclidean neighbor' },
    { id: 'c5', label: 'Indie Comedy', coords: [10, 50], color: '#7C3AED', details: 'Very low magnitude' }
  ];

  const allPoints = [queryPoint, ...candidates];

  // Helper calculations
  const getNearestNeighbors = () => {
    const target = queryPoint.coords;

    const list = candidates.map(c => {
      const dx = c.coords[0] - target[0];
      const dy = c.coords[1] - target[1];
      const eDist = Math.sqrt(dx * dx + dy * dy);

      const dot = c.coords[0] * target[0] + c.coords[1] * target[1];
      const magT = Math.sqrt(target[0] * target[0] + target[1] * target[1]);
      const magC = Math.sqrt(c.coords[0] * c.coords[0] + c.coords[1] * c.coords[1]);
      const cosSim = dot / (magT * magC);

      return {
        ...c,
        eDist,
        cosSim
      };
    });

    if (metric === 'euclidean') {
      return list.sort((a, b) => a.eDist - b.eDist).slice(0, 2);
    } else {
      return list.sort((a, b) => b.cosSim - a.cosSim).slice(0, 2);
    }
  };

  const nearest = getNearestNeighbors();
  const nearestIds = nearest.map(n => n.id);

  const points: VisualPoint[] = allPoints.map(p => {
    const isNearest = nearestIds.includes(p.id);
    return {
      id: p.id,
      label: p.label,
      coords: p.coords,
      color: p.id === 'query' ? p.color : (isNearest ? '#059669' : '#64748B'),
      details: p.details
    };
  });

  const customLines: CustomLine[] = candidates.map(c => {
    const isNearest = nearestIds.includes(c.id);
    return {
      from: queryPoint.coords,
      to: c.coords,
      color: isNearest ? '#059669' : 'rgba(148, 163, 184, 0.15)',
      dashed: !isNearest
    };
  });

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          customLines={customLines}
          showGrid
        />
        <div className="text-[11px] font-mono text-slate-400 font-bold mt-3 uppercase tracking-wider">
          Green lines connect to the 2 nearest neighbors
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Proximity Sandbox</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            Switch metrics to see how vector length (magnitude) alters the calculated neighborhood.
          </p>
        </div>

        {/* Metric Switch Toggles */}
        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              onClick={() => setMetric('euclidean')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                metric === 'euclidean' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Euclidean Distance
            </button>
            <button
              onClick={() => setMetric('cosine')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                metric === 'cosine' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Cosine Similarity
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              Selected 2 Nearest Neighbors:
            </span>
            <div className="flex flex-col gap-1.5">
              {nearest.map((n, i) => (
                <div key={n.id} className="flex justify-between items-center text-xs font-mono font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2">
                  <span>{i + 1}. {n.label}</span>
                  <span className="text-emerald-600 font-bold">
                    {metric === 'euclidean' ? `d = ${n.eDist.toFixed(1)}` : `cos = ${n.cosSim.toFixed(3)}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
