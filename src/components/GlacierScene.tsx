"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";
const IMG = `${BASE}/images/generated/glacier-final-1.jpg`;

/*
  6 layers in CSS 3D space using perspective + translateZ.
  Each layer is the full image, masked to a vertical depth band.
  Deeper layers (negative Z) move less with parallax.
  Fog cards sit between image layers.
*/

interface LayerConfig {
  id: string;
  type: "image" | "fog";
  z: number; // translateZ depth
  maskTop: string; // % from top where visible starts
  maskBottom: string; // % from top where visible ends
  feather: string; // gradient feather size
  parallaxMultiplier: number; // mouse movement multiplier
  scrollMultiplier: number; // scroll movement multiplier
  opacity?: number;
}

const layers: LayerConfig[] = [
  // Layer 1: Sky (furthest back)
  {
    id: "sky",
    type: "image",
    z: -120,
    maskTop: "0%",
    maskBottom: "45%",
    feather: "8%",
    parallaxMultiplier: 0.3,
    scrollMultiplier: 0.1,
  },
  // Fog between sky and mountain
  {
    id: "fog-1",
    type: "fog",
    z: -90,
    maskTop: "25%",
    maskBottom: "55%",
    feather: "12%",
    parallaxMultiplier: 0.4,
    scrollMultiplier: 0.15,
    opacity: 0.25,
  },
  // Layer 2: Mountain peak
  {
    id: "mountain",
    type: "image",
    z: -60,
    maskTop: "28%",
    maskBottom: "62%",
    feather: "6%",
    parallaxMultiplier: 0.55,
    scrollMultiplier: 0.22,
  },
  // Fog between mountain and midground
  {
    id: "fog-2",
    type: "fog",
    z: -30,
    maskTop: "45%",
    maskBottom: "75%",
    feather: "10%",
    parallaxMultiplier: 0.7,
    scrollMultiplier: 0.32,
    opacity: 0.4,
  },
  // Layer 3: Mid terrain
  {
    id: "midground",
    type: "image",
    z: 0,
    maskTop: "52%",
    maskBottom: "82%",
    feather: "6%",
    parallaxMultiplier: 0.85,
    scrollMultiplier: 0.42,
  },
  // Layer 4: Foreground (closest)
  {
    id: "foreground",
    type: "image",
    z: 60,
    maskTop: "72%",
    maskBottom: "100%",
    feather: "5%",
    parallaxMultiplier: 1.0,
    scrollMultiplier: 0.55,
  },
];

export default function GlacierScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const scrollVal = useRef(0);
  const layerEls = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  scrollYProgress.on("change", (v) => {
    scrollVal.current = v;
  });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const animate = () => {
      // Smooth lerp
      smoothRef.current.x +=
        (mouseRef.current.x - smoothRef.current.x) * 0.035;
      smoothRef.current.y +=
        (mouseRef.current.y - smoothRef.current.y) * 0.035;

      const mx = smoothRef.current.x;
      const my = smoothRef.current.y;
      const sp = scrollVal.current;

      layers.forEach((layer, i) => {
        const el = layerEls.current[i];
        if (!el) return;

        const px = mx * layer.parallaxMultiplier * -25;
        const py = my * layer.parallaxMultiplier * -15;
        const sy = sp * layer.scrollMultiplier * 200;

        el.style.transform = `translateZ(${layer.z}px) translate(${px}px, ${py + sy}px)`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouse);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {/* 3D perspective container */}
      <div
        className="absolute inset-0"
        style={{
          perspective: "800px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {layers.map((layer, i) => (
            <div
              key={layer.id}
              ref={(el) => {
                layerEls.current[i] = el;
              }}
              className="absolute -inset-[15%] will-change-transform"
              style={{
                transform: `translateZ(${layer.z}px)`,
                zIndex: i,
              }}
            >
              {layer.type === "image" ? (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${IMG})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                    maskImage: `linear-gradient(to bottom,
                      transparent ${layer.maskTop},
                      black calc(${layer.maskTop} + ${layer.feather}),
                      black calc(${layer.maskBottom} - ${layer.feather}),
                      transparent ${layer.maskBottom})`,
                    WebkitMaskImage: `linear-gradient(to bottom,
                      transparent ${layer.maskTop},
                      black calc(${layer.maskTop} + ${layer.feather}),
                      black calc(${layer.maskBottom} - ${layer.feather}),
                      transparent ${layer.maskBottom})`,
                  }}
                />
              ) : (
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom,
                      transparent ${layer.maskTop},
                      rgba(24,25,25,${layer.opacity}) calc(${layer.maskTop} + ${layer.feather}),
                      rgba(24,25,25,${layer.opacity}) calc(${layer.maskBottom} - ${layer.feather}),
                      transparent ${layer.maskBottom})`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 35%, transparent 30%, rgba(24,25,25,0.55) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[18%] z-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #181919)",
        }}
      />
    </div>
  );
}
