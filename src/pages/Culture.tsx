import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Heart, Users, Sparkles, Shield, Coffee, Award } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Patient-First Approach',
    titleHi: 'मरीज-प्रथम दृष्टिकोण',
    desc: 'Every decision we make is centered around what\'s best for our patients.',
    descHi: 'हमारा हर निर्णय हमारे मरीजों के लिए सबसे अच्छा क्या है उस पर केंद्रित है।',
  },
  {
    icon: Users,
    title: 'Collaborative Team',
    titleHi: 'सहयोगी टीम',
    desc: 'We work together, share knowledge, and support each other\'s growth.',
    descHi: 'हम एक साथ काम करते हैं, ज्ञान साझा करते हैं, और एक-दूसरे के विकास में सहयोग करते हैं।',
  },
  {
    icon: Sparkles,
    title: 'Innovation Driven',
    titleHi: 'नवाचार संचालित',
    desc: 'We embrace new technologies like Samsung V7 to provide the best diagnostic services.',
    descHi: 'हम सर्वोत्तम डायग्नोस्टिक सेवाएं प्रदान करने के लिए Samsung V7 जैसी नई तकनीकों को अपनाते हैं।',
  },
  {
    icon: Shield,
    title: 'Integrity & Trust',
    titleHi: 'ईमानदारी और विश्वास',
    desc: 'Transparency and honesty are at the core of everything we do.',
    descHi: 'पारदर्शिता और ईमानदारी हमारे हर काम के मूल में है।',
  },
  {
    icon: Coffee,
    title: 'Work-Life Balance',
    titleHi: 'कार्य-जीवन संतुलन',
    desc: 'We believe happy staff provide better care to patients.',
    descHi: 'हमारा मानना है कि खुश स्टाफ मरीजों को बेहतर देखभाल प्रदान करता है।',
  },
  {
    icon: Award,
    title: 'Continuous Learning',
    titleHi: 'निरंतर सीखना',
    desc: 'Regular training and international fellowships keep our team at the forefront.',
    descHi: 'नियमित प्रशिक्षण और अंतर्राष्ट्रीय फेलोशिप हमारी टीम को अग्रणी बनाए रखती हैं।',
  },
];

const CultureContent = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="relative section-padding">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              Our Values
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('culture.title')}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('culture.subtitle')}
            </p>
          </div>
        </section>

        <section className="section-padding bg-secondary/30">
          <div className="container-narrow mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div key={value.title} className="card-clean card-highlight animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 glow-text">
                    {language === 'en' ? value.title : value.titleHi}
                  </h3>
                  <p className="text-muted-foreground font-body text-sm">
                    {language === 'en' ? value.desc : value.descHi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6">
                {language === 'en' ? 'Why Choose Us?' : 'हमें क्यों चुनें?'}
              </h2>
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
                {language === 'en' 
                  ? 'At Focus Ultrasound and Fetal Clinic, we\'re not just colleagues – we\'re a family. Our doctors trained at top institutions like Safdarjung Hospital, KGMU Lucknow, and the University of Barcelona bring world-class expertise right to your neighborhood.'
                  : 'फोकस अल्ट्रासाउंड और फीटल क्लिनिक में, हम सिर्फ सहकर्मी नहीं हैं - हम एक परिवार हैं। सफदरजंग अस्पताल, KGMU लखनऊ और बार्सिलोना विश्वविद्यालय जैसे शीर्ष संस्थानों से प्रशिक्षित हमारे डॉक्टर विश्व स्तरीय विशेषज्ञता लाते हैं।'
                }
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="stat-card">
                  <div className="font-display text-3xl font-bold text-foreground mb-1">10+</div>
                  <div className="text-muted-foreground text-sm font-body">Team Members</div>
                </div>
                <div className="stat-card">
                  <div className="font-display text-3xl font-bold text-foreground mb-1">98%</div>
                  <div className="text-muted-foreground text-sm font-body">Patient Satisfaction</div>
                </div>
                <div className="stat-card">
                  <div className="font-display text-3xl font-bold text-foreground mb-1">4.9</div>
                  <div className="text-muted-foreground text-sm font-body">Google Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Culture = () => {
  return (
    <LanguageProvider>
      <CultureContent />
    </LanguageProvider>
  );
};

export default Culture;
