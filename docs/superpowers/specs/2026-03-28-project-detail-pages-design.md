# Project Detail Pages — Design Spec

## Overview

Individual project pages accessible from the homepage portfolio section. Each page showcases a project with a full-width hero (video or still), short case study summary, metadata tags, and a curated gallery of stills in cinematic strip layouts. A cinematic morph transition connects the homepage cards to the detail pages.

## Data Layer

Single source of truth: `src/data/projects.ts`

```ts
type GalleryItem = {
  src: string;
  alt: string;
  layout: "full" | "half";
};

type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  tagline: string;
  summary: string;
  services: string[];
  heroType: "video" | "image";
  heroSrc: string;
  heroPoster: string;
  cardImage: string;
  gallery: GalleryItem[];
};
```

- `heroType` toggles between auto-playing muted video and a static image per project.
- `gallery[].layout` controls cinematic strip pacing: `"full"` for edge-to-edge, `"half"` for side-by-side pairs.
- `cardImage` references the existing generated images used on the homepage portfolio cards.
- Both the homepage portfolio section and the detail pages consume this same data file.
- When migrating to a CMS, this single file is replaced with API calls.

## Routing

**Route:** `/work/[slug]/page.tsx`

- Next.js App Router dynamic route.
- `generateStaticParams()` pre-renders all project pages at build time.
- Compatible with existing GitHub Pages static export (`output: "export"` in next.config.ts).
- Clean URLs: `/work/massey-minis`, `/work/reliaquest`, etc.

## Page Layout (top to bottom)

### 1. Hero

- Full-width, full-viewport-height.
- **Video mode:** Auto-plays muted. Custom minimal controls (unmute + fullscreen icons) in bottom-right, cream colored, semi-transparent. No browser default controls.
- **Image mode:** Static key frame, full bleed.
- This element is the morph target — its `layoutId` matches the homepage card image for the cinematic transition.

### 2. Project Info

- Charcoal background, cream text.
- **Tagline:** OwnersWide, large, uppercase.
- **Summary:** Owners, regular weight, 2-3 sentences.
- **Metadata:** Minimal pill/tag style below the summary. No borders, subtle `charcoal-light` (#2E2F2F) background with cream text. Fields: client, year, category, services (each service as its own tag).

### 3. Gallery — Cinematic Strips

- Alternating layouts driven by the `gallery[].layout` field:
  - `"full"` — single image, edge-to-edge.
  - `"half"` — two images side by side (stacks to full-width on mobile).
- Tight gaps between images (8-12px) for a contact-sheet feel.
- Sharp edges, no rounded corners.
- Scroll-triggered reveal using existing `AnimatedSection` component. Images fade + slide up, staggered slightly.

### 4. Next/Prev Footer

- Full-width section showing the next project's card image with title overlaid.
- Small "Previous" link alongside.
- Clicking triggers the cinematic transition to the next/prev project.
- Wraps around: last project links to first, first links to last.

## Navigation

- Main navbar stays visible on project pages.
- Over the hero: navbar shows a back arrow + project title instead of normal section links.
- `data-theme="dark"` on the page so navbar, custom cursor, and side margins adapt via existing `useSectionTheme` hook.

## Cinematic Transition

### Homepage to Project

1. User clicks a portfolio card.
2. Card image scales up via Framer Motion `layoutId` (e.g., `project-massey-minis`), morphing from card size/position to full-viewport hero.
3. Other homepage content fades out simultaneously (~300ms).
4. URL updates to `/work/[slug]`.
5. Project info and gallery animate in with staggered reveals once the hero lands.

### Project to Project (next/prev)

1. Current page content fades out.
2. New project hero crossfades in.
3. Content animates in fresh.

### Project to Homepage (back)

1. Hero morphs back down to the card position in the portfolio section using the same `layoutId`.
2. Homepage content fades back in.

### Technical Requirements

- Wrap the app in Framer Motion `AnimatePresence` and `LayoutGroup` at the layout level (`layout.tsx` or a client wrapper).
- `layoutId` on the card image and the hero image must match per project.
- For video-hero projects, the morph uses the `heroPoster` still image, then video begins playback once the transition completes.

### Fallback

- If the morph transition is janky on certain browsers, degrade gracefully to a fast fade transition (opacity, ~300ms).

## Styling

- **Colors:** Charcoal (#181919) and cream (#F4F3F1) throughout. Consistent with homepage.
- **Typography:** OwnersWide uppercase for taglines. Owners for body text and metadata. Same weights as homepage.
- **Tags:** Pill style, no borders, `charcoal-light` background, cream text, small and understated.
- **Gallery gaps:** 8-12px, sharp edges.
- **Scroll animations:** Reuse existing `AnimatedSection` for gallery image reveals.
- **Video controls:** Custom, minimal, cream, semi-transparent. Bottom-right corner.
- **Responsive:** Hero full-width all breakpoints. Half-gallery pairs stack to full-width on mobile. Tags wrap naturally.
- **Theme:** Pages use `data-theme="dark"` for existing theme detection system.

## CMS Migration Path

- All project data in one file (`src/data/projects.ts`) with a clean TypeScript interface.
- Page template consumes data through props — no hardcoded content in the template.
- Gallery layout is data-driven (the `layout` field), not hardcoded in JSX.
- When moving to a CMS (Framer or headless), replace the data file with API/fetch calls. The template and components stay the same.

## New Files

- `src/data/projects.ts` — project data + types
- `src/app/work/[slug]/page.tsx` — project detail page
- `src/components/ProjectHero.tsx` — hero with video/image toggle
- `src/components/ProjectInfo.tsx` — tagline, summary, metadata tags
- `src/components/ProjectGallery.tsx` — cinematic strips gallery
- `src/components/ProjectNav.tsx` — next/prev footer navigation

## Modified Files

- `src/app/HomeClient.tsx` — extract project data to shared file, add `layoutId` to portfolio card images, wrap cards with Link
- `src/app/layout.tsx` — add `AnimatePresence` + `LayoutGroup` wrapper
- `src/components/Navbar.tsx` — adapt behavior on project pages (back arrow + title)
