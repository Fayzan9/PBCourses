import React, { useState } from 'react';
import { motion } from 'framer-motion';

const KEYBOARD_ROWS = [
  ['अ','आ','इ','ई','उ','ऊ','ए','ओ'],
  ['क','ख','ग','घ','च','ज','त','द','न'],
  ['प','ब','म','य','र','ल','व','स','ह'],
  ['श','ट','ड','ण','ा','ि','ी','ु','ू'],
  ['े','ो','ं','क्ष','त्र','ज्ञ','श्र'],
];

const ROMAN: Record<string, string> = {
  'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ए':'e','ओ':'o',
  'क':'k','ख':'kh','ग':'g','घ':'gh','च':'c','ज':'j','त':'t','द':'d','न':'n',
  'प':'p','ब':'b','म':'m','य':'y','र':'r','ल':'l','व':'v','स':'s','ह':'h',
  'श':'ś','ट':'ṭ','ड':'ḍ','ण':'ṇ','ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū',
  'े':'e','ो':'o','ं':'ṃ','क्ष':'kṣ','त्र':'tr','ज्ञ':'jñ','श्र':'śr',
};

const PROMPTS = [
  { label: 'Try typing', example: 'नमस्कार', hint: 'namaskār — hello' },
  { label: 'Or try', example: 'आई', hint: 'āī — mother' },
  { label: 'Or try', example: 'मित्र', hint: 'mitra — friend' },
];

export const Scene12_WritingPractice: React.FC = () => {
  const [text, setText] = useState('');
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const press = (char: string) => {
    setText(prev => prev + char);
    setActiveKey(char);
    setTimeout(() => setActiveKey(null), 150);
  };

  const backspace = () => {
    setText(prev => {
      const arr = [...prev];
      arr.pop();
      return arr.join('');
    });
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-4 overflow-hidden">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 12 · Sandbox</span>
        <h2 className="text-3xl font-black text-slate-800 mt-1 leading-tight">
          Write in <span className="text-amber-500">Devanagari.</span>
        </h2>
      </div>

      <div className="flex flex-row gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Left: output + prompts */}
        <div className="w-[280px] shrink-0 flex flex-col gap-3">
          {/* Display */}
          <div className="bg-slate-900 rounded-2xl px-5 py-4 min-h-[100px] flex flex-col justify-between border border-slate-800 flex-1">
            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2">Your text</p>
            <div className="flex-1 flex items-center">
              {text ? (
                <span className="text-4xl font-bold text-amber-400 leading-relaxed" style={{ fontFamily: 'serif' }}>
                  {text}
                  <span className="animate-pulse text-amber-600">|</span>
                </span>
              ) : (
                <span className="text-slate-600 text-sm font-mono">Click letters below to write…</span>
              )}
            </div>
          </div>

          {/* Prompts */}
          <div className="flex flex-col gap-2">
            {PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => setText(p.example)}
                className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2 hover:border-amber-300 hover:bg-amber-50 transition-all cursor-pointer text-left"
              >
                <div>
                  <span className="text-xs text-slate-400">{p.label} </span>
                  <span className="text-base font-bold text-amber-600" style={{ fontFamily: 'serif' }}>{p.example}</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">{p.hint}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setText('')}
            className="self-start text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
          >
            ✕ Clear
          </button>
        </div>

        {/* Right: keyboard */}
        <div className="flex-1 min-w-0 flex flex-col justify-center gap-2.5">
          <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Devanagari keyboard</p>
          {KEYBOARD_ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 flex-wrap">
              {row.map((char, ci) => (
                <motion.button
                  key={ci}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => press(char)}
                  className={`flex flex-col items-center justify-center min-w-[44px] h-[52px] rounded-xl border-2 cursor-pointer transition-all px-1 ${
                    activeKey === char
                      ? 'bg-amber-500 border-amber-600 shadow-md'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <span
                    className={`text-lg font-bold leading-none ${activeKey === char ? 'text-white' : 'text-slate-800'}`}
                    style={{ fontFamily: 'serif' }}
                  >
                    {char}
                  </span>
                  <span className={`text-[9px] font-mono leading-none mt-0.5 ${activeKey === char ? 'text-amber-100' : 'text-slate-400'}`}>
                    {ROMAN[char] || ''}
                  </span>
                </motion.button>
              ))}

              {ri === KEYBOARD_ROWS.length - 1 && (
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={backspace}
                  className="min-w-[52px] h-[52px] rounded-xl border-2 border-slate-200 bg-white hover:border-rose-300 hover:bg-rose-50 cursor-pointer flex items-center justify-center transition-all"
                >
                  <span className="text-lg text-slate-500">⌫</span>
                </motion.button>
              )}
            </div>
          ))}

          <p className="text-xs text-slate-400 mt-1">
            Tip: Matras (ा ि ी ु ू…) attach to the previous consonant when placed after it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene12_WritingPractice;
