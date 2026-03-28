"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

/*
  Branded loading intro:
  1. Cream screen with logo fades in
  2. Diamond chevron shape wipes down to reveal content
  3. Zoom-out transition
*/

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<string>("logo");

  useEffect(() => {
    // Logo hold
    const t1 = setTimeout(() => setPhase("wipe"), 1800);
    // Wipe complete
    const t2 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cream background */}
          <motion.div
            className="absolute inset-0 bg-[#F4F3F1]"
            animate={
              phase === "wipe"
                ? { clipPath: "polygon(0 0, 100% 0, 100% 0%, 50% 0%, 0 0%)" }
                : { clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 100%, 0 100%)" }
            }
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
          />

          {/* Diamond chevron wipe shape — reveals dark content behind */}
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 50% 0%, 0 0%)" }}
            animate={
              phase === "wipe"
                ? {
                    clipPath:
                      "polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)",
                  }
                : {}
            }
            transition={{
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ background: "#181919" }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              phase === "logo"
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95, y: -30 }
            }
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <img
              src={`${BASE}/images/diamond-logo-dark.png`}
              alt="Diamond View"
              width={56}
              height={56}
              className="w-14 h-14"
            />
            <div className="flex flex-col items-center gap-0">
              <span className="text-[#181919] font-display font-bold text-xl tracking-[0.1em]">
                Diamond View
              </span>
              <span className="text-[#181919]/30 text-[9px] tracking-[0.3em] uppercase mt-1">
                Creative Production
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
