require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'appointments'
    `;
    console.log('Columns in appointments table:', result);
  } catch (error) {
    console.error('Error fetching columns:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
