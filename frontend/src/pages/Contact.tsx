import { useState } from 'react';
import type { FormEvent } from 'react';
import { fetchJson } from '../lib/api';
import { useSEO } from '../hooks/useSEO';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  gdprConsent: false,
};

const Contact = () => {
  useSEO({
    title: 'Contact Us - Get In Touch | Korima',
    description: 'Contact Korima for software development, web design, mobile apps, and digital marketing services in Kenya. Located in Westlands, Nairobi.',
    keywords: 'contact Korima, software company Nairobi, web development Kenya contact',
  });

  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      await fetchJson('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setStatus('success');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  return (
    <main>
      <section className="section" style={{ paddingTop: '8rem' }}>
        <div className="container" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
          <div>
            <span className="pill">Let's collaborate</span>
            <h1 className="section-title">Korima HQ</h1>
            <p className="section-subtitle">
              Viking House, 1st Floor, Westlands, Nairobi. Email korirjuliu001@gmail.com or call +254 707 670 780.
            </p>
            <div className="contact-card">
              <h3>Visit us</h3>
              <p>Viking House, 1st Floor, Westlands</p>
              <h3>Call</h3>
              <a href="tel:+254707670780">+254 707 670 780</a>
              <h3 style={{ marginTop: '1rem' }}>Email</h3>
              <a href="mailto:korirjuliu001@gmail.com">korirjuliu001@gmail.com</a>
            </div>
          </div>

          <form className="contact-card" onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full name</label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              required
            />

            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
            />

            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
            />

            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              rows={4}
              required
            />

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.5rem' }}>
              <input
                type="checkbox"
                id="gdprConsent"
                name="gdprConsent"
                checked={form.gdprConsent}
                onChange={(e) => setForm((prev) => ({ ...prev, gdprConsent: e.target.checked }))}
                required
                style={{ marginTop: '0.25rem' }}
              />
              <label htmlFor="gdprConsent" style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                I consent to Korima storing my information to respond to my inquiry. See our{' '}
                <a href="/privacy-policy" style={{ textDecoration: 'underline' }}>Privacy Policy</a>.
              </label>
            </div>

            <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' && <p style={{ color: 'green' }}>Thanks! We will reach out shortly.</p>}
            {status === 'error' && <p style={{ color: 'red' }}>{errorMsg}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
