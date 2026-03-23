import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';

import { Award, Mail, GraduationCap, Stethoscope, Monitor } from 'lucide-react';
const drSamar = '/images/dr-samar-photo.png';
const drRahul = '/images/dr-rahul-photo.png';
const drSamarDegree = '/images/dr-samar-cert.png';
const drRahulDegree = '/images/dr-rahul-cert.png';
const clinicExterior = '/images/clinic-exterior.jpg';
const clinicEntry = '/images/facilities-1.jpg';
const clinicWaiting = '/images/clinic-waiting.jpg';
const clinicSamsung = '/images/clinic-samsung-v7.jpg';

const doctorsData = [
  {
    name: 'Dr. Samar Surya Nirwal',
    nameHi: 'डॉ. समर सूर्य निर्वल',
    specialization: 'Consultant Radiologist & Fetal Medicine Specialist',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन विशेषज्ञ',
    qualifications: 'MBBS, MD, DNB (Radiodiagnosis)',
    email: 'samarsurya777@gmail.com',
    image: drSamar,
    degreeImage: '/images/dr-samar-degree-final.png',
    bio: `Dr. Samar Surya Nirwal is a highly accomplished Radiologist and Fetal Medicine Specialist dedicated to delivering precise, ethical, and compassionate diagnostic care. With strong academic credentials and advanced subspecialty training, he brings a blend of clinical expertise and evidence-based practice to every patient he serves.

He completed his MBBS from King George's Medical University (KGMU), Lucknow, followed by MD Radiology from VMMC & Safdarjung Hospital, New Delhi, and later earned his DNB Radiology qualification.

To further advance his expertise in maternal–fetal imaging, he completed a Fellowship in Obstetrics & Gynecology Imaging from The Fetal Clinic, Pondicherry, and is UK-FMF certified. He also completed his Postgraduate Degree in Fetal Medicine from the University of Barcelona.`,
    expertise: [
      'Advanced fetal ultrasound and Doppler studies',
      'Level I & Level II anomaly scans',
      'Growth scans and fetal surveillance',
      'High-risk pregnancy imaging',
      'Gynecological ultrasound',
      'CT and MRI imaging',
      'Comprehensive vascular Doppler studies',
    ],
    publications: 'Published research in the Journal of Clinical and Diagnostic Research (JCDR) with academic interest in fetal growth restriction prediction and placental evaluation.',
  },
  {
    name: 'Dr. Rahul Choudhary',
    nameHi: 'डॉ. राहुल चौधरी',
    specialization: 'Consultant Radiologist & Fetal Medicine Specialist',
    specializationHi: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन विशेषज्ञ',
    qualifications: 'MBBS, MD (Radio Diagnosis)',
    email: 'rahul2choudhary.48@gmail.com',
    image: drRahul,
    degreeImage: '/images/dr-rahul-degree-final.png',
    bio: `Dr. Rahul Choudhary is a highly experienced radiologist with a special interest in fetal medicine, obstetric ultrasound, and advanced diagnostic imaging. He is committed to delivering accurate, ethical, and patient-centered imaging services with a strong focus on quality and clinical excellence.

He completed his postgraduate training in Radiodiagnosis from Safdarjung Hospital, followed by Senior Residency at VMMC & Safdarjung Hospital and AIIMS Patna.

He completed a Fellowship in Fetal Imaging from the University of Barcelona and is FMF UK certified for first trimester screening. He is an active member of the Society of Fetal Medicine and Indian Radiological and Imaging Association (IRIA).`,
    expertise: [
      'NT scans',
      'Level II anomaly scans',
      'Fetal Doppler studies',
      'Vascular Doppler examinations',
      'Musculoskeletal ultrasound',
      'Non-vascular interventions',
    ],
    publications: '',
  },
];

const certificationsData = [
  {
    name: 'Dr. Rahul Choudhary',
    degree: 'MBBS, MD (Radiodiagnosis)',
    role: 'Consultant Radiologist & Fetal Medicine',
    university: '(University of Barcelona)',
    registration: ['UPMC No - 103538'],
    experience: '10+ Years Experience',
    formerly: [
      'Safdarjung Hospital, New Delhi',
      'AIIMS, Patna',
    ],
    avatar: drRahul 
  },
  {
    name: 'Dr. Samar Surya Nirwal',
    degree: 'MBBS, MD, DNB (Radiodiagnosis)',
    role: 'Consultant Radiologist & Fetal Medicine',
    university: '(University of Barcelona)',
    registration: ['UPMC No - 84598', 'DMC No - 94287'],
    experience: '10+ Years Experience',
    formerly: [
      'King George’s Medical University, Lucknow',
      'Safdarjung Hospital, New Delhi',
    ],
    avatar: drSamar
  }
];

