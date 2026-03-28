"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState("logo-in");

  useEffect(() => {
    // Phase 1: Logo animates in
    const t1 = setTimeout(() => setPhase("logo-hold"), 800);
    // Phase 2: Hold on logo
    const t2 = setTimeout(() => setPhase("wipe"), 2200);
    // Phase 3: Wipe completes, remove overlay
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9998]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Cream background — wipes away with chevron shape */}
          <motion.div
            className="absolute inset-0 bg-[#F4F3F1] z-10"
            animate={
              phase === "wipe"
                ? {
                    clipPath:
                      "polygon(0 0, 100% 0, 100% -10%, 50% 0%, 0 -10%)",
                  }
                : {
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 100%, 50% 115%, 0 100%)",
                  }
            }
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Logo — sits on the cream layer */}
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center"
            animate={
              phase === "wipe"
                ? { opacity: 0, y: -40, scale: 0.95 }
                : phase === "logo-in"
                ? { opacity: 0, y: 15, scale: 0.95 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            transition={{
              duration: phase === "wipe" ? 0.6 : 0.7,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div className="flex flex-col items-center gap-5">
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
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
