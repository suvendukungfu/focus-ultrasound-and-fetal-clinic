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
  
  // Icon and Image Mappings
  const serviceIcons = [
    Scan, Scan, Scan, Scan, Scan, Stethoscope, Activity, 
    Activity, Baby, Baby, Activity, Baby, Heart, Activity
  ];
  const serviceImages = [
    'https://upload.wikimedia.org/wikipedia/commons/b/b4/2_Boyutlu_Orijinal_Ultrasound_G%C3%B6r%C3%BCnt%C3%BCs%C3%BC.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9e/Amniotic_sheet.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2d/Bicornuate_uterus_with_pregnancy.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/be/Cervical_pregnancy_-_with_descriptions.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/2a/CN_T21.JPG',
    'https://upload.wikimedia.org/wikipedia/commons/4/4e/Complete_miscarriage.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/e/ee/Diane_Rodriguez_y_fernando_Machado_donde_el_hombre_esta_embarazado_de_ella.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/4/48/Early_ultrasound.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/aa/Feindiagnostik_%28Ultraschall%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f4/Fetal_Anomaly_Ultrasound_Scan_in_Navi_Mumbai.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f9/Gastrochisis_0001.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/c/c3/Incomplete_miscarriage.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/d3/LIFE_2013-06-19_10-24.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/b/b8/Molar_pregnancy_0001.jpg'
  ];

  const equipmentIcons = [Monitor, Monitor];
  const equipmentImages = ['/images/clinic-samsung-v7.webp', '/images/ge-voluson-e8-real.webp'];
  const equipmentUrls = [
    'https://www.samsunghealthcare.com/en/products/UltrasoundSystem/V7/Radiology/v1/main',
    'https://www.gehealthcare.com/products/ultrasound/voluson/voluson-e8'
  ];

  const servicesItemsData = t<TranslatedItem[]>('services.items');
  const servicesData = (Array.isArray(servicesItemsData) ? servicesItemsData : []).map((item, i) => ({
    ...item,
    icon: serviceIcons[i] || Scan,
    image: serviceImages[i] || '/placeholder.svg'
  }));

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
