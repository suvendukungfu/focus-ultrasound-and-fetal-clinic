import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Clock, Award } from 'lucide-react';
import drSamar from '@/assets/dr-samar-photo.png';
import drRahul from '@/assets/dr-rahul-photo.png';
import drSamarDegree from '@/assets/dr-samar-cert.png';
import drRahulDegree from '@/assets/dr-rahul-cert.png';
import clinicExterior from '@/assets/clinic-exterior.jpg';
import clinicEntry from '@/assets/clinic-entry.png';
import clinicWaiting from '@/assets/clinic-waiting.jpg';
import clinicSamsung from '@/assets/clinic-samsung.jpg';

interface Doctor {
  name: string;
  nameHi: string;
  specialization: string;
  specializationHi: string;
  qualifications: string;
  timing: string;
  timingHi: string;
  image: string;
  degreeImage: string;
  experience: string;
  bio: string;
  bioHi: string;
  formerly: string[];
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Samar Surya Nirwal',
    nameHi: 'डॉ. समर सूर्य निर्वल',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis)',
    timing: 'Mon-Sat: 9:00 AM - 2:00 PM',
    timingHi: 'सोम-शनि: सुबह 9:00 - दोपहर 2:00',
    image: drSamar,
    degreeImage: drSamarDegree,
    experience: '10+ years',
    bio: 'Dr. Samar Surya Nirwal is a Consultant Radiologist specializing in Fetal Medicine with postgraduate training from the University of Barcelona and Fellowship in Fetal Imaging (UK-FMF).',
    bioHi: 'डॉ. समर सूर्य निर्वल बार्सिलोना विश्वविद्यालय से स्नातकोत्तर प्रशिक्षण और फीटल इमेजिंग (UK-FMF) में फेलोशिप के साथ फीटल मेडिसिन में विशेषज्ञता रखने वाले सलाहकार रेडियोलॉजिस्ट हैं।',
    formerly: ['King George\'s Medical University, Lucknow', 'Safdarjung Hospital, New Delhi'],
  },
  {
    name: 'Dr. Rahul Choudhary',
    nameHi: 'डॉ. राहुल चौधरी',
    specialization: 'Consultant Radiologist & Fetal Medicine',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    qualifications: 'MBBS, MD (Radio Diagnosis)',
    timing: 'Mon-Sat: 4:00 PM - 8:00 PM',
    timingHi: 'सोम-शनि: शाम 4:00 - रात 8:00',
    image: drRahul,
    degreeImage: drRahulDegree,
    experience: '10+ years',
    bio: 'Dr. Rahul Choudhary is a Consultant Radiologist with expertise in Imaging in Fetal Medicine from the University of Barcelona, bringing extensive experience in diagnostic radiology.',
    bioHi: 'डॉ. राहुल चौधरी बार्सिलोना विश्वविद्यालय से फीटल मेडिसिन इमेजिंग में विशेषज्ञता रखने वाले सलाहकार रेडियोलॉजिस्ट हैं।',
    formerly: ['Safdarjung Hospital, New Delhi', 'AIMS, Patna'],
  },
];

const AboutContent = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative section-padding">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('doctors.title')}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('doctors.subtitle')}
            </p>
          </div>
        </section>

        {/* Meet Our Experts */}
        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
                {language === 'en' ? 'Expert Team' : 'विशेषज्ञ टीम'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {language === 'en' ? 'Meet Our Experts' : 'हमारे विशेषज्ञों से मिलें'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.name}
                  className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Doctor Photo */}
                    <div className="sm:w-48 bg-muted flex-shrink-0 flex items-center justify-center p-4">
                      <img
                        src={doctor.image}
                        alt={language === 'en' ? doctor.name : doctor.nameHi}
                        className="w-full h-auto max-h-[240px] object-contain"
                      />
                    </div>
                    {/* Doctor Info */}
                    <div className="flex-1 p-5 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {language === 'en' ? doctor.name : doctor.nameHi}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body w-fit mb-2">
                        <Award className="w-3 h-3" />
                        {doctor.experience}
                      </span>
                      <p className="text-primary font-body font-medium text-sm mb-1">
                        {language === 'en' ? doctor.specialization : doctor.specializationHi}
                      </p>
                      <p className="text-muted-foreground font-body text-xs mb-2">
                        {doctor.qualifications}
                      </p>
                      <p className="text-foreground/70 font-body text-xs leading-relaxed mb-3">
                        {language === 'en' ? doctor.bio : doctor.bioHi}
                      </p>
                      <p className="text-muted-foreground font-body text-xs mb-3">
                        <span className="font-medium text-foreground/60">Formerly at:</span>{' '}
                        {doctor.formerly.join(' · ')}
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary w-fit">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span className="font-body text-xs text-foreground">
                          {language === 'en' ? doctor.timing : doctor.timingHi}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Degrees & Certifications */}
        <section className="section-padding bg-secondary/30">
          <div className="container-narrow mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              {language === 'en' ? 'Degrees & Certifications' : 'डिग्री और प्रमाणपत्र'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {doctors.map((doctor) => (
                <div key={doctor.name + '-degree'} className="card-clean card-highlight">
                  <p className="font-body text-sm font-medium text-foreground mb-4 text-center">
                    {language === 'en' ? doctor.name : doctor.nameHi}
                  </p>
                  <div className="rounded-xl overflow-hidden border border-border">
                    <img
                      src={doctor.degreeImage}
                      alt={`${doctor.name} - Degree Certificate`}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Facilities & Technology */}
        <section className="section-padding bg-primary/5">
          <div className="container-narrow mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mb-10">
              {language === 'en' ? 'Advanced Facilities & Technology' : 'उन्नत सुविधाएं और प्रौद्योगिकी'}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-border shadow-card">
                <img
                  src={clinicSamsung}
                  alt="Samsung V7 Ultrasound System"
                  className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {language === 'en' ? 'Samsung V7 Ultrasound System' : 'Samsung V7 अल्ट्रासाउंड सिस्टम'}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {language === 'en'
                    ? 'State-of-the-art Samsung V7 ultrasound technology for crystal-clear imaging. Featuring advanced 3D/4D capabilities for fetal imaging, color doppler, and precision diagnostics with unmatched accuracy.'
                    : 'क्रिस्टल-क्लियर इमेजिंग के लिए अत्याधुनिक Samsung V7 अल्ट्रासाउंड तकनीक। फीटल इमेजिंग, कलर डॉप्लर और सटीक निदान के लिए उन्नत 3D/4D क्षमताओं से सुसज्जित।'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Clinic */}
        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
                {language === 'en' ? 'Visit Us' : 'हमसे मिलें'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {language === 'en' ? 'Our Clinic' : 'हमारा क्लिनिक'}
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { src: clinicExterior, label: language === 'en' ? 'Clinic Exterior' : 'क्लिनिक बाहरी' },
                { src: clinicEntry, label: language === 'en' ? 'Clinic Entry' : 'क्लिनिक प्रवेश' },
                { src: clinicWaiting, label: language === 'en' ? 'Waiting Area' : 'प्रतीक्षा क्षेत्र' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="overflow-hidden bg-muted flex items-center justify-center p-3">
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-auto max-h-[220px] object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-display text-sm font-medium text-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const About = () => {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  );
};

export default About;
