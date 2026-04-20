import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  badge: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  level?: 'h1' | 'h2' | 'h3';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  badge, title, subtitle, centered = true, light = false, level = 'h2' 
}) => {
  const TitleTag = level;

  return (
    <div className={`mb-16 md:mb-24 ${centered ? 'text-center' : 'text-left'}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`inline-block px-5 py-2 rounded-full border text-xs font-bold uppercase tracking-[0.3em] mb-6 shadow-soft ${
          light 
            ? 'bg-primary/5 border-primary/20 text-primary' 
            : 'bg-primary/10 border-primary/20 text-primary'
        }`}
      >
        {badge}
      </motion.span>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <TitleTag
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-[1.1] ${
            light ? 'text-gray-900' : 'text-gray-900 dark:text-white'
          }`}
        >
          {title}
        </TitleTag>
      </motion.div>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`font-body text-lg md:text-xl max-w-3xl mb-8 ${centered ? 'mx-auto' : ''} ${
            light ? 'text-gray-600' : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
      
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`w-24 h-1.5 bg-primary/30 rounded-full ${centered ? 'mx-auto' : ''}`}
      />
    </div>
  );
};

export default SectionHeading;
