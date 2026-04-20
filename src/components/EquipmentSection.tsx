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
    image: '/images/ge-voluson-e8.webp',
    descKey: 'equipment.ge.desc',
    featureKeys: ['equipment.ge.feat1', 'equipment.ge.feat2', 'equipment.ge.feat3'],
    color: 'accent',
    learnMoreUrl: '/about#certifications',
  },
];

const EquipmentSection = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-secondary/5">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-body font-medium mb-4 uppercase tracking-widest">
            {t('equipment.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('equipment.title')}
          </h2>
          <div className="w-16 h-1.5 bg-primary/30 mx-auto rounded-full" />
        </motion.div>

        {/* Equipment Cards */}
        <div className="flex flex-col gap-12 md:gap-20 max-w-5xl mx-auto">
          {equipmentData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={item.nameKey}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`card-clean overflow-hidden flex flex-col ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center gap-8 md:gap-12 group p-6 md:p-10 bg-card backdrop-blur-xl`}
              >
                {/* Image Column */}
                <div className="w-full md:w-1/2 flex justify-center">
                  <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden border border-border shadow-elevated bg-card p-4 transition-transform duration-700 group-hover:scale-[1.02]">
                    <img
                      src={item.image}
                      alt={t(item.nameKey)}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'text-left md:items-start' : 'text-left md:text-right md:items-end'}`}>
                  <div className={`flex items-center gap-4 mb-6 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <Monitor className="w-7 h-7" />
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight">
                      {t(item.nameKey)}
                    </h3>
                  </div>
                  
                  <p className={`text-muted-foreground font-body text-base md:text-lg leading-relaxed mb-8 ${isEven ? '' : 'md:mr-0 md:ml-auto max-w-md'}`}>
                    {t(item.descKey)}
                  </p>
                  
                  <ul className="space-y-3 mb-8 w-full">
                    {item.featureKeys.map((featureKey, i) => (
                      <li key={i} className={`flex items-center gap-3 text-base font-body text-foreground/80 ${isEven ? 'justify-start' : 'justify-start md:justify-end'}`}>
                        {isEven && <div className="w-2 h-2 rounded-full bg-primary" />}
                        <span className="flex-1 md:flex-none">{t(featureKey)}</span>
                        {!isEven && <div className="hidden md:block w-2 h-2 rounded-full bg-primary" />}
                        {!isEven && <div className="md:hidden w-2 h-2 rounded-full bg-primary" />}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={item.learnMoreUrl}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    {t('common.learnMore')}
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
