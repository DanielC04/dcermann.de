# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Astro dev server (exposed on all interfaces)
npm run build    # Build static site to dist/
npm run preview  # Preview the production build locally
```

## Stack

**Astro 5** · TypeScript · SCSS (via `sass`) · fully static output (`output: 'static'`).

No React. No SSR. No i18n framework. Interactive elements (theme toggle, reading list filters, topic map, reading activity) are implemented with vanilla JS in Astro `<script>` blocks (processed by Vite, supports imports and TypeScript).

## Project structure

```
src/
  content/
    config.ts              # Astro content collection schema (papers)
  data/                    # Typed TypeScript data — projects, skills, experience, site info
  layouts/
    BaseLayout.astro       # HTML shell: meta/Open Graph tags, fonts, global SCSS, Header, Footer, scroll-reveal
  components/
    Header.astro           # Sticky top nav, theme toggle, hamburger
    Footer.astro           # Social links
    CVEntry.astro          # One experience entry on the home page
    ProjectCard.astro      # Card used on the (hidden) projects page
    ReadingActivity.astro  # Weekly reading heatmap on /papers; hover box with clickable titles
    ReadingList.astro      # Reading list: search, status/type/topic/tag filters, sort, URL state
    ReadingItem.astro      # One reading-list entry (filter data on data-* attributes)
    TopicMap.astro         # Topic network + interest bars on /papers; draggable, linked to ReadingList via DOM events
  pages/
    index.astro            # Home: CV-style landing page
    papers/
      index.astro          # Reading list page
      [slug].astro         # Paper detail/notes page (only for papers with a body)
    _projects.astro        # Project grid — hidden for now (`_` = not routed); see below
  styles/
    global.scss            # Theme vars, base styles, section h2, scroll-reveal, prose
  utils/
    topicLayout.ts         # d3-force layout shared by TopicMap's build pass and live drag
    url.ts                 # url() helper — prefixes paths with BASE_URL for GitHub Pages
  assets/images/           # Optimised by astro:assets: profile photo, logos/, projects/
public/
  dc-logo.svg              # Favicon + manifest icon
  cv_daniel_cermann.pdf
```

Image paths in `src/data/*.ts` (`/images/logos/…`, `/images/projects/…`) are mapped to
`src/assets/images/…` by the components via `import.meta.glob`; there is no
`public/images/` copy.

**Projects are hidden** (outdated). To restore: set `showProjects = true` in
`src/pages/index.astro`, uncomment the Projects entry in `Header.astro`, and rename
`src/pages/_projects.astro` back to `projects.astro`.

## Data layer

All site content lives in `src/data/` as plain TypeScript files with exported typed arrays:

| File | Export | Used in |
|------|--------|---------|
| `site.ts` | `siteInfo` | Header, Footer, Home |
| `projects.ts` | `projects: Project[]` | Home + projects page (both hidden) |
| `skills.ts` | `skillCategories: SkillCategory[]` | Home sidebar (spoken languages only) |
| `experience.ts` | `experiences: ExperienceItem[]` | Home |
| `topics.ts` | `topics`, `topicGroups`, `tagToTopic`, `knownTags`, `statusWeight`, `minorTopicIds` | `/papers` (TopicMap, ReadingList chips) |

Papers are **generated from Obsidian notes** (Notes vault, `reading_sync/main.py sync`).
Files with `source: "obsidian"` are owned by that sync: edit the vault note, not the file,
or the next sync overwrites it. Only frontmatter metadata and text between
`<!-- public -->` / `<!-- /public -->` in the note are published. Hand-written files
without `source` are left alone.

Paper tags are a closed vocabulary: `src/content/config.ts` rejects any tag not in
`tagToTopic`, so a new tag must be mapped in `topics.ts` first. Set
`dateReadApprox: true` on backfilled entries whose `dateRead` is only the date they
were added; they are excluded from the reading-activity heatmap and streaks.

`/papers` layout: one grid, page order intro → ReadingActivity → ReadingList → TopicMap
(desktop: list left, activity + sticky map right). TopicMap draws every paper as a dot
up to `DETAIL_LIMIT` (75) entries, above that a topic overview that reveals a topic's
papers on selection. Topics with fewer than `MIN_TOPIC_ENTRIES` (4) entries are folded
into one "Other" topic on the map, which also works as a list filter (`?topic=other`).

## Theming

Color theme is toggled via `data-theme` attribute on `<body>` (values: `"dark"` | `"light"`). CSS custom properties (`--background-color`, `--text-color`, `--contrast-color`, `--background-color-1/2`) are defined in `src/styles/global.scss`. The active theme is persisted in `localStorage` under the key `"theme"` and read by an `is:inline` script in `BaseLayout.astro` to prevent flash.

## Base path / GitHub Pages sub-path

The site is served from `https://danielc04.github.io/dcermann.de/`. Astro's `base`
is set to `process.env.BASE_PATH` (injected by `actions/configure-pages` in CI) and
falls back to `/` for local dev.

**All internal links and `public/` asset references must use the `url()` helper** from
`src/utils/url.ts`, which prepends `import.meta.env.BASE_URL`:

```ts
import { url } from '../utils/url';
// <a href={url('/papers')}>  →  /dcermann.de/papers  (CI)  or  /papers  (local)
// <img src={url('/images/foo.jpg')}>
```

Do not use bare `/...` strings for any internal link or public asset — they will break
on GitHub Pages.

## CI/CD

`.github/workflows/main_dcermann.yml` — triggers on push to `main`:
1. Runs `npm ci` and `npm run build` (Astro static build)
2. Uploads `dist/` via `actions/upload-pages-artifact`
3. Deploys to GitHub Pages via `actions/deploy-pages`

**One-time repo setup required:**
- Go to *Settings → Pages* and set Source to **GitHub Actions**

The workflow uses the built-in `GITHUB_TOKEN` for Pages deployment — no additional credentials needed.
