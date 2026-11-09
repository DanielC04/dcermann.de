import { defineCollection, z } from 'astro:content';
import { tagToTopic } from '../data/topics';

/** A tag from the curated vocabulary — unknown tags fail the build. */
const tag = z.string().refine(
  (t) => Object.hasOwn(tagToTopic, t),
  (t) => ({
    message: `Unknown tag "${t}". Use a tag from tagToTopic in src/data/topics.ts, or add it there (mapped to a topic) first.`,
  }),
);

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['paper', 'book']).default('paper'),
    authors: z.array(z.string()),
    year: z.number(),
    url: z.string().url(),
    tags: z.array(tag).default([]),
    status: z.enum(['to-read', 'reading', 'read']),
    dateRead: z.coerce.date().optional(),
    // dateRead is a rough guess (e.g. backfilled on the day the entry was
    // added), not the day it was actually finished. Kept out of the
    // reading-activity heatmap and streaks.
    dateReadApprox: z.boolean().default(false),
    tldr: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { papers };
