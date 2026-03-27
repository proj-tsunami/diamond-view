"use client";

/*
  Thin sketch-line grid — 1:1 square cells.
  Clean single-weight lines with small cross marks at intersections.
  No emboss/bevel — just pure minimal line work.
*/

export default function GridOverlay({
  color = "rgba(255,255,255,0.035)",
  crossColor = "rgba(255,255,255,0.05)",
  className = "",
}: {
  color?: string;
  crossColor?: string;
  className?: string;
}) {
  const cols = 4;
  const rows = 4;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Grid lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent),
          repeating-linear-gradient(0deg, ${color} 0px, ${color} 1px, transparent 1px, transparent)
        `,
        backgroundSize: `${100 / cols}% ${100 / rows}%`,
      }} />

      {/* Cross marks at interior intersections */}
      {Array.from({ length: (cols - 1) * (rows - 1) }).map((_, i) => {
        const col = (i % (cols - 1)) + 1;
        const row = Math.floor(i / (cols - 1)) + 1;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(col / cols) * 100}%`,
              top: `${(row / rows) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div style={{ width: "8px", height: "1px", background: crossColor, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
            <div style={{ width: "1px", height: "8px", background: crossColor, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          </div>
        );
      })}
    </div>
  );
}
