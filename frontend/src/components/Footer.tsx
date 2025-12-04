import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiExternalLink, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__cta">
        <div>
          <p className="pill">Let’s collaborate</p>
          <h3>Ready for your next launch?</h3>
        </div>
        <div className="footer__cta-actions">
          <a className="btn btn-primary" href="https://wa.me/254707670780" target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
          <a className="btn btn-outline" href="mailto:korirjuliu001@gmail.com">
            korirjuliu001@gmail.com
          </a>
        </div>
      </div>

      <div className="container footer-grid">
        <div>
          <img src="/logo.svg" alt="Korima" width={70} height={70} />
          <p className="footer__description">
            Korima engineers human software, mobile experiences, and growth programs for African enterprises.
          </p>
          <div className="footer__socials">
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer"><FiLinkedin /></a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer"><FiTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><FiInstagram /></a>
          </div>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Capabilities</h4>
          <ul>
            <li>Product Strategy & Discovery</li>
            <li>Web & Mobile Engineering</li>
            <li>Data & Analytics</li>
            <li>Digital Marketing & SEO</li>
            <li>Technology Advisory</li>
          </ul>
        </div>

        <div>
          <h4>Visit Us</h4>
          <ul className="footer__contact">
            <li><FiMapPin /> Westlands, Viking House, 1st Floor</li>
            <li>
              <FiPhone />
              <a href="tel:+254707670780">+254 707 670 780</a>
            </li>
            <li>
              <FiMail />
              <a href="mailto:korirjuliu001@gmail.com">korirjuliu001@gmail.com</a>
            </li>
          </ul>
          <a className="footer__map" href="https://goo.gl/maps/imYogKenya" target="_blank" rel="noreferrer">
            See on Maps <FiExternalLink />
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} Korima Technologies. Built in Nairobi.</p>
        <div className="footer__legal">
          <Link to="/privacy">Privacy</Link>
          <span>•</span>
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
