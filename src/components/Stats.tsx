import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Award, Activity } from 'lucide-react';

const AnimatedCounter = ({ value, duration = 2500, suffix = '+' }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let animationFrame: number;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // easeOutQuart for premium deceleration
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeProgress * value));

            if (progress < 1) {
              animationFrame = requestAnimationFrame(animate);
            }
          };

          animationFrame = requestAnimationFrame(animate);
          
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
  {
    icon: Users,
    value: 1000,
    label: 'Families Served',
    labelHi: 'परिवारों की सेवा की',
    color: 'text-medical-teal',
    bg: 'bg-medical-teal/10',
    border: 'border-medical-teal/20'
  },
  {
    icon: Award,
    value: 5,
    label: 'Years of Trust',
    labelHi: 'विश्वास के वर्ष',
    color: 'text-medical-blue',
    bg: 'bg-medical-blue/10',
    border: 'border-medical-blue/20'
  },
  {
    icon: Activity,
    value: 5000,
    label: 'Scans Completed',
    labelHi: 'स्कैन पूरे हुए',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20'
  },
];

const Stats = () => {
  const { language } = useLanguage();

  return (
    <div className="py-16 md:py-24 relative z-10">
      <div className="container-narrow mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              className="glass-effect relative overflow-hidden rounded-[2rem] p-8 border border-white/60 shadow-soft flex flex-col items-center text-center transition-all duration-300 hover:shadow-elevated bg-white/40"
            >
              {/* Soft Gradient Blob Background for Premium Look */}
              <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[60px] ${stat.bg} opacity-60`} />
              
              <div className={`w-16 h-16 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center mb-6 relative z-10`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <span className="font-display text-4xl md:text-5xl font-bold text-slate-900 mb-2 drop-shadow-sm relative z-10">
                <AnimatedCounter value={stat.value} />
              </span>
              <span className="text-slate-600 font-semibold uppercase tracking-widest text-sm relative z-10">
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
