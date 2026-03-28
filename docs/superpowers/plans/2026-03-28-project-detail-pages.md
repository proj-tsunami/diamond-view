# Project Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add individual project detail pages with cinematic morph transitions from the homepage portfolio cards, featuring full-width hero media, case study info, cinematic gallery strips, and next/prev navigation.

**Architecture:** Data-driven template at `/work/[slug]` consuming a shared `projects.ts` data file. Framer Motion `layoutId` connects homepage cards to detail page heroes for morph transitions. Static export via `generateStaticParams`.

**Tech Stack:** Next.js 16 (App Router, static export), React 19, Framer Motion 12, Tailwind CSS 4, TypeScript

**Important Next.js 16 note:** `params` is a Promise in page components — must use `await` in async server components or React `use()` in client components.

---

### Task 1: Create Project Data File

**Files:**
- Create: `src/data/projects.ts`

- [ ] **Step 1: Create the data file with types and project data**

```ts
// src/data/projects.ts

const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";

export type GalleryItem = {
  src: string;
  alt: string;
  layout: "full" | "half";
};

export type Project = {
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

export const projects: Project[] = [
  {
    slug: "massey-minis",
    title: "Massey Minis",
    category: "Campaign",
    year: "2025",
    client: "Massey Services",
    tagline: "TINY TRUCKS. BIG IMPACT.",
    summary:
      "A multi-platform campaign bringing Massey Services' fleet to life at miniature scale — blending practical effects with post-production polish to deliver playful, premium branded content.",
    services: ["Creative Development", "Production", "Post Production"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-01.jpg`,
    heroPoster: `${BASE}/images/generated/project-01.jpg`,
    cardImage: `${BASE}/images/generated/project-01.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Massey Minis hero shot", layout: "full" },
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Behind the scenes", layout: "half" },
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Miniature detail", layout: "half" },
      { src: `${BASE}/images/generated/project-01.jpg`, alt: "Final composite", layout: "full" },
    ],
  },
  {
    slug: "reliaquest",
    title: "Reliaquest",
    category: "Commercial",
    year: "2025",
    client: "Reliaquest",
    tagline: "SECURING WHAT MATTERS.",
    summary:
      "A commercial spot positioning Reliaquest's cybersecurity platform through cinematic storytelling — clean visuals, deliberate pacing, and a tone that earns trust without overselling.",
    services: ["Production", "Post Production + VFX"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-02.jpg`,
    heroPoster: `${BASE}/images/generated/project-02.jpg`,
    cardImage: `${BASE}/images/generated/project-02.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-02.jpg`, alt: "Reliaquest hero", layout: "full" },
      { src: `${BASE}/images/generated/project-02.jpg`, alt: "On set", layout: "half" },
      { src: `${BASE}/images/generated/project-02.jpg`, alt: "Lighting setup", layout: "half" },
    ],
  },
  {
    slug: "publix-back-to-school",
    title: "Publix — Back to School",
    category: "Branded Content",
    year: "2024",
    client: "Publix",
    tagline: "FRESH START.",
    summary:
      "Branded content for Publix's back-to-school campaign — warm, family-driven storytelling grounded in real moments and natural performances.",
    services: ["Creative Development", "Production", "Post Production"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-03.jpg`,
    heroPoster: `${BASE}/images/generated/project-03.jpg`,
    cardImage: `${BASE}/images/generated/project-03.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Publix campaign hero", layout: "full" },
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Family scene", layout: "half" },
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Product styling", layout: "half" },
      { src: `${BASE}/images/generated/project-03.jpg`, alt: "Final frame", layout: "full" },
    ],
  },
  {
    slug: "barr-sccu",
    title: "&Barr + SCCU",
    category: "Campaign",
    year: "2024",
    client: "&Barr / Space Coast Credit Union",
    tagline: "YOUR MONEY. YOUR WAY.",
    summary:
      "A campaign for Space Coast Credit Union via &Barr — approachable, community-centered spots that make financial services feel human and accessible.",
    services: ["Production", "Post Production"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-04.jpg`,
    heroPoster: `${BASE}/images/generated/project-04.jpg`,
    cardImage: `${BASE}/images/generated/project-04.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-04.jpg`, alt: "SCCU campaign hero", layout: "full" },
      { src: `${BASE}/images/generated/project-04.jpg`, alt: "Interview setup", layout: "half" },
      { src: `${BASE}/images/generated/project-04.jpg`, alt: "Community footage", layout: "half" },
    ],
  },
  {
    slug: "barr-massey-services",
    title: "&Barr + Massey Services",
    category: "Commercial",
    year: "2024",
    client: "&Barr / Massey Services",
    tagline: "BUILT ON SERVICE.",
    summary:
      "Commercial production for Massey Services through &Barr — showcasing the people and craft behind one of Florida's largest service companies.",
    services: ["Production", "Post Production + VFX"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-05.jpg`,
    heroPoster: `${BASE}/images/generated/project-05.jpg`,
    cardImage: `${BASE}/images/generated/project-05.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Massey Services hero", layout: "full" },
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Field crew", layout: "half" },
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Equipment detail", layout: "half" },
      { src: `${BASE}/images/generated/project-05.jpg`, alt: "Aerial shot", layout: "full" },
    ],
  },
  {
    slug: "adidas-bleacher-report",
    title: "Adidas + Bleacher Report",
    category: "Sports / Entertainment",
    year: "2023",
    client: "Adidas / Bleacher Report",
    tagline: "GAME RECOGNIZE GAME.",
    summary:
      "A sports and entertainment collaboration between Adidas and Bleacher Report — high-energy content blending athletic culture with brand storytelling.",
    services: ["Creative Development", "Production", "Post Production + VFX"],
    heroType: "image",
    heroSrc: `${BASE}/images/generated/project-06.jpg`,
    heroPoster: `${BASE}/images/generated/project-06.jpg`,
    cardImage: `${BASE}/images/generated/project-06.jpg`,
    gallery: [
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Adidas x BR hero", layout: "full" },
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Athlete portrait", layout: "half" },
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Behind the scenes", layout: "half" },
      { src: `${BASE}/images/generated/project-06.jpg`, alt: "Final edit frame", layout: "full" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project; next: Project } {
  const index = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd /Users/delucia/Projects/diamond-view && npx tsc --noEmit src/data/projects.ts 2>&1 | head -20`
Expected: No errors (or only errors about missing module resolution which is fine for an isolated check)

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: add shared project data file with types"
```

---

### Task 2: Update Homepage to Use Shared Data + Add Card Links

**Files:**
- Modify: `src/app/HomeClient.tsx:39-76` (replace inline data with import)
- Modify: `src/app/HomeClient.tsx:373-458` (add Link + layoutId to portfolio cards)

- [ ] **Step 1: Replace inline project data with import**

At the top of `HomeClient.tsx`, add the import:

```ts
import { projects } from "@/data/projects";
import Link from "next/link";
```

Remove the inline `projects` array (lines 39-76). The imported `projects` array has all the same fields plus more. The `image` field is now `cardImage`, so update references in the Portfolio component.

- [ ] **Step 2: Update Portfolio cards to link and add layoutId**

Replace the portfolio card `motion.div` wrapper (lines 391-440) with:

```tsx
{projects.map((project, i) => (
  <motion.div
    key={project.slug}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1, duration: 0.6 }}
    className="group flex-shrink-0 w-[80vw] md:w-[45vw] lg:w-[35vw]"
  >
    <Link href={`/work/${project.slug}`} className="block cursor-pointer">
      <TiltCard intensity={6} className="relative aspect-[16/10] rounded-sm overflow-hidden">
        <motion.div
          layoutId={`project-hero-${project.slug}`}
          whileHover={{ scale: 1.05 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="w-full h-full relative"
        >
          <DistortionHover
            src={project.cardImage}
            alt={project.title}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

          <span className="absolute top-6 right-6 text-cream/10 text-7xl md:text-8xl font-display font-black">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
            <p className="text-cream/50 text-[10px] tracking-[0.2em] uppercase mb-2">
              {project.category} — {project.year}
            </p>
            <h3 className="text-cream group-hover:text-cream/80 text-2xl md:text-3xl font-heading font-medium tracking-tight transition-colors duration-500">
              {project.title}
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-cream/40 origin-left"
        />
      </TiltCard>
    </Link>
  </motion.div>
))}
```

Key changes: wrapped in `Link`, added `layoutId={`project-hero-${project.slug}`}` to the inner motion.div, changed `project.image` to `project.cardImage`, used `project.slug` as key.

- [ ] **Step 3: Verify dev server renders correctly**

Run: `cd /Users/delucia/Projects/diamond-view && npm run dev`
Check: Homepage loads, portfolio cards still display, cards are now clickable links (they'll 404 until we create the detail page — that's expected).

- [ ] **Step 4: Commit**

```bash
git add src/app/HomeClient.tsx
git commit -m "feat: wire portfolio cards to shared data + link to detail pages"
```

---

### Task 3: Create ProjectHero Component

**Files:**
- Create: `src/components/ProjectHero.tsx`

- [ ] **Step 1: Create the hero component**

```tsx
// src/components/ProjectHero.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";

interface ProjectHeroProps {
  project: Project;
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden" data-theme="dark">
      {/* Hero media */}
      <motion.div
        layoutId={`project-hero-${project.slug}`}
        className="absolute inset-0"
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {project.heroType === "video" ? (
          <>
            <video
              ref={videoRef}
              src={project.heroSrc}
              poster={project.heroPoster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Video controls */}
            <div className="absolute bottom-8 right-8 flex gap-4 z-20">
              <button
                onClick={toggleMute}
                className="text-cream/60 hover:text-cream transition-colors text-xs tracking-[0.15em] uppercase"
                aria-label={muted ? "Unmute" : "Mute"}
              >
                {muted ? "Unmute" : "Mute"}
              </button>
              <button
                onClick={toggleFullscreen}
                className="text-cream/60 hover:text-cream transition-colors text-xs tracking-[0.15em] uppercase"
                aria-label="Fullscreen"
              >
                Fullscreen
              </button>
            </div>
          </>
        ) : (
          <img
            src={project.heroSrc}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        )}
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/30 z-10" />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectHero.tsx
git commit -m "feat: add ProjectHero component with video/image toggle"
```

---

### Task 4: Create ProjectInfo Component

**Files:**
- Create: `src/components/ProjectInfo.tsx`

- [ ] **Step 1: Create the info component**

```tsx
// src/components/ProjectInfo.tsx
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import type { Project } from "@/data/projects";

interface ProjectInfoProps {
  project: Project;
}

export default function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <section className="bg-charcoal py-24 md:py-32 px-6 md:px-12" data-theme="dark">
      <div className="max-w-4xl mx-auto">
        {/* Tagline */}
        <AnimatedSection>
          <h1 className="font-display text-cream text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.9]">
            {project.tagline}
          </h1>
        </AnimatedSection>

        {/* Summary */}
        <AnimatedSection delay={0.1}>
          <p className="text-cream/60 font-body text-base md:text-lg leading-relaxed mt-8 max-w-2xl">
            {project.summary}
          </p>
        </AnimatedSection>

        {/* Metadata tags */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap gap-3 mt-10">
            <span className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2">
              {project.client}
            </span>
            <span className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2">
              {project.year}
            </span>
            <span className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2">
              {project.category}
            </span>
            {project.services.map((service) => (
              <span
                key={service}
                className="text-cream/80 text-[10px] tracking-[0.2em] uppercase bg-charcoal-light px-4 py-2"
              >
                {service}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectInfo.tsx
git commit -m "feat: add ProjectInfo component with tagline, summary, and metadata tags"
```

---

### Task 5: Create ProjectGallery Component

**Files:**
- Create: `src/components/ProjectGallery.tsx`

- [ ] **Step 1: Create the gallery component**

```tsx
// src/components/ProjectGallery.tsx
"use client";

import AnimatedSection from "@/components/AnimatedSection";
import type { GalleryItem } from "@/data/projects";

interface ProjectGalleryProps {
  gallery: GalleryItem[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  // Group items: "full" renders alone, consecutive "half" items pair up
  const rows: GalleryItem[][] = [];
  let i = 0;
  while (i < gallery.length) {
    if (gallery[i].layout === "full") {
      rows.push([gallery[i]]);
      i++;
    } else {
      // Pair two halves together, or render single half as full-width
      if (i + 1 < gallery.length && gallery[i + 1].layout === "half") {
        rows.push([gallery[i], gallery[i + 1]]);
        i += 2;
      } else {
        rows.push([gallery[i]]);
        i++;
      }
    }
  }

  return (
    <section className="bg-charcoal px-2 md:px-3 pb-2 md:pb-3" data-theme="dark">
      <div className="flex flex-col gap-2 md:gap-3">
        {rows.map((row, rowIndex) => (
          <AnimatedSection key={rowIndex} delay={rowIndex * 0.05}>
            {row.length === 1 ? (
              <img
                src={row[0].src}
                alt={row[0].alt}
                className="w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                {row.map((item, itemIndex) => (
                  <img
                    key={itemIndex}
                    src={item.src}
                    alt={item.alt}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            )}
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectGallery.tsx
git commit -m "feat: add ProjectGallery with cinematic strip layouts"
```

---

### Task 6: Create ProjectNav Component (Next/Prev)

**Files:**
- Create: `src/components/ProjectNav.tsx`

- [ ] **Step 1: Create the next/prev navigation component**

```tsx
// src/components/ProjectNav.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import type { Project } from "@/data/projects";

interface ProjectNavProps {
  prev: Project;
  next: Project;
}

export default function ProjectNav({ prev, next }: ProjectNavProps) {
  return (
    <section className="bg-charcoal" data-theme="dark">
      <div className="border-t border-cream/10">
        <div className="grid grid-cols-2">
          {/* Previous */}
          <Link
            href={`/work/${prev.slug}`}
            className="group relative overflow-hidden border-r border-cream/10"
          >
            <AnimatedSection direction="left">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={prev.cardImage}
                  alt={prev.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 py-8">
                  <p className="text-cream/30 text-[10px] tracking-[0.3em] uppercase mb-2">
                    Previous
                  </p>
                  <p className="text-cream/80 group-hover:text-cream font-heading text-lg md:text-2xl font-medium tracking-tight transition-colors duration-300">
                    {prev.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </Link>

          {/* Next */}
          <Link
            href={`/work/${next.slug}`}
            className="group relative overflow-hidden"
          >
            <AnimatedSection direction="right">
              <div className="relative aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={next.cardImage}
                  alt={next.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-charcoal/80 to-transparent" />
                <div className="relative z-10 flex flex-col justify-center items-end h-full px-6 md:px-12 py-8 text-right">
                  <p className="text-cream/30 text-[10px] tracking-[0.3em] uppercase mb-2">
                    Next
                  </p>
                  <p className="text-cream/80 group-hover:text-cream font-heading text-lg md:text-2xl font-medium tracking-tight transition-colors duration-300">
                    {next.title}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ProjectNav.tsx
git commit -m "feat: add ProjectNav with next/prev project links"
```

---

### Task 7: Create the Project Detail Page Route

**Files:**
- Create: `src/app/work/[slug]/page.tsx`

- [ ] **Step 1: Create the dynamic route page**

Note: Since the entire site uses `ssr: false` via dynamic import, and the page needs `generateStaticParams` for static export, we use an async server component that dynamically imports a client component.

```tsx
// src/app/work/[slug]/page.tsx
import dynamic from "next/dynamic";
import { projects } from "@/data/projects";

const ProjectPageClient = dynamic(() => import("./ProjectPageClient"), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-[#181919]" />,
});

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectPageClient slug={slug} />;
}
```

- [ ] **Step 2: Create the client component**

```tsx
// src/app/work/[slug]/ProjectPageClient.tsx
"use client";

import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";
import ProjectInfo from "@/components/ProjectInfo";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectNav from "@/components/ProjectNav";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import SideMargins from "@/components/SideMargins";
import GridOverlay from "@/components/GridOverlay";
import SmoothScroll from "@/components/SmoothScroll";

interface ProjectPageClientProps {
  slug: string;
}

export default function ProjectPageClient({ slug }: ProjectPageClientProps) {
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="h-screen w-full bg-charcoal flex items-center justify-center">
        <p className="text-cream/60 font-body">Project not found</p>
      </div>
    );
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <SmoothScroll>
      <CustomCursor />
      <GridOverlay />
      <SideMargins />
      <Navbar />

      <main>
        <ProjectHero project={project} />
        <ProjectInfo project={project} />
        <ProjectGallery gallery={project.gallery} />
        <ProjectNav prev={prev} next={next} />
      </main>
    </SmoothScroll>
  );
}
```

- [ ] **Step 3: Verify the page builds**

Run: `cd /Users/delucia/Projects/diamond-view && npm run build 2>&1 | tail -30`
Expected: Build succeeds, `/work/massey-minis` and other slug pages are listed in the output.

- [ ] **Step 4: Verify in dev server**

Run: `cd /Users/delucia/Projects/diamond-view && npm run dev`
Navigate to `http://localhost:3000/work/massey-minis`
Expected: Page renders with hero image, project info section, gallery, and next/prev nav.

- [ ] **Step 5: Commit**

```bash
git add src/app/work/[slug]/page.tsx src/app/work/[slug]/ProjectPageClient.tsx
git commit -m "feat: add project detail page route with all sections"
```

---

### Task 8: Update Navbar for Project Pages

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Add project page detection and back navigation**

Update Navbar to detect when it's on a project page and show a back arrow + project title instead of section links. Use `window.location.pathname` to detect.

Add to the top of the `Navbar` component, after the existing state declarations:

```tsx
const [isProjectPage, setIsProjectPage] = useState(false);
const [projectTitle, setProjectTitle] = useState("");

useEffect(() => {
  const path = window.location.pathname.replace("/diamond-view", "");
  if (path.startsWith("/work/")) {
    setIsProjectPage(true);
    // Extract project title from the page's h1
    const h1 = document.querySelector("h1");
    if (h1) setProjectTitle(h1.textContent || "");
  }
}, []);
```

Then wrap the desktop nav links in a conditional:

```tsx
{/* Desktop links + CTA */}
<div className="hidden md:flex items-center gap-10">
  {isProjectPage ? (
    <a
      href={`${BASE}/`}
      className={`text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${textMuted} hover:${textColor}`}
    >
      &larr; Back to Work
    </a>
  ) : (
    <>
      {navLinks.map((link) => {
        const sectionId = link.href.replace("#", "");
        const isActive = activeSection === sectionId;

        return (
          <a
            key={link.label}
            href={link.href}
            className={`relative text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 ${
              isActive
                ? scrolled
                  ? "text-charcoal"
                  : "text-cream"
                : scrolled
                ? "text-charcoal/60"
                : "text-cream/60"
            }`}
          >
            {link.label}
            <span
              className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                scrolled ? "bg-charcoal" : "bg-cream"
              } ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}`}
            />
          </a>
        );
      })}

      <a
        href="#contact"
        className={`text-[11px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-500 ${
          scrolled
            ? "text-charcoal border-charcoal/20 hover:bg-charcoal hover:text-cream"
            : "text-cream border-cream/25 hover:bg-cream hover:text-charcoal"
        }`}
      >
        Let&apos;s Talk
      </a>
    </>
  )}
</div>
```

Also update the mobile menu to show "Back to Work" when on a project page — replace the first nav link with the back link when `isProjectPage` is true.

- [ ] **Step 2: Add BASE import to Navbar**

Add at the top of Navbar.tsx:

```ts
const BASE = process.env.NODE_ENV === "production" ? "/diamond-view" : "";
```

- [ ] **Step 3: Verify navbar behavior on both pages**

Run dev server. Check:
- Homepage: normal section links display
- `/work/massey-minis`: "Back to Work" link displays, navigates back to homepage

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: adapt navbar for project pages with back navigation"
```

---

### Task 9: Add AnimatePresence + LayoutGroup for Transitions

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/PageTransition.tsx`

- [ ] **Step 1: Create a client-side transition wrapper**

Since `layout.tsx` is a server component and Framer Motion needs client context:

```tsx
// src/components/PageTransition.tsx
"use client";

import { LayoutGroup } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
```

- [ ] **Step 2: Wrap layout.tsx body content with PageTransition**

Update `layout.tsx`:

```tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

// ... font declarations stay the same ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ownersWide.variable} ${owners.variable} antialiased`}
    >
      <body>
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify the morph transition works**

Run dev server. Click a portfolio card on the homepage. The card image should morph/scale into the full-viewport hero on the detail page.

Note: `layoutId` transitions in Next.js App Router with static export may not produce the full morph effect since pages are separate HTML files. If the morph doesn't work smoothly, the `layoutId` props still serve as semantic markers and the page loads with a clean fade via the existing Framer Motion entry animations. This is the graceful fallback described in the spec.

- [ ] **Step 4: Commit**

```bash
git add src/components/PageTransition.tsx src/app/layout.tsx
git commit -m "feat: add LayoutGroup wrapper for page transitions"
```

---

### Task 10: Build Verification + Final Polish

**Files:**
- No new files — verification pass

- [ ] **Step 1: Run full build**

Run: `cd /Users/delucia/Projects/diamond-view && npm run build 2>&1 | tail -40`
Expected: Clean build with all `/work/[slug]` pages generated in the `out/` directory.

- [ ] **Step 2: Verify static export generated all pages**

Run: `ls -la /Users/delucia/Projects/diamond-view/out/work/`
Expected: Directories for each slug: `massey-minis/`, `reliaquest/`, `publix-back-to-school/`, `barr-sccu/`, `barr-massey-services/`, `adidas-bleacher-report/`

- [ ] **Step 3: Test in dev server — full flow**

Run: `cd /Users/delucia/Projects/diamond-view && npm run dev`

Check each of these:
1. Homepage loads, portfolio cards display with existing effects
2. Clicking a card navigates to `/work/[slug]`
3. Project page shows: hero (full-width), info section (tagline, summary, tags), gallery (cinematic strips), next/prev nav
4. Next/prev links navigate between projects correctly (wraps around)
5. Navbar shows "Back to Work" on project pages
6. Back link returns to homepage
7. Custom cursor, side margins, grid overlay work on project pages

- [ ] **Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: polish project detail pages after verification"
```

Only commit this if fixes were needed. Skip if everything passed clean.
