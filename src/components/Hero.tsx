import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Phone, ArrowRight } from 'lucide-react';
import BackgroundPattern from './BackgroundPattern';
import Stats from './Stats';

const Hero = () => {
  const { t } = useLanguage();

  const services = ['3D/4D Ultrasound', 'Fetal Echo', 'Digital X-Ray', 'ECG', 'Lab Tests', 'Fetal Medicine'];

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      <BackgroundPattern />
      
      <div className="relative z-10 container-narrow mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-foreground/80 text-sm font-body">{t('hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t('hero.title')}{' '}
            <span className="text-highlight">{t('hero.titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-lg md:text-xl font-body leading-relaxed mb-8 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* Services Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {services.map((service) => (
              <span
                key={service}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-body border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-glow cursor-default"
              >
                {service}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 btn-primary text-lg"
            >
              <Calendar className="w-5 h-5" />
              {t('hero.book')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+919870475400"
              className="inline-flex items-center justify-center gap-2 btn-secondary text-lg"
            >
              <Phone className="w-5 h-5" />
              {t('hero.call')}
            </a>
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
};

export default Hero;
