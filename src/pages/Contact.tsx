import { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, MapPin, Phone, Mail, Clock, 
  Baby, Calendar as CalendarIcon, User, 
  Stethoscope, FileText, Info
} from 'lucide-react';
import ContactHeroBanner from '@/components/ContactHeroBanner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from 'framer-motion';

const ContactContent = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '', 
    phone: '', 
    email: '', 
    age: '', 
    weight: '',
    medicalConditions: '',
    weeksOfPregnancy: '',
    scanType: '',
    preferredDate: '',
    preferredTime: '',
    doctorPreference: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: language === 'en' ? "Appointment Request Submitted!" : "अपॉइंटमेंट अनुरोध भेजा गया!",
      description: language === 'en' ? "We'll contact you within 24 hours to confirm." : "हम पुष्टि के लिए 24 घंटे के भीतर आपसे संपर्क करेंगे।",
    });
    setFormData({ 
      name: '', phone: '', email: '', age: '', 
      weight: '', medicalConditions: '',
      weeksOfPregnancy: '', scanType: '', 
      preferredDate: '', preferredTime: '',
      doctorPreference: '', message: '' 
    });
    setIsSubmitting(false);
  };

  const scanTypes = [
    'NT Scan', 'Anomaly Scan (TIFFA)', 'Growth Scan', 
    'Early Pregnancy Scan', 'Doppler Study', 'Fetal Echocardiography', 
    'NIPT Screening', 'Liver Fibroscan', 'Small Parts Ultrasound', 'Other'
  ];

  const doctors = [
    'Dr. Samar Surya Nirwal',
    'Dr. Rahul Choudhary',
    'Any Available Specialist'
  ];

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Header />
      <main className="pt-20">
        <ContactHeroBanner />

        <section className="py-16 md:py-24 px-4 overflow-hidden relative">
          <BackgroundPattern />
          
          <div className="container-narrow mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Form Section */}
              <div className="lg:col-span-8">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="bg-card rounded-[2rem] md:rounded-[3rem] border border-border shadow-xl p-6 md:p-12 transition-all duration-500"
                >
                  <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Patient Information */}
                    <div>
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <User className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-foreground">
                            {t('contact.name').split(' ')[0]} {language === 'en' ? 'Details' : 'विवरण'}
                          </h3>
                          <p className="text-muted-foreground text-sm">{language === 'en' ? 'Help us know you better' : 'कृपया अपनी जानकारी दें'}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.name')} *</label>
                          <Input name="name" value={formData.name} onChange={handleChange} required placeholder={language === 'en' ? "Your Name" : "आपका नाम"} className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary focus:ring-primary/20 transition-all font-body text-base" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.phone')} *</label>
                          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder={language === 'en' ? "Contact Number" : "संपर्क नंबर"} className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary transition-all font-body text-base" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.weeks')}</label>
                          <div className="relative">
                            <Input type="number" name="weeksOfPregnancy" value={formData.weeksOfPregnancy} onChange={handleChange} placeholder="e.g. 12" className="h-14 rounded-2xl bg-background border-border/50 pl-12 focus:border-primary transition-all font-body text-base" />
                            <Baby className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.age')}</label>
                          <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder={language === 'en' ? "Age" : "आयु"} className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary transition-all font-body text-base" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{language === 'en' ? 'Weight (kg)' : 'वजन (किलो)'}</label>
                          <Input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} placeholder={language === 'en' ? "Weight in kg" : "किलोग्राम में वजन"} className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary transition-all font-body text-base" />
                        </div>
                      </div>
                    </div>

                    {/* Medical History */}
                    <div className="pt-10 border-t border-border/30">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-foreground">
                            {language === 'en' ? 'Medical History' : 'चिकित्सा इतिहास'}
                          </h3>
                          <p className="text-muted-foreground text-sm">{language === 'en' ? 'Help us understand your health context' : 'हमें आपके स्वास्थ्य के बारे में बताएं'}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{language === 'en' ? 'Prior Medical Conditions' : 'पूर्व चिकित्सा स्थितियां'}</label>
                          <Input name="medicalConditions" value={formData.medicalConditions || ''} onChange={handleChange} placeholder={language === 'en' ? "e.g., Diabetes, Asthma, Hypertension..." : "जैसे, मधुमेह, अस्थमा, उच्च रक्तचाप..."} className="h-14 rounded-2xl bg-background border-border/50 focus:border-primary transition-all font-body text-base" />
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="pt-10 border-t border-border/30">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                          <Stethoscope className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-display text-2xl font-bold text-foreground">
                            {language === 'en' ? 'Appointment Information' : 'अपॉइंटमेंट की जानकारी'}
                          </h3>
                          <p className="text-muted-foreground text-sm">{t('contact.subtitle')}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.scanType')} *</label>
                          <Select onValueChange={(v) => handleSelectChange('scanType', v)} required>
                            <SelectTrigger className="h-14 rounded-2xl bg-background border-border/50 focus:ring-primary/20 transition-all font-body text-base">
                              <SelectValue placeholder={language === 'en' ? "Choose a scan type" : "स्कैन का प्रकार चुनें"} />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border">
                              {scanTypes.map(type => (
                                <SelectItem key={type} value={type} className="rounded-xl py-3">{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.doctor')}</label>
                          <Select onValueChange={(v) => handleSelectChange('doctorPreference', v)}>
                            <SelectTrigger className="h-14 rounded-2xl bg-background border-border/50 focus:ring-primary/20 transition-all font-body text-base">
                              <SelectValue placeholder={language === 'en' ? "Any Available Specialist" : "कोई भी उपलब्ध विशेषज्ञ"} />
                            </SelectTrigger>
                            <SelectContent className="rounded-2xl border-border">
                              {doctors.map(doc => (
                                <SelectItem key={doc} value={doc} className="rounded-xl py-3">{doc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.date')}</label>
                          <div className="relative">
                            <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="h-14 rounded-2xl bg-background border-border/50 pl-12 focus:border-primary transition-all font-body text-base" />
                            <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.time')}</label>
                          <div className="relative">
                            <Input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="h-14 rounded-2xl bg-background border-border/50 pl-12 focus:border-primary transition-all font-body text-base" />
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="pt-10 border-t border-border/30">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 ml-1 mb-4">
                          <FileText className="w-5 h-5 text-primary" />
                          {t('contact.message')}
                        </label>
                        <textarea 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          rows={4} 
                          placeholder={language === 'en' ? "Please share any specific symptoms, previous history, or questions..." : "कृपया कोई विशेष लक्षण, पिछला इतिहास या प्रश्न साझा करें..."} 
                          className="w-full px-4 py-4 rounded-[1.5rem] bg-background border border-border/50 focus:ring-2 focus:ring-primary/20 focus:border-primary hover:border-primary transition-all duration-300 min-h-[140px] font-body text-base" 
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full h-16 rounded-2xl text-lg font-bold shadow-glow hover:translate-y-[-2px] active:translate-y-[0] transition-all bg-primary hover:bg-primary/90 text-primary-foreground group overflow-hidden relative">
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('common.loading')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 z-10 transition-all">
                          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          {t('contact.submit')}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                  </form>
                </motion.div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-4 space-y-8 h-full">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-[2.5rem] border border-border p-8 md:p-10 shadow-xl border-l-4 border-l-primary transition-all duration-500"
                >
                  <h3 className="font-display text-2xl font-bold text-foreground mb-8 flex items-center gap-2">
                    <Info className="w-6 h-6 text-primary" />
                    {t('contact.info')}
                  </h3>
                  <div className="space-y-8">
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 text-primary border border-primary/10 transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold text-sm mb-1 uppercase tracking-wider">{language === 'en' ? 'Address' : 'पता'}</p>
                        <p className="text-muted-foreground font-body text-sm leading-relaxed">
                          Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension, Greater Noida West - 201306
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 text-primary border border-primary/10 transition-colors">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold text-sm mb-1 uppercase tracking-wider">{language === 'en' ? 'Quick Contact' : 'त्वरित संपर्क'}</p>
                        <a href="tel:+919870475400" className="text-foreground font-bold text-base hover:text-primary transition-colors block">
                          +91 98704 75400
                        </a>
                        <a href="mailto:info.fufc@gmail.com" className="text-muted-foreground font-body text-sm hover:text-primary transition-colors">
                          info.fufc@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 text-primary border border-primary/10 transition-colors">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-foreground font-semibold text-sm mb-1 uppercase tracking-wider">{language === 'en' ? 'Clinic Hours' : 'क्लिनिक का समय'}</p>
                        <div className="text-muted-foreground font-body text-sm leading-relaxed space-y-1">
                          <div className="flex justify-between gap-4 border-b border-border/50 pb-1">
                            <span>Mon–Sat</span>
                            <span className="text-foreground font-medium">9 AM – 3 PM</span>
                          </div>
                          <div className="flex justify-between gap-4 border-b border-border/50 py-1">
                            <span>Evening</span>
                            <span className="text-foreground font-medium">5 PM – 8 PM</span>
                          </div>
                          <div className="flex justify-between gap-4 pt-1">
                            <span>Sunday</span>
                            <span className="text-foreground font-medium">9 AM – 2 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/20 relative overflow-hidden group shadow-lg"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    < Baby className="w-24 h-24" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 text-primary font-bold text-xl mb-4">
                      <Info className="w-6 h-6" />
                      {t('contact.note')}
                    </div>
                    <p className="text-foreground/80 text-sm font-body leading-relaxed">
                      {t('contact.requiredNote')} {language === 'en' 
                        ? 'For Anomaly Scans, we recommend having a light snack before the appointment.' 
                        : 'विसंगति स्कैन के लिए, हम अपॉइंटमेंट से पहले हल्का नाश्ता करने की सलाह देते हैं।'}
                    </p>
                  </div>
                </motion.div>
                
                {/* Visual Trust Indicator */}
                <div className="rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-transparent p-1">
                  <div className="bg-card rounded-[2.4rem] p-8 text-center border border-border/50">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Patient Trust</p>
                    <div className="flex justify-center gap-1 mb-3">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-foreground font-display font-bold text-2xl">4.9/5</p>
                    <p className="text-muted-foreground text-xs uppercase tracking-tighter mt-1">Based on 500+ Google Reviews</p>
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

const Contact = () => {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  );
};

export default Contact;
