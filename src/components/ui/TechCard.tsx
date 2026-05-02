import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TechCardProps {
  icon: LucideIcon;
  name: string;
  image: string;
  desc: string;
  url: string;
  index: number;
}

const TechCard: React.FC<TechCardProps> = ({
  icon: Icon, name, image, desc, url, index
}) => {
  const { t } = useLanguage();
  const isReversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center
        ${isReversed ? 'lg:direction-rtl' : ''}
      `}
      style={isReversed ? { direction: 'rtl' } : undefined}
    >
      {/* IMAGE */}
      <div className="relative group/img w-full max-w-xl mx-auto lg:max-w-none" style={{ direction: 'ltr' }}>
        {/* Soft glow behind image */}
        <div className="absolute -inset-4 bg-primary/8 rounded-3xl blur-[40px] md:blur-[60px] opacity-0 group-hover/img:opacity-50 transition-opacity duration-700 pointer-events-none" />

        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-900 border border-border/40">
          <img
            loading="lazy"
            src={image}
            alt={name}
            className="w-full h-[280px] xs:h-[340px] md:h-[420px] object-contain transition-transform duration-500 ease-out group-hover/img:scale-105"
          />
          {/* Glass badge on image */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
            <div className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/70 dark:bg-black/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-wider uppercase text-gray-700 dark:text-gray-200">
                Active System
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center text-center lg:text-left" style={{ direction: 'ltr' }}>
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-4 mb-5">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15 shrink-0">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground">
            {name}
          </h3>
        </div>

        {/* Subtle divider */}
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6 mx-auto lg:mx-0" />

        <p className="font-body text-sm md:text-base leading-relaxed text-muted-foreground mb-8 max-w-md mx-auto lg:mx-0">
          {desc}
        </p>

        {/* CTA — teal→cyan gradient with hover lift */}
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-xs md:text-sm tracking-wide shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto self-center lg:self-start"
        >
          <span>{t<string>('services.tech.specs')}</span>
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default TechCard;
