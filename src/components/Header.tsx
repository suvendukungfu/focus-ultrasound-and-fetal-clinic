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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    
    if (isMenuOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { key: 'nav.home', href: '/' },
    { key: 'nav.culture', href: '/culture' },
    { key: 'nav.facilities', href: '/services' },
    { key: 'nav.reviews', href: '/reviews' },
    { key: 'nav.about', href: '/about' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'py-2 lg:py-3 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-black/5 dark:border-white/5 shadow-sm shadow-black/5' 
          : 'py-4 lg:py-6 bg-gradient-to-b from-white/60 to-transparent dark:from-slate-950/60 dark:to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Logo Section - Aligned Far Left */}
          <div className="flex-shrink-0 flex justify-start items-center z-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 md:gap-5 group" aria-label="Focus Ultrasound & Fetal Clinic - Home">
              <div className="relative transform md:scale-125 origin-left group-hover:scale-[1.3] transition-transform duration-500 ease-out">
                <BrandLogo size="sm" />
              </div>
              <div className="flex flex-col ml-0 sm:ml-1 md:ml-3">
                <span className="text-sm sm:text-lg md:text-[22px] font-display font-black tracking-tight leading-none text-slate-900 dark:text-white transition-colors duration-300">
                  {language === 'en' ? 'FOCUS ULTRASOUND' : 'फोकस अल्ट्रासाउंड'}
                </span>
                <span className="text-[8px] sm:text-[10px] md:text-xs font-black uppercase tracking-[0.25em] text-primary mt-0.5 sm:mt-1 opacity-90">
                  {language === 'en' ? '& Fetal Clinic' : '& फीटल क्लिनिक'}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Spacious & Centered */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-2 xl:gap-4 z-10" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`group relative px-4 xl:px-6 py-2.5 text-[11px] xl:text-xs font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
                  isActive(item.href) ? 'text-primary' : 'text-slate-600 dark:text-slate-300 hover:text-primary'
                }`}
              >
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-full -z-10 border border-primary/10 dark:border-primary/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{t(item.key)}</span>
                {!isActive(item.href) && (
                  <span className="absolute inset-x-5 bottom-1 h-[2px] bg-primary/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Clean & Spacious */}
          <div className="flex items-center justify-end gap-3 lg:gap-4 z-20 flex-shrink-0">
            <div className="hidden xl:block">
              <ClinicStatus />
            </div>

            {/* Utility Pill — Theme + Language grouped together */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
              <ThemeToggle theme={theme} toggle={toggleTheme} />
              <div className="w-px h-5 bg-slate-300/50 dark:bg-white/10" />
              <button
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'en' ? 'Hindi' : 'English'}`}
                className="relative w-9 h-9 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 flex items-center justify-center overflow-hidden text-primary"
                title={language === 'en' ? 'Switch to Hindi' : 'Switch to English'}
              >
                <Globe className="w-4 h-4" />
              </button>
            </div>

            {/* CTA Button */}
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-2.5 bg-primary text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-full text-[11px] xl:text-xs font-bold uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              aria-label="Book appointment"
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden md:inline">{t('nav.contact')}</span>
              <span className="md:hidden">Book</span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className={`lg:hidden p-2.5 rounded-full transition-all duration-300 active:scale-90 ${
                isScrolled 
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700' 
                  : 'bg-black/5 dark:bg-white/10 text-slate-900 dark:text-white hover:bg-black/10 dark:hover:bg-white/20'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-2 overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              id="mobile-menu"
            >
              <div className="p-5 md:p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[1.5rem] md:rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl flex flex-col gap-0.5 md:gap-2 max-h-[85dvh] overflow-y-auto">
                {navItems.map((item, idx) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                      className={`text-lg sm:text-xl md:text-2xl font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] py-3 sm:py-4 md:py-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between group transition-all duration-300 ${
                        isActive(item.href) ? 'text-primary' : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      <span>{t(item.key)}</span>
                      <motion.div
                        animate={isActive(item.href) ? { x: 0, opacity: 1 } : { x: -10, opacity: 0 }}
                      >
                        <ArrowRight className="w-6 h-6 text-primary" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                
                {/* Mobile: Theme + Language row */}
                <div className="flex items-center gap-3 py-5 sm:py-8">
                  <div className="flex-1 flex items-center gap-3">
                    <div className="p-1 rounded-full bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10">
                      <ThemeToggle theme={theme} toggle={toggleTheme} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500">Theme</span>
                  </div>
                  <button
                    onClick={toggleLanguage}
                    aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
                    className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/10 active:scale-95 transition-transform"
                  >
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-900 dark:text-white tracking-widest">{language.toUpperCase()}</span>
                  </button>
                </div>

                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex items-center justify-center gap-3 bg-primary text-white py-4 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-glow active:scale-95 transition-transform"
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
