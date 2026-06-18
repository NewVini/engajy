import { WA_LINK } from '../config.js';
import { WhatsApp } from '../Icons.jsx';

export default function FloatingWhatsApp() {
  return (
    <a href={WA_LINK} target="_blank" rel="noopener" className="wa-float" aria-label="Falar no WhatsApp">
      <WhatsApp />
      <span className="lbl">Falar com especialista</span>
    </a>
  );
}
