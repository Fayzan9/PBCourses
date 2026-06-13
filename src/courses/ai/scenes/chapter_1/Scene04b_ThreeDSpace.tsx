import React, { useState } from 'react';

export const Scene4b_ThreeDSpace: React.FC = () => {
  // Dimension values mapping to Height (X), Weight (Y), Age (Z)
  // Let's map slider percentages to actual dimensions:
  // Height: 140 to 200 cm (slider range 0 to 100) -> 140 + (val/100)*60
  // Weight: 30 to 110 kg (slider range 0 to 100) -> 30 + (val/100)*80
  // Age: 0 to 100 years (slider range 0 to 100) -> val
  const [heightRaw, setHeightRaw] = useState(67); // maps to ~180 cm: 140 + (67/100)*60 = 180.2
  const [weightRaw, setWeightRaw] = useState(56); // maps to ~75 kg: 30 + (56/100)*80 = 74.8
  const [ageRaw, setAgeRaw] = useState(25);     // maps to 25 years

  const heightVal = Math.round(140 + (heightRaw / 100) * 60);
  const weightVal = Math.round(30 + (weightRaw / 100) * 80);
  const ageVal = Math.round(ageRaw);

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

  // Projection math: X (Height), Y (Weight - up), Z (Age)
  const project = (xVal: number, yVal: number, zVal: number) => {
    const scale = 1.6;
    const xc = xVal - 50;
    const yc = yVal - 50;
    const zc = zVal - 50;

    // Rotate around Y axis
    const cosY = Math.cos(radY);
    const sinY = Math.sin(radY);
    const x1 = xc * cosY - zc * sinY;
    const z1 = xc * sinY + zc * cosY;

    // Rotate around X axis
    const cosX = Math.cos(radX);
    const sinX = Math.sin(radX);
    const y2 = yc * cosX - z1 * sinX;

    return {
      x: originX + x1 * scale,
      y: originY - y2 * scale
    };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
    setIsDraggingSpace(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSpace) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    
    setRotX(rx => Math.max(-5, Math.min(60, rx - dy * 0.5)));
    setRotY(ry => ry + dx * 0.5);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDraggingSpace(false);
  };

  const o = project(0, 0, 0);
  const xAx = project(100, 0, 0);
  const yAx = project(0, 100, 0);
  const zAx = project(0, 0, 100);
  const xy = project(100, 100, 0);
  const xz = project(100, 0, 100);
  const yz = project(0, 100, 100);
  const boxEnd = project(100, 100, 100);

  const p1 = project(heightRaw, 0, 0);
  const p2 = project(heightRaw, weightRaw, 0);
  const p3 = project(heightRaw, weightRaw, ageRaw);

  const floorGrid = [];
  const backWallGrid = [];
  const sideWallGrid = [];

  for (let i = 25; i <= 75; i += 25) {
    const fx1 = project(i, 0, 0);
    const fx2 = project(i, 0, 100);
    const fz1 = project(0, 0, i);
    const fz2 = project(100, 0, i);
    floorGrid.push(<line key={`fx-${i}`} x1={fx1.x} y1={fx1.y} x2={fx2.x} y2={fx2.y} stroke="rgba(100, 116, 139, 0.08)" strokeWidth="0.8" />);
    floorGrid.push(<line key={`fz-${i}`} x1={fz1.x} y1={fz1.y} x2={fz2.x} y2={fz2.y} stroke="rgba(100, 116, 139, 0.08)" strokeWidth="0.8" />);

    const bx1 = project(i, 0, 0);
    const bx2 = project(i, 100, 0);
    const by1 = project(0, i, 0);
    const by2 = project(100, i, 0);
    backWallGrid.push(<line key={`bx-${i}`} x1={bx1.x} y1={bx1.y} x2={bx2.x} y2={bx2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);
    backWallGrid.push(<line key={`by-${i}`} x1={by1.x} y1={by1.y} x2={by2.x} y2={by2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);

    const sz1 = project(0, 0, i);
    const sz2 = project(0, 100, i);
    const sy1 = project(0, i, 0);
    const sy2 = project(0, i, 100);
    sideWallGrid.push(<line key={`sz-${i}`} x1={sz1.x} y1={sz1.y} x2={sz2.x} y2={sz2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);
    sideWallGrid.push(<line key={`sy-${i}`} x1={sy1.x} y1={sy1.y} x2={sy2.x} y2={sy2.y} stroke="rgba(100, 116, 139, 0.06)" strokeWidth="0.8" />);
  }

  const ticksX = [25, 50, 75].map(val => {
    const p = project(val, 0, 0);
    const pOffset = project(val, 0, 5);
    const displayVal = Math.round(140 + (val / 100) * 60);
    return (
      <g key={`tx-${val}`}>
        <line x1={p.x} y1={p.y} x2={pOffset.x} y2={pOffset.y} stroke="rgba(225, 29, 72, 0.4)" strokeWidth="1" />
        <text x={p.x - 2} y={p.y + 12} fill="rgba(225, 29, 72, 0.5)" fontSize="8" fontWeight="bold" textAnchor="middle">{displayVal}</text>
      </g>
    );
  });

  const ticksY = [25, 50, 75].map(val => {
    const p = project(0, val, 0);
    const pOffset = project(5, val, 0);
    const displayVal = Math.round(30 + (val / 100) * 80);
    return (
      <g key={`ty-${val}`}>
        <line x1={p.x} y1={p.y} x2={pOffset.x} y2={pOffset.y} stroke="rgba(2, 130, 199, 0.4)" strokeWidth="1" />
        <text x={p.x - 6} y={p.y + 3} fill="rgba(2, 130, 199, 0.5)" fontSize="8" fontWeight="bold" textAnchor="end">{displayVal}</text>
      </g>
    );
  });

  const ticksZ = [25, 50, 75].map(val => {
    const p = project(0, 0, val);
    const pOffset = project(5, 0, val);
    const displayVal = val;
    return (
      <g key={`tz-${val}`}>
        <line x1={p.x} y1={p.y} x2={pOffset.x} y2={pOffset.y} stroke="rgba(124, 58, 237, 0.4)" strokeWidth="1" />
        <text x={p.x + 8} y={p.y + 3} fill="rgba(124, 58, 237, 0.5)" fontSize="8" fontWeight="bold" textAnchor="start">{displayVal}</text>
      </g>
    );
  });

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      <div 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="flex-[65] min-h-0 min-w-0 bg-white/40 border border-slate-200/50 rounded-3xl p-6 shadow-inner relative cursor-grab active:cursor-grabbing select-none overflow-hidden"
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

          <polygon
            points={`${o.x},${o.y} ${xAx.x},${xAx.y} ${xz.x},${xz.y} ${zAx.x},${zAx.y}`}
            fill="rgba(100, 116, 139, 0.03)"
            stroke="rgba(100, 116, 139, 0.08)"
            strokeWidth="1"
          />
          <polygon
            points={`${o.x},${o.y} ${xAx.x},${xAx.y} ${xy.x},${xy.y} ${yAx.x},${yAx.y}`}
            fill="rgba(2, 132, 199, 0.02)"
            stroke="rgba(100, 116, 139, 0.08)"
            strokeWidth="1"
          />
          <polygon
            points={`${o.x},${o.y} ${zAx.x},${zAx.y} ${yz.x},${yz.y} ${yAx.x},${yAx.y}`}
            fill="rgba(124, 58, 237, 0.02)"
            stroke="rgba(100, 116, 139, 0.08)"
            strokeWidth="1"
          />

          {floorGrid}
          {backWallGrid}
          {sideWallGrid}
          
          <line x1={xAx.x} y1={xAx.y} x2={xy.x} y2={xy.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={yAx.x} y1={yAx.y} x2={xy.x} y2={xy.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={yAx.x} y1={yAx.y} x2={yz.x} y2={yz.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={zAx.x} y1={zAx.y} x2={yz.x} y2={yz.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={xz.x} y1={xz.y} x2={boxEnd.x} y2={boxEnd.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={xy.x} y1={xy.y} x2={boxEnd.x} y2={boxEnd.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />
          <line x1={yz.x} y1={yz.y} x2={boxEnd.x} y2={boxEnd.y} stroke="rgba(100, 116, 139, 0.08)" strokeDasharray="3 3" />

          {ticksX}
          {ticksY}
          {ticksZ}

          <line x1={o.x} y1={o.y} x2={xAx.x} y2={xAx.y} stroke="#E11D48" strokeWidth="2.5" markerEnd="url(#arrow-red)" />
          <text x={xAx.x - 5} y={xAx.y + 24} fill="#E11D48" fontSize="12" fontWeight="bold">Height X</text>
          
          <line x1={o.x} y1={o.y} x2={yAx.x} y2={yAx.y} stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
          <text x={yAx.x} y={yAx.y - 12} textAnchor="middle" fill="#0284C7" fontSize="12" fontWeight="bold">Weight Y</text>

          <line x1={o.x} y1={o.y} x2={zAx.x} y2={zAx.y} stroke="#7C3AED" strokeWidth="2.5" markerEnd="url(#arrow-violet)" />
          <text x={zAx.x + 8} y={zAx.y + 16} fill="#7C3AED" fontSize="12" fontWeight="bold">Age Z</text>

          <line x1={o.x} y1={o.y} x2={p1.x} y2={p1.y} stroke="#E11D48" strokeWidth="2.5" />
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
          <line x1={p2.x} y1={p2.y} x2={p3.x} y2={p3.y} stroke="#7C3AED" strokeWidth="2" strokeDasharray="3 3" />

          <line x1={p3.x} y1={p3.y} x2={project(heightRaw, 0, ageRaw).x} y2={project(heightRaw, 0, ageRaw).y} stroke="rgba(71, 85, 105, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx={project(heightRaw, 0, ageRaw).x} cy={project(heightRaw, 0, ageRaw).y} r="3" fill="#64748B" opacity="0.6" />

          <line x1={o.x} y1={o.y} x2={p3.x} y2={p3.y} stroke="#059669" strokeWidth="2.5" />

          <circle cx={p3.x} cy={p3.y} r="9" fill="url(#sphere-gradient)" stroke="#F8FAFC" strokeWidth="2" />
          
          <text x={p3.x + 12} y={p3.y - 12} fill="#0F172A" fontSize="13" fontWeight="bold" className="font-mono">
            [{heightVal}, {weightVal}, {ageVal}]
          </text>
        </svg>
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-1">Adding a 3rd Dimension</h2>
          <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
            By adding a third axis (Age), we can plot people in a 3D coordinate space.
          </p>
        </div>

        <div className="flex flex-col gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Height (X, cm)</span>
              <span className="text-loss">{heightVal} cm</span>
            </div>
            <input type="range" min="0" max="100" value={heightRaw} onChange={(e) => setHeightRaw(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-loss" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Weight (Y, kg)</span>
              <span className="text-vector">{weightVal} kg</span>
            </div>
            <input type="range" min="0" max="100" value={weightRaw} onChange={(e) => setWeightRaw(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-vector" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-slate-600 font-bold">
              <span>Age (Z, years)</span>
              <span className="text-transformations">{ageVal} yrs</span>
            </div>
            <input type="range" min="0" max="100" value={ageRaw} onChange={(e) => setAgeRaw(Number(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-transformations" />
          </div>
        </div>
      </div>
    </div>
  );
};
