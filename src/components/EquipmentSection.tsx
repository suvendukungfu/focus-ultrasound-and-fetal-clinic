import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Monitor, ArrowRight } from 'lucide-react';

const equipmentData = [
  {
    name: 'Samsung V7',
    nameHi: 'सैमसंग V7',
    image: '/images/clinic-samsung-v7.jpg',
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
    image: '/images/ge-voluson-e8.jpg',
    desc: 'Gold standard in women\'s health with Radiantflow and SlowflowHD for exceptional vascular clarity.',
    descHi: 'महिला स्वास्थ्य में स्वर्ण मानक, असाधारण संवहनी स्पष्टता के लिए रेडिएंटफ्लो तकनीक।',
    features: ['Radiantflow for vascular clarity', 'Exceptional HDlive technology', "Specialized women's health workflow"],
    featuresHi: ['संवहनी स्पष्टता के लिए रेडिएंटफ्लो', 'असाधारण एचडीलाइव तकनीक', 'विशेष महिला स्वास्थ्य कार्यप्रवाह'],
    color: 'accent',
    learnMoreUrl: '/about#certifications',
  },
];

const EquipmentSection = () => {
  const { language } = useLanguage();

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
            {language === 'en' ? 'World-Class Equipment' : 'विश्व-स्तरीय उपकरण'}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'en' ? 'Advanced Diagnostic Technology' : 'उन्नत डायग्नोस्टिक तकनीक'}
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Equipment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {equipmentData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-elevated transition-shadow duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="aspect-[16/9] overflow-hidden bg-muted/5 flex items-center justify-center p-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${item.color}/10 flex items-center justify-center text-${item.color} transition-colors duration-300 group-hover:bg-${item.color} group-hover:text-white`}>
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {language === 'en' ? item.name : item.nameHi}
                  </h3>
                </div>
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4 flex-grow">
                  {language === 'en' ? item.desc : item.descHi}
                </p>
                <ul className="space-y-2 mb-5">
                  {(language === 'en' ? item.features : item.featuresHi).map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${item.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to={item.learnMoreUrl}
                  className={`inline-flex items-center gap-1.5 text-${item.color} font-semibold text-sm hover:underline`}
                >
                  {language === 'en' ? 'Learn More' : 'और जानें'}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
