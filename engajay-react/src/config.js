// ============================================================
// Engajy — Configuração central
// Altere aqui o número/mensagem do WhatsApp e os dados da empresa.
// ============================================================

export const WHATSAPP = {
  phone: '5511925618023', // +55 11 92561-8023 (DDI + DDD + número)
  message: 'Olá vim pelo site, gostaria de saber sobre os seguidores.',
};

export const WA_LINK = `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(WHATSAPP.message)}`;

export function onWhatsAppClick(e) {
  e.preventDefault();
  if (typeof window.gtag_report_conversion === 'function') {
    return window.gtag_report_conversion(WA_LINK);
  }
  window.open(WA_LINK, '_blank', 'noopener');
}

export const COMPANY = {
  brand: 'Engajy',
  legalName: 'INNOVATE SERVIÇOS DIGITAIS LTDA',
  cnpj: '35.555.991/0001-53',
  whatsappLabel: '(11) 92561-8023',
};
