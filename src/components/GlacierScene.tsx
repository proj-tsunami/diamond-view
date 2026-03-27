"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export default function GlacierScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Scroll parallax — image moves up slower than scroll
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.15]);

  // Smooth mouse tracking via RAF — no spring physics jank
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const smoothLoop = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mouseRef.current.x - prev.x) * 0.04,
        y: prev.y + (mouseRef.current.y - prev.y) * 0.04,
      }));
      rafRef.current = requestAnimationFrame(smoothLoop);
    };

    window.addEventListener("mousemove", handleMouse);
    rafRef.current = requestAnimationFrame(smoothLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const tiltX = smoothMouse.y * -2;
  const tiltY = smoothMouse.x * 3;
  const shiftX = smoothMouse.x * -20;
  const shiftY = smoothMouse.y * -12;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {/* Single image with 3D tilt via mouse */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{
          y: imgY,
          perspective: 1000,
        }}
      >
        <div
          className="absolute -inset-[8%] will-change-transform"
          style={{
            transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate(${shiftX}px, ${shiftY}px) scale(1.1)`,
            transition: "none",
          }}
        >
          <img
            src={`${BASE}/images/generated/glacier-final-1.jpg`}
            alt=""
            className="w-full h-full object-cover object-top"
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Depth haze — adds atmospheric separation on scroll */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none bg-[#181919]"
        style={{ opacity: overlayOpacity }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 30%, rgba(24,25,25,0.5) 100%)",
        }}
      />

      {/* Top darken */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#181919]/50 to-transparent z-20 pointer-events-none" />

      {/* Bottom blend — stays dark, image already fades to charcoal */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[30%] z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, #181919 100%)",
        }}
      />
    </div>
  );
}
