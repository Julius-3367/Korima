import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchJson, sendForm } from '../lib/api';
import type { BlogPost } from '../types/content';
import { useSEO } from '../hooks/useSEO';

const initialForm = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: '',
  tags: '',
  readMinutes: '',
  status: 'published' as 'draft' | 'published' | 'archived',
};

const BlogAdmin = () => {
  useSEO({ title: 'Blog Admin | Korima' });
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('korima-admin-token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const loadPosts = async () => {
    try {
      const response = await fetchJson<{ data: BlogPost[] } | BlogPost[]>('/blog?status=published');
      // Handle both paginated and direct array responses
      const data = Array.isArray(response) ? response : response.data;
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blog posts');
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('korima-admin-token');
    localStorage.removeItem('korima-admin');
    navigate('/login');
  };

  const resetForm = () => {
    setForm(initialForm);
    setImageFile(null);
    setEditingId(null);
    setStatus('idle');
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'tags') return;
        if (value) {
          payload.append(key, String(value));
        }
      });
      payload.set('status', form.status);
      payload.set(
        'tags',
        JSON.stringify(
          form.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        )
      );
      if (form.readMinutes) {
        payload.set('readMinutes', form.readMinutes);
      }
      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (editingId) {
        await sendForm(`/blog/${editingId}`, payload, { method: 'PUT' });
      } else {
        await sendForm('/blog', payload, { method: 'POST' });
      }

      await loadPosts();
      resetForm();
      setStatus('success');
    } catch (err) {
      setStatus('error');
      let errorMsg = 'Failed to save blog post';
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          errorMsg = parsed.message || err.message;
          if (parsed.issues) {
            errorMsg += ': ' + parsed.issues.map((i: any) => `${i.path.join('.')} - ${i.message}`).join(', ');
          }
        } catch {
          errorMsg = err.message;
        }
      }
      setError(errorMsg);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id ?? null);
    setForm({
      title: post.title ?? '',
      slug: post.slug ?? '',
      excerpt: post.excerpt ?? post.intro ?? '',
      content: Array.isArray(post.content) ? post.content.join('\n\n') : post.content ?? '',
      author: post.author ?? '',
      tags: post.tags?.join(', ') ?? '',
      readMinutes: post.readMinutes ? String(post.readMinutes) : '',
      status: (post.status as 'draft' | 'published' | 'archived') ?? 'published',
    });
    setImageFile(null);
    setStatus('idle');
    setError(null);
  };

  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await fetchJson(`/blog/${id}`, { method: 'DELETE' });
      await loadPosts();
      if (editingId === id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete blog post');
    }
  };

  return (
    <main>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className="section-title">Blog Admin Panel</h1>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              Logout
            </button>
          </div>
          
          <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1fr)' }}>
            <div className="contact-card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{editingId ? 'Edit blog post' : 'Create blog post'}</h2>
              <form onSubmit={handleSubmit} className="grid" style={{ gap: '1rem' }}>
                <div>
                  <input
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                    maxLength={160}
                    required
                  />
                  <small style={{ color: 'var(--stone-500)', fontSize: '0.85rem' }}>
                    {form.title.length}/160 characters
                  </small>
                </div>
              <div>
                <input
                  placeholder="Slug (optional)"
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  maxLength={160}
                />
                <small style={{ color: 'var(--stone-500)', fontSize: '0.85rem' }}>
                  URL-friendly identifier (lowercase, hyphens only)
                </small>
              </div>
              <div>
                <input
                  placeholder="Author"
                  value={form.author}
                  onChange={(e) => setForm((prev) => ({ ...prev, author: e.target.value }))}
                  maxLength={120}
                />
                <small style={{ color: 'var(--stone-500)', fontSize: '0.85rem' }}>
                  {form.author.length}/120 characters
                </small>
              </div>
              <div>
                <textarea
                  placeholder="Short excerpt (20-320 characters)"
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                  maxLength={320}
                  required
                />
                <small style={{ color: form.excerpt.length > 320 ? 'red' : 'var(--stone-500)', fontSize: '0.85rem' }}>
                  {form.excerpt.length}/320 characters {form.excerpt.length < 20 ? '(minimum 20)' : ''}
                </small>
              </div>
              <div>
                <textarea
                  placeholder="Main content (minimum 50 characters)"
                  rows={8}
                  value={form.content}
                  onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                  required
                />
                <small style={{ color: 'var(--stone-500)', fontSize: '0.85rem' }}>
                  {form.content.length} characters {form.content.length < 50 ? '(minimum 50)' : ''}
                </small>
              </div>
              <input
                placeholder="Tags (comma separated)"
                value={form.tags}
                onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              />
              <div>
                <select
                  value={form.status}
                  onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value as 'draft' | 'published' | 'archived' }))}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--stone-300)' }}
                >
                  <option value="published">Published (Visible on blog)</option>
                  <option value="draft">Draft (Hidden)</option>
                  <option value="archived">Archived (Hidden)</option>
                </select>
                <small style={{ color: 'var(--stone-500)', fontSize: '0.85rem' }}>
                  Post status - only 'Published' posts are visible on the blog
                </small>
              </div>
              <input
                placeholder="Read time in minutes"
                type="number"
                min={1}
                value={form.readMinutes}
                onChange={(e) => setForm((prev) => ({ ...prev, readMinutes: e.target.value }))}
              />
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] ?? null)} />

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Saving…' : editingId ? 'Update post' : 'Publish post'}
                </button>
                {editingId && (
                  <button className="btn btn-outline" type="button" onClick={resetForm}>
                    Cancel
                  </button>
                )}
              </div>
              {status === 'success' && <p style={{ color: 'green' }}>Post saved.</p>}
              {status === 'error' && <p style={{ color: 'red' }}>{error}</p>}
            </form>
          </div>

          <div className="grid" style={{ gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 className="section-title" style={{ fontSize: '1.5rem', margin: 0 }}>Published posts</h2>
              <button className="btn btn-outline" type="button" onClick={loadPosts}>
                Refresh
              </button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="grid" style={{ gap: '1rem' }}>
              {posts.map((post) => (
                <article key={post.id ?? post.slug} className="project-card" style={{ display: 'grid', gap: '0.5rem' }}>
                  <strong>{post.title}</strong>
                  <small style={{ color: 'var(--stone-500)' }}>{post.slug}</small>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {post.tags?.map((tag) => (
                      <span key={tag} className="badge">{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" type="button" onClick={() => handleEdit(post)}>
                      Edit
                    </button>
                    <button className="btn btn-outline" type="button" onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
};

export default BlogAdmin;
