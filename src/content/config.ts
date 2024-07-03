import { defineCollection, z } from 'astro:content';

const changelogCollection = defineCollection({
  type: 'content',
  // Type-check frontmatter using a schema
  schema: z.object({
    version: z.string(),
    pubDate: z.coerce.date()
  })
});

export const collections = { changelog: changelogCollection };
