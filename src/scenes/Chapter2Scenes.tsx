import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Math as KaTeXMath } from '../components/Math';

// ═══════════════════════════════════════════════════════════════
// Shared Layout Components
// ═══════════════════════════════════════════════════════════════

const SlideLayout: React.FC<{
  title: string;
  text: string;
  sidebarContent?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, text, sidebarContent, children }) => (
  <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
    <div className="flex-1 min-h-0 flex items-center justify-center bg-white/40 border border-slate-200/50 rounded-3xl p-3 shadow-inner overflow-hidden">
      {children}
    </div>
    <div className="w-full lg:w-[280px] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
      <div>
        <h2 className="text-2xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-base leading-relaxed">{text}</p>
      </div>
      {sidebarContent}
    </div>
  </div>
);

const QuestionSlide: React.FC<{
  question: string;
  hint?: string;
  subHint?: string;
  emoji?: string;
}> = ({ question, hint, subHint, emoji }) => (
  <div className="flex flex-col items-center justify-start h-full text-center max-w-3xl mx-auto px-8 gap-7 pt-6 overflow-y-auto">
    {emoji && (
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 14 }}
        className="text-7xl select-none"
      >
        {emoji}
      </motion.div>
    )}
    <motion.h1
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
      className="text-4xl md:text-5xl font-black text-slate-800 leading-tight"
    >
      {question}
    </motion.h1>
    {hint && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="text-xl text-slate-500 font-medium leading-relaxed"
      >
        {hint}
      </motion.p>
    )}
    {subHint && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="text-base text-slate-400 italic"
      >
        {subHint}
      </motion.p>
    )}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 3.2, duration: 1 }}
    >
      <motion.span
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold"
      >
        take a moment · then press →
      </motion.span>
    </motion.div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// PlotCanvas — 2D scatter / vector SVG component
// ═══════════════════════════════════════════════════════════════

interface PlotPoint {
  id: string;
  x: number; // data coords 0-100
  y: number;
  color: string;
  label?: string;
  radius?: number;
  ring?: boolean;
}

interface PlotLine {
  x1: number; y1: number;
  x2: number; y2: number;
  color: string;
  dashed?: boolean;
  width?: number;
  marker?: boolean;
}

const DEFS_MARKERS = (
  <defs>
    {([
      ['red',    '#E11D48'], ['blue',   '#0284C7'], ['green',  '#059669'],
      ['violet', '#7C3AED'], ['slate',  '#64748B'], ['amber',  '#D97706'],
    ] as [string, string][]).map(([n, c]) => (
      <marker key={n} id={`pc-${n}`} viewBox="0 0 10 10" refX="8" refY="5"
        markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill={c} />
      </marker>
    ))}
  </defs>
);

function colorToMarkerId(color: string): string {
  const map: Record<string, string> = {
    '#E11D48': 'red', '#0284C7': 'blue', '#059669': 'green',
    '#7C3AED': 'violet', '#64748B': 'slate', '#D97706': 'amber',
  };
  return map[color] ?? 'slate';
}

