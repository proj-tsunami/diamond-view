"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollSequenceProps {
  frames: string[];
  className?: string;
  height?: string;
  overlay?: React.ReactNode;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

function getDevicePixelRatio(isMobile: boolean): number {
  if (typeof window === "undefined") return 1;
  const dpr = window.devicePixelRatio || 1;
  return Math.min(dpr, isMobile ? 2 : 3);
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  fit: "cover" | "contain"
) {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;

  if (iw === 0 || ih === 0) return;

  const canvasRatio = cw / ch;
  const imgRatio = iw / ih;

  let sx = 0,
    sy = 0,
    sw = iw,
    sh = ih;
  let dx = 0,
    dy = 0,
    dw = cw,
    dh = ch;

  if (fit === "cover") {
    if (imgRatio > canvasRatio) {
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / canvasRatio;
      sy = (ih - sh) / 2;
    }
  } else {
    // contain
    if (imgRatio > canvasRatio) {
      dh = cw / imgRatio;
      dy = (ch - dh) / 2;
    } else {
      dw = ch * imgRatio;
      dx = (cw - dw) / 2;
    }
    ctx.clearRect(0, 0, cw, ch);
  }

  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function loadFrameChunks(
  urls: string[],
  chunkSize: number,
  onProgress: (loaded: number) => void
): { images: (HTMLImageElement | null)[]; cancel: () => void } {
  const images: (HTMLImageElement | null)[] = new Array(urls.length).fill(null);
  let cancelled = false;

  async function load() {
    for (let i = 0; i < urls.length; i += chunkSize) {
      if (cancelled) return;
      const chunk = urls.slice(i, i + chunkSize);
      const promises = chunk.map(
        (url, j) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              if (!cancelled) {
                images[i + j] = img;
                onProgress(images.filter(Boolean).length);
              }
              resolve();
            };
            img.onerror = () => resolve(); // skip failed frames
            img.src = url;
          })
      );
      await Promise.all(promises);
    }
  }

  load();

  return {
    images,
    cancel: () => {
      cancelled = true;
    },
  };
}

export default function ScrollSequence({
  frames,
  className = "",
  height = "300vh",
  overlay,
  priority = false,
  objectFit = "cover",
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(-1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isMobileRef = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  // Set up canvas resolution
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isMobileRef.current = window.innerWidth < 768;
    const dpr = getDevicePixelRatio(isMobileRef.current);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
  }, []);

  // Paint a specific frame index to the canvas
  const paintFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Find the closest loaded frame (handles gaps from failed loads)
      let img: HTMLImageElement | null = null;
      for (let i = index; i >= 0; i--) {
        if (imagesRef.current[i]) {
          img = imagesRef.current[i];
          break;
        }
      }
      if (!img) return;

      drawFrame(ctx, img, canvas, objectFit);
      currentFrameRef.current = index;
    },
    [objectFit]
  );

  // Main effect: preload frames, bind ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (frames.length === 0) return;

    setupCanvas();

    const threshold = Math.ceil(frames.length * 0.2);
    let triggerInstance: ScrollTrigger | null = null;
    let bound = false;

    const bindScrollTrigger = () => {
      if (bound || !containerRef.current) return;
      bound = true;

      triggerInstance = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            Math.floor(self.progress * (frames.length - 1)),
            frames.length - 1
          );
          if (frameIndex !== currentFrameRef.current) {
            paintFrame(frameIndex);
          }
        },
      });
    };

    const onProgress = (loaded: number) => {
      setLoadProgress(loaded / frames.length);
      // Paint first frame as soon as it's available
      if (loaded === 1 && currentFrameRef.current === -1) {
        paintFrame(0);
      }
      // Bind scroll once enough frames are loaded
      if (loaded >= threshold) {
        bindScrollTrigger();
      }
    };

    const startLoading = () => {
      const { images, cancel } = loadFrameChunks(frames, 10, onProgress);
      imagesRef.current = images;
      return cancel;
    };

    let cancelLoad: (() => void) | null = null;

    if (priority) {
      cancelLoad = startLoading();
    } else {
      // Lazy: use IntersectionObserver to start loading when near viewport
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            cancelLoad = startLoading();
            observer.disconnect();
          }
        },
        { rootMargin: "100%" }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }

      return () => {
        observer.disconnect();
        cancelLoad?.();
        triggerInstance?.kill();
      };
    }

    return () => {
      cancelLoad?.();
      triggerInstance?.kill();
    };
  }, [frames, priority, prefersReducedMotion, setupCanvas, paintFrame]);

  // Handle window resize — update canvas resolution
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleResize = () => {
      setupCanvas();
      if (currentFrameRef.current >= 0) {
        paintFrame(currentFrameRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [prefersReducedMotion, setupCanvas, paintFrame]);

  // Reduced motion: show static middle frame
  if (prefersReducedMotion && frames.length > 0) {
    const middleFrame = frames[Math.floor(frames.length / 2)];
    return (
      <div className={`relative ${className}`}>
        <div className="relative h-screen">
          <img
            src={middleFrame}
            alt=""
            className={`w-full h-full ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
          />
          {overlay && (
            <div className="absolute inset-0 z-10">{overlay}</div>
          )}
        </div>
        <noscript>
          <img src={frames[0]} alt="" className="w-full" />
        </noscript>
      </div>
    );
  }

  const ready = loadProgress >= 0.2;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className={`w-full h-full transition-[filter] duration-700 ${
            ready ? "" : "blur-sm"
          }`}
        />

        {/* Loading progress bar */}
        {loadProgress < 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-[2px] z-20">
            <div
              className="h-full bg-cream/20 transition-[width] duration-300"
              style={{ width: `${loadProgress * 100}%` }}
            />
          </div>
        )}

        {/* Overlay content */}
        {overlay && (
          <div className="absolute inset-0 z-10">{overlay}</div>
        )}
      </div>

      {/* noscript fallback */}
      <noscript>
        <img src={frames[0]} alt="" className="w-full" />
      </noscript>
    </div>
  );
}
