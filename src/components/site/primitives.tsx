"use client";

/* Faithful port of the Claude design prototype's shared.jsx primitives + drivers.
   Provides the Eyebrow / Section / Icon / Drift building blocks plus the
   Lenis smooth-scroll + parallax + reveal-on-scroll engine that the prototype
   relies on. All styling comes from the ported site.css/components.css. */

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/* ---- Icons (inlined Lucide path data, thin stroke) --------------------- */
const ICON_PATHS: Record<string, string[]> = {
  "arrow-right": ["M5 12h14", "m12 5 7 7-7 7"],
  "arrow-up-right": ["M7 7h10v10", "M7 17 17 7"],
  menu: ["M4 12h16", "M4 6h16", "M4 18h16"],
  x: ["M18 6 6 18", "m6 6 12 12"],
  play: ["M6 3v18l14-9z"],
  mail: ["M22 7 12 13 2 7"],
  "chevron-down": ["m6 9 6 6 6-6"],
  "arrow-left": ["M19 12H5", "m12 19-7-7 7-7"],
};

export function Icon({
  name,
  size = 18,
  stroke = 1.75,
  className,
  style,
}: {
  name: string;
  size?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const paths = ICON_PATHS[name] || [];
  const isMail = name === "mail";
  const isPlay = name === "play";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isPlay ? "currentColor" : "none"}
      stroke={isPlay ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {isMail && <rect x="2" y="4" width="20" height="16" rx="2" />}
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/* ---- Eyebrow label with diamond bullet --------------------------------- */
export function Eyebrow({
  children,
  center,
  style,
}: {
  children: ReactNode;
  center?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span className={"eyebrow" + (center ? " eyebrow--center" : "")} style={style}>
      <span className="eyebrow__d" />
      {children}
    </span>
  );
}

/* ---- Reveal-on-scroll hook (IntersectionObserver) ---------------------- */
/* Attach the returned ref to a container; the container itself (if .reveal)
   and all .reveal descendants fade up, staggered, when scrolled into view. */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els: Element[] = root.classList.contains("reveal")
      ? [root, ...Array.from(root.querySelectorAll(".reveal"))]
      : Array.from(root.querySelectorAll(".reveal"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ---- Section wrapper that auto-wires reveal ---------------------------- */
export function Section({
  id,
  className,
  children,
  tight,
  style,
  theme,
  label,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
  tight?: boolean;
  style?: CSSProperties;
  theme?: "dark" | "light";
  label?: string;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      data-theme={theme}
      data-screen-label={label}
      className={"section" + (tight ? " section--tight" : "") + (className ? " " + className : "")}
      style={style}
    >
      {children}
    </section>
  );
}

/* helper: stagger delay style */
export const stagger = (i: number, step = 90): CSSProperties => ({
  transitionDelay: i * step + "ms",
});

/* ---- Drift — faint outline diamond that parallaxes in a section bg ------ */
export function Drift({
  size = 280,
  speed = 0.12,
  top,
  left,
  right,
  bottom,
  opacity,
  filled,
}: {
  size?: number;
  speed?: number;
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  opacity?: number;
  filled?: boolean;
}) {
  return (
    <span
      className="drift-wrap"
      data-parallax={speed}
      aria-hidden="true"
      style={{ width: size, height: size, top, left, right, bottom, opacity }}
    >
      <span className={"drift" + (filled ? " drift--fill" : "")} />
    </span>
  );
}

/* ---- Site engine: Lenis smooth scroll + parallax driver ----------------
   Call once near the root of a page. Honors prefers-reduced-motion. Drives
   every [data-parallax] element (value = speed factor) in one rAF loop. */
export function useScrollEngine(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let tickerFn: ((time: number) => void) | null = null;
    if (!reduce) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      // Sync Lenis with GSAP ScrollTrigger — drive Lenis off gsap.ticker so
      // every scroll-linked animation stays in lockstep with smooth scroll.
      lenis.on("scroll", ScrollTrigger.update);
      tickerFn = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }

    // Parallax driver
    let parallaxRaf = 0;
    let items: { el: HTMLElement; sy: number; sx: number }[] = [];
    let since = 999;
    const query = () => {
      items = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
        el,
        sy: parseFloat(el.dataset.parallax || "0") || 0,
        sx: parseFloat(el.dataset.parallaxX || "0") || 0,
      }));
      since = 0;
    };
    const tick = () => {
      if (since++ > 60) query();
      const vh = window.innerHeight;
      for (const it of items) {
        const r = it.el.getBoundingClientRect();
        if (r.bottom < -300 || r.top > vh + 300) continue;
        const delta = r.top + r.height / 2 - vh / 2;
        const ty = -delta * it.sy;
        const tx = -delta * it.sx;
        it.el.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0)`;
      }
      parallaxRaf = requestAnimationFrame(tick);
    };
    if (!reduce) {
      query();
      parallaxRaf = requestAnimationFrame(tick);
    }

    return () => {
      if (tickerFn) gsap.ticker.remove(tickerFn);
      if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
      lenis?.destroy();
    };
  }, [enabled]);
}

/* Smoothly scroll to an element id (best-effort; native fallback). */
export function smoothTo(id?: string, offset = 80) {
  if (typeof window === "undefined") return;
  const el = id && id !== "top" ? document.getElementById(id) : null;
  const y = el ? el.getBoundingClientRect().top + window.scrollY - offset : 0;
  window.scrollTo({ top: y, behavior: "smooth" });
}
