import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApiResource } from '../hooks/useApiResource';
import { useSEO } from '../hooks/useSEO';
import { blogPosts as fallbackPosts } from '../data/blogPosts';
import type { BlogPost } from '../types/content';

const fallbackMap = new Map(fallbackPosts.map((post) => [post.slug, post]));

interface PaginatedResponse {
  data: BlogPost[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const Blog = () => {
  useSEO({
    title: 'Blog - Insights & Stories | Korima',
    description: 'Read about software development, digital transformation, and technology insights from our team building solutions for African enterprises.',
    keywords: 'tech blog Kenya, software development insights, digital transformation Africa',
  });

  const { data: response, loading, error } = useApiResource<PaginatedResponse | BlogPost[]>('/blog?status=published', { data: fallbackPosts, pagination: { page: 1, limit: 10, total: fallbackPosts.length, pages: 1 } } as PaginatedResponse);
  
  // Handle both paginated and direct array responses
  const data = Array.isArray(response) ? response : response.data;

  const posts = useMemo(
    () =>
      data.map((post, index) => {
        const backup = fallbackMap.get(post.slug) ?? fallbackPosts[index % fallbackPosts.length];
        const paragraphs = Array.isArray(post.content)
          ? post.content
          : post.content
          ? [post.content]
          : backup?.content ?? [];

        return {
          ...backup,
          ...post,
          author: post.author ?? backup?.author ?? 'Korima Team',
          date:
            post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' })
              : backup?.date,
          excerpt: post.excerpt ?? backup?.excerpt ?? backup?.intro,
          heroImage: post.heroImage ?? post.image ?? backup?.heroImage ?? backup?.image,
          tags: post.tags?.length ? post.tags : backup?.tags ?? [],
          paragraphs,
        };
      }),
    [data]
  );

  return (
    <main>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <span className="pill">Korima Insights</span>
          <h1 className="section-title">Stories from our studio.</h1>
          <p className="section-subtitle">
            Guides, case studies, and playbooks from Korima strategists, designers, engineers, and growth leads.
          </p>

          {loading && !error && <p className="section-subtitle">Fetching the latest posts…</p>}
          {error && (
            <p className="section-subtitle" style={{ color: '#d9534f' }}>
              Unable to sync with the blog API right now. Showing saved highlights.
            </p>
          )}

          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.slug} className="blog-card">
                {post.heroImage && (
                  <img src={post.heroImage} alt={post.title} />
                )}
                <div className="badge" style={{ marginBottom: '0.8rem' }}>
                  {post.tags?.[0] ?? 'Korima' }
                </div>
                <h3>{post.title}</h3>
                <p style={{ color: 'var(--stone-500)' }}>{post.excerpt}</p>
                <p style={{ fontSize: '0.9rem', color: 'var(--stone-500)', marginTop: '0.5rem' }}>
                  {post.author} • {post.date}
                </p>
                <Link to={`/blog/${post.slug}`} className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>
                  Read article
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Blog;
