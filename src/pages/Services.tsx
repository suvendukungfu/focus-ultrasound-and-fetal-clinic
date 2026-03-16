import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Link } from 'react-router-dom';
import {
  Stethoscope, Heart, Activity, Scan,
  Wifi, Car, Clock, Coffee, Baby, Users, Phone, MapPin,
  Eye, Dna, Monitor, ArrowRight
} from 'lucide-react';

const amenities = [
  { icon: Wifi, name: 'Free Wi-Fi', nameHi: 'फ्री वाई-फाई' },
  { icon: Car, name: 'Parking Space', nameHi: 'पार्किंग स्थान' },
  { icon: Clock, name: 'Quick Reports', nameHi: 'त्वरित रिपोर्ट' },
  { icon: Coffee, name: 'Waiting Lounge', nameHi: 'वेटिंग लाउंज' },
  { icon: Baby, name: 'Child Friendly', nameHi: 'बच्चों के अनुकूल' },
  { icon: Users, name: 'Home Collection', nameHi: 'होम कलेक्शन' },
];

const consultations = [
  { icon: MapPin, name: 'In-Person Visit', nameHi: 'व्यक्तिगत मुलाकात', desc: 'Visit our clinic for comprehensive care', descHi: 'व्यापक देखभाल के लिए हमारे क्लिनिक में आएं' },
  { icon: Phone, name: 'Phone Consultation', nameHi: 'फोन परामर्श', desc: 'Quick advice over a call', descHi: 'कॉल पर त्वरित सलाह' },
];

const equipment = [
  { 
    icon: Monitor, 
    name: 'Samsung V7', 
    desc: 'Advanced 3D/4D imaging with precision diagnostics for fetal and gynecological ultrasound.', 
    descHi: 'फीटल और गायनेकोलॉजिकल अल्ट्रासाउंड के लिए उन्नत 3D/4D इमेजिंग।',
    url: 'https://www.samsunghealthcare.com/en/products/UltrasoundSystem/V7/Radiology/v1/main'
  },
  { 
    icon: Monitor, 
    name: 'GE Voluson E8', 
    desc: 'Premium ultrasound system for routine to complex women\'s health exams with exceptional image quality.', 
    descHi: 'बेहतरीन इमेज क्वालिटी के साथ रूटीन से जटिल महिला स्वास्थ्य जांच के लिए प्रीमियम अल्ट्रासाउंड सिस्टम।',
    url: 'https://www.gehealthcare.com/products/ultrasound/voluson/voluson-e8'
  },
];

