import React from 'react';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  /** 'sm' for navbar, 'lg' for hero section */
  size?: 'sm' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Premium Brand Logo with soft glow, gradient ring, and pulse animation.
 * - Retina-quality PNG
 * - Lazy loaded with async decoding
 * - Pulse animation: scale 1 → 1.05 → 1
 */
const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'sm', className = '' }) => {
  const dimensions = {
    sm: 'w-10 h-10 md:w-12 md:h-12',
    lg: 'w-16 h-16 md:w-20 md:h-20',
  };

  const glowSize = {
    sm: 'blur-md',
    lg: 'blur-xl',
  };

  const ringWidth = {
    sm: 'border-2',
    lg: 'border-[3px]',
  };

  return (
    <div className={`relative ${dimensions[size]} flex items-center justify-center ${className}`}>
      {/* Layer 1: Soft ambient glow (outer) - Using a larger spread for premium feel */}
      <div
        className={`absolute inset-[-12px] bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/30 rounded-full ${glowSize[size]} opacity-40 pointer-events-none`}
      />

      {/* Layer 2: Animated gradient ring with pulse */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute inset-[-4px] rounded-full bg-gradient-to-tr from-primary via-secondary to-primary opacity-60`}
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 6s ease infinite',
        }}
      />

      {/* Layer 3: Background to mask the center of the ring */}
      <div className="absolute inset-0 rounded-full bg-background" />

      {/* Layer 4: Logo image with subtle pulse */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`relative w-full h-full rounded-full overflow-hidden ${ringWidth[size]} border-white/80 dark:border-white/10 shadow-glow z-10 bg-white dark:bg-slate-900 flex items-center justify-center`}
      >
        <img
          src="/images/fetal-ultrasound.webp"
          alt="Focus Ultrasound & Fetal Clinic — Brand Logo"
          loading="lazy"
          decoding="async"
          width={size === 'lg' ? 160 : 96}
          height={size === 'lg' ? 160 : 96}
          className="w-[85%] h-[85%] object-contain"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src.includes('fetal-ultrasound.webp')) {
              img.src = '/images/fetal-ultrasound.png';
            } else if (img.src.includes('fetal-ultrasound.png')) {
              img.src = '/images/clinic-logo-new.webp';
            }
          }}
        />
      </motion.div>

      {/* Layer 5: Hover glow intensifier */}
      <div
        className={`absolute inset-[-10px] bg-gradient-to-tr from-primary/40 to-secondary/40 rounded-full ${glowSize[size]} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      />
    </div>
  );
};

export default BrandLogo;
