"use client";

import { useRef, useEffect } from "react";
import { useSectionTheme } from "@/hooks/useSectionTheme";

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
  const isDark = useSectionTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${scrollY * -0.18}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${scrollY * -0.12}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intensified colors — much more visible now
  const lineColor = isDark ? "rgba(244,243,241,0.1)" : "rgba(24,25,25,0.1)";
  const tickColor = isDark ? "rgba(244,243,241,0.1)" : "rgba(24,25,25,0.1)";
  const textBright = isDark ? "rgba(244,243,241,0.2)" : "rgba(24,25,25,0.22)";
  const textMid = isDark ? "rgba(244,243,241,0.1)" : "rgba(24,25,25,0.12)";
  const dashColor = isDark ? "rgba(244,243,241,0.06)" : "rgba(24,25,25,0.07)";

  return (
    <>
      {/* Left margin */}
      <div className="fixed top-0 left-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block">
        <div
          className="absolute top-0 right-0 w-[1px] h-full transition-colors duration-500"
          style={{ background: lineColor }}
        />

        <div ref={leftRef} className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform">
          <div className="flex flex-col items-center gap-20 py-16">
            {leftLabels.map((label, i) => (
              <span
                key={i}
                className="whitespace-nowrap transition-colors duration-500"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  color: label === "—" ? dashColor : (i % 3 === 0 ? textBright : textMid),
                  fontSize: label === "—" ? "7px" : "9px",
                  letterSpacing: label === "—" ? "0.5em" : "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {[5, 12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92].map((pos) => (
          <div key={pos} className="absolute right-0" style={{ top: `${pos}%` }}>
            <div
              className="w-3 h-[1px] transition-colors duration-500"
              style={{ background: tickColor }}
            />
          </div>
        ))}
      </div>

      {/* Right margin */}
      <div className="fixed top-0 right-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block">
        <div
          className="absolute top-0 left-0 w-[1px] h-full transition-colors duration-500"
          style={{ background: lineColor }}
        />

        <div ref={rightRef} className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform">
          <div className="flex flex-col items-center gap-18 py-24">
            {rightLabels.map((label, i) => (
              <span
                key={i}
                className="whitespace-nowrap transition-colors duration-500"
                style={{
                  writingMode: "vertical-rl",
                  color: label === "—" ? dashColor : (i % 3 === 0 ? textBright : textMid),
                  fontSize: label === "—" ? "7px" : "9px",
                  letterSpacing: label === "—" ? "0.5em" : "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {[8, 16, 24, 32, 42, 52, 62, 72, 80, 88].map((pos) => (
          <div key={pos} className="absolute left-0" style={{ top: `${pos}%` }}>
            <div
              className="w-3 h-[1px] transition-colors duration-500"
              style={{ background: tickColor }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
