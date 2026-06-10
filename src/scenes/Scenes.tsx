import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Film, Music, Sparkles, Smartphone, Laptop, 
  Camera, Headphones, Brain
} from 'lucide-react';
import { Math as KaTeXMath } from '../components/Math';
import { VisualizationSpace, type VisualPoint } from '../components/VisualizationSpace';
import { PixelGrid } from '../components/PixelGrid';
import { GalaxyPlot } from '../components/GalaxyPlot';

// ==========================================
// SCENE 1: Curiosity Question
// ==========================================
export const Scene1_Curiosity: React.FC = () => {
  const items = [
    { text: 'A movie.', color: 'text-transformations' },
    { text: 'A song.', color: 'text-similarity' },
    { text: 'A person.', color: 'text-vector' },
    { text: 'A sentence.', color: 'text-probability' }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 text-center max-w-4xl mx-auto">
      <div className="flex flex-col gap-5 md:gap-7 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.4, duration: 0.8, ease: "easeOut" }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="mt-6 border-t border-slate-200 pt-8"
      >
        <p className="text-xl md:text-2xl font-bold text-slate-500 tracking-wide">
          What do they have in common?
        </p>
      </motion.div>
    </div>
  );
};

// ==========================================
// SCENE 2: Person Representation
// ==========================================
export const Scene2_PersonRep: React.FC = () => {
  const [step, setStep] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1800);
    const t2 = setTimeout(() => setStep(2), 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* Left Column: Visual Silhouette (Scaled Up) */}
      <div className="relative flex items-center justify-center w-80 h-[420px] bg-white border border-slate-200 rounded-2xl p-8 shadow-md">
        <svg viewBox="0 0 100 150" className="w-full h-full text-slate-400">
          <circle cx="50" cy="30" r="16" fill="currentColor" className="text-vector opacity-40" />
          <path d="M50 48 C35 48 30 75 30 110 L42 110 L45 145 L55 145 L58 110 L70 110 C70 75 65 48 50 48 Z" fill="currentColor" className="text-vector opacity-30" />
          
          {step >= 1 && (
            <g>
              {/* Height Callout */}
              <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="12" y1="14" x2="12" y2="146" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="18" y="80" fill="#0284C7" fontSize="8.5" className="font-bold rotate-90 origin-left">Height: 180cm</motion.text>
              
              {/* Weight Callout */}
              <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} x1="30" y1="90" x2="70" y2="90" stroke="#7C3AED" strokeWidth="2" />
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="50" y="84" textAnchor="middle" fill="#7C3AED" fontSize="8.5" className="font-bold">Weight: 75kg</motion.text>
              
              {/* Age Callout */}
              <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} x="50" y="32" textAnchor="middle" fill="#D97706" fontSize="9.5" className="font-extrabold">Age: 25</motion.text>
            </g>
          )}
        </svg>
      </div>

      {/* Right Column: Descriptions & Morphing */}
      <div className="flex flex-col justify-center max-w-md text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Can a person become numbers?</h2>
        
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          By taking measurements like height, weight, and age, we capture their essential features.
        </p>

        <div className="h-24 flex items-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="step-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-slate-400 font-mono text-base">
                Scanning attributes...
              </motion.div>
            )}
            {step === 1 && (
              <motion.div key="step-1" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex flex-col gap-1 font-mono text-sm font-semibold text-slate-600">
                <div>Height: <span className="text-vector">180 cm</span></div>
                <div>Weight: <span className="text-transformations">75 kg</span></div>
                <div>Age: <span className="text-similarity">25 years</span></div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="step-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">Vector representation</span>
                <div className="bg-slate-100 px-6 py-4 rounded-xl border border-slate-200 text-3xl font-mono text-center font-bold text-vector glow-vector">
                  [180, 75, 25]
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3: People Become Points
// ==========================================
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

// ==========================================
// SCENE 4: Movie Space
// ==========================================
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
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Action Score', 'Comedy Score']}
          ranges={[[0, 100], [0, 100]]}
          showVectors
          draggablePointId="yourmovie"
          onDragPoint={handleDragMovie}
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
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

// ==========================================
// SCENE 4b: The 3D Space
// ==========================================
export const Scene4b_ThreeDSpace: React.FC = () => {
  const [action, setAction] = useState(60);
  const [comedy, setComedy] = useState(80);
  const [romance, setRomance] = useState(40);

  // Rotation angles in degrees (default tilt)
  const [rotX, setRotX] = useState(20);
  const [rotY, setRotY] = useState(-35);
  const [isDraggingSpace, setIsDraggingSpace] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Screen layout constants
  const originX = 250;
  const originY = 210;

  // Convert angles to radians
  const radX = (rotX * Math.PI) / 180;
  const radY = (rotY * Math.PI) / 180;

  // Projection math: X (Action), Y (Comedy - up), Z (Romance)
  const project = (xVal: number, yVal: number, zVal: number) => {
    // Center inputs from 0-100 to -50 to 50 for rotation centering, then scale
    const scale = 1.6;
    const xc = xVal - 50;
    const yc = yVal - 50;
    const zc = zVal - 50;

    // Rotate around Y axis (horizontal azimuth)
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = xc * cosY - zc * sinY;
    const z1 = xc * sinY + zc * cosY;

    // Rotate around X axis (vertical tilt)
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y2 = yc * cosX - z1 * sinX;

    return {
      x: originX + x1 * scale,
      y: originY - y2 * scale
    };
  };

  // Drag listeners to rotate the space
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    setIsDraggingSpace(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSpace) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    // Constrain elevation rotation to keep perspective natural
    setRotX(rx => Math.max(-5, Math.min(60, rx - dy * 0.5)));
    setRotY(ry => ry + dx * 0.5);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDraggingSpace(false);
  };

  // Define vertices for shaded coordinate box walls
  const o = project(0, 0, 0);
  const xAx = project(100, 0, 0);
  const yAx = project(0, 100, 0);
  const zAx = project(0, 0, 100);
  const xy = project(100, 100, 0);
  const xz = project(100, 0, 100);
  const yz = project(0, 100, 100);
  const boxEnd = project(100, 100, 100);

  // Vector segments for the movie coordinate
  const p1 = project(action, 0, 0);
  const p2 = project(action, comedy, 0);
  const p3 = project(action, comedy, romance);

  // Grid lines on floor XZ plane
  const floorGrid = [];
  // Grid lines on back wall XY plane
  const backWallGrid = [];
  // Grid lines on side wall YZ plane
  const sideWallGrid = [];

  for (let i = 25; i <= 75; i += 25) {
    // Floor
    const fx1 = project(i, 0, 0);
    const fx2 = project(i, 0, 100);
    const fz1 = project(0, 0, i);
    const fz2 = project(100, 0, i);
    floorGrid.push(<line key={`fx-${i}`} x1={fx1.x} y1={fx1.y} x2={fx2.x} y2={fx2.y} stroke="rgba(100, 116, 139, 0.08)" strokeWidth="0.8" />);
    floorGrid.push(<line key={`fz-${i}`} x1={fz1.x} y1={fz1.y} x2={fz2.x} y2={fz2.y} stroke="rgba(100, 116, 139, 0.08)" strokeWidth="0.8" />);

    // Back wall
    const bx1 = project(i, 0, 0);
    const bx2 = project(i, 100, 0);
    const by1 = project(0, i, 0);
    const by2 = project(100, i, 0);
    backWallGrid.push(<line key={`bx-${i}`} x1={bx1.x} y1={bx1.y} x2={bx2.x} y2={bx2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);
    backWallGrid.push(<line key={`by-${i}`} x1={by1.x} y1={by1.y} x2={by2.x} y2={by2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);

    // Side wall
    const sz1 = project(0, 0, i);
    const sz2 = project(0, 100, i);
    const sy1 = project(0, i, 0);
    const sy2 = project(0, i, 100);
    sideWallGrid.push(<line key={`sz-${i}`} x1={sz1.x} y1={sz1.y} x2={sz2.x} y2={sz2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);
    sideWallGrid.push(<line key={`sy-${i}`} x1={sy1.x} y1={sy1.y} x2={sy2.x} y2={sy2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);
  }

  // Ticks along axes
  const ticksX = [25, 50, 75].map(val => {
    const p = project(val, 0, 0);
    const pOffset = project(val, 0, 5);
    return (
      <g key={`tx-${val}`}>
        <line x1={p.x} y1={p.y} x2={pOffset.x} y2={pOffset.y} stroke="rgba(225, 29, 72, 0.4)" strokeWidth="1" />
        <text x={p.x - 2} y={p.y + 12} fill="rgba(225, 29, 72, 0.5)" fontSize="8" fontWeight="bold" textAnchor="middle">{val}</text>
      </g>
    );
  });

  const ticksY = [25, 50, 75].map(val => {
    const p = project(0, val, 0);
    const pOffset = project(5, val, 0);
    return (
      <g key={`ty-${val}`}>
        <line x1={p.x} y1={p.y} x2={pOffset.x} y2={pOffset.y} stroke="rgba(2, 130, 199, 0.4)" strokeWidth="1" />
        <text x={p.x - 6} y={p.y + 3} fill="rgba(2, 130, 199, 0.5)" fontSize="8" fontWeight="bold" textAnchor="end">{val}</text>
      </g>
    );
  });

  const ticksZ = [25, 50, 75].map(val => {
    const p = project(0, 0, val);
    const pOffset = project(5, 0, val);
    return (
      <g key={`tz-${val}`}>
        <line x1={p.x} y1={p.y} x2={pOffset.x} y2={pOffset.y} stroke="rgba(124, 58, 237, 0.4)" strokeWidth="1" />
        <text x={p.x + 8} y={p.y + 3} fill="rgba(124, 58, 237, 0.5)" fontSize="8" fontWeight="bold" textAnchor="start">{val}</text>
      </g>
    );
  });

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* 3D SVG Grid Area with Dragging to Rotate */}
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full max-w-[500px] bg-white border border-slate-200 rounded-2xl p-6 shadow-md relative cursor-grab active:cursor-grabbing select-none"
      >
        <div className="absolute top-3 right-4 text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
          Drag box to rotate space
        </div>
        <svg viewBox="0 0 500 420" className="w-full h-auto pointer-events-none">
          <defs>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#E11D48" />
            </marker>
            <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
            </marker>
            <marker id="arrow-violet" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#7C3AED" />
            </marker>
            <radialGradient id="sphere-gradient" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#047857" />
            </radialGradient>
          </defs>

          {/* Shaded grid planes for volume depth effect */}
          {/* Ground Plane (XZ) */}
          <polygon
            points={`${o.x},${o.y} ${xAx.x},${xAx.y} ${xz.x},${xz.y} ${zAx.x},${zAx.y}`}
            fill="rgba(100, 116, 139, 0.03)"
            stroke="rgba(100, 116, 139, 0.08)"
            strokeWidth="1"
          />
          {/* Back Wall Plane (XY) */}
          <polygon
            points={`${o.x},${o.y} ${xAx.x},${xAx.y} ${xy.x},${xy.y} ${yAx.x},${yAx.y}`}
            fill="rgba(2, 132, 199, 0.02)"
            stroke="rgba(100, 116, 139, 0.08)"
            strokeWidth="1"
          />
          {/* Side Wall Plane (YZ) */}
          <polygon
            points={`${o.x},${o.y} ${zAx.x},${zAx.y} ${yz.x},${yz.y} ${yAx.x},${yAx.y}`}
            fill="rgba(124, 58, 237, 0.02)"
            stroke="rgba(100, 116, 139, 0.08)"
            strokeWidth="1"
          />

          {/* Grid lines inside planes */}
          {floorGrid}
          {backWallGrid}
          {sideWallGrid}
          
          {/* Outer Boundary Box lines */}
          <line x1={xAx.x} y1={xAx.y} x2={xy.x} y2={xy.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={yAx.x} y1={yAx.y} x2={xy.x} y2={xy.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={yAx.x} y1={yAx.y} x2={yz.x} y2={yz.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={zAx.x} y1={zAx.y} x2={yz.x} y2={yz.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={xz.x} y1={xz.y} x2={boxEnd.x} y2={boxEnd.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={xy.x} y1={xy.y} x2={boxEnd.x} y2={boxEnd.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={yz.x} y1={yz.y} x2={boxEnd.x} y2={boxEnd.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />

          {/* Axis Ticks */}
          {ticksX}
          {ticksY}
          {ticksZ}

          {/* Core Axes lines */}
          {/* X: Action (red) */}
          <line x1={o.x} y1={o.y} x2={xAx.x} y2={xAx.y} stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
          <text x={xAx.x - 5} y={xAx.y + 24} fill="#E11D48" fontSize="12" fontWeight="bold">Action X</text>
          
          {/* Y: Comedy (blue) */}
          <line x1={o.x} y1={o.y} x2={yAx.x} y2={yAx.y} stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
          <text x={yAx.x} y={yAx.y - 12} textAnchor="middle" fill="#0284C7" fontSize="12" fontWeight="bold">Comedy Y</text>

          {/* Z: Romance (violet) */}
          <line x1={o.x} y1={o.y} x2={zAx.x} y2={zAx.y} stroke="#7C3AED" strokeWidth="2.5" markerEnd="url(#arrow-violet)" />
          <text x={zAx.x + 8} y={zAx.y + 16} fill="#7C3AED" fontSize="12" fontWeight="bold">Romance Z</text>

          {/* Guide Projection paths */}
          {/* Seg 1: along Action Axis */}
          <line x1={o.x} y1={o.y} x2={p1.x} y2={p1.y} stroke="#E11D48" strokeWidth="2.5" />
          {/* Seg 2: along Comedy axis height */}
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
          {/* Seg 3: along Romance depth */}
          <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />

          {/* Shaded Drop projection down to the floor (XZ plane) */}
          <line x1={p3.x} y1={p3.y} x2={project(action, 0, romance).x} y2={project(action, 0, romance).y} stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx={project(action, 0, romance).x} cy={project(action, 0, romance).y} r="3" fill="#64748B" opacity="0.6" />

          {/* Direct Coordinate Vector from Origin */}
          <line x1={o.x} y1={o.y} x2={p3.x} y2={p3.y} stroke="#059669" strokeWidth="2.5" />

          {/* Point Coordinate dot (using 3D sphere radial gradient) */}
          <circle cx={p3.x} cy={p3.y} r="9" fill="url(#sphere-gradient)" stroke="#F8FAFC" strokeWidth="2" />
          
          {/* Floating coordinates label */}
          <text x={p3.x + 12} y={p3.y - 12} fill="#0F172A" fontSize="13" fontWeight="bold" className="font-mono">
            [{action}, {comedy}, {romance}]
          </text>
        </svg>
      </div>

      {/* Control sliders */}
      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Adding a 3rd Dimension</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            By adding a third axis (Romance), we can plot movies in a 3D coordinate space.
          </p>
        </div>

        {/* Sliders container */}
        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Action Score (X)</span>
              <span className="text-loss">{action}</span>
            </div>
            <input type="range" min="0" max="100" value={action} onChange={(e) => setAction(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Comedy Score (Y)</span>
              <span className="text-vector">{comedy}</span>
            </div>
            <input type="range" min="0" max="100" value={comedy} onChange={(e) => setComedy(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Romance Score (Z)</span>
              <span className="text-transformations">{romance}</span>
            </div>
            <input type="range" min="0" max="100" value={romance} onChange={(e) => setRomance(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 4c: Hyper-Dimensions
// ==========================================
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
          {/* Vector notation representation */}
          <div className="font-mono text-xs bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-vector font-bold max-w-[200px] truncate">
            [{movie.features.map(f => f.val).join(', ')}]
          </div>
        </div>

        {/* Feature profile bar graphs grid */}
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

      {/* Narrative Panel */}
      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Hyper-Dimensions</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            AI models operate in hundreds of dimensions. We visualize them as profile signatures.
          </p>
        </div>

        {/* Selection buttons */}
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

// ==========================================
// SCENE 5: Music Space
// ==========================================
export const Scene5_MusicSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'daft', label: 'Daft Punk - One More Time', coords: [90, 15], color: '#7C3AED', details: 'Dance Club Anthem', icon: <Music size={12} /> },
    { id: 'avicii', label: 'Avicii - Levels', coords: [95, 10], color: '#7C3AED', details: 'High-energy electronic synthesizer chords', icon: <Music size={12} /> },
    { id: 'sheeran', label: 'Ed Sheeran - Thinking Out Loud', coords: [20, 85], color: '#059669', details: 'Slow acoustic guitar ballad', icon: <Music size={12} /> },
    { id: 'adele', label: 'Adele - Someone Like You', coords: [15, 90], color: '#059669', details: 'Chill acoustic piano track', icon: <Music size={12} /> },
    { id: 'billie', label: 'Billie Eilish - Bad Guy', coords: [50, 45], color: '#D97706', details: 'Subtle bass, moderate energy pop', icon: <Music size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Energy', 'Acousticness']}
          ranges={[[0, 100], [0, 100]]}
          highlightConnections
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
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

// ==========================================
// SCENE 6: Product Space
// ==========================================
export const Scene6_ProductSpace: React.FC = () => {
  const points: VisualPoint[] = [
    { id: 'phone', label: 'Smartphone', coords: [8, 7.5], color: '#0284C7', details: 'Portable, lightweight, high daily usage', icon: <Smartphone size={12} /> },
    { id: 'laptop', label: 'Laptop', coords: [15, 9.5], color: '#7C3AED', details: 'Workhorse computer, moderate weight, top performance', icon: <Laptop size={12} /> },
    { id: 'camera', label: 'Pro Camera', coords: [18, 8.0], color: '#E11D48', details: 'Dedicated optics device', icon: <Camera size={12} /> },
    { id: 'headphones', label: 'Headphones', coords: [3, 6.0], color: '#D97706', details: 'Compact personal audio device', icon: <Headphones size={12} /> }
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={points}
          dimensions={['Price ($ x100)', 'Performance Score']}
          ranges={[[0, 25], [0, 12]]}
          showGrid
        />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Product Space</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          By scoring items on attributes like Price and Performance, e-commerce engines recommend alternates based on geometric proximity.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 7: Image Space
// ==========================================
export const Scene7_ImageSpace: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      <div className="w-full max-w-[640px] flex justify-center">
        <PixelGrid />
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">Images are Points</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          An image is a grid of numbers representing pixel colors.
        </p>
        <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 text-slate-600 text-sm font-mono leading-relaxed font-semibold">
          Flattening this grid maps the entire image to a single point in a higher-dimensional space.
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 8: Language Space
// ==========================================
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

// ==========================================
// SCENE 9: Semantic Galaxy
// ==========================================
export const Scene9_SemanticGalaxy: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 max-w-6xl mx-auto gap-5 text-center">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">The Semantic Galaxy</h2>
        <p className="text-slate-500 text-sm font-semibold">
          An immersive playground mapping hundreds of words. Click or search to explore.
        </p>
      </div>

      <div className="w-full flex justify-center">
        <GalaxyPlot />
      </div>
    </div>
  );
};

// ==========================================
// SCENE 10: ChatGPT Reveal
// ==========================================
export const Scene10_ChatGPTReveal: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: '1. User Input', desc: 'Translating input prompt into coordinates.', code: '"cute kitten"' },
    { label: '2. Location Mapping', desc: 'Placing the query vector in semantics space.', code: '[0.23, 0.81, 0.44]' },
    { label: '3. Proximity Scan', desc: 'Locating nearby words: "meow", "purr", "whiskers".', code: 'Finding Neighbors...' },
    { label: '4. Decoded Output', desc: 'Assembling neighboring concepts into a reply.', code: '"Kitten purrs..."' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* Visual representation of chat pipeline */}
      <div className="w-full max-w-[500px] bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-md">
        <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 font-bold">
          <Brain size={11} className="text-vector" /> AI Inference Engine
        </div>

        <div className="flex flex-col gap-5 mt-4">
          {steps.map((s, idx) => {
            const isActive = step === idx;
            return (
              <motion.div
                key={idx}
                animate={{ 
                  scale: isActive ? 1.02 : 0.98,
                  borderColor: isActive ? 'rgba(2, 132, 199, 0.3)' : 'rgba(15, 23, 42, 0.05)',
                  backgroundColor: isActive ? 'rgba(241, 245, 249, 0.8)' : 'rgba(255, 255, 255, 0.2)'
                }}
                className="border p-3.5 rounded-xl flex items-center justify-between transition-all gap-4 shadow-sm"
              >
                <div className="text-left">
                  <h4 className={`text-xs font-extrabold ${isActive ? 'text-vector' : 'text-slate-400'}`}>{s.label}</h4>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed font-medium">{s.desc}</p>
                </div>
                <div className="font-mono text-[10px] text-similarity shrink-0 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 max-w-[150px] truncate font-bold">
                  {s.code}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">How LLMs Think</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          ChatGPT converts prompt phrases to locations, scans neighboring semantic concepts, and decodes them back to sentences.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 11: Unification
// ==========================================
export const Scene11_Unification: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'person' | 'movie' | 'song' | 'image' | 'sentence'>('person');

  const tabs = [
    { id: 'person', label: 'Person', icon: <User size={14} />, coords: '[180, 75, 25]', desc: 'Height, Weight, Age measurements' },
    { id: 'movie', label: 'Movie', icon: <Film size={14} />, coords: '[90, 10, 60]', desc: 'Action, Comedy, Romance scores' },
    { id: 'song', label: 'Song', icon: <Music size={14} />, coords: '[95, 10, 85]', desc: 'Energy, Danceability, Acousticness' },
    { id: 'image', label: 'Image', icon: <Smartphone size={14} />, coords: '[0.1, 0.9, 0.2, ...]', desc: 'Flattened raw grid of pixel intensities' },
    { id: 'sentence', label: 'Sentence', icon: <Sparkles size={14} />, coords: '[0.81, -0.4, 0.52, ...]', desc: 'Calculated semantics embeddings' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((curr) => {
        const idx = tabs.findIndex((t) => t.id === curr);
        return tabs[(idx + 1) % tabs.length].id as any;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* Left panel showing current active conversion */}
      <div className="w-full max-w-[480px] bg-white border border-slate-200 rounded-2xl p-8 flex flex-col gap-6 relative min-h-[300px] justify-center items-center shadow-md">
        <AnimatePresence mode="wait">
          {tabs.map((tab) => {
            if (tab.id !== activeTab) return null;
            return (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center text-center gap-4 w-full"
              >
                <div className="p-4 bg-slate-50 rounded-full text-vector glow-vector border border-slate-200">
                  {tab.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 capitalize">{tab.label}</h3>
                <p className="text-slate-500 text-xs max-w-xs font-semibold">{tab.desc}</p>
                <div className="text-center font-mono text-[#7C3AED] bg-slate-50 px-5 py-3 rounded-xl border border-slate-200 text-xl font-extrabold shadow-inner">
                  {tab.coords}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex flex-col max-w-sm text-left gap-5">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">The Great Unification</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          Images, audio, words, and objects all translate into numbers.
        </p>
        <p className="text-vector text-lg md:text-xl font-extrabold leading-relaxed">
          AI speaks a single language: coordinates in space.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 12: Mathematical Reveal
// ==========================================
export const Scene12_MathReveal: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-4 max-w-4xl mx-auto text-center gap-8">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-mono text-[#7C3AED] uppercase tracking-widest font-bold">Formal Definition</span>
        <h2 className="text-4xl font-extrabold text-slate-800">Meet the Vector</h2>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-lg w-full flex flex-col gap-5">
        <KaTeXMath tex="\vec{v} = [v_1, v_2, v_3, \dots, v_n]" block />
        
        <p className="text-slate-600 text-sm font-semibold">
          In math, this ordered list of coordinates is called a Vector.
        </p>
        
        <p className="text-slate-500 text-xs leading-relaxed border-t border-slate-100 pt-4 font-mono text-left font-medium">
          A vector is simply the geometric address of a point in space.
        </p>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 13: Interactive Playground
// ==========================================
type VectorType = 'person' | 'movie' | 'song' | 'product' | 'protein';

export const Scene13_InteractivePlayground: React.FC = () => {
  const [selectedType, setSelectedType] = useState<VectorType>('person');
  
  // Custom slider coordinate values
  const [coordA, setCoordA] = useState(50);
  const [coordB, setCoordB] = useState(50);

  // Schema configs
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

  // Generate visual point
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
    <div className="flex flex-col lg:flex-row items-center justify-center gap-12 h-full py-2 max-w-6xl mx-auto px-6 w-full">
      {/* Visualization Grid Panel */}
      <div className="w-full max-w-[640px] flex justify-center">
        <VisualizationSpace
          points={currentPoints}
          dimensions={config.dimLabels}
          ranges={config.dimRanges}
          showVectors
          draggablePointId="custom-playground-point"
          onDragPoint={handleDragPlayground}
        />
      </div>

      {/* Control Panel */}
      <div className="flex flex-col max-w-sm text-left gap-5 w-full">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Vector Playground</h2>
          <p className="text-slate-500 text-sm font-semibold">
            Select a type and adjust the sliders to map properties to coordinates.
          </p>
        </div>

        {/* Tab selection grid */}
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

        {/* Sliders */}
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

        {/* Display Current Vector notation */}
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

// ==========================================
// SCENE 14: Final Mental Model
// ==========================================
export const Scene14_FinalModel: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-2 px-6 text-center max-w-3xl mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-vector/5 filter blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="flex flex-col gap-6 z-10 animate-fade-in"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-vector font-extrabold">Intuition Mastered</span>
        
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-800 mb-1 leading-tight">
          Everything can become a point.
        </h1>

        <div className="w-20 h-1.5 bg-gradient-to-r from-vector to-transformations mx-auto rounded-full my-1 shadow-sm" />

        <p className="text-slate-600 text-xl md:text-2xl font-bold leading-relaxed max-w-xl mx-auto">
          Once things become points, machines can compare, search, and learn from them.
        </p>

        <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed border-t border-slate-200 pt-6 font-medium">
          This single geometric insight forms the foundation of all modern AI.
        </p>
      </motion.div>
    </div>
  );
};

// ==========================================
// CHAPTER 1 → CHAPTER 2: Next Hook
// ==========================================
export const Scene15_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-sky-400/10 filter blur-[120px] pointer-events-none" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center gap-6 z-10"
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
        className="text-6xl select-none"
      >
        📐
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-sky-500 font-extrabold">Up Next · Chapter 2</span>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        Points are in space.<br />
        <span className="text-sky-500">How close are they?</span>
      </h1>

      <div className="w-16 h-1.5 bg-gradient-to-r from-sky-400 to-violet-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-slate-500 text-lg font-medium leading-relaxed max-w-md"
      >
        Two songs. Two movies. Two words. Once they're points, we need a way to measure proximity — and it's not as simple as it looks.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="flex items-center gap-4 mt-2"
      >
        {[['Euclidean Distance', '#0284C7'], ['Cosine Similarity', '#7C3AED'], ['The Magnitude Trap', '#E11D48']].map(([label, color]) => (
          <div key={label} className="px-3 py-1.5 rounded-full border text-xs font-bold" style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
