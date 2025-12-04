import { useSEO } from '../hooks/useSEO';

export default function PrivacyPolicy() {
  useSEO({
    title: 'Privacy Policy | Korima',
    description: 'Learn how Korima collects, uses, and protects your personal information.',
  });

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
      <h1>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        <strong>Effective Date:</strong> December 4, 2025
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us when you use our services, including:
        </p>
        <ul>
          <li>Contact information (name, email, phone number)</li>
          <li>Company information when you reach out</li>
          <li>Newsletter subscription preferences</li>
          <li>Usage data and analytics through cookies</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and provide customer service</li>
          <li>Send you marketing communications (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>3. Cookie Policy</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your experience. You can
          control cookie preferences through our cookie consent banner. For more details, see our{' '}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>4. Data Protection Rights (GDPR)</h2>
        <p>If you are in the European Economic Area or Kenya, you have the following rights:</p>
        <ul>
          <li>The right to access your personal data</li>
          <li>The right to rectification</li>
          <li>The right to erasure</li>
          <li>The right to restrict processing</li>
          <li>The right to data portability</li>
          <li>The right to object to processing</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>5. Data Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          personal data against unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>6. Third-Party Services</h2>
        <p>
          We may use third-party services for analytics, email delivery, and hosting. These
          providers have their own privacy policies governing their use of your information.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>7. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 16. We do not knowingly
          collect personal information from children.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>8. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new policy on this page and updating the effective date.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>9. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise your data protection
          rights, please contact us:
        </p>
        <p>
          <strong>Email:</strong> korirjuliu001@gmail.com<br />
          <strong>Phone:</strong> +254 707 670 780<br />
          <strong>Address:</strong> Westlands, Viking House, 1st Floor, Nairobi, Kenya
        </p>
      </section>
    </div>
  );
}
