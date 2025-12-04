import { useMemo } from 'react';
import { services as servicesFallback } from '../data/services';
import { useApiResource } from '../hooks/useApiResource';
import type { Service } from '../types/content';

const servicePackages = [
  {
    title: 'Launch Package',
    price: 'From KES 180K',
    items: ['Rapid discovery workshop', 'Brand-ready website', 'Marketing automation setup'],
  },
  {
    title: 'Scale Package',
    price: 'From KES 450K',
    items: ['Custom software or ERP module', 'Mobile experience', 'Analytics + adoption training'],
  },
  {
    title: 'Dedicated Squad',
    price: 'Monthly retainer',
    items: ['Cross-functional Korima team', 'Backlog ownership & sprints', '24/7 support desk'],
  },
];

const Services = () => {
  const { data: serviceData, loading, error } = useApiResource<Service[]>('/services', servicesFallback);

  const displayServices = useMemo(() => {
    const iconCycle = servicesFallback.map((service) => service.icon).filter(Boolean) as string[];
    return serviceData.map((service, index) => ({
      ...service,
      icon: service.icon ?? iconCycle[index % iconCycle.length] ?? '✨',
    }));
  }, [serviceData]);

  return (
    <main>
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <span className="pill">Capabilities</span>
        <h1 className="section-title">From research to run, Korima delivers.</h1>
        <p className="section-subtitle">
          Choose Korima for multidisciplinary teams who understand compliance, MPESA, and how Kenyans actually use technology.
        </p>
        {loading && !error && <p className="section-subtitle">Refreshing services from the API…</p>}
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))' }}>
          {displayServices.map((service) => (
            <article key={service.title} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--stone-100)' }}>
      <div className="container">
        <h2 className="section-title">Engagement models.</h2>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          {servicePackages.map((pack) => (
            <article key={pack.title} className="project-card">
              <h3>{pack.title}</h3>
              <p style={{ color: 'var(--lime-500)', fontWeight: 600 }}>{pack.price}</p>
              <ul style={{ paddingLeft: '1rem' }}>
                {pack.items.map((item) => (
                  <li key={item} style={{ marginBottom: '0.4rem' }}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
    </main>
  );
};

export default Services;
