import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Monitor, ArrowRight } from 'lucide-react';

const equipmentData = [
  {
    nameKey: 'equipment.samsung.name',
    image: '/images/clinic-samsung-v7.webp',
    descKey: 'equipment.samsung.desc',
    featureKeys: ['equipment.samsung.feat1', 'equipment.samsung.feat2', 'equipment.samsung.feat3'],
    color: 'primary',
    learnMoreUrl: '/services',
  },
  {
    nameKey: 'equipment.ge.name',
    image: '/images/ge-voluson-e8-real.webp',
    descKey: 'equipment.ge.desc',
    featureKeys: ['equipment.ge.feat1', 'equipment.ge.feat2', 'equipment.ge.feat3'],
    color: 'accent',
    learnMoreUrl: '/about#certifications',
  },
];

const EquipmentSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-32 bg-secondary/5">
      <div className="container-narrow mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-4">
            {t('equipment.badge')}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {t('equipment.title')}
          </h2>
          <div className="w-16 md:w-20 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Equipment Cards */}
        <div className="flex flex-col gap-10 md:gap-20 max-w-5xl mx-auto">
          {equipmentData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.nameKey}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`card-clean overflow-hidden flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 md:gap-12 group p-5 md:p-10 bg-card backdrop-blur-xl border border-border/50`}
              >
                {/* Image Column */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="relative w-full aspect-[4/3] rounded-2xl md:rounded-[1.5rem] overflow-hidden border border-border shadow-elevated bg-card p-4 transition-transform duration-700 group-hover:scale-[1.02]">
                    <img
                      src={item.image}
                      alt={t(item.nameKey)}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`w-full lg:w-1/2 flex flex-col items-center lg:items-start ${isEven ? 'lg:text-left' : 'lg:text-right lg:items-end'}`}>
                  <div className={`flex flex-col sm:flex-row items-center gap-4 mb-6 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Monitor className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <h3 className="font-display text-xl md:text-3xl font-bold text-foreground leading-tight text-center lg:text-left">
                      {t(item.nameKey)}
                    </h3>
                  </div>
                  
                  <p className={`text-muted-foreground font-body text-sm md:text-base leading-relaxed mb-8 text-center lg:text-left ${isEven ? '' : 'lg:mr-0 lg:ml-auto max-w-md'}`}>
                    {t(item.descKey)}
                  </p>
                  
                  <ul className="space-y-3 mb-8 w-full">
                    {item.featureKeys.map((featureKey, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm md:text-base font-body text-foreground/80 justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                        {isEven && <div className="hidden lg:block w-2 h-2 rounded-full bg-primary" />}
                        <div className="lg:hidden w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="flex-1 md:flex-none text-center lg:text-left">{t(featureKey)}</span>
                        {!isEven && <div className="hidden lg:block w-2 h-2 rounded-full bg-primary" />}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={item.learnMoreUrl}
                    className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3"
                  >
                    <span className="font-bold">{t('common.learnMore')}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EquipmentSection;
