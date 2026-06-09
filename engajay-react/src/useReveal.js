import { useEffect } from 'react';

// Replica o sistema de "reveal on scroll" do site original.
// Adiciona .js-anim ao <html> e observa todos os .reveal, adicionando .in
// quando entram na viewport. Robusto contra timelines de animação congeladas.
export function useReveal() {
  useEffect(() => {
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = Array.from(document.querySelectorAll('.reveal'));

    if (!reduce) html.classList.add('js-anim');

    const revealInView = () => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      reveals.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.92 && r.bottom > 0) el.classList.add('in');
      });
    };

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
      );
      reveals.forEach((el) => io.observe(el));
    }

    revealInView();
    window.addEventListener('scroll', revealInView, { passive: true });
    window.addEventListener('load', revealInView);

    // Garantia: se nada animar, mostra tudo.
    const safety = setTimeout(() => {
      if (reduce) {
        html.classList.remove('js-anim');
        reveals.forEach((el) => el.classList.add('in'));
      }
    }, 260);

    return () => {
      window.removeEventListener('scroll', revealInView);
      window.removeEventListener('load', revealInView);
      if (io) io.disconnect();
      clearTimeout(safety);
    };
  }, []);
}
