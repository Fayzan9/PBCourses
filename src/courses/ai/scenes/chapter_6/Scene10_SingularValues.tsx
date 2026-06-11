import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LAYOUT_CONFIG } from '../../components/layoutConfig';

const PRESETS = [
  {
    name: 'Large gap',
    values: [100, 50, 2, 0.1, 0.01],
    note: 'Almost all information lives in the first two directions.',
  },
  {
    name: 'Gradual decay',
    values: [9, 6, 4, 2, 1],
    note: 'Information spreads more evenly. Harder to compress.',
  },
  {
    name: 'Flat spectrum',
    values: [5, 5, 5, 5, 5],
    note: 'Every direction equally important. Nothing to throw away.',
  },
  {
    name: 'One dominant',
    values: [200, 1, 0.5, 0.1, 0.05],
    note: 'Almost everything explained by a single direction.',
  },
];

export const Scene6_10_SingularValues: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState(0);
  const [threshold, setThreshold] = useState(5);

  const preset = PRESETS[presetIdx];
  const total = preset.values.reduce((a, b) => a + b, 0);
  const kept = preset.values.filter(v => v >= threshold);
  const keptEnergy = kept.reduce((a, b) => a + b, 0);
  const energyPct = ((keptEnergy / total) * 100).toFixed(1);

  const maxVal = Math.max(...preset.values);

  return (
    <div className={LAYOUT_CONFIG.containerClass}>
      <div className={LAYOUT_CONFIG.leftSideClass}>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 px-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Singular Values (σ)</p>

          <div className="flex items-end gap-4 h-52">
            {preset.values.map((v, i) => {
              const height = (v / maxVal) * 180;
              const kept = v >= threshold;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <motion.div
                    className="text-xs font-mono font-bold"
                    style={{ color: kept ? '#0891B2' : '#cbd5e1' }}
                    animate={{ color: kept ? '#0891B2' : '#cbd5e1' }}
                  >
                    {v}
                  </motion.div>
                  <motion.div
                    className="w-12 rounded-t-lg"
                    style={{ backgroundColor: kept ? '#0891B2' : '#e2e8f0' }}
                    animate={{ height, backgroundColor: kept ? '#0891B2' : '#e2e8f0' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                  <div className="text-xs font-mono text-slate-400">σ{i + 1}</div>
                </div>
              );
            })}
          </div>

          {/* Threshold line indicator */}
          <div className="w-full max-w-xs">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Threshold: {threshold}</span>
              <span className="text-cyan-600 font-bold">Keeping {kept.length}/{preset.values.length} directions</span>
            </div>
            <input
              type="range" min={0} max={Math.floor(maxVal * 0.8)} step={1} value={threshold}
              onChange={e => setThreshold(Number(e.target.value))}
              className="w-full appearance-none cursor-pointer rounded-full h-2"
              style={{
                background: `linear-gradient(to right, #0891B2 0%, #0891B2 ${(threshold / Math.floor(maxVal * 0.8)) * 100}%, #e2e8f0 ${(threshold / Math.floor(maxVal * 0.8)) * 100}%, #e2e8f0 100%)`
              }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${presetIdx}-${threshold}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`px-5 py-3 rounded-2xl border text-center ${
                parseFloat(energyPct) >= 90
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <p className="font-black text-2xl" style={{ color: parseFloat(energyPct) >= 90 ? '#059669' : '#D97706' }}>
                {energyPct}% energy kept
              </p>
              <p className="text-slate-500 text-sm font-medium mt-0.5">{preset.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className={LAYOUT_CONFIG.rightSideClass}>
        <div>
          <h2 className="text-3xl font-black text-slate-800 leading-tight mb-2">
            Singular Values
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Singular values (σ) measure how much each direction gets stretched. Big σ = important direction. Tiny σ = almost useless.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">Presets</p>
          {PRESETS.map((p, i) => (
            <button
              key={i}
              onClick={() => setPresetIdx(i)}
              className={`px-4 py-3 rounded-xl text-left text-sm font-bold transition-all cursor-pointer border
                ${presetIdx === i
                  ? 'bg-cyan-50 border-cyan-300 text-cyan-700'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-cyan-300'
                }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <div className="bg-slate-800 text-white rounded-2xl p-4">
          <p className="font-black text-base text-cyan-400 mb-2">The Compression Insight</p>
          <p className="text-slate-300 text-sm font-medium leading-relaxed">
            If some directions stretch enormously but others barely at all — we can <strong className="text-white">discard the tiny ones.</strong> Most information is preserved.
          </p>
        </div>
      </div>
    </div>
  );
};
