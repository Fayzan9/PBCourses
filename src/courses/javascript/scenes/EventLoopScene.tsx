import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export const EventLoopScene: React.FC = () => {
  const [eventLoopState, setEventLoopState] = useState<'idle' | 'running' | 'done'>('idle');
  const [callStack, setCallStack] = useState<string[]>([]);
  const [webApis, setWebApis] = useState<string[]>([]);
  const [callbackQueue, setCallbackQueue] = useState<string[]>([]);

  const startEventLoopSim = () => {
    setEventLoopState('running');
    setCallStack(['console.log("Start")']);
    
    setTimeout(() => {
      setCallStack(['setTimeout(...)']);
      setWebApis(['Timer (1000ms)']);
    }, 1000);

    setTimeout(() => {
      setCallStack(['console.log("End")']);
      setWebApis([]);
      setCallbackQueue(['callback()']);
    }, 2000);

    setTimeout(() => {
      setCallbackQueue([]);
      setCallStack(['callback() -> console.log("Timeout callback")']);
    }, 3000);

    setTimeout(() => {
      setCallStack([]);
      setEventLoopState('done');
    }, 4000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl p-6 glass-panel rounded-2xl">
      <h2 className="text-2xl font-extrabold text-slate-800">The Event Loop</h2>
      <p className="text-slate-600 text-sm">
        Javascript is single-threaded, but it achieves asynchronous behavior using the Event Loop, Call Stack, Web APIs, and Callback Queue. Let's see it in action:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Call Stack */}
        <div className="border border-slate-200 bg-white/60 p-4 rounded-xl flex flex-col gap-2 min-h-36">
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Call Stack</h4>
          <div className="flex-1 flex flex-col-reverse gap-1.5 justify-start">
            {callStack.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-100 text-yellow-800 border border-yellow-200 text-[10px] font-mono p-2 rounded-lg font-bold"
              >
                {item}
              </motion.div>
            ))}
            {callStack.length === 0 && <span className="text-[10px] text-slate-400 font-semibold italic text-center py-4">Stack Empty</span>}
          </div>
        </div>

        {/* Web APIs */}
        <div className="border border-slate-200 bg-white/60 p-4 rounded-xl flex flex-col gap-2 min-h-36">
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Web APIs</h4>
          <div className="flex-1 flex flex-col gap-1.5 justify-start">
            {webApis.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-sky-100 text-sky-800 border border-sky-200 text-[10px] font-mono p-2 rounded-lg font-bold animate-pulse"
              >
                {item}
              </motion.div>
            ))}
            {webApis.length === 0 && <span className="text-[10px] text-slate-400 font-semibold italic text-center py-4">No Active Web APIs</span>}
          </div>
        </div>

        {/* Callback Queue */}
        <div className="border border-slate-200 bg-white/60 p-4 rounded-xl flex flex-col gap-2 min-h-36">
          <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Callback Queue</h4>
          <div className="flex-1 flex flex-col gap-1.5 justify-start">
            {callbackQueue.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-mono p-2 rounded-lg font-bold"
              >
                {item}
              </motion.div>
            ))}
            {callbackQueue.length === 0 && <span className="text-[10px] text-slate-400 font-semibold italic text-center py-4">Queue Empty</span>}
          </div>
        </div>
      </div>
      <button
        onClick={startEventLoopSim}
        disabled={eventLoopState === 'running'}
        className="self-start flex items-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 rounded-xl text-xs font-extrabold shadow active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
      >
        <Play size={14} /> Start Event Loop Simulation
      </button>
    </div>
  );
};
export default EventLoopScene;
