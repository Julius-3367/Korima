import { useState, useEffect } from 'react';
import '../styles/CookieConsent.css';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('korima-cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const saved = JSON.parse(consent);
      setPreferences(saved);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem('korima-cookie-consent', JSON.stringify(allAccepted));
    setPreferences(allAccepted);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem('korima-cookie-consent', JSON.stringify(onlyNecessary));
    setPreferences(onlyNecessary);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('korima-cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    setShowPreferences(false);
  };

  const togglePreference = (key: 'analytics' | 'marketing') => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        {!showPreferences ? (
          <>
            <div className="cookie-consent-header">
              <h3>🍪 We Value Your Privacy</h3>
            </div>
            <div className="cookie-consent-body">
              <p>
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
              <p className="cookie-consent-gdpr">
                In compliance with GDPR and CCPA regulations, you have full control over your data. 
                You can customize your preferences or reject non-essential cookies.
              </p>
            </div>
            <div className="cookie-consent-actions">
              <button onClick={handleRejectAll} className="btn-reject">
                Reject All
              </button>
              <button onClick={() => setShowPreferences(true)} className="btn-preferences">
                Customize
              </button>
              <button onClick={handleAcceptAll} className="btn-accept">
                Accept All
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="cookie-consent-header">
              <h3>Cookie Preferences</h3>
            </div>
            <div className="cookie-consent-body cookie-preferences">
              <div className="preference-item">
                <div className="preference-info">
                  <label>
                    <strong>Necessary Cookies</strong>
                    <span className="required-badge">Required</span>
                  </label>
                  <p>Essential for the website to function properly. Cannot be disabled.</p>
                </div>
                <input type="checkbox" checked disabled />
              </div>
              
              <div className="preference-item">
                <div className="preference-info">
                  <label>
                    <strong>Analytics Cookies</strong>
                  </label>
                  <p>Help us understand how visitors interact with our website.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.analytics}
                  onChange={() => togglePreference('analytics')}
                />
              </div>
              
              <div className="preference-item">
                <div className="preference-info">
                  <label>
                    <strong>Marketing Cookies</strong>
                  </label>
                  <p>Used to track visitors across websites to display relevant ads.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={preferences.marketing}
                  onChange={() => togglePreference('marketing')}
                />
              </div>
            </div>
            <div className="cookie-consent-actions">
              <button onClick={() => setShowPreferences(false)} className="btn-back">
                Back
              </button>
              <button onClick={handleSavePreferences} className="btn-save">
                Save Preferences
              </button>
            </div>
          </>
        )}
        
        <div className="cookie-consent-footer">
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          {' • '}
          <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
            Cookie Policy
          </a>
        </div>
      </div>
    </div>
  );
}
