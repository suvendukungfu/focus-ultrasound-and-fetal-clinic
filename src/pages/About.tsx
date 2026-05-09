import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import GalleryPreview from '@/components/GalleryPreview';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Mail, GraduationCap, Stethoscope, FileText, Building2, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2, ChevronRight, UserCheck } from 'lucide-react';
import { MotionReveal } from '@/components/MotionReveal';
import { useRef } from 'react';

const drSamar = '/images/dr-samar-photo.webp';
const drRahul = '/images/dr-rahul-photo.webp';

interface Doctor {
  name: string;
  role: string;
  qualifications: string;
  bio: string[];
  expertise: string[];
  image: string;
  email: string;
}

interface CredentialDoc {
  name: string;
  degree: string;
  role: string;
  university: string;
  registration: string[];
  experience: string;
  formerly: string[];
  avatar: string;
}

const About = () => {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const doctorsData = t<Doctor[]>('about.doctors');
  const doctors: Doctor[] = (Array.isArray(doctorsData) ? doctorsData : []).map((doc, index) => ({
    ...doc,
    image: index === 0 ? drSamar : drRahul,
    email: index === 0 ? 'samarsurya777@gmail.com' : 'rahul2choudhary.48@gmail.com'
  }));

  const doc1 = t<CredentialDoc>('about.credentials.doc1');
  const doc2 = t<CredentialDoc>('about.credentials.doc2');
  
  const certificationsData: CredentialDoc[] = [
    { ...doc1, avatar: drRahul },
    { ...doc2, avatar: drSamar }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <SEO 
        title={t('about.seo.title')}
        description={t('about.seo.description')}
      />
      <Header />
      
      <main className="relative">
        {/* CINEMATIC MESH BACKGROUND & DECOR */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,hsl(var(--secondary)/0.08)_0%,transparent_50%)]" />
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-30 animate-pulse" />
          <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full opacity-30 animate-pulse-slow" />
          
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" 
               style={{ backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
        </div>

        {/* HERO SECTION - NEXT LEVEL DEPTH */}
        <section className="relative min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 md:pb-24 px-6 overflow-hidden">
          {/* Background Ambient Glow for Mobile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-primary/5 rounded-full blur-[120px] lg:hidden pointer-events-none" />

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative z-10 text-left">
              <MotionReveal delay={0.1} direction="down">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-glass mb-8">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                  </div>
                  <span className="text-primary text-[10px] font-black tracking-[0.25em] uppercase">
                    {t('about.hero.badge')}
                  </span>
                </div>
              </MotionReveal>
              
              <MotionReveal delay={0.2}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-6 md:mb-8 leading-[0.95] tracking-tight">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground/90 to-primary/50">
                    {t('clinic.name')}
                  </span>
                  <span className="block text-primary/80 italic font-medium text-lg sm:text-2xl md:text-4xl lg:text-5xl mt-2 leading-tight">
                    {t('clinic.tagline')}
                  </span>
                </h1>
              </MotionReveal>
              
              <div className="space-y-8 max-w-xl">
                <MotionReveal delay={0.3}>
                  <p className="text-lg md:text-xl text-muted-foreground/90 font-light leading-relaxed">
                    {t('about.hero.p1')}
                  </p>
                </MotionReveal>
                
                <MotionReveal delay={0.4}>
                  <div className="relative p-6 md:p-8 rounded-3xl bg-primary/5 border-l-4 border-primary/40 backdrop-blur-sm group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />
                    <p className="relative z-10 text-lg text-foreground/80 leading-relaxed italic font-serif">
                      "{t('about.hero.p2')}"
                    </p>
                  </div>
                </MotionReveal>
                
                <MotionReveal delay={0.5}>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-bold uppercase tracking-widest text-primary">
                      {t('about.hero.p3')}
                    </div>
                  </div>
                </MotionReveal>
              </div>
            </div>

            {/* Creative Hero Image/Graphic */}
            <MotionReveal delay={0.6} direction="left" className="relative hidden lg:block">
              <div className="relative aspect-square">
                {/* Floating Abstract Cards */}
                <motion.div 
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-0 right-0 w-64 h-80 rounded-[3rem] bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-3xl border border-white/20 shadow-2xl z-20 overflow-hidden group"
                >
                  <img src={drSamar} className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <p className="text-white font-bold text-xs uppercase tracking-widest mb-1">Lead Specialist</p>
                    <p className="text-white/80 text-[10px]">Dr. Samar Surya Nirwal</p>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-0 left-0 w-72 h-48 rounded-[2.5rem] bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/30 dark:border-white/10 shadow-elevated z-30 p-8 flex flex-col justify-center gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-foreground">10+</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('stats.experience')}</p>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      className="h-full bg-primary"
                    />
                  </div>
                </motion.div>

                {/* Main Graphic Circle */}
                <div className="absolute inset-10 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" />
                <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-primary/5 to-secondary/5 border border-primary/10 backdrop-blur-sm" />
              </div>
            </MotionReveal>
          </div>
        </section>

        {/* MEET OUR EXPERTS - CINEMATIC EDITORIAL */}
        <section className="relative py-20 md:py-40 px-6 overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center mb-16 md:mb-32">
              <MotionReveal direction="up" delay={0.1}>
                <span className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-8">
                  <Stethoscope className="w-4 h-4" />
                  {t('about.team.badge')}
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-foreground mb-6 md:mb-8 tracking-tighter leading-[0.95]">
                  {t('about.team.title')}
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium leading-relaxed opacity-80">
                  {t('about.team.subtitle')}
                </p>
              </MotionReveal>
            </div>

            <div className="grid gap-24 md:gap-40">
              {doctors.map((doctor, index) => (
                <MotionReveal 
                  key={doctor.name} 
                  delay={0.2} 
                  direction={index % 2 === 0 ? "right" : "left"}
                >
                  <div className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>
                    {/* Creative Doctor Image Container with Glass Depth */}
                    <div className="lg:w-1/2 relative group">
                      <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-glow">
                        <img 
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                        
                        {/* Interactive Overlay */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay" />
                      </div>
                      
                      {/* Floating Info Badge */}
                      <motion.div 
                        initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className={`absolute -bottom-8 ${index % 2 === 0 ? '-right-8' : '-left-8'} p-8 rounded-[2.5rem] glass-card z-30 min-w-[240px] hidden md:block`}
                      >
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                            <ShieldCheck className="w-7 h-7" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-foreground leading-none mb-1">{t('doctors.verifiedBadge')}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Board Certified</p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Artistic Backdrops */}
                      <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 animate-pulse" />
                      <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10 animate-pulse-slow" />
                    </div>

                    {/* Highly Refined Content Section */}
                    <div className="lg:w-1/2 space-y-12">
                      <div className="space-y-8">
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 text-primary font-black text-sm uppercase tracking-[0.3em]">
                            <span className="w-12 h-[2px] bg-primary/30" />
                            {doctor.role}
                          </div>
                          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-[0.9] group-hover:text-primary transition-colors duration-500">
                            {doctor.name}
                          </h3>
                        </div>
                        
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed italic border-l-4 border-primary/30 pl-6 md:pl-8 py-2">
                          {doctor.qualifications}
                        </p>
                      </div>

                      <div className="space-y-6 text-lg text-muted-foreground/90 font-light leading-relaxed max-w-2xl">
                        {doctor.bio.map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>

                      <div className="space-y-8">
                        <h4 className="flex items-center gap-3 text-foreground font-black uppercase tracking-[0.2em] text-[10px]">
                          <span className="w-8 h-[2px] bg-primary" />
                          {t('about.expertiseTitle')}
                        </h4>
                        <div className="flex flex-wrap gap-2 md:gap-3">
                          {doctor.expertise.map((item, i) => (
                            <motion.span 
                              key={item}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * i }}
                              className="px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl bg-card border border-border hover:border-primary/50 text-foreground text-[10px] md:text-[11px] font-bold uppercase tracking-wider shadow-sm hover:bg-primary hover:text-white transition-all duration-500 cursor-default"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-10">
                        <a
                          href={`mailto:${doctor.email}`}
                          className="group/btn relative inline-flex items-center gap-4 md:gap-5 px-6 md:px-12 py-4 md:py-6 rounded-xl md:rounded-[2.5rem] bg-foreground text-background font-black text-[10px] md:text-sm uppercase tracking-widest overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 active:scale-95"
                        >
                          <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out" />
                          <Mail className="w-4 h-4 md:w-6 md:h-6 relative z-10 group-hover/btn:rotate-12 transition-transform duration-500" />
                          <span className="relative z-10 truncate max-w-[150px] xs:max-w-none">{doctor.email}</span>
                          <ChevronRight className="w-4 h-4 md:w-6 md:h-6 relative z-10 group-hover/btn:translate-x-1 transition-transform shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>


        {/* DEGREES & CERTIFICATIONS - HIGH END CLINICAL PORTFOLIO */}
        <section className="py-24 md:py-48 px-6 relative overflow-hidden">
          {/* Section Ambient Glows */}
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[140px] rounded-full pointer-events-none" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16 md:mb-32">
              <MotionReveal direction="up">
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black tracking-[0.4em] uppercase mb-8">
                  <Award className="w-4 h-4" />
                  Professional Background
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-foreground tracking-tighter mb-6 md:mb-8 leading-[0.9] text-glow">
                  Clinical <span className="text-primary/80 italic font-medium">Credentials</span>
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
                  Documenting the academic heritage and clinical excellence of our medical leadership.
                </p>
              </MotionReveal>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              {certificationsData.map((doc, index) => (
                <MotionReveal key={index} delay={index * 0.2} direction="up">
                  <div className="group relative">
                    {/* Artistic Card Frame */}
                    <div className="relative z-10 glass-card p-6 sm:p-10 md:p-16 rounded-[2rem] sm:rounded-[4rem] border-white/20 dark:border-white/10 overflow-hidden transition-all duration-700 hover:shadow-glow hover:-translate-y-2">
                      {/* Inner Decorative Elements */}
                      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-primary/10 transition-colors duration-700" />
                      
                      <div className="relative z-10 space-y-12">
                        {/* Header: Photo + Vital Info */}
                        <div className="flex flex-col md:flex-row gap-10 items-start md:items-center pb-12 border-b border-border/50">
                          <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700">
                              <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center shadow-glow border-4 border-white dark:border-slate-900 z-20">
                              <GraduationCap className="w-8 h-8" />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h3 className="text-3xl md:text-4xl font-black text-foreground tracking-tight leading-none group-hover:text-primary transition-colors">
                              {doc.name}
                            </h3>
                            <div className="space-y-2">
                              <p className="text-xl font-bold text-primary italic leading-none">{doc.degree}</p>
                              <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">{doc.university}</p>
                            </div>
                          </div>
                        </div>

                        {/* Body: Registrations & Former Experience */}
                        <div className="grid md:grid-cols-2 gap-12">
                          <div className="space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                              <span className="w-6 h-[1px] bg-primary/40" />
                              {t('about.credentials.registrationLabel')}
                            </p>
                            <div className="space-y-4">
                              {doc.registration.map(reg => (
                                <div key={reg} className="flex items-center gap-4 group/item">
                                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover/item:bg-primary group-hover/item:text-white transition-all">
                                    <FileText className="w-5 h-5" />
                                  </div>
                                  <span className="text-sm font-bold text-foreground/80 tracking-tight">{reg}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary flex items-center gap-2">
                              <span className="w-6 h-[1px] bg-primary/40" />
                              {t('about.credentials.formerlyLabel')}
                            </p>
                            <div className="space-y-4">
                              {doc.formerly.map(hospital => (
                                <div key={hospital} className="flex items-center gap-4 group/item">
                                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20 group-hover/item:bg-secondary group-hover/item:text-white transition-all">
                                    <Building2 className="w-5 h-5" />
                                  </div>
                                  <span className="text-sm font-bold text-foreground/80 tracking-tight">{hospital}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer: Stats & Verification */}
                        <div className="pt-8 md:pt-12 border-t border-border/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-8">
                          <div className="flex items-center gap-2 md:gap-4 px-4 md:px-8 py-2.5 md:py-4 rounded-xl md:rounded-[2.5rem] bg-foreground text-background shadow-2xl scale-100 group-hover:scale-105 transition-transform duration-500 overflow-hidden relative">
                            <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                            <CheckCircle2 className="w-4 h-4 md:w-6 md:h-6 text-primary shrink-0" />
                            <span className="text-[10px] sm:text-sm md:text-xl font-black uppercase tracking-tighter">{doc.experience}</span>
                          </div>
                          
                          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{t('about.credentials.activeStatus')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aesthetic Floating Badge for each doctor */}
                    <motion.div 
                      animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className={`absolute -top-4 sm:-top-6 ${index % 2 === 0 ? '-right-2 sm:-right-6' : '-left-2 sm:-left-6'} w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full glass-card border-primary/20 flex flex-col items-center justify-center text-center z-20 shadow-glow pointer-events-none`}
                    >
                      <ShieldCheck className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-primary mb-0.5 md:mb-1" />
                      <span className="text-[6px] sm:text-[7px] md:text-[8px] font-black uppercase tracking-widest text-foreground leading-tight">Verified<br/>Expert</span>
                    </motion.div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION - CREATIVE WRAPPER */}
        <section className="py-20 md:py-40 px-6 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-24 bg-gradient-to-b from-slate-50/50 dark:from-slate-950/20 to-transparent" />
          <div id="clinic-gallery" className="max-w-7xl mx-auto px-6">
            <GalleryPreview showLink={false} />
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* SCROLL PROGRESS BAR */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
};

export default About;
