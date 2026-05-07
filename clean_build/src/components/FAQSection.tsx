import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionHeading from './ui/SectionHeading';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const { t } = useLanguage();
  const faqs = t<FAQItem[]>('faq');

  return (
    <section className="section-padding px-6 bg-background relative overflow-hidden" id="faq">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="mb-16">
          <SectionHeading 
            badge={t('faq.infoCenter')}
            title={t('faq.title')}
            subtitle={t('faq.subtitle')}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-clean p-8 md:p-12 bg-card border border-border/40"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {Array.isArray(faqs) && faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/40 rounded-xl px-6 data-[state=open]:bg-secondary/20 transition-colors"
              >
                <AccordionTrigger className="text-left py-6 hover:no-underline group">
                  <div className="flex gap-4 items-center pr-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors">
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className="font-display text-lg md:text-xl font-bold text-foreground">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0">
                  <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
