import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { Testimonial } from '@/hooks/useTestimonials';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReviewCarouselProps {
  reviews: Testimonial[];
}

const ReviewCarousel: React.FC<ReviewCarouselProps> = ({ reviews }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (reviews.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  if (reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12 overflow-hidden">
      {/* Trust Badge */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/20 rounded-full shadow-sm animate-fade-in">
          <ShieldCheck className="w-5 h-5 text-primary" />
          <span className="text-sm font-display font-semibold text-primary uppercase tracking-wider">
            {language === 'en' ? 'Verified Patients' : 'सत्यापित मरीज'}
          </span>
        </div>
      </div>

      <div className="relative h-[300px] md:h-[250px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-full"
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-10 shadow-elevated text-center">
              <Quote className="w-10 h-10 text-primary/10 mx-auto mb-6" />
              
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < currentReview.rating ? 'text-highlight fill-highlight' : 'text-muted'}`} 
                  />
                ))}
              </div>

              <p className="text-lg md:text-xl font-body italic text-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                "{language === 'en' 
                  ? (currentReview.comment || currentReview.text) 
                  : (currentReview.textHi || currentReview.comment || currentReview.text)}"
              </p>

              <div className="flex flex-col items-center">
                <span className="font-display font-bold text-lg text-primary">
                  {language === 'en' ? currentReview.name : (currentReview.nameHi || currentReview.name)}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  {currentReview.source === 'google' ? 'Google Review' : 'Verified Review'}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/20'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCarousel;
