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
    <div className="w-full lg:w-[35%] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
      <div>
        <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">{title}</h2>
        <p className="text-slate-600 text-lg leading-relaxed">{text}</p>
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
// SCENE 2.3b — Why Do We Need a Formula?
// ═══════════════════════════════════════════════════════════════

export const Scene2_3b_WhyFormula: React.FC = () => {
  const [step, setStep] = useState(0);

  const reasons = [
    {
      icon: '👁️',
      title: "Visual intuition breaks at 3D",
      body: "You can see 'closer' on a 2D chart. But ChatGPT uses 1,536-dimensional vectors. There's no chart for that — we need arithmetic.",
      color: '#0284C7', bg: 'bg-sky-50', border: 'border-sky-200',
    },
    {
      icon: '⚡',
      title: "Computers need exact numbers",
      body: 'A recommendation engine compares your taste vector to 50 million songs every second. "Looks about the same" won\'t cut it — we need a number.',
      color: '#7C3AED', bg: 'bg-violet-50', border: 'border-violet-200',
    },
    {
      icon: '🏆',
      title: "Formulas let us rank and sort",
      body: 'With a number, we can rank 1,000 candidates and pick the top 5. Without a formula, we can\'t sort. Without sorting, no search engine, no recommendation, no AI retrieval.',
      color: '#059669', bg: 'bg-emerald-50', border: 'border-emerald-200',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-3xl mx-auto px-6 gap-6">
      <div className="text-center">
        <motion.p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Bridge</motion.p>
        <motion.h2 className="text-3xl font-black text-slate-800"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          Intuition is great. But we need a number.
        </motion.h2>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: step >= i ? 1 : 0.1, x: step >= i ? 0 : -20 }}
            transition={{ duration: 0.4 }}
            onClick={() => setStep(Math.max(step, i + 1))}
            className={`${r.bg} border ${r.border} rounded-2xl p-4 flex items-start gap-4 cursor-pointer hover:shadow-md transition-all`}
          >
            <div className="text-3xl shrink-0 mt-0.5">{r.icon}</div>
            <div>
              <div className="font-black text-slate-800 text-base mb-1" style={{ color: r.color }}>{r.title}</div>
              <div className="text-slate-600 text-sm font-medium leading-relaxed">{r.body}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {step >= reasons.length ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="px-6 py-3 bg-slate-800 text-white rounded-2xl text-sm font-bold text-center"
        >
          Next up: the formula — then a live interactive to feel it. →
        </motion.div>
      ) : (
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}
          className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          tap each card to unlock
        </motion.p>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SCENE 2.4 — Euclidean Distance (Annotated Draggable)
// ═══════════════════════════════════════════════════════════════

const AnnotatedEuclidCanvas: React.FC<{
  ax: number; ay: number;
  bx: number; by: number;
  onDrag: (x: number, y: number) => void;
}> = ({ ax, ay, bx, by, onDrag }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);
  const W = 480, H = 480, PAD = 52;
  const pw = W - PAD * 2, ph = H - PAD * 2;

  const toSvg = (x: number, y: number): [number, number] => [
    PAD + (x / 100) * pw,
    PAD + ph - (y / 100) * ph,
  ];

  const svgToData = useCallback((clientX: number, clientY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = W / rect.width, scaleY = H / rect.height;
    const sx = (clientX - rect.left) * scaleX, sy = (clientY - rect.top) * scaleY;
    onDrag(
      Math.max(2, Math.min(98, ((sx - PAD) / pw) * 100)),
      Math.max(2, Math.min(98, (1 - (sy - PAD) / ph) * 100)),
    );
  }, [onDrag]);

  const [sAx, sAy] = toSvg(ax, ay);
  const [sBx, sBy] = toSvg(bx, by);
  const [sCx, sCy] = toSvg(bx, ay); // right-angle corner

  const dx = bx - ax, dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // midpoints for leg labels
  const mHx = (sAx + sCx) / 2, mHy = sCy;
  const mVx = sCx,              mVy = (sCy + sBy) / 2;
  const mDx = (sAx + sBx) / 2, mDy = (sAy + sBy) / 2;

  // right-angle box size/orientation
  const boxSize = 10;
  const signX = dx >= 0 ? 1 : -1;
  const signY = dy >= 0 ? -1 : 1;

  const ticks = [0, 25, 50, 75, 100];

  return (
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full cursor-crosshair"
      onMouseDown={e => { dragging.current = true; svgToData(e.clientX, e.clientY); }}
      onMouseMove={e => { if (dragging.current) svgToData(e.clientX, e.clientY); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={e => { dragging.current = true; svgToData(e.touches[0].clientX, e.touches[0].clientY); }}
      onTouchMove={e => { if (dragging.current) svgToData(e.touches[0].clientX, e.touches[0].clientY); e.preventDefault(); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {DEFS_MARKERS}
      <rect width={W} height={H} fill="white" rx="16" />

      {/* Grid + tick labels */}
      {ticks.map(t => {
        const [xi] = toSvg(t, 0);
        const [, yi] = toSvg(0, t);
        return (
          <g key={t}>
            <line x1={xi} y1={PAD} x2={xi} y2={PAD + ph} stroke="#f1f5f9" strokeWidth="1" />
            <line x1={PAD} y1={yi} x2={PAD + pw} y2={yi} stroke="#f1f5f9" strokeWidth="1" />
            <text x={xi} y={PAD + ph + 16} textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">{t}</text>
            <text x={PAD - 6} y={yi + 4} textAnchor="end" fill="#94a3b8" fontSize="10" fontWeight="bold">{t}</text>
          </g>
        );
      })}

      {/* Axes */}
      <line x1={PAD} y1={PAD} x2={PAD} y2={PAD + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1={PAD} y1={PAD + ph} x2={PAD + pw} y2={PAD + ph} stroke="#cbd5e1" strokeWidth="1.5" />
      <text x={PAD + pw / 2} y={H - 4} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">Action Rating</text>
      <text x={12} y={PAD + ph / 2} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold" transform={`rotate(-90,12,${PAD + ph / 2})`}>Comedy Rating</text>

      {/* Triangle legs */}
      <line x1={sAx} y1={sAy} x2={sCx} y2={sCy} stroke="#E11D48" strokeWidth="2" strokeDasharray="6 3" />
      <line x1={sCx} y1={sCy} x2={sBx} y2={sBy} stroke="#0284C7" strokeWidth="2" strokeDasharray="6 3" />

      {/* Right-angle box */}
      <polyline
        points={`${sCx},${sCy - signY * boxSize} ${sCx + signX * boxSize},${sCy - signY * boxSize} ${sCx + signX * boxSize},${sCy}`}
        fill="none" stroke="#94a3b8" strokeWidth="1.5"
      />

      {/* Hypotenuse */}
      <line x1={sAx} y1={sAy} x2={sBx} y2={sBy} stroke="#059669" strokeWidth="3" />

      {/* Δx label on horizontal leg */}
      <rect x={mHx - 26} y={mHy + (dy >= 0 ? 6 : -22)} width="52" height="16" fill="white" rx="5" opacity="0.92" stroke="#E11D48" strokeWidth="1" />
      <text x={mHx} y={mHy + (dy >= 0 ? 18 : -10)} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">Δx = {Math.abs(dx).toFixed(0)}</text>

      {/* Δy label on vertical leg */}
      <rect x={mVx + (dx >= 0 ? 6 : -58)} y={mVy - 8} width="52" height="16" fill="white" rx="5" opacity="0.92" stroke="#0284C7" strokeWidth="1" />
      <text x={mVx + (dx >= 0 ? 32 : -32)} y={mVy + 4} textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">Δy = {Math.abs(dy).toFixed(0)}</text>

      {/* Distance badge on hypotenuse */}
      <rect x={mDx - 32} y={mDy - 12} width="64" height="22" fill="#059669" rx="11" />
      <text x={mDx} y={mDy + 4} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">d = {dist.toFixed(1)}</text>

      {/* Point A with coordinate label */}
      <circle cx={sAx} cy={sAy} r="7" fill="#E11D48" />
      <rect x={sAx - 42} y={sAy - 32} width="84" height="20" fill="white" rx="5" opacity="0.95" stroke="#E11D48" strokeWidth="1.2" />
      <text x={sAx} y={sAy - 17} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">A [{ax}, {ay}]</text>

      {/* Point B with coordinate label + drag ring */}
      <circle cx={sBx} cy={sBy} r="12" fill="none" stroke="#0284C7" strokeWidth="2" opacity="0.35" />
      <circle cx={sBx} cy={sBy} r="7" fill="#0284C7" />
      <rect x={sBx - 48} y={sBy - 32} width="96" height="20" fill="white" rx="5" opacity="0.95" stroke="#0284C7" strokeWidth="1.2" />
      <text x={sBx} y={sBy - 17} textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">B [{bx.toFixed(0)}, {by.toFixed(0)}] ← drag</text>
    </svg>
  );
};

export const Scene2_4_EuclideanDistance: React.FC = () => {
  const ax = 25, ay = 30;
  const [bx, setBx] = useState(72);
  const [by, setBy] = useState(70);

  const dx = bx - ax, dy = by - ay;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const handleDrag = useCallback((x: number, y: number) => {
    setBx(parseFloat(x.toFixed(1)));
    setBy(parseFloat(y.toFixed(1)));
  }, []);

  return (
    <SlideLayout
      title="Euclidean Distance"
      text="The straight-line distance between two points — Pythagoras in disguise. Drag Movie B. Every label on the graph updates live."
      sidebarContent={
        <div className="flex flex-col gap-4">
          {/* Live breakdown */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-3">Step-by-step</div>
            <div className="flex flex-col gap-2 text-sm font-mono">
              <div className="flex items-center justify-between px-2 py-1.5 bg-rose-50 border border-rose-100 rounded-lg">
                <span className="text-rose-600 font-bold text-xs">Δx (horizontal gap)</span>
                <span className="font-black text-rose-700">{dx.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 bg-sky-50 border border-sky-100 rounded-lg">
                <span className="text-sky-600 font-bold text-xs">Δy (vertical gap)</span>
                <span className="font-black text-sky-700">{dy.toFixed(1)}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                <span className="text-slate-500 text-xs">Δx² + Δy²</span>
                <span className="font-black text-slate-700">{(dx*dx + dy*dy).toFixed(0)}</span>
              </div>
              <div className="flex items-center justify-between px-2 py-2 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-emerald-700 font-bold text-xs">d = √( Δx² + Δy² )</span>
                <span className="text-2xl font-black text-emerald-600">{dist.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium leading-relaxed">
            <span className="font-bold block mb-1">💡 What the colors mean</span>
            <span className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-rose-500 inline-block" /> Red dashes = horizontal gap (Δx)</span>
            <span className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-sky-500 inline-block" /> Blue dashes = vertical gap (Δy)</span>
            <span className="flex items-center gap-2"><span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Green = straight-line distance</span>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-600">
            <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">Scales to n dimensions</div>
            <div className="flex justify-center">
              <KaTeXMath tex={`d = \\sqrt{\\sum_{i=1}^{n}(B_i - A_i)^2}`} />
            </div>
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <AnnotatedEuclidCanvas ax={ax} ay={ay} bx={bx} by={by} onDrag={handleDrag} />
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
// SCENE 2.9 — Cosine Similarity (Annotated interactive)
// ═══════════════════════════════════════════════════════════════

const AnnotatedCosineCanvas: React.FC<{
  ax: number; ay: number; // unit-scale: -1 to 1, scaled by lenA
  bx: number; by: number;
  lenA: number; lenB: number;
  cosSim: number; thetaDeg: number;
}> = ({ ax, ay, bx, by, lenA, lenB, cosSim, thetaDeg }) => {
  const W = 460, H = 460, CX = W / 2, CY = H / 2, SC = 68;

  // Vector tip coords in SVG space
  const tipAx = CX + ax * SC, tipAy = CY - ay * SC;
  const tipBx = CX + bx * SC, tipBy = CY - by * SC;

  // Arc: draw from A to B using SVG arc
  const arcR = SC * 1.4;
  const angA = Math.atan2(-ay, ax); // SVG y is flipped
  const angB = Math.atan2(-by, bx);
  let startAng = angA, endAng = angB;
  // Ensure we draw the smaller arc
  let diff = endAng - startAng;
  while (diff > Math.PI) diff -= 2 * Math.PI;
  while (diff < -Math.PI) diff += 2 * Math.PI;
  const arcX1 = CX + arcR * Math.cos(startAng);
  const arcY1 = CY + arcR * Math.sin(startAng);
  const arcX2 = CX + arcR * Math.cos(startAng + diff);
  const arcY2 = CY + arcR * Math.sin(startAng + diff);
  const largeArc = Math.abs(diff) > Math.PI ? 1 : 0;
  const sweep = diff > 0 ? 1 : 0;

  // Angle label midpoint
  const midAng = startAng + diff / 2;
  const lblR = arcR + 16;
  const lblX = CX + lblR * Math.cos(midAng);
  const lblY = CY + lblR * Math.sin(midAng);

  // Cosine badge color
  const badgeColor = cosSim > 0.5 ? '#059669' : cosSim > 0.1 ? '#D97706' : cosSim > -0.1 ? '#64748B' : '#E11D48';

  const gridTicks = [-2, -1, 0, 1, 2];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full max-h-full">
      <defs>
        <marker id="cos-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#E11D48" />
        </marker>
        <marker id="cos-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
        </marker>
      </defs>
      <rect width={W} height={H} fill="white" rx="16" />

      {/* Grid lines */}
      {gridTicks.map(t => {
        const xi = CX + t * SC, yi = CY - t * SC;
        return (
          <g key={t}>
            <line x1={xi} y1={28} x2={xi} y2={H - 28} stroke={t === 0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={t === 0 ? 1.5 : 1} />
            <line x1={28} y1={yi} x2={W - 28} y2={yi} stroke={t === 0 ? '#cbd5e1' : '#f1f5f9'} strokeWidth={t === 0 ? 1.5 : 1} />
            {t !== 0 && <text x={xi} y={CY + 16} textAnchor="middle" fill="#94a3b8" fontSize="10">{t}</text>}
            {t !== 0 && <text x={CX + 10} y={yi + 4} fill="#94a3b8" fontSize="10">{t}</text>}
          </g>
        );
      })}

      {/* Angle arc */}
      {Math.abs(diff) > 0.02 && (
        <path
          d={`M ${arcX1} ${arcY1} A ${arcR} ${arcR} 0 ${largeArc} ${sweep} ${arcX2} ${arcY2}`}
          fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 2"
        />
      )}

      {/* Angle label */}
      <rect x={lblX - 22} y={lblY - 10} width="44" height="18" fill="#7C3AED" rx="9" opacity="0.9" />
      <text x={lblX} y={lblY + 4} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">θ={thetaDeg.toFixed(0)}°</text>

      {/* Vector A */}
      <line x1={CX} y1={CY} x2={tipAx} y2={tipAy} stroke="#E11D48" strokeWidth="3" markerEnd="url(#cos-red)" />
      {/* Coordinate label for A */}
      <rect x={tipAx - 48} y={tipAy - 28} width="96" height="20" fill="white" rx="5" opacity="0.95" stroke="#E11D48" strokeWidth="1.2" />
      <text x={tipAx} y={tipAy - 13} textAnchor="middle" fill="#E11D48" fontSize="11" fontWeight="bold">A = [{(ax * lenA / 10).toFixed(1)}, {(ay * lenA / 10).toFixed(1)}]</text>

      {/* Vector B */}
      <line x1={CX} y1={CY} x2={tipBx} y2={tipBy} stroke="#0284C7" strokeWidth="3" markerEnd="url(#cos-blue)" />
      {/* Coordinate label for B */}
      <rect x={tipBx - 48} y={tipBy - 28} width="96" height="20" fill="white" rx="5" opacity="0.95" stroke="#0284C7" strokeWidth="1.2" />
      <text x={tipBx} y={tipBy - 13} textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="bold">B = [{(bx * lenB / 10).toFixed(1)}, {(by * lenB / 10).toFixed(1)}]</text>

      {/* Origin */}
      <circle cx={CX} cy={CY} r="5" fill="#0f172a" />
      <text x={CX + 8} y={CY + 16} fill="#64748B" fontSize="10" fontWeight="bold">origin</text>

      {/* Cosine score badge — top left */}
      <rect x={32} y={32} width="130" height="48" fill="white" rx="12" stroke={badgeColor} strokeWidth="2" />
      <text x={97} y={50} textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="bold">cos similarity</text>
      <text x={97} y={72} textAnchor="middle" fill={badgeColor} fontSize="22" fontWeight="900">{cosSim.toFixed(3)}</text>

      {/* Length labels */}
      <text x={CX + (ax * SC) / 2 + 8} y={CY - (ay * SC) / 2 + 4} fill="#E11D48" fontSize="10" fontWeight="bold" opacity="0.7">|A|={lenA}</text>
      <text x={CX + (bx * SC) / 2 - 8} y={CY - (by * SC) / 2 + 16} fill="#0284C7" fontSize="10" fontWeight="bold" opacity="0.7">|B|={lenB}</text>
    </svg>
  );
};

export const Scene2_9_CosineSimilarity: React.FC = () => {
  const [angleA, setAngleA] = useState(55);
  const [angleB, setAngleB] = useState(25);
  const [lenA, setLenA] = useState(65);
  const [lenB, setLenB] = useState(80);

  const toUnitVec = (angleDeg: number) => ({
    x: Math.cos((angleDeg * Math.PI) / 180),
    y: Math.sin((angleDeg * Math.PI) / 180),
  });

  const uA = toUnitVec(angleA);
  const uB = toUnitVec(angleB);

  // Cosine similarity depends only on angle between unit vectors
  const dot = uA.x * uB.x + uA.y * uB.y;
  const cosSim = Math.min(1, Math.max(-1, dot)); // unit vectors so mag = 1
  const thetaDeg = (Math.acos(cosSim) * 180) / Math.PI;

  // Scale for display (unit vectors × scale factor)
  const scA = lenA / 10, scB = lenB / 10;

  const presets = [
    { label: '🟢 Same direction', aA: 40, aB: 40, lA: 45, lB: 80 },
    { label: '⬜ Perpendicular', aA: 90, aB: 0, lA: 65, lB: 65 },
    { label: '🔴 Opposite', aA: 0, aB: 180, lA: 65, lB: 65 },
    { label: '🔵 Small angle (similar)', aA: 50, aB: 35, lA: 55, lB: 70 },
  ];

  const cosLabel =
    cosSim > 0.95 ? 'Identical direction' :
    cosSim > 0.7  ? 'Very similar' :
    cosSim > 0.3  ? 'Somewhat similar' :
    cosSim > -0.1 ? 'Unrelated (perpendicular)' :
    cosSim > -0.7 ? 'Somewhat opposing' : 'Opposite direction';

  const pctA = ((angleA + 0) / 360) * 100;
  const pctB = ((angleB + 0) / 360) * 100;

  return (
    <SlideLayout
      title="Cosine Similarity"
      text="Only the angle between vectors matters — length is ignored. Change the angles and watch the score. Try Same Direction vs Opposite."
      sidebarContent={
        <div className="flex flex-col gap-4">
          {/* Score + label */}
          <div className={`rounded-2xl p-4 border flex items-center justify-between transition-all ${
            cosSim > 0.5 ? 'bg-emerald-50 border-emerald-200' :
            cosSim > 0.1 ? 'bg-amber-50 border-amber-200' :
            cosSim > -0.1 ? 'bg-slate-50 border-slate-200' : 'bg-rose-50 border-rose-200'
          }`}>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold opacity-50 mb-1">Cosine Score</div>
              <div className={`text-3xl font-black font-mono ${cosSim > 0.5 ? 'text-emerald-600' : cosSim > -0.1 ? 'text-amber-600' : 'text-rose-600'}`}>
                {cosSim.toFixed(3)}
              </div>
              <div className="text-xs font-semibold mt-1 opacity-70">{cosLabel}</div>
            </div>
            <div className="text-4xl">{cosSim > 0.7 ? '🎯' : cosSim > 0.1 ? '↗' : cosSim > -0.1 ? '↔' : '↙'}</div>
          </div>

          {/* Angle sliders */}
          <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-sm flex flex-col gap-3">
            {[
              { label: 'Angle A', val: angleA, set: setAngleA, max: 360, color: '#E11D48', pct: pctA },
              { label: 'Angle B', val: angleB, set: setAngleB, max: 360, color: '#0284C7', pct: pctB },
            ].map(sl => (
              <div key={sl.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold" style={{ color: sl.color }}>{sl.label}</span>
                  <span className="text-sm font-black font-mono" style={{ color: sl.color }}>{sl.val}°</span>
                </div>
                <input type="range" min="0" max="360" step="1" value={sl.val}
                  onChange={e => sl.set(Number(e.target.value))}
                  className="w-full appearance-none cursor-pointer rounded-full h-2"
                  style={{ background: `linear-gradient(to right, ${sl.color} 0%, ${sl.color} ${(sl.val/360)*100}%, #e2e8f0 ${(sl.val/360)*100}%, #e2e8f0 100%)` }}
                />
              </div>
            ))}
            <div className="border-t border-slate-100 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lengths (don't affect score!)</span>
              </div>
              {[
                { label: '|A|', val: lenA, set: setLenA, color: '#E11D48' },
                { label: '|B|', val: lenB, set: setLenB, color: '#0284C7' },
              ].map(sl => (
                <div key={sl.label} className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold" style={{ color: sl.color }}>{sl.label}</span>
                    <span className="text-xs font-black font-mono" style={{ color: sl.color }}>{sl.val}</span>
                  </div>
                  <input type="range" min="20" max="100" step="2" value={sl.val}
                    onChange={e => sl.set(Number(e.target.value))}
                    className="w-full appearance-none cursor-pointer rounded-full h-1.5"
                    style={{ background: `linear-gradient(to right, ${sl.color} 0%, ${sl.color} ${((sl.val-20)/80)*100}%, #e2e8f0 ${((sl.val-20)/80)*100}%, #e2e8f0 100%)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Presets */}
          <div className="flex flex-col gap-1.5">
            {presets.map((p, i) => (
              <button key={i}
                onClick={() => { setAngleA(p.aA); setAngleB(p.aB); setLenA(p.lA); setLenB(p.lB); }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-bold text-slate-600 text-left cursor-pointer transition-all active:scale-95">
                {p.label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-2">
        <AnnotatedCosineCanvas
          ax={uA.x * scA} ay={uA.y * scA}
          bx={uB.x * scB} by={uB.y * scB}
          lenA={lenA} lenB={lenB}
          cosSim={cosSim} thetaDeg={thetaDeg}
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

// ==========================================
// CHAPTER 2 — Grand Summary
// ==========================================
export const Scene2_Summary: React.FC = () => {
  const cards = [
    { icon: '📏', title: 'Euclidean Distance', body: 'Straight-line gap between two points. Works like a ruler. Pythagorean theorem in any dimension.', color: '#0284C7', formula: 'd = √(Σ(Bᵢ−Aᵢ)²)' },
    { icon: '🎯', title: 'The Magnitude Trap', body: 'Two vectors can point the same way but sit far apart by Euclidean distance — just because one is scaled up.', color: '#E11D48', formula: null },
    { icon: '📐', title: 'Cosine Similarity', body: 'Only the angle matters. Perfect for comparing preferences, documents, or embeddings where scale is irrelevant.', color: '#7C3AED', formula: 'cos θ = (A·B) / (|A||B|)' },
    { icon: '🔢', title: 'Score Range', body: '+1 = identical direction · 0 = perpendicular · −1 = exact opposites. Easy to interpret.', color: '#059669', formula: '-1 ≤ cos θ ≤ +1' },
    { icon: '🤔', title: 'When to Use Which', body: 'Euclidean: absolute gap matters (GPS, pixel distance). Cosine: only direction matters (text, recommendation, embeddings).', color: '#D97706', formula: null },
    { icon: '🌐', title: 'Real-World Impact', body: 'Spotify, Netflix, Google Search, and every vector database run on these two formulas. You now understand their core operation.', color: '#10B981', formula: null },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 max-w-4xl mx-auto gap-5">
      <div className="text-center">
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-xs font-mono uppercase tracking-widest text-sky-500 font-extrabold">
          Chapter 2 · Complete
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-3xl font-black text-slate-800 mt-1">
          Two tools to measure proximity.
        </motion.h1>
      </div>
      <div className="w-16 h-1.5 bg-gradient-to-r from-sky-400 to-violet-500 rounded-full" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {cards.map((c, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2"
          >
            <div className="text-2xl">{c.icon}</div>
            <div className="font-black text-sm" style={{ color: c.color }}>{c.title}</div>
            <div className="text-slate-500 text-xs font-medium leading-relaxed">{c.body}</div>
            {c.formula && (
              <div className="mt-auto pt-2 border-t border-slate-100 font-mono text-xs font-bold text-slate-400">{c.formula}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// CHAPTER 2 → CHAPTER 3: Next Hook
// ==========================================
export const Scene2_13_NextHook: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full px-8 text-center max-w-3xl mx-auto relative">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-violet-400/10 filter blur-[120px] pointer-events-none" />

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
        🎯
      </motion.div>

      <span className="text-xs font-mono uppercase tracking-widest text-violet-500 font-extrabold">Up Next · Chapter 3</span>

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
        Forget distance.<br />
        <span className="text-violet-500">How aligned are they?</span>
      </h1>

      <div className="w-16 h-1.5 bg-gradient-to-r from-violet-400 to-rose-500 rounded-full" />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="text-slate-500 text-lg font-medium leading-relaxed max-w-md"
      >
        Proximity measures gaps. But sometimes you don't care how far — you care how much two vectors <em>point in the same direction</em>. That's the dot product.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="flex items-center gap-4 mt-2"
      >
        {[['Projection', '#7C3AED'], ['The Shadow', '#0284C7'], ['Coordinate Shortcut', '#059669']].map(([label, color]) => (
          <div key={label} className="px-3 py-1.5 rounded-full border text-xs font-bold" style={{ borderColor: color + '55', color, backgroundColor: color + '11' }}>
            {label}
          </div>
        ))}
      </motion.div>
    </motion.div>
  </div>
);
