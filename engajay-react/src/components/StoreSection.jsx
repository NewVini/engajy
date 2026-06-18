import { useEffect } from 'react';
import { mountStore } from '../store.js';
import { Bolt, Shield, Check, Instagram } from '../Icons.jsx';

// Seção "Impulsione suas redes" + overlay do fluxo de compra.
// A lógica do fluxo (serviço → planos → @ → Cakto) vive em store.js,
// montada uma vez após o React renderizar os elementos [data-plat]/#flow.
export default function StoreSection() {
  useEffect(() => {
    mountStore();
  }, []);

  return (
    <>
      <section className="loja-sec" id="loja" data-screen-label="loja">
        <div className="wrap">
          <div className="loja-head">
            <h2 className="loja-title reveal d1">Impulsione suas redes com <span className="grad-text">entrega automática</span></h2>
            <p className="loja-sub reveal d2">Selecione a rede social, escolha o serviço e o pacote ideal. Entrega automática, reposição por 30 dias e sem pedir sua senha.</p>
          </div>

          <div className="plat-grid plat-grid-single reveal d2">
            <button className="plat-tile" data-plat="instagram">
              <span className="plat-ico" style={{ background: 'linear-gradient(135deg,#FEDA77,#DD2A7B 45%,#8134AF 75%,#515BD4)' }}><Instagram /></span>
              <span className="plat-name">Instagram</span>
              <span className="plat-pick">Selecionar</span>
            </button>
          </div>

          <div className="loja-trust reveal d3">
            <span><Bolt /> Entrega rápida</span>
            <span><Shield /> 100% seguro</span>
            <span><Check /> Garantia de 30 dias</span>
          </div>
        </div>
      </section>

      {/* Overlay do fluxo de compra (preenchido pelo store.js) */}
      <div className="flow" id="flow" aria-hidden="true">
        <div className="flow-stage"></div>
      </div>
    </>
  );
}
