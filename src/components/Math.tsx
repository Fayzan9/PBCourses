import React, { useEffect, useRef } from 'react';
import katex from 'katex';

interface MathProps {
  tex: string;
  block?: boolean;
  className?: string;
}

export const Math: React.FC<MathProps> = ({ tex, block = false, className = '' }) => {
  const containerRef = useRef<HTMLSpanElement | HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(tex, containerRef.current, {
          displayMode: block,
          throwOnError: false,
        });
      } catch (error) {
        console.error('KaTeX rendering error:', error);
      }
    }
  }, [tex, block]);

  if (block) {
    return <div ref={containerRef as React.RefObject<HTMLDivElement>} className={`my-4 ${className}`} />;
  }
  return <span ref={containerRef as React.RefObject<HTMLSpanElement>} className={`inline-block ${className}`} />;
};

export default Math;
