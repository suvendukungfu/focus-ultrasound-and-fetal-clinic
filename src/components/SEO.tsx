import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  faqData?: Array<{ question: string; answer: string }>;
}

  const SEO: React.FC<SEOProps> = ({
  title = "Focus Ultrasound and Fetal Clinic | Best Fetal Medicine in Noida",
  description = "Focus Ultrasound and Fetal Clinic offers expert fetal medicine, NT scans, Anomaly scans, and 3D/4D ultrasounds in Noida Extension. Trusted by 5000+ families.",
  keywords = "ultrasound clinic noida, fetal medicine, pregnancy scan, NT scan, anomaly scan, 4D ultrasound, prenatal care",
  ogImage = "/og-image.webp",
  ogUrl = "https://focusultrasound.in",
  ogType = "website",
  canonicalUrl = "https://focusultrasound.in",
  noindex = false,
  faqData = []
}) => {
  useEffect(() => {
    // Update Document Title
    document.title = title;

    // Canonical Tag
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // Update Meta Tags
    const updateMetaTag = (name: string, property: string, content: string) => {
      let tag = name 
        ? document.querySelector(`meta[name="${name}"]`) 
        : document.querySelector(`meta[property="${property}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        if (name) tag.setAttribute('name', name);
        if (property) tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateMetaTag('description', '', description);
    updateMetaTag('keywords', '', keywords);
    
    // Handle noindex
    if (noindex) {
      updateMetaTag('robots', '', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', '', 'index, follow');
    }
    
    // Open Graph
    updateMetaTag('', 'og:title', title);
    updateMetaTag('', 'og:description', description);
    updateMetaTag('', 'og:image', ogImage);
    updateMetaTag('', 'og:url', ogUrl);
    updateMetaTag('', 'og:type', ogType);

    // Twitter
    updateMetaTag('twitter:card', '', 'summary_large_image');
    updateMetaTag('twitter:title', '', title);
    updateMetaTag('twitter:description', '', description);
    updateMetaTag('twitter:image', '', ogImage);

    // JSON-LD Structured Data (MedicalClinic)
    const existingSchema = document.getElementById('schema-medical-clinic');
    if (existingSchema) {
      existingSchema.remove();
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "Focus Ultrasound & Fetal Clinic",
      "alternateName": "FUFC",
      "description": "Expert fetal medicine and ultrasound diagnostic center specializing in high-risk pregnancy scans and prenatal care.",
      "url": "https://focusultrasound.in",
      "telephone": "+918287655133",
      "email": "info.fufc@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension",
        "addressLocality": "Greater Noida West",
        "addressRegion": "UP",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.6015,
        "longitude": 77.4475
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00",
          "closes": "15:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "17:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "09:00",
          "closes": "14:00"
        }
      ],
      "medicalSpecialty": ["Fetal Medicine", "Obstetrics", "Radiology"],
      "availableService": [
        { "@type": "MedicalProcedure", "name": "NT Scan" },
        { "@type": "MedicalProcedure", "name": "Anomaly Scan (TIFFA)" },
        { "@type": "MedicalProcedure", "name": "Growth Scan" },
        { "@type": "MedicalProcedure", "name": "Fetal Echocardiography" }
      ],
      "image": "https://focusultrasound.in/og-image.webp"
    };

    const script = document.createElement('script');
    script.id = 'schema-medical-clinic';
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // FAQ Schema
    const existingFaqSchema = document.getElementById('schema-faq');
    if (existingFaqSchema) {
      existingFaqSchema.remove();
    }

    if (faqData && faqData.length > 0) {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqData.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      };
      
      const faqScript = document.createElement('script');
      faqScript.id = 'schema-faq';
      faqScript.type = 'application/ld+json';
      faqScript.innerHTML = JSON.stringify(faqSchema);
      document.head.appendChild(faqScript);
    }

    return () => {
      // Clean up script on unmount if needed, though usually fine to keep for SEO
    };
  }, [title, description, keywords, ogImage, ogUrl, ogType, canonicalUrl, faqData]);

  return null;
};

export default SEO;
