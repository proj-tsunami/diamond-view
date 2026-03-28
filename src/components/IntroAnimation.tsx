"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/*
  Intro sequence:
  - Site loads: solid cream screen, nothing else visible
  - Logo + glyph animate in (fade up)
  - Hold for a beat
  - Entire cream panel wipes down with chevron shape, revealing demo reel behind
*/

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    // Small delay to ensure page is ready, then animate logo in
    const t0 = setTimeout(() => setPhase("logo-in"), 300);
    // Hold logo
    const t1 = setTimeout(() => setPhase("hold"), 1100);
    // Start wipe
    const t2 = setTimeout(() => setPhase("wipe"), 2400);
    // Done
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <div className="fixed inset-0 z-[9998]">
          {/* Cream panel — always starts visible, wipes away */}
          <motion.div
            className="absolute inset-0 bg-[#F4F3F1]"
            initial={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)",
            }}
            animate={
              phase === "wipe"
                ? {
                    clipPath:
                      "polygon(0 0, 100% 0, 100% -20%, 50% -5%, 0 -20%)",
                  }
                : {
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 50% 115%, 0 100%)",
                  }
            }
            transition={
              phase === "wipe"
                ? { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
                : { duration: 0 }
            }
          />

          {/* Logo — animates in on the cream panel */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={
                phase === "idle"
                  ? { opacity: 0, y: 20 }
                  : phase === "wipe"
                  ? { opacity: 0, y: -30 }
                  : { opacity: 1, y: 0 }
              }
              transition={{
                duration: phase === "wipe" ? 0.5 : 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              <img
                src={`${BASE}/images/diamond-logo-dark.png`}
                alt="Diamond View"
                className="w-12 h-12 md:w-14 md:h-14"
                draggable={false}
              />
              <div className="flex flex-col items-center gap-1">
                <span className="text-[#181919] font-display font-bold text-lg md:text-xl tracking-[0.12em]">
                  Diamond View
                </span>
                <span className="text-[#181919]/25 text-[9px] tracking-[0.35em] uppercase">
                  Creative Production Studio
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
