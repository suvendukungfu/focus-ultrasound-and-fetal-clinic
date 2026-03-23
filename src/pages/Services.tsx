import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope, Heart, Activity, Scan,
  Wifi, Car, Clock, Coffee, Baby, Users, Phone, MapPin,
  Eye, Dna, Monitor, ArrowRight, CheckCircle2
} from 'lucide-react';

const equipment = [
  { 
    icon: Monitor, 
    name: 'Samsung V7', 
    image: '/images/clinic-samsung-v7.jpg',
    desc: 'Advanced 3D/4D imaging with precision diagnostics for fetal and gynecological ultrasound.', 
    descHi: 'फीटल और गायनेकोलॉजिकल अल्ट्रासाउंड के लिए उन्नत 3D/4D इमेजिंग।',
    url: 'https://www.samsunghealthcare.com/en/products/UltrasoundSystem/V7/Radiology/v1/main'
  },
  { 
    icon: Monitor, 
    name: 'GE Voluson E8 Expert', 
    image: '/images/ge-voluson-e8-real.png',
    desc: 'The global gold standard in fetal medicine. Offers extraordinary image quality for the highest diagnostic confidence.', 
    descHi: 'भ्रूण चिकित्सा में वैश्विक स्वर्ण मानक। उच्चतम नैदानिक विश्वास के लिए असाधारण इमेज क्वालिटी।',
    url: 'https://www.gehealthcare.com/products/ultrasound/voluson/voluson-e8'
  },
];

const services = [
  {
    icon: Baby,
    name: 'NT Scan',
    nameHi: 'एनटी स्कैन',
    desc: 'Early screening for chromosomal abnormalities like Down syndrome.',
    descHi: 'डाउन सिंड्रोम जैसी गुणसूत्र असामान्यता के लिए प्रारंभिक स्क्रीनिंग।',
    image: '/images/nt-scan.jpg',
  },
  {
    icon: Scan,
    name: 'Anomaly Scan (TIFFA)',
    nameHi: 'असामान्यता स्कैन (TIFFA)',
    desc: 'Detailed mid-pregnancy scan to check baby\'s physical development.',
    descHi: 'बच्चे के शारीरिक विकास की जांच के लिए विस्तृत मध्य-गर्भावस्था स्कैन।',
    image: '/images/anomaly-scan.jpg',
  },
  {
    icon: Activity,
    name: 'Growth Scan',
    nameHi: 'ग्रोथ स्कैन',
    desc: 'Monitor baby\'s growth and amniotic fluid in the third trimester.',
    descHi: 'तीसरी तिमाही में बच्चे के विकास और एमनियोटिक द्रव की निगरानी।',
    image: '/images/growth-scan.jpg',
  },
  {
    icon: Stethoscope,
    name: 'Early Pregnancy Scan',
    nameHi: 'प्रारंभिक गर्भावस्था स्कैन',
    desc: 'Confirm viability, detect multiples, and accurately date the pregnancy.',
    descHi: 'गर्भावस्था की व्यवहार्यता की पुष्टि करें और सही तारीख तय करें।',
    image: '/images/early-pregnancy.jpg',
  },
  {
    icon: Activity,
    name: 'Doppler Study',
    nameHi: 'डॉप्लर अध्ययन',
    desc: 'Evaluate blood flow in umbilical cord and baby\'s vessels.',
    descHi: 'गर्भनाल और बच्चे की रक्त वाहिकाओं में रक्त प्रवाह का मूल्यांकन।',
    image: '/images/doppler-study.jpg',
  },
  {
    icon: Heart,
    name: 'Fetal Echocardiography',
    nameHi: 'फीटल इकोकार्डियोग्राफी',
    desc: 'Specialized ultrasound to examine the baby\'s heart structure and function.',
    descHi: 'बच्चे के हृदय की संरचना और कार्यप्रणाली की जांच।',
    image: '/images/fetal-echo.jpg',
  },
  {
    icon: Dna,
    name: 'NIPT Screening',
    nameHi: 'एनआईपीटी स्क्रीनिंग',
    desc: 'Non-invasive prenatal testing to screen for common chromosomal conditions.',
    descHi: 'सामान्य गुणसूत्र स्थितियों की जांच के लिए गैर-आक्रामक प्रसवपूर्व परीक्षण।',
    image: '/images/early-pregnancy.jpg', // Reusing placeholder images for variety or actual photos if available
  },
  {
    icon: Scan,
    name: 'Liver Fibroscan',
    nameHi: 'लिवर फाइब्रोस्कैन',
    desc: 'Non-invasive test to assess liver stiffness and fatty changes.',
    descHi: 'लिवर की कठोरता और फैटी परिवर्तनों का आकलन करने के लिए गैर-आक्रामक परीक्षण।',
    image: '/images/nt-scan.jpg',
  },
  {
    icon: Eye,
    name: 'Small Parts Ultrasound',
    nameHi: 'स्मॉल पार्ट्स अल्ट्रासाउंड',
    desc: 'Detailed imaging of superficial organs like the thyroid and breast.',
    descHi: 'थायराइड और स्तन जैसे सतही अंगों की विस्तृत इमेजिंग।',
    image: '/images/anomaly-scan.jpg',
  }
];

