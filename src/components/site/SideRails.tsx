"use client";

/* Side rails — blend of the prototype's film-gate rail (line + ticks + scroll
   progress dot/percent) and the prior site's parallax vertical text rulers
   (coordinates, disciplines, brand lines). */

import { useEffect, useState, type CSSProperties } from "react";

const LEFT_LABELS = [
  "DV.2026", "—", "27.9506° N", "82.4572° W", "—",
  "CREATIVE PRODUCTION", "FEELING IN MOTION", "—",
  "DV.STUDIO", "EST. 2010", "—",
  "ORIGINAL CREATIVE", "DIAMOND VIEW", "—",
  "STORY-FIRST", "CRAFT + TECHNOLOGY",
];

const RIGHT_LABELS = [
  "001 — CREATIVE", "—", "002 — PRODUCTION", "—", "003 — VFX + POST", "—",
  "004 — VIRTUAL PROD.", "—", "005 — AI WORKFLOWS", "—", "006 — VISUALIZATION", "—",
  "DIAMOND VIEW", "—", "TAMPA, FL", "—",
];

function labelStyle(lbl: string, i: number): CSSProperties {
  const dash = lbl === "—";
  return {
    writingMode: "vertical-rl",
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    fontFamily: "var(--font-owners-wide)",
    fontWeight: 500,
    fontSize: dash ? 7 : 9,
    letterSpacing: dash ? "0.5em" : "0.2em",
    color: dash ? "var(--av-06)" : i % 3 === 0 ? "var(--av-24)" : "var(--av-10)",
  };
}

export default function SideRails({ on = true }: { on?: boolean }) {
  const [pct, setPct] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      setY(window.scrollY);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  if (!on) return null;

  const ticks = Array.from({ length: 17 });
  const dotTop = "calc(120px + " + pct * 100 + "% - " + pct * 180 + "px)";

  const track: CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    willChange: "transform",
  };

  return (
    <>
      <div className="rail rail--l" aria-hidden="true">
        <span className="rail__line" />
        <span className="rail__ticks">
          {ticks.map((_, i) => (
            <span key={i} className={"rail__tick" + (i % 4 === 0 ? " rail__tick--lg" : "")} />
          ))}
        </span>
        {/* parallax vertical text ruler (blended from prior version) */}
        <div style={{ ...track, gap: 64, paddingTop: 64, transform: `translate(calc(-50% - 5px), ${y * -0.18}px)` }}>
          {LEFT_LABELS.map((lbl, i) => (
            <span key={i} style={{ ...labelStyle(lbl, i), transform: "rotate(180deg)" }}>{lbl}</span>
          ))}
        </div>
        <span className="rail__dot" style={{ top: dotTop }} />
      </div>

      <div className="rail rail--r" aria-hidden="true">
        <span className="rail__line" />
        <span className="rail__ticks">
          {ticks.map((_, i) => (
            <span key={i} className={"rail__tick" + (i % 4 === 0 ? " rail__tick--lg" : "")} />
          ))}
        </span>
        <div style={{ ...track, gap: 56, paddingTop: 96, transform: `translate(calc(-50% + 5px), ${y * -0.12}px)` }}>
          {RIGHT_LABELS.map((lbl, i) => (
            <span key={i} style={labelStyle(lbl, i)}>{lbl}</span>
          ))}
        </div>
        <span className="rail__dot" style={{ top: dotTop }} />
        <span className="rail__pct">{String(Math.round(pct * 100)).padStart(2, "0")} / 100</span>
      </div>
    </>
  );
}
