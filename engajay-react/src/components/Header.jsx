import { useEffect, useState } from 'react';
import { WA_LINK } from '../config.js';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('.hero');
    const onScroll = () => {
      const threshold = hero ? hero.offsetHeight - 110 : 80;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} data-screen-label="header">
      <div className="wrap">
        <a href="#" className="brand"><img src="/assets/engajay-logo.png" alt="Engajy" className="logo" /></a>
        <div className="header-cta">
          <a href="#beneficios" className="header-link">Benefícios</a>
          <a href="#depoimentos" className="header-link">Depoimentos</a>
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-ghost">Falar no WhatsApp</a>
        </div>
      </div>
    </header>
  );
}
