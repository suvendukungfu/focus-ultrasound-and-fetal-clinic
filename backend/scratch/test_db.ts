import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://focus_admin:changeme@localhost:5434/focus_clinic?schema=public"
    }
  }
});

async function main() {
  try {
    await prisma.$connect();
    console.log("DB connected successfully on 5434");
    await prisma.$disconnect();
  } catch (e) {
    console.error("Failed to connect to DB on 5434:", e);
    process.exit(1);
  }
}

main();
