import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, CheckCircle, Shield, Star, Users, Award } from 'lucide-react';

const Stats = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '10+', label: t('stats.experience'), icon: Award },
    { value: '5000+', label: t('stats.patients'), icon: Users },
    { value: '4.9', label: t('stats.rating'), icon: Star },
    { value: '24hrs', label: t('stats.reports'), icon: Clock },
    { value: '99%', label: t('stats.accuracy'), icon: CheckCircle },
    { value: '100%', label: t('stats.hygiene'), icon: Shield },
  ];

  return (
    <div className="relative z-10 container-narrow mx-auto px-4 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="stat-card animate-fade-up"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
            <div className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-xs md:text-sm font-body">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
