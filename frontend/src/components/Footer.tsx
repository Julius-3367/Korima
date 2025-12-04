import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA Section */}
      <div className="footer__cta">
        <div className="container">
          <div className="footer__cta-content">
            <div>
              <span className="pill">Let's collaborate</span>
              <h2 className="footer__cta-title">Ready for your next launch?</h2>
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
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Company Info */}
            <div className="footer__brand">
              <div className="footer__logo">
                <img src="/logo.svg" alt="Korima" width={50} height={50} />
                <span className="footer__company-name">Korima</span>
              </div>
              <p className="footer__description">
                Korima engineers human software, mobile experiences, and growth programs for African enterprises.
              </p>
              <div className="footer__socials">
                <a href="https://linkedin.com/company/korima" aria-label="LinkedIn" target="_blank" rel="noreferrer">
                  <FiLinkedin />
                </a>
                <a href="https://twitter.com/korima_ke" aria-label="Twitter" target="_blank" rel="noreferrer">
                  <FiTwitter />
                </a>
                <a href="https://instagram.com/korima.ke" aria-label="Instagram" target="_blank" rel="noreferrer">
                  <FiInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__column">
              <h4 className="footer__heading">Quick Links</h4>
              <ul className="footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/portfolio">Portfolio</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Capabilities */}
            <div className="footer__column">
              <h4 className="footer__heading">Capabilities</h4>
              <ul className="footer__links">
                <li><Link to="/services">Custom Software & Systems</Link></li>
                <li><Link to="/services">POS Systems</Link></li>
                <li><Link to="/services">Website Development</Link></li>
                <li><Link to="/services">Mobile Apps</Link></li>
                <li><Link to="/services">Digital Marketing</Link></li>
                <li><Link to="/services">Data & Analytics</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer__column">
              <h4 className="footer__heading">Visit Us</h4>
              <ul className="footer__contact">
                <li>
                  <FiMapPin className="footer__icon" />
                  <span>Westlands, Viking House, 1st Floor</span>
                </li>
                <li>
                  <FiPhone className="footer__icon" />
                  <a href="tel:+254707670780">+254 707 670 780</a>
                </li>
                <li>
                  <FiMail className="footer__icon" />
                  <a href="mailto:korirjuliu001@gmail.com">korirjuliu001@gmail.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">© {year} Korima Technologies. Built in Nairobi.</p>
            <div className="footer__legal">
              <Link to="/privacy-policy">Privacy</Link>
              <Link to="/cookie-policy">Cookies</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
