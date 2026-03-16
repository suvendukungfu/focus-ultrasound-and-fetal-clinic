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
      title: "Appointment Request Submitted!",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
    setFormData({ 
      name: '', phone: '', email: '', age: '', 
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
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="relative py-16 md:py-24 bg-primary/5 overflow-hidden">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto px-4 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6"
            >
              {language === 'en' ? 'Book Your Visit' : 'अपनी मुलाक़ात बुक करें'}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-body text-lg md:text-xl max-w-2xl mx-auto"
            >
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container-narrow mx-auto">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Form Section */}
              <div className="lg:col-span-8">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-[3rem] border border-border shadow-elevated p-8 md:p-12"
                >
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Patient Information */}
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-6">
                        <User className="w-5 h-5 text-primary" />
                        Patient Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.name')} *</label>
                          <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="h-12 rounded-xl bg-secondary/30 border-none focus:ring-2 focus:ring-primary" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.phone')} *</label>
                          <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Contact Number" className="h-12 rounded-xl bg-secondary/30 border-none" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">Weeks of Pregnancy</label>
                          <div className="relative">
                            <Input type="number" name="weeksOfPregnancy" value={formData.weeksOfPregnancy} onChange={handleChange} placeholder="e.g. 12" className="h-12 rounded-xl bg-secondary/30 border-none pl-10" />
                            <Baby className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">{t('contact.age')}</label>
                          <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="h-12 rounded-xl bg-secondary/30 border-none" />
                        </div>
                      </div>
                    </div>

                    {/* Appointment Details */}
                    <div className="pt-8 border-t border-border/50">
                      <h3 className="flex items-center gap-2 font-display text-xl font-bold text-foreground mb-6">
                        <Stethoscope className="w-5 h-5 text-primary" />
                        Scan & Appointment Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">Select Scan Type *</label>
                          <Select onValueChange={(v) => handleSelectChange('scanType', v)} required>
                            <SelectTrigger className="h-12 rounded-xl bg-secondary/30 border-none">
                              <SelectValue placeholder="Choose a scan type" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border">
                              {scanTypes.map(type => (
                                <SelectItem key={type} value={type} className="rounded-lg">{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">Preferred Doctor</label>
                          <Select onValueChange={(v) => handleSelectChange('doctorPreference', v)}>
                            <SelectTrigger className="h-12 rounded-xl bg-secondary/30 border-none">
                              <SelectValue placeholder="Select doctor preference" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border">
                              {doctors.map(doc => (
                                <SelectItem key={doc} value={doc} className="rounded-lg">{doc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">Preferred Date</label>
                          <div className="relative">
                            <Input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className="h-12 rounded-xl bg-secondary/30 border-none pl-10" />
                            <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-foreground/80 ml-1">Preferred Time</label>
                          <div className="relative">
                            <Input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className="h-12 rounded-xl bg-secondary/30 border-none pl-10" />
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="pt-8 border-t border-border/50">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-foreground/80 ml-1">
                          <FileText className="w-4 h-4 text-primary" />
                          {t('contact.message')}
                        </label>
                        <textarea 
                          name="message" 
                          value={formData.message} 
                          onChange={handleChange} 
                          rows={4} 
                          placeholder="Please share any specific symptoms, previous history, or questions..." 
                          className="w-full px-4 py-3 rounded-2xl bg-secondary/30 border-none focus:ring-2 focus:ring-primary transition-all duration-300 min-h-[120px]" 
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={isSubmitting} className="w-full py-7 rounded-2xl text-lg font-bold shadow-glow hover:scale-[1.01] active:scale-[0.99] transition-all">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Confirming Request...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-5 h-5" />
                          {t('contact.submit')}
                        </span>
                      )}
                    </Button>
                  </form>
                </motion.div>
              </div>

              {/* Info Sidebar */}
              <div className="lg:col-span-4 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card rounded-[2.5rem] border border-border p-8 shadow-soft"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">Clinic Information</h3>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed pt-1">
                        Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension, Greater Noida West - 201306
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <a href="tel:+919870475400" className="text-foreground font-bold text-sm leading-relaxed pt-2 hover:text-primary transition-colors">
                        +91 98704 75400
                      </a>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div className="text-muted-foreground font-body text-sm leading-relaxed pt-1">
                        <p className="text-foreground font-semibold mb-1">Modern Timings</p>
                        <p>Mon–Sat: 9 AM – 3 PM</p>
                        <p className="mb-2">& 5 PM – 8 PM</p>
                        <p>Sun: 9 AM – 2 PM</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-accent/5 rounded-[2.5rem] p-8 border border-accent/10"
                >
                  <div className="flex items-center gap-2 text-accent font-bold mb-4">
                    <Info className="w-5 h-5" />
                    Important Note
                  </div>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    Please bring your previous scan reports (if any) and doctor's prescription for the scan. For Anomaly Scans, we recommend having a light snack before the appointment.
                  </p>
                </motion.div>
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
