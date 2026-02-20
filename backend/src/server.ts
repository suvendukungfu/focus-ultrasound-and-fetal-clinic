import { app } from './shared/infra/http/app';
import { Logger } from './core/Logger';
import { prisma } from './shared/infra/database/prismaClient';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    await prisma.$connect();
    Logger.info('✅ Database connected');

    app.listen(PORT, () => {
      Logger.info(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    Logger.error('❌ Failed to start server');
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    await prisma.$disconnect();
    process.exit(1);
  }
}

bootstrap();
