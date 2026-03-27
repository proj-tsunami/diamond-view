"use client";

/*
  Beveled glass grid overlay — 1:2 ratio cells with subtle
  embossed highlight effect. Top-left edges catch light,
  bottom-right edges are softer shadow. Like frosted glass panels.
*/

export default function GridOverlay({
  color = "rgba(255,255,255,0.03)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  // 1:2 ratio grid — 6 columns, 3 rows (each cell is wider than tall)
  const cols = 6;
  const rows = 3;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Base grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent),
          repeating-linear-gradient(0deg, ${color} 0px, ${color} 1px, transparent 1px, transparent)
        `,
        backgroundSize: `${100 / cols}% ${100 / rows}%`,
      }} />

      {/* Beveled glass cells — each cell has an embossed highlight */}
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
              width: `${100 / cols}%`,
              height: `${100 / rows}%`,
            }}
          >
            {/* Top edge — bright highlight (light catching top bevel) */}
            <div
              className="absolute top-0 left-[2px] right-[2px] h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.06) 70%, transparent 95%)",
              }}
            />

            {/* Left edge — medium highlight */}
            <div
              className="absolute top-[2px] left-0 bottom-[2px] w-[1px]"
              style={{
                background: "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0.05) 70%, transparent 95%)",
              }}
            />

            {/* Bottom edge — subtle shadow (receding bevel) */}
            <div
              className="absolute bottom-0 left-[2px] right-[2px] h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 70%, transparent 95%)",
              }}
            />

            {/* Right edge — subtle shadow */}
            <div
              className="absolute top-[2px] right-0 bottom-[2px] w-[1px]"
              style={{
                background: "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 70%, transparent 95%)",
              }}
            />

            {/* Corner sheen — top-left brightest */}
            <div
              className="absolute top-0 left-0 w-3 h-3"
              style={{
                background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Corner sheen — top-right */}
            <div
              className="absolute top-0 right-0 w-2 h-2"
              style={{
                background: "radial-gradient(circle at 100% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
              }}
            />
          </div>
        );
      })}

      {/* Cross marks at intersections */}
      {Array.from({ length: (cols + 1) * (rows + 1) }).map((_, i) => {
        const col = i % (cols + 1);
        const row = Math.floor(i / (cols + 1));

        // Skip edge crosses
        if (col === 0 || col === cols || row === 0 || row === rows) return null;

        return (
          <div
            key={`cross-${i}`}
            className="absolute"
            style={{
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "6px", height: "1px", background: "rgba(255,255,255,0.06)" }}
            />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ width: "1px", height: "6px", background: "rgba(255,255,255,0.06)" }}
            />
          </div>
        );
      })}
    </div>
  );
}
