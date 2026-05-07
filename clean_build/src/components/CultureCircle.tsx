import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Users, Sparkles, Shield, Coffee, Award } from 'lucide-react';

interface ValueItem {
  title: string;
  desc: string;
}

const CultureCircle = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const valueIcons = [Heart, Users, Sparkles, Shield, Coffee, Award];
  const valuesData = t<ValueItem[]>('culture.values.items');
  const values = (Array.isArray(valuesData) ? valuesData : []).map((val, i) => ({
    ...val,
    icon: valueIcons[i % valueIcons.length] || Heart
  }));

  const radius = 220; // Radius of the circle

  return (
    <div className="relative py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Decorative ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-medical-teal/10 rounded-full blur-[80px] -z-10" />

      <div className="text-center mb-16 md:mb-24 px-6 z-10">
        <span className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.4em] mb-6 shadow-soft">
          {t('culture.values.badge')}
        </span>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
          Our Culture <span className="text-primary italic">Circle</span>
        </h2>
        <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
          {t('culture.values.subtitle')}
        </p>
      </div>

      <div className="relative w-full max-w-[800px] h-[600px] md:h-[700px] flex items-center justify-center">
        {/* SVG Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--medical-teal)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="origin-center" style={{ transform: 'translate(50%, 50%)' }}>
            {values.map((_, index) => {
              const angle = (index * (360 / values.length)) * (Math.PI / 180);
              const x2 = Math.cos(angle) * radius;
              const y2 = Math.sin(angle) * radius;
              const isActive = activeIndex === index;
              return (
                <motion.line
                  key={`line-${index}`}
                  x1="0"
                  y1="0"
                  x2={x2}
                  y2={y2}
                  stroke={isActive ? "url(#lineGradient)" : "currentColor"}
                  strokeWidth={isActive ? "2" : "1"}
                  className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-10 text-gray-400 dark:text-gray-600'}`}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ delay: index * 0.1, duration: 1 }}
                  viewport={{ once: true }}
                />
              );
            })}
          </g>
        </svg>

        {/* Central Hub with Pulse */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="absolute z-20 w-48 h-48 md:w-56 md:h-56 rounded-full bg-card shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_-10px_rgba(0,0,0,0.4)] border border-border flex flex-col items-center justify-center p-6 text-center group"
        >
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20 [animation-duration:3s]" />
          <div className="absolute -inset-4 rounded-full border border-medical-teal/20 animate-pulse opacity-20 [animation-duration:4s]" />
          
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-medical-teal/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Heart className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform duration-500" />
          <h3 className="text-xl font-bold text-foreground">Patient First</h3>
          <p className="text-xs text-muted-foreground mt-2 font-semibold uppercase tracking-wider">Core Philosophy</p>
        </motion.div>

        {/* Orbiting Elements */}
        {values.map((value, index) => {
          // Calculate positioning in a circle
          const angle = (index * (360 / values.length)) * (Math.PI / 180);
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isActive = activeIndex === index;

          // Determine tooltip position based on angle to avoid overflow
          const isRight = Math.cos(angle) > 0;
          const isBottom = Math.sin(angle) > 0;

          return (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ opacity: 1, x, y }}
              transition={{ delay: index * 0.1, duration: 0.8, type: "spring", bounce: 0.4 }}
              viewport={{ once: true }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="absolute z-10 hidden md:flex"
              style={{
                originX: 0.5,
                originY: 0.5
              }}
            >
              <div className={`relative w-20 h-20 rounded-full flex items-center justify-center bg-card shadow-xl border cursor-pointer transition-all duration-300 ${isActive ? 'scale-125 border-primary shadow-[0_0_30px_-5px_var(--primary)] z-30' : 'border-border hover:border-primary/50'}`}>
                <value.icon className={`w-8 h-8 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                
                {/* Tooltip Content */}
                <div className={`absolute w-72 p-5 rounded-2xl bg-card/95 backdrop-blur-md shadow-2xl border border-border transition-all duration-300 pointer-events-none z-50
                  ${isBottom ? 'top-full mt-6' : 'bottom-full mb-6'}
                  ${isRight ? 'left-1/2 -translate-x-1/4' : 'right-1/2 translate-x-1/4'}
                  ${isActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2'}`}
                >
                  <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                    <value.icon className="w-4 h-4 text-primary" />
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{value.desc}</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Mobile View (Grid instead of circle for smaller screens) */}
        <div className="absolute inset-0 md:hidden flex flex-col items-center justify-center px-6 overflow-y-auto pt-48 pb-12 gap-6 z-30">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full bg-card/80 backdrop-blur-md p-6 rounded-3xl border border-border shadow-lg flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary">
                <value.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-1">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Orbit Ring connecting items */}
        <div className="absolute w-[440px] h-[440px] rounded-full border border-gray-200/50 dark:border-gray-800/50 border-dashed hidden md:block -z-10" />
        <div className="absolute w-[440px] h-[440px] rounded-full border border-primary/20 border-dashed animate-[spin_60s_linear_infinite] hidden md:block -z-10" />
        <div className="absolute w-[460px] h-[460px] rounded-full border border-medical-teal/10 border-dashed animate-[spin_40s_linear_infinite_reverse] hidden md:block -z-10" />
      </div>
    </div>
  );
};

export default CultureCircle;
