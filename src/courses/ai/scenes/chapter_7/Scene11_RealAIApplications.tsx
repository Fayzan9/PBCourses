import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const APPS = [
  {
    id: 'eigenfaces',
    icon: '😊',
    label: 'Eigenfaces',
    tag: 'Face Recognition',
    tagColor: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    accent: '#4f46e5',
    stat: '150 PCs',
    statSub: 'from 10,304-dim face images',
    steps: [
      { label: 'Input', value: '10,304-D', note: '(101 × 102 pixel images)' },
      { label: 'PCA to', value: '150-D', note: '98.3% variance kept' },
      { label: 'Recognition', value: '97%+', note: 'accuracy on test faces' },
    ],
    insight: `In 1991, Turk & Pentland showed that face images cluster along a tiny number of "eigenfaces" — the top principal components of a large face dataset. Just 150 PCs captured nearly all the meaningful variation across thousands of faces. The rest was noise and lighting artefacts.`,
    paper: 'Turk & Pentland (1991) — Face Recognition Using Eigenfaces',
  },
  {
    id: 'embeddings',
    icon: '⚡',
    label: 'Embedding Compression',
    tag: 'Semantic Search',
    tagColor: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    accent: '#059669',
    stat: '12× faster',
    statSub: 'search with PCA from 1536D → 128D',
    steps: [
      { label: 'GPT-4 embedding', value: '1,536-D', note: 'per sentence' },
      { label: 'PCA to', value: '128-D', note: '94% variance kept' },
      { label: 'Index search', value: '12× faster', note: 'at <1% accuracy drop' },
    ],
    insight: `Production vector databases (Pinecone, Weaviate) apply PCA before FAISS indexing. Cosine similarity is nearly identical before and after compression because PCA preserves the highest-variance subspace. You lose almost no semantic content while dramatically cutting compute and memory.`,
    paper: 'Johnson, Douze & Jégou (2019) — Billion-scale similarity search with GPUs',
  },
  {
    id: 'visualisation',
    icon: '🔬',
    label: 'Data Visualisation',
    tag: 'Cluster Discovery',
    tagColor: 'bg-violet-50 border-violet-200 text-violet-700',
    accent: '#7c3aed',
    stat: '2D / 3D',
    statSub: 'from 784-dim MNIST digits',
    steps: [
      { label: 'MNIST input', value: '784-D', note: '(28×28 pixels per digit)' },
      { label: 'PCA to', value: '2-D', note: 'for a 2D scatter plot' },
      { label: 'Clusters', value: '10 visible', note: 'digit clusters appear naturally' },
    ],
    insight: `Project MNIST 784-dimensional images onto PC1 and PC2 and you can visually see 10 distinct clusters — one per digit. PCA doesn't know about digit labels: it finds the two directions along which digit pixels vary the most, and those two directions are enough to separate the classes. This is why PCA is always the first exploration step.`,
    paper: 'LeCun et al. (1998) — Gradient-based learning applied to document recognition',
  },
];

export const Scene7_11_RealAIApplications: React.FC = () => {
  const [active, setActive] = useState(0);
  const app = APPS[active];

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">

      {/* ── LEFT: Detail panel ────────────────────────────────────────── */}
      <div className="flex-[65] min-h-0 min-w-0 flex flex-col bg-white/40 border border-slate-200/50 rounded-3xl p-5 shadow-inner overflow-hidden gap-4">

        <AnimatePresence mode="wait">
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col h-full gap-4"
          >
            {/* App header */}
            <div className="flex items-center gap-3">
              <span className="text-4xl">{app.icon}</span>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">{app.tag}</p>
                <h3 className="text-2xl font-black text-slate-800">{app.label}</h3>
              </div>
            </div>

            {/* Big stat */}
            <div className="flex items-baseline gap-2 px-4 py-3 rounded-2xl" style={{ backgroundColor: app.accent + '11', border: `1px solid ${app.accent}33` }}>
              <span className="text-4xl font-black" style={{ color: app.accent }}>{app.stat}</span>
              <span className="text-sm font-semibold text-slate-500">{app.statSub}</span>
            </div>

            {/* Pipeline steps */}
            <div className="flex items-center gap-2 flex-wrap">
              {app.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center px-3 py-2 rounded-xl bg-white border border-slate-200 min-w-[90px]">
                    <span className="text-base font-black" style={{ color: app.accent }}>{s.value}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{s.label}</span>
                    <span className="text-[9px] text-slate-400 font-medium mt-0.5">{s.note}</span>
                  </div>
                  {i < app.steps.length - 1 && (
                    <span className="text-slate-300 font-black text-xl">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Insight */}
            <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 overflow-y-auto">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">How It Works</p>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">{app.insight}</p>
            </div>

            {/* Paper chip */}
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-500 flex items-center gap-2 shrink-0">
              <span className="text-base">📄</span>
              <span>{app.paper}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── RIGHT: Sidebar tabs ───────────────────────────────────────── */}
      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-1">
            Chapter 7 · Scene 11
          </p>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            Where PCA Powers<br /><span className="text-indigo-500">Modern AI</span>
          </h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed">
            PCA is used everywhere — from classic computer vision to production-scale LLM pipelines. Select an application to explore.
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex flex-col gap-2">
          {APPS.map((a, i) => (
            <button
              key={a.id}
              onClick={() => setActive(i)}
              className={`px-3 py-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${active === i
                ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{a.icon}</span>
                <div>
                  <div className="font-black text-sm">{a.label}</div>
                  <div className={`text-[10px] font-bold ${active === i ? 'text-slate-400' : 'text-slate-400'}`}>{a.tag}</div>
                </div>
              </div>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${active === i ? 'bg-white/20 text-white' : a.tagColor}`}>
                {active === i ? 'Viewing' : 'Select'}
              </span>
            </button>
          ))}
        </div>

        {/* Universal benefits */}
        <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl">
          <p className="text-[10px] font-mono uppercase tracking-widest text-indigo-500 font-bold mb-2">Why PCA First?</p>
          <div className="flex flex-col gap-1">
            {[
              'Removes noise → better downstream accuracy',
              'Cuts memory & compute costs drastically',
              'Reveals natural clusters before modelling',
              'Provides a fast sanity check on data quality',
            ].map(item => (
              <div key={item} className="flex items-start gap-1.5 text-xs font-semibold text-indigo-700">
                <span className="text-indigo-400 shrink-0">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene7_11_RealAIApplications;
