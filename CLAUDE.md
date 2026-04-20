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

No React. No SSR. No i18n framework. Interactive elements (theme toggle, skill bars, contact form, Matrix Rain) are implemented with vanilla JS in Astro `<script>` blocks (processed by Vite, supports imports and TypeScript).

## Project structure

```
src/
  content/
    config.ts              # Astro content collection schema (blog)
    blog/                  # Markdown blog posts with typed frontmatter
  data/                    # Typed TypeScript data — projects, skills, experience, site info
  layouts/
    BaseLayout.astro       # HTML shell: fonts, global SCSS, Header, Footer, scroll-reveal
  components/
    Header.astro           # Sticky top nav, theme toggle, hamburger
    Footer.astro           # Social links
    MatrixRain.astro       # Canvas rain animation (about page banner)
    BlogPostCard.astro     # Card used on / and /blog
    ProjectCard.astro      # Card used on /projects
    SkillCategory.astro    # Proficiency bars, animated on scroll
    TimelineItem.astro     # Single experience entry
    ContactForm.astro      # EmailJS contact form (vanilla JS)
    ReadingList.astro      # Papers reading list with tag filter
  pages/
    index.astro            # Home: hero + latest posts
    blog/
      index.astro          # Blog post listing with tag filter
      [slug].astro         # Dynamic post page (SSG via getStaticPaths)
    papers/
      index.astro          # Reading list page
      [slug].astro         # Paper detail/notes page (only for papers with a body)
    projects.astro         # Project grid
    about.astro            # About / Skills / Experience / Contact
  styles/
    global.scss            # Theme vars, base styles, section h2, scroll-reveal, prose
  utils/
    url.ts                 # url() helper — prefixes paths with BASE_URL for GitHub Pages
public/
  dc-logo.svg
  images/
    myProfile.png
    projects/              # Project screenshots
    logos/                 # Company/institution logos for timeline
```

## Data layer

All site content lives in `src/data/` as plain TypeScript files with exported typed arrays:

| File | Export | Used in |
|------|--------|---------|
| `site.ts` | `siteInfo` | Header, Footer, About, Home |
| `projects.ts` | `projects: Project[]` | `/projects` |
| `skills.ts` | `skillCategories: SkillCategory[]` | `/about` |
| `experience.ts` | `experiences: ExperienceItem[]` | `/about` |

Blog posts are Markdown files in `src/content/blog/` with frontmatter:
```md
---
title: "Post title"
description: "One-sentence summary"
pubDate: 2026-01-15
tags: ["web", "astro"]
draft: false          # omit or set false to publish
---
```

## Theming

Color theme is toggled via `data-theme` attribute on `<body>` (values: `"dark"` | `"light"`). CSS custom properties (`--background-color`, `--text-color`, `--contrast-color`, `--background-color-1/2`) are defined in `src/styles/global.scss`. The active theme is persisted in `localStorage` under the key `"theme"` and read by an `is:inline` script in `BaseLayout.astro` to prevent flash.

## Contact form (EmailJS)

Credentials are loaded from environment variables (defined in a `.env` file, which is gitignored):

```
PUBLIC_EMAILJS_KEY=...
PUBLIC_EMAILJS_SERVICE=...
PUBLIC_EMAILJS_TEMPLATE=...
```

See `.env.example` for the template. The same variables are passed as GitHub Actions secrets in the CI workflow so EmailJS credentials are baked into the production build.

## Base path / GitHub Pages sub-path

The site is served from `https://danielc04.github.io/dcermann.de/`. Astro's `base`
is set to `process.env.BASE_PATH` (injected by `actions/configure-pages` in CI) and
falls back to `/` for local dev.

**All internal links and `public/` asset references must use the `url()` helper** from
`src/utils/url.ts`, which prepends `import.meta.env.BASE_URL`:

```ts
import { url } from '../utils/url';
// <a href={url('/blog')}>  →  /dcermann.de/blog  (CI)  or  /blog  (local)
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
- Add `PUBLIC_EMAILJS_KEY`, `PUBLIC_EMAILJS_SERVICE`, `PUBLIC_EMAILJS_TEMPLATE` as repository secrets (*Settings → Secrets → Actions*)

The workflow uses the built-in `GITHUB_TOKEN` for Pages deployment — no additional credentials needed.
