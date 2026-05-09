import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Mail, GraduationCap, MapPin, Phone, CheckCircle2 } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';
import { motion } from 'framer-motion';

const doctors = [
  {
    id: 'drSamar',
    email: 'samarsurya777@gmail.com',
    image: '/images/dr-samar-portrait.webp',
  },
  {
    id: 'drRahul',
    email: 'rahul2choudhary.48@gmail.com',
    image: '/images/dr-rahul-photo.webp',
  },
];

const DoctorsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-background" id="doctors">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[5%] -left-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>
      
      <BackgroundPattern opacity={0.3} />
      
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-5 sm:px-8">
        {/* Header Section */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="px-5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
              {t<string>('doctors.badge')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tight">
              {t<string>('doctors.title')}
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />
            <p className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              {t<string>('doctors.subtitle')}
            </p>
          </motion.div>
        </div>

        {/* Doctors Layout */}
        <div className="space-y-12 md:space-y-24 max-w-6xl mx-auto">
          {doctors.map((doctor, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`group relative`}
              >
                {/* Decorative glow behind card */}
                <div className={`absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10`} />
                
                <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-20 bg-card/40 backdrop-blur-sm border border-border/50 p-5 sm:p-8 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] md:rounded-[2.5rem] shadow-soft hover:shadow-elevated transition-all duration-500`}>
                  
                  {/* Portrait Container */}
                  <div className="w-full lg:w-1/3 flex justify-center">
                    <div className="relative">
                      {/* Photo Frame */}
                      <div className="relative w-48 h-64 xs:w-56 xs:h-72 sm:w-64 sm:h-80 md:w-80 md:h-[26rem] rounded-2xl sm:rounded-3xl md:rounded-[2rem] overflow-hidden border-4 md:border-8 border-card shadow-2xl transition-transform duration-700 group-hover:scale-[1.02] group-hover:-rotate-1">
                        <img
                          src={doctor.image}
                          alt={t<string>(`doctors.${doctor.id}.name`)}
                          className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                      </div>

                      {/* Floating Badge */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 0 }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-display font-bold text-xs md:text-sm shadow-glow flex items-center gap-2 whitespace-nowrap z-20 border border-white/20"
                      >
                        <Award className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {t<string>('doctors.specialist')}
                      </motion.div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="w-full lg:w-2/3 flex flex-col text-center lg:text-left">
                    <div className="mb-6">
                      <h3 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
                        {t<string>(`doctors.${doctor.id}.name`)}
                      </h3>
                      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-secondary/10 text-secondary font-body font-bold text-sm md:text-lg mb-4 md:mb-6 border border-secondary/20">
                        <GraduationCap className="w-4 h-4 md:w-5 md:h-5" />
                        {t<string>(`doctors.${doctor.id}.specialization`)}
                      </div>
                    </div>

                    <div className="space-y-6 mb-8 md:mb-10">
                      <p className="text-muted-foreground font-body text-sm md:text-lg leading-relaxed border-l-4 border-primary/30 pl-4 md:pl-6 italic text-left">
                          {t<string>(`doctors.${doctor.id}.qualifications`)}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-auto">
                      <a
                        href={`mailto:${doctor.email}`}
                        className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-xl md:rounded-2xl bg-foreground text-background font-bold text-sm hover:scale-105 transition-all shadow-lg hover:shadow-foreground/20"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="truncate max-w-[180px] xs:max-w-none">{doctor.email}</span>
                      </a>
                      
                      <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl md:rounded-2xl bg-card border border-border text-muted-foreground font-body text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {t<string>('doctors.verifiedBadge')}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


export default DoctorsSection;
