export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Header
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.about': { en: 'About Us', hi: 'हमारे बारे में' },
  'nav.facilities': { en: 'Services', hi: 'सेवाएं' },
  'nav.reviews': { en: 'Reviews', hi: 'समीक्षाएं' },
  'nav.culture': { en: 'Our Culture', hi: 'हमारी संस्कृति' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क' },
  'nav.book': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },

  // Hero
  'hero.badge': { en: 'Advanced Fetal Medicine Center', hi: 'उन्नत भ्रूण चिकित्सा केंद्र' },
  'hero.title': { en: 'Expert Fetal Medicine &', hi: 'विशेषज्ञ भ्रूण चिकित्सा और' },
  'hero.titleHighlight': { en: 'Pregnancy Ultrasound', hi: 'गर्भावस्था अल्ट्रासाउंड' },
  'hero.subtitle': { en: 'Leading-edge pregnancy diagnostics and maternal-fetal care with 10+ years of clinical excellence.', hi: '10+ वर्षों की नैदानिक उत्कृष्टता के साथ अत्याधुनिक गर्भावस्था डायग्नोस्टिक्स और मातृ-भ्रूण देखभाल।' },
  'hero.book': { en: 'Book Appointment', hi: 'अपॉइंटमेंट बुक करें' },
  'hero.call': { en: 'Call Clinic', hi: 'क्लिनिक को कॉल करें' },

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
  'contact.subtitle': { en: 'Advanced fetal imaging with expert care', hi: 'विशेषज्ञों द्वारा उन्नत भ्रूण इमेजिंग' },
  'contact.hero.badge': { en: 'Trusted Fetal Care', hi: 'विश्वसनीय भ्रूण देखभाल' },
  'contact.hero.title': { en: 'Book Your Ultrasound Appointment with Confidence', hi: 'आत्मविश्वास के साथ अपना अल्ट्रासाउंड अपॉइंटमेंट बुक करें' },
  'contact.hero.subtitle': { en: 'Advanced fetal imaging with expert radiologists. Safe, accurate, and compassionate care for you and your baby.', hi: 'विशेषज्ञ रेडियोलॉजिस्ट के साथ उन्नत भ्रूण इमेजिंग। आपके और आपके बच्चे के लिए सुरक्षित, सटीक और दयालु देखभाल।' },
  'contact.hero.callNow': { en: 'Call Now', hi: 'अभी कॉल करें' },
  'contact.hero.trust1': { en: 'Certified Radiologists', hi: 'प्रमाणित रेडियोलॉजिस्ट' },
  'contact.hero.trust2': { en: 'Advanced 3D/4D Imaging', hi: 'उन्नत 3D/4D इमेजिंग' },
  'contact.hero.trust3': { en: 'Safe & Accurate Diagnosis', hi: 'सुरक्षित और सटीक निदान' },
  'contact.name': { en: 'Full Name', hi: 'पूरा नाम' },
  'contact.phone': { en: 'Phone Number', hi: 'फ़ोन नंबर' },
  'contact.email': { en: 'Email Address', hi: 'ईमेल पता' },
  'contact.age': { en: 'Age', hi: 'उम्र' },
  'contact.weeks': { en: 'Weeks of Pregnancy', hi: 'गर्भावस्था के सप्ताह' },
  'contact.scanType': { en: 'Select Scan Type', hi: 'स्कैन का प्रकार चुनें' },
  'contact.doctor': { en: 'Preferred Doctor', hi: 'पसंदीदा डॉक्टर' },
  'contact.date': { en: 'Preferred Date', hi: 'पसंदीदा तिथि' },
  'contact.time': { en: 'Preferred Time', hi: 'पसंदीदा समय' },
  'contact.message': { en: 'Additional Message', hi: 'अतिरिक्त संदेश' },
  'contact.submit': { en: 'Submit Appointment Request', hi: 'अपॉइंटमेंट अनुरोध भेजें' },
  'contact.info': { en: 'Clinic Information', hi: 'क्लिनिक की जानकारी' },
  'contact.note': { en: 'Important Note', hi: 'महत्वपूर्ण सूचना' },
  'contact.requiredNote': { en: 'Please bring your previous reports and prescription.', hi: 'कृपया अपनी पिछली रिपोर्ट और डॉक्टर का पर्चा साथ लाएं।' },

  // Footer
  'footer.rights': { en: 'All rights reserved', hi: 'सर्वाधिकार सुरक्षित' },
  'footer.tagline': { en: 'Your trusted partner in diagnostics', hi: 'डायग्नोस्टिक्स में आपका विश्वसनीय साथी' },

  // Common
  'common.learnMore': { en: 'Learn More', hi: 'और जानें' },
  'common.backToHome': { en: 'Back to Home', hi: 'होम पर वापस' },
  'common.language': { en: 'हिंदी', hi: 'English' },
  'common.loading': { en: 'Please wait...', hi: 'कृपया प्रतीक्षा करें...' },
  'common.success': { en: 'Submitted Successfully', hi: 'सफलतापूर्वक जमा किया गया' },
};
