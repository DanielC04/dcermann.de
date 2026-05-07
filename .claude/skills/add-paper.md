# Add Paper to Reading List

Add a paper to `src/content/papers/` as a Markdown file with typed frontmatter.

## Schema (from `src/content/config.ts`)

```
title:    string        — full paper title (quoted)
authors:  string[]     — list of author full names
year:     number        — publication year
url:      string        — canonical URL (arXiv, DOI, PMC, etc.)
tags:     string[]     — lowercase hyphenated topic tags
status:   "to-read" | "reading" | "read"
dateRead: date          — optional; set when status is "read" (YYYY-MM-DD)
tldr:     string        — optional one-sentence summary; shown in the 3D Paper Topics tooltip (truncated to 100 chars)
draft:    boolean       — optional; omit to publish
```

## Filename

Slugify the title: lowercase, words joined with `-`, strip punctuation.
Example: "Attention Is All You Need" → `attention-is-all-you-need.md`

## Status guide

| Status | When to use |
|--------|-------------|
| `to-read` | Just discovered, haven't started |
| `reading` | Currently in progress |
| `read` | Finished — add `dateRead` |

## Minimal example (to-read, no notes)

```markdown
---
title: "Attention Is All You Need"
authors: ["Ashish Vaswani", "Noam Shazeer"]
year: 2017
url: "https://arxiv.org/abs/1706.03762"
tags: ["deep-learning", "nlp", "transformers"]
status: "to-read"
tldr: "Replaces recurrence with multi-head self-attention for sequence modeling."
---
```

## Full example (read, with notes)

```markdown
---
title: "Attention Is All You Need"
authors: ["Ashish Vaswani", "Noam Shazeer"]
year: 2017
url: "https://arxiv.org/abs/1706.03762"
tags: ["deep-learning", "nlp", "transformers"]
status: "read"
dateRead: 2026-03-15
tldr: "Replaces recurrence with multi-head self-attention for sequence modeling."
---

Body is optional. Write reading notes in Markdown here.
Only papers with a body get a detail page at /papers/[slug].
```

## Workflow

1. If given a URL, fetch the page to extract title, authors, year, and abstract.
2. Choose appropriate tags (reuse existing ones where possible — check other files in `src/content/papers/`).
3. Set `status` based on context ("add to reading list" → `to-read`; "I just finished" → `read` + `dateRead`).
4. Write the file to `src/content/papers/<slug>.md`.
5. Do not add body content unless the user provides notes.

## Tooltip display (PaperMap)

Every paper appears as a node in the 3D Paper Topics visualiser (`src/components/PaperMap.astro`). Hovering shows a `position: fixed` tooltip (viewport-relative, not clipped by the canvas) with:

- **Title** — truncated to 60 chars
- **Year · status**
- **Tags** — joined with `, `
- **tldr** — shown in italic if present, truncated to 100 chars

The tooltip flips left/right based on which half of the viewport the cursor is in.
