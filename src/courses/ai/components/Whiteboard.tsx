import React, { useRef, useState, useEffect } from 'react';
import { 
  Edit2, Eraser, Trash2, Undo2, X, Grid, Check,
  Minus, ArrowUpRight, Square, Circle, Type, MousePointer,
  ChevronDown, Hand
} from 'lucide-react';

interface WhiteboardProps {
  onClose: () => void;
  activeChapterIdx: number;
}

type ToolType = 'select' | 'pencil' | 'eraser' | 'line' | 'arrow' | 'rectangle' | 'circle' | 'text' | 'pan';

interface DrawingElement {
  id: string;
  type: ToolType;
  points: { x: number; y: number }[];
  color: string;
  brushSize: number;
  text?: string;
}

const COLORS = [
  { name: 'Dark Slate', value: '#0F172A' },
  { name: 'Sky Blue (Vector)', value: '#0284C7' },
  { name: 'Amber (Similarity)', value: '#D97706' },
  { name: 'Emerald (Probability)', value: '#059669' },
  { name: 'Violet (Transform)', value: '#7C3AED' },
  { name: 'Rose (Loss)', value: '#E11D48' },
  { name: 'Cyan (SVD)', value: '#0891B2' },
];



export const Whiteboard: React.FC<WhiteboardProps> = ({ onClose, activeChapterIdx }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const textInputRef = useRef<HTMLInputElement | null>(null);
  
  const [tool, setTool] = useState<ToolType>('pencil');
  const [color, setColor] = useState('#0F172A');
  const [brushSize, setBrushSize] = useState(6);
  const [gridType, setGridType] = useState<'fine' | 'normal' | 'none'>('fine');
  
  // Vector shapes state
  const [elements, setElements] = useState<DrawingElement[]>(() => {
    try {
      const saved = localStorage.getItem(`whiteboard_elements_ch_${activeChapterIdx}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [history, setHistory] = useState<DrawingElement[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

  // Selection states
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  
  // Floating text box states
  const [textInputPos, setTextInputPos] = useState<{ x: number; y: number } | null>(null);
  const [textValue, setTextValue] = useState('');

  // Dropdown states
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showSizePicker, setShowSizePicker] = useState(false);

  // Pan states
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem(`whiteboard_panOffset_ch_${activeChapterIdx}`);
      return saved ? JSON.parse(saved) : { x: 0, y: 0 };
    } catch {
      return { x: 0, y: 0 };
    }
  });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [spacePressed, setSpacePressed] = useState(false);

  // Track spacebar for panning
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        setSpacePressed(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update canvas size on mount & resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const context = canvas.getContext('2d');
      if (context) {
        context.scale(dpr, dpr);
        context.lineCap = 'round';
        context.lineJoin = 'round';
        contextRef.current = context;
        drawAll(context, elements, selectedElementId);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    try {
      const saved = localStorage.getItem(`whiteboard_elements_ch_${activeChapterIdx}`);
      const initialElements = saved ? JSON.parse(saved) : [];
      setHistory([initialElements]);
    } catch {
      setHistory([[]]);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [elements, selectedElementId, panOffset, activeChapterIdx]);

  // Redraw when elements, selection, or panOffset changes
  useEffect(() => {
    if (contextRef.current) {
      drawAll(contextRef.current, elements, selectedElementId);
    }
  }, [elements, selectedElementId, panOffset]);

  // Focus input when text tool is placed
  useEffect(() => {
    if (textInputPos && textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [textInputPos]);

  // Persist drawings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`whiteboard_elements_ch_${activeChapterIdx}`, JSON.stringify(elements));
    } catch (e) {
      console.error('Failed to save whiteboard elements:', e);
    }
  }, [elements, activeChapterIdx]);

  useEffect(() => {
    try {
      localStorage.setItem(`whiteboard_panOffset_ch_${activeChapterIdx}`, JSON.stringify(panOffset));
    } catch (e) {
      console.error('Failed to save whiteboard panOffset:', e);
    }
  }, [panOffset, activeChapterIdx]);

  const saveHistoryState = (newElements: DrawingElement[]) => {
    setHistory(prev => {
      const next = [...prev, newElements];
      if (next.length > 30) {
        next.shift();
      }
      return next;
    });
  };

  const undo = () => {
    if (history.length <= 1) return;
    const newHistory = [...history];
    newHistory.pop();
    const prevState = newHistory[newHistory.length - 1];
    setElements(prevState || []);
    setHistory(newHistory);
    setSelectedElementId(null);
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedElementId(null);
    saveHistoryState([]);
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const distanceToSegment = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
    const l2 = (x2 - x1) ** 2 + (y2 - y1) ** 2;
    if (l2 === 0) return Math.sqrt((px - x1) ** 2 + (py - y1) ** 2);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.sqrt((px - (x1 + t * (x2 - x1))) ** 2 + (py - (y1 + t * (y2 - y1))) ** 2);
  };

  const getElementBounds = (el: DrawingElement) => {
    if (el.points.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    if (el.type === 'text') {
      const fontSize = el.brushSize * 2.5 + 12;
      const estWidth = (el.text?.length || 0) * (fontSize * 0.6);
      minX = el.points[0].x;
      minY = el.points[0].y - fontSize;
      maxX = el.points[0].x + estWidth;
      maxY = el.points[0].y + 4;
    } else {
      el.points.forEach((pt) => {
        if (pt.x < minX) minX = pt.x;
        if (pt.y < minY) minY = pt.y;
        if (pt.x > maxX) maxX = pt.x;
        if (pt.y > maxY) maxY = pt.y;
      });
    }
    
    return { minX, minY, maxX, maxY };
  };

  const isPointNearElement = (x: number, y: number, el: DrawingElement): boolean => {
    if (el.points.length === 0) return false;
    const threshold = Math.max(15, el.brushSize * 1.8);

    if (el.type === 'pencil' || el.type === 'eraser') {
      for (let i = 0; i < el.points.length - 1; i++) {
        const p1 = el.points[i];
        const p2 = el.points[i+1];
        if (distanceToSegment(x, y, p1.x, p1.y, p2.x, p2.y) < threshold) {
          return true;
        }
      }
    } else if (el.type === 'line' || el.type === 'arrow') {
      if (el.points.length >= 2) {
        return distanceToSegment(x, y, el.points[0].x, el.points[0].y, el.points[1].x, el.points[1].y) < threshold;
      }
    } else if (el.type === 'rectangle') {
      if (el.points.length >= 2) {
        const p1 = el.points[0];
        const p2 = el.points[1];
        const minX = Math.min(p1.x, p2.x);
        const maxX = Math.max(p1.x, p2.x);
        const minY = Math.min(p1.y, p2.y);
        const maxY = Math.max(p1.y, p2.y);
        
        const nearLeft = distanceToSegment(x, y, minX, minY, minX, maxY) < threshold;
        const nearRight = distanceToSegment(x, y, maxX, minY, maxX, maxY) < threshold;
        const nearTop = distanceToSegment(x, y, minX, minY, maxX, minY) < threshold;
        const nearBottom = distanceToSegment(x, y, minX, maxY, maxX, maxY) < threshold;
        const inside = x >= minX && x <= maxX && y >= minY && y <= maxY;
        return nearLeft || nearRight || nearTop || nearBottom || inside;
      }
    } else if (el.type === 'circle') {
      if (el.points.length >= 2) {
        const start = el.points[0];
        const end = el.points[1];
        const rx = Math.abs(end.x - start.x) / 2;
        const ry = Math.abs(end.y - start.y) / 2;
        const cx = start.x + (end.x - start.x) / 2;
        const cy = start.y + (end.y - start.y) / 2;
        
        if (rx === 0 || ry === 0) return false;
        const val = ((x - cx) ** 2) / (rx ** 2) + ((y - cy) ** 2) / (ry ** 2);
        return val <= 1.3;
      }
    } else if (el.type === 'text') {
      const bounds = getElementBounds(el);
      if (bounds) {
        return x >= bounds.minX - 8 && x <= bounds.maxX + 8 && y >= bounds.minY - 8 && y <= bounds.maxY + 8;
      }
    }
    return false;
  };

  const drawAll = (ctx: CanvasRenderingContext2D, list: DrawingElement[], selectedId: string | null) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    // Translate canvas to apply panning
    ctx.translate(panOffset.x, panOffset.y);

    list.forEach((el) => {
      ctx.lineWidth = el.brushSize;
      ctx.strokeStyle = el.color;
      ctx.fillStyle = el.color;

      ctx.beginPath();
      if (el.type === 'pencil') {
        if (el.points.length === 0) return;
        ctx.moveTo(el.points[0].x, el.points[0].y);
        el.points.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.stroke();
      } else if (el.type === 'eraser') {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        if (el.points.length > 0) {
          ctx.moveTo(el.points[0].x, el.points[0].y);
          el.points.forEach((pt) => ctx.lineTo(pt.x, pt.y));
          ctx.stroke();
        }
        ctx.restore();
      } else if (el.type === 'line' && el.points.length >= 2) {
        ctx.moveTo(el.points[0].x, el.points[0].y);
        ctx.lineTo(el.points[1].x, el.points[1].y);
        ctx.stroke();
      } else if (el.type === 'arrow' && el.points.length >= 2) {
        const start = el.points[0];
        const end = el.points[1];
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const headLength = Math.max(10, el.brushSize * 2.5);
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(
          end.x - headLength * Math.cos(angle - Math.PI / 6),
          end.y - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
          end.x - headLength * Math.cos(angle + Math.PI / 6),
          end.y - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();
      } else if (el.type === 'rectangle' && el.points.length >= 2) {
        ctx.rect(
          el.points[0].x, 
          el.points[0].y, 
          el.points[1].x - el.points[0].x, 
          el.points[1].y - el.points[0].y
        );
        ctx.stroke();
      } else if (el.type === 'circle' && el.points.length >= 2) {
        const start = el.points[0];
        const end = el.points[1];
        const rx = Math.abs(end.x - start.x);
        const ry = Math.abs(end.y - start.y);
        const cx = start.x + (end.x - start.x) / 2;
        const cy = start.y + (end.y - start.y) / 2;
        ctx.ellipse(cx, cy, rx / 2, ry / 2, 0, 0, 2 * Math.PI);
        ctx.stroke();
      } else if (el.type === 'text' && el.points.length >= 1 && el.text) {
        ctx.font = `600 ${el.brushSize * 2.5 + 12}px 'Outfit', sans-serif`;
        ctx.fillText(el.text, el.points[0].x, el.points[0].y);
      }

      if (el.id === selectedId) {
        ctx.save();
        ctx.strokeStyle = '#0284C7';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        
        const bounds = getElementBounds(el);
        if (bounds) {
          ctx.strokeRect(
            bounds.minX - 8, 
            bounds.minY - 8, 
            (bounds.maxX - bounds.minX) + 16, 
            (bounds.maxY - bounds.minY) + 16
          );
        }
        ctx.restore();
      }
    });

    ctx.restore();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if ('touches' in e && e.touches.length > 1) return;
    e.preventDefault();
    
    const { x: screenX, y: screenY } = getCoordinates(e);

    // Close dropdowns on canvas click
    setShowColorPicker(false);
    setShowSizePicker(false);

    // Panning is active if pan tool is selected, spacebar is held, or middle-clicked
    const isPanningActive = tool === 'pan' || spacePressed || ('button' in e && e.button === 1);

    if (isPanningActive) {
      setIsPanning(true);
      setPanStart({ x: screenX - panOffset.x, y: screenY - panOffset.y });
      return;
    }

    const x = screenX - panOffset.x;
    const y = screenY - panOffset.y;

    if (tool === 'select') {
      let foundId: string | null = null;
      for (let i = elements.length - 1; i >= 0; i--) {
        if (isPointNearElement(x, y, elements[i])) {
          foundId = elements[i].id;
          break;
        }
      }
      setSelectedElementId(foundId);
      if (foundId) {
        setDragStart({ x, y });
      } else {
        // Dragging empty space in select tool also pans the canvas (like Excalidraw)
        setIsPanning(true);
        setPanStart({ x: screenX - panOffset.x, y: screenY - panOffset.y });
      }
      return;
    }

    if (tool === 'text') {
      if (textInputPos && textValue.trim()) {
        commitText();
      }
      setTextInputPos({ x, y });
      return;
    }

    const newElId = Date.now().toString();
    const newElement: DrawingElement = {
      id: newElId,
      type: tool,
      points: [{ x, y }],
      color: color,
      brushSize: brushSize
    };

    setStartPos({ x, y });
    setElements(prev => [...prev, newElement]);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x: screenX, y: screenY } = getCoordinates(e);

    if (isPanning) {
      e.preventDefault();
      setPanOffset({
        x: screenX - panStart.x,
        y: screenY - panStart.y
      });
      return;
    }

    const x = screenX - panOffset.x;
    const y = screenY - panOffset.y;

    if (tool === 'select' && selectedElementId && dragStart) {
      e.preventDefault();
      const dx = x - dragStart.x;
      const dy = y - dragStart.y;
      
      setElements(prev => prev.map(el => {
        if (el.id === selectedElementId) {
          return {
            ...el,
            points: el.points.map(pt => ({ x: pt.x + dx, y: pt.y + dy }))
          };
        }
        return el;
      }));
      setDragStart({ x, y });
      return;
    }

    if (!isDrawing) return;
    e.preventDefault();

    setElements(prev => {
      const next = [...prev];
      if (next.length === 0) return prev;
      const currentElement = { ...next[next.length - 1] };
      
      if (tool === 'pencil' || tool === 'eraser') {
        currentElement.points = [...currentElement.points, { x, y }];
      } else if (startPos) {
        currentElement.points = [startPos, { x, y }];
      }
      
      next[next.length - 1] = currentElement;
      return next;
    });
  };

  const stopDrawing = () => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }
    if (tool === 'select') {
      if (dragStart) {
        setDragStart(null);
        saveHistoryState(elements);
      }
      return;
    }

    if (!isDrawing) return;
    
    setIsDrawing(false);
    setStartPos(null);
    saveHistoryState(elements);
  };

  const commitText = () => {
    if (!textInputPos || !textValue.trim()) {
      setTextInputPos(null);
      setTextValue('');
      return;
    }

    const newTextElement: DrawingElement = {
      id: Date.now().toString(),
      type: 'text',
      points: [textInputPos],
      color: color,
      brushSize: brushSize,
      text: textValue
    };

    const nextElements = [...elements, newTextElement];
    setElements(nextElements);
    setTextInputPos(null);
    setTextValue('');
    saveHistoryState(nextElements);
  };

  const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitText();
    } else if (e.key === 'Escape') {
      setTextInputPos(null);
      setTextValue('');
    }
  };

  // Select theme color automatically if it matches index
  useEffect(() => {
    const idx = activeChapterIdx % COLORS.length;
    if (idx !== 0) {
      setColor(COLORS[idx].value);
    }
  }, [activeChapterIdx]);

  const getCursorClass = () => {
    if (tool === 'pan' || spacePressed) {
      return isPanning ? 'cursor-grabbing' : 'cursor-grab';
    }
    if (tool === 'select') return 'cursor-default';
    return 'cursor-crosshair';
  };

  return (
    <div className="absolute inset-0 bg-white z-40 flex flex-col select-none overflow-hidden">
      {/* Canvas Area with Grids */}
      <div 
        className={`flex-1 relative w-full h-full bg-white transition-colors duration-300 ${
          gridType === 'fine' 
            ? 'space-grid-pattern-fine' 
            : gridType === 'normal' 
              ? 'space-grid-pattern' 
              : ''
        }`}
        style={{
          backgroundPosition: `${panOffset.x}px ${panOffset.y}px`
        }}
      >
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block touch-none ${getCursorClass()}`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {/* Floating Text Input Box */}
        {textInputPos && (
          <div 
            className="absolute z-50 pointer-events-auto"
            style={{ 
              left: `${textInputPos.x + panOffset.x}px`, 
              top: `${textInputPos.y + panOffset.y - (brushSize * 2.5 + 24) / 2}px` 
            }}
          >
            <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xl">
              <input
                ref={textInputRef}
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                onKeyDown={handleTextKeyDown}
                onBlur={commitText}
                placeholder="Type and press Enter..."
                className="px-2 py-1 outline-none text-slate-800 text-xs font-bold font-sans rounded border-0 bg-slate-50 w-52"
                style={{ fontSize: `${Math.max(12, brushSize * 1.5 + 8)}px` }}
              />
              <button
                onClick={commitText}
                className="p-1 hover:bg-slate-100 text-emerald-600 rounded cursor-pointer"
              >
                <Check size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Top Floating Info / Close */}
        <div className="absolute top-4 right-6 flex items-center gap-3 pointer-events-auto z-50">
          <div className="px-3.5 py-1.5 bg-slate-900/90 text-white rounded-xl text-[11px] font-bold font-mono tracking-wider shadow-lg flex items-center gap-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            WHITEBOARD MODE
          </div>
          <button
            onClick={onClose}
            className="p-2.5 bg-white hover:bg-slate-50 border border-slate-200 shadow-lg hover:shadow-xl rounded-xl text-slate-500 hover:text-slate-900 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
            title="Exit Whiteboard"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Floating Bottom Drawer Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl rounded-full px-5 py-3 flex flex-row items-center gap-4.5 z-50 pointer-events-auto transition-all">
        
        {/* Tools Group */}
        <div className="flex flex-row items-center gap-1.5">
          <button
            onClick={() => { setTool('pencil'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'pencil' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Pencil Freehand"
          >
            <Edit2 size={16} />
          </button>

          <button
            onClick={() => { setTool('select'); setTextInputPos(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'select' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Select & Move (MousePointer)"
          >
            <MousePointer size={16} />
          </button>

          <button
            onClick={() => { setTool('pan'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'pan' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Pan Hand Tool (Hold Space to Pan)"
          >
            <Hand size={16} />
          </button>
          
          <button
            onClick={() => { setTool('eraser'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'eraser' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Eraser"
          >
            <Eraser size={16} />
          </button>

          <button
            onClick={() => { setTool('line'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'line' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Straight Line"
          >
            <Minus size={16} />
          </button>

          <button
            onClick={() => { setTool('arrow'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'arrow' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Arrow Vector"
          >
            <ArrowUpRight size={16} />
          </button>

          <button
            onClick={() => { setTool('rectangle'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'rectangle' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Rectangle"
          >
            <Square size={16} />
          </button>

          <button
            onClick={() => { setTool('circle'); setTextInputPos(null); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'circle' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Circle"
          >
            <Circle size={16} />
          </button>

          <button
            onClick={() => { setTool('text'); setSelectedElementId(null); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              tool === 'text' 
                ? 'bg-slate-950 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
            title="Text Tool"
          >
            <Type size={16} />
          </button>
        </div>

        {/* Separator */}
        <div className="h-6 w-[1px] border-l border-dashed border-slate-200" />

        {/* Color Picker Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setShowColorPicker(!showColorPicker);
              setShowSizePicker(false);
            }}
            disabled={tool === 'eraser'}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-white relative shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-25"
            style={{ backgroundColor: tool === 'eraser' ? '#cbd5e1' : color }}
            title="Brush Color"
          >
            {tool !== 'eraser' && <Check size={12} className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)] font-black" />}
          </button>

          {/* Color Popover menu */}
          {showColorPicker && (
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-row gap-1.5 p-2 bg-white border border-slate-200/90 shadow-xl rounded-xl z-50">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => {
                    setColor(c.value);
                    setShowColorPicker(false);
                  }}
                  className={`w-6 h-6 rounded-full border transition-all cursor-pointer hover:scale-110 flex items-center justify-center ${
                    color === c.value ? 'border-slate-800 ring-2 ring-slate-100' : 'border-slate-200'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                >
                  {color === c.value && <Check size={10} className="text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-slate-200" />

        {/* Size Selector Slider Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowSizePicker(!showSizePicker);
              setShowColorPicker(false);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-700 transition-all cursor-pointer active:scale-95"
            title="Stroke Size"
          >
            <span>{brushSize}px</span>
            <ChevronDown size={12} className="text-slate-400" />
          </button>

          {/* Size Popover Slider Menu */}
          {showSizePicker && (
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 p-4 bg-white border border-slate-200 shadow-xl rounded-2xl z-50 w-48 pointer-events-auto">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Thickness: {brushSize}px</span>
              <input
                type="range"
                min="1"
                max="40"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              {/* Brush size preview dot */}
              <div className="h-10 w-10 flex items-center justify-center border border-slate-100 rounded-lg bg-slate-50">
                <div 
                  className="rounded-full transition-all"
                  style={{ 
                    width: `${Math.max(1, brushSize)}px`, 
                    height: `${Math.max(1, brushSize)}px`,
                    backgroundColor: tool === 'eraser' ? '#cbd5e1' : color
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="h-6 w-[1px] bg-slate-200" />

        {/* Grid toggle */}
        <button
          onClick={() => {
            setGridType((current) => {
              if (current === 'fine') return 'normal';
              if (current === 'normal') return 'none';
              return 'fine';
            });
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-xs font-bold text-slate-600 transition-all cursor-pointer active:scale-95"
          title="Toggle Grid Type"
        >
          <Grid size={13} className="text-slate-400" />
          <span>Grid</span>
        </button>

        {/* Undo */}
        <button
          onClick={undo}
          disabled={history.length <= 1}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          title="Undo"
        >
          <Undo2 size={15} />
        </button>

        {/* Clear (Red outline circle with trash icon) */}
        <button
          onClick={clearCanvas}
          className="w-8 h-8 rounded-full text-rose-500 hover:bg-rose-50 border border-rose-200 hover:border-rose-300 flex items-center justify-center transition-all cursor-pointer active:scale-95"
          title="Clear Canvas"
        >
          <Trash2 size={15} />
        </button>

      </div>
    </div>
  );
};
