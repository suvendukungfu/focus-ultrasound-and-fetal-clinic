import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Award } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';
import drSamar from '@/assets/dr-samar-photo.png';
import drRahul from '@/assets/dr-rahul-photo.png';

interface Doctor {
  name: string;
  nameHi: string;
  specialization: string;
  specializationHi: string;
  qualifications: string;
  timing: string;
  timingHi: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Samar Surya Nirwal',
    nameHi: 'डॉ. समर सूर्य निर्वल',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis) · Postgraduate in Fetal Medicine (University of Barcelona) · Fellow in Fetal Imaging (UK-FMF)',
    timing: 'Mon-Sat: 9:00 AM - 2:00 PM',
    timingHi: 'सोम-शनि: सुबह 9:00 - दोपहर 2:00',
    image: drSamar,
  },
  {
    name: 'Dr. Rahul Choudhary',
    nameHi: 'डॉ. राहुल चौधरी',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD (Radio Diagnosis) · Imaging in Fetal Medicine (University of Barcelona)',
    timing: 'Mon-Sat: 4:00 PM - 8:00 PM',
    timingHi: 'सोम-शनि: शाम 4:00 - रात 8:00',
    image: drRahul,
  },
];

const DoctorsSection = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative section-padding bg-background">
      <BackgroundPattern />
      <div className="relative z-10 container-narrow mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
            Expert Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t('doctors.title')}
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {doctors.map((doctor, index) => (
            <div
              key={doctor.name}
              className="card-clean card-highlight group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Doctor Image */}
              <div className="relative mb-6">
                <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border border-border">
                  <img
                    src={doctor.image}
                    alt={language === 'en' ? doctor.name : doctor.nameHi}
                    className="w-full h-full object-contain bg-muted group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-body font-medium">
                  <Award className="w-3 h-3 inline mr-1" />
                  Specialist
                </div>
              </div>

              {/* Doctor Info */}
              <div className="text-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2 glow-text">
                  {language === 'en' ? doctor.name : doctor.nameHi}
                </h3>
                <p className="text-primary font-body font-medium text-sm mb-2">
                  {language === 'en' ? doctor.specialization : doctor.specializationHi}
                </p>
                <p className="text-muted-foreground font-body text-sm mb-4">
                  {doctor.qualifications}
                </p>

                {/* Timing */}
                <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-secondary">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-body text-sm text-foreground">
                    {language === 'en' ? doctor.timing : doctor.timingHi}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
