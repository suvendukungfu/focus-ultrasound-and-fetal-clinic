import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Mail, GraduationCap } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';
import { motion } from 'framer-motion';

const doctors = [
  {
    name: 'Dr. Samar Surya Nirwal',
    nameHi: 'डॉ. समर सूर्य निर्वल',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis) · Postgraduate in Fetal Medicine (University of Barcelona) · Fellow in Fetal Imaging (UK-FMF)',
    email: 'samarsurya777@gmail.com',
    image: '/images/dr-samar-portrait.webp',
  },
  {
    name: 'Dr. Rahul Choudhary',
    nameHi: 'डॉ. राहुल चौधरी',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD (Radio Diagnosis) · Imaging in Fetal Medicine (University of Barcelona)',
    email: 'rahul2choudhary.48@gmail.com',
    image: '/images/dr-rahul-icon.webp',
  },
];

const DoctorsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative section-padding bg-medical-soft/20" id="doctors">
      <BackgroundPattern />
      <div className="relative z-10 container-narrow mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-medical-teal/10 border border-medical-teal/20 text-medical-teal text-sm font-body font-semibold tracking-wide uppercase mb-4 shadow-sm">
            Expert Team
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            {t('doctors.title')}
          </h2>
          <p className="text-slate-600 font-body text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Doctors Alternating Layout */}
        <div className="flex flex-col gap-12 md:gap-20 max-w-6xl mx-auto">
          {doctors.map((doctor, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={doctor.name}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`glass-effect relative overflow-hidden rounded-[2rem] shadow-xl p-8 md:p-12 border border-white/60 flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-16 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white/60 backdrop-blur-xl group`}
              >
                {/* Soft ambient background blob */}
                <div className={`absolute top-0 ${isEven ? 'right-0' : 'left-0'} w-64 h-64 bg-gradient-to-br from-medical-teal/10 to-medical-blue/10 blur-[80px] rounded-full pointer-events-none`} />

                {/* Portrait Column */}
                <div className="w-full md:w-2/5 flex justify-center relative z-10">
                  <div className="relative w-56 h-64 md:w-72 md:h-80 rounded-[2rem] overflow-hidden border border-white shadow-elevated bg-white p-2 transition-transform duration-700 group-hover:rotate-2">
                    <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100">
                      <img
                        src={doctor.image}
                        alt={language === 'en' ? doctor.name : doctor.nameHi}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Specialist Badge */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full bg-medical-teal text-white text-xs font-display font-bold shadow-glow flex items-center gap-2 whitespace-nowrap z-20">
                      <Award className="w-4 h-4" />
                      Specialist
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`w-full md:w-3/5 flex flex-col relative z-10 ${isEven ? 'text-left' : 'text-left md:text-right'} items-start ${isEven ? '' : 'md:items-end'}`}>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                    {language === 'en' ? doctor.name : doctor.nameHi}
                  </h3>
                  <p className="text-medical-teal font-body font-semibold text-lg md:text-xl mb-6 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    {language === 'en' ? doctor.specialization : doctor.specializationHi}
                  </p>
                  <p className={`text-slate-600 font-body text-base md:text-lg mb-8 leading-relaxed max-w-xl ${isEven ? '' : 'md:mr-0 md:ml-auto'}`}>
                    {doctor.qualifications}
                  </p>
                  
                  <a
                    href={`mailto:${doctor.email}`}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-slate-700 border border-slate-200 hover:border-medical-blue hover:text-medical-blue hover:shadow-soft transition-all duration-300 font-body font-semibold text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {doctor.email}
                  </a>
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
