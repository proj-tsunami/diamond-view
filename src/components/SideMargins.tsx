"use client";

import { useRef, useEffect } from "react";

/*
  Margin metadata — rotated text labels and thin vector lines
  running along the left and right edges of the page.
  Parallax scrolls at a slower rate than content.
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (leftRef.current) {
        leftRef.current.style.transform = `translateY(${scrollY * -0.15}px)`;
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translateY(${scrollY * -0.1}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Left margin */}
      <div className="fixed top-0 left-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block">
        {/* Vertical vector line */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-cream/[0.04]" />

        {/* Rotated text labels — scroll parallax */}
        <div
          ref={leftRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform"
        >
          <div className="flex flex-col items-center gap-32 py-20">
            {leftLabels.map((label, i) => (
              <span
                key={i}
                className="text-[9px] tracking-[0.25em] uppercase whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  color: i % 3 === 0 ? "rgba(244,243,241,0.08)" : "rgba(244,243,241,0.04)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Tick marks along the line */}
        {[10, 25, 40, 55, 70, 85].map((pos) => (
          <div
            key={pos}
            className="absolute right-0"
            style={{ top: `${pos}%` }}
          >
            <div className="w-2 h-[1px] bg-cream/[0.04]" />
          </div>
        ))}
      </div>

      {/* Right margin */}
      <div className="fixed top-0 right-0 bottom-0 w-10 md:w-14 z-30 pointer-events-none hidden lg:block">
        {/* Vertical vector line */}
        <div className="absolute top-0 left-0 w-[1px] h-full bg-cream/[0.04]" />

        {/* Rotated text labels */}
        <div
          ref={rightRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 will-change-transform"
        >
          <div className="flex flex-col items-center gap-28 py-32">
            {rightLabels.map((label, i) => (
              <span
                key={i}
                className="text-[9px] tracking-[0.25em] uppercase whitespace-nowrap"
                style={{
                  writingMode: "vertical-rl",
                  color: i % 4 === 0 ? "rgba(244,243,241,0.07)" : "rgba(244,243,241,0.035)",
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Tick marks */}
        {[15, 30, 50, 65, 80].map((pos) => (
          <div
            key={pos}
            className="absolute left-0"
            style={{ top: `${pos}%` }}
          >
            <div className="w-2 h-[1px] bg-cream/[0.04]" />
          </div>
        ))}
      </div>
    </>
  );
}
