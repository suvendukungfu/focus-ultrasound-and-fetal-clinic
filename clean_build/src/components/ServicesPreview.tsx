import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Baby, Scan, Activity, Stethoscope, Heart, ArrowRight, ShieldCheck } from 'lucide-react';

const services = [
  {
    icon: Scan,
    nameKey: 'services.usgAbdomen.name',
    descKey: 'services.usgAbdomen.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/2_Boyutlu_Orijinal_Ultrasound_G%C3%B6r%C3%BCnt%C3%BCs%C3%BC.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.upperAbdomen.name',
    descKey: 'services.upperAbdomen.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Amniotic_sheet.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.wholeAbdomen.name',
    descKey: 'services.wholeAbdomen.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Bicornuate_uterus_with_pregnancy.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.kub.name',
    descKey: 'services.kub.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Cervical_pregnancy_-_with_descriptions.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Scan,
    nameKey: 'services.tvs.name',
    descKey: 'services.tvs.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/CN_T21.JPG',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Stethoscope,
    nameKey: 'services.smallParts.name',
    descKey: 'services.smallParts.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Complete_miscarriage.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Activity,
    nameKey: 'services.breast.name',
    descKey: 'services.breast.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Diane_Rodriguez_y_fernando_Machado_donde_el_hombre_esta_embarazado_de_ella.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Activity,
    nameKey: 'services.fibroscan.name',
    descKey: 'services.fibroscan.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Early_ultrasound.jpg',
    machine: 'Samsung V7',
    machineType: 'SECONDARY'
  },
  {
    icon: Baby,
    nameKey: 'services.routineObs.name',
    descKey: 'services.routineObs.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Feindiagnostik_%28Ultraschall%29.jpg',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Baby,
    nameKey: 'services.level1.name',
    descKey: 'services.level1.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Fetal_Anomaly_Ultrasound_Scan_in_Navi_Mumbai.jpg',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Activity,
    nameKey: 'services.cervical.name',
    descKey: 'services.cervical.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Gastrochisis_0001.jpg',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Baby,
    nameKey: 'services.level2.name',
    descKey: 'services.level2.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Incomplete_miscarriage.jpg',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Heart,
    nameKey: 'services.fetalEcho.name',
    descKey: 'services.fetalEcho.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/LIFE_2013-06-19_10-24.jpg',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  },
  {
    icon: Activity,
    nameKey: 'services.obsDoppler.name',
    descKey: 'services.obsDoppler.desc',
    image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Molar_pregnancy_0001.jpg',
    machine: 'GE Voluson',
    machineType: 'PRIMARY'
  }
];

const ServicesPreview = () => {
  const { t } = useLanguage();

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
    <section className="relative section-padding overflow-hidden bg-background" id="services">
      {/* Immersive Background Depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-[150px] -ml-96 -mb-96 pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Cinematic Header */}
        <div className="text-center mb-24 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-10 shadow-soft"
          >
            {t('services.expertise')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-8xl font-black text-foreground mb-10 leading-none tracking-tighter"
          >
            {t('services.advDiagnostics')}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
            className="w-32 h-2 bg-gradient-to-r from-primary/50 to-transparent mx-auto rounded-full"
          />
        </div>

        {/* High-Fidelity Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.nameKey}
              variants={itemVariants}
              className="group relative flex flex-col rounded-[3.5rem] bg-card border border-border shadow-elevated hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden"
            >
              {/* Immersive Image Section */}
              <div className="relative h-72 overflow-hidden bg-secondary/10 flex items-center justify-center">
                <img loading="lazy"
                  src={service.image}
                  alt={t(service.nameKey)}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-700" />
                
                {/* Tech Badge */}
                <div className="absolute top-8 left-8 flex items-center gap-4 z-20">
                  <div className="w-14 h-14 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-white shadow-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <service.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Clinical Label */}
                <div className="absolute top-8 right-8 z-20">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-[9px] font-black tracking-widest uppercase backdrop-blur-xl border shadow-2xl transition-all duration-500 group-hover:bg-primary group-hover:text-white ${
                    service.machineType === 'PRIMARY' 
                      ? 'bg-primary/10 border-primary/20 text-primary' 
                      : 'bg-card/80 border-border text-muted-foreground'
                  }`}>
                    {service.machine}
                  </span>
                </div>
              </div>

              {/* Refined Content */}
              <div className="p-6 md:p-10 pt-4 flex flex-col flex-1 relative z-10">
                <h3 className="font-display text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-500 leading-tight tracking-tight">
                  {t(service.nameKey)}
                </h3>
                
                <p className="text-muted-foreground font-body text-base leading-relaxed flex-grow mb-10 font-light">
                  {t(service.descKey)}
                </p>
                
                {/* Interactive CTA */}
                <Link
                  to="/services"
                  className="mt-auto group/btn relative flex items-center justify-between w-full px-8 py-5 rounded-[2rem] bg-muted border border-border text-foreground font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:text-white"
                >
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-circ" />
                  <span className="relative z-10">{t('services.bookScan')}</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2" />
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
            className="btn-primary inline-flex items-center gap-3"
          >
            {t('services.exploreSpecialized')}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
