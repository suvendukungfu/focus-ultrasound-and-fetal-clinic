import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { Menu, X, Moon, Sun, Calendar } from 'lucide-react';
import ClinicStatus from './ClinicStatus';
import BrandLogo from './BrandLogo';

const Header = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.facilities', href: '/services' },
    { key: 'nav.reviews', href: '/reviews' },
    { key: 'nav.culture', href: '/culture' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
      <div className="container-narrow mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <BrandLogo size="sm" />
            <div className="hidden sm:block">
              <div className="font-display font-semibold text-foreground text-sm md:text-base leading-tight glow-text">
                Focus Ultrasound
              </div>
              <p className="text-muted-foreground text-xs">& Fetal Clinic</p>
            </div>
          </Link>

          <div className="hidden xl:block ml-4">
            <ClinicStatus />
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`nav-link text-sm font-body ${isActive(item.href) ? 'active' : ''}`}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Book Appointment CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center gap-1.5 px-6 py-2.5 rounded-2xl bg-medical-teal text-white text-sm font-semibold hover:bg-medical-teal/90 transition-all duration-300 shadow-sm hover:shadow-glow transform hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </Link>
            <a
              href="https://wa.me/918287655133"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex p-2.5 rounded-xl bg-green-500 text-white hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-glow transform hover:-translate-y-0.5"
              aria-label="Contact via WhatsApp"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .015 5.398.01 12.038c0 2.123.554 4.197 1.608 6.06L0 24l6.096-1.599a11.822 11.822 0 005.949 1.599h.005c6.636 0 12.036-5.399 12.041-12.04a11.782 11.782 0 00-3.48-8.514z"/>
              </svg>
            </a>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Toggle - Segmented Control UX */}
            <div className="flex items-center p-1 bg-slate-100/50 rounded-2xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`flex items-center justify-center w-10 md:w-12 h-8 rounded-xl text-xs font-bold transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-white text-medical-teal shadow-soft border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => language !== 'hi' && toggleLanguage()}
                className={`flex items-center justify-center w-10 md:w-12 h-8 rounded-xl text-sm font-bold transition-all duration-300 ${
                  language === 'hi' 
                    ? 'bg-white text-medical-teal shadow-soft border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                हि
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-body font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-all duration-300"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
