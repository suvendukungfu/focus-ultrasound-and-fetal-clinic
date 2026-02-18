import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DoctorsSection from '@/components/DoctorsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <DoctorsSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
