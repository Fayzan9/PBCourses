import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene04_HowImagesAreRepresented: React.FC = () => {
  const presets = [
    { label: 'Red',     r: 220, g: 38,  b: 38  },
    { label: 'Green',   r: 22,  g: 163, b: 74  },
    { label: 'Blue',    r: 37,  g: 99,  b: 235 },
    { label: 'Yellow',  r: 234, g: 179, b: 8   },
    { label: 'White',   r: 255, g: 255, b: 255 },
    { label: 'Black',   r: 0,   g: 0,   b: 0   }
  ];

  const [r, setR] = useState(220);
  const [g, setG] = useState(38);
  const [b, setB] = useState(38);

  const [selectedPixel, setSelectedPixel] = useState<number | null>(4);

  // 5x5 pixel art grid (simplified smiley face colors as rgb presets)
  const grid = [
    [5, 5, 5, 5, 5],
    [5, 0, 5, 0, 5],
    [5, 5, 5, 5, 5],
    [0, 5, 5, 5, 0],
    [5, 0, 0, 0, 5]
  ];

  const pixelColors = presets.map(p => `rgb(${p.r},${p.g},${p.b})`);

  const toHex = (v: number) => v.toString(16).padStart(2, '0').toUpperCase();
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  const rgbStyle = `rgb(${r}, ${g}, ${b})`;

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.4 · Information And Data
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          How Images Are{' '}
          <span className="text-violet-600 font-serif italic">
            Represented
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Every image is a grid of tiny squares called pixels.
          Each pixel is three numbers — Red, Green, and Blue — each
          ranging from 0 to 255.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4 min-h-0">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              RGB Sliders
            </div>

            {[
              { label: 'R', value: r, set: setR, color: 'bg-red-500', track: 'accent-red-500' },
              { label: 'G', value: g, set: setG, color: 'bg-emerald-500', track: 'accent-emerald-500' },
              { label: 'B', value: b, set: setB, color: 'bg-blue-500', track: 'accent-blue-500' }
            ].map(ch => (
              <div key={ch.label} className="mb-3">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-500 mb-1">
                  <span>{ch.label}</span>
                  <span>{ch.value}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={255}
                  value={ch.value}
                  onChange={e => ch.set(Number(e.target.value))}
                  className={`w-full h-2 rounded-full ${ch.track}`}
                />
              </div>
            ))}

            {/* Color preview */}
            <div
              className="mt-3 h-14 rounded-xl border border-slate-200"
              style={{ backgroundColor: rgbStyle }}
            />
            <div className="mt-2 text-center text-xs font-mono font-bold text-slate-500">
              {hexColor} · rgb({r}, {g}, {b})
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-2">
              Quick Presets
            </div>
            <div className="grid grid-cols-3 gap-2">
              {presets.map(p => (
                <button
                  key={p.label}
                  onClick={() => { setR(p.r); setG(p.g); setB(p.b); }}
                  className="h-9 rounded-xl border border-slate-200 text-xs font-bold text-white transition-all hover:scale-105"
                  style={{ backgroundColor: `rgb(${p.r},${p.g},${p.b})`, color: p.label === 'White' ? '#334155' : 'white' }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Image = Grid Of Pixels
          </div>

          <div className="flex-1 flex gap-6 items-center justify-center min-h-0">

            {/* Pixel grid */}
            <div className="flex flex-col gap-1">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 text-center">
                5 × 5 pixel image
              </div>
              {grid.map((row, ri) => (
                <div key={ri} className="flex gap-1">
                  {row.map((colorIdx, ci) => {
                    const cellIdx = ri * 5 + ci;
                    return (
                      <motion.button
                        key={ci}
                        whileHover={{ scale: 1.15 }}
                        onClick={() => setSelectedPixel(cellIdx)}
                        className={`w-12 h-12 rounded-lg border-2 transition-all ${
                          selectedPixel === cellIdx
                            ? 'border-violet-500 scale-110'
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: pixelColors[colorIdx] }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Info card */}
            <div className="flex flex-col gap-3 w-52">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                  Your Custom Pixel
                </div>
                <div
                  className="w-16 h-16 rounded-xl mx-auto mb-3 border border-slate-200"
                  style={{ backgroundColor: rgbStyle }}
                />
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-red-500 font-bold">R</span>
                    <span className="font-black">{r}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-emerald-500 font-bold">G</span>
                    <span className="font-black">{g}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-blue-500 font-bold">B</span>
                    <span className="font-black">{b}</span>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 border border-violet-100 rounded-2xl p-3 text-center">
                <div className="text-[10px] font-mono uppercase text-violet-600 font-bold mb-1">
                  Stored As
                </div>
                <div className="text-xs font-mono font-black text-slate-700">
                  [{r}, {g}, {b}]
                </div>
                <div className="text-[10px] text-slate-500 mt-1">3 numbers per pixel</div>
              </div>
            </div>

          </div>

          {/* Bottom strip */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Unit</div>
              <div className="mt-1 font-black text-slate-700">Pixel</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Channels</div>
              <div className="mt-1 font-black text-violet-600">R, G, B</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Range</div>
              <div className="mt-1 font-black text-orange-600">0 – 255</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Colors</div>
              <div className="mt-1 font-black text-emerald-600">16.7M</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene04_HowImagesAreRepresented;
