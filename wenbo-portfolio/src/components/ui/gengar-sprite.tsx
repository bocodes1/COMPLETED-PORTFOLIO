/*
 * Pixel-art Gengar, hand-built as SVG rects (spec §6.4 — replaces the
 * prototype's ASCII placeholder). Rendered as a grayscale "phosphor" sprite
 * so the easter egg stays inside the monotone CRT palette.
 */

const GRID = [
  "..2..................2..",
  "..22................22..",
  "..222.....2..2.....222..",
  "..2222...22..22...2222..",
  "..22222222222222222222..",
  ".2333333333333333333332.",
  ".2333W333333333333W3332.",
  ".23333WW33333333WW33332.",
  ".233333WW333333WW333332.",
  "2233333333333333333333" + "22",
  ".233WWWWWWWWWWWWWWWW332.",
  ".23333W3W3W3W3W3W3W3332.",
  ".2333333333333333333332.",
  ".2333333333333333333332.",
  "..23333333333333333332..",
  "..22333333333333333322..",
  "...222222222222222222...",
  ".....2222......2222.....",
];

const COLORS: Record<string, string> = {
  "2": "#a0a0a2",
  "3": "#5a5a5e",
  W: "#f0f0f0",
};

const CELL = 8;

export function GengarSprite({ className }: { className?: string }) {
  const width = GRID[0].length * CELL;
  const height = GRID.length * CELL;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="A pixel-art Gengar materializes"
      style={{ filter: "drop-shadow(0 0 14px rgba(240,240,240,0.25))" }}
      shapeRendering="crispEdges"
    >
      {GRID.flatMap((row, y) =>
        row.split("").map((ch, x) => {
          const fill = COLORS[ch];
          if (!fill) return null;
          return (
            <rect
              key={`${x}-${y}`}
              x={x * CELL}
              y={y * CELL}
              width={CELL}
              height={CELL}
              fill={fill}
            />
          );
        })
      )}
    </svg>
  );
}
