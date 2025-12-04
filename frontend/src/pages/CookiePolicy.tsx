import { useSEO } from '../hooks/useSEO';

export default function CookiePolicy() {
  useSEO({
    title: 'Cookie Policy | Korima',
    description: 'Learn about how Korima uses cookies and similar technologies.',
  });

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '4rem 2rem' }}>
      <h1>Cookie Policy</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        <strong>Effective Date:</strong> December 4, 2025
      </p>

      <section style={{ marginBottom: '2rem' }}>
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit our website. They help
          us provide you with a better experience by remembering your preferences and understanding
          how you use our site.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>2. Types of Cookies We Use</h2>
        
        <h3>Necessary Cookies (Required)</h3>
        <p>
          These cookies are essential for the website to function properly. They enable core
          functionality such as security, network management, and accessibility. You cannot opt out
          of these cookies.
        </p>

        <h3>Analytics Cookies (Optional)</h3>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and
          reporting information anonymously. We use this data to improve our website performance and
          user experience.
        </p>

        <h3>Marketing Cookies (Optional)</h3>
        <p>
          These cookies track your activity across websites to display relevant advertisements. They
          may be set by us or third-party advertising partners.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>3. Managing Your Cookie Preferences</h2>
        <p>
          You can manage your cookie preferences at any time using our cookie consent banner. You
          can also control cookies through your browser settings:
        </p>
        <ul>
          <li><strong>Google Chrome:</strong> Settings → Privacy and security → Cookies</li>
          <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
        </ul>
        <p>
          Note that disabling certain cookies may affect your experience and limit functionality.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>4. Third-Party Cookies</h2>
        <p>
          Some cookies on our site are set by third-party services we use for analytics, social
          media, and advertising. These third parties have their own cookie policies:
        </p>
        <ul>
          <li>Google Analytics</li>
          <li>Social media platforms (LinkedIn, Twitter, Instagram)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>5. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or
          for legal reasons. Please review this page periodically.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>6. Contact Us</h2>
        <p>
          If you have questions about our use of cookies, please contact us at{' '}
          <a href="mailto:korirjuliu001@gmail.com">korirjuliu001@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}
