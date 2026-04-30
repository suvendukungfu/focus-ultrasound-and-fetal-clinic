import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useClinicStatus } from '@/hooks/useClinicStatus';

const ClinicStatus = () => {
  const { t } = useLanguage();
  const { data: status, isLoading } = useClinicStatus();

  if (isLoading) return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 animate-pulse border border-border/50">
      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20" />
      <span className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t('common.loading')}</span>
    </div>
  );

  const statusConfig = {
    open: { 
      color: 'bg-emerald-500', 
      text: 'common.open', 
      container: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
    },
    busy: { 
      color: 'bg-amber-500', 
      text: 'common.busy', 
      container: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' 
    },
    closed: { 
      color: 'bg-rose-500', 
      text: 'common.closed', 
      container: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' 
    },
  };

  const current = statusConfig[status || 'open'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: -5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${current.container} border shadow-sm backdrop-blur-md`}
    >
      <div className="relative flex h-1.5 w-1.5">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.color} opacity-40`}></span>
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${current.color}`}></span>
      </div>
      <span className="text-[9px] font-black uppercase tracking-[0.15em]">
        {t(current.text)}
      </span>
    </motion.div>
  );
};

export default ClinicStatus;
