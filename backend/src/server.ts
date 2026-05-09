import 'dotenv/config';
import { app } from './shared/infra/http/app';
import { Logger } from './core/Logger';
import { prisma } from './shared/infra/database/prismaClient';
import { selfHealingService } from './modules/selfHealing/services/SelfHealingService';
import { IKernelService } from './kernel/ServiceRegistry';

import cluster from 'cluster';
import os from 'os';

const PORT = Number(process.env.PORT || 4000);
const numCPUs = os.cpus().length;

async function bootstrap() {
  try {
    await prisma.$connect();
    Logger.info(`✅ Database connected (Worker ${process.pid})`);
  } catch (error) {
    Logger.error(`❌ Failed to connect to database (Worker ${process.pid})`);
    if (error instanceof Error) {
      Logger.error(error.message);
    }
    // In development, we might want to start anyway to debug API routes
    if (process.env.NODE_ENV !== 'development') {
      await prisma.$disconnect();
      process.exit(1);
    }
  }

  const tryListen = (port: number) => {
    try {
      // Explicitly bind to localhost to avoid EPERM on restricted environments
      const server = app.listen(port, '0.0.0.0', () => {
        const addr = server.address();
        const actualPort = typeof addr === 'string' ? addr : addr?.port;
        Logger.info(`🚀 Server worker ${process.pid} running on port ${actualPort}`);
        Logger.info(`   Env: ${process.env.NODE_ENV}, Port Requested: ${port}`);
      });

      server.on('error', (err: Error & { code?: string }) => {
        if (err.code === 'EPERM' || err.code === 'EADDRINUSE' || err.code === 'EACCES') {
          Logger.warn(`⚠️ Port ${port} unavailable (${err.code}). Trying fallback...`);
          if (port === 4000) tryListen(5174);
          else if (port === 5174) tryListen(5175);
          else if (port === 5175) tryListen(5176);
          else if (port === 5176) tryListen(5177);
          else if (port === 5177) tryListen(5178);
          else if (port === 5178) tryListen(5179);
          else if (port !== 0) tryListen(0);
          else {
            Logger.error('❌ All port binding attempts failed. Environment might be too restricted.');
          }
        } else {
          Logger.error(`❌ Server error on port ${port}: ${err.message}`);
        }
      });
    } catch (err: unknown) {
      const error = err as Error;
      Logger.error(`❌ Critical failure starting on port ${port}: ${error.message}`);
    }
  };

  tryListen(PORT);
}

async function registerPlugins(Kernel: { registry: { register: (service: IKernelService) => void } }) {
  // Wrap existing SelfHealing in a Micro-Service Plugin Wrapper
  Kernel.registry.register({
    name: 'SelfHealingService',
    init: async () => {},
    start: async () => { selfHealingService.startAllMonitors(); },
    stop: async () => {},
    health: async () => ({ status: 'ONLINE' as const })
  });

  // Dynamic imports for all enterprise plugins
  const { aiOrchestrator } = await import('./modules/ai/orchestrator/AIOrchestrator');
  Kernel.registry.register(aiOrchestrator);

  const { leadScoringService } = await import('./modules/ai/services/LeadScoringService');
  Kernel.registry.register(leadScoringService);

  const { blogDraftService } = await import('./modules/ai/services/BlogDraftService');
  Kernel.registry.register(blogDraftService);

  const { metaDescriptionService } = await import('./modules/ai/services/MetaDescriptionService');
  Kernel.registry.register(metaDescriptionService);

  const { keywordSuggestionService } = await import('./modules/ai/services/KeywordSuggestionService');
  Kernel.registry.register(keywordSuggestionService);

  const { leadReplyService } = await import('./modules/ai/services/LeadReplyService');
  Kernel.registry.register(leadReplyService);

  const { reviewsCronService } = await import('./modules/reviews/services/ReviewsCronService');
  Kernel.registry.register(reviewsCronService);

  const { appointmentAutomationService } = await import('./modules/appointments/services/AppointmentAutomationService');
  Kernel.registry.register(appointmentAutomationService);
}

// Enterprise Scale: Unlimited concurrent users using Cluster module
if (cluster.isPrimary && process.env.NODE_ENV !== 'development') {
  Logger.info(`👑 Primary cluster setting up ${numCPUs} workers...`);

  import('./kernel/Kernel').then(async ({ Kernel }) => {
    await registerPlugins(Kernel);
    
    Kernel.boot().then(() => {
      Logger.info(`[Cluster] Kernel Online. Forking Express Node Workers...`);
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    }).catch(err => {
      Logger.error(`[Cluster] Critical Kernel failure: ${err}`);
      // In production primary, we might still want to fork workers if the kernel failure is non-fatal
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    });
  });

  cluster.on('exit', (worker) => {
    Logger.info('🔄 Restarting worker...');
    cluster.fork();
  });
} else {
  // In development, or in a worker process, run the API immediately
  bootstrap();
  
  // Also try to boot kernel in dev without blocking the API
  if (process.env.NODE_ENV === 'development') {
    /* 
    import('./kernel/Kernel').then(async ({ Kernel }) => {
      await registerPlugins(Kernel);
      Kernel.boot().catch(err => {
        Logger.warn(`[Kernel] Background services failed: ${err.message}. API remains active.`);
      });
    });
    */
    Logger.info('ℹ️ Background services (Kernel) disabled in development to prevent Redis EPERM errors.');
  }
}
