import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Baby, Scan, Activity, Stethoscope, Heart, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Baby,
    name: 'NT Scan',
    nameHi: 'एनटी स्कैन',
    desc: 'Early screening for chromosomal abnormalities like Down syndrome.',
    descHi: 'डाउन सिंड्रोम जैसी गुणसूत्र असामान्यता के लिए प्रारंभिक स्क्रीनिंग।',
    color: 'bg-medical-teal/10 text-medical-teal',
    image: '/images/nt-scan.jpg',
  },
  {
    icon: Scan,
    name: 'Anomaly Scan (TIFFA)',
    nameHi: 'असामान्यता स्कैन (TIFFA)',
    desc: 'Detailed mid-pregnancy scan to check baby\'s physical development.',
    descHi: 'बच्चे के शारीरिक विकास की जांच के लिए विस्तृत मध्य-गर्भावस्था स्कैन।',
    color: 'bg-medical-blue/10 text-medical-blue',
    image: '/images/anomaly-scan.jpg',
  },
  {
    icon: Activity,
    name: 'Growth Scan',
    nameHi: 'ग्रोथ स्कैन',
    desc: 'Monitor baby\'s growth and amniotic fluid in the third trimester.',
    descHi: 'तीसरी तिमाही में बच्चे के विकास और एमनियोटिक द्रव की निगरानी।',
    color: 'bg-medical-teal/10 text-medical-teal',
    image: '/images/growth-scan.jpg',
  },
  {
    icon: Stethoscope,
    name: 'Early Pregnancy Scan',
    nameHi: 'प्रारंभिक गर्भावस्था स्कैन',
    desc: 'Confirm viability, detect multiples, and accurately date the pregnancy.',
    descHi: 'गर्भावस्था की पुष्टि करें और सही तारीख तय करें।',
    color: 'bg-medical-blue/10 text-medical-blue',
    image: '/images/early-pregnancy.jpg',
  },
  {
    icon: Activity,
    name: 'Doppler Study',
    nameHi: 'डॉप्लर अध्ययन',
    desc: 'Evaluate blood flow in umbilical cord and baby\'s vessels.',
    descHi: 'गर्भनाल और बच्चे की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन।',
    color: 'bg-medical-teal/10 text-medical-teal',
    image: '/images/doppler-study.jpg',
  },
  {
    icon: Heart,
    name: 'Fetal Echocardiography',
    nameHi: 'फीटल इकोकार्डियोग्राफी',
    desc: 'Specialized ultrasound to examine the baby\'s heart structure and function.',
    descHi: 'बच्चे के हृदय की संरचना और कार्यप्रणाली की जांच।',
    color: 'bg-medical-blue/10 text-medical-blue',
    image: '/images/fetal-echo.jpg',
  },
];

const ServicesPreview = () => {
  const { language, t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-4 bg-white relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-medical-teal/5 rounded-full blur-[120px] -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-medical-blue/5 rounded-full blur-[120px] -ml-64 -mb-32" />

      <div className="container-narrow mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-medical-soft text-medical-teal text-xs font-bold uppercase tracking-[0.2em] mb-6"
          >
            {language === 'en' ? 'Our Services' : 'हमारी सेवाएं'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 max-w-3xl mx-auto leading-tight"
          >
            {language === 'en' ? 'Advanced Pregnancy Diagnostics' : 'उन्नत गर्भावस्था डायग्नोस्टिक्स'}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-1 bg-medical-teal mx-auto rounded-full origin-center"
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-soft hover:shadow-elevated transition-all duration-500 flex flex-col"
            >
              {/* Card Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center backdrop-blur-sm shadow-sm border border-white/20`}>
                  <service.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-medical-teal transition-colors duration-300 leading-tight">
                  {language === 'en' ? service.name : service.nameHi}
                </h3>
                
                <p className="text-slate-500 font-body text-base leading-relaxed mb-8 flex-grow">
                  {language === 'en' ? service.desc : service.descHi}
                </p>
                
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-medical-teal font-bold text-sm tracking-wide group/link"
                >
                  {t('services.learnMore') || (language === 'en' ? 'Learn More' : 'और जानें')}
                  <div className="w-8 h-8 rounded-full bg-medical-soft flex items-center justify-center transition-all duration-300 group-hover/link:bg-medical-teal group-hover/link:text-white">
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-16 md:mt-24"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-slate-900 text-white hover:bg-slate-800 px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-soft hover:shadow-glow hover:-translate-y-1 group"
          >
            {language === 'en' ? 'Explore Specialized Scans' : 'विशिष्ट स्कैन का पता लगाएं'}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
