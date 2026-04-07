import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import {
  Stethoscope, Heart, Activity, Scan,
  Baby, Dna, Monitor, Binary, Eye,
  FlaskConical, ShieldCheck, Zap, Sparkles, Camera
} from 'lucide-react';

// Specialized UI Components
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeading from '@/components/ui/SectionHeading';
import SectionWrapper from '@/components/ui/SectionWrapper';
import TechCard from '@/components/ui/TechCard';
import FeaturedCard from '@/components/ui/FeaturedCard';

const equipment = [
  { 
    icon: Monitor, 
    name: 'Samsung V7', 
    image: '/images/clinic-samsung-v7.jpg',
    desc: 'Advanced 3D/4D imaging with precision diagnostics for fetal and gynecological ultrasound.', 
    descHi: 'फीटल और गायनेकोलॉजिकल अल्ट्रासाउंड के लिए उन्नत 3D/4D इमेजिंग।',
    url: 'https://www.samsunghealthcare.com/en/products/UltrasoundSystem/V7/Radiology/v1/main'
  },
  { 
    icon: Monitor, 
    name: 'GE Voluson E8 Expert', 
    image: '/images/ge-voluson-e8-real.png',
    desc: 'The global gold standard in fetal medicine. Offers extraordinary image quality for the highest diagnostic confidence.', 
    descHi: 'भ्रूण चिकित्सा में वैश्विक स्वर्ण मानक। उच्चतम नैदानिक विश्वास के लिए असाधारण इमेज क्वालिटी।',
    url: 'https://www.gehealthcare.com/products/ultrasound/voluson/voluson-e8'
  },
];

const services = [
  { icon: Baby, name: 'NT Scan', nameHi: 'एनटी स्कैन', desc: 'Early screening for chromosomal abnormalities like Down syndrome.', descHi: 'डाउन सिंड्रोम जैसी गुणसूत्र असामान्यता के लिए प्रारंभिक स्क्रीनिंग।', image: '/images/nt-scan.jpg' },
  { icon: Scan, name: 'Anomaly Scan (TIFFA)', nameHi: 'असामान्यता स्कैन (TIFFA)', desc: 'Detailed mid-pregnancy scan to check baby\'s physical development.', descHi: 'बच्चे के शारीरिक विकास की जांच के लिए विस्तृत मध्य-गर्भावस्था स्कैन।', image: '/images/anomaly-scan.jpg' },
  { icon: Activity, name: 'Growth Scan', nameHi: 'ग्रोथ स्कैन', desc: 'Monitor baby\'s growth and amniotic fluid in the third trimester.', descHi: 'तीसरी तिमाही में बच्चे के विकास और एमनियोटिक द्रव की निगरानी।', image: '/images/growth-scan.jpg' },
  { icon: Stethoscope, name: 'Early Pregnancy Scan', nameHi: 'प्रारंभिक गर्भावस्था स्कैन', desc: 'Confirm viability, detect multiples, and accurately date the pregnancy.', descHi: 'गर्भावस्था की व्यवहार्यता की पुष्टि करें और सही तारीख तय करें।', image: '/images/early-pregnancy.jpg' },
  { icon: Activity, name: 'Doppler Study', nameHi: 'डॉप्लर अध्ययन', desc: 'Evaluate blood flow in umbilical cord and baby\'s vessels.', descHi: 'गर्भनाल और बच्चे की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन।', image: '/images/doppler-study.jpg' },
  { icon: Heart, name: 'Fetal Echocardiography', nameHi: 'फीटल इकोकार्डियोग्राफी', desc: 'Specialized ultrasound to examine the baby\'s heart structure and function.', descHi: 'बच्चे के हृदय की संरचना और कार्यप्रणाली की जांच।', image: '/images/fetal-echo.jpg' },
  { icon: Dna, name: 'NIPT Screening', nameHi: 'एनआईपीटी स्क्रीनिंग', desc: 'Non-invasive prenatal testing to screen for common chromosomal conditions.', descHi: 'सामान्य गुणसूत्र स्थितियों की जांच के लिए गैर-आक्रामक प्रसवपूर्व परीक्षण।', image: '/images/nipt-screening.png' },
  { icon: Scan, name: 'Liver Fibroscan', nameHi: 'लिवर फाइब्रोस्कैन', desc: 'Non-invasive test to assess liver stiffness and fatty changes.', descHi: 'लिवर की कठोरता और फैटी परिवर्तनों का आकलन करने के लिए गैर-आक्रामक परीक्षण।', image: '/images/liver-fibroscan.png' },
  { icon: Eye, name: 'Small Parts Ultrasound', nameHi: 'स्मॉल पार्ट्स अल्ट्रासाउंड', desc: 'Detailed imaging of superficial organs like the thyroid and breast.', descHi: 'थायराइड और स्तन जैसे सतही अंगों की विस्तृत इमेजिंग।', image: '/images/small-parts-ultrasound.png' },
  { icon: Camera, name: 'Digital X-Ray', nameHi: 'डिजिटल एक्स-रे', desc: 'High-precision digital radiography for accurate skeletal and chest diagnostics.', descHi: 'सटीक कंकाल और छाती के निदान के लिए उच्च-सटीक डिजिटल रेडियोग्राफी।', image: '/images/digital-x-ray.png' },
  { icon: Activity, name: 'ECG', nameHi: 'ईसीजी', desc: 'Comprehensive heart rhythm monitoring to assess cardiac health and patterns.', descHi: 'हृदय स्वास्थ्य और पैटर्न का आकलन करने के लिए व्यापक हृदय गति की निगरानी।', image: '/images/ecg.png' },
  { icon: FlaskConical, name: 'Lab Tests', nameHi: 'लैब टेस्ट', desc: 'Wide range of clinical diagnostic tests for thorough health evaluation.', descHi: 'संपूर्ण स्वास्थ्य मूल्यांकन के लिए नैदानिक ​​परीक्षणों की विस्तृत श्रृंखला।', image: '/images/lab-tests.png' }
];

