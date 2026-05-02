import React, { Suspense } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import DoctorsSection from '@/components/DoctorsSection';
import ClinicTimings from '@/components/ClinicTimings';
import Footer from '@/components/Footer';
import ReviewCarousel from '@/components/ReviewCarousel';
import { useTestimonials, STATIC_REVIEWS } from '@/hooks/useTestimonials';
import { useLanguage } from '@/contexts/LanguageContext';
import SEO from '@/components/SEO';
import FAQSection from '@/components/FAQSection';

const LazyClinicMap = React.lazy(() => import('@/components/map/ClinicMap'));

const Index = () => {
  const { testimonials, loading, error } = useTestimonials();
  const { language } = useLanguage();
  
  const displayReviews = error ? STATIC_REVIEWS : testimonials;
  
  const faqData = language === 'en' ? [
    {
      question: "What is a fetal ultrasound?",
      answer: "A fetal ultrasound is a safe, non-invasive imaging technique using high-frequency sound waves to create live images of your baby. It allows our specialists to monitor fetal development, check the baby's position, and confirm essential growth milestones accurately."
    },
    {
      question: "When should I get a pregnancy ultrasound scan?",
      answer: "Pregnancy ultrasounds are typically recommended starting between 6 and 10 weeks to confirm viability. Essential milestones follow, including the NT scan at 11–13 weeks for early health screening and the Level II Anomaly Scan at 18–20 weeks."
    },
    {
      question: "Is ultrasound safe during pregnancy?",
      answer: "Yes, ultrasound is completely safe for both you and your baby during pregnancy. Unlike X-rays, ultrasound technology uses harmless sound waves rather than ionizing radiation to visualize the womb. It is a standard and secure diagnostic tool."
    },
    {
      question: "What is the recommended pregnancy scan timeline?",
      answer: "A standard scan timeline includes a Viability scan (6-9 weeks), NT Scan (11-13.6 weeks), and Anomaly Scan (18-20 weeks). \n\n• First Trimester: Early pregnancy & NT/NB scan for chromosomal screening.\n• Second Trimester: Level II TIFFA scan for detailed organ assessment.\n• Third Trimester: Growth & Doppler scan to monitor baby's weight and blood flow."
    },
    {
      question: "What should I do before my ultrasound appointment?",
      answer: "For early pregnancy scans, you should drink plenty of water and have a full bladder for better visualization. \n\n• Wear comfortable, loose-fitting two-piece clothing.\n• Carry your previous medical reports and prescriptions.\n• Do not skip meals unless specifically instructed for a combined blood test."
    }
  ] : [
    {
      question: "भ्रूण अल्ट्रासाउंड क्या है?",
      answer: "भ्रूण अल्ट्रासाउंड एक सुरक्षित तकनीक है जो आपके बच्चे की लाइव छवियां बनाने के लिए उच्च-आवृत्ति ध्वनि तरंगों का उपयोग करती है। यह हमारे विशेषज्ञों को भ्रूण के विकास की निगरानी करने और विकास के महत्वपूर्ण मील के पत्थर की पुष्टि करने की अनुमति देता है।"
    },
    {
      question: "मुझे गर्भावस्था का अल्ट्रासाउंड स्कैन कब करवाना चाहिए?",
      answer: "गर्भावस्था के अल्ट्रासाउंड आमतौर पर व्यवहार्यता की पुष्टि के लिए 6 से 10 सप्ताह के बीच शुरू करने की सिफारिश की जाती है। इसके बाद महत्वपूर्ण पड़ाव आते हैं, जिसमें 11-13 सप्ताह में एनटी स्कैन और 18-20 सप्ताह में लेवल II विसंगति स्कैन शामिल है।"
    },
    {
      question: "क्या गर्भावस्था के दौरान अल्ट्रासाउंड सुरक्षित है?",
      answer: "हाँ, गर्भावस्था के दौरान अल्ट्रासाउंड आपके और आपके बच्चे दोनों के लिए पूरी तरह से सुरक्षित है। एक्स-रे के विपरीत, अल्ट्रासाउंड तकनीक विकिरण के बजाय हानिरहित ध्वनि तरंगों का उपयोग करती है। यह एक मानक और सुरक्षित उपकरण है।"
    },
    {
      question: "गर्भावस्था स्कैन की समयरेखा क्या है?",
      answer: "एक मानक समयरेखा में व्यवहार्यता स्कैन (6-9 सप्ताह), एनटी स्कैन (11-13.6 सप्ताह) और विसंगति स्कैन (18-20 सप्ताह) शामिल हैं। \n\n• पहली तिमाही: प्रारंभिक गर्भावस्था और गुणसूत्र स्क्रीनिंग के लिए एनटी/एनबी स्कैन।\n• दूसरी तिमाही: विस्तृत अंग मूल्यांकन के लिए लेवल II टीआईएफएफए स्कैन।\n• तीसरी तिमाही: बच्चे के वजन और रक्त प्रवाह की निगरानी के लिए विकास और डॉपलर स्कैन।"
    },
    {
      question: "अल्ट्रासाउंड अपॉइंटमेंट से पहले मुझे क्या करना चाहिए?",
      answer: "प्रारंभिक गर्भावस्था स्कैन के लिए, आपको भरपूर पानी पीना चाहिए और बेहतर दृश्यता के लिए मूत्राशय भरा होना चाहिए। \n\n• आरामदायक, ढीले-ढाले दो-पीस कपड़े पहनें।\n• अपनी पिछली मेडिकल रिपोर्ट और नुस्खे साथ रखें।\n• भोजन न छोड़ें जब तक कि संयुक्त रक्त परीक्षण के लिए विशेष रूप से निर्देश न दिया जाए।"
    }
  ];

  return (
    <>
      <SEO 
        title="Best Ultrasound & Fetal Clinic in Greater Noida West | Focus Ultrasound"
        description="Advanced fetal scans, pregnancy ultrasound, and expert diagnostics in Nirala Estate. Book your appointment today."
        canonicalUrl="https://focusultrasound.in"
        faqData={faqData}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <DoctorsSection />
          <ClinicTimings />
          <FAQSection />
          
          {!loading && displayReviews.length > 0 && (
            <section className="bg-gradient-to-b from-primary/5 to-transparent">
              <ReviewCarousel reviews={displayReviews.slice(0, 5)} />
            </section>
          )}

          <section className="px-4 md:px-8 py-8 md:py-12">
            <Suspense fallback={
              <div className="w-full h-[450px] md:h-[600px] rounded-[2rem] bg-muted/30 animate-pulse flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Loading map…</span>
              </div>
            }>
              <LazyClinicMap />
            </Suspense>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
