import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Phone, Calendar, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactHeroBanner = () => {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgZoom = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center overflow-hidden bg-background transition-colors duration-500"
    >
      {/* Background Image with Parallax & Adaptive Overlay */}
      <motion.div 
        style={{ scale: bgZoom, opacity }}
        className="absolute inset-0 z-0"
      >
        <img
          src="/images/contact-hero-bg.png"
          alt="Book Ultrasound Appointment"
          className="w-full h-full object-cover"
        />
        {/* Dynamic Theme-Aware Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent dark:from-black/85 dark:via-black/60 dark:to-transparent transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 dark:from-slate-900 transition-colors duration-500" />
      </motion.div>

      {/* Content Container */}
      <div className="container-narrow relative z-10 mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{ y: textY }}
          className="max-w-3xl text-center md:text-left"
        >
          {/* Enhanced Glassmorphism Wrapper */}
          <div className="bg-card/40 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-border/50 dark:border-white/10 shadow-xl dark:shadow-[0_0_50px_rgba(0,200,255,0.1)] inline-block w-full transition-all duration-500">
            {/* Small Badge */}
            <motion.span 
              variants={itemVariants}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6"
            >
              {t('contact.hero.badge')}
            </motion.span>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-[1.1] transition-colors duration-500"
            >
              {t('contact.hero.title')}
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed mb-10 max-w-2xl transition-colors duration-500"
            >
              {t('contact.hero.subtitle')}
            </motion.p>

            {/* Buttons Row */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col md:flex-row gap-5 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-primary text-primary-foreground font-bold rounded-2xl px-8 py-4 shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                {t('nav.book')}
              </motion.button>
              
              <motion.a
                href="tel:+919870475400"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-border bg-background/50 text-foreground font-bold rounded-2xl px-8 py-4 backdrop-blur-sm hover:bg-foreground hover:text-background transition-all flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5 text-primary" />
                {t('contact.hero.callNow')}
              </motion.a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center md:justify-start gap-6 border-t border-border/30 pt-8"
            >
              {[
                t('contact.hero.trust1'),
                t('contact.hero.trust2'),
                t('contact.hero.trust3')
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-body">{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Gradient Glow Effects */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default ContactHeroBanner;
