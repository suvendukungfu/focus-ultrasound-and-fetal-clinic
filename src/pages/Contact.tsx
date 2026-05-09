import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
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
  Stethoscope, FileText, Info, ShieldCheck, Star,
  MessageCircle, X, CheckCircle2, ArrowRight
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

interface FAQ {
  question: string;
  answer: string;
}

interface AppointmentResult {
  whatsappUrl?: string;
  id?: string;
}

const Contact = () => {
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

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] = useState<AppointmentResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const appointmentDate = new Date(formData.preferredDate);
      if (formData.preferredTime) {
        const [hours, minutes] = formData.preferredTime.split(':');
        appointmentDate.setHours(parseInt(hours), parseInt(minutes));
      }

      const result = await createAppointment({
        name: formData.name,
        phone: formData.phone,
        service: formData.scanType || 'General Inquiry',
        date: appointmentDate.toISOString(),
        message: `
Age: ${formData.age}
Weight: ${formData.weight}
Medical Conditions: ${formData.medicalConditions}
Weeks of Pregnancy: ${formData.weeksOfPregnancy}
Doctor Preference: ${formData.doctorPreference}
Message: ${formData.message}
        `.trim(),
      });

      const whatsappUrl = buildUrl({
        name: formData.name,
        phone: formData.phone,
        service: formData.scanType,
        date: formData.preferredDate,
        time: formData.preferredTime,
        weeks: formData.weeksOfPregnancy
      });

      setSubmittedAppointment({ ...result, whatsappUrl: result.whatsappUrl || whatsappUrl });
      setShowSuccessModal(true);

      toast({
        title: t('contact.toastTitle'),
        description: t('contact.toastDesc'),
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
        title: t('contact.failTitle'),
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  const scanTypes = t<string[]>('contact.options.scans');
  const doctors = t<string[]>('contact.options.doctors');
  const faqData = t<FAQ[]>('contact.seo.faq');

  /* ── Shared input class ── */
  const inputCls = "h-12 rounded-xl bg-background border-border/40 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-sm placeholder:text-muted-foreground/60";

  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <SEO 
        title={t('contact.seo.title')}
        description={t('contact.seo.description')}
        faqData={faqData}
      />
      <Header />
      <main className="pt-20">
        <ContactHeroBanner />

        <section className="py-16 md:py-24 px-4 overflow-hidden relative">
          <BackgroundPattern />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-12 gap-10 items-start">

              {/* ═══════════════════════════════════════ */}
              {/* FORM SECTION — 8 cols                   */}
              {/* ═══════════════════════════════════════ */}
              <div className="lg:col-span-8">
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="bg-card rounded-3xl border border-border/60 shadow-xl shadow-black/[0.04] p-6 md:p-10 transition-all duration-500"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">

                    {/* ── Section 1: Patient Info ── */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-tight">
                            {t('contact.name').split(' ')[0]} {t('contact.details')}
                          </h3>
                          <p className="text-muted-foreground text-xs">{t('contact.knowBetter')}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.name')} *</label>
                          <Input name="name" value={formData.name} onChange={handleChange} required placeholder={t('contact.namePlaceholder')} className={inputCls} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.phone')} *</label>
                          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder={t('contact.phonePlaceholder')} className={inputCls} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.weeks')}</label>
                          <div className="relative">
                            <Input type="number" name="weeksOfPregnancy" value={formData.weeksOfPregnancy} onChange={handleChange} placeholder="e.g. 12" className={`${inputCls} pl-10`} />
                            <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.age')}</label>
                          <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder={t('contact.agePlaceholder')} className={inputCls} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.weight')}</label>
                          <Input type="number" name="weight" value={formData.weight || ''} onChange={handleChange} placeholder={t('contact.weightPlaceholder')} className={inputCls} />
                        </div>
                      </div>
                    </div>

                    {/* ── Section 2: Medical History ── */}
                    <div className="pt-6 border-t border-border/30">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-tight">
                            {t('contact.history')}
                          </h3>
                          <p className="text-muted-foreground text-xs">{t('contact.historySubtitle')}</p>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.priorConditions')}</label>
                        <Input name="medicalConditions" value={formData.medicalConditions || ''} onChange={handleChange} placeholder={t('contact.priorPlaceholder')} className={inputCls} />
                      </div>
                    </div>

                    {/* ── Section 3: Appointment Details ── */}
                    <div className="pt-6 border-t border-border/30">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center text-primary">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-foreground leading-tight">
                            {t('contact.infoTitle')}
                          </h3>
                          <p className="text-muted-foreground text-xs">{t('contact.subtitle')}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.scanType')} *</label>
                          <Select onValueChange={(v) => handleSelectChange('scanType', v)} required>
                            <SelectTrigger className="h-12 rounded-xl bg-background border-border/40 focus:ring-primary/10 transition-all text-sm">
                              <SelectValue placeholder={t('contact.scanPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border">
                              {scanTypes.map(type => (
                                <SelectItem key={type} value={type} className="rounded-lg py-2.5 text-sm">{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.doctor')}</label>
                          <Select onValueChange={(v) => handleSelectChange('doctorPreference', v)}>
                            <SelectTrigger className="h-12 rounded-xl bg-background border-border/40 focus:ring-primary/10 transition-all text-sm">
                              <SelectValue placeholder={t('contact.doctorPlaceholder')} />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border">
                              {doctors.map(doc => (
                                <SelectItem key={doc} value={doc} className="rounded-lg py-2.5 text-sm">{doc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.date')}</label>
                          <div className="relative">
                            <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className={`${inputCls} pl-10`} />
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-foreground/70 ml-0.5">{t('contact.time')}</label>
                          <div className="relative">
                            <Input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={`${inputCls} pl-10`} />
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Section 4: Notes ── */}
                    <div className="pt-6 border-t border-border/30">
                      <div className="space-y-1.5">
                        <label className="flex items-center gap-2 text-xs font-semibold text-foreground/70 ml-0.5 mb-3">
                          <FileText className="w-4 h-4 text-primary" />
                          {t('contact.message')}
                        </label>
                        <textarea 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          rows={4} 
                          placeholder={t('contact.messagePlaceholder')} 
                          className="w-full px-4 py-3.5 rounded-xl bg-background border border-border/40 focus:ring-2 focus:ring-primary/10 focus:border-primary hover:border-primary/40 transition-all duration-300 min-h-[120px] text-sm placeholder:text-muted-foreground/60" 
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-[1px] active:translate-y-[0] transition-all bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white group overflow-hidden relative">
                      {isSubmitting ? (
                        <span className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t('common.loading')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2.5 z-10 transition-all">
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          {t('contact.submit')}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>

                  </form>
                </motion.div>
              </div>

              {/* ═══════════════════════════════════════ */}
              {/* SIDEBAR — 4 cols                        */}
              {/* ═══════════════════════════════════════ */}
              <div className="lg:col-span-4 space-y-6 h-full">

                {/* ── Clinic Info Card ── */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-card rounded-2xl border border-border/60 p-7 shadow-lg"
                >
                  <h3 className="font-bold text-base text-foreground mb-6 flex items-center gap-2">
                    <Info className="w-4.5 h-4.5 text-primary" />
                    {t('contact.info')}
                  </h3>
                  <div className="space-y-5">
                    {/* Address */}
                    <div className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/6 flex items-center justify-center flex-shrink-0 text-primary">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-[11px] mb-0.5 uppercase tracking-wider text-muted-foreground">{t('contact.addressLabel')}</p>
                        <p className="text-foreground text-sm leading-relaxed">
                          {t('contact.sidebar.address')}
                        </p>
                      </div>
                    </div>
                    {/* Phone/Email */}
                    <div className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/6 flex items-center justify-center flex-shrink-0 text-primary">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-[11px] mb-0.5 uppercase tracking-wider text-muted-foreground">{t('contact.quickContact')}</p>
                        <a href="tel:+919870475400" className="text-foreground font-bold text-sm hover:text-primary transition-colors block">
                          +91 98704 75400
                        </a>
                        <a href="mailto:focusclinic2026@gmail.com" className="text-muted-foreground text-xs hover:text-primary transition-colors">
                          focusclinic2026@gmail.com
                        </a>
                      </div>
                    </div>
                    {/* Hours */}
                    <div className="flex gap-4">
                      <div className="w-9 h-9 rounded-lg bg-primary/6 flex items-center justify-center flex-shrink-0 text-primary">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[11px] mb-1.5 uppercase tracking-wider text-muted-foreground">{t('timings.badge')}</p>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between gap-3 py-1 border-b border-border/30">
                            <span className="text-muted-foreground">{language === 'en' ? 'Mon–Sat' : 'सोम-शनि'}</span>
                            <span className="text-foreground font-medium">9 AM – 3 PM</span>
                          </div>
                          <div className="flex justify-between gap-3 py-1 border-b border-border/30">
                            <span className="text-muted-foreground">{language === 'en' ? 'Evening' : 'शाम'}</span>
                            <span className="text-foreground font-medium">5 PM – 8 PM</span>
                          </div>
                          <div className="flex justify-between gap-3 py-1">
                            <span className="text-muted-foreground">{language === 'en' ? 'Sunday' : 'रविवार'}</span>
                            <span className="text-foreground font-medium">9 AM – 2 PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ── Trust Badge Card ── */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-card rounded-2xl border border-border/60 p-6 shadow-lg text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center text-primary mb-3 mx-auto">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div className="flex justify-center gap-0.5 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <h4 className="font-bold text-base text-foreground mb-1">
                    {t('contact.verified')}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {t('contact.verifiedDesc')}
                  </p>
                </motion.div>

                {/* ── Important Note ── */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-primary/4 rounded-2xl p-6 border border-primary/10 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 opacity-[0.06]">
                    <Baby className="w-20 h-20" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-2">
                      <Info className="w-4 h-4" />
                      {t('contact.note')}
                    </div>
                    <p className="text-foreground/70 text-xs leading-relaxed">
                      {t('contact.requiredNote')} {t('contact.anomalyNote')}
                    </p>
                  </div>
                </motion.div>
                
                {/* ── Rating Card ── */}
                <div className="rounded-2xl bg-gradient-to-br from-primary/8 to-transparent p-[1px]">
                  <div className="bg-card rounded-2xl p-6 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-2">{t('contact.sidebar.trustBadge')}</p>
                    <div className="flex justify-center gap-0.5 mb-2">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-foreground font-bold text-2xl">4.9/5</p>
                    <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">{t('contact.sidebar.trustRating')}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* ═══════ Success Modal ═══════ */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <motion.div 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-card w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden"
          >
            <div className="relative h-28 bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
              <div className="absolute top-3 right-3 text-white/40 hover:text-white cursor-pointer transition-colors" onClick={() => setShowSuccessModal(false)}>
                <X className="w-5 h-5" />
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/25 shadow-lg mt-14">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>
            
            <div className="px-7 pt-10 pb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t('contact.toastTitle')}
              </h2>
              <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
                {t('contact.toastDesc')}
              </p>
              
              <div className="flex flex-col gap-2.5">
                <Button 
                  onClick={() => window.open(submittedAppointment?.whatsappUrl, '_blank')}
                  className="w-full h-12 rounded-xl bg-[#25D366] hover:bg-[#20ba56] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/15 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  {t('contact.toastAction')}
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full h-12 rounded-xl font-semibold text-muted-foreground hover:text-foreground text-sm"
                >
                  {t('common.close') || 'Done'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Contact;
