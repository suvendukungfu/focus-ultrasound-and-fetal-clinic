import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Star, ExternalLink, Quote, CheckCircle2, MessageSquare, Heart, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewCarousel from '@/components/ReviewCarousel';
import SEO from '@/components/SEO';
import { useTestimonials, Testimonial, STATIC_REVIEWS } from '@/hooks/useTestimonials';
import { useCreateReview } from '@/hooks/useCreateReview';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

const FEATURED_IMAGE = '/images/patient-story-2.webp';
const FALLBACK_IMAGE = '/placeholder.svg';

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
  </svg>
);

const Reviews = () => {
  const { t, language } = useLanguage();
  const [imgError, setImgError] = useState(false);
  const { testimonials, loading, error } = useTestimonials();
  const { createReview, loading: isSubmitting } = useCreateReview();
  const { toast } = useToast();

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({
        name: reviewFormData.name,
        rating: reviewFormData.rating,
        comment: reviewFormData.comment,
        source: 'manual',
      });
      setShowSuccessModal(true);
      setShowReviewForm(false);
      setReviewFormData({ name: '', rating: 5, comment: '' });
      toast({ title: t('reviews.successTitle') || "Review Submitted", description: t('reviews.successDesc') || "Thank you for your valuable feedback." });
    } catch (err) {
      toast({ variant: "destructive", title: "Submission Failed", description: err instanceof Error ? err.message : "An error occurred" });
    }
  };

  const displayReviews = error ? STATIC_REVIEWS : testimonials;

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('reviews.seo.title')}
        description={t('reviews.seo.description')}
      />
      <Header />
      <main className="pt-20">
        {/* Cinematic Header Section */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-36 overflow-hidden">
          <BackgroundPattern />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                  <Star className="w-4 h-4 fill-primary" />
                  {t('reviews.badge')}
                </div>
                <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
                  {language === 'en' ? (
                    <>Stories That <span className="text-primary italic">Inspire</span> Confidence</>
                  ) : (
                    <>कहानियां जो <span className="text-primary italic">आत्मविश्वास</span> जगाती हैं</>
                  )}
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
                  {t<string>('reviews.subtitle')}
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <motion.a
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://maps.app.goo.gl/uZcBgPPcEbSUrHR48?g_st=iw"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Review Focus Ultrasound & Fetal Clinic on Google"
                    className="inline-flex items-center gap-3 h-16 px-10 bg-foreground text-background rounded-2xl font-bold text-sm hover:bg-primary transition-all duration-500 shadow-xl shadow-primary/10"
                  >
                    <GoogleIcon />
                    {t<string>('reviews.google')}
                    <ExternalLink className="w-4 h-4 opacity-50" />
                  </motion.a>
                  
                  <div className="flex items-center gap-6 px-8 py-4 rounded-2xl bg-card border border-primary/10 shadow-lg">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                          <img src={`https://i.pravatar.cc/100?u=u${i}`} alt="user" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col items-start">
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">4.9/5 Google Rating</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Testimonials Carousel */}
        {!loading && displayReviews.length > 0 && (
          <section className="relative -mt-20 z-20">
            <ReviewCarousel reviews={displayReviews.slice(0, 5)} />
          </section>
        )}

        {/* Cinematic Featured Story Banner */}
        <section className="py-24 md:py-40 px-6 relative overflow-hidden bg-secondary/5">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] -z-10" />
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[4rem] overflow-hidden bg-slate-950 dark:bg-slate-900/90 shadow-2xl p-10 md:p-24 border border-white/5"
            >
              <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary to-transparent" />
                <BackgroundPattern />
              </div>
              
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-7">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    {t<string>('reviews.featured.badge')}
                  </div>
                  <h2 className="text-3xl md:text-7xl font-display font-black text-white mb-10 leading-[1.05] tracking-tighter">
                    {t<string>('reviews.featured.quote')}
                  </h2>
                  <p className="text-white/80 text-xl md:text-2xl leading-relaxed font-body italic mb-12 text-pretty">
                    "{t<string>('reviews.featured.comment')}"
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-glow">
                      <Quote className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="font-display text-2xl font-black text-white tracking-tight">{t<string>('reviews.featured.name')}</p>
                      <p className="text-primary font-black text-[10px] uppercase tracking-widest">{t<string>('reviews.featured.sub')}</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 relative">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[3.5rem] overflow-hidden border-8 border-white/10 shadow-glow relative bg-black/20"
                  >
                    <img 
                      src={FEATURED_IMAGE} 
                      alt="Happy Patient" 
                      className="w-full h-auto object-contain grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent flex items-end p-10">
                      <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-primary/20 backdrop-blur-md border border-white/20">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Verified Care Experience</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Reviews Feed */}
        <section className="section-padding relative">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-8 bg-primary rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">{t('reviews.realPatients')}</span>
                </div>
                <h2 className="text-3xl md:text-6xl font-display font-black text-foreground tracking-tighter leading-none">
                  {t<string>('reviews.allStories')}
                </h2>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-medical-teal/5 border border-medical-teal/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-medical-teal animate-pulse" />
                  <span className="text-xs font-bold text-medical-teal uppercase tracking-widest">{t('reviews.liveFeed')}</span>
                </div>
                <Button 
                  onClick={() => setShowReviewForm(true)}
                  className="h-14 px-8 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-xl shadow-primary/10 group"
                >
                  {language === 'en' ? 'Share Your Story' : 'अपनी कहानी साझा करें'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-80 rounded-[3rem] bg-muted animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
                {displayReviews.length > 0 ? (
                  displayReviews.map((review: Testimonial, index: number) => (
                    <motion.div
                      key={review.id || index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.1 }}
                      className="break-inside-avoid group relative bg-card rounded-[2.5rem] border border-primary/5 p-8 md:p-10 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_50px_rgba(26,43,76,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Hover Quote Accent */}
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all duration-700" />
                      
                      <div className="flex gap-1 mb-8">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-muted/20'}`} 
                          />
                        ))}
                      </div>

                      <p className="text-foreground/80 font-body text-lg mb-10 leading-relaxed italic relative z-10">
                        "{language === 'en' 
                          ? (review.comment || review.text) 
                          : (review.textHi || review.comment || review.text)}"
                      </p>

                      <div className="mt-auto pt-8 border-t border-border/40 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary font-black text-lg border border-primary/10 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            {(review.name || 'P').charAt(0)}
                          </div>
                          <div>
                            <span className="font-display font-black text-foreground text-base block leading-none mb-1.5">
                              {language === 'en' ? review.name : (review.nameHi || review.name)}
                            </span>
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-medical-teal" />
                              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                                {t<string>('reviews.verified')}
                              </span>
                            </div>
                          </div>
                        </div>

                        {review.source === 'google' && (
                          <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <GoogleIcon />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-32 bg-card rounded-[4rem] border border-border shadow-soft relative overflow-hidden">
                    <BackgroundPattern />
                    <Star className="w-20 h-20 text-primary/20 mx-auto mb-8 animate-pulse" />
                    <h3 className="font-display text-3xl font-black text-foreground mb-4 tracking-tight">{t<string>('reviews.noReviews')}</h3>
                    <p className="text-muted-foreground text-lg mb-10 max-w-sm mx-auto">
                      {t<string>('reviews.firstReview')}
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/uZcBgPPcEbSUrHR48?g_st=iw"
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label="Review Focus Ultrasound & Fetal Clinic on Google"
                      className="inline-flex items-center justify-center gap-4 h-16 px-10 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500"
                    >
                      <GoogleIcon />
                      {t('reviews.google')}
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Global CTA Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-glow-primary"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <h2 className="text-3xl md:text-6xl font-display font-black mb-6 tracking-tighter leading-tight">
                {t('reviews.cta.title')}
              </h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                {t('reviews.cta.p')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href="https://maps.app.goo.gl/uZcBgPPcEbSUrHR48?g_st=iw"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Review Focus Ultrasound & Fetal Clinic on Google"
                  className="inline-flex items-center justify-center gap-4 h-16 px-10 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-foreground hover:text-white transition-all duration-500 shadow-xl"
                >
                  <GoogleIcon />
                  {t<string>('reviews.google')}
                </a>
                <Button 
                  onClick={() => setShowReviewForm(true)}
                  className="h-16 px-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-black text-xs uppercase tracking-widest hover:bg-white hover:text-primary transition-all duration-500"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  {language === 'en' ? 'Submit Your Feedback' : 'अपनी प्रतिक्रिया भेजें'}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Review Submission Form Modal */}
        <AnimatePresence>
          {showReviewForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-foreground/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="bg-card w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden relative"
              >
                <div className="p-8 md:p-16">
                  <button 
                    onClick={() => setShowReviewForm(false)}
                    className="absolute top-8 right-8 p-3 rounded-2xl bg-secondary/10 text-foreground hover:bg-primary hover:text-white transition-all duration-500 group"
                  >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                  </button>
                  
                  <div className="mb-12">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <Star className="w-8 h-8 fill-primary" />
                    </div>
                    <h2 className="text-4xl font-display font-black text-foreground mb-4 tracking-tighter">
                      {language === 'en' ? 'Share Your Journey' : 'अपना अनुभव साझा करें'}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      {language === 'en' ? 'Your words help future parents find the care they need.' : 'आपकी बातें भावी माता-पिता को सही देखभाल खोजने में मदद करती हैं।'}
                    </p>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('contact.name')}</label>
                      <Input 
                        required
                        value={reviewFormData.name}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })}
                        placeholder={t('contact.namePlaceholder')}
                        className="h-16 rounded-2xl border-border/50 focus:border-primary transition-all text-lg font-medium px-6"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{language === 'en' ? 'Your Rating' : 'आपकी रेटिंग'}</label>
                      <div className="flex gap-4 p-4 rounded-2xl bg-secondary/5 border border-border/40 w-fit">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewFormData({ ...reviewFormData, rating: star })}
                            className="transition-transform hover:scale-125"
                          >
                            <Star className={`w-10 h-10 ${reviewFormData.rating >= star ? 'fill-amber-500 text-amber-500' : 'text-muted/20'}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1">{t('contact.message')}</label>
                      <textarea
                        required
                        value={reviewFormData.comment}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })}
                        rows={5}
                        placeholder={language === 'en' ? "Describe your experience at Focus Ultrasound..." : "फोकस अल्ट्रासाउंड में अपने अनुभव का वर्णन करें..."}
                        className="w-full px-6 py-6 rounded-3xl bg-background border border-border/50 focus:border-primary transition-all min-h-[150px] font-body text-lg text-foreground"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full h-20 rounded-3xl text-xl font-black btn-premium shadow-glow group"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <>
                          {language === 'en' ? 'Publish Story' : 'कहानी प्रकाशित करें'}
                          <CheckCircle2 className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-foreground/80 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-card w-full max-w-md rounded-[4rem] shadow-2xl border border-border overflow-hidden text-center p-12 md:p-16"
              >
                <div className="w-24 h-24 rounded-[2.5rem] bg-medical-teal/10 flex items-center justify-center text-medical-teal mx-auto mb-10 shadow-sm">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-display font-black text-foreground mb-4 tracking-tighter">
                  {language === 'en' ? 'Heartfelt Thanks!' : 'हार्दिक धन्यवाद!'}
                </h3>
                <p className="text-muted-foreground text-lg mb-12">
                  {language === 'en' 
                    ? 'Your story is being processed and will inspire many others soon.' 
                    : 'आपकी कहानी पर कार्यवाही की जा रही है और जल्द ही कई अन्य लोगों को प्रेरित करेगी।'}
                </p>
                <Button 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full h-16 rounded-2xl font-black text-xs uppercase tracking-widest btn-primary shadow-glow"
                >
                  {t('common.close') || 'Done'}
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
