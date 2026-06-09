import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Testimonials from './components/Testimonials.jsx';
import Benefits from './components/Benefits.jsx';
import FinalCTA from './components/FinalCTA.jsx';
import Footer from './components/Footer.jsx';
import LegalModal from './components/LegalModal.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';
import { useReveal } from './useReveal.js';

export default function App() {
  const [legalDoc, setLegalDoc] = useState(null);
  useReveal();

  return (
    <>
      <Header />
      <Hero />
      <Testimonials />
      <Benefits />
      <FinalCTA />
      <Footer onOpenLegal={setLegalDoc} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <FloatingWhatsApp />
    </>
  );
}
