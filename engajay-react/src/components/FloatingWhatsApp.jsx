import { WA_LINK, onWhatsAppClick } from '../config.js';
import { WhatsApp } from '../Icons.jsx';

export default function FloatingWhatsApp() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" className="wa-float" aria-label="Falar no WhatsApp" onClick={onWhatsAppClick}>
      <WhatsApp />
      <span className="lbl">Falar com especialista</span>
    </a>
  );
}
