import React, { useState } from 'react';
import { Math as KaTeXMath } from '../components/Math';
import { VisualizationSpace } from '../components/VisualizationSpace';
import type { VisualPoint, CustomLine } from '../components/VisualizationSpace';

// Helper to project vector A onto vector B
const getProjection = (a: number[], b: number[]) => {
  const dot = a[0] * b[0] + a[1] * b[1];
  const magB2 = b[0] * b[0] + b[1] * b[1];
  const projFactor = magB2 === 0 ? 0 : dot / magB2;
  return {
    coords: [b[0] * projFactor, b[1] * projFactor],
    factor: projFactor
  };
};

// Layout wrapper for visual-first slides
const SlideLayout: React.FC<{
  title: string;
  text: string;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, text, sidebarContent, children }) => {
  return (
    <div className="flex flex-col lg:flex-row items-stretch justify-between gap-8 h-full py-1 w-full max-w-7xl mx-auto px-6 overflow-hidden">
      {/* Visual Section - Max Space */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center relative bg-white/40 border border-slate-200/50 rounded-3xl p-4 shadow-inner">
        {children}
      </div>

      {/* Narrative Section - Minimal Sidebar */}
      <div className="w-full lg:w-[320px] flex flex-col justify-center text-left gap-5 shrink-0 py-2">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-none mb-3">{title}</h2>
          <p className="text-slate-600 text-lg leading-relaxed">{text}</p>
        </div>
        {sidebarContent}
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3.1: The Alignment Question
// ==========================================
export const Scene3_1_AlignmentQuestion: React.FC = () => {
  const [posB, setPosB] = useState<number[]>([75, 25]);
  const posA = [50, 60];

  const dot = posA[0] * posB[0] + posA[1] * posB[1];
  const magA = Math.sqrt(posA[0] * posA[0] + posA[1] * posA[1]);
  const magB = Math.sqrt(posB[0] * posB[0] + posB[1] * posB[1]);
  const angleRad = Math.acos(Math.min(1, Math.max(-1, dot / (magA * magB || 1))));
  const angleDeg = (angleRad * 180) / Math.PI;

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="Multiplying Direction"
      text="How do we multiply two vectors? Drag Vector B to explore alignment. What happens when they align vs. fight?"
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Angle Info</span>
          <div className="text-xl font-black text-slate-700 font-mono">θ = {angleDeg.toFixed(0)}°</div>
          <span className="text-xs text-slate-500 font-bold">
            {angleDeg < 45 ? 'Pulling together!' : angleDeg > 135 ? 'Fighting!' : 'Independent.'}
          </span>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['Force X', 'Force Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        draggablePointId="B"
        onDragPoint={(coords) => setPosB([Math.round(coords[0]), Math.round(coords[1])])}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.2: Parallel Vectors
// ==========================================
export const Scene3_2_ParallelVectors: React.FC = () => {
  const [lenB, setLenB] = useState(60);
  const lenA = 50;

  // Lock both to 45 degree angle: x = y = len / sqrt(2)
  const factor = Math.sqrt(2);
  const posA = [lenA / factor, lenA / factor];
  const posB = [lenB / factor, lenB / factor];

  const points: VisualPoint[] = [
    { id: 'A', label: `Vector A [${posA[0].toFixed(0)}, ${posA[0].toFixed(0)}]`, coords: posA, color: '#E11D48' },
    { id: 'B', label: `Vector B`, coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="Perfect Alignment"
      text="When vectors point in the exact same direction, we simply multiply their lengths together."
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-4">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Vector B Length</span>
              <span className="text-sky-600">{lenB.toFixed(0)}</span>
            </div>
            <input type="range" min="10" max="100" value={lenB} onChange={(e) => setLenB(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>
          <div className="font-mono text-xs border-t border-slate-100 pt-3 text-slate-700 flex flex-col gap-1">
            <span>Length A: {lenA}</span>
            <span>Length B: {lenB.toFixed(0)}</span>
            <span className="font-bold text-slate-900 border-t border-slate-100 pt-1 mt-1 text-sm">Product: {(lenA * lenB).toFixed(0)}</span>
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X', 'Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.3: Orthogonal Vectors
// ==========================================
export const Scene3_3_OrthogonalVectors: React.FC = () => {
  const [lenB, setLenB] = useState(70);
  const lenA = 50;

  // Vector A at (50, 0) - horizontal
  // Vector B at (0, lenB) - vertical
  const posA = [lenA, 0];
  const posB = [0, lenB];

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="Zero Alignment"
      text="What if they are perpendicular (90°)? They share nothing in common. Their alignment is exactly zero."
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3">
          <div>
            <div className="flex justify-between text-xs font-mono font-bold mb-1">
              <span>Vector B Length</span>
              <span className="text-sky-600">{lenB}</span>
            </div>
            <input type="range" min="10" max="100" value={lenB} onChange={(e) => setLenB(Number(e.target.value))} className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>
          <div className="font-mono text-sm font-bold text-center border-t border-slate-100 pt-3 text-slate-600">
            Total Alignment = <span className="text-rose-500">0</span>
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X', 'Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.4: Shadow Projection
// ==========================================
export const Scene3_4_ShadowProjection: React.FC = () => {
  const [posA, setPosA] = useState<number[]>([40, 65]);
  const posB = [80, 20]; // Baseline vector

  const proj = getProjection(posA, posB);

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴 (Drag)', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' },
    // Dotted projection line from A onto line of B
    { from: posA, to: proj.coords, color: '#7C3AED', dashed: true },
    // Shaded Shadow along Vector B
    { from: [0, 0], to: proj.coords, color: '#059669', dashed: false }
  ];

  return (
    <SlideLayout
      title="Casting Shadows"
      text="At other angles, we measure how much of Vector A points in the direction of Vector B. Drop a perpendicular line to see Vector A's 'shadow'."
      sidebarContent={
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase font-bold text-emerald-800">Visual Intuition</span>
          <span className="text-sm font-bold text-slate-700">
            The thick green segment is A's shadow cast on B. Drag A to watch it grow or shrink.
          </span>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X', 'Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        draggablePointId="A"
        onDragPoint={(coords) => setPosA([Math.round(coords[0]), Math.round(coords[1])])}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.5: Trig Cosine Connection
// ==========================================
export const Scene3_5_TrigCosineConnection: React.FC = () => {
  const [posA, setPosA] = useState<number[]>([40, 65]);
  const posB = [80, 20];

  const dot = posA[0] * posB[0] + posA[1] * posB[1];
  const magA = Math.sqrt(posA[0] * posA[0] + posA[1] * posA[1]);
  const magB = Math.sqrt(posB[0] * posB[0] + posB[1] * posB[1]);
  const cos = dot / (magA * magB || 1);
  const shadowLength = magA * cos;

  const proj = getProjection(posA, posB);

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴 (Drag)', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' },
    { from: posA, to: proj.coords, color: '#7C3AED', dashed: true },
    { from: [0, 0], to: proj.coords, color: '#059669' }
  ];

  return (
    <SlideLayout
      title="The Trig Shadow"
      text="Using basic trigonometry, the length of this projected shadow is mathematically defined as Vector A's length times the cosine of the angle."
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Shadow Formula</div>
          <div className="flex justify-center border-y border-slate-100 py-2">
            <KaTeXMath tex={`\\text{Shadow} = \\|A\\| \\cos(\\theta) = ${shadowLength.toFixed(1)}`} />
          </div>
          <div className="text-xs font-mono text-slate-500 font-bold leading-normal">
            ||A||: {magA.toFixed(1)} <br />
            cos θ: {cos.toFixed(2)}
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X', 'Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        draggablePointId="A"
        onDragPoint={(coords) => setPosA([Math.round(coords[0]), Math.round(coords[1])])}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.6: Scaling the Shadow
// ==========================================
export const Scene3_6_ScalingShadow: React.FC = () => {
  const posA = [40, 65];
  const [posB, setPosB] = useState<number[]>([80, 20]);

  const dot = posA[0] * posB[0] + posA[1] * posB[1];
  const magA = Math.sqrt(posA[0] * posA[0] + posA[1] * posA[1]);
  const magB = Math.sqrt(posB[0] * posB[0] + posB[1] * posB[1]);
  const cos = dot / (magA * magB || 1);
  const shadowLength = magA * cos;
  const dotProduct = shadowLength * magB;

  const proj = getProjection(posA, posB);

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A 🔴 (Drag)', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' },
    { from: posA, to: proj.coords, color: '#7C3AED', dashed: true },
    { from: [0, 0], to: proj.coords, color: '#059669' }
  ];

  return (
    <SlideLayout
      title="Scaling the Shadow"
      text="Finally, we multiply the shadow length by Vector B's baseline length. This product is the **Dot Product**."
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Dot Product formula</div>
          <div className="flex justify-center border-y border-slate-100 py-2">
            <KaTeXMath tex={`A \\cdot B = \\|A\\| \\|B\\| \\cos(\\theta) = ${dotProduct.toFixed(0)}`} block />
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-500">
            Baseline length ||B||: {magB.toFixed(0)} <br />
            Shadow length: {shadowLength.toFixed(1)}
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X', 'Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        draggablePointId="B"
        onDragPoint={(coords) => setPosB([Math.round(coords[0]), Math.round(coords[1])])}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.7: Direct Coordinate Shortcut
// ==========================================
export const Scene3_7_CoordinateShortcut: React.FC = () => {
  const posA = [50, 40];
  const posB = [70, 30];

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A [50, 40]', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B [70, 30]', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="The Coordinate Shortcut"
      text="Measuring angles in code is expensive and slow. Is there a way to calculate the exact same dot product using just coordinate points?"
      sidebarContent={
        <div className="p-4 bg-sky-50 border border-sky-100 rounded-2xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase font-bold text-sky-800">The Challenge</span>
          <span className="text-sm font-bold text-slate-700">
            Let's dissect the components on the X and Y axes step-by-step.
          </span>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['Dimension X', 'Dimension Y']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.8: Horizontal Agreement
// ==========================================
export const Scene3_8_HorizontalAgreement: React.FC = () => {
  const posA = [50, 40];
  const posB = [70, 30];

  const prodX = posA[0] * posB[0];

  const points: VisualPoint[] = [
    { id: 'A', label: 'A_x = 50', coords: [50, 0], color: '#E11D48' },
    { id: 'B', label: 'B_x = 70', coords: [70, 0], color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    // Highlight segment of A on X axis
    { from: [0, 0], to: [50, 0], color: '#E11D48' },
    // Highlight segment of B on X axis
    { from: [0, 0], to: [70, 0], color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="Horizontal Alignment"
      text="Multiply the X coordinates together: Ax * Bx. This measures how much the vectors agree along the horizontal direction."
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">X Multiplication</span>
          <div className="flex justify-center border-y border-slate-100 py-2">
            <KaTeXMath tex={`A_x \\times B_x = 50 \\times 70 = ${prodX}`} />
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X Axis', 'Y Axis']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.9: Vertical Agreement
// ==========================================
export const Scene3_9_VerticalAgreement: React.FC = () => {
  const posA = [50, 40];
  const posB = [70, 30];

  const prodY = posA[1] * posB[1];

  const points: VisualPoint[] = [
    { id: 'A', label: 'A_y = 40', coords: [0, 40], color: '#E11D48' },
    { id: 'B', label: 'B_y = 30', coords: [0, 30], color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    // Highlight segment of A on Y axis
    { from: [0, 0], to: [0, 40], color: '#E11D48' },
    // Highlight segment of B on Y axis
    { from: [0, 0], to: [0, 30], color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="Vertical Alignment"
      text="Multiply the Y coordinates together: Ay * By. This measures how much the vectors agree vertically."
      sidebarContent={
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm flex flex-col gap-3">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Y Multiplication</span>
          <div className="flex justify-center border-y border-slate-100 py-2">
            <KaTeXMath tex={`A_y \\times B_y = 40 \\times 30 = ${prodY}`} />
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X Axis', 'Y Axis']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.10: Summing Up
// ==========================================
export const Scene3_10_SummingUp: React.FC = () => {
  const [posB, setPosB] = useState<number[]>([70, 30]);
  const posA = [50, 40];

  const prodX = posA[0] * posB[0];
  const prodY = posA[1] * posB[1];
  const dotProduct = prodX + prodY;

  // Trig comparison value
  const magA = Math.sqrt(posA[0] * posA[0] + posA[1] * posA[1]);
  const magB = Math.sqrt(posB[0] * posB[0] + posB[1] * posB[1]);
  const cos = dotProduct / (magA * magB || 1);
  const trigValue = magA * magB * cos;

  const points: VisualPoint[] = [
    { id: 'A', label: 'Vector A [50, 40] 🔴', coords: posA, color: '#E11D48' },
    { id: 'B', label: 'Vector B 🔵 (Drag)', coords: posB, color: '#0284C7' }
  ];

  const customLines: CustomLine[] = [
    { from: [0, 0], to: posA, color: '#E11D48' },
    { from: [0, 0], to: posB, color: '#0284C7' }
  ];

  return (
    <SlideLayout
      title="The Grand Equivalence"
      text="Add the products together: AxBx + AyBy. Drag Vector B to verify that the algebraic shortcut matches the geometric shadow calculation perfectly!"
      sidebarContent={
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Algebraic Shortcut</span>
            <div className="font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200 p-2 rounded-lg">
              {posA[0]}*{posB[0]} + {posA[1]}*{posB[1]} = <span className="font-bold text-emerald-600">{dotProduct}</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-t border-slate-100 pt-3">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Geometric Shadow</span>
            <div className="font-mono text-xs text-slate-700 bg-slate-50 border border-slate-200 p-2 rounded-lg">
              {magA.toFixed(1)} * {magB.toFixed(1)} * {cos.toFixed(2)} = <span className="font-bold text-purple-600">{trigValue.toFixed(0)}</span>
            </div>
          </div>
        </div>
      }
    >
      <VisualizationSpace
        points={points}
        dimensions={['X Axis', 'Y Axis']}
        ranges={[[-100, 100], [-100, 100]]}
        customLines={customLines}
        draggablePointId="B"
        onDragPoint={(coords) => setPosB([Math.round(coords[0]), Math.round(coords[1])])}
        showGrid
      />
    </SlideLayout>
  );
};

// ==========================================
// SCENE 3.11: Signal Amplification (Sandbox)
// ==========================================
export const Scene3_11_SignalAmplification: React.FC = () => {
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
    <SlideLayout
      title="Signal Strength"
      text="Why do neural networks rely on Dot Products rather than Cosine Similarity? Because magnitude represents signal strength. Intensity amplifies matches."
      sidebarContent={
        <div className="flex flex-col gap-3 w-full bg-slate-50 p-4 border border-slate-200 rounded-2xl">
          <div className="flex flex-col gap-3 font-mono text-[11px] text-slate-700">
            {movies.map(m => {
              const metrics = getMetricsForMovie(m.coords);
              return (
                <div key={m.id} className="border border-slate-200 rounded-xl p-2.5 flex justify-between items-center bg-white shadow-sm">
                  <span className="flex items-center gap-1 truncate w-24">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
                    {m.name.split(' ')[0]}
                  </span>
                  <div className="flex gap-3">
                    <div>Dot: <span className="text-emerald-600 font-bold">{metrics.dot.toFixed(0)}</span></div>
                    <div>Cos: <span className="text-purple-600 font-bold">{metrics.cos.toFixed(2)}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      }
    >
      <div className="w-full max-w-[500px] flex flex-col gap-6 p-4 bg-white/70 rounded-2xl border border-slate-200">
        {/* User Preferences Sliders */}
        <div className="flex flex-col gap-5 text-xs font-mono font-bold text-slate-600">
          <div>
            <div className="flex justify-between mb-1.5">
              <span>Your Action Preference (Length / Magnitude)</span>
              <span className="text-loss">{prefAction}</span>
            </div>
            <input type="range" min="0" max="100" value={prefAction} onChange={(e) => setPrefAction(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss" />
          </div>

          <div>
            <div className="flex justify-between mb-1.5">
              <span>Your Comedy Preference (Length / Magnitude)</span>
              <span className="text-vector">{prefComedy}</span>
            </div>
            <input type="range" min="0" max="100" value={prefComedy} onChange={(e) => setPrefComedy(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>
        </div>
      </div>
    </SlideLayout>
  );
};
