import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'focusclinic2026@gmail.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'focus@Clinic#2026';
  const passwordHash = await hash(adminPassword, 8);
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: passwordHash,
    },
    create: {
      name: 'Dr. Admin',
      email: adminEmail,
      password: passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // Create Editor User
  const editorHash = await hash('Editor@123!', 8);
  await prisma.user.upsert({
    where: { email: 'editor@focus-clinic.com' },
    update: {},
    create: {
      name: 'Content Editor',
      email: 'editor@focus-clinic.com',
      password: editorHash,
      role: 'EDITOR',
    },
  });
  console.log('✅ Editor created');

  // Create Real Doctors
  const doctors = [
    {
      id: 'doctor-samar',
      name: 'Dr. Samar Surya Nirwal',
      specialization: 'Radiologist & Fetal Medicine Specialist',
      bio: 'Highly accomplished Radiologist and Fetal Medicine Specialist dedicated to precise, ethical care.',
    },
    {
      id: 'doctor-rahul',
      name: 'Dr. Rahul Choudhary',
      specialization: 'Radiologist & Interventional Radiologist',
      bio: 'FMF (UK) certified expert in NT scans, anomaly scans, and fetal dopplers.',
    }
  ];

  for (const doc of doctors) {
    await prisma.doctor.upsert({
      where: { id: doc.id },
      update: doc,
      create: doc,
    });
  }
  console.log('✅ Doctors seeded');

  // Create Real Services
  const services = [
    { id: 'service-nt', name: 'NT Scan', description: 'Early screening for chromosomal abnormalities (11-13.6 weeks).', durationMin: 20 },
    { id: 'service-tiffa', name: 'Anomaly Scan (TIFFA)', description: 'Mid-pregnancy scan (18-22 weeks) for detailed development check.', durationMin: 45 },
    { id: 'service-growth', name: 'Growth Scan', description: 'Third-trimester monitoring of growth and amniotic fluid.', durationMin: 20 },
    { id: 'service-early', name: 'Early Pregnancy Scan', description: 'Viability and dating scan (6-10 weeks).', durationMin: 15 },
    { id: 'service-doppler', name: 'Doppler Study', description: 'Blood flow evaluation in baby\'s vessels.', durationMin: 30 },
    { id: 'service-echo', name: 'Fetal Echocardiography', description: 'Detailed heart structure and function examination.', durationMin: 60 },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: s,
      create: s,
    });
  }
  console.log('✅ Services seeded');

  // Create Sample Leads
  await prisma.lead.createMany({
    data: [
      {
        name: 'Priya Sharma',
        phone: '+91 9876543210',
        message: 'Looking for Anomaly scan appointment next week.',
        source: 'website',
        status: 'NEW',
      },
      {
        name: 'Anita Verma',
        phone: '+91 8765432100',
        message: 'Do you have slots for 3D/4D ultrasound?',
        source: 'google_ads',
        status: 'CONTACTED',
      },
    ],
  });
  console.log('✅ Sample leads created');

  // Create Sample Appointments
  await prisma.appointment.createMany({
    data: [
      {
        name: 'Sunita Devi',
        phone: '+91 7654321000',
        serviceId: 'service-nt',
        date: new Date(Date.now() + 86400000), // Tomorrow
        notes: 'First pregnancy, very excited!',
        status: 'CONFIRMED',
      },
      {
        name: 'Meena Kumari',
        phone: '+91 5432100012',
        serviceId: 'service-tiffa',
        date: new Date(Date.now() + 172800000), // In 2 days
        notes: 'Recommended by Dr. Gupta.',
        status: 'PENDING',
      }
    ],
  });
  console.log('✅ Sample appointments created');

  // Create Real-looking Reviews
  await prisma.review.createMany({
    data: [
      { name: 'Rashmi Yadav', rating: 5, comment: 'Excellent experience with Dr. Samar. Very professional.', isApproved: true, source: 'google' },
      { name: 'Pooja Tiwari', rating: 5, comment: 'The clarity of scans is amazing. Best in Noida Extension.', isApproved: true, source: 'google' },
    ],
  });
  console.log('✅ Sample reviews created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

