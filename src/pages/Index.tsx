import React, { Suspense } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DoctorsSection from '@/components/DoctorsSection';
import ClinicTimings from '@/components/ClinicTimings';
import Footer from '@/components/Footer';
import ReviewCarousel from '@/components/ReviewCarousel';
import { useTestimonials } from '@/hooks/useTestimonials';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import FAQSection from '@/components/FAQSection';

const LazyClinicMap = React.lazy(() => import('@/components/map/ClinicMap'));

const Index = () => {
  const { testimonials, loading } = useTestimonials();
  const { t, language } = useLanguage();
  
  const faqData = t<Array<{ question: string; answer: string }>>('faq') || [];
  
  return (
    <>
      <SEO 
        title={t('home.seo.title')}
        description={t('home.seo.description')}
        canonicalUrl="https://focusultrasound.in"
        faqData={faqData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <DoctorsSection />
          <ClinicTimings />
          <FAQSection />
          
          {!loading && testimonials.length > 0 && (
            <section className="bg-gradient-to-b from-primary/5 to-transparent">
              <ReviewCarousel reviews={testimonials.slice(0, 5)} />
            </section>
          )}

          <section className="px-4 md:px-8 py-8 md:py-12">
            <Suspense fallback={
              <div className="w-full h-[450px] md:h-[600px] rounded-[2rem] bg-muted/30 animate-pulse flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Loading map…</span>
              </div>
            }>
              <LazyClinicMap />
            </Suspense>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
