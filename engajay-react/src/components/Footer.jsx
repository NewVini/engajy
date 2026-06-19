import { WA_LINK, COMPANY, onWhatsAppClick } from '../config.js';

export default function Footer({ onOpenLegal }) {
  return (
    <footer className="footer" data-screen-label="footer">
      <div className="wrap">
        <div className="top">
          <div className="fcol" style={{ maxWidth: 320 }}>
            <img
              src="/assets/engajay-logo.png"
              alt="Engajy"
              className="logo"
              style={{ filter: 'brightness(0) invert(1)', opacity: 0.95, marginBottom: 14, height: 70 }}
            />
            <p style={{ fontSize: '.92rem', lineHeight: 1.6 }}>
              {COMPANY.brand} — Soluções para fortalecer a autoridade, a credibilidade e a presença digital do seu perfil no Instagram.
            </p>
          </div>
          <div className="fcol">
            <h4>Institucional</h4>
            <div className="footer-links">
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenLegal('privacidade'); }}>Política de Privacidade</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onOpenLegal('termos'); }}>Termos de Uso</a>
            </div>
          </div>
          <div className="fcol">
            <h4>Contato</h4>
            <div className="footer-links">
              <a href={WA_LINK} target="_blank" rel="noopener" onClick={onWhatsAppClick}>WhatsApp: {COMPANY.whatsappLabel}</a>
            </div>
          </div>
        </div>
        <div className="bottom">
          <span className="cnpj">{COMPANY.legalName} — CNPJ {COMPANY.cnpj}</span>
          <span className="cnpj">© 2026 {COMPANY.brand}. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
