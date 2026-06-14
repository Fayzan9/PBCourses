// Scene01_WhyPCA.tsx

import React from 'react';
import { motion } from 'framer-motion';

const DATA = [
  { x: 140, y: 430 },
  { x: 220, y: 360 },
  { x: 300, y: 290 },
  { x: 380, y: 220 },
  { x: 460, y: 150 },
];

const W = 860;
const H = 620;

export const Scene7_1_WhyPCA: React.FC = () => {
  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* LEFT */}
      <div
        className="flex flex-col items-center justify-center gap-5 px-4"
        style={{ flex: '0 0 72%' }}
      >
        <div className="text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-400 font-black">
            Chapter 7 · Scene 1
          </p>

          <h2 className="text-3xl font-black text-slate-800 mt-1">
            Why does
            <span className="text-violet-600"> PCA exist?</span>
          </h2>

          <p className="text-base text-slate-500 mt-2 font-medium">
            Data is not just rows in a table.
          </p>
        </div>

        <div
          className="rounded-3xl overflow-hidden flex-shrink-0"
          style={{
            width: W,
            height: H,
            maxWidth: '100%',
            background:
              'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div className="grid grid-cols-2 h-full">

            {/* TABLE */}
            <div className="flex flex-col justify-center px-10 border-r border-slate-200">

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-black text-slate-700 mb-6">
                  Customer Dataset
                </h3>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-slate-600">
                          Height
                        </th>
                        <th className="py-3 px-4 text-left text-slate-600">
                          Weight
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-lg">
                      {[
                        [170, 70],
                        [175, 75],
                        [180, 80],
                        [185, 85],
                        [190, 90],
                      ].map((row, i) => (
                        <motion.tr
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.2 }}
                          className="border-t border-slate-100"
                        >
                          <td className="py-3 px-4">{row[0]}</td>
                          <td className="py-3 px-4">{row[1]}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="text-slate-500 text-lg mt-6 text-center font-medium"
              >
                Looks like a spreadsheet...
              </motion.p>
            </div>

            {/* POINT CLOUD */}
            <div className="relative">

              <svg
                width="100%"
                height="100%"
                viewBox={`0 0 540 620`}
              >
                {/* Grid */}
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1={70 + i * 60}
                    y1={60}
                    x2={70 + i * 60}
                    y2={560}
                    stroke="#e2e8f0"
                  />
                ))}

                {[...Array(8)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1={70}
                    y1={80 + i * 60}
                    x2={500}
                    y2={80 + i * 60}
                    stroke="#e2e8f0"
                  />
                ))}

                {/* Axes */}
                <line
                  x1={70}
                  y1={560}
                  x2={500}
                  y2={560}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />

                <line
                  x1={70}
                  y1={60}
                  x2={70}
                  y2={560}
                  stroke="#94a3b8"
                  strokeWidth="2"
                />

                {/* Labels */}
                <text
                  x="460"
                  y="595"
                  fill="#64748b"
                  fontSize="18"
                  fontWeight="700"
                >
                  Height
                </text>

                <text
                  x="12"
                  y="100"
                  fill="#64748b"
                  fontSize="18"
                  fontWeight="700"
                >
                  Weight
                </text>

                {/* Points */}
                {DATA.map((p, i) => (
                  <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={8}
                    fill="#7C3AED"
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay: 1.6 + i * 0.25,
                      duration: 0.4,
                    }}
                  />
                ))}

                {/* Trend line */}
                <motion.line
                  x1={120}
                  y1={450}
                  x2={480}
                  y2={120}
                  stroke="#A78BFA"
                  strokeWidth="4"
                  strokeDasharray="10 8"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 3,
                    duration: 1.2,
                  }}
                />
              </svg>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
              >
                <p className="text-xl font-black text-slate-800">
                  These aren't rows anymore.
                </p>

                <p className="text-lg text-violet-600 font-bold mt-1">
                  They form a cloud of points.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="border-l border-slate-200 px-6 py-10 flex flex-col justify-center"
        style={{ flex: '0 0 28%' }}
      >
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 4.5 }}
        >
          <p className="text-xs uppercase tracking-widest text-slate-400 font-black mb-4">
            Key Idea
          </p>

          <h3 className="text-3xl font-black text-slate-900 leading-tight mb-6">
            PCA starts when we stop seeing...
          </h3>

          <div className="space-y-4 text-lg">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="font-bold text-red-700">
                Rows of numbers
              </div>
            </div>

            <div className="text-center text-2xl font-black text-slate-400">
              ↓
            </div>

            <div className="bg-violet-50 border border-violet-200 rounded-xl p-4">
              <div className="font-bold text-violet-700">
                A geometric shape
              </div>
            </div>
          </div>

          <p className="text-slate-500 mt-8 text-base leading-relaxed">
            The next question is:
            <br />
            <span className="font-bold text-slate-800">
              What structure is hidden inside this cloud?
            </span>
          </p>
        </motion.div>
      </div>

    </div>
  );
};

export default Scene7_1_WhyPCA;