import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
  {
    id: 'ai',
    icon: '🤖',
    title: 'Artificial Intelligence',
    tag: 'AI & ML',
    codeColor: 'text-violet-600',
    accentBg: 'bg-violet-50',
    accentBorder: 'border-violet-200',
    accentText: 'text-violet-700',
    code: 'model.fit(X_train, y_train)\npredictions = model.predict(X_test)',
    description: 'The same language trains GPT, detects cancer in X-rays, and powers recommendation engines at Netflix and Spotify.',
    companies: ['Google', 'OpenAI', 'DeepMind'],
  },
  {
    id: 'web',
    icon: '🌐',
    title: 'Web & APIs',
    tag: 'Backend',
    codeColor: 'text-sky-600',
    accentBg: 'bg-sky-50',
    accentBorder: 'border-sky-200',
    accentText: 'text-sky-700',
    code: '@app.route("/users")\ndef get_users():\n    return db.query(User).all()',
    description: 'Instagram, Spotify, and Dropbox run Python backends serving millions of API requests every second.',
    companies: ['Instagram', 'Spotify', 'Reddit'],
  },
  {
    id: 'data',
    icon: '📊',
    title: 'Data & Analytics',
    tag: 'Data Science',
    codeColor: 'text-emerald-600',
    accentBg: 'bg-emerald-50',
    accentBorder: 'border-emerald-200',
    accentText: 'text-emerald-700',
    code: 'df.groupby("region")\n  .agg({"revenue": "sum"})\n  .plot(kind="bar")',
    description: 'Every data analyst, quant, and BI team uses Python to find patterns in datasets too large to open in Excel.',
    companies: ['JPMorgan', 'NASA', 'Uber'],
  },
  {
    id: 'automation',
    icon: '⚡',
    title: 'Automation',
    tag: 'DevOps / Scripts',
    codeColor: 'text-amber-600',
    accentBg: 'bg-amber-50',
    accentBorder: 'border-amber-200',
    accentText: 'text-amber-700',
    code: 'for file in folder.glob("*.pdf"):\n    text = extract(file)\n    send_to_slack(text)',
    description: 'Python scripts automate repetitive tasks, deploy cloud servers, scrape websites, and process thousands of files overnight.',
    companies: ['AWS', 'Cloudflare', 'Stripe'],
  },
];

export const Scene02_WhyPython: React.FC = () => {
  const [active, setActive] = useState(0);
  const domain = DOMAINS[active];

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
          Scene 02 · Why Python?
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          One language. <span className="text-amber-500">Every industry.</span>
        </h2>
        <p className="text-slate-500 text-sm mt-1 leading-relaxed">
          Python is the most in-demand language in the industry. Here's why it matters before we write a single line.
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col lg:flex-row gap-4 min-h-0">

        {/* Domain tabs */}
        <div className="flex lg:flex-col gap-2 lg:w-48 shrink-0">
          {DOMAINS.map((d, i) => (
            <motion.button
              key={d.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                active === i
                  ? `${domain.accentBg} ${domain.accentBorder} shadow-sm`
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl shrink-0">{d.icon}</span>
              <div className="hidden lg:flex flex-col min-w-0">
                <span className={`text-xs font-bold truncate ${active === i ? domain.accentText : 'text-slate-600'}`}>{d.title}</span>
                <span className={`text-[10px] font-mono ${active === i ? domain.accentText + ' opacity-70' : 'text-slate-400'}`}>{d.tag}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={domain.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col gap-3 min-h-0"
          >
            {/* Info card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 shrink-0">
              <div className="flex items-start gap-3">
                <span className="text-4xl">{domain.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-black text-slate-800">{domain.title}</h3>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${domain.accentText} ${domain.accentBg} ${domain.accentBorder}`}>
                      {domain.tag}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mt-1 leading-relaxed">{domain.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] text-slate-400 font-mono">Used at:</span>
                {domain.companies.map(c => (
                  <span key={c} className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Code panel */}
            <div className={`flex-1 rounded-2xl border-2 overflow-hidden min-h-0 ${domain.accentBg} ${domain.accentBorder}`}>
              <div className={`flex items-center gap-2 px-5 py-3 border-b ${domain.accentBorder}`}>
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-400">example.py</span>
              </div>
              <pre className={`px-6 py-5 font-mono text-sm leading-7 font-semibold ${domain.accentText}`}>{domain.code}</pre>
            </div>

            {/* Bottom callout */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2.5 shrink-0">
              <span className="text-base">💡</span>
              <p className="text-amber-800 text-xs leading-relaxed font-medium">
                All of this starts with what you'll learn today — variables, types, and how Python thinks about data.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Scene02_WhyPython;
