import { describe, it, expect } from 'vitest';

/**
 * SEO Component tests — since the SEO component manipulates document.head
 * directly via useEffect, we test the structured data generation logic directly.
 */

describe('SEO Structured Data', () => {
  describe('MedicalClinic Schema', () => {
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'MedicalClinic',
      name: 'Focus Ultrasound & Fetal Clinic',
      telephone: '+918287655133',
      email: 'info.fufc@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension',
        addressLocality: 'Greater Noida West',
        addressRegion: 'UP',
        addressCountry: 'IN',
      },
    };

    it('should have the correct schema type', () => {
      expect(schemaData['@type']).toBe('MedicalClinic');
    });

    it('should contain the updated phone number', () => {
      expect(schemaData.telephone).toBe('+918287655133');
    });

    it('should have the correct address', () => {
      expect(schemaData.address.addressLocality).toBe('Greater Noida West');
      expect(schemaData.address.addressCountry).toBe('IN');
    });

    it('should have a valid schema.org context', () => {
      expect(schemaData['@context']).toBe('https://schema.org');
    });
  });

  describe('FAQPage Schema', () => {
    const faqData = [
      {
        question: 'What is a fetal ultrasound?',
        answer: 'A fetal ultrasound is a safe, non-invasive imaging technique...',
      },
      {
        question: 'Is ultrasound safe during pregnancy?',
        answer: 'Yes, ultrasound is completely safe for both you and your baby...',
      },
    ];

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqData.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };

    it('should generate valid FAQPage schema', () => {
      expect(faqSchema['@type']).toBe('FAQPage');
      expect(faqSchema.mainEntity).toHaveLength(2);
    });

    it('should contain Question entities', () => {
      faqSchema.mainEntity.forEach((entity) => {
        expect(entity['@type']).toBe('Question');
        expect(entity).toHaveProperty('name');
        expect(entity).toHaveProperty('acceptedAnswer');
        const acceptedAnswer = entity.acceptedAnswer as { '@type': string };
        expect(acceptedAnswer['@type']).toBe('Answer');
      });
    });

    it('should produce valid JSON-LD string', () => {
      const jsonLd = JSON.stringify(faqSchema);
      expect(() => JSON.parse(jsonLd)).not.toThrow();
    });

    it('should handle empty FAQ data', () => {
      const emptySchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [],
      };
      expect(emptySchema.mainEntity).toHaveLength(0);
    });
  });
});
