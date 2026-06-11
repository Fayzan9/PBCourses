import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';

type Message = {
  id: number;
  type: 'program' | 'user' | 'annotation';
  text: string;
  code?: string;
  note?: string;
};

const FLOW_STEPS = [
  { code: 'name = input("What\'s your name? ")', label: 'input() pauses the program and waits for the user to type', active: false },
  { code: 'age = int(input("Your age? "))',        label: 'input() always returns str — int() converts it to a number', active: false },
  { code: 'print(f"Hey {name}!")',                 label: 'print() sends text to the screen', active: false },
  { code: 'print(f"In 10 years: {age + 10}")',     label: 'f-strings let you embed any expression directly inside {}', active: false },
];

const INITIAL_MESSAGES: Message[] = [
  { id: 1, type: 'annotation', text: '', code: 'name = input("What\'s your name? ")', note: 'input() — program asks the user' },
  { id: 2, type: 'program', text: "What's your name?" },
];

export const Scene05_InputOutput: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [stage, setStage] = useState<'name' | 'age' | 'done'>('name');
  const [storedName, setStoredName] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const val = inputVal.trim();
    if (!val) return;
    setInputVal('');

    if (stage === 'name') {
      setStoredName(val);
      setMessages(prev => [
        ...prev,
        { id: Date.now(),     type: 'user',       text: val },
        { id: Date.now() + 1, type: 'annotation', text: '', code: 'age = int(input("Your age? "))', note: 'int() converts the string to a number' },
        { id: Date.now() + 2, type: 'program',    text: 'Your age?' },
      ]);
      setStage('age');
      setActiveStep(1);
    } else if (stage === 'age') {
      const age = parseInt(val) || 0;
      setMessages(prev => [
        ...prev,
        { id: Date.now(),     type: 'user',       text: val },
        { id: Date.now() + 1, type: 'annotation', text: '', code: `print(f"Hey ${storedName}!")`, note: 'print() outputs to the screen' },
        { id: Date.now() + 2, type: 'program',    text: `Hey ${storedName}!` },
        { id: Date.now() + 3, type: 'annotation', text: '', code: `print(f"In 10 years: ${age + 10}")`, note: 'f-string embeds the expression inline' },
        { id: Date.now() + 4, type: 'program',    text: `In 10 years: ${age + 10}` },
      ]);
      setStage('done');
      setActiveStep(3);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setStage('name');
    setStoredName('');
    setActiveStep(0);
    setInputVal('');
  };

  return (
    <div className="h-full w-full flex flex-col lg:flex-row px-8 py-5 gap-6 overflow-hidden">

      {/* Left — concept */}
      <div className="lg:w-[360px] shrink-0 flex flex-col justify-center gap-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">Scene 05 · Input / Output</span>
          <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
            Teaching Python to<br /><span className="text-amber-500">have a conversation.</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed">
            Every program is a dialogue. <code className="text-emerald-700 font-mono font-bold">print()</code> is your program <em>speaking</em>.{' '}
            <code className="text-sky-700 font-mono font-bold">input()</code> is it <em>listening</em>.
          </p>
        </div>

        {/* Flow steps — highlights as conversation progresses */}
        <div className="flex flex-col gap-2">
          {FLOW_STEPS.map((step, i) => (
            <motion.div
              key={i}
              animate={{ opacity: activeStep >= i ? 1 : 0.35 }}
              transition={{ duration: 0.4 }}
              className={`rounded-xl border px-4 py-3 transition-colors ${
                activeStep === i
                  ? 'bg-amber-50 border-amber-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className={`font-mono text-xs px-2.5 py-1.5 rounded-lg border mb-1.5 w-fit ${
                activeStep === i
                  ? 'bg-white border-amber-200 text-emerald-700'
                  : 'bg-slate-50 border-slate-200 text-emerald-700'
              }`}>
                {step.code}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">{step.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-500 leading-relaxed">
          <span className="text-amber-600 font-bold">Note:</span>{' '}
          <code className="text-sky-700 font-mono">input()</code> always returns a <strong className="text-slate-700">string</strong>.
          Wrap with <code className="text-amber-600 font-mono">int()</code> or <code className="text-amber-600 font-mono">float()</code> to convert.
        </div>
      </div>

      {/* Right — chat simulation */}
      <div className="flex-1 flex flex-col min-h-0 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Chat header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-sm">
              🐍
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">greeter.py</p>
              <div className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 rounded-full ${stage === 'done' ? 'bg-slate-300' : 'bg-emerald-500 animate-pulse'}`} />
                <span className="text-[11px] text-slate-400 font-medium">{stage === 'done' ? 'finished' : 'running…'}</span>
              </div>
            </div>
          </div>
          {stage === 'done' && (
            <button
              onClick={handleReset}
              className="text-xs font-bold text-amber-600 hover:text-amber-700 border border-amber-200 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            >
              ↺ Run again
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 min-h-0 bg-slate-50/50">
          <AnimatePresence initial={false}>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.22 }}
              >
                {msg.type === 'annotation' && (
                  <div className="flex justify-center my-1">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 max-w-sm">
                      <code className="font-mono text-xs text-emerald-800 font-semibold block">{msg.code}</code>
                      {msg.note && <p className="text-[10px] text-emerald-600 mt-0.5">{msg.note}</p>}
                    </div>
                  </div>
                )}
                {msg.type === 'program' && (
                  <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0 text-xs">
                      🐍
                    </div>
                    <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs shadow-sm">
                      <p className="text-sm text-slate-800 font-medium">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mb-1">print()</span>
                  </div>
                )}
                {msg.type === 'user' && (
                  <div className="flex items-end justify-end gap-2">
                    <span className="text-[10px] text-slate-400 font-mono mb-1">input()</span>
                    <div className="bg-amber-500 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs shadow-sm">
                      <p className="text-sm text-white font-medium">{msg.text}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-xs">
                      👤
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Input bar */}
        <div className="px-5 py-4 border-t border-slate-100 bg-white shrink-0">
          {stage !== 'done' ? (
            <div className="flex items-center gap-3">
              <input
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder={stage === 'name' ? 'Type your name…' : 'Type your age…'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-amber-400 focus:bg-white transition-colors font-medium"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-amber-500 hover:bg-amber-400 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Send size={15} className="text-white" />
              </button>
            </div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-xs text-slate-400 font-mono"
            >
              Process finished with exit code 0
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scene05_InputOutput;
