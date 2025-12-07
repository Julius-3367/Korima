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
    title: 'Korima Technologies - Software Engineering for African Enterprises',
    description: 'Korima Technologies builds human software, mobile experiences, and growth programs for African enterprises across Kenya, Uganda, and Rwanda.',
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
    {/* Advanced Hero Section */}
    <section className="hero-advanced">
      <div className="hero-advanced__background">
        <div className="hero-advanced__gradient"></div>
        <div className="hero-advanced__pattern"></div>
      </div>
      
      <div className="container">
        <div className="hero-advanced__content">
          <div className="hero-advanced__text" data-aos="fade-right">
            <div className="hero-advanced__badge">
              <span className="badge-dot"></span>
              Building the Future of African Tech
            </div>
            <h1 className="hero-advanced__title">
              Transform Your Business with
              <span className="gradient-text"> Cutting-Edge Technology</span>
            </h1>
            <p className="hero-advanced__description">
              Enterprise-grade software solutions trusted by leading African businesses. 
              We combine cutting-edge technology with local expertise to deliver scalable, 
              secure systems that drive measurable ROI.
            </p>
            
            <div className="hero-advanced__features">
              <div className="feature-pill">
                <span className="feature-icon">⚡</span>
                <span>2-Week Sprints</span>
              </div>
              <div className="feature-pill">
                <span className="feature-icon">🏆</span>
                <span>ISO Certified</span>
              </div>
              <div className="feature-pill">
                <span className="feature-icon">🔒</span>
                <span>Bank-Grade Security</span>
              </div>
              <div className="feature-pill">
                <span className="feature-icon">💰</span>
                <span>Flexible Payment</span>
              </div>
            </div>
            
            <div className="hero-advanced__cta">
              <Link to="/contact" className="btn-advanced btn-advanced--primary">
                <span>Get Free Consultation</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link to="/portfolio" className="btn-advanced btn-advanced--secondary">
                <span>View Case Studies</span>
              </Link>
            </div>
            
            <div className="hero-advanced__stats">
              <div className="stat-item">
                <div className="stat-number">120+</div>
                <div className="stat-label">Projects Delivered</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Client Satisfaction</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="hero-advanced__visual" data-aos="fade-left">
            <div className="visual-card visual-card--1">
              <div className="visual-card__header">
                <div className="visual-card__dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="visual-card__content">
                <div className="code-line"></div>
                <div className="code-line code-line--short"></div>
                <div className="code-line"></div>
                <div className="code-line code-line--medium"></div>
              </div>
            </div>
            <div className="visual-card visual-card--2">
              <div className="visual-icon">📊</div>
              <div className="visual-metric">
                <div className="metric-label">Performance</div>
                <div className="metric-bar">
                  <div className="metric-fill"></div>
                </div>
              </div>
            </div>
            <div className="visual-card visual-card--3">
              <div className="visual-check">✓</div>
              <div className="visual-text">Deployed Successfully</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hero-advanced__scroll">
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 5V15M10 15L15 10M10 15L5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>

    {/* Services Marquee */}
    <section className="services-marquee">
      <div className="marquee">
        <div className="marquee-content">
          <span>🌐 Website Development</span>
          <span>📱 Mobile Apps</span>
          <span>⚙️ Odoo Systems</span>
          <span>🛒 POS Solutions</span>
          <span>📈 Digital Marketing</span>
          <span>🔧 Custom Software</span>
          <span>💼 Business Intelligence</span>
          <span>☁️ Cloud Solutions</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span>🌐 Website Development</span>
          <span>📱 Mobile Apps</span>
          <span>⚙️ Odoo Systems</span>
          <span>🛒 POS Solutions</span>
          <span>📈 Digital Marketing</span>
          <span>🔧 Custom Software</span>
          <span>💼 Business Intelligence</span>
          <span>☁️ Cloud Solutions</span>
        </div>
      </div>
    </section>

    {/* Advanced Services Section */}
    <section className="services-advanced">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-badge">Our Expertise</span>
          <h2 className="section-title-advanced">
            Comprehensive Digital Solutions
          </h2>
          <p className="section-subtitle-advanced">
            End-to-end technology services designed to accelerate your digital transformation
          </p>
        </div>
        
        <div className="services-advanced__grid">
          {displayServices.map((service, index) => (
            <div 
              key={service.title} 
              className="service-card-advanced"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="service-card-advanced__icon">
                {service.icon}
              </div>
              <h3 className="service-card-advanced__title">{service.title}</h3>
              <p className="service-card-advanced__description">{service.description}</p>
              <div className="service-card-advanced__arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Technologies Stack */}
    <section className="tech-stack">
      <div className="container">
        <div className="tech-stack__content" data-aos="fade-up">
          <h3 className="tech-stack__title">Powered by Modern Technology</h3>
          <div className="tech-stack__logos">
            <div className="tech-logo">React</div>
            <div className="tech-logo">Node.js</div>
            <div className="tech-logo">Python</div>
            <div className="tech-logo">PostgreSQL</div>
            <div className="tech-logo">AWS</div>
            <div className="tech-logo">Docker</div>
          </div>
        </div>
      </div>
    </section>

    {/* Portfolio Section */}
    <section className="section" style={{ background: 'var(--stone-50)' }}>
      <div className="container">
        <div className="section-header">
          <span className="pill">Portfolio</span>
          <h2 className="section-title">Proven success across industries</h2>
          <p className="section-subtitle">
            We've delivered transformative solutions for leading organizations across Kenya and East Africa.
          </p>
        </div>
        <div className="projects-grid">
          {displayProjects.map((project) => (
            <article key={project.title} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <span className="badge">{project.sector}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.impact && <p className="project-impact">📊 {project.impact}</p>}
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/portfolio" className="btn btn-primary">View All Projects</Link>
        </div>
      </div>
    </section>

    {/* Testimonials Section */}
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="pill">Client Success</span>
          <h2 className="section-title">Trusted by leading organizations</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{item.quote}</p>
              <div className="testimonial-author">
                <strong>{item.author}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </main>
  );
};

export default Home;
