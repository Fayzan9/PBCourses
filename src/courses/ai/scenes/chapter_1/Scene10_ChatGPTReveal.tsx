import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export const Scene10_ChatGPTReveal: React.FC = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: '1. User Input', desc: 'Translating input prompt into coordinates.', code: '"cute kitten"' },
    { label: '2. Location Mapping', desc: 'Placing the query vector in semantics space.', code: '[0.23, 0.81, 0.44]' },
    { label: '3. Proximity Scan', desc: 'Locating nearby words: "meow", "purr", "whiskers".', code: 'Finding Neighbors...' },
    { label: '4. Decoded Output', desc: 'Assembling neighboring concepts into a reply.', code: '"Kitten purrs..."' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % steps.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-6 h-full py-2 w-full max-w-7xl mx-auto px-4 overflow-hidden">
      {/* Visual representation of chat pipeline */}
      <div className="flex-[65] min-h-0 min-w-0 bg-white/40 border border-slate-200/50 rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-inner">
        <div className="absolute top-2.5 right-3 text-[10px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1 font-bold">
          <Brain size={11} className="text-vector" /> AI Inference Engine
        </div>

        <div className="flex flex-col gap-5 mt-4">
          {steps.map((s, idx) => {
            const isActive = step === idx;
            return (
              <motion.div
                key={idx}
                animate={{ 
                  scale: isActive ? 1.02 : 0.98,
                  borderColor: isActive ? 'rgba(2, 132, 199, 0.3)' : 'rgba(15, 23, 42, 0.05)',
                  backgroundColor: isActive ? 'rgba(241, 245, 249, 0.8)' : 'rgba(255, 255, 255, 0.2)'
                }}
                className="border p-3.5 rounded-xl flex items-center justify-between transition-all gap-4 shadow-sm"
              >
                <div className="text-left">
                  <h4 className={`text-xs font-extrabold ${isActive ? 'text-vector' : 'text-slate-400'}`}>{s.label}</h4>
                  <p className="text-slate-600 text-xs mt-0.5 leading-relaxed font-medium">{s.desc}</p>
                </div>
                <div className="font-mono text-[10px] text-similarity shrink-0 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-200 max-w-[150px] truncate font-bold">
                  {s.code}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex-[35] flex flex-col justify-start gap-4 shrink-0 pt-2 pb-2 overflow-y-auto">
        <h2 className="text-4xl md:text-5xl font-black text-slate-800">How LLMs Think</h2>
        <p className="text-slate-600 text-xl md:text-2xl leading-relaxed">
          ChatGPT converts prompt phrases to locations, scans neighboring semantic concepts, and decodes them back to sentences.
        </p>
      </div>
    </div>
  );
};
