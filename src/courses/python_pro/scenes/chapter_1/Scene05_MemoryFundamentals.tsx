import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MemoryCell {
  address: string;
  name: string | null;
  value: string | number | null;
}

export const Scene05_MemoryFundamentals: React.FC = () => {
  const [memory, setMemory] = useState<MemoryCell[]>([
    { address: '0x00A1', name: null, value: null },
    { address: '0x00A2', name: 'x', value: 42 },
    { address: '0x00A3', name: null, value: null },
    { address: '0x00A4', name: 'y', value: '"Bros"' },
    { address: '0x00A5', name: null, value: null },
    { address: '0x00A6', name: 'active', value: 'True' },
    { address: '0x00A7', name: null, value: null },
    { address: '0x00A8', name: null, value: null }
  ]);

  const [writeState, setWriteState] = useState({ name: 'z', val: '99', addrIdx: 0 });
  const [activeCellIdx, setActiveCellIdx] = useState<number | null>(1); // default highlights x = 42

  const executeWrite = () => {
    const updated = [...memory];
    const idx = writeState.addrIdx;
    updated[idx] = {
      ...updated[idx],
      name: writeState.name,
      value: isNaN(Number(writeState.val)) ? `"${writeState.val}"` : Number(writeState.val)
    };
    setMemory(updated);
    setActiveCellIdx(idx);
  };

  const executeClear = (idx: number) => {
    const updated = [...memory];
    updated[idx] = { ...updated[idx], name: null, value: null };
    setMemory(updated);
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.5 · Computer Fundamentals
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1 leading-[1.1]">
          Memory <span className="text-indigo-600 font-serif italic">Fundamentals</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl leading-relaxed">
          RAM consists of addressable storage slots. Explore how reading and writing to memory addresses works.
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0 items-stretch">
        
        {/* Interactive Controls & Explanations */}
        <div className="flex-1 flex flex-col justify-between gap-4 min-h-0">
          {/* Concept definition */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider font-mono">Memory Reading & Writing</h3>
            <ul className="space-y-2.5 text-xs font-semibold text-slate-500 leading-normal">
              <li>
                <strong className="text-slate-700">Memory Address:</strong> A unique hexadecimal identifier pointing to a specific location in RAM (e.g. <code className="bg-slate-100 text-indigo-600 px-1 rounded font-mono">0x00A2</code>).
              </li>
              <li>
                <strong className="text-slate-700">Writing:</strong> Putting data at a memory address. In high-level Python: <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-mono">x = 42</code>.
              </li>
              <li>
                <strong className="text-slate-700">Reading:</strong> Querying the value at an address by referencing the variable name.
              </li>
            </ul>
          </div>

          {/* Interactive Write panel */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 flex flex-col gap-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Live RAM Controller
            </span>
            
            <div className="grid grid-cols-3 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Variable Name</label>
                <input
                  type="text"
                  value={writeState.name}
                  onChange={(e) => setWriteState({ ...writeState, name: e.target.value.slice(0, 5) })}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Value</label>
                <input
                  type="text"
                  value={writeState.val}
                  onChange={(e) => setWriteState({ ...writeState, val: e.target.value.slice(0, 8) })}
                  className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold font-mono focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Address Slot</label>
                <select
                  value={writeState.addrIdx}
                  onChange={(e) => setWriteState({ ...writeState, addrIdx: Number(e.target.value) })}
                  className="bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold font-mono focus:border-indigo-500 focus:outline-none cursor-pointer"
                >
                  {memory.map((cell, idx) => (
                    <option key={idx} value={idx}>{cell.address}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={executeWrite}
              className="w-full bg-indigo-600 text-white font-bold text-sm py-2 rounded-xl border border-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              🚀 Write to Memory
            </button>
          </div>
        </div>

        {/* Visual Memory Grid */}
        <div className="flex-1 flex flex-col bg-slate-50/50 border border-slate-200/60 rounded-2xl p-5 relative justify-between min-h-0">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 block">
            Memory Allocation Grid (RAM)
          </span>

          <div className="flex-1 grid grid-cols-2 gap-2.5 overflow-y-auto pr-1">
            {memory.map((cell, idx) => {
              const isCellActive = idx === activeCellIdx;
              const hasData = cell.name !== null;
              
              return (
                <div
                  key={idx}
                  onClick={() => setActiveCellIdx(idx)}
                  className={`border-2 rounded-xl p-3 bg-white cursor-pointer transition-all flex flex-col justify-between min-h-[72px] relative ${
                    isCellActive
                      ? 'border-indigo-500 shadow-sm'
                      : 'border-slate-100 hover:border-slate-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[11px] font-mono font-bold text-slate-400">Addr: {cell.address}</span>
                    {hasData && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          executeClear(idx);
                        }}
                        className="text-[11px] font-bold text-red-400 hover:text-red-600 transition-colors uppercase font-mono px-1 hover:bg-slate-50 rounded"
                        title="Deallocate"
                      >
                        del
                      </button>
                    )}
                  </div>
                  
                  {hasData ? (
                    <div className="flex flex-col mt-2">
                      <span className="text-xs font-mono font-extrabold text-slate-400">Var: <span className="text-slate-800 font-bold font-sans">{cell.name}</span></span>
                      <span className="text-sm font-mono font-extrabold text-indigo-600 mt-0.5">Val: {cell.value}</span>
                    </div>
                  ) : (
                    <span className="text-xs font-mono font-bold text-slate-300 italic mt-3">Empty / Free</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene05_MemoryFundamentals;
