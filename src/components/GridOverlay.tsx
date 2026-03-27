"use client";

/*
  Beveled glass grid — 1:1 large squares with chromatic
  aberration glow on the embossed highlights. Halation effect
  via layered colored glows offset slightly.
*/

export default function GridOverlay({
  color = "rgba(255,255,255,0.025)",
  className = "",
}: {
  color?: string;
  className?: string;
}) {
  const cols = 4;
  const rows = 4;

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

      {/* Beveled cells with chromatic aberration highlights */}
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
            {/* ── Top edge bevel ── */}
            {/* White core highlight */}
            <div
              className="absolute top-0 left-[4px] right-[4px] h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.07) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.07) 75%, transparent 95%)",
              }}
            />
            {/* Red channel — offset up-left (chromatic aberration) */}
            <div
              className="absolute left-[4px] right-[4px] h-[1px]"
              style={{
                top: "-1px",
                background: "linear-gradient(90deg, transparent 10%, rgba(255,100,100,0.04) 30%, rgba(255,120,100,0.06) 50%, rgba(255,100,100,0.04) 70%, transparent 90%)",
                filter: "blur(1px)",
              }}
            />
            {/* Blue channel — offset down-right */}
            <div
              className="absolute left-[4px] right-[4px] h-[1px]"
              style={{
                top: "1px",
                background: "linear-gradient(90deg, transparent 10%, rgba(100,100,255,0.04) 30%, rgba(100,120,255,0.06) 50%, rgba(100,100,255,0.04) 70%, transparent 90%)",
                filter: "blur(1px)",
              }}
            />

            {/* ── Left edge bevel ── */}
            <div
              className="absolute top-[4px] left-0 bottom-[4px] w-[1px]"
              style={{
                background: "linear-gradient(180deg, transparent 5%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.06) 75%, transparent 95%)",
              }}
            />
            {/* Red offset */}
            <div
              className="absolute top-[4px] bottom-[4px] w-[1px]"
              style={{
                left: "-1px",
                background: "linear-gradient(180deg, transparent 10%, rgba(255,100,100,0.035) 30%, rgba(255,120,100,0.05) 50%, rgba(255,100,100,0.035) 70%, transparent 90%)",
                filter: "blur(1px)",
              }}
            />
            {/* Blue offset */}
            <div
              className="absolute top-[4px] bottom-[4px] w-[1px]"
              style={{
                left: "1px",
                background: "linear-gradient(180deg, transparent 10%, rgba(100,100,255,0.035) 30%, rgba(100,120,255,0.05) 50%, rgba(100,100,255,0.035) 70%, transparent 90%)",
                filter: "blur(1px)",
              }}
            />

            {/* ── Bottom edge — softer ── */}
            <div
              className="absolute bottom-0 left-[4px] right-[4px] h-[1px]"
              style={{
                background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 70%, transparent 90%)",
              }}
            />

            {/* ── Right edge — softer ── */}
            <div
              className="absolute top-[4px] right-0 bottom-[4px] w-[1px]"
              style={{
                background: "linear-gradient(180deg, transparent 10%, rgba(255,255,255,0.02) 30%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.02) 70%, transparent 90%)",
              }}
            />

            {/* Corner sheen — top-left with halation glow */}
            <div
              className="absolute top-0 left-0 w-5 h-5"
              style={{
                background: "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.07) 0%, transparent 60%)",
              }}
            />
            <div
              className="absolute -top-[1px] -left-[1px] w-4 h-4"
              style={{
                background: "radial-gradient(circle at 0% 0%, rgba(200,180,255,0.04) 0%, transparent 60%)",
                filter: "blur(2px)",
              }}
            />
          </div>
        );
      })}

      {/* Cross marks at interior intersections */}
      {Array.from({ length: (cols - 1) * (rows - 1) }).map((_, i) => {
        const col = (i % (cols - 1)) + 1;
        const row = Math.floor(i / (cols - 1)) + 1;

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
            <div style={{ width: "6px", height: "1px", background: "rgba(255,255,255,0.05)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
            <div style={{ width: "1px", height: "6px", background: "rgba(255,255,255,0.05)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
          </div>
        );
      })}
    </div>
  );
}
