import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Header
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.about': { en: 'About Us', hi: 'हमारे बारे में' },
  'nav.facilities': { en: 'Services', hi: 'सेवाएं' },
  'nav.reviews': { en: 'Reviews', hi: 'समीक्षाएं' },
  'nav.culture': { en: 'Our Culture', hi: 'हमारी संस्कृति' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.book': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },

  // Hero
  'hero.badge': { en: 'Trusted Diagnostics Partner', hi: 'विश्वसनीय डायग्नोस्टिक्स पार्टनर' },
  'hero.title': { en: 'Your Health,', hi: 'आपका स्वास्थ्य,' },
  'hero.titleHighlight': { en: 'Our Priority', hi: 'हमारी प्राथमिकता' },
  'hero.subtitle': { en: 'Advanced imaging & diagnostic services with care that feels personal.', hi: 'व्यक्तिगत देखभाल के साथ उन्नत इमेजिंग और डायग्नोस्टिक सेवाएं।' },
  'hero.book': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  'hero.call': { en: 'Call Us', hi: 'कॉल करें' },

  // Stats
  'stats.experience': { en: 'Years Experience', hi: 'वर्षों का अनुभव' },
  'stats.patients': { en: 'Happy Patients', hi: 'खुश मरीज' },
  'stats.rating': { en: 'Google Rating', hi: 'गूगल रेटिंग' },
  'stats.reports': { en: 'Report Time', hi: 'रिपोर्ट समय' },
  'stats.accuracy': { en: 'Accuracy', hi: 'सटीकता' },
  'stats.hygiene': { en: 'Hygiene', hi: 'स्वच्छता' },

  // Doctors
  'doctors.title': { en: 'Meet Our Experts', hi: 'हमारे विशेषज्ञों से मिलें' },
  'doctors.subtitle': { en: 'Experienced professionals dedicated to your care', hi: 'आपकी देखभाल के लिए समर्पित अनुभवी पेशेवर' },
  'doctors.timing': { en: 'Consultation Hours', hi: 'परामर्श समय' },

  // Facilities
  'facilities.title': { en: 'Our Services', hi: 'हमारी सेवाएं' },
  'facilities.subtitle': { en: 'Comprehensive diagnostic solutions under one roof', hi: 'एक छत के नीचे व्यापक डायग्नोस्टिक समाधान' },
  'facilities.diagnostics': { en: 'In-House Diagnostics', hi: 'इन-हाउस डायग्नोस्टिक्स' },
  'facilities.amenities': { en: 'Clinic Amenities', hi: 'क्लिनिक सुविधाएं' },
  'facilities.consultations': { en: 'Consultation Types', hi: 'परामर्श के प्रकार' },

  // Reviews
  'reviews.title': { en: 'Patient Stories', hi: 'मरीजों की कहानियां' },
  'reviews.subtitle': { en: 'Real experiences from our patients', hi: 'हमारे मरीजों के वास्तविक अनुभव' },
  'reviews.leave': { en: 'Share Your Experience', hi: 'अपना अनुभव साझा करें' },
  'reviews.google': { en: 'Review us on Google', hi: 'गूगल पर समीक्षा करें' },

  // Culture
  'culture.title': { en: 'Our Work Culture', hi: 'हमारी कार्य संस्कृति' },
  'culture.subtitle': { en: 'What makes us different', hi: 'हमें अलग क्या बनाता है' },

  // Contact
  'contact.title': { en: 'Book Your Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  'contact.subtitle': { en: 'Fill in your details and we\'ll get back to you', hi: 'अपना विवरण भरें और हम आपसे संपर्क करेंगे' },
  'contact.name': { en: 'Full Name', hi: 'पूरा नाम' },
  'contact.phone': { en: 'Phone Number', hi: 'फ़ोन नंबर' },
  'contact.email': { en: 'Email Address', hi: 'ईमेल पता' },
  'contact.age': { en: 'Age', hi: 'उम्र' },
  'contact.weight': { en: 'Weight (kg)', hi: 'वजन (किलो)' },
  'contact.symptoms': { en: 'Symptoms / Problems', hi: 'लक्षण / समस्याएं' },
  'contact.medical': { en: 'Prior Medical Conditions', hi: 'पूर्व चिकित्सा स्थितियां' },
  'contact.medicalPlaceholder': { en: 'e.g., Diabetes, Asthma, Hypertension...', hi: 'जैसे, मधुमेह, अस्थमा, उच्च रक्तचाप...' },
  'contact.message': { en: 'Additional Message', hi: 'अतिरिक्त संदेश' },
  'contact.submit': { en: 'Submit Appointment Request', hi: 'अपॉइंटमेंट अनुरोध जमा करें' },

  // Footer
  'footer.rights': { en: 'All rights reserved', hi: 'सर्वाधिकार सुरक्षित' },
  'footer.tagline': { en: 'Your trusted partner in diagnostics', hi: 'डायग्नोस्टिक्स में आपका विश्वसनीय साथी' },

  // Common
  'common.learnMore': { en: 'Learn More', hi: 'और जानें' },
  'common.backToHome': { en: 'Back to Home', hi: 'होम पर वापस' },
  'common.language': { en: 'हिंदी', hi: 'English' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
