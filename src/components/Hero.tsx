import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Phone, ArrowRight, Award, ShieldCheck, Star, Heart, Activity } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Stats from './Stats';
import { MotionReveal } from './MotionReveal';
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
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 bg-medical-soft/30">
      {/* Background & Parallax Image */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 z-0">
        <img
          src="/images/hero-clinic-bg.jpg"
          alt="Focus Ultrasound and Fetal Clinic Lounge"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft Sophisticated Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 md:from-white md:via-white/90 md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
      </motion.div>

      {/* Modern Glass Background Elements */}
      <div className="absolute top-40 right-20 w-96 h-96 bg-medical-teal/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-20 w-80 h-80 bg-medical-blue/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container-narrow mx-auto px-4 py-20 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Column */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.2} duration={0.8}>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-slate-900 leading-[1.05] mb-8">
                {language === 'en' ? (
                  <>
                    Cherish Your <br />
                    <span className="text-medical-teal">Fetal Journey</span>
                  </>
                ) : (
                  <>
                    अपनी <span className="text-medical-teal">भ्रूण यात्रा</span> <br /> को संजोएं
                  </>
                )}
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.4} duration={0.8}>
              <p className="text-slate-600 text-lg md:text-xl font-body leading-relaxed mb-10 max-w-xl">
                {language === 'en' 
                  ? "Experience the highest standard of fetal ultrasound and medicine in a serene, professional environment dedicated to you and your baby's well-being."
                  : "आपके और आपके बच्चे की भलाई के लिए समर्पित एक शांत, पेशेवर वातावरण में भ्रूण अल्ट्रासाउंड और चिकित्सा के उच्चतम मानक का अनुभव करें।"}
              </p>
            </MotionReveal>

            <MotionReveal delay={0.6} duration={0.8}>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  to="/contact"
                  className="bg-medical-teal text-white hover:bg-medical-teal/90 px-8 py-4 rounded-2xl font-semibold shadow-glow flex items-center gap-2 transform transition-transform hover:-translate-y-1"
                >
                  <Calendar className="w-5 h-5" />
                  {t('hero.book')}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+919870475400"
                  className="bg-white text-slate-900 hover:bg-slate-50 border border-slate-200 px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 shadow-soft transform transition-transform hover:-translate-y-1"
                >
                  <Phone className="w-5 h-5 text-medical-blue" />
                  {t('hero.call')}
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
                      <span className="font-display text-xl font-bold text-slate-900">{m.value}</span>
                      <span className="text-slate-500 text-sm font-medium">{m.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </MotionReveal>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5 relative hidden lg:block h-full min-h-[500px]">
            <MotionReveal direction="left" delay={0.4} className="absolute inset-0">
               <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-0 max-w-[280px] bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-elevated border border-white/50"
               >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-medical-teal/10 flex items-center justify-center">
                      <Activity className="w-6 h-6 text-medical-teal" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 leading-tight">Advanced Scanning</h4>
                      <p className="text-xs text-slate-500">Elite Diagnostic Care</p>
                    </div>
                  </div>
                  <img src="/images/ultrasound-machine.jpg" alt="Advanced Ultrasound System" className="rounded-2xl mb-4 w-full aspect-video object-cover" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-medical-blue bg-medical-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">Premium Tech</span>
                    <span className="text-xs font-semibold text-slate-400 italic">GE Voluson E10</span>
                  </div>
               </motion.div>
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
