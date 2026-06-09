import { WA_LINK, onWhatsAppClick } from '../config.js';
import { HERO_CHECKS } from '../data.js';
import { Check, WhatsApp } from '../Icons.jsx';

export default function Hero() {
  return (
    <section className="hero" data-screen-label="hero">
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-glow"></span>
      </div>
      <div className="wrap">
        <div className="hero-copy">
          <span className="eyebrow reveal">Especialistas em presença digital</span>
          <h1 className="reveal d1">Fortaleça sua Presença no <span className="grad-text">Instagram</span></h1>
          <p className="hero-lead reveal d2">Mais autoridade, credibilidade e presença digital para o seu perfil.</p>

          <ul className="checks reveal d2">
            {HERO_CHECKS.map((c) => (
              <li key={c}><span className="ck"><Check /></span> {c}</li>
            ))}
          </ul>

          <p className="hero-analysis reveal d3">Receba uma análise personalizada para o seu perfil.</p>

          <div className="hero-actions reveal d3">
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-grad btn-lg" onClick={onWhatsAppClick}>🚀 Turbinar meu perfil agora</a>
            <span className="hero-micro">
              <WhatsApp />
              Resposta em poucos minutos
            </span>
          </div>
        </div>

        <div className="hero-visual reveal d2">
          <img src="/assets/hero-mulher-v2.png" alt="Cresça nas redes sociais com a Engajy" className="hero-art" />
        </div>
      </div>
    </section>
  );
}
