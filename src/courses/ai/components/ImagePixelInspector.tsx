import React, { useEffect, useRef, useState } from 'react';

interface PixelData {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
}

interface Props {
  image: string;
}

export const ImagePixelInspector: React.FC<Props> = ({ image }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pixel, setPixel] = useState<PixelData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleLoad = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
      setLoaded(true);
    };

    if (img.complete) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }
  }, []);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;

    if (!img || !canvas || !loaded) return;

    const rect = img.getBoundingClientRect();

    const scaleX = img.naturalWidth / rect.width;
    const scaleY = img.naturalHeight / rect.height;

    const x = Math.floor((e.clientX - rect.left) * scaleX);
    const y = Math.floor((e.clientY - rect.top) * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = ctx.getImageData(x, y, 1, 1).data;

    setPixel({
      x,
      y,
      r: data[0],
      g: data[1],
      b: data[2]
    });
  };

  const renderZoomGrid = () => {
    if (!pixel || !canvasRef.current) return null;

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return null;

    const size = 9;
    const radius = Math.floor(size / 2);

    return (
      <div
        className="grid gap-[1px] bg-slate-300 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`
        }}
      >
        {Array.from({ length: size * size }).map((_, i) => {
          const dx = (i % size) - radius;
          const dy = Math.floor(i / size) - radius;

          const px = pixel.x + dx;
          const py = pixel.y + dy;

          let color = 'rgb(0,0,0)';

          try {
            const d = ctx.getImageData(px, py, 1, 1).data;
            color = `rgb(${d[0]},${d[1]},${d[2]})`;
          } catch {}

          const center = dx === 0 && dy === 0;

          return (
            <div
              key={i}
              className={`w-8 h-8 ${
                center ? 'ring-4 ring-white z-10' : ''
              }`}
              style={{
                backgroundColor: color
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 items-center justify-center">
      {/* Hidden canvas used for reading pixels */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Image */}
      <div
        className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white"
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imgRef}
          src={image}
          alt="Inspectable"
          className="max-h-[500px] max-w-full object-contain select-none"
          draggable={false}
          crossOrigin="anonymous"
        />

        {pixel && (
          <div
            className="absolute pointer-events-none border-2 border-white shadow-lg"
            style={{
              width: 12,
              height: 12,
              left: `${(pixel.x / imgRef.current!.naturalWidth) * 100}%`,
              top: `${(pixel.y / imgRef.current!.naturalHeight) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </div>

      {/* Inspector */}
      <div className="flex flex-col gap-4 w-[320px]">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h3 className="font-black text-slate-800 mb-3">
            Pixel Inspector
          </h3>

          {pixel ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-16 h-16 rounded-xl border border-slate-200"
                  style={{
                    backgroundColor: `rgb(${pixel.r},${pixel.g},${pixel.b})`
                  }}
                />

                <div className="font-mono text-sm">
                  <div>X: {pixel.x}</div>
                  <div>Y: {pixel.y}</div>
                </div>
              </div>

              <div className="font-mono text-sm space-y-1">
                <div>R: {pixel.r}</div>
                <div>G: {pixel.g}</div>
                <div>B: {pixel.b}</div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 p-3 font-mono text-xs break-all">
                [{pixel.r}, {pixel.g}, {pixel.b}]
              </div>
            </>
          ) : (
            <div className="text-slate-500 text-sm">
              Move your mouse over the image
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <h3 className="font-black text-slate-800 mb-3">
            Zoomed Pixels
          </h3>

          {renderZoomGrid()}
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
          <div className="text-xs uppercase tracking-wider font-bold text-indigo-600 mb-2">
            AI View
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            AI does not see objects. It sees millions of RGB values like:
          </p>

          <div className="font-mono text-xs mt-3 break-all text-indigo-800">
            [234,181,92,241,190,95,225,172,88,...]
          </div>
        </div>
      </div>
    </div>
  );
};