const ServicesContent = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0b1220] text-white selection:bg-[#00c8ff]/30">
      <Header />
      <main>
        {/* Unified Services Grid (Premium) - Hero Style */}
        <section className="relative py-24 md:py-32 overflow-hidden bg-[#0b1220] dark">
          {/* Dynamic Background Image with Overlay */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src="/images/services-premium-bg.png"
              alt="Premium Ultrasound Services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#0b1220]/80 to-[#0b1220]" />
          </div>

          <div className="container-narrow relative z-10 mx-auto px-6 max-w-[1200px]">
            <div className="text-center mb-16 md:mb-24 animate-fade-up">
              <span className="inline-block px-5 py-2 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-[0.3em] mb-6">
                Comprehensive Care
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Advanced Fetal <span className="text-[#00c8ff]">Diagnostics</span>
              </h1>
              <div className="w-24 h-1.5 bg-[#00c8ff]/40 mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
              {services.map((item, index) => (
                <motion.div 
                  key={item.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group relative bg-white/5 backdrop-blur-md rounded-[2.5rem] p-0 border border-white/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-[#00c8ff]/30 hover:shadow-[0_0_40px_rgba(0,200,255,0.1)] overflow-hidden flex flex-col" 
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-[#0b1220]/60 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#00c8ff]" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <div className="p-8 pb-10 flex flex-col flex-1">
                    <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#00c8ff] transition-colors duration-300">
                      {language === 'en' ? item.name : item.nameHi}
                    </h3>
                    
                    <p className="text-[#9ca3af] font-body text-sm leading-relaxed">
                      {language === 'en' ? item.desc : item.descHi}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00c8ff]/5 rounded-full blur-[150px] pointer-events-none" />
          </div>
        </section>

        {/* Technology Section (Premium) */}
        <section className="py-24 px-6 bg-white/[0.02]">
          <div className="container-narrow mx-auto max-w-[1200px]">
            <div className="text-center mb-16 md:mb-20">
              <span className="inline-block px-5 py-2 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-[0.3em] mb-6">
                Innovation
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
                Advanced Diagnostic <span className="text-[#00c8ff]">Technology</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {equipment.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-[2.5rem] border border-white/10 overflow-hidden flex flex-col group p-0"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#00c8ff]/10 flex items-center justify-center border border-[#00c8ff]/20">
                        <item.icon className="w-6 h-6 text-[#00c8ff]" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white">{item.name}</h3>
                    </div>
                    <p className="text-[#9ca3af] font-body text-base leading-relaxed mb-8 flex-grow">
                      {language === 'en' ? item.desc : item.descHi}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#00c8ff] font-bold text-sm tracking-widest uppercase group/link"
                    >
                      Specifications
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MedGenome Partnership (Dark Theme) */}
        <section className="py-24 px-6 bg-[#0b1220]">
          <div className="container-narrow mx-auto max-w-[1200px]">
            <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-16 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#00c8ff]/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#00c8ff]/10 flex items-center justify-center mb-8 border border-[#00c8ff]/20">
                    <Dna className="w-7 h-7 text-[#00c8ff]" />
                  </div>
                  <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                    Elite Genetic Testing <br />
                    <span className="text-[#00c8ff]">Powered by MedGenome</span>
                  </h3>
                  <p className="text-[#9ca3af] font-body text-lg leading-relaxed mb-10">
                    Through our exclusive partnership with MedGenome—India's leader in precision medicine—we offer 
                    advanced prenatal screening that sets the gold standard in diagnostic accuracy.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-10">
                    {['Reproductive Genetics', 'Rare Disease Panels', 'Prenatal Screening'].map((feat) => (
                      <div key={feat} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs font-bold font-body">
                        {feat}
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://diagnostics.medgenome.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00c8ff] text-black px-10 py-5 rounded-2xl font-bold transition-all hover:bg-[#00c8ff]/90 hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] inline-flex items-center gap-3"
                  >
                    Explore MedGenome Services
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="relative">
                  <div className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-square md:aspect-[4/3] relative">
                    <img 
                      src="/images/medgenome-lab-real.png" 
                      alt="MedGenome Laboratory"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220]/40 to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Services = () => {
  return (
    <LanguageProvider>
      <ServicesContent />
    </LanguageProvider>
  );
};

export default Services;