const AboutContent = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-12 md:py-16 px-4">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              About Us
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {language === 'en' ? 'Focus Ultrasound & Fetal Clinic' : 'फोकस अल्ट्रासाउंड एवं फीटल क्लिनिक'}
            </h1>
            <p className="text-muted-foreground font-body text-base md:text-lg max-w-3xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {language === 'en'
                ? 'Focus Ultrasound and Fetal Clinic is a dedicated diagnostic and fetal imaging centre committed to accuracy, compassion, and patient comfort. We specialize in advanced ultrasound services, including routine pregnancy scans, detailed anomaly scans, growth monitoring, Doppler studies, and gynecological imaging — all performed with precision and care.'
                : 'फोकस अल्ट्रासाउंड और फीटल क्लिनिक सटीकता, करुणा और मरीज़ के आराम के लिए प्रतिबद्ध एक समर्पित डायग्नोस्टिक और फीटल इमेजिंग केंद्र है।'}
            </p>
            <p className="text-muted-foreground font-body text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              {language === 'en'
                ? 'Patients consistently appreciate our clear explanations, calm environment, organized workflow, and respectful approach. We understand that every scan, especially during pregnancy, is an important moment. That\'s why we focus not only on delivering accurate reports, but also on ensuring you feel reassured, informed, and comfortable throughout your visit.'
                : 'मरीज़ हमारी स्पष्ट व्याख्याओं, शांत वातावरण, संगठित कार्यप्रवाह और सम्मानजनक दृष्टिकोण की सराहना करते हैं।'}
            </p>
            <p className="text-primary/80 font-body text-sm md:text-base max-w-3xl mx-auto leading-relaxed mt-4 font-medium animate-fade-up" style={{ animationDelay: '0.4s' }}>
              {language === 'en'
                ? 'At Focus Ultrasound and Fetal Clinic, we combine modern technology with ethical practice and personalized attention — because your health and peace of mind truly matter.'
                : 'फोकस अल्ट्रासाउंड और फीटल क्लिनिक में, हम आधुनिक तकनीक को नैतिक अभ्यास और व्यक्तिगत ध्यान के साथ जोड़ते हैं — क्योंकि आपका स्वास्थ्य और मन की शांति वास्तव में मायने रखती है।'}
            </p>
          </div>
        </section>

        {/* Meet Our Experts */}
        <section className="py-10 md:py-14 px-4 bg-secondary/20">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4">
                <Stethoscope className="w-4 h-4 inline mr-1" />
                {language === 'en' ? 'Expert Team' : 'विशेषज्ञ टीम'}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                {t('doctors.title')}
              </h2>
              <p className="text-muted-foreground font-body text-base mt-2 max-w-xl mx-auto">
                {t('doctors.subtitle')}
              </p>
            </div>

            <div className="space-y-10 max-w-5xl mx-auto">
              {doctorsData.map((doctor, index) => (
                <div
                  key={doctor.name}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Doctor Photo - premium styling */}
                    <div className="md:w-64 flex-shrink-0 bg-muted/20 flex items-center justify-center p-6 transition-all duration-500 group-hover:bg-primary/5">
                      <div className="w-44 h-44 md:w-52 md:h-52 rounded-[2.5rem] overflow-hidden border border-primary/10 shadow-medium bg-white p-1.5 transition-all duration-500 group-hover:shadow-elevated group-hover:-translate-y-1">
                        <div className="w-full h-full rounded-[2.2rem] overflow-hidden bg-muted/10 shadow-inner">
                          <img
                            src={doctor.image}
                            alt={language === 'en' ? doctor.name : doctor.nameHi}
                            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground">
                          {language === 'en' ? doctor.name : doctor.nameHi}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body font-medium">
                          <Award className="w-3 h-3" />
                          Specialist
                        </span>
                      </div>

                      <p className="text-primary font-body font-semibold text-sm mb-1">
                        {language === 'en' ? doctor.specialization : doctor.specializationHi}
                      </p>
                      <p className="text-muted-foreground font-body text-sm mb-4">
                        {doctor.qualifications}
                      </p>

                      {/* Bio */}
                      <div className="text-foreground/80 font-body text-sm leading-relaxed mb-5 space-y-2">
                        {doctor.bio.split('\n\n').map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>

                      {/* Areas of Expertise */}
                      <div className="mb-6">
                        <h4 className="font-display text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          Areas of Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {doctor.expertise.map((item) => (
                            <span key={item} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-body">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Expertise and Contact Info only */}

                      {doctor.publications && (
                        <p className="text-muted-foreground font-body text-xs italic mb-4">
                          {doctor.publications}
                        </p>
                      )}

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
        <section className="py-24 px-4 bg-[#0b1220] relative overflow-hidden" id="certifications">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[#00c8ff]/10 blur-[120px] rounded-[100%] pointer-events-none" />

          <div className="container mx-auto max-w-[1100px] relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-display font-bold uppercase tracking-widest mb-4">
                {language === 'en' ? 'Credentials' : 'प्रमाणपत्र'}
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
                {language === 'en' ? 'Degrees & Certifications' : 'डिग्री और प्रमाणपत्र'}
              </h2>
              <div className="w-16 h-1 bg-[#00c8ff]/40 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {certificationsData.map((doc, index) => (
                <div 
                  key={index}
                  className="group relative flex flex-col p-8 md:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00c8ff]/30 hover:bg-white/[0.05] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,200,255,0.15)] animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Subtle top inner glow */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-white/10 p-1 flex-shrink-0 relative overflow-hidden group-hover:border-[#00c8ff]/50 transition-colors duration-500">
                        <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white mb-1.5">{doc.name}</h3>
                        <p className="text-[#00c8ff] font-display font-semibold text-sm tracking-wide">
                          {doc.degree}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <p className="text-slate-200 font-medium text-lg leading-snug mb-1">
                      {doc.role}
                    </p>
                    <p className="text-slate-400 font-body text-sm italic">
                      {doc.university}
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/10 mb-8" />

                  <div className="space-y-6 flex-1">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00c8ff]/10 group-hover:text-[#00c8ff] text-slate-400 transition-colors duration-300">
                        <span className="text-sm">📄</span>
                      </div>
                      <div>
                        <h4 className="text-slate-300 font-display font-semibold text-sm mb-1 uppercase tracking-wider">Registration</h4>
                        {doc.registration.map(reg => (
                          <div key={reg} className="text-slate-400 text-sm font-body">{reg}</div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00c8ff]/10 group-hover:text-[#00c8ff] text-slate-400 transition-colors duration-300">
                        <span className="text-sm">🏥</span>
                      </div>
                      <div>
                        <h4 className="text-slate-300 font-display font-semibold text-sm mb-1 uppercase tracking-wider">Formerly At</h4>
                        <ul className="space-y-1">
                          {doc.formerly.map(hospital => (
                            <li key={hospital} className="text-slate-400 text-sm font-body flex items-baseline gap-2">
                              <span className="w-1.5 h-1.5 bg-[#00c8ff]/50 rounded-full flex-shrink-0"></span>
                              {hospital}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider">
                      <Award className="w-4 h-4 text-[#00c8ff]" />
                      {doc.experience}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced Facilities & Technology */}
        <section className="py-20 px-4 bg-secondary/10">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-display font-semibold uppercase tracking-widest mb-4">
                {language === 'en' ? 'Our Technology' : 'हमारी तकनीक'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Advanced Diagnostic Equipment' : 'उन्नत नैदानिक उपकरण'}
              </h2>
              <p className="text-muted-foreground font-body text-base max-w-2xl mx-auto">
                {language === 'en' 
                  ? 'We invest in world-class imaging systems to ensure the highest accuracy in fetal and maternal diagnostics.' 
                  : 'हम भ्रूण और मातृ निदान में उच्चतम सटीकता सुनिश्चित करने के लिए विश्व स्तरीय इमेजिंग सिस्टम में निवेश करते हैं।'}
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
              {/* High-End Diagnostic Suite */}
              <div className="flex flex-col bg-white rounded-[3rem] overflow-hidden border border-border shadow-soft hover:shadow-elevated transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden bg-muted/5 p-8 flex items-center justify-center">
                  <img
                    src="/images/hero-clinic-bg.jpg"
                    alt="Premium Diagnostic Suite"
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      Boutique Scan Suites
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-body text-base leading-relaxed mb-6 flex-grow">
                    {language === 'en'
                      ? 'Our clinic features state-of-the-art diagnostic suites designed for maximum patient comfort and clinical precision. Each room provides a serene, private environment for your journey.'
                      : 'हमारे क्लिनिक में अधिकतम रोगी आराम और नैदानिक सटीकता के लिए डिज़ाइन किए गए अत्याधुनिक डायग्नोस्टिक सुइट हैं। प्रत्येक कमरा आपकी यात्रा के लिए एक शांत, निजी वातावरण प्रदान करता है।'}
                  </p>
                  <ul className="space-y-3">
                    {[
                      language === 'en' ? 'Private & serene environment' : 'निजी और शांत वातावरण',
                      language === 'en' ? 'Comfort-first ergonomics' : 'आराम-प्रथम एर्गोनॉमिक्स',
                      language === 'en' ? 'Integrated viewing screens' : 'एकीकृत देखने की स्क्रीन'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* GE Voluson E10 Expert */}
              <div className="flex flex-col bg-white rounded-[3rem] overflow-hidden border border-border shadow-soft hover:shadow-elevated transition-all duration-500 group">
                <div className="aspect-[16/10] overflow-hidden bg-muted/5 p-8 flex items-center justify-center">
                  <img
                    src="/images/ultrasound-machine.jpg"
                    alt="Advanced Ultrasound System"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                      <Monitor className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      GE Voluson E10
                    </h3>
                  </div>
                  <p className="text-muted-foreground font-body text-base leading-relaxed mb-6 flex-grow">
                    {language === 'en'
                      ? 'The GE Voluson™ E10 is the global gold standard in fetal medicine. It offers extraordinary image quality with HDlive™ and Radiantflow™ for the highest diagnostic confidence.'
                      : 'GE Voluson™ E10 भ्रूण चिकित्सा में वैश्विक स्वर्ण मानक है। यह उच्चतम नैदानिक विश्वास के लिए एचडीलाइव™ और रेडिएंटफ्लो™ के साथ असाधारण इमेज क्वालिटी प्रदान करता है।'}
                  </p>
                  <ul className="space-y-3">
                    {[
                      language === 'en' ? 'Revolutionary HDlive™ 3D/4D' : 'क्रांतिकारी एचडीलाइव™ 3D/4D',
                      language === 'en' ? 'Superior fetal cardiac imaging' : 'बेहतर फीटल कार्डियक इमेजिंग',
                      language === 'en' ? 'Unmatched diagnostic precision' : 'बेजोड़ नैदानिक सटीकता'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm font-body text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* redesigned Clinic Gallery */}
        <section className="py-24 px-4 bg-background overflow-hidden" id="clinic-gallery">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-display font-semibold uppercase tracking-widest mb-4">
                {language === 'en' ? 'The Clinic Experience' : 'क्लिनिक का अनुभव'}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                {language === 'en' ? 'Our Gallery' : 'हमारी गैलरी'}
              </h2>
              <div className="w-16 h-1 bg-primary/30 mx-auto rounded-full" />
            </div>
            
            <div className="columns-1 md:columns-2 gap-6 md:gap-8 max-w-7xl mx-auto space-y-6 md:space-y-8">
              {[
                { 
                  src: '/images/clinic-exterior-new.jpg', 
                  label: language === 'en' ? 'Modern Exterior' : 'आधुनिक बाहरी हिस्सा',
                  aspect: 'aspect-[1024/576]'
                },
                { 
                  src: '/images/clinic-waiting-new.jpg', 
                  label: language === 'en' ? 'Comfortable Waiting Lounge' : 'आरामदायक प्रतीक्षा कक्ष',
                  aspect: 'aspect-[765/1020]'
                },
                { 
                  src: '/images/clinic-entry-new.png', 
                  label: language === 'en' ? 'Welcoming Reception' : 'स्वागत क्षेत्र',
                  aspect: 'aspect-[512/310]'
                },
                { 
                  src: clinicSamsung, 
                  label: language === 'en' ? 'Diagnostic Suite' : 'डायग्नोस्टिक सूट',
                  aspect: 'aspect-[816/1020]'
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-[2.5rem] border border-border shadow-soft transition-all duration-700 hover:shadow-elevated hover:-translate-y-2 animate-fade-up break-inside-avoid`}
                  style={{ animationDelay: `${(index % 2) * 0.15}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  <div className={`w-full ${item.aspect} relative bg-slate-50/50`}>
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-display text-lg font-bold text-white mb-1">
                      {item.label}
                    </p>
                    <div className="w-8 h-1 bg-primary rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clinic Timings removed - only on Home page */}
      </main>
      <Footer />
    </div>
  );
};

const About = () => (
  <LanguageProvider>
    <AboutContent />
  </LanguageProvider>
);

export default About;
