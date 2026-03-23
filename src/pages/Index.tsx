import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ServicesPreview from '@/components/ServicesPreview';
import DoctorsSection from '@/components/DoctorsSection';
import ClinicTimings from '@/components/ClinicTimings';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <ServicesPreview />
          <DoctorsSection />
          <ClinicTimings />
          <section className="relative w-full h-[450px] md:h-[650px] overflow-hidden group">
            <div className="absolute inset-0 z-0">
              <iframe
                src="https://maps.google.com/maps?q=Shop+No.+05+%26+06,+UGF,+Nirala+Estate,+Noida+Extension,+Greater+Noida+West+-+201306&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1) brightness(1.05)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Focus Ultrasound & Fetal Clinic Location"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              ></iframe>
            </div>

            <div className="absolute inset-0 bg-primary/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Info Card Overlay — always visible on mobile */}
            <div className="absolute bottom-0 left-0 right-0 md:bottom-12 md:left-12 md:right-auto z-20 p-4 md:p-0">
              <div className="bg-white/95 backdrop-blur-md shadow-elevated rounded-2xl p-6 md:p-8 max-w-sm border border-border md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-700 delay-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <h3 className="font-display font-semibold text-lg text-foreground">Clinic Location</h3>
                </div>

                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-6">
                  Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension, Greater Noida West - 201306
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Shop+No.+05+%26+06,+UGF,+Nirala+Estate,+Noida+Extension,+Greater+Noida+West+-+201306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-white rounded-xl font-display font-semibold text-sm hover:bg-primary/90 hover:shadow-glow transition-all duration-300"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
