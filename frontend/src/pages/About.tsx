const milestones = [
  { year: '2018', detail: 'Korima founded in Nairobi to support SMEs with modern websites.' },
  { year: '2020', detail: 'Expanded into custom software and deployed our first Odoo ERP for a county government.' },
  { year: '2022', detail: 'Launched mobile studio focusing on health, logistics, and fintech apps.' },
  { year: '2024', detail: 'Opened Viking House HQ and crossed 100 completed digital projects.' },
];

const team = [
  { name: 'David Kimani', role: 'Managing Director', image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=500&q=80' },
  { name: 'Faith Wanjiru', role: 'Head of Experience Design', image: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=500&q=80' },
  { name: 'Brian Otieno', role: 'Lead Engineer', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80' },
  { name: 'Esther Achieng', role: 'Growth & Data Lead', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80' },
];

const About = () => (
  <main>
    <section className="section" style={{ paddingTop: '8rem' }}>
      <div className="container">
        <span className="pill">About Korima</span>
        <h1 className="section-title">We engineer African-ready products with heart.</h1>
        <p className="section-subtitle">
          From Westlands to Kampala, we help founders, corporates, and public institutions imagine new services, digitise operations,
          and delight citizens. Our team combines strategy consultants, designers, full-stack engineers, product managers, quality
          analysts, and growth marketers.
        </p>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
          <div className="service-card">
            <h3>Human-centred research</h3>
            <p>Workshops, ethnographic studies, and journey maps grounded in real Kenyan users.</p>
          </div>
          <div className="service-card">
            <h3>Delivery discipline</h3>
            <p>Agile rituals, weekly demos, and transparent dashboards keep projects on track.</p>
          </div>
          <div className="service-card">
            <h3>Continued partnership</h3>
            <p>24/7 support, observability, and optimisation so platforms keep improving after launch.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--stone-100)' }}>
      <div className="container grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2.5rem' }}>
        <div>
          <h3 className="section-title">Timeline</h3>
          <div className="grid gap-3">
            {milestones.map((item) => (
              <div key={item.year} className="project-card">
                <strong style={{ color: 'var(--lime-500)', fontSize: '1.2rem' }}>{item.year}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="section-title">Our squad</h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem' }}>
            {team.map((member) => (
              <article key={member.name} className="project-card">
                <img src={member.image} alt={member.name} style={{ borderRadius: '18px', height: '200px', objectFit: 'cover', marginBottom: '1rem' }} />
                <strong>{member.name}</strong>
                <p style={{ color: 'var(--stone-500)' }}>{member.role}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  </main>
);

export default About;
