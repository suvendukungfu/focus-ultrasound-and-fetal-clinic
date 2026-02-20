import { PrismaClient, Role, LeadStatus } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Admin User
  const passwordHash = await hash('Admin@123!', 8);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@focus-clinic.com' },
    update: {},
    create: {
      name: 'Dr. Admin',
      email: 'admin@focus-clinic.com',
      password: passwordHash,
      role: Role.ADMIN,
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
      role: Role.EDITOR,
    },
  });
  console.log('✅ Editor created');

  // Create Sample Leads
  await prisma.lead.createMany({
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        message: 'Interested in fetal ultrasound.',
        source: 'website',
        status: LeadStatus.NEW,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+9876543210',
        message: 'Do you offer 4D scans?',
        source: 'google_ads',
        status: LeadStatus.CONTACTED,
      },
    ],
  });
  console.log('✅ Sample leads created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
