import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Phone, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactHeroBanner = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-[#f0f7fa] via-white to-[#e8f4f8] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[-5%] w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[80px]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{ backgroundImage: 'radial-gradient(circle, #0d9488 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-[11px] font-bold uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span>{t<string>('contact.hero.badge')}</span>
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a2b4c] dark:text-white mb-5 leading-[1.12] tracking-tight"
          >
            <span>{t<string>('contact.hero.title')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-[#5a6b8c] dark:text-gray-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto"
          >
            <span>{t<string>('contact.hero.subtitle')}</span>
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold rounded-xl px-8 py-4 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all flex items-center justify-center gap-2.5 text-sm"
            >
              <Calendar className="w-4.5 h-4.5" />
              <span>{t<string>('nav.book')}</span>
            </motion.button>
            
            <motion.a
              href="tel:+919870475400"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="border border-border bg-white dark:bg-slate-800 text-[#1a2b4c] dark:text-white font-semibold rounded-xl px-8 py-4 hover:border-primary/30 transition-all flex items-center justify-center gap-2.5 text-sm shadow-sm"
            >
              <Phone className="w-4.5 h-4.5 text-primary" />
              <span>{t<string>('contact.hero.callNow')}</span>
            </motion.a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 md:gap-10"
          >
            {[
              t('contact.hero.trust1'),
              t('contact.hero.trust2'),
              t('contact.hero.trust3')
            ].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-[#5a6b8c] dark:text-gray-400">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-semibold tracking-wide uppercase text-[10px] sm:text-[11px]">{badge}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHeroBanner;
