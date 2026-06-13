import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideLayout } from '../../components/SlideLayout';
import { TransformGrid, useAnimatedMatrix } from '../../components/TransformGrid';
import { type Mat2, mulMV } from '../../components/mathHelpers';
import { Eye, X } from 'lucide-react';

interface DataPoint {
  id: string;
  x: number;
  y: number;
  label: 'A' | 'B';
}

// --- DATASETS ---
const SPAM_DATA: DataPoint[] = [
  // Class A: Normal (squished below axis)
  { id: 's1', x: -1.8, y: -0.2, label: 'A' },
  { id: 's2', x: -0.9, y: -0.4, label: 'A' },
  { id: 's3', x: 0.0, y: -0.1, label: 'A' },
  { id: 's4', x: 0.9, y: -0.3, label: 'A' },
  { id: 's5', x: 1.8, y: -0.2, label: 'A' },
  // Class B: Spam (squished above axis)
  { id: 's6', x: -1.8, y: 0.2, label: 'B' },
  { id: 's7', x: -0.9, y: 0.4, label: 'B' },
  { id: 's8', x: 0.0, y: 0.1, label: 'B' },
  { id: 's9', x: 0.9, y: 0.3, label: 'B' },
  { id: 's10', x: 1.8, y: 0.2, label: 'B' },
];

const MEDICAL_DATA: DataPoint[] = [
  // Class A: Diagonal Upper Left
  { id: 'm1', x: -1.6, y: -0.8, label: 'A' },
  { id: 'm2', x: -0.9, y: -0.1, label: 'A' },
  { id: 'm3', x: -0.2, y: 0.6, label: 'A' },
  { id: 'm4', x: 0.5, y: 1.3, label: 'A' },
  { id: 'm5', x: 1.2, y: 2.0, label: 'A' },
  // Class B: Diagonal Lower Right
  { id: 'm6', x: -0.8, y: -1.6, label: 'B' },
  { id: 'm7', x: -0.1, y: -0.9, label: 'B' },
  { id: 'm8', x: 0.6, y: -0.2, label: 'B' },
  { id: 'm9', x: 1.3, y: 0.5, label: 'B' },
  { id: 'm10', x: 2.0, y: 1.2, label: 'B' },
];

const FRAUD_DATA: DataPoint[] = [
  // Inner cluster (Normal) - Radius ~ 0.5
  { id: 'f1', x: 0.5, y: 0, label: 'A' },
  { id: 'f2', x: 0, y: 0.5, label: 'A' },
  { id: 'f3', x: -0.5, y: 0, label: 'A' },
  { id: 'f4', x: 0, y: -0.5, label: 'A' },
  { id: 'f5', x: 0.35, y: 0.35, label: 'A' },
  { id: 'f6', x: -0.35, y: -0.35, label: 'A' },
  // Outer ring (Fraud) - Radius ~ 1.8
  { id: 'f7', x: 1.8, y: 0, label: 'B' },
  { id: 'f8', x: 0, y: 1.8, label: 'B' },
  { id: 'f9', x: -1.8, y: 0, label: 'B' },
  { id: 'f10', x: 0, y: -1.8, label: 'B' },
  { id: 'f11', x: 1.27, y: 1.27, label: 'B' },
  { id: 'f12', x: -1.27, y: -1.27, label: 'B' },
];

type TransformType = 'identity' | 'rotate' | 'stretch' | 'shear' | 'square';

interface Transformation {
  id: TransformType;
  name: string;
  matrix: Mat2;
  description: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    id: 'identity',
    name: 'Original (Identity)',
    matrix: [[1, 0], [0, 1]],
    description: 'No change to the space',
  },
  {
    id: 'rotate',
    name: 'Rotate -45°',
    matrix: [[0.707, 0.707], [-0.707, 0.707]],
    description: 'Align diagonal distributions with axes',
  },
  {
    id: 'stretch',
    name: 'Stretch Y (Scale Y by 4)',
    matrix: [[1, 0], [0, 4]],
    description: 'Expand the vertical gap between classes',
  },
  {
    id: 'shear',
    name: 'Shear X',
    matrix: [[1, 1.5], [0, 1]],
    description: 'Skew space horizontally',
  },
  {
    id: 'square',
    name: 'Non-linear ($x^2, y^2$)',
    matrix: [[1, 0], [0, 1]], // Plotted as identity grid, but coordinates squared
    description: 'Square coordinates to map distances',
  },
];

