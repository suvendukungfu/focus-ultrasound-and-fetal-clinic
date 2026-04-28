import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useClinicStatus, Status } from '@/hooks/useClinicStatus';

const ClinicStatus = () => {
  const { t } = useLanguage();
  const { data: status, isLoading } = useClinicStatus();

  if (isLoading) return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-slate-100 animate-pulse">
      <div className="w-2 h-2 rounded-full bg-slate-300" />
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Loading...</span>
    </div>
  );

  const statusConfig = {
    open: { color: 'bg-emerald-500', text: 'common.open', bg: 'bg-emerald-50' },
    busy: { color: 'bg-amber-500', text: 'common.busy', bg: 'bg-amber-50' },
    closed: { color: 'bg-rose-500', text: 'common.closed', bg: 'bg-rose-50' },
  };

  const current = statusConfig[status || 'open'];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${current.bg} border border-white/50 shadow-sm`}
    >
      <div className={`relative flex h-2 w-2`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.color} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.color}`}></span>
      </div>
      <span className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">
        {t(current.text)}
      </span>
    </motion.div>
  );
};

export default ClinicStatus;
