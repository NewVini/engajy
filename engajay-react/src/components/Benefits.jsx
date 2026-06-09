import { BENEFITS } from '../data.js';
import { ShieldCheck, Star, Trending } from '../Icons.jsx';

const ICONS = { shieldCheck: ShieldCheck, star: Star, trending: Trending };

export default function Benefits() {
  return (
    <section className="sec" id="beneficios" data-screen-label="beneficios" style={{ paddingBottom: 32 }}>
      <div className="wrap center">
        <h2 className="sec-title reveal d1">Por que investir na sua presença digital?</h2>
      </div>
      <div className="wrap">
        <div className="bgrid">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon];
            return (
              <article className={`bcard reveal d${i + 1}`} key={b.title}>
                <div className="bicon"><Icon /></div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
