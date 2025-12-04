import { Router, type Request } from 'express';
import { Prisma, type BlogPost } from '@prisma/client';
import { prisma } from '../db/client';
import { uploadBlogImage } from '../middleware/upload';
import { blogSchema } from '../validation/blog';
import { buildImageUrl, deleteStoredFile } from '../utils/files';
import { authenticate, AuthRequest } from '../middleware/auth';
import { optimizeImage } from '../utils/imageProcessor';
import { logger } from '../config/logger';

export const blogRouter = Router();

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 160);

const serializeTags = (tags: Prisma.JsonValue | null) => {
  if (Array.isArray(tags)) {
    return tags.filter((tag): tag is string => typeof tag === 'string');
  }
  return [];
};

const transformPost = (req: Request, post: BlogPost) => ({
  ...post,
  tags: serializeTags(post.tags),
  heroImage: post.heroImage ? buildImageUrl(req, post.heroImage) : undefined,
});

// Public: Get all published posts with pagination and search
blogRouter.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(50, parseInt(req.query.limit as string) || 10);
    const search = (req.query.search as string)?.trim();
    const tag = (req.query.tag as string)?.trim();
    const status = req.query.status as string || 'published';
    
    const skip = (page - 1) * limit;
    
    const where: Prisma.BlogPostWhereInput = {
      deletedAt: null,
      status,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { excerpt: { contains: search } },
          { content: { contains: search } },
        ],
      }),
      ...(tag && {
        tags: {
          path: '$',
          array_contains: tag,
        },
      }),
    };
    
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);
    
    res.json({
      data: posts.map((post) => transformPost(req, post)),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// Public: Get single post by slug and increment views
blogRouter.get('/:slug', async (req, res, next) => {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: req.params.slug, deletedAt: null },
    });

    if (!post || post.status !== 'published') {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    });

    // Get related posts by tags
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        id: { not: post.id },
        status: 'published',
        deletedAt: null,
        tags: {
          path: '$',
          array_contains: serializeTags(post.tags)[0],
        },
      },
      take: 3,
      orderBy: { publishedAt: 'desc' },
    });

    res.json({
      ...transformPost(req, post),
      related: relatedPosts.map((p) => transformPost(req, p)),
    });
  } catch (error) {
    next(error);
  }
});

// Protected: Create new post
blogRouter.post('/', authenticate, uploadBlogImage.single('image'), async (req: AuthRequest, res, next) => {
  try {
    const parsed = blogSchema.parse(req.body);
    const slug = parsed.slug ?? slugify(parsed.title);
    let heroImagePath = req.file ? `blog/${req.file.filename}` : undefined;

    // Optimize uploaded image
    if (req.file) {
      try {
        const path = await import('path');
        const fullPath = path.join(process.cwd(), 'uploads', heroImagePath!);
        await optimizeImage(fullPath);
      } catch (error) {
        logger.error('Image optimization failed:', error);
      }
    }

    const created = await prisma.blogPost.create({
      data: {
        title: parsed.title,
        slug,
        excerpt: parsed.excerpt,
        content: parsed.content,
        heroImage: heroImagePath,
        author: parsed.author,
        tags: parsed.tags ?? [],
        readMinutes: parsed.readMinutes ?? 5,
        publishedAt: parsed.publishedAt ?? new Date(),
        status: parsed.status ?? 'draft',
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        createdBy: req.userId,
      },
    });

    logger.info(`Blog post created: ${created.slug} by user ${req.userId}`);
    res.status(201).json(transformPost(req, created));
  } catch (error) {
    if (req.file) {
      await deleteStoredFile(`blog/${req.file.filename}`);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'Slug already exists. Please choose another one.' });
    }
    if ((error as any)?.issues) {
      return res.status(400).json({ message: 'Invalid blog payload', issues: (error as any).issues });
    }
    next(error);
  }
});

// Protected: Update existing post
blogRouter.put('/:id', authenticate, uploadBlogImage.single('image'), async (req: AuthRequest, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    if (req.file) await deleteStoredFile(`blog/${req.file.filename}`);
    return res.status(400).json({ message: 'Invalid blog id' });
  }

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id, deletedAt: null } });
    if (!existing) {
      if (req.file) await deleteStoredFile(`blog/${req.file.filename}`);
      return res.status(404).json({ message: 'Post not found' });
    }

    const parsed = blogSchema.parse(req.body);
    const slug = parsed.slug ?? existing.slug ?? slugify(parsed.title);
    let heroImagePath = existing.heroImage;

    if (req.file) {
      await deleteStoredFile(existing.heroImage);
      heroImagePath = `blog/${req.file.filename}`;
      
      // Optimize new image
      try {
        const path = await import('path');
        const fullPath = path.join(process.cwd(), 'uploads', heroImagePath!);
        await optimizeImage(fullPath);
      } catch (error) {
        logger.error('Image optimization failed:', error);
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        title: parsed.title,
        slug,
        excerpt: parsed.excerpt,
        content: parsed.content,
        heroImage: heroImagePath,
        author: parsed.author,
        tags: parsed.tags ?? serializeTags(existing.tags),
        readMinutes: parsed.readMinutes ?? existing.readMinutes,
        publishedAt: parsed.publishedAt ?? existing.publishedAt,
        status: parsed.status ?? existing.status,
        metaTitle: parsed.metaTitle,
        metaDescription: parsed.metaDescription,
        updatedBy: req.userId,
      },
    });

    logger.info(`Blog post updated: ${updated.slug} by user ${req.userId}`);
    res.json(transformPost(req, updated));
  } catch (error) {
    if ((error as any)?.issues) {
      return res.status(400).json({ message: 'Invalid blog payload', issues: (error as any).issues });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'Slug already exists. Please choose another one.' });
    }
    next(error);
  }
});

// Protected: Soft delete post
blogRouter.delete('/:id', authenticate, async (req: AuthRequest, res, next) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Invalid blog id' });
  }

  try {
    const existing = await prisma.blogPost.findUnique({ where: { id, deletedAt: null } });
    if (!existing) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Soft delete
    await prisma.blogPost.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    logger.info(`Blog post soft deleted: ${existing.slug} by user ${req.userId}`);
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    next(error);
  }
});
