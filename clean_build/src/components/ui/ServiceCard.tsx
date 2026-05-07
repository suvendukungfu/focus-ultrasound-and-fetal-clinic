import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { useWhatsApp } from '@/contexts/WhatsAppContext';

interface ServiceCardProps {
  icon: LucideIcon;
  name: string;
  desc: string;
  image: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, name, desc, image, index 
}) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { setService, buildUrl } = useWhatsApp();

  const handleBookClick = (e: React.MouseEvent) => {
    // Optional: context update if needed for other components
    setService(name);
  };

  // Build a one-off URL for this specific service using the centralized context logic
  const directUrl = buildUrl({ service: name });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col h-full rounded-[2rem] border overflow-hidden transition-all duration-700 bg-card border-border shadow-soft hover:border-primary/30 hover:shadow-elevated"
    >
      {/* Image Section with Consistency and Zoom */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary/10 flex items-center justify-center">
        <img loading="lazy"
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all [transition-duration:1300ms] ease-out group-hover:scale-105"
        />
        {/* Modern Layered Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-75" />
        
        {/* Floating Icon Container */}
        <div className="absolute top-8 left-8 w-14 h-14 rounded-[1rem] flex items-center justify-center border transition-all duration-700 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground bg-background/80 backdrop-blur-xl border-border text-primary shadow-soft hover:border-primary">
          <Icon className="w-7 h-7 transition-transform group-hover:rotate-12" strokeWidth={1.5} />
        </div>
      </div>

      {/* Content Section - Balanced Whitespace */}
      <div className="p-10 pt-8 flex flex-col flex-1 relative overflow-hidden">
        {/* Section Glow behind content */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-[60px] pointer-events-none group-hover:bg-primary/10 transition-colors" />

        <h2 className="font-display text-2xl md:text-3xl font-bold mb-5 tracking-tight group-hover:text-primary transition-colors leading-tight">
          {name}
        </h2>
        
        <p className="font-body text-base leading-relaxed transition-colors duration-500 text-muted-foreground mb-6">
          {desc}
        </p>

        {/* Book via WhatsApp CTA */}
        <div className="mt-auto">
          <a
            href={directUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleBookClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                       bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20
                       hover:bg-[#25D366] hover:text-white hover:border-[#25D366]
                       transition-all duration-300 group/btn"
          >
            <MessageCircle className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            {t('services.bookWhatsapp')}
          </a>
        </div>
      </div>

      {/* Subtle Visual Anchor Line */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default ServiceCard;
