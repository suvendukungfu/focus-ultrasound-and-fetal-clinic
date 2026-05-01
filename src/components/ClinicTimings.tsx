import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClinicStatus } from '@/hooks/useClinicStatus';



const ClinicTimings = () => {
  const { language, t } = useLanguage();
  const { data: status } = useClinicStatus();

  const timings = [
    { dayKey: 'timings.monSat', time: t('timings.hours.monSat') },
    { dayKey: 'timings.sunday', time: t('timings.hours.sunday') },
  ];

  return (
    <section className="section-padding px-4 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-body font-medium mb-4">
            <Clock className="w-3.5 h-3.5" />
            {t('timings.badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            {t('timings.title')}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-clean overflow-hidden bg-card/50 backdrop-blur-xl border border-border/40"
        >
          {/* Dynamic Open indicator strip */}
          <div className={`${status === 'open' ? 'bg-primary/10' : 'bg-rose-500/10'} border-b border-border/40 px-5 py-3.5 flex items-center justify-center sm:justify-start gap-3`}>
            <div className="relative">
              <span className={`flex w-3 h-3 rounded-full ${status === 'open' ? 'bg-green-500' : 'bg-rose-500'}`} />
              {status === 'open' && (
                <span className="absolute inset-0 w-full h-full rounded-full bg-green-500 animate-ping opacity-75" />
              )}
            </div>
            <span className="text-sm font-display font-bold text-foreground tracking-tight">
              {status === 'open' ? t('timings.openWelcome') : t('timings.closedNotice')}
            </span>
          </div>

          <div className="p-5 md:p-8">
            <div className="space-y-3 md:space-y-4">
              {timings.map((row, i) => (
                <motion.div
                  key={row.dayKey}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  className={`flex items-center justify-between py-4 px-5 rounded-[1.25rem] ${i % 2 === 0 ? 'bg-primary/5' : 'bg-secondary/10'} border border-border/20`}
                >
                  <span className="font-display text-sm md:text-base font-bold text-foreground">
                    {t(row.dayKey)}
                  </span>
                  <span className="font-body text-xs md:text-sm font-semibold text-muted-foreground text-right">
                    {row.time}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a
                href="tel:+918287655133"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4"
              >
                <Phone className="w-4.5 h-4.5" />
                <span className="font-bold">{t('timings.call')}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicTimings;
