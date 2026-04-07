import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight, Dna, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';

interface FeatureItem {
  l: string;
  i: LucideIcon;
}

interface FeaturedCardProps {
  title: string;
  subtitle: string;
  desc: string;
  features: FeatureItem[];
  image: string;
  accuracy: string;
  url: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ 
  title, subtitle, desc, features, image, accuracy, url 
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative rounded-[3.5rem] p-8 md:p-24 border overflow-hidden group shadow-elevated transition-all duration-700
        ${theme === 'dark' ? 'bg-card/30 border-white/10 backdrop-blur-3xl' : 'bg-white/80 border-slate-200 backdrop-blur-xl'}
      `}
    >
      {/* Decorative Layering */}
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity duration-1000 group-hover:scale-110 pointer-events-none">
        <Dna className="w-80 h-80 text-primary animate-pulse-slow" strokeWidth={0.5} />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 border border-primary/20 shadow-soft transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <Sparkles className="w-8 h-8" strokeWidth={1.5} />
          </motion.div>
          
          <h3 className="font-display text-5xl md:text-7xl font-bold mb-10 leading-[1.05] tracking-tight">
            {title} <br />
            <span className="text-primary italic relative inline-block">
              {subtitle}
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute -bottom-2 left-0 h-1.5 bg-primary/20 rounded-full" 
              />
            </span>
          </h3>
          
          <p className={`
            font-body text-2xl leading-relaxed mb-14 transition-colors duration-500
            ${theme === 'dark' ? 'text-white/70' : 'text-slate-600'}
          `}>
            {desc}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-14">
            {features.map((feat) => (
              <motion.div 
                key={feat.l} 
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 shadow-soft font-bold text-sm tracking-wide
                  ${theme === 'dark' ? 'bg-background/40 border-white/5 hover:border-primary/40' : 'bg-white/50 border-slate-200 hover:border-primary/30'}
                `}
              >
                <feat.i className="w-5 h-5 text-primary" strokeWidth={2} />
                {feat.l}
              </motion.div>
            ))}
          </div>
          
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-14 py-6 rounded-[2.5rem] font-black text-lg transition-all shadow-glow hover:shadow-primary/40 group relative overflow-hidden"
          >
            <span className="relative z-10">{language === 'en' ? 'Explore MedGenome' : 'मेडजिनोम एक्सप्लोर करें'}</span>
            <ArrowRight className="w-7 h-7 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.a>
        </div>
        
        <div className="relative">
          <motion.div 
            whileHover={{ y: -12, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`
              rounded-[4rem] overflow-hidden border shadow-elevated aspect-[4/5] relative transition-colors duration-700
              ${theme === 'dark' ? 'border-border' : 'border-slate-200'}
            `}
          >
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-40" />
            
            {/* Dynamic Accuracy Stat */}
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="absolute bottom-8 right-8 md:-bottom-10 md:-right-10 bg-card/90 backdrop-blur-2xl border border-primary/30 p-10 rounded-[2.5rem] shadow-glow animate-float-slow hidden md:block"
            >
              <p className="text-primary text-5xl font-black mb-2 tracking-tighter">{accuracy}</p>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.3em] pl-1">
                {language === 'en' ? 'Accuracy Rate' : 'सटीकता दर'}
              </p>
            </motion.div>
          </motion.div>
          
          {/* Subtle Ambient Glow behind Image */}
          <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity" />
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
