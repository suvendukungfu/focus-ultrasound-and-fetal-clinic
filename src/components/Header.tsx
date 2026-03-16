import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { Menu, X, Moon, Sun, Calendar } from 'lucide-react';
const clinicLogo = '/images/clinic-logo-new.png';

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
            <div className="w-10 h-10 rounded-full overflow-hidden border border-border transition-transform duration-300 group-hover:scale-105">
              <img src={clinicLogo} alt="Focus Ultrasound and Fetal Clinic" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-display font-semibold text-foreground text-sm md:text-base leading-tight glow-text">
                Focus Ultrasound
              </h1>
              <p className="text-muted-foreground text-xs">& Fetal Clinic</p>
            </div>
          </Link>

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
