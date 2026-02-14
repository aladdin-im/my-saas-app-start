import { pageSchema } from 'fumadocs-core/source/schema';
import { defineCollections } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const legalPages = defineCollections({
    type: 'doc',
    dir: 'content/legal',
    schema: pageSchema.extend({
        date: z.string(), // 日期字符串，YYYY-MM-DD
    }),
});

export const blogPosts = defineCollections({
    type: 'doc',
    dir: 'content/blog',
    // add required frontmatter properties
    schema: pageSchema.extend({
        image: z.string(),
        author: z.string(),
        avatar: z.string(),
        date: z.string(), // 日期字符串，YYYY-MM-DD
    }),
});