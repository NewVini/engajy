# Engajy — Landing Page (React + Vite)

Landing page de alta conversão da **Engajy**, focada em fortalecer a presença digital no Instagram, com atendimento via WhatsApp.

## 🚀 Como rodar

Pré-requisito: ter o [Node.js](https://nodejs.org) 18+ instalado.

```bash
# 1. instale as dependências
npm install

# 2. rode em modo desenvolvimento (abre em http://localhost:5173)
npm run dev

# 3. gere a versão de produção (pasta dist/)
npm run build

# 4. pré-visualize o build de produção
npm run preview
```

Para publicar, suba o conteúdo da pasta `dist/` em qualquer hospedagem (Vercel, Netlify, Hostinger, etc.). Você também pode renomear/servir como site estático.

## ✏️ Onde editar as coisas

| O quê | Arquivo |
|---|---|
| **Número e mensagem do WhatsApp** | `src/config.js` |
| Razão social, CNPJ, marca | `src/config.js` |
| Depoimentos | `src/data.js` |
| Benefícios e checks do hero | `src/data.js` |
| Textos da Política / Termos | `src/components/LegalModal.jsx` |
| Cores, fontes e tokens da marca | `src/styles.css` (bloco `:root`) |
| Imagens (logo, hero, fotos) | `public/assets/` |

> **WhatsApp:** já configurado para **(011) 91650-1341** com a mensagem
> "Olá vim pelo site, gostaria de saber sobre os seguidores." — troque em `src/config.js`.

## 🧩 Estrutura

```
engajay-react/
├─ index.html              # HTML raiz (fontes + meta)
├─ package.json
├─ vite.config.js
├─ public/
│  └─ assets/              # logo, arte do hero, fotos dos depoimentos
└─ src/
   ├─ main.jsx             # ponto de entrada
   ├─ App.jsx              # monta as seções
   ├─ styles.css           # design system + estilos das seções
   ├─ config.js            # WhatsApp + dados da empresa
   ├─ data.js              # depoimentos, benefícios, checks
   ├─ Icons.jsx            # ícones SVG
   ├─ useReveal.js         # animação "reveal on scroll"
   └─ components/
      ├─ Header.jsx
      ├─ Hero.jsx
      ├─ Testimonials.jsx
      ├─ Benefits.jsx
      ├─ FinalCTA.jsx
      ├─ Footer.jsx
      ├─ LegalModal.jsx     # Política de Privacidade + Termos de Uso
      └─ FloatingWhatsApp.jsx
```

## ⚖️ Conformidade

O rodapé e os documentos legais (Política de Privacidade e Termos de Uso) já trazem razão social, CNPJ e o aviso de que **a senha nunca é solicitada** — itens importantes para aprovação em plataformas de anúncios.

© 2026 Engajy — INNOVATE SERVIÇOS DIGITAIS LTDA · CNPJ 35.555.991/0001-53
