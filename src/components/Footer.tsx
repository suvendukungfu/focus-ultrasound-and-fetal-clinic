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
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 md:py-16 px-6 md:px-10 pb-20 md:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-12">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
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
            <div className="flex items-center gap-4">
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

          {/* Combined Links Grid for Mobile - Desktop 2 columns */}
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 col-span-1 sm:col-span-2 lg:col-span-2">
            {/* Navigation */}
            <div className="text-left">
              <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t('footer.navTitle')}</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors font-body text-sm block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-left">
              <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t('footer.servicesTitle')}</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service}>
                    <span className="text-muted-foreground font-body text-sm block">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-left">
            <h4 className="font-display font-semibold text-lg mb-6 text-foreground">{t('nav.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-muted-foreground font-body text-sm leading-relaxed">
                  {t('footer.address')}
                </span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <a href="tel:+919870475400" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm font-medium">
                  +91 98704 75400
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <a href="mailto:info.fufc@gmail.com" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm font-medium">
                  info.fufc@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div className="text-muted-foreground font-body text-sm leading-tight">
                  <p className="mb-1 font-medium">{t('timings.monSat')}: <span className="text-foreground">{t('timings.hours.monSat')}</span></p>
                  <p className="font-medium">{t('timings.sunday')}: <span className="text-foreground">{t('timings.hours.sunday')}</span></p>
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
