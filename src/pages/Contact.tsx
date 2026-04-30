import { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { useAppointments } from '@/hooks/useAppointments';
import { useWhatsApp } from '@/contexts/WhatsAppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Send, MapPin, Phone, Mail, Clock, 
  Baby, Calendar as CalendarIcon, User, 
  Stethoscope, FileText, Info, ShieldCheck, Star
} from 'lucide-react';
import ContactHeroBanner from '@/components/ContactHeroBanner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToastAction } from "@/components/ui/toast";
import { motion } from 'framer-motion';

const ContactContent = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const { createAppointment, loading: isSubmitting } = useAppointments();
  
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

  // Sync Contact form selections to the global WhatsApp context
  const { setService, setDate, setTime, setName, setPhone, setWeeks, buildUrl } = useWhatsApp();

  useEffect(() => {
    setService(formData.scanType);
    setDate(formData.preferredDate);
    setTime(formData.preferredTime);
    setName(formData.name);
    setPhone(formData.phone);
    setWeeks(formData.weeksOfPregnancy);
  }, [formData.scanType, formData.preferredDate, formData.preferredTime, formData.name, formData.phone, formData.weeksOfPregnancy, setService, setDate, setTime, setName, setPhone, setWeeks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Combine date and time
      const appointmentDate = new Date(formData.preferredDate);
      if (formData.preferredTime) {
        const [hours, minutes] = formData.preferredTime.split(':');
        appointmentDate.setHours(parseInt(hours), parseInt(minutes));
      }

      await createAppointment({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        serviceId: formData.scanType,
        doctorId: formData.doctorPreference,
        date: appointmentDate.toISOString(),
        notes: `
          Age: ${formData.age}
          Weight: ${formData.weight}
          Medical Conditions: ${formData.medicalConditions}
          Weeks of Pregnancy: ${formData.weeksOfPregnancy}
          Doctor Preference: ${formData.doctorPreference}
          Message: ${formData.message}
        `.trim(),
      });

      toast({
        title: language === 'en' ? "Appointment Request Submitted!" : "अपॉइंटमेंट अनुरोध भेजा गया!",
        description: language === 'en' ? "We'll contact you within 24 hours to confirm." : "हम पुष्टि के लिए 24 घंटे के भीतर आपसे संपर्क करेंगे।",
        action: (
          <ToastAction altText="Open WhatsApp" onClick={() => window.open(buildUrl(), '_blank')}>
            {language === 'en' ? 'Confirm on WhatsApp' : 'WhatsApp पर पुष्टि करें'}
          </ToastAction>
        ),
      });

      setFormData({ 
        name: '', phone: '', email: '', age: '', 
        weight: '', medicalConditions: '',
        weeksOfPregnancy: '', scanType: '', 
        preferredDate: '', preferredTime: '',
        doctorPreference: '', message: '' 
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'en' ? "Submission Failed" : "सबमिशन विफल रहा",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
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
      <SEO 
        title="Book Appointment | Best Ultrasound Clinic in Greater Noida West"
        description="Schedule your pregnancy scan or diagnostic ultrasound at Focus Clinic Nirala Estate. Online appointment booking for expert fetal medicine and diagnostics."
        faqData={[
          {
            question: "How can I book an appointment at Focus Ultrasound?",
            answer: "You can book an appointment by calling us at +91 8130881986 or by filling out the online appointment request form on our contact page."
          },
          {
            question: "What should I bring for my ultrasound appointment?",
            answer: "Please bring your doctor's prescription, any previous scan reports, and a valid ID proof. For certain scans, you may need to come with a full bladder; our staff will advise you during booking."
          },
          {
            question: "Is parking available at the clinic?",
            answer: "Yes, free parking is available within the Nirala Estate Commercial Complex for all our patients."
          }
        ]}
      />
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
                   className="bg-card rounded-[2rem] border border-border shadow-xl p-6 md:p-12 transition-all duration-500"
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

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground font-semibold tracking-widest">{language === 'en' ? 'OR' : 'या'}</span>
                      </div>
                    </div>

                    <Button 
                      type="button"
                      onClick={() => window.open(buildUrl(), '_blank')}
                      className="w-full h-16 rounded-2xl text-lg font-bold transition-all bg-[#25D366] hover:bg-[#128C7E] text-white flex items-center justify-center gap-3 shadow-lg"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      {language === 'en' ? 'Book via WhatsApp' : 'WhatsApp पर बुक करें'}
                    </Button>
                  </form>
                </motion.div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-4 space-y-8 h-full">
                {/* Verified Trust Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-[2rem] border border-border p-6 shadow-lg flex flex-col items-center text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-500">
                    <ShieldCheck className="w-10 h-10" />
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-display font-bold text-xl text-foreground">
                    {language === 'en' ? 'Verified Patients' : 'सत्यापित मरीज'}
                  </h4>
                  <p className="text-muted-foreground text-sm mt-2 font-body leading-relaxed">
                    {language === 'en' 
                      ? 'Join 5,000+ happy families who trusted our expert ultrasound services.' 
                      : 'उन 5,000+ खुशहाल परिवारों में शामिल हों जिन्होंने हमारी विशेषज्ञ अल्ट्रासाउंड सेवाओं पर भरोसा किया।'}
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-[2rem] border border-border p-8 md:p-10 shadow-xl border-l-4 border-l-primary transition-all duration-500"
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
                        <a href="tel:+918287655133" className="text-foreground font-bold text-base hover:text-primary transition-colors block">
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
                  className="bg-primary/5 rounded-[2rem] p-8 border border-primary/20 relative overflow-hidden group shadow-lg"
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
                <div className="rounded-[2rem] bg-gradient-to-br from-primary/10 to-transparent p-1">
                  <div className="bg-card rounded-[2.4rem] p-8 text-center border border-border/50">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Patient Trust</p>
                    <div className="flex justify-center gap-1 mb-3">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
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
    <ContactContent />
  );
};

export default Contact;
