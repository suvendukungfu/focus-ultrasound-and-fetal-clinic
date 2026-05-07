import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Images, ZoomIn, X } from 'lucide-react';
import { useState } from 'react';

const images = [
  {
    src: '/images/clinic-exterior-new.webp',
    labelKey: 'gallery.label1',
    className: 'md:col-span-8 md:row-span-2 min-h-[300px] md:min-h-0',
  },
  {
    src: '/images/clinic-waiting-new.webp',
    labelKey: 'gallery.label2',
    className: 'md:col-span-4 md:row-span-1 min-h-[250px] md:min-h-0',
  },
  {
    src: '/images/clinic-entry-new.webp',
    labelKey: 'gallery.label3',
    className: 'md:col-span-4 md:row-span-1 min-h-[250px] md:min-h-0',
  },
  {
    src: '/images/clinic-samsung-v7.webp',
    labelKey: 'gallery.label4',
    className: 'md:col-span-12 md:row-span-2 min-h-[300px] md:min-h-0',
  },
];

const GalleryPreview = ({ showLink = true }: { showLink?: boolean }) => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 bg-card overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl px-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-display font-bold uppercase tracking-widest mb-6"
            >
              <Images className="w-4 h-4" />
              {t<string>('gallery.badge')}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-[1.1]"
            >
              {t<string>('gallery.title')}
            </motion.h2>
          </div>
          
          {showLink && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
            >
              <Link
                to="/about#clinic-gallery"
                className="inline-flex items-center gap-2 text-gray-900 dark:text-white md:text-lg font-bold hover:text-primary transition-colors group px-2"
              >
                {t('gallery.viewAll')}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[auto] md:auto-rows-[280px]">
          {images.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-800 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500 ${item.className}`}
              onClick={() => setSelectedImg(index)}
            >
              {/* Image */}
              <img loading="lazy"
                src={item.src}
                alt={t(item.labelKey)}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Sophisticated Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                 <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                    <ZoomIn className="w-6 h-6" />
                 </div>
              </div>

              {/* Label Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="h-1 w-10 bg-primary rounded-full mb-3" />
                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1">
                  {t<string>(item.labelKey)}
                </h3>
                <p className="text-white/80 text-xs md:text-sm font-medium">{t<string>('footer.fullClinicName')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/95 backdrop-blur-xl p-4 md:p-10"
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-md transition-colors z-50 border border-white/20"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={images[selectedImg].src}
              alt={t(images[selectedImg].labelKey)}
              className="max-w-full max-h-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
              <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg">
                 {t<string>(images[selectedImg].labelKey)}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryPreview;
