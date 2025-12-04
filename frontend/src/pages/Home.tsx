import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApiResource } from '../hooks/useApiResource';
import { useSEO, StructuredData } from '../hooks/useSEO';
import { services as servicesFallback } from '../data/services';
import { projects as projectsFallback } from '../data/projects';
import type { Project, Service } from '../types/content';

const highlights = [
  { label: 'Projects shipped', value: '120+' },
  { label: 'Industries served', value: '14' },
  { label: 'Client satisfaction', value: '98%' },
  { label: 'Years in Nairobi', value: '7' },
];

const testimonials = [
  {
    quote:
      'Korima delivered our patient portal with empathy, accessible Swahili content, and best-in-class security. Adoption skyrocketed.',
    author: 'Dr. Amina Odhiambo — CEO, AfyaLink Clinics',
  },
  {
    quote:
      'Their data team helped automate weekly reports for 200 outlets. Leadership now makes decisions in hours, not days.',
    author: 'James Mwangi — COO, Umoja Retail',
  },
];

const iconMap = servicesFallback.reduce<Record<string, string>>((acc, item) => {
  acc[item.title] = item.icon ?? '✨';
  return acc;
}, {});

const projectImageFallbacks = projectsFallback.map((project) => project.image).filter(Boolean) as string[];

const Home = () => {
  useSEO({
    title: 'Korima - Software Engineering for African Enterprises',
    description: 'Korima builds human software, mobile experiences, and growth programs for African enterprises across Kenya, Uganda, and Rwanda.',
    keywords: 'software development Kenya, web development Nairobi, mobile app development, ERP systems, digital marketing Kenya, data analytics',
  });

  const {
    data: servicesData,
    loading: servicesLoading,
    error: servicesError,
  } = useApiResource<Service[]>('/services', servicesFallback);

  const {
    data: projectsData,
    loading: projectsLoading,
    error: projectsError,
  } = useApiResource<Project[]>('/projects', projectsFallback);

  const displayServices = useMemo(() => {
    const iconFallbacks = servicesFallback.map((service) => service.icon).filter(Boolean) as string[];

    return servicesData.map((service, index) => ({
      ...service,
      icon: service.icon ?? iconMap[service.title] ?? iconFallbacks[index % iconFallbacks.length] ?? '✨',
    }));
  }, [servicesData]);

  const displayProjects = useMemo(
    () =>
      projectsData.map((project, index) => ({
        ...project,
        image: project.image ?? project.imageUrl ?? projectImageFallbacks[index % projectImageFallbacks.length],
      })),
    [projectsData]
  );

  return (
    <main>
    <section className="hero">
      <div className="container hero__grid">
        <div className="hero__content">
          <span className="pill">Made in Nairobi • Serving Africa</span>
          <h1 className="hero__title">
            Modern <span>software, mobile apps, systems,</span> & marketing built for bold Kenyan companies.
          </h1>
          <p>
            We are Korima, a full-stack digital partner delivering strategy, design, engineering, analytics, and growth services
            for enterprises across finance, public sector, healthcare, hospitality, and fast-growing startups.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Link to="/contact" className="btn btn-primary">Book a discovery call</Link>
            <Link to="/portfolio" className="btn btn-outline">View recent work</Link>
          </div>
          <div className="stats">
            {highlights.map((stat) => (
              <div key={stat.label} className="stat-card">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <span className="pill">What we do</span>
        <h2 className="section-title">Strategy, design, engineering, launch.</h2>
        <p className="section-subtitle">
          Every engagement is led by a Nairobi-based squad with deep experience in African customers, regulations, and last-mile realities.
        </p>
        {servicesLoading && !servicesError && (
          <p className="section-subtitle">Refreshing services from the API…</p>
        )}
        {servicesError && (
          <p className="section-subtitle" style={{ color: '#d9534f' }}>
            We could not load services from the API. Showing saved content.
          </p>
        )}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))' }}>
          {displayServices.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-icon" aria-hidden>
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--stone-100)' }}>
      <div className="container">
        <span className="pill">Featured delivery</span>
        <h2 className="section-title">Recent Kenyan success stories.</h2>
        {projectsLoading && !projectsError && (
          <p className="section-subtitle">Fetching the latest case studies…</p>
        )}
        {projectsError && (
          <p className="section-subtitle" style={{ color: '#d9534f' }}>
            We could not reach the portfolio API. Showing saved examples.
          </p>
        )}
        <div className="projects-grid">
          {displayProjects.map((project) => (
            <article key={project.title} className="project-card">
              <img
                src={project.image}
                alt={project.title}
                style={{ borderRadius: '18px', height: '220px', objectFit: 'cover', marginBottom: '1.2rem' }}
              />
              <span className="badge">{project.sector}</span>
              <h3 style={{ marginTop: '0.6rem' }}>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
        {testimonials.map((item) => (
          <blockquote key={item.author} className="project-card">
            <p style={{ fontSize: '1.05rem', fontStyle: 'italic' }}>&ldquo;{item.quote}&rdquo;</p>
            <hr style={{ margin: '1.5rem 0', border: 'none', borderBottom: '1px solid rgba(5,11,22,0.08)' }} />
            <strong>{item.author}</strong>
          </blockquote>
        ))}
      </div>
    </section>

    <section className="section" style={{ background: 'var(--navy-900)', color: 'white' }}>
      <div className="container grid items-center" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '3rem' }}>
        <div>
          <span className="pill">Ready?</span>
          <h2 className="section-title" style={{ color: 'white' }}>Let us co-create your next release.</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Whether you need a nationwide software rollout or a single landing page that converts, Korima is ready to join your team.
          </p>
        </div>
        <div className="grid gap-3">
          <Link to="/contact" className="btn btn-primary" style={{ textAlign: 'center' }}>Talk to us today</Link>
          <a className="btn btn-outline" href="https://wa.me/254707670780" target="_blank" rel="noreferrer" style={{ textAlign: 'center' }}>
            WhatsApp +254 707 670 780
          </a>
        </div>
      </div>
    </section>
    </main>
  );
};

export default Home;
