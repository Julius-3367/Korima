import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = () => setOpen(false);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <img src="/logo.svg" alt="Korima" width={44} height={44} />
          <div>
            <span>Korima</span>
            <small>Software & Digital Lab</small>
          </div>
        </Link>

        <div className={`nav-links ${open ? 'nav-links--open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? 'nav-link nav-link--active' : 'nav-link')}
            >
              {link.label}
            </NavLink>
          ))}
          <a className="btn btn-primary nav-cta" href="mailto:korirjuliu001@gmail.com">
            Email Us
          </a>
        </div>

        <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setOpen((prev) => !prev)}>
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
