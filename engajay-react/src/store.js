/* ============================================================
   ENGAJY — Loja / Auto-atendimento (state machine + render)
   Fluxo: plataforma → serviço → planos → checkout (detalhes → pagamento)
   ============================================================ */
export function mountStore() {
  'use strict';
  if (window.__engajyStore) return; window.__engajyStore = true;

  // ---- WhatsApp (usa o mesmo número do site) ----
  var WA_PHONE = '5511925618023';
  function waLink(msg) { return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(msg); }
  function brl(v) { return 'R$ ' + v.toFixed(2).replace('.', ','); }

  // ---- Ícones de plataforma ----
  var ICON = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor" stroke="none"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3c.3 2.1 1.7 3.7 3.8 4v2.6c-1.4 0-2.7-.4-3.8-1.1v5.9c0 3.3-2.5 5.6-5.5 5.6-3 0-5.2-2.3-5.2-5.2 0-3.1 2.6-5.3 5.8-4.9v2.8c-.4-.1-.8-.2-1.2-.2-1.4 0-2.5 1-2.5 2.5 0 1.4 1 2.5 2.4 2.5 1.5 0 2.5-1.1 2.5-2.7V3h3.4Z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.3-.4-4.8a2.6 2.6 0 0 0-1.8-1.8C19.2 5 12 5 12 5s-7.2 0-8.8.4A2.6 2.6 0 0 0 1.4 7.2C1 8.7 1 12 1 12s0 3.3.4 4.8a2.6 2.6 0 0 0 1.8 1.8C4.8 19 12 19 12 19s7.2 0 8.8-.4a2.6 2.6 0 0 0 1.8-1.8C23 15.3 23 12 23 12Zm-13 3V9l5.2 3-5.2 3Z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12Z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.2 3h3.3l-7.2 8.2L23 21h-6.6l-5.2-6.8L5.2 21H1.9l7.7-8.8L1.5 3h6.8l4.7 6.2L18.2 3Zm-1.2 16h1.8L7.1 4.9H5.2L17 19Z"/></svg>',
    kwai: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 5 6 5-6 5V7Z"/></svg>'
  };
  var PLAT_BG = {
    instagram: 'linear-gradient(135deg,#FEDA77,#DD2A7B 45%,#8134AF 75%,#515BD4)',
    tiktok: 'linear-gradient(135deg,#25F4EE,#000 45%,#FE2C55)',
    youtube: '#FF0000',
    facebook: '#1877F2',
    x: '#0A0A0A',
    kwai: 'linear-gradient(135deg,#FF7A00,#FF3D00)'
  };

  // ---- Ícones de serviço ----
  var SVC_ICON = {
    seguidores: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>',
    curtidas: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-10-9.3C.4 8.4 2 5 5.3 5c2 0 3.3 1.1 4.2 2.4l.5.7.5-.7C11.4 6.1 12.7 5 14.7 5 18 5 19.6 8.4 22 11.7 19.5 16.4 12 21 12 21Z"/></svg>',
    visualizacoes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    inscritos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>'
  };

  var SVC_LABEL = {
    seguidores: 'Seguidores', curtidas: 'Curtidas', visualizacoes: 'Visualizações', inscritos: 'Inscritos'
  };
  var SVC_DESC = {
    seguidores: 'Aumente o número de seguidores do seu perfil.',
    curtidas: 'Receba curtidas reais nas suas publicações.',
    visualizacoes: 'Aumente as views dos seus vídeos e stories.',
    inscritos: 'Cresça o número de inscritos no seu canal.'
  };

  // ---- Plataformas e serviços disponíveis (apenas Instagram) ----
  var PLATFORMS = [
    { id: 'instagram', name: 'Instagram', services: ['seguidores', 'curtidas', 'visualizacoes'] }
  ];

  // Descrições reutilizadas por posição
  var D = [
    'Ideal para testar nossa entrega com qualidade garantida.',
    'O ponto de partida perfeito para quem quer começar a crescer.',
    'A escolha mais popular. Cresça com consistência e resultado.',
    'Para quem busca escala e presença profissional.',
    'Pacote robusto para criadores que querem dominar a plataforma.',
    'Máximo volume e autoridade para perfis de alto desempenho.'
  ];

  // ---- Tabela de preços (idêntica ao site de referência; mesma para Instagram e TikTok) ----
  var PRICING = {
    seguidores: {
      regions: {
        mundiais: {
          label: '🌐 Mundiais',
          tiers: [
            { qty: 500, old: 34.90, price: 22.90, desc: D[0], link: 'https://pay.cakto.com.br/3ashc68_888778' },
            { qty: 1000, old: 64.90, price: 39.90, desc: D[1], rec: true, link: 'https://pay.cakto.com.br/rzsqqqr' },
            { qty: 2000, old: 119.90, price: 79.90, desc: D[2], link: 'https://pay.cakto.com.br/n7jjvti' },
            { qty: 3000, old: 164.90, price: 109.90, desc: D[3], link: 'https://pay.cakto.com.br/gnemtwz' },
            { qty: 5000, old: 229.90, price: 149.90, desc: D[4], link: 'https://pay.cakto.com.br/32ayv7a' },
            { qty: 10000, old: 419.90, price: 279.90, desc: D[5], link: 'https://pay.cakto.com.br/pcveogd' }
          ]
        },
        brasileiros: {
          label: '🇧🇷 Brasileiros',
          tiers: [
            { qty: 250, old: 44.90, price: 29.90, desc: D[0], link: 'https://pay.cakto.com.br/ewe8we6' },
            { qty: 500, old: 79.90, price: 49.90, desc: D[1], rec: true, link: 'https://pay.cakto.com.br/6v98wvv' },
            { qty: 1000, old: 134.90, price: 89.90, desc: D[2], link: 'https://pay.cakto.com.br/9rz9vad' },
            { qty: 2000, old: 264.90, price: 174.90, desc: D[3], link: 'https://pay.cakto.com.br/35ck6ok' },
            { qty: 3000, old: 374.90, price: 249.90, desc: D[4], link: 'https://pay.cakto.com.br/tpnsvu8' },
            { qty: 5000, old: 599.90, price: 399.90, desc: D[5], link: 'https://pay.cakto.com.br/ic8dp4e_905156' }
          ]
        }
      }
    },
    curtidas: {
      regions: {
        mundiais: {
          label: '🌐 Mundiais',
          tiers: [
            { qty: 500, old: 16.00, price: 10.90, desc: D[0], rec: true, link: 'https://pay.cakto.com.br/juyvc4i' },
            { qty: 1000, old: 29.00, price: 19.90, desc: D[1], link: 'https://pay.cakto.com.br/vkdh3vh' },
            { qty: 2000, old: 59.00, price: 39.90, desc: D[2], link: 'https://pay.cakto.com.br/hfbod7w' },
            { qty: 3000, old: 89.00, price: 59.90, desc: D[3], link: 'https://pay.cakto.com.br/n33rfhw' },
            { qty: 5000, old: 134.00, price: 89.90, desc: D[4], link: 'https://pay.cakto.com.br/pvb8arn' },
            { qty: 10000, old: 239.00, price: 159.90, desc: D[5], link: 'https://pay.cakto.com.br/cmqe4uy' }
          ]
        },
        brasileiros: {
          label: '🇧🇷 Brasileiras',
          tiers: [
            { qty: 500, old: 22.00, price: 14.90, desc: D[0], rec: true, link: 'https://pay.cakto.com.br/9jm9srr' },
            { qty: 1000, old: 44.00, price: 29.90, desc: D[1], link: 'https://pay.cakto.com.br/ewe8we6' },
            { qty: 2000, old: 89.00, price: 59.90, desc: D[2], link: 'https://pay.cakto.com.br/n33rfhw' },
            { qty: 3000, old: 134.90, price: 89.90, desc: D[3], link: 'https://pay.cakto.com.br/pvb8arn' },
            { qty: 5000, old: 194.00, price: 129.90, desc: D[4], link: 'https://pay.cakto.com.br/r4qmytz' },
            { qty: 10000, old: 374.00, price: 249.90, desc: D[5], link: 'https://pay.cakto.com.br/599r8uy' }
          ]
        }
      }
    },
    visualizacoes: {
      regions: {
        mundiais: {
          label: '🌐 Mundiais',
          tiers: [
            { qty: 1000, old: 16.90, price: 10.90, desc: D[0], rec: true, link: 'https://pay.cakto.com.br/juyvc4i' },
            { qty: 2000, old: 29.90, price: 19.90, desc: D[1], link: 'https://pay.cakto.com.br/vkdh3vh' },
            { qty: 3000, old: 44.90, price: 29.90, desc: D[2], link: 'https://pay.cakto.com.br/ewe8we6' },
            { qty: 5000, old: 67.90, price: 44.90, desc: D[3], link: 'https://pay.cakto.com.br/fsdhgk7' },
            { qty: 10000, old: 112.90, price: 74.90, desc: D[4], link: 'https://pay.cakto.com.br/zdno2h3' },
            { qty: 35000, old: 209.90, price: 139.90, desc: D[5], link: 'https://pay.cakto.com.br/d7d3xhh' }
          ]
        },
        brasileiros: {
          label: '🇧🇷 Brasileiras',
          tiers: [
            { qty: 1000, old: 24.90, price: 15.90, desc: D[0], rec: true, link: 'https://pay.cakto.com.br/398twtg' },
            { qty: 2000, old: 44.90, price: 28.90, desc: D[1], link: 'https://pay.cakto.com.br/36e8oj7' },
            { qty: 3000, old: 64.90, price: 42.90, desc: D[2], link: 'https://pay.cakto.com.br/3estdo5' },
            { qty: 5000, old: 99.90, price: 64.90, desc: D[3], link: 'https://pay.cakto.com.br/42pak3j' },
            { qty: 10000, old: 164.90, price: 109.90, desc: D[4], link: 'https://pay.cakto.com.br/i9fbgav' },
            { qty: 35000, old: 309.90, price: 199.90, desc: D[5], link: 'https://pay.cakto.com.br/33a3faf' }
          ]
        }
      }
    }
  };

  function regionLabel(service, region) { return PRICING[service].regions[region].label; }
  function tiersFor(service, region) { return PRICING[service].regions[region].tiers; }

  // Benefícios por serviço (iguais ao site de referência)
  var BENEFITS = {
    seguidores: [
      'Envio automático e imediato',
      'Não precisa de senha',
      'Reposição garantida por 30 dias',
      'Entrega progressiva e 100% discreta',
      'Atendimento humano via WhatsApp'
    ],
    curtidas: [
      'Envio automático e imediato',
      'Não precisa de senha',
      'Distribuição natural',
      '100% discreto',
      'Atendimento humano via WhatsApp'
    ],
    visualizacoes: [
      'Envio automático e imediato',
      'Não precisa de senha',
      'Distribuição natural',
      '100% discreto',
      'Atendimento humano via WhatsApp'
    ]
  };

  function pkgLabel(pkg, service) {
    return pkg.qty.toLocaleString('pt-BR') + ' ' + SVC_LABEL[service];
  }

  // ---- Estado ----
  var st = { view: null, platform: null, service: null, region: 'mundiais', pkg: null, method: 'pix', user: '', email: '' };
  var overlay, stage;

  function platById(id) { for (var i = 0; i < PLATFORMS.length; i++) if (PLATFORMS[i].id === id) return PLATFORMS[i]; return null; }

  // ---------- helpers de render ----------
  var checkIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  var chevIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>';
  var waIco = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Z"/></svg>';
  var shieldIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>';
  var boltIco = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/></svg>';

  function benefitsHtml(service) {
    var li = BENEFITS[service].map(function (b) { return '<li><span class="bc">' + checkIco + '</span>' + b + '</li>'; }).join('');
    return '<ul class="plan-benefits"><span class="bt">Incluso no pacote</span>' + li + '</ul>';
  }

  // ---------- Views ----------
  function renderService() {
    var p = platById(st.platform);
    var rows = p.services.map(function (s) {
      return '<button class="svc-row" data-svc="' + s + '">' +
        '<span class="svc-ico">' + SVC_ICON[s] + '</span>' +
        '<span class="svc-txt"><b>' + SVC_LABEL[s] + '</b><span>' + SVC_DESC[s] + '</span></span>' +
        '<span class="chev">' + chevIco + '</span></button>';
    }).join('');
    stage.innerHTML =
      '<div class="flow-modal">' +
        '<div class="fm-head">' +
          '<span class="fm-ico" style="background:' + PLAT_BG[p.id] + '">' + ICON[p.id] + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<button class="fm-close" data-act="close" aria-label="Fechar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '</div>' +
        '<p class="fm-sub">Escolha qual tipo de serviço você deseja adquirir.</p>' +
        '<div class="svc-list">' + rows + '</div>' +
      '</div>';
  }

  function logoSrc() {
    // Reaproveita o logo JÁ embutido no header (o empacotador não embute caminhos dentro do JS).
    var el = document.querySelector('.header .logo') || document.querySelector('.footer .logo');
    return el ? el.getAttribute('src') : '/assets/engajay-logo-opt.png';
  }

  function renderUserModal() {
    var p = platById(st.platform);
    var svc = SVC_LABEL[st.service];
    stage.innerHTML =
      '<div class="flow-modal">' +
        '<div class="fm-head">' +
          '<span class="fm-ico" style="background:' + PLAT_BG[p.id] + '">' + ICON[p.id] + '</span>' +
          '<h3>Quase lá!</h3>' +
          '<button class="fm-close" data-act="toPlans" aria-label="Voltar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '</div>' +
        '<p class="fm-sub">Confirme seu @ para entregarmos no perfil certo.</p>' +
        '<div class="um-summary">' +
          '<div class="um-left">' +
            '<span class="um-ic">' + SVC_ICON[st.service] + '</span>' +
            '<div><b>' + pkgLabel(st.pkg, st.service) + '</b><small>' + p.name + ' • ' + regionLabel(st.service, st.region).replace(/^[^ ]+ /, '') + '</small></div>' +
          '</div>' +
          '<span class="um-price">' + brl(st.pkg.price) + '</span>' +
        '</div>' +
        '<div class="um-field">' +
          '<label>Seu @ no ' + p.name + '</label>' +
          '<div class="um-input">' +
            '<span class="at">@</span>' +
            '<input id="umUser" type="text" placeholder="seu_usuario" value="' + (st.user || '') + '" autocomplete="off" autocapitalize="off" spellcheck="false" />' +
          '</div>' +
          '<span class="um-err" id="umErr">Digite seu nome de usuário para continuar.</span>' +
        '</div>' +
        '<button class="btn btn-grad btn-lg um-go" data-act="goPay">' +
          'Ir para o pagamento' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" style="width:1.1em;height:1.1em"><path d="m9 18 6-6-6-6"/></svg>' +
        '</button>' +
        '<div class="um-secure">' + shieldIco + ' Não pedimos sua senha. Só precisamos do seu @ público.</div>' +
      '</div>';
    var inp = document.getElementById('umUser');
    if (inp) {
      inp.focus();
      inp.addEventListener('input', function () { st.user = inp.value; inp.classList.remove('err'); document.getElementById('umErr').classList.remove('show'); });
      inp.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') { ev.preventDefault(); goPay(); } });
    }
  }

  function goPay() {
    var inp = document.getElementById('umUser');
    var val = (inp && inp.value || '').trim().replace(/^@+/, '');
    if (!val) {
      if (inp) { inp.classList.add('err'); inp.focus(); }
      var err = document.getElementById('umErr');
      if (err) err.classList.add('show');
      return;
    }
    st.user = val;
    if (st.pkg.link) {
      window.open(st.pkg.link, '_blank', 'noopener');
    } else {
      var p = platById(st.platform);
      var m = 'Olá vim pelo site, quero comprar:\n\n' +
        '• Plataforma: ' + p.name + '\n' +
        '• Serviço: ' + pkgLabel(st.pkg, st.service) + '\n' +
        '• Tipo: ' + regionLabel(st.service, st.region).replace(/^[^ ]+ /, '') + '\n' +
        '• Valor: ' + brl(st.pkg.price) + '\n' +
        '• Usuário: @' + val;
      window.open(waLink(m), '_blank', 'noopener');
    }
  }

  function topbar(backAct, backLabel) {
    return '<div class="flow-topbar">' +
      '<a class="flow-back" data-act="' + backAct + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>' + backLabel + '</a>' +
      '<img src="' + logoSrc() + '" alt="Engajy" class="logo" />' +
      '<a class="flow-wa" href="' + waLink('Olá vim pelo site, gostaria de saber sobre os seguidores.') + '" target="_blank" rel="noopener">Falar no WhatsApp ↗</a>' +
    '</div>';
  }

  function renderPlans() {
    var p = platById(st.platform);
    var svc = SVC_LABEL[st.service];
    var tiers = tiersFor(st.service, st.region);
    var cards = tiers.map(function (t, i) {
      return '<article class="plan' + (t.rec ? ' popular' : '') + '">' +
        (t.rec ? '<span class="plan-badge">Popular</span>' : '') +
        '<div class="plan-top">' +
          '<span class="plan-qty">' +
            '<span class="q-ic">' + SVC_ICON[st.service] + '</span>' +
            '<span class="q-meta"><span class="q-n">' + t.qty.toLocaleString('pt-BR') + '</span><span class="q-l">' + svc + '</span></span>' +
          '</span>' +
        '</div>' +
        '<p class="plan-desc">' + t.desc + '</p>' +
        '<div class="plan-price"><span class="old">' + brl(t.old) + '</span><span class="now">' + brl(t.price) + '</span>' +
          '<span class="pay">Pagamento único</span></div>' +
        '<button class="btn ' + (t.rec ? 'btn-grad' : 'btn-dark') + ' plan-buy" data-buy="' + i + '">Comprar Agora</button>' +
        benefitsHtml(st.service) +
      '</article>';
    }).join('');

    var note = 'Entrega automática • Reposição garantida por 30 dias • Não solicitamos sua senha.';

    stage.innerHTML =
      '<div class="flow-page">' +
        topbar('toService', 'Trocar serviço') +
        '<div class="plans-wrap">' +
          '<div class="plans-head">' +
            '<span class="plans-eyebrow">' + SVC_ICON[st.service] + ' ' + svc.toUpperCase() + ' NO ' + p.name.toUpperCase() + '</span>' +
            '<h2>Temos um plano perfeito para o <span class="hl">seu ' + p.name + '</span></h2>' +
            '<p>Mais de 10 mil criadores já impulsionaram suas redes com a Engajy. Escolha o pacote ideal com entrega automática, reposição por 30 dias e atendimento humano.</p>' +
            '<div class="region-toggle">' +
              '<button data-region="mundiais" class="' + (st.region === 'mundiais' ? 'active' : '') + '">' + regionLabel(st.service, 'mundiais') + '</button>' +
              '<button data-region="brasileiros" class="' + (st.region === 'brasileiros' ? 'active' : '') + '">' + regionLabel(st.service, 'brasileiros') + '</button>' +
            '</div>' +
          '</div>' +
          '<div class="plans-grid">' + cards + '</div>' +
          '<p class="plans-note">' + note + '</p>' +
          '<div class="plans-foot">' +
            '<span>' + boltIco + ' Entrega em até 10 minutos</span>' +
            '<span>' + shieldIco + ' Pagamento seguro</span>' +
            '<span>' + shieldIco + ' Sem pedir senha</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  function pixSvg() {
    // QR decorativo (placeholder visual)
    var cells = '';
    var seed = 7;
    for (var y = 0; y < 21; y++) for (var x = 0; x < 21; x++) {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      var on = (seed >> 8) & 1;
      var corner = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13);
      if (corner) {
        var lx = x > 13 ? x - 14 : x, ly = y > 13 ? y - 14 : y;
        on = (lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4)) ? 1 : 0;
      }
      if (on) cells += '<rect x="' + (x * 7) + '" y="' + (y * 7) + '" width="7" height="7"/>';
    }
    return '<svg viewBox="0 0 147 147" fill="#1A1130">' + cells + '</svg>';
  }

  function renderCheckout() {
    var p = platById(st.platform);
    var svc = SVC_LABEL[st.service];
    var summary =
      '<div class="co-summary"><div class="left">' +
        '<span class="ci" style="background:' + PLAT_BG[p.id] + '">' + ICON[p.id] + '</span>' +
        '<div><b>' + pkgLabel(st.pkg, st.service) + '</b><small>' + p.name + ' • ' + regionLabel(st.service, st.region).replace(/^[^ ]+ /, '') + '</small></div>' +
      '</div><span class="price">' + brl(st.pkg.price) + '</span></div>';

    var detalhesActive = st.coStep !== 2;
    var steps =
      '<div class="co-steps">' +
        '<span class="co-step ' + (st.coStep === 2 ? 'done' : 'active') + '"><span class="n">' + (st.coStep === 2 ? '✓' : '1') + '</span> Detalhes</span>' +
        '<span class="co-sep"></span>' +
        '<span class="co-step ' + (st.coStep === 2 ? 'active' : '') + '"><span class="n">2</span> Checkout</span>' +
      '</div>';

    var body;
    if (st.coStep !== 2) {
      body =
        '<div class="co-card">' +
          '<span class="ig-ball" style="background:' + PLAT_BG[p.id] + '">' + ICON[p.id] + '</span>' +
          '<h3>Comece agora</h3>' +
          '<div class="co-live"><span class="dot"></span> ' + (18 + Math.floor(Math.random() * 22)) + ' usuários reais no checkout</div>' +
          '<div class="co-field"><label>Nome de usuário no ' + p.name + '</label>' +
            '<div class="co-input"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6"/></svg>' +
            '<input id="coUser" type="text" placeholder="seu_usuario" value="' + (st.user || '') + '" autocomplete="off" /></div></div>' +
          '<div class="co-field"><label>Endereço de email</label>' +
            '<div class="co-input"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>' +
            '<input id="coEmail" type="email" placeholder="seu@email.com" value="' + (st.email || '') + '" autocomplete="off" /></div></div>' +
          '<button class="btn btn-grad btn-lg co-continue" data-act="toPay">Continuar →</button>' +
          '<div class="co-secure">' + shieldIco + ' Não é necessária senha. Sua conta permanece segura.</div>' +
        '</div>' +
        extrasHtml();
    } else {
      body =
        '<div class="co-card">' +
          '<h3 style="margin-bottom:18px">Pagamento</h3>' +
          '<div class="pay-methods">' +
            '<button class="pay-method ' + (st.method === 'pix' ? 'active' : '') + '" data-method="pix">Pix<small>Aprovação na hora</small></button>' +
            '<button class="pay-method ' + (st.method === 'cartao' ? 'active' : '') + '" data-method="cartao">Cartão<small>Crédito</small></button>' +
          '</div>' +
          (st.method === 'pix'
            ? '<div class="pix-box"><div class="pix-qr">' + pixSvg() + '</div>' +
              '<div class="pix-code"><input value="00020126engajy-pix-' + st.pkg.qty + '-' + Date.now().toString().slice(-6) + '5204000053039865802BR" readonly /><button class="pix-copy" data-act="copyPix">Copiar</button></div></div>'
            : '<div class="co-field"><label>Número do cartão</label><div class="co-input"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg><input type="text" placeholder="0000 0000 0000 0000" /></div></div>') +
          '<div class="co-total"><span class="l">Total</span><span class="v">' + brl(st.pkg.price) + '</span></div>' +
          '<button class="btn btn-grad btn-lg co-continue" data-act="finish">Finalizar pedido</button>' +
          '<div class="co-secure">' + shieldIco + ' Pagamento 100% seguro • Entrega automática após a confirmação</div>' +
        '</div>';
    }

    stage.innerHTML =
      '<div class="flow-page">' +
        topbar(st.coStep === 2 ? 'toDetails' : 'toPlans', 'Voltar') +
        '<div class="co-wrap">' + steps + summary + body + '</div>' +
      '</div>';

    var u = document.getElementById('coUser');
    if (u) {
      u.addEventListener('input', function () { st.user = u.value; });
      var e = document.getElementById('coEmail');
      e.addEventListener('input', function () { st.email = e.value; });
    }
  }

  function extrasHtml() {
    return '<div class="co-extra">' +
      '<div class="co-quote"><div class="qh"><div class="qp"><img src="assets/dep-mulher-1-sm.png" alt="" /><b>Bruna Queiroz</b></div>' +
        '<span class="stars" style="color:#FFB300;display:flex;gap:2px">' + star() + star() + star() + star() + star() + '</span></div>' +
        '<p>"Comprei seguidores para minha loja e recebi tudo em menos de 1 hora. Muito rápido e confiável!"</p></div>' +
      '<div class="co-stats">' +
        '<div class="co-stat"><b>+50k</b><span>Clientes</span></div>' +
        '<div class="co-stat"><b>4.9/5</b><span>Avaliação média</span></div>' +
        '<div class="co-stat"><b>98%</b><span>Satisfação</span></div>' +
      '</div>' +
      badge(boltIco, 'linear-gradient(135deg,#FF2E9F,#7C18E0)', 'Entrega Automática', 'Imediata após o pagamento') +
      badge(waIco, 'linear-gradient(180deg,#2BE070,#1FB955)', 'Suporte Humano', 'Atendimento via WhatsApp') +
      badge(shieldIco, 'linear-gradient(135deg,#7C18E0,#4527E0)', 'Compra Segura', 'Não pedimos sua senha') +
    '</div>';
  }
  function badge(ico, bg, t, s) {
    return '<div class="co-badge"><span class="bi" style="background:' + bg + '">' + ico + '</span>' +
      '<div><b>' + t + '</b><span>' + s + '</span></div>' +
      '<span class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></span></div>';
  }
  function star() { return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2Z"/></svg>'; }

  // ---------- Controle de view ----------
  function render() {
    if (st.view === 'service') renderService();
    else if (st.view === 'plans') renderPlans();
    else if (st.view === 'usermodal') renderUserModal();
    else if (st.view === 'checkout') renderCheckout();
    stage.scrollTop = 0;
    overlay.scrollTop = 0;
  }
  function open(view) {
    st.view = view;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
  }
  function close() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ---------- Eventos ----------
  function onClick(e) {
    var t = e.target.closest('[data-act],[data-svc],[data-buy],[data-region],[data-method]');
    if (!t) return;

    if (t.dataset.svc) { st.service = t.dataset.svc; st.region = 'mundiais'; st.view = 'plans'; render(); return; }
    if (t.dataset.region) { st.region = t.dataset.region; render(); return; }
    if (t.dataset.buy != null) {
      var tiers = tiersFor(st.service, st.region);
      st.pkg = tiers[+t.dataset.buy];
      st.view = 'usermodal';
      render();
      return;
    }
    if (t.dataset.method) { st.method = t.dataset.method; renderCheckout(); return; }

    var a = t.dataset.act;
    if (a === 'close') close();
    else if (a === 'goPay') goPay();
    else if (a === 'toService') { st.view = 'service'; render(); }
    else if (a === 'toPlans') { st.view = 'plans'; render(); }
    else if (a === 'toDetails') { st.coStep = 1; renderCheckout(); }
    else if (a === 'toPay') {
      var u = document.getElementById('coUser');
      if (!u.value.trim()) { u.classList.add('err'); u.focus(); return; }
      st.coStep = 2; renderCheckout();
    }
    else if (a === 'copyPix') {
      var inp = stage.querySelector('.pix-code input');
      inp.select();
      try { document.execCommand('copy'); } catch (x) {}
      t.textContent = 'Copiado ✓';
      setTimeout(function () { t.textContent = 'Copiar'; }, 1800);
    }
    else if (a === 'finish') {
      var p = platById(st.platform);
      var msg = 'Olá vim pelo site, gostaria de finalizar meu pedido:\n\n' +
        '• Plataforma: ' + p.name + '\n' +
        '• Serviço: ' + pkgLabel(st.pkg, st.service) + '\n' +
        '• Tipo: ' + regionLabel(st.service, st.region).replace(/^[^ ]+ /, '') + '\n' +
        '• Valor: ' + brl(st.pkg.price) + '\n' +
        (st.user ? '• Usuário: @' + st.user.replace(/^@/, '') + '\n' : '');
      window.open(waLink(msg), '_blank', 'noopener');
    }
  }

  // ---------- Init ----------
  function init() {
    overlay = document.getElementById('flow');
    if (!overlay) return;
    stage = overlay.querySelector('.flow-stage');

    document.querySelectorAll('[data-plat]').forEach(function (tile) {
      tile.addEventListener('click', function () { st.platform = tile.dataset.plat; open('service'); });
    });
    document.querySelectorAll('[data-open-store]').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.preventDefault();
        var sec = document.getElementById('loja');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      });
    });

    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    stage.addEventListener('click', onClick);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
  }

  init();
}
