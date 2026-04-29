import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { CheckCircle2, Heart, ShieldCheck, Activity, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const CultureSection = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const benefits = [
    { icon: Heart, text: language === 'en' ? 'Personalized Care' : 'व्यक्तिगत देखभाल' },
    { icon: ShieldCheck, text: language === 'en' ? 'Experienced Doctors' : 'अनुभवी डॉक्टर' },
    { icon: Activity, text: language === 'en' ? 'Advanced Technology' : 'उन्नत तकनीक' },
    { icon: Users, text: language === 'en' ? 'Comfortable Environment' : 'आरामदायक वातावरण' },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center py-20 px-6 overflow-hidden transition-all duration-500">
      {/* Background with Layered Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <img loading="lazy"
          src="/images/culture-premium-bg.webp"
          alt=""
          className={`w-full h-full object-cover transition-all duration-1000 ${theme === 'dark' ? 'opacity-30 brightness-50 contrast-125' : 'opacity-50 brightness-110'}`}
          aria-hidden="true"
        />
        {/* Left Dark to Right Soft Fade Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
        {/* Vertical Depth Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90 z-10" />
        
        {/* Atmospheric Radial Light for Depth */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[15%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] mix-blend-screen opacity-30" />
      </div>

      <div className="container-narrow relative z-20 mx-auto px-6 max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Centered Glass Card with Enhanced Styles */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative p-10 md:p-16 rounded-[2rem] border backdrop-blur-xl shadow-elevated transition-all duration-700 bg-card/70 border-border text-foreground">
              {/* Badge Overlay */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="h-[1px] w-8 bg-primary/40" />
                <span className="text-primary text-xs font-bold uppercase tracking-[0.4em]">
                  {language === 'en' ? 'Our Philosophy' : 'हमारा दर्शन'}
                </span>
              </motion.div>
              
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 leading-[1.05] tracking-tight">
                Our Culture of <br />
                <span className="text-primary inline-block relative">
                  Care
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-primary/20 rounded-full origin-left" 
                  />
                </span>
              </h1>
              
              <p className={`
                font-body text-xl leading-relaxed mb-12 max-w-xl transition-colors duration-500
                text-muted-foreground
              `}>
                At <span className="text-primary font-bold">Focus Ultrasound</span>, our culture is defined by empathy and excellence. We merge 
                compassionate care with world-class technology to create a safe, supportive environment for every journey.
              </p>

              {/* Grid of Benefits with Consistent Alignment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 mb-14">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (0.1 * index) }}
                    className="flex items-center gap-4 group cursor-default"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-soft group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <benefit.icon className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-bold tracking-widest uppercase opacity-80 group-hover:opacity-100 transition-opacity">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* High-Impact CTA Button */}
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-4 bg-primary text-primary-foreground font-bold px-12 py-5 rounded-2xl transition-all duration-300 shadow-glow hover:shadow-primary/40 group relative overflow-hidden"
                >
                  <span className="relative z-10">{language === 'en' ? 'Book Appointment' : 'अपॉइंटमेंट बुक करें'}</span>
                  <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                </Link>
              </motion.div>
            </div>
            
            {/* Subtle Floating Ornament */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />
          </motion.div>

          <div className="hidden lg:block h-full relative">
            {/* Subdued balance space */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;
