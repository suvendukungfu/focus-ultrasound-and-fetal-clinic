import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CultureSection from '@/components/CultureSection';
import { motion } from 'framer-motion';
import { Heart, Users, Sparkles, Shield, Coffee, Award, CheckCircle2 } from 'lucide-react';

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
    desc: 'We embrace new technologies like GE Voluson E8 to provide the best diagnostic services.',
    descHi: 'हम सर्वोत्तम डायग्नोस्टिक सेवाएं प्रदान करने के लिए GE Voluson E8 जैसी नई तकनीकों को अपनाते हैं।',
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

  const containerVariants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white selection:bg-[#00c8ff]/30 selection:text-white">
      <Header />
      <main>
        {/* Main Hero Culture Section */}
        <CultureSection />

        {/* Global Values Grid (Premium) */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00c8ff]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="container-narrow mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-24">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block px-5 py-2 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-[0.3em] mb-6"
              >
                {language === 'en' ? 'Core Principles' : 'मुख्य सिद्धांत'}
              </motion.span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Our Foundational <span className="text-[#00c8ff]">Values</span>
              </h2>
              <div className="w-20 h-1 bg-[#00c8ff]/40 mx-auto rounded-full" />
            </div>

            <motion.div 
              variants={containerVariants}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {values.map((value) => (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-[#00c8ff]/30 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#00c8ff]/10 flex items-center justify-center mb-8 border border-[#00c8ff]/20">
                    <value.icon className="w-8 h-8 text-[#00c8ff]" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-[#00c8ff] transition-colors">
                    {language === 'en' ? value.title : value.titleHi}
                  </h3>
                  <p className="text-[#9ca3af] font-body text-base leading-relaxed">
                    {language === 'en' ? value.desc : value.descHi}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us & Stats */}
        <section className="py-24 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="container-narrow mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-xl"
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8">
                  The <span className="text-[#00c8ff]">Family</span> Culture
                </h2>
                <p className="text-[#9ca3af] font-body text-lg leading-relaxed mb-10">
                  At Focus Ultrasound and Fetal Clinic, we're not just colleagues – we're a family. Our doctors trained at top institutions 
                  bring world-class expertise right to your neighborhood, treating every patient with the same care and respect 
                  we'd give our own.
                </p>
                <div className="space-y-4">
                  {[
                    'Expertise from Safdarjung Hospital & KGMU',
                    'International fellowships & training',
                    'Dedicated to patient satisfaction',
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-3 text-white/80 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-[#00c8ff]" />
                      <span className="text-sm">{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Team Members', value: '10+', color: 'bg-[#00c8ff]/10 text-[#00c8ff]' },
                  { label: 'Satisfaction', value: '98%', color: 'bg-emerald-500/10 text-emerald-400' },
                  { label: 'Google Rating', value: '4.9', color: 'bg-amber-400/10 text-amber-300' },
                  { label: 'Years of Trust', value: '15+', color: 'bg-indigo-500/10 text-indigo-400' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center"
                  >
                    <div className={`inline-block px-4 py-1 rounded-full ${stat.color} text-sm font-bold mb-4`}>
                      {stat.value}
                    </div>
                    <div className="text-white font-display font-bold text-lg mb-1">{stat.value}</div>
                    <div className="text-white/40 text-xs font-body tracking-wider uppercase">{stat.label}</div>
                  </motion.div>
                ))}
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
