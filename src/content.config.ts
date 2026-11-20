import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

const qa = z.object({ q: z.string(), a: z.string() });

const features = defineCollection({
  loader: file('src/content/features.yaml'),
  schema: z.object({
    order: z.number(),
    status: z.enum(['available', 'coming-soon']),
    title: z.string(),
    shortTitle: z.string(),
    metaTitle: z.string().max(60),
    description: z.string().max(155),
    icon: z.string(),
    summary: z.string(),
    answer: z.string(),
    sections: z.array(qa),
    limits: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    faq: z.array(qa).default([]),
  }),
});

const products = defineCollection({
  loader: file('src/content/products.yaml'),
  schema: z.object({
    order: z.number(),
    status: z.enum(['available', 'coming-soon']),
    name: z.string(),
    shortName: z.string(),
    title: z.string(),
    metaTitle: z.string().max(60),
    description: z.string().max(155),
    icon: z.string(),
    tagline: z.string(),
    answer: z.string(),
    gets: z.array(z.string()),
    sections: z.array(qa),
    promptHinglish: z.string(),
    promptEnglish: z.string(),
    features: z.array(z.string()),
    faq: z.array(qa).default([]),
  }),
});

const useCases = defineCollection({
  loader: file('src/content/use-cases.yaml'),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    shortTitle: z.string(),
    metaTitle: z.string().max(60),
    description: z.string().max(155),
    icon: z.string(),
    answer: z.string(),
    problem: z.string(),
    builds: z.array(z.string()),
    promptHinglish: z.string(),
    promptEnglish: z.string(),
    features: z.array(z.string()),
    faq: z.array(qa).default([]),
  }),
});

const cell = z.object({
  value: z.enum(['yes', 'no', 'coming-soon', 'unknown']),
  note: z.string().optional(),
  source: z.string().url().optional(),
  checked: z.string().optional(),
});

const compare = defineCollection({
  loader: file('src/content/compare.yaml'),
  schema: z.object({
    order: z.number(),
    name: z.string(),
    officialUrl: z.string().url(),
    metaTitle: z.string().max(60),
    description: z.string().max(155),
    answer: z.string(),
    /** keyed by criterion id from src/lib/compare.ts */
    cells: z.record(cell).default({}),
    stronger: z.array(z.object({ text: z.string(), source: z.string().url(), checked: z.string() })).default([]),
    faq: z.array(qa).default([]),
  }),
});

const faq = defineCollection({
  loader: file('src/content/faq.yaml'),
  schema: z.object({ items: z.array(qa) }),
});

export const collections = { products, features, useCases, compare, faq };
