import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.culture'), href: '/culture' },
    { label: t('nav.facilities'), href: '/services' },
    { label: t('nav.reviews'), href: '/reviews' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const rawServices = t<string[]>('footer.services');
  const services = Array.isArray(rawServices) ? rawServices : [];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto py-12 md:py-16 px-6 md:px-10 pb-24 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-12 text-center md:text-left">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-3 mb-6 transition-transform hover:scale-[1.02]">
              <img 
                src="/images/clinic-logo-new.webp" 
                alt="Focus Ultrasound & Fetal Clinic" 
                className="h-12 object-contain"
              />
              <div className="flex flex-col justify-center text-left">
                <span className="font-display font-bold tracking-tight leading-none text-foreground text-xl">
                  Focus Ultrasound
                </span>
                <span className="text-primary/90 text-[11px] font-medium uppercase tracking-wider mt-0.5">
                  & Fetal Clinic
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6 max-w-sm">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/50">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/50">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 shadow-sm border border-border/50">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t('footer.navTitle')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t('footer.servicesTitle')}</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground font-body text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t('nav.contact')}</h4>
            <ul className="space-y-4 inline-block text-left">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+919870475400" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                  +91 98704 75400
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info.fufc@gmail.com" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                  info.fufc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-muted-foreground font-body text-sm">
                  <p>{t('timings.monSat')}: {t('timings.hours.monSat')}</p>
                  <p>{t('timings.sunday')}: {t('timings.hours.sunday')}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground font-body text-sm text-center md:text-left">
            © {new Date().getFullYear()} Focus Ultrasound & Fetal Clinic. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/admin" 
              className="px-4 py-2 rounded-xl bg-muted border border-border text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-md"
            >
              <Shield className="w-3.5 h-3.5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
              Clinic Administration
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
