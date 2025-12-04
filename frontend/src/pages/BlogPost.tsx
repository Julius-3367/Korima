import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApiResource } from '../hooks/useApiResource';
import { blogPosts as fallbackPosts } from '../data/blogPosts';
import type { BlogPost } from '../types/content';

const fallbackMap = new Map(fallbackPosts.map((post) => [post.slug, post]));

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <main className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <p className="section-subtitle">No blog post provided.</p>
          <Link to="/blog" className="btn btn-primary">
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

  const fallback = fallbackMap.get(slug) ?? fallbackPosts[0];
  const { data, loading, error } = useApiResource<BlogPost>(`/blog/${slug}`, fallback);

  const post = useMemo(() => {
    const paragraphs = Array.isArray(data.content)
      ? data.content
      : data.content
      ? [data.content]
      : fallback?.content ?? [];

    return {
      ...fallback,
      ...data,
      author: data.author ?? fallback?.author ?? 'Korima Team',
      date:
        data.publishedAt
          ? new Date(data.publishedAt).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })
          : fallback?.date,
      excerpt: data.excerpt ?? fallback?.excerpt ?? fallback?.intro,
      heroImage: data.heroImage ?? data.image ?? fallback?.heroImage ?? fallback?.image,
      tags: data.tags?.length ? data.tags : fallback?.tags ?? [],
      paragraphs,
    };
  }, [data, fallback]);

  return (
    <main>
      <article className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <Link to="/blog" className="pill" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
            ← Back to Insights
          </Link>
          <span className="pill">Korima Insight</span>
          <h1 className="section-title">{post.title}</h1>
          <p className="section-subtitle">{post.excerpt}</p>
          <p style={{ color: 'var(--stone-500)', marginBottom: '2rem' }}>
            {post.author} • {post.date}
          </p>
          {post.heroImage && (
            <img
              src={post.heroImage}
              alt={post.title}
              style={{ borderRadius: '24px', marginBottom: '2rem', width: '100%', maxHeight: '420px', objectFit: 'cover' }}
            />
          )}

          {loading && !error && <p>Loading content…</p>}
          {error && <p style={{ color: '#d9534f' }}>We could not sync this post. Showing the saved version.</p>}

          <div className="grid" style={{ gap: '1.5rem' }}>
            {post.paragraphs?.map((paragraph, idx) => (
              <p key={idx} style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--stone-700)' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
};

export default BlogPostPage;
