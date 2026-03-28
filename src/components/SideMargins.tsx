"use client";

import { useRef, useEffect, useState } from "react";

/*
  Margin metadata — rotated text labels and thin vector lines
  along left and right edges. Inverts on light sections.
  Intensified opacity and added more content.
*/

const leftLabels = [
  "DV.2026",
  "—",
  "34.0522° N",
  "118.2437° W",
  "—",
  "CREATIVE PRODUCTION",
  "FEELING IN MOTION",
  "—",
  "DV.STUDIO",
  "EST. 2024",
  "—",
  "ORIGINAL CREATIVE",
  "DIAMOND VIEW",
  "—",
  "STORY-FIRST",
  "CRAFT + TECHNOLOGY",
];

const rightLabels = [
  "001 — CREATIVE",
  "—",
  "002 — PRODUCTION",
  "—",
  "003 — VFX + POST",
  "—",
  "004 — VIRTUAL PROD.",
  "—",
  "005 — AI WORKFLOWS",
  "—",
  "006 — VISUALIZATION",
  "—",
  "DIAMOND VIEW",
  "—",
  "ORLANDO, FL",
  "—",
];

export default function SideMargins() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${scrollY * -0.18}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${scrollY * -0.12}px)`;
      }

      const heroEnd = vh * 1.5;
      setIsDark(scrollY < heroEnd);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lineColor = isDark ? "rgba(244,243,241,0.06)" : "rgba(24,25,25,0.08)";
  const tickColor = isDark ? "rgba(244,243,241,0.06)" : "rgba(24,25,25,0.08)";
  const textBright = isDark ? "rgba(244,243,241,0.12)" : "rgba(24,25,25,0.14)";
  const textDim = isDark ? "rgba(244,243,241,0.05)" : "rgba(24,25,25,0.06)";
  const dashColor = isDark ? "rgba(244,243,241,0.04)" : "rgba(24,25,25,0.05)";

  return (
    <>
      {/* Left margin */}
      <div className="fixed top-0 left-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block">
        <div className="absolute top-0 right-0 w-[1px] h-full transition-colors duration-700" style={{ background: lineColor }} />

        <div ref={leftRef} className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform">
          <div className="flex flex-col items-center gap-20 py-16">
            {leftLabels.map((label, i) => (
              <span
                key={i}
                className="text-[9px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-700"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  color: label === "—" ? dashColor : (i % 4 === 0 ? textBright : textDim),
                  fontSize: label === "—" ? "7px" : "9px",
                  letterSpacing: label === "—" ? "0.5em" : "0.2em",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Tick marks — more frequent */}
        {[5, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92].map((pos) => (
          <div key={pos} className="absolute right-0 transition-colors duration-700" style={{ top: `${pos}%` }}>
            <div className="w-3 h-[1px] transition-colors duration-700" style={{ background: tickColor }} />
          </div>
        ))}
      </div>

      {/* Right margin */}
      <div className="fixed top-0 right-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block">
        <div className="absolute top-0 left-0 w-[1px] h-full transition-colors duration-700" style={{ background: lineColor }} />

        <div ref={rightRef} className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform">
          <div className="flex flex-col items-center gap-18 py-24">
            {rightLabels.map((label, i) => (
              <span
                key={i}
                className="text-[9px] tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-700"
                style={{
                  writingMode: "vertical-rl",
                  color: label === "—" ? dashColor : (i % 4 === 0 ? textBright : textDim),
                  fontSize: label === "—" ? "7px" : "9px",
                  letterSpacing: label === "—" ? "0.5em" : "0.2em",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Tick marks */}
        {[8, 16, 24, 32, 42, 52, 62, 72, 80, 88].map((pos) => (
          <div key={pos} className="absolute left-0 transition-colors duration-700" style={{ top: `${pos}%` }}>
            <div className="w-3 h-[1px] transition-colors duration-700" style={{ background: tickColor }} />
          </div>
        ))}
      </div>
    </>
  );
}
