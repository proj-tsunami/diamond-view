# Scroll-Driven Frame Sequences — Design Spec

## Overview

A reusable canvas-based scroll sequence system for Diamond View that paints image frames to a `<canvas>` based on scroll position. Supports frame sequences exported from DaVinci Resolve, AI-generated images from Replicate, or frames extracted from video via ffmpeg.

Built on GSAP ScrollTrigger (already installed) with Lenis smooth scroll sync.

## Core Component: `ScrollSequence`

### Props

```tsx
interface ScrollSequenceProps {
  frames: string[];              // Ordered array of image URLs
  className?: string;            // Container styling
  height?: string;               // Scroll runway height (default: "300vh")
  overlay?: React.ReactNode;     // Content layered on top of the canvas
  priority?: boolean;            // Preload immediately vs. lazy (default: false)
  objectFit?: "cover" | "contain"; // Canvas draw mode (default: "cover")
}
```

### Behavior

1. Container renders as a tall `div` (height from prop, default `300vh`) creating the scroll runway.
2. Inside, a `<canvas>` sits in a `sticky top-0 h-screen` wrapper filling the viewport.
3. On mount, an `IntersectionObserver` with `rootMargin: "100%"` watches the container. When triggered (or immediately if `priority` is true), frame preloading begins.
4. Frames preload in chunks of 10 via `Promise` batches. Each chunk resolves before the next starts. Images are stored as `HTMLImageElement[]` in a ref.
5. A GSAP `ScrollTrigger` with `scrub: true` maps scroll progress (0→1) to a frame index: `Math.floor(progress * (frameCount - 1))`.
6. A `requestAnimationFrame`-gated paint function calls `canvas.drawImage()` only when the frame index changes.
7. Canvas resolution: `clientWidth * dpr` × `clientHeight * dpr`, where `dpr` is `Math.min(window.devicePixelRatio, cappedDpr)`. Cap is 2 on mobile, 3 on Retina desktop.
8. `objectFit: "cover"` implemented via aspect-ratio math in `drawImage()` — source rect cropped to fill canvas. `"contain"` fits within bounds with letterboxing.

### Loading State

- `loadProgress` (0→1) tracked internally as frames resolve.
- Until 20% of frames are loaded, canvas shows frame-001 as a static placeholder with a CSS blur filter.
- A thin progress bar (2px, bottom of canvas, `bg-cream/20`) animates from 0→100% during loading, then fades out.
- Scroll binding activates only after the 20% threshold.

### Reduced Motion & Fallbacks

- `prefers-reduced-motion: reduce` → render middle frame as a static `<img>` element. No canvas, no scroll binding.
- JS disabled → `<noscript>` block with first frame as a regular `<img>`.
- Partial load failure → component renders whatever frames loaded successfully. Missing frames hold the previous painted frame (no blank flashes).

## Utility: `getFrameUrls()`

```ts
function getFrameUrls(basePath: string, count: number, startAt?: number): string[]
```

Generates sequential URLs: `${basePath}/frame-001.webp`, `frame-002.webp`, etc. `startAt` defaults to 1. Handles zero-padded numbering to 3 digits. Prepends the `BASE` path prefix (empty in dev, `"/diamond-view"` in production) to support GitHub Pages deployment — uses the same `process.env.NODE_ENV` check as the rest of the site.

Located in `src/utils/frames.ts`.

## Hook: `useIsMobile()`

Returns `boolean`. Checks `window.innerWidth < 768` on mount. Does not listen for resize (frame set is chosen once). SSR-safe — returns `false` during server render.

Located in `src/hooks/useIsMobile.ts`.

## Lenis ↔ GSAP Sync

### Current State

- `SmoothScroll.tsx` initializes Lenis independently with its own `requestAnimationFrame` loop.
- `GSAPProvider.tsx` registers ScrollTrigger and does a one-time refresh. No connection to Lenis.
- These two systems are unaware of each other. ScrollTrigger reads native scroll position, but Lenis intercepts and virtualizes scrolling — causing desync.

### Change

Merge Lenis initialization into `GSAPProvider`:

1. Create Lenis instance inside `GSAPProvider`'s `useEffect`.
2. Add `lenis.on('scroll', ScrollTrigger.update)` to sync on every Lenis scroll event.
3. Drive the RAF loop from Lenis: `requestAnimationFrame` calls `lenis.raf(time)`.
4. Remove `SmoothScroll.tsx` as a standalone component.
5. Update `HomeClient.tsx` to remove `<SmoothScroll>` wrapper — `<GSAPProvider>` now handles both.

