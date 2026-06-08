# Diamond View — CMS & Architecture Reference for Designers

> Single source of truth for designers (Claude design, Figma collaborators, freelancers)
> working on the Diamond View site. Explains how content flows from the Sanity CMS into
> the live Next.js + Vercel app, what's editor-managed vs. static, and how to design
> layouts that accommodate the real data shapes.

---

## TL;DR

| Layer | Stack |
|---|---|
| **Site** | Next.js 16 + React 19 + Tailwind 4 + TypeScript |
| **Host** | Vercel (Node 24.x, Turbopack bundler) |
| **CMS** | Sanity (project `mytelucw`, dataset `production`) |
| **Studio** | Embedded at `https://diamond-view-site.vercel.app/studio` |
| **Production URL** | `https://diamond-view-site.vercel.app` |
| **Editorial cycle** | Editor publishes → webhook → site cache invalidates → live within ~2 seconds (no redeploy needed) |

Design implication: **content is genuinely live and editor-managed**. Designs must
accommodate variability — projects added/removed weekly, image aspect ratios that vary
per upload, hero media that may be image / video / Vimeo embed.

---

## Brand context

| Token | Value |
|---|---|
| Primary dark | `#1a1a1a` (charcoal) |
| Primary light | `#e5e5e3` (avalanche) |
| Accent | `#a9a094`-ish (taupe) — also `taupe-light` on dark backgrounds |
| Display type | **Owners Wide** — premium editorial sans for headlines |
| Body type | **Owners** — same family, regular width |
| Tone | Cinematic, calm, editorial. Reference: Stink Studios, Pentagram, Frog, Linear |

---

## Infrastructure & Editorial Workflow

### 1. Sanity (the CMS)

- Hosts all editor-managed content: projects, team members, services, site settings.
- Schemas are **code-defined** (in `src/sanity/schema/`) — adding/removing fields
  requires a code change + redeploy. Editing values is no-code via Studio.
- Studio runs embedded inside the Next.js app at `/studio` (catch-all route). One auth
  surface, no separate dashboard.

### 2. Vercel (the host)

- Auto-deploys on every push to `main` (~1 minute).
- Edge-cached static assets, serverless functions for routes that need them.
- **Cloud-edit workflow**: there is no local dev server in routine use — edits go
  edit → commit → push → Vercel deploys → verify in prod.

### 3. Cache + freshness

- Every Sanity query is wrapped with `next: { tags: [...], revalidate: 3600 }`.
- A Sanity webhook hits `/api/revalidate` on publish, which calls `revalidateTag()`
  with the relevant content type's tag.
- Result: editor publishes a project edit → tag invalidates → next request gets
  fresh data → page updates **within ~2 seconds**, no rebuild required.
- Design implication: no need to design "data freshness" affordances (last-updated
  timestamps, refresh buttons, etc.). Content is live.

---

## Content vs. Static Split

| Location | What lives here | Editor-managed? |
|---|---|---|
| **Sanity** | Projects, team members, services, site settings (demo reel + poster) | Yes — via Studio |
| **`public/` in repo** | Brand wordmarks, 46 client logos, hero photography, fonts | No — code deploy |

If a designer needs new editor-managed content, it goes in Sanity (new schema field
or new document type). If it's a permanent brand asset, it goes in `public/`.

---

## Route → Data Mapping

| Route | Data source | Notes |
|---|---|---|
| `/` (home) | SiteSettings (demo reel) + first 6 Projects by `order` | Animated home carousel uses the same Project shape as `/work` |
| `/work` | All Projects, ordered by `order asc` | Grid/list of every project |
| `/work/<slug>` | Single Project + prev/next adjacent projects | Full case study layout |
| `/team` | All TeamMembers, ordered by `order asc` | Team roster |
| `/clients` | `/public/clients.json` (static manifest) | Internal reference page (noindex) |
| `/studio` | Sanity Studio (embedded) | Editor surface |
| `/api/revalidate` | Webhook receiver | Sanity → Next cache invalidation |

---

## Content Type Contracts

### Project — the work pages (most detail)

Every project document in Sanity carries these fields:

