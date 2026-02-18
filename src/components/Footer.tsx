import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import clinicLogo from '@/assets/clinic-logo.jpg';

const Footer = () => {
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.facilities'), href: '/services' },
    { label: t('nav.reviews'), href: '/reviews' },
    { label: t('nav.culture'), href: '/culture' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const services = [
    '3D/4D Ultrasound',
    'Fetal Echo',
    'Digital X-Ray',
    'ECG',
    'Lab Tests',
    'Fetal Medicine',
  ];

  return (
    <footer className="bg-primary/5 text-foreground border-t border-primary/10">
      <div className="container-narrow mx-auto section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                <img src={clinicLogo} alt="Focus Ultrasound" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-lg">Focus Ultrasound</h3>
                <p className="text-muted-foreground text-xs">& Fetal Clinic</p>
              </div>
            </div>
            <p className="text-muted-foreground font-body text-sm leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Navigation</h4>
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
            <h4 className="font-display font-semibold text-lg mb-4">Services</h4>
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
            <h4 className="font-display font-semibold text-lg mb-4">{t('nav.contact')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground font-body text-sm">
                  Shop No. 05 & 06, UGF,<br />
                  Nirala Estate, Noida Extension,<br />
                  Greater Noida West - 201306
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+919870475400" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                  +91 98704 75400
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info.fufc@gmail.com" className="text-muted-foreground hover:text-primary transition-colors font-body text-sm">
                  info.fufc@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground font-body text-sm">
                  Mon - Sat: 9:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/10 text-center">
          <p className="text-muted-foreground font-body text-sm">
            © {new Date().getFullYear()} Focus Ultrasound and Fetal Clinic. {t('footer.rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
