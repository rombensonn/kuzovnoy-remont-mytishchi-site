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

function App() {
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
