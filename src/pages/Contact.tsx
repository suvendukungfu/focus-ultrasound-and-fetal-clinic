import { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackgroundPattern from '@/components/BackgroundPattern';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactContent = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', age: '', weight: '',
    symptoms: '', medicalHistory: '', message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Appointment Request Submitted!",
      description: "We'll contact you within 24 hours to confirm your appointment.",
    });
    setFormData({ name: '', phone: '', email: '', age: '', weight: '', symptoms: '', medicalHistory: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <section className="relative section-padding pb-8">
          <BackgroundPattern />
          <div className="relative z-10 container-narrow mx-auto text-center">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-body font-medium mb-4 animate-fade-up">
              Get in Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {t('contact.title')}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {t('contact.subtitle')}
            </p>
          </div>
        </section>

        <section className="section-padding pt-8">
          <div className="container-narrow mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="card-clean animate-fade-up">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-body font-medium text-foreground mb-2">{t('contact.name')} *</label>
                      <Input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" className="bg-background" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-foreground mb-2">{t('contact.phone')} *</label>
                      <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98704 75400" className="bg-background" />
                    </div>
                    <div>
                      <label className="block font-body font-medium text-foreground mb-2">{t('contact.email')} *</label>
                      <Input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="john@example.com" className="bg-background" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body font-medium text-foreground mb-2">{t('contact.age')}</label>
                        <Input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="30" className="bg-background" />
                      </div>
                      <div>
                        <label className="block font-body font-medium text-foreground mb-2">{t('contact.weight')}</label>
                        <Input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="65" className="bg-background" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-body font-medium text-foreground mb-2">{t('contact.symptoms')} *</label>
                      <textarea name="symptoms" value={formData.symptoms} onChange={handleChange} required rows={3} placeholder="Please describe your symptoms or the reason for your visit..." className="w-full px-3 py-2 rounded-md border border-input bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-body font-medium text-foreground mb-2">{t('contact.medical')}</label>
                      <textarea name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} rows={2} placeholder={t('contact.medicalPlaceholder')} className="w-full px-3 py-2 rounded-md border border-input bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block font-body font-medium text-foreground mb-2">{t('contact.message')}</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder="Any additional information you'd like to share..." className="w-full px-3 py-2 rounded-md border border-input bg-background text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" />
                    </div>
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full mt-6 btn-primary">
                    {isSubmitting ? 'Submitting...' : (<><Send className="w-4 h-4 mr-2" />{t('contact.submit')}</>)}
                  </Button>
                </form>
              </div>

              <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                <div className="card-clean">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-body text-sm">
                        Shop No. 05 & 06, UGF,<br />Nirala Estate, Noida Extension,<br />Greater Noida West - 201306
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary" />
                      <a href="tel:+919870475400" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">+91 98704 75400</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <a href="mailto:info.fufc@gmail.com" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">info.fufc@gmail.com</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-muted-foreground font-body text-sm">Mon - Sat: 9:00 AM - 8:00 PM</span>
                    </li>
                  </ul>
                </div>
                <div className="card-clean h-80 p-0 overflow-hidden relative group">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.4396289761557!2d77.4398322!3d28.586585300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef9b638e2207%3A0xca82e787d7e4cfbb!2sFocus%20Ultrasound%20and%20Fetal%20Clinic%E2%94%82Digital%20X-RAY%E2%94%82ECG%E2%94%823D%204D%20Pregnancy%20Ultrasound%E2%94%82Fetal%20Echo%E2%94%82Lab%20Tests%E2%94%82Fetal%20Medicine!5e0!3m2!1sen!2sin!4v1771586072762!5m2!1sen!2sin"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Focus Ultrasound and Fetal Clinic Location"
                    className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  ></iframe>
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
