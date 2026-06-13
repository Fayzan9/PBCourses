import React, { useEffect, useRef, useState } from 'react';

type Pixel = {
  r: number;
  g: number;
  b: number;
  value: number;
  xCoord: number;
  yCoord: number;
};

export const Scene7_ImageSpace: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [hoveredPixel, setHoveredPixel] = useState<Pixel | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const processImage = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      const SIZE = 16;
      canvas.width = SIZE;
      canvas.height = SIZE;

      ctx.drawImage(img, 0, 0, SIZE, SIZE);
      const imageData = ctx.getImageData(0, 0, SIZE, SIZE).data;

      const extracted: Pixel[] = [];
      let idx = 0;
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const r = imageData[idx];
          const g = imageData[idx + 1];
          const b = imageData[idx + 2];
          extracted.push({
            r,
            g,
            b,
            value: Math.round((r + g + b) / 3),
            xCoord: x,
            yCoord: y
          });
          idx += 4;
        }
      }
      setPixels(extracted);
    };

    if (img.complete) {
      processImage();
    } else {
      img.onload = processImage;
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="h-full w-full max-w-7xl mx-auto px-6 py-4 flex flex-col overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <img
        ref={imgRef}
        src="/cat_image.png"
        alt=""
        className="hidden"
        crossOrigin="anonymous"
      />

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-5xl font-black text-slate-800 mb-3">
          Images Are Numbers
        </h2>
        <p className="text-xl text-slate-600">
          What humans see as an image, AI sees as numeric values.
        </p>
      </div>

      {/* Main Visual */}
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Original */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Original Image
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
              <img
                src="/cat_image.png"
                alt="Cat"
                className="w-64 h-64 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Pixelated */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Pixel Grid
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
              <div className="grid grid-cols-16 gap-[1px] w-64 h-64 bg-slate-100">
                {pixels.map((pixel, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredPixel(pixel)}
                    onMouseLeave={() => setHoveredPixel(null)}
                    className="cursor-crosshair transition-transform duration-100 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Numbers */}
          <div className="flex flex-col items-center">
            <div className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
              Stored Values
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">
              <div className="grid grid-cols-16 gap-[1px] w-64 h-64 bg-slate-100">
                {pixels.map((pixel, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredPixel(pixel)}
                    onMouseLeave={() => setHoveredPixel(null)}
                    className="flex items-center justify-center text-[7px] font-black text-white cursor-crosshair transition-transform duration-100 hover:scale-110 hover:shadow-lg"
                    style={{
                      backgroundColor: `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`
                    }}
                  >
                    {pixel.value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cursor Follower Tooltip */}
      {hoveredPixel && (
        <div
          className="fixed pointer-events-none bg-slate-950/95 border border-slate-700/80 rounded-2xl p-4 text-white text-[11px] font-mono font-bold shadow-2xl flex flex-col gap-1.5 z-[9999]"
          style={{
            left: mousePos.x + 16,
            top: mousePos.y + 16,
          }}
        >
          <div className="flex justify-between items-center border-b border-white/10 pb-1 gap-4">
            <span className="text-sky-400 font-extrabold text-xs">Pixel ({hoveredPixel.xCoord}, {hoveredPixel.yCoord})</span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded font-sans">16x16 Grid</span>
          </div>
          <div>Color: <span className="text-slate-300">rgb({hoveredPixel.r}, {hoveredPixel.g}, {hoveredPixel.b})</span></div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span>Sample:</span>
            <div 
              className="w-4 h-4 rounded-md border border-white/20" 
              style={{ backgroundColor: `rgb(${hoveredPixel.r}, ${hoveredPixel.g}, ${hoveredPixel.b})` }} 
            />
          </div>
          <div className="text-emerald-400 mt-1 border-t border-white/5 pt-1">Stored Value (Avg): {hoveredPixel.value}</div>
        </div>
      )}

      {/* Bottom Message */}
      <div className="mt-8 flex items-center justify-center">
        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl px-8 py-5 text-center">
          <div className="font-mono text-3xl font-black text-indigo-700">
            16 × 16 × 3 = 768 values
          </div>
          <div className="text-slate-600 mt-2">
            Every image becomes a single point in a high-dimensional space.
          </div>
        </div>
      </div>
    </div>
  );
};