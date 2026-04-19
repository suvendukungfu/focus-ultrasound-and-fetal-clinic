import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CultureSection from '@/components/CultureSection';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { Heart, Users, Sparkles, Shield, Coffee, Award, CheckCircle2, Star, TrendingUp, Calendar, Zap, MessageSquare } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

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
    desc: 'We embrace new technologies like GE Voluson E8 for world-class diagnostics.',
    descHi: 'हम सर्वोत्तम डायग्नोस्टिक सेवाओं के लिए GE Voluson E8 जैसी नई तकनीकों को अपनाते हैं।',
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
  const { language } = useLanguage();
  const { theme } = useTheme();

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const statCards = [
    { label: language === 'en' ? 'Team Members' : 'टीम सदस्य', value: '10+', icon: Users, color: 'text-primary' },
    { label: language === 'en' ? 'Satisfaction' : 'संतुष्टि', value: '98%', icon: Zap, color: 'text-emerald-400' },
    { label: language === 'en' ? 'Google Rating' : 'गूगल रेटिंग', value: '4.9', icon: Star, color: 'text-amber-400' },
    { label: language === 'en' ? 'Years of Trust' : 'भरोसे के साल', value: '15+', icon: TrendingUp, color: 'text-indigo-400' },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-700 ${theme === 'dark' ? 'bg-[#0b1220] text-white' : 'bg-background text-foreground'} selection:bg-primary/20`}>
      <Header />
      <main className="relative overflow-hidden">
        {/* Layered Background Gradients for Depth */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] opacity-40 transition-opacity duration-1000 ${theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-multiply'}`} />
          <div className={`absolute bottom-0 left-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] opacity-20 transition-opacity duration-1000 ${theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-multiply'}`} />
          <div className="absolute inset-0 bg-noise-pattern opacity-[0.03] mix-blend-overlay" />
        </div>

        {/* Main Hero Culture Section */}
        <CultureSection />

        {/* Foundational Values Section with Grouped Container */}
        <section className="py-24 md:py-32 px-6 relative z-10 overflow-hidden">
          <div className="container-narrow mx-auto max-w-[1240px]">
            <div className="mb-20">
              <SectionHeading 
                badge={language === 'en' ? 'Core Principles' : 'मुख्य सिद्धांत'}
                title={language === 'en' ? 'Our Foundational Values' : 'हमारे बुनियादी मूल्य'}
                subtitle={language === 'en' ? 'The pillars that define our commitment to excellence and high-end clinical care.' : 'उत्कृष्टता और समृद्ध नैदानिक देखभाल के प्रति हमारी प्रतिबद्धता को परिभाषित करने वाले स्तंभ।'}
              />
            </div>

            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`
                    relative bg-card/40 backdrop-blur-2xl rounded-[2.5rem] p-10 border transition-all duration-500 flex flex-col group
                    ${theme === 'dark' ? 'hover:bg-card/60 hover:shadow-glow border-white/10 hover:border-primary/40' : 'hover:bg-white shadow-soft border-black/[0.05] hover:border-primary/30'}
                  `}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20 shadow-soft group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <value.icon className="w-8 h-8 transition-transform" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">
                    {language === 'en' ? value.title : value.titleHi}
                  </h3>
                  <p className="text-muted-foreground font-body text-base leading-relaxed">
                    {language === 'en' ? value.desc : value.descHi}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Family Culture Section - Premium Split Layout */}
        <section className="py-24 md:py-40 px-6 relative z-10 bg-accent/10 border-y border-border/50">
          {/* Radial light backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-40" />
          
          <div className="container-narrow mx-auto max-w-[1240px]">
            <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
              {/* Left Column: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="max-w-2xl"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 border border-primary/20 shadow-soft"
                >
                  <MessageSquare className="w-7 h-7 text-primary" strokeWidth={1.5} />
                </motion.div>
                
                <h2 className="font-display text-4xl md:text-6xl font-bold mb-10 leading-[1.05] tracking-tight">
                  The <span className="text-primary italic">Family</span> Culture
                </h2>
                
                <p className="text-muted-foreground font-body text-xl leading-relaxed mb-12">
                  At Focus Ultrasound and Fetal Clinic, our atmosphere is governed by unity and professional warmth. 
                  Our specialists, with heritage from India's most prestigious medical institutions, bring 
                  world-class diagnostic insight directly into a caring community environment.
                </p>
                
                <div className="space-y-6">
                  {[
                    { text: 'Expertise from Safdarjung & KGMU Alumni', icon: Award },
                    { text: 'Advanced International Clinical Standards', icon: Shield },
                    { text: 'Radical Focus on Patient Experience', icon: Heart },
                  ].map((point) => (
                    <motion.div 
                      key={point.text} 
                      whileHover={{ x: 8 }}
                      className="flex items-center gap-4 text-foreground/80 font-bold group"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <point.icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="uppercase tracking-widest text-xs">{point.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column: Heroic Stats Cards Grid */}
              <div className="relative">
                {/* Decorative elevated panel for grouping */}
                <div className={`absolute -inset-8 backdrop-blur-3xl rounded-[3rem] border shadow-2xl transition-all duration-700 ${theme === 'dark' ? 'bg-[#0f172a]/20 border-white/5' : 'bg-white/40 border-black/[0.03]'}`} />
                
                <div className="relative grid grid-cols-2 gap-6 md:gap-8">
                  {statCards.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index, duration: 0.6 }}
                      whileHover={{ y: -8, scale: 1.04 }}
                      className={`
                        p-10 rounded-[2.5rem] text-center border transition-all duration-500 group shadow-soft
                        ${theme === 'dark' ? 'bg-[#1e293b]/40 border-white/10 hover:shadow-glow' : 'bg-white border-black/[0.05] hover:shadow-xl'}
                      `}
                    >
                      <div className={`inline-flex items-center justify-center p-3 rounded-2xl bg-primary/5 mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300`}>
                        <stat.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                      </div>
                      <div className={`font-display font-black text-4xl md:text-5xl mb-2 tracking-tight ${stat.color} group-hover:scale-110 transition-transform`}>
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground text-xs font-bold font-body tracking-[0.2em] uppercase leading-tight">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
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
