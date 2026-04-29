import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';

interface TechCardProps {
  icon: LucideIcon;
  name: string;
  image: string;
  desc: string;
  descHi: string;
  url: string;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({ 
  icon: Icon, name, image, desc, descHi, url, index 
}) => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`
        flex flex-col lg:flex-row gap-12 lg:gap-20 items-center overflow-hidden rounded-[2rem] p-6 transition-all duration-700
        ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}
        bg-card border-border shadow-soft hover:shadow-elevated
        border group
      `}
    >
      {/* Image Side with Scale-on-Hover */}
      <div className="w-full lg:w-1/2 relative">
        <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] blur-2xl transition-all duration-700 group-hover:bg-primary/10" />
        <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden border border-border/50 shadow-medium">
          <img loading="lazy" 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform [transition-duration:1500ms] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent group-hover:opacity-60 transition-opacity" />
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 lg:p-12">
        <motion.div 
          className="flex items-center gap-5 mb-8"
          whileHover={{ x: 8 }}
        >
          <div className="w-16 h-16 rounded-[1rem] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-soft group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
            <Icon className="w-8 h-8 transition-transform group-hover:rotate-12" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight group-hover:text-primary transition-colors">
            {name}
          </h3>
        </motion.div>
        
        <p className="font-body text-xl leading-relaxed mb-12 transition-colors duration-500 text-muted-foreground">
          {language === 'en' ? desc : descHi}
        </p>
        
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground border border-primary/20 px-10 py-5 rounded-[2rem] font-bold text-sm tracking-[0.2em] uppercase hover:shadow-glow hover:shadow-primary/40 transition-all duration-300 shadow-soft group"
        >
          Full Technical Specs
          <ExternalLink className="w-5 h-5 transition-transform group-hover:rotate-12 group-hover:translate-x-1" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default TechCard;
