import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';
import { services, categoryMeta, ServiceCategory } from '@/config/services';

const ServicesPreview = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7 }
    },
  };

  // Group services by category preserving config order
  const grouped = Object.entries(categoryMeta)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([key, meta]) => ({
      key: key as ServiceCategory,
      label: meta.label,
      color: meta.color,
      items: services.filter(s => s.category === key),
    }))
    .filter(g => g.items.length > 0);

  return (
    <section className="relative section-padding overflow-hidden bg-background" id="services">
      {/* Immersive Background Depth */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none opacity-40" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-medical-teal/5 rounded-full blur-[150px] -ml-96 -mb-96 pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Cinematic Header */}
        <div className="text-center mb-16 md:mb-32">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-6 md:px-8 py-2 md:py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] mb-6 md:mb-10 shadow-soft"
          >
            {t('services.expertise')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-8xl font-black text-foreground mb-8 md:mb-10 leading-[1.1] md:leading-none tracking-tighter"
          >
            {t('services.advDiagnostics')}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
            className="w-24 md:w-32 h-1.5 md:h-2 bg-gradient-to-r from-primary/50 to-transparent mx-auto rounded-full"
          />
        </div>

        {/* Category-Grouped Services */}
        <div className="space-y-20 md:space-y-28">
          {grouped.map((group, groupIdx) => (
            <div key={group.key}>
              {/* Category Header */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
                className="flex items-center gap-4 md:gap-6 mb-10 md:mb-14"
              >
                {/* Colored accent bar */}
                <div
                  className="w-1.5 md:w-2 h-12 md:h-16 rounded-full shrink-0"
                  style={{ backgroundColor: group.color }}
                />
                <div>
                  <span
                    className="inline-block text-[10px] md:text-xs font-black uppercase tracking-[0.35em] mb-1.5 px-3 py-1 rounded-full border"
                    style={{
                      color: group.color,
                      backgroundColor: `${group.color}10`,
                      borderColor: `${group.color}25`,
                    }}
                  >
                    {String(groupIdx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-foreground">
                    {t(`services.category.${group.key}`)}
                  </h3>
                </div>
              </motion.div>

              {/* Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: '-20px' }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-14"
              >
                {group.items.map((service) => (
                  <motion.div
                    key={service.nameKey}
                    variants={itemVariants}
                    className="group relative flex flex-col rounded-[2.5rem] md:rounded-[3.5rem] bg-card border border-border shadow-elevated hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 md:hover:-translate-y-3 overflow-hidden"
                  >
                    {/* Immersive Image Section */}
                    <div className="relative h-60 sm:h-72 overflow-hidden bg-secondary/10 flex items-center justify-center">
                      <img loading="lazy"
                        src={service.image}
                        alt={t(service.nameKey)}
                        className="w-full h-full object-cover transition-transform [transition-duration:2000ms] ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-700" />
                      
                      {/* Tech Badge */}
                      <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-4 z-20">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-xl border border-white shadow-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                          <service.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={1.5} />
                        </div>
                      </div>
                      
                      {/* Clinical Label */}
                      <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
                        <span className={`inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[8px] md:text-[9px] font-black tracking-widest uppercase backdrop-blur-xl border shadow-2xl transition-all duration-500 group-hover:bg-primary group-hover:text-white ${
                          service.machineType === 'PRIMARY' 
                            ? 'bg-primary/10 border-primary/20 text-primary' 
                            : 'bg-card/80 border-border text-muted-foreground'
                        }`}>
                          {service.machine}
                        </span>
                      </div>

                      {/* Category Color Stripe */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ backgroundColor: group.color }}
                      />
                    </div>

                    {/* Refined Content */}
                    <div className="p-6 md:p-10 pt-2 flex flex-col flex-1 relative z-10">
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 group-hover:text-primary transition-colors duration-500 leading-tight tracking-tight">
                        {t(service.nameKey)}
                      </h3>
                      
                      <p className="text-muted-foreground font-body text-sm md:text-base leading-relaxed flex-grow mb-8 md:mb-10 font-light">
                        {t(service.descKey)}
                      </p>
                      
                      {/* Interactive CTA */}
                      <Link
                        to="/contact"
                        aria-label={`${t('services.bookScan')} for ${t(service.nameKey)}`}
                        className="mt-auto group/btn relative flex items-center justify-between w-full px-6 md:px-8 py-4 md:py-5 rounded-2xl md:rounded-[2rem] bg-muted border border-border text-foreground font-black text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] overflow-hidden transition-all duration-500 hover:text-white"
                      >
                        <div className="absolute inset-0 bg-primary translate-y-full group-hover/btn:translate-y-0 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] transition-transform duration-500" />
                        <span className="relative z-10">{t('services.bookScan')}</span>
                        <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-2" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16 md:mt-24"
        >
          <Link
            to="/contact"
            className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4"
          >
            <span className="font-bold">{t('services.exploreSpecialized')}</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;
