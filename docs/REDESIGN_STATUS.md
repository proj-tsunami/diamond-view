# Diamond View — Redesign Status & Pickup Notes

_Last updated: 2026-06-08 • Branch: `main` (redesign is now live in production)_

Working doc for the site redesign. Read this to recall where things stand and what's next.

---

## TL;DR — Current State

- **Redesign is live.** `redesign/claude-2026` was merged to `main` and pushed on 2026-06-08.
- **Production URL** = the main Vercel deployment (connected to `main`).
- **Backup** at branch `backup/live-2026-06-07` + tag `pre-redesign-2026-06-07` (commit `8c33514`). Both exist on remote.
- **Fine-tuning continues on `main`** (or a new feature branch — small changes can go direct to main).
- Dev locally: `npm run dev` → `http://localhost:3000`.

---

## Architecture

| Concern | Where |
|---|---|
| Prototype tokens (fonts, colors, spacing) | `src/app/redesign-css/_tokens.css` |
| Component CSS | `src/app/redesign-css/_components.css` |
| Site CSS (art-direction, per-section dark/light, sheet/sticky-hero) | `src/app/redesign-css/_site.css` |
| Scroll engine + primitives (Lenis ↔ GSAP ScrollTrigger, parallax, reveal, Icon/Eyebrow/Drift) | `src/components/site/primitives.tsx` |
| Home sections + chrome | `src/components/site/*` |
| Home composition | `src/app/HomeClient.tsx` |
| Sub-pages (Sanity-wired) | `src/app/work/WorkPageClient.tsx`, `src/app/work/[slug]/ProjectPageClient.tsx`, `src/app/team/TeamPageClient.tsx` |

**Unified across the whole site:** one `Nav` + one `Footer` (`cta={false}` on sub-pages).
Data contract unchanged: `src/sanity/queries.ts` fetch layer + cache tags.

---

## Locked decisions

- **Footer mark:** `wordmark-fim-footer-left.svg` — left-justified dark-ink lockup on cream footer
- **Nav brand:** `wordmark-inline_noaccent__primary-dark` — wordmark only, no tagline
- **Nav order:** Studio → Capabilities → Work → Process (sub-pages route to `/#section`)
- **Side rails:** film-gate (line + ticks + scroll dot/percent) blended with parallax vertical text rulers
- **Showreel:** DV 2026 reel on Vimeo (`1191542036?h=aecf929b97`) via `ReelModal` iframe
- **Est. date:** 2007 (SideRails + MakersTeam eyebrow)
- **Makers eyebrow:** "Tampa, FL · Est. 2007" (removed "The Makers ·" prefix)
- **Stats:** 3K+ / 10K+ — number+K charcoal, + sign in taupe accent
- **Footer capabilities:** Creative Development / Production / Post Production + VFX / AI Integration
- **Footer contact:** `info@diamondviewstudios.com` + `careers@diamondviewstudios.com`
- **Footer address:** 1616 E. Bearss Ave, Tampa FL 33613 · 813.972.5400 · 800.613.9693
- **Hero recede:** capped at `p * 0.7` (30% max dim, 5% max scale reduction)
- **Work rail lerp:** 0.08 (cinematic drag)
- **Native cursor** (custom cursor removed)

---

## Fine-tuning to pick up

These are known items — not blocking, just pending feel/polish passes:

1. **ContactModal backend** — form currently shows UI only; needs email/endpoint wired up
2. **Statement word-reveal timing** — scroll speed vs. word opacity cadence still to dial in
3. **Page transitions** — route changes are instant; could add a subtle fade/slide
4. **Virtual Production capability** — discussed as a 5th capability card (currently 4)
5. **StatsBand copy** — "Countries visited" stat placeholder; confirm final copy with Kevin
6. **Motion polish** — Lenis weight, marquee timing, card hover tuning by feel in the browser

---

## Rollback

If production needs to roll back to the pre-redesign site:

```bash
git checkout main
git reset --hard backup/live-2026-06-07
git push origin main --force
```

Or via Vercel dashboard: redeploy the commit `8c33514`.

---

## Session commit log (newest first — full history on `main`)

```
5ea6b94 feat: promote redesign/claude-2026 to production (merge commit)
a8d5295 fix(redesign): sweep — remove stale BareFooter duplicates, fix emails
2da4264 fix(redesign): est. date 2010 → 2007, remove The Makers from eyebrow label
54ce358 polish(redesign): stat suffix — number+K charcoal, + sign accent
b795195 fix(redesign): sync footer capabilities with capabilities section
d5e7caf polish(redesign): stats 3,000+ → 3K+, 10,000+ → 10K+
94e4281 polish(redesign): footer rule + slider play button removal
b0f8d28 polish(redesign): full-width section separators in footer
8465eed polish(redesign): brand-styled address, remove redundant Tampa tag
ac652d5 feat(redesign): footer layout + contact info update
69496ff polish(redesign): motion tuning pass 1
5526bf1 chore(redesign): delete all legacy components + dead code
414c87a docs(redesign): add REDESIGN_STATUS pickup notes
... (earlier design port commits on redesign/claude-2026)
```
