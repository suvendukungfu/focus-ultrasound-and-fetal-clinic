import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, Heart, ShieldCheck, Activity, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CultureSection = () => {
  const { language } = useLanguage();

  const benefits = [
    { icon: Heart, text: 'Personalized Care' },
    { icon: ShieldCheck, text: 'Experienced Doctors' },
    { icon: Activity, text: 'Advanced Technology' },
    { icon: Users, text: 'Comfortable Environment' },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-[#0b1220] dark">
      {/* Dynamic Background Image with Left-to-Right Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/culture-premium-bg.png"
          alt="Our Culture of Care"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220] via-[#0b1220]/75 to-transparent md:via-[#0b1220]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-transparent to-transparent opacity-60" />
      </div>

      <div className="container-narrow relative z-10 mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glassmorphism Container */}
            <div className="bg-white/5 backdrop-blur-md rounded-[3rem] p-8 md:p-14 border border-white/10 shadow-[0_0_50px_rgba(0,200,255,0.1)]">
              <span className="inline-block px-5 py-2 rounded-full bg-[#00c8ff]/10 border border-[#00c8ff]/20 text-[#00c8ff] text-xs font-bold uppercase tracking-[0.3em] mb-8">
                {language === 'en' ? 'Our Values' : 'हमारे मूल्य'}
              </span>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                Our Culture of <span className="text-[#00c8ff]">Care</span>
              </h2>
              
              <p className="text-[#9ca3af] font-body text-lg leading-relaxed mb-10">
                At Focus Ultrasound, our culture is defined by a deep commitment to expectant parents. We merge 
                compassionate care with world-class technology to create a safe, supportive environment for 
                every journey into motherhood. Our priority is your peace of mind and your baby’s wellbeing.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center gap-3 text-white font-semibold"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00c8ff]/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-[#00c8ff]" />
                    </div>
                    <span className="text-sm tracking-wide">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-[#00c8ff] hover:bg-[#00c8ff]/90 text-black font-bold px-10 py-5 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,200,255,0.4)] group"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Empty for visual balance with background image */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Subtle Glow Effects */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#00c8ff]/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
};

export default CultureSection;