const PlotCanvas: React.FC<{
  points: PlotPoint[];
  lines?: PlotLine[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  onMouseDown?: (x: number, y: number, id: string) => void;
}> = ({ points, lines = [], width = 480, height = 480, xLabel, yLabel }) => {
  const pad = 36;
  const pw = width - pad * 2;
  const ph = height - pad * 2;

  const toSvg = (x: number, y: number): [number, number] => [
    pad + (x / 100) * pw,
    pad + ph - (y / 100) * ph,
  ];

  const gridLines = [];
  for (let i = 0; i <= 10; i++) {
    const xi = pad + (i / 10) * pw;
    const yi = pad + (i / 10) * ph;
    gridLines.push(
      <line key={`gv${i}`} x1={xi} y1={pad} x2={xi} y2={pad + ph}
        stroke="#f1f5f9" strokeWidth="1" />,
      <line key={`gh${i}`} x1={pad} y1={yi} x2={pad + pw} y2={yi}
        stroke="#f1f5f9" strokeWidth="1" />,
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full max-h-full">
      {DEFS_MARKERS}
      <rect width={width} height={height} fill="white" rx="16" />
      {gridLines}
      {/* axes */}
      <line x1={pad} y1={pad} x2={pad} y2={pad + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={pad} y1={pad + ph} x2={pad + pw} y2={pad + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      {/* axis labels */}
      {xLabel && <text x={pad + pw / 2} y={height - 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">{xLabel}</text>}
      {yLabel && <text x={8} y={pad + ph / 2} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" transform={`rotate(-90, 8, ${pad + ph / 2})`}>{yLabel}</text>}

      {lines.map((l, i) => {
        const [x1, y1] = toSvg(l.x1, l.y1);
        const [x2, y2] = toSvg(l.x2, l.y2);
        const mid = colorToMarkerId(l.color);
        return (
          <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={l.color} strokeWidth={l.width ?? 1.8}
            strokeDasharray={l.dashed ? '5 3' : undefined}
            markerEnd={l.marker ? `url(#pc-${mid})` : undefined}
          />
        );
      })}

      {points.map(p => {
        const [cx, cy] = toSvg(p.x, p.y);
        return (
          <g key={p.id}>
            {p.ring && <circle cx={cx} cy={cy} r={(p.radius ?? 6) + 5} fill="none" stroke={p.color} strokeWidth="2" opacity="0.4" />}
            <circle cx={cx} cy={cy} r={p.radius ?? 6} fill={p.color} />
            {p.label && (
              <text x={cx + 10} y={cy - 6} fill={p.color} fontSize="11" fontWeight="bold">{p.label}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// Draggable variant
const DraggablePlotCanvas: React.FC<{
  points: PlotPoint[];
  lines?: PlotLine[];
  dragId: string;
  onDrag: (x: number, y: number) => void;
  xLabel?: string;
  yLabel?: string;
}> = ({ points, lines = [], dragId: _dragId, onDrag, xLabel, yLabel }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const W = 480, H = 480, PAD = 36;

  const svgToData = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    const svgX = (clientX - rect.left) * scaleX;
    const svgY = (clientY - rect.top) * scaleY;
    const pw = W - PAD * 2, ph = H - PAD * 2;
    const dx = Math.max(0, Math.min(100, ((svgX - PAD) / pw) * 100));
    const dy = Math.max(0, Math.min(100, (1 - (svgY - PAD) / ph) * 100));
    onDrag(dx, dy);
  }, [onDrag]);

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full cursor-crosshair"
      onMouseDown={e => { dragging.current = true; svgToData(e.clientX, e.clientY); }}
      onMouseMove={e => { if (dragging.current) svgToData(e.clientX, e.clientY); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
    >
      <PlotCanvas points={points} lines={lines} xLabel={xLabel} yLabel={yLabel} />
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.1 — Curiosity Hook
// ═══════════════════════════════════════════════════════════════

export const Scene2_1_CuriosityHook: React.FC = () => {
  const items = [
    { text: 'Near.',             color: 'text-similarity' },
    { text: 'Far.',              color: 'text-loss' },
    { text: 'Almost identical.', color: 'text-vector' },
    { text: 'Completely different.', color: 'text-transformations' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto px-4">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-sm font-mono uppercase tracking-widest mb-8 font-bold"
      >
        Every point in space has a position. And positions have relationships.
      </motion.p>

      <div className="flex flex-col gap-4 mb-10">
        {items.map((item, idx) => (
          <motion.h1
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.5, duration: 0.7, ease: 'easeOut' }}
            className={`text-4xl md:text-6xl font-extrabold tracking-tight ${item.color}`}
          >
            {item.text}
          </motion.h1>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="border-t border-slate-200 pt-8 max-w-xl"
      >
        <p className="text-slate-400 text-lg font-medium mb-2">To find similar things in AI, we ask one question:</p>
        <p className="text-similarity text-3xl md:text-4xl font-black">How close are two points?</p>
      </motion.div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.2 — Question: How Do We Compare?
// ═══════════════════════════════════════════════════════════════

export const Scene2_2_HowDoWeCompare: React.FC = () => (
  <QuestionSlide
    emoji="🗺️"
    question="If everything in AI is a point in space, how does the AI find things that are similar?"
    hint="Think about how you'd find a nearby location on a map. You measure the distance."
    subHint="But what if the 'map' has hundreds of dimensions? We need a formula."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 2.3 — Real-World Proximity Analogies
// ═══════════════════════════════════════════════════════════════

export const Scene2_3_RealWorldProximity: React.FC = () => {
  const [active, setActive] = useState(0);

  const examples = [
    {
      icon: '🎵',
      label: 'Music Streaming',
      analogy: 'Spotify represents songs as points in a high-dimensional space. When you like a song, it finds the nearest points — songs with similar tempo, key, energy, and genre — and recommends them.',
      tag: 'Nearest Neighbors',
      tagColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      points: [
        { id: 'y', x: 45, y: 50, color: '#10B981', label: 'Your Song', ring: true },
        { id: 'a', x: 52, y: 55, color: '#10B981', label: 'Rec A' },
        { id: 'b', x: 40, y: 45, color: '#10B981', label: 'Rec B' },
        { id: 'c', x: 80, y: 25, color: '#94a3b8', label: 'Unrelated' },
        { id: 'd', x: 20, y: 80, color: '#94a3b8', label: 'Different' },
      ],
    },
    {
      icon: '🔍',
      label: 'Semantic Search',
      analogy: 'When you search "happy dog photos", the search engine converts your query into a vector and finds the nearest document vectors — not by matching keywords, but by measuring conceptual distance.',
      tag: 'Vector Search',
      tagColor: 'bg-sky-50 border-sky-200 text-sky-700',
      points: [
        { id: 'q', x: 55, y: 60, color: '#0284C7', label: 'Query', ring: true },
        { id: 'r1', x: 60, y: 65, color: '#0284C7', label: 'Result 1' },
        { id: 'r2', x: 50, y: 55, color: '#0284C7', label: 'Result 2' },
        { id: 'u1', x: 15, y: 30, color: '#94a3b8', label: 'Irrelevant' },
        { id: 'u2', x: 85, y: 20, color: '#94a3b8', label: 'Irrelevant' },
      ],
    },
    {
      icon: '🎬',
      label: 'Movie Recommendations',
      analogy: "Netflix encodes each movie as a point in a genre/style space. Your watch history becomes a point too. The system finds movies that are geometrically close to what you've watched and loved.",
      tag: 'Content Filtering',
      tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
      points: [
        { id: 'w', x: 35, y: 65, color: '#7C3AED', label: 'Watched', ring: true },
        { id: 'm1', x: 42, y: 70, color: '#7C3AED', label: 'Match 1' },
        { id: 'm2', x: 30, y: 58, color: '#7C3AED', label: 'Match 2' },
        { id: 'o1', x: 75, y: 30, color: '#94a3b8', label: 'Mismatch' },
        { id: 'o2', x: 90, y: 80, color: '#94a3b8', label: 'Mismatch' },
      ],
    },
  ];

  const ex = examples[active];

  return (
    <SlideLayout
      title="Proximity Is Everywhere"
      text="Every recommendation system, search engine, and AI assistant is constantly measuring distance between points."
      sidebarContent={
        <div className="flex flex-col gap-2">
          {examples.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer ${
                active === i
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <span className="mr-2">{e.icon}</span>
              <span className="font-bold text-sm">{e.label}</span>
              <span className={`ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                active === i ? 'bg-white/20 border-white/20 text-white' : e.tagColor
              }`}>
                {e.tag}
              </span>
            </button>
          ))}
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed">
            {ex.analogy}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <PlotCanvas
          points={ex.points}
          lines={ex.points.slice(1, 3).map(p => ({
            x1: ex.points[0].x, y1: ex.points[0].y,
            x2: p.x, y2: p.y,
            color: '#10B981', dashed: true,
          }))}
          xLabel="Feature Dimension 1"
          yLabel="Feature Dimension 2"
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.4 — Euclidean Distance (Draggable)
// ═══════════════════════════════════════════════════════════════

export const Scene2_4_EuclideanDistance: React.FC = () => {
  const pA = { x: 25, y: 30 };
  const [bx, setBx] = useState(72);
  const [by, setBy] = useState(70);

  const dx = bx - pA.x, dy = by - pA.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const handleDrag = useCallback((x: number, y: number) => {
    setBx(Math.round(x));
    setBy(Math.round(y));
  }, []);

  const points: PlotPoint[] = [
    { id: 'A', x: pA.x, y: pA.y, color: '#E11D48', label: 'Movie A', radius: 7 },
    { id: 'B', x: bx,   y: by,   color: '#0284C7', label: 'Movie B ← drag', radius: 7, ring: true },
  ];

  const lines: PlotLine[] = [
    { x1: pA.x, y1: pA.y, x2: bx, y2: by, color: '#059669', width: 2 },
    { x1: pA.x, y1: pA.y, x2: bx, y2: pA.y, color: '#E11D48', dashed: true, width: 1.2 },
    { x1: bx,   y1: pA.y, x2: bx, y2: by,   color: '#0284C7', dashed: true, width: 1.2 },
  ];

  return (
    <SlideLayout
      title="Euclidean Distance"
      text="The straight-line distance between two points — just the Pythagorean theorem in disguise. Drag Movie B around to see it update live."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Live Calculation</div>
            <div className="flex flex-col gap-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-rose-600 font-bold">ΔX (horizontal)</span>
                <span className="font-black">{dx.toFixed(1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sky-600 font-bold">ΔY (vertical)</span>
                <span className="font-black">{dy.toFixed(1)}</span>
              </div>
              <div className="border-t border-slate-100 pt-2 mt-1 flex justify-center">
                <KaTeXMath tex={`d = \\sqrt{${dx.toFixed(0)}^2 + ${dy.toFixed(0)}^2}`} />
              </div>
              <div className="text-center text-2xl font-black text-emerald-600">= {dist.toFixed(1)}</div>
            </div>
          </div>

          <div className="p-3 bg-sky-50 border border-sky-100 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-sky-700 block mb-1">The Pythagorean Theorem</span>
            The green diagonal is the hypotenuse. The red and blue dashed lines are the two legs. Distance = length of the hypotenuse.
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">General formula</div>
            <div className="flex justify-center">
              <KaTeXMath tex={`d = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}`} />
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">Works for any number of dimensions</p>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <DraggablePlotCanvas
          points={points}
          lines={lines}
          dragId="B"
          onDrag={handleDrag}
          xLabel="Action Rating"
          yLabel="Comedy Rating"
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.5 — Scaling to Higher Dimensions (Step by Step)
// ═══════════════════════════════════════════════════════════════

export const Scene2_5_HigherDimensions: React.FC = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: '2D: Two features',
      detail: 'Two movies. Each has an action score and a comedy score. We can plot them and measure the Pythagorean distance.',
      formula: 'd = \\sqrt{(B_x-A_x)^2 + (B_y-A_y)^2}',
      dims: ['Action', 'Comedy'],
      ex: 'd = \\sqrt{45^2 + 40^2} = 60.2',
    },
    {
      label: '3D: Add Drama',
      detail: 'Add a Drama score. Now each movie is a point in 3D space. We just extend the formula with one more term.',
      formula: 'd = \\sqrt{\\Delta x^2 + \\Delta y^2 + \\Delta z^2}',
      dims: ['Action', 'Comedy', 'Drama'],
      ex: 'd = \\sqrt{45^2 + 40^2 + 20^2} = 63.5',
    },
    {
      label: '100D: Real embeddings',
      detail: "ChatGPT's word embeddings have 1536 dimensions. Each dimension captures a subtle semantic feature. The formula just keeps adding terms.",
      formula: 'd = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}',
      dims: ['Action', 'Comedy', 'Drama', '...', 'dim 100'],
      ex: 'd = \\sqrt{\\sum_{i=1}^{100}(B_i - A_i)^2}',
    },
  ];

  const maxStep = steps.length - 1;
  const s = steps[step];

  return (
    <SlideLayout
      title="Scale to Any Dimension"
      text="Euclidean distance extends naturally — just add more terms under the square root. Each new feature adds one more squared difference."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {steps.map((st, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i  ? 'bg-white border-slate-300 shadow-sm'
              : step > i ? 'bg-emerald-50 border-emerald-200'
              :             'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-similarity' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i ? 'text-slate-300' : 'text-slate-600'}`}>{st.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{s.detail}</p>

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(maxStep, s + 1))} disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-8 w-full max-w-lg px-4">
        {/* Dimension pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {s.dims.map((d, i) => (
            <motion.span
              key={`${step}-${i}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                d === '...' ? 'bg-slate-50 border-dashed border-slate-300 text-slate-400' :
                i < 2 ? 'bg-emerald-50 border-emerald-200 text-emerald-700' :
                i === 2 ? 'bg-violet-50 border-violet-200 text-violet-700' :
                'bg-slate-100 border-slate-200 text-slate-600'
              }`}
            >
              {d}
            </motion.span>
          ))}
        </div>

        {/* Formula */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="bg-white border border-slate-200 rounded-2xl px-8 py-6 shadow-sm text-center flex flex-col gap-4 w-full"
          >
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">Formula</span>
            <KaTeXMath tex={s.formula} block />
            <div className="border-t border-slate-100 pt-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">Example</span>
              <KaTeXMath tex={s.ex} block />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.6 — Question: The Magnitude Trap
// ═══════════════════════════════════════════════════════════════

export const Scene2_6_MagnitudeTrapQuestion: React.FC = () => (
  <QuestionSlide
    emoji="🤔"
    question="Two movies: same genre ratio (60% action, 40% comedy). One has 10 reviews, the other has 10,000."
    hint="Euclidean distance says they're far apart. But should they really be treated as different?"
    subHint="If two people both prefer action over comedy, do we care that one person has seen more movies?"
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 2.7 — The Same Ray Problem
// ═══════════════════════════════════════════════════════════════

export const Scene2_7_SameDifferent: React.FC = () => {
  const indieX = 18, indieY = 24;
  const blockX = 72, blockY = 96;
  const eucDist = Math.sqrt(Math.pow(blockX - indieX, 2) + Math.pow(blockY - indieY, 2));

  return (
    <SlideLayout
      title="Same Direction, Different Scale"
      text="Both movies point in the same direction from the origin — same genre ratio. But Euclidean distance says they're far apart, just because one is bigger."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-wider font-black text-rose-700">The Problem</span>
            <p className="text-xs text-slate-700 font-medium leading-relaxed">
              Euclidean distance between them is <span className="font-black text-rose-600">{eucDist.toFixed(0)}</span> — suggesting they're very different. But they have the exact same genre ratio!
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-2 font-mono text-xs text-slate-700">
            <div className="text-[10px] uppercase tracking-wider font-black text-slate-400 mb-1">Genre Ratio</div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span>Indie: [{indieX}, {indieY}] → ratio 3:4</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
              <span>Block: [{blockX}, {blockY}] → ratio 3:4</span>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-emerald-700 block mb-1">The Fix</span>
            We need a metric that measures the <em>angle</em> between vectors, ignoring their length. That's cosine similarity.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <PlotCanvas
          points={[
            { id: 'o',  x: 0,       y: 0,       color: '#0f172a', radius: 5, label: 'Origin' },
            { id: 'in', x: indieX,  y: indieY,  color: '#E11D48', label: 'Indie (10 reviews)', radius: 7 },
            { id: 'bl', x: blockX,  y: blockY,  color: '#7C3AED', label: 'Blockbuster (10k)', radius: 7 },
          ]}
          lines={[
            { x1: 0, y1: 0, x2: blockX + 5, y2: (blockX + 5) * (blockY / blockX), color: '#94a3b8', dashed: true, width: 1 },
            { x1: 0, y1: 0, x2: indieX, y2: indieY, color: '#E11D48', width: 2, marker: true },
            { x1: 0, y1: 0, x2: blockX, y2: blockY, color: '#7C3AED', width: 2, marker: true },
            { x1: indieX, y1: indieY, x2: blockX, y2: blockY, color: '#059669', dashed: true, width: 1.5 },
          ]}
          xLabel="Action Score"
          yLabel="Comedy Score"
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.8 — Question: Cosine Idea
// ═══════════════════════════════════════════════════════════════

export const Scene2_8_CosineIdea: React.FC = () => (
  <QuestionSlide
    emoji="📐"
    question="What if we stopped caring about the length of the arrows and only measured the angle between them?"
    hint="Two arrows pointing in the same direction would score 1.0 — perfectly similar. Perpendicular would score 0. Opposite would score −1."
    subHint="This is cosine similarity. It measures direction, not magnitude."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 2.9 — Cosine Similarity (Interactive)
// ═══════════════════════════════════════════════════════════════

export const Scene2_9_CosineSimilarity: React.FC = () => {
  const [angleA, setAngleA] = useState(55);
  const [angleB, setAngleB] = useState(25);
  const [lenA, setLenA] = useState(65);
  const [lenB, setLenB] = useState(75);

  const toXY = (angleDeg: number, len: number) => ({
    x: 50 + (len / 2) * Math.cos((angleDeg * Math.PI) / 180),
    y: 50 + (len / 2) * Math.sin((angleDeg * Math.PI) / 180),
  });

  const ptA = toXY(angleA, lenA);
  const ptB = toXY(angleB, lenB);

  // Real calculation from origin
  const vAx = ptA.x - 50, vAy = ptA.y - 50;
  const vBx = ptB.x - 50, vBy = ptB.y - 50;
  const dotReal = vAx * vBx + vAy * vBy;
  const magAReal = Math.sqrt(vAx * vAx + vAy * vAy);
  const magBReal = Math.sqrt(vBx * vBx + vBy * vBy);
  const cosSim = dotReal / (magAReal * magBReal || 1);
  const thetaDeg = (Math.acos(Math.min(1, Math.max(-1, cosSim))) * 180) / Math.PI;

  const presets = [
    { label: 'Same Direction', aA: 40, aB: 40, lA: 55, lB: 80 },
    { label: 'Perpendicular', aA: 90, aB: 0, lA: 65, lB: 65 },
    { label: 'Opposite', aA: 0, aB: 180, lA: 65, lB: 65 },
    { label: 'Similar (small angle)', aA: 50, aB: 35, lA: 55, lB: 70 },
  ];

  return (
    <SlideLayout
      title="Cosine Similarity"
      text="Measures the angle between two vectors, completely ignoring how long they are. Scale doesn't matter — only direction."
      sidebarContent={
        <div className="flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 font-mono text-xs">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Live Result</div>
            <div className="text-center mb-3">
              <div className="text-[10px] text-slate-400 font-bold mb-1">Angle θ</div>
              <div className="text-3xl font-black text-similarity">{thetaDeg.toFixed(0)}°</div>
            </div>
            <div className="flex justify-center py-2 border-y border-slate-100 mb-2">
              <KaTeXMath tex={`\\cos\\theta = \\frac{A \\cdot B}{\\|A\\|\\|B\\|}`} />
            </div>
            <div className={`text-center text-2xl font-black ${cosSim >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {cosSim.toFixed(3)}
            </div>
            <div className="text-center text-[10px] text-slate-400 mt-1">
              {cosSim > 0.9 ? 'Nearly identical direction' :
               cosSim > 0.5 ? 'Similar direction' :
               cosSim > 0.1 ? 'Loosely related' :
               cosSim > -0.1 ? 'No relationship' :
               cosSim > -0.5 ? 'Somewhat opposing' : 'Strongly opposing'}
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">Try These</div>
            <div className="flex flex-col gap-1.5">
              {presets.map((p, i) => (
                <button key={i} onClick={() => { setAngleA(p.aA); setAngleB(p.aB); setLenA(p.lA); setLenB(p.lB); }}
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-600 text-left cursor-pointer transition-all">
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <PlotCanvas
          points={[
            { id: 'o', x: 50, y: 50, color: '#0f172a', radius: 5 },
            { id: 'A', x: ptA.x, y: ptA.y, color: '#E11D48', label: `A  |len=${lenA}|`, radius: 6 },
            { id: 'B', x: ptB.x, y: ptB.y, color: '#0284C7', label: `B  |len=${lenB}|`, radius: 6 },
          ]}
          lines={[
            { x1: 50, y1: 50, x2: ptA.x, y2: ptA.y, color: '#E11D48', width: 2.5, marker: true },
            { x1: 50, y1: 50, x2: ptB.x, y2: ptB.y, color: '#0284C7', width: 2.5, marker: true },
          ]}
          xLabel="Feature X"
          yLabel="Feature Y"
        />
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.10 — Cosine Math (Step by Step)
// ═══════════════════════════════════════════════════════════════

export const Scene2_10_CosineMath: React.FC = () => {
  const [step, setStep] = useState(0);

  const vecA = [40, 35];
  const vecB = [70, 20];
  const dotVal = vecA[0] * vecB[0] + vecA[1] * vecB[1];
  const mA = Math.sqrt(vecA[0] ** 2 + vecA[1] ** 2);
  const mB = Math.sqrt(vecB[0] ** 2 + vecB[1] ** 2);
  const cosV = dotVal / (mA * mB);

  const steps = [
    { label: 'Start', detail: 'We have A = [40, 35] and B = [70, 20]. We want to know how similar their directions are.' },
    { label: 'Compute Dot Product', detail: `Multiply matching coordinates and sum: 40×70 + 35×20 = 2800 + 700 = ${dotVal}.` },
    { label: 'Compute Magnitudes', detail: `|A| = √(40²+35²) = ${mA.toFixed(2)}, |B| = √(70²+20²) = ${mB.toFixed(2)}. This is the "length" of each vector.` },
    { label: 'Divide to Normalize', detail: `cos θ = dot / (|A| × |B|) = ${dotVal} / (${mA.toFixed(1)} × ${mB.toFixed(1)}) = ${cosV.toFixed(3)}.` },
    { label: 'Interpret!', detail: `${cosV.toFixed(3)} means cos θ ≈ ${cosV.toFixed(3)} → angle ≈ ${(Math.acos(cosV) * 180 / Math.PI).toFixed(0)}°. The vectors are quite similar in direction.` },
  ];

  const maxStep = steps.length - 1;

  return (
    <SlideLayout
      title="The Normalization Trick"
      text="Dividing by the magnitudes cancels out scale completely. You're left with a pure angle measure between −1 and +1."
      sidebarContent={
        <div className="flex flex-col gap-3">
          {steps.map((s, i) => (
            <div key={i} className={`px-3 py-2.5 rounded-xl border text-xs transition-all ${
              step === i  ? 'bg-white border-slate-300 shadow-sm'
              : step > i ? 'bg-emerald-50 border-emerald-200'
              :             'border-transparent text-slate-300'
            }`}>
              <span className={`text-[10px] uppercase tracking-wider font-black block mb-0.5 ${
                step === i ? 'text-similarity' : step > i ? 'text-emerald-500' : 'text-slate-300'
              }`}>
                {step > i ? '✓' : `Step ${i + 1}`}
              </span>
              <span className={`font-medium ${step < i ? 'text-slate-300' : 'text-slate-600'}`}>{s.label}</span>
            </div>
          ))}

          <p className="text-xs text-slate-500 font-medium px-1 leading-relaxed">{steps[step].detail}</p>

          <div className="flex gap-2 mt-1">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
              className="flex-1 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              ← Back
            </button>
            <button onClick={() => setStep(s => Math.min(maxStep, s + 1))} disabled={step === maxStep}
              className="flex-1 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all">
              Next →
            </button>
          </div>
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-lg px-4">
        {/* Formula visualization */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-6 shadow-sm">
          <div className="text-center mb-4">
            <KaTeXMath tex={`\\text{cos}(\\theta) = \\frac{A \\cdot B}{\\|A\\| \\cdot \\|B\\|}`} block />
          </div>

          <AnimatePresence>
            {step >= 1 && (
              <motion.div key="dot" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-2">
                <span className="text-xs font-bold text-rose-700">A · B (numerator)</span>
                <span className="font-black text-rose-600 font-mono">{dotVal}</span>
              </motion.div>
            )}
            {step >= 2 && (
              <motion.div key="mags" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 mb-2">
                <span className="text-xs font-bold text-sky-700">|A| × |B| (denominator)</span>
                <span className="font-black text-sky-600 font-mono">{(mA * mB).toFixed(1)}</span>
              </motion.div>
            )}
            {step >= 3 && (
              <motion.div key="cos" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-3">
                <span className="text-xs font-bold text-emerald-700">cos θ (similarity)</span>
                <span className="font-black text-emerald-600 font-mono text-xl">{cosV.toFixed(3)}</span>
              </motion.div>
            )}
            {step >= 4 && (
              <motion.div key="angle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-3 bg-violet-50 border border-violet-200 rounded-xl px-4 py-3 mt-2">
                <KaTeXMath tex={`\\theta = \\arccos(${cosV.toFixed(3)}) \\approx ${(Math.acos(cosV) * 180 / Math.PI).toFixed(0)}°`} />
              </motion.div>
            )}
          </AnimatePresence>

          {step === 0 && (
            <div className="text-center text-slate-400 text-sm font-medium mt-2 border border-dashed border-slate-200 rounded-xl py-4">
              Press Next to walk through →
            </div>
          )}
        </div>

        {/* Magnitude doesn't change similarity */}
        {step >= 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="w-full p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-slate-600 font-medium leading-relaxed">
            <span className="font-bold text-amber-700 block mb-1">Key insight</span>
            Even if you scale A to [400, 350] or B to [7000, 2000], the magnitudes scale proportionally — the ratio stays the same. Cosine similarity doesn't change.
          </motion.div>
        )}
      </div>
    </SlideLayout>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.11 — Question: When to Use Which?
// ═══════════════════════════════════════════════════════════════

export const Scene2_11_WhenToUseWhich: React.FC = () => (
  <QuestionSlide
    emoji="⚖️"
    question="Euclidean measures how far apart. Cosine measures how similar in direction. When would you choose one over the other?"
    hint="If a bigger number simply means 'more of the same thing', does size matter? Or only the ratio?"
    subHint="Document length, review count, purchase volume — these might not reflect quality. Cosine handles that by normalizing."
  />
);

// ═══════════════════════════════════════════════════════════════
// SCENE 2.12 — Proximity Sandbox
// ═══════════════════════════════════════════════════════════════

export const Scene2_12_ProximitySandbox: React.FC = () => {
  const [metric, setMetric] = useState<'euclidean' | 'cosine'>('euclidean');
  const [targetX, setTargetX] = useState(35);
  const [targetY, setTargetY] = useState(40);

  const candidates = [
    { id: 'c1', label: 'Indie Action',   x: 18,  y: 24,  color: '#E11D48'  },
    { id: 'c2', label: 'Blockbuster',    x: 72,  y: 96,  color: '#7C3AED'  },
    { id: 'c3', label: 'Comedy Short',   x: 42,  y: 10,  color: '#D97706'  },
    { id: 'c4', label: 'Mainstream',     x: 48,  y: 52,  color: '#0284C7'  },
    { id: 'c5', label: 'Indie Comedy',   x: 12,  y: 55,  color: '#059669'  },
  ];

  const getScore = (c: typeof candidates[0]) => {
    const dx = c.x - targetX, dy = c.y - targetY;
    if (metric === 'euclidean') {
      return { score: Math.sqrt(dx * dx + dy * dy), metricLabel: 'd', lower: true };
    } else {
      const dot = c.x * targetX + c.y * targetY;
      const magT = Math.sqrt(targetX ** 2 + targetY ** 2);
      const magC = Math.sqrt(c.x ** 2 + c.y ** 2);
      return { score: dot / (magT * magC), metricLabel: 'cos', lower: false };
    }
  };

  const ranked = [...candidates].map(c => ({ ...c, ...getScore(c) }))
    .sort((a, b) => a.lower ? a.score - b.score : b.score - a.score);

  const topIds = ranked.slice(0, 2).map(r => r.id);

  const handleDrag = useCallback((x: number, y: number) => {
    setTargetX(Math.round(x));
    setTargetY(Math.round(y));
  }, []);

  const points: PlotPoint[] = [
    { id: 'target', x: targetX, y: targetY, color: '#10B981', label: 'Target ← drag', radius: 9, ring: true },
    ...candidates.map(c => ({
      id: c.id, x: c.x, y: c.y, radius: 6,
      color: topIds.includes(c.id) ? c.color : '#cbd5e1',
      label: topIds.includes(c.id) ? c.label : undefined,
    })),
  ];

  const lines: PlotLine[] = candidates.map(c => ({
    x1: targetX, y1: targetY, x2: c.x, y2: c.y,
    color: topIds.includes(c.id) ? '#10B981' : 'rgba(203,213,225,0.4)',
    dashed: !topIds.includes(c.id),
    width: topIds.includes(c.id) ? 2 : 1,
  }));

  return (
    <SlideLayout
      title="Proximity Sandbox"
      text="Drag the target point anywhere on the plot. Switch between Euclidean and Cosine to see how the rankings change — especially for the Blockbuster."
      sidebarContent={
        <div className="flex flex-col gap-4">
          {/* Metric toggle */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button onClick={() => setMetric('euclidean')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                metric === 'euclidean' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}>
              Euclidean
            </button>
            <button onClick={() => setMetric('cosine')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold text-center transition-all cursor-pointer ${
                metric === 'cosine' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
              }`}>
              Cosine
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">All Rankings</span>
            {ranked.map((c, i) => (
              <div key={c.id} className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono font-bold transition-all ${
                i < 2 ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50/50 border-slate-100 text-slate-400'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-black"
                    style={{ backgroundColor: i < 2 ? c.color : '#cbd5e1' }}>
                    {i + 1}
                  </span>
                  <span className={i < 2 ? 'text-slate-700' : 'text-slate-400'}>{c.label}</span>
                </div>
                <span className={i < 2 ? 'text-emerald-600' : 'text-slate-300'}>
                  {c.metricLabel}: {c.score.toFixed(metric === 'euclidean' ? 1 : 3)}
                </span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 font-medium leading-relaxed">
            Watch how the Blockbuster (which has the same direction as Indie Action but bigger scale) ranks differently under each metric.
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4">
        <DraggablePlotCanvas
          points={points}
          lines={lines}
          dragId="target"
          onDrag={handleDrag}
          xLabel="Action Score"
          yLabel="Comedy Score"
        />
      </div>
    </SlideLayout>
  );
};
