import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'primary' | 'secondary' | 'accent';
  withBackgroundDepth?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className = '', 
  id, 
  variant = 'primary',
  withBackgroundDepth = true
}) => {
  const { theme } = useTheme();

  const variantStyles = {
    primary: theme === 'dark' ? 'bg-[#0b1222]' : 'bg-slate-50',
    secondary: theme === 'dark' ? 'bg-[#0f172a]' : 'bg-white',
    accent: theme === 'dark' ? 'bg-[#0b1222]/50' : 'bg-primary/5',
  };

  return (
    <section 
      id={id} 
      className={`relative py-24 md:py-32 px-6 overflow-hidden transition-colors duration-700 ${variantStyles[variant]} ${className}`}
    >
      {withBackgroundDepth && (
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* Layered Mesh Gradients */}
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] opacity-40 transition-all duration-1000 animate-pulse" />
          <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] opacity-30 transition-all duration-1000" />
          
          {/* Subtle Noise Texture */}
          <div className="absolute inset-0 bg-noise-pattern opacity-[0.02] mix-blend-overlay" />
          
          {/* Radial Highlight */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full blur-[150px] opacity-20 transition-all duration-1000 ${theme === 'dark' ? 'bg-primary/5' : 'bg-primary/10'}`} />
        </div>
      )}
      
      <div className="container-narrow relative z-10 mx-auto max-w-[1240px]">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
