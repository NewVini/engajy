import { WA_LINK } from '../config.js';
import { Bolt } from '../Icons.jsx';

export default function ProvaCTA() {
  return (
    <section className="sec provacta" data-screen-label="cta-final" style={{ paddingTop: 32, paddingBottom: 120 }}>
      <div className="wrap">
        <div className="prova-panel reveal">
          <div className="prova-copy">
            <h2>Comprove na prática<br />por apenas <span className="hl">R$5,90</span>.</h2>
            <p>Veja como a Engajy vai alavancar seu perfil com envio automático, reposição garantida e atendimento humanizado.</p>
            <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-white btn-lg">Quero Começar</a>
            <span className="prova-reassure">
              <Bolt />
              Entrega automática em até 10 minutos
            </span>
          </div>

          <div className="prova-visual">
            <img src="/assets/prova-mulher.png" alt="Mulher recebendo curtidas e seguidores" className="prova-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
