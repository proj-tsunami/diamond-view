# Diamond View — Redesign Status & Pickup Notes

_Last updated: 2026-06-08 • Branch: `redesign/claude-2026`_

Working doc for the site redesign. Pairs with `docs/PROJECT_STATE.md` (operational
source of truth). Read this to recall where the redesign is and what's next.

---

## TL;DR

- The site is being rebuilt as a **faithful 1:1 port of the Claude design prototype**
  (`Claude_Design/website/design_handoff_diamond_view_site`).
- All work is on **`redesign/claude-2026`** — **29 commits ahead of `main`**, ~11 committed
  locally and **not yet pushed** (we're iterating locally first, per Kevin).
- **`main` / production is untouched** and backed up at tag **`pre-redesign-2026-06-07`**.
- Dev locally: Node is at `C:\Program Files\nodejs` (prepend to PATH), `npm run dev` → `http://localhost:3000`.
- Verify before pushing: `npx tsc --noEmit` (the build does NOT lint-gate this Next variant).

### Working style
Build **locally** and keep iterating until "dialed in" — **hold the push**. When ready:
push the branch (Vercel auto-builds a preview) → review → **merge to `main`** for production.

---

## Architecture of the port

| Concern | Where |
|---|---|
| Prototype tokens (fonts remapped to next/font Owners; IBM Plex kept) | `src/app/redesign-css/_tokens.css` |
| Prototype components CSS | `src/app/redesign-css/_components.css` |
| Prototype site CSS (art-direction, per-section light/dark theme, `.wrap/.section/.reveal`, sheet/sticky-hero) | `src/app/redesign-css/_site.css` |
| Global import of the three above | `src/app/layout.tsx` |
| Scroll engine + primitives (Lenis ↔ GSAP ScrollTrigger, parallax, reveal, Icon/Eyebrow/Section/Drift/smoothTo) | `src/components/site/primitives.tsx` |
| Home sections + chrome | `src/components/site/*` (Nav, SideRails, Hero, MakersTeam, MakersSlider, Marquee, Statement, Capabilities, StatsBand, Showreel, Work, Process, Footer, ContactModal, ReelModal) |
| Home composition (App.jsx order, sticky hero + `.sheet`) | `src/app/HomeClient.tsx` |
| Re-ported pages (Sanity-wired) | `src/app/work/WorkPageClient.tsx`, `src/app/work/[slug]/ProjectPageClient.tsx`, `src/app/team/TeamPageClient.tsx` |

**Unified across the whole site:** one `Nav` (`src/components/site/Nav.tsx`) and one `Footer`
(`src/components/site/Footer.tsx`, `cta={false}` on sub-pages).

Data contract unchanged: existing `src/sanity/queries.ts` fetch layer + cache tags.

---

## Done

- ✅ Foundation: prototype CSS wired, fonts remapped, scroll engine/primitives ported.
- ✅ **Home** rebuilt to the prototype's exact order + dynamics (sticky hero recede + `.sheet`,
  smooth scroll, parallax, reveals, SideRails, BTS slider, showreel, pinned Work rail, Process pipeline).
- ✅ **Work / Project / Team** re-ported to the prototype DOM + `site.css`, wired to Sanity.
- ✅ Unified Nav + Footer everywhere.

### Decisions locked this session
- **Footer mark:** `wordmark-fim-footer-left.svg` — packaged left-justified **dark-ink** footer
  lockup (viewBox cropped to ink → flush-left). Other packaged site marks copied into
  `public/images/brand/logos/`: `wordmark-fim-footer`, `wordmark-fim-dark/light`, `fim-stacked-dark/light`.
- **Nav brand:** `wordmark-inline_noaccent__primary-dark` — wordmark only, **no tagline**.
- **Nav links** ordered to page flow: **Studio → Capabilities → Work → Process**
  (sub-pages route to `/#section`; CTA → `/#contact`, modal on home).
- **Buttons** compact: `.dv-btn` 7px 14px / 10px; `.nav__cta` 6px 13px / 9px; nav link text 10px.
- **Side rails:** film-gate (line + ticks + scroll dot/percent) **blended** with the prior site's
  parallax vertical **text rulers** (coordinates/disciplines/brand, Tampa). 10px inset; text +5px outward.
- **Makers section** ground = dark primary charcoal `#1a1a1a`.
- **Showreel/reel** = DV 2026 demo reel on **Vimeo** (`1191542036?h=aecf929b97`) via `ReelModal` iframe.
- **Native cursor** restored (custom-cursor system removed).
- **Motion:** Lenis ↔ ScrollTrigger synced; added `--ease-out` for smoother reveal settles.

---

## Next / pending

1. **Motion polish (in progress).** Reveal easing done. Levers left to tune by feel:
   Lenis weight, hero recede / sheet timing, work-rail scrub, card hovers (work/vault/crew),
   marquee + stats timing, route page transitions.
2. **Dead-code cleanup.** Now unused: `src/components/Navbar.tsx`, the pages' old `BareFooter`
   functions, `src/components/SelectedWorkRail.tsx`, and orphaned legacy home/motion components.
3. **Push** the branch for a Vercel preview once dialed in → review → **merge to `main`** (production).

---

## Session commit log (newest first)

```
c87f704 polish: smoother ease-out on scroll reveals
7f490f5 fix: unify nav across the whole site
a40823c tweak: smaller nav link text + smaller Start a Project button
4111d19 tweak: nav brand = wordmark only (drop tagline)
67da6f9 tweak: rails 10px inset, text 5px further out
ee98820 feat: nav order=page flow, compact buttons, inset rails, dynamic Process hover
8aaa7c6 fix: packaged left-justified footer mark (wordmark-fim-footer-left)
38cac49 fix: unify footer + left-justify brand mark across all pages
edd0893 feat: sync Lenis with GSAP ScrollTrigger in scroll engine
c150298 feat: blend side rails — film-gate + parallax text rulers
f345c90 fix: footer logo left-justified; showreel plays DV 2026 Vimeo
68b506f fix: footer mark = dark-ink left wordmark on cream footer
58b94d3 fix: restore native cursor
04b864e feat: faithful port of the Claude design (home + all pages)
f37a040 feat: port prototype scroll engine + primitives
7f00738 chore: wire prototype stylesheet (faithful-port foundation)
... (earlier: approximation-phase commits d50d021 → bc6d16a)
```
