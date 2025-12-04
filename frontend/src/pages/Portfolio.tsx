import { useMemo } from 'react';
import { projects as projectsFallback } from '../data/projects';
import { useApiResource } from '../hooks/useApiResource';
import type { Project } from '../types/content';

const Portfolio = () => {
  const { data: projectData, loading, error } = useApiResource<Project[]>('/projects', projectsFallback);

  const displayProjects = useMemo(() => {
    const fallbackImages = projectsFallback.map((project) => project.image).filter(Boolean) as string[];
    return projectData.map((project, index) => ({
      ...project,
      image: project.image ?? project.imageUrl ?? fallbackImages[index % fallbackImages.length],
    }));
  }, [projectData]);

  return (
    <main>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container">
          <span className="pill">Work</span>
          <h1 className="section-title">Case studies across Africa.</h1>
          <p className="section-subtitle">
            We collaborate with enterprise teams, development agencies, and founders to solve complex problems with technology.
          </p>
          {loading && !error && <p className="section-subtitle">Loading projects…</p>}
          {error && (
            <p className="section-subtitle" style={{ color: '#d9534f' }}>
              We could not fetch the latest case studies. Showing saved highlights.
            </p>
          )}
          <div className="projects-grid">
            {displayProjects.map((project) => (
              <article key={project.title} className="project-card">
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ borderRadius: '20px', height: '220px', objectFit: 'cover', marginBottom: '1rem' }}
                />
                <span className="badge">{project.sector}</span>
                <h3 style={{ margin: '0.8rem 0' }}>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Portfolio;