| Field | Type | Notes |
|---|---|---|
| `slug` | string | URL-safe ID (e.g. `tampa-bay-lightning-launch`) |
| `title` | string | Project name |
| `category` | enum | `Campaign` \| `Commercial` \| `Branded Content` \| `Sports / Entertainment` \| `Music Video` \| `Short Film` \| `VFX` |
| `year` | string | **Kept in CMS but intentionally NOT rendered on site** |
| `client` | string | e.g. "Tampa Bay Lightning" |
| `tagline` | string | Short, uppercase (e.g. "TINY TRUCKS. BIG IMPACT.") |
| `summary` | text | 2–3 sentence paragraph |
| `services[]` | string array | `Creative Development`, `Production`, `Post Production`, `Post Production + VFX`, `AI-Enhanced Workflows` |
| `heroType` | enum | `image` \| `video` |
| `heroImage` | image | Also serves as poster for video heroes |
| `heroVideo` | URL | When `heroType = "video"` |
| `vimeoId` | string | When set, overrides everything else — hero becomes Vimeo embed |
| `vimeoHash` | string | `h=` param for unlisted Vimeo videos |
| `cardImage` | image | Thumbnail for grid + carousel views |
| `gallery[]` | array | Each item: `{ image, alt, layout: "full" | "half" }` |
| `order` | number | Manual curation; lower = earlier |

#### Hero media — 3 types your design must support

In priority order:

1. **Vimeo embed** — when `vimeoId` is set, hero is an `<iframe>` Vimeo player (16:9 default).
2. **Hosted video** — when `heroType = "video"` and `heroVideo` is set, an HTML5 `<video>` plays with `heroImage` as poster.
3. **Static image** — when `heroType = "image"`, the `heroImage` is shown directly.

No fixed aspect ratio across the three. Design fluid hero containers — don't lock to a single ratio.

#### Gallery — authored, not normalized

Each gallery item carries its own `layout` value chosen by the editor:

- `"full"` → spans full container width
- `"half"` → pairs with the next `"half"` item to share a row

Items render in CMS-authored order. The full/half pattern is an **editorial rhythm decision**
(pacing, emphasis, breathing room). Honor it — don't flatten everything to a uniform grid.

---

### TeamMember

| Field | Type | Notes |
|---|---|---|
| `name` | string | Full name |
| `role` | string | Title (e.g. "Director of Photography") |
| `wideImage` | image | Wide/landscape headshot variant |
| `closeImage` | image | Close-up/portrait variant |
| `order` | number | Manual display order |

Design implication: each team member has **two** image variants — could be used
for a parallax effect, hover swap, mobile vs desktop, or grid-vs-detail.

---

### Service

| Field | Type | Notes |
|---|---|---|
| `number` | string | e.g. "01", "02" |
| `title` | string | Service name |
| `description` | string | Sentence describing it |
| `tags[]` | string array | Sub-capabilities |
| `order` | number | Manual display order |

> **Note:** the home page currently uses a hardcoded `services` array in
> `HomeClient.tsx`, not the Sanity-managed Service docs. A future task is
> to wire the schema in. Designs can assume Service data is available.

---

### SiteSettings (singleton)

A single document, ID `siteSettings`. Currently small:

| Field | Type | Notes |
|---|---|---|
| `demoReel` | file | The hero/header video (currently overrides the static `/video/demo-reel.mp4`) |
| `demoReelPoster` | image | Poster frame for the demo reel |

Designed to grow. Common additions to plan for: contact email, social URLs, hero copy,
intro statement, footer tagline, SEO defaults.

---

## Image URL Convention (Sanity CDN)

All Sanity image URLs follow this pattern:

```
https://cdn.sanity.io/images/mytelucw/production/<assetId>.<ext>?auto=format&w=<width>
```

| Param | Purpose |
|---|---|
| `auto=format` | Serves AVIF/WebP automatically based on browser support |
| `w=<width>` | Server-side resize (also triggers EXIF orientation correction) |

Widths currently used in the site: `2400` (hero), `2000` (gallery), `1600` (card thumbnail).
Any width works; Sanity scales server-side. Don't worry about asset weight — the pipeline handles it.

---

## Static Assets (in `public/`)

These are NOT editor-managed. Changing them requires a code deploy.

### Client logos

- Location: `public/images/clients/<slug>-logo.png`
- 46 monochrome black-on-transparent PNGs
- Visual gallery: `https://diamond-view-site.vercel.app/clients`
- Manifest (JSON list with name + slug + logo path): `https://diamond-view-site.vercel.app/clients.json`
- **Recoloring**: use CSS `mask-image` (NOT `<img>`):
  ```css
  .client-logo {
    width: 120px;
    height: 32px;
    mask: url('/images/clients/adidas-logo.png') center/contain no-repeat;
    -webkit-mask: url('/images/clients/adidas-logo.png') center/contain no-repeat;
    background-color: currentColor;
    color: #a9a094; /* taupe */
  }
  ```

### Brand marks

- Location: `public/images/brand/`
- Includes: DV wordmark (light + dark variants), "Feeling in Motion" stacked mark,
  inline wordmark, lockup variants
- All SVG, scale freely

### Photography

- Location: `public/images/{splash,bts,team,generated}/`
- Source imagery for the hero, behind-the-scenes interstitials, etc.
- (Team photos are also in Sanity — the `public/team/` set is legacy and slated for removal.)

