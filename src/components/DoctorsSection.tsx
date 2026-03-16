import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Mail, GraduationCap, Microscope } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';

const doctors = [
  {
    name: 'Dr. Samar Surya Nirwal',
    nameHi: 'डॉ. समर सूर्य निर्वल',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis) · Postgraduate in Fetal Medicine (University of Barcelona) · Fellow in Fetal Imaging (UK-FMF)',
    email: 'samarsurya777@gmail.com',
    image: '/images/dr-samar-portrait.png',
    credentials: '/images/dr-samar-credentials.png',
  },
  {
    name: 'Dr. Rahul Choudhary',
    nameHi: 'डॉ. राहुल चौधरी',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD (Radio Diagnosis) · Imaging in Fetal Medicine (University of Barcelona)',
    email: 'rahul2choudhary.48@gmail.com',
    image: '/images/dr-rahul-icon.png',
    credentials: '/images/dr-rahul-credentials.png',
  },
];

const DoctorsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative section-padding bg-background" id="doctors">
      <BackgroundPattern />
      <div className="relative z-10 container-narrow mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
            Expert Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('doctors.title')}
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className="card-clean card-highlight group flex flex-col items-center text-center h-full p-6 md:p-8"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Portrait Selection */}
              <div className="relative mb-8 pt-4">
                <div className="relative w-36 h-40 md:w-44 md:h-48 rounded-[2rem] overflow-hidden border border-primary/10 shadow-medium bg-muted/20 p-1.5 transition-all duration-500 group-hover:shadow-elevated group-hover:border-primary/30 group-hover:-translate-y-1">
                  <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-white shadow-inner">
                    <img
                      src={doctor.image}
                      alt={language === 'en' ? doctor.name : doctor.nameHi}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
                {/* Specialist Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-display font-semibold shadow-glow flex items-center gap-1.5 whitespace-nowrap z-20 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-3.5 h-3.5" />
                  Specialist
                </div>
              </div>

              {/* Identity & Contact */}
              <div className="flex flex-col items-center mb-6">
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {language === 'en' ? doctor.name : doctor.nameHi}
                </h3>
                <p className="text-primary font-body font-medium text-sm mb-4">
                  {language === 'en' ? doctor.specialization : doctor.specializationHi}
                </p>
                <a
                  href={`mailto:${doctor.email}`}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 font-body text-xs mb-4"
                >
                  <Mail className="w-3 h-3" strokeWidth={1.5} />
                  {doctor.email}
                </a>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
