import React, { useState, useMemo, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search, Sparkles } from 'lucide-react';

interface GalaxyNode {
  id: string;
  word: string;
  cluster: 'animals' | 'programming' | 'science' | 'sports' | 'music';
  x: number;
  y: number;
  color: string;
}

const CLUSTERS = {
  animals: { center: [180, 180], color: '#0284C7', words: ['Cat', 'Dog', 'Tiger', 'Wolf', 'Lion', 'Bear', 'Fox', 'Elephant', 'Dolphin', 'Eagle', 'Whale', 'Shark', 'Owl', 'Deer', 'Rabbit', 'Panda', 'Koala', 'Monkey', 'Giraffe', 'Zebra', 'Cheetah', 'Falcon', 'Frog', 'Turtle', 'Snake', 'Lizard', 'Hawk', 'Swan', 'Otter', 'Seal'] },
  programming: { center: [520, 180], color: '#7C3AED', words: ['Python', 'React', 'Vite', 'Code', 'Loop', 'Class', 'Compiler', 'Array', 'String', 'Object', 'Function', 'TypeScript', 'Docker', 'Git', 'HTML', 'CSS', 'Query', 'Bug', 'Node', 'Database', 'Server', 'Kernel', 'Terminal', 'API', 'Stack', 'Heap', 'Pointer', 'Struct', 'Framework', 'Syntax'] },
  science: { center: [350, 350], color: '#059669', words: ['Atom', 'Molecule', 'Quantum', 'Star', 'Planet', 'Gravity', 'Space', 'Gene', 'Cell', 'Energy', 'Theory', 'Physics', 'Galaxy', 'Nebula', 'Electron', 'Proton', 'Neutron', 'Fossil', 'Evolution', 'DNA', 'Microscope', 'Laser', 'Telescope', 'Asteroid', 'Comet', 'Orbit', 'Element', 'Isotope', 'Velocity', 'Mass'] },
  sports: { center: [180, 520], color: '#E11D48', words: ['Soccer', 'Tennis', 'Runner', 'Ball', 'Score', 'Goal', 'Match', 'Coach', 'Pitch', 'Court', 'League', 'Trophy', 'Sprint', 'Athlete', 'Gym', 'Workout', 'Yoga', 'Swim', 'Ski', 'Hike', 'Climb', 'Racket', 'Helmet', 'Team', 'Draft', 'Medal', 'Championship', 'Ref', 'Javelin', 'Marathon'] },
  music: { center: [520, 520], color: '#D97706', words: ['Guitar', 'Melody', 'Chord', 'Piano', 'Tempo', 'Drum', 'Rhythm', 'Jazz', 'Vocals', 'Album', 'Singer', 'Audio', 'Bass', 'Treble', 'Synth', 'Violin', 'Flute', 'Lyrics', 'Song', 'Band', 'Concert', 'Beat', 'Solo', 'Opera', 'Symphony', 'Microphone', 'Scale', 'Key', 'Tune', 'Harmonica'] },
};

