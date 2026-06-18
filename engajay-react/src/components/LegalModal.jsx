import { useEffect } from 'react';
import { COMPANY } from '../config.js';
import { Close } from '../Icons.jsx';

function Privacidade() {
  return (
    <article className="legal-doc">
      <h2>Política de Privacidade</h2>
      <p className="legal-upd">Última atualização: 8 de junho de 2026</p>
      <p>A presente Política de Privacidade descreve como a <strong>{COMPANY.legalName}</strong>, inscrita no CNPJ sob o nº <strong>{COMPANY.cnpj}</strong> (operando sob a marca &ldquo;{COMPANY.brand}&rdquo;), coleta, utiliza, armazena e protege os dados das pessoas que visitam este site e entram em contato com a nossa equipe. Ao utilizar nossos canais, você concorda com as práticas aqui descritas.</p>
      <div className="legal-note"><strong>Importante:</strong> A {COMPANY.brand} <strong>nunca solicita a senha</strong> da sua conta do Instagram ou de qualquer outra rede social. Todo o atendimento é feito de forma segura, sem acesso às suas contas.</div>
      <h3>1. Dados que coletamos</h3>
      <p>Coletamos apenas os dados estritamente necessários para o atendimento:</p>
      <ul>
        <li><strong>Dados de contato</strong> fornecidos voluntariamente por você (nome, número de WhatsApp e, quando aplicável, e-mail);</li>
        <li><strong>Nome de usuário público</strong> do perfil que você deseja fortalecer;</li>
        <li><strong>Dados de navegação</strong> coletados automaticamente (cookies, endereço IP, tipo de dispositivo e páginas acessadas) para fins estatísticos e de melhoria do site.</li>
      </ul>
      <h3>2. Como usamos seus dados</h3>
      <p>Utilizamos as informações para: (i) responder às suas solicitações e prestar atendimento via WhatsApp; (ii) elaborar uma análise e recomendação personalizada para o seu perfil; (iii) melhorar a experiência de navegação; e (iv) cumprir obrigações legais.</p>
      <h3>3. Compartilhamento</h3>
      <p>A {COMPANY.brand} não vende nem aluga seus dados pessoais. O compartilhamento ocorre apenas com prestadores de serviço essenciais à operação (plataformas de mensagens, pagamento e hospedagem) e quando exigido por autoridade competente.</p>
      <h3>4. Cookies</h3>
      <p>Utilizamos cookies para entender como os visitantes interagem com o site e mensurar campanhas. Você pode desativá-los nas configurações do navegador.</p>
      <h3>5. Seus direitos (LGPD)</h3>
      <p>Nos termos da Lei nº 13.709/2018, você pode solicitar a qualquer momento o acesso, a correção, a portabilidade ou a exclusão dos seus dados, bem como revogar consentimentos, pelo contato abaixo.</p>
      <h3>6. Segurança</h3>
      <p>Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou alteração indevida.</p>
      <h3>7. Contato</h3>
      <ul>
        <li>WhatsApp: {COMPANY.whatsappLabel}</li>
        <li>{COMPANY.legalName} — CNPJ {COMPANY.cnpj}</li>
      </ul>
    </article>
  );
}

function Termos() {
  return (
    <article className="legal-doc">
      <h2>Termos de Uso</h2>
      <p className="legal-upd">Última atualização: 8 de junho de 2026</p>
      <p>Estes Termos de Uso regulam a utilização do site e dos serviços oferecidos pela <strong>{COMPANY.legalName}</strong>, inscrita no CNPJ sob o nº <strong>{COMPANY.cnpj}</strong> (operando sob a marca &ldquo;{COMPANY.brand}&rdquo;). Ao acessar este site e contratar nossos serviços, você declara estar de acordo com as condições abaixo.</p>
      <h3>1. Sobre os serviços</h3>
      <p>A {COMPANY.brand} oferece soluções e consultoria para fortalecer a autoridade, a credibilidade e a presença digital de perfis em redes sociais, com atendimento especializado e humanizado.</p>
      <div className="legal-note"><strong>Segurança:</strong> Em nenhuma hipótese solicitamos a senha da sua conta. O atendimento é feito exclusivamente por canais oficiais, como o WhatsApp informado neste site.</div>
      <h3>2. Responsabilidades do usuário</h3>
      <ul>
        <li>Fornecer informações verídicas ao solicitar atendimento;</li>
        <li>Utilizar os serviços de acordo com a legislação vigente e com os termos das plataformas de redes sociais;</li>
        <li>Não utilizar o site para fins ilícitos ou que violem direitos de terceiros.</li>
      </ul>
      <h3>3. Atendimento e prazos</h3>
      <p>O início do atendimento é ágil e realizado via WhatsApp. Os prazos de entrega e as condições específicas de cada serviço são informados durante o atendimento, antes de qualquer contratação.</p>
      <h3>4. Pagamentos e garantia</h3>
      <p>Os valores e formas de pagamento são apresentados de forma transparente durante o atendimento. Eventuais condições de garantia ou reembolso são informadas no ato da contratação e seguem o Código de Defesa do Consumidor.</p>
      <h3>5. Propriedade intelectual</h3>
      <p>Todo o conteúdo deste site — incluindo marca, logotipo, textos e elementos visuais — pertence à empresa e é protegido por lei. É vedada a reprodução sem autorização prévia.</p>
      <h3>6. Limitação de responsabilidade</h3>
      <p>A {COMPANY.brand} empenha-se em prestar o melhor serviço, mas não se responsabiliza por decisões tomadas por plataformas de terceiros que estejam fora do seu controle.</p>
      <h3>7. Alterações destes Termos</h3>
      <p>Estes Termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível nesta página.</p>
      <h3>8. Contato</h3>
      <ul>
        <li>WhatsApp: {COMPANY.whatsappLabel}</li>
        <li>{COMPANY.legalName} — CNPJ {COMPANY.cnpj}</li>
      </ul>
    </article>
  );
}

export default function LegalModal({ doc, onClose }) {
  useEffect(() => {
    if (!doc) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [doc, onClose]);

  if (!doc) return null;

  return (
    <div className="legal-overlay open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="legal-modal" role="dialog" aria-modal="true">
        <button className="legal-close" aria-label="Fechar" onClick={onClose}><Close /></button>
        {doc === 'privacidade' ? <Privacidade /> : <Termos />}
      </div>
    </div>
  );
}
