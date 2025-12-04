import { FiMessageCircle } from 'react-icons/fi';

const WhatsAppButton = () => (
  <a
    className="floating-whatsapp"
    href="https://wa.me/254707670780"
    target="_blank"
    rel="noreferrer"
    aria-label="WhatsApp Korima"
  >
    <div className="floating-whatsapp__icon">
      <FiMessageCircle />
    </div>
    <span className="floating-whatsapp__label">Talk to Korima</span>
  </a>
);

export default WhatsAppButton;
