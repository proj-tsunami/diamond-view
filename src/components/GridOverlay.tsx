"use client";

/*
  Thin geometric grid overlay inspired by Terminal Industries.
  Subtle cross marks at intersections, thin lines forming a structural grid.
  Barely visible — sits as a texture layer over sections.
*/

export default function GridOverlay({
  color = "rgba(255,255,255,0.04)",
  crossColor = "rgba(255,255,255,0.06)",
  className = "",
}: {
  color?: string;
  crossColor?: string;
  className?: string;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Vertical lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 1px, transparent 1px, transparent)`,
        backgroundSize: "20% 100%",
      }} />

      {/* Horizontal lines */}
      <div className="absolute inset-0" style={{
        backgroundImage: `repeating-linear-gradient(0deg, ${color} 0px, ${color} 1px, transparent 1px, transparent)`,
        backgroundSize: "100% 25%",
      }} />

      {/* Cross marks at intersections */}
      {[0, 20, 40, 60, 80, 100].map((x) =>
        [0, 25, 50, 75, 100].map((y) => (
          <div
            key={`${x}-${y}`}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Horizontal tick */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "8px",
                height: "1px",
                background: crossColor,
              }}
            />
            {/* Vertical tick */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "1px",
                height: "8px",
                background: crossColor,
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}
