import React, { useState, useMemo, useRef } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search } from 'lucide-react';

interface GalaxyNode {
  id: string;
  word: string;
  cluster: 'animals' | 'programming' | 'science' | 'sports' | 'music';
  x: number;
  y: number;
  color: string;
}

const CLUSTERS = {
  animals: {
    center: [220, 220],
    color: '#38BDF8',
    words: [
      'Cat','Dog','Tiger','Wolf','Lion','Bear','Fox','Elephant','Dolphin',
      'Eagle','Whale','Shark','Owl','Rabbit','Panda','Monkey'
    ]
  },
  programming: {
    center: [580, 220],
    color: '#A855F7',
    words: [
      'Python','React','TypeScript','Code','Function','API','Server',
      'Database','Docker','Git','HTML','CSS','Node','Array','Compiler'
    ]
  },
  science: {
    center: [400, 400],
    color: '#10B981',
    words: [
      'Atom','Quantum','Planet','Galaxy','Gravity','DNA','Cell',
      'Energy','Physics','Star','Electron','Laser','Telescope'
    ]
  },
  sports: {
    center: [220, 580],
    color: '#F43F5E',
    words: [
      'Soccer','Tennis','Goal','Match','Athlete','Team',
      'League','Coach','Marathon','Trophy','Sprint'
    ]
  },
  music: {
    center: [580, 580],
    color: '#F59E0B',
    words: [
      'Guitar','Piano','Melody','Rhythm','Song','Album',
      'Singer','Jazz','Bass','Drum','Concert'
    ]
  }
};

export const GalaxyPlot: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<GalaxyNode | null>(null);

  const nodes = useMemo(() => {
    const list: GalaxyNode[] = [];

    Object.entries(CLUSTERS).forEach(([clusterKey, cluster]) => {
      const key = clusterKey as GalaxyNode['cluster'];

      cluster.words.forEach((word) => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 1.8) * 110;

        list.push({
          id: word,
          word,
          cluster: key,
          x: cluster.center[0] + Math.cos(angle) * radius,
          y: cluster.center[1] + Math.sin(angle) * radius,
          color: cluster.color
        });
      });

      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 1.3) * 150;

        list.push({
          id: `${key}-${i}`,
          word: '',
          cluster: key,
          x: cluster.center[0] + Math.cos(angle) * radius,
          y: cluster.center[1] + Math.sin(angle) * radius,
          color: cluster.color
        });
      }
    });

    return list;
  }, []);

  const searchMatches = useMemo(() => {
    if (!search.trim()) return [];

    return nodes.filter(
      (n) =>
        n.word &&
        n.word.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, nodes]);

  const selectNode = (node: GalaxyNode) => {
    setSelected(node);
    setSearch(node.word);

    const centerX = 400;
    const centerY = 400;

    setPan({
      x: centerX - node.x * zoom,
      y: centerY - node.y * zoom
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const factor = e.deltaY < 0 ? 1.12 : 0.88;

    setZoom((z) => Math.max(0.7, Math.min(4, z * factor)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);

    setDragStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelected(null);
    setSearch('');
  };

  return (
    <div className="relative w-full h-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950">
      {/* Star Background */}

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Search */}

      <div className="absolute top-4 left-4 z-20 w-64">
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-2 backdrop-blur">
          <Search size={16} className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search words..."
            className="bg-transparent outline-none border-none text-sm text-white w-full"
          />
        </div>

        {searchMatches.length > 0 && (
          <div className="mt-2 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl">
            {searchMatches.slice(0, 6).map((node) => (
              <button
                key={node.id}
                onClick={() => selectNode(node)}
                className="w-full text-left px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 transition"
              >
                {node.word}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Controls */}

      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.25, 4))}
          className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
        >
          <ZoomIn size={16} />
        </button>

        <button
          onClick={() => setZoom((z) => Math.max(z - 0.25, 0.7))}
          className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
        >
          <ZoomOut size={16} />
        </button>

        <button
          onClick={resetView}
          className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Canvas */}

      <div
        ref={containerRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
        >
          <g
            transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
          >
            {Object.values(CLUSTERS).map((cluster, i) => (
              <circle
                key={i}
                cx={cluster.center[0]}
                cy={cluster.center[1]}
                r={160}
                fill={cluster.color}
                fillOpacity={0.05}
                stroke={cluster.color}
                strokeOpacity={0.15}
                strokeDasharray="5 8"
              />
            ))}

            {nodes.map((node) => {
              const filler = node.word === '';

              const highlighted =
                selected?.id === node.id ||
                (
                  search.length > 1 &&
                  node.word.toLowerCase().includes(search.toLowerCase())
                );

              return (
                <g key={node.id}>
                  {highlighted && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={18}
                      fill={node.color}
                      fillOpacity={0.25}
                    />
                  )}

                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={filler ? 1.5 : highlighted ? 5 : 3}
                    fill={node.color}
                    opacity={filler ? 0.35 : 1}
                    className="cursor-pointer"
                    onClick={() => node.word && selectNode(node)}
                  />

                  {!filler && (zoom > 1.1 || highlighted) && (
                    <text
                      x={node.x + 8}
                      y={node.y + 4}
                      fill={highlighted ? '#FFFFFF' : '#CBD5E1'}
                      fontSize={highlighted ? 11 : 9}
                      fontWeight={highlighted ? 700 : 500}
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

      {/* Bottom Left Legend */}

      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 border border-slate-700 rounded-2xl p-4 backdrop-blur">
        <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 font-bold">
          Semantic Clusters
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Animals
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-violet-400" />
            Programming
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Science
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Sports
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Music
          </div>
        </div>
      </div>

      {/* Selected */}

      {selected && (
        <div className="absolute bottom-4 right-4 z-20 bg-slate-900/95 border border-slate-700 rounded-2xl p-4 w-64 backdrop-blur">
          <div className="text-white font-bold text-lg">
            {selected.word}
          </div>

          <div className="text-slate-400 text-sm mt-1 capitalize">
            {selected.cluster}
          </div>

          <div className="mt-3 text-xs text-slate-500 font-mono">
            [{selected.x.toFixed(1)}, {selected.y.toFixed(1)}]
          </div>
        </div>
      )}
    </div>
  );
};

export default GalaxyPlot;
