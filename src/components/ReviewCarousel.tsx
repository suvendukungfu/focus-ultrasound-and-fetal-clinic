import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';
import { Testimonial } from '@/hooks/useTestimonials';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewCarouselProps {
  reviews: Testimonial[];
}

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
  </svg>
);

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length === 0 || isPaused) return;
    
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [reviews.length, isPaused, nextSlide]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];
  const initials = currentReview.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-primary/5 blur-[80px] md:blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-secondary/5 blur-[100px] md:blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col items-center mb-12 md:mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-8 md:mb-10"
        >
          <div className="flex -space-x-2 md:-space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 md:border-4 border-background bg-muted overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/150?u=user${i + 20}`} alt="user" className="w-full h-full object-cover grayscale-[0.2]" />
              </div>
            ))}
          </div>
          <div className="text-xs md:text-sm font-bold text-muted-foreground flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
            <span className="text-foreground font-black">5000+</span> {t<string>('reviews.happyFamiliesCount')}
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-7xl font-display font-black text-center mb-8 tracking-tight md:tracking-tighter leading-[1.1] md:leading-[1.05]"
        >
          {language === 'en' ? 'Trusted by ' : 'भरोसा जताया ' }
          <span className="text-primary italic">{language === 'en' ? 'Thousands' : 'हजारों ने'}</span>
          <br />
          {language === 'en' ? 'of Families' : 'परिवारों का'}
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col xs:flex-row items-center gap-4 md:gap-8 px-6 md:px-8 py-4 bg-card shadow-elevated rounded-3xl md:rounded-[2.5rem] border border-border/20 w-full max-w-sm xs:max-w-none"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-amber-500/10 flex items-center justify-center shadow-sm">
              <GoogleIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-muted-foreground leading-none mb-1">Google Trust</span>
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-black text-foreground">4.8</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xs:block w-px h-10 bg-border/50" />
          <div className="flex flex-col items-center xs:items-start">
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-black text-muted-foreground leading-none mb-1">Clinic Status</span>
            <div className="flex items-center gap-2 text-medical-teal font-black text-xs md:text-sm uppercase tracking-tighter">
              <div className="w-2 h-2 rounded-full bg-medical-teal animate-pulse" />
              {t<string>('reviews.verifiedPatients')}
            </div>
          </div>
        </motion.div>
      </div>

      <div 
        className="relative group max-w-5xl mx-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative overflow-hidden min-h-[550px] xs:min-h-[500px] md:min-h-[420px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] gap-6 md:gap-16 items-center bg-card border border-border/40 p-6 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-soft relative overflow-hidden group/card hover:shadow-elevated transition-all duration-700">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-bl-[2.5rem] md:rounded-bl-[4rem] pointer-events-none" />
                
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-muted/10 md:h-1.5 overflow-hidden">
                  <motion.div 
                    key={currentIndex}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-primary"
                  />
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left relative">
                  <div className="relative mb-4 md:mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-[2rem] md:rounded-[3.5rem] bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center text-3xl sm:text-4xl md:text-6xl font-black text-white shadow-glow-primary -rotate-2 md:-rotate-3 group-hover/card:rotate-0 transition-all duration-700">
                      {initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-card p-2 md:p-3 rounded-lg md:rounded-2xl shadow-elevated border border-border/50">
                      <GoogleIcon />
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-black text-foreground mb-1 tracking-tight">
                    {language === 'en' ? currentReview.name : (currentReview.nameHi || currentReview.name)}
                  </h3>
                  <div className="flex items-center gap-1.5 text-primary font-black text-[9px] md:text-[10px] uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                    <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    {t<string>('reviews.verified') || 'Verified'}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-8 -left-4 md:-top-12 md:-left-8 w-16 h-16 md:w-24 md:h-24 text-primary/5 -z-10" />
                  <div className="flex justify-center md:justify-start gap-0.5 mb-4 md:mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 ${i < currentReview.rating ? 'text-amber-500 fill-amber-500' : 'text-muted/30'}`} />
                    ))}
                  </div>
                  <p className="font-body text-base sm:text-lg md:text-3xl font-medium text-foreground leading-[1.6] md:leading-[1.5] italic tracking-tight mb-6 md:mb-8 text-pretty text-center md:text-left">
                    "{language === 'en' 
                      ? (currentReview.comment || currentReview.text) 
                      : (currentReview.textHi || currentReview.comment || currentReview.text)}"
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-muted-foreground/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
                    <span className="px-2.5 py-1 rounded-lg bg-muted border border-border/50">Google Reviews</span>
                    <span className="hidden xs:inline w-1.5 h-1.5 rounded-full bg-border" />
                    <span>Real Patient Story</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-20 -right-20 justify-between pointer-events-none">
          <button 
            onClick={prevSlide}
            className="w-16 h-16 rounded-[2rem] bg-card border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 pointer-events-auto shadow-soft active:scale-90"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button 
            onClick={nextSlide}
            className="w-16 h-16 rounded-[2rem] bg-card border border-border/50 flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-primary transition-all duration-500 pointer-events-auto shadow-soft active:scale-90"
          >
            <ChevronRight className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Pagination & Global CTA */}
      <div className="mt-12 md:mt-20 flex flex-col items-center gap-8 md:gap-12">
        <div className="flex justify-center gap-3 md:gap-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 md:h-2.5 rounded-full transition-all duration-700 ${
                index === currentIndex ? 'w-8 md:w-12 bg-primary shadow-glow-primary' : 'w-2 md:w-2.5 bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <motion.a
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            href="https://maps.app.goo.gl/uZcBgPPcEbSUrHR48?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Review Focus Ultrasound & Fetal Clinic on Google"
            className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-foreground text-background rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 shadow-elevated"
          >
            <GoogleIcon />
            {t<string>('reviews.google')}
            <ExternalLink className="w-4 h-4 opacity-50" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
