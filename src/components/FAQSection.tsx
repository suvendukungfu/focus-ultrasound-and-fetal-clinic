import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from './ui/SectionHeading';

const FAQSection = () => {
  const { language } = useLanguage();

  const faqs = [
    {
      question: language === 'en' ? "What is a fetal ultrasound?" : "भ्रूण अल्ट्रासाउंड क्या है?",
      answer: language === 'en' 
        ? "A fetal ultrasound is a safe, non-invasive imaging technique using high-frequency sound waves to create live images of your baby. It allows our specialists to monitor fetal development, check the baby's position, and confirm essential growth milestones accurately. This procedure ensures a healthy pregnancy journey by providing detailed diagnostic insights for both parents and doctors."
        : "भ्रूण अल्ट्रासाउंड एक सुरक्षित तकनीक है जो आपके बच्चे की लाइव छवियां बनाने के लिए उच्च-आवृत्ति ध्वनि तरंगों का उपयोग करती है। यह हमारे विशेषज्ञों को भ्रूण के विकास की निगरानी करने, बच्चे की स्थिति की जांच करने और विकास के महत्वपूर्ण मील के पत्थर की पुष्टि करने की अनुमति देता है। यह प्रक्रिया माता-पिता और डॉक्टरों दोनों के लिए विस्तृत अंतर्दृष्टि प्रदान करके एक स्वस्थ गर्भावस्था सुनिश्चित करती है।"
    },
    {
      question: language === 'en' ? "When should I get a pregnancy scan?" : "मुझे गर्भावस्था का स्कैन कब करवाना चाहिए?",
      answer: language === 'en'
        ? "You should get your first pregnancy scan between 6 and 10 weeks to confirm viability. Essential milestones follow, including the NT scan at 11–13 weeks for early health screening and the Level II Anomaly Scan at 18–20 weeks. These regular check-ups are vital for monitoring your baby’s structural development and ensuring overall pregnancy health."
        : "व्यवहार्यता की पुष्टि के लिए आपको 6 से 10 सप्ताह के बीच अपना पहला स्कैन करवाना चाहिए। इसके बाद महत्वपूर्ण पड़ाव आते हैं, जिसमें शुरुआती स्वास्थ्य जांच के लिए 11-13 सप्ताह में एनटी स्कैन और 18-20 सप्ताह में लेवल II विसंगति स्कैन शामिल है। ये नियमित जांच आपके बच्चे के विकास की निगरानी और गर्भावस्था के स्वास्थ्य को सुनिश्चित करने के लिए महत्वपूर्ण हैं।"
    },
    {
      question: language === 'en' ? "Is ultrasound safe during pregnancy?" : "क्या गर्भावस्था के दौरान अल्ट्रासाउंड सुरक्षित है?",
      answer: language === 'en'
        ? "Yes, ultrasound is completely safe for both you and your baby during pregnancy. Unlike X-rays, ultrasound technology uses harmless sound waves rather than ionizing radiation to visualize the womb. It is a standard, secure, and well-researched diagnostic tool used worldwide by medical professionals to monitor fetal growth and well-being with zero known risks."
        : "हाँ, गर्भावस्था के दौरान अल्ट्रासाउंड आपके और आपके बच्चे दोनों के लिए पूरी तरह से सुरक्षित है। एक्स-रे के विपरीत, अल्ट्रासाउंड तकनीक विकिरण के बजाय हानिरहित ध्वनि तरंगों का उपयोग करती है। यह दुनिया भर में चिकित्सा पेशेवरों द्वारा उपयोग किया जाने वाला एक मानक और सुरक्षित उपकरण है, जिसकी भ्रूण के विकास की निगरानी के लिए कोई ज्ञात जोखिम नहीं है।"
    }
  ];

  return (
    <section className="py-24 px-6 bg-secondary/5 relative overflow-hidden" id="faq">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-16">
          <SectionHeading 
            badge={language === 'en' ? "Information Center" : "सूचना केंद्र"}
            title={language === 'en' ? "Frequently Asked Questions" : "अक्सर पूछे जाने वाले प्रश्न"}
            subtitle={language === 'en' 
              ? "Expert answers to common concerns about fetal imaging and pregnancy health." 
              : "भ्रूण इमेजिंग और गर्भावस्था स्वास्थ्य के बारे में सामान्य चिंताओं के विशेषज्ञ उत्तर।"}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-effect rounded-[2.5rem] border border-border/50 p-8 md:p-12 shadow-elevated bg-card/30 backdrop-blur-xl"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-border/50 last:border-0"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline group">
                  <div className="flex gap-4 items-center pr-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="font-display text-lg md:text-xl font-bold group-data-[state=open]:text-primary transition-colors">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-8 pl-14">
                  <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