Framer Motion's `useScroll` hooks are unaffected — they read from the native scroll events that Lenis still dispatches to the DOM.

## Integration Points

### 1. Hero — Scroll-Driven Demo Reel

Replace the `<video>` / `<img>` in `Hero` with `<ScrollSequence>`:

- Scroll runway: `120vh` (matches current `reelRef` section height)
- Frames: ~90 desktop / ~45 mobile from demo reel
- `overlay`: existing "FEELING IN MOTION" wordmark, grid overlay, scroll indicator
- `priority: true` (hero loads immediately)
- Existing `reelOpacity` and `reelScale` transforms still wrap the component for the fade-to-glacier transition

### 2. Interstitial Sections

Replace `ParallaxBreak` and add two new interstitial sections:

- **Interstitial A** — between Portfolio and Stats
- **Interstitial B** — replaces current `ParallaxBreak` between Services and Process
- **Interstitial C** — between Process and Team

Each interstitial:
- Scroll runway: `200vh`–`300vh`
- Frames: 30–60 per sequence
- `overlay`: optional text with scroll-linked opacity (via Framer Motion `useTransform`)

### 3. Project Detail Pages

`ProjectHero` on `/work/[slug]` pages can accept an optional frame sequence per project:

- Scroll runway: `150vh`
- Frames: project-specific, defined in `projects.ts` as optional `sequence` field
- Falls back to current image/video toggle when no sequence is provided

### Updated Page Flow

```
Hero (scroll sequence, priority) →
Glacier/Branding →
Intro Statement →
Portfolio →
Interstitial A (scroll sequence) →
Stats →
Services →
Interstitial B (scroll sequence, replaces ParallaxBreak) →
Process →
Interstitial C (scroll sequence) →
Team →
Contact
```

## Asset Pipeline

### Directory Structure

```
public/sequences/
  hero/
    desktop/    # 1920×1080 WebP, ~90 frames
    mobile/     # 960×540 WebP, ~45 frames
  interstitial-a/
    desktop/    # 1920×1080 WebP, ~40 frames
    mobile/     # 960×540 WebP, ~20 frames
  interstitial-b/
    desktop/
    mobile/
  interstitial-c/
    desktop/
    mobile/
```

Frame naming: `frame-001.webp`, `frame-002.webp`, etc.

### Asset Budget

| Sequence | Desktop Frames | Desktop Size | Mobile Frames | Mobile Size |
|----------|---------------|-------------|--------------|-------------|
| Hero | 90 | ~3.6MB | 45 | ~675KB |
| Interstitial (each) | 40 | ~1.6MB | 20 | ~300KB |
| Project detail | 60 | ~2.4MB | 30 | ~450KB |

WebP at 80% quality. Sizes are estimates assuming ~40KB/frame desktop, ~15KB/frame mobile.

Preloading is chunked and lazy (except hero with `priority`), so actual initial page weight increase is minimal.

### Frame Extraction Script

`scripts/extract-frames.sh` — convenience wrapper around ffmpeg:

```bash
# Usage: ./scripts/extract-frames.sh <input-video> <output-dir> <frame-count> [width]
# Example: ./scripts/extract-frames.sh reel.mp4 public/sequences/hero/desktop 90 1920
```

Extracts evenly-spaced frames as WebP. Optional width parameter for mobile variants. Not a build dependency — just a dev convenience. Frames can also come directly from Resolve export or Replicate output.

## Files Changed / Created

### New Files
- `src/components/ScrollSequence.tsx` — core component
- `src/utils/frames.ts` — `getFrameUrls()` utility
- `src/hooks/useIsMobile.ts` — mobile detection hook
- `scripts/extract-frames.sh` — ffmpeg frame extraction script

### Modified Files
- `src/components/GSAPProvider.tsx` — add Lenis initialization and sync
- `src/app/HomeClient.tsx` — remove `<SmoothScroll>`, wire `ScrollSequence` into Hero, replace `ParallaxBreak`, add interstitial slots
- `src/data/projects.ts` — add optional `sequence` field to project type
- `src/components/ProjectHero.tsx` — support optional scroll sequence mode

### Removed Files
- `src/components/SmoothScroll.tsx` — functionality merged into `GSAPProvider`

## Out of Scope

- Actual frame assets (user provides from Resolve/Replicate/ffmpeg)
- WebGL shader effects on the canvas (future enhancement)
- Scroll-driven audio sync
- CMS integration for managing sequences
