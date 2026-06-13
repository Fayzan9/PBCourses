import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Scene5_6e_WhyEigenvaluesMatter: React.FC = () => {
  const [initialCityPct, setInitialCityPct] = useState<number>(100);
  const [years, setYears] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Auto-play logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setYears((prev) => {
          if (prev >= 25) {
            setIsPlaying(false);
            return 25; // Cap at 25 years so it stops at equilibrium
          }
          return prev + 1;
        });
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Calculate current population based on the starting point and years passed
  let cityRatio = initialCityPct / 100;
  let subRatio = 1 - cityRatio;

  for (let i = 0; i < years; i++) {
    // The Transition Matrix logic:
    // Next City = 80% stay in city + 10% move from suburbs
    // Next Suburb = 20% move from city + 90% stay in suburbs
    const nextCity = (0.8 * cityRatio) + (0.1 * subRatio);
    const nextSub = (0.2 * cityRatio) + (0.9 * subRatio);
    cityRatio = nextCity;
    subRatio = nextSub;
  }

  const currentCityCount = Math.round(cityRatio * 100);
  const currentSubCount = 100 - currentCityCount;

  // Generate an array of 100 items to represent our population
  const population = Array.from({ length: 100 }).map((_, i) => i);

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden px-8 py-6 font-sans">
      
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
          Chapter 5 · Everyday Intuition
        </p>
        <h2 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">
          The Neighborhood Migration
        </h2>
        <p className="text-slate-500 mt-2 max-w-2xl mx-auto text-sm">
          Every year, 20% of the City moves to the Suburbs, and 10% of the Suburbs moves to the City. 
          Use the slider to change where everyone starts, then hit play. Watch what happens.
        </p>
      </div>

      <div className="flex flex-1 gap-6 min-h-0">
        
        {/* LEFT VISUAL: The Neighborhoods */}
        <div className="flex-[1.6] flex flex-col">
          <div className="flex flex-1 gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
            
            {/* The City Box */}
            <div className="flex-1 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-sky-800 uppercase tracking-wide">The City</h3>
                <span className="text-2xl font-mono font-bold text-sky-600">{currentCityCount}%</span>
              </div>
              <div className="flex-1 flex flex-wrap content-start gap-1.5">
                {population.map((id) => (
                  id < currentCityCount && (
                    <motion.div
                      key={id}
                      layoutId={`person-${id}`}
                      className="w-3 h-3 rounded-full bg-sky-500 shadow-sm"
                      transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                    />
                  )
                ))}
              </div>
            </div>

            {/* The Flow Arrows (Visual Only) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 pointer-events-none opacity-40">
              <div className="flex items-center gap-1 text-sky-600 font-bold text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                <span>20%</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs bg-white px-2 py-1 rounded-full shadow-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                <span>10%</span>
              </div>
            </div>

            {/* The Suburbs Box */}
            <div className="flex-1 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-mono font-bold text-emerald-600">{currentSubCount}%</span>
                <h3 className="font-black text-emerald-800 uppercase tracking-wide">Suburbs</h3>
              </div>
              <div className="flex-1 flex flex-wrap content-start justify-end gap-1.5">
                {population.map((id) => (
                  id >= currentCityCount && (
                    <motion.div
                      key={id}
                      layoutId={`person-${id}`}
                      className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm"
                      transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                    />
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="mt-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-5">
            
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-1 flex-1">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  <span>Start Everyone in Suburbs</span>
                  <span>Set Initial State</span>
                  <span>Start Everyone in City</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={initialCityPct}
                  disabled={years > 0}
                  onChange={(e) => setInitialCityPct(parseInt(e.target.value))}
                  className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${years > 0 ? 'bg-slate-100 accent-slate-300' : 'bg-slate-200 accent-slate-900'}`}
                />
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="text-slate-700 font-mono font-bold text-lg">
                Year: {years}
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => { setYears(0); setIsPlaying(false); }}
                  className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider"
                >
                  Reset
                </button>
                <button
                  onClick={() => setYears(y => y + 1)}
                  disabled={isPlaying}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:opacity-50 transition-colors"
                >
                  +1 Year
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-6 py-2 rounded-xl text-sm font-black transition-all ${
                    isPlaying ? 'bg-rose-100 text-rose-600' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {isPlaying ? 'Pause' : 'Auto-Play'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: The Math & Insights */}
        <div className="w-[380px] flex flex-col gap-4">
          
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5">
            <div className="text-xs uppercase tracking-wider font-mono font-bold text-amber-600">
              The Matrix Reality
            </div>
            <p className="text-sm text-amber-900/80 mt-2 leading-relaxed font-medium">
              Every time you press "+1 Year", you are multiplying the population vector by a Transformation Matrix. 
              The system is constantly trying to push the population around.
            </p>
          </div>

          <div className="bg-white border border-slate-200 shadow-sm rounded-3xl p-5 relative overflow-hidden transition-all">
            {years > 15 && (
              <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none" />
            )}
            
            <div className="flex justify-between items-start">
              <div className="text-xs uppercase tracking-wider font-mono font-bold text-slate-500">
                The Steady State
              </div>
            </div>
            
            <div className="text-4xl font-black text-slate-800 mt-1 font-mono flex items-baseline gap-2">
              λ = 1
            </div>

            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              When an eigenvalue is exactly 1, it means the vector <strong>stops changing</strong>. 
            </p>

            <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-sm font-bold text-slate-700">
                {years < 10 ? "Keep pressing +1 Year..." : "Notice anything? The numbers stopped moving."}
              </p>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Even though people are still moving every single day, the <em>overall ratio</em> has locked into place at 33/67.
              </p>
            </div>
          </div>

          {/* The Insight Box */}
          <motion.div
            className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl mt-auto"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-mono text-amber-400 mb-3 font-bold">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
              The Aha Moment
            </div>
            <p className="leading-relaxed text-sm text-slate-100">
              An eigenvector isn't just an arrow in space. In dynamic systems, the eigenvector is the system's <strong>destiny</strong>.
            </p>
            <div className="my-3 h-px bg-slate-700" />
            <p className="text-xs text-slate-400 leading-relaxed">
              No matter what you set the initial slider to—100% City, 100% Suburbs, or 50/50—the matrix forces the population toward the exact same 33/67 eigenvector. 
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Scene5_6e_WhyEigenvaluesMatter;