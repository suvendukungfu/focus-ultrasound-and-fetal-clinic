import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, ShieldCheck, Activity, Users, Star, Award } from 'lucide-react';

const CultureSection = () => {
  const { t, language } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="relative bg-white dark:bg-background overflow-hidden">
      {/* A. FLAGSHIP CULTURE HERO */}
      <div className="relative w-full h-[90vh] md:h-screen flex items-center overflow-hidden">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/culture/ultrasound-consultation.webp"
            alt="Focus Ultrasound Culture"
            className="w-full h-full object-cover object-center"
          />
          {/* Overlays - Darker on left, fade to white at bottom */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20" />
          <div className="absolute inset-0 bg-black/20 z-0" />
        </div>

        {/* CONTENT GRID */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-12 pt-20">
          {/* LEFT CONTENT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full md:max-w-2xl space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>{t('culture.philosophy')}</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1]"
            >
              <span>{t('culture.titlePart1')} </span>
              <span className="text-primary block md:inline">{t('culture.titlePart2')}</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-lg text-white/80 leading-relaxed max-w-lg"
            >
              {t('culture.description')}
            </motion.p>

            {/* Benefit Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-4">
              {[
                { icon: Heart, text: t('culture.benefit1') },
                { icon: Users, text: t('culture.benefit2') },
                { icon: Activity, text: t('culture.benefit3') },
                { icon: Activity, text: t('culture.benefit4') }
              ].map((benefit, i) => (
                <div key={i} className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold tracking-wider uppercase flex items-center gap-2 hover:bg-white/20 transition-colors">
                  <benefit.icon className="w-3.5 h-3.5 text-primary" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: STATS CARDS */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full md:w-auto flex flex-col gap-4"
          >
            {[
              { value: '15+', label: language === 'en' ? 'YEARS OF EXCELLENCE' : 'उत्कृष्टता के वर्ष' },
              { value: '50K+', label: language === 'en' ? 'FAMILIES SERVED' : 'सेवा प्राप्त परिवार' },
              { value: '24/7', label: language === 'en' ? 'EMERGENCY CARE' : 'आपातकालीन देखभाल' },
              { value: '100%', label: language === 'en' ? 'PATIENT SATISFACTION' : 'रोगी संतुष्टि' }
            ].map((stat, i) => (
              <div key={i} className="w-full md:w-64 p-6 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex flex-row items-center gap-4 group hover:bg-white/20 transition-all duration-300">
                <div className="text-3xl font-black text-primary group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-[10px] font-bold text-white/70 tracking-widest leading-tight uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* B. SPREAD OUT PHILOSOPHY SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-20 items-start"
        >
          {/* LEFT COLUMN: BRAND PILLAR & IMAGE */}
          <motion.div variants={itemVariants} className="space-y-12">
            <div className="space-y-8">
              <div className="bg-primary/5 inline-block p-4 rounded-2xl border border-primary/10">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                {t('culture.family.title')}
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full" />
            </div>

            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img 
                src="/images/clinic-entry-new.webp" 
                alt="Clinic Entrance" 
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DETAILED NARRATIVE */}
          <motion.div variants={itemVariants} className="space-y-10">
            <p className="text-2xl text-muted-foreground leading-relaxed font-light italic">
              "{t('culture.family.desc')}"
            </p>
            
            <div className="grid gap-8 pt-8 border-t border-border">
              {[
                { icon: Award, text: t('culture.family.point1') },
                { icon: Activity, text: t('culture.family.point2') },
                { icon: Heart, text: t('culture.family.point3') }
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted flex items-center justify-center transition-colors group-hover:bg-primary/10">
                    <point.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {point.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CultureSection;
