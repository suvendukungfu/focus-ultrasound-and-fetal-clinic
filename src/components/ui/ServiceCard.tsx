import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  nameHi: string;
  desc: string;
  descHi: string;
  image: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, name, nameHi, desc, descHi, image, index 
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className={`
        group relative flex flex-col h-full rounded-[2.5rem] border overflow-hidden transition-all duration-700
        ${theme === 'dark' 
          ? 'bg-[#0f172a]/40 border-white/5 shadow-elevated hover:border-primary/40 hover:shadow-glow' 
          : 'bg-white border-slate-200 shadow-soft hover:border-primary/30 hover:shadow-xl'}
      `}
    >
      {/* Image Section with Consistency and Zoom */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1300ms] ease-out"
        />
        {/* Modern Layered Gradient Overlay */}
        <div className={`
          absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-75
          ${theme === 'dark' ? 'from-[#0f172a]/60' : 'from-slate-50/40'}
        `} />
        
        {/* Floating Icon Container - Senior Style */}
        <div className={`
          absolute top-8 left-8 w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground
          ${theme === 'dark' 
            ? 'bg-background/40 backdrop-blur-2xl border-white/10 text-primary hover:border-primary' 
            : 'bg-white/80 backdrop-blur-xl border-slate-200 text-primary shadow-medium hover:border-primary'}
        `}>
          <Icon className="w-7 h-7 transition-transform group-hover:rotate-12" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Section - Balanced Whitespace */}
      <div className="p-10 pt-8 flex flex-col flex-1 relative overflow-hidden">
        {/* Section Glow behind content */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/10 transition-colors" />

        <h3 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight group-hover:text-primary transition-colors leading-tight">
          {language === 'en' ? name : nameHi}
        </h3>
        
        <p className={`
          font-body text-base leading-relaxed transition-colors duration-500
          ${theme === 'dark' ? 'text-white/60' : 'text-slate-600'}
        `}>
          {language === 'en' ? desc : descHi}
        </p>
      </div>

      {/* Subtle Visual Anchor Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default ServiceCard;
