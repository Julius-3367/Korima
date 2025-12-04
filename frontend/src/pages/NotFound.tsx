import { Link } from 'react-router-dom';

const NotFound = () => (
  <main className="section" style={{ paddingTop: '8rem' }}>
    <div className="container" style={{ textAlign: 'center' }}>
      <span className="pill">404</span>
      <h1 className="section-title">We could not find that page.</h1>
      <p className="section-subtitle">Return home or explore services, projects, and insights from the Korima team.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  </main>
);

export default NotFound;
