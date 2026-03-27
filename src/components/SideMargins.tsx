"use client";

import { useRef, useEffect, useState } from "react";

/*
  Margin metadata — rotated text labels and thin vector lines
  along left and right edges. Inverts color based on scroll position
  to work on both dark and light sections.
*/

const leftLabels = [
  "DV.2026",
  "— 34.0522° N",
  "CREATIVE PRODUCTION",
  "118.2437° W",
  "FEELING IN MOTION",
  "DV.STUDIO",
  "EST. 2024",
  "— ORIGINAL CREATIVE",
  "DIAMOND VIEW",
  "34.0522° N",
];

const rightLabels = [
  "001",
  "PRODUCTION",
  "VFX",
  "VIRTUAL PROD.",
  "AI WORKFLOWS",
  "002",
  "VISUALIZATION",
  "CREATIVE DEV",
  "POST",
  "003",
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
        leftRef.current.style.transform = `translateY(${scrollY * -0.15}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${scrollY * -0.1}px)`;
      }

      // Check if we're over a dark or light section
      // Hero + demo reel are roughly first 150vh, then cream sections
      const heroEnd = vh * 1.5;
      setIsDark(scrollY < heroEnd);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const lineColor = isDark ? "rgba(244,243,241,0.04)" : "rgba(24,25,25,0.06)";
  const tickColor = isDark ? "rgba(244,243,241,0.04)" : "rgba(24,25,25,0.06)";
  const textBright = isDark ? "rgba(244,243,241,0.08)" : "rgba(24,25,25,0.1)";
  const textDim = isDark ? "rgba(244,243,241,0.04)" : "rgba(24,25,25,0.05)";

  return (
    <>
      {/* Left margin */}
      <div className="fixed top-0 left-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block transition-colors duration-700">
        <div className="absolute top-0 right-0 w-[1px] h-full transition-colors duration-700" style={{ background: lineColor }} />

        <div ref={leftRef} className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform">
          <div className="flex flex-col items-center gap-32 py-20">
            {leftLabels.map((label, i) => (
              <span
                key={i}
                className="text-[9px] tracking-[0.25em] uppercase whitespace-nowrap transition-colors duration-700"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  color: i % 3 === 0 ? textBright : textDim,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {[10, 25, 40, 55, 70, 85].map((pos) => (
          <div key={pos} className="absolute right-0 transition-colors duration-700" style={{ top: `${pos}%` }}>
            <div className="w-2 h-[1px] transition-colors duration-700" style={{ background: tickColor }} />
          </div>
        ))}
      </div>

      {/* Right margin */}
      <div className="fixed top-0 right-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block transition-colors duration-700">
        <div className="absolute top-0 left-0 w-[1px] h-full transition-colors duration-700" style={{ background: lineColor }} />

        <div ref={rightRef} className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform">
          <div className="flex flex-col items-center gap-28 py-32">
            {rightLabels.map((label, i) => (
              <span
                key={i}
                className="text-[9px] tracking-[0.25em] uppercase whitespace-nowrap transition-colors duration-700"
                style={{
                  writingMode: "vertical-rl",
                  color: i % 4 === 0 ? textBright : textDim,
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {[15, 30, 50, 65, 80].map((pos) => (
          <div key={pos} className="absolute left-0 transition-colors duration-700" style={{ top: `${pos}%` }}>
            <div className="w-2 h-[1px] transition-colors duration-700" style={{ background: tickColor }} />
          </div>
        ))}
      </div>
    </>
  );
}
