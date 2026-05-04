import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSection from '@/components/FAQSection';
import { motion } from 'framer-motion';
import {
  Stethoscope, Heart, Activity, Scan,
  Baby, Dna, Monitor, Binary, ShieldCheck, Zap, Camera, FlaskConical, Eye
} from 'lucide-react';

// Specialized UI Components
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeading from '@/components/ui/SectionHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import TechCard from '@/components/ui/TechCard';
import FeaturedCard from '@/components/ui/FeaturedCard';
import ServicesPreview from '@/components/ServicesPreview';

interface TranslatedItem {
  name: string;
  desc: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const Services = () => {
  const { t } = useLanguage();
  
  const equipmentIcons = [Monitor, Monitor];
  const equipmentImages = ['/images/clinic-samsung-v7.webp', '/images/ge-voluson-e8-real.png'];
  const equipmentUrls = [
    'https://www.samsunghealthcare.com/en/products/UltrasoundSystem/V7/Radiology/v1/main',
    'https://www.gehealthcare.com/products/ultrasound/voluson/voluson-e8'
  ];

  const equipmentListData = t<TranslatedItem[]>('services.equipment');
  const equipmentData = (Array.isArray(equipmentListData) ? equipmentListData : []).map((item, i) => ({
    ...item,
    icon: equipmentIcons[i] || Monitor,
    image: equipmentImages[i] || '/placeholder.svg',
    url: equipmentUrls[i]
  }));

  const faqDataRaw = t<FAQ[]>('services.faq');
  const faqData = Array.isArray(faqDataRaw) ? faqDataRaw : [];

  return (
    <div className="min-h-screen transition-colors duration-700 bg-background text-foreground selection:bg-primary/20">
      <SEO 
        title={t('services.seo.title')}
        description={t('services.seo.description')}
        faqData={faqData}
      />
      <Header />
      
      <main className="pt-20">
        {/* Main Services Grid Section */}
        <ServicesPreview />

        {/* Technology Showcase Section */}
        <section id="technology-showcase" className="relative py-24 md:py-32 px-6 overflow-hidden bg-gradient-to-b from-white to-[#f7fbfc] dark:from-background dark:to-background">
          <div className="max-w-[1240px] mx-auto relative z-10">
            {/* Section Header — centered */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16 md:mb-20"
            >
              <span className="inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.4em] mb-6 backdrop-blur-sm">
                {t('services.tech.badge')}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {t('services.tech.title').split(' ').map((word, i, arr) => (
                  i === arr.length - 1
                    ? <span key={i}> <span className="text-primary italic">{word}</span></span>
                    : <span key={i}>{word} </span>
                ))}
              </h2>
              <p className="text-muted-foreground font-body text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                {t('services.tech.subtitle')}
              </p>
            </motion.div>

            {/* Equipment Cards — equal spacing */}
            <div className="space-y-16 md:space-y-20">
              {equipmentData.map((item, index) => (
                <TechCard 
                  key={item.name}
                  {...item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Precision Genomics Section — equal spacing with tech cards */}
        <section id="genetic-highlight" className="relative py-24 md:py-32 px-6 overflow-hidden bg-primary/5 dark:bg-primary/5">
          <div className="max-w-[1240px] mx-auto relative z-10">
            <FeaturedCard 
              title={t('services.precision.title')}
              subtitle={t('services.precision.subtitle')}
              desc={t('services.precision.desc')}
              features={[
                { l: t('home.features.care.title'), i: Binary },
                { l: t('home.features.expertise.title'), i: ShieldCheck },
                { l: t('home.features.tech.title'), i: Zap }
              ]}
              image="/images/medgenome-lab-real.webp"
              accuracy={t('services.precision.acc')}
              url="https://diagnostics.medgenome.com/"
            />
          </div>
        </section>

        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default Services;