export const GalaxyPlot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Camera state (Pan & Zoom)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<GalaxyNode | null>(null);

  // Generate 400+ pseudo-clustered nodes
  const nodes = useMemo(() => {
    const list: GalaxyNode[] = [];
    Object.entries(CLUSTERS).forEach(([clusterKey, info]) => {
      const { center, color, words } = info;
      const key = clusterKey as 'animals' | 'programming' | 'science' | 'sports' | 'music';
      
      // Main semantic anchor words
      words.forEach((word) => {
        const angle = Math.random() * Math.PI * 2;
        // Concentrate heavily near center, decay outward
        const r = Math.pow(Math.random(), 1.5) * 95; 
        list.push({
          id: `${key}-${word}`,
          word,
          cluster: key,
          x: center[0] + Math.cos(angle) * r,
          y: center[1] + Math.sin(angle) * r,
          color,
        });
      });

      // Background filler nodes for dense visual galaxy feel
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.pow(Math.random(), 1.2) * 125;
        list.push({
          id: `${key}-bg-${i}`,
          word: `${key.substring(0, 3)}-dot-${i}`,
          cluster: key,
          x: center[0] + Math.cos(angle) * r,
          y: center[1] + Math.sin(angle) * r,
          color: `${color}35`, // Low opacity
        });
      }
    });
    return list;
  }, []);

  // Zoom helpers
  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedNode(null);
    setSearchQuery('');
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setZoom((z) => Math.min(Math.max(z * zoomFactor, 0.5), 4));
  };

  // Find search query matches
  const filteredNodes = useMemo(() => {
    if (!searchQuery) return [];
    return nodes.filter((n) => 
      !n.word.includes('-dot-') && n.word.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, nodes]);

  // Center view on a selected node
  const selectNode = (node: GalaxyNode) => {
    setSelectedNode(node);
    setSearchQuery(node.word);
    
    // Smoothly pan camera to put node in center of viewBox (700x700 coordinate system)
    const viewWidth = 700;
    const viewHeight = 700;
    const targetX = viewWidth / 2 - node.x * zoom;
    const targetY = viewHeight / 2 - node.y * zoom;
    setPan({ x: targetX, y: targetY });
  };

  return (
    <div className="flex flex-col w-full h-full border border-slate-200 bg-white/70 rounded-2xl overflow-hidden glass-panel relative shadow-md">
      {/* Top Header controls panel */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-3 items-center justify-between pointer-events-none">
        {/* Search */}
        <div className="flex items-center gap-2 bg-white/95 border border-slate-200 rounded-xl px-3 py-1.5 w-60 pointer-events-auto shadow-md">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search Galaxy words..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 font-sans"
          />
        </div>

        {/* Camera Control Toolbar */}
        <div className="flex items-center gap-1.5 bg-white/95 border border-slate-200 rounded-xl p-1.5 pointer-events-auto shadow-md">
          <button onClick={handleZoomIn} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer">
            <ZoomIn size={15} />
          </button>
          <button onClick={handleZoomOut} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer">
            <ZoomOut size={15} />
          </button>
          <button onClick={handleReset} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer" title="Reset View">
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Floating Category Legend */}
      <div className="absolute bottom-4 left-4 z-10 flex flex-col gap-1.5 bg-white/95 border border-slate-200 rounded-xl p-3 text-xs text-left shadow-md pointer-events-none">
        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] mb-1">Clusters</span>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]" /> Animals</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" /> Tech & Programming</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#059669]" /> Natural Sciences</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" /> Athletics & Sports</div>
        <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" /> Art & Music</div>
      </div>

      {/* Dropdown for search auto-complete */}
      {searchQuery && filteredNodes.length > 0 && (
        <div className="absolute top-16 left-4 z-25 bg-white border border-slate-200 rounded-xl w-60 max-h-40 overflow-y-auto shadow-xl p-1 flex flex-col gap-0.5">
          {filteredNodes.slice(0, 6).map((node) => (
            <button
              key={node.id}
              onClick={() => selectNode(node)}
              className="text-left text-xs px-3 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 hover:text-slate-900 transition-all cursor-pointer"
            >
              {node.word} <span className="text-[10px] opacity-60 float-right">({node.cluster})</span>
            </button>
          ))}
        </div>
      )}

      {/* main SVG Galaxy Canvas wrapper */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className="w-full h-[420px] cursor-grab active:cursor-grabbing overflow-hidden bg-slate-50/50"
      >
        <svg
          viewBox="0 0 700 700"
          className="w-full h-full select-none"
        >
          {/* Zoom/Pan viewport group */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Draw soft semantic boundaries */}
            {Object.values(CLUSTERS).map((c, i) => (
              <circle
                key={`halo-${i}`}
                cx={c.center[0]}
                cy={c.center[1]}
                r="135"
                fill={c.color}
                fillOpacity="0.012"
                stroke={c.color}
                strokeWidth="1.2"
                strokeDasharray="4 8"
                strokeOpacity="0.15"
              />
            ))}

            {/* Nodes group */}
            {nodes.map((node) => {
              const isBg = node.word.includes('-dot-');
              const isSearched = selectedNode?.id === node.id || 
                (searchQuery.length > 1 && node.word.toLowerCase().includes(searchQuery.toLowerCase()) && !isBg);
              
              return (
                <g key={node.id}>
                  {/* Glowing core for searched items */}
                  {isSearched && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      fill={node.color}
                      fillOpacity="0.25"
                    />
                  )}

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSearched ? 5 : isBg ? 1.5 : 3.5}
                    fill={node.color}
                    opacity={isBg ? 0.35 : 0.85}
                    className="cursor-pointer"
                    onClick={() => !isBg && selectNode(node)}
                  />

                  {/* Words rendering. Hide background names, display semantic words on zoom levels or searches */}
                  {!isBg && (zoom > 1.2 || isSearched) && (
                    <text
                      x={node.x + 7}
                      y={node.y + 3.5}
                      fill={isSearched ? '#0F172A' : '#64748B'}
                      fontSize={isSearched ? '10' : '8'}
                      fontWeight={isSearched ? 'bold' : '500'}
                      className="pointer-events-none font-sans"
                    >
                      {node.word}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Node detail display panel */}
      {selectedNode && (
        <div className="absolute bottom-4 right-4 z-10 bg-white/95 border border-slate-200 rounded-xl p-3 text-left w-64 shadow-md flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-vector animate-pulse" />
            <span className="font-bold text-slate-800 text-sm">{selectedNode.word}</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Positioned at coordinate point <code className="text-xs bg-slate-50 font-mono text-vector py-0.5 px-1 rounded inline-block font-bold">[{selectedNode.x.toFixed(1)}, {selectedNode.y.toFixed(1)}]</code>.
            Clusters inside semantic group <span className="capitalize font-bold text-slate-700">{selectedNode.cluster}</span>.
          </p>
        </div>
      )}
    </div>
  );
};
export default GalaxyPlot;
