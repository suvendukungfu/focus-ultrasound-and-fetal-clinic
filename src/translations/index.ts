export type Language = 'en' | 'hi';

export type TranslationValue = string | { [key: string]: TranslationValue } | TranslationValue[];

export const translations: Record<Language, { [key: string]: TranslationValue }> = {
  en: {
    // Clinic Info
    'clinic.name': 'Focus Ultrasound',
    'clinic.tagline': '& Fetal Clinic',

    // Home SEO
    'home.seo.title': 'Best Ultrasound & Fetal Clinic in Greater Noida West | Focus Ultrasound',
    'home.seo.description': 'Advanced fetal scans, pregnancy ultrasound, and expert diagnostics in Nirala Estate. Book your appointment today with certified experts.',
    
    // Home Features
    'home.features.badge': 'Our Excellence',
    'home.features.title': 'Redefining Diagnostics with',
    'home.features.titlePart2': 'Precision & Care',
    'home.features.subtitle': 'Experience the next generation of medical imaging where cutting-edge technology meets compassionate care.',
    'home.features.learnMore': 'Learn More',
    'home.features.expertise.title': 'Clinical Expertise',
    'home.features.expertise.desc': 'Our board-certified radiologists bring years of experience from India\'s top medical institutions.',
    'home.features.tech.title': 'Cutting-Edge Tech',
    'home.features.tech.desc': 'Equipped with GE Voluson E8 and Samsung V7 for unmatched diagnostic clarity and precision.',
    'home.features.care.title': 'Compassionate Care',
    'home.features.care.desc': 'We treat every patient like family, ensuring a comfortable and supportive environment.',
    
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.facilities': 'Services',
    'nav.reviews': 'Reviews',
    'nav.culture': 'Our Culture',
    'nav.contact': 'Contact',
    'nav.book': 'Book Appointment',
    'nav.admin': 'Clinic Administration',

    // Hero
    'hero.badge': 'Advanced Fetal Medicine Center',
    'hero.titlePrefix': 'Premier Ultrasound &',
    'hero.titleMain': 'Fetal Medicine',
    'hero.titleLocation': 'in Greater Noida West',
    'hero.subtitle': "Experience the highest standard of fetal ultrasound and medicine in a serene, professional environment dedicated to you and your baby's well-being.",
    'hero.book': 'Book Appointment',
    'hero.bookWhatsapp': 'Book via WhatsApp',
    'hero.callNow': 'Call Now',
    'hero.trust1': 'FMF UK Certified',
    'hero.trust2': 'Barcelona Trained',
    'hero.trust3': 'IRIA Member',
    'hero.happyFamilies': 'Happy Families',
    'hero.yearsTrust': 'Years of Trust',
    'hero.expertRating': 'Expert Rating',
    'doctors.verifiedBadge': 'Verified Professional',
    'hero.scroll': 'Scroll',
    reviews: {
      title: "Patient Testimonials",
      subtitle: "See what our patients have to say about their experience with our medical experts.",
      stats: {
        patients: "Happy Patients",
        reviews: "Google Reviews",
        rating: "Avg Rating"
      }
    },
    about: {
      hero: {
        badge: "About Us",
        title: "Focus Ultrasound & Fetal Clinic in Greater Noida West",
        p1: "Focus Ultrasound and Fetal Clinic is a dedicated diagnostic and fetal imaging centre committed to accuracy, compassion, and patient comfort. We specialize in advanced ultrasound services, including routine pregnancy scans, detailed anomaly scans, growth monitoring, Doppler studies, and gynecological imaging — all performed with precision and care.",
        p2: "Patients consistently appreciate our clear explanations, calm environment, organized workflow, and respectful approach. We understand that every scan, especially during pregnancy, is an important moment. That's why we focus not only on delivering accurate reports, but also on ensuring you feel reassured, informed, and comfortable throughout your visit.",
        p3: "At Focus Ultrasound and Fetal Clinic, we combine modern technology with ethical practice and personalized attention — because your health and peace of mind truly matter."
      },
      team: {
        badge: "Expert Team",
        title: "Meet Our Experts",
        subtitle: "Highly qualified radiologists dedicated to your care"
      },
      credentials: {
        badge: "Credentials",
        title: "Degrees & Certifications",
        registration: "Registration",
        formerly: "Formerly At",
        activeStatus: "Active Practitioner"
      },
      gallery: {
        badge: "The Clinic Experience",
        title: "Our Gallery",
        exterior: "Modern Exterior",
        waiting: "Comfortable Waiting Lounge",
        reception: "Welcoming Reception",
        suite: "Diagnostic Suite"
      },
      seo: {
        title: "Expert Fetal Medicine Specialists in Greater Noida West | Focus Ultrasound",
        description: "Meet our specialist radiologists, Dr. Samar Surya Nirwal and Dr. Rahul Choudhary. Experts in high-risk pregnancy scans and advanced fetal imaging in Nirala Estate."
      },
      doctors: [
        {
          name: 'Dr. Samar Surya Nirwal',
          role: 'Consultant Radiologist & Fetal Medicine Specialist',
          qualifications: 'MBBS, MD, DNB (Radiodiagnosis)',
          bio: [
            "Dr. Samar Surya Nirwal is a highly accomplished Radiologist and Fetal Medicine Specialist dedicated to delivering precise, ethical, and compassionate diagnostic care. With strong academic credentials and advanced subspecialty training, he brings a blend of clinical expertise and evidence-based practice to every patient he serves.",
            "He completed his MBBS from King George's Medical University (KGMU), Lucknow, followed by MD Radiology from VMMC & Safdarjung Hospital, New Delhi, and later earned his DNB Radiology qualification.",
            "To further advance his expertise in maternal–fetal imaging, he completed a Fellowship in Obstetrics & Gynecology Imaging from The Fetal Clinic, Pondicherry, and is UK-FMF certified. He also completed his Postgraduate Degree in Fetal Medicine from the University of Barcelona."
          ],
          expertise: [
            'Advanced fetal ultrasound and Doppler studies',
            'Level I & Level II anomaly scans',
            'Growth scans and fetal surveillance',
            'High-risk pregnancy imaging',
            'Gynecological ultrasound',
            'CT and MRI imaging',
            'Comprehensive vascular Doppler studies'
          ]
        },
        {
          name: 'Dr. Rahul Choudhary',
          role: 'Consultant Radiologist & Fetal Medicine Specialist',
          qualifications: 'MBBS, MD (Radio Diagnosis)',
          bio: [
            "Dr. Rahul Choudhary is a highly experienced radiologist with a special interest in fetal medicine, obstetric ultrasound, and advanced diagnostic imaging. He is committed to delivering accurate, ethical, and patient-centered imaging services with a strong focus on quality and clinical excellence.",
            "He completed his postgraduate training in Radiodiagnosis from Safdarjung Hospital, followed by Senior Residency at VMMC & Safdarjung Hospital and AIIMS Patna.",
            "He completed a Fellowship in Fetal Imaging from the University of Barcelona and is FMF UK certified for first trimester screening. He is an active member of the Society of Fetal Medicine and Indian Radiological and Imaging Association (IRIA)."
          ],
          expertise: [
            'NT scans',
            'Level II anomaly scans',
            'Fetal Doppler studies',
            'Vascular Doppler examinations',
            'Musculoskeletal ultrasound',
            'Non-vascular interventions'
          ]
        }
      ]
    },
    'stats.experience': 'Years Experience',
    'stats.patients': 'Happy Patients',
    'stats.rating': 'Google Rating',
    'stats.reports': 'Report Time',
    'stats.accuracy': 'Accuracy',
    'stats.hygiene': 'Hygiene',
    'stats.familiesServed': 'Families Served',
    'stats.yearsTrust': 'Years of Trust',
    'stats.scansCompleted': 'Scans Completed',

    // Equipment
    'equipment.badge': 'World-Class Equipment',
    'equipment.title': 'Advanced Diagnostic Technology',
    'equipment.samsung.name': 'Samsung V7',
    'equipment.samsung.desc': 'State-of-the-art 3D/4D fetal imaging with Intelligent Assist for precision measurements and early detection.',
    'equipment.samsung.feat1': 'Crystal-clear 3D/4D rendering',
    'equipment.samsung.feat2': 'Intelligent fetal measurement assist',
    'equipment.samsung.feat3': 'Advanced cardiac imaging',
    'equipment.ge.name': 'GE Voluson E8 Expert',
    'equipment.ge.desc': 'Gold standard in women\'s health with Radiantflow and SlowflowHD for exceptional vascular clarity.',
    'equipment.ge.feat1': 'Radiantflow for vascular clarity',
    'equipment.ge.feat2': 'Exceptional HDlive technology',
    'equipment.ge.feat3': 'Specialized women\'s health workflow',

    // Doctors
    'doctors.badge': 'Expert Team',
    'doctors.title': 'Meet Our Experts',
    'doctors.subtitle': 'Experienced professionals dedicated to your care',
    'doctors.specialist': 'Specialist',
    'doctors.drSamar.name': 'Dr. Samar Surya Nirwal',
    'doctors.drSamar.specialization': 'Consultant Radiologist & Fetal Medicine',
    'doctors.drSamar.qualifications': 'MBBS, MD, DNB (Radiodiagnosis) · Postgraduate in Fetal Medicine (University of Barcelona) · Fellow in Fetal Imaging (UK-FMF)',
    'doctors.drRahul.name': 'Dr. Rahul Choudhary',
    'doctors.drRahul.specialization': 'Consultant Radiologist & Fetal Medicine',
    'doctors.drRahul.qualifications': 'MBBS, MD (Radio Diagnosis) · Imaging in Fetal Medicine (University of Barcelona)',

    // Facilities
    'facilities.title': 'Our Services',
    'facilities.subtitle': 'Comprehensive diagnostic solutions under one roof',
    'facilities.diagnostics': 'In-House Diagnostics',
    'facilities.amenities': 'Clinic Amenities',
    'facilities.consultations': 'Consultation Types',

    // Services
    'services.expertise': 'Our Expertise',
    'services.advDiagnostics': 'Advanced Clinical Services',
    'services.bookScan': 'Book Appointment',
    'services.exploreSpecialized': 'Explore All Services',
    'services.usgAbdomen.name': 'USG Abdomen',
    'services.usgAbdomen.desc': 'Detailed ultrasound of abdominal organs including liver and gallbladder.',
    'services.upperAbdomen.name': 'Upper Abdomen Ultrasound',
    'services.upperAbdomen.desc': 'Focused imaging of the upper abdominal cavity and related organs.',
    'services.wholeAbdomen.name': 'USG Whole Abdomen + Obstetrics',
    'services.wholeAbdomen.desc': 'Comprehensive abdominal evaluation with pregnancy monitoring.',
    'services.kub.name': 'KUB / Pelvis / Lower Abdomen',
    'services.kub.desc': 'Specialized scan for Kidney, Ureter, Bladder and pelvic region',
    'services.tvs.name': 'TVS (Transvaginal Sonography)',
    'services.tvs.desc': 'High-resolution internal imaging for detailed gynecological assessment.',
    'services.smallParts.name': 'Small Parts (Neck/Thyroid/Soft Tissue)',
    'services.smallParts.desc': 'High-frequency imaging of superficial structures and soft tissues.',
    'services.breast.name': 'USG Bilateral Breast',
    'services.breast.desc': 'Advanced breast tissue screening for early detection.',
    'services.fibroscan.name': 'Fibroscan / Elastography',
    'services.fibroscan.desc': 'Non-invasive assessment of liver stiffness and fatty changes.',
    'services.routineObs.name': 'Routine Obstetrics Scan',
    'services.routineObs.desc': 'Regular monitoring of fetal development and maternal health.',
    'services.level1.name': 'Level 1 Scan (NT/NB)',
    'services.level1.desc': 'First-trimester screening for chromosomal markers.',
    'services.cervical.name': 'Cervical Assessment + Uterine Doppler',
    'services.cervical.desc': 'Evaluation of preterm birth risk and blood flow.',
    'services.level2.name': 'Level 2 Scan (TIFFA)',
    'services.level2.desc': 'Gold-standard anomaly scan for detailed fetal assessment.',
    'services.fetalEcho.name': 'Fetal Echocardiography',
    'services.fetalEcho.desc': 'Specialized ultrasound of the fetal heart structure.',
    'services.obsDoppler.name': 'Obstetric Doppler / Growth Scan / BPP',
    'services.obsDoppler.desc': 'Monitoring fetal growth, blood flow, and well-being.',

    // Reviews
    'reviews.home.title': 'Patient Stories',
    'reviews.home.subtitle': 'Real experiences from our patients',
    'reviews.leave': 'Share Your Experience',
    'reviews.google': 'Review us on Google',
    'reviews.verifiedPatients': 'Verified Patients',
    'reviews.happyFamiliesCount': '5000+ Happy Families',
    'reviews.allStories': 'All Patient Stories',
    'reviews.realPatients': 'Real Experiences from Real Families',
    'reviews.liveFeed': 'Live Feedback',

    // Clinic Timings
    'timings.badge': 'Clinic Hours',
    'timings.title': 'Clinic Timings',
    'timings.openWelcome': 'We are open — Welcome!',
    'timings.closedNotice': 'Currently closed. See timings below.',
    'timings.call': 'Call: +91-98704-75400',
    'timings.monSat': 'Mon – Sat',
    'timings.sunday': 'Sunday',

    // Culture
    'culture.philosophy': 'Our Philosophy',
    'culture.title': 'Our Work Culture',
    'culture.titlePart1': 'Our Culture of',
    'culture.titlePart2': 'Care',
    'culture.subtitle': 'What makes us different',
    'culture.description': 'At Focus Ultrasound, our culture is defined by empathy and excellence. We merge compassionate care with world-class technology to create a safe, supportive environment for every journey.',
    'culture.benefit1': 'Personalized Care',
    'culture.benefit2': 'Experienced Doctors',
    'culture.benefit3': 'Advanced Technology',
    'culture.benefit4': 'Comfortable Environment',

    // Gallery
    'gallery.badge': 'The Clinic Experience',
    'gallery.title': 'A Sanctuary for Motherhood',
    'gallery.viewAll': 'View Full Gallery',
    'gallery.label1': 'Modern Exterior',
    'gallery.label2': 'Comfortable Lounge',
    'gallery.label3': 'Welcoming Reception',
    'gallery.label4': 'Diagnostic Suite',

    // Contact
    'contact.title': 'Book Your Appointment',
    'contact.subtitle': 'Advanced fetal imaging with expert care',
    'contact.hero.badge': 'Trusted Fetal Care',
    'contact.hero.title': 'Book Ultrasound & Fetal Scan in Greater Noida West',
    'contact.hero.subtitle': 'Advanced fetal imaging with expert radiologists. Safe, accurate, and compassionate care for you and your baby.',
    'contact.hero.callNow': 'Call Now',
    'contact.hero.trust1': 'Certified Radiologists',
    'contact.hero.trust2': 'Advanced 3D/4D Imaging',
    'contact.hero.trust3': 'Safe & Accurate Diagnosis',
    'contact.name': 'Full Name',
    'contact.phone': 'Phone Number',
    'contact.email': 'Email Address',
    'contact.age': 'Age',
    'contact.weeks': 'Weeks of Pregnancy',
    'contact.scanType': 'Select Scan Type',
    'contact.doctor': 'Preferred Doctor',
    'contact.date': 'Preferred Date',
    'contact.time': 'Preferred Time',
    'contact.message': 'Additional Message',
    'contact.submit': 'Submit Appointment Request',
    'contact.info': 'Clinic Information',
    'contact.note': 'Important Note',
    'contact.requiredNote': 'Please bring your previous reports and prescription.',
    'contact.details': 'Details',
    'contact.knowBetter': 'Help us know you better',
    'contact.namePlaceholder': 'Your Name',
    'contact.phonePlaceholder': 'Contact Number',
    'contact.agePlaceholder': 'Age',
    'contact.weight': 'Weight (kg)',
    'contact.weightPlaceholder': 'Weight in kg',
    'contact.history': 'Medical History',
    'contact.historySubtitle': 'Help us understand your health context',
    'contact.priorConditions': 'Prior Medical Conditions',
    'contact.priorPlaceholder': 'e.g., Diabetes, Asthma, Hypertension...',
    'contact.infoTitle': 'Appointment Information',
    'contact.scanPlaceholder': 'Choose a scan type',
    'contact.doctorPlaceholder': 'Any Available Specialist',
    'contact.messagePlaceholder': 'Please share any specific symptoms, previous history, or questions...',
    'contact.toastTitle': 'Appointment Request Submitted!',
    'contact.toastDesc': "We'll contact you within 24 hours to confirm.",
    'contact.toastAction': 'Confirm on WhatsApp',
    'contact.failTitle': 'Submission Failed',
    'contact.verified': 'Verified Patients',
    'contact.verifiedDesc': 'Join 5,000+ happy families who trusted our expert ultrasound services.',
    'contact.addressLabel': 'Address',
    'contact.quickContact': 'Quick Contact',
    'contact.anomalyNote': 'For Anomaly Scans, we recommend having a light snack before the appointment.',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.infoCenter': 'Information Center',
    'faq.subtitle': 'Expert answers to common concerns about fetal imaging and pregnancy health.',
    'faq.q1': 'What is a fetal ultrasound?',
    'faq.a1': 'A fetal ultrasound is a safe, non-invasive imaging technique using high-frequency sound waves to create live images of your baby. It allows our specialists to monitor fetal development, check the baby\'s position, and confirm essential growth milestones accurately.',
    'faq.q2': 'When should I get a pregnancy ultrasound scan?',
    'faq.a2': 'Pregnancy ultrasounds are typically recommended starting between 6 and 10 weeks to confirm viability. Essential milestones follow, including the NT scan at 11–13 weeks for early health screening and the Level II Anomaly Scan at 18–20 weeks.',
    'faq.q3': 'Is ultrasound safe during pregnancy?',
    'faq.a3': 'Yes, ultrasound is completely safe for both you and your baby during pregnancy. Unlike X-rays, ultrasound technology uses harmless sound waves rather than ionizing radiation to visualize the womb. It is a standard and secure diagnostic tool.',
    'faq.q4': 'What is the recommended pregnancy scan timeline?',
    'faq.a4': 'A standard scan timeline includes a Viability scan (6-9 weeks), NT Scan (11-13.6 weeks), and Anomaly Scan (18-20 weeks). \n\n• First Trimester: Early pregnancy & NT/NB scan for chromosomal screening.\n• Second Trimester: Level II TIFFA scan for detailed organ assessment.\n• Third Trimester: Growth & Doppler scan to monitor baby\'s weight and blood flow.',
    'faq.q5': 'What should I do before my ultrasound appointment?',
    'faq.a5': 'For early pregnancy scans, you should drink plenty of water and have a full bladder for better visualization. \n\n• Wear comfortable, loose-fitting two-piece clothing.\n• Carry your previous medical reports and prescriptions.\n• Do not skip meals unless specifically instructed for a combined blood test.',
    'faq': [
      { 
        question: 'What is a fetal ultrasound?', 
        answer: 'A fetal ultrasound is a safe, non-invasive imaging technique using high-frequency sound waves to create live images of your baby. It allows our specialists to monitor fetal development, check the baby\'s position, and confirm essential growth milestones accurately.' 
      },
      { 
        question: 'When should I get a pregnancy ultrasound scan?', 
        answer: 'Pregnancy ultrasounds are typically recommended starting between 6 and 10 weeks to confirm viability. Essential milestones follow, including the NT scan at 11–13 weeks for early health screening and the Level II Anomaly Scan at 18–20 weeks.' 
      },
      { 
        question: 'Is ultrasound safe during pregnancy?', 
        answer: 'Yes, ultrasound is completely safe for both you and your baby during pregnancy. Unlike X-rays, ultrasound technology uses harmless sound waves rather than ionizing radiation to visualize the womb. It is a standard and secure diagnostic tool.' 
      },
      {
        question: 'What is the recommended pregnancy scan timeline?',
        answer: 'A standard scan timeline includes a Viability scan (6-9 weeks), NT Scan (11-13.6 weeks), and Anomaly Scan (18-20 weeks). \n\n• First Trimester: Early pregnancy & NT/NB scan for chromosomal screening.\n• Second Trimester: Level II TIFFA scan for detailed organ assessment.\n• Third Trimester: Growth & Doppler scan to monitor baby\'s weight and blood flow.'
      },
      {
        question: 'What should I do before my ultrasound appointment?',
        answer: 'For early pregnancy scans, you should drink plenty of water and have a full bladder for better visualization. \n\n• Wear comfortable, loose-fitting two-piece clothing.\n• Carry your previous medical reports and prescriptions.\n• Do not skip meals unless specifically instructed for a combined blood test.'
      }
    ],

    // Footer
    'footer.navTitle': 'Navigation',
    'footer.servicesTitle': 'Services',
    'footer.address': 'Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension, Greater Noida West - 201306',
    'footer.rights': 'All rights reserved',
    'footer.tagline': 'Your trusted partner in diagnostics',
    'footer.fullClinicName': 'Focus Ultrasound and Fetal Clinic',

    // SEO
    'seo.home.title': 'Best Ultrasound & Fetal Clinic in Greater Noida West | Focus Ultrasound',
    'seo.home.description': 'Advanced fetal scans, pregnancy ultrasound, and expert diagnostics in Nirala Estate. Book your appointment today.',

    // Reviews Page
    'reviews.seo.title': 'Patient Reviews & Success Stories | Focus Ultrasound Greater Noida',
    'reviews.seo.description': 'Trusted by 5,000+ families. Read patient testimonials about our expert ultrasound scans and fetal medicine specialists in Nirala Estate.',
    'reviews.badge': 'Trusted Excellence',
    'reviews.title': 'Patient Experiences That Matter',
    'reviews.subtitle': 'Discover why families trust us for their most important fetal diagnostic milestones. Real stories from real patients.',
    'reviews.featured.badge': 'Featured Story',
    'reviews.featured.quote': 'The most thorough anomaly scan experience.',
    'reviews.featured.comment': 'We visited Focus Ultrasound for our Level II Anomaly scan. Dr. Samar was incredibly patient, explaining every detail. The clarity of the 3D images was mind-blowing.',
    'reviews.featured.name': 'Priya & Ankit Sharma',
    'reviews.featured.sub': 'Parents-to-be • April 2026',
    'reviews.verified': 'Verified Patient',
    'reviews.noReviews': 'No reviews yet',
    'reviews.firstReview': 'Be the first to review us on Google',
    'reviews.cta.title': 'Leave a Review',
    'reviews.cta.p': 'Your feedback helps us improve and helps others find quality care.',
    'reviews.moments': 'Sharing moments of joy with our patients.',

    // Services Page
    'services.seo.title': '3D/4D Ultrasound Scans & Diagnostic Services in Greater Noida West',
    'services.seo.description': 'Comprehensive diagnostic ultrasound services including NT Scan, Level 2 TIFFA, Doppler, and Growth scans. Expert prenatal care in Nirala Estate.',
    'services.badge': 'Diagnostic Suite',
    'services.title': 'Advanced Diagnostic & Fetal Services',
    'services.subtitle': 'Precision-driven diagnostics merging advanced expertise with state-of-the-art GE Voluson technology.',
    'services.tech.badge': 'Innovation Engine',
    'services.tech.title': 'Premium Diagnostic Technology',
    'services.tech.subtitle': 'We leverage the world\'s most sophisticated clinical platforms to deliver unparalleled diagnostic clarity.',
    'services.precision.title': 'Precision',
    'services.precision.subtitle': 'Genomics',
    'services.precision.desc': 'In exclusive partnership with MedGenome, we bring India\'s leading precision medicine to your doorstep.',
    'services.precision.acc': '99.9%',
    
    'services.items': [
      { name: 'USG Abdomen', desc: 'Detailed ultrasound of the abdominal organs including liver, gallbladder, and spleen.' },
      { name: 'Upper Abdomen Ultrasound', desc: 'Focused imaging of the upper abdominal cavity and related organs.' },
      { name: 'USG Whole Abdomen + Obstetrics', desc: 'Comprehensive abdominal evaluation combined with pregnancy monitoring.' },
      { name: 'KUB / Pelvis / Lower Abdomen', desc: 'Specialized scan for Kidney, Ureter, Bladder and pelvic region' },
      { name: 'TVS (Transvaginal Sonography)', desc: 'High-resolution internal imaging for detailed gynecological assessment.' },
      { name: 'Small Parts (Neck / Thyroid / Soft Tissue)', desc: 'High-frequency imaging of superficial structures and soft tissues.' },
      { name: 'USG Bilateral Breast', desc: 'Advanced breast tissue screening for early detection and monitoring.' },
      { name: 'Fibroscan / Elastography', desc: 'Non-invasive assessment of liver stiffness and fatty changes.' },
      { name: 'Routine Obstetrics Scan', desc: 'Regular monitoring of fetal development and maternal health.' },
      { name: 'Level 1 Scan (NT/NB)', desc: 'First-trimester screening for chromosomal markers and early anatomy.' },
      { name: 'Cervical Assessment + Uterine Doppler', desc: 'Critical evaluation of preterm birth risk and blood flow.' },
      { name: 'Level 2 Scan (TIFFA)', desc: 'Gold-standard anomaly scan for detailed fetal organ assessment.' },
      { name: 'Fetal Echocardiography', desc: 'Specialized ultrasound of the fetal heart structure and function.' },
      { name: 'Obstetric Doppler / Growth Scan / BPP', desc: 'Monitoring fetal growth, blood flow, and overall well-being.' }
    ],

    'services.equipment': [
      { name: 'Samsung V7', desc: 'Advanced 3D/4D imaging with precision diagnostics for fetal and gynecological ultrasound.' },
      { name: 'GE Voluson E8 Expert', desc: 'The global gold standard in fetal medicine. Offers extraordinary image quality for the highest diagnostic confidence.' }
    ],

    'services.faq': [
      { question: "What is a fetal ultrasound?", answer: "A fetal ultrasound is a safe, non-invasive imaging technique using high-frequency sound waves to create live images of your baby. It allows our specialists to monitor fetal development, check the baby's position, and confirm essential growth milestones accurately." },
      { question: "When should I get a pregnancy scan?", answer: "You should get your first pregnancy scan between 6 and 10 weeks to confirm viability. Essential milestones follow, including the NT scan at 11–13 weeks for early health screening and the Level II Anomaly Scan at 18–20 weeks." },
      { question: "Is ultrasound safe during pregnancy?", answer: "Yes, ultrasound is completely safe for both you and your baby during pregnancy. Unlike X-rays, ultrasound technology uses harmless sound waves rather than ionizing radiation to visualize the womb. It is a standard and secure diagnostic tool." }
    ],

    // About Page Extras
    'about.expertiseTitle': 'Areas of Expertise',
    'about.credentials.registrationLabel': 'Registration',
    'about.credentials.formerlyLabel': 'Formerly at',
    'about.credentials.doc1': {
      name: 'Dr. Rahul Choudhary',
      degree: 'MBBS, MD (Radiodiagnosis)',
      role: 'Consultant Radiologist & Fetal Medicine',
      university: '(University of Barcelona)',
      registration: ['UPMC No - 103538'],
      experience: '10+ Years Experience',
      formerly: ['Safdarjung Hospital, New Delhi', 'AIIMS, Patna']
    },
    'about.credentials.doc2': {
      name: 'Dr. Samar Surya Nirwal',
      degree: 'MBBS, MD, DNB (Radiodiagnosis)',
      role: 'Consultant Radiologist & Fetal Medicine',
      university: '(University of Barcelona)',
      registration: ['UPMC No - 84598', 'DMC No - 94287'],
      experience: '10+ Years Experience',
      formerly: ['King George’s Medical University, Lucknow', 'Safdarjung Hospital, New Delhi']
    },
    'culture.seo.title': 'Our Culture & Clinical Excellence | Focus Ultrasound and Fetal Clinic',
    'culture.seo.description': 'Learn about our patient-first approach and clinical values. Our specialists bring elite medical expertise to a caring environment in Greater Noida West.',
    'culture.values.badge': 'Core Principles',
    'culture.values.title': 'Our Foundational Values',
    'culture.values.subtitle': 'The pillars that define our commitment to excellence and high-end clinical care.',
    'culture.values.items': [
      {
        title: 'Patient-First Approach',
        desc: 'Every decision we make is centered around what\'s best for our patients.',
      },
      {
        title: 'Collaborative Team',
        desc: 'We work together, share knowledge, and support each other\'s growth.',
      },
      {
        title: 'Innovation Driven',
        desc: 'We embrace new technologies like GE Voluson E8 for world-class diagnostics.',
      },
      {
        title: 'Integrity & Trust',
        desc: 'Transparency and honesty are at the core of everything we do.',
      },
      {
        title: 'Work-Life Balance',
        desc: 'We believe happy staff provide better care to patients.',
      },
      {
        title: 'Continuous Learning',
        desc: 'Regular training and international fellowships keep our team at the forefront.',
      }
    ],
    'culture.stats.label1': 'Team Members',
    'culture.stats.label2': 'Satisfaction',
    'culture.stats.label3': 'Google Rating',
    'culture.stats.label4': 'Years of Trust',
    'culture.family.title': 'The Family Culture',
    'culture.family.desc': 'At Focus Ultrasound and Fetal Clinic, our atmosphere is governed by unity and professional warmth. Our specialists, with heritage from India\'s most prestigious medical institutions, bring world-class diagnostic insight directly into a caring community environment.',
    'culture.family.point1': 'Expertise from Safdarjung & KGMU Alumni',
    'culture.family.point2': 'Advanced International Clinical Standards',
    'culture.family.point3': 'Radical Focus on Patient Experience',

    // Contact Page
    'contact.seo.title': 'Book Appointment | Best Ultrasound Clinic in Greater Noida West',
    'contact.seo.description': 'Schedule your pregnancy scan or diagnostic ultrasound at Focus Clinic Nirala Estate. Online appointment booking for expert fetal medicine and diagnostics.',
    'contact.seo.faq': [
      {
        question: "How can I book an appointment at Focus Ultrasound?",
        answer: "You can book an appointment by calling us at +91 8130881986 or by filling out the online appointment request form on our contact page."
      },
      {
        question: "What should I bring for my ultrasound appointment?",
        answer: "Please bring your doctor's prescription, any previous scan reports, and a valid ID proof. For certain scans, you may need to come with a full bladder; our staff will advise you during booking."
      },
      {
        question: "Is parking available at the clinic?",
        answer: "Yes, free parking is available within the Nirala Estate Commercial Complex for all our patients."
      }
    ],
    'contact.options.scans': [
      'USG Abdomen', 'Upper Abdomen Ultrasound', 'USG Whole Abdomen + Obstetrics',
      'KUB / Pelvis / Lower Abdomen', 'TVS (Transvaginal Sonography)', 
      'Small Parts (Neck / Thyroid / Soft Tissue)', 'USG Bilateral Breast', 
      'Fibroscan / Elastography', 'Routine Obstetrics Scan', 'Level 1 Scan (NT/NB)', 
      'Cervical Assessment + Uterine Doppler', 'Level 2 Scan (TIFFA)', 
      'Fetal Echocardiography', 'Obstetric Doppler / Growth Scan / BPP', 'Other'
    ],
    'contact.options.doctors': [
      'Dr. Samar Surya Nirwal',
      'Dr. Rahul Choudhary',
      'Any Available Specialist'
    ],
    'contact.sidebar.address': 'Shop No. 05 & 06, UGF, Nirala Estate, Noida Extension, Greater Noida West - 201306',
    'contact.sidebar.trustRating': 'Based on 500+ Google Reviews',
    'contact.sidebar.trustBadge': 'Patient Trust',

    'footer.services': [
      '3D/4D Ultrasound',
      'Fetal Echo',
      'Digital X-Ray',
      'ECG',
      'Lab Tests',
      'Fetal Medicine'
    ],

    'timings.hours.monSat': '9:00 AM – 3:00 PM & 5:00 PM – 8:00 PM',
    'timings.hours.sunday': '9:00 AM – 2:00 PM',

    // Map
    'map.openNow': 'Open Now',
    'map.closed': 'Closed',
    'map.away': 'away',
    'map.directions': 'Directions',
    'map.call': 'Call',
    'map.whatsapp': 'WhatsApp',
    'map.locating': 'Locating...',
    'map.updateLocation': 'Update Location',
    'map.showDistance': 'Show My Distance',

    // Common
    'common.learnMore': 'Learn More',
    'common.backToHome': 'Back to Home',
    'common.language': 'हिंदी',
    'common.loading': 'Please wait...',
    'common.success': 'Submitted Successfully',
    'common.clinicStatus': 'Clinic Status',
    'common.open': 'Open Now',
    'common.close': 'Close',
    'common.closed': 'Closed',
    'common.busy': 'Busy',
    'services.bookWhatsapp': 'Book via WhatsApp',
    'services.tech.specs': 'Full Technical Specs',
    'services.precision.explore': 'Explore MedGenome',
    'services.precision.rate': 'Accuracy Rate',
  },
  hi: {
    // Clinic Info
    'clinic.name': 'फोकस अल्ट्रासाउंड',
    'clinic.tagline': '& फीटल क्लिनिक',

    // होम एसईओ
    'home.seo.title': 'ग्रेटर नोएडा वेस्ट में सर्वश्रेष्ठ अल्ट्रासाउंड और भ्रूण क्लिनिक | फोकस अल्ट्रासाउंड',
    'home.seo.description': 'निराला एस्टेट में उन्नत भ्रूण स्कैन, गर्भावस्था अल्ट्रासाउंड और विशेषज्ञ निदान। प्रमाणित विशेषज्ञों के साथ आज ही अपना अपॉइंटमेंट बुक करें।',

    // Home Features
    'home.features.badge': 'हमारी उत्कृष्टता',
    'home.features.title': 'सटीकता और देखभाल के साथ',
    'home.features.titlePart2': 'निदान को पुनर्परिभाषित करना',
    'home.features.subtitle': 'चिकित्सा इमेजिंग की अगली पीढ़ी का अनुभव करें जहां अत्याधुनिक तकनीक दयालु देखभाल से मिलती है।',
    'home.features.learnMore': 'और जानें',
    'home.features.expertise.title': 'नैदानिक विशेषज्ञता',
    'home.features.expertise.desc': 'हमारे बोर्ड-प्रमाणित रेडियोलॉजिस्ट भारत के शीर्ष चिकित्सा संस्थानों से वर्षों का अनुभव लाते हैं।',
    'home.features.tech.title': 'अत्याधुनिक तकनीक',
    'home.features.tech.desc': 'बेजोड़ नैदानिक स्पष्टता और सटीकता के लिए GE Voluson E8 और Samsung V7 से लैस।',
    'home.features.care.title': 'दयालु देखभाल',
    'home.features.care.desc': 'हम हर मरीज के साथ परिवार की तरह व्यवहार करते हैं, एक आरामदायक और सहायक वातावरण सुनिश्चित करते हैं।',

    // Header
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.facilities': 'सेवाएं',
    'nav.reviews': 'समीक्षाएं',
    'nav.culture': 'हमारी संस्कृति',
    'nav.contact': 'संपर्क',
    'nav.book': 'अपॉइंटमेंट बुक करें',
    'nav.admin': 'क्लीनिक प्रशासन',

    // Hero
    'hero.badge': 'उन्नत भ्रूण चिकित्सा केंद्र',
    'hero.titlePrefix': 'प्रीमियर अल्ट्रासाउंड और',
    'hero.titleMain': 'भ्रूण चिकित्सा',
    'hero.titleLocation': 'ग्रेटर नोएडा वेस्ट में',
    'hero.subtitle': 'आपके और आपके बच्चे की भलाई के लिए समर्पित एक शांत, पेशेवर वातावरण में भ्रूण अल्ट्रासाउंड और चिकित्सा के उच्चतम मानक का अनुभव करें।',
    'hero.book': 'अपॉइंटमेंट बुक करें',
    'hero.bookWhatsapp': 'व्हाट्सएप से बुक करें',
    'hero.callNow': 'अभी कॉल करें',
    'hero.trust1': 'FMF UK प्रमाणित',
    'hero.trust2': 'बार्सिलोना प्रशिक्षित',
    'hero.trust3': 'IRIA सदस्य',
    'hero.happyFamilies': 'खुश परिवार',
    'hero.yearsTrust': 'विश्वास के वर्ष',
    'hero.expertRating': 'विशेषज्ञ रेटिंग',
    'hero.scroll': 'स्क्रॉल',
    reviews: {
      title: "पेशेंट टेस्टिमोनियल",
      subtitle: "देखें कि हमारे मरीजों का हमारे चिकित्सा विशेषज्ञों के अनुभव के बारे में क्या कहना है।",
      stats: {
        patients: "खुश मरीज",
        reviews: "गूगल समीक्षाएं",
        rating: "औसत रेटिंग"
      }
    },
    about: {
      hero: {
        badge: "हमारे बारे में",
        title: "ग्रेटर नोएडा वेस्ट में फोकस अल्ट्रासाउंड एवं फीटल क्लिनिक",
        p1: "फोकस अल्ट्रासाउंड और फीटल क्लिनिक सटीकता, करुणा और मरीज़ के आराम के लिए प्रतिबद्ध एक समर्पित डायग्नोस्टिक और फीटल इमेजिंग केंद्र है। हम उन्नत अल्ट्रासाउंड सेवाओं में विशेषज्ञ हैं, जिसमें नियमित गर्भावस्था स्कैन, विस्तृत विसंगति स्कैन, विकास की निगरानी, डॉपलर अध्ययन और स्त्रीरोग संबंधी इमेजिंग शामिल हैं - ये सभी सटीकता और देखभाल के साथ किए जाते हैं।",
        p2: "मरीज़ हमारी स्पष्ट व्याख्याओं, शांत वातावरण, संगठित कार्यप्रवाह और सम्मानजनक दृष्टिकोण की सराहना करते हैं। हम समझते हैं कि हर स्कैन, विशेष रूप से गर्भावस्था के दौरान, एक महत्वपूर्ण क्षण होता है। इसलिए हम न केवल सटीक रिपोर्ट देने पर ध्यान केंद्रित करते हैं, बल्कि यह भी सुनिश्चित करते हैं कि आप अपनी यात्रा के दौरान आश्वस्त, सूचित और आरामदायक महसूस करें।",
        p3: "फोकस अल्ट्रासाउंड और फीटल क्लिनिक में, हम आधुनिक तकनीक को नैतिक अभ्यास और व्यक्तिगत ध्यान के साथ जोड़ते हैं - क्योंकि आपका स्वास्थ्य और मन की शांति वास्तव में मायने रखती है।"
      },
      team: {
        badge: "विशेषज्ञ टीम",
        title: "हमारे विशेषज्ञों से मिलें",
        subtitle: "आपकी देखभाल के लिए समर्पित उच्च योग्य रेडियोलॉजिस्ट"
      },
      credentials: {
        badge: "प्रमाणपत्र",
        title: "डिग्री और प्रमाणपत्र",
        registration: "पंजीकरण",
        formerly: "पूर्व में",
        activeStatus: "सक्रिय चिकित्सक"
      },
      gallery: {
        badge: "क्लिनिक का अनुभव",
        title: "हमारी गैलरी",
        exterior: "आधुनिक बाहरी हिस्सा",
        waiting: "आरामदायक प्रतीक्षा कक्ष",
        reception: "स्वागत क्षेत्र",
        suite: "डायग्नोस्टिक सूट"
      },
      seo: {
        title: "ग्रेटर नोएडा वेस्ट में विशेषज्ञ फीटल मेडिसिन विशेषज्ञ | फोकस अल्ट्रासाउंड",
        description: "हमारे विशेषज्ञ रेडियोलॉजिस्ट, डॉ. समर सूर्य निर्वल और डॉ. राहुल चौधरी से मिलें। निराला एस्टेट में उच्च जोखिम वाले गर्भावस्था स्कैन और उन्नत भ्रूण इमेजिंग के विशेषज्ञ।"
      },
      doctors: [
        {
          name: 'डॉ. समर सूर्य निर्वल',
          role: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन विशेषज्ञ',
          qualifications: 'MBBS, MD, DNB (रेडियोडायग्नोसिस)',
          bio: [
            "डॉ. समर सूर्य निर्वल एक अत्यधिक निपुण रेडियोलॉजिस्ट और फीटल मेडिसिन विशेषज्ञ हैं जो सटीक, नैतिक और दयालु नैदानिक देखभाल प्रदान करने के लिए समर्पित हैं। मजबूत शैक्षणिक साख और उन्नत उप-विशेषता प्रशिक्षण के साथ, वह अपने द्वारा सेवा किए जाने वाले प्रत्येक रोगी के लिए नैदानिक विशेषज्ञता और साक्ष्य-आधारित अभ्यास का मिश्रण लाते हैं।",
            "उन्होंने किंग जॉर्ज मेडिकल यूनिवर्सिटी (KGMU), लखनऊ से अपना एमबीबीएस पूरा किया, उसके बाद VMMC और सफदरजंग अस्पताल, नई दिल्ली से एमडी रेडियोलॉजी की, और बाद में अपनी DNB रेडियोलॉजी योग्यता अर्जित की।",
            "मातृ-भ्रूण इमेजिंग में अपनी विशेषज्ञता को आगे बढ़ाने के लिए, उन्होंने द फीटल क्लिनिक, पांडिचेरी से प्रसूति और स्त्री रोग इमेजिंग में फेलोशिप पूरी की, और यूके-एफएमएफ प्रमाणित हैं। उन्होंने बार्सिलोना विश्वविद्यालय से फीटल मेडिसिन में अपनी स्नातकोत्तर डिग्री भी पूरी की।"
          ],
          expertise: [
            'उन्नत फीटल अल्ट्रासाउंड और डॉपलर अध्ययन',
            'लेवल I और लेवल II विसंगति स्कैन',
            'विकास स्कैन और भ्रूण निगरानी',
            'उच्च जोखिम वाली गर्भावस्था इमेजिंग',
            'स्त्रीरोग संबंधी अल्ट्रासाउंड',
            'सीटी और एमआरआई इमेजिंग',
            'व्यापक संवहनी डॉपलर अध्ययन'
          ]
        },
        {
          name: 'डॉ. राहुल चौधरी',
          role: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन विशेषज्ञ',
          qualifications: 'MBBS, MD (रेडियो डायग्नोसिस)',
          bio: [
            "डॉ. राहुल चौधरी फीटल मेडिसिन, प्रसूति अल्ट्रासाउंड और उन्नत नैदानिक इमेजिंग में विशेष रुचि रखने वाले एक अत्यधिक अनुभवी रेडियोलॉजिस्ट हैं। वह गुणवत्ता और नैदानिक उत्कृष्टता पर मजबूत ध्यान देने के साथ सटीक, नैतिक और रोगी-केंद्रित इमेजिंग सेवाएं प्रदान करने के लिए प्रतिबद्ध हैं।",
            "उन्होंने सफदरजंग अस्पताल से रेडियोडायग्नोसिस में अपना स्नातकोत्तर प्रशिक्षण पूरा किया, उसके बाद VMMC और सफदरजंग अस्पताल और एम्स पटना में सीनियर रेजिडेंसी की।",
            "उन्होंने बार्सिलोना विश्वविद्यालय से फीटल इमेजिंग में फेलोशिप पूरी की और पहली तिमाही की स्क्रीनिंग के लिए एफएमएफ यूके प्रमाणित हैं। वह सोसाइटी ऑफ फीटल मेडिसिन और इंडियन रेडियोलॉजिकल एंड इमेजिंग एसोसिएशन (IRIA) के सक्रिय सदस्य हैं।"
          ],
          expertise: [
            'एनटी स्कैन',
            'लेवल II विसंगति स्कैन',
            'फीटल डॉपलर अध्ययन',
            'संवहनी डॉपलर परीक्षाएं',
            'मस्कुलोस्केलेटल अल्ट्रासाउंड',
            'गैर-संवहनी हस्तक्षेप'
          ]
        }
      ]
    },
    'stats.experience': 'वर्षों का अनुभव',
    'stats.patients': 'खुश मरीज',
    'stats.rating': 'गूगल रेटिंग',
    'stats.reports': 'रिपोर्ट समय',
    'stats.accuracy': 'सटीकता',
    'stats.hygiene': 'स्वच्छता',
    'stats.familiesServed': 'परिवारों की सेवा की',
    'stats.yearsTrust': 'विश्वास के वर्ष',
    'stats.scansCompleted': 'स्कैन पूरे हुए',

    // Equipment
    'equipment.badge': 'विश्व-स्तरीय उपकरण',
    'equipment.title': 'उन्नत डायग्नोस्टिक तकनीक',
    'equipment.samsung.name': 'सैमसंग V7',
    'equipment.samsung.desc': 'सटीक माप और शीघ्र पता लगाने के लिए इंटेलिजेंट असिस्ट के साथ अत्याधुनिक 3D/4D फीटल इमेजिंग।',
    'equipment.samsung.feat1': 'क्रिस्टल-क्लियर 3D/4D रेंडरिंग',
    'equipment.samsung.feat2': 'बुद्धिमान भ्रूण माप सहायता',
    'equipment.samsung.feat3': 'उन्नत कार्डियक इमेजिंग',
    'equipment.ge.name': 'GE Voluson E8 Expert',
    'equipment.ge.desc': 'महिला स्वास्थ्य में स्वर्ण मानक, असाधारण संवहनी स्पष्टता के लिए रेडिएंटफ्लो तकनीक।',
    'equipment.ge.feat1': 'संवहनी स्पष्टता के लिए रेडिएंटफ्लो',
    'equipment.ge.feat2': 'असाधारण एचडीलाइव तकनीक',
    'equipment.ge.feat3': 'विशेष महिला स्वास्थ्य कार्यप्रवाह',

    // Doctors
    'doctors.badge': 'विशेषज्ञ टीम',
    'doctors.title': 'हमारे विशेषज्ञों से मिलें',
    'doctors.subtitle': 'आपकी देखभाल के लिए समर्पित अनुभवी पेशेवर',
    'doctors.specialist': 'विशेषज्ञ',
    'doctors.verifiedBadge': 'सत्यापित पेशेवर',
    'doctors.drSamar.name': 'डॉ. समर सूर्य निर्वल',
    'doctors.drSamar.specialization': 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    'doctors.drSamar.qualifications': 'MBBS, MD, DNB (रेडियोडायग्नोसिस) · फीटल मेडिसिन में पोस्ट ग्रेजुएट (बार्सिलोना विश्वविद्यालय) · फीटल इमेजिंग में फेलो (UK-FMF)',
    'doctors.drRahul.name': 'डॉ. राहुल चौधरी',
    'doctors.drRahul.specialization': 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
    'doctors.drRahul.qualifications': 'MBBS, MD (रेडियो डायग्नोसिस) · फीटल मेडिसिन में इमेजिंग (बार्सिलोना विश्वविद्यालय)',

    // Facilities
    'facilities.title': 'हमारी सेवाएं',
    'facilities.subtitle': 'एक छत के नीचे व्यापक डायग्नोस्टिक समाधान',
    'facilities.diagnostics': 'इन-हाउस डायग्नोस्टिक्स',
    'facilities.amenities': 'क्लिनिक सुविधाएं',
    'facilities.consultations': 'परामर्श के प्रकार',

    // Services
    'services.expertise': 'हमारी विशेषज्ञता',
    'services.advDiagnostics': 'उन्नत नैदानिक सेवाएं',
    'services.bookScan': 'अपॉइंटमेंट बुक करें',
    'services.exploreSpecialized': 'सभी सेवाएं देखें',
    'services.usgAbdomen.name': 'यूएसजी पेट (एब्डोमेन)',
    'services.usgAbdomen.desc': 'लिवर और पित्त की थैली सहित पेट के अंगों का विस्तृत अल्ट्रासाउंड।',
    'services.upperAbdomen.name': 'ऊपरी पेट का अल्ट्रासाउंड',
    'services.upperAbdomen.desc': 'ऊपरी पेट की गुहा और संबंधित अंगों की केंद्रित इमेजिंग।',
    'services.wholeAbdomen.name': 'यूएसजी पूरे पेट और प्रसूति',
    'services.wholeAbdomen.desc': 'गर्भावस्था की निगरानी के साथ व्यापक पेट का मूल्यांकन।',
    'services.kub.name': 'केयूबी / पेल्विस / निचला पेट',
    'services.kub.desc': 'गुर्दे, मूत्रवाहिनी, मूत्राशय और श्रोणि क्षेत्र के लिए विशेष स्कैन।',
    'services.tvs.name': 'टीवीएस (ट्रांसवेजाइनल सोनोग्राफी)',
    'services.tvs.desc': 'विस्तृत स्त्री रोग मूल्यांकन के लिए उच्च-रिज़ॉल्यूशन इमेजिंग।',
    'services.smallParts.name': 'स्मॉल पार्ट्स (गर्दन/थायराइड/सॉफ्ट टिश्यू)',
    'services.smallParts.desc': 'सतही संरचनाओं और कोमल ऊतकों की इमेजिंग।',
    'services.breast.name': 'यूएसजी द्विपक्षीय स्तन',
    'services.breast.desc': 'प्रारंभिक पहचान के लिए उन्नत स्तन ऊतक स्क्रीनिंग।',
    'services.fibroscan.name': 'फाइब्रोस्कैन / इलास्टोग्राफी',
    'services.fibroscan.desc': 'लिवर की कठोरता और फैटी परिवर्तनों का मूल्यांकन।',
    'services.routineObs.name': 'नियमित प्रसूति स्कैन',
    'services.routineObs.desc': 'भ्रूण के विकास और मातृ स्वास्थ्य की नियमित निगरानी।',
    'services.level1.name': 'लेवल 1 स्कैन (NT/NB)',
    'services.level1.desc': 'गुणसूत्र मार्करों के लिए पहली तिमाही की स्क्रीनिंग।',
    'services.cervical.name': 'सर्वाइकल मूल्यांकन + गर्भाशय डॉपलर',
    'services.cervical.desc': 'जन्म के जोखिम और रक्त प्रवाह का मूल्यांकन।',
    'services.level2.name': 'लेवल 2 स्कैन (TIFFA)',
    'services.level2.desc': 'विस्तृत भ्रूण मूल्यांकन के लिए गोल्ड-स्टैंडर्ड स्कैन।',
    'services.fetalEcho.name': 'फीटल इकोकार्डियोग्राफी',
    'services.fetalEcho.desc': 'भ्रूण के हृदय की संरचना का विशेष अल्ट्रासाउंड।',
    'services.obsDoppler.name': 'प्रसूति डॉपलर / ग्रोथ स्कैन / BPP',
    'services.obsDoppler.desc': 'भ्रूण की वृद्धि और रक्त प्रवाह की निगरानी।',

    // Reviews
    'reviews.home.title': 'मरीजों की कहानियां',
    'reviews.home.subtitle': 'हमारे मरीजों के वास्तविक अनुभव',
    'reviews.leave': 'अपना अनुभव साझा करें',
    'reviews.google': 'गूगल पर समीक्षा करें',
    'reviews.verifiedPatients': 'सत्यापित मरीज',
    'reviews.happyFamiliesCount': '5000+ खुश परिवार',
    'reviews.allStories': 'मरीजों की सभी कहानियां',
    'reviews.realPatients': 'वास्तविक परिवारों के वास्तविक अनुभव',
    'reviews.liveFeed': 'लाइव फीडबैक',

    // Clinic Timings
    'timings.badge': 'क्लिनिक समय',
    'timings.title': 'क्लिनिक का समय',
    'timings.openWelcome': 'हम खुले हैं — स्वागत है!',
    'timings.closedNotice': 'वर्तमान में बंद है। नीचे समय देखें।',
    'timings.call': 'कॉल करें: +91-98704-75400',
    'timings.monSat': 'सोम – शनि',
    'timings.sunday': 'रविवार',

    // Culture
    'culture.philosophy': 'हमारा दर्शन',
    'culture.title': 'हमारी कार्य संस्कृति',
    'culture.titlePart1': 'हमारी संस्कृति',
    'culture.titlePart2': 'देखभाल',
    'culture.subtitle': 'हमें अलग क्या बनाता है',
    'culture.description': 'फोकस अल्ट्रासाउंड में, हमारी संस्कृति सहानुभूति और उत्कृष्टता द्वारा परिभाषित की जाती है। हम प्रत्येक यात्रा के लिए एक सुरक्षित, सहायक वातावरण बनाने के लिए विश्व स्तरीय तकनीक के साथ दयालु देखभाल का विलय करते हैं।',
    'culture.benefit1': 'व्यक्तिगत देखभाल',
    'culture.benefit2': 'अनुभवी डॉक्टर',
    'culture.benefit3': 'उन्नत तकनीक',
    'culture.benefit4': 'आरामदायक वातावरण',

    // Gallery
    'gallery.badge': 'क्लिनिक का अनुभव',
    'gallery.title': 'मातृत्व के लिए एक अभयारण्य',
    'gallery.viewAll': 'पूरी गैलरी देखें',
    'gallery.label1': 'आधुनिक बाहरी हिस्सा',
    'gallery.label2': 'आरामदायक प्रतीक्षा कक्ष',
    'gallery.label3': 'स्वागत क्षेत्र',
    'gallery.label4': 'डायग्नोस्टिक सूट',

    // Contact
    'contact.title': 'अपॉइंटमेंट बुक करें',
    'contact.subtitle': 'विशेषज्ञों द्वारा उन्नत भ्रूण इमेजिंग',
    'contact.hero.badge': 'विश्वसनीय भ्रूण देखभाल',
    'contact.hero.title': 'ग्रेटर नोएडा वेस्ट में अल्ट्रासाउंड और फीटल स्कैन बुक करें',
    'contact.hero.subtitle': 'विशेषज्ञ रेडियोलॉजिस्ट के साथ उन्नत भ्रूण इमेजिंग। आपके और आपके बच्चे के लिए सुरक्षित, सटीक और दयालु देखभाल।',
    'contact.hero.callNow': 'अभी कॉल करें',
    'contact.hero.trust1': 'प्रमाणित रेडियोलॉजिस्ट',
    'contact.hero.trust2': 'उन्नत 3D/4D इमेजिंग',
    'contact.hero.trust3': 'सुरक्षित और सटीक निदान',
    'contact.name': 'पूरा नाम',
    'contact.phone': 'फ़ोन नंबर',
    'contact.email': 'ईमेल पता',
    'contact.age': 'उम्र',
    'contact.weeks': 'गर्भावस्था के सप्ताह',
    'contact.scanType': 'स्कैन का प्रकार चुनें',
    'contact.doctor': 'पसंदीदा डॉक्टर',
    'contact.date': 'पसंदीदा तिथि',
    'contact.time': 'पसंदीदा समय',
    'contact.message': 'अतिरिक्त संदेश',
    'contact.submit': 'अपॉइंटमेंट अनुरोध भेजें',
    'contact.info': 'क्लिनिक की जानकारी',
    'contact.note': 'महत्वपूर्ण सूचना',
    'contact.requiredNote': 'कृपया अपनी पिछली रिपोर्ट और डॉक्टर का पर्चा साथ लाएं।',
    'contact.details': 'विवरण',
    'contact.knowBetter': 'कृपया अपनी जानकारी दें',
    'contact.namePlaceholder': 'आपका नाम',
    'contact.phonePlaceholder': 'संपर्क नंबर',
    'contact.agePlaceholder': 'आयु',
    'contact.weight': 'वजन (किलो)',
    'contact.weightPlaceholder': 'किलोग्राम में वजन',
    'contact.history': 'चिकित्सा इतिहास',
    'contact.historySubtitle': 'हमें आपके स्वास्थ्य के बारे में बताएं',
    'contact.priorConditions': 'पूर्व चिकित्सा स्थितियां',
    'contact.priorPlaceholder': 'जैसे, मधुमेह, अस्थमा, उच्च रक्तचाप...',
    'contact.infoTitle': 'अपॉइंटमेंट की जानकारी',
    'contact.scanPlaceholder': 'स्कैन का प्रकार चुनें',
    'contact.doctorPlaceholder': 'कोई भी उपलब्ध विशेषज्ञ',
    'contact.messagePlaceholder': 'कृपया कोई विशेष लक्षण, पिछला इतिहास या प्रश्न साझा करें...',
    'contact.toastTitle': 'अपॉइंटमेंट अनुरोध भेजा गया!',
    'contact.toastDesc': 'हम पुष्टि के लिए 24 घंटे के भीतर आपसे संपर्क करेंगे।',
    'contact.toastAction': 'WhatsApp पर पुष्टि करें',
    'contact.failTitle': 'सबमिशन विफल रहा',
    'contact.verified': 'सत्यापित मरीज',
    'contact.verifiedDesc': 'उन 5,000+ खुशहाल परिवारों में शामिल हों जिन्होंने हमारी विशेषज्ञ अल्ट्रासाउंड सेवाओं पर भरोसा किया।',
    'contact.addressLabel': 'पता',
    'contact.quickContact': 'त्वरित संपर्क',
    'contact.anomalyNote': 'विसंगति स्कैन के लिए, हम अपॉइंटमेंट से पहले हल्का नाश्ता करने की सलाह देते हैं।',

    // FAQ
    'faq.title': 'अक्सर पूछे जाने वाले प्रश्न',
    'faq.infoCenter': 'सूचना केंद्र',
    'faq.subtitle': 'भ्रूण इमेजिंग और गर्भावस्था स्वास्थ्य के बारे में सामान्य चिंताओं के विशेषज्ञ उत्तर।',
    'faq.q1': 'भ्रूण अल्ट्रासाउंड क्या है?',
    'faq.a1': 'भ्रूण अल्ट्रासाउंड एक सुरक्षित तकनीक है जो आपके बच्चे की लाइव छवियां बनाने के लिए उच्च-आवृत्ति ध्वनि तरंगों का उपयोग करती है। यह हमारे विशेषज्ञों को भ्रूण के विकास की निगरानी करने और विकास के महत्वपूर्ण मील के पत्थर की पुष्टि करने की अनुमति देता है।',
    'faq.q2': 'मुझे गर्भावस्था का अल्ट्रासाउंड स्कैन कब करवाना चाहिए?',
    'faq.a2': 'गर्भावस्था के अल्ट्रासाउंड आमतौर पर व्यवहार्यता की पुष्टि के लिए 6 से 10 सप्ताह के बीच शुरू करने की सिफारिश की जाती है। इसके बाद महत्वपूर्ण पड़ाव आते हैं, जिसमें 11-13 सप्ताह में एनटी स्कैन और 18-20 सप्ताह में लेवल II विसंगति स्कैन शामिल है।',
    'faq.q3': 'क्या गर्भावस्था के दौरान अल्ट्रासाउंड सुरक्षित है?',
    'faq.a3': 'हाँ, गर्भावस्था के दौरान अल्ट्रासाउंड आपके और आपके बच्चे दोनों के लिए पूरी तरह से सुरक्षित है। एक्स-रे के विपरीत, अल्ट्रासाउंड तकनीक विकिरण के बजाय हानिरहित ध्वनि तरंगों का उपयोग करती है। यह एक मानक और सुरक्षित उपकरण है।',
    'faq.q4': 'गर्भावस्था स्कैन की समयरेखा क्या है?',
    'faq.a4': 'एक मानक समयरेखा में व्यवहार्यता स्कैन (6-9 सप्ताह), एनटी स्कैन (11-13.6 सप्ताह) और विसंगति स्कैन (18-20 सप्ताह) शामिल हैं। \n\n• पहली तिमाही: प्रारंभिक गर्भावस्था और गुणसूत्र स्क्रीनिंग के लिए एनटी/एनबी स्कैन।\n• दूसरी तिमाही: विस्तृत अंग मूल्यांकन के लिए लेवल II टीआईएफएफए स्कैन।\n• तीसरी तिमाही: बच्चे के वजन और रक्त प्रवाह की निगरानी के लिए विकास और डॉपलर स्कैन।',
    'faq.q5': 'अल्ट्रासाउंड अपॉइंटमेंट से पहले मुझे क्या करना चाहिए?',
    'faq.a5': 'प्रारंभिक गर्भावस्था स्कैन के लिए, आपको भरपूर पानी पीना चाहिए और बेहतर दृश्यता के लिए मूत्राशय भरा होना चाहिए। \n\n• आरामदायक, ढीले-ढाले दो-पीस कपड़े पहनें।\n• अपनी पिछली मेडिकल रिपोर्ट और नुस्खे साथ रखें।\n• भोजन न छोड़ें जब तक कि संयुक्त रक्त परीक्षण के लिए विशेष रूप से निर्देश न दिया जाए।',
    'faq': [
      {
        question: "भ्रूण अल्ट्रासाउंड क्या है?",
        answer: "भ्रूण अल्ट्रासाउंड एक सुरक्षित तकनीक है जो आपके बच्चे की लाइव छवियां बनाने के लिए उच्च-आवृत्ति ध्वनि तरंगों का उपयोग करती है। यह हमारे विशेषज्ञों को भ्रूण के विकास की निगरानी करने और विकास के महत्वपूर्ण मील के पत्थर की पुष्टि करने की अनुमति देता है।"
      },
      {
        question: "मुझे गर्भावस्था का अल्ट्रासाउंड स्कैन कब करवाना चाहिए?",
        answer: "गर्भावस्था के अल्ट्रासाउंड आमतौर पर व्यवहार्यता की पुष्टि के लिए 6 से 10 सप्ताह के बीच शुरू करने की सिफारिश की जाती है। इसके बाद महत्वपूर्ण पड़ाव आते हैं, जिसमें 11-13 सप्ताह में एनटी स्कैन और 18-20 सप्ताह में लेवल II विसंगति स्कैन शामिल है।"
      },
      {
        question: "क्या गर्भावस्था के दौरान अल्ट्रासाउंड सुरक्षित है?",
        answer: "हाँ, गर्भावस्था के दौरान अल्ट्रासाउंड आपके और आपके बच्चे दोनों के लिए पूरी तरह से सुरक्षित है। एक्स-रे के विपरीत, अल्ट्रासाउंड तकनीक विकिरण के बजाय हानिरहित ध्वनि तरंगों का उपयोग करती है। यह एक मानक और सुरक्षित उपकरण है।"
      },
      {
        question: "गर्भावस्था स्कैन की समयरेखा क्या है?",
        answer: "एक मानक समयरेखा में व्यवहार्यता स्कैन (6-9 सप्ताह), एनटी स्कैन (11-13.6 सप्ताह) और विसंगति स्कैन (18-20 सप्ताह) शामिल हैं। \n\n• पहली तिमाही: प्रारंभिक गर्भावस्था और गुणसूत्र स्क्रीनिंग के लिए एनटी/एनबी स्कैन।\n• दूसरी तिमाही: विस्तृत अंग मूल्यांकन के लिए लेवल II टीआईएफएफए स्कैन।\n• तीसरी तिमाही: बच्चे के वजन और रक्त प्रवाह की निगरानी के लिए विकास और डॉपलर स्कैन।"
      },
      {
        question: "अल्ट्रासाउंड अपॉइंटमेंट से पहले मुझे क्या करना चाहिए?",
        answer: "प्रारंभिक गर्भावस्था स्कैन के लिए, आपको भरपूर पानी पीना चाहिए और बेहतर दृश्यता के लिए मूत्राशय भरा होना चाहिए। \n\n• आरामदायक, ढीले-ढाले दो-पीस कपड़े पहनें।\n• अपनी पिछली मेडिकल रिपोर्ट और नुस्खे साथ रखें।\n• भोजन न छोड़ें जब तक कि संयुक्त रक्त परीक्षण के लिए विशेष रूप से निर्देश न दिया जाए।"
      }
    ],

    // Footer
    'footer.navTitle': 'नेविगेशन',
    'footer.servicesTitle': 'सेवाएं',
    'footer.address': 'दुकान नंबर 05 और 06, यूजीएफ, निराला एस्टेट, नोएडा एक्सटेंशन, ग्रेटर नोएडा वेस्ट - 201306',
    'footer.rights': 'सर्वाधिकार सुरक्षित',
    'footer.tagline': 'डायग्नोस्टिक्स में आपका विश्वसनीय साथी',
    'footer.fullClinicName': 'फोकस अल्ट्रासाउंड एंड फीटल क्लिनिक',

    // SEO
    'seo.home.title': 'ग्रेटर नोएडा वेस्ट में सर्वश्रेष्ठ अल्ट्रासाउंड और फीटल क्लिनिक | फोकस अल्ट्रासाउंड',
    'seo.home.description': 'निराला एस्टेट में उन्नत भ्रूण स्कैन, गर्भावस्था अल्ट्रासाउंड और विशेषज्ञ डायग्नोस्टिक्स। आज ही अपना अपॉइंटमेंट बुक करें।',

    // Reviews Page
    'reviews.seo.title': 'मरीजों की समीक्षाएं और सफलता की कहानियां | फोकस अल्ट्रासाउंड ग्रेटर नोएडा',
    'reviews.seo.description': '5,000+ परिवारों द्वारा भरोसेमंद। निराला एस्टेट में हमारे विशेषज्ञ अल्ट्रासाउंड स्कैन और भ्रूण चिकित्सा विशेषज्ञों के बारे में रोगियों के प्रशंसापत्र पढ़ें।',
    'reviews.badge': 'विश्वसनीय उत्कृष्टता',
    'reviews.title': 'मरीजों के अनुभव जो मायने रखते हैं',
    'reviews.subtitle': 'जानें कि परिवार अपने सबसे महत्वपूर्ण भ्रूण नैदानिक पड़ावों के लिए हम पर भरोसा क्यों करते हैं। असली मरीजों की असली कहानियां।',
    'reviews.featured.badge': 'विशेष कहानी',
    'reviews.featured.quote': 'सबसे गहन विसंगति स्कैन अनुभव।',
    'reviews.featured.comment': 'हम अपने लेवल II विसंगति स्कैन के लिए फोकस अल्ट्रासाउंड गए थे। डॉ. समर अविश्वसनीय रूप से धैर्यवान थे, उन्होंने हर विवरण समझाया। 3D छवियों की स्पष्टता अद्भुत थी।',
    'reviews.featured.name': 'प्रिया और अंकित शर्मा',
    'reviews.featured.sub': 'भावी माता-पिता • अप्रैल 2026',
    'reviews.verified': 'सत्यापित मरीज',
    'reviews.noReviews': 'अभी तक कोई समीक्षा नहीं',
    'reviews.firstReview': 'गूगल पर हमारी समीक्षा करने वाले पहले व्यक्ति बनें',
    'reviews.cta.title': 'समीक्षा छोड़ें',
    'reviews.cta.p': 'आपकी प्रतिक्रिया हमें सुधारने में मदद करती है और दूसरों को गुणवत्तापूर्ण देखभाल खोजने में मदद करती है।',
    'reviews.moments': 'हमारे मरीजों के साथ खुशी के पल साझा करना।',

    // Services Page
    'services.seo.title': 'ग्रेटर नोएडा वेस्ट में 3D/4D अल्ट्रासाउंड स्कैन और डायग्नोस्टिक सेवाएं',
    'services.seo.description': 'एनटी स्कैन, लेवल 2 TIFFA, डॉपलर और ग्रोथ स्कैन सहित व्यापक डायग्नोस्टिक अल्ट्रासाउंड सेवाएं। निराला एस्टेट में विशेषज्ञ प्रसवपूर्व देखभाल।',
    'services.badge': 'डायग्नोस्टिक सूट',
    'services.title': 'उन्नत डायग्नोस्टिक और फीटल सेवाएं',
    'services.subtitle': 'अत्याधुनिक GE Voluson तकनीक के साथ उन्नत विशेषज्ञता का संयोजन करने वाले सटीक-संचालित डायग्नोस्टिक्स।',
    'services.tech.badge': 'नवाचार इंजन',
    'services.tech.title': 'प्रीमियम डायग्नोस्टिक तकनीक',
    'services.tech.subtitle': 'हम बेजोड़ नैदानिक ​​स्पष्टता प्रदान करने के लिए दुनिया के सबसे परिष्कृत नैदानिक ​​प्लेटफॉर्म का लाभ उठाते हैं।',
    'services.precision.title': 'सटीकता',
    'services.precision.subtitle': 'जेनोमिक्स',
    'services.precision.desc': 'मेडजिनोम के साथ विशेष साझेदारी में, हम भारत की अग्रणी सटीक चिकित्सा को आपके दरवाजे पर लाते हैं।',
    'services.precision.acc': '99.9%',
    'services.bookWhatsapp': 'WhatsApp पर बुक करें',
    'services.tech.specs': 'तकनीकी विवरण',
    'services.precision.explore': 'मेडजिनोम एक्सप्लोर करें',
    'services.precision.rate': 'सटीकता दर',

    'services.items': [
      { name: 'यूएसजी पेट (एब्डोमेन)', desc: 'लिवर, पित्त की थैली और तिल्ली सहित पेट के अंगों का विस्तृत अल्ट्रासाउंड।' },
      { name: 'ऊपरी पेट का अल्ट्रासाउंड', desc: 'ऊपरी पेट की गुहा और संबंधित अंगों की केंद्रित इमेजिंग।' },
      { name: 'यूएसजी पूरे पेट और प्रसूति', desc: 'गर्भावस्था की निगरानी के साथ व्यापक पेट का मूल्यांकन।' },
      { name: 'केयूबी / पेल्विस / निचला पेट', desc: 'गुर्दे, मूत्रवाहिनी, मूत्राशय और श्रोणि क्षेत्र के लिए विशेष स्कैन।' },
      { name: 'टीवीएस (ट्रांसवेजाइनल सोनोग्राफी)', desc: 'विस्तृत स्त्री रोग मूल्यांकन के लिए उच्च-रिज़ॉल्यूशन आंतरिक इमेजिंग।' },
      { name: 'स्मॉल पार्ट्स (गर्दन / थायराइड / सॉफ्ट टिश्यू)', desc: 'सतही संरचनाओं और कोमल ऊतकों की उच्च-आवृत्ति इमेजिंग।' },
      { name: 'यूएसजी द्विपक्षीय स्तन', desc: 'प्रारंभिक पहचान और निगरानी के लिए उन्नत स्तन ऊतक स्क्रीनिंग।' },
      { name: 'फाइब्रोस्कैन / इलास्टोग्राफी', desc: 'लिवर की कठोरता और फैटी परिवर्तनों का गैर-आक्रामक मूल्यांकन।' },
      { name: 'नियमित प्रसूति स्कैन', desc: 'भ्रूण के विकास और मातृ स्वास्थ्य की नियमित निगरानी।' },
      { name: 'लेवल 1 स्कैन (NT/NB)', desc: 'गुणसूत्र मार्करों और प्रारंभिक शारीरिक संरचना के लिए पहली तिमाही की स्क्रीनिंग।' },
      { name: 'सर्वाइकल मूल्यांकन + गर्भाशय डॉपलर', desc: 'समय से पहले जन्म के जोखिम और रक्त प्रवाह का महत्वपूर्ण मूल्यांकन।' },
      { name: 'लेवल 2 स्कैन (TIFFA)', desc: 'विस्तृत भ्रूण अंग मूल्यांकन के लिए गोल्ड-स्टैंडर्ड विसंगति स्कैन।' },
      { name: 'फीटल इकोकार्डियोग्राफी', desc: 'भ्रूण के हृदय की संरचना और कार्य का विशेष अल्ट्रासाउंड।' },
      { name: 'प्रसूति डॉपलर / ग्रोथ स्कैन / BPP', desc: 'भ्रूण की वृद्धि, रक्त प्रवाह और समग्र कल्याण की निगरानी।' }
    ],

    'services.equipment': [
      { name: 'सैमसंग V7', desc: 'भ्रूण और स्त्री रोग अल्ट्रासाउंड के लिए सटीक डायग्नोस्टिक्स के साथ उन्नत 3D/4D इमेजिंग।' },
      { name: 'GE Voluson E8 Expert', desc: 'भ्रूण चिकित्सा में वैश्विक स्वर्ण मानक। उच्चतम नैदानिक ​​विश्वास के लिए असाधारण छवि गुणवत्ता प्रदान करता है।' }
    ],

    'services.faq': [
      { question: "भ्रूण अल्ट्रासाउंड क्या है?", answer: "भ्रूण अल्ट्रासाउंड एक सुरक्षित, गैर-आक्रामक इमेजिंग तकनीक है जो आपके बच्चे की लाइव छवियां बनाने के लिए उच्च-आवृत्ति ध्वनि तरंगों का उपयोग करती है। यह हमारे विशेषज्ञों को भ्रूण के विकास की निगरानी करने, बच्चे की स्थिति की जांच करने और विकास के महत्वपूर्ण मील के पत्थर की पुष्टि करने की अनुमति देता है।" },
      { question: "मुझे गर्भावस्था का स्कैन कब करवाना चाहिए?", answer: "व्यवहार्यता की पुष्टि के लिए आपको 6 से 10 सप्ताह के बीच अपना पहला गर्भावस्था स्कैन करवाना चाहिए। इसके बाद महत्वपूर्ण मील के पत्थर आते हैं, जिसमें प्रारंभिक स्वास्थ्य स्क्रीनिंग के लिए 11-13 सप्ताह में एनटी स्कैन और 18-20 सप्ताह में लेवल II विसंगति स्कैन शामिल है।" },
      { question: "क्या गर्भावस्था के दौरान अल्ट्रासाउंड सुरक्षित है?", answer: "हाँ, गर्भावस्था के दौरान अल्ट्रासाउंड आपके और आपके बच्चे दोनों के लिए पूरी तरह से सुरक्षित है। एक्स-रे के विपरीत, अल्ट्रासाउंड तकनीक गर्भाशय की कल्पना करने के लिए आयनकारी विकिरण के बजाय हानिरहित ध्वनि तरंगों का उपयोग करती है। यह एक मानक और सुरक्षित नैदानिक ​​उपकरण है।" }
    ],

    // About Page Extras
    'about.expertiseTitle': 'विशेषज्ञता के क्षेत्र',
    'about.credentials.registrationLabel': 'पंजीकरण',
    'about.credentials.formerlyLabel': 'पूर्व अनुभव',
    'about.credentials.doc1': {
      name: 'डॉ. राहुल चौधरी',
      degree: 'MBBS, MD (रेडियोडायग्नोसिस)',
      role: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
      university: '(बार्सिलोना विश्वविद्यालय)',
      registration: ['UPMC संख्या - 103538'],
      experience: '10+ वर्षों का अनुभव',
      formerly: ['सफदरजंग अस्पताल, नई दिल्ली', 'एम्स, पटना']
    },
    'about.credentials.doc2': {
      name: 'डॉ. समर सूर्य निरवाल',
      degree: 'MBBS, MD, DNB (रेडियोडायग्नोसिस)',
      role: 'सलाहकार रेडियोलॉजिस्ट एवं फीटल मेडिसिन',
      university: '(बार्सिलोना विश्वविद्यालय)',
      registration: ['UPMC संख्या - 84598', 'DMC संख्या - 94287'],
      experience: '10+ वर्षों का अनुभव',
      formerly: ['किंग जॉर्ज मेडिकल यूनिवर्सिटी, लखनऊ', 'सफदरजंग अस्पताल, नई दिल्ली']
    },
    'culture.seo.title': 'हमारी संस्कृति और नैदानिक उत्कृष्टता | फोकस अल्ट्रासाउंड और फीटल क्लिनिक',
    'culture.seo.description': 'हमारे मरीज-प्रथम दृष्टिकोण और नैदानिक मूल्यों के बारे में जानें। हमारे विशेषज्ञ ग्रेटर नोएडा वेस्ट में देखभाल करने वाले वातावरण में उत्कृष्ट चिकित्सा विशेषज्ञता लाते हैं।',
    'culture.values.badge': 'मुख्य सिद्धांत',
    'culture.values.title': 'हमारे बुनियादी मूल्य',
    'culture.values.subtitle': 'उत्कृष्टता और समृद्ध नैदानिक देखभाल के प्रति हमारी प्रतिबद्धता को परिभाषित करने वाले स्तंभ।',
    'culture.values.items': [
      {
        title: 'मरीज-प्रथम दृष्टिकोण',
        desc: 'हमारा हर निर्णय हमारे मरीजों के लिए सबसे अच्छा क्या है उस पर केंद्रित है।',
      },
      {
        title: 'सहयोगी टीम',
        desc: 'हम एक साथ काम करते हैं, ज्ञान साझा करते हैं, और एक-दूसरे के विकास में सहयोग करते हैं।',
      },
      {
        title: 'नवाचार संचालित',
        desc: 'हम सर्वोत्तम डायग्नोस्टिक सेवाओं के लिए GE Voluson E8 जैसी नई तकनीकों को अपनाते हैं।',
      },
      {
        title: 'ईमानदारी और विश्वास',
        desc: 'पारदर्शिता और ईमानदारी हमारे हर काम के मूल में है।',
      },
      {
        title: 'कार्य-जीवन संतुलन',
        desc: 'हमारा मानना है कि खुश स्टाफ मरीजों को बेहतर देखभाल प्रदान करता है।',
      },
      {
        title: 'निरंतर सीखना',
        desc: 'नियमित प्रशिक्षण और अंतर्राष्ट्रीय फेलोशिप हमारी टीम को अग्रणी बनाए रखती हैं।',
      }
    ],
    'culture.stats.label1': 'टीम सदस्य',
    'culture.stats.label2': 'संतुष्टि',
    'culture.stats.label3': 'गूगल रेटिंग',
    'culture.stats.label4': 'भरोसे के साल',
    'culture.family.title': 'पारिवारिक संस्कृति',
    'culture.family.desc': 'फोकस अल्ट्रासाउंड और फीटल क्लिनिक में, हमारा वातावरण एकता और पेशेवर गर्मजोशी से संचालित होता है। भारत के सबसे प्रतिष्ठित चिकित्सा संस्थानों से जुड़े हमारे विशेषज्ञ, दुनिया के बेहतरीन नैदानिक ज्ञान को सीधे एक समुदाय-केंद्रित देखभाल वातावरण में लाते हैं।',
    'culture.family.point1': 'सफदरजंग और केजीएमयू पूर्व छात्रों की विशेषज्ञता',
    'culture.family.point2': 'उन्नत अंतर्राष्ट्रीय नैदानिक मानक',
    'culture.family.point3': 'मरीज के अनुभव पर मौलिक ध्यान',

    // Contact Page
    'contact.seo.title': 'अपॉइंटमेंट बुक करें | ग्रेटर नोएडा वेस्ट में सर्वश्रेष्ठ अल्ट्रासाउंड क्लिनिक',
    'contact.seo.description': 'फोकस क्लिनिक निराला एस्टेट में अपने प्रेगनेंसी स्कैन या डायग्नोस्टिक अल्ट्रासाउंड का समय निर्धारित करें। विशेषज्ञ फीटल मेडिसिन और डायग्नोस्टिक्स के लिए ऑनलाइन अपॉइंटमेंट बुकिंग।',
    'contact.seo.faq': [
      {
        question: "मैं फोकस अल्ट्रासाउंड में अपॉइंटमेंट कैसे बुक कर सकता हूँ?",
        answer: "आप हमें +91 8130881986 पर कॉल करके या हमारे संपर्क पृष्ठ पर ऑनलाइन अपॉइंटमेंट अनुरोध फॉर्म भरकर अपॉइंटमेंट बुक कर सकते हैं।"
      },
      {
        question: "अल्ट्रासाउंड अपॉइंटमेंट के लिए मुझे क्या लाना चाहिए?",
        answer: "कृपया अपने डॉक्टर का पर्चा, कोई भी पिछली स्कैन रिपोर्ट और एक वैध पहचान पत्र लाएं। कुछ स्कैन के लिए, आपको भरे हुए मूत्राशय के साथ आने की आवश्यकता हो सकती है; बुकिंग के दौरान हमारे कर्मचारी आपको सलाह देंगे।"
      },
      {
        question: "क्या क्लिनिक में पार्किंग उपलब्ध है?",
        answer: "हाँ, हमारे सभी मरीजों के लिए निराला एस्टेट कमर्शियल कॉम्प्लेक्स के भीतर मुफ्त पार्किंग उपलब्ध है।"
      }
    ],
    'contact.options.scans': [
      'यूएसजी पेट (एब्डोमेन)', 'ऊपरी पेट का अल्ट्रासाउंड', 'यूएसजी पूरे पेट और प्रसूति',
      'केयूबी / पेल्विस / निचला पेट', 'टीवीएस (ट्रांसवेजाइनल सोनोग्राफी)', 
      'स्मॉल पार्ट्स (गर्दन / थायराइड / सॉफ्ट टिश्यू)', 'यूएसजी द्विपक्षीय स्तन', 
      'फाइब्रोस्कैन / इलास्टोग्राफी', 'नियमित प्रसूति स्कैन', 'लेवल 1 स्कैन (NT/NB)', 
      'सर्वाइकल मूल्यांकन + गर्भाशय डॉपलर', 'लेवल 2 स्कैन (TIFFA)', 
      'फीटल इकोकार्डियोग्राफी', 'प्रसूति डॉपलर / ग्रोथ स्कैन / BPP', 'अन्य'
    ],
    'contact.options.doctors': [
      'डॉ. समर सूर्य निरवाल',
      'डॉ. राहुल चौधरी',
      'कोई भी उपलब्ध विशेषज्ञ'
    ],
    'contact.sidebar.address': 'शॉप नंबर 05 और 06, यूजीएफ, निराला एस्टेट, नोएडा एक्सटेंशन, ग्रेटर नोएडा वेस्ट - 201306',
    'contact.sidebar.trustRating': '500+ Google समीक्षाओं पर आधारित',
    'contact.sidebar.trustBadge': 'मरीजों का विश्वास',

    'footer.services': [
      '3डी/4डी अल्ट्रासाउंड',
      'फीटल इको',
      'डिजिटल एक्स-रे',
      'ईसीजी',
      'लैब टेस्ट',
      'फीटल मेडिसिन'
    ],

    'timings.hours.monSat': 'सुबह 9:00 - दोपहर 3:00 और शाम 5:00 - रात 8:00',
    'timings.hours.sunday': 'सुबह 9:00 - दोपहर 2:00',

    // Map
    'map.openNow': 'अभी खुला है',
    'map.closed': 'बंद है',
    'map.away': 'दूर',
    'map.directions': 'दिशा-निर्देश',
    'map.call': 'कॉल करें',
    'map.whatsapp': 'व्हाट्सएप',
    'map.locating': 'स्थान खोज रहे हैं...',
    'map.updateLocation': 'स्थान अपडेट करें',
    'map.showDistance': 'मेरी दूरी दिखाएं',

    // Common
    'common.learnMore': 'और जानें',
    'common.backToHome': 'होम पर वापस',
    'common.language': 'English',
    'common.loading': 'कृपया प्रतीक्षा करें...',
    'common.success': 'सफलतापूर्वक जमा किया गया',
    'common.clinicStatus': 'क्लिनिक की स्थिति',
    'common.open': 'अभी खुला है',
    'common.close': 'बंद करें',
    'common.closed': 'बंद है',
    'common.busy': 'व्यस्त',
  }
};
