import 'dotenv/config';
import { app } from './shared/infra/http/app';
import { Logger } from './core/Logger';
import { prisma } from './shared/infra/database/prismaClient';
import { selfHealingService } from './modules/selfHealing/services/SelfHealingService';

import cluster from 'cluster';
import os from 'os';

const PORT = process.env.PORT || 4000;
const numCPUs = os.cpus().length;

async function bootstrap() {
  try {
    await prisma.$connect();
    Logger.info(`✅ Database connected (Worker ${process.pid})`);

    app.listen(PORT, () => {
      Logger.info(`🚀 Server worker ${process.pid} running on port ${PORT}`);
    });
  } catch (error) {
    Logger.error(`❌ Failed to start worker ${process.pid}`);
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Enterprise Scale: Unlimited concurrent users using Cluster module
if (cluster.isPrimary) {
  Logger.info(`👑 Primary cluster setting up ${numCPUs} workers...`);

  // Activate Autonomous Defense Monitors ONLY on Master Node
  selfHealingService.startAllMonitors();

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    Logger.info(`👷 Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker, code, signal) => {
    Logger.warn(`⚠️ Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`);
    Logger.info('🔄 Restarting worker...');
    cluster.fork();
  });
} else {
  bootstrap();
}
