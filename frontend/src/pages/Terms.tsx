import { useSEO } from '../hooks/useSEO';

export default function Terms() {
  useSEO({
    title: 'Terms of Service | Korima',
    description: 'Read the terms and conditions for using Korima services.',
  });

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
      <h1>Terms of Service</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        <strong>Effective Date:</strong> December 4, 2025
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Korima website and services, you accept and agree to be bound
          by these Terms of Service. If you do not agree to these terms, please do not use our
          services.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>2. Services Provided</h2>
        <p>
          Korima provides software development, web design, mobile app development, digital
          marketing, data analysis, and technology advisory services to businesses and organizations.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>3. User Responsibilities</h2>
        <p>When using our services, you agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain the confidentiality of any account credentials</li>
          <li>Not use our services for any unlawful or prohibited purposes</li>
          <li>Not attempt to interfere with or disrupt our services</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>4. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, images, and software, is the
          property of Korima or its licensors and is protected by Kenyan and international copyright
          laws.
        </p>
        <p>
          For client projects, intellectual property rights are typically defined in individual
          service agreements.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Korima shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages resulting from your use of our
          services.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>6. Service Agreements</h2>
        <p>
          Specific services provided to clients are governed by separate service agreements that may
          include additional terms, deliverables, timelines, and payment conditions.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to our services at our sole
          discretion, without notice, for conduct that we believe violates these Terms or is harmful
          to our business or other users.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>8. Governing Law</h2>
        <p>
          These Terms of Service are governed by and construed in accordance with the laws of Kenya.
          Any disputes arising from these terms shall be subject to the exclusive jurisdiction of
          Kenyan courts.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>9. Changes to Terms</h2>
        <p>
          We may modify these Terms of Service at any time. We will notify you of material changes
          by posting the updated terms on this page with a new effective date.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>10. Contact Information</h2>
        <p>For questions about these Terms of Service, please contact us:</p>
        <p>
          <strong>Korima Technologies</strong><br />
          Westlands, Viking House, 1st Floor<br />
          Nairobi, Kenya<br />
          <strong>Email:</strong> korirjuliu001@gmail.com<br />
          <strong>Phone:</strong> +254 707 670 780
        </p>
      </section>
    </div>
  );
}
