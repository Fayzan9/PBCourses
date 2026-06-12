import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene05_HowAudioIsRepresented: React.FC = () => {
  // Pre-computed sine-like wave samples for 3 waveform types
  const waveforms = [
    {
      id: 'quiet',
      label: 'Quiet Sound',
      description: 'Low amplitude — small numbers, soft sound',
      samples: [2, 4, 6, 5, 3, 1, -1, -3, -5, -6, -4, -2, 1, 4, 6, 5, 2, 0, -3, -6, -5, -2, 1, 3]
    },
    {
      id: 'loud',
      label: 'Loud Sound',
      description: 'High amplitude — large numbers, loud sound',
      samples: [20, 42, 60, 55, 30, 10, -15, -38, -58, -62, -40, -22, 8, 35, 57, 52, 25, 5, -28, -55, -60, -30, 5, 28]
    },
    {
      id: 'noise',
      label: 'White Noise',
      description: 'Random values — unpredictable, hissy sound',
      samples: [12, -34, 22, -8, 45, -29, 17, -51, 38, -14, 27, -42, 9, -33, 50, -7, 31, -48, 13, -26, 44, -18, 36, -3]
    }
  ];

  const [selectedWave, setSelectedWave] = useState('quiet');
  const [hoveredSample, setHoveredSample] = useState<number | null>(null);

  const current = waveforms.find(w => w.id === selectedWave)!;

  // Normalize samples to SVG coordinates (viewBox height 120, center 60)
  const svgWidth = 500;
  const svgHeight = 120;
  const centerY = 60;
  const maxAmp = 70;
  const stepX = svgWidth / (current.samples.length - 1);

  const points = current.samples.map((s, i) => ({
    x: i * stepX,
    y: centerY - (s / maxAmp) * (svgHeight / 2 - 8)
  }));

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.5 · Information And Data
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          How Audio Is{' '}
          <span className="text-violet-600 font-serif italic">
            Represented
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Sound is a wave of pressure changes in the air. To store audio,
          computers measure the wave thousands of times per second — each
          measurement becomes a number.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Waveform Type
            </div>
            <div className="flex flex-col gap-2">
              {waveforms.map(w => (
                <button
                  key={w.id}
                  onClick={() => { setSelectedWave(w.id); setHoveredSample(null); }}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    selectedWave === w.id
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="font-black text-slate-800 text-sm">{w.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{w.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-violet-600">
              Sampling
            </div>
            <div className="mt-2 space-y-2 text-sm font-semibold text-slate-700">
              <div className="flex justify-between">
                <span>CD Quality</span>
                <span className="font-black text-violet-600">44,100 Hz</span>
              </div>
              <div className="flex justify-between">
                <span>Each sample</span>
                <span className="font-black text-violet-600">16 bits</span>
              </div>
              <div className="flex justify-between">
                <span>1 min stereo</span>
                <span className="font-black text-violet-600">~10 MB</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Sound Wave → Numbers
          </div>

          <motion.div
            key={selectedWave}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col gap-4 justify-center min-h-0"
          >

            {/* SVG Waveform */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Continuous Sound Wave
              </div>
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full"
                style={{ height: '90px' }}
              >
                {/* Center baseline */}
                <line x1="0" y1={centerY} x2={svgWidth} y2={centerY} stroke="#e2e8f0" strokeWidth="1" />
                {/* Waveform */}
                <path d={pathD} fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Sample dots */}
                {points.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={hoveredSample === i ? 6 : 4}
                    fill={hoveredSample === i ? '#7c3aed' : '#a78bfa'}
                    className="cursor-pointer transition-all"
                    onMouseEnter={() => setHoveredSample(i)}
                    onMouseLeave={() => setHoveredSample(null)}
                  />
                ))}
              </svg>
            </div>

            {/* Samples as numbers */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Stored As Numbers · hover the wave to highlight
              </div>
              <div className="flex flex-wrap gap-2">
                {current.samples.map((s, i) => (
                  <motion.div
                    key={i}
                    onMouseEnter={() => setHoveredSample(i)}
                    onMouseLeave={() => setHoveredSample(null)}
                    animate={{
                      backgroundColor: hoveredSample === i ? '#7c3aed' : '#f8fafc',
                      color: hoveredSample === i ? '#ffffff' : '#334155'
                    }}
                    className="min-w-[40px] text-center border border-slate-200 rounded-lg px-2 py-1 text-xs font-mono font-black cursor-pointer"
                  >
                    {s}
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Technique</div>
              <div className="mt-1 font-black text-slate-700 text-sm">Sampling</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Amplitude</div>
              <div className="mt-1 font-black text-violet-600">= Volume</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Frequency</div>
              <div className="mt-1 font-black text-orange-600">= Pitch</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene05_HowAudioIsRepresented;
