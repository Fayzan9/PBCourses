import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface VisualPoint {
  id: string;
  label: string;
  coords: number[]; // [x, y] mapped to space
  color: string;
  details?: string;
  icon?: React.ReactNode;
}

export interface CustomLine {
  from: number[]; // [x, y]
  to: number[];   // [x, y]
  color: string;
  dashed?: boolean;
}

interface VisualizationSpaceProps {
  points: VisualPoint[];
  dimensions: string[]; // ["X Axis", "Y Axis"]
  ranges?: [number, number][]; // [[xMin, xMax], [yMin, yMax]]
  showVectors?: boolean;
  activePointId?: string | null;
  onPointHover?: (id: string | null) => void;
  customLines?: CustomLine[];
  showGrid?: boolean;
  highlightConnections?: boolean;
  draggablePointId?: string | null; // Id of point that can be dragged
  onDragPoint?: (coords: number[]) => void; // Callback when point is dragged
  className?: string;
}

export const VisualizationSpace: React.FC<VisualizationSpaceProps> = ({
  points,
  dimensions,
  ranges = [[0, 100], [0, 100]],
  showVectors = false,
  activePointId = null,
  onPointHover,
  customLines = [],
  showGrid = true,
  highlightConnections = false,
  draggablePointId = null,
  onDragPoint,
  className = '',
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<VisualPoint | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // SVG Dimension Definitions
  const width = 900;
  const height = 620;
  // Asymmetric padding: extra right for point labels, extra bottom for x-axis label
  const padL = 80;
  const padR = 40;
  const padT = 52;
  const padB = 72;

  const xMin = ranges[0][0];
  const xMax = ranges[0][1];
  const yMin = ranges[1][0];
  const yMax = ranges[1][1];

  // Helper functions to map mathematical coordinates to SVG pixel values
  const scaleX = (val: number) => {
    const pct = (val - xMin) / (xMax - xMin);
    return padL + pct * (width - padL - padR);
  };

  const scaleY = (val: number) => {
    const pct = (val - yMin) / (yMax - yMin);
    return height - padB - pct * (height - padT - padB);
  };

  // Helper functions to map SVG pixel values back to mathematical coordinates
  const invertX = (pixelX: number) => {
    const pct = (pixelX - padL) / (width - padL - padR);
    const clampedPct = Math.max(0, Math.min(1, pct));
    return xMin + clampedPct * (xMax - xMin);
  };

  const invertY = (pixelY: number) => {
    const pct = (height - padB - pixelY) / (height - padT - padB);
    const clampedPct = Math.max(0, Math.min(1, pct));
    return yMin + clampedPct * (yMax - yMin);
  };

  // Determine positions for rendering the axes (ensuring they always show in-bounds)
  const axisX_Val = (yMin <= 0 && yMax >= 0) ? 0 : yMin;
  const axisY_Val = (xMin <= 0 && xMax >= 0) ? 0 : xMin;

  const axisY_Pixel = scaleX(axisY_Val);
  const axisX_Pixel = scaleY(axisX_Val);

  // Generate grid values
  const xGridValues = Array.from({ length: 6 }, (_, i) => xMin + (i * (xMax - xMin)) / 5);
  const yGridValues = Array.from({ length: 6 }, (_, i) => yMin + (i * (yMax - yMin)) / 5);

  const handleMouseEnter = (p: VisualPoint) => {
    if (isDragging) return;
    setHoveredPoint(p);
    if (onPointHover) onPointHover(p.id);
  };

  const handleMouseLeave = () => {
    if (isDragging) return;
    setHoveredPoint(null);
    if (onPointHover) onPointHover(null);
  };

  // Drag Gesture Listeners
  const processDrag = (clientX: number, clientY: number, svgEl: SVGSVGElement) => {
    if (!onDragPoint || !draggablePointId) return;
    const rect = svgEl.getBoundingClientRect();
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    const svgX = (relativeX / rect.width) * width;
    const svgY = (relativeY / rect.height) * height;

    const mathX = invertX(svgX);
    const mathY = invertY(svgY);

    onDragPoint([mathX, mathY]);
  };

  const handleMouseDownOnPoint = (e: React.MouseEvent, pointId: string) => {
    if (pointId !== draggablePointId) return;
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStartOnPoint = (_e: React.TouchEvent, pointId: string) => {
    if (pointId !== draggablePointId) return;
    setIsDragging(true);
  };

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    processDrag(e.clientX, e.clientY, e.currentTarget);
  };

  const handleSvgTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    processDrag(touch.clientX, touch.clientY, e.currentTarget);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className={`flex flex-col w-full h-full bg-white/70 rounded-2xl border border-slate-200/80 shadow-md backdrop-blur-xl overflow-hidden ${className}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full flex-1 min-h-0 select-none"
        onMouseMove={handleSvgMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchMove={handleSvgTouchMove}
        onTouchEnd={handleDragEnd}
      >
        {/* Definition for Grid Markers and Gradients */}
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284C7" />
          </marker>
          <radialGradient id="originGlow" r="60%">
            <stop offset="0%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow at Origin */}
        <circle cx={scaleX(0)} cy={scaleY(0)} r="120" fill="url(#originGlow)" />

        {/* Grid Lines (Light contrast) */}
        {showGrid && (
          <g stroke="rgba(100, 116, 139, 0.08)" strokeWidth="1">
            {xGridValues.map((val, i) => (
              <line
                key={`grid-x-${i}`}
                x1={scaleX(val)}
                y1={padT}
                x2={scaleX(val)}
                y2={height - padB}
              />
            ))}
            {yGridValues.map((val, i) => (
              <line
                key={`grid-y-${i}`}
                x1={padL}
                y1={scaleY(val)}
                x2={width - padR}
                y2={scaleY(val)}
              />
            ))}
          </g>
        )}

        {/* Axes Lines */}
        <g stroke="rgba(71, 85, 105, 0.35)" strokeWidth="2">
          {/* X Axis */}
          <line
            x1={padL - 10}
            y1={axisX_Pixel}
            x2={width - padR + 10}
            y2={axisX_Pixel}
          />
          {/* Y Axis */}
          <line
            x1={axisY_Pixel}
            y1={padT - 10}
            x2={axisY_Pixel}
            y2={height - padB + 10}
          />
        </g>

        {/* Axis Ticks */}
        <g fill="rgba(71, 85, 105, 0.7)" fontSize="20" fontFamily="sans-serif">
          {xGridValues.map((val, i) => (
            <g key={`tick-x-${i}`}>
              <line
                x1={scaleX(val)}
                y1={axisX_Pixel - 4}
                x2={scaleX(val)}
                y2={axisX_Pixel + 4}
                stroke="rgba(71, 85, 105, 0.4)"
                strokeWidth="1.5"
              />
              <text
                x={scaleX(val)}
                y={axisX_Pixel + 20}
                textAnchor="middle"
                className="font-mono font-bold text-slate-500"
              >
                {val}
              </text>
            </g>
          ))}
          {/* Y Ticks */}
          {yGridValues.map((val, i) => {
            return (
              <g key={`tick-y-${i}`}>
                <line
                  x1={axisY_Pixel - 4}
                  y1={scaleY(val)}
                  x2={axisY_Pixel + 4}
                  y2={scaleY(val)}
                  stroke="rgba(71, 85, 105, 0.4)"
                  strokeWidth="1.5"
                />
                <text
                  x={axisY_Pixel - 10}
                  y={scaleY(val) + 3.5}
                  textAnchor="end"
                  className="font-mono font-bold text-slate-500"
                >
                  {val}
                </text>
              </g>
            );
          })}
        </g>

        {/* Axis Labels */}
        <text
          x={(padL + width - padR) / 2}
          y={height - 8}
          textAnchor="middle"
          fill="#475569"
          fontSize="22"
          fontWeight="800"
          letterSpacing="0.05em"
          className="uppercase tracking-wider"
        >
          {dimensions[0]} →
        </text>
        <text
          x={axisY_Pixel + 8}
          y={padT - 16}
          textAnchor="start"
          fill="#475569"
          fontSize="22"
          fontWeight="800"
          letterSpacing="0.05em"
          className="uppercase tracking-wider"
        >
          {dimensions[1]} ↑
        </text>

        {/* Custom Lines */}
        {customLines.map((line, idx) => (
          <line
            key={`custom-line-${idx}`}
            x1={scaleX(line.from[0])}
            y1={scaleY(line.from[1])}
            x2={scaleX(line.to[0])}
            y2={scaleY(line.to[1])}
            stroke={line.color}
            strokeWidth="2.5"
            strokeDasharray={line.dashed ? "4 4" : undefined}
          />
        ))}

        {/* Similarities connections */}
        {highlightConnections && points.length > 1 && (
          <g stroke="rgba(217, 119, 6, 0.2)" strokeWidth="2.5">
            {points.map((p1, idx) =>
              points.slice(idx + 1).map((p2) => {
                // Calculate distance
                const dx = p1.coords[0] - p2.coords[0];
                const dy = p1.coords[1] - p2.coords[1];
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = (xMax - xMin) * 0.28; // cluster thresholds
                if (dist < maxDist) {
                  return (
                    <line
                      key={`conn-${p1.id}-${p2.id}`}
                      x1={scaleX(p1.coords[0])}
                      y1={scaleY(p1.coords[1])}
                      x2={scaleX(p2.coords[0])}
                      y2={scaleY(p2.coords[1])}
                    />
                  );
                }
                return null;
              })
            )}
          </g>
        )}

        {/* Vectors (from Origin to Point) */}
        {showVectors &&
          points.map((p) => {
            const isHovered = hoveredPoint?.id === p.id || activePointId === p.id;
            return (
              <motion.line
                key={`vector-${p.id}`}
                x1={scaleX(0)}
                y1={scaleY(0)}
                x2={scaleX(p.coords[0])}
                y2={scaleY(p.coords[1])}
                stroke={p.color}
                strokeWidth={isHovered ? 3.5 : 2.5}
                strokeOpacity={isHovered ? 0.95 : 0.6}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
              />
            );
          })}

        {/* Render Point coordinate drops to axes */}
        {hoveredPoint && (
          <g stroke={hoveredPoint.color} strokeWidth="1.2" strokeDasharray="3 3" strokeOpacity="0.7">
            {/* X Drop line */}
            <line
              x1={scaleX(hoveredPoint.coords[0])}
              y1={scaleY(hoveredPoint.coords[1])}
              x2={scaleX(hoveredPoint.coords[0])}
              y2={axisX_Pixel}
            />
            {/* Y Drop line */}
            <line
              x1={scaleX(hoveredPoint.coords[0])}
              y1={scaleY(hoveredPoint.coords[1])}
              x2={axisY_Pixel}
              y2={scaleY(hoveredPoint.coords[1])}
            />
          </g>
        )}

        {/* Plot Coordinates Points */}
        {points.map((p) => {
          const isHovered = hoveredPoint?.id === p.id || activePointId === p.id || (isDragging && p.id === draggablePointId);
          const isDraggable = p.id === draggablePointId;
          const pointX = scaleX(p.coords[0]);
          const pointY = scaleY(p.coords[1]);

          return (
            <g
              key={p.id}
              className={`${isDraggable ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-pointer'}`}
              onMouseEnter={() => handleMouseEnter(p)}
              onMouseLeave={handleMouseLeave}
              onMouseDown={(e) => handleMouseDownOnPoint(e, p.id)}
              onTouchStart={(e) => handleTouchStartOnPoint(e, p.id)}
            >
              {/* Ripple Ring Effect on Active/Hovered points */}
              {isHovered && (
                <motion.circle
                  cx={pointX}
                  cy={pointY}
                  r="18"
                  fill="none"
                  stroke={p.color}
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  animate={{ r: [12, 24, 12], opacity: [0.7, 0.1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
              )}

              {/* Point Circle */}
              <motion.circle
                cx={pointX}
                cy={pointY}
                r={isHovered ? 10 : 7}
                fill={p.color}
                stroke={isDraggable ? '#0F172A' : '#F8FAFC'}
                strokeWidth={isHovered ? 2.5 : 1.5}
                animate={{ cx: pointX, cy: pointY }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />

              {/* Label near Point */}
              <text
                x={pointX + 16}
                y={pointY - 16}
                fill={isHovered ? '#0F172A' : '#475569'}
                fontSize="20"
                fontWeight={isHovered ? '700' : '500'}
                className="font-medium"
              >
                {p.label} <tspan fill={p.color} fontWeight="bold" fontSize="17">[{p.coords[0].toFixed(1)}, {p.coords[1].toFixed(1)}]</tspan>
              </text>
            </g>
          );
        })}
      </svg>

      {/* Details bar below the SVG — never overlaps the graph */}
      <div className="h-12 shrink-0 px-4 border-t border-slate-100">
        <AnimatePresence mode="wait">
          {hoveredPoint ? (
            <motion.div
              key={hoveredPoint.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between h-full pointer-events-none"
            >
              <span className="font-bold text-slate-800 flex items-center gap-1.5 text-sm">
                {hoveredPoint.icon && <span className="text-slate-500">{hoveredPoint.icon}</span>}
                {hoveredPoint.label}
                {hoveredPoint.details && (
                  <span className="text-xs text-slate-400 font-normal ml-1">{hoveredPoint.details}</span>
                )}
              </span>
              <span className="font-mono text-xs text-vector bg-vector/10 border border-vector/20 px-2 py-0.5 rounded font-bold">
                [{hoveredPoint.coords[0].toFixed(1)}, {hoveredPoint.coords[1].toFixed(1)}]
              </span>
            </motion.div>
          ) : (
            <motion.p
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-slate-300 font-mono h-full flex items-center"
            >
              hover a point
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