const ServicesContent = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative section-padding">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              Our Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('facilities.title')}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('facilities.subtitle')}
            </p>
          </div>
        </section>

        {/* Our Equipment */}
        <section className="section-padding bg-secondary/20">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
                {language === 'en' ? 'World-Class Equipment' : 'विश्व-स्तरीय उपकरण'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                {language === 'en' ? 'Our Equipment' : 'हमारे उपकरण'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {equipment.map((item, index) => (
                <div key={item.name} className="card-clean card-highlight text-center animate-fade-up flex flex-col" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 glow-text">{item.name}</h3>
                  <p className="text-muted-foreground font-body text-sm mb-6 flex-grow">
                    {language === 'en' ? item.desc : item.descHi}
                  </p>
                  
                  <div className="pt-5 border-t border-border/50 mt-auto">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary font-medium text-sm hover:underline transition-all duration-200 group/link"
                      aria-label={`${language === 'en' ? 'Learn more about' : 'के बारे में और जानें'} ${item.name}`}
                    >
                      {language === 'en' ? 'Learn More' : 'और जानें'}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MedGenome Partnership */}
        <section className="py-10 px-4 md:px-8">
          <div className="container-narrow mx-auto">
            <div className="card-clean card-highlight max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Dna className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2 glow-text">
                {language === 'en' ? 'MedGenome Genetic Testing' : 'MedGenome जेनेटिक टेस्टिंग'}
              </h3>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto mb-4">
                {language === 'en'
                  ? 'We offer world-class genetic and genomic testing through our partnership with MedGenome — India\'s leading precision diagnostics company. Services include reproductive genetics, rare disease panels, oncology genomics, and prenatal screening.'
                  : 'हम MedGenome — भारत की अग्रणी प्रीसिशन डायग्नोस्टिक्स कंपनी के साथ साझेदारी के माध्यम से विश्व-स्तरीय जेनेटिक और जीनोमिक टेस्टिंग प्रदान करते हैं।'}
              </p>
              <a
                href="https://diagnostics.medgenome.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline"
              >
                {language === 'en' ? 'Learn more about MedGenome →' : 'MedGenome के बारे में और जानें →'}
              </a>
            </div>
          </div>
        </section>
        {/* Unified Services Grid */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="container-narrow mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16 animate-fade-up">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-body font-medium mb-4 uppercase tracking-widest">
                {language === 'en' ? 'Our Expertise' : 'हमारी विशेषज्ञता'}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Comprehensive Fetal Diagnostics' : 'व्यापक भ्रूण डायग्नोस्टिक्स'}
              </h2>
              <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: Baby,
                  name: 'NT Scan',
                  nameHi: 'एनटी स्कैन',
                  desc: 'Early screening to assess the risk of chromosomal abnormalities like Down syndrome.',
                  descHi: 'डाउन सिंड्रोम जैसी गुणसूत्र असामान्यता के जोखिम का आकलन करने के लिए प्रारंभिक स्क्रीनिंग।',
                  link: '#'
                },
                {
                  icon: Scan,
                  name: 'Anomaly Scan (TIFFA)',
                  nameHi: 'असामान्यता स्कैन (TIFFA)',
                  desc: 'Detailed mid-pregnancy scan to check the physical development of the baby.',
                  descHi: 'बच्चे के शारीरिक विकास की जांच के लिए विस्तृत मध्य-गर्भावस्था स्कैन।',
                  link: '#'
                },
                {
                  icon: Activity,
                  name: 'Growth Scan',
                  nameHi: 'ग्रोथ स्कैन',
                  desc: 'Monitor the baby\'s growth, amniotic fluid levels, and overall well-being in the third trimester.',
                  descHi: 'तीसरी तिमाही में बच्चे के विकास, एमनियोटिक द्रव के स्तर और समग्र कल्याण की निगरानी करें।',
                  link: '#'
                },
                {
                  icon: Stethoscope,
                  name: 'Early Pregnancy Scan',
                  nameHi: 'प्रारंभिक गर्भावस्था स्कैन',
                  desc: 'Confirm pregnancy viability, detect multiples, and accurately date the pregnancy.',
                  descHi: 'गर्भावस्था की व्यवहार्यता की पुष्टि करें, जुड़वाँ बच्चों का पता लगाएं, और गर्भावस्था की सही तारीख तय करें।',
                  link: '#'
                },
                {
                  icon: Activity,
                  name: 'Doppler Study',
                  nameHi: 'डॉप्लर अध्ययन',
                  desc: 'Evaluate blood flow in the umbilical cord and baby\'s vessels to assess oxygen supply.',
                  descHi: 'ऑक्सीजन की आपूर्ति का आकलन करने के लिए गर्भनाल और बच्चे की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन करें।',
                  link: '#'
                },
                {
                  icon: Heart,
                  name: 'Fetal Echocardiography',
                  nameHi: 'फीटल इकोकार्डियोग्राफी',
                  desc: 'Specialized ultrasound to thoroughly examine the baby\'s heart structure and function.',
                  descHi: 'बच्चे के हृदय की संरचना और कार्यप्रणाली की गहन जांच करने के लिए विशेष अल्ट्रासाउंड।',
                  link: '#'
                },
                {
                  icon: Dna,
                  name: 'NIPT Screening',
                  nameHi: 'एनआईपीटी स्क्रीनिंग',
                  desc: 'Non-invasive prenatal testing to screen for common chromosomal conditions using a maternal blood draw.',
                  descHi: 'मातृ रक्त का उपयोग करके सामान्य गुणसूत्र स्थितियों की जांच के लिए गैर-आक्रामक प्रसवपूर्व परीक्षण।',
                  link: '#'
                },
                {
                  icon: Scan,
                  name: 'Liver Fibroscan',
                  nameHi: 'लिवर फाइब्रोस्कैन',
                  desc: 'Non-invasive test to assess liver stiffness and fatty changes.',
                  descHi: 'लिवर की कठोरता और फैटी परिवर्तनों का आकलन करने के लिए गैर-आक्रामक परीक्षण।',
                  link: '#'
                },
                {
                  icon: Eye,
                  name: 'Small Parts Ultrasound',
                  nameHi: 'स्मॉल पार्ट्स अल्ट्रासाउंड',
                  desc: 'Detailed imaging of superficial organs like the thyroid, breast, and scrotum.',
                  descHi: 'थायराइड, स्तन और अंडकोश जैसे सतही अंगों की विस्तृत इमेजिंग।',
                  link: '#'
                }
              ].map((item, index) => (
                <div 
                  key={item.name} 
                  className="group relative bg-card rounded-3xl p-8 border border-border shadow-sm transition-all duration-300 hover:shadow-elevated hover:-translate-y-2 animate-fade-up overflow-hidden flex flex-col" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-primary/20" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                      <item.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {language === 'en' ? item.name : item.nameHi}
                    </h3>
                    
                    <p className="text-muted-foreground font-body text-sm leading-relaxed mb-8 flex-grow">
                      {language === 'en' ? item.desc : item.descHi}
                    </p>
                    
                    <div className="pt-4 border-t border-border/50 mt-auto">
                      <Link 
                        to={item.link} 
                        className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
                      >
                        {language === 'en' ? 'Learn More' : 'और जानें'}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t('facilities.amenities')}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {amenities.map((item, index) => (
                <div key={item.name} className="stat-card animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <item.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                  <p className="font-body text-sm text-foreground">
                    {language === 'en' ? item.name : item.nameHi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Types */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="container-narrow mx-auto relative z-10">
            <div className="text-center mb-12 md:mb-16 animate-fade-up">
              <span className="inline-block px-4 py-1 rounded-full bg-accent/5 border border-accent/10 text-accent text-xs font-body font-medium mb-4 uppercase tracking-widest">
                {language === 'en' ? 'Get Started' : 'शुरुआत करें'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t('facilities.consultations')}
              </h2>
              <div className="w-12 h-1 bg-accent/30 mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
              {consultations.map((item, index) => (
                <div 
                  key={item.name} 
                  className="group relative bg-card rounded-[2.5rem] p-8 md:p-12 border border-border shadow-soft transition-all duration-500 hover:shadow-elevated hover:-translate-y-2 animate-fade-up overflow-hidden flex flex-col" 
                  style={{ animationDelay: `${index * 0.1}s`, animationDuration: '400ms' }}
                >
                  {/* Subtle Background Decorative Element */}
                  <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-accent/5 rounded-full blur-3xl transition-all duration-700 group-hover:bg-accent/10 group-hover:scale-125" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div className="w-20 h-20 rounded-3xl bg-accent/10 flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm border border-accent/10 group-hover:bg-accent group-hover:border-transparent">
                      <item.icon className="w-10 h-10 text-accent transition-colors duration-500 group-hover:text-white" strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold text-foreground mb-4 transition-colors duration-300 group-hover:text-accent">
                      {language === 'en' ? item.name : item.nameHi}
                    </h3>
                    
                    <p className="text-muted-foreground font-body text-base leading-relaxed mb-10 max-w-[300px] flex-grow">
                      {language === 'en' ? item.desc : item.descHi}
                    </p>
                    
                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-secondary text-foreground font-bold text-sm transition-all duration-300 group-hover:bg-accent group-hover:text-white shadow-sm hover:shadow-md"
                    >
                      {language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें'}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
