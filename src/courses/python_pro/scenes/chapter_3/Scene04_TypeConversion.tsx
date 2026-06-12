import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Scene04_TypeConversion: React.FC = () => {
  const [inputValue, setInputValue] = useState('25');
  const [conversionType, setConversionType] = useState<
    'int' | 'float' | 'str'
  >('int');

  const getConvertedValue = () => {
    switch (conversionType) {
      case 'int':
        return parseInt(inputValue || '0');
      case 'float':
        return parseFloat(inputValue || '0');
      case 'str':
        return `"${inputValue}"`;
    }
  };

  return (
    <div className="h-full w-full flex flex-col px-8 py-6 gap-5 overflow-hidden">
      {/* Header */}
      <div>
        <span className="text-sm font-mono uppercase tracking-widest text-indigo-600 font-extrabold">
          Lesson 3.4 · Writing Real Python Programs
        </span>

        <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-800 mt-1">
          Type{' '}
          <span className="text-indigo-600 font-serif italic">
            Conversion
          </span>
        </h2>

        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Sometimes we need to convert a value from one type into another.
        </p>
      </div>

      <div className="flex-1 flex gap-5 min-h-0">

        {/* Left Panel */}
        <div className="w-[340px] shrink-0 flex flex-col gap-4">

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Key Concept
            </div>

            <div className="mt-3 space-y-2 text-xs font-semibold text-slate-600">
              <div>• input() returns text.</div>
              <div>• "25" is a string.</div>
              <div>• 25 is an integer.</div>
              <div>• Conversion changes the type.</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase">
              Try It
            </div>

            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full mt-3 px-3 py-2 rounded-xl border border-slate-200 font-mono font-bold"
            />

            <div className="mt-3 flex flex-col gap-2">

              <button
                onClick={() => setConversionType('int')}
                className={`p-2 rounded-xl border text-sm font-bold transition-all ${
                  conversionType === 'int'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200'
                }`}
              >
                int()
              </button>

              <button
                onClick={() => setConversionType('float')}
                className={`p-2 rounded-xl border text-sm font-bold transition-all ${
                  conversionType === 'float'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200'
                }`}
              >
                float()
              </button>

              <button
                onClick={() => setConversionType('str')}
                className={`p-2 rounded-xl border text-sm font-bold transition-all ${
                  conversionType === 'str'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-200'
                }`}
              >
                str()
              </button>

            </div>
          </div>

        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between">

          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
            Conversion Flow
          </div>

          <motion.div
            key={`${inputValue}-${conversionType}`}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="flex items-center gap-10">

              {/* Original */}
              <div className="w-56 h-56 bg-white border-2 border-orange-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Original Value
                </div>

                <div className="text-4xl font-black text-orange-600 mt-4">
                  "{inputValue}"
                </div>

                <div className="mt-3 text-sm font-bold text-slate-500">
                  str
                </div>

              </div>

              <div className="text-5xl text-slate-300">
                →
              </div>

              {/* Converted */}
              <div className="w-56 h-56 bg-white border-2 border-indigo-500 rounded-3xl flex flex-col items-center justify-center">

                <div className="text-xs font-mono text-slate-400 uppercase">
                  Converted Value
                </div>

                <div className="text-4xl font-black text-indigo-600 mt-4">
                  {getConvertedValue()}
                </div>

                <div className="mt-3 text-sm font-bold text-slate-500">
                  {conversionType}
                </div>

              </div>

            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                Python Code
              </div>

              <pre className="mt-2 text-sm font-mono font-bold text-slate-800 whitespace-pre-wrap">
{`age = input()

age = ${conversionType}(age)`}
              </pre>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <div className="text-xs font-mono font-bold text-indigo-600 uppercase">
                Result Type
              </div>

              <div className="mt-4 text-3xl font-black text-indigo-700">
                {conversionType}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Scene04_TypeConversion;