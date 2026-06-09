import { TESTIMONIALS } from '../data.js';
import { Stars5 } from '../Icons.jsx';

export default function Testimonials() {
  return (
    <section className="sec results" id="depoimentos" data-screen-label="depoimentos">
      <div className="wrap">
        <div className="results-head">
          <h2 className="sec-title reveal d1">Resultados que Geram Confiança</h2>
          <p className="sec-sub reveal d1">Centenas de clientes já utilizaram nossas soluções para fortalecer sua presença digital.</p>
          <div className="dual-badges reveal d2">
            <span className="dual-badge"><span className="e">⭐</span> Depoimentos de clientes</span>
            <span className="dual-badge"><span className="e">🤝</span> Atendimento humanizado</span>
          </div>
        </div>

        <div className="tgrid">
          {TESTIMONIALS.map((t, i) => (
            <article className={`tcard reveal d${(i % 3) + 1}`} key={t.name}>
              <Stars5 />
              <p className="tquote">&ldquo;{t.quote}&rdquo;</p>
              <div className="tperson">
                <span className="tav"><img src={t.photo} alt={t.name} /></span>
                <div><b>{t.name}</b><span>{t.role}</span></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
