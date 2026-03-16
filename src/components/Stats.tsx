import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Calendar, Award, Globe } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '5000+',
    label: 'Happy Families',
    labelHi: 'खुश परिवार',
    color: 'text-medical-teal',
  },
  {
    icon: Award,
    value: '10+',
    label: 'Years of Trust',
    labelHi: 'विश्वास के वर्ष',
    color: 'text-medical-blue',
  },
  {
    icon: Calendar,
    value: '24/7',
    label: 'Support Access',
    labelHi: 'सहायता पहुंच',
    color: 'text-medical-teal',
  },
  {
    icon: Globe,
    value: 'Global Standards',
    label: 'FMF Certified',
    labelHi: 'एफएमएफ प्रमाणित',
    color: 'text-medical-blue',
  },
];

const Stats = () => {
  const { language } = useLanguage();

  return (
    <div className="py-12 md:py-16 bg-white/50 backdrop-blur-md border-y border-slate-100 relative z-10">
      <div className="container-narrow mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-medical-soft flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="font-display text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {stat.value}
              </span>
              <span className="text-slate-500 text-xs md:text-sm font-semibold uppercase tracking-widest">
                {language === 'en' ? stat.label : stat.labelHi}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
