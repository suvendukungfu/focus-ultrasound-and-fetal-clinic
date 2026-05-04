import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/hooks/use-theme';
import { Menu, X, Calendar, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClinicStatus from './ClinicStatus';
import BrandLogo from './BrandLogo';

/* ── Animated Sun/Moon toggle ── */
const ThemeToggle = ({ theme, toggle }: { theme: string; toggle: () => void }) => (
  <button
    onClick={toggle}
    aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    className="relative w-9 h-9 rounded-full bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center overflow-hidden"
  >
    <AnimatePresence mode="wait" initial={false}>
      {theme === 'dark' ? (
        <motion.svg
          key="moon"
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </motion.svg>
      ) : (
        <motion.svg
          key="sun"
          initial={{ rotate: 90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: -90, scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="w-4 h-4 text-amber-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </motion.svg>
      )}
    </AnimatePresence>
  </button>
);

const Header = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.culture', href: '/culture' },
    { key: 'nav.facilities', href: '/services' },
    { key: 'nav.reviews', href: '/reviews' },
    { key: 'nav.about', href: '/about' },
    { key: 'nav.contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'py-3 bg-white/70 dark:bg-black/60 backdrop-blur-md border-b border-black/[0.05] dark:border-white/[0.05] shadow-sm' 
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo Section - Aligned Far Left */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-4 group" aria-label="Focus Ultrasound & Fetal Clinic - Home">
              <div className="relative">
                <BrandLogo size="sm" />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-1 bg-primary/20 rounded-full blur-md -z-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black tracking-tighter leading-none text-slate-900 dark:text-white transition-colors duration-300">
                  FOCUS ULTRASOUND
                </span>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-60 text-primary">
                  & Fetal Clinic
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-2" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className={`relative px-5 py-2 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  isActive(item.href) ? 'text-primary' : 'text-slate-700 dark:text-slate-300 hover:text-primary'
                }`}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/5 rounded-full -z-10 border border-primary/10"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {t(item.key)}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Right Aligned */}
          <div className="flex-1 flex items-center justify-end gap-3">
            <div className="hidden xl:block">
              <ClinicStatus />
            </div>

            {/* Theme Toggle — Animated Sun/Moon */}
            <ThemeToggle theme={theme} toggle={toggleTheme} />

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              aria-label={`Switch language to ${language === 'en' ? 'Hindi' : 'English'}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300"
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-[10px] font-black text-slate-900 dark:text-white">
                {language.toUpperCase()}
              </span>
            </button>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden md:flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300"
              aria-label="Book appointment"
            >
              <Calendar className="w-4 h-4" />
              {t('nav.contact')}
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className={`lg:hidden p-2 rounded-full transition-colors ${isScrolled ? 'bg-black/5 dark:bg-white/10' : 'bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white'}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden mt-4 p-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-xl font-black uppercase tracking-[0.2em] py-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between group transition-all duration-300 ${
                      isActive(item.href) ? 'text-primary' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    <span>{t(item.key)}</span>
                    <motion.div
                      animate={isActive(item.href) ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                    >
                      <ArrowRight className="w-5 h-5 text-primary" />
                    </motion.div>
                  </Link>
                ))}
                
                {/* Mobile: Theme + Language row */}
                <div className="flex items-center gap-4 py-6 border-b border-black/5 dark:border-white/5">
                  <div className="flex-1 flex items-center gap-3">
                    <ThemeToggle theme={theme} toggle={toggleTheme} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Theme</span>
                  </div>
                  <button
                    onClick={toggleLanguage}
                    aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/10"
                  >
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-[10px] font-black text-slate-900 dark:text-white tracking-widest">{language.toUpperCase()}</span>
                  </button>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-8 flex items-center justify-center gap-4 bg-primary text-white py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] shadow-lg active:scale-95 transition-transform"
                >
                  <Calendar className="w-5 h-5" />
                  {t('nav.contact')}
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
