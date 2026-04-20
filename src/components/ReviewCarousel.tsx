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
    <section className="relative w-full max-w-7xl mx-auto px-6 py-24 md:py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full -z-10" />

      <div className="flex flex-col items-center mb-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-background bg-muted overflow-hidden shadow-sm">
                <img src={`https://i.pravatar.cc/150?u=user${i + 20}`} alt="user" className="w-full h-full object-cover grayscale-[0.2]" />
              </div>
            ))}
          </div>
          <div className="text-sm font-bold text-muted-foreground flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
            <span className="text-foreground font-black">5000+</span> {t<string>('reviews.happyFamiliesCount')}
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-7xl font-display font-black text-center mb-8 tracking-tighter leading-[1.05]"
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
          className="flex items-center gap-8 px-8 py-4 bg-card shadow-elevated rounded-[2rem] border border-border/20"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shadow-sm">
              <GoogleIcon />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground leading-none mb-1">Google Trust</span>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-foreground">4.8</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-px h-10 bg-border/50" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest font-black text-muted-foreground leading-none mb-1">Clinic Status</span>
            <div className="flex items-center gap-2 text-medical-teal font-black text-sm uppercase tracking-tighter">
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
        <div className="relative overflow-hidden min-h-[500px] md:min-h-[420px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <div className="grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-center bg-card border border-border/40 p-8 md:p-16 rounded-[4rem] shadow-soft relative overflow-hidden group/card hover:shadow-elevated transition-all duration-700">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem] pointer-events-none" />
                
                {/* Progress Indicator */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted/10 overflow-hidden">
                  <motion.div 
                    key={currentIndex}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="h-full bg-primary"
                  />
                </div>

                <div className="flex flex-col items-center md:items-start text-center md:text-left relative">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-[3.5rem] bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center text-5xl md:text-6xl font-black text-white shadow-glow-primary -rotate-3 group-hover/card:rotate-0 transition-all duration-700">
                      {initials}
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-card p-3 rounded-2xl shadow-elevated border border-border/50">
                      <GoogleIcon />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl font-black text-foreground mb-1 tracking-tight">
                    {language === 'en' ? currentReview.name : (currentReview.nameHi || currentReview.name)}
                  </h3>
                  <div className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
                    <CheckCircle2 className="w-3 h-3" />
                    {t<string>('reviews.verified') || 'Verified'}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-12 -left-8 w-24 h-24 text-primary/5 -z-10" />
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < currentReview.rating ? 'text-amber-500 fill-amber-500' : 'text-muted/30'}`} />
                    ))}
                  </div>
                  <p className="font-body text-xl md:text-3xl font-medium text-foreground leading-[1.5] italic tracking-tight mb-8 text-pretty">
                    "{language === 'en' 
                      ? (currentReview.comment || currentReview.text) 
                      : (currentReview.textHi || currentReview.comment || currentReview.text)}"
                  </p>
                  <div className="flex items-center gap-4 text-muted-foreground/60 text-[10px] font-black uppercase tracking-[0.3em]">
                    <span className="px-3 py-1 rounded-lg bg-muted border border-border/50">Google Reviews</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
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
      <div className="mt-20 flex flex-col items-center gap-12">
        <div className="flex justify-center gap-4">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-700 ${
                index === currentIndex ? 'w-12 bg-primary shadow-glow-primary' : 'w-2.5 bg-primary/20 hover:bg-primary/40'
              }`}
            />
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <motion.a
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            href={import.meta.env.VITE_GOOGLE_PLACE_ID 
              ? `https://search.google.com/local/writereview?placeid=${import.meta.env.VITE_GOOGLE_PLACE_ID}` 
              : "https://www.google.com/maps/search/?api=1&query=Focus+Ultrasound+Fetal+Clinic"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-500 shadow-elevated"
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
