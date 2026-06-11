import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';

interface Card {
  front: string;
  back: string;
  tag: string;
  tagColorClass: string;
  backBgClass: string;
  backBorderClass: string;
  backTextClass: string;
  tagBgClass: string;
}

const CARDS: Card[] = [
  {
    front: 'What is a variable in Python?',
    back: "A variable is a name that references an object in memory. In Python, variables don't store values — they point to objects. You can reassign them to different objects at any time.",
    tag: 'Most common screening question',
    tagColorClass: 'text-amber-700',
    tagBgClass: 'bg-amber-100 border-amber-200',
    backBgClass: 'bg-amber-50',
    backBorderClass: 'border-amber-300',
    backTextClass: 'text-amber-800',
  },
  {
    front: "What's the difference between mutable and immutable?",
    back: "Immutable objects (int, str, bool, tuple) can't be changed after creation — any 'modification' creates a new object. Mutable objects (list, dict, set) can be changed in place. The key risk: two variables can silently share the same mutable object.",
    tag: 'Common in technical interviews',
    tagColorClass: 'text-violet-700',
    tagBgClass: 'bg-violet-100 border-violet-200',
    backBgClass: 'bg-violet-50',
    backBorderClass: 'border-violet-300',
    backTextClass: 'text-violet-800',
  },
  {
    front: 'What does id() return, and why does it matter?',
    back: 'id() returns the unique memory address of an object. It matters because it lets you check if two variables point to the same object. After b = a (for a list), id(a) == id(b) is True — they share the same list.',
    tag: 'Shows depth of Python knowledge',
    tagColorClass: 'text-emerald-700',
    tagBgClass: 'bg-emerald-100 border-emerald-200',
    backBgClass: 'bg-emerald-50',
    backBorderClass: 'border-emerald-300',
    backTextClass: 'text-emerald-800',
  },
];

export const Scene12_MayaDebrief: React.FC = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const goTo = (index: number) => {
    setActiveCard(index);
    setFlipped(false);
  };

  const prev = () => {
    if (activeCard > 0) goTo(activeCard - 1);
  };

  const next = () => {
    if (activeCard < CARDS.length - 1) goTo(activeCard + 1);
  };

  const card = CARDS[activeCard];

  return (
    <div className="h-full w-full flex flex-col px-8 py-5 gap-5 overflow-hidden">
      {/* Header */}
      <div className="shrink-0">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-500 font-extrabold">
          Scene 12 · Maya's Debrief
        </span>
        <h2 className="text-3xl lg:text-4xl font-black text-slate-800 mt-1 leading-[1.1]">
          The question that <span className="text-amber-500">stumped Maya.</span>
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mt-2 max-w-xl">
          3 months ago she froze. Today she has answers. These exact questions come up in technical screening calls.
        </p>
      </div>

      {/* Card deck area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 min-h-0">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                i === activeCard ? 'bg-amber-500 w-6' : 'bg-slate-200 hover:bg-slate-300'
              }`}
            />
          ))}
          <span className="ml-2 text-xs font-mono text-slate-400">
            {activeCard + 1} of {CARDS.length}
          </span>
        </div>

        {/* Flip card */}
        <div className="flex items-center gap-5 w-full max-w-2xl justify-center">
          {/* Prev arrow */}
          <button
            onClick={prev}
            disabled={activeCard === 0}
            className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-slate-200 hover:border-amber-200 flex items-center justify-center text-slate-400 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Card */}
          <div
            className="flex-1 cursor-pointer"
            style={{ perspective: '1200px' }}
            onClick={() => setFlipped((f) => !f)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCard}-${flipped ? 'back' : 'front'}`}
                initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
                transition={{ duration: 0.175, ease: 'easeOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`rounded-2xl border-2 p-7 min-h-[220px] flex flex-col justify-between shadow-sm ${
                  flipped
                    ? `${card.backBgClass} ${card.backBorderClass}`
                    : 'bg-white border-slate-200'
                }`}
              >
                {!flipped ? (
                  /* Front */
                  <>
                    <div className="flex flex-col gap-3 flex-1 justify-center">
                      <span className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
                        Interview Question
                      </span>
                      <p className="text-xl font-bold text-slate-800 leading-snug">
                        {card.front}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${card.tagBgClass} ${card.tagColorClass}`}
                      >
                        {card.tag}
                      </span>
                      <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" /> click to flip
                      </span>
                    </div>
                  </>
                ) : (
                  /* Back */
                  <>
                    <div className="flex flex-col gap-3 flex-1">
                      <span className={`text-xs font-mono uppercase tracking-widest font-bold ${card.backTextClass}`}>
                        Maya's Answer
                      </span>
                      <p className={`text-sm leading-relaxed ${card.backTextClass}`}>
                        {card.back}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${card.tagBgClass} ${card.tagColorClass}`}
                      >
                        {card.tag}
                      </span>
                      <span className={`text-xs font-mono flex items-center gap-1 ${card.backTextClass} opacity-60`}>
                        <RotateCcw className="w-3 h-3" /> click to flip back
                      </span>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next arrow */}
          <button
            onClick={next}
            disabled={activeCard === CARDS.length - 1}
            className="shrink-0 w-10 h-10 rounded-full bg-white border-2 border-slate-200 hover:border-amber-200 flex items-center justify-center text-slate-400 hover:text-amber-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Keyboard hint */}
        <p className="text-xs text-slate-400 font-mono">
          Click the card to reveal Maya's answer
        </p>
      </div>

      {/* Maya avatar quote */}
      <div className="shrink-0">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl px-6 py-4 flex items-start gap-3 max-w-xl mx-auto">
          <span className="text-2xl shrink-0">👩‍💻</span>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold block mb-1">
              Maya
            </span>
            <p className="text-slate-600 text-sm leading-relaxed italic">
              "Study these. One of them WILL come up in your first interview."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene12_MayaDebrief;
