import { defineCollection, z } from 'astro:content';

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['paper', 'book']).default('paper'),
    authors: z.array(z.string()),
    year: z.number(),
    url: z.string().url(),
    tags: z.array(z.string()).default([]),
    status: z.enum(['to-read', 'reading', 'read']),
    dateRead: z.coerce.date().optional(),
    tldr: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { papers };
