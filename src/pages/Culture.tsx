import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CultureSection from '@/components/CultureSection';
import SEO from '@/components/SEO';
import { motion, Variants } from 'framer-motion';
import { Heart, Users, Sparkles, Shield, Coffee, Award, Star, TrendingUp, Zap } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import CultureCircle from '@/components/CultureCircle';

const Culture = () => {
  const { t } = useLanguage();

  const statCards = [
    { label: t('culture.stats.label1'), value: '10+', icon: Users, color: 'text-primary' },
    { label: t('culture.stats.label2'), value: '100%', icon: Zap, color: 'text-emerald-400' },
    { label: t('culture.stats.label3'), value: '4.9', icon: Star, color: 'text-amber-400' },
    { label: t('culture.stats.label4'), value: '10+', icon: TrendingUp, color: 'text-indigo-400' },
  ];

  return (
    <div className="min-h-screen transition-colors duration-700 bg-background text-foreground selection:bg-primary/20">
      <SEO 
        title={t('culture.seo.title')}
        description={t('culture.seo.description')}
      />
      <Header />
      <main className="relative overflow-hidden pt-[104px]">
        {/* Main Hero Culture Section */}
        <CultureSection />

        {/* Foundational Values Section */}
        <CultureCircle />

        {/* High-Impact Stats Matrix */}
        <section className="py-32 md:py-40 px-6 relative z-10 bg-gray-50/50 dark:bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="relative group p-6 md:p-10 rounded-[2.5rem] bg-card shadow-elevated border border-border text-center flex flex-col items-center justify-center transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl overflow-hidden"
                >
                  {/* Subtle Background Icon */}
                  <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-primary/5 group-hover:text-primary/10 transition-colors duration-500" />
                  
                  <div className={`text-3xl md:text-5xl font-black ${stat.color} mb-3 tracking-tighter drop-shadow-sm`}>
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Culture;
