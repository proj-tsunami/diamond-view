"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export default function GlacierScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll transforms per layer — back slow, front fast
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const mountY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fogY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const loop = () => {
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.035;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * 0.035;

      const sx = smoothRef.current.x;
      const sy = smoothRef.current.y;

      // Each layer gets progressively more mouse movement
      const layers = layerRefs.current;
      if (layers[0]) layers[0].style.transform = `translate(${sx * -5}px, ${sy * -3}px) scale(1.08)`;
      if (layers[1]) layers[1].style.transform = `translate(${sx * -12}px, ${sy * -8}px) scale(1.12)`;
      if (layers[2]) layers[2].style.transform = `translate(${sx * -20}px, ${sy * -12}px) scale(1.15)`;
      if (layers[3]) layers[3].style.transform = `translate(${sx * -28}px, ${sy * -16}px) scale(1.1)`;
      if (layers[4]) layers[4].style.transform = `translate(${sx * -35}px, ${sy * -20}px) scale(1.08)`;

      frameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", handleMouse);
    frameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const setLayerRef = (i: number) => (el: HTMLDivElement | null) => {
    layerRefs.current[i] = el;
  };

  const imgUrl = `${BASE}/images/generated/glacier-final-1.jpg`;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {/* ─── Layer 0: Deep sky / atmosphere (furthest) ─── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          ref={setLayerRef(0)}
          className="absolute -inset-[10%] will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_20%]"
            style={{
              backgroundImage: `url(${imgUrl})`,
              maskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 50%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 30%, transparent 50%)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── Layer 1: Mountain peak ─── */}
      <motion.div className="absolute inset-0" style={{ y: mountY }}>
        <div
          ref={setLayerRef(1)}
          className="absolute -inset-[12%] will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_20%]"
            style={{
              backgroundImage: `url(${imgUrl})`,
              maskImage: "linear-gradient(to bottom, transparent 22%, black 35%, black 52%, transparent 65%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 22%, black 35%, black 52%, transparent 65%)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── Layer 2: Mid terrain ─── */}
      <motion.div className="absolute inset-0" style={{ y: midY }}>
        <div
          ref={setLayerRef(2)}
          className="absolute -inset-[15%] will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_20%]"
            style={{
              backgroundImage: `url(${imgUrl})`,
              maskImage: "linear-gradient(to bottom, transparent 48%, black 58%, black 68%, transparent 80%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 48%, black 58%, black 68%, transparent 80%)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── Layer 3: Fog / atmosphere (foreground haze) ─── */}
      <motion.div className="absolute inset-0" style={{ y: fogY }}>
        <div
          ref={setLayerRef(3)}
          className="absolute -inset-[10%] will-change-transform"
        >
          {/* Atmospheric fog overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, transparent 50%, rgba(24,25,25,0.4) 65%, rgba(24,25,25,0.7) 78%, transparent 90%)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── Layer 4: Near foreground (closest) ─── */}
      <motion.div className="absolute inset-0" style={{ y: nearY }}>
        <div
          ref={setLayerRef(4)}
          className="absolute -inset-[8%] will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-[center_20%]"
            style={{
              backgroundImage: `url(${imgUrl})`,
              maskImage: "linear-gradient(to bottom, transparent 72%, black 85%, black 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 72%, black 85%, black 100%)",
            }}
          />
        </div>
      </motion.div>

      {/* ─── Vignette ─── */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, transparent 25%, rgba(24,25,25,0.6) 100%)",
        }}
      />

      {/* ─── Bottom blend to charcoal ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[20%] z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #181919 100%)",
        }}
      />
    </div>
  );
}
