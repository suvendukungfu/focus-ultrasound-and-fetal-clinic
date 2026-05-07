import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Heart, Award, Clock, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const features = [
  {
    icon: Zap,
    titleKey: 'home.features.tech.title',
    descKey: 'home.features.tech.desc',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    icon: Heart,
    titleKey: 'home.features.care.title',
    descKey: 'home.features.care.desc',
    color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  }
];

const Features = () => {
  const { t } = useLanguage();

  return (
    <section className="py-32 md:py-48 relative overflow-hidden bg-background">
      {/* Ambient Depth Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] opacity-60" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-medical-teal/5 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24 md:mb-32">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-soft"
            >
              {t('home.features.badge')}
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-display font-black tracking-tighter text-foreground leading-[1] drop-shadow-sm"
            >
              {t<string>('home.features.title')} <br />
              <span className="text-primary italic drop-shadow-none">{t<string>('home.features.titlePart2')}</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-xl max-w-sm leading-relaxed font-light"
          >
            {t('home.features.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className="relative group p-12 rounded-[3.5rem] bg-card border border-border shadow-elevated hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden"
            >
              {/* Internal Glow Effect */}
              <div className={`absolute -right-10 -top-10 w-40 h-40 ${feature.bg} rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className={`relative w-20 h-20 rounded-3xl ${feature.bg} flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner border border-white/10`}>
                <feature.icon className={`w-10 h-10 ${feature.color}`} strokeWidth={1.5} />
              </div>
              
              <h3 className="relative text-3xl font-display font-bold text-foreground mb-6 tracking-tight">
                {t(feature.titleKey)}
              </h3>
              
              <p className="relative text-muted-foreground leading-[1.8] text-lg font-light">
                {t(feature.descKey)}
              </p>
              
              <div className="relative mt-12 pt-8 border-t border-border flex items-center gap-3 text-primary font-black text-[10px] uppercase tracking-[0.3em] opacity-60 group-hover:opacity-100 transition-all duration-500 group-hover:gap-5">
                {t('home.features.learnMore')} 
                <div className="w-8 h-[1px] bg-primary/30 group-hover:w-12 transition-all duration-500" />
                <Zap className="w-3 h-3 animate-pulse" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