const ServicesContent = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0b1222] text-white' : 'bg-slate-50 text-slate-900'} selection:bg-primary/20`}>
      <Header />
      
      <main className="pt-20">
        {/* Main Services Grid Section */}
        <SectionWrapper variant="primary" id="services-grid">
          <SectionHeading 
            badge={language === 'en' ? "Diagnostic Suite" : "डायग्नोस्टिक सूट"}
            title={language === 'en' ? "Comprehensive Global Services" : "व्यापक वैश्विक सेवाएं"}
            subtitle={language === 'en' ? "Precision-driven diagnostics merging advanced expertise with state-of-the-art fetal medicine." : "उन्नत विशेषज्ञता को अत्याधुनिक भ्रूण चिकित्सा के साथ मिलाते हुए सटीक-संचालित डायग्नोस्टिक्स।"}
          />

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 mt-20"
          >
            {services.map((item, index) => (
              <ServiceCard 
                key={item.name}
                {...item}
                index={index}
              />
            ))}
          </motion.div>
        </SectionWrapper>

        {/* Technology Showcase Section */}
        <SectionWrapper variant="secondary" id="technology-showcase">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-24 md:mb-32 gap-8 lg:gap-16">
            <div className="max-w-3xl">
              <span className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-8 shadow-soft">
                {language === 'en' ? "Innovation Engine" : "नवाचार इंजन"}
              </span>
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight">
                Premium Diagnostic <br />
                <span className="text-primary italic">Technology</span>
              </h2>
            </div>
            <p className="text-muted-foreground font-body text-xl max-w-sm leading-relaxed">
              We leverage the world's most sophisticated clinical platforms to deliver unparalleled diagnostic clarity.
            </p>
          </div>

          <div className="space-y-32 md:space-y-48">
            {equipment.map((item, index) => (
              <TechCard 
                key={item.name}
                {...item}
                index={index}
              />
            ))}
          </div>
        </SectionWrapper>

        {/* Featured Genetic Highlight Section */}
        <SectionWrapper variant="accent" id="genetic-highlight" className="py-32 md:py-56">
          <FeaturedCard 
            title={language === 'en' ? "Precision" : "सटीक"}
            subtitle={language === 'en' ? "Genomics" : "जेनोमिक्स"}
            desc={language === 'en' 
              ? "In exclusive partnership with MedGenome, we bring India's leading precision medicine to your doorstep." 
              : "मेडजिनोम के साथ विशेष साझेदारी में, हम भारत की अग्रणी सटीक चिकित्सा को आपके दरवाजे पर लाते हैं।"}
            features={[
              { l: language === 'en' ? 'Reproductive Health' : 'प्रजनन स्वास्थ्य', i: Binary },
              { l: language === 'en' ? 'Screening Panels' : 'स्क्रीनिंग पैनल', i: ShieldCheck },
              { l: language === 'en' ? 'Early Detection' : 'प्रारंभिक पहचान', i: Zap }
            ]}
            image="/images/medgenome-lab-real.png"
            accuracy="99.9%"
            url="https://diagnostics.medgenome.com/"
          />
        </SectionWrapper>
      </main>

      <Footer />
    </div>
  );
};

const Services = () => {
  return (
    <LanguageProvider>
      <ServicesContent />
    </LanguageProvider>
  );
};

export default Services;
