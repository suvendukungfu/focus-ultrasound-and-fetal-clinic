import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Images } from 'lucide-react';

const images = [
  {
    src: '/images/clinic-exterior-new.jpg',
    label: 'Modern Exterior',
    labelHi: 'आधुनिक बाहरी हिस्सा',
    aspect: 'aspect-[1024/576]',
  },
  {
    src: '/images/clinic-waiting-new.jpg',
    label: 'Comfortable Lounge',
    labelHi: 'आरामदायक प्रतीक्षा कक्ष',
    aspect: 'aspect-[765/1020]',
  },
  {
    src: '/images/clinic-entry-new.png',
    label: 'Welcoming Reception',
    labelHi: 'स्वागत क्षेत्र',
    aspect: 'aspect-[512/310]',
  },
  {
    src: '/images/clinic-samsung-v7.jpg',
    label: 'Diagnostic Suite',
    labelHi: 'डायग्नोस्टिक सूट',
    aspect: 'aspect-[816/1020]',
  },
];

const GalleryPreview = () => {
  const { language } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-4 bg-medical-soft/30 overflow-hidden text-slate-900">
      <div className="container-narrow mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl px-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-teal/10 text-medical-teal text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Images className="w-3.5 h-3.5" />
              {language === 'en' ? 'The Clinic Experience' : 'क्लिनिक का अनुभव'}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1]"
            >
              {language === 'en' ? 'A Sanctuary for Motherhood' : 'मातृत्व के लिए एक अभयारण्य'}
            </motion.h2>
          </div>
          
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
          >
            <Link
              to="/about#clinic-gallery"
              className="inline-flex items-center gap-2 text-slate-900 md:text-lg font-bold hover:text-medical-teal transition-colors group px-2"
            >
              {language === 'en' ? 'View Full Gallery' : 'पूरी गैलरी देखें'}
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Balanced Masonry Grid */}
        <div className="columns-1 md:columns-2 gap-6 md:gap-8 space-y-6 md:space-y-8">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
              className={`group relative overflow-hidden rounded-[2.5rem] border border-white/50 shadow-soft hover:shadow-elevated transition-all duration-700 break-inside-avoid`}
            >
              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {/* Image Container with Natural Aspect Ratio */}
              <div className={`w-full ${item.aspect} bg-slate-50/50 relative`}>
                <img
                  src={item.src}
                  alt={language === 'en' ? item.label : item.labelHi}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                />
              </div>

              {/* Label Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '40px' }}
                  className="h-1 bg-medical-teal rounded-full mb-4"
                />
                <p className="font-display text-xl font-bold text-white mb-1">
                  {language === 'en' ? item.label : item.labelHi}
                </p>
                <p className="text-white/70 text-sm font-medium">Focus Ultrasound & Fetal Clinic</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
