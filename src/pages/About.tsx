import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import GalleryPreview from '@/components/GalleryPreview';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import SEO from '@/components/SEO';
import { Award, Mail, GraduationCap, Stethoscope, FileText, Building2 } from 'lucide-react';

const drSamar = '/images/dr-samar-photo.webp';
const drRahul = '/images/dr-rahul-photo.webp';
const clinicSamsung = '/images/clinic-samsung-v7.webp';

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
  const { t } = useLanguage();

  // Map images and static data to translated doctor info
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
    <div className="min-h-screen bg-background">
      <SEO 
        title={t('about.seo.title')}
        description={t('about.seo.description')}
      />
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 px-4">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              {t('about.hero.badge')}
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('about.hero.title')}
            </h1>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('about.hero.p1')}
            </p>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {t('about.hero.p2')}
            </p>
            <p className="text-primary/80 font-body text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-4 font-medium animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {t('about.hero.p3')}
            </p>
          </div>
        </section>

        {/* Meet Our Experts */}
        <section className="py-10 md:py-14 px-4 bg-secondary/20">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
                <Stethoscope className="w-4 h-4 inline mr-1" />
                {t('about.team.badge')}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t('about.team.title')}
              </h2>
              <p className="text-muted-foreground font-body text-base mt-2 max-w-xl mx-auto">
                {t('about.team.subtitle')}
              </p>
            </div>

            <div className="space-y-10 max-w-5xl mx-auto">
              {doctors.map((doctor, index) => (
                <div
                  key={doctor.name}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Doctor Photo */}
                    <div className="md:w-64 flex-shrink-0 bg-muted/20 flex items-center justify-center p-6 transition-all duration-500">
                      <div className="w-44 h-44 md:w-52 md:h-52 rounded-[2rem] overflow-hidden border border-primary/10 shadow-medium bg-card p-1.5 transition-all duration-500">
                        <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-muted/10 shadow-inner">
                          <img loading="lazy"
                            src={doctor.image}
                            alt={doctor.name}
                            className="w-full h-full object-contain transition-transform duration-700 ease-out hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                          {doctor.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                          <Award className="w-3 h-3" />
                          {t('doctors.specialist')}
                        </span>
                      </div>

                      <p className="text-primary font-body font-semibold text-sm mb-1">
                        {doctor.role}
                      </p>
                      <p className="text-muted-foreground font-body text-sm mb-4">
                        {doctor.qualifications}
                      </p>

                      {/* Bio */}
                      <div className="text-foreground/80 font-body text-sm leading-relaxed mb-5 space-y-2">
                        {doctor.bio.map((para: string, i: number) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>

                      {/* Areas of Expertise */}
                      <div className="mb-6">
                        <h4 className="font-display text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          {t('about.expertiseTitle')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.map((item: string) => (
                            <span key={item} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-body">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={`mailto:${doctor.email}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted transition-colors"
                        >
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="font-body text-sm text-foreground">{doctor.email}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Degrees & Certifications */}
        <section className="py-24 px-4 bg-secondary/5 relative overflow-hidden" id="certifications">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/10 blur-[120px] rounded-[100%] pointer-events-none" />

          <div className="container mx-auto max-w-[1100px] relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold uppercase tracking-widest mb-4">
                {t('about.credentials.badge')}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
                {t('about.credentials.title')}
              </h2>
              <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {certificationsData.map((doc, index) => (
                <div 
                  key={index}
                  className="group relative flex flex-col p-8 md:p-10 rounded-[2rem] bg-card backdrop-blur-xl border border-border hover:border-primary/30 hover:bg-card/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-elevated shadow-soft animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-full bg-muted border-2 border-border p-1 flex-shrink-0 relative overflow-hidden group-hover:border-primary/50 transition-colors duration-500">
                        <img loading="lazy" src={doc.avatar} alt={doc.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground mb-1.5">{doc.name}</h3>
                        <p className="text-primary font-display font-semibold text-sm tracking-wide">
                          {doc.degree}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-foreground/90 font-medium text-lg leading-snug mb-1">
                      {doc.role}
                    </p>
                    <p className="text-muted-foreground font-body text-sm italic">
                      {doc.university}
                    </p>
                  </div>

                  <div className="w-full h-px bg-border mb-8" />

                  <div className="space-y-6 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-[1rem] bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground transition-colors duration-300">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-foreground/80 font-display font-semibold text-sm mb-1 uppercase tracking-wider">{t('about.credentials.registrationLabel')}</h4>
                        {doc.registration.map(reg => (
                          <div key={reg} className="text-muted-foreground text-sm font-body">{reg}</div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-[1rem] bg-secondary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 group-hover:text-primary text-muted-foreground transition-colors duration-300">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-foreground/80 font-display font-semibold text-sm mb-1 uppercase tracking-wider">{t('about.credentials.formerlyLabel')}</h4>
                        <ul className="space-y-1">
                          {doc.formerly.map(hospital => (
                            <li key={hospital} className="text-muted-foreground text-sm font-body flex items-baseline gap-2">
                              <span className="w-1.5 h-1.5 bg-primary/50 rounded-full flex-shrink-0"></span>
                              {hospital}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[1rem] bg-secondary/10 text-foreground/80 text-xs font-semibold uppercase tracking-wider">
                      <Award className="w-4 h-4 text-primary" />
                      {doc.experience}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <div id="clinic-gallery">
          <GalleryPreview showLink={false} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
