import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

export const Scene06_WhyComputersUseBinary: React.FC = () => {
  const reasons = [
    {
      id: 'transistors',
      title: 'Transistors Are Switches',
      icon: '⚡',
      short: 'ON or OFF — two states only',
      detail: 'A transistor is either conducting electricity (ON = 1) or not conducting (OFF = 0). It cannot reliably hold 10 different voltage levels — but two is easy.',
      analogy: 'Like a light switch: fully up or fully down. Not "slightly up".',
      color: 'amber'
    },
    {
      id: 'noise',
      title: 'Noise Resistance',
      icon: '🔇',
      short: 'Errors cannot creep in',
      detail: 'With only two states, even if a voltage fluctuates slightly (electrical noise), the circuit still correctly reads HIGH or LOW. More states = more confusion.',
      analogy: 'A yes/no question is immune to misunderstanding. "Sort of yes" doesn\'t exist.',
      color: 'emerald'
    },
    {
      id: 'math',
      title: 'Boolean Logic Works',
      icon: '🧮',
      short: 'AND, OR, NOT map directly',
      detail: 'Binary algebra (Boolean logic) maps directly to electrical circuits. AND gates, OR gates, and NOT gates are the physical building blocks of every CPU.',
      analogy: 'Every calculation a computer does is ultimately AND, OR, and NOT on 1s and 0s.',
      color: 'violet'
    },
    {
      id: 'scale',
      title: 'Billions Of Transistors',
      icon: '💡',
      short: 'Simple = small = fast',
      detail: 'Because each transistor only needs to do one simple thing (switch on/off), billions can be packed into a few mm². Complexity comes from combining them, not from each one.',
      analogy: 'LEGO bricks are simple, but you can build anything with enough of them.',
      color: 'sky'
    }
  ];

  const [selected, setSelected] = useState('transistors');
  const current = reasons.find(r => r.id === selected)!;

  const colorMap: Record<string, { border: string; bg: string; text: string; iconBg: string }> = {
    amber:   { border: 'border-amber-500',   bg: 'bg-amber-50',   text: 'text-amber-700',   iconBg: 'bg-amber-500'   },
    emerald: { border: 'border-emerald-500', bg: 'bg-emerald-50', text: 'text-emerald-700', iconBg: 'bg-emerald-500' },
    violet:  { border: 'border-violet-500',  bg: 'bg-violet-50',  text: 'text-violet-700',  iconBg: 'bg-violet-500'  },
    sky:     { border: 'border-sky-500',     bg: 'bg-sky-50',     text: 'text-sky-700',     iconBg: 'bg-sky-500'     }
  };

  const c = colorMap[current.color];

  // Voltage demo: decimal system would need 10 voltage levels
  const voltages = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
  const binaryVoltages = [0, 5];

  return (
    <SceneLayout gap="gap-5">

      {/* Header */}
      <div>
        <div className="text-sm font-mono uppercase tracking-widest text-amber-600 font-extrabold">
          Lesson 3.6 · Number Systems
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Why Computers Use{' '}
          <span className="text-amber-600 font-serif italic">Binary</span>
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          It is not arbitrary. Binary is the only numbering system that maps
          perfectly to physical electronics. Here is why every computer ever
          built uses exactly two states.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono uppercase font-bold text-slate-400 mb-3">
              Reasons
            </div>
            <div className="flex flex-col gap-2">
              {reasons.map(r => {
                const rc = colorMap[r.color];
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    className={`p-3 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                      selected === r.id ? `${rc.border} ${rc.bg}` : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${rc.iconBg} flex items-center justify-center text-lg`}>
                      {r.icon}
                    </div>
                    <div>
                      <div className="font-black text-sm text-slate-800">{r.title}</div>
                      <div className="text-[11px] text-slate-500">{r.short}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col gap-4 min-w-0">

          <div className="text-xs font-mono uppercase tracking-widest font-bold text-slate-400">
            Why Binary Wins
          </div>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col justify-center gap-4"
          >

            {/* Main explanation */}
            <div className={`rounded-2xl border-2 p-5 ${c.border} ${c.bg}`}>
              <div className={`text-xs font-mono uppercase font-bold mb-2 ${c.text}`}>
                {current.title}
              </div>
              <p className={`text-sm font-semibold ${c.text} leading-relaxed`}>
                {current.detail}
              </p>
            </div>

            {/* Analogy */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2">
                Analogy
              </div>
              <p className="text-sm font-semibold text-slate-600 italic">
                "{current.analogy}"
              </p>
            </div>

            {/* Voltage comparison */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-3">
                Voltage Levels Needed
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span>Decimal (base 10) — 10 levels</span>
                    <span className="text-rose-500 font-bold">Hard, error-prone</span>
                  </div>
                  <div className="flex gap-1 items-end h-8">
                    {voltages.map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-rose-300 rounded-t"
                        style={{ height: `${(i + 1) * 10}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                    <span>Binary (base 2) — 2 levels</span>
                    <span className="text-emerald-500 font-bold">Simple, reliable</span>
                  </div>
                  <div className="flex gap-2 items-end h-8">
                    {binaryVoltages.map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t"
                        style={{
                          height: i === 0 ? '20%' : '100%',
                          backgroundColor: i === 0 ? '#94a3b8' : '#f59e0b'
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Bottom strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Transistor States</div>
              <div className="mt-1 font-black text-amber-600">ON / OFF</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-[10px] uppercase font-mono text-slate-400">Binary Represents</div>
              <div className="mt-1 font-black text-slate-700">1 / 0</div>
            </div>
          </div>

        </div>
      </div>

    </SceneLayout>
  );
};

export default Scene06_WhyComputersUseBinary;
