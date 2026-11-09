---
description: Add a paper to the reading list with typed frontmatter
---

# Add Paper to Reading List

Add a paper to `src/content/papers/` as a Markdown file with typed frontmatter.

## Schema (from `src/content/config.ts`)

```
title:    string        — full paper title (quoted)
type:     "paper" | "book" — optional, default "paper"
authors:  string[]     — list of author full names
year:     number        — publication year
url:      string        — canonical URL (arXiv, DOI, PMC, etc.)
tags:     string[]     — from the curated vocabulary (keys of tagToTopic in src/data/topics.ts)
status:   "to-read" | "reading" | "read"
dateRead: date          — optional; set when status is "read" (YYYY-MM-DD)
dateReadApprox: boolean — optional, default false; true when dateRead is a guess
tldr:     string        — optional one-sentence summary
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
tags: ["deep-learning", "transformers"]
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
tags: ["deep-learning", "transformers"]
status: "read"
dateRead: 2026-03-15
tldr: "Replaces recurrence with multi-head self-attention for sequence modeling."
---

Body is optional. Write reading notes in Markdown here.
Only papers with a body get a detail page at /papers/[slug].
```

## Workflow

1. If given a URL, fetch the page to extract title, authors, year, and abstract.
2. Choose tags from the curated vocabulary (see "Tags" below).
3. Set `status` based on context ("add to reading list" → `to-read`; "I just finished" → `read` + `dateRead`).
4. Write the file to `src/content/papers/<slug>.md`.
5. Do not add body content unless the user provides notes.

## Tags (curated vocabulary)

Tags must be keys of `tagToTopic` in `src/data/topics.ts`. **An unknown tag fails the build** (the schema in `src/content/config.ts` validates against that map), so read the map before tagging.

- Usually 1–3 tags. Prefer the most specific tag that applies; topic filters already give the broad view, so umbrella tags (`machine-learning`, `healthcare`, `software`, `fiction`, …) are only for papers no specific tag fits.
- Don't stack synonyms or a tag plus its umbrella (e.g. not `llm` + `nlp`, not `alignment` + a generic "ai-safety" tag — the AI-safety topics are grouped via `group: 'ai-safety'` instead).
- Only add a new tag if no existing one fits and it's a filter worth having beyond this one paper. Adding one means adding it to `tagToTopic` mapped to a topic id from `topics` (or `null` to keep it as a tag-only filter outside the map). Add a new topic only when several papers would land in it and no existing topic fits.

## Topic map (TopicMap)

Every paper appears as a dot in the "What I read about" map (`src/components/TopicMap.astro`), linked to the broad topics its tags map to in `src/data/topics.ts`. Hovering a dot shows the title, year · status, and its topics. `tldr` is not shown there.

## Reading activity heatmap & `dateReadApprox`

The heatmap on /papers plots each `read` paper on its `dateRead` and computes weekly streaks from it. Set `dateReadApprox: true` when the real finish date isn't known — e.g. backfilling something read a while ago, where `dateRead` would just be today or a rough guess. Approximate entries still count toward the "N read" total and sort by `dateRead` in the list, but are left out of the heatmap and streaks so they don't create fake spikes. Omit the field when the date is accurate.
