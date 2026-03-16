import { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Star, ExternalLink, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PATIENT_IMAGE = '/images/patient-story-1.png';
const FALLBACK_IMAGE = '/placeholder.svg';

const reviews = [
  {
    name: 'Priyanka Mehta', nameHi: 'प्रियंका मेहता', rating: 5,
    text: 'Excellent experience! The doctors explained everything clearly during my pregnancy ultrasound. The staff is very caring and professional. Highly recommend!',
    textHi: 'उत्कृष्ट अनुभव! डॉक्टरों ने मेरे प्रेगनेंसी अल्ट्रासाउंड के दौरान सब कुछ स्पष्ट रूप से समझाया। स्टाफ बहुत देखभाल करने वाला और पेशेवर है।',
  },
  {
    name: 'Rahul Kapoor', nameHi: 'राहुल कपूर', rating: 5,
    text: 'Very clean and modern facility with Samsung V7 equipment. Got my reports within 24 hours. The doctors are knowledgeable and take time to address all concerns.',
    textHi: 'Samsung V7 उपकरण के साथ बहुत साफ और आधुनिक सुविधा। 24 घंटे के भीतर रिपोर्ट मिल गई। डॉक्टर जानकार हैं।',
  },
  {
    name: 'Sneha Agarwal', nameHi: 'स्नेहा अग्रवाल', rating: 5,
    text: 'Best diagnostic center in Noida Extension. The 3D ultrasound quality was amazing. Dr. Nirwal was very patient and thorough with the examination.',
    textHi: 'नोएडा एक्सटेंशन का सबसे अच्छा डायग्नोस्टिक सेंटर। 3D अल्ट्रासाउंड की क्वालिटी अद्भुत थी। डॉ. निर्वल बहुत धैर्यवान थे।',
  },
  {
    name: 'Amit Singh', nameHi: 'अमित सिंह', rating: 5,
    text: 'Brought my mother for an ECG and X-ray. Quick service, affordable prices, and the staff helped us through every step. Will definitely come back.',
    textHi: 'अपनी माँ को ईसीजी और एक्स-रे के लिए लाया। त्वरित सेवा, किफायती कीमतें, और स्टाफ ने हर कदम पर मदद की।',
  },
  {
    name: 'Neha Sharma', nameHi: 'नेहा शर्मा', rating: 5,
    text: 'Had my fetal echo done here. The experience was wonderful. Dr. Choudhary is extremely gentle and professional. The clinic has all modern equipment.',
    textHi: 'यहाँ अपना फीटल इको करवाया। अनुभव बहुत अच्छा था। डॉ. चौधरी बहुत कोमल और पेशेवर हैं। क्लिनिक में सभी आधुनिक उपकरण हैं।',
  },
  {
    name: 'Vikram Patel', nameHi: 'विक्रम पटेल', rating: 5,
    text: 'The lab test results were accurate and delivered on time. Very impressed with the hygiene standards maintained here. Great team!',
    textHi: 'लैब टेस्ट के परिणाम सटीक थे और समय पर मिले। यहाँ बनाए गए स्वच्छता मानकों से बहुत प्रभावित हूँ। शानदार टीम!',
  },
];

const ReviewsContent = () => {
  const { t, language } = useLanguage();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative section-padding">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              Testimonials
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('reviews.title')}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('reviews.subtitle')}
            </p>
            <a
              href="https://g.page/r/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 btn-primary animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              <Star className="w-5 h-5" />
              {t('reviews.google')}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Featured Patient Story — Full Width Banner */}
        <section className="py-12 md:py-16 px-4 bg-secondary/20">
          <div className="container-narrow mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-3">
                {language === 'en' ? 'Happy Families' : 'खुश परिवार'}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                {language === 'en' ? 'Our Patients, Our Pride' : 'हमारे मरीज़, हमारा गर्व'}
              </h2>
            </div>
            <div className="max-w-4xl mx-auto group">
              <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-500 hover:-translate-y-1">
                {/* Patient Image */}
                <div className="relative w-full overflow-hidden bg-muted/10 flex items-center justify-center">
                  <img
                    src={imgError ? FALLBACK_IMAGE : PATIENT_IMAGE}
                    alt="Happy patient with doctors at Focus Ultrasound & Fetal Clinic"
                    loading="lazy"
                    className="w-full h-auto max-h-[500px] md:max-h-[600px] object-contain transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                    onError={() => setImgError(true)}
                  />
                  {/* Subtle gradient overlay at the bottom for text readability */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <p className="text-white font-display font-semibold text-sm md:text-base drop-shadow-lg">
                      {language === 'en' 
                        ? 'A moment of joy — our team with a happy family after a successful consultation.' 
                        : 'खुशी का पल — एक सफल परामर्श के बाद हमारी टीम एक खुश परिवार के साथ।'}
                    </p>
                  </div>
                </div>
                {/* Caption bar */}
                <div className="px-6 py-4 flex items-center justify-between bg-card border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-muted-foreground font-body text-xs md:text-sm">
                      {language === 'en' 
                        ? 'Focus Ultrasound & Fetal Clinic • Trusted by families across Greater Noida' 
                        : 'फोकस अल्ट्रासाउंड एवं फीटल क्लिनिक • ग्रेटर नोएडा भर के परिवारों द्वारा विश्वसनीय'}
                    </span>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-highlight fill-highlight" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Review Cards Grid */}
        <section className="section-padding">
          <div className="container-narrow mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={review.name}
                  className="bg-card rounded-2xl border border-border p-6 md:p-8 flex flex-col h-full shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 animate-fade-up group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Quote className="w-8 h-8 text-primary/15 mb-4 transition-colors duration-300 group-hover:text-primary/30" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-highlight fill-highlight" />
                    ))}
                  </div>
                  <p className="text-foreground/80 font-body text-sm mb-6 leading-relaxed flex-grow">
                    "{language === 'en' ? review.text : review.textHi}"
                  </p>
                  <div className="pt-4 border-t border-border mt-auto flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display font-bold text-sm flex-shrink-0">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-display font-semibold text-foreground text-sm block">
                        {language === 'en' ? review.name : review.nameHi}
                      </span>
                      <span className="text-muted-foreground font-body text-xs">
                        {language === 'en' ? 'Verified Patient' : 'सत्यापित मरीज'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-secondary/20">
          <div className="container-narrow mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              {t('reviews.leave')}
            </h2>
            <p className="text-muted-foreground font-body mb-6 max-w-xl mx-auto">
              {language === 'en'
                ? 'Your feedback helps us improve and helps others find quality care.'
                : 'आपकी प्रतिक्रिया हमें सुधारने में मदद करती है और दूसरों को गुणवत्तापूर्ण देखभाल खोजने में मदद करती है।'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://g.page/r/review" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 btn-primary">
                <Star className="w-5 h-5" />
                {t('reviews.google')}
                <ExternalLink className="w-4 h-4" />
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 btn-secondary">
                {t('nav.book')}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Reviews = () => {
  return (
    <LanguageProvider>
      <ReviewsContent />
    </LanguageProvider>
  );
};

export default Reviews;
