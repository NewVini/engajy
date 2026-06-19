import { WA_LINK, onWhatsAppClick } from '../config.js';
import { WhatsApp, Shield } from '../Icons.jsx';

export default function FinalCTA() {
  return (
    <section className="sec finalcta" data-screen-label="cta-final" style={{ paddingTop: 32, paddingBottom: 140 }}>
      <div className="wrap">
        <div className="panel reveal">
          <h2>Fale com um especialista e fortaleça seu perfil</h2>
          <p>Descubra agora a melhor estratégia para aumentar sua autoridade e presença digital no Instagram.</p>
          <div className="btn-wrap">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-wa btn-lg" onClick={onWhatsAppClick}>
              <WhatsApp />
              FALE AGORA NO WHATSAPP
            </a>
            <span className="reassure">
              <Shield width="16" height="16" />
              Receba em até 10 minutos ou devolvemos o seu dinheiro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
