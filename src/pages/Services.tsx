import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { 
  Stethoscope, Heart, Activity, FlaskConical, Scan, Zap,
  Wifi, Car, Clock, Coffee, Baby, Users, Video, Phone, MapPin,
  Focus, Eye, Syringe
} from 'lucide-react';
import facilities1 from '@/assets/facilities-1.jpg';
import facilities2 from '@/assets/facilities-2.jpg';

const specialFocus = [
  { icon: Scan, name: 'Liver Fat Quantification', nameHi: 'लिवर फैट क्वांटिफिकेशन' },
  { icon: Eye, name: 'IOTA-ADNEX Lesion Scoring', nameHi: 'IOTA-ADNEX लीज़न स्कोरिंग' },
  { icon: Baby, name: 'Detailed NT/NB Scan', nameHi: 'विस्तृत NT/NB स्कैन' },
  { icon: Scan, name: 'TIFFA (Level-II Scan)', nameHi: 'TIFFA (लेवल-II स्कैन)' },
  { icon: Heart, name: 'Fetal Echocardiography', nameHi: 'फीटल इकोकार्डियोग्राफी' },
  { icon: Stethoscope, name: 'Infertility Imaging (3D)', nameHi: 'इनफर्टिलिटी इमेजिंग (3D)' },
  { icon: Syringe, name: 'FNAC / Biopsy / Tapping', nameHi: 'FNAC / बायोप्सी / टैपिंग' },
];

const otherFacilities = [
  { icon: Scan, name: 'All Routine Ultrasound', nameHi: 'सभी रूटीन अल्ट्रासाउंड' },
  { icon: Activity, name: 'Color Doppler (Peripheral & Abdominal)', nameHi: 'कलर डॉप्लर (पेरिफेरल और एब्डोमिनल)' },
  { icon: Scan, name: 'Liver Fibroscan', nameHi: 'लिवर फाइब्रोस्कैन' },
  { icon: Baby, name: 'Obstetric Doppler & Growth Scans', nameHi: 'ऑब्स्टेट्रिक डॉप्लर और ग्रोथ स्कैन' },
  { icon: Stethoscope, name: 'MSK Ultrasound', nameHi: 'MSK अल्ट्रासाउंड' },
  { icon: Scan, name: 'Small Parts Ultrasound', nameHi: 'स्मॉल पार्ट्स अल्ट्रासाउंड' },
  { icon: Zap, name: 'Digital X-Ray', nameHi: 'डिजिटल एक्स-रे' },
  { icon: Activity, name: 'ECG', nameHi: 'ईसीजी' },
  { icon: FlaskConical, name: 'All Blood Tests & Lab', nameHi: 'सभी ब्लड टेस्ट और लैब' },
];

const amenities = [
  { icon: Wifi, name: 'Free Wi-Fi', nameHi: 'फ्री वाई-फाई' },
  { icon: Car, name: 'Parking Space', nameHi: 'पार्किंग स्थान' },
  { icon: Clock, name: 'Quick Reports', nameHi: 'त्वरित रिपोर्ट' },
  { icon: Coffee, name: 'Waiting Lounge', nameHi: 'वेटिंग लाउंज' },
  { icon: Baby, name: 'Child Friendly', nameHi: 'बच्चों के अनुकूल' },
  { icon: Users, name: 'Home Collection', nameHi: 'होम कलेक्शन' },
];

const consultations = [
  { icon: MapPin, name: 'In-Person Visit', nameHi: 'व्यक्तिगत मुलाकात', desc: 'Visit our clinic for comprehensive care' },
  { icon: Video, name: 'Video Consultation', nameHi: 'वीडियो परामर्श', desc: 'Connect with doctors from home' },
  { icon: Phone, name: 'Phone Consultation', nameHi: 'फोन परामर्श', desc: 'Quick advice over a call' },
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

        {/* Our Facilities Showcase */}
        <section className="section-padding bg-secondary/20">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
                {language === 'en' ? 'World-Class Equipment' : 'विश्व-स्तरीय उपकरण'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                {language === 'en' ? 'Our Facilities' : 'हमारी सुविधाएं'}
              </h2>
              <p className="text-muted-foreground font-body text-sm max-w-xl mx-auto">
                {language === 'en'
                  ? 'Equipped with the latest Samsung V7 Ultrasound System and advanced diagnostic technology for accurate results.'
                  : 'सटीक परिणामों के लिए नवीनतम Samsung V7 अल्ट्रासाउंड सिस्टम और उन्नत डायग्नोस्टिक तकनीक से सुसज्जित।'}
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="group rounded-2xl overflow-hidden border border-border shadow-card bg-card hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <img
                    src={facilities1}
                    alt="Focus Ultrasound & Fetal Clinic Facilities"
                    className="w-full h-auto rounded-xl object-contain"
                  />
                </div>
                <div className="px-4 pb-4 text-center">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {language === 'en' ? 'Samsung V7 Ultrasound System' : 'Samsung V7 अल्ट्रासाउंड सिस्टम'}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {language === 'en' ? 'Advanced 3D/4D imaging with precision diagnostics' : 'उन्नत 3D/4D इमेजिंग और सटीक निदान'}
                  </p>
                </div>
              </div>
              <div className="group rounded-2xl overflow-hidden border border-border shadow-card bg-card hover:shadow-lg transition-shadow duration-300">
                <div className="p-4">
                  <img
                    src={facilities2}
                    alt="Facilities Available"
                    className="w-full h-auto rounded-xl object-contain"
                  />
                </div>
                <div className="px-4 pb-4 text-center">
                  <p className="font-display text-sm font-semibold text-foreground">
                    {language === 'en' ? 'Comprehensive Imaging Services' : 'व्यापक इमेजिंग सेवाएं'}
                  </p>
                  <p className="font-body text-xs text-muted-foreground mt-1">
                    {language === 'en' ? 'Fetal, vascular, MSK & all routine ultrasound' : 'फीटल, वैस्कुलर, MSK और सभी रूटीन अल्ट्रासाउंड'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Focus */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 text-center">
              {language === 'en' ? 'Special Focus' : 'विशेष सेवाएं'}
            </h2>
            <p className="text-muted-foreground font-body text-sm text-center mb-8">
              {language === 'en' ? 'Powered by Samsung V7 Ultrasound System' : 'Samsung V7 अल्ट्रासाउंड सिस्टम द्वारा संचालित'}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialFocus.map((item, index) => (
                <div key={item.name} className="card-clean card-highlight text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 glow-text">
                    {language === 'en' ? item.name : item.nameHi}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Other Facilities */}
        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {language === 'en' ? 'Other Facilities' : 'अन्य सुविधाएं'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherFacilities.map((item, index) => (
                <div key={item.name} className="card-clean card-highlight text-center animate-fade-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground glow-text">
                    {language === 'en' ? item.name : item.nameHi}
                  </h3>
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
        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
              {t('facilities.consultations')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {consultations.map((item, index) => (
                <div key={item.name} className="card-clean card-highlight text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 glow-text">
                    {language === 'en' ? item.name : item.nameHi}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">{item.desc}</p>
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
