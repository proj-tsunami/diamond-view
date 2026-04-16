# Diamond View Site — Project State

> Operational reference for AI agents and future maintainers. Captures live URLs, env vars, integrations, and the build/deploy/cache ritual. Keep this current as the source of truth.

## Live URLs

| Surface | URL |
|---|---|
| Production | https://diamond-view-site.vercel.app |
| Studio (embedded) | https://diamond-view-site.vercel.app/studio |
| Webhook revalidation | https://diamond-view-site.vercel.app/api/revalidate (POST, signed) |
| GitHub | https://github.com/proj-tsunami/diamond-view |

## Workflow

This site is **edited live in the cloud**, not locally. There is no local dev server. The deploy/iterate loop is:

1. Edit code (in any tool)
2. `git add … && git commit -m "…" && git push`
3. Vercel auto-builds and deploys (~1 min)
4. Verify at the production URL

**Implication:** every meaningful change must be pushed promptly to be visible. Uncommitted work is invisible to the user.

## Vercel

- Project: `diamond-view-site`
- Org: `proj-tsunamis-projects`
- Settings: https://vercel.com/proj-tsunamis-projects/diamond-view-site/settings
- Env var dashboard: …/settings/environment-variables

### Required env vars (Production, Preview, Development)

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project (`mytelucw`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (`production`) |
| `SANITY_REVALIDATE_SECRET` | 64-char hex; must equal Sanity webhook secret |

### `.vercelignore`

Excludes `.next`, `node_modules`, `.git`, `.DS_Store`, `DV_Brand_Media`, `Troubleshooting`, `docs`. Without this, `vercel` tries to upload Turbopack's `.next/dev` cache (~600MB+), failing with `File size > 2 GiB`.

## Sanity

- Project: `mytelucw`, Dataset: `production`, API version: `2025-05-01`
- Manage: https://www.sanity.io/manage/project/mytelucw
- Schemas: `src/sanity/schema/` — `project`, `service`, `teamMember`
- Studio is embedded at `/studio` (catch-all route in `src/app/studio/[[...tool]]/page.tsx`). Schema changes require a Vercel redeploy to surface in Studio.

### Webhook → Next cache invalidation

| Field | Value |
|---|---|
| URL | `https://diamond-view-site.vercel.app/api/revalidate` |
| Filter | `_type in ["project", "service"]` |
| Projection | `{ _type, "slug": slug.current }` |
| Method | POST |
| Secret | matches `SANITY_REVALIDATE_SECRET` |

The route (`src/app/api/revalidate/route.ts`) verifies the signature via `next-sanity/webhook` `parseBody` and calls `revalidateTag(tag, "max")` for `<type>` and `<type>:<slug>` tags. Publishing a doc propagates to live within ~2 seconds — no redeploy.

### Adding a doc type to revalidation

1. Add it to the `_type in [...]` filter in the Sanity webhook
2. Tag your fetches with that type via the `sanityFetch` helper

## Cache layer

`src/sanity/queries.ts` wraps every query with:

```ts
async function sanityFetch<T>(query, params, { tags }: { tags: string[] }) {
  return client.fetch<T>(query, params, { next: { tags, revalidate: 3600 } });
}
```

Tags currently in use: `project`, `project:<slug>`, `service`, `teamMember`. Background revalidate at 1h; the webhook short-circuits this on publish.

**Do not enable** `experimental.cacheComponents` in `next.config.ts` without a dedicated migration — it forces every page to declare cache boundaries explicitly and will break dynamic routes mid-deploy. Migration to the `'use cache'` directive is a future task.

## Migrations

One-shot data migration scripts live in `scripts/`:

| Script | Purpose |
|---|---|
| `seed-sanity.mjs` | Seed placeholder projects from BTS imagery |
| `migrate-team.mjs` | Upload team images + create `teamMember` docs from `src/data/team.ts` |
| `import-framegrabs.mjs` | Bulk-import frame grabs as project gallery items |
| `update-vimeo.mjs` | Backfill Vimeo IDs onto existing projects |
| `fix-bts-orientation.mjs` | EXIF/orientation fixup for BTS photos |

Run pattern (token never committed):

```bash
export SANITY_TOKEN="…editor-token…"
node scripts/<script>.mjs
```

Get a token at https://www.sanity.io/manage/project/mytelucw/api/tokens (Editor permissions).

## Next.js gotchas

- This is **Next 16** — has breaking changes vs. training data. See `AGENTS.md` and `node_modules/next/dist/docs/` before writing Next-specific code.
- `revalidateTag(tag)` (single-arg) is **deprecated** — always pass a profile (`"max"` for immediate expiry, or a CacheLife string).
- `updateTag` only works inside Server Actions, not route handlers — webhooks must use `revalidateTag`.
- `unstable_cache` is effectively deprecated.

## Backups

Created snapshots after the major content/migration push (2026-04-16):

- Tag: `backup-2026-04-16`
- Branch: `backup/2026-04-16`

Roll back (destructive — confirm first):
```bash
git reset --hard backup-2026-04-16 && git push --force
```

Vercel also retains every prior deployment at its own immutable URL — instant rollback via the Deployments tab in the dashboard.

## Pending optimization backlog

Ordered by impact (from earlier deep-research):

1. **Demo reel hosting** — move `public/video/demo-reel.mp4` (18MB) into Sanity as `siteSettings.demoReel` so editors can swap it without a deploy.
2. **70MB image migration** — `public/images/{splash,bts}` to Sanity assets. Team imagery is already in Sanity; safe to delete `/public/images/team/` + `src/data/team.ts` after final verification.
3. **Video-scrub hero** — replace WebP frame-sequence canvas with scrubbed AV1/H.264 video (Apple-style). Frame sequences are only 900KB so this is performance polish.
4. **Adopt `vercel.ts`** — typed config for cache headers + region pinning.
5. **Contact form** — Resend (Vercel Marketplace) + BotID at `/api/contact`, `maxDuration = 15`.
6. **Font diet** — convert 10 `.otf` → `.woff2`, drop Light/Black weights to 3 per family.
7. **Bundle trimming** — `motion/react` + `LazyMotion` + `domAnimation` (saves ~25KB), tree-shake GSAP plugins, evaluate React Compiler.
