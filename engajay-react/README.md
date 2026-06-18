# Engajy — Site (React + Vite)

Landing page + loja de auto-atendimento da **Engajy** (seguidores, curtidas e visualizações para Instagram), com checkout via links Cakto e atendimento por WhatsApp.

## 🚀 Como rodar

Pré-requisito: [Node.js](https://nodejs.org) 18+.

```bash
npm install      # instala as dependências
npm run dev      # ambiente local (http://localhost:5173)
npm run build    # gera a pasta dist/ para produção
npm run preview  # pré-visualiza o build
```

## ☁️ Deploy na Vercel

O projeto já vem com `vercel.json`. Basta importar o repositório na Vercel — ela detecta o Vite automaticamente:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

## ✏️ Onde editar

| O quê | Arquivo |
|---|---|
| **WhatsApp** (número e mensagem) | `src/config.js` |
| Razão social, CNPJ, marca | `src/config.js` |
| **Preços, pacotes e links Cakto** | `src/store.js` (objeto `PRICING`) |
| Depoimentos, benefícios, garantias | `src/data.js` |
| Textos de Política / Termos | `src/components/LegalModal.jsx` |
| Cores, fontes e tokens da marca | `src/styles.css` (bloco `:root`) |
| Imagens (logo, hero, fotos) | `public/assets/` |

## 🧩 Estrutura

```
engajay-react/
├─ index.html
├─ package.json
├─ vite.config.js
├─ vercel.json
├─ public/assets/            # logo, hero, fotos dos depoimentos
└─ src/
   ├─ main.jsx               # ponto de entrada
   ├─ App.jsx                # monta as seções
   ├─ styles.css             # design system + seções + loja
   ├─ config.js              # WhatsApp + dados da empresa
   ├─ data.js                # depoimentos, benefícios, garantias, checks
   ├─ store.js               # fluxo da loja (serviço → planos → @ → Cakto)
   ├─ Icons.jsx              # ícones SVG
   ├─ useReveal.js           # animação "reveal on scroll"
   └─ components/
      ├─ Header.jsx
      ├─ Hero.jsx
      ├─ StoreSection.jsx    # seção da loja + overlay do fluxo
      ├─ Features.jsx        # garantias (Envio Imediato / Reposição / Segurança)
      ├─ Testimonials.jsx
      ├─ Benefits.jsx
      ├─ ProvaCTA.jsx        # "Comprove na prática por R$5,90"
      ├─ Footer.jsx
      ├─ LegalModal.jsx      # Política de Privacidade + Termos de Uso
      └─ FloatingWhatsApp.jsx
```

## 🛒 Como funciona a loja

`StoreSection` renderiza a seção "Impulsione suas redes" e o overlay `#flow`. A lógica do fluxo está em `src/store.js` (state machine em JS puro), montada via `mountStore()` num `useEffect`. Etapas:

1. Escolher plataforma (Instagram) → 2. Escolher serviço (Seguidores / Curtidas / Visualizações) → 3. Escolher pacote/região (Mundiais / Brasileiros) → 4. Informar o **@** do perfil → 5. Abre o **link Cakto** do pacote para pagamento.

Pacotes sem link Cakto caem no WhatsApp com o resumo do pedido.

## ⚖️ Conformidade

Rodapé e documentos legais trazem razão social, CNPJ e o aviso de que **a senha nunca é solicitada** — importante para aprovação em plataformas de anúncios.

© 2026 Engajy — INNOVATE SERVIÇOS DIGITAIS LTDA · CNPJ 35.555.991/0001-53