const CX = 240;
const CY = 240;
const SC = 68;

type DatasetKey = 'spam' | 'medical' | 'fraud';

export const Scene4_12_WhyTransformationsHelp: React.FC = () => {
  const [datasetKey, setDatasetKey] = useState<DatasetKey>('fraud');
  const [selectedTransform, setSelectedTransform] = useState<TransformType>('identity');
  const [showBoundary, setShowBoundary] = useState(false);
  const [viewingMatrix, setViewingMatrix] = useState<Transformation | null>(null);

  // Determine current data
  const currentData = 
    datasetKey === 'spam' ? SPAM_DATA : 
    datasetKey === 'medical' ? MEDICAL_DATA : 
    FRAUD_DATA;

  const activeTransformObj = TRANSFORMATIONS.find(t => t.id === selectedTransform) || TRANSFORMATIONS[0];
  
  // Hook handles smooth transition between matrices for the grid
  const animatedMatrix = useAnimatedMatrix(activeTransformObj.matrix, 900);

  // Check if the current combination is the successful one
  const isCorrectTransform = 
    (datasetKey === 'spam' && selectedTransform === 'stretch') ||
    (datasetKey === 'medical' && selectedTransform === 'rotate') ||
    (datasetKey === 'fraud' && selectedTransform === 'square');

  const getBoundaryLine = () => {
    if (!showBoundary) return null;
    
    if (isCorrectTransform) {
      if (datasetKey === 'spam') {
        // Horizontally separating the stretched clusters
        return { x1: 50, y1: CY, x2: 430, y2: CY, isFailing: false };
      }
      if (datasetKey === 'medical') {
        // Separating rotated diagonal clusters along rotated Y axis
        return { x1: 50, y1: CY, x2: 430, y2: CY, isFailing: false };
      }
      if (datasetKey === 'fraud') {
        // Diagonal boundary in squared quadrant separates origin cluster from outer cluster
        return { x1: CX, y1: CY - 1.2 * SC, x2: 430, y2: CY + (430 - CX) - 1.2 * SC, isFailing: false };
      }
    }
    
    // Default/Failing boundary for wrong choices
    return { x1: 90, y1: 120, x2: 390, y2: 320, isFailing: true };
  };

  const boundary = getBoundaryLine();

  return (
    <SlideLayout
      title="Why Transform Space?"
      text="AI separates complex data by warping the coordinate space until a straight line works."
      sidebarContent={
        <div className="flex flex-col gap-5 justify-between h-full">
          <div className="space-y-4">
            
            {/* Dataset Selector */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                1. Choose Scenario
              </h4>
              <div className="flex flex-col gap-2">
                {(['fraud', 'medical', 'spam'] as DatasetKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      setDatasetKey(key);
                      setSelectedTransform('identity');
                      setShowBoundary(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-bold text-left transition-colors ${
                      datasetKey === key ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {key === 'fraud' && '🍩 Fraud (Concentric circles)'}
                    {key === 'medical' && '🧬 Medical (Diagonal layout)'}
                    {key === 'spam' && '✉️ Spam (Very squished lines)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Transform Controls */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                2. Select Space Transform
              </h4>
              <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                {TRANSFORMATIONS.map((t) => (
                  <div
                    key={t.id}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
                      selectedTransform === t.id 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => {
                        setSelectedTransform(t.id);
                      }}
                      className="flex-1 text-xs font-bold text-left"
                    >
                      <div>{t.name}</div>
                      <div className={`text-[10px] font-normal mt-0.5 ${selectedTransform === t.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {t.description}
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewingMatrix(t);
                      }}
                      title="Inspect matrix"
                      className={`p-1.5 rounded-md transition-colors ${
                        selectedTransform === t.id
                          ? 'hover:bg-slate-800 text-slate-300 hover:text-white'
                          : 'hover:bg-slate-200 text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Eye size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 mt-2">
                <button
                  onClick={() => setShowBoundary(v => !v)}
                  className={`w-full py-2 rounded-xl font-bold text-xs border-2 transition-all ${
                    showBoundary ? 'border-rose-500 text-rose-600' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {showBoundary ? 'Hide Decision Line' : 'Draw Decision Line'}
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
            <h4 className="text-xs font-black uppercase tracking-wide text-violet-800 mb-1">
              Interactive Challenge
            </h4>
            <p className="text-[11px] text-slate-700 leading-relaxed">
              Find the right space warp to clearly partition class Blue from Class Red with a straight line.
            </p>
            {showBoundary && (
              <div className="mt-2 font-bold text-xs">
                {isCorrectTransform ? (
                  <span className="text-emerald-600">✓ Perfect! The data is now linearly separable.</span>
                ) : (
                  <span className="text-rose-600">✗ The decision line crosses data points. Try another warp!</span>
                )}
              </div>
            )}
          </div>
        </div>
      }
    >
      <div className="w-full h-full flex items-center justify-center p-4 relative">
        <TransformGrid M={animatedMatrix} showBasisVectors={false} showTransformVectors={false} />

        <svg viewBox="0 0 480 480" className="absolute inset-0 w-full h-full pointer-events-none">
          
          {/* Decision Boundary */}
          <AnimatePresence>
            {boundary && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <line
                  x1={boundary.x1} y1={boundary.y1}
                  x2={boundary.x2} y2={boundary.y2}
                  stroke={boundary.isFailing ? "#ef4444" : "#10B981"}
                  strokeWidth="3"
                  strokeDasharray="8 5"
                  opacity={boundary.isFailing ? 0.6 : 1}
                />
                {boundary.isFailing ? (
                  <text x="240" y="55" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="700">
                    Fails to separate data
                  </text>
                ) : (
                  <text x="240" y="55" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="700">
                    Separated successfully!
                  </text>
                )}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Data Points */}
          {currentData.map((pt) => {
            let tx = pt.x;
            let ty = pt.y;

            // Apply Transformation
            if (selectedTransform === 'square') {
              // Non-linear bypass: (x, y) -> (x^2, y^2)
              tx = pt.x * pt.x;
              ty = pt.y * pt.y;
            } else {
              // Linear Matrix Multiplication (animatedMatrix automatically interpolates)
              const res = mulMV(animatedMatrix, [pt.x, pt.y]);
              tx = res[0];
              ty = res[1];
            }

            // Convert to screen coordinates
            const px = CX + tx * SC;
            const py = CY - ty * SC;

            const color = pt.label === 'A' ? '#0284C7' : '#E11D48';

            return (
              <motion.circle
                key={pt.id}
                r="7"
                fill={color}
                stroke="#fff"
                strokeWidth="2"
                animate={{ cx: px, cy: py }}
                transition={{ duration: 0.9, type: 'spring', bounce: 0.2 }}
              />
            );
          })}
        </svg>
      </div>

      <AnimatePresence>
        {viewingMatrix && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewingMatrix(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 cursor-default relative"
            >
              <button
                onClick={() => setViewingMatrix(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100"
              >
                <X size={16} />
              </button>
              
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">
                Transformation Details
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-semibold">
                {viewingMatrix.name} — {viewingMatrix.description}
              </p>

              {viewingMatrix.id === 'square' ? (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2 text-center font-mono text-xs">
                  <div className="text-slate-800 font-bold">Non-linear Mapping:</div>
                  <div className="text-indigo-600 font-black text-sm py-2 bg-white rounded border border-slate-200">
                    f(x, y) = [x², y²]
                  </div>
                  <div className="text-[10px] text-slate-500 leading-normal">
                    This is a non-linear projection. It maps Cartesian coordinates to squared distance coordinates, allowing radial rings to become linearly separable.
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-3 font-mono text-lg text-slate-800">
                    <span className="text-2xl font-light text-slate-300">[</span>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-center font-bold">
                      <span className="text-emerald-600">{viewingMatrix.matrix[0][0]}</span>
                      <span className="text-blue-600">{viewingMatrix.matrix[0][1]}</span>
                      <span className="text-emerald-600">{viewingMatrix.matrix[1][0]}</span>
                      <span className="text-blue-600">{viewingMatrix.matrix[1][1]}</span>
                    </div>
                    <span className="text-2xl font-light text-slate-300">]</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-4 text-center leading-normal">
                    Columns indicate where the basis vectors <span className="text-emerald-600 font-bold">î</span> and <span className="text-blue-600 font-bold">ĵ</span> land in the new space.
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SlideLayout>
  );
};

export default Scene4_12_WhyTransformationsHelp;