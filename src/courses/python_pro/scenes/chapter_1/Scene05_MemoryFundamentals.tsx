import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneLayout } from '../../../SceneLayout';

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
    { address: '0x00A4', name: 'name', value: '"Alex"' },
    { address: '0x00A5', name: null, value: null },
    { address: '0x00A6', name: 'active', value: 'True' },
    { address: '0x00A7', name: null, value: null },
    { address: '0x00A8', name: null, value: null }
  ]);

  const [variableName, setVariableName] = useState('score');
  const [variableValue, setVariableValue] = useState('99');
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [activeCell, setActiveCell] = useState<number | null>(1);

  const writeToMemory = () => {
    const updated = [...memory];

    updated[selectedAddress] = {
      ...updated[selectedAddress],
      name: variableName,
      value: isNaN(Number(variableValue))
        ? `"${variableValue}"`
        : Number(variableValue)
    };

    setMemory(updated);
    setActiveCell(selectedAddress);
  };

  const clearCell = (index: number) => {
    const updated = [...memory];

    updated[index] = {
      ...updated[index],
      name: null,
      value: null
    };

    setMemory(updated);

    if (activeCell === index) {
      setActiveCell(null);
    }
  };

  const activeMemoryCell =
    activeCell !== null ? memory[activeCell] : null;

  return (
    <SceneLayout gap="gap-5">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 1.5 · Computer Fundamentals
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Memory{' '}
          <span className="text-indigo-600 font-serif italic">
            Fundamentals
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          RAM is made of addressable memory locations. Variables are stored
          at specific addresses while a program runs.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[360px] shrink-0 flex flex-col gap-4">

          {/* Concept */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Memory Concepts
            </span>

            <ul className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <li>• RAM stores active program data.</li>
              <li>• Each location has a memory address.</li>
              <li>• Variables point to values in memory.</li>
              <li>• Programs constantly read and write memory.</li>
            </ul>
          </div>

          {/* Memory Writer */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Write To Memory
            </span>

            <div className="mt-3 flex flex-col gap-3">

              <input
                value={variableName}
                onChange={(e) => setVariableName(e.target.value)}
                placeholder="Variable"
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono"
              />

              <input
                value={variableValue}
                onChange={(e) => setVariableValue(e.target.value)}
                placeholder="Value"
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono"
              />

              <select
                value={selectedAddress}
                onChange={(e) =>
                  setSelectedAddress(Number(e.target.value))
                }
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono"
              >
                {memory.map((cell, index) => (
                  <option
                    key={cell.address}
                    value={index}
                  >
                    {cell.address}
                  </option>
                ))}
              </select>

              <button
                onClick={writeToMemory}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-xl transition-colors"
              >
                Write Value
              </button>

            </div>
          </div>

          {/* Selected Cell */}
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
            <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-wider">
              Selected Address
            </span>

            {activeMemoryCell ? (
              <div className="mt-3 space-y-1">
                <div className="text-xs font-mono font-bold text-slate-600">
                  Address: {activeMemoryCell.address}
                </div>

                <div className="text-xs font-mono font-bold text-slate-600">
                  Variable: {activeMemoryCell.name ?? 'Empty'}
                </div>

                <div className="text-xs font-mono font-bold text-slate-600">
                  Value:{' '}
                  {activeMemoryCell.value !== null
                    ? activeMemoryCell.value
                    : 'Empty'}
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs font-semibold text-slate-500">
                No memory cell selected.
              </div>
            )}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">

          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-4">
            RAM Memory Map
          </span>

          <div className="grid grid-cols-2 gap-3 flex-1">

            {memory.map((cell, index) => {
              const occupied = cell.name !== null;
              const selected = activeCell === index;

              return (
                <motion.div
                  key={cell.address}
                  whileHover={{ scale: 1.01 }}
                  onClick={() => setActiveCell(index)}
                  className={`rounded-2xl border-2 p-4 cursor-pointer transition-all flex flex-col justify-between ${
                    selected
                      ? 'border-indigo-500 bg-white'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-mono font-bold text-slate-400">
                      {cell.address}
                    </span>

                    {occupied && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearCell(index);
                        }}
                        className="text-[10px] font-bold text-red-500 uppercase"
                      >
                        Del
                      </button>
                    )}
                  </div>

                  {occupied ? (
                    <div className="mt-3">
                      <div className="text-xs font-mono font-bold text-slate-500">
                        Variable
                      </div>

                      <div className="text-lg font-black text-slate-800">
                        {cell.name}
                      </div>

                      <div className="text-sm font-mono font-bold text-indigo-600 mt-1">
                        {cell.value}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs font-mono font-bold text-slate-300">
                      Empty Memory
                    </div>
                  )}
                </motion.div>
              );
            })}

          </div>
        </div>
      </div>
    </SceneLayout>
  );
};

export default Scene05_MemoryFundamentals;