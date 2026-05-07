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
        grid grid-cols-1 lg:grid-cols-2 gap-12 items-center
        ${isReversed ? 'direction-rtl' : ''}
      `}
      style={isReversed ? { direction: 'rtl' } : undefined}
    >
      {/* IMAGE */}
      <div className="relative group/img" style={{ direction: 'ltr' }}>
        {/* Soft glow behind image */}
        <div className="absolute -inset-4 bg-primary/8 rounded-3xl blur-[60px] opacity-0 group-hover/img:opacity-50 transition-opacity duration-700 pointer-events-none" />

        <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gray-50 dark:bg-gray-900">
          <img
            loading="lazy"
            src={image}
            alt={name}
            className="w-full h-[340px] md:h-[420px] object-contain transition-transform duration-500 ease-out group-hover/img:scale-105"
          />
          {/* Glass badge on image */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-gray-700 dark:text-gray-200">
                Active System
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center" style={{ direction: 'ltr' }}>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/15">
            <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground">
            {name}
          </h3>
        </div>

        {/* Subtle divider */}
        <div className="w-10 h-[2px] bg-primary/25 rounded-full mb-5" />

        <p className="font-body text-base leading-[1.75] text-muted-foreground mb-8 max-w-md">
          {desc}
        </p>

        {/* CTA — teal→cyan gradient with hover lift */}
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.97 }}
          className="self-start inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-cyan-500 text-white px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
        >
          {t<string>('services.tech.specs')}
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default TechCard;
