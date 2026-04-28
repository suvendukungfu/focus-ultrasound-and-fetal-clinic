import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useClinicStatus } from '@/hooks/useClinicStatus';

const timings = [
  { dayEn: 'Mon – Sat', dayHi: 'सोम – शनि', time: '9:00 AM – 3:00 PM & 5:00 PM – 8:00 PM' },
  { dayEn: 'Sunday', dayHi: 'रविवार', time: '9:00 AM – 2:00 PM' },
];

const ClinicTimings = () => {
  const { language, t } = useLanguage();
  const { data: status } = useClinicStatus();

  return (
    <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
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
          className="glass-effect rounded-[2rem] border border-white/60 shadow-xl overflow-hidden bg-white/50 backdrop-blur-xl"
        >
          {/* Dynamic Open indicator strip */}
          <div className={`${status === 'open' ? 'bg-primary/5' : 'bg-rose-500/5'} border-b border-border px-6 py-3 flex items-center gap-2`}>
            <span className={`w-2.5 h-2.5 rounded-full ${status === 'open' ? 'bg-green-500 animate-pulse' : 'bg-rose-500'}`} />
            <span className="text-sm font-body font-medium text-foreground">
              {status === 'open' ? t('timings.openWelcome') : t('timings.closedNotice')}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-4">
              {timings.map((row, i) => (
                <motion.div
                  key={row.dayEn}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl ${i % 2 === 0 ? 'bg-secondary/30' : 'bg-secondary/10'}`}
                >
                  <span className="font-display text-base font-semibold text-foreground">
                    {language === 'en' ? row.dayEn : row.dayHi}
                  </span>
                  <span className="font-body text-sm text-muted-foreground">
                    {row.time}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-center">
              <a
                href="tel:+918287655133"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-body font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                {t('timings.call')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClinicTimings;
