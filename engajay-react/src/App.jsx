import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import StoreSection from './components/StoreSection.jsx';
import Features from './components/Features.jsx';
import Testimonials from './components/Testimonials.jsx';
import Benefits from './components/Benefits.jsx';
import ProvaCTA from './components/ProvaCTA.jsx';
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
      <StoreSection />
      <Features />
      <Testimonials />
      <Benefits />
      <ProvaCTA />
      <Footer onOpenLegal={setLegalDoc} />
      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
      <FloatingWhatsApp />
    </>
  );
}
