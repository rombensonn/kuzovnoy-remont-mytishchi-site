import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { DamageSelector } from './components/DamageSelector';
import { Services } from './components/Services';
import { Prices } from './components/Prices';
import { BeforeAfter } from './components/BeforeAfter';
import { Process } from './components/Process';
import { Reviews } from './components/Reviews';
import { EstimateForm } from './components/EstimateForm';
import { FAQ } from './components/FAQ';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { StickyMobileCTA } from './components/StickyMobileCTA';
import { getStaticLegalPagePath, StaticLegalPage } from './components/StaticLegalPage';
import { useHashlessAnchorScroll } from './hooks/useHashlessAnchorScroll';

function App() {
  useHashlessAnchorScroll();
  const staticLegalPagePath = getStaticLegalPagePath(window.location.pathname);

  if (staticLegalPagePath) {
    return <StaticLegalPage pagePath={staticLegalPagePath} />;
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <DamageSelector />
        <Services />
        <Prices />
        <BeforeAfter />
        <Process />
        <Reviews />
        <EstimateForm />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

export default App;
