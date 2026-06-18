import { FEATURES } from '../data.js';
import { FEATURE_ICONS } from '../Icons.jsx';

export default function Features() {
  return (
    <section className="feat-sec" data-screen-label="garantias">
      <div className="wrap">
        <div className="feat-grid">
          {FEATURES.map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon];
            return (
              <article className={`feat-card reveal d${i + 1}`} key={f.title}>
                <div className="feat-head">
                  <span className="feat-ic"><Icon /></span>
                  <h3>{f.title}</h3>
                </div>
                <p>{f.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
