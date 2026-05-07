import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative rounded-3xl p-10 md:p-14 bg-card/90 border border-border shadow-xl overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* TEXT — Left */}
        <div>
          <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-primary font-semibold text-lg mb-5 italic">
            {subtitle}
          </p>

          {/* Divider */}
          <div className="w-10 h-[2px] bg-primary/25 rounded-full mb-5" />

          <p className="font-body text-base leading-[1.75] text-muted-foreground mb-8 max-w-md">
            {desc}
          </p>

          {/* Feature pills — glass style */}
          <div className="flex flex-wrap gap-3 mb-8">
            {features.map((feat) => (
              <div
                key={feat.l}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/60 text-sm font-medium"
              >
                <feat.i className="w-4 h-4 text-primary" strokeWidth={2} />
                <span>{feat.l}</span>
              </div>
            ))}
          </div>

          {/* CTA — same gradient as TechCard */}
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-cyan-500 text-white px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300"
          >
            <span>{t('services.precision.explore')}</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        {/* IMAGE — Right */}
        <div className="relative group/img">
          {/* Soft glow behind image */}
          <div className="absolute -inset-4 bg-primary/8 rounded-3xl blur-[60px] opacity-0 group-hover/img:opacity-50 transition-opacity duration-700 pointer-events-none" />

          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <img
              loading="lazy"
              src={image}
              alt={title}
              className="w-full h-[340px] md:h-[420px] object-cover transition-transform duration-500 ease-out group-hover/img:scale-105"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedCard;
