import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Phone, ArrowRight, Award, ShieldCheck, Star, Heart, Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Stats from './Stats';
import { MotionReveal } from './MotionReveal';
import BrandLogo from './BrandLogo';
import { useRef } from 'react';

const Hero = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const trustBadges = [
    { icon: Award, label: language === 'en' ? 'FMF UK Certified' : 'FMF UK प्रमाणित', color: 'bg-medical-teal/10 text-medical-teal border-medical-teal/20' },
    { icon: ShieldCheck, label: language === 'en' ? 'Barcelona Trained' : 'बार्सिलोना प्रशिक्षित', color: 'bg-medical-blue/10 text-medical-blue border-medical-blue/20' },
    { icon: Star, label: language === 'en' ? 'IRIA Member' : 'IRIA सदस्य', color: 'bg-medical-teal/10 text-medical-teal border-medical-teal/20' },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-background/30">
      {/* Background & Parallax Image */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?q=80&w=2500&auto=format&fit=crop"
          fetchPriority="high"
          alt="Joyful mother lifting her baby in a sunlit room"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Sophisticated Gradient - Reduced Opacity for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-background/20 to-transparent md:from-background/40 md:via-background/10 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-30" />
      </motion.div>

      {/* Modern Glass Background Elements */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-narrow mx-auto px-4 py-20 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-10 xl:col-span-9 flex flex-col items-center lg:items-start text-center lg:text-left">
            <MotionReveal delay={0.1} duration={0.8}>
              <BrandLogo size="lg" className="mb-6" />
            </MotionReveal>

            <MotionReveal delay={0.2} duration={0.8}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight text-slate-950">
                {language === 'en' ? (
                  <>
                    Premier <span className="text-medical-teal">Ultrasound & Fetal Medicine</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl block mt-4 font-medium text-slate-700">in Greater Noida West</span>
                  </>
                ) : (
                  <>
                    ग्रेटर नोएडा वेस्ट में <br />
                    <span className="text-medical-teal">अल्ट्रासाउंड और फीटल मेडिसिन</span> क्लीनिक
                  </>
                )}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.4} duration={0.8}>
              <p className="text-slate-700 text-lg md:text-xl font-body leading-relaxed mb-10 max-w-3xl">
                {language === 'en' 
                  ? "Experience the highest standard of fetal ultrasound and medicine in a serene, professional environment dedicated to you and your baby's well-being."
                  : "आपके और आपके बच्चे की भलाई के लिए समर्पित एक शांत, पेशेवर वातावरण में भ्रूण अल्ट्रासाउंड और चिकित्सा के उच्चतम मानक का अनुभव करें।"}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.6} duration={0.8}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                <Link
                  to="/contact"
                  className="bg-medical-teal text-white hover:bg-medical-teal/90 px-8 py-4 rounded-2xl font-semibold shadow-glow flex items-center gap-2 transform transition-transform hover:-translate-y-1"
                >
                  <Calendar className="w-5 h-5" />
                  {t('hero.book')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://wa.me/918287655133?text=Hello%2C%20I%20would%20like%20to%20book%20an%20ultrasound%20appointment."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white hover:bg-green-600 px-8 py-4 rounded-2xl font-semibold shadow-glow flex items-center gap-2 transform transition-transform hover:-translate-y-1"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .015 5.398.01 12.038c0 2.123.554 4.197 1.608 6.06L0 24l6.096-1.599a11.822 11.822 0 005.949 1.599h.005c6.636 0 12.036-5.399 12.041-12.04a11.782 11.782 0 00-3.48-8.514z"/>
                  </svg>
                  {language === 'en' ? 'Book via WhatsApp' : 'व्हाट्सएप से बुक करें'}
                </a>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.8} duration={0.8}>
              <div className="flex flex-wrap items-center gap-8 border-t border-slate-100 pt-10">
                {[
                  { value: '5000+', label: language === 'en' ? 'Happy Families' : 'खुश परिवार', icon: Heart },
                  { value: '10+', label: language === 'en' ? 'Years of Trust' : 'विश्वास के वर्ष', icon: Award },
                  { value: '4.9★', label: language === 'en' ? 'Expert Rating' : 'विशेषज्ञ रेटिंग', icon: Star },
                ].map((m) => (
                  <div key={m.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-medical-soft flex items-center justify-center">
                      <m.icon className="w-5 h-5 text-medical-teal" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-xl font-bold text-slate-950">{m.value}</span>
                      <span className="text-slate-600 text-sm font-medium">{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>

      <Stats />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-medical-teal to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
