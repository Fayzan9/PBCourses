import React from 'react';

export const ClosuresScene: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl p-6 glass-panel rounded-2xl">
      <h2 className="text-2xl font-extrabold text-slate-800">Lexical Closure</h2>
      <p className="text-slate-600 text-sm">
        A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment).
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-3 bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs">
          <span>function makeCounter() &#123;</span>
          <span className="pl-4 text-yellow-400">let count = 0;</span>
          <span className="pl-4">return function() &#123;</span>
          <span className="pl-8 text-emerald-400">count++;</span>
          <span className="pl-8">return count;</span>
          <span className="pl-4">&#125;</span>
          <span>&#125;</span>
          <span>const counter = makeCounter();</span>
          <span>counter(); <span className="text-slate-500">// 1</span></span>
        </div>
        <div className="border border-slate-200/80 bg-white/50 rounded-xl p-4 flex flex-col justify-center gap-2">
          <h4 className="text-xs font-bold text-slate-700">Scope Chain Visualizer</h4>
          <div className="flex flex-col gap-2">
            <div className="border border-yellow-200 bg-yellow-50/50 p-2.5 rounded-lg">
              <div className="text-[10px] font-extrabold text-yellow-700 uppercase">Global Context</div>
              <div className="text-[11px] font-mono text-slate-600">makeCounter, counter</div>
            </div>
            <div className="border border-amber-200 bg-amber-50/50 p-2.5 rounded-lg ml-4">
              <div className="text-[10px] font-extrabold text-amber-700 uppercase">Closure (makeCounter)</div>
              <div className="text-[11px] font-mono text-slate-600">count: 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ClosuresScene;
