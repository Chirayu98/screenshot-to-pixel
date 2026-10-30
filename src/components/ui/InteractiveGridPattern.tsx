import { useState, useCallback, useId } from "react";

interface InteractiveGridPatternProps {
  width?: number;
  height?: number;
  squares?: [number, number];
  className?: string;
  squaresClassName?: string;
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = "",
  squaresClassName = "",
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const patternId = useId();

  const totalWidth = width * horizontal;
  const totalHeight = height * vertical;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Map client coords to SVG viewBox coords
      const scaleX = totalWidth / rect.width;
      const scaleY = totalHeight / rect.height;

      const svgX = x * scaleX;
      const svgY = y * scaleY;

      const col = Math.floor(svgX / width);
      const row = Math.floor(svgY / height);

      if (col >= 0 && col < horizontal && row >= 0 && row < vertical) {
        setHoveredSquare(row * horizontal + col);
      }
    },
    [width, height, horizontal, vertical, totalWidth, totalHeight]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredSquare(null);
  }, []);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${totalHeight}`}
      className={`pointer-events-auto absolute ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={0}
          y={0}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-white/[0.08]"
          />
        </pattern>
      </defs>

      {/* Grid Lines Pattern */}
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />

      {/* Interactive Hovered Squares */}
      <g>
        {Array.from({ length: horizontal * vertical }).map((_, index) => {
          const col = index % horizontal;
          const row = Math.floor(index / horizontal);
          const isHovered = hoveredSquare === index;

          return (
            <rect
              key={index}
              x={col * width + 1}
              y={row * height + 1}
              width={width - 1}
              height={height - 1}
              className={`transition-all duration-300 ${
                isHovered
                  ? "fill-primary/40 stroke-primary/60"
                  : "fill-transparent stroke-transparent hover:fill-primary/20"
              } ${squaresClassName}`}
            />
          );
        })}
      </g>
    </svg>
  );
}

