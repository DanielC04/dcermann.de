import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  }),
});

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
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

export const collections = { blog, papers };
