import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Monitor, ArrowRight } from 'lucide-react';

const equipmentData = [
  {
    name: 'Samsung V7',
    nameHi: 'सैमसंग V7',
    image: '/images/clinic-samsung-v7.webp',
    desc: 'State-of-the-art 3D/4D fetal imaging with Intelligent Assist for precision measurements and early detection.',
    descHi: 'सटीक माप और शीघ्र पता लगाने के लिए इंटेलिजेंट असिस्ट के साथ अत्याधुनिक 3D/4D फीटल इमेजिंग।',
    features: ['Crystal-clear 3D/4D rendering', 'Intelligent fetal measurement assist', 'Advanced cardiac imaging'],
    featuresHi: ['क्रिस्टल-क्लियर 3D/4D रेंडरिंग', 'बुद्धिमान भ्रूण माप सहायता', 'उन्नत कार्डियक इमेजिंग'],
    color: 'primary',
    learnMoreUrl: '/services',
  },
  {
    name: 'GE Voluson E8 Expert',
    nameHi: 'GE Voluson E8 Expert',
    image: '/images/ge-voluson-e8.webp',
    desc: 'Gold standard in women\'s health with Radiantflow and SlowflowHD for exceptional vascular clarity.',
    descHi: 'महिला स्वास्थ्य में स्वर्ण मानक, असाधारण संवहनी स्पष्टता के लिए रेडिएंटफ्लो तकनीक।',
    features: ['Radiantflow for vascular clarity', 'Exceptional HDlive technology', "Specialized women's health workflow"],
    featuresHi: ['संवहनी स्पष्टता के लिए रेडिएंटफ्लो', 'असाधारण एचडीलाइव तकनीक', 'विशेष महिला स्वास्थ्य कार्यप्रवाह'],
    color: 'accent',
    learnMoreUrl: '/about#certifications',
  },
];

const EquipmentSection = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-16 md:py-24 px-4 bg-secondary/20">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-body font-medium mb-4 uppercase tracking-widest">
            {t('equipment.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('equipment.title')}
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Equipment Cards */}
        <div className="flex flex-col gap-12 md:gap-20 max-w-5xl mx-auto">
          {equipmentData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`glass-effect rounded-[2rem] overflow-hidden border border-white/60 shadow-xl flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white/50 backdrop-blur-xl group p-6 md:p-10`}
              >
                {/* Image Column */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white shadow-elevated bg-white p-4 transition-transform duration-700 group-hover:scale-[1.02]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'text-left md:items-start' : 'text-left md:text-right md:items-end'}`}>
                  <div className={`flex items-center gap-4 mb-6 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`w-14 h-14 rounded-2xl bg-${item.color}/10 flex items-center justify-center text-${item.color}`}>
                      <Monitor className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {language === 'en' ? item.name : item.nameHi}
                    </h3>
                  </div>
                  
                  <p className={`text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8 ${isEven ? '' : 'md:mr-0 md:ml-auto max-w-md'}`}>
                    {language === 'en' ? item.desc : item.descHi}
                  </p>
                  
                  <ul className="space-y-3 mb-8 w-full">
                    {(language === 'en' ? item.features : item.featuresHi).map((feature, i) => (
                      <li key={i} className={`flex items-center gap-3 text-base font-body text-foreground/80 ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
                        {isEven && <div className={`w-2 h-2 rounded-full bg-${item.color}`} />}
                        <span className="flex-1 md:flex-none">{feature}</span>
                        {!isEven && <div className={`hidden md:block w-2 h-2 rounded-full bg-${item.color}`} />}
                        {!isEven && <div className={`md:hidden w-2 h-2 rounded-full bg-${item.color}`} />}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={item.learnMoreUrl}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-${item.color} font-bold text-sm shadow-sm hover:shadow-md transition-all duration-300 group/btn`}
                  >
                    {t('common.learnMore')}
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isEven ? 'group-hover/btn:translate-x-1' : 'group-hover/btn:translate-x-1'}`} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
