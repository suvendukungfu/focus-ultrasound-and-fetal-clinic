import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Baby, Scan, Activity, Stethoscope, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Baby,
    name: 'NT Scan',
    nameHi: 'एनटी स्कैन',
    desc: 'Early screening for chromosomal abnormalities like Down syndrome.',
    descHi: 'डाउन सिंड्रोम जैसी गुणसूत्र असामान्यता के लिए प्रारंभिक स्क्रीनिंग।',
    image: '/images/nt-scan.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Scan,
    name: 'Anomaly Scan (TIFFA)',
    nameHi: 'असामान्यता स्कैन (TIFFA)',
    desc: 'Detailed mid-pregnancy scan to check baby\'s physical development.',
    descHi: 'बच्चे के शारीरिक विकास की जांच के लिए विस्तृत मध्य-गर्भावस्था स्कैन।',
    image: '/images/anomaly-scan.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Activity,
    name: 'Growth Scan',
    nameHi: 'ग्रोथ स्कैन',
    desc: 'Monitor baby\'s growth and amniotic fluid in the third trimester.',
    descHi: 'तीसरी तिमाही में बच्चे के विकास और एमनियोटिक द्रव की निगरानी।',
    image: '/images/growth-scan.webp',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Stethoscope,
    name: 'Early Pregnancy Scan',
    nameHi: 'प्रारंभिक गर्भावस्था स्कैन',
    desc: 'Confirm viability, detect multiples, and accurately date the pregnancy.',
    descHi: 'गर्भावस्था की व्यवहार्यता की पुष्टि करें और सही तारीख तय करें।',
    image: '/images/early-pregnancy.webp',
    machine: 'GE Voluson V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Activity,
    name: 'Doppler Study',
    nameHi: 'डॉप्लर अध्ययन',
    desc: 'Evaluate blood flow in umbilical cord and baby\'s vessels.',
    descHi: 'गर्भनाल और बच्चे की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन।',
    image: '/images/doppler-study.webp',
    machine: 'GE Voluson V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Heart,
    name: 'Fetal Echocardiography',
    nameHi: 'फीटल इकोकार्डियोग्राफी',
    desc: 'Specialized ultrasound to examine the baby\'s heart structure and function.',
    descHi: 'बच्चे के हृदय की संरचना और कार्यप्रणाली की जांच।',
    image: '/images/fetal-echo.webp',
    machine: 'GE Voluson V7',
    machineType: 'SECONDARY'
  },
];

const ServicesPreview = () => {
  const { language } = useLanguage();

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    },
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-secondary/5" id="services">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />

      <div className="container-narrow relative z-10 mx-auto px-6 max-w-[1200px]">
        {/* Header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6"
          >
            {language === 'en' ? 'Our Expertise' : 'हमारी विशेषज्ञता'}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight"
          >
            {language === 'en' ? 'Advanced Pregnancy Diagnostics' : 'उन्नत गर्भावस्था डायग्नोस्टिक्स'}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="w-24 h-1.5 bg-primary/40 mx-auto rounded-full"
          />
        </div>

        {/* Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-card backdrop-blur-md rounded-[2rem] overflow-hidden border border-border transition-all duration-500 hover:border-primary/30 hover:shadow-elevated flex flex-col shadow-sm"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <img loading="lazy"
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                
                {/* Floating Icon */}
                <div className="absolute top-6 left-6 w-12 h-12 rounded-[1rem] bg-background/80 backdrop-blur-md border border-border flex items-center justify-center shadow-soft transition-transform duration-300 group-hover:scale-110 z-10">
                  <service.icon className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                
                {/* Machine Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border shadow-soft ${
                    service.machineType === 'PRIMARY' 
                      ? 'bg-primary/10 border-primary/20 text-primary' 
                      : 'bg-background/80 border-border text-foreground/80'
                  }`}>
                    {service.machine}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-8 pt-6 flex flex-col flex-1 relative z-10">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                  {language === 'en' ? service.name : service.nameHi}
                </h3>
                
                <p className="text-muted-foreground font-body text-base leading-relaxed flex-grow mb-8">
                  {language === 'en' ? service.desc : service.descHi}
                </p>
                
                {/* CTA */}
                <Link
                  to="/services"
                  className="mt-auto inline-flex items-center justify-between w-full px-6 py-3 rounded-xl bg-secondary/5 border border-border text-foreground font-medium hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all duration-300 group/link"
                >
                  <span className="font-bold">{language === 'en' ? 'Book Scan' : 'स्कैन बुक करें'}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 md:mt-24"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-[2rem] font-bold transition-all duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-1 group"
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