---

## Live Data Sources

### Visual reference (live pages, hydrated from Sanity)

| Page | URL |
|---|---|
| Home | `https://diamond-view-site.vercel.app/` |
| Work index | `https://diamond-view-site.vercel.app/work` |
| Project detail | `https://diamond-view-site.vercel.app/work/<slug>` |
| Team | `https://diamond-view-site.vercel.app/team` |
| Clients gallery | `https://diamond-view-site.vercel.app/clients` |
| Studio | `https://diamond-view-site.vercel.app/studio` |

### Structured data (raw Sanity GROQ API — no auth needed)

All projects, full shape (matches the site's internal projection):

```
https://mytelucw.api.sanity.io/v2025-05-01/data/query/production?query=*[_type=="project"]|order(order asc){"slug":slug.current,title,category,client,tagline,summary,services,heroType,vimeoId,vimeoHash,"heroSrc":coalesce(heroVideo,heroImage.asset->url+"?auto=format&w=2400"),"heroPoster":heroImage.asset->url+"?auto=format&w=2400","cardImage":cardImage.asset->url+"?auto=format&w=1600",gallery[]{"src":image.asset->url+"?auto=format&w=2000",alt,layout}}
```

Team members:

```
https://mytelucw.api.sanity.io/v2025-05-01/data/query/production?query=*[_type=="teamMember"]|order(order asc){name,role,"wideImage":wideImage.asset->url+"?auto=format&w=1600","closeImage":closeImage.asset->url+"?auto=format&w=1200"}
```

Services:

```
https://mytelucw.api.sanity.io/v2025-05-01/data/query/production?query=*[_type=="service"]|order(order asc){number,title,description,tags}
```

> All GROQ responses wrap in `{ result: [...], ms, query }` — read the `result` key.

### Static manifest (client logos)

```
https://diamond-view-site.vercel.app/clients.json
```

Returns: `[{ name, slug, logo }, ...]` for all 46 client logos.

---

## What This Means for Your Design

1. **Don't hardcode counts.** The work index might have 10 projects today, 60 next quarter. Same for team (currently small, will scale).
2. **Hero must handle 3 media types.** Image, video, Vimeo iframe. No locked aspect ratio.
3. **Galleries are authored.** Preserve full/half intent from the CMS, don't normalize.
4. **Image aspects vary.** Components must be flexible to 16:9, 4:3, 3:2, square, vertical.
5. **Year is in CMS but NOT rendered.** Intentional — don't add it back.
6. **Field names are load-bearing.** `slug`, `title`, `cardImage`, `heroSrc`, `heroPoster`, `gallery`, `tagline`, `summary`, `services[]`, `vimeoId`, `vimeoHash` — keep these exact names in design specs so deployment wires cleanly.
7. **Adding NEW fields is fine.** Want a `press` array, `awards`, `roleCredits`, `launchDate`? Flag them in your design and the schema can be extended on the Claude Code (deployment) side.
8. **Renaming fields is expensive.** Avoid unless there's a real reason — every rename requires a Sanity migration script + a code change.
9. **Editorial control matters.** If a piece of content (services list, stats, hero copy, intro statement) is going to change quarterly, design with it living in Sanity in mind. If it's frozen brand language, hardcoded is fine.

---

## Handoff Back to Claude Code (deployment)

When your design is done and ready to wire up, deliver:

1. **The visual design** — Figma, screens, prototypes, whatever fidelity you have.
2. **Component breakdown** — which design components map to which routes/sections.
3. **New fields wanted** — list any Sanity schema additions you're assuming.
4. **Asset list** — any new brand assets (icons, marks, photography) that need to land in `public/`.
5. **Motion/interaction notes** — animations, scroll behaviors, hover states. The current site uses GSAP + Framer Motion + Lenis; new patterns can use any of these.

Claude Code will then:

- Update the Sanity schemas (if new fields)
- Refactor the page components against the existing fetch layer (`getProjects()`, `getTeamMembers()`, `getServices()`, `getSiteSettings()`)
- Drop in new components matching the design
- Push to `main` → Vercel auto-deploys → verify on production URL

---

## Reference: Sanity Studio access

- URL: `https://diamond-view-site.vercel.app/studio`
- Auth: Sanity SSO (Google/GitHub/email tied to the `mytelucw` project)
- Editor view: left nav shows document types (Site Settings is pinned at top as a singleton; Project, Service, Team Member below)
- Publishing: edit fields → "Publish" (top right) → live in ~2 seconds via webhook

---

*Last updated: 2026-06-07. Maintained alongside the codebase — if the data contracts change, this doc changes with them.*
