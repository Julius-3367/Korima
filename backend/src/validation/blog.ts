import { z } from 'zod';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const parseTagsInput = (value: unknown): string[] | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) {
    return value
      .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
      .filter(Boolean);
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed
          .map((tag) => (typeof tag === 'string' ? tag.trim() : ''))
          .filter(Boolean);
      }
    } catch {
      // fall back to comma separated list
    }
    return value
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return undefined;
};

export const blogSchema = z.object({
  title: z.string().min(4).max(160),
  slug: z
    .string()
    .min(4)
    .max(160)
    .regex(slugRegex, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional(),
  excerpt: z.string().min(20).max(320),
  content: z.string().min(50),
  author: z.string().min(2).max(120).optional(),
  readMinutes: z
    .preprocess((value) => (value === undefined || value === null || value === '' ? undefined : Number(value)), z
      .number()
      .int()
      .positive()
      .max(120))
    .optional(),
  tags: z.preprocess(parseTagsInput, z.array(z.string().min(1).max(40)).max(12)).optional(),
  publishedAt: z.coerce.date().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  metaTitle: z.string().max(160).optional(),
  metaDescription: z.string().max(320).optional(),
});

export type BlogPayload = z.infer<typeof blogSchema>;