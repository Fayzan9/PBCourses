import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_HowVideoIsRepresented: React.FC = () => {
  // Each "frame" is a 4x4 grid of color indices
  // 0=sky, 1=sun, 2=ground, 3=dark
  const palette = ['#bae6fd', '#fbbf24', '#86efac', '#1e293b'];
  const paletteNames = ['Sky', 'Sun', 'Ground', 'Dark'];

  const frames = [
    {
      label: 'Frame 1',
      grid: [
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2]
      ]
    },
    {
      label: 'Frame 2',
      grid: [
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2]
      ]
    },
    {
      label: 'Frame 3',
      grid: [
        [1, 0, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2]
      ]
    },
    {
      label: 'Frame 4',
      grid: [
        [0, 0, 0, 1],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2]
      ]
    },
    {
      label: 'Frame 5',
      grid: [
        [0, 0, 1, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2]
      ]
    },
    {
      label: 'Frame 6',
      grid: [
        [0, 1, 0, 0],
        [0, 0, 0, 0],
        [2, 2, 2, 2],
        [2, 2, 2, 2]
      ]
    }
  ];

  const [currentFrame, setCurrentFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setCurrentFrame(f => (f + 1) % frames.length);
    }, 300);
    return () => clearInterval(id);
  }, [playing, frames.length]);

  const frame = frames[currentFrame];

  const videoStats = [
    { label: '1080p Resolution', value: '1920 × 1080', sub: '2,073,600 pixels/frame' },
    { label: '24 FPS', value: '24 frames', sub: 'per second' },
    { label: 'Color Depth', value: '3 channels', sub: 'R, G, B per pixel' }
  ];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-violet-600 font-extrabold">
          Lesson 2.6 · Information And Data
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          How Video Is{' '}
          <span className="text-violet-600 font-serif italic">
            Represented
          </span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          Video is a sequence of still images (frames) played rapidly
          one after another, combined with an audio track. Each frame
          is a full grid of pixels — just like a photo.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Video = Images + Audio
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-violet-50 border border-violet-100 rounded-xl">
                <div className="w-8 h-8 bg-violet-500 rounded-lg flex items-center justify-center text-white text-xs font-black">
                  IMG
                </div>
                <div>
                  <div className="font-black text-sm text-slate-700">Frames (Images)</div>
                  <div className="text-[11px] text-slate-500">Sequence of pixel grids</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-100 rounded-xl">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-black">
                  SND
                </div>
                <div>
                  <div className="font-black text-sm text-slate-700">Audio Track</div>
                  <div className="text-[11px] text-slate-500">Sampled sound numbers</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-xs font-black">
                  FPS
                </div>
                <div>
                  <div className="font-black text-sm text-slate-700">Frame Rate</div>
                  <div className="text-[11px] text-slate-500">24–60 frames per second</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-violet-600 mb-2">
              1080p @ 24fps (uncompressed)
            </div>
            <div className="text-2xl font-black text-slate-700">~3 GB</div>
            <div className="text-xs text-slate-500 mt-1">per minute of video</div>
            <div className="text-xs font-semibold text-slate-600 mt-2">
              That is why video compression (H.264, H.265) exists.
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Frame By Frame Playback
          </div>

          <div className="flex-1 flex gap-6 items-center justify-center min-h-0">

            {/* Frame strip */}
            <div className="flex flex-col gap-2">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-1">
                All Frames
              </div>
              {frames.map((f, i) => (
                <button
                  key={i}
                  onClick={() => { setPlaying(false); setCurrentFrame(i); }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all ${
                    currentFrame === i
                      ? 'border-violet-500 bg-violet-50'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-slate-500 w-12">{f.label}</div>
                  <div className="grid grid-cols-4 gap-0.5">
                    {f.grid.flat().map((ci, pi) => (
                      <div
                        key={pi}
                        className="w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: palette[ci] }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Current frame display */}
            <div className="flex flex-col items-center gap-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                Now Playing
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFrame}
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.6, scale: 0.95 }}
                  transition={{ duration: 0.1 }}
                  className="bg-white border-2 border-violet-500 rounded-2xl p-4"
                >
                  <div className="grid grid-cols-4 gap-1.5">
                    {frame.grid.flat().map((ci, pi) => (
                      <div
                        key={pi}
                        className="w-12 h-12 rounded-lg"
                        style={{ backgroundColor: palette[ci] }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="text-sm font-black text-violet-600">{frame.label}</div>

              {/* Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() => { setPlaying(false); setCurrentFrame(f => Math.max(0, f - 1)); }}
                  className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-slate-600 hover:border-violet-400 transition-all"
                >
                  ←
                </button>
                <button
                  onClick={() => setPlaying(p => !p)}
                  className={`px-5 py-2 rounded-xl font-black transition-all ${
                    playing
                      ? 'bg-violet-500 text-white border-2 border-violet-500'
                      : 'bg-white border-2 border-violet-400 text-violet-600'
                  }`}
                >
                  {playing ? '⏸ Pause' : '▶ Play'}
                </button>
                <button
                  onClick={() => { setPlaying(false); setCurrentFrame(f => Math.min(frames.length - 1, f + 1)); }}
                  className="px-4 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-slate-600 hover:border-violet-400 transition-all"
                >
                  →
                </button>
              </div>

            </div>

          </div>

          {/* Bottom strip */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Video</div>
              <div className="mt-1 font-black text-slate-700">Frames</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Each Frame</div>
              <div className="mt-1 font-black text-violet-600">Pixel Grid</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Each Pixel</div>
              <div className="mt-1 font-black text-orange-600">3 Numbers</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene06_HowVideoIsRepresented;
