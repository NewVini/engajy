// ============================================================
// Engajy — Configuração central
// Altere aqui o número/mensagem do WhatsApp e os dados da empresa.
// ============================================================

export const WHATSAPP = {
  phone: '5511916501341', // +55 11 91650-1341 (DDI + DDD + número)
  message: 'Olá vim pelo site, gostaria de saber sobre os seguidores.',
};

export const WA_LINK = `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.message)}`;

export function onWhatsAppClick(e) {
  if (typeof window.gtag_report_conversion === 'function') {
    e.preventDefault();
    window.gtag_report_conversion(WA_LINK);
  }
}

export const COMPANY = {
  brand: 'Engajy',
  legalName: 'INNOVATE SERVIÇOS DIGITAIS LTDA',
  cnpj: '35.555.991/0001-53',
  whatsappLabel: '(11) 91650-1341',
};
