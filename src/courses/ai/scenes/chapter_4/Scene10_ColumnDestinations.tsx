import React, { useState } from 'react';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid } from '../../components/TransformGrid';
import { type Mat2, fmt } from '../../components/mathHelpers';

export const Scene4_10_ColumnDestinations: React.FC = () => {
  const [focused, setFocused] = useState<0 | 1 | null>(null);

  const theta = 35 * (Math.PI / 180);
  const M: Mat2 = [
    [Math.cos(theta) * 1.3, -Math.sin(theta)],
    [Math.sin(theta) * 1.3,  Math.cos(theta)],
  ];
  const col0: [number, number] = [M[0][0], M[1][0]]; // [a, c]
  const col1: [number, number] = [M[0][1], M[1][1]]; // [b, d]

  return (
    <SlideLayout
      title="Each Column = One Arrow's Destination"
      text="The 4 numbers split into two columns. Each column tells you exactly where one basis arrow lands."
      sidebarContent={
        <div className="flex flex-col gap-4">

          {/* [a b / c d] matrix with columns highlighted by hover */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 text-center">
              The matrix
            </p>
            <div className="flex items-center justify-center gap-1">
              <span className="text-slate-300 text-3xl font-thin self-stretch flex items-center">⌊</span>
              <div className="grid grid-cols-2 gap-2">
                {/* a — col 0 */}
                <div className="w-14 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-black transition-all"
                  style={focused === 0
                    ? { backgroundColor: '#E11D48', color: '#fff' }
                    : { backgroundColor: '#fef2f2', color: '#E11D48' }}>
                  a
                </div>
                {/* b — col 1 */}
                <div className="w-14 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-black transition-all"
                  style={focused === 1
                    ? { backgroundColor: '#0284C7', color: '#fff' }
                    : { backgroundColor: '#f0f9ff', color: '#0284C7' }}>
                  b
                </div>
                {/* c — col 0 */}
                <div className="w-14 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-black transition-all"
                  style={focused === 0
                    ? { backgroundColor: '#E11D48', color: '#fff' }
                    : { backgroundColor: '#fef2f2', color: '#E11D48' }}>
                  c
                </div>
                {/* d — col 1 */}
                <div className="w-14 h-10 rounded-xl flex items-center justify-center font-mono text-lg font-black transition-all"
                  style={focused === 1
                    ? { backgroundColor: '#0284C7', color: '#fff' }
                    : { backgroundColor: '#f0f9ff', color: '#0284C7' }}>
                  d
                </div>
              </div>
              <span className="text-slate-300 text-3xl font-thin self-stretch flex items-center">⌋</span>
            </div>
            <div className="flex justify-center gap-8 mt-3">
              <span className="text-[10px] font-bold text-rose-500">Col 1 = [a, c]</span>
              <span className="text-[10px] font-bold text-sky-500">Col 2 = [b, d]</span>
            </div>
          </div>

          {/* Column → destination cards */}
          <div
            onMouseEnter={() => setFocused(0)}
            onMouseLeave={() => setFocused(null)}
            className="rounded-2xl border p-4 cursor-default transition-all duration-200"
            style={{
              backgroundColor: focused === 0 ? '#fff1f2' : '#fff',
              borderColor: focused === 0 ? '#E11D48' : '#e2e8f0',
              boxShadow: focused === 0 ? '0 0 0 1px #E11D4830, 0 4px 12px #E11D4818' : undefined,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-rose-100 text-rose-600">
                Col 1 → [a, c]
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400">[1, 0]</span>
              <svg width="28" height="14" viewBox="0 0 28 14">
                <line x1="2" y1="7" x2="22" y2="7" stroke={focused === 0 ? '#E11D48' : '#cbd5e1'} strokeWidth="2" strokeLinecap="round"/>
                <polyline points="16,3 22,7 16,11" fill="none" stroke={focused === 0 ? '#E11D48' : '#cbd5e1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-base font-black text-rose-700">
                [{fmt(col0[0])}, {fmt(col0[1])}]
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">Hover to see red arrow on graph</p>
          </div>

          <div
            onMouseEnter={() => setFocused(1)}
            onMouseLeave={() => setFocused(null)}
            className="rounded-2xl border p-4 cursor-default transition-all duration-200"
            style={{
              backgroundColor: focused === 1 ? '#f0f9ff' : '#fff',
              borderColor: focused === 1 ? '#0284C7' : '#e2e8f0',
              boxShadow: focused === 1 ? '0 0 0 1px #0284C730, 0 4px 12px #0284C718' : undefined,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-sky-100 text-sky-600">
                Col 2 → [b, d]
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-slate-400">[0, 1]</span>
              <svg width="28" height="14" viewBox="0 0 28 14">
                <line x1="2" y1="7" x2="22" y2="7" stroke={focused === 1 ? '#0284C7' : '#cbd5e1'} strokeWidth="2" strokeLinecap="round"/>
                <polyline points="16,3 22,7 16,11" fill="none" stroke={focused === 1 ? '#0284C7' : '#cbd5e1'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-mono text-base font-black text-sky-700">
                [{fmt(col1[0])}, {fmt(col1[1])}]
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5">Hover to see blue arrow on graph</p>
          </div>

        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid
          M={M}
          extraVec={
            focused === 0
              ? { vec: col0, color: '#E11D48', marker: 'red',  label: `[a,c] = [${fmt(col0[0])}, ${fmt(col0[1])}]` }
              : focused === 1
              ? { vec: col1, color: '#0284C7', marker: 'blue', label: `[b,d] = [${fmt(col1[0])}, ${fmt(col1[1])}]` }
              : null
          }
        />
        {focused === null && (
          <div className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none animate-pulse">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest font-bold bg-white/90 px-4 py-1.5 rounded-full border border-slate-200">
              Hover the cards →
            </span>
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
export default Scene4_10_ColumnDestinations;
