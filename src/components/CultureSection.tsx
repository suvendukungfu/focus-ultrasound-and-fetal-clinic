import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, ShieldCheck, Activity, Users, Star, Award } from 'lucide-react';
import { useRef } from 'react';

const CultureSection = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
    <section className="relative bg-background overflow-hidden">
      {/* A. FLAGSHIP CULTURE HERO */}
      <div ref={containerRef} className="relative w-full min-h-[100dvh] flex items-center overflow-hidden">
        {/* BACKGROUND IMAGE - Enhanced Parallax */}
        <motion.div style={{ y: y1, opacity }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
          <img
            src="/images/culture/ultrasound-consultation.webp"
            alt="Focus Ultrasound Culture"
            className="w-full h-full object-cover object-center scale-110 shadow-inner"
          />
          <div className="absolute inset-0 bg-black/20 z-10" />
        </motion.div>

        {/* CONTENT GRID */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-5 sm:px-10 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 pt-20 pb-16 md:pt-20 md:pb-10">
          {/* LEFT CONTENT - Slight reverse parallax */}
          <motion.div
            style={{ y: y2 }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full md:max-w-2xl space-y-4 md:space-y-8 text-left"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-[9px] md:text-[10px] font-bold tracking-widest uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>{t('culture.philosophy')}</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants} 
              className="text-[2.2rem] sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]"
            >
              <span>{t('culture.titlePart1')} </span>
              <span className="text-primary block md:inline drop-shadow-md">{t('culture.titlePart2')}</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-sm sm:text-base md:text-lg text-white leading-relaxed max-w-lg mx-auto md:mx-0 font-semibold [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]"
            >
              {t('culture.description')}
            </motion.p>

            {/* Benefit Badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 pt-2">
              {[
                { icon: Heart, text: t('culture.benefit1') },
                { icon: Users, text: t('culture.benefit2') },
                { icon: Activity, text: t('culture.benefit3') },
                { icon: Activity, text: t('culture.benefit4') }
              ].map((benefit, i) => (
                <div key={i} className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-black/30 dark:bg-slate-900/40 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[11px] font-bold tracking-wider uppercase flex items-center gap-2 hover:bg-black/40 dark:hover:bg-slate-900/60 hover:border-white/40 transition-all duration-500 group shadow-sm">
                  <benefit.icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary group-hover:scale-110 transition-transform" />
                  <span>{benefit.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT: STATS CARDS */}
          <motion.div 
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-4"
          >
            {[
              { value: '10+', label: t('culture.stats.years') },
              { value: '1K+', label: t('culture.stats.families') },
              { value: '24/7', label: t('culture.stats.emergency') },
              { value: '100%', label: t('culture.stats.satisfaction') }
            ].map((stat, i) => (
              <div key={i} className="p-3 md:p-6 rounded-2xl md:rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-4 group hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 text-center md:text-left shadow-premium">
                <div className="text-xl md:text-3xl font-black text-primary group-hover:scale-110 transition-transform">{stat.value}</div>
                <div className="text-[8px] md:text-[10px] font-bold text-slate-600 dark:text-slate-400 tracking-widest leading-tight uppercase group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* B. SPREAD OUT PHILOSOPHY SECTION */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 sm:py-24 md:py-48 relative">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse-slow" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start"
        >
          {/* LEFT COLUMN: BRAND PILLAR & IMAGE */}
          <motion.div variants={itemVariants} className="space-y-8 md:space-y-12">
            <div className="space-y-4 md:space-y-8 text-center lg:text-left">
              <div className="bg-primary/5 dark:bg-primary/10 inline-block p-4 rounded-2xl border border-primary/10 dark:border-primary/20 shadow-sm">
                <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
              <h2 className="text-3xl md:text-6xl font-black text-foreground tracking-tight leading-tight">
                {t('culture.family.title')}
              </h2>
              <div className="w-16 md:w-20 h-1.5 bg-primary rounded-full mx-auto lg:mx-0 shadow-glow-sm" />
            </div>

            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border border-border/50">
              <img 
                src="/images/clinic-entry-new.webp" 
                alt="Clinic Entrance" 
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                <p className="text-white text-xs font-bold tracking-widest uppercase drop-shadow-md">Focus Ultrasound & Fetal Clinic</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DETAILED NARRATIVE */}
          <motion.div variants={itemVariants} className="space-y-8 md:space-y-12 lg:pt-20">
            <p className="text-lg sm:text-xl md:text-3xl text-muted-foreground/80 leading-relaxed font-light italic text-center lg:text-left border-l-0 lg:border-l-4 lg:pl-10 border-primary/20">
              "{t('culture.family.desc')}"
            </p>
            
            <div className="grid gap-4 sm:gap-6 md:gap-8 pt-8 md:pt-12 border-t border-border/60">
              {[
                { icon: Award, text: t('culture.family.point1') },
                { icon: Activity, text: t('culture.family.point2') },
                { icon: Heart, text: t('culture.family.point3') }
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 md:gap-8 group">
                  <div className="flex-shrink-0 w-10 h-10 md:w-16 md:h-16 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center transition-all duration-500 group-hover:bg-primary group-hover:shadow-glow-sm">
                    <point.icon className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-base sm:text-lg md:text-xl font-bold text-foreground/90 group-hover:text-primary transition-colors duration-300">
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
