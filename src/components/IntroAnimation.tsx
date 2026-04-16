"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Intro animation — a full diamond ◇ descends into frame.
 *
 * 1. Diamond slides DOWN from above the viewport into center, covering it.
 *    The bottom chevron ∨ leads the way, revealing the cream background.
 * 2. Logo fades in over the cream.
 * 3. Hold.
 * 4. Diamond continues DOWN, exiting below the viewport, revealing the
 *    demo reel. The top chevron ^ is the trailing edge.
 *
 * The diamond has a 30px taupe accent border tracing its entire perimeter.
 */

const TAUPE = "#968a79";
const CREAM = "#F4F3F1";
const CHARCOAL = "#111212";

// Full diamond ◇ — chevron at top AND bottom.
// Side vertices at 15% / 85% set the chevron angle.
const DIAMOND_CLIP =
  "polygon(50% 0%, 100% 15%, 100% 85%, 50% 100%, 0% 85%, 0% 15%)";

type Phase = "initial" | "descending" | "settled" | "wipe" | "done";

export default function IntroAnimation({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("initial");
  const ranRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    // Sequence:
    //   150ms wait, 1.15s descend → settle
    //   1.3s hold with logo
    //   1.25s wipe out
    const t0 = setTimeout(() => setPhase("descending"), 150);
    const t1 = setTimeout(() => setPhase("settled"), 1400);
    const t2 = setTimeout(() => setPhase("wipe"), 2900);
    const t3 = setTimeout(() => {
      setPhase("done");
      onCompleteRef.current();
    }, 4300);

    return () => [t0, t1, t2, t3].forEach(clearTimeout);
  }, []);

  if (phase === "done") return null;

  // Translate Y for each phase.
  const y =
    phase === "initial"
      ? "-150vh"
      : phase === "wipe"
      ? "150vh"
      : "0vh";

  const moveTransition =
    phase === "descending"
      ? { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const }
      : phase === "wipe"
      ? { duration: 1.25, ease: [0.76, 0, 0.24, 1] as const }
      : { duration: 0 };

  // Cover geometry — taller + wider than viewport so the diamond fully covers
  // it when settled (chevron peaks sit outside the viewport at rest).
  const creamStyle = {
    top: "-20vh",
    left: 0,
    right: 0,
    height: "140vh",
    clipPath: DIAMOND_CLIP,
    background: CREAM,
    willChange: "transform",
  } as const;

  const taupeStyle = {
    top: "calc(-20vh - 30px)",
    left: "-30px",
    right: "-30px",
    height: "calc(140vh + 60px)",
    clipPath: DIAMOND_CLIP,
    background: TAUPE,
    willChange: "transform",
  } as const;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none overflow-hidden">
      {/* Taupe perimeter — same diamond, 30px larger all round */}
      <motion.div
        className="absolute"
        style={taupeStyle}
        initial={{ y: "-150vh" }}
        animate={{ y }}
        transition={moveTransition}
      />

      {/* Cream diamond cover */}
      <motion.div
        className="absolute"
        style={creamStyle}
        initial={{ y: "-150vh" }}
        animate={{ y }}
        transition={moveTransition}
      />

      {/* Logo + wordmark — fades in once the diamond has settled */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={
            phase === "settled"
              ? { opacity: 1, y: 0 }
              : phase === "wipe"
              ? { opacity: 0, y: 30 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: phase === "wipe" ? 0.4 : 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/diamond-logo-dark.png"
            alt="Diamond View"
            loading="eager"
            className="w-12 h-12 md:w-14 md:h-14"
            draggable={false}
          />
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-display font-bold text-lg md:text-xl tracking-[0.12em]"
              style={{ color: CHARCOAL }}
            >
              Diamond View
            </span>
            <span
              className="text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "rgba(17,18,18,0.3)" }}
            >
              Creative Production Studio
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